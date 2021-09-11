package io.soumasish;

import java.util.HashMap;
import java.util.Map;

public class LongestSubstringWithoutRepeatingCharacters {
    public int lengthOfLongestSubstring(String s) {
        if (s.length() == 0){
            return 0;
        }
        if (s.length() == 1){
            return 1;
        }
        Map<Character, Integer> map = new HashMap<>();
        int currLen = 0, startIndex = 0, maxLen = 0;
        for (int i = 0; i <s.length() ; i++) {
            char k = s.charAt(i);
            if (map.containsKey(k)){
                int index = map.get(k);
                startIndex = Math.max(startIndex, index + 1);
                maxLen = Math.max(maxLen, i - startIndex + 1);
                map.put(k, i);
            }
            else{
                map.put(k, i);
                maxLen = Math.max(maxLen, i - startIndex + 1);
            }
        }
        return maxLen;

    }
}
