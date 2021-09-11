from __future__ import annotations
from abc import ABC, abstractmethod

class WidgetFactory(ABC):
    @abstractmethod
    def create_scrollbar(self) -> ScrollBar:
        pass

    @abstractmethod
    def create_window(self) -> Window:
        pass

class MotiWidgetFactory(WidgetFactory):
    def create_scrollbar(self) -> MotiScrollBar:
        return MotiScrollBar()

    def create_window(self) -> MotiWindow:
        return MotiWindow()

class PMWidgetFactory(WidgetFactory):
    def create_scrollbar(self) -> PMScrollBar:
        return PMScrollBar()

    def create_window(self) -> PMWindow:
        return PMWindow()

class Window(ABC):
    @abstractmethod
    def whoami(self) -> str:
        pass

class MotiWindow(Window):
    def whoami(self) -> str:
        return "MotiWindow"

class PMWindow(Window):
    def whoami(self) -> str:
        return "PMWindow"

class ScrollBar(ABC):
    @abstractmethod
    def whoami(self) -> str:
        pass

class MotiScrollBar(ScrollBar):
    def whoami(self) -> str:
        return "MotiScrollBar"

class PMScrollBar(ScrollBar):
    def whoami(self) -> str:
        return "PMScrollBar"


# PLAYING WITH EXAMPLE

def client_code(factory: WidgetFactory) -> None:
    """
    Client code works only with factories and products through abstract types.
    This lets you pass any factory or product subclass to the client code
    without breaking it.
    """
    window = factory.create_window()
    scrollbar = factory.create_scrollbar()
    
    print(f"{window.whoami()}")
    print(f"{scrollbar.whoami()}", end="\n")

if __name__ == "__main__":
    """
    Client code can work with any concrete factory class
    """
    print("Client: testing client code with MotiWidgetFactory type:")
    client_code(MotiWidgetFactory())

    print("Client: testing client code with PMWidgetFactory type:")
    client_code(PMWidgetFactory())

