# # Given an array of size N containing only 0s, 1s, and 2s; sort the array in ascending order.

# # Input:
# # N = 5
# # arr[]= {0 2 1 2 0}
# # Output:
# # 0 0 1 2 2
# # Explanation:
# # 0s 1s and 2s are segregated
# # into ascending order.

# def sort012(arr):
#     sample={}
#     result=[]
#     for index in arr:
#         if index in sample.keys():
#             sample[index]+=1
#         else:
#             sample[index]=1

#     for temp in range(sample[0]):
#         result.append(0)


#     for temp in range(sample[1]):
#         result.append(1)

#     for temp in range(sample[2]):
#         result.append(2)


#     for printing in result:
#         print(printing,end=" ")


# arr= [0,2,1,2,0]
# sort012(arr)


class Solution:
    def sort012(self, arr, n):
        sample = {}
        result = []
        for index in arr:
            if index in sample.keys():
                sample[index] += 1
            else:
                sample[index] = 1

        for temp in range(sample[0]):
            result.append(0)

        for temp in range(sample[1]):
            result.append(1)

        for temp in range(sample[2]):
            result.append(2)

        arr = []
        arr = result

        return arr


if __name__ == "__main__":
    t = int(input())
    for _ in range(t):
        n = int(input())
        arr = [int(x) for x in input().strip().split()]
        ob = Solution()
        arr = ob.sort012(arr, n)
        for i in arr:
            print(i, end=" ")
        print()
