from abc import ABC, abstractstaticmethod

class RTFReader:
    """ Director """
    __builder = None

    def SetBuilder(self, builder):
       self.__builder = builder

    def ParseRTF(self, body):
        for token in body:
            if token == 'CHAR':
               self.__builder.ConvertCharacter(token)
            if token == 'FONT':
               self.__builder.ConvertFontChange(token)
            if token == 'PARA':
               self.__builder.ConvertParagraph()


class TextConverter(ABC):
  """ Builder Interface"""

  @abstractstaticmethod
  def ConvertCharacter(self, char):
      pass

  @abstractstaticmethod
  def ConvertFontChange(self, Font):
      pass

  @abstractstaticmethod
  def ConvertParagraph(self):
      pass

class ASCIIConverter(TextConverter):
    """
    ASCII Concrete Builder,
    ignores request to convert anything except plain text.
    """

    def ConvertCharacter(self, char):
        print("ASCII converted character")

    def ConvertFontChange(self, Font):
        print("ASCII does not support conversion for Font")

    def ConvertParagraph(self):
        print("ASCII does not support conversion for paragraphs")

    def GetASCIIText(self):
        print("ASCII representation")

class TeXConverter(TextConverter):
    """
    TeX Concrete Builder
    """

    def ConvertCharacter(self, char):
        print("TeX converted character")

    def ConvertFontChange(self, Font):
        print("TeX converted Font")

    def ConvertParagraph(self):
        print("TeX converted paragraph")

    def GetTeXText(self):
        print("TeX representation")

class TextWidgetConverter(TextConverter):
    """
    Text Widget Concrete Builder
    """

    def ConvertCharacter(self, char):
        print("Text Widget converted character")

    def ConvertFontChange(self, Font):
        print("Text Widget converted Font")

    def ConvertParagraph(self):
        print("Text Widget converted Paragraph")

    def GetTextWidget(self):
        print("Text Widget representation")


def clientCode():
    """
    Client code executed as example
    """
    demoTokens = ['CHAR', 'FONT', 'PARA']

    rtfReader = RTFReader()
    asciiConverter = ASCIIConverter()
    texConverter = TeXConverter()
    textWidgetConverter = TextWidgetConverter()

    rtfReader.SetBuilder(asciiConverter)
    asciiText = rtfReader.ParseRTF(demoTokens)

    rtfReader.SetBuilder(texConverter)
    texText = rtfReader.ParseRTF(demoTokens)

    rtfReader.SetBuilder(textWidgetConverter)
    textWidgetText = rtfReader.ParseRTF(demoTokens)

if __name__ == "__main__":
    clientCode()
