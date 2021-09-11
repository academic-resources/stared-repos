import re


def sanitize_string(string):
    return string and re.sub('\r|\n', ' ', str(string).strip())
