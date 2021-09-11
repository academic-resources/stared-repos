# Transitors:

Basic element of computation that controls the flow of electricity, similar to but different than a switch. Transitors are used to build logic gates.

#### Logic gate:

A collection of transistors put together to perform one of the basic boolean logic functions on a single bit or a collection of bits. (E.g., AND, NOT, XOR, OR, NAND, NOR)

NAND gate is made of two transistors.  
NAND and NOR gates are called functionally complete since they can each be used to build any other gates.

If you can make a NAND gate, you can make an entire computer.

#### Flip flop:

Basic memory storage device that can be used to hold registers - main memory is rarely made up of flip flops.

#### AND Gate:

It has two inputs (can have more than two) and it has an output.

A with a 1 on it, B with a 1 on it, want output to have 1 on it.

#### Boolean Logic:

If condition A is true && condition B is true...
If condition A || condition B is true...

Basic boolean operations are often demonstrated with truth tables.
Values on left are input, values on left are result:

#### Truth table for NOT:

```
NOT Gate
---------
A    Not A
0    1
1    0
```

Truth table for other operations are similar but have two inputs:

```
A|B|A AND B|A OR B|A XOR B|A NOR B|A NAND B
0|0|   0   |  0       0   |   1   |   1
0|1|   0   |  1       1   |   0   |   1
1|0|   0   |  1       1   |   0   |   1
1|1|   1   |  1       0   |   0   |   0
```

Javascript Bitwise operators are numeric, not logical, so don't mix and match with boolean or you might get weird results.

```
  128 64 32 16  8 4 2 1
    0  0  0  0  1 1 0 0 = 8 + 4 = 12
|   0  1  1  0  0 1 1 1 = 64 + 32 + 4 + 2 + 1 = 103
    0  1  1  0  1 1 1 1 = 64 + 32 + 8 + 4 + 2 + 1 = 111
```

```
     128 64 32 16 8 4 2 1
     1    1  0  1 0 1 1 0 = 128 + 64 + 16 + 4 + 2 = 214
AND  1    1  1  1 0 0 0 0 = 128 + 64 + 32 + 16 = 240
     1    1  0  1 0 0 0 0 = 128 + 64 + 16 = 208
```

If you want to extract two bits, you can shift a number

```
Original number: 01101111
Shifted one to the right: 001101111 <-- last one will fall off into space
Shifted two to the right: 00011011
Shifted three to the right: 00001101
Shifted four to the right: 00000110
Shifted five to the right: 00000011
Shifted six to the right: 00000001
```

```
     00000001 = b
&    00000011 - and mask
-------------
     00000001

a = 0b01101111;
b = a >> 6;
```

## Architecture:

Visual 6502 : Can see what parts of memory are being accessed during program execution.

### While program running:

Has to go out to RAM to see what the next instruction is.
How is a number a computer instruction?
Register - program counter: holds the index into memory of where the next instruction is, will store it in the instruction manager (IR).

In our simulation, 8 bits, each bit has a meaning. Some of the bits get stripped off and go to the control unit, some get stripped and sent to register file, and some go to the ALU.

Register file - R0 to R7 (all CPUs have different register names, this is a common one) - registers are like variables. R0 to R7, that's not many variables. Within the CPU, extremely fast to operate on.

When a compiler builds code to run on the CPU, tries to use registers as much as possible to keep the speed high.

### ALU - arithmetic logic unit:

Responsible for arithmetic and bitwise operations, and comparisons between numbers.

### Cache:

High speed memory that's close to the CPU. If reading byte at address 10, likely to get address 11, so cache stores subsequent bytes when retrieving data from RAM.

### Memory Address Register:

Address of memory we're interested in reading or writing.
Memory Data Register: In case of write, holds value of what we want to write. In the case of a read, MDR gets loaded with the value that is in memory at the Memory Address Register address.

In our emulator, you'll see this in the emulator.js file

### Interrupt Handler:

If key gets hit, raises a voltage on a wire, which goes to the interrupt handler which sets a value in the interrrupt status register and the CPU sees it. When it goes to execute the next instruction, a complicated set of steps happen where it finds another location in memory to begin executing instructions. That other location will handle the interrupt handler program. Interrupt handler returns and code continues executing like it did before the interrupt occurred.

- Interrupt flow of execution, perform some action in the handler, and then resume the flow of execution where the interrupt left off.

Can decide which interrupts you're interested in by using the interrupt mask register - gets bitwise ANDed with the status register and masks out interrupts you're not interested in.

Our CPU has two interrupts defined: a timer interrupt that occurs once per second, and a keyboard interrupt when a key is pressed.
By setting interrupt register mask to all 0, masks them out so you don't get any interrupts.

One of the problems with having the CPU be the sole control of the RAM, the CPU will be busy copying data into RAM from devices that have a lot of data to present to it.

For example, if you have a disk and the OS wants to read block 7004 on the disk, the OS is going to command the peripheral to read block 7004 and get back to it when it's done. How will CPU know it's finished? Will get an interrupt.

Direct memory access - disk is asked to read a block, it puts it into memory and when it's loaded, an interrupt happens to let the CPU know the information is there.

When we write the emulator, we'll have registers, an ALU, a PC to keep track of what instruction we're doing, an instruction register, simulated RAM that allows you to read and write bytes from RAM.

### Important to remember: Individual instructions don't do very much.

#### ADD:

Adds two numbers.

#### COMPARE:

Compares two numbers and sets flags whether numbers are greater than, equal or less than each other.

#### JUMP:

Takes program counter from where it's running, jumps to another address and continues running there.
Individual handlers we write in our emulator to simulate the individual instructions are short, usually one-liners.

Complexity of how to make a CPU work is from building on these tiny instructions. Doing that is a pain, which is why nobody programs that way.

Machine code - usually if you write in machine code, hexadecimal.

Mneumonics are great - three or four letter code lets you know what you're doing (easier than remembering a hexadecimal number).

Talking about CPU and assembly language is down to the metal.

### Clock:

Driver of voltage that goes up and down several times a second - every time it raises or lowers, work gets done. A lot of instructions just take one clock to execute. You can execute billions of instructions per second on a modern CPU.

### Operations or Opcodes:

Opcode is shorthand for the instruction that you're executing - not the data it's working on. ADD Register 0 to Register 4 - Opcode is AND. Register 0 and Register 4 are operands.

### Bus:

A way for information to get from one part of the motherboard to another part of the motherboard. It's like a telephone line (bunch of wires). Different buses on the system that get used to move information back and forth.

### RAM:

Grid of bits - more commonly exposed to programmers at machine level and up as an array of bytes. Program counter will be an index into the array of bytes.
