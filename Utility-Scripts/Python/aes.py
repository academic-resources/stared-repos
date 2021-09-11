#!/usr/bin/python3

# Requires PyCrypto

from Crypto.Cipher import AES
from Crypto import Random

class AESCipher:
    def __init__( self, key ):
        """
        Requires hex encoded param as a key
        """
        self.key = key

    def pad(self, data):
        length = 16 - (len(data) % 16)
        data += bytes([length])*length
        return data

    def unpad(self, data):
        return data[:-data[-1]]

    def encrypt( self, raw ):
        """
        Returns hex encoded encrypted value!
        """
        raw = raw.encode('utf-8')
        raw = self.pad(raw)
        iv = Random.new().read(AES.block_size);
        cipher = AES.new( self.key, AES.MODE_CBC, iv )
        return ( iv + cipher.encrypt( raw ) )

    def decrypt( self, enc ):
        """
        Requires hex encoded param to decrypt
        """
        iv = enc[:16]
        enc= enc[16:]
        cipher = AES.new(self.key, AES.MODE_CBC, iv )
        return self.unpad(cipher.decrypt( enc))

if __name__== "__main__":
    
    key = ""
    while len(key) < 32:
    	key = input("Enter Key of length 32: ")
    	if len(key) < 32:
    		print("Key length short")

    key=key[:32]
    enc = AESCipher(key)
    msg = input("Message: ")
    ciphertext = enc.encrypt(msg)
    print(ciphertext)
    decryptor = AESCipher(key)
    plaintext = decryptor.decrypt(ciphertext)
    print (plaintext)