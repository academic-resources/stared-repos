const isOpeningBracket = (char) => char === '(' || char === '{' || char === '[';

const isClosingBracket = (char) => char === ')' || char === '}' || char === ']';

function isBalanced(string)
{
	const stack = [];
	
	for (let char of string)
	{
		if (isOpeningBracket(char)) stack.push(char);
		if (isClosingBracket(char))
		{
			if (stack.length === 0) return false;
			if (char === ')' && stack.pop() !== '(') return false;
			if (char === '}' && stack.pop() !== '{') return false;
			if (char === ']' && stack.pop() !== '[') return false;
		}
	}
	return stack.length === 0;
}

function test()
{
	const balancedExp = '[{(a+b)*((b+c)+1)}]';
	const unbalancedExp = '[{]}';

	console.log(`balancedExp: ${isBalanced(balancedExp)}`);
	console.log(`unbalancedExp: ${isBalanced(unbalancedExp)}`);
}

test();
