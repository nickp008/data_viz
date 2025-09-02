import random

cols = [
    'Col1',
    'Col2',
    'Col3',
    'Col4',
    'Col5',
    'Col6',
    'Col7',
    'Col8',
    'Col9',
    'Col10',
    'Col11',
    'Col12',
]

data = []
for i in range(1000000):
    row = []
    for j in range(len(cols)):
        row.append(str(random.randint(100, 10000000)))
    data.append(','.join(row))
    del row

with open('random_data2.csv', 'w') as ofile:
    ofile.write(','.join(cols))
    ofile.write('\n')
    for row in data:
        ofile.write(row)
        ofile.write('\n')
