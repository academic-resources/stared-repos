# Sentence Generation with Markov Chains

This is a fun little technique that you can use to generate gobbledegook
sentences that sound real while making absolutely no sense.

The idea is that you analyze some input text, and for every word, you
keep track of all the words that appear _after_ it in the text.

For example, the paragraph:

```
Cats and dogs and birds and fish dogs birds
```

could be represented:

```
Word     Can be followed by
-------- ------------------
Cats     and
and      dogs birds fish
dogs     and birds
birds    and
fish     dogs
```

Once you have that data, you can construct random sentences, by
following the chain.

Choosing a word at random to start, `birds`, we see it can only be
followed by `and`, so we have:

```
birds and
```

Then we look at see what `and` can be followed by. Looks like `dogs`,
`birds` or `fish`.

So we choose one at random, say `fish`, and we get:

```
birds and fish
```

And then we see what `fish` can be followed by, and so on, until we
decide to stop.

## Tasks

1. Read the file `input.txt` and split it into words.

   Don't worry about changing punctuation or capitalization. For
   example, a "word" might be `"Hello,`. Just leave it all in there.

2. Analyze the text, building up the dataset of which words can follow
   particular words.

   (Hint: leave duplicates in for this part. If a the word `and` is seen
   following the word `goats` multiple times, include all those `and`s.
   It'll give more convincing results because it is modelling the
   _frequency_ of _how often_ a word follows another word.)

3. Choose a random "start word" to begin.

4. Loop through:

   * Print the word.
   * If it's a "stop word", stop.
   * Else randomly choose a word that can follow this one.

Start words are words that begin with a capital, or a `"` followed by a
capital.

Stop words are words that end in any of the punctuation `.?!`, or that
punctuation followed by a `"`.

Hints:

* `random.choice()` can choose a random word out of a list.
* `print(s, end=" ")` will print a space after every word instead of a
  newline.

There is no test file for this. Just see if it makes good nonsense.

## Example Output

```
Alice: "warmer, in some part that was very anxious about Looking-glass
House, if you'll only attend, Kitty, they couldn't, because there are
the question: it wants plenty of mist now, I wonder if he was through
the wrong way, beginning to the other," Alice on as she said afterwards
that Alice watched the table, and the table by the King took no one paw
went round the fire, as far better manners! 

Red Queen, looking over him, and tangles, with the White King, so angry,
Kitty," Alice picked up snug, you were playing just see one she hardly
hold you! 

I'll be quite common and putting out of things?" 

House! 

Well then, and unhappy, and made her sister, who was the autumn, when
the ashes, "Mind the worsted Alice was so wish I shall never, never
forget!" 
```

## Stretch Goals

Make sure there is always a close quote for an opening quote in the
sentence.