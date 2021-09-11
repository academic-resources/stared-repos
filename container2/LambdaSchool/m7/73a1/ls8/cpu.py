"""CPU functionality."""

import sys

class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.register = [0] * 8
        self.ram = [0] * 256
        self.register[7] = len(self.ram) - 1
        self.program_counter = 0

        self.add = int(0b10100000)
        self.sub = int(0b10100011)
        self.mul = int(0b10100010)
        self.div = int(0b10100011)
        self.cmp = int(0b10100111)
        self.prn = int(0b01000111)
        self.ldi = int(0b10000010)
        self.pop = int(0b01000110)
        self.push = int(0b01000101)
        self.call = int(0b01010000)
        self.ret = int(0b00010001)
        self.jmp = int(0b01010100)
        self.jeq = int(0b01010101)
        self.jne = int(0b01010110)
        self.addi = int(0b10001111)
        self.halt = int(0b00000001)

        self.bt = {}
        self.bt[self.add] = self.cpu_add
        self.bt[self.sub] = self.cpu_sub
        self.bt[self.mul] = self.cpu_mul
        self.bt[self.div] = self.cpu_div
        self.bt[self.cmp] = self.cpu_cmp
        self.bt[self.prn] = self.cpu_prn
        self.bt[self.ldi] = self.cpu_ldi
        self.bt[self.pop] = self.cpu_pop
        self.bt[self.push] = self.cpu_push
        self.bt[self.call] = self.cpu_call
        self.bt[self.ret] = self.cpu_ret
        self.bt[self.jmp] = self.cpu_jmp
        self.bt[self.jeq] = self.cpu_jeq
        self.bt[self.jne] = self.cpu_jne
        self.bt[self.addi] = self.cpu_addi

    def cpu_prn(self, operand_a, operand_b): 
        print(f'{self.register[operand_a]}')
        self.program_counter += 2

    def cpu_ldi(self, operand_a, operand_b): 
        self.register[operand_a] = operand_b
        self.program_counter += 3

    def cpu_push(self, operand_a, operand_b):
        ram_index = self.register[7]
        self.ram[ram_index] = self.register[operand_a]
        self.register[7] -= 1  
        self.program_counter += 2

    def cpu_pop(self, operand_a, operand_b):
        self.register[7] += 1
        ram_index = self.register[7]
        self.register[operand_a] = self.ram[ram_index]
        self.program_counter += 2

    def cpu_call(self, operand_a, operand_b):
        ram_index = self.register[7]
        pc2 = self.program_counter + 2
        self.ram[ram_index] = pc2
        self.register[7] -= 1
        self.program_counter = self.register[operand_a]

    def cpu_ret(self, operand_a, operand_b):
        self.register[7] += 1
        ram_index = self.register[7]
        self.program_counter = self.ram[ram_index]

    def cpu_jmp(self, operand_a, operand_b):
        self.program_counter = self.register[operand_a]

    def cpu_jeq(self, operand_a, operand_b):
        if self.register[6] == self.halt:
            self.cpu_jmp(operand_a, operand_b)
        else:
            self.program_counter += 2

    def cpu_jne(self, operand_a, operand_b):
        equality = self.register[6] & self.halt
        if equality == 0:
            self.cpu_jmp(operand_a, operand_b)
        else:
            self.program_counter += 2

    def cpu_addi(self, operand_a, operand_b):
        pc1 = self.program_counter+1
        pc2 = self.program_counter+2
        i_register = self.ram_read(pc1)
        immediate_value = self.ram_read(pc2)
        self.register[i_register] = immediate_value
        self.program_counter += 3

    def cpu_add(self, operand_a, operand_b):
        self.alu("ADD", operand_a, operand_b)
        self.program_counter += 3

    def cpu_sub(self, operand_a, operand_b):
        self.alu("SUB", operand_a, operand_b)
        self.program_counter += 3

    def cpu_mul(self, operand_a, operand_b):
        self.alu("MUL", operand_a, operand_b)
        self.program_counter += 3

    def cpu_div(self, operand_a, operand_b):
        self.alu("DIV", operand_a, operand_b)
        self.program_counter += 3

    def cpu_cmp(self, operand_a, operand_b):
        self.alu('CMP', operand_a, operand_b)

    def ram_read(self, address_to_read):
        return self.ram[address_to_read]

    def ram_write(self, value_to_write, address_to_write):
        self.ram[address_to_write] = value_to_write
        pass

    def alu(self, operation, ra, rb):
        """ALU operations."""

        if operation == "ADD":
            self.register[ra] += self.register[rb]
        elif operation == "SUB":
            self.register[ra] -= self.register[rb]
        elif operation == "MUL":
            self.register[ra] *= self.register[rb]
        elif operation == "DIV":
            self.register[ra] /= self.register[rb]
        elif operation == "CMP":
            if self.register[ra] > self.register[rb]:
                self.register[6] = 0b00000010
                self.program_counter += 3
            elif self.register[ra] < self.register[rb]:
                self.register[6] = 0b00000100
                self.program_counter += 3
            elif self.register[ra] == self.register[rb]:
                self.register[6] = self.halt
                self.program_counter += 3
        else:
            raise Exception("Unsupported ALU operation")

    def dispatcher(self, i_register, a, b):
        self.bt[i_register](a, b)

    def trace(self):
        """
        Handy function to print out the CPU state. You might want to call this
        from run() if you need help debugging.
        """
        pc1 = self.program_counter + 1
        pc2 = self.program_counter + 2
        print(f"TRACE: %02X | %02X %02X %02X |" % (
            self.program_counter,
            self.ram_read(self.program_counter),
            self.ram_read(pc1),
            self.ram_read(pc2)
        ), end='')

        for i in range(8):
            print(" %02X" % self.register[i], end='')
        print()

    def load(self):
        """Load a program into memory."""

        if len(sys.argv) is not 2:
            print(f"{sys.argv[0]}")
            sys.exit(1)

        try:
            address = 0
            program_name = sys.argv[1]

            with open(program_name) as opened_file:
                for single_line in opened_file:
                    x = single_line.split("#", 1)[0]

                    if x.strip() == '':
                        continue
                    x = '0b' + x
                    self.ram[address] = int(x, 2)
                    address += 1

        except FileNotFoundError:
            print(f"{sys.argv[0]}:  {sys.argv[1]} is not found.")
            sys.exit(2)

    def run(self):
        running = True
        while running:

            i_register = self.program_counter
            operand_a = self.ram_read(i_register + 1)
            operand_b = self.ram_read(i_register + 2)
            if self.ram[i_register] == self.halt:
                running = False
            else:
                self.dispatcher(self.ram[i_register], operand_a, operand_b)
