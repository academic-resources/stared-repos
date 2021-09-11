function KruskMST(graph) {
    this.graph = graph;
    this.mst = [];

    this.pq = new MinHeap([], this.graph.E());

    for(var i = 0; i < this.graph.V(); i++) {
        var edges = this.graph.getAdjIterator(this.graph, i);
        for(var e = edges.begin(); !edges.end(); e = edges.next()) {
            if(e.v() < e.w()) {
                this.pq.insert(e);
            }
        }
    }

    var uf = new UnionFind(this.graph.V());

    while(!this.pq.isEmpty() && this.mst.length + 1 < this.graph.V()) {
        var e = this.pq.extractMin();
        if(uf.isConnected(e.v(), e.w())) continue;
        this.mst.push(e);
        uf.unionElements(e.v(), e.w());
    }

    this.mstWeight = this.mst[0].wt();
    for(var i = 1; i < this.mst.length; i++) {
        this.mstWeight += this.mst[i].wt();
    }
}

KruskMST.prototype = {
    result: function () {
        return this.mstWeight;
    },
    mstEdge: function () {
        return this.mst;
    }
}