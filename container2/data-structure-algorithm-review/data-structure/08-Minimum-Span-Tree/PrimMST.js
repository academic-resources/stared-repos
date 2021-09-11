function PrimMST(graph) {
    this.graph = graph;
    this.mst = [];
    this.ipq = new IndexMinHeap([], this.graph.V());
    this.edgeTo = [];
    this.marked = [];

    for(var i = 0; i < this.graph.V(); i++) {
        this.edgeTo.push(null);
        this.marked.push(false);
    }

    this.visit(0);

    while(!this.ipq.isEmpty()) {
        var v = this.ipq.extractMinIndex();
        if(this.edgeTo[v]) {
            this.mst.push(this.edgeTo[v]);
        }
        this.visit(v);
    }

    this.mstWeight = this.mst[0].wt();
    for(var i = 1; i < this.mst.length; i++) {
        this.mstWeight +=  this.mst[i].wt();
    }
}

PrimMST.prototype = {
    mstEdge: function () {
        return this.mst;
    },
    result: function () {
        return this.mstWeight;
    },
    visit: function (v) {
        this.marked[v] = true;

        var edges = this.graph.getAdjIterator(this.graph, v);
        for(var e = edges.begin(); !edges.end(); e = edges.next()) {
            var w = e.other(v);
            if (!this.marked[w]) {
                if (!this.edgeTo[w]) {
                    this.edgeTo[w] = e;
                    this.ipq.insert(w, e.wt());
                } else if (e.wt() < this.edgeTo[w].wt()){
                    this.edgeTo[w] = e;
                    this.ipq.change(w, e.wt());
                }
            }
        }
    }
}