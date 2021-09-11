#include <iostream>
#include <vector>

std::vector<int> arr = {3,6,8,8,10,12,15,15,15,20};

int main()
{
    std::vector<int> found(arr[arr.size() - 1 - arr[0]], 0);

    for (int i = 0; i < arr.size(); i++)
    {
        found[arr[i] - arr[0]]++;
    }

    for (int j = 0; j < found.size(); j++)
    {
        if (found[j] > 1)
        {
            std::cout << j + arr[0] << " appears " << found[j] << " times." << std::endl;
        }
    }

    return 0;
}