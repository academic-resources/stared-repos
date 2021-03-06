# COVID-19 Cases Automation

For COVID-19 Cases Automation we are using the concept of web scraping, where we are fetching the data from a website called Worldometers. In this project we can fetch the data of Coronavirus (COVID-19) cases for any country in the World. 

To do this we need two libraries `beautifulsoup4` and `requests`

### Beautifulsoup4

Beautiful Soup is a library that makes it easy to scrape information from web pages. It sits atop an HTML or XML parser, providing Pythonic idioms for iterating, searching, and modifying the parse tree.

### Requests 

Requests allows you to send HTTP/1.1 requests extremely easily. There’s no need to manually add query strings to your URLs, or to form-encode your PUT & POST data — but nowadays, just use the json method!

## Install

Install with `pip` command in any terminal

```python
pip install beautifulsoup4

pip install requests
```

## Working

Import the `beautifulsoup4` and `requests` libraries in the Python file that you are going to use to get the Covid-19 cases information. These libraries provide functions to easily get the information from any web page to your console/application.

For example-

```python
import bs4

import requests

url = "https://something.com/something"

res = requests.get(url)

data = bs4.BeautifulSoup(res.text, 'lxml')

print(data)
```
OR
```python
from bs4 import BeautifulSoup

import requests

url = "https://something.com/something"

res = requests.get(url)

data = BeautifulSoup(res.text, 'lxml')

print(data)
```

## Screenshots

#### In CLI

<img src="https://github.com/Umesh-01/Hacking-Scripts/blob/patch-3/Python/COVID-19%20Cases%20Automation/Images/corona3.png">

<img src="https://github.com/Umesh-01/Hacking-Scripts/blob/patch-3/Python/COVID-19%20Cases%20Automation/Images/corona4.png">

#### In PyCharm

<img src="https://github.com/Umesh-01/Hacking-Scripts/blob/patch-3/Python/COVID-19%20Cases%20Automation/Images/corona1.png">

<img src="https://github.com/Umesh-01/Hacking-Scripts/blob/patch-3/Python/COVID-19%20Cases%20Automation/Images/corona2.png">

## Contributor
<a href="https://github.com/Umesh-01">Umesh Singh</a>
