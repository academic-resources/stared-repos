// O(n) time | O(n) space

function TwoNumbersSum(array, targetSum)
{
	const found = {};
	
	for (const num of array)
	{
		if (found[targetSum - num]) return [num, targetSum - num];
		found[num] = num;
	}
	return [];
}

const demoArr = [3,5,-4,8,11,1,-1,6];
console.log(TwoNumbersSum(demoArr, 10));
