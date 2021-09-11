/**
 * @param {string} initial
 * @param {string} goal
 * @return {number}
 */

function minimumConcat(initial, goal) {
    
	let i
	let j = 0
	let foundInvalidCharacter = false
	let currentSubseq
	let minSubseqs = []
	
	while (j < goal.length && !foundInvalidCharacter)
	{
		i = 0
		currentSubseq = []
		while (i < initial.length)
		{
			if (initial[i] === goal[j])
			{
				currentSubseq.push(initial[i])
				j++
			}
			i++
		}
		
		if (currentSubseq.length === 0)
		{
			foundInvalidCharacter = true
		}
		else
		{
			minSubseqs.push(currentSubseq)
		}
	}

	return !foundInvalidCharacter && minSubseqs.length > 0 ? minSubseqs.length : -1
}

var initial = 'xyz';
var goal = 'xzyxz';
console.log(minimumConcat(initial, goal));
