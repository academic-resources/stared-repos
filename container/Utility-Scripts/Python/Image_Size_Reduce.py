#!/usr/bin/python

import PIL   #python Image Library
import Image #python Image Module


width_pixels = 1000                                                    #width of final image in pixels
img_path = raw_input('Enter the Image path :- ')                       #taking path of the image from the user
img = Image.open(str(img_path))                                        #making an Image object in python
widthper = (width_pixels/float(img.size[0]))
height_pixels = int((float(img.size[1])*float(widthper)))              #height of final image in pixels
img = img.resize((width_pixels,height_pixels), PIL.Image.ANTIALIAS)    #using the resize method

list1 = img_path.split("/")                           #creating list to obtain image file name
img_name = list1.pop()
list2 = img_name.split(".")                           #creating list to obtain image extension
img_extension = list2.pop()
q = img_path.replace(img_name, "")
final_img = q+'compressed_image.'+img_extension       #creating the address of final compressed image

img.save(final_img)                                   #saving the image to the above location



                                                   #THE END
