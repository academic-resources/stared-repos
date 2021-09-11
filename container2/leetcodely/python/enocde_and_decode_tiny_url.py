"""TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl 
and it returns a short URL such as http://tinyurl.com/4e9iAk.
Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode 
algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be
 decoded to the original URL."""
import random
import string


class Codec:
    def __init__(self):
        self.map = {}
        self.host = 'https://tinyurl.com/'

    def encode(self, longUrl):
        """Encodes a URL to a shortened URL.

        :type longUrl: str
        :rtype: str
        """
        code = self.id_generator(5)
        self.map[self.host + code] = longUrl
        return self.host + code

    def decode(self, shortUrl):
        """Decodes a shortened URL to its original URL.

        :type shortUrl: str
        :rtype: str
        """
        return self.map[shortUrl]

    def id_generator(self, size):
        return ''.join([random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(size)])


# Your Codec object will be instantiated and called as such:
codec = Codec()
print(codec.decode(codec.encode('https://leetcode.com/problems/design-tinyurl')))
