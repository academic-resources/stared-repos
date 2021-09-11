const Queue = require('./queue');

class Graph{

    constructor(directed=false){
        this.numVertices = 0;
        this.directed = directed;
        this.dict = {}
    }
    addEdge(v1, v2, weight=1){
        let p, q;
       if(v1 in this.dict){
           p = this.dict[v1];
       }
       else {
           p = new Node(v1);
           this.dict[v1] = p;
           this.numVertices ++;
       }
       if(v2 in this.dict){
           q = this.dict[v2];
       }
       else{
           q = new Node(v2);
           this.dict[v2] = q;
           this.numVertices ++;
       }
       p.addEdge(q);
       if(!this.directed){
           q.addEdge(p);
       }

    }

    breadthFirstTraversal(start){
        const queue = new Queue();
        const startNode = this.dict[start];
        queue.offer(startNode);
        const visited = new Set();

        while(!queue.isEmpty()){
            let curr = queue.poll();
            console.log(curr.data);

            if(!visited.has(curr)){
               visited.add(curr);
            }

            [...curr.adjacencySet].map((item)=>{
                if(!visited.has(item)){
                    queue.offer(item);
                }
            })
        }


    }

    depthFirstTraversal(start){
        let curr = this.dict[start];
        const visited = new Set();
        const depthFirstHelper = (visited, curr) =>{

            if(visited.has(curr)){
                return;
            }
            console.log(curr.data);
            visited.add(curr);

            [...curr.adjacencySet].map(item =>{

                depthFirstHelper(visited, item)
            });
        };
        depthFirstHelper(visited, curr);

    }


    getInDegree(v){
        if(!this.dict.hasOwnProperty(v)){
            throw TypeError("Object not present in Graph.")
        }
        let inDegree = 0;
        const p = this.dict[v];
        for(const [ key, value] of Object.entries(this.dict)){
            const vertices = value.adjacencySet;
            if(vertices.has(p)){
                inDegree ++;
            }
        }
        return inDegree;

    }

    stringify(){
        for (const [ key, value ] of Object.entries(this.dict)) {
            console.log(`${key}: ${[...value.adjacencySet].map(x => x.data)}`);
        }

    }

    topologicalSort(){
        const queue = new Queue();
        const inDegreeMap = {};
        for(const [key, value] of Object.entries(this.dict)){
            inDegreeMap[key] = this.getInDegree(key);
            if (inDegreeMap[key] === 0){
                queue.offer(value);
            }
        }
        const result = [];
        while(!queue.isEmpty()){
            let curr = queue.poll();
            result.push(curr);
            curr.adjacencySet.forEach((item)=>{
                inDegreeMap[item.data] = inDegreeMap[item.data] -1;
                if (inDegreeMap[item.data] === 0){
                    queue.offer(item);
                }

            })
        }
        if(result.length !== this.numVertices){
            throw TypeError("This graph has cycles.")
        }
        result.map(item=>{
            console.log(item.data);
        });

    }
}

class Node{
    constructor(data){
        this.data = data;
        this.adjacencySet = new Set();
    }
    addEdge(node){
        this.adjacencySet.add(node)
    }
}

graph = new Graph(directed=true);
graph.addEdge(12, 13);
graph.addEdge(12, 14);
graph.addEdge(13, 15);
graph.addEdge(14, 6);
// graph.addEdge(6, 12);
// graph.stringify();
// console.log(graph.getInDegree(13));
// graph.breadthFirstTraversal(12);
// graph.depthFirstTraversal(12);
graph.topologicalSort();