#include <vector>
#include <unordered_set>
using namespace std;

// O(n) time | O(n) space

vector<int> twoNumbersSum(vector<int> array, int targetSum)
{
	unordered_set<int> nums;
	for (int num : array)
	{
		int potentialMatch = targetSum - num;
		if (nums.find(potentialMatch) != nums.end())
		{
			return vector<int>{num, potentialMatch};
		}
		else
		{
			nums.insert(num);
		}
	}
	return vector<int>{0, 0}
}
