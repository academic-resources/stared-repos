/**
 * Created by xliu on 7/9/2017.
 */
var ReadGraph = function(graph){
    this.graph = graph;
    
}

function readFile(evt){
    var f = evt.target.files[0];
    console.log(f.name + ", Component Count:");
    if (f) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;

        };
        reader.readAsText(f);
        reader.onloadend = function(){
            var g1 = new SparseGraph(13, false);
            var g2 = new DenseGraph(13, false);
            var rg1 = new ReadGraph(g1);
            var rg2 = new ReadGraph(g2);
            var fileContent = reader.result;
            var contents = fileContent.split("\n");
            for (var i = 0; i < contents.length; i++) {
                var content = contents[i];
                if(content){
                    var vectors = content.split(' ');
                    g1.addEdge(parseInt(vectors[0]), parseInt(vectors[1]));
                    g2.addEdge(parseInt(vectors[0]), parseInt(vectors[1]));
                }
            }

            var c1 = new Component(g1);
            var c2 = new Component(g2);

            console.log(c1.count());
            console.log(c2.count());

            var p1 = new Path(g1, 0);
            p1.showPath(3);
            var s1 = new ShortestPath(g1, 0);
            console.log(s1.length(3));

            // g1.show();
            // g2.show();
        }
    } else {
        alert("Failed to load file!");
    }
}
