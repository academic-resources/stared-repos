/**
 * Created by xliu on 7/13/2017.
 */
function Component(graph) {
    this.g = graph;
    this.visited = []; //每一个节点是否被访问过
    this.ccount = 0; //多少个联通分量
    this.id = [];

    for (var i = 0; i < this.g.V(); i++){
        this.visited.push(false);
        this.id.push(-1);
    }

    for (var i = 0; i < this.g.V(); i++) {
        if(!this.visited[i]){
            this.dfs(i);
            this.ccount ++;
        }
    }
}

Component.prototype = {
    dfs: function (v) {
        this.visited[v] = true;

        var iterator = this.g.getAdjIterator(this.g, v);
        for(var i = iterator.begin(); !iterator.end(); i = iterator.next()){
            if((i > 0 && i < this.g.V()) && !this.visited[i]){
                this.dfs(i);
            }
        }
    },
    count: function () {
        return this.ccount;
    },
    isConnected: function (v, w) {
        return this.id[v] === this.id[w];
    }
}