const fibo = { 1: 0, 2: 1}

function getNthFib(n) {
  if (fibo.hasOwnProperty(n)) return fibo[n]

  if (fibo[n-1]) return fibo[n-1] + fibo[n-2]


  fibo[n-1] = getNthFib(n-1)
	fibo[n-2] = getNthFib(n-2)
	fibo[n] = fibo[n-1] + fibo[n-2]
	return fibo[n]
}
