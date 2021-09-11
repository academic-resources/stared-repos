const axios              = require('axios');
const cheerio            = require('cheerio');
const url                = require('url');
const { getAbsoluteUrl } = require('../helpers');
const Workflow           = require('../workflow');
const Configuration      = require('../configuration');
const Timer              = require('./timer');

const config = Configuration.Build();

const concurrency = config.get('CONCURRENCY') || 1;

const crawlTimeout = config.get('CRAWL_TIMEOUT') || 20000;

/**
 * Maintains list of urls that have been crawled
 * and list of urls that need to be crawled
 */
class RequestQueue {
    constructor(sitemap, base) {
        this.crawled = [];
        this.discovered = [];
        this.sitemap = sitemap;
        this.base = base;

        this.setWorkflow();

        this.timer = Timer.Build(crawlTimeout);
    }

    /**
     * Returns a new instance of RequestQueue
     * @param sitemap
     * @param base
     * @return RequestQueue
     */
    static Build(sitemap, base) {
        return new RequestQueue(sitemap, base);
    }

    /**
     * Return whether the link is valid
     * @param link
     */
    validateUrl(link) {
        if (link === undefined) return;

        var parsed = url.parse(link);

        return this.validateUrlFormat(parsed) &&
               !this.alreadyCrawled(link) &&
               !this.alreadyDiscovered(link);
    }

    /**
     * Fetches the children of a parent url
     * @param link
     * @param callback
     */
    async fetchChildren(link) {

        try {
            const response = await axios.get(link);

            console.log(`Fetching the children of ${link}`);

            var $ = cheerio.load(response.data);

            this.sitemap.addParent(link);

            $('a').each((i, elem) => {
                var url = getAbsoluteUrl(elem.attribs.href, this.base);

                if (!this.validateUrl(url)) return;

                this.discovered.push(url);

                this.sitemap.addChild(link, url);
            });
        } catch (e) {
            console.log(`Unable to fetch children for ${link}`);

            throw e;
        }
    }

    /**
     * Crawls a link
     * @param link
     */
    async crawlLink(link) {
        if (this.alreadyCrawled(link)) return;

        // Run the web crawler on a different workflow
        // This is so that each individual sub crawler has a retry option
        // before the parallel crawler fails and retries all together
        await Workflow.Build(this)
                      .addParallelTask([link], 'fetchChildren', 3)
                      .runTasks();

        // Once the children have been added into the discovered queue,
        // We push the link to the crawled array to indicate that we
        // are done crawling the link
        if (this.sitemap.parentInMap(link)) this.crawled.push(link);
    }

    /**
     * Adds un-crawled urls back into the queue
     * @param urls
     */
    reQueue(urls) {
        for (const url of urls) {
            if (!this.validateUrl(url)) this.discovered.push(url);
        }
    }

    /**
     * Gets the tuples of urls that we want to crawl
     * @param remaining
     * @return urls
     */
    getUrlTuples(remaining) {
        var len = Math.min(remaining, Math.min(concurrency, this.discovered.length));

        var urls = this.discovered.slice(0, len);

        this.discovered.splice(0, len);

        return urls;
    }

    /**
     * Sets up the crawler job queue
     * @param limit
     */
    async crawl(limit) {
        this.discovered.push(this.base);

        this.timer.start();

        this.sitemap.setLimit(limit);

        while (this.discovered.length > 0 && !this.sitemap.limitReached() && !this.timer.shouldTimeout()) {

            var remaining = limit - this.sitemap.numCrawled();

            var urls = this.getUrlTuples(remaining);

            // Do 3 retries
            // If 1 concurrent request dies, and the others succeed,
            // the parent urls would have been added to the site map
            // Therefore, we would not be running those requests again
            // Only the failed request will be retried in the retry logic
            await this.workflow
                      .addParallelTask(urls, 'crawlLink', 3)
                      .runTasks();
        }

        this.clear();

        this.timer.end();

        console.log(`We are done with crawling the site: ${this.base}`);
    }

    /**
     * Clears the request and crawled queues
     */
    clear() {
        this.discovered = [];
        this.crawled = [];
    }

    /**
     * Returns if the link is already crawled
     * @param link
     */
    alreadyCrawled(link) {
        return this.sitemap.parentInMap(link);
    }

    /**
     * Returns if the link is already discovered
     * @param link
     */
    alreadyDiscovered(link) {
        return this.discovered.includes(link);
    }

    /**
     * Returns the base url's host name
     */
    getBaseDomainName() {
        var parsed = url.parse(this.base);

        return parsed.hostname.split('.')[1];
    }

    /**
     * Modify base
     * @param base
     */
    setBase(base) {
        this.base = base;
    }

    /**
     * Returns whether the url format is valid
     * @param parsed
     */
    validateUrlFormat(parsed) {
        return parsed.protocol === 'https:' &&
               parsed.hostname &&
               parsed.hostname.includes(this.getBaseDomainName());
    }

    /**
     * Creates the workflow and sets the dependency object to be this object
     */
    setWorkflow() {
        this.workflow = Workflow.Build(this);
    }
}

module.exports = RequestQueue;