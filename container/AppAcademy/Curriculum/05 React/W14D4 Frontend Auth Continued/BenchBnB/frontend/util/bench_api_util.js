
export const fetchBenches = () => (
  $.ajax({
    method: 'GET',
    url: '/api/benches',
    error: (err) => console.log(err) //remove later
  })
)