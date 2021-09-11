/**
 * Maintains a site map containing a parent tree
 * relationship between parent sites and children
 */
 class Sitemap {
    constructor(base) {
        this.map = {};
        this.base = base;
        this.crawled = 0;
    }

    /**
     * Returns a new Sitemap instance
     * @param base
     * @return Sitemap
     */
    static Build(base) {
        return new Sitemap(base);
    }

    /**
     * Adds a parent to the sitemap
     * @param link
     */
    addParent(link) {
        this.map[link] = [];

        this.crawled++;
    }

    /**
     * Returns whether the parent is in the map
     * @param parent
     */
    parentInMap(parent) {
        return this.map.hasOwnProperty(parent);
    }

    /**
     * Adds a child to the parent
     * @param parent
     * @param child
     */
    addChild(parent, child) {
        if (!this.parentInMap(parent)) this.addParent(parent);

        this.map[parent].push(child);
    }

    /**
     * Returns the number of crawled sites
     * @return this.crawled
     */
    numCrawled() {
        return this.crawled;
    }

    /**
     * Sets the limit of the crawler
     * @param limit
     */
    setLimit(limit) {
        this.limit = limit;
    }

    /**
     * Gets the limit of the crawler
     * @return limit
     */
    getLimit() {
        return this.limit;
    }

    /**
     * Returns whether the crawler limit has been reached
     * @return bool
     */
    limitReached() {
        return this.numCrawled() >= this.getLimit();
    }

    /**
     * Prints the DFS tree
     * @param link
     * @param spaces
     */
    depthFirstSearch(link, spaces) {
        var res = '-'.repeat(spaces*4) + link;

        console.log(res);

        res += '\n';

        if (!this.map.hasOwnProperty(link)) return;

        for (var child of this.map[link]) {
            res += this.depthFirstSearch(child, spaces+1);
        }

        return res;
    }

    /**
     * Returns the sitemap as a JSON string
     * @return string
     */
    toJson() {
        var str = JSON.stringify(this.map, null, 2);

        return str;
    }

    /**
     * Prints the sitemap
     */
    print() {
        console.log(`\n---------\nPrinting the site map of ${this.base}\n---------\n`);

        this.depthFirstSearch(this.base, 0);
    }
 }

 module.exports = Sitemap;