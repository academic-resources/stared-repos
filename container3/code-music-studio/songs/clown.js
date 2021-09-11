var tau = Math.PI * 2;

return function (t) {
    var g = [
        1, 0, 5/4, 0, 1, 3/5, 0, 0,
    ][Math.floor(t * 2 % 8)];
    var grunge = (g > 0) * Math.pow(2, -2) * Math.pow(2, g);
    
    var yoshi = t % 16 < 8
        ? Math.floor(t * 40) % 3200
        : 2000 / Math.floor(t * 40) % 3200
    ;
    if (t < 8) return drums(t) * (t / 8) * 0.15;
    
    return (
        (
            0.2 * square(100 * grunge * yoshi)
            + 0.2 * sin(124 * grunge * 20 + Math.floor(t) % 16 * 20)
            + 0.2 * sawtooth(612 * grunge - 1)
            + 0.2 * sawtooth(404 * grunge - 1)
        ) * (
            (square(400) + square(404))
            / 15 + sin(400) * 0.5 + sin(4) + sin(3)
        ) / 4
        + (t % 8 > 7) * (square(280) + square(285)) * (sin(4) + sin(5)) / 20
        + (t % 8 > 6 && t % 8 < 7) * (
            sin(3) * (sawtooth(150) + square(151) + sin(152)) / 8
        )
        + (t % 32 > 24) * (
            sawtooth(grunge * 6400 + Math.floor(t * 1000 % 4000))
            + square(grunge * 5000 + 4000 / Math.floor(t * 1000 % 4000))
        ) / 8
        + drums(t) * 0.15
    );
    
    function sin (x) {
        return Math.sin(tau * t * x);
    }
    
    function square (x) {
        var n = Math.sin(tau * t * x);
        return n > 0 ? 1 : -1;
    }
    
    function sawtooth (x) {
        return t % (1 / x) * x * 2 - 1;
    }
}

function drums (t) {
    var n = t * 0.75 % 3 + 1;
    var f = Math.sin(tau * tau / ((n * 16 % 2 + 0.5) * 1));
    return Math.sin(tau * n * f);
}
