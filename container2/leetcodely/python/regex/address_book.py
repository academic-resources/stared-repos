import re

with open("data/names.txt") as file:
    data = file.read()
# print(data)
# print(re.match(r'Love', data))
# print(re.search(r'Kenneth', data))
print(re.findall(r'\w*,\s\w+', data))
print(re.findall(r'\(?\d{3}\)?\s?\d{3}-\d{4}', data))
print(re.findall(r'[\w\d+.]+@[\w\d.]+', data, re.I))
