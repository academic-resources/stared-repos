from datetime import datetime

class Machine:
    architecture = 'Von Neumann'
    
    def __init__(self, os):
        print(f'[Machine] Constructor invoked for instance {self}')
        self.os = os

    @classmethod
    def get_architecture(cls):
        print(f'[Machine - @classmethod] Architecture for our machines is: {cls.architecture}')

    @staticmethod
    def get_timestamp():
        print(f'[Machine - @staticmethod] {datetime.now()}')

    @property
    def os(self):
        print(f'[Machine @property.getter] - Machine OS: {self._os}')
        return self._os

    @os.setter
    def os(self, value):
        print(f'[Machine @property.setter] - Setting machine os to: {value}')
        self._os = value

class SmartMachine(Machine):

    def __init__(self, os):
        print(f'[SmartMachine] Invoking constructor for instance {self}')
        super().__init__(os)

    def saySomething(self):
        print(f'[SmartMachine] I am a smart machine running on {self.os}')




def main():
    sm = SmartMachine('MacOS')
    sm.saySomething()

main()

