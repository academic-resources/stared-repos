package io.soumasish;

public class SearchInRotatedArray {

    public int search(int[] nums, int target) {
        if(nums.length==0)return -1;

        int low = 0;
        int high = nums.length-1;

        int stPoint = getStartingPoint(nums);
        if(target>nums[high])high=stPoint;
        else low = stPoint;

        while(low<=high){
            int mid = low + (high-low)/2;
            if(nums[mid]==target)return mid;
            if(nums[mid]>target)high=mid-1;
            else low=mid+1;
        }
        return -1;

    }

    public int getStartingPoint(int[] nums){
        int low = 0;
        int high = nums.length-1;

        while(low<=high){
            int mid = low + (high-low)/2;

            if(mid!=0 && nums[mid-1]>nums[mid])return mid;

            if(nums[mid]>nums[high])low=mid+1;
            else high=mid-1;

        }

        return 0;

    }
}
