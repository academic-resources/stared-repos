package io.soumasish;

import java.util.List;

public class WordBreak {
    public boolean wordBreak(String s, List<String> wordDict) {

        boolean [] A = new boolean[s.length()];
        for (int i = 0; i <s.length() ; i++) {
            if (wordDict.contains(s.substring(0, i+1))) A[i] = true;
            else{
                for(int j= 0; j < i; j++){
                    if (A[j] && wordDict.contains(s.substring(j+1, i+1))) A[i] = true;
                }
            }
        }
        return A[s.length() -1];

    }
}
