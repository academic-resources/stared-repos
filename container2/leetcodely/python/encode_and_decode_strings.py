"""Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and
is decoded back to the original list of strings."""


class Codec:

    def encode(self, strs):
        """Encodes a list of strings to a single string.

        :type strs: List[str]
        :rtype: str
        """
        if not strs:
            return ' /*/ '
        modified = [s.replace('*', '**') for s in strs]
        return ' /*/ '.join(modified)

    def decode(self, s):
        """Decodes a single string to a list of strings.

        :type s: str
        :rtype: List[str]
        """
        original = s.split(' /*/ ')
        return [s.replace('**', '*') for s in original]


