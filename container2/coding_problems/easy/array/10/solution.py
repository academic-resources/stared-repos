def caesarCipherEncryptor(string, key):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
		cipherLetter = lambda x: alphabet[(alphabet.index(x) + key) % len(alphabet)] 
    return ''.join([cipherLetter(x) for x in string])
