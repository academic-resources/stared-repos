export const fetchSearchGiphys = searchTerm => {
  const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=m0Ah62FnVZXZDvtFf1kOROIhJwMIVdRd&limit=2`

  return $.ajax({
    method: 'GET',
    url
  })
}
