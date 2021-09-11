# Subroutines:

Functions as you know them from higher level languages

- Calling a thing and returning from it
- Name of instruction to call a subroutine is CALL (varies by architecture)
- After subroutine runs, return instruction (RET) takes you back to where you were before the CALL.

## Limitations:

- CPUs are simple machines
- No arguments (CALL only takes one operand and that operand is where to go)
- No return values (RET doesn't take any operands)
- These can be implemented in other ways (clearly, as other languages do it)

# Use of Stack:

When you make the call, you need to remember where to come back to when you return, so you need to store the return address somewhere.

- CPUs tend to use the stack for this.
  CALL will pusht he address of the instruction after it on the stack, then move the PC to the subroutine address
- RET will pop the return address off the stack and store it in the PC.

## Subroutine Example:

```
PC  ->  00: LDI, R0, 15                 Stack:
        03: LDI, R1, 0B
        06: CALL R1
        08: PRN R0
        OA: HLT

        0B: ADD R0, 10  #Subroutine
        0E: RET

        00: LDI, R0, 15                 Stack:
        03: LDI, R1, 0B                  08
PC  ->  06: CALL R1
        08: PRN R0
        OA: HLT

        0B: ADD R0, 10  #Subroutine
        0E: RET

        00: LDI, R0, 15                 Stack:
        03: LDI, R1, 0B                  08
        06: CALL R1
        08: PRN R0
        OA: HLT

        0B: ADD R0, 10  #Subroutine
PC  ->  0E: RET

        00: LDI, R0, 15                 Stack:
        03: LDI, R1, 0B
        06: CALL R1
PC  ->  08: PRN R0
        OA: HLT

        0B: ADD R0, 10  #Subroutine
        0E: RET
```

# Uses of Subroutines:

- Anywhere you'd use functions in a higher-level language
- DRY principle
- High-level languages eventually use CALL and RET deep down to implement functions

# Challenge:

- Why is the stack used to store the return address? Why not just a single register or memory location?
- How might the idea of _local variables_ for the subroutine be implemented using the stack?
- Think of two ways that arguments could be passed as subroutines.
