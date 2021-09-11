function BellmanFord(graph, s) {
    this.graph = graph;
    this.s = s;
    this.distTo = [];
    this.from = [];

    for(var i = 0; i < this.graph.V(); i++) {
        this.distTo[i] = 0;
        this.from.push(null);
    }

    this.distTo[s] = 0;

    for(var pass = 1; pass < this.graph.V(); pass++){

        for(var i = 0; i < this.graph.V(); i++) {

            var edges = this.graph.getAdjIterator(this.graph, i);
            for(var e = edges.begin(); !edges.end(); e = edges.next()) {
                if(this.from[e.w()] === null || (this.distTo[e.v()] + e.wt() < this.distTo[e.w()])) {
                    this.distTo[e.w()] = this.distTo[e.v()] + e.wt();
                    this.from[e.w()] = e;
                }
            }
        }
    }

    this.hasNegativeCycle = this.detectNegativeCycle();
}

BellmanFord.prototype = {
    detectNegativeCycle: function () {
        for(var i = 0; i < this.graph.V(); i++) {
            var edges = this.graph.getAdjIterator(this.graph, i);
            for(var e = edges.begin(); !edges.end(); e = edges.next()) {
                if(this.from[e.w()] === null || this.distTo[e.v()] + e.wt() < this.distTo[e.w()]) {
                    return true;
                }
            }
        }
        return false;
    },
    shortestPathTo: function (w) {
        if(!this.hasNegativeCycle && w >=0 && w < this.graph.V()) {
            return this.distTo[w];
        }
        return "no found";
    },
    hasPathTo: function (w) {
        if(w >=0 && w < this.graph.V()) {
            return this.from[w] !== null;
        } else {
            return "no found";
        }
    },
    shortestPath: function (w, vec) {
        if(!this.hasNegativeCycle && w >=0 && w < this.graph.V()) {
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
        } else {
            return "there is a negative cycle";
        }
    },
    showPath: function (w) {

        if(!this.hasNegativeCycle && w >=0 && w < this.graph.V()) {
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
            console.log("there is a negative cycle");
        }
    }
}