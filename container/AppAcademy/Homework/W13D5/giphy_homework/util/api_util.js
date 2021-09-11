
export const fetchSearchGiphys = (searchTerm) => {
  let APIKey = ''
  return $.ajax({
    method: 'GET',
    dataType: 'json',
    // url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=2`
    url: `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${searchTerm}&limit=2&offset=0&rating=G&lang=en`

  })
}