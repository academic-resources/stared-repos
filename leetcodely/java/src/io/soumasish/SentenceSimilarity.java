package io.soumasish;

import java.util.*;

public class SentenceSimilarity {
    public boolean areSentencesSimilar(String[] words1, String[] words2, List<List<String>> pairs) {
        if (words1.length != words2.length){
            return false;
        }
        Map<String, Set<String>> dict = new HashMap<>();
        for (List<String> pair: pairs){
            String first = pair.get(0);
            String second = pair.get(1);
            if (dict.containsKey(first)){
                dict.get(first).add(second);
            }else{
                Set<String> set = new HashSet<>();
                set.add(second);
                dict.put(first, set);

            }
            if (dict.containsKey(second)){
                dict.get(second).add(first);
            }else{
                Set<String> set = new HashSet<>();
                set.add(first);
                dict.put(second, set);
            }
        }
        for (int i = 0; i < words1.length ; i++) {
            if (words1[i].equals(words2[i]) || (dict.containsKey(words1[i]) && dict.get(words1[i]).contains(words2[i]))) continue;
            else return false;

        }
        return true;


    }
}
