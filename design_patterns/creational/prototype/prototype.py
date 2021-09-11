from __future__ import annotations
from abc import ABC, abstractmethod


class Tool(ABC):
    """Client interface"""
    drawing = []

    @abstractmethod
    def manipulate(self):
        pass


class GraphicTool(Tool):
    """Client"""
    __drawing = []

    def __init__(self, graphic_prototype=None):
        self._graphic = graphic_prototype

    @property
    def graphic(self) -> Graphic:
        return self._graphic

    @graphic.setter
    def graphic(self, graphic_prototype):
        self._graphic = graphic_prototype

    def manipulate(self):
        print("GraphicTool is drawing...")
        p = self.graphic.clone()
        p.draw(len(self.__drawing) + 1)
        self.__drawing.append(p)


class Graphic(ABC):
    """Prototype"""

    @abstractmethod
    def draw(self, position):
        pass

    @abstractmethod
    def clone(self):
        pass


class Staff(Graphic):
    """Concrete Prototype"""
    def __init__(self, color="grey"):
        self._color = color

    @property
    def color(self) -> str:
        return self._color

    @color.setter
    def color(self, color):
        self._color = color

    def draw(self, position):
        print(f"drawing a {self.color} Staff at position {position}.")

    def clone(self):
        return Staff(self.color)


class MusicalNote(Graphic):
    """Concrete Prototype"""

    def __init__(self, color="black", duration=1.0):
        self._color = color
        self._duration = duration

    @property
    def color(self) -> str:
        return self._color

    @property
    def duration(self) -> float:
        return self._duration

    @color.setter
    def color(self, color):
        self._color = color

    def draw(self, position):
        print(f"drawing a {self.color} MusicalNote at position {position}")

    def clone(self):
        return MusicalNote(self.color, self.duration)


def client_code():
    client = GraphicTool()
    whole_note = MusicalNote(duration=1.0)
    half_note = MusicalNote(duration=0.5)
    staff = Staff()

    client.graphic = whole_note
    client.manipulate()

    client.graphic.color = 'red'
    client.manipulate()

    client.graphic = staff
    client.manipulate()

    client.graphic = half_note
    client.manipulate()


if __name__ == "__main__":
    client_code()
