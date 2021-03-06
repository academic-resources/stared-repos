# -*- coding: utf-8 -*-
def morse_to_text(morse):
    """Convert morse code to text.

    Args:
        morse (str): Morse code.

    Returns:
        str: Return a text.

    """
    CODE = {
        "A": ".-",
        "B": "-...",
        "C": "-.-.",
        "D": "-..",
        "E": ".",
        "F": "..-.",
        "G": "--.",
        "H": "....",
        "I": "..",
        "J": ".---",
        "K": "-.-",
        "L": ".-..",
        "M": "--",
        "N": "-.",
        "O": "---",
        "P": ".--.",
        "Q": "--.-",
        "R": ".-.",
        "S": "...",
        "T": "-",
        "U": "..-",
        "V": "...-",
        "W": ".--",
        "X": "-..-",
        "Y": "-.--",
        "Z": "--..",
        "0": "-----",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        ",": "--..--",
        ".": ".-.-.-",
        ":": "---...",
        ";": "-.-.-.",
        "?": "..--..",
        "=": "-...-",
        "'": ".----.",
        "/": "-..-.",
        "!": "-.-.--",
        "-": "-....-",
        "_": "..--.-",
        "(": "-.--.",
        ")": "-.--.-",
        "$": "...-..-",
        "&": ". . . .",
        "@": ".--.-.",
        " ": "/",
    }
    morse = morse.strip()
    msg = ""
    codes = morse.split(" ")
    for code in codes:
        msg += dict(map(lambda t: (t[1], t[0]), CODE.items()))[code]
    return msg
