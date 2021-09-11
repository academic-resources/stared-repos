/**
 * Created by xliu on 7/6/2017.
 */
//directed 有向图还是无向图
var DenseGraph = function(n, directed){
    this.n = n;
    this.m = 0;
    this.directed = directed;
    this.g = [];
    for(var i = 0; i < this.n; i++){
        this.g.push(new Array(n));
    }
};

DenseGraph.prototype.V = function () {
    return this.n;
};

DenseGraph.prototype.E = function () {
    return this.m;
};

DenseGraph.prototype.addEdge = function (v, w) {

    if(!this.hasEdge(v, w)){
        this.g[v][w] = true;
        if(!this.directed){
            this.g[w][v] = true;
        }
        this.m++;
    }
}

DenseGraph.prototype.hasEdge = function (v, w) {
    if((v >= 0 && v < this.n) && (w >= 0 && w < this.n)){
        return this.g[v][w];
    }
};

DenseGraph.prototype.show = function () {
    for (var i = 0; i < this.n; i++){
        var str = "index " + i + " \t";
        for( var j = 0; j < this.n; j++) {
            console.log(str + (this.g[i][j] === true? 1 : 0) + "\t");
        }
    }
};

DenseGraph.prototype.getAdjIterator = function (G, v) {
    function AdjIteratorDense(G, v){
        this.G = G;
        this.v = v;
        this.index = 0;
    }


    AdjIteratorDense.prototype = {
        begin: function () {
            this.index = -1;
            return this.next();
        },
        next: function () {
            for(this.index += 1; this.index < this.G.V(); this.index++){
                if(this.G.g[this.v][this.index]){
                    return this.index;
                }
                return -1;
            }
        },
        end: function () {
            return this.index >= this.G.V();
        }
    }

    return new AdjIteratorDense(G, v);
}


