import sys

# Let's setup two operation instructions for our simple machine: PRINT_BEEJ and HALT
PRINT_BEEJ     = 1
HALT           = 2
PRINT_NUM      = 3
SAVE           = 4
PRINT_REGISTER = 5
ADD            = 6

# This sets our program's memory for what it will do, print 4 times and halt
memory = [
    PRINT_BEEJ,
    SAVE, # SAVE 62 to register 2
    65,
    2,
    SAVE, # Save 20 to register 3
    20,
    3,
    ADD, # add register 3 to register 2, R2 += R3
    2,
    3,
    PRINT_REGISTER, # prints value at register 2
    2,
    HALT # We should always halt to prevent memory leaks
]

# Creates an array of 8 0's
register = [0] * 8

# Sets a pointer to the instructions we're currently running on

pc = 0

# Tells us our program is running
running = True

while running:
    # Looks at where we are in the memory
    command = memory[pc]

    # Then we process it to handle the command
    if command == PRINT_BEEJ:
        print("BEEJ")

    elif command == HALT:
        running = False

    elif command == PRINT_NUM:
        num = memory[pc + 1]
        print(num)
        pc += 2

    elif command == SAVE:
        # The number to save is the next value in memory
        num = memory[pc + 1]
        # The register place to save it is the following value in memory
        reg = memory[pc + 2]
        # Sets these to the register
        register[reg] = num
        # Increment by 3
        pc += 3
    
    elif command == ADD:
        # Sets first adding register index to the next value in memory
        reg_a = memory[pc + 1]
        # Sets second adding register index to the following value in memory
        reg_b = memory[pc + 2]

        # Adds the second register index value to the first
        register[reg_a] += register[reg_b]
        # Increments by 3
        pc += 3
    
    elif command == PRINT_REGISTER:
        # Sets the register index to print to the next value in memory
        reg_index = memory[pc + 1]
        # Prints the register at that place
        print(register[reg_index])
        # Increments by 2
        pc += 2

    else:
        print(f"Unknown instruction: {command}")
        sys.exit(1)

    # Increment our program pointer by one
    pc += 1