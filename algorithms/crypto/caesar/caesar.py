class CaesarCipher:
  """Encryption and decryption using Caesar Cipher"""
  
  def __init__(self, shift):
    encoder = [None] * 26
    decoder = [None] * 26
    for k in range(26):
      encoder[k] = chr((k + shift) % 26 + ord('A'))
      decoder[k] = chr((k - shift) % 26 + ord('A'))
    self._forward = ''.join(encoder)
    self._backward = ''.join(decoder)
    
  def encrypt(self, message):
    return self._transform(message, self._forward)

  def decrypt(self, secret):
    return self._transform(secret, self._backward)

  def _transform(self, original, code):
    msg = list(original)
    for k in range(len(msg)):
      if msg[k].isupper():
        j = ord(msg[k]) - ord('A') # index from 0 to 25
        msg[k] = code[j] # replace this character
    return ''.join(msg)
    
if __name__ == '__main__':
  cipher = CaesarCipher(3)
  message = "THIS IS A SECRET, BY NACHO"
  code = cipher.encrypt(message)
  print('Secret:', code)
  answer = cipher.decrypt(code)
  print('Message:', answer)