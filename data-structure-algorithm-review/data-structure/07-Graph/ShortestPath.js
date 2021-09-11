/**
 * Created by xliu on 7/14/2017.
 */
function ShortestPath(graph, s) {
    this.g = graph;
    this.visited = [];
    this.from = [];
    this.ord = [];
    this.s = [];

    for(var i = 0; i < this.g.V(); i++) {
        this.visited.push(false);
        this.from.push(-1);
        this.ord.push(-1);
    }
    this.s = s;

    //无向图最短路径算法
    var q = [];
    q.push(s);
    this.ord[s] = 0;
    this.visited[s] = true;

    while(q.length !== 0){
        var v = q.shift();

        var iterator = this.g.getAdjIterator(this.g, v);
        for(var i = iterator.begin(); !iterator.end(); i = iterator.next()) {
            if (!this.visited[i]) {
               q.push(i);
               this.ord[i] = this.ord[v] + 1;
               this.visited[i] = true;
               this.from[i] = v;
            }
        }
    }
}

ShortestPath.prototype = {
    hasPath: function (w) {
        if(w > 0  && w < this.g.V()){
            return this.visited[w];
        }else{
            return "w exceeds the boundary";
        }
    },
    path: function(w, vec){
        var stack = [];
        vec = [];
        var p = w;
        while(p !== -1){
            stack.push(p);
            p = this.from[p];
        }

        while(stack.length !== 0){
            vec.push(stack.pop());
        }

        return vec;
    },
    showPath: function (w) {
        var vector = [];
        vector = this.path(w, vector);

        var str = "";
        for(var i = 0; i < vector.length; i++){
            str += vector[i];
            if( i === vector.length - 1) {
                str += "\n";
            } else {
                str += "->";
            }
        }
        console.log(str);
    },
    length: function (w) {
        if (w >= 0 && w <this.g.V()) {
           return this.ord[w];
        } else {
            console.log("boundary exceeds!");
        }
    }
}