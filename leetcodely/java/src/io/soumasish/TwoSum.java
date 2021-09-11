package io.soumasish;

import java.util.HashMap;
import java.util.Map;

public class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        int[] result = {-1, -1};
        Map<Integer, Integer> check = new HashMap<>();
        for(int i=0; i < nums.length; i++){
            if (check.containsKey(target - nums[i])){
                result[0] = check.get(target - nums[i]);
                result[1] = i;
                break;
            }else{
                check.put(nums[i], i);
            }
        }

        return result;
    }

    public static void main(String[] args) {

    }
}
