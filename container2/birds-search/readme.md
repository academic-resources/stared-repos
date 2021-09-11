Birds Search 
====

This is a sample repo of a work with the following libs/frameworks:

* Node JS - Server side
    * flatiron/director - Routing lib
    * ecstatic - Serve static files
    * cheerio - A jquery core selector implentation 
    * node-async - Async flow control library
    * Node.IO  - scraping lib (can be     removed..)
    * node-solr - Apache Solr client
* Apache Solr - search engine


The flow of setting up the project is as follows:

### 1 ###

    node scrape
    
Not a mandatory process since repo also include the scraped pages from some point in world history. This will start a process to scrape the list of birds recorded in israel from: http://www.israbirding.com/checklist/ 

After that with a minor tweak on the bird names, it will scrape the relevant bird pages from wikipedia. The process takes a 2-4 minutes. It is really not optimized or parallelized as it should.

Also, the process seems to complete with exception, if not botherd with it, it seems like a node-async issue.

### 2 ###

    solr /path/to/config

Make sure solr is up.

### 3 ###

    node solr-index

process to pick up the files scraped from the web and create the solr documents in the birds-kb/ directory of the repo.

### 4 ###

    node app
    
Start the web server

You should now be able to http://127.0.0.1:8080/ locally and play around with the data

     
