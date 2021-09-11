/**
 * Created by xliu on 7/19/2017.
 */
function LazyPrimMST (graph) {
    this.graph = graph;
    this.marked = [];
    this.mst = [];

    for(var i = 0; i < this.graph.V(); i++){
        this.marked.push(false);
    }

    this.pq = new MinHeap([], this.graph.E());

    // lazy prim
    this.visit(0);

    while(!this.pq.isEmpty()) {
        var e = this.pq.extractMin();
        if (e) {
            //这里使用了切分定理 如果一条边的两个端点都在同一侧 则不满足切分定理
            if(this.marked[e.v()] ===  this.marked[e.w()]) {
                continue;
            }


            this.mst.push(e);

            if( !this.marked[e.v()])
                this.visit(e.v());
            else
                this.visit(e.w());
        }
    }

    this.mstWeight = this.mst[0].wt();
    for( var i = 1; i < this.mst.length; i++){
        this.mstWeight += this.mst[i].wt();
    }

}

LazyPrimMST.prototype = {
    mstEdges: function () {
        return this.mst;
    },
    visit: function(v) {
        if(!this.marked[v]){
            this.marked[v] = true;

            var adj = this.graph.getAdjIterator(this.graph, v);
            for(var e = adj.begin(); !adj.end(); e = adj.next()) {
                if (e !== null && !this.marked[e.other(v)]) {
                    this.pq.insert(e);
                }
            }
        }
    },
    result: function () {
        return this.mstWeight;
    }
}

