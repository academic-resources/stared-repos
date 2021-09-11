
# Print out all of the numbers in the following array that are divisible by 3:
    # [85, 46, 27, 81, 94, 9, 27, 38, 43, 99, 37, 63, 31, 42, 14]
# The expected output for the above input is:

# You may use whatever programming language you wish.
# Verbalize your thought process as much as possible before writing any code.
# Run through the UPER problem solving framework while going through your thought process.
array = [85, 46, 27, 81, 94, 9, 27, 38, 43, 99, 37, 63, 31, 42, 14]

# loop through array
# if divisible by 3 print it out

for item in array:
    if item % 3 == 0:
        print(item)
        
