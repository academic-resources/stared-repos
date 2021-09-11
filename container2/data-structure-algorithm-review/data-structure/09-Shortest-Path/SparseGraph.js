/**
 * Created by xliu on 7/14/2017.
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
    addEdge: function (v, w, weight) {
        if((v >= 0 && v < this.n) && (w >= 0 && w < this.n)){
            this.g[v].push(new Edge(v, w, weight));
            if(v !== w && !this.directed){
                this.g[w].push(new Edge(w, v, weight));
            }
            this.m++;
        }
    },
    hasEdge: function (v, w) {
        if((v >= 0 && v < this.n) && (w >= 0 && w < this.n)){
            for(var i = 0; this.g[v] && i < this.g[v].length; i++){
                if(this.g[v][i].other(v) === w){
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
                str += "( to " + this.g[i][j].w() + ", wt:" + this.g[i][j].wt() + ")\t";
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
            return null;
        };

        AdjIterator.prototype.next = function () {
            this.index++;
            if(this.index < this.G.g[this.v].length){
                return this.G.g[this.v][this.index];
            }
            return null;
        };

        AdjIterator.prototype.end = function () {
            return this.index >= this.G.g[this.v].length;
        };

        return new AdjIterator(G, v);
    }

}