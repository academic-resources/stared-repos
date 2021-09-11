"""
English ruler pattern is a simple example of a factal, that is,
a shape that has a self-recursive structure at various levels of
magnification.

In general, an interval with a central tick length L >= 1 is composed of:

* An interval with a central tick length L - 1
* A single tick of length L
* An interval with a central tick length L - 1
"""

def draw_line(tick_length, tick_label=''):
  """Draw one line with given tick length and optional label"""
  line = '-' * tick_length + f' {tick_label}'
  print(line)

def draw_interval(center_length):
  """Draw tick interval based upon a central tick length"""
  if center_length > 0:
    draw_interval(center_length - 1)
    draw_line(center_length)
    draw_interval(center_length - 1)

def draw_ruler(num_inches, major_length):
  """Draw English ruler with given number of inches, major tick length"""
  draw_line(major_length, '0') # inch 0 line
  for i in range(1, 1 + num_inches):
    draw_interval(major_length - 1) # interior ticks for inch
    draw_line(major_length, str(i)) # inch j line and label

draw_ruler(5, 3)
