package io.soumasish;

import java.util.HashMap;

public class LongestPalindromicSubstring {
    public int lengthOfLongestSubstring(String s) {
        int j,k;
        for (int i = 0; i <s.length() ; i++) {
            if(i % 2 == 0){
                j = i;
                k = i+1;
            }else{
                j = i-1;
                k = i+1;
            }
            while()
        }

    }
    private boolean isPalindrome(String s){
        int j = s.length() -1;
        int len = (int) Math.floor(s.length()/2);
        for(int i=0; i< len; i++){
            if(s.charAt(i) == s.charAt(j)){
                j--;
            }else return false;
        }
        return true;
    }
}
