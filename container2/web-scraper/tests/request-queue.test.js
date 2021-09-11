const expect  = require('expect');
const request = require('supertest');
const url     = require('url');

const RequestQueue = require('../request-queue');
const Sitemap      = require('../sitemap');

const base = 'https://www.monzo.com';

const map = Sitemap.Build(base);
const rq  = RequestQueue.Build(map, base);

describe('Tests RequestQueue / Sitemap classes', () => {

    it ('Base host name is the domain name of base url', (done) => {

        expect(rq.getBaseDomainName()).toEqual('monzo');

        done();
    });

    it ('Undiscovered / uncrawled web links not in sitemap', (done) => {

        expect(rq.alreadyCrawled(base)).toEqual(false);

        expect(rq.alreadyDiscovered(base)).toEqual(false);

        done();
    });

    it ('Validation fails if url does not have base domain name', (done) => {

        expect(rq.validateUrlFormat(url.parse('https://www.monzosds.com'))).toEqual(true);

        expect(rq.validateUrlFormat(url.parse('https://www.monzun.com'))).toEqual(false);

        done();
    });

    it ('Crawls the web', async () => {

        expect(map.numCrawled()).toEqual(0);

        await rq.crawl(3);

        expect(map.numCrawled()).toBeGreaterThanOrEqual(3);
    })
    .timeout(100000);

    it ('Returns the crawled sitemap', async () => {

        expect(map.numCrawled()).toBeGreaterThanOrEqual(3);

        var res = map.toJson();

        expect(res.length).toBeGreaterThanOrEqual(0);

        res = map.depthFirstSearch(base, 0);

        expect(res.length).toBeGreaterThanOrEqual(0);
    })
    .timeout(100000);
});
