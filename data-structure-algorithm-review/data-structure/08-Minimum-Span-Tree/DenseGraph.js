/**
 * Created by xliu on 7/14/2017.
 */
var DenseGraph = function(n, directed){
    this.n = n;
    this.m = 0;
    this.directed = directed;
    this.g = [];
    for(var i = 0; i < this.n; i++){
        this.g.push([]);
    }
};

DenseGraph.prototype.V = function () {
    return this.n;
};

DenseGraph.prototype.E = function () {
    return this.m;
};

DenseGraph.prototype.addEdge = function (v, w, weight) {


    if(this.hasEdge(v, w)){
        delete this.g[v][w];
        if ( !this.directed ) {
            delete this.g[w][v];
        }
        this.m --;

        this.g[v][w] = new Edge(v, w, weight);
        if(!this.directed){
            this.g[w][v] = new Edge(w, v, weight);
        }
        this.m ++;
    }
}

DenseGraph.prototype.hasEdge = function (v, w) {
    if((v >= 0 && v < this.n) && (w >= 0 && w < this.n)){
        return this.g[v][w] !== null;
    }
};

DenseGraph.prototype.show = function () {
    for (var i = 0; i < this.n; i++){
        var str = "";
        for( var j = 0; j < this.n; j++) {
            if(this.g[i][j]){
                str += this.g[i][j].wt() + "\t";
            }
            else {
                str += "NULL\t";
            }
        }
        console.log(str);
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
                    return this.G.g[this.v][this.index];
                }
                return null;
            }
        },
        end: function () {
            return this.index >= this.G.V();
        }
    }

    return new AdjIteratorDense(G, v);
}