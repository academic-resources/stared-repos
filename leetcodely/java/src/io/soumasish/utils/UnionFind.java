package io.soumasish.utils;

public class UnionFind {
    private int[] id;
    private int[] sz;

    public UnionFind(int n){
        id = new int[n];
        sz = new int[n];
        for(int i=0; i <n; i++){
            id[i] = i;
            sz[i] = 1;
        }

    }

    public boolean find(int p, int q){
        return root(p) == root(q);
    }
    //Make first item root the child of the second item
    public void union(int p, int q){
        int i = root(p);
        int j = root(q);
        id[i] = j;
//        if(i == j)return;
//        if(sz[i] < sz[j]){
//            id[i] = j;
//            sz[j] += sz[i];
//        }else{
//            id[j] = i;
//            sz[i] += sz[j];
//        }
    }
    private int root(int i){
        while(i != id[i]){
//            id[i] = id[id[i]];
            i = id[i];
        }
        return i;
    }

    public static void main(String[] args) {
        int[] arr = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        UnionFind uf = new UnionFind(8);
        uf.union(4, 3);
        uf.union(3, 8);
        uf.union(6,5);
        uf.union(9, 4);
        uf.union(2, 1);

    }
}
