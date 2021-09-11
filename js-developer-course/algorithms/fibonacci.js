function* fibonacci() { // a generator function
	let [prev, curr] = [0, 1];
	while (true) {
		[prev, curr] = [curr, prev + curr];
		yield curr;
	}
}

for (const n of fibonacci()) {
	console.log(n);
	if (n >= 1000) {
		// truncate sequence at 1000
		break;
	}
}
