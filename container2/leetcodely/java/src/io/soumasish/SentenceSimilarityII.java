package io.soumasish;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SentenceSimilarityII {
    private class UnionFind{
        private Map<String, String> parent;

        public UnionFind(){
            parent = new HashMap<>();
        }

        public String find(String word){
            if(!parent.containsKey(word)){
                parent.put(word, word);
                return word;
            }
            String p = parent.get(word);
            while(!p.equals(parent.get(p))){
                p = parent.get(p);
            }
            return p;
        }

        public void union(String word1, String word2){
            String p1 = find(word1);
            String p2 = find(word2);
            if(!p1.equals(p2)){
                parent.put(p1, p2);
            }
        }

        public boolean isConnected(String word1, String word2){
            return find(word1).equals(find(word2));
        }
    }
    public boolean areSentencesSimilarTwo(String[] words1, String[] words2, List<List<String>> pairs) {
        if (words1.length != words2.length) return false;

        UnionFind uf = new UnionFind();
        for (List<String> pair: pairs) {
            uf.union(pair.get(0), pair.get(1));
        }

        for (int i = 0; i < words1.length ; i++) {
            String word1 = words1[i];
            String word2 = words2[i];

            if(word1.equals(word2) || uf.isConnected(word1, word2)) continue;
            else return false;
        }

        return true;

    }
}
