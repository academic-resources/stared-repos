#include <stdio.h>
#include <vector>

std::vector<int> arr = {1,3,4,5,6,8,9,10,12,14};
int K = 10; // 1, 9

int main()
{
    int i = 0;
    int j = arr.size();
    
    while (i < j)
    {
        int sum = arr[i] + arr[j];

        if (sum == K)
        {
            printf("A[%d] (%d) + A[%d] (%d) \n", i, arr[i], j, arr[j]);
            i++;
            j--;
        }
        else if (sum > K)
        {
            j--;
        }
        else
        {
            i++;
        }
    }
    return 0;
}
