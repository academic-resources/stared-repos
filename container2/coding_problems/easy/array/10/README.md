# Caesar Cipher Encryptor

Given a non-empty string of lowercase letters and a non-negative integer k representing a key, write a function that returns a new string obtainer by shifting every letter in the input string by k positions in the alphabet, where k is the key.

Note that letters should 'wrap' around the alphabet, in other words, letter 'z' shifted by one returns a letter 'a'.

```python
input = 'xyz'
key = `2`
# Expected output: `zab`
```

* Optimal Time: O(n), where is the length of the input string.
* Optimal Space: O(n)
