import sys, os, random

print("\n############################\n")
print("Welcome to the USA-Name generator, a random name will be generated:\n")

first_names = []
last_names = []

with open(os.path.join(sys.path[0], 'firstnames.txt')) as f:
    first_names = f.read().split(',')

with open(os.path.join(sys.path[0], 'lastnames.txt')) as f:
    last_names = f.read().split(',')

while True:
    firstName = random.choice(first_names)
    lastName = random.choice(last_names)
    
    print(f"{firstName} {lastName}", file=sys.stderr)

    try_again = input("\nTry again? (Press Enter else 'n' to quit)\n")

    if (try_again.lower() == 'n'):
        break

input('\nPress Enter to exit')
