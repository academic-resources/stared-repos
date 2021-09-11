#include <iostream>
#include <vector>


std::vector<int> myArr = {7, 8, 9, 11, 12, 13, 14, 15};

int main()
{
    int expectedSum = (myArr[myArr.size() - 1] * (myArr[myArr.size() - 1] + 1) - (myArr[0] - 1) * myArr[0]) / 2;
    int actualSum = 0;
    
    for (int i = 0; i < myArr.size(); i++)
        actualSum += myArr[i];
    
    int missingNumber = expectedSum - actualSum;
    std::cout << missingNumber;
    
    return 0;
}
