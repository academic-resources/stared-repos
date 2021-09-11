export const fetchBenches = (bounds) => (
  $.ajax({
    method: 'GET',
    url: `api/benches?bounds=${JSON.stringify(bounds)}`
  })
)

