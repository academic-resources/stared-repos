var bpm = 120;
var bps = bpm / 60;

var melody = [
    4, 4, null, 2, null, 5, null, 2, null, 0, 0, null, 0, 0, null, null,
    2, 2, null, null, null, null
].map(function (x) { return x === null ? 0 : Math.pow(2, x / 12) });

var modulo = [ 8, 5, 16, 7, 1/2, 32, 4 ];

return function (t) {
    var volume = t > 56 ? 1 - (t - 56) / 4 : 1;
    if (t > 60) b.end();
    
    var m = melody[Math.floor(t * bps * 2) % melody.length];
    var t0 = t / (bps * 4) % 1 > 7/8 ? Math.sin(t * bps) : t;
    
    return volume * riff(t0)
        + beat() * (t / (bps * 4) > 1)
        + alt() * (t / (bps * 4) > 2)
    ;
    
    function alt () {
        var x = 110 * melody[Math.floor(t * bps * 4) % melody.length];
        return sin(x) * 0.2 + sin(x * 2) * 0.1 + sin(x * 3) * 0.3
            + sin(x * 4) * 0.2 + sin(x * 5) * 0.1
        ;
    }
    
    function riff (t_) {
        return sin_(m * 880 + sin_(8, t % 4), t % 4) * 0.3
            + sin_(m * 220) * 0.2 + sin_(m * 110) * 0.3
            + sin_(m * 442) * 0.2 + sin_(m * 228) * 0.2
        ;
        function sin_ (x) { return sin(x, t_ % 1) }
    }
    
    function beat () {
        var n = t * bps % 2;
        return sin(1100 + sin(128), (t % 1) + 1000, t % 1)
            * ((n > 15.4/8 && n < 15.8))
            + sin(8) * sin(
                300 + sin(8), (t % 4) + 2) * (8/8 < n && n < 13/8,
                t % 1
            )
        ;
    }
    
    function sin (x, t_) {
        var mod = modulo[Math.floor(t * bps / melody.length) % modulo.length];
        var y = 2 * Math.PI * x * (t_ || t);
        if (t / (bps * 4) < 2 || mod === null) return Math.sin(y);
        return Math.sin(y % mod);
    }
}