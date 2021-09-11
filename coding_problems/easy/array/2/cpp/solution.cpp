#include <iostream>
#include <vector>

std::vector<int> arr = {6,7,8,9,11,12,15,16,17,18, 19};
// missing 10, 13, 14

int main()
{
    int offset = arr[0];
    std::vector<int> missing;

    for (int i = 1; i < arr.size(); i++)
    {
        if (arr[i] - i > offset)
        {
            while (arr[i] - i > offset)
            {
                missing.push_back(i + offset);
                offset++;
            }
        }
    }

    for (auto num : missing)
        std::cout << num << std::endl;

    return 0;
}
