/**
 * Created by xliu on 7/6/2017.
 */

var SparseGraph = function(n, directed){
    this.n = n;
    this.m = 0;
    this.directed = directed;
    this.g = [];
    for(var i = 0; i < this.n; i++){
        this.g.push([])
    }
}

SparseGraph.prototype = {
    V: function () {
        return this.n;
    },
    E: function () {
        return this.m;
    },
    addEdge: function (v, w) {
        if(!this.hasEdge(v, w)){
            this.g[v].push(w);
            if(v !== w && !this.directed){//判断是不是自环边判断是否是有向图还是无向图
                this.g[w].push(v);
            }
            this.m++;
        }
    },
    hasEdge: function (v, w) {
        if((v >= 0 && v < this.n) && (w >= 0 && w < this.n)){
            for(var i = 0; this.g[v] && i < this.g[v].length; i++){
                if(this.g[v][i] === w){
                    return true;
                }
            }
            return false;
        }
    },
    show: function () {
        for (var i = 0; i < this.n; i++) {
            var str = "vertex " + i + " :\t";
            for (var j = 0; j < this.g[i].length; j++) {
                str += this.g[i][j] + "\t";
            }
            console.log(str);
        }
    },
    getAdjIterator: function (G, v) {
        function AdjIterator(G, v){
            this.G = G;
            this.v = v;
            this.index = 0;
        }

        AdjIterator.prototype.begin = function () {
            this.index = 0;
            if(this.G.g[this.v].length !== 0){
                return this.G.g[this.v][this.index];
            }
            return -1;
        };

        AdjIterator.prototype.next = function () {
            this.index++;
            if(this.index < this.G.g[this.v].length){
                return this.G.g[this.v][this.index];
            }
            return -1;
        };

        AdjIterator.prototype.end = function () {
            return this.index >= this.G.g[this.v].length;
        };

        return new AdjIterator(G, v);
    }

}

