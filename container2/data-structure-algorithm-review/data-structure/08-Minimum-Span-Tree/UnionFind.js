function UnionFind(n){
    this.parent = new Array(n);
    this.rank = new Array(n); //ranks[i] records the number of layers of a tree for those sets whose roots are element i.
    this.count = n;
    for(var i = 0; i < this.count; i++){
        this.parent[i] = i;
        this.rank[i] = 1;
    }
}

UnionFind.prototype = {
    find: function (p) {
        if(p >= 0 && p < this.count){
            // while( p != this.parent[p]){
            //      this.parent[p] = this.parent[this.parent[p]];
            //     p = this.parent[p];
            // }
            // return p;

            if( p != this.parent[p]){
                this.parent[p] = this.find(this.parent[p]);
            }
            return this.parent[p];
        }
    },
    isConnected: function (p, q) {
        return this.find(p) == this.find(q);
    },
    unionElements: function (p, q) {
        var pRoot = this.find(p),
            qRoot = this.find(q);

        if(pRoot == qRoot) return;

        if(this.rank[pRoot] < this.rank[qRoot]){
            this.parent[pRoot] = qRoot;
        }else if(this.rank[pRoot] > this.rank[qRoot]){
            this.parent[qRoot] = pRoot;
        }else{
            this.parent[pRoot] = qRoot;
            this.rank[qRoot] += 1;
        }
    }

}