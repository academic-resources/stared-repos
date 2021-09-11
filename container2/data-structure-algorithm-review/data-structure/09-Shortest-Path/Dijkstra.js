function  Dijkstra(graph,s) {
    this.graph = graph;
    this.s = s;
    this.from = [];
    this.distTo = [];
    this.marked = [];

    for(var i = 0; i < this.graph.V(); i++){
        this.marked.push(false);
        this.from.push(null);
        this.distTo.push(0);
    }

    //main logic of Dijkstra
    var ipq = new IndexMinHeap([], this.graph.V());

    this.distTo[this.s] = 0;
    ipq.insert(this.s, this.distTo[this.s]);
    this.marked[this.s] = true;

    while(!ipq.isEmpty()) {
        var v = ipq.extractMinIndex();

        this.marked[v] = true;
        var edges = this.graph.getAdjIterator(this.graph, v);
        for(var e = edges.begin(); !edges.end(); e = edges.next()) {
            var w = e.other(v);

            if(!this.marked[w]){
                if(this.from[w] === null || this.distTo[v] + e.wt() < this.distTo[w]){
                    this.distTo[w] = this.distTo[v] + e.wt();
                    this.from[w] = e;
                    if(ipq.contain(w)) {
                        ipq.change(w, this.distTo[w]);
                    } else {
                        ipq.insert(w, this.distTo[w]);
                    }
                }
            }
        }
    }
}

Dijkstra.prototype = {
    shortestPathTo: function (w) {
        if( w >= 0 && w < this.graph.V()) {
            return this.distTo[w];
        }
    },
    hasPathTo: function (w) {
        if (w >= 0 && w < this.graph.V()) {
            return this.marked[w];
        }
    },
    shortestPath: function (w, vec) {
        var stack = [];
        vec = [];
        var e = this.from[w];
        while(e.v() !== this.s){
            stack.push(e);
            e = this.from[e.v()];
        }
        stack.push(e);

        while(stack.length !== 0){
            vec.push(stack.pop());
        }

        return vec;
    },
    showPath: function (w) {

        if (w >= 0 && w < this.graph.V()) {
            var vector = [];
            vector = this.shortestPath(w, vector);

            var str = "";
            for(var i = 0; i < vector.length; i++){
                str += vector[i].v() + " -> ";
                if( i === vector.length - 1) {
                    str += vector[i].w()+ "\n";
                }
            }
            console.log(str);
        } else {
            console.log("not path found");
        }
    }
}