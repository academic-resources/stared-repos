
import * from cpu


class Branch_Table:
    def __init__(self, register):
        self.bt = {}
        self.register = int('0b' + register)
