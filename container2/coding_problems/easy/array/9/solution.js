function findThreeLargestNumbers(array) {
	const nums = []
	array.forEach((num) => {
		for (var i = 2; i >= 0; i--) {
			if (!nums[i] || nums[i] <= num) {
				// shift right numbers to their proper position
				for (var j = 0; j < i; j++) {
					nums[j] = nums[j + 1]
				}
				// place new number in correct position
				nums[i] = num
				break
			}
		}
	})
	return nums
}

const test = [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]

console.log(findThreeLargestNumbers(test))
