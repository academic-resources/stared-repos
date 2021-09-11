/*
 * Complete the 'generate_phrases' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY phrases as parameter.
 */

function generate_phrases(input) {
  let phrases = new Set()
  for (let i = 0; i < input.length; i++) {
    let phraseArr = input[i].split(" ")
    let lastWord = phraseArr[phraseArr.length - 1]
    for (let j = 0; j < input.length; j++) {
      let otherPhraseArr = input[j].split(" ")
      let firstWord = otherPhraseArr[0]
      if (lastWord === firstWord) {
        let combinedPhraseArr = phraseArr.slice(0, phraseArr.length - 1).concat(otherPhraseArr)
        phrases.add(combinedPhraseArr.join(" "))
      }
    }
  }
  return Array.from(phrases)
}

input = [
  'mission statement',
  'a quick bite to eat',
  'a chip off the old block',
  'chocolate bar',
  'mission impossible',
  'a man on a mission',
  'block party',
  'eat my words',
  'bar of soap',
  'happy to be here'
]

input2 = [
  'writing code',
  'code rocks'
]

console.log(generate_phrases(input))
console.log(generate_phrases(input2))