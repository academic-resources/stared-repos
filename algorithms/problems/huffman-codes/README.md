# Huffman Codes

Huffman codes compress data very effectively: savings of 20% to 90% are typical, depending on the charactersitics of the data being compressed.

We consider the data to be a sequence of character. Huffman's *greedt algorithm* uses a table giving how often each character occurs (i.e., its frequency) to build up an optimal way of representingv each character as a binary string.
