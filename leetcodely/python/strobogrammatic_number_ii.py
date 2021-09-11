"""A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).
Find all strobogrammatic numbers that are of length = n."""


class Solution(object):
    def findStrobogrammatic(self, n):
        """
        :type n: int
        :rtype: List[str]
        """
        if n <= 0:
            return []
        if n == 1:
            return ['0', '1', '8']
        base_list = ['11', '69', '96', '88', '00']

        # if n <= 0:
        #     return []
        # if n == 1:
        #     return ['0', '1', '8']
        # base_list = ['11', '69', '96', '88', '00']
        # last_list = ['0', '1', '8']
        # result_list = ['11', '69', '96', '88', '00']
        # for i in xrange(2, n):
        #     temp_list = []
        #     for base_num in base_list:
        #         for insert_num in last_list:
        #             curr_num = base_num[0] + insert_num + base_num[1]
        #             temp_list.append(curr_num)
        #     last_list = result_list
        #     result_list = temp_list
        # return [num for num in result_list if num[0] != '0']
