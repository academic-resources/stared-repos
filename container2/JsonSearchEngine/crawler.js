const crawlService = require("crawler");
const crypto = require("crypto");
const database = require("./database");

const crawler = new crawlService({
    skipDuplicates: true,
    userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    rateLimit: 100, // TODO: Dynamic rate limit setting depending on errors
    maxConnections: 1, // set to 10 (and remove the line above) for faster crawling but higher probability of rate limiting (429)
    callback: (error, res, done) => {
        if (error || res.statusCode !== 200) {
            console.log("Error: " + error);
            console.log("Code: " + res.statusCode);
        } else {
            const $ = res.$;
            const urlHash = crypto.createHash("sha256").update(res.request.uri.href).digest("base64");
            database.exists("crawled", "site", urlHash).then(exists => {
                if (crawler.queueSize === 0 || !exists) {
                    console.log("\nCrawling: " + res.request.uri.href);
                    database.index('crawled', 'site', [
                        {
                            "id": urlHash,
                            "url": res.request.uri.href,
                            "title": $("title").text() || res.request.uri.href,
                            "description": $("meta[name=description]").attr("content") || "",
                            "lang": $("html").attr("lang") || $("meta[http-equiv=content-language]").attr("content") || $("meta[http-equiv=language]").attr("content") || $("meta[name=language]").attr("content") || "en",
                            "keywords": $("meta[name=keywords]").attr("content") ? $("meta[name=keywords]").attr("content").split(", ") : ""
                        }
                    ]);

                    $("a").map((i, tag) => {
                        let parsed;
                        try {
                            parsed = new URL($(tag).attr("href"));
                        } catch (e) { // invalid url -> probably a path
                            try {
                                parsed = new URL($(tag).attr("href"), res.request.uri.href);
                            } catch (e) {
                                parsed = null;
                            }
                        }
                        if (parsed !== null && parsed.origin !== "null") {
                            //console.log("Queueing: " + parsed.origin + parsed.pathname);
                            crawler.queue(parsed.origin + parsed.pathname);
                        }
                    });
                }
            });
        }
        done();
    }
});

crawler.queue('http://wikipedia.com');
