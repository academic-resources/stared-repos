class StringBuilder:

    def __init__(self):
        self.store = []
        self.size = 0

    def append(self, item):
        self.store.append(str(item))
        self.size += len(item)

    def build(self):
        return ''.join(self.store)

    def __len__(self):
        return self.size

