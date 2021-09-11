var melody = [ 1, 2, 1, 3, 1, 0, 6, 2, 8, 2 ];

return function (t) {
    var m = melody[Math.floor(t * 2 % melody.length)] * 110;
    if (t % 8 > 7) t = Math.sin(t);
    t = t % 16;
    
    return (
        0.2 * sin(m)
        + 0.3 * sin(3 * m + sin(25 + sin(1)))
        + 0.1 * sin(3 * m + 7 * sin(500 + m))
        + 0.2 * sin(5 * m)
        + 0.15 * sin(5 * m + 3 * sin(64))
        + 0.35 * sin(7 * m)
        + 0.2 * sin(7 * m + 5 * sin(8))
    ) * sin(4);
    
    function sin (x) { return Math.sin(2 * Math.PI * x * t) }
}