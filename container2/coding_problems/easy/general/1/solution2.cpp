#include <vector>
#include <algorithm>


// O(n log(n)) time | O(1) space

vector<int> twoNumberSum(vector<int> array, int targetSum)
{
	sort(array.begin(), array.end());  // O(n log(n))
	
	int left = 0;
	int right = array.size() - 1;
	int currentSum;
	while (left < right)
	{
		currentSum = array[left] + array[right];
		if (currentSum == targetSum)
			return vector<int>{array[left], array[right]};
		else if (currentSum < targetSum)
			left++;
		else if (currentSum > targetSum)
			right--;
	}
	return {};
}
