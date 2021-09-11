const Util = {
    inherits: function inherits(childClass, parentClass) {
        function Surrogate() {}
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    },

    randomVec: function randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
  
    scale: function scale(vec, m) {
      return [vec[0] * m, vec[1] * m];
    }
};

module.exports = Util;