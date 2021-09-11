# library
import matplotlib.pyplot as plt
from palettable.colorbrewer.qualitative import Pastel1_7
# create data
names='groupA', 'groupB', 'groupC', 'groupD',
size=[12,11,3,30]

# Create a circle for the center of the plot
my_circle=plt.Circle( (0,0), 0.7, color='white')
plt.pie(size, labels=names, colors=['red','green','blue','skyblue'])
p=plt.gcf()
p.gca().add_artist(my_circle)
plt.show()

# Custom colors --> colors will cycle
plt.pie(size, labels=names, colors=['red','green'])
p=plt.gcf()
p.gca().add_artist(my_circle)
plt.show()


plt.pie(size, labels=names, colors=Pastel1_7.hex_colors)
p=plt.gcf()
p.gca().add_artist(my_circle)
plt.show()