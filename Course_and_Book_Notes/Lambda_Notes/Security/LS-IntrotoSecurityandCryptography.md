### Threat model

What is the context of security that I'm facing, the application is facing, the user is facing?

1. Who are your adversaries - who do you trust and who do you not trust?
   - You have to trust whatever cloud service(s) you're using
2. Attack surface - what is exposed? What's most vulnerable to attack? What live services are you running, what ports do they have open, what are they doing?
3. Attack vector - how can things be attacked? How do you take data in, how do you authenticate users?

Thinking about adversaries, attack surface, and attack vector is how you build your threat model.

## Common risks facing a user (Three categories):

### Confidentiality/Privacy:

Making sure that your information is only shown to the parties you want it to be shown to.

### Integrity/Authenticity:

Having the data or information be shown and given to others or received in an unaltered fashion.

### Availability:

Having the service be up and work/respond/have data (not losing data). Availability attacks are often forms of extortion.

### Ransomware:

Takes over your computer, takes your data, encrypts it so you can't get at it, and extorts you for it.

### Man in the Middle Attack:

Person intercepting communications between two people and at the very least listening in (violating confidentiality). Could change what one sends to the other, violating integrity/authenticity.

### Denial of Service (Distributed Denial of Service/DDOS):

Attacker has control of a botnet (group of compromised computers). No particular pattern to IP addresses, so can't mitigate DDOS easily. Content distribution networks help mitigate and scale DDOS attacks.

### Malware/Backdoors:

How you end up joining a botnet. Pretty much anyone with a computer is a target for these. There are also high value targets. As a developer, you're a mid-value target because if you can be compromised and they can use that compromise of you to further attack users of your applications.

## Code Injection:

Class of exploits.
Don't blindly trust user input.

### Cross-site scripting:

By putting user modified code on the webpage, they might be able to embed Javascript from their other place and use it to grab cookies, etc.

## Buffer overflows

If your program allows the user to potentially make something (a variable) that grows outside of the space you perscribe for it because you don't make specific guards for it, they could put code in that ends up in your C program and executing.

## Rootkits

How you end up in a botnet. This is what you get installed on your computer when you click that bad email, etc.

# Defenses Against Attacks:

Setting good passwords

- Don't think about them as passwords, think of them as pass phrases
- One word, even if you mess with it, isn't hard for a computer to guess
- If you pick a pass phrase and even if every word in the phrase is a common word stuck together, it's difficult for a computer to crack
- Important to be random (your favorite quote is guessable)

## Firewalls:

Not as cool as on TV, but still important.
Having the same policy for what services you have open to be implemented - what services and ports you allow requests to come in on and what you don't.

## Sanitizing input:

If it comes from a user, don't trust it.
If possible, the code you run if you're interacting with a database should be prepared statements or something that is guaranteed to be safe on the database. Users will still do things that will affect what you put in the database, but they shouldn't be giving you anything that will affect the actual interaction with the database.

## Isolation and Permissions:

Use containers and the Content Security Policy.

The Content Security Policy allows you to specify what resources are allowed to interact or be loaded on your webpage. It's a way to mitigate cross-site scripting.

Containers are like lightweight virtual machines that let you isolate different processes so they don't know about each other.

Maybe something still gets attacked, but it knows less.

## Encryption:

