package io.soumasish;

import java.util.Arrays;

public class MergeSortedArrays {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int [] arr = new int[m];
        int j=0, k=0, idx = 0;
        while(j < m - n && k < n){
            if (nums1[j] <= nums2[k]){
                arr[idx] = nums1[j];
                j ++;
                idx ++;
            }else if(nums1[j] > nums2[k]){
                arr[idx] = nums2[k];
                k++;
                idx ++;
            }
        }
        for (int i = 0; i <m ; i++) {
            nums1[i] = arr[i];
        }

    }

}
