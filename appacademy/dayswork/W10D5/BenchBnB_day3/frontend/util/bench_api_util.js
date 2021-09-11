export const fetchBenches = filters =>
  $.ajax({
    method: 'GET',
    url: 'api/benches',
    data: filters
  })

export const createBench = bench =>
  $.ajax({
    method: 'POST',
    url: 'api/benches',
    data: bench
  })
