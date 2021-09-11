/**
 * Given an array of integers, return indices of the two numbers such that they insert up to a specific target.
 You may assume that each input would have exactly one solution, and you may not use the same element twice.

 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

twoSum = (nums, target) => {
    let dict = {};
    let result;
    nums.map((curr, index) => {
        if ((target - curr) in dict){
            result = [dict[target - curr], index]
        }else{
            dict[curr] =index
        }

    });
    if (result !== null){
        return result;
    }else{
        return []
    }

};
nums = [2, 7, 11, 15];
target = 9;
console.log(twoSum(nums, target));