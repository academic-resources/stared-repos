'''
Import Libraries:
bs4: html processing
PIL: image handling
io: file I/O

'''

import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

#Set base url to xkcd mainpage
base_url = "http://xkcd.com/"

for n in range(1, 3):
    # Append digits for pemalinks
    url = base_url + str(n)
    #Send get request for the page content
    page = requests.get(url).content
    # Get the result of the page and keep it as object
    soup = BeautifulSoup(page, "lxml")
    # Find relevant conetent. In our case, the div that containd the comic
    comicImageBlock = soup.find("div",{"id":"comic"})
    comicImageTag = comicImageBlock.find("img")
    # Get the img source and convert it to URL
    comicURL = comicImageTag['src']
    imageURL = 'https:' + comicURL
    # Send a get request for the image
    img_data = requests.get(imageURL)
    # Get the image as an image object and store it
    i = Image.open(BytesIO(img_data.content))
    save_file_name = 'xkcd' + str(n) + '.png'
    i.save(save_file_name)