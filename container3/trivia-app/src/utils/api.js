import he from 'he'

export function fetchQuestions() {
  const endpoint = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`
  return fetch(endpoint)
    .then(results => results.json())
    .then(data => {
      if (!data.results)
        throw new Error("Unable to reach API, please try again later.")
      // Iterate over each question and remove encoded characters
      const results = [
        ...data.results.map(q => {
          // decode encoded questions using the library he
          return { ...q, question: he.decode(q.question) }
        })
      ];
      return results
    })
}
