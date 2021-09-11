from __future__ import annotations

class Application():
    """Creator - Interface"""
    documents = []

    def create_document(self) -> Document:
        return Document()

    def new_document(self):
        doc = self.create_document()
        self.documents.append(doc)
        print("Saved new document")

    def open_document(self):
        pass

class Document():
    """Product - Interface"""

    def open(self):
        pass

    def close(self):
        pass

    def save(self):
        pass

    def revert(self):
        pass

class MyApplication(Application):
    """Concrete Creator"""

    def create_document(self) -> MyDocument:
        return MyDocument()

class MyDocument(Document):
    """Concrete Product"""

    def open(self):
        return "My application-specific document"

def client_code():
    """ Demo code """

    myCreator = MyApplication()
    myCreator.new_document()
    print(myCreator.documents)

if __name__ == "__main__":
    client_code()
