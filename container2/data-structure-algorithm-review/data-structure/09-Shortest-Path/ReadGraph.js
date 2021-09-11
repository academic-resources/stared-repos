/**
 * Created by xliu on 7/14/2017.
 */
function readFile(evt) {
    var f = evt.target.files[0];
    if (f) {
        var reader = new FileReader();
        reader.readAsText(f);
        reader.onloadend = function () {
            var fileContent = reader.result;
            var contents = fileContent.split("\n");
            var numOfVectors = parseInt(contents[0].split(" ")[0]);

            var g1 = new DenseGraph(numOfVectors, true);
            var g2 = new SparseGraph(numOfVectors, true);

            for (var i = 1; i < contents.length; i++){
                var content = contents[i];
                if(content) {
                    var dataArr = content.split(" ");
                    var a = parseInt(dataArr[0]),
                        b = parseInt(dataArr[1]),
                        weight = parseFloat(dataArr[2]);
                        g1.addEdge(a, b, weight);
                        g2.addEdge(a, b, weight);
                }
            }

            console.log("DenseGraph:");
            g1.show();

            console.log("SparseGraph:");
            g2.show();

            // console.log('Dijkstra');
            // var dj = new Dijkstra(g2, 0);
            // for(var i = 1; i < g2.V(); i++){
            //     dj.showPath(i);
            // }

            console.log("Bellman Ford");
            var bf = new BellmanFord(g2, 0);
            for(var i = 1; i < g2.V(); i++) {
                bf.showPath(i);
            }

        }
    }
}