import pathlib, os

col_number = 0

result = []

with open(os.path.join(pathlib.Path(__file__).parent.absolute(), 'result.txt')) as f:
    lines = f.readlines()
    for line in lines:
        cols = line.split(' ')
        result.append(cols[col_number])

with open(os.path.join(pathlib.Path(__file__).parent.absolute(), 'lastnames.txt'), 'w') as fw:
    fw.write(','.join(result))