Important to encrypt your data.
Can give confidentiality and integrity.
Should be encrypted at REST (where it's saved in your database) and also encrypted in transit (going from Point A to Point B)

## Defense in Depth:

Practice where you do all of the above.
Idea is you want to prevent attacks in as many levels and ways you can because they're going to happen and when they happen, you want to limit their damage.

There will be flaws in your defenses, but if you have another layer of defense below that, you might still be okay.

# XOR:

Exclusive or.
Only true when it's strictly A or B
The way a lot of people view 'or' when they're using the word 'or'.

## What makes XOR so important?

Powers one-time pads.

Basically, the idea behind cryptography in general: Good cryptography comes down to good randomness.

In principle, and has been done in practice for centuries, if two groups or people want to communicate securely and both have a shared secret beforehand they can agree on (same copy of a book word for word), they can use that as data to XOR with their message.

If you guarantee that only these two people know the key, this sort of communication has perfect security.

Pad has to be as long or longer than the message you're encrypting and you can't reuse the pad.

If you're using the same pad, it's vulnerable to the Man in the Middle attack.
31:33

# Cryptography

## XOR Cipher

Example of using XOR:

```
message = 'foo'

pad = 'bar'

cipher = [ord(a) ^ ord(b) for a, b, in zip(message, pad)]

cipher
[4, 14, 29]

ciphertext = ''.join([chr(c) for c in cipher])

ciphertext
'\x04\x0e\x1d'

decrypted = [ord(a) ^ ord(b) for a, b in zip(ciphertext, pad)]

decrypted
[102, 111, 111]

plaintext = ''.join([chr(c) for c in decrypted])

plaintext
'foo'
```

The way cryptography works in general is not a lot different than this.

## How does encryption work?

We exchange keys and these keys are used as seeds for random number generators. A random number generator takes a little bit of something like a key and expands it into a lot more of psuedo-randomness that's supposed to still behave a lot like real randomness but was generated by this algorithm.

After that, it's not just XOR, but XOR is at the heart of a lot of encryption. The secret and the quality of the encryption comes down to the quality of the randomness and it's like a one time pad.

## Basic operations:

### Hash functions:

Take input and output a digest that looks like gobbledygook.
The idea is that it should be a one-way function.
A lot of package managers provide a hash to confirm that what they send and what you receive are the same.

### Signing

If you take the data you want to sign and then encrypt using your private key and attach it to the data as a certificate, the person who receives the signed data (the data plus the encrypted version of the hash) can take your public key and decrypt it. They independently calculate using the same hash function their version of the hash of the data and they see if the version they get from your signature equals that and then they know that the data is what you said it was and that you're who you say you are.

### Encrypting

If you generate a key and you have a secret message and then you generate a nonce and click encrypt, you get ciphertext.

### Verifying

### Decrypting

If somebody else pastes in the ciphertext, key, and nonce, and decrypt, they get the secret message.

Key stays the same and both members of the exchange have the key.
Nonces are used once. You change them every time to make it harder for an attacker to track patterns and figure out what the secret key is.

## Symmetric Cryptography:

Both parties have the same key

## Asymmetric Cryptopgraphy:

Whenever you generate a secret key, you also generate a public key.
Generates ciphertext and a nonce, sends them to someone else
Everyone needs to know the public key of the other participant

### Public key infrastructure

How your OS and browser knows what to trust and what not to.
Certificate authorities are trusted to keep secure keys and use their secure keys to sign the keys they give to other people.
Browsers and operating systems then put a list of the certificate authorities they trust into their products.

No end-user setup. If you trust your vendor, pretty secure.
Downside is centralization - if one certificate authority gets hacked, can be really bad.

### Web of Trust:

Idealized model for tools like GPG (open-source version of PGP - pretty good privacy). People make their own keypairs and manage their own keypairs, go to key signing parties and sign keys for their friends to verify keys come from their friends, etc.

If you trust your friend's keys and you see them signing other keys, you trust those keys, etc.

### Keybase:

Tries to make key management and key signing parties more manageable. You post your proof that verifies you hold a public key on your social media

# What do you need to know about cryptography as a developer?

1. How to pick the right protocols, tools, parameters
   Complicated. Good start is http://www.daemonology.net/blog/2009-06-11-cryptographic-right-answers.html
   Don't need to understand or read all of it - a little outdated, but it's a good start

   TweetNaCl is a good tool that makes a lot of decisions for you.

   NIST provides recommendations for how long you should make your keys: https://www.keylength.com/en/4/

   Don't build your own crypto unless you specialize and go into that area. Established crypto code is well-established

2. Use OAuth integrated log-ins (OAuth2):
   Open standard for authorization and logging in
   Allows you to provide the login framework and rely on companies like Google, Facebook, Twitter, Amazon, Apple, etc. to maintain user accounts and handle password resets, etc.
   When you can use it, it's good to.

3. Personal security is important - keep your own secret safe.
   Turn on encryption on your local system
   Use pass phrases not passwords
   Use backups, encrypt them
4. Use SSL
   It's free and easy (Let's Encrypt)
   There are packages that integrate with pretty much all frameworks and languages
   Trusted in browsers
   Use SSL for all production systems
   Production could mean internal systems that are on the open internet as well as something that users use
5. Public-private key pairs to log into things
   Much better than pass phrases because it's longer than any pass phrase you're going to remember
6. Two Factor/multi-factor authentication
   Gold standard is thing you know (pass phrase), thing you have (phone/fob), thing you are (fingerprint, face, etc.)
   Not really any common things that support all things
   Damage of losing your pass phrase is lessened when you have multiple methods of authentication
7. Don't reuse the same passphrase for everything
   Have a few very good passphrases and use a password manager to maintain very long random passwords for everything else
8. Check signatures when installing software

## Future of Software Security:

Cryptocurrency built off the same cryptographic primitives - hash functions.
Goal is different - not just two people passing messages, you're trying to create a decentralized global and usually public transaction ledger that's a list of numbers and time stamps. This list is something everyone knows and agrees on but no group owns it and can change it.

Why does this matter?
Money, the entirety of finance, is basically a list of transactions.
To dencentralize that means we don't have to trust and pay for banks to be these entities that manage this and instead it's out there and people use it.

Lots of things you can represent as a ledger of transactions:
Tickets
News stories
Communication

    Public aspect of the ledger means you probably want to encrypt communication on it.

## Newer cryptocurrencies:

### Etherium

- More sophisticated scripting than bitcoin - can program logic into the things on the blockchain to create contracts enforced by conditional logic.
- Can be guaranteed that the agreement will be enforced but without having to trust a third party

### Proof of Work:

Most blockchains use that to provide an incentive for miners to actually run the code to make the crypto work and be trustworthy.

## Quantum Cryptography:

### The impact of quantum computation on regular cryptography.

If and when quantum computing gets powerful enough and big enough to work at a large enough scale to do things to attack the sides of cryptographic problems, hash functions are no longer so one-way.

Not true for every hash function.

Post-quantum cryptography - trying to figure out what hash functions and schemes will survive a post-quantum world and what won't.

Even when it comes, will be held by large organizations at first but the rest of us will want cryptography that still works.
