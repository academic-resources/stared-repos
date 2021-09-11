/**
 * Created by xliu on 7/13/2017.
 */
function Path(graph, s){
    //s stands for source
    this.g = graph;
    this.s = 0;
    this.from = [];
    this.visited = [];

    for(var i = 0; i < this.g.V(); i++){
        this.visited.push(false);
        this.from.push(-1)
    }

    this.s = s;

    this.dfs(s);
}

Path.prototype = {
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
    dfs: function (s) {
        this.visited[s] = true;

        var iterator = this.g.getAdjIterator(this.g, s);
        for(var i = iterator.begin(); !iterator.end(); i = iterator.next()){
            if(!this.visited[i]){
                this.from[i] = s;
                this.dfs(i);
            }
        }
    }
}