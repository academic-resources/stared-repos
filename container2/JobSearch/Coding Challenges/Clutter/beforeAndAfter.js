function generate_phrases(phrases) {
  if (!phrases.length) return ""
  const lastWords = {}
  for (let i = 0; i < phrases.length; i++) {
    let currPhrase = phrases[i]
    let phraseArr = currPhrase.split(" ")
    var lastWord = phraseArr[phraseArr.length - 1]
    lastWords[lastWord] = currPhrase
  }

  const combinedPhrases = new Set()
  for (let i = 0; i < phrases.length; i++) {
    let currPhrase = phrases[i]
    let phraseArr = currPhrase.split(" ")
    let firstWord = phraseArr[0]
    if (lastWords[firstWord]) {
      let rightSide = phraseArr.slice(1).join(" ")
      let combinedPhrase = lastWords[firstWord] + " " + rightSide
      combinedPhrases.add(combinedPhrase)
    } else {
      combinedPhrases.add(lastWords[lastWord])
    }
  }
  return Array.from(combinedPhrases)
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

