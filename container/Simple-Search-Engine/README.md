**[Simple Search Engine](https://simplesearchengine.site/)** is an indexing engine which indexes a give web page using Breadth First Search. 

Since I lack the funds to have the indexer running 24/7, I've settled for a solution where the user can input the link they want indexed and select how deep the search will go (to a maximum level of 3).

**level 0:** won't do anything :/

**level 1:** index the page provided

**level 2:** index the children of the page provided

**level 3:** index the children of the children of the page provided

Breakdown of the website:

**Google Search:** a query made using Google’s search API

**Browser:** provides information about a user’s browser and location

**Course:** helpful links pertaining to the course 


***This project was initially given as a class project for Shobandeep Singh and Jasir Ahmed and has been expanded to include new features:***

**Custom Search:** The user can query the indexed pages and download the results if needed. A page ranking algorithm (https://en.wikipedia.org/wiki/PageRank) is used to give meaningful search results. The user can download the search results as CSV, JSON or XML
