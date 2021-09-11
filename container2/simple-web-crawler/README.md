# simple-web-crawler
Simple web crawler that allows you to search a website for a particular word or phrase, and tells you the URL of what page it was found

## To install it

* Git clone this repo to your computer (or download the zip and unzip to a folder)

* in your terminal app cd into the **simple-web-crawler** folder

* type `npm install` to read the package.json file and download the correct dependencies.

* there is a bug in one of the libraries that this web crawler uses, so after you have run `npm install` type `npm run upgrade` and this will copy over the upgraded library files that fix the bug. You'll only need to do this once.


## To run a search

* to run a search just type `node crawl.js "Nigeria" https://qa.stcdev.com` to run a search for the word **Nigeria** starting at the URL **https://qa.stcdev.com**.

* Change the value of **Nigeria** to the search term you want to find, and **https://qa.stcdev.com** for the URL of the start point of your search.

* It will return a set of URLs at the end where this text phrase has been located.

**N.B. Node has to be installed on your computer for this to work**