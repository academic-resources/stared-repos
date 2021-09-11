/**
 * Created by xliu on 7/4/2017.
 */
function UnionFindTestHelper(){
    var union = {
        testUF1: function (n, UnionFind) {
            var uf = new UnionFind(n);
            const CLOCKS_PER_SECOND = 60;
            var start = Date.now();

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random() * n);
                uf.unionElements(a, b);
            }

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random()  * n);
                uf.isConnected(a, b);
            }

            var end = Date.now();
            console.log('UF1, ' + 2*n + " ops," + (end - start)/ CLOCKS_PER_SECOND + "  ")
        },
        testUF2: function (n, UnionFind2) {
            var uf = new UnionFind2(n);
            const CLOCKS_PER_SECOND = 60;
            var start = Date.now();

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random() * n);
                uf.unionElements(a, b);
            }

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random()  * n);
                uf.isConnected(a, b);
            }

            var end = Date.now();
            console.log('UF2, ' + 2*n + " ops," + (end - start)/ CLOCKS_PER_SECOND + "  ")
        },
        testUF3: function (n, UnionFind3) {
            var uf = new UnionFind3(n);
            const CLOCKS_PER_SECOND = 60;
            var start = Date.now();

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random() * n);
                uf.unionElements(a, b);
            }

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random()  * n);
                uf.isConnected(a, b);
            }

            var end = Date.now();
            console.log('UF3, ' + 2*n + " ops," + (end - start)/ CLOCKS_PER_SECOND + "  ")
        },
        testUF4: function (n, UnionFind4) {
            var uf = new UnionFind4(n);
            const CLOCKS_PER_SECOND = 60;
            var start = Date.now();

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random() * n);
                uf.unionElements(a, b);
            }

            for(var i = 0; i < n; i++){
                var a = parseInt(Math.random() * n),
                    b = parseInt(Math.random()  * n);
                uf.isConnected(a, b);
            }

            var end = Date.now();
            console.log('UF4, ' + 2*n + " ops," + (end - start)/ CLOCKS_PER_SECOND + "  ")
        }
    };


    return union;
}