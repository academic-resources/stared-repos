"""
Python makes performing file I/O simple. Take a look
at how to read and write to files here:

https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files
"""

# Open up the "foo.txt" file (which already exists) for reading
# Print all the contents of the file, then close the file
# Note: pay close attention to your current directory when trying to open "foo.txt"


def fileIORead():
    with open("foo.txt") as f:
        read_data = f.read()
        print(read_data)


# Open up a file called "bar.txt" (which doesn't exist yet) for
# writing. Write three lines of arbitrary content to that file,
# then close the file. Open up "bar.txt" and inspect it to make
# sure that it contains what you expect it to contain


def fileIOWrite():
    string1 = "arbitrary 1\n"
    string2 = "content 2\n"
    string3 = "to the file 3"
    f = open("bar.txt", "w+")
    f.write(string1)
    f.write(string2)
    f.write(string3)


fileIORead()
fileIOWrite()
