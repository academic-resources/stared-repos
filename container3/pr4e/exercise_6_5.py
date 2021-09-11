text = "X-DSPAM-Confidence:    0.8475";
atpos = text.find('0')
extract = text[23:]


print 'The sample text is: ',text
print 'The number starts at position: ',atpos
print 'Extracting the number within the string: ', extract


print 'The extracted number is a: ', type(extract)
number = float(extract)

print 'Now the extracted number is a: ', type(number)
print number

