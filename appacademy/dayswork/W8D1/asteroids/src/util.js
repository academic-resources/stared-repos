/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const Util = {
    inherits: function inherits( ChildClass, ParentClass ) {
        function Surrogate() {}
        Surrogate.prototype = ParentClass.prototype;
        ChildClass.prototype = new Surrogate();
        ChildClass.prototype.constructor = ChildClass;
    },
    randomVec: function randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    scale: function scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },
    distance: function distance(pos_1, pos_2) {
        // sqrt((x1 - x2) ^ 2 + (y1- 22) ^ 2)
        const [x1, y1] = pos_1;
        const [x2, y2] = pos_2;
        const diff_x = Math.pow((x1 - x2), 2);
        const diff_y = Math.pow((y1 - y2), 2);
        return Math.sqrt( diff_x + diff_y );
    }
};

module.exports = Util;



