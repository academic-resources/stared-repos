"""
Given the recursive nature of file-system representation,
many common behaviors, such as copying or deleting a directory,
are implemented with recursive algorithms.

We consider the example of computing the total disk usage
for all files and directories nested within a particular directory.
"""

import os

def disk_usage(path):
  """
  Return the number of bytes used by a file/folder
  and any descendents.
  """
  total = os.path.getsize(path)
  if os.path.isdir(path):
    for filename in os.listdir(path):
      childpath = os.path.join(path, filename)
      total += disk_usage(childpath)
  
  print('{0:<7}'.format(total), path)
  return total
