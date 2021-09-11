#include <iostream>
#include <vector>

std::vector<int> arr = {8,3,6,4,6,5,6,8,2,7};

int main()
{
    for (int i = 0; i < arr.size() - 1; i++)
    {
        if (arr[i] != -1)
        // -1 is our flag for "already counted as rep"
        {
            int reps = 0;
            for (int j = i + 1; j < arr.size(); j++)
            {
                if (arr[j] == arr[i])
                {
                    reps++;
                    arr[j] = -1; // set as already counted
                }
            }
            if (reps > 0)
            {
                std::cout << arr[i] << " is repeated " << reps << " times." << std::endl;
            }
        }

    }    
}