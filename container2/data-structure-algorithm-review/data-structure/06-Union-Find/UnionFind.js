/**
 * Created by xliu on 7/4/2017.
 */

function UnionFind(n){
    this.id = new Array(n);
    this.count = n;
    for(var i = 0; i < n; i++){
        this.id[i] = i;
    }

}

UnionFind.prototype = {
    find: function (p) {
        if( p >= 0 && p < this.count){
            return this.id[p];
        }
    },
    isConnected: function(p, q){
        return this.find(p) == this.find(q);
    },
    unionElements: function (p, q) {
        var pId = this.find(p),
            qId = this.find(q);

        if(pId == qId){
            return;
        }
        for(var i = 0; i < this.count; i++){
            if( this.id[i] == pId) this.id[i] = qId;
        }
    }
}


function UnionFind2(n){
    this.parent = new Array(n);
    this.count = n;
    for(var i = 0; i < this.count; i++){
        this.parent[i] = i;
    }
}

UnionFind2.prototype = {
    find: function (p) {
        if(p >= 0 && p < this.count){
            while( p != this.parent[p]){
                p = this.parent[p];
            }
            return p;
        }
    },
    isConnected: function (p, q) {
        return this.find(p) == this.find(q);
    },
    unionElements: function (p, q) {
        var pRoot = this.find(p),
            qRoot = this.find(q);

        if(pRoot == qRoot) return;

        this.parent[pRoot] = qRoot;
    }

}

function UnionFind3(n){
    this.parent = new Array(n);
    this.sz = new Array(n); //sz[i] records the number of sets whose roots are element i.
    this.count = n;
    for(var i = 0; i < this.count; i++){
        this.parent[i] = i;
        this.sz[i] = 1;
    }
}

UnionFind3.prototype = {
    find: function (p) {
        if(p >= 0 && p < this.count){
            while( p != this.parent[p]){
                p = this.parent[p];
            }
            return p;
        }
    },
    isConnected: function (p, q) {
        return this.find(p) == this.find(q);
    },
    unionElements: function (p, q) {
        var pRoot = this.find(p),
            qRoot = this.find(q);

        if(pRoot == qRoot) return;

        if(this.sz[pRoot] < this.sz[qRoot]){
            this.parent[pRoot] = qRoot;
            this.sz[qRoot] += this.sz[pRoot];
        }else{
            this.parent[qRoot] = pRoot;
            this.sz[pRoot] += this.sz[qRoot];
        }
    }

}

function UnionFind4(n){
    this.parent = new Array(n);
    this.rank = new Array(n); //ranks[i] records the number of layers of a tree for those sets whose roots are element i.
    this.count = n;
    for(var i = 0; i < this.count; i++){
        this.parent[i] = i;
        this.rank[i] = 1;
    }
}
UnionFind4.prototype = {
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