import sys

PRINT_BEEJ     = 1
HALT           = 2
PRINT_NUM      = 3
SAVE           = 4
PRINT_REGISTER = 5
ADD            = 6

'''
SAVE takes 2 arguments
saves value in [ARG1] to register [ARG2]
'''

register = [0] * 8

memory = [0] * 128 # 128 bytes of RAM

def load_memory(filename):
    try:
        address = 0

        with open(filename) as f:
            for line in f:
                # Split before and after any comment symbols
                comment_split = line.split("#")

                num = comment_split[0].strip()

                # Ignore blanks
                if num == "":
                    continue

                value = int(num)

                memory[address] = value

                address += 1

    except FileNotFoundError:
        print(f"{sys.argv[0]}: {sys.argv[1]} not found")
        sys.exit(2)


if len(sys.argv) != 2:
    print("usage: simple.py <filename>", file=sys.stderr)
    sys.exit(1)


filepath = sys.argv[1]
load_memory(filepath)

pc = 0
running = True

while running:
  command = memory[pc]

  if command == PRINT_BEEJ:
    print("Beej!")
    pc += 1

  elif command == PRINT_NUM:
    num = memory[pc + 1]
    print(num)
    pc += 2

  elif command == SAVE:
    num = memory[pc + 1]
    reg = memory[pc + 2]
    register[reg] = num
    pc += 3

  elif command == PRINT_REGISTER:
    reg = memory[pc + 1]
    print(register[reg])
    pc += 2

  elif command == ADD:
    reg_a = memory[pc + 1]
    reg_b = memory[pc + 2]
    register[reg_a] += register[reg_b]
    pc += 3

  elif command == HALT:
    running = False
    pc += 1

  else:
    print(f"Unknown instruction: {command}")
    sys.exit(1)

