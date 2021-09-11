#include <iostream>
#include <vector>

std::vector<int> arr = {6,3,8,10,16,7,5,2,9,14};
int K = 11;

int max(std::vector<int> s) {
    int M = s[0];
    for (auto num : s)
    {
        if (num > M)
        {
            M = num;
        }
    }
    return M;
}

int main()
{
    std::vector<int> found(max(arr), 0);

    for (int i = 0; i < arr.size(); i++)
    {
        if (arr[i] < K && found[K - arr[i]] > 0) {
            std::cout << arr[i] << " " << K - arr[i] << std::endl;
        }
        found[arr[i]]++;
    }

    return 0;
}
