const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

//ROUTES
router.get('/', (req, res) => {
    res.render('index');
});

router.post('/scrape', (req, res) => {
    const scrape = async () => {
        //launch scraper module
       const browser = await puppeteer.launch();
       const page = await browser.newPage();
       //go to imdb
       await page.goto('https://www.imdb.com');
       //type given query into the imdb search field
       page.type("#navbar-query", req.body.searchText);
       //choose the search type from the imdb select options
       page.select('select#quicksearch', req.body.searchBy);
       //click on idmb's search button - search
       page.click('#navbar-submit-button');
       //make sure the result page is loaded
       await page.waitForNavigation();
       //gather results
       const result = await page.evaluate(() => {
            // Create an empty array that will store data
            let data = [];
            //get total number of results
            let elements = document.querySelectorAll('#main > div > div.findSection > table > tbody > tr > td.primary_photo > a > img');
            let length = elements.length;

            //loop through the results and place elements into the array
            for(let i = 1; i <= length; i++){
                let image = document.querySelector(`#main > div > div.findSection > table > tbody > tr:nth-child(${i}) > td.primary_photo > a > img`).src;
                let title = document.querySelector(`#main > div > div.findSection > table > tbody > tr:nth-child(${i}) > td.result_text > a`).innerText;
                let link = document.querySelector(`#main > div > div.findSection > table > tbody > tr:nth-child(${i}) > td.result_text > a`).href;
                let text = document.querySelector(`#main > div > div.findSection > table > tbody > tr:nth-child(${i}) > td.result_text`).innerText;
                data.push({image, title, link, text});
            }
            return data;
        });
       browser.close();
       return result;
    };

    scrape().then((result) => {
        res.render('results', {searchItem: req.body.searchText, results: result});
    });
});


module.exports = router;
