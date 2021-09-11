# str = "1010"

# def to_decimal(num_string, base):
#     # Turn the string into a list of individual characters
#     digit_list = list(num_string)

#     # Reverse the string to look at each character in the correct order
#     digit_list.reverse()

#     value = 0

#     for i in range(len(digit_list)):
#         print(f"{int(digit_list[i])} in the {base ** i}'s place' ")
#         value += int(digit_list[i]) * (base ** i)

#     print(f"The final number is {value}")


# to_decimal(str, 2)


#################################

import sys

# This provides some error handling
if len(sys.argv) != 2:
    print("usage: file.py <filename>", file=sys.stderr)
    sys.exit(1)

filepath = sys.argv[1]

# Try and except helps us handle errors safely, especially in production
try:
    with open(filepath) as f:
        for line in f:
            # Split everything before and after a # to remove comments
            # Comments will be indices 1+, so we only need index 0
            comment_split = line.split("#")

            # Convert pre-comment from binary to decimal
            # Strip removes any leading or trailing white spaces
            num = comment_split[0].strip()

            # Ignore blank values
            if num == "":
                continue
            
            # Set x to the number, of base 2
            x = int(num, 2)

            print(f"{x: 08b}: {x}")

except FileNotFoundError:
    print(f"{sys.argv[0]}: {sys.argv[1]} not found")
    sys.exit(2)

