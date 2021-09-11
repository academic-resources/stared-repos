/**
 * Created by xliu on 7/14/2017.
 */
function Edge(a, b, w){
    this.a = a;
    this.b = b;
    this.weight = w;
}

Edge.prototype = {
    v: function () {
        return this.a;
    },
    w: function () {
        return this.b;
    },
    wt: function () {
        return this.weight;
    },
    other: function(x){
        if (x === this.a || x === this.b) {
            return x === this.a ? this.b : this.a;
        }
    },
    largeThan: function(e) {
        if(e) {
            return this.wt() > e.wt();
        }
    },
    lessThan: function (e) {
        if (e) {
            return this.wt() < e.wt();
        }
    },
    lessOrEqual: function (e) {
        if (e) {
            return this.wt() <=  e.wt();
        }
    }
}