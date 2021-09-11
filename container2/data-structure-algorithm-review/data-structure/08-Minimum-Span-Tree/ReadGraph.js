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

            var g1 = new DenseGraph(numOfVectors, false);
            var g2 = new SparseGraph(numOfVectors, false);

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

            console.log("Test Lazy Prim MST:");
            var lazyMST = new LazyPrimMST(g2);
            var mst = lazyMST.mstEdges();
            for(var i = 0; i < mst.length; i++){
                console.log(mst[i].v() + ' - ' + mst[i].w() + " : " + mst[i].wt());
            }

            console.log("The MST weight is: " + lazyMST.result());

            console.log('Test Prim MST:');
            var MST = new PrimMST(g2);
            var mstWeight = MST.result();
            console.log('The MST weight is ' + mstWeight);

            console.log('Test Krusk MST:');
            var kruskMST = new KruskMST(g2);
            mstWeight = kruskMST.result();
            mst = kruskMST.mstEdge();
            for(var i = 0; i < mst.length; i++){
                console.log(mst[i].v() + ' - ' + mst[i].w() + " : " + mst[i].wt());
            }
            console.log('The krusk MST weight is' + mstWeight);

            console.log('Dijkstra');
            var dj = new Dijkstra(g2, 0);
            dj.showPath(7);

        }
    }
}