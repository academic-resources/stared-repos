const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const hammerTime = time => {
  setTimeout(() => alert(`${time} is hammertime!`), time)
}

reader.question('Would you like some tea? (Y/N)', answer1 => {
  console.log(`You replied ${answer1}.`)
  reader.question('Would you like some bicuits? (Y/N)', answer2 => {
    const yesNo1 = answer1.toLowerCase() === 'n' ? "don't" : 'do'
    const yesNo2 = answer2.toLowerCase() === 'n' ? "don't" : 'do'
    console.log(`So you ${yesNo1} want tea and you ${yesNo2} want biscuits.`)
    reader.close()
  })
})
