# JWT

> JSON Web Tokens

https://jwt.io/

https://en.wikipedia.org/wiki/JSON_Web_Token#Structure

## Javascript HMAC SHA256

https://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/#js

https://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for/201510#201510


***

https://code.google.com/p/crypto-js/

https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js


https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.js
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.js


https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/core.js
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac.js
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/sha256.js


```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js"></script>

<script>
  var hash = CryptoJS.HmacSHA256("Message", "secret");
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  document.write(hashInBase64);
</script>

```
