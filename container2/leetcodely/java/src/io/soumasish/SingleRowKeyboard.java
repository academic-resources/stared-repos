package io.soumasish;

import java.util.HashMap;
import java.util.Map;

public class SingleRowKeyboard {
    public int calculateTime(String keyboard, String word) {
        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i <keyboard.length() ; i++) {
            map.put(keyboard.charAt(i), i);
        }
        int count = map.get(word.charAt(0));
        for (int i = 1; i <word.length() ; i++) {
            if (word.charAt(i) != word.charAt(i-1)){
                count += Math.abs(map.get(word.charAt(i)) - map.get(word.charAt(i-1)));
            }

        }
        return count;

    }
}
