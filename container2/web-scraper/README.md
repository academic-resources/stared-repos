# Web Scraper

[![Build Status](https://travis-ci.org/mayankamencherla/web-scraper.svg?branch=master)](https://travis-ci.org/mayankamencherla/web-scraper)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- [![Packagist](https://img.shields.io/packagist/v/symfony/symfony.svg)]() -->

:star: Star me on Github!

<p align="center">
    <a href="https://en.wikipedia.org/wiki/Web_crawler">
        <img src="https://github.com/mayankamencherla/web-scraper/blob/master/web-crawler.jpg" />
    </a>
</p>

## Downloading
```bash
$ git clone https://github.com/mayankamencherla/web-scraper.git
```

## Reading List
> Some good reading guides to understand web crawlers
1. **[Web Crawler Architecture](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/09/EDS-WebCrawlerArchitecture.pdf)**
2. **[Wikipedia](https://en.wikipedia.org/wiki/Web_crawler)**
3. **[Web Crawling by Princeton](http://www.cs.princeton.edu/courses/archive/spr11/cos435/Notes/web_crawling_topost.pdf)**

## Setup Locally :video_game:
> To get the app working locally, or to run test cases, follow the instructions below.
> After setting up the app, details on each API and how to use it can be found below in the **[API's available on this app](https://github.com/mayankamencherla/web-scraper#apis-available-on-this-app)** section.
> If any of the commands below are denied due to a permission error, please prepend a sudo to the command.

1. Navigate to the app's root directory

2. Run the following command to install all the dependencies:
```bash
$ npm install
```

3. Create the .env file and modify the default values that have been set in .env.sample
```bash
$ cp .env.sample .env
```

4. Start the HTTP server:
```bash
$ npm run start
```
By default, the HTTP server is hosted on port 3000

## Run test cases:
```bash
$ npm run test
```

## Environment variables
Environment variables are picked up from the .env file, which must be created in the app's root directory. The root directory has a sample file called .env.sample that contains all the necessary config variables, but they must be copied over into the .env file and altered according to needs in order to work

Some key environment variables are listed and explained below:

1. *CONCURRENCY* is the maximum number of concurrent urls that are crawled at once

2. *CRAWL_TIMEOUT* is the maximum amount of time the crawler runs before it times out


## API's available on this app
> This app supports 1 API currently

1. GET <a href="http://localhost:3000/?url={url}" target="_blank">/?url={url}</a>
```
   a. Starts the crawler with the given url
   b. Prints the sitemap structure in depth first format
   c. Returns the sitemap as parent-child relationship as a json response
   d. Example: http://localhost:3000/?url=https://www.lyst.com
```