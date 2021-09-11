package io.soumasish;

import java.util.HashMap;
import java.util.Map;

public class IsomorphicStrings {
    public boolean isIsomorphic(String s, String t) {
        if(s.length() != t.length()) return false;
        Map<Character, Character> forwardMap = new HashMap<>();
        Map<Character, Character> reverseMap = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            if(forwardMap.containsKey(s.charAt(i))){
                if(forwardMap.get(s.charAt(i)) != t.charAt(i)) return false;
            }
            else{
                forwardMap.put(s.charAt(i),t.charAt(i));
            }
            if(reverseMap.containsKey(t.charAt(i))){
                if(reverseMap.get(t.charAt(i)) != s.charAt(i)) return false;
            }else{
                reverseMap.put(t.charAt(i), s.charAt(i));
            }

        }
        return true;

    }
}
