/*
 Highstock JS v6.0.1 (2017-10-05)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (N, J) {
    "object" === typeof module && module.exports
        ? (module.exports = N.document ? J(N) : J)
        : (N.Highcharts = J(N));
})("undefined" !== typeof window ? window : this, function (N) {
    var J = (function () {
        var a = N.document,
            D = (N.navigator && N.navigator.userAgent) || "",
            B =
                a &&
                a.createElementNS &&
                !!a.createElementNS("http://www.w3.org/2000/svg", "svg")
                    .createSVGRect,
            F = /(edge|msie|trident)/i.test(D) && !N.opera,
            C = /Firefox/.test(D),
            u = C && 4 > parseInt(D.split("Firefox/")[1], 10);
        return N.Highcharts
            ? N.Highcharts.error(16, !0)
            : {
                  product: "Highstock",
                  version: "6.0.1",
                  deg2rad: (2 * Math.PI) / 360,
                  doc: a,
                  hasBidiBug: u,
                  hasTouch: a && void 0 !== a.documentElement.ontouchstart,
                  isMS: F,
                  isWebKit: /AppleWebKit/.test(D),
                  isFirefox: C,
                  isTouchDevice: /(Mobile|Android|Windows Phone)/.test(D),
                  SVG_NS: "http://www.w3.org/2000/svg",
                  chartCount: 0,
                  seriesTypes: {},
                  symbolSizes: {},
                  svg: B,
                  win: N,
                  marginNames: [
                      "plotTop",
                      "marginRight",
                      "marginBottom",
                      "plotLeft",
                  ],
                  noop: function () {},
                  charts: [],
              };
    })();
    (function (a) {
        var D = [],
            B = a.charts,
            F = a.doc,
            C = a.win;
        a.error = function (u, e) {
            u = a.isNumber(u)
                ? "Highcharts error #" + u + ": www.highcharts.com/errors/" + u
                : u;
            if (e) throw Error(u);
            C.console && console.log(u);
        };
        a.Fx = function (a, e, k) {
            this.options = e;
            this.elem = a;
            this.prop = k;
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    e = this.paths[1],
                    k = [],
                    t = this.now,
                    r = a.length,
                    x;
                if (1 === t) k = this.toD;
                else if (r === e.length && 1 > t)
                    for (; r--; )
                        (x = parseFloat(a[r])),
                            (k[r] = isNaN(x)
                                ? a[r]
                                : t * parseFloat(e[r] - x) + x);
                else k = e;
                this.elem.attr("d", k, null, !0);
            },
            update: function () {
                var a = this.elem,
                    e = this.prop,
                    k = this.now,
                    t = this.options.step;
                if (this[e + "Setter"]) this[e + "Setter"]();
                else
                    a.attr
                        ? a.element && a.attr(e, k, null, !0)
                        : (a.style[e] = k + this.unit);
                t && t.call(a, k, this);
            },
            run: function (a, e, k) {
                var t = this,
                    r = function (a) {
                        return r.stopped ? !1 : t.step(a);
                    },
                    x =
                        C.requestAnimationFrame ||
                        function (a) {
                            setTimeout(a, 13);
                        },
                    f = function () {
                        var a;
                        for (a = 0; a < D.length; a++)
                            D[a]() || D.splice(a--, 1);
                        D.length && x(f);
                    };
                a === e
                    ? delete this.options.curAnim[this.prop]
                    : ((this.startTime = +new Date()),
                      (this.start = a),
                      (this.end = e),
                      (this.unit = k),
                      (this.now = this.start),
                      (this.pos = 0),
                      (r.elem = this.elem),
                      (r.prop = this.prop),
                      r() && 1 === D.push(r) && x(f));
            },
            step: function (u) {
                var e = +new Date(),
                    k,
                    t = this.options,
                    r = this.elem,
                    x = t.complete,
                    f = t.duration,
                    m = t.curAnim;
                r.attr && !r.element
                    ? (u = !1)
                    : u || e >= f + this.startTime
                    ? ((this.now = this.end),
                      (this.pos = 1),
                      this.update(),
                      (k = m[this.prop] = !0),
                      a.objectEach(m, function (a) {
                          !0 !== a && (k = !1);
                      }),
                      k && x && x.call(r),
                      (u = !1))
                    : ((this.pos = t.easing((e - this.startTime) / f)),
                      (this.now =
                          this.start + (this.end - this.start) * this.pos),
                      this.update(),
                      (u = !0));
                return u;
            },
            initPath: function (u, e, k) {
                function t(a) {
                    var b, d;
                    for (l = a.length; l--; )
                        (b = "M" === a[l] || "L" === a[l]),
                            (d = /[a-zA-Z]/.test(a[l + 3])),
                            b &&
                                d &&
                                a.splice(
                                    l + 1,
                                    0,
                                    a[l + 1],
                                    a[l + 2],
                                    a[l + 1],
                                    a[l + 2]
                                );
                }
                function r(a, d) {
                    for (; a.length < p; ) {
                        a[0] = d[p - a.length];
                        var g = a.slice(0, b);
                        [].splice.apply(a, [0, 0].concat(g));
                        A &&
                            ((g = a.slice(a.length - b)),
                            [].splice.apply(a, [a.length, 0].concat(g)),
                            l--);
                    }
                    a[0] = "M";
                }
                function x(a, g) {
                    for (var l = (p - a.length) / b; 0 < l && l--; )
                        (z = a.slice().splice(a.length / I - b, b * I)),
                            (z[0] = g[p - b - l * b]),
                            d && ((z[b - 6] = z[b - 2]), (z[b - 5] = z[b - 1])),
                            [].splice.apply(a, [a.length / I, 0].concat(z)),
                            A && l--;
                }
                e = e || "";
                var f,
                    m = u.startX,
                    w = u.endX,
                    d = -1 < e.indexOf("C"),
                    b = d ? 7 : 3,
                    p,
                    z,
                    l;
                e = e.split(" ");
                k = k.slice();
                var A = u.isArea,
                    I = A ? 2 : 1,
                    E;
                d && (t(e), t(k));
                if (m && w) {
                    for (l = 0; l < m.length; l++)
                        if (m[l] === w[0]) {
                            f = l;
                            break;
                        } else if (m[0] === w[w.length - m.length + l]) {
                            f = l;
                            E = !0;
                            break;
                        }
                    void 0 === f && (e = []);
                }
                e.length &&
                    a.isNumber(f) &&
                    ((p = k.length + f * I * b),
                    E ? (r(e, k), x(k, e)) : (r(k, e), x(e, k)));
                return [e, k];
            },
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(
                this.prop,
                a.color(this.start).tweenTo(a.color(this.end), this.pos),
                null,
                !0
            );
        };
        a.extend = function (a, e) {
            var k;
            a || (a = {});
            for (k in e) a[k] = e[k];
            return a;
        };
        a.merge = function () {
            var u,
                e = arguments,
                k,
                t = {},
                r = function (e, f) {
                    "object" !== typeof e && (e = {});
                    a.objectEach(f, function (m, w) {
                        !a.isObject(m, !0) || a.isClass(m) || a.isDOMElement(m)
                            ? (e[w] = f[w])
                            : (e[w] = r(e[w] || {}, m));
                    });
                    return e;
                };
            !0 === e[0] && ((t = e[1]), (e = Array.prototype.slice.call(e, 2)));
            k = e.length;
            for (u = 0; u < k; u++) t = r(t, e[u]);
            return t;
        };
        a.pInt = function (a, e) {
            return parseInt(a, e || 10);
        };
        a.isString = function (a) {
            return "string" === typeof a;
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a;
        };
        a.isObject = function (u, e) {
            return !!u && "object" === typeof u && (!e || !a.isArray(u));
        };
        a.isDOMElement = function (u) {
            return a.isObject(u) && "number" === typeof u.nodeType;
        };
        a.isClass = function (u) {
            var e = u && u.constructor;
            return !(
                !a.isObject(u, !0) ||
                a.isDOMElement(u) ||
                !e ||
                !e.name ||
                "Object" === e.name
            );
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a);
        };
        a.erase = function (a, e) {
            for (var k = a.length; k--; )
                if (a[k] === e) {
                    a.splice(k, 1);
                    break;
                }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a;
        };
        a.attr = function (u, e, k) {
            var t;
            a.isString(e)
                ? a.defined(k)
                    ? u.setAttribute(e, k)
                    : u && u.getAttribute && (t = u.getAttribute(e))
                : a.defined(e) &&
                  a.isObject(e) &&
                  a.objectEach(e, function (a, e) {
                      u.setAttribute(e, a);
                  });
            return t;
        };
        a.splat = function (u) {
            return a.isArray(u) ? u : [u];
        };
        a.syncTimeout = function (a, e, k) {
            if (e) return setTimeout(a, e, k);
            a.call(0, k);
        };
        a.pick = function () {
            var a = arguments,
                e,
                k,
                t = a.length;
            for (e = 0; e < t; e++)
                if (((k = a[e]), void 0 !== k && null !== k)) return k;
        };
        a.css = function (u, e) {
            a.isMS &&
                !a.svg &&
                e &&
                void 0 !== e.opacity &&
                (e.filter = "alpha(opacity\x3d" + 100 * e.opacity + ")");
            a.extend(u.style, e);
        };
        a.createElement = function (u, e, k, t, r) {
            u = F.createElement(u);
            var x = a.css;
            e && a.extend(u, e);
            r && x(u, { padding: 0, border: "none", margin: 0 });
            k && x(u, k);
            t && t.appendChild(u);
            return u;
        };
        a.extendClass = function (u, e) {
            var k = function () {};
            k.prototype = new u();
            a.extend(k.prototype, e);
            return k;
        };
        a.pad = function (a, e, k) {
            return Array((e || 2) + 1 - String(a).length).join(k || 0) + a;
        };
        a.relativeLength = function (a, e, k) {
            return /%$/.test(a)
                ? (e * parseFloat(a)) / 100 + (k || 0)
                : parseFloat(a);
        };
        a.wrap = function (a, e, k) {
            var t = a[e];
            a[e] = function () {
                var a = Array.prototype.slice.call(arguments),
                    e = arguments,
                    f = this;
                f.proceed = function () {
                    t.apply(f, arguments.length ? arguments : e);
                };
                a.unshift(t);
                a = k.apply(this, a);
                f.proceed = null;
                return a;
            };
        };
        a.getTZOffset = function (u) {
            var e = a.Date;
            return (
                6e4 *
                ((e.hcGetTimezoneOffset && e.hcGetTimezoneOffset(u)) ||
                    e.hcTimezoneOffset ||
                    0)
            );
        };
        a.dateFormat = function (u, e, k) {
            if (!a.defined(e) || isNaN(e))
                return a.defaultOptions.lang.invalidDate || "";
            u = a.pick(u, "%Y-%m-%d %H:%M:%S");
            var t = a.Date,
                r = new t(e - a.getTZOffset(e)),
                x = r[t.hcGetHours](),
                f = r[t.hcGetDay](),
                m = r[t.hcGetDate](),
                w = r[t.hcGetMonth](),
                d = r[t.hcGetFullYear](),
                b = a.defaultOptions.lang,
                p = b.weekdays,
                z = b.shortWeekdays,
                l = a.pad,
                t = a.extend(
                    {
                        a: z ? z[f] : p[f].substr(0, 3),
                        A: p[f],
                        d: l(m),
                        e: l(m, 2, " "),
                        w: f,
                        b: b.shortMonths[w],
                        B: b.months[w],
                        m: l(w + 1),
                        y: d.toString().substr(2, 2),
                        Y: d,
                        H: l(x),
                        k: x,
                        I: l(x % 12 || 12),
                        l: x % 12 || 12,
                        M: l(r[t.hcGetMinutes]()),
                        p: 12 > x ? "AM" : "PM",
                        P: 12 > x ? "am" : "pm",
                        S: l(r.getSeconds()),
                        L: l(Math.round(e % 1e3), 3),
                    },
                    a.dateFormats
                );
            a.objectEach(t, function (a, b) {
                for (; -1 !== u.indexOf("%" + b); )
                    u = u.replace("%" + b, "function" === typeof a ? a(e) : a);
            });
            return k ? u.substr(0, 1).toUpperCase() + u.substr(1) : u;
        };
        a.formatSingle = function (u, e) {
            var k = /\.([0-9])/,
                t = a.defaultOptions.lang;
            /f$/.test(u)
                ? ((k = (k = u.match(k)) ? k[1] : -1),
                  null !== e &&
                      (e = a.numberFormat(
                          e,
                          k,
                          t.decimalPoint,
                          -1 < u.indexOf(",") ? t.thousandsSep : ""
                      )))
                : (e = a.dateFormat(u, e));
            return e;
        };
        a.format = function (u, e) {
            for (var k = "{", t = !1, r, x, f, m, w = [], d; u; ) {
                k = u.indexOf(k);
                if (-1 === k) break;
                r = u.slice(0, k);
                if (t) {
                    r = r.split(":");
                    x = r.shift().split(".");
                    m = x.length;
                    d = e;
                    for (f = 0; f < m; f++) d && (d = d[x[f]]);
                    r.length && (d = a.formatSingle(r.join(":"), d));
                    w.push(d);
                } else w.push(r);
                u = u.slice(k + 1);
                k = (t = !t) ? "}" : "{";
            }
            w.push(u);
            return w.join("");
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
        };
        a.normalizeTickInterval = function (u, e, k, t, r) {
            var x,
                f = u;
            k = a.pick(k, 1);
            x = u / k;
            e ||
                ((e = r
                    ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
                    : [1, 2, 2.5, 5, 10]),
                !1 === t &&
                    (1 === k
                        ? (e = a.grep(e, function (a) {
                              return 0 === a % 1;
                          }))
                        : 0.1 >= k && (e = [1 / k])));
            for (
                t = 0;
                t < e.length &&
                !((f = e[t]),
                (r && f * k >= u) ||
                    (!r && x <= (e[t] + (e[t + 1] || e[t])) / 2));
                t++
            );
            return (f = a.correctFloat(
                f * k,
                -Math.round(Math.log(0.001) / Math.LN10)
            ));
        };
        a.stableSort = function (a, e) {
            var k = a.length,
                t,
                r;
            for (r = 0; r < k; r++) a[r].safeI = r;
            a.sort(function (a, f) {
                t = e(a, f);
                return 0 === t ? a.safeI - f.safeI : t;
            });
            for (r = 0; r < k; r++) delete a[r].safeI;
        };
        a.arrayMin = function (a) {
            for (var e = a.length, k = a[0]; e--; ) a[e] < k && (k = a[e]);
            return k;
        };
        a.arrayMax = function (a) {
            for (var e = a.length, k = a[0]; e--; ) a[e] > k && (k = a[e]);
            return k;
        };
        a.destroyObjectProperties = function (u, e) {
            a.objectEach(u, function (a, t) {
                a && a !== e && a.destroy && a.destroy();
                delete u[t];
            });
        };
        a.discardElement = function (u) {
            var e = a.garbageBin;
            e || (e = a.createElement("div"));
            u && e.appendChild(u);
            e.innerHTML = "";
        };
        a.correctFloat = function (a, e) {
            return parseFloat(a.toPrecision(e || 14));
        };
        a.setAnimation = function (u, e) {
            e.renderer.globalAnimation = a.pick(
                u,
                e.options.chart.animation,
                !0
            );
        };
        a.animObject = function (u) {
            return a.isObject(u) ? a.merge(u) : { duration: u ? 500 : 0 };
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            week: 6048e5,
            month: 24192e5,
            year: 314496e5,
        };
        a.numberFormat = function (u, e, k, t) {
            u = +u || 0;
            e = +e;
            var r = a.defaultOptions.lang,
                x = (u.toString().split(".")[1] || "").split("e")[0].length,
                f,
                m,
                w = u.toString().split("e");
            -1 === e ? (e = Math.min(x, 20)) : a.isNumber(e) || (e = 2);
            m = (
                Math.abs(w[1] ? w[0] : u) + Math.pow(10, -Math.max(e, x) - 1)
            ).toFixed(e);
            x = String(a.pInt(m));
            f = 3 < x.length ? x.length % 3 : 0;
            k = a.pick(k, r.decimalPoint);
            t = a.pick(t, r.thousandsSep);
            u = (0 > u ? "-" : "") + (f ? x.substr(0, f) + t : "");
            u += x.substr(f).replace(/(\d{3})(?=\d)/g, "$1" + t);
            e && (u += k + m.slice(-e));
            w[1] && (u += "e" + w[1]);
            return u;
        };
        Math.easeInOutSine = function (a) {
            return -0.5 * (Math.cos(Math.PI * a) - 1);
        };
        a.getStyle = function (u, e, k) {
            if ("width" === e)
                return (
                    Math.min(u.offsetWidth, u.scrollWidth) -
                    a.getStyle(u, "padding-left") -
                    a.getStyle(u, "padding-right")
                );
            if ("height" === e)
                return (
                    Math.min(u.offsetHeight, u.scrollHeight) -
                    a.getStyle(u, "padding-top") -
                    a.getStyle(u, "padding-bottom")
                );
            C.getComputedStyle || a.error(27, !0);
            if ((u = C.getComputedStyle(u, void 0)))
                (u = u.getPropertyValue(e)),
                    a.pick(k, "opacity" !== e) && (u = a.pInt(u));
            return u;
        };
        a.inArray = function (u, e) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(e, u);
        };
        a.grep = function (u, e) {
            return (a.filterPolyfill || Array.prototype.filter).call(u, e);
        };
        a.find = Array.prototype.find
            ? function (a, e) {
                  return a.find(e);
              }
            : function (a, e) {
                  var k,
                      t = a.length;
                  for (k = 0; k < t; k++) if (e(a[k], k)) return a[k];
              };
        a.map = function (a, e) {
            for (var k = [], t = 0, r = a.length; t < r; t++)
                k[t] = e.call(a[t], a[t], t, a);
            return k;
        };
        a.reduce = function (u, e, k) {
            return (a.reducePolyfill || Array.prototype.reduce).call(u, e, k);
        };
        a.offset = function (a) {
            var e = F.documentElement;
            a = a.getBoundingClientRect();
            return {
                top:
                    a.top + (C.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left:
                    a.left +
                    (C.pageXOffset || e.scrollLeft) -
                    (e.clientLeft || 0),
            };
        };
        a.stop = function (a, e) {
            for (var k = D.length; k--; )
                D[k].elem !== a ||
                    (e && e !== D[k].prop) ||
                    (D[k].stopped = !0);
        };
        a.each = function (u, e, k) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(u, e, k);
        };
        a.objectEach = function (a, e, k) {
            for (var t in a) a.hasOwnProperty(t) && e.call(k, a[t], t, a);
        };
        a.addEvent = function (u, e, k) {
            var t = (u.hcEvents = u.hcEvents || {}),
                r = u.addEventListener || a.addEventListenerPolyfill;
            r && r.call(u, e, k, !1);
            t[e] || (t[e] = []);
            t[e].push(k);
            return function () {
                a.removeEvent(u, e, k);
            };
        };
        a.removeEvent = function (u, e, k) {
            function t(f, d) {
                var b = u.removeEventListener || a.removeEventListenerPolyfill;
                b && b.call(u, f, d, !1);
            }
            function r() {
                var m, d;
                u.nodeName &&
                    (e ? ((m = {}), (m[e] = !0)) : (m = f),
                    a.objectEach(m, function (a, p) {
                        if (f[p]) for (d = f[p].length; d--; ) t(p, f[p][d]);
                    }));
            }
            var x,
                f = u.hcEvents,
                m;
            f &&
                (e
                    ? ((x = f[e] || []),
                      k
                          ? ((m = a.inArray(k, x)),
                            -1 < m && (x.splice(m, 1), (f[e] = x)),
                            t(e, k))
                          : (r(), (f[e] = [])))
                    : (r(), (u.hcEvents = {})));
        };
        a.fireEvent = function (u, e, k, t) {
            var r;
            r = u.hcEvents;
            var x, f;
            k = k || {};
            if (F.createEvent && (u.dispatchEvent || u.fireEvent))
                (r = F.createEvent("Events")),
                    r.initEvent(e, !0, !0),
                    a.extend(r, k),
                    u.dispatchEvent ? u.dispatchEvent(r) : u.fireEvent(e, r);
            else if (r)
                for (
                    r = r[e] || [],
                        x = r.length,
                        k.target ||
                            a.extend(k, {
                                preventDefault: function () {
                                    k.defaultPrevented = !0;
                                },
                                target: u,
                                type: e,
                            }),
                        e = 0;
                    e < x;
                    e++
                )
                    (f = r[e]) && !1 === f.call(u, k) && k.preventDefault();
            t && !k.defaultPrevented && t(k);
        };
        a.animate = function (u, e, k) {
            var t,
                r = "",
                x,
                f,
                m;
            a.isObject(k) ||
                ((m = arguments),
                (k = { duration: m[2], easing: m[3], complete: m[4] }));
            a.isNumber(k.duration) || (k.duration = 400);
            k.easing =
                "function" === typeof k.easing
                    ? k.easing
                    : Math[k.easing] || Math.easeInOutSine;
            k.curAnim = a.merge(e);
            a.objectEach(e, function (m, d) {
                a.stop(u, d);
                f = new a.Fx(u, k, d);
                x = null;
                "d" === d
                    ? ((f.paths = f.initPath(u, u.d, e.d)),
                      (f.toD = e.d),
                      (t = 0),
                      (x = 1))
                    : u.attr
                    ? (t = u.attr(d))
                    : ((t = parseFloat(a.getStyle(u, d)) || 0),
                      "opacity" !== d && (r = "px"));
                x || (x = m);
                x && x.match && x.match("px") && (x = x.replace(/px/g, ""));
                f.run(t, x, r);
            });
        };
        a.seriesType = function (u, e, k, t, r) {
            var x = a.getOptions(),
                f = a.seriesTypes;
            x.plotOptions[u] = a.merge(x.plotOptions[e], k);
            f[u] = a.extendClass(f[e] || function () {}, t);
            f[u].prototype.type = u;
            r && (f[u].prototype.pointClass = a.extendClass(a.Point, r));
            return f[u];
        };
        a.uniqueKey = (function () {
            var a = Math.random().toString(36).substring(2, 9),
                e = 0;
            return function () {
                return "highcharts-" + a + "-" + e++;
            };
        })();
        C.jQuery &&
            (C.jQuery.fn.highcharts = function () {
                var u = [].slice.call(arguments);
                if (this[0])
                    return u[0]
                        ? (new a[a.isString(u[0]) ? u.shift() : "Chart"](
                              this[0],
                              u[0],
                              u[1]
                          ),
                          this)
                        : B[a.attr(this[0], "data-highcharts-chart")];
            });
    })(J);
    (function (a) {
        var D = a.each,
            B = a.isNumber,
            F = a.map,
            C = a.merge,
            u = a.pInt;
        a.Color = function (e) {
            if (!(this instanceof a.Color)) return new a.Color(e);
            this.init(e);
        };
        a.Color.prototype = {
            parsers: [
                {
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (a) {
                        return [
                            u(a[1]),
                            u(a[2]),
                            u(a[3]),
                            parseFloat(a[4], 10),
                        ];
                    },
                },
                {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (a) {
                        return [u(a[1]), u(a[2]), u(a[3]), 1];
                    },
                },
            ],
            names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000",
            },
            init: function (e) {
                var k, t, r, x;
                if (
                    (this.input = e =
                        this.names[e && e.toLowerCase ? e.toLowerCase() : ""] ||
                        e) &&
                    e.stops
                )
                    this.stops = F(e.stops, function (f) {
                        return new a.Color(f[1]);
                    });
                else if (
                    (e &&
                        e.charAt &&
                        "#" === e.charAt() &&
                        ((k = e.length),
                        (e = parseInt(e.substr(1), 16)),
                        7 === k
                            ? (t = [
                                  (e & 16711680) >> 16,
                                  (e & 65280) >> 8,
                                  e & 255,
                                  1,
                              ])
                            : 4 === k &&
                              (t = [
                                  ((e & 3840) >> 4) | ((e & 3840) >> 8),
                                  ((e & 240) >> 4) | (e & 240),
                                  ((e & 15) << 4) | (e & 15),
                                  1,
                              ])),
                    !t)
                )
                    for (r = this.parsers.length; r-- && !t; )
                        (x = this.parsers[r]),
                            (k = x.regex.exec(e)) && (t = x.parse(k));
                this.rgba = t || [];
            },
            get: function (a) {
                var e = this.input,
                    t = this.rgba,
                    r;
                this.stops
                    ? ((r = C(e)),
                      (r.stops = [].concat(r.stops)),
                      D(this.stops, function (e, f) {
                          r.stops[f] = [r.stops[f][0], e.get(a)];
                      }))
                    : (r =
                          t && B(t[0])
                              ? "rgb" === a || (!a && 1 === t[3])
                                  ? "rgb(" +
                                    t[0] +
                                    "," +
                                    t[1] +
                                    "," +
                                    t[2] +
                                    ")"
                                  : "a" === a
                                  ? t[3]
                                  : "rgba(" + t.join(",") + ")"
                              : e);
                return r;
            },
            brighten: function (a) {
                var e,
                    t = this.rgba;
                if (this.stops)
                    D(this.stops, function (e) {
                        e.brighten(a);
                    });
                else if (B(a) && 0 !== a)
                    for (e = 0; 3 > e; e++)
                        (t[e] += u(255 * a)),
                            0 > t[e] && (t[e] = 0),
                            255 < t[e] && (t[e] = 255);
                return this;
            },
            setOpacity: function (a) {
                this.rgba[3] = a;
                return this;
            },
            tweenTo: function (a, k) {
                var e = this.rgba,
                    r = a.rgba;
                r.length && e && e.length
                    ? ((a = 1 !== r[3] || 1 !== e[3]),
                      (k =
                          (a ? "rgba(" : "rgb(") +
                          Math.round(r[0] + (e[0] - r[0]) * (1 - k)) +
                          "," +
                          Math.round(r[1] + (e[1] - r[1]) * (1 - k)) +
                          "," +
                          Math.round(r[2] + (e[2] - r[2]) * (1 - k)) +
                          (a ? "," + (r[3] + (e[3] - r[3]) * (1 - k)) : "") +
                          ")"))
                    : (k = a.input || "none");
                return k;
            },
        };
        a.color = function (e) {
            return new a.Color(e);
        };
    })(J);
    (function (a) {
        var D,
            B,
            F = a.addEvent,
            C = a.animate,
            u = a.attr,
            e = a.charts,
            k = a.color,
            t = a.css,
            r = a.createElement,
            x = a.defined,
            f = a.deg2rad,
            m = a.destroyObjectProperties,
            w = a.doc,
            d = a.each,
            b = a.extend,
            p = a.erase,
            z = a.grep,
            l = a.hasTouch,
            A = a.inArray,
            I = a.isArray,
            E = a.isFirefox,
            H = a.isMS,
            g = a.isObject,
            y = a.isString,
            n = a.isWebKit,
            c = a.merge,
            h = a.noop,
            G = a.objectEach,
            v = a.pick,
            q = a.pInt,
            O = a.removeEvent,
            L = a.splat,
            K = a.stop,
            T = a.svg,
            Q = a.SVG_NS,
            P = a.symbolSizes,
            M = a.win;
        D = a.SVGElement = function () {
            return this;
        };
        b(D.prototype, {
            opacity: 1,
            SVG_NS: Q,
            textProps:
                "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(
                    " "
                ),
            init: function (a, c) {
                this.element =
                    "span" === c ? r(c) : w.createElementNS(this.SVG_NS, c);
                this.renderer = a;
            },
            animate: function (c, q, h) {
                q = a.animObject(v(q, this.renderer.globalAnimation, !0));
                0 !== q.duration
                    ? (h && (q.complete = h), C(this, c, q))
                    : (this.attr(c, null, h), q.step && q.step.call(this));
                return this;
            },
            colorGradient: function (v, q, h) {
                var n = this.renderer,
                    b,
                    l,
                    g,
                    p,
                    R,
                    K,
                    z,
                    f,
                    L,
                    y,
                    m = [],
                    A;
                v.radialGradient
                    ? (l = "radialGradient")
                    : v.linearGradient && (l = "linearGradient");
                l &&
                    ((g = v[l]),
                    (R = n.gradients),
                    (z = v.stops),
                    (y = h.radialReference),
                    I(g) &&
                        (v[l] = g =
                            {
                                x1: g[0],
                                y1: g[1],
                                x2: g[2],
                                y2: g[3],
                                gradientUnits: "userSpaceOnUse",
                            }),
                    "radialGradient" === l &&
                        y &&
                        !x(g.gradientUnits) &&
                        ((p = g),
                        (g = c(g, n.getRadialAttr(y, p), {
                            gradientUnits: "userSpaceOnUse",
                        }))),
                    G(g, function (a, c) {
                        "id" !== c && m.push(c, a);
                    }),
                    G(z, function (a) {
                        m.push(a);
                    }),
                    (m = m.join(",")),
                    R[m]
                        ? (y = R[m].attr("id"))
                        : ((g.id = y = a.uniqueKey()),
                          (R[m] = K = n.createElement(l).attr(g).add(n.defs)),
                          (K.radAttr = p),
                          (K.stops = []),
                          d(z, function (c) {
                              0 === c[1].indexOf("rgba")
                                  ? ((b = a.color(c[1])),
                                    (f = b.get("rgb")),
                                    (L = b.get("a")))
                                  : ((f = c[1]), (L = 1));
                              c = n
                                  .createElement("stop")
                                  .attr({
                                      offset: c[0],
                                      "stop-color": f,
                                      "stop-opacity": L,
                                  })
                                  .add(K);
                              K.stops.push(c);
                          })),
                    (A = "url(" + n.url + "#" + y + ")"),
                    h.setAttribute(q, A),
                    (h.gradient = m),
                    (v.toString = function () {
                        return A;
                    }));
            },
            applyTextOutline: function (c) {
                var v = this.element,
                    q,
                    h,
                    n,
                    g,
                    b;
                -1 !== c.indexOf("contrast") &&
                    (c = c.replace(
                        /contrast/g,
                        this.renderer.getContrast(v.style.fill)
                    ));
                c = c.split(" ");
                h = c[c.length - 1];
                if ((n = c[0]) && "none" !== n && a.svg) {
                    this.fakeTS = !0;
                    c = [].slice.call(v.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    n = n.replace(/(^[\d\.]+)(.*?)$/g, function (a, c, v) {
                        return 2 * c + v;
                    });
                    for (b = c.length; b--; )
                        (q = c[b]),
                            "highcharts-text-outline" ===
                                q.getAttribute("class") &&
                                p(c, v.removeChild(q));
                    g = v.firstChild;
                    d(c, function (a, c) {
                        0 === c &&
                            (a.setAttribute("x", v.getAttribute("x")),
                            (c = v.getAttribute("y")),
                            a.setAttribute("y", c || 0),
                            null === c && v.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        u(a, {
                            class: "highcharts-text-outline",
                            fill: h,
                            stroke: h,
                            "stroke-width": n,
                            "stroke-linejoin": "round",
                        });
                        v.insertBefore(a, g);
                    });
                }
            },
            attr: function (a, c, v, q) {
                var h,
                    n = this.element,
                    g,
                    b = this,
                    l,
                    d;
                "string" === typeof a &&
                    void 0 !== c &&
                    ((h = a), (a = {}), (a[h] = c));
                "string" === typeof a
                    ? (b = (this[a + "Getter"] || this._defaultGetter).call(
                          this,
                          a,
                          n
                      ))
                    : (G(
                          a,
                          function (c, v) {
                              l = !1;
                              q || K(this, v);
                              this.symbolName &&
                                  /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(
                                      v
                                  ) &&
                                  (g || (this.symbolAttr(a), (g = !0)),
                                  (l = !0));
                              !this.rotation ||
                                  ("x" !== v && "y" !== v) ||
                                  (this.doTransform = !0);
                              l ||
                                  ((d =
                                      this[v + "Setter"] ||
                                      this._defaultSetter),
                                  d.call(this, c, v, n));
                          },
                          this
                      ),
                      this.afterSetters());
                v && v();
                return b;
            },
            afterSetters: function () {
                this.doTransform &&
                    (this.updateTransform(), (this.doTransform = !1));
            },
            addClass: function (a, c) {
                var v = this.attr("class") || "";
                -1 === v.indexOf(a) &&
                    (c || (a = (v + (v ? " " : "") + a).replace("  ", " ")),
                    this.attr("class", a));
                return this;
            },
            hasClass: function (a) {
                return -1 !== A(a, (this.attr("class") || "").split(" "));
            },
            removeClass: function (a) {
                return this.attr(
                    "class",
                    (this.attr("class") || "").replace(a, "")
                );
            },
            symbolAttr: function (a) {
                var c = this;
                d(
                    "x y r start end width height innerR anchorX anchorY".split(
                        " "
                    ),
                    function (q) {
                        c[q] = v(a[q], c[q]);
                    }
                );
                c.attr({
                    d: c.renderer.symbols[c.symbolName](
                        c.x,
                        c.y,
                        c.width,
                        c.height,
                        c
                    ),
                });
            },
            clip: function (a) {
                return this.attr(
                    "clip-path",
                    a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none"
                );
            },
            crisp: function (a, c) {
                var v = this,
                    q = {},
                    h;
                c = c || a.strokeWidth || 0;
                h = (Math.round(c) % 2) / 2;
                a.x = Math.floor(a.x || v.x || 0) + h;
                a.y = Math.floor(a.y || v.y || 0) + h;
                a.width = Math.floor((a.width || v.width || 0) - 2 * h);
                a.height = Math.floor((a.height || v.height || 0) - 2 * h);
                x(a.strokeWidth) && (a.strokeWidth = c);
                G(a, function (a, c) {
                    v[c] !== a && (v[c] = q[c] = a);
                });
                return q;
            },
            css: function (a) {
                var c = this.styles,
                    v = {},
                    h = this.element,
                    n,
                    g = "",
                    l,
                    d = !c,
                    p = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                c &&
                    G(a, function (a, q) {
                        a !== c[q] && ((v[q] = a), (d = !0));
                    });
                d &&
                    (c && (a = b(c, v)),
                    (n = this.textWidth =
                        a &&
                        a.width &&
                        "auto" !== a.width &&
                        "text" === h.nodeName.toLowerCase() &&
                        q(a.width)),
                    (this.styles = a),
                    n && !T && this.renderer.forExport && delete a.width,
                    H && !T
                        ? t(this.element, a)
                        : ((l = function (a, c) {
                              return "-" + c.toLowerCase();
                          }),
                          G(a, function (a, c) {
                              -1 === A(c, p) &&
                                  (g +=
                                      c.replace(/([A-Z])/g, l) + ":" + a + ";");
                          }),
                          g && u(h, "style", g)),
                    this.added &&
                        ("text" === this.element.nodeName &&
                            this.renderer.buildText(this),
                        a &&
                            a.textOutline &&
                            this.applyTextOutline(a.textOutline)));
                return this;
            },
            getStyle: function (a) {
                return M.getComputedStyle(
                    this.element || this,
                    ""
                ).getPropertyValue(a);
            },
            strokeWidth: function () {
                var a = this.getStyle("stroke-width"),
                    c;
                a.indexOf("px") === a.length - 2
                    ? (a = q(a))
                    : ((c = w.createElementNS(Q, "rect")),
                      u(c, { width: a, "stroke-width": 0 }),
                      this.element.parentNode.appendChild(c),
                      (a = c.getBBox().width),
                      c.parentNode.removeChild(c));
                return a;
            },
            on: function (a, c) {
                var v = this,
                    q = v.element;
                l && "click" === a
                    ? ((q.ontouchstart = function (a) {
                          v.touchEventFired = Date.now();
                          a.preventDefault();
                          c.call(q, a);
                      }),
                      (q.onclick = function (a) {
                          (-1 === M.navigator.userAgent.indexOf("Android") ||
                              1100 < Date.now() - (v.touchEventFired || 0)) &&
                              c.call(q, a);
                      }))
                    : (q["on" + a] = c);
                return this;
            },
            setRadialReference: function (a) {
                var c = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                c &&
                    c.radAttr &&
                    c.animate(this.renderer.getRadialAttr(a, c.radAttr));
                return this;
            },
            translate: function (a, c) {
                return this.attr({ translateX: a, translateY: c });
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this;
            },
            updateTransform: function () {
                var a = this.translateX || 0,
                    c = this.translateY || 0,
                    q = this.scaleX,
                    h = this.scaleY,
                    n = this.inverted,
                    g = this.rotation,
                    b = this.matrix,
                    l = this.element;
                n && ((a += this.width), (c += this.height));
                a = ["translate(" + a + "," + c + ")"];
                x(b) && a.push("matrix(" + b.join(",") + ")");
                n
                    ? a.push("rotate(90) scale(-1,1)")
                    : g &&
                      a.push(
                          "rotate(" +
                              g +
                              " " +
                              v(this.rotationOriginX, l.getAttribute("x"), 0) +
                              " " +
                              v(
                                  this.rotationOriginY,
                                  l.getAttribute("y") || 0
                              ) +
                              ")"
                      );
                (x(q) || x(h)) &&
                    a.push("scale(" + v(q, 1) + " " + v(h, 1) + ")");
                a.length && l.setAttribute("transform", a.join(" "));
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this;
            },
            align: function (a, c, q) {
                var h,
                    n,
                    g,
                    b,
                    l = {};
                n = this.renderer;
                g = n.alignedObjects;
                var d, K;
                if (a) {
                    if (
                        ((this.alignOptions = a),
                        (this.alignByTranslate = c),
                        !q || y(q))
                    )
                        (this.alignTo = h = q || "renderer"),
                            p(g, this),
                            g.push(this),
                            (q = null);
                } else
                    (a = this.alignOptions),
                        (c = this.alignByTranslate),
                        (h = this.alignTo);
                q = v(q, n[h], n);
                h = a.align;
                n = a.verticalAlign;
                g = (q.x || 0) + (a.x || 0);
                b = (q.y || 0) + (a.y || 0);
                "right" === h ? (d = 1) : "center" === h && (d = 2);
                d && (g += (q.width - (a.width || 0)) / d);
                l[c ? "translateX" : "x"] = Math.round(g);
                "bottom" === n ? (K = 1) : "middle" === n && (K = 2);
                K && (b += (q.height - (a.height || 0)) / K);
                l[c ? "translateY" : "y"] = Math.round(b);
                this[this.placed ? "animate" : "attr"](l);
                this.placed = !0;
                this.alignAttr = l;
                return this;
            },
            getBBox: function (a, c) {
                var q,
                    h = this.renderer,
                    n,
                    g = this.element,
                    l = this.styles,
                    p,
                    K = this.textStr,
                    z,
                    L = h.cache,
                    y = h.cacheKeys,
                    m;
                c = v(c, this.rotation);
                n = c * f;
                p = g && D.prototype.getStyle.call(g, "font-size");
                void 0 !== K &&
                    ((m = K.toString()),
                    -1 === m.indexOf("\x3c") && (m = m.replace(/[0-9]/g, "0")),
                    (m += [
                        "",
                        c || 0,
                        p,
                        l && l.width,
                        l && l.textOverflow,
                    ].join()));
                m && !a && (q = L[m]);
                if (!q) {
                    if (g.namespaceURI === this.SVG_NS || h.forExport) {
                        try {
                            (z =
                                this.fakeTS &&
                                function (a) {
                                    d(
                                        g.querySelectorAll(
                                            ".highcharts-text-outline"
                                        ),
                                        function (c) {
                                            c.style.display = a;
                                        }
                                    );
                                }) && z("none"),
                                (q = g.getBBox
                                    ? b({}, g.getBBox())
                                    : {
                                          width: g.offsetWidth,
                                          height: g.offsetHeight,
                                      }),
                                z && z("");
                        } catch (S) {}
                        if (!q || 0 > q.width) q = { width: 0, height: 0 };
                    } else q = this.htmlGetBBox();
                    h.isSVG &&
                        ((a = q.width),
                        (h = q.height),
                        l &&
                            "11px" === l.fontSize &&
                            17 === Math.round(h) &&
                            (q.height = h = 14),
                        c &&
                            ((q.width =
                                Math.abs(h * Math.sin(n)) +
                                Math.abs(a * Math.cos(n))),
                            (q.height =
                                Math.abs(h * Math.cos(n)) +
                                Math.abs(a * Math.sin(n)))));
                    if (m && 0 < q.height) {
                        for (; 250 < y.length; ) delete L[y.shift()];
                        L[m] || y.push(m);
                        L[m] = q;
                    }
                }
                return q;
            },
            show: function (a) {
                return this.attr({ visibility: a ? "inherit" : "visible" });
            },
            hide: function () {
                return this.attr({ visibility: "hidden" });
            },
            fadeOut: function (a) {
                var c = this;
                c.animate(
                    { opacity: 0 },
                    {
                        duration: a || 150,
                        complete: function () {
                            c.attr({ y: -9999 });
                        },
                    }
                );
            },
            add: function (a) {
                var c = this.renderer,
                    v = this.element,
                    q;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && c.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) q = this.zIndexSetter();
                q || (a ? a.element : c.box).appendChild(v);
                if (this.onAdd) this.onAdd();
                return this;
            },
            safeRemoveChild: function (a) {
                var c = a.parentNode;
                c && c.removeChild(a);
            },
            destroy: function () {
                var a = this,
                    c = a.element || {},
                    v =
                        a.renderer.isSVG &&
                        "SPAN" === c.nodeName &&
                        a.parentGroup,
                    q = c.ownerSVGElement;
                c.onclick =
                    c.onmouseout =
                    c.onmouseover =
                    c.onmousemove =
                    c.point =
                        null;
                K(a);
                a.clipPath &&
                    q &&
                    (d(q.querySelectorAll("[clip-path]"), function (c) {
                        -1 <
                            c
                                .getAttribute("clip-path")
                                .indexOf(a.clipPath.element.id + ")") &&
                            c.removeAttribute("clip-path");
                    }),
                    (a.clipPath = a.clipPath.destroy()));
                if (a.stops) {
                    for (q = 0; q < a.stops.length; q++)
                        a.stops[q] = a.stops[q].destroy();
                    a.stops = null;
                }
                for (
                    a.safeRemoveChild(c);
                    v && v.div && 0 === v.div.childNodes.length;

                )
                    (c = v.parentGroup),
                        a.safeRemoveChild(v.div),
                        delete v.div,
                        (v = c);
                a.alignTo && p(a.renderer.alignedObjects, a);
                G(a, function (c, v) {
                    delete a[v];
                });
                return null;
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName &&
                    ("x" === a ? (a = "cx") : "y" === a && (a = "cy"));
                return this._defaultGetter(a);
            },
            _defaultGetter: function (a) {
                a = v(
                    this[a],
                    this.element ? this.element.getAttribute(a) : null,
                    0
                );
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a;
            },
            dSetter: function (a, c, v) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[c] !== a && (v.setAttribute(c, a), (this[c] = a));
            },
            alignSetter: function (a) {
                this.element.setAttribute(
                    "text-anchor",
                    { left: "start", center: "middle", right: "end" }[a]
                );
            },
            opacitySetter: function (a, c, v) {
                this[c] = a;
                v.setAttribute(c, a);
            },
            titleSetter: function (a) {
                var c = this.element.getElementsByTagName("title")[0];
                c ||
                    ((c = w.createElementNS(this.SVG_NS, "title")),
                    this.element.appendChild(c));
                c.firstChild && c.removeChild(c.firstChild);
                c.appendChild(
                    w.createTextNode(String(v(a), "").replace(/<[^>]*>/g, ""))
                );
            },
            textSetter: function (a) {
                a !== this.textStr &&
                    (delete this.bBox,
                    (this.textStr = a),
                    this.added && this.renderer.buildText(this));
            },
            fillSetter: function (a, c, v) {
                "string" === typeof a
                    ? v.setAttribute(c, a)
                    : a && this.colorGradient(a, c, v);
            },
            visibilitySetter: function (a, c, v) {
                "inherit" === a
                    ? v.removeAttribute(c)
                    : this[c] !== a && v.setAttribute(c, a);
                this[c] = a;
            },
            zIndexSetter: function (a, c) {
                var v = this.renderer,
                    h = this.parentGroup,
                    n = (h || v).element || v.box,
                    g,
                    l = this.element,
                    b,
                    d,
                    v = n === v.box;
                g = this.added;
                var p;
                x(a) &&
                    ((l.zIndex = a),
                    (a = +a),
                    this[c] === a && (g = !1),
                    (this[c] = a));
                if (g) {
                    (a = this.zIndex) && h && (h.handleZ = !0);
                    c = n.childNodes;
                    for (p = c.length - 1; 0 <= p && !b; p--)
                        if (((h = c[p]), (g = h.zIndex), (d = !x(g)), h !== l))
                            if (0 > a && d && !v && !p)
                                n.insertBefore(l, c[p]), (b = !0);
                            else if (q(g) <= a || (d && (!x(a) || 0 <= a)))
                                n.insertBefore(l, c[p + 1] || null), (b = !0);
                    b || (n.insertBefore(l, c[v ? 3 : 0] || null), (b = !0));
                }
                return b;
            },
            _defaultSetter: function (a, c, v) {
                v.setAttribute(c, a);
            },
        });
        D.prototype.yGetter = D.prototype.xGetter;
        D.prototype.translateXSetter =
            D.prototype.translateYSetter =
            D.prototype.rotationSetter =
            D.prototype.verticalAlignSetter =
            D.prototype.rotationOriginXSetter =
            D.prototype.rotationOriginYSetter =
            D.prototype.scaleXSetter =
            D.prototype.scaleYSetter =
            D.prototype.matrixSetter =
                function (a, c) {
                    this[c] = a;
                    this.doTransform = !0;
                };
        B = a.SVGRenderer = function () {
            this.init.apply(this, arguments);
        };
        b(B.prototype, {
            Element: D,
            SVG_NS: Q,
            init: function (a, c, v, q, h, g) {
                var l;
                q = this.createElement("svg").attr({
                    version: "1.1",
                    class: "highcharts-root",
                });
                l = q.element;
                a.appendChild(l);
                -1 === a.innerHTML.indexOf("xmlns") &&
                    u(l, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = l;
                this.boxWrapper = q;
                this.alignedObjects = [];
                this.url =
                    (E || n) && w.getElementsByTagName("base").length
                        ? M.location.href
                              .replace(/#.*?$/, "")
                              .replace(/<[^>]*>/g, "")
                              .replace(/([\('\)])/g, "\\$1")
                              .replace(/ /g, "%20")
                        : "";
                this.createElement("desc")
                    .add()
                    .element.appendChild(
                        w.createTextNode("Created with Highstock 6.0.1")
                    );
                this.defs = this.createElement("defs").add();
                this.allowHTML = g;
                this.forExport = h;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(c, v, !1);
                var b;
                E &&
                    a.getBoundingClientRect &&
                    ((c = function () {
                        t(a, { left: 0, top: 0 });
                        b = a.getBoundingClientRect();
                        t(a, {
                            left: Math.ceil(b.left) - b.left + "px",
                            top: Math.ceil(b.top) - b.top + "px",
                        });
                    }),
                    c(),
                    (this.unSubPixelFix = F(M, "resize", c)));
            },
            definition: function (a) {
                function c(a, q) {
                    var h;
                    d(L(a), function (a) {
                        var n = v.createElement(a.tagName),
                            g = {};
                        G(a, function (a, c) {
                            "tagName" !== c &&
                                "children" !== c &&
                                "textContent" !== c &&
                                (g[c] = a);
                        });
                        n.attr(g);
                        n.add(q || v.defs);
                        a.textContent &&
                            n.element.appendChild(
                                w.createTextNode(a.textContent)
                            );
                        c(a.children || [], n);
                        h = n;
                    });
                    return h;
                }
                var v = this;
                return c(a);
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width;
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                m(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return (this.alignedObjects = null);
            },
            createElement: function (a) {
                var c = new this.Element();
                c.init(this, a);
                return c;
            },
            draw: h,
            getRadialAttr: function (a, c) {
                return {
                    cx: a[0] - a[2] / 2 + c.cx * a[2],
                    cy: a[1] - a[2] / 2 + c.cy * a[2],
                    r: c.r * a[2],
                };
            },
            getSpanWidth: function (a, c) {
                var v = a.getBBox(!0).width;
                !T &&
                    this.forExport &&
                    (v = this.measureSpanWidth(c.firstChild.data, a.styles));
                return v;
            },
            applyEllipsis: function (a, c, v, q) {
                var h = a.rotation,
                    n = v,
                    g,
                    l = 0,
                    b = v.length,
                    d = function (a) {
                        c.removeChild(c.firstChild);
                        a && c.appendChild(w.createTextNode(a));
                    },
                    p;
                a.rotation = 0;
                n = this.getSpanWidth(a, c);
                if ((p = n > q)) {
                    for (; l <= b; )
                        (g = Math.ceil((l + b) / 2)),
                            (n = v.substring(0, g) + "\u2026"),
                            d(n),
                            (n = this.getSpanWidth(a, c)),
                            l === b
                                ? (l = b + 1)
                                : n > q
                                ? (b = g - 1)
                                : (l = g);
                    0 === b && d("");
                }
                a.rotation = h;
                return p;
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot",
            },
            buildText: function (a) {
                var c = a.element,
                    h = this,
                    n = h.forExport,
                    g = v(a.textStr, "").toString(),
                    l = -1 !== g.indexOf("\x3c"),
                    b = c.childNodes,
                    p,
                    K,
                    f,
                    L,
                    y = u(c, "x"),
                    m = a.styles,
                    A = a.textWidth,
                    O = m && m.lineHeight,
                    e = m && m.textOutline,
                    E = m && "ellipsis" === m.textOverflow,
                    k = m && "nowrap" === m.whiteSpace,
                    x,
                    H = b.length,
                    r = A && !a.added && this.box,
                    I = function (a) {
                        return O
                            ? q(O)
                            : h.fontMetrics(
                                  void 0,
                                  a.getAttribute("style") ? a : c
                              ).h;
                    },
                    R = function (a) {
                        G(h.escapes, function (c, v) {
                            a = a.replace(new RegExp(c, "g"), v);
                        });
                        return a;
                    },
                    m = [g, E, k, O, e, m && m.fontSize, A].join();
                if (m !== a.textCache) {
                    for (a.textCache = m; H--; ) c.removeChild(b[H]);
                    l || e || E || A || -1 !== g.indexOf(" ")
                        ? ((p = /<.*class="([^"]+)".*>/),
                          (K = /<.*style="([^"]+)".*>/),
                          (f = /<.*href="([^"]+)".*>/),
                          r && r.appendChild(c),
                          (g = l
                              ? g
                                    .replace(
                                        /<(b|strong)>/g,
                                        '\x3cspan class\x3d"highcharts-strong"\x3e'
                                    )
                                    .replace(
                                        /<(i|em)>/g,
                                        '\x3cspan class\x3d"highcharts-emphasized"\x3e'
                                    )
                                    .replace(/<a/g, "\x3cspan")
                                    .replace(
                                        /<\/(b|strong|i|em|a)>/g,
                                        "\x3c/span\x3e"
                                    )
                                    .split(/<br.*?>/g)
                              : [g]),
                          (g = z(g, function (a) {
                              return "" !== a;
                          })),
                          d(g, function (v, q) {
                              var g,
                                  l = 0;
                              v = v
                                  .replace(/^\s+|\s+$/g, "")
                                  .replace(/<span/g, "|||\x3cspan")
                                  .replace(/<\/span>/g, "\x3c/span\x3e|||");
                              g = v.split("|||");
                              d(g, function (v) {
                                  if ("" !== v || 1 === g.length) {
                                      var b = {},
                                          d = w.createElementNS(
                                              h.SVG_NS,
                                              "tspan"
                                          ),
                                          z,
                                          m;
                                      p.test(v) &&
                                          ((z = v.match(p)[1]),
                                          u(d, "class", z));
                                      K.test(v) &&
                                          ((m = v
                                              .match(K)[1]
                                              .replace(
                                                  /(;| |^)color([ :])/,
                                                  "$1fill$2"
                                              )),
                                          u(d, "style", m));
                                      f.test(v) &&
                                          !n &&
                                          (u(
                                              d,
                                              "onclick",
                                              'location.href\x3d"' +
                                                  v.match(f)[1] +
                                                  '"'
                                          ),
                                          u(d, "class", "highcharts-anchor"));
                                      v = R(
                                          v.replace(
                                              /<[a-zA-Z\/](.|\n)*?>/g,
                                              ""
                                          ) || " "
                                      );
                                      if (" " !== v) {
                                          d.appendChild(w.createTextNode(v));
                                          l
                                              ? (b.dx = 0)
                                              : q && null !== y && (b.x = y);
                                          u(d, b);
                                          c.appendChild(d);
                                          !l &&
                                              x &&
                                              (!T &&
                                                  n &&
                                                  t(d, { display: "block" }),
                                              u(d, "dy", I(d)));
                                          if (A) {
                                              b = v
                                                  .replace(/([^\^])-/g, "$1- ")
                                                  .split(" ");
                                              z =
                                                  1 < g.length ||
                                                  q ||
                                                  (1 < b.length && !k);
                                              var G = [],
                                                  O,
                                                  e = I(d),
                                                  H = a.rotation;
                                              for (
                                                  E &&
                                                  (L = h.applyEllipsis(
                                                      a,
                                                      d,
                                                      v,
                                                      A
                                                  ));
                                                  !E &&
                                                  z &&
                                                  (b.length || G.length);

                                              )
                                                  (a.rotation = 0),
                                                      (O = h.getSpanWidth(
                                                          a,
                                                          d
                                                      )),
                                                      (v = O > A),
                                                      void 0 === L && (L = v),
                                                      v && 1 !== b.length
                                                          ? (d.removeChild(
                                                                d.firstChild
                                                            ),
                                                            G.unshift(b.pop()))
                                                          : ((b = G),
                                                            (G = []),
                                                            b.length &&
                                                                !k &&
                                                                ((d =
                                                                    w.createElementNS(
                                                                        Q,
                                                                        "tspan"
                                                                    )),
                                                                u(d, {
                                                                    dy: e,
                                                                    x: y,
                                                                }),
                                                                m &&
                                                                    u(
                                                                        d,
                                                                        "style",
                                                                        m
                                                                    ),
                                                                c.appendChild(
                                                                    d
                                                                )),
                                                            O > A && (A = O)),
                                                      b.length &&
                                                          d.appendChild(
                                                              w.createTextNode(
                                                                  b
                                                                      .join(" ")
                                                                      .replace(
                                                                          /- /g,
                                                                          "-"
                                                                      )
                                                              )
                                                          );
                                              a.rotation = H;
                                          }
                                          l++;
                                      }
                                  }
                              });
                              x = x || c.childNodes.length;
                          }),
                          L && a.attr("title", a.textStr),
                          r && r.removeChild(c),
                          e && a.applyTextOutline && a.applyTextOutline(e))
                        : c.appendChild(w.createTextNode(R(g)));
                }
            },
            getContrast: function (a) {
                a = k(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF";
            },
            button: function (a, v, q, h, g, n, b, l, d) {
                var p = this.label(
                        a,
                        v,
                        q,
                        d,
                        null,
                        null,
                        null,
                        null,
                        "button"
                    ),
                    K = 0;
                p.attr(c({ padding: 8, r: 2 }, g));
                F(p.element, H ? "mouseover" : "mouseenter", function () {
                    3 !== K && p.setState(1);
                });
                F(p.element, H ? "mouseout" : "mouseleave", function () {
                    3 !== K && p.setState(K);
                });
                p.setState = function (a) {
                    1 !== a && (p.state = K = a);
                    p.removeClass(
                        /highcharts-button-(normal|hover|pressed|disabled)/
                    ).addClass(
                        "highcharts-button-" +
                            ["normal", "hover", "pressed", "disabled"][a || 0]
                    );
                };
                return p.on("click", function (a) {
                    3 !== K && h.call(p, a);
                });
            },
            crispLine: function (a, c) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - (c % 2) / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + (c % 2) / 2);
                return a;
            },
            path: function (a) {
                var c = {};
                I(a) ? (c.d = a) : g(a) && b(c, a);
                return this.createElement("path").attr(c);
            },
            circle: function (a, c, v) {
                a = g(a) ? a : { x: a, y: c, r: v };
                c = this.createElement("circle");
                c.xSetter = c.ySetter = function (a, c, v) {
                    v.setAttribute("c" + c, a);
                };
                return c.attr(a);
            },
            arc: function (a, c, v, q, h, n) {
                g(a)
                    ? ((q = a), (c = q.y), (v = q.r), (a = q.x))
                    : (q = { innerR: q, start: h, end: n });
                a = this.symbol("arc", a, c, v, v, q);
                a.r = v;
                return a;
            },
            rect: function (a, c, v, q, h, n) {
                h = g(a) ? a.r : h;
                n = this.createElement("rect");
                a = g(a)
                    ? a
                    : void 0 === a
                    ? {}
                    : {
                          x: a,
                          y: c,
                          width: Math.max(v, 0),
                          height: Math.max(q, 0),
                      };
                h && (a.r = h);
                n.rSetter = function (a, c, v) {
                    u(v, { rx: a, ry: a });
                };
                return n.attr(a);
            },
            setSize: function (a, c, q) {
                var h = this.alignedObjects,
                    g = h.length;
                this.width = a;
                this.height = c;
                for (
                    this.boxWrapper.animate(
                        { width: a, height: c },
                        {
                            step: function () {
                                this.attr({
                                    viewBox:
                                        "0 0 " +
                                        this.attr("width") +
                                        " " +
                                        this.attr("height"),
                                });
                            },
                            duration: v(q, !0) ? void 0 : 0,
                        }
                    );
                    g--;

                )
                    h[g].align();
            },
            g: function (a) {
                var c = this.createElement("g");
                return a ? c.attr({ class: "highcharts-" + a }) : c;
            },
            image: function (a, c, v, q, h) {
                var g = { preserveAspectRatio: "none" };
                1 < arguments.length &&
                    b(g, { x: c, y: v, width: q, height: h });
                g = this.createElement("image").attr(g);
                g.element.setAttributeNS
                    ? g.element.setAttributeNS(
                          "http://www.w3.org/1999/xlink",
                          "href",
                          a
                      )
                    : g.element.setAttribute("hc-svg-href", a);
                return g;
            },
            symbol: function (a, c, q, h, g, n) {
                var l = this,
                    p,
                    K = /^url\((.*?)\)$/,
                    z = K.test(a),
                    m = !z && (this.symbols[a] ? a : "circle"),
                    f = m && this.symbols[m],
                    L =
                        x(c) &&
                        f &&
                        f.call(
                            this.symbols,
                            Math.round(c),
                            Math.round(q),
                            h,
                            g,
                            n
                        ),
                    y,
                    A;
                f
                    ? ((p = this.path(L)),
                      b(p, { symbolName: m, x: c, y: q, width: h, height: g }),
                      n && b(p, n))
                    : z &&
                      ((y = a.match(K)[1]),
                      (p = this.image(y)),
                      (p.imgwidth = v(P[y] && P[y].width, n && n.width)),
                      (p.imgheight = v(P[y] && P[y].height, n && n.height)),
                      (A = function () {
                          p.attr({ width: p.width, height: p.height });
                      }),
                      d(["width", "height"], function (a) {
                          p[a + "Setter"] = function (a, c) {
                              var v = {},
                                  q = this["img" + c],
                                  h =
                                      "width" === c
                                          ? "translateX"
                                          : "translateY";
                              this[c] = a;
                              x(q) &&
                                  (this.element &&
                                      this.element.setAttribute(c, q),
                                  this.alignByTranslate ||
                                      ((v[h] = ((this[c] || 0) - q) / 2),
                                      this.attr(v)));
                          };
                      }),
                      x(c) && p.attr({ x: c, y: q }),
                      (p.isImg = !0),
                      x(p.imgwidth) && x(p.imgheight)
                          ? A()
                          : (p.attr({ width: 0, height: 0 }),
                            r("img", {
                                onload: function () {
                                    var a = e[l.chartIndex];
                                    0 === this.width &&
                                        (t(this, {
                                            position: "absolute",
                                            top: "-999em",
                                        }),
                                        w.body.appendChild(this));
                                    P[y] = {
                                        width: this.width,
                                        height: this.height,
                                    };
                                    p.imgwidth = this.width;
                                    p.imgheight = this.height;
                                    p.element && A();
                                    this.parentNode &&
                                        this.parentNode.removeChild(this);
                                    l.imgCount--;
                                    if (!l.imgCount && a && a.onload)
                                        a.onload();
                                },
                                src: y,
                            }),
                            this.imgCount++));
                return p;
            },
            symbols: {
                circle: function (a, c, v, q) {
                    return this.arc(a + v / 2, c + q / 2, v / 2, q / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1,
                    });
                },
                square: function (a, c, v, q) {
                    return [
                        "M",
                        a,
                        c,
                        "L",
                        a + v,
                        c,
                        a + v,
                        c + q,
                        a,
                        c + q,
                        "Z",
                    ];
                },
                triangle: function (a, c, v, q) {
                    return [
                        "M",
                        a + v / 2,
                        c,
                        "L",
                        a + v,
                        c + q,
                        a,
                        c + q,
                        "Z",
                    ];
                },
                "triangle-down": function (a, c, v, q) {
                    return ["M", a, c, "L", a + v, c, a + v / 2, c + q, "Z"];
                },
                diamond: function (a, c, v, q) {
                    return [
                        "M",
                        a + v / 2,
                        c,
                        "L",
                        a + v,
                        c + q / 2,
                        a + v / 2,
                        c + q,
                        a,
                        c + q / 2,
                        "Z",
                    ];
                },
                arc: function (a, c, q, h, g) {
                    var n = g.start,
                        b = g.r || q,
                        l = g.r || h || q,
                        d = g.end - 0.001;
                    q = g.innerR;
                    h = v(
                        g.open,
                        0.001 > Math.abs(g.end - g.start - 2 * Math.PI)
                    );
                    var p = Math.cos(n),
                        K = Math.sin(n),
                        z = Math.cos(d),
                        d = Math.sin(d);
                    g = 0.001 > g.end - n - Math.PI ? 0 : 1;
                    b = [
                        "M",
                        a + b * p,
                        c + l * K,
                        "A",
                        b,
                        l,
                        0,
                        g,
                        1,
                        a + b * z,
                        c + l * d,
                    ];
                    x(q) &&
                        b.push(
                            h ? "M" : "L",
                            a + q * z,
                            c + q * d,
                            "A",
                            q,
                            q,
                            0,
                            g,
                            0,
                            a + q * p,
                            c + q * K
                        );
                    b.push(h ? "" : "Z");
                    return b;
                },
                callout: function (a, c, v, q, h) {
                    var g = Math.min((h && h.r) || 0, v, q),
                        n = g + 6,
                        b = h && h.anchorX;
                    h = h && h.anchorY;
                    var l;
                    l = [
                        "M",
                        a + g,
                        c,
                        "L",
                        a + v - g,
                        c,
                        "C",
                        a + v,
                        c,
                        a + v,
                        c,
                        a + v,
                        c + g,
                        "L",
                        a + v,
                        c + q - g,
                        "C",
                        a + v,
                        c + q,
                        a + v,
                        c + q,
                        a + v - g,
                        c + q,
                        "L",
                        a + g,
                        c + q,
                        "C",
                        a,
                        c + q,
                        a,
                        c + q,
                        a,
                        c + q - g,
                        "L",
                        a,
                        c + g,
                        "C",
                        a,
                        c,
                        a,
                        c,
                        a + g,
                        c,
                    ];
                    b && b > v
                        ? h > c + n && h < c + q - n
                            ? l.splice(
                                  13,
                                  3,
                                  "L",
                                  a + v,
                                  h - 6,
                                  a + v + 6,
                                  h,
                                  a + v,
                                  h + 6,
                                  a + v,
                                  c + q - g
                              )
                            : l.splice(
                                  13,
                                  3,
                                  "L",
                                  a + v,
                                  q / 2,
                                  b,
                                  h,
                                  a + v,
                                  q / 2,
                                  a + v,
                                  c + q - g
                              )
                        : b && 0 > b
                        ? h > c + n && h < c + q - n
                            ? l.splice(
                                  33,
                                  3,
                                  "L",
                                  a,
                                  h + 6,
                                  a - 6,
                                  h,
                                  a,
                                  h - 6,
                                  a,
                                  c + g
                              )
                            : l.splice(
                                  33,
                                  3,
                                  "L",
                                  a,
                                  q / 2,
                                  b,
                                  h,
                                  a,
                                  q / 2,
                                  a,
                                  c + g
                              )
                        : h && h > q && b > a + n && b < a + v - n
                        ? l.splice(
                              23,
                              3,
                              "L",
                              b + 6,
                              c + q,
                              b,
                              c + q + 6,
                              b - 6,
                              c + q,
                              a + g,
                              c + q
                          )
                        : h &&
                          0 > h &&
                          b > a + n &&
                          b < a + v - n &&
                          l.splice(
                              3,
                              3,
                              "L",
                              b - 6,
                              c,
                              b,
                              c - 6,
                              b + 6,
                              c,
                              v - g,
                              c
                          );
                    return l;
                },
            },
            clipRect: function (c, v, q, h) {
                var g = a.uniqueKey(),
                    n = this.createElement("clipPath")
                        .attr({ id: g })
                        .add(this.defs);
                c = this.rect(c, v, q, h, 0).add(n);
                c.id = g;
                c.clipPath = n;
                c.count = 0;
                return c;
            },
            text: function (a, c, v, q) {
                var h = {};
                if (q && (this.allowHTML || !this.forExport))
                    return this.html(a, c, v);
                h.x = Math.round(c || 0);
                v && (h.y = Math.round(v));
                if (a || 0 === a) h.text = a;
                a = this.createElement("text").attr(h);
                q ||
                    (a.xSetter = function (a, c, v) {
                        var q = v.getElementsByTagName("tspan"),
                            h,
                            g = v.getAttribute(c),
                            n;
                        for (n = 0; n < q.length; n++)
                            (h = q[n]),
                                h.getAttribute(c) === g && h.setAttribute(c, a);
                        v.setAttribute(c, a);
                    });
                return a;
            },
            fontMetrics: function (a, c) {
                a = c && D.prototype.getStyle.call(c, "font-size");
                a = /px/.test(a)
                    ? q(a)
                    : /em/.test(a)
                    ? parseFloat(a) *
                      (c ? this.fontMetrics(null, c.parentNode).f : 16)
                    : 12;
                c = 24 > a ? a + 3 : Math.round(1.2 * a);
                return { h: c, b: Math.round(0.8 * c), f: a };
            },
            rotCorr: function (a, c, v) {
                var q = a;
                c && v && (q = Math.max(q * Math.cos(c * f), 4));
                return { x: (-a / 3) * Math.sin(c * f), y: q };
            },
            label: function (v, q, h, g, n, l, p, K, z) {
                var m = this,
                    f = m.g("button" !== z && "label"),
                    y = (f.text = m.text("", 0, 0, p).attr({ zIndex: 1 })),
                    L,
                    A,
                    G = 0,
                    e = 3,
                    w = 0,
                    E,
                    k,
                    H,
                    T,
                    t,
                    r = {},
                    I,
                    Q = /^url\((.*?)\)$/.test(g),
                    P = Q,
                    u,
                    M,
                    R,
                    X;
                z && f.addClass("highcharts-" + z);
                P = !0;
                u = function () {
                    return (L.strokeWidth() % 2) / 2;
                };
                M = function () {
                    var a = y.element.style,
                        c = {};
                    A =
                        (void 0 === E || void 0 === k || t) &&
                        x(y.textStr) &&
                        y.getBBox();
                    f.width = (E || A.width || 0) + 2 * e + w;
                    f.height = (k || A.height || 0) + 2 * e;
                    I = e + m.fontMetrics(a && a.fontSize, y).b;
                    P &&
                        (L ||
                            ((f.box = L =
                                m.symbols[g] || Q ? m.symbol(g) : m.rect()),
                            L.addClass(
                                ("button" === z ? "" : "highcharts-label-box") +
                                    (z ? " highcharts-" + z + "-box" : "")
                            ),
                            L.add(f),
                            (a = u()),
                            (c.x = a),
                            (c.y = (K ? -I : 0) + a)),
                        (c.width = Math.round(f.width)),
                        (c.height = Math.round(f.height)),
                        L.attr(b(c, r)),
                        (r = {}));
                };
                R = function () {
                    var a = w + e,
                        c;
                    c = K ? 0 : I;
                    x(E) &&
                        A &&
                        ("center" === t || "right" === t) &&
                        (a += { center: 0.5, right: 1 }[t] * (E - A.width));
                    if (a !== y.x || c !== y.y)
                        y.attr("x", a), void 0 !== c && y.attr("y", c);
                    y.x = a;
                    y.y = c;
                };
                X = function (a, c) {
                    L ? L.attr(a, c) : (r[a] = c);
                };
                f.onAdd = function () {
                    y.add(f);
                    f.attr({ text: v || 0 === v ? v : "", x: q, y: h });
                    L && x(n) && f.attr({ anchorX: n, anchorY: l });
                };
                f.widthSetter = function (c) {
                    E = a.isNumber(c) ? c : null;
                };
                f.heightSetter = function (a) {
                    k = a;
                };
                f["text-alignSetter"] = function (a) {
                    t = a;
                };
                f.paddingSetter = function (a) {
                    x(a) && a !== e && ((e = f.padding = a), R());
                };
                f.paddingLeftSetter = function (a) {
                    x(a) && a !== w && ((w = a), R());
                };
                f.alignSetter = function (a) {
                    a = { left: 0, center: 0.5, right: 1 }[a];
                    a !== G && ((G = a), A && f.attr({ x: H }));
                };
                f.textSetter = function (a) {
                    void 0 !== a && y.textSetter(a);
                    M();
                    R();
                };
                f["stroke-widthSetter"] = function (a, c) {
                    a && (P = !0);
                    this["stroke-width"] = a;
                    X(c, a);
                };
                f.rSetter = function (a, c) {
                    X(c, a);
                };
                f.anchorXSetter = function (a, c) {
                    n = f.anchorX = a;
                    X(c, Math.round(a) - u() - H);
                };
                f.anchorYSetter = function (a, c) {
                    l = f.anchorY = a;
                    X(c, a - T);
                };
                f.xSetter = function (a) {
                    f.x = a;
                    G && (a -= G * ((E || A.width) + 2 * e));
                    H = Math.round(a);
                    f.attr("translateX", H);
                };
                f.ySetter = function (a) {
                    T = f.y = Math.round(a);
                    f.attr("translateY", T);
                };
                var B = f.css;
                return b(f, {
                    css: function (a) {
                        if (a) {
                            var v = {};
                            a = c(a);
                            d(f.textProps, function (c) {
                                void 0 !== a[c] && ((v[c] = a[c]), delete a[c]);
                            });
                            y.css(v);
                        }
                        return B.call(f, a);
                    },
                    getBBox: function () {
                        return {
                            width: A.width + 2 * e,
                            height: A.height + 2 * e,
                            x: A.x - e,
                            y: A.y - e,
                        };
                    },
                    destroy: function () {
                        O(f.element, "mouseenter");
                        O(f.element, "mouseleave");
                        y && (y = y.destroy());
                        L && (L = L.destroy());
                        D.prototype.destroy.call(f);
                        f = m = M = R = X = null;
                    },
                });
            },
        });
        a.Renderer = B;
    })(J);
    (function (a) {
        var D = a.attr,
            B = a.createElement,
            F = a.css,
            C = a.defined,
            u = a.each,
            e = a.extend,
            k = a.isFirefox,
            t = a.isMS,
            r = a.isWebKit,
            x = a.pInt,
            f = a.SVGRenderer,
            m = a.win,
            w = a.wrap;
        e(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var b = this.element;
                if ((b = a && "SPAN" === b.tagName && a.width))
                    delete a.width,
                        (this.textWidth = b),
                        this.updateTransform();
                a &&
                    "ellipsis" === a.textOverflow &&
                    ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
                this.styles = e(this.styles, a);
                F(this.element, a);
                return this;
            },
            htmlGetBBox: function () {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight,
                };
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        p = this.x || 0,
                        f = this.y || 0,
                        l = this.textAlign || "left",
                        m = { left: 0, center: 0.5, right: 1 }[l],
                        e = this.styles;
                    F(b, {
                        marginLeft: this.translateX || 0,
                        marginTop: this.translateY || 0,
                    });
                    this.inverted &&
                        u(b.childNodes, function (g) {
                            a.invertChild(g, b);
                        });
                    if ("SPAN" === b.tagName) {
                        var w = this.rotation,
                            k = x(this.textWidth),
                            g = e && e.whiteSpace,
                            y = [
                                w,
                                l,
                                b.innerHTML,
                                this.textWidth,
                                this.textAlign,
                            ].join();
                        y !== this.cTT &&
                            ((e = a.fontMetrics(b.style.fontSize).b),
                            C(w) && this.setSpanRotation(w, m, e),
                            F(b, { width: "", whiteSpace: g || "nowrap" }),
                            b.offsetWidth > k &&
                                /[ \-]/.test(b.textContent || b.innerText) &&
                                F(b, {
                                    width: k + "px",
                                    display: "block",
                                    whiteSpace: g || "normal",
                                }),
                            this.getSpanCorrection(b.offsetWidth, e, m, w, l));
                        F(b, {
                            left: p + (this.xCorr || 0) + "px",
                            top: f + (this.yCorr || 0) + "px",
                        });
                        r && (e = b.offsetHeight);
                        this.cTT = y;
                    }
                } else this.alignOnAdd = !0;
            },
            setSpanRotation: function (a, b, p) {
                var d = {},
                    l = this.renderer.getTransformKey();
                d[l] = d.transform = "rotate(" + a + "deg)";
                d[l + (k ? "Origin" : "-origin")] = d.transformOrigin =
                    100 * b + "% " + p + "px";
                F(this.element, d);
            },
            getSpanCorrection: function (a, b, p) {
                this.xCorr = -a * p;
                this.yCorr = -b;
            },
        });
        e(f.prototype, {
            getTransformKey: function () {
                return t && !/Edge/.test(m.navigator.userAgent)
                    ? "-ms-transform"
                    : r
                    ? "-webkit-transform"
                    : k
                    ? "MozTransform"
                    : m.opera
                    ? "-o-transform"
                    : "";
            },
            html: function (a, b, p) {
                var d = this.createElement("span"),
                    l = d.element,
                    f = d.renderer,
                    m = f.isSVG,
                    E = function (a, g) {
                        u(["opacity", "visibility"], function (b) {
                            w(a, b + "Setter", function (a, c, h, b) {
                                a.call(this, c, h, b);
                                g[h] = c;
                            });
                        });
                    };
                d.textSetter = function (a) {
                    a !== l.innerHTML && delete this.bBox;
                    l.innerHTML = this.textStr = a;
                    d.htmlUpdateTransform();
                };
                m && E(d, d.element.style);
                d.xSetter =
                    d.ySetter =
                    d.alignSetter =
                    d.rotationSetter =
                        function (a, g) {
                            "align" === g && (g = "textAlign");
                            d[g] = a;
                            d.htmlUpdateTransform();
                        };
                d.attr({ text: a, x: Math.round(b), y: Math.round(p) }).css({
                    position: "absolute",
                });
                l.style.whiteSpace = "nowrap";
                d.css = d.htmlCss;
                m &&
                    (d.add = function (a) {
                        var g,
                            b = f.box.parentNode,
                            n = [];
                        if ((this.parentGroup = a)) {
                            if (((g = a.div), !g)) {
                                for (; a; ) n.push(a), (a = a.parentGroup);
                                u(n.reverse(), function (a) {
                                    function c(c, v) {
                                        a[v] = c;
                                        l[f.getTransformKey()] =
                                            "translate(" +
                                            a.x +
                                            "px," +
                                            a.y +
                                            "px)";
                                        a.doTransform = !0;
                                    }
                                    var l,
                                        v = D(a.element, "class");
                                    v && (v = { className: v });
                                    g = a.div =
                                        a.div ||
                                        B(
                                            "div",
                                            v,
                                            {
                                                position: "absolute",
                                                left:
                                                    (a.translateX || 0) + "px",
                                                top: (a.translateY || 0) + "px",
                                                display: a.display,
                                                opacity: a.opacity,
                                                pointerEvents:
                                                    a.styles &&
                                                    a.styles.pointerEvents,
                                            },
                                            g || b
                                        );
                                    l = g.style;
                                    e(a, {
                                        classSetter: function (a) {
                                            this.element.setAttribute(
                                                "class",
                                                a
                                            );
                                            g.className = a;
                                        },
                                        on: function () {
                                            n[0].div &&
                                                d.on.apply(
                                                    { element: n[0].div },
                                                    arguments
                                                );
                                            return a;
                                        },
                                        translateXSetter: c,
                                        translateYSetter: c,
                                    });
                                    E(a, l);
                                });
                            }
                        } else g = b;
                        g.appendChild(l);
                        d.added = !0;
                        d.alignOnAdd && d.htmlUpdateTransform();
                        return d;
                    });
                return d;
            },
        });
    })(J);
    (function (a) {
        function D() {
            var k = a.defaultOptions.global,
                t = e.moment;
            if (k.timezone) {
                if (t)
                    return function (a) {
                        return -t.tz(a, k.timezone).utcOffset();
                    };
                a.error(25);
            }
            return k.useUTC && k.getTimezoneOffset;
        }
        function B() {
            var k = a.defaultOptions.global,
                t,
                r = k.useUTC,
                x = r ? "getUTC" : "get",
                f = r ? "setUTC" : "set",
                m = "Minutes Hours Day Date Month FullYear".split(" "),
                w = m.concat(["Milliseconds", "Seconds"]);
            a.Date = t = k.Date || e.Date;
            t.hcTimezoneOffset = r && k.timezoneOffset;
            t.hcGetTimezoneOffset = D();
            t.hcMakeTime = function (a, b, p, f, l, m) {
                var d;
                r
                    ? ((d = t.UTC.apply(0, arguments)), (d += F(d)))
                    : (d = new t(
                          a,
                          b,
                          u(p, 1),
                          u(f, 0),
                          u(l, 0),
                          u(m, 0)
                      ).getTime());
                return d;
            };
            for (k = 0; k < m.length; k++) t["hcGet" + m[k]] = x + m[k];
            for (k = 0; k < w.length; k++) t["hcSet" + w[k]] = f + w[k];
        }
        var F = a.getTZOffset,
            C = a.merge,
            u = a.pick,
            e = a.win;
        a.defaultOptions = {
            symbols: [
                "circle",
                "diamond",
                "square",
                "triangle",
                "triangle-down",
            ],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(
                    " "
                ),
                shortMonths:
                    "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
                        " "
                    ),
                weekdays:
                    "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                        " "
                    ),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " ",
            },
            global: { useUTC: !0 },
            chart: {
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: { zIndex: 20 },
                    position: { align: "right", x: -10, y: 10 },
                },
                width: null,
                height: null,
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44,
            },
            subtitle: { text: "", align: "center", widthAdjust: -44 },
            plotOptions: {},
            labels: { style: { position: "absolute", color: "#333333" } },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name;
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {},
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px",
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {},
            },
            loading: {},
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y",
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat:
                    '\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat:
                    '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cspan class\x3d"highcharts-strong"\x3e{point.y}\x3c/span\x3e\x3cbr/\x3e',
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5,
                },
                text: "Highcharts.com",
            },
        };
        a.setOptions = function (e) {
            a.defaultOptions = C(!0, a.defaultOptions, e);
            B();
            return a.defaultOptions;
        };
        a.getOptions = function () {
            return a.defaultOptions;
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        B();
    })(J);
    (function (a) {
        var D = a.correctFloat,
            B = a.defined,
            F = a.destroyObjectProperties,
            C = a.isNumber,
            u = a.pick,
            e = a.deg2rad;
        a.Tick = function (a, e, r, x) {
            this.axis = a;
            this.pos = e;
            this.type = r || "";
            this.isNewLabel = this.isNew = !0;
            r || x || this.addLabel();
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis,
                    e = a.options,
                    r = a.chart,
                    x = a.categories,
                    f = a.names,
                    m = this.pos,
                    w = e.labels,
                    d = a.tickPositions,
                    b = m === d[0],
                    p = m === d[d.length - 1],
                    f = x ? u(x[m], f[m], m) : m,
                    x = this.label,
                    d = d.info,
                    z;
                a.isDatetimeAxis &&
                    d &&
                    (z =
                        e.dateTimeLabelFormats[d.higherRanks[m] || d.unitName]);
                this.isFirst = b;
                this.isLast = p;
                e = a.labelFormatter.call({
                    axis: a,
                    chart: r,
                    isFirst: b,
                    isLast: p,
                    dateTimeLabelFormat: z,
                    value: a.isLog ? D(a.lin2log(f)) : f,
                    pos: m,
                });
                B(x)
                    ? x && x.attr({ text: e })
                    : ((this.labelLength =
                          (this.label = x =
                              B(e) && w.enabled
                                  ? r.renderer
                                        .text(e, 0, 0, w.useHTML)
                                        .add(a.labelGroup)
                                  : null) && x.getBBox().width),
                      (this.rotation = 0));
            },
            getLabelSize: function () {
                return this.label
                    ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
                    : 0;
            },
            handleOverflow: function (a) {
                var k = this.axis,
                    r = a.x,
                    x = k.chart.chartWidth,
                    f = k.chart.spacing,
                    m = u(k.labelLeft, Math.min(k.pos, f[3])),
                    f = u(k.labelRight, Math.max(k.pos + k.len, x - f[1])),
                    w = this.label,
                    d = this.rotation,
                    b = { left: 0, center: 0.5, right: 1 }[k.labelAlign],
                    p = w.getBBox().width,
                    z = k.getSlotWidth(),
                    l = z,
                    A = 1,
                    I,
                    E = {};
                if (d)
                    0 > d && r - b * p < m
                        ? (I = Math.round(r / Math.cos(d * e) - m))
                        : 0 < d &&
                          r + b * p > f &&
                          (I = Math.round((x - r) / Math.cos(d * e)));
                else if (
                    ((x = r + (1 - b) * p),
                    r - b * p < m
                        ? (l = a.x + l * (1 - b) - m)
                        : x > f && ((l = f - a.x + l * b), (A = -1)),
                    (l = Math.min(z, l)),
                    l < z &&
                        "center" === k.labelAlign &&
                        (a.x += A * (z - l - b * (z - Math.min(p, l)))),
                    p > l || (k.autoRotation && (w.styles || {}).width))
                )
                    I = l;
                I &&
                    ((E.width = I),
                    (k.options.labels.style || {}).textOverflow ||
                        (E.textOverflow = "ellipsis"),
                    w.css(E));
            },
            getPosition: function (a, e, r, x) {
                var f = this.axis,
                    m = f.chart,
                    w = (x && m.oldChartHeight) || m.chartHeight;
                return {
                    x: a
                        ? f.translate(e + r, null, null, x) + f.transB
                        : f.left +
                          f.offset +
                          (f.opposite
                              ? ((x && m.oldChartWidth) || m.chartWidth) -
                                f.right -
                                f.left
                              : 0),
                    y: a
                        ? w - f.bottom + f.offset - (f.opposite ? f.height : 0)
                        : w - f.translate(e + r, null, null, x) - f.transB,
                };
            },
            getLabelPosition: function (a, t, r, x, f, m, w, d) {
                var b = this.axis,
                    p = b.transA,
                    z = b.reversed,
                    l = b.staggerLines,
                    A = b.tickRotCorr || { x: 0, y: 0 },
                    k = f.y;
                B(k) ||
                    (k =
                        0 === b.side
                            ? r.rotation
                                ? -8
                                : -r.getBBox().height
                            : 2 === b.side
                            ? A.y + 8
                            : Math.cos(r.rotation * e) *
                              (A.y - r.getBBox(!1, 0).height / 2));
                a = a + f.x + A.x - (m && x ? m * p * (z ? -1 : 1) : 0);
                t = t + k - (m && !x ? m * p * (z ? 1 : -1) : 0);
                l &&
                    ((r = (w / (d || 1)) % l),
                    b.opposite && (r = l - r - 1),
                    (t += (b.labelOffset / l) * r));
                return { x: a, y: Math.round(t) };
            },
            getMarkPath: function (a, e, r, x, f, m) {
                return m.crispLine(
                    ["M", a, e, "L", a + (f ? 0 : -r), e + (f ? r : 0)],
                    x
                );
            },
            renderGridLine: function (a, e, r) {
                var k = this.axis,
                    f = this.gridLine,
                    m = {},
                    w = this.pos,
                    d = this.type,
                    b = k.tickmarkOffset,
                    p = k.chart.renderer;
                f ||
                    (d || (m.zIndex = 1),
                    a && (m.opacity = 0),
                    (this.gridLine = f =
                        p
                            .path()
                            .attr(m)
                            .addClass(
                                "highcharts-" + (d ? d + "-" : "") + "grid-line"
                            )
                            .add(k.gridGroup)));
                if (
                    !a &&
                    f &&
                    (a = k.getPlotLinePath(w + b, f.strokeWidth() * r, a, !0))
                )
                    f[this.isNew ? "attr" : "animate"]({ d: a, opacity: e });
            },
            renderMark: function (a, e, r) {
                var k = this.axis,
                    f = k.chart.renderer,
                    m = this.type,
                    w = k.tickSize(m ? m + "Tick" : "tick"),
                    d = this.mark,
                    b = !d,
                    p = a.x;
                a = a.y;
                w &&
                    (k.opposite && (w[0] = -w[0]),
                    b &&
                        (this.mark = d =
                            f
                                .path()
                                .addClass(
                                    "highcharts-" + (m ? m + "-" : "") + "tick"
                                )
                                .add(k.axisGroup)),
                    d[b ? "attr" : "animate"]({
                        d: this.getMarkPath(
                            p,
                            a,
                            w[0],
                            d.strokeWidth() * r,
                            k.horiz,
                            f
                        ),
                        opacity: e,
                    }));
            },
            renderLabel: function (a, e, r, x) {
                var f = this.axis,
                    m = f.horiz,
                    w = f.options,
                    d = this.label,
                    b = w.labels,
                    p = b.step,
                    z = f.tickmarkOffset,
                    l = !0,
                    A = a.x;
                a = a.y;
                d &&
                    C(A) &&
                    ((d.xy = a = this.getLabelPosition(A, a, d, m, b, z, x, p)),
                    (this.isFirst && !this.isLast && !u(w.showFirstLabel, 1)) ||
                    (this.isLast && !this.isFirst && !u(w.showLastLabel, 1))
                        ? (l = !1)
                        : !m ||
                          f.isRadial ||
                          b.step ||
                          b.rotation ||
                          e ||
                          0 === r ||
                          this.handleOverflow(a),
                    p && x % p && (l = !1),
                    l && C(a.y)
                        ? ((a.opacity = r),
                          d[this.isNewLabel ? "attr" : "animate"](a),
                          (this.isNewLabel = !1))
                        : (d.attr("y", -9999), (this.isNewLabel = !0)));
            },
            render: function (a, e, r) {
                var k = this.axis,
                    f = k.horiz,
                    m = this.getPosition(f, this.pos, k.tickmarkOffset, e),
                    w = m.x,
                    d = m.y,
                    k =
                        (f && w === k.pos + k.len) || (!f && d === k.pos)
                            ? -1
                            : 1;
                r = u(r, 1);
                this.isActive = !0;
                this.renderGridLine(e, r, k);
                this.renderMark(m, r, k);
                this.renderLabel(m, e, r, a);
                this.isNew = !1;
            },
            destroy: function () {
                F(this, this.axis);
            },
        };
    })(J);
    var W = (function (a) {
        var D = a.addEvent,
            B = a.animObject,
            F = a.arrayMax,
            C = a.arrayMin,
            u = a.correctFloat,
            e = a.defaultOptions,
            k = a.defined,
            t = a.deg2rad,
            r = a.destroyObjectProperties,
            x = a.each,
            f = a.extend,
            m = a.fireEvent,
            w = a.format,
            d = a.getMagnitude,
            b = a.grep,
            p = a.inArray,
            z = a.isArray,
            l = a.isNumber,
            A = a.isString,
            I = a.merge,
            E = a.normalizeTickInterval,
            H = a.objectEach,
            g = a.pick,
            y = a.removeEvent,
            n = a.splat,
            c = a.syncTimeout,
            h = a.Tick,
            G = function () {
                this.init.apply(this, arguments);
            };
        a.extend(G.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y",
                },
                endOnTick: !1,
                labels: { enabled: !0, x: 0 },
                minPadding: 0.01,
                maxPadding: 0.01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: { align: "middle" },
                type: "linear",
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: { x: -8 },
                maxPadding: 0.05,
                minPadding: 0.05,
                startOnTick: !0,
                title: { rotation: 270, text: "Values" },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1);
                    },
                },
            },
            defaultLeftAxisOptions: {
                labels: { x: -15 },
                title: { rotation: 270 },
            },
            defaultRightAxisOptions: {
                labels: { x: 15 },
                title: { rotation: 90 },
            },
            defaultBottomAxisOptions: {
                labels: { autoRotation: [-45], x: 0 },
                title: { rotation: 0 },
            },
            defaultTopAxisOptions: {
                labels: { autoRotation: [-45], x: 0 },
                title: { rotation: 0 },
            },
            init: function (a, c) {
                var v = c.isX,
                    q = this;
                q.chart = a;
                q.horiz = a.inverted && !q.isZAxis ? !v : v;
                q.isXAxis = v;
                q.coll = q.coll || (v ? "xAxis" : "yAxis");
                q.opposite = c.opposite;
                q.side =
                    c.side ||
                    (q.horiz ? (q.opposite ? 0 : 2) : q.opposite ? 1 : 3);
                q.setOptions(c);
                var h = this.options,
                    b = h.type;
                q.labelFormatter =
                    h.labels.formatter || q.defaultLabelFormatter;
                q.userOptions = c;
                q.minPixelPadding = 0;
                q.reversed = h.reversed;
                q.visible = !1 !== h.visible;
                q.zoomEnabled = !1 !== h.zoomEnabled;
                q.hasNames = "category" === b || !0 === h.categories;
                q.categories = h.categories || q.hasNames;
                q.names = q.names || [];
                q.plotLinesAndBandsGroups = {};
                q.isLog = "logarithmic" === b;
                q.isDatetimeAxis = "datetime" === b;
                q.positiveValuesOnly = q.isLog && !q.allowNegativeLog;
                q.isLinked = k(h.linkedTo);
                q.ticks = {};
                q.labelEdge = [];
                q.minorTicks = {};
                q.plotLinesAndBands = [];
                q.alternateBands = {};
                q.len = 0;
                q.minRange = q.userMinRange = h.minRange || h.maxZoom;
                q.range = h.range;
                q.offset = h.offset || 0;
                q.stacks = {};
                q.oldStacks = {};
                q.stacksTouched = 0;
                q.max = null;
                q.min = null;
                q.crosshair = g(
                    h.crosshair,
                    n(a.options.tooltip.crosshairs)[v ? 0 : 1],
                    !1
                );
                c = q.options.events;
                -1 === p(q, a.axes) &&
                    (v ? a.axes.splice(a.xAxis.length, 0, q) : a.axes.push(q),
                    a[q.coll].push(q));
                q.series = q.series || [];
                a.inverted &&
                    !q.isZAxis &&
                    v &&
                    void 0 === q.reversed &&
                    (q.reversed = !0);
                H(c, function (a, c) {
                    D(q, c, a);
                });
                q.lin2log = h.linearToLogConverter || q.lin2log;
                q.isLog && ((q.val2lin = q.log2lin), (q.lin2val = q.lin2log));
            },
            setOptions: function (a) {
                this.options = I(
                    this.defaultOptions,
                    "yAxis" === this.coll && this.defaultYAxisOptions,
                    [
                        this.defaultTopAxisOptions,
                        this.defaultRightAxisOptions,
                        this.defaultBottomAxisOptions,
                        this.defaultLeftAxisOptions,
                    ][this.side],
                    I(e[this.coll], a)
                );
            },
            defaultLabelFormatter: function () {
                var c = this.axis,
                    q = this.value,
                    h = c.categories,
                    g = this.dateTimeLabelFormat,
                    n = e.lang,
                    b = n.numericSymbols,
                    n = n.numericSymbolMagnitude || 1e3,
                    l = b && b.length,
                    d,
                    p = c.options.labels.format,
                    c = c.isLog ? Math.abs(q) : c.tickInterval;
                if (p) d = w(p, this);
                else if (h) d = q;
                else if (g) d = a.dateFormat(g, q);
                else if (l && 1e3 <= c)
                    for (; l-- && void 0 === d; )
                        (h = Math.pow(n, l + 1)),
                            c >= h &&
                                0 === (10 * q) % h &&
                                null !== b[l] &&
                                0 !== q &&
                                (d = a.numberFormat(q / h, -1) + b[l]);
                void 0 === d &&
                    (d =
                        1e4 <= Math.abs(q)
                            ? a.numberFormat(q, -1)
                            : a.numberFormat(q, -1, void 0, ""));
                return d;
            },
            getSeriesExtremes: function () {
                var a = this,
                    c = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                x(a.series, function (q) {
                    if (q.visible || !c.options.chart.ignoreHiddenSeries) {
                        var v = q.options,
                            h = v.threshold,
                            n;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= h && (h = null);
                        if (a.isXAxis)
                            (v = q.xData),
                                v.length &&
                                    ((q = C(v)),
                                    l(q) ||
                                        q instanceof Date ||
                                        ((v = b(v, function (a) {
                                            return l(a);
                                        })),
                                        (q = C(v))),
                                    (a.dataMin = Math.min(
                                        g(a.dataMin, v[0]),
                                        q
                                    )),
                                    (a.dataMax = Math.max(
                                        g(a.dataMax, v[0]),
                                        F(v)
                                    )));
                        else if (
                            (q.getExtremes(),
                            (n = q.dataMax),
                            (q = q.dataMin),
                            k(q) &&
                                k(n) &&
                                ((a.dataMin = Math.min(g(a.dataMin, q), q)),
                                (a.dataMax = Math.max(g(a.dataMax, n), n))),
                            k(h) && (a.threshold = h),
                            !v.softThreshold || a.positiveValuesOnly)
                        )
                            a.softThreshold = !1;
                    }
                });
            },
            translate: function (a, c, h, g, n, b) {
                var q = this.linkedParent || this,
                    v = 1,
                    d = 0,
                    p = g ? q.oldTransA : q.transA;
                g = g ? q.oldMin : q.min;
                var K = q.minPixelPadding;
                n = (q.isOrdinal || q.isBroken || (q.isLog && n)) && q.lin2val;
                p || (p = q.transA);
                h && ((v *= -1), (d = q.len));
                q.reversed && ((v *= -1), (d -= v * (q.sector || q.len)));
                c
                    ? ((a = (a * v + d - K) / p + g), n && (a = q.lin2val(a)))
                    : (n && (a = q.val2lin(a)),
                      (a = l(g)
                          ? v * (a - g) * p + d + v * K + (l(b) ? p * b : 0)
                          : void 0));
                return a;
            },
            toPixels: function (a, c) {
                return (
                    this.translate(a, !1, !this.horiz, null, !0) +
                    (c ? 0 : this.pos)
                );
            },
            toValue: function (a, c) {
                return this.translate(
                    a - (c ? 0 : this.pos),
                    !0,
                    !this.horiz,
                    null,
                    !0
                );
            },
            getPlotLinePath: function (a, c, h, n, b) {
                var q = this.chart,
                    v = this.left,
                    d = this.top,
                    p,
                    K,
                    f = (h && q.oldChartHeight) || q.chartHeight,
                    m = (h && q.oldChartWidth) || q.chartWidth,
                    y;
                p = this.transB;
                var z = function (a, c, q) {
                    if (a < c || a > q)
                        n ? (a = Math.min(Math.max(c, a), q)) : (y = !0);
                    return a;
                };
                b = g(b, this.translate(a, null, null, h));
                a = h = Math.round(b + p);
                p = K = Math.round(f - b - p);
                l(b)
                    ? this.horiz
                        ? ((p = d),
                          (K = f - this.bottom),
                          (a = h = z(a, v, v + this.width)))
                        : ((a = v),
                          (h = m - this.right),
                          (p = K = z(p, d, d + this.height)))
                    : ((y = !0), (n = !1));
                return y && !n
                    ? null
                    : q.renderer.crispLine(["M", a, p, "L", h, K], c || 1);
            },
            getLinearTickPositions: function (a, c, h) {
                var q,
                    v = u(Math.floor(c / a) * a);
                h = u(Math.ceil(h / a) * a);
                var g = [];
                if (this.single) return [c];
                for (c = v; c <= h; ) {
                    g.push(c);
                    c = u(c + a);
                    if (c === q) break;
                    q = c;
                }
                return g;
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks
                    ? g(a.minorTickInterval, "auto")
                    : !1 === a.minorTicks
                    ? null
                    : a.minorTickInterval;
            },
            getMinorTickPositions: function () {
                var a = this,
                    c = a.options,
                    h = a.tickPositions,
                    g = a.minorTickInterval,
                    n = [],
                    b = a.pointRangePadding || 0,
                    l = a.min - b,
                    b = a.max + b,
                    d = b - l;
                if (d && d / g < a.len / 3)
                    if (a.isLog)
                        x(this.paddedTicks, function (c, q, v) {
                            q &&
                                n.push.apply(
                                    n,
                                    a.getLogTickPositions(g, v[q - 1], v[q], !0)
                                );
                        });
                    else if (
                        a.isDatetimeAxis &&
                        "auto" === this.getMinorTickInterval()
                    )
                        n = n.concat(
                            a.getTimeTicks(
                                a.normalizeTimeTickInterval(g),
                                l,
                                b,
                                c.startOfWeek
                            )
                        );
                    else
                        for (
                            c = l + ((h[0] - l) % g);
                            c <= b && c !== n[0];
                            c += g
                        )
                            n.push(c);
                0 !== n.length && a.trimTicks(n);
                return n;
            },
            adjustForMinRange: function () {
                var a = this.options,
                    c = this.min,
                    h = this.max,
                    n,
                    b,
                    l,
                    d,
                    p,
                    f,
                    m,
                    y;
                this.isXAxis &&
                    void 0 === this.minRange &&
                    !this.isLog &&
                    (k(a.min) || k(a.max)
                        ? (this.minRange = null)
                        : (x(this.series, function (a) {
                              f = a.xData;
                              for (
                                  d = m = a.xIncrement ? 1 : f.length - 1;
                                  0 < d;
                                  d--
                              )
                                  if (
                                      ((p = f[d] - f[d - 1]),
                                      void 0 === l || p < l)
                                  )
                                      l = p;
                          }),
                          (this.minRange = Math.min(
                              5 * l,
                              this.dataMax - this.dataMin
                          ))));
                h - c < this.minRange &&
                    ((b = this.dataMax - this.dataMin >= this.minRange),
                    (y = this.minRange),
                    (n = (y - h + c) / 2),
                    (n = [c - n, g(a.min, c - n)]),
                    b &&
                        (n[2] = this.isLog
                            ? this.log2lin(this.dataMin)
                            : this.dataMin),
                    (c = F(n)),
                    (h = [c + y, g(a.max, c + y)]),
                    b &&
                        (h[2] = this.isLog
                            ? this.log2lin(this.dataMax)
                            : this.dataMax),
                    (h = C(h)),
                    h - c < y &&
                        ((n[0] = h - y), (n[1] = g(a.min, h - y)), (c = F(n))));
                this.min = c;
                this.max = h;
            },
            getClosest: function () {
                var a;
                this.categories
                    ? (a = 1)
                    : x(this.series, function (c) {
                          var q = c.closestPointRange,
                              v =
                                  c.visible ||
                                  !c.chart.options.chart.ignoreHiddenSeries;
                          !c.noSharedTooltip &&
                              k(q) &&
                              v &&
                              (a = k(a) ? Math.min(a, q) : q);
                      });
                return a;
            },
            nameToX: function (a) {
                var c = z(this.categories),
                    v = c ? this.categories : this.names,
                    h = a.options.x,
                    g;
                a.series.requireSorting = !1;
                k(h) ||
                    (h =
                        !1 === this.options.uniqueNames
                            ? a.series.autoIncrement()
                            : p(a.name, v));
                -1 === h ? c || (g = v.length) : (g = h);
                void 0 !== g && (this.names[g] = a.name);
                return g;
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length &&
                    ((this.names.length = 0),
                    (this.minRange = this.userMinRange),
                    x(this.series || [], function (c) {
                        c.xIncrement = null;
                        if (!c.points || c.isDirtyData)
                            c.processData(), c.generatePoints();
                        x(c.points, function (q, v) {
                            var h;
                            q.options &&
                                ((h = a.nameToX(q)),
                                void 0 !== h &&
                                    h !== q.x &&
                                    ((q.x = h), (c.xData[v] = h)));
                        });
                    }));
            },
            setAxisTranslation: function (a) {
                var c = this,
                    v = c.max - c.min,
                    h = c.axisPointRange || 0,
                    n,
                    b = 0,
                    l = 0,
                    d = c.linkedParent,
                    p = !!c.categories,
                    f = c.transA,
                    m = c.isXAxis;
                if (m || p || h)
                    (n = c.getClosest()),
                        d
                            ? ((b = d.minPointOffset),
                              (l = d.pointRangePadding))
                            : x(c.series, function (a) {
                                  var q = p
                                      ? 1
                                      : m
                                      ? g(a.options.pointRange, n, 0)
                                      : c.axisPointRange || 0;
                                  a = a.options.pointPlacement;
                                  h = Math.max(h, q);
                                  c.single ||
                                      ((b = Math.max(b, A(a) ? 0 : q / 2)),
                                      (l = Math.max(l, "on" === a ? 0 : q)));
                              }),
                        (d = c.ordinalSlope && n ? c.ordinalSlope / n : 1),
                        (c.minPointOffset = b *= d),
                        (c.pointRangePadding = l *= d),
                        (c.pointRange = Math.min(h, v)),
                        m && (c.closestPointRange = n);
                a && (c.oldTransA = f);
                c.translationSlope =
                    c.transA =
                    f =
                        c.options.staticScale || c.len / (v + l || 1);
                c.transB = c.horiz ? c.left : c.bottom;
                c.minPixelPadding = f * b;
            },
            minFromRange: function () {
                return this.max - this.range;
            },
            setTickInterval: function (c) {
                var q = this,
                    v = q.chart,
                    h = q.options,
                    n = q.isLog,
                    b = q.log2lin,
                    p = q.isDatetimeAxis,
                    f = q.isXAxis,
                    y = q.isLinked,
                    z = h.maxPadding,
                    e = h.minPadding,
                    A = h.tickInterval,
                    G = h.tickPixelInterval,
                    w = q.categories,
                    H = q.threshold,
                    r = q.softThreshold,
                    t,
                    I,
                    B,
                    C;
                p || w || y || this.getTickAmount();
                B = g(q.userMin, h.min);
                C = g(q.userMax, h.max);
                y
                    ? ((q.linkedParent = v[q.coll][h.linkedTo]),
                      (v = q.linkedParent.getExtremes()),
                      (q.min = g(v.min, v.dataMin)),
                      (q.max = g(v.max, v.dataMax)),
                      h.type !== q.linkedParent.options.type && a.error(11, 1))
                    : (!r &&
                          k(H) &&
                          (q.dataMin >= H
                              ? ((t = H), (e = 0))
                              : q.dataMax <= H && ((I = H), (z = 0))),
                      (q.min = g(B, t, q.dataMin)),
                      (q.max = g(C, I, q.dataMax)));
                n &&
                    (q.positiveValuesOnly &&
                        !c &&
                        0 >= Math.min(q.min, g(q.dataMin, q.min)) &&
                        a.error(10, 1),
                    (q.min = u(b(q.min), 15)),
                    (q.max = u(b(q.max), 15)));
                q.range &&
                    k(q.max) &&
                    ((q.userMin =
                        q.min =
                        B =
                            Math.max(q.dataMin, q.minFromRange())),
                    (q.userMax = C = q.max),
                    (q.range = null));
                m(q, "foundExtremes");
                q.beforePadding && q.beforePadding();
                q.adjustForMinRange();
                !(w || q.axisPointRange || q.usePercentage || y) &&
                    k(q.min) &&
                    k(q.max) &&
                    (b = q.max - q.min) &&
                    (!k(B) && e && (q.min -= b * e),
                    !k(C) && z && (q.max += b * z));
                l(h.softMin) && (q.min = Math.min(q.min, h.softMin));
                l(h.softMax) && (q.max = Math.max(q.max, h.softMax));
                l(h.floor) && (q.min = Math.max(q.min, h.floor));
                l(h.ceiling) && (q.max = Math.min(q.max, h.ceiling));
                r &&
                    k(q.dataMin) &&
                    ((H = H || 0),
                    !k(B) && q.min < H && q.dataMin >= H
                        ? (q.min = H)
                        : !k(C) && q.max > H && q.dataMax <= H && (q.max = H));
                q.tickInterval =
                    q.min === q.max || void 0 === q.min || void 0 === q.max
                        ? 1
                        : y &&
                          !A &&
                          G === q.linkedParent.options.tickPixelInterval
                        ? (A = q.linkedParent.tickInterval)
                        : g(
                              A,
                              this.tickAmount
                                  ? (q.max - q.min) /
                                        Math.max(this.tickAmount - 1, 1)
                                  : void 0,
                              w ? 1 : ((q.max - q.min) * G) / Math.max(q.len, G)
                          );
                f &&
                    !c &&
                    x(q.series, function (a) {
                        a.processData(q.min !== q.oldMin || q.max !== q.oldMax);
                    });
                q.setAxisTranslation(!0);
                q.beforeSetTickPositions && q.beforeSetTickPositions();
                q.postProcessTickInterval &&
                    (q.tickInterval = q.postProcessTickInterval(
                        q.tickInterval
                    ));
                q.pointRange &&
                    !A &&
                    (q.tickInterval = Math.max(q.pointRange, q.tickInterval));
                c = g(
                    h.minTickInterval,
                    q.isDatetimeAxis && q.closestPointRange
                );
                !A && q.tickInterval < c && (q.tickInterval = c);
                p ||
                    n ||
                    A ||
                    (q.tickInterval = E(
                        q.tickInterval,
                        null,
                        d(q.tickInterval),
                        g(
                            h.allowDecimals,
                            !(
                                0.5 < q.tickInterval &&
                                5 > q.tickInterval &&
                                1e3 < q.max &&
                                9999 > q.max
                            )
                        ),
                        !!this.tickAmount
                    ));
                this.tickAmount || (q.tickInterval = q.unsquish());
                this.setTickPositions();
            },
            setTickPositions: function () {
                var a = this.options,
                    c,
                    h = a.tickPositions;
                c = this.getMinorTickInterval();
                var g = a.tickPositioner,
                    n = a.startOnTick,
                    b = a.endOnTick;
                this.tickmarkOffset =
                    this.categories &&
                    "between" === a.tickmarkPlacement &&
                    1 === this.tickInterval
                        ? 0.5
                        : 0;
                this.minorTickInterval =
                    "auto" === c && this.tickInterval
                        ? this.tickInterval / 5
                        : c;
                this.single =
                    this.min === this.max &&
                    k(this.min) &&
                    !this.tickAmount &&
                    (parseInt(this.min, 10) === this.min ||
                        !1 !== a.allowDecimals);
                this.tickPositions = c = h && h.slice();
                !c &&
                    ((c = this.isDatetimeAxis
                        ? this.getTimeTicks(
                              this.normalizeTimeTickInterval(
                                  this.tickInterval,
                                  a.units
                              ),
                              this.min,
                              this.max,
                              a.startOfWeek,
                              this.ordinalPositions,
                              this.closestPointRange,
                              !0
                          )
                        : this.isLog
                        ? this.getLogTickPositions(
                              this.tickInterval,
                              this.min,
                              this.max
                          )
                        : this.getLinearTickPositions(
                              this.tickInterval,
                              this.min,
                              this.max
                          )),
                    c.length > this.len && (c = [c[0], c.pop()]),
                    (this.tickPositions = c),
                    g && (g = g.apply(this, [this.min, this.max]))) &&
                    (this.tickPositions = c = g);
                this.paddedTicks = c.slice(0);
                this.trimTicks(c, n, b);
                this.isLinked ||
                    (this.single &&
                        2 > c.length &&
                        ((this.min -= 0.5), (this.max += 0.5)),
                    h || g || this.adjustTickAmount());
            },
            trimTicks: function (a, c, h) {
                var q = a[0],
                    v = a[a.length - 1],
                    g = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (c && -Infinity !== q) this.min = q;
                    else for (; this.min - g > a[0]; ) a.shift();
                    if (h) this.max = v;
                    else for (; this.max + g < a[a.length - 1]; ) a.pop();
                    0 === a.length && k(q) && a.push((v + q) / 2);
                }
            },
            alignToOthers: function () {
                var a = {},
                    c,
                    h = this.options;
                !1 === this.chart.options.chart.alignTicks ||
                    !1 === h.alignTicks ||
                    this.isLog ||
                    x(this.chart[this.coll], function (q) {
                        var h = q.options,
                            h = [
                                q.horiz ? h.left : h.top,
                                h.width,
                                h.height,
                                h.pane,
                            ].join();
                        q.series.length && (a[h] ? (c = !0) : (a[h] = 1));
                    });
                return c;
            },
            getTickAmount: function () {
                var a = this.options,
                    c = a.tickAmount,
                    h = a.tickPixelInterval;
                !k(a.tickInterval) &&
                    this.len < h &&
                    !this.isRadial &&
                    !this.isLog &&
                    a.startOnTick &&
                    a.endOnTick &&
                    (c = 2);
                !c && this.alignToOthers() && (c = Math.ceil(this.len / h) + 1);
                4 > c && ((this.finalTickAmt = c), (c = 5));
                this.tickAmount = c;
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    c = this.tickPositions,
                    h = this.tickAmount,
                    g = this.finalTickAmt,
                    n = c && c.length;
                if (n < h) {
                    for (; c.length < h; ) c.push(u(c[c.length - 1] + a));
                    this.transA *= (n - 1) / (h - 1);
                    this.max = c[c.length - 1];
                } else
                    n > h &&
                        ((this.tickInterval *= 2), this.setTickPositions());
                if (k(g)) {
                    for (a = h = c.length; a--; )
                        ((3 === g && 1 === a % 2) ||
                            (2 >= g && 0 < a && a < h - 1)) &&
                            c.splice(a, 1);
                    this.finalTickAmt = void 0;
                }
            },
            setScale: function () {
                var a, c;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                c = this.len !== this.oldAxisLength;
                x(this.series, function (c) {
                    if (c.isDirtyData || c.isDirty || c.xAxis.isDirty) a = !0;
                });
                c ||
                a ||
                this.isLinked ||
                this.forceRedraw ||
                this.userMin !== this.oldUserMin ||
                this.userMax !== this.oldUserMax ||
                this.alignToOthers()
                    ? (this.resetStacks && this.resetStacks(),
                      (this.forceRedraw = !1),
                      this.getSeriesExtremes(),
                      this.setTickInterval(),
                      (this.oldUserMin = this.userMin),
                      (this.oldUserMax = this.userMax),
                      this.isDirty ||
                          (this.isDirty =
                              c ||
                              this.min !== this.oldMin ||
                              this.max !== this.oldMax))
                    : this.cleanStacks && this.cleanStacks();
            },
            setExtremes: function (a, c, h, n, b) {
                var q = this,
                    v = q.chart;
                h = g(h, !0);
                x(q.series, function (a) {
                    delete a.kdTree;
                });
                b = f(b, { min: a, max: c });
                m(q, "setExtremes", b, function () {
                    q.userMin = a;
                    q.userMax = c;
                    q.eventArgs = b;
                    h && v.redraw(n);
                });
            },
            zoom: function (a, c) {
                var h = this.dataMin,
                    q = this.dataMax,
                    v = this.options,
                    n = Math.min(h, g(v.min, h)),
                    v = Math.max(q, g(v.max, q));
                if (a !== this.min || c !== this.max)
                    this.allowZoomOutside ||
                        (k(h) && (a < n && (a = n), a > v && (a = v)),
                        k(q) && (c < n && (c = n), c > v && (c = v))),
                        (this.displayBtn = void 0 !== a || void 0 !== c),
                        this.setExtremes(a, c, !1, void 0, { trigger: "zoom" });
                return !0;
            },
            setAxisSize: function () {
                var c = this.chart,
                    h = this.options,
                    n = h.offsets || [0, 0, 0, 0],
                    b = this.horiz,
                    l = (this.width = Math.round(
                        a.relativeLength(
                            g(h.width, c.plotWidth - n[3] + n[1]),
                            c.plotWidth
                        )
                    )),
                    d = (this.height = Math.round(
                        a.relativeLength(
                            g(h.height, c.plotHeight - n[0] + n[2]),
                            c.plotHeight
                        )
                    )),
                    p = (this.top = Math.round(
                        a.relativeLength(
                            g(h.top, c.plotTop + n[0]),
                            c.plotHeight,
                            c.plotTop
                        )
                    )),
                    h = (this.left = Math.round(
                        a.relativeLength(
                            g(h.left, c.plotLeft + n[3]),
                            c.plotWidth,
                            c.plotLeft
                        )
                    ));
                this.bottom = c.chartHeight - d - p;
                this.right = c.chartWidth - l - h;
                this.len = Math.max(b ? l : d, 0);
                this.pos = b ? h : p;
            },
            getExtremes: function () {
                var a = this.isLog,
                    c = this.lin2log;
                return {
                    min: a ? u(c(this.min)) : this.min,
                    max: a ? u(c(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax,
                };
            },
            getThreshold: function (a) {
                var c = this.isLog,
                    h = this.lin2log,
                    v = c ? h(this.min) : this.min,
                    c = c ? h(this.max) : this.max;
                null === a ? (a = v) : v > a ? (a = v) : c < a && (a = c);
                return this.translate(a, 0, 1, 0, 1);
            },
            autoLabelAlign: function (a) {
                a = (g(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a
                    ? "right"
                    : 195 < a && 345 > a
                    ? "left"
                    : "center";
            },
            tickSize: function (a) {
                var c = this.options,
                    h = c[a + "Length"],
                    v = g(c[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (v && h)
                    return "inside" === c[a + "Position"] && (h = -h), [h, v];
            },
            labelMetrics: function () {
                var a = (this.tickPositions && this.tickPositions[0]) || 0;
                return this.chart.renderer.fontMetrics(
                    this.options.labels.style &&
                        this.options.labels.style.fontSize,
                    this.ticks[a] && this.ticks[a].label
                );
            },
            unsquish: function () {
                var a = this.options.labels,
                    c = this.horiz,
                    h = this.tickInterval,
                    n = h,
                    b =
                        this.len /
                        (((this.categories ? 1 : 0) + this.max - this.min) / h),
                    l,
                    d = a.rotation,
                    p = this.labelMetrics(),
                    f,
                    m = Number.MAX_VALUE,
                    y,
                    z = function (a) {
                        a /= b || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * h;
                    };
                c
                    ? (y =
                          !a.staggerLines &&
                          !a.step &&
                          (k(d)
                              ? [d]
                              : b < g(a.autoRotationLimit, 80) &&
                                a.autoRotation)) &&
                      x(y, function (a) {
                          var c;
                          if (a === d || (a && -90 <= a && 90 >= a))
                              (f = z(Math.abs(p.h / Math.sin(t * a)))),
                                  (c = f + Math.abs(a / 360)),
                                  c < m && ((m = c), (l = a), (n = f));
                      })
                    : a.step || (n = z(p.h));
                this.autoRotation = y;
                this.labelRotation = g(l, d);
                return n;
            },
            getSlotWidth: function () {
                var a = this.chart,
                    c = this.horiz,
                    h = this.options.labels,
                    n = Math.max(
                        this.tickPositions.length - (this.categories ? 0 : 1),
                        1
                    ),
                    g = a.margin[3];
                return (
                    (c &&
                        2 > (h.step || 0) &&
                        !h.rotation &&
                        ((this.staggerLines || 1) * this.len) / n) ||
                    (!c &&
                        ((h.style && parseInt(h.style.width, 10)) ||
                            (g && g - a.spacing[3]) ||
                            0.33 * a.chartWidth))
                );
            },
            renderUnsquish: function () {
                var a = this.chart,
                    c = a.renderer,
                    h = this.tickPositions,
                    n = this.ticks,
                    g = this.options.labels,
                    b = this.horiz,
                    l = this.getSlotWidth(),
                    d = Math.max(1, Math.round(l - 2 * (g.padding || 5))),
                    p = {},
                    f = this.labelMetrics(),
                    m = g.style && g.style.textOverflow,
                    y,
                    z = 0,
                    e,
                    G;
                A(g.rotation) || (p.rotation = g.rotation || 0);
                x(h, function (a) {
                    (a = n[a]) && a.labelLength > z && (z = a.labelLength);
                });
                this.maxLabelLength = z;
                if (this.autoRotation)
                    z > d && z > f.h
                        ? (p.rotation = this.labelRotation)
                        : (this.labelRotation = 0);
                else if (l && ((y = { width: d + "px" }), !m))
                    for (y.textOverflow = "clip", e = h.length; !b && e--; )
                        if (((G = h[e]), (d = n[G].label)))
                            d.styles && "ellipsis" === d.styles.textOverflow
                                ? d.css({ textOverflow: "clip" })
                                : n[G].labelLength > l &&
                                  d.css({ width: l + "px" }),
                                d.getBBox().height >
                                    this.len / h.length - (f.h - f.f) &&
                                    (d.specCss = { textOverflow: "ellipsis" });
                p.rotation &&
                    ((y = {
                        width:
                            (z > 0.5 * a.chartHeight
                                ? 0.33 * a.chartHeight
                                : a.chartHeight) + "px",
                    }),
                    m || (y.textOverflow = "ellipsis"));
                if (
                    (this.labelAlign =
                        g.align || this.autoLabelAlign(this.labelRotation))
                )
                    p.align = this.labelAlign;
                x(h, function (a) {
                    var c = (a = n[a]) && a.label;
                    c &&
                        (c.attr(p),
                        y && c.css(I(y, c.specCss)),
                        delete c.specCss,
                        (a.rotation = p.rotation));
                });
                this.tickRotCorr = c.rotCorr(
                    f.b,
                    this.labelRotation || 0,
                    0 !== this.side
                );
            },
            hasData: function () {
                return (
                    this.hasVisibleSeries ||
                    (k(this.min) && k(this.max) && !!this.tickPositions)
                );
            },
            addTitle: function (a) {
                var c = this.chart.renderer,
                    h = this.horiz,
                    n = this.opposite,
                    g = this.options.title,
                    v;
                this.axisTitle ||
                    ((v = g.textAlign) ||
                        (v = (
                            h
                                ? {
                                      low: "left",
                                      middle: "center",
                                      high: "right",
                                  }
                                : {
                                      low: n ? "right" : "left",
                                      middle: "center",
                                      high: n ? "left" : "right",
                                  }
                        )[g.align]),
                    (this.axisTitle = c
                        .text(g.text, 0, 0, g.useHTML)
                        .attr({
                            zIndex: 7,
                            rotation: g.rotation || 0,
                            align: v,
                        })
                        .addClass("highcharts-axis-title")
                        .add(this.axisGroup)),
                    (this.axisTitle.isNew = !0));
                this.axisTitle.css({ width: this.len });
                this.axisTitle[a ? "show" : "hide"](!0);
            },
            generateTick: function (a) {
                var c = this.ticks;
                c[a] ? c[a].addLabel() : (c[a] = new h(this, a));
            },
            getOffset: function () {
                var a = this,
                    c = a.chart,
                    h = c.renderer,
                    n = a.options,
                    b = a.tickPositions,
                    l = a.ticks,
                    d = a.horiz,
                    p = a.side,
                    f = c.inverted && !a.isZAxis ? [1, 0, 3, 2][p] : p,
                    y,
                    m,
                    z = 0,
                    e,
                    A = 0,
                    G = n.title,
                    w = n.labels,
                    E = 0,
                    r = c.axisOffset,
                    c = c.clipOffset,
                    t = [-1, 1, 1, -1][p],
                    I = n.className,
                    u = a.axisParent,
                    B = this.tickSize("tick");
                y = a.hasData();
                a.showAxis = m = y || g(n.showEmpty, !0);
                a.staggerLines = a.horiz && w.staggerLines;
                a.axisGroup ||
                    ((a.gridGroup = h
                        .g("grid")
                        .attr({ zIndex: n.gridZIndex || 1 })
                        .addClass(
                            "highcharts-" +
                                this.coll.toLowerCase() +
                                "-grid " +
                                (I || "")
                        )
                        .add(u)),
                    (a.axisGroup = h
                        .g("axis")
                        .attr({ zIndex: n.zIndex || 2 })
                        .addClass(
                            "highcharts-" +
                                this.coll.toLowerCase() +
                                " " +
                                (I || "")
                        )
                        .add(u)),
                    (a.labelGroup = h
                        .g("axis-labels")
                        .attr({ zIndex: w.zIndex || 7 })
                        .addClass(
                            "highcharts-" +
                                a.coll.toLowerCase() +
                                "-labels " +
                                (I || "")
                        )
                        .add(u)));
                y || a.isLinked
                    ? (x(b, function (c, h) {
                          a.generateTick(c, h);
                      }),
                      a.renderUnsquish(),
                      !1 === w.reserveSpace ||
                          (0 !== p &&
                              2 !== p &&
                              { 1: "left", 3: "right" }[p] !== a.labelAlign &&
                              "center" !== a.labelAlign) ||
                          x(b, function (a) {
                              E = Math.max(l[a].getLabelSize(), E);
                          }),
                      a.staggerLines &&
                          ((E *= a.staggerLines),
                          (a.labelOffset = E * (a.opposite ? -1 : 1))))
                    : H(l, function (a, c) {
                          a.destroy();
                          delete l[c];
                      });
                G &&
                    G.text &&
                    !1 !== G.enabled &&
                    (a.addTitle(m),
                    m &&
                        !1 !== G.reserveSpace &&
                        ((a.titleOffset = z =
                            a.axisTitle.getBBox()[d ? "height" : "width"]),
                        (e = G.offset),
                        (A = k(e) ? 0 : g(G.margin, d ? 5 : 10))));
                a.renderLine();
                a.offset = t * g(n.offset, r[p]);
                a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
                h =
                    0 === p
                        ? -a.labelMetrics().h
                        : 2 === p
                        ? a.tickRotCorr.y
                        : 0;
                A = Math.abs(E) + A;
                E &&
                    (A =
                        A -
                        h +
                        t * (d ? g(w.y, a.tickRotCorr.y + 8 * t) : w.x));
                a.axisTitleMargin = g(e, A);
                r[p] = Math.max(
                    r[p],
                    a.axisTitleMargin + z + t * a.offset,
                    A,
                    y && b.length && B ? B[0] + t * a.offset : 0
                );
                n = n.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                c[f] = Math.max(c[f], n);
            },
            getLinePath: function (a) {
                var c = this.chart,
                    h = this.opposite,
                    n = this.offset,
                    g = this.horiz,
                    b = this.left + (h ? this.width : 0) + n,
                    n = c.chartHeight - this.bottom - (h ? this.height : 0) + n;
                h && (a *= -1);
                return c.renderer.crispLine(
                    [
                        "M",
                        g ? this.left : b,
                        g ? n : this.top,
                        "L",
                        g ? c.chartWidth - this.right : b,
                        g ? n : c.chartHeight - this.bottom,
                    ],
                    a
                );
            },
            renderLine: function () {
                this.axisLine ||
                    (this.axisLine = this.chart.renderer
                        .path()
                        .addClass("highcharts-axis-line")
                        .add(this.axisGroup));
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    c = this.left,
                    h = this.top,
                    n = this.len,
                    g = this.options.title,
                    b = a ? c : h,
                    l = this.opposite,
                    d = this.offset,
                    p = g.x || 0,
                    f = g.y || 0,
                    y = this.axisTitle,
                    m = this.chart.renderer.fontMetrics(
                        g.style && g.style.fontSize,
                        y
                    ),
                    y = Math.max(y.getBBox(null, 0).height - m.h - 1, 0),
                    n = {
                        low: b + (a ? 0 : n),
                        middle: b + n / 2,
                        high: b + (a ? n : 0),
                    }[g.align],
                    c =
                        (a ? h + this.height : c) +
                        (a ? 1 : -1) * (l ? -1 : 1) * this.axisTitleMargin +
                        [-y, y, m.f, -y][this.side];
                return {
                    x: a ? n + p : c + (l ? this.width : 0) + d + p,
                    y: a ? c + f - (l ? this.height : 0) + d : n + f,
                };
            },
            renderMinorTick: function (a) {
                var c = this.chart.hasRendered && l(this.oldMin),
                    n = this.minorTicks;
                n[a] || (n[a] = new h(this, a, "minor"));
                c && n[a].isNew && n[a].render(null, !0);
                n[a].render(null, !1, 1);
            },
            renderTick: function (a, c) {
                var n = this.isLinked,
                    g = this.ticks,
                    q = this.chart.hasRendered && l(this.oldMin);
                if (!n || (a >= this.min && a <= this.max))
                    g[a] || (g[a] = new h(this, a)),
                        q && g[a].isNew && g[a].render(c, !0, 0.1),
                        g[a].render(c);
            },
            render: function () {
                var n = this,
                    g = n.chart,
                    b = n.options,
                    d = n.isLog,
                    p = n.lin2log,
                    f = n.isLinked,
                    y = n.tickPositions,
                    m = n.axisTitle,
                    z = n.ticks,
                    A = n.minorTicks,
                    e = n.alternateBands,
                    G = b.stackLabels,
                    w = b.alternateGridColor,
                    E = n.tickmarkOffset,
                    k = n.axisLine,
                    r = n.showAxis,
                    t = B(g.renderer.globalAnimation),
                    I,
                    u;
                n.labelEdge.length = 0;
                n.overlap = !1;
                x([z, A, e], function (a) {
                    H(a, function (a) {
                        a.isActive = !1;
                    });
                });
                if (n.hasData() || f)
                    n.minorTickInterval &&
                        !n.categories &&
                        x(n.getMinorTickPositions(), function (a) {
                            n.renderMinorTick(a);
                        }),
                        y.length &&
                            (x(y, function (a, c) {
                                n.renderTick(a, c);
                            }),
                            E &&
                                (0 === n.min || n.single) &&
                                (z[-1] || (z[-1] = new h(n, -1, null, !0)),
                                z[-1].render(-1))),
                        w &&
                            x(y, function (c, h) {
                                u =
                                    void 0 !== y[h + 1]
                                        ? y[h + 1] + E
                                        : n.max - E;
                                0 === h % 2 &&
                                    c < n.max &&
                                    u <= n.max + (g.polar ? -E : E) &&
                                    (e[c] || (e[c] = new a.PlotLineOrBand(n)),
                                    (I = c + E),
                                    (e[c].options = {
                                        from: d ? p(I) : I,
                                        to: d ? p(u) : u,
                                        color: w,
                                    }),
                                    e[c].render(),
                                    (e[c].isActive = !0));
                            }),
                        n._addedPlotLB ||
                            (x(
                                (b.plotLines || []).concat(b.plotBands || []),
                                function (a) {
                                    n.addPlotBandOrLine(a);
                                }
                            ),
                            (n._addedPlotLB = !0));
                x([z, A, e], function (a) {
                    var h,
                        n = [],
                        q = t.duration;
                    H(a, function (a, c) {
                        a.isActive ||
                            (a.render(c, !1, 0), (a.isActive = !1), n.push(c));
                    });
                    c(
                        function () {
                            for (h = n.length; h--; )
                                a[n[h]] &&
                                    !a[n[h]].isActive &&
                                    (a[n[h]].destroy(), delete a[n[h]]);
                        },
                        a !== e && g.hasRendered && q ? q : 0
                    );
                });
                k &&
                    (k[k.isPlaced ? "animate" : "attr"]({
                        d: this.getLinePath(k.strokeWidth()),
                    }),
                    (k.isPlaced = !0),
                    k[r ? "show" : "hide"](!0));
                m &&
                    r &&
                    ((b = n.getTitlePosition()),
                    l(b.y)
                        ? (m[m.isNew ? "attr" : "animate"](b), (m.isNew = !1))
                        : (m.attr("y", -9999), (m.isNew = !0)));
                G && G.enabled && n.renderStackTotals();
                n.isDirty = !1;
            },
            redraw: function () {
                this.visible &&
                    (this.render(),
                    x(this.plotLinesAndBands, function (a) {
                        a.render();
                    }));
                x(this.series, function (a) {
                    a.isDirty = !0;
                });
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(
                " "
            ),
            destroy: function (a) {
                var c = this,
                    h = c.stacks,
                    n = c.plotLinesAndBands,
                    g;
                a || y(c);
                H(h, function (a, c) {
                    r(a);
                    h[c] = null;
                });
                x([c.ticks, c.minorTicks, c.alternateBands], function (a) {
                    r(a);
                });
                if (n) for (a = n.length; a--; ) n[a].destroy();
                x(
                    "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(
                        " "
                    ),
                    function (a) {
                        c[a] && (c[a] = c[a].destroy());
                    }
                );
                for (g in c.plotLinesAndBandsGroups)
                    c.plotLinesAndBandsGroups[g] =
                        c.plotLinesAndBandsGroups[g].destroy();
                H(c, function (a, h) {
                    -1 === p(h, c.keepProps) && delete c[h];
                });
            },
            drawCrosshair: function (a, c) {
                var h,
                    n = this.crosshair,
                    b = g(n.snap, !0),
                    q,
                    l = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (k(c) || !b)
                    ? (b
                          ? k(c) &&
                            (q = this.isXAxis ? c.plotX : this.len - c.plotY)
                          : (q =
                                a &&
                                (this.horiz
                                    ? a.chartX - this.pos
                                    : this.len - a.chartY + this.pos)),
                      k(q) &&
                          (h =
                              this.getPlotLinePath(
                                  c && (this.isXAxis ? c.x : g(c.stackY, c.y)),
                                  null,
                                  null,
                                  null,
                                  q
                              ) || null),
                      k(h)
                          ? ((c = this.categories && !this.isRadial),
                            l ||
                                (this.cross = l =
                                    this.chart.renderer
                                        .path()
                                        .addClass(
                                            "highcharts-crosshair highcharts-crosshair-" +
                                                (c ? "category " : "thin ") +
                                                n.className
                                        )
                                        .attr({ zIndex: g(n.zIndex, 2) })
                                        .add()),
                            l.show().attr({ d: h }),
                            c &&
                                !n.width &&
                                l.attr({ "stroke-width": this.transA }),
                            (this.cross.e = a))
                          : this.hideCrosshair())
                    : this.hideCrosshair();
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide();
            },
        });
        return (a.Axis = G);
    })(J);
    (function (a) {
        var D = a.Axis,
            B = a.Date,
            F = a.dateFormat,
            C = a.defaultOptions,
            u = a.defined,
            e = a.each,
            k = a.extend,
            t = a.getMagnitude,
            r = a.getTZOffset,
            x = a.normalizeTickInterval,
            f = a.pick,
            m = a.timeUnits;
        D.prototype.getTimeTicks = function (a, d, b, p) {
            var z = [],
                l = {},
                A = C.global.useUTC,
                w,
                E = new B(d - Math.max(r(d), r(b))),
                H = B.hcMakeTime,
                g = a.unitRange,
                y = a.count,
                n,
                c;
            if (u(d)) {
                E[B.hcSetMilliseconds](
                    g >= m.second ? 0 : y * Math.floor(E.getMilliseconds() / y)
                );
                if (g >= m.second)
                    E[B.hcSetSeconds](
                        g >= m.minute ? 0 : y * Math.floor(E.getSeconds() / y)
                    );
                if (g >= m.minute)
                    E[B.hcSetMinutes](
                        g >= m.hour
                            ? 0
                            : y * Math.floor(E[B.hcGetMinutes]() / y)
                    );
                if (g >= m.hour)
                    E[B.hcSetHours](
                        g >= m.day ? 0 : y * Math.floor(E[B.hcGetHours]() / y)
                    );
                if (g >= m.day)
                    E[B.hcSetDate](
                        g >= m.month ? 1 : y * Math.floor(E[B.hcGetDate]() / y)
                    );
                g >= m.month &&
                    (E[B.hcSetMonth](
                        g >= m.year ? 0 : y * Math.floor(E[B.hcGetMonth]() / y)
                    ),
                    (w = E[B.hcGetFullYear]()));
                if (g >= m.year) E[B.hcSetFullYear](w - (w % y));
                if (g === m.week)
                    E[B.hcSetDate](
                        E[B.hcGetDate]() - E[B.hcGetDay]() + f(p, 1)
                    );
                w = E[B.hcGetFullYear]();
                p = E[B.hcGetMonth]();
                var h = E[B.hcGetDate](),
                    G = E[B.hcGetHours]();
                if (B.hcTimezoneOffset || B.hcGetTimezoneOffset)
                    (c =
                        (!A || !!B.hcGetTimezoneOffset) &&
                        (b - d > 4 * m.month || r(d) !== r(b))),
                        (E = E.getTime()),
                        (n = r(E)),
                        (E = new B(E + n));
                A = E.getTime();
                for (d = 1; A < b; )
                    z.push(A),
                        (A =
                            g === m.year
                                ? H(w + d * y, 0)
                                : g === m.month
                                ? H(w, p + d * y)
                                : !c || (g !== m.day && g !== m.week)
                                ? c && g === m.hour
                                    ? H(w, p, h, G + d * y, 0, 0, n) - n
                                    : A + g * y
                                : H(w, p, h + d * y * (g === m.day ? 1 : 7))),
                        d++;
                z.push(A);
                g <= m.hour &&
                    1e4 > z.length &&
                    e(z, function (a) {
                        0 === a % 18e5 &&
                            "000000000" === F("%H%M%S%L", a) &&
                            (l[a] = "day");
                    });
            }
            z.info = k(a, { higherRanks: l, totalRange: g * y });
            return z;
        };
        D.prototype.normalizeTimeTickInterval = function (a, d) {
            var b = d || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null],
            ];
            d = b[b.length - 1];
            var p = m[d[0]],
                f = d[1],
                l;
            for (
                l = 0;
                l < b.length &&
                !((d = b[l]),
                (p = m[d[0]]),
                (f = d[1]),
                b[l + 1] && a <= (p * f[f.length - 1] + m[b[l + 1][0]]) / 2);
                l++
            );
            p === m.year && a < 5 * p && (f = [1, 2, 5]);
            a = x(a / p, f, "year" === d[0] ? Math.max(t(a / p), 1) : 1);
            return { unitRange: p, count: a, unitName: d[0] };
        };
    })(J);
    (function (a) {
        var D = a.Axis,
            B = a.getMagnitude,
            F = a.map,
            C = a.normalizeTickInterval,
            u = a.pick;
        D.prototype.getLogTickPositions = function (a, k, t, r) {
            var e = this.options,
                f = this.len,
                m = this.lin2log,
                w = this.log2lin,
                d = [];
            r || (this._minorAutoInterval = null);
            if (0.5 <= a)
                (a = Math.round(a)), (d = this.getLinearTickPositions(a, k, t));
            else if (0.08 <= a)
                for (
                    var f = Math.floor(k),
                        b,
                        p,
                        z,
                        l,
                        A,
                        e =
                            0.3 < a
                                ? [1, 2, 4]
                                : 0.15 < a
                                ? [1, 2, 4, 6, 8]
                                : [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    f < t + 1 && !A;
                    f++
                )
                    for (p = e.length, b = 0; b < p && !A; b++)
                        (z = w(m(f) * e[b])),
                            z > k &&
                                (!r || l <= t) &&
                                void 0 !== l &&
                                d.push(l),
                            l > t && (A = !0),
                            (l = z);
            else
                (k = m(k)),
                    (t = m(t)),
                    (a = r ? this.getMinorTickInterval() : e.tickInterval),
                    (a = u(
                        "auto" === a ? null : a,
                        this._minorAutoInterval,
                        ((e.tickPixelInterval / (r ? 5 : 1)) * (t - k)) /
                            ((r ? f / this.tickPositions.length : f) || 1)
                    )),
                    (a = C(a, null, B(a))),
                    (d = F(this.getLinearTickPositions(a, k, t), w)),
                    r || (this._minorAutoInterval = a / 5);
            r || (this.tickInterval = a);
            return d;
        };
        D.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10;
        };
        D.prototype.lin2log = function (a) {
            return Math.pow(10, a);
        };
    })(J);
    (function (a, D) {
        var B = a.arrayMax,
            F = a.arrayMin,
            C = a.defined,
            u = a.destroyObjectProperties,
            e = a.each,
            k = a.erase,
            t = a.merge,
            r = a.pick;
        a.PlotLineOrBand = function (a, f) {
            this.axis = a;
            f && ((this.options = f), (this.id = f.id));
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var e = this,
                    f = e.axis,
                    m = f.horiz,
                    w = e.options,
                    d = w.label,
                    b = e.label,
                    p = w.to,
                    z = w.from,
                    l = w.value,
                    A = C(z) && C(p),
                    k = C(l),
                    E = e.svgElem,
                    H = !E,
                    g = [],
                    y = r(w.zIndex, 0),
                    n = w.events,
                    g = {
                        class:
                            "highcharts-plot-" +
                            (A ? "band " : "line ") +
                            (w.className || ""),
                    },
                    c = {},
                    h = f.chart.renderer,
                    G = A ? "bands" : "lines",
                    v;
                v = f.log2lin;
                f.isLog && ((z = v(z)), (p = v(p)), (l = v(l)));
                c.zIndex = y;
                G += "-" + y;
                (v = f.plotLinesAndBandsGroups[G]) ||
                    (f.plotLinesAndBandsGroups[G] = v =
                        h
                            .g("plot-" + G)
                            .attr(c)
                            .add());
                H && (e.svgElem = E = h.path().attr(g).add(v));
                if (k) g = f.getPlotLinePath(l, E.strokeWidth());
                else if (A) g = f.getPlotBandPath(z, p, w);
                else return;
                H && g && g.length
                    ? (E.attr({ d: g }),
                      n &&
                          a.objectEach(n, function (a, c) {
                              E.on(c, function (a) {
                                  n[c].apply(e, [a]);
                              });
                          }))
                    : E &&
                      (g
                          ? (E.show(), E.animate({ d: g }))
                          : (E.hide(), b && (e.label = b = b.destroy())));
                d &&
                C(d.text) &&
                g &&
                g.length &&
                0 < f.width &&
                0 < f.height &&
                !g.flat
                    ? ((d = t(
                          {
                              align: m && A && "center",
                              x: m ? !A && 4 : 10,
                              verticalAlign: !m && A && "middle",
                              y: m ? (A ? 16 : 10) : A ? 6 : -4,
                              rotation: m && !A && 90,
                          },
                          d
                      )),
                      this.renderLabel(d, g, A, y))
                    : b && b.hide();
                return e;
            },
            renderLabel: function (a, f, m, e) {
                var d = this.label,
                    b = this.axis.chart.renderer;
                d ||
                    ((d = {
                        align: a.textAlign || a.align,
                        rotation: a.rotation,
                        class:
                            "highcharts-plot-" +
                            (m ? "band" : "line") +
                            "-label " +
                            (a.className || ""),
                    }),
                    (d.zIndex = e),
                    (this.label = d =
                        b.text(a.text, 0, 0, a.useHTML).attr(d).add()));
                e = f.xBounds || [f[1], f[4], m ? f[6] : f[1]];
                f = f.yBounds || [f[2], f[5], m ? f[7] : f[2]];
                m = F(e);
                b = F(f);
                d.align(a, !1, {
                    x: m,
                    y: b,
                    width: B(e) - m,
                    height: B(f) - b,
                });
                d.show();
            },
            destroy: function () {
                k(this.axis.plotLinesAndBands, this);
                delete this.axis;
                u(this);
            },
        };
        a.extend(D.prototype, {
            getPlotBandPath: function (a, f) {
                var m = this.getPlotLinePath(f, null, null, !0),
                    e = this.getPlotLinePath(a, null, null, !0),
                    d = this.horiz,
                    b = 1;
                a =
                    (a < this.min && f < this.min) ||
                    (a > this.max && f > this.max);
                e && m
                    ? (a && ((e.flat = e.toString() === m.toString()), (b = 0)),
                      e.push(
                          d && m[4] === e[4] ? m[4] + b : m[4],
                          d || m[5] !== e[5] ? m[5] : m[5] + b,
                          d && m[1] === e[1] ? m[1] + b : m[1],
                          d || m[2] !== e[2] ? m[2] : m[2] + b,
                          "z"
                      ))
                    : (e = null);
                return e;
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands");
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines");
            },
            addPlotBandOrLine: function (e, f) {
                var m = new a.PlotLineOrBand(this, e).render(),
                    w = this.userOptions;
                m &&
                    (f && ((w[f] = w[f] || []), w[f].push(e)),
                    this.plotLinesAndBands.push(m));
                return m;
            },
            removePlotBandOrLine: function (a) {
                for (
                    var f = this.plotLinesAndBands,
                        m = this.options,
                        w = this.userOptions,
                        d = f.length;
                    d--;

                )
                    f[d].id === a && f[d].destroy();
                e(
                    [
                        m.plotLines || [],
                        w.plotLines || [],
                        m.plotBands || [],
                        w.plotBands || [],
                    ],
                    function (b) {
                        for (d = b.length; d--; ) b[d].id === a && k(b, b[d]);
                    }
                );
            },
            removePlotBand: function (a) {
                this.removePlotBandOrLine(a);
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a);
            },
        });
    })(J, W);
    (function (a) {
        var D = a.dateFormat,
            B = a.each,
            F = a.extend,
            C = a.format,
            u = a.isNumber,
            e = a.map,
            k = a.merge,
            t = a.pick,
            r = a.splat,
            x = a.syncTimeout,
            f = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments);
        };
        a.Tooltip.prototype = {
            init: function (a, f) {
                this.chart = a;
                this.options = f;
                this.crosshairs = [];
                this.now = { x: 0, y: 0 };
                this.isHidden = !0;
                this.split = f.split && !a.inverted;
                this.shared = f.shared || this.split;
            },
            cleanSplit: function (a) {
                B(this.chart.series, function (f) {
                    var d = f && f.tt;
                    d &&
                        (!d.isActive || a
                            ? (f.tt = d.destroy())
                            : (d.isActive = !1));
                });
            },
            applyFilter: function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: 0.5,
                    children: [
                        {
                            tagName: "feGaussianBlur",
                            in: "SourceAlpha",
                            stdDeviation: 1,
                        },
                        { tagName: "feOffset", dx: 1, dy: 1 },
                        {
                            tagName: "feComponentTransfer",
                            children: [
                                {
                                    tagName: "feFuncA",
                                    type: "linear",
                                    slope: 0.3,
                                },
                            ],
                        },
                        {
                            tagName: "feMerge",
                            children: [
                                { tagName: "feMergeNode" },
                                { tagName: "feMergeNode", in: "SourceGraphic" },
                            ],
                        },
                    ],
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent:
                        ".highcharts-tooltip-" +
                        a.index +
                        "{filter:url(#drop-shadow-" +
                        a.index +
                        ")}",
                });
            },
            getLabel: function () {
                var a = this.chart.renderer,
                    f = this.options;
                this.label ||
                    ((this.label = this.split
                        ? a.g("tooltip")
                        : a
                              .label(
                                  "",
                                  0,
                                  0,
                                  f.shape || "callout",
                                  null,
                                  null,
                                  f.useHTML,
                                  null,
                                  "tooltip"
                              )
                              .attr({ padding: f.padding, r: f.borderRadius })),
                    this.applyFilter(),
                    this.label.addClass(
                        "highcharts-tooltip-" + this.chart.index
                    ),
                    this.label.attr({ zIndex: 8 }).add());
                return this.label;
            },
            update: function (a) {
                this.destroy();
                k(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, k(!0, this.options, a));
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split &&
                    this.tt &&
                    (this.cleanSplit(this.chart, !0),
                    (this.tt = this.tt.destroy()));
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout);
            },
            move: function (a, f, d, b) {
                var p = this,
                    m = p.now,
                    l =
                        !1 !== p.options.animation &&
                        !p.isHidden &&
                        (1 < Math.abs(a - m.x) || 1 < Math.abs(f - m.y)),
                    e = p.followPointer || 1 < p.len;
                F(m, {
                    x: l ? (2 * m.x + a) / 3 : a,
                    y: l ? (m.y + f) / 2 : f,
                    anchorX: e ? void 0 : l ? (2 * m.anchorX + d) / 3 : d,
                    anchorY: e ? void 0 : l ? (m.anchorY + b) / 2 : b,
                });
                p.getLabel().attr(m);
                l &&
                    (clearTimeout(this.tooltipTimeout),
                    (this.tooltipTimeout = setTimeout(function () {
                        p && p.move(a, f, d, b);
                    }, 32)));
            },
            hide: function (a) {
                var f = this;
                clearTimeout(this.hideTimer);
                a = t(a, this.options.hideDelay, 500);
                this.isHidden ||
                    (this.hideTimer = x(function () {
                        f.getLabel()[a ? "fadeOut" : "hide"]();
                        f.isHidden = !0;
                    }, a));
            },
            getAnchor: function (a, f) {
                var d,
                    b = this.chart,
                    p = b.inverted,
                    m = b.plotTop,
                    l = b.plotLeft,
                    A = 0,
                    w = 0,
                    E,
                    k;
                a = r(a);
                d = a[0].tooltipPos;
                this.followPointer &&
                    f &&
                    (void 0 === f.chartX && (f = b.pointer.normalize(f)),
                    (d = [f.chartX - b.plotLeft, f.chartY - m]));
                d ||
                    (B(a, function (a) {
                        E = a.series.yAxis;
                        k = a.series.xAxis;
                        A += a.plotX + (!p && k ? k.left - l : 0);
                        w +=
                            (a.plotLow
                                ? (a.plotLow + a.plotHigh) / 2
                                : a.plotY) + (!p && E ? E.top - m : 0);
                    }),
                    (A /= a.length),
                    (w /= a.length),
                    (d = [
                        p ? b.plotWidth - w : A,
                        this.shared && !p && 1 < a.length && f
                            ? f.chartY - m
                            : p
                            ? b.plotHeight - A
                            : w,
                    ]));
                return e(d, Math.round);
            },
            getPosition: function (a, f, d) {
                var b = this.chart,
                    p = this.distance,
                    m = {},
                    l = d.h || 0,
                    e,
                    w = [
                        "y",
                        b.chartHeight,
                        f,
                        d.plotY + b.plotTop,
                        b.plotTop,
                        b.plotTop + b.plotHeight,
                    ],
                    E = [
                        "x",
                        b.chartWidth,
                        a,
                        d.plotX + b.plotLeft,
                        b.plotLeft,
                        b.plotLeft + b.plotWidth,
                    ],
                    k =
                        !this.followPointer &&
                        t(d.ttBelow, !b.inverted === !!d.negative),
                    g = function (a, c, n, g, b, d) {
                        var h = n < g - p,
                            q = g + p + n < c,
                            v = g - p - n;
                        g += p;
                        if (k && q) m[a] = g;
                        else if (!k && h) m[a] = v;
                        else if (h)
                            m[a] = Math.min(d - n, 0 > v - l ? v : v - l);
                        else if (q)
                            m[a] = Math.max(b, g + l + n > c ? g : g + l);
                        else return !1;
                    },
                    y = function (a, c, n, g) {
                        var h;
                        g < p || g > c - p
                            ? (h = !1)
                            : (m[a] =
                                  g < n / 2
                                      ? 1
                                      : g > c - n / 2
                                      ? c - n - 2
                                      : g - n / 2);
                        return h;
                    },
                    n = function (a) {
                        var c = w;
                        w = E;
                        E = c;
                        e = a;
                    },
                    c = function () {
                        !1 !== g.apply(0, w)
                            ? !1 !== y.apply(0, E) || e || (n(!0), c())
                            : e
                            ? (m.x = m.y = 0)
                            : (n(!0), c());
                    };
                (b.inverted || 1 < this.len) && n();
                c();
                return m;
            },
            defaultFormatter: function (a) {
                var f = this.points || r(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(f[0])];
                d = d.concat(a.bodyFormatter(f));
                d.push(a.tooltipFooterHeaderFormatter(f[0], !0));
                return d;
            },
            refresh: function (a, f) {
                var d,
                    b = this.options,
                    p = a,
                    m,
                    l = {},
                    e = [];
                d = b.formatter || this.defaultFormatter;
                var l = this.shared,
                    k;
                b.enabled &&
                    (clearTimeout(this.hideTimer),
                    (this.followPointer =
                        r(p)[0].series.tooltipOptions.followPointer),
                    (m = this.getAnchor(p, f)),
                    (f = m[0]),
                    (b = m[1]),
                    !l || (p.series && p.series.noSharedTooltip)
                        ? (l = p.getLabelConfig())
                        : (B(p, function (a) {
                              a.setState("hover");
                              e.push(a.getLabelConfig());
                          }),
                          (l = { x: p[0].category, y: p[0].y }),
                          (l.points = e),
                          (p = p[0])),
                    (this.len = e.length),
                    (l = d.call(l, this)),
                    (k = p.series),
                    (this.distance = t(k.tooltipOptions.distance, 16)),
                    !1 === l
                        ? this.hide()
                        : ((d = this.getLabel()),
                          this.isHidden && d.attr({ opacity: 1 }).show(),
                          this.split
                              ? this.renderSplit(l, a)
                              : (d.css({ width: this.chart.spacingBox.width }),
                                d.attr({ text: l && l.join ? l.join("") : l }),
                                d
                                    .removeClass(/highcharts-color-[\d]+/g)
                                    .addClass(
                                        "highcharts-color-" +
                                            t(p.colorIndex, k.colorIndex)
                                    ),
                                this.updatePosition({
                                    plotX: f,
                                    plotY: b,
                                    negative: p.negative,
                                    ttBelow: p.ttBelow,
                                    h: m[2] || 0,
                                })),
                          (this.isHidden = !1)));
            },
            renderSplit: function (f, e) {
                var d = this,
                    b = [],
                    p = this.chart,
                    m = p.renderer,
                    l = !0,
                    A = this.options,
                    k = 0,
                    E = this.getLabel();
                a.isString(f) && (f = [!1, f]);
                B(f.slice(0, e.length + 1), function (a, g) {
                    if (!1 !== a) {
                        g = e[g - 1] || { isHeader: !0, plotX: e[0].plotX };
                        var f = g.series || d,
                            n = f.tt,
                            c =
                                "highcharts-color-" +
                                t(
                                    g.colorIndex,
                                    (g.series || {}).colorIndex,
                                    "none"
                                );
                        n ||
                            (f.tt = n =
                                m
                                    .label(null, null, null, "callout")
                                    .addClass("highcharts-tooltip-box " + c)
                                    .attr({
                                        padding: A.padding,
                                        r: A.borderRadius,
                                    })
                                    .add(E));
                        n.isActive = !0;
                        n.attr({ text: a });
                        a = n.getBBox();
                        c = a.width + n.strokeWidth();
                        g.isHeader
                            ? ((k = a.height),
                              (c = Math.max(
                                  0,
                                  Math.min(
                                      g.plotX + p.plotLeft - c / 2,
                                      p.chartWidth - c
                                  )
                              )))
                            : (c =
                                  g.plotX + p.plotLeft - t(A.distance, 16) - c);
                        0 > c && (l = !1);
                        a =
                            (g.series && g.series.yAxis && g.series.yAxis.pos) +
                            (g.plotY || 0);
                        a -= p.plotTop;
                        b.push({
                            target: g.isHeader ? p.plotHeight + k : a,
                            rank: g.isHeader ? 1 : 0,
                            size: f.tt.getBBox().height + 1,
                            point: g,
                            x: c,
                            tt: n,
                        });
                    }
                });
                this.cleanSplit();
                a.distribute(b, p.plotHeight + k);
                B(b, function (a) {
                    var g = a.point,
                        b = g.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x:
                            l || g.isHeader
                                ? a.x
                                : g.plotX + p.plotLeft + t(A.distance, 16),
                        y: a.pos + p.plotTop,
                        anchorX: g.isHeader
                            ? g.plotX + p.plotLeft
                            : g.plotX + b.xAxis.pos,
                        anchorY: g.isHeader
                            ? a.pos + p.plotTop - 15
                            : g.plotY + b.yAxis.pos,
                    });
                });
            },
            updatePosition: function (a) {
                var f = this.chart,
                    d = this.getLabel(),
                    d = (this.options.positioner || this.getPosition).call(
                        this,
                        d.width,
                        d.height,
                        a
                    );
                this.move(
                    Math.round(d.x),
                    Math.round(d.y || 0),
                    a.plotX + f.plotLeft,
                    a.plotY + f.plotTop
                );
            },
            getDateFormat: function (a, e, d, b) {
                var p = D("%m-%d %H:%M:%S.%L", e),
                    m,
                    l,
                    A = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3,
                    },
                    k = "millisecond";
                for (l in f) {
                    if (
                        a === f.week &&
                        +D("%w", e) === d &&
                        "00:00:00.000" === p.substr(6)
                    ) {
                        l = "week";
                        break;
                    }
                    if (f[l] > a) {
                        l = k;
                        break;
                    }
                    if (
                        A[l] &&
                        p.substr(A[l]) !== "01-01 00:00:00.000".substr(A[l])
                    )
                        break;
                    "week" !== l && (k = l);
                }
                l && (m = b[l]);
                return m;
            },
            getXDateFormat: function (a, f, d) {
                f = f.dateTimeLabelFormats;
                var b = d && d.closestPointRange;
                return (
                    (b
                        ? this.getDateFormat(b, a.x, d.options.startOfWeek, f)
                        : f.day) || f.year
                );
            },
            tooltipFooterHeaderFormatter: function (a, f) {
                f = f ? "footer" : "header";
                var d = a.series,
                    b = d.tooltipOptions,
                    p = b.xDateFormat,
                    e = d.xAxis,
                    l = e && "datetime" === e.options.type && u(a.key),
                    m = b[f + "Format"];
                l && !p && (p = this.getXDateFormat(a, b, e));
                l &&
                    p &&
                    B(
                        (a.point && a.point.tooltipDateKeys) || ["key"],
                        function (a) {
                            m = m.replace(
                                "{point." + a + "}",
                                "{point." + a + ":" + p + "}"
                            );
                        }
                    );
                return C(m, { point: a, series: d });
            },
            bodyFormatter: function (a) {
                return e(a, function (a) {
                    var d = a.series.tooltipOptions;
                    return (d.pointFormatter || a.point.tooltipFormatter).call(
                        a.point,
                        d[(a.point.formatPrefix || "point") + "Format"]
                    );
                });
            },
        };
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.attr,
            F = a.charts,
            C = a.css,
            u = a.defined,
            e = a.each,
            k = a.extend,
            t = a.find,
            r = a.fireEvent,
            x = a.isObject,
            f = a.offset,
            m = a.pick,
            w = a.removeEvent,
            d = a.splat,
            b = a.Tooltip;
        a.Pointer = function (a, b) {
            this.init(a, b);
        };
        a.Pointer.prototype = {
            init: function (a, d) {
                this.options = d;
                this.chart = a;
                this.runChartClick = d.chart.events && !!d.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                b &&
                    ((a.tooltip = new b(a, d.tooltip)),
                    (this.followTouchMove = m(d.tooltip.followTouchMove, !0)));
                this.setDOMEvents();
            },
            zoomOption: function (a) {
                var b = this.chart,
                    d = b.options.chart,
                    p = d.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (p = m(d.pinchType, p));
                this.zoomX = a = /x/.test(p);
                this.zoomY = p = /y/.test(p);
                this.zoomHor = (a && !b) || (p && b);
                this.zoomVert = (p && !b) || (a && b);
                this.hasZoom = a || p;
            },
            normalize: function (a, b) {
                var d;
                d = a.touches
                    ? a.touches.length
                        ? a.touches.item(0)
                        : a.changedTouches[0]
                    : a;
                b || (this.chartPosition = b = f(this.chart.container));
                return k(a, {
                    chartX: Math.round(d.pageX - b.left),
                    chartY: Math.round(d.pageY - b.top),
                });
            },
            getCoordinates: function (a) {
                var b = { xAxis: [], yAxis: [] };
                e(this.chart.axes, function (d) {
                    b[d.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: d,
                        value: d.toValue(a[d.horiz ? "chartX" : "chartY"]),
                    });
                });
                return b;
            },
            findNearestKDPoint: function (a, b, d) {
                var l;
                e(a, function (a) {
                    var p =
                        !(a.noSharedTooltip && b) &&
                        0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(d, p);
                    if ((p = x(a, !0)) && !(p = !x(l, !0)))
                        var p = l.distX - a.distX,
                            f = l.dist - a.dist,
                            g =
                                (a.series.group && a.series.group.zIndex) -
                                (l.series.group && l.series.group.zIndex),
                            p =
                                0 <
                                (0 !== p && b
                                    ? p
                                    : 0 !== f
                                    ? f
                                    : 0 !== g
                                    ? g
                                    : l.series.index > a.series.index
                                    ? -1
                                    : 1);
                    p && (l = a);
                });
                return l;
            },
            getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b; ) (b = a.point), (a = a.parentNode);
                return b;
            },
            getChartCoordinatesFromPoint: function (a, b) {
                var d = a.series,
                    p = d.xAxis,
                    d = d.yAxis;
                if (p && d)
                    return b
                        ? {
                              chartX: p.len + p.pos - a.clientX,
                              chartY: d.len + d.pos - a.plotY,
                          }
                        : {
                              chartX: a.clientX + p.pos,
                              chartY: a.plotY + d.pos,
                          };
            },
            getHoverData: function (b, d, l, f, k, E, w) {
                var g,
                    p = [],
                    n = w && w.isBoosting;
                f = !(!f || !b);
                w =
                    d && !d.stickyTracking
                        ? [d]
                        : a.grep(l, function (a) {
                              return (
                                  a.visible &&
                                  !(!k && a.directTouch) &&
                                  m(a.options.enableMouseTracking, !0) &&
                                  a.stickyTracking
                              );
                          });
                d = (g = f ? b : this.findNearestKDPoint(w, k, E)) && g.series;
                g &&
                    (k && !d.noSharedTooltip
                        ? ((w = a.grep(l, function (a) {
                              return (
                                  a.visible &&
                                  !(!k && a.directTouch) &&
                                  m(a.options.enableMouseTracking, !0) &&
                                  !a.noSharedTooltip
                              );
                          })),
                          e(w, function (a) {
                              var c = t(a.points, function (a) {
                                  return a.x === g.x && !a.isNull;
                              });
                              x(c) && (n && (c = a.getPoint(c)), p.push(c));
                          }))
                        : p.push(g));
                return { hoverPoint: g, hoverSeries: d, hoverPoints: p };
            },
            runPointActions: function (b, d) {
                var l = this.chart,
                    p =
                        l.tooltip && l.tooltip.options.enabled
                            ? l.tooltip
                            : void 0,
                    f = p ? p.shared : !1,
                    z = d || l.hoverPoint,
                    k = (z && z.series) || l.hoverSeries,
                    k = this.getHoverData(
                        z,
                        k,
                        l.series,
                        !!d || (k && k.directTouch && this.isDirectTouch),
                        f,
                        b,
                        { isBoosting: l.isBoosting }
                    ),
                    g,
                    z = k.hoverPoint;
                g = k.hoverPoints;
                d = (k = k.hoverSeries) && k.tooltipOptions.followPointer;
                f = f && k && !k.noSharedTooltip;
                if (z && (z !== l.hoverPoint || (p && p.isHidden))) {
                    e(l.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, g) && b.setState();
                    });
                    e(g || [], function (a) {
                        a.setState("hover");
                    });
                    if (l.hoverSeries !== k) k.onMouseOver();
                    l.hoverPoint && l.hoverPoint.firePointEvent("mouseOut");
                    if (!z.series) return;
                    z.firePointEvent("mouseOver");
                    l.hoverPoints = g;
                    l.hoverPoint = z;
                    p && p.refresh(f ? g : z, b);
                } else
                    d &&
                        p &&
                        !p.isHidden &&
                        ((z = p.getAnchor([{}], b)),
                        p.updatePosition({ plotX: z[0], plotY: z[1] }));
                this.unDocMouseMove ||
                    (this.unDocMouseMove = D(
                        l.container.ownerDocument,
                        "mousemove",
                        function (g) {
                            var n = F[a.hoverChartIndex];
                            if (n) n.pointer.onDocumentMouseMove(g);
                        }
                    ));
                e(l.axes, function (d) {
                    var n = m(d.crosshair.snap, !0),
                        c = n
                            ? a.find(g, function (a) {
                                  return a.series[d.coll] === d;
                              })
                            : void 0;
                    c || !n ? d.drawCrosshair(b, c) : d.hideCrosshair();
                });
            },
            reset: function (a, b) {
                var l = this.chart,
                    p = l.hoverSeries,
                    f = l.hoverPoint,
                    m = l.hoverPoints,
                    z = l.tooltip,
                    g = z && z.shared ? m : f;
                a &&
                    g &&
                    e(d(g), function (g) {
                        g.series.isCartesian && void 0 === g.plotX && (a = !1);
                    });
                if (a)
                    z &&
                        g &&
                        (z.refresh(g),
                        f &&
                            (f.setState(f.state, !0),
                            e(l.axes, function (a) {
                                a.crosshair && a.drawCrosshair(null, f);
                            })));
                else {
                    if (f) f.onMouseOut();
                    m &&
                        e(m, function (a) {
                            a.setState();
                        });
                    if (p) p.onMouseOut();
                    z && z.hide(b);
                    this.unDocMouseMove &&
                        (this.unDocMouseMove = this.unDocMouseMove());
                    e(l.axes, function (a) {
                        a.hideCrosshair();
                    });
                    this.hoverX = l.hoverPoints = l.hoverPoint = null;
                }
            },
            scaleGroups: function (a, b) {
                var d = this.chart,
                    p;
                e(d.series, function (l) {
                    p = a || l.getPlotBox();
                    l.xAxis &&
                        l.xAxis.zoomEnabled &&
                        l.group &&
                        (l.group.attr(p),
                        l.markerGroup &&
                            (l.markerGroup.attr(p),
                            l.markerGroup.clip(b ? d.clipRect : null)),
                        l.dataLabelsGroup && l.dataLabelsGroup.attr(p));
                });
                d.clipRect.attr(b || d.clipBox);
            },
            dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY;
            },
            drag: function (a) {
                var b = this.chart,
                    d = b.options.chart,
                    p = a.chartX,
                    f = a.chartY,
                    e = this.zoomHor,
                    m = this.zoomVert,
                    g = b.plotLeft,
                    y = b.plotTop,
                    n = b.plotWidth,
                    c = b.plotHeight,
                    h,
                    G = this.selectionMarker,
                    v = this.mouseDownX,
                    q = this.mouseDownY,
                    k = d.panKey && a[d.panKey + "Key"];
                (G && G.touch) ||
                    (p < g ? (p = g) : p > g + n && (p = g + n),
                    f < y ? (f = y) : f > y + c && (f = y + c),
                    (this.hasDragged = Math.sqrt(
                        Math.pow(v - p, 2) + Math.pow(q - f, 2)
                    )),
                    10 < this.hasDragged &&
                        ((h = b.isInsidePlot(v - g, q - y)),
                        b.hasCartesianSeries &&
                            (this.zoomX || this.zoomY) &&
                            h &&
                            !k &&
                            !G &&
                            (this.selectionMarker = G =
                                b.renderer
                                    .rect(g, y, e ? 1 : n, m ? 1 : c, 0)
                                    .attr({
                                        class: "highcharts-selection-marker",
                                        zIndex: 7,
                                    })
                                    .add()),
                        G &&
                            e &&
                            ((p -= v),
                            G.attr({
                                width: Math.abs(p),
                                x: (0 < p ? 0 : p) + v,
                            })),
                        G &&
                            m &&
                            ((p = f - q),
                            G.attr({
                                height: Math.abs(p),
                                y: (0 < p ? 0 : p) + q,
                            })),
                        h && !G && d.panning && b.pan(a, d.panning)));
            },
            drop: function (a) {
                var b = this,
                    d = this.chart,
                    p = this.hasPinched;
                if (this.selectionMarker) {
                    var f = { originalEvent: a, xAxis: [], yAxis: [] },
                        m = this.selectionMarker,
                        w = m.attr ? m.attr("x") : m.x,
                        g = m.attr ? m.attr("y") : m.y,
                        y = m.attr ? m.attr("width") : m.width,
                        n = m.attr ? m.attr("height") : m.height,
                        c;
                    if (this.hasDragged || p)
                        e(d.axes, function (h) {
                            if (
                                h.zoomEnabled &&
                                u(h.min) &&
                                (p ||
                                    b[
                                        { xAxis: "zoomX", yAxis: "zoomY" }[
                                            h.coll
                                        ]
                                    ])
                            ) {
                                var d = h.horiz,
                                    l =
                                        "touchend" === a.type
                                            ? h.minPixelPadding
                                            : 0,
                                    q = h.toValue((d ? w : g) + l),
                                    d = h.toValue((d ? w + y : g + n) - l);
                                f[h.coll].push({
                                    axis: h,
                                    min: Math.min(q, d),
                                    max: Math.max(q, d),
                                });
                                c = !0;
                            }
                        }),
                            c &&
                                r(d, "selection", f, function (a) {
                                    d.zoom(k(a, p ? { animation: !1 } : null));
                                });
                    this.selectionMarker = this.selectionMarker.destroy();
                    p && this.scaleGroups();
                }
                d &&
                    (C(d.container, { cursor: d._cursor }),
                    (d.cancelClick = 10 < this.hasDragged),
                    (d.mouseIsDown = this.hasDragged = this.hasPinched = !1),
                    (this.pinchDown = []));
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a);
            },
            onDocumentMouseUp: function (b) {
                F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b);
            },
            onDocumentMouseMove: function (a) {
                var b = this.chart,
                    d = this.chartPosition;
                a = this.normalize(a, d);
                !d ||
                    this.inClass(a.target, "highcharts-tracker") ||
                    b.isInsidePlot(
                        a.chartX - b.plotLeft,
                        a.chartY - b.plotTop
                    ) ||
                    this.reset();
            },
            onContainerMouseLeave: function (b) {
                var d = F[a.hoverChartIndex];
                d &&
                    (b.relatedTarget || b.toElement) &&
                    (d.pointer.reset(), (d.pointer.chartPosition = null));
            },
            onContainerMouseMove: function (b) {
                var d = this.chart;
                (u(a.hoverChartIndex) &&
                    F[a.hoverChartIndex] &&
                    F[a.hoverChartIndex].mouseIsDown) ||
                    (a.hoverChartIndex = d.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === d.mouseIsDown && this.drag(b);
                (!this.inClass(b.target, "highcharts-tracker") &&
                    !d.isInsidePlot(
                        b.chartX - d.plotLeft,
                        b.chartY - d.plotTop
                    )) ||
                    d.openMenu ||
                    this.runPointActions(b);
            },
            inClass: function (a, b) {
                for (var d; a; ) {
                    if ((d = B(a, "class"))) {
                        if (-1 !== d.indexOf(b)) return !0;
                        if (-1 !== d.indexOf("highcharts-container")) return !1;
                    }
                    a = a.parentNode;
                }
            },
            onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (
                    !(
                        !b ||
                        !a ||
                        b.stickyTracking ||
                        this.inClass(a, "highcharts-tooltip") ||
                        (this.inClass(a, "highcharts-series-" + b.index) &&
                            this.inClass(a, "highcharts-tracker"))
                    )
                )
                    b.onMouseOut();
            },
            onContainerClick: function (a) {
                var b = this.chart,
                    d = b.hoverPoint,
                    f = b.plotLeft,
                    p = b.plotTop;
                a = this.normalize(a);
                b.cancelClick ||
                    (d && this.inClass(a.target, "highcharts-tracker")
                        ? (r(d.series, "click", k(a, { point: d })),
                          b.hoverPoint && d.firePointEvent("click", a))
                        : (k(a, this.getCoordinates(a)),
                          b.isInsidePlot(a.chartX - f, a.chartY - p) &&
                              r(b, "click", a)));
            },
            setDOMEvents: function () {
                var b = this,
                    d = b.chart.container,
                    l = d.ownerDocument;
                d.onmousedown = function (a) {
                    b.onContainerMouseDown(a);
                };
                d.onmousemove = function (a) {
                    b.onContainerMouseMove(a);
                };
                d.onclick = function (a) {
                    b.onContainerClick(a);
                };
                D(d, "mouseleave", b.onContainerMouseLeave);
                1 === a.chartCount && D(l, "mouseup", b.onDocumentMouseUp);
                a.hasTouch &&
                    ((d.ontouchstart = function (a) {
                        b.onContainerTouchStart(a);
                    }),
                    (d.ontouchmove = function (a) {
                        b.onContainerTouchMove(a);
                    }),
                    1 === a.chartCount &&
                        D(l, "touchend", b.onDocumentTouchEnd));
            },
            destroy: function () {
                var b = this,
                    d = this.chart.container.ownerDocument;
                b.unDocMouseMove && b.unDocMouseMove();
                w(b.chart.container, "mouseleave", b.onContainerMouseLeave);
                a.chartCount ||
                    (w(d, "mouseup", b.onDocumentMouseUp),
                    a.hasTouch && w(d, "touchend", b.onDocumentTouchEnd));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, d) {
                    b[d] = null;
                });
            },
        };
    })(J);
    (function (a) {
        var D = a.charts,
            B = a.each,
            F = a.extend,
            C = a.map,
            u = a.noop,
            e = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function (a, e, r, x, f, m) {
                this.zoomHor &&
                    this.pinchTranslateDirection(!0, a, e, r, x, f, m);
                this.zoomVert &&
                    this.pinchTranslateDirection(!1, a, e, r, x, f, m);
            },
            pinchTranslateDirection: function (a, e, r, x, f, m, w, d) {
                var b = this.chart,
                    p = a ? "x" : "y",
                    k = a ? "X" : "Y",
                    l = "chart" + k,
                    A = a ? "width" : "height",
                    t = b["plot" + (a ? "Left" : "Top")],
                    E,
                    H,
                    g = d || 1,
                    y = b.inverted,
                    n = b.bounds[a ? "h" : "v"],
                    c = 1 === e.length,
                    h = e[0][l],
                    G = r[0][l],
                    v = !c && e[1][l],
                    q = !c && r[1][l],
                    u;
                r = function () {
                    !c &&
                        20 < Math.abs(h - v) &&
                        (g = d || Math.abs(G - q) / Math.abs(h - v));
                    H = (t - G) / g + h;
                    E = b["plot" + (a ? "Width" : "Height")] / g;
                };
                r();
                e = H;
                e < n.min
                    ? ((e = n.min), (u = !0))
                    : e + E > n.max && ((e = n.max - E), (u = !0));
                u
                    ? ((G -= 0.8 * (G - w[p][0])),
                      c || (q -= 0.8 * (q - w[p][1])),
                      r())
                    : (w[p] = [G, q]);
                y || ((m[p] = H - t), (m[A] = E));
                m = y ? 1 / g : g;
                f[A] = E;
                f[p] = e;
                x[y ? (a ? "scaleY" : "scaleX") : "scale" + k] = g;
                x["translate" + k] = m * t + (G - m * h);
            },
            pinch: function (a) {
                var k = this,
                    r = k.chart,
                    x = k.pinchDown,
                    f = a.touches,
                    m = f.length,
                    w = k.lastValidTouch,
                    d = k.hasZoom,
                    b = k.selectionMarker,
                    p = {},
                    z =
                        1 === m &&
                        ((k.inClass(a.target, "highcharts-tracker") &&
                            r.runTrackerClick) ||
                            k.runChartClick),
                    l = {};
                1 < m && (k.initiated = !0);
                d && k.initiated && !z && a.preventDefault();
                C(f, function (a) {
                    return k.normalize(a);
                });
                "touchstart" === a.type
                    ? (B(f, function (a, b) {
                          x[b] = { chartX: a.chartX, chartY: a.chartY };
                      }),
                      (w.x = [x[0].chartX, x[1] && x[1].chartX]),
                      (w.y = [x[0].chartY, x[1] && x[1].chartY]),
                      B(r.axes, function (a) {
                          if (a.zoomEnabled) {
                              var b = r.bounds[a.horiz ? "h" : "v"],
                                  d = a.minPixelPadding,
                                  l = a.toPixels(e(a.options.min, a.dataMin)),
                                  g = a.toPixels(e(a.options.max, a.dataMax)),
                                  f = Math.max(l, g);
                              b.min = Math.min(a.pos, Math.min(l, g) - d);
                              b.max = Math.max(a.pos + a.len, f + d);
                          }
                      }),
                      (k.res = !0))
                    : k.followTouchMove && 1 === m
                    ? this.runPointActions(k.normalize(a))
                    : x.length &&
                      (b ||
                          (k.selectionMarker = b =
                              F({ destroy: u, touch: !0 }, r.plotBox)),
                      k.pinchTranslate(x, f, p, b, l, w),
                      (k.hasPinched = d),
                      k.scaleGroups(p, l),
                      k.res && ((k.res = !1), this.reset(!1, 0)));
            },
            touch: function (k, t) {
                var r = this.chart,
                    x,
                    f;
                if (r.index !== a.hoverChartIndex)
                    this.onContainerMouseLeave({ relatedTarget: !0 });
                a.hoverChartIndex = r.index;
                1 === k.touches.length
                    ? ((k = this.normalize(k)),
                      (f = r.isInsidePlot(
                          k.chartX - r.plotLeft,
                          k.chartY - r.plotTop
                      )) && !r.openMenu
                          ? (t && this.runPointActions(k),
                            "touchmove" === k.type &&
                                ((t = this.pinchDown),
                                (x = t[0]
                                    ? 4 <=
                                      Math.sqrt(
                                          Math.pow(t[0].chartX - k.chartX, 2) +
                                              Math.pow(
                                                  t[0].chartY - k.chartY,
                                                  2
                                              )
                                      )
                                    : !1)),
                            e(x, !0) && this.pinch(k))
                          : t && this.reset())
                    : 2 === k.touches.length && this.pinch(k);
            },
            onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0);
            },
            onContainerTouchMove: function (a) {
                this.touch(a);
            },
            onDocumentTouchEnd: function (e) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(e);
            },
        });
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.charts,
            F = a.css,
            C = a.doc,
            u = a.extend,
            e = a.noop,
            k = a.Pointer,
            t = a.removeEvent,
            r = a.win,
            x = a.wrap;
        if (!a.hasTouch && (r.PointerEvent || r.MSPointerEvent)) {
            var f = {},
                m = !!r.PointerEvent,
                w = function () {
                    var b = [];
                    b.item = function (a) {
                        return this[a];
                    };
                    a.objectEach(f, function (a) {
                        b.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target,
                        });
                    });
                    return b;
                },
                d = function (b, d, f, l) {
                    ("touch" !== b.pointerType &&
                        b.pointerType !== b.MSPOINTER_TYPE_TOUCH) ||
                        !B[a.hoverChartIndex] ||
                        (l(b),
                        (l = B[a.hoverChartIndex].pointer),
                        l[d]({
                            type: f,
                            target: b.currentTarget,
                            preventDefault: e,
                            touches: w(),
                        }));
                };
            u(k.prototype, {
                onContainerPointerDown: function (a) {
                    d(a, "onContainerTouchStart", "touchstart", function (a) {
                        f[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget,
                        };
                    });
                },
                onContainerPointerMove: function (a) {
                    d(a, "onContainerTouchMove", "touchmove", function (a) {
                        f[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
                        f[a.pointerId].target ||
                            (f[a.pointerId].target = a.currentTarget);
                    });
                },
                onDocumentPointerUp: function (a) {
                    d(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete f[a.pointerId];
                    });
                },
                batchMSEvents: function (a) {
                    a(
                        this.chart.container,
                        m ? "pointerdown" : "MSPointerDown",
                        this.onContainerPointerDown
                    );
                    a(
                        this.chart.container,
                        m ? "pointermove" : "MSPointerMove",
                        this.onContainerPointerMove
                    );
                    a(
                        C,
                        m ? "pointerup" : "MSPointerUp",
                        this.onDocumentPointerUp
                    );
                },
            });
            x(k.prototype, "init", function (a, d, f) {
                a.call(this, d, f);
                this.hasZoom &&
                    F(d.container, {
                        "-ms-touch-action": "none",
                        "touch-action": "none",
                    });
            });
            x(k.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(D);
            });
            x(k.prototype, "destroy", function (a) {
                this.batchMSEvents(t);
                a.call(this);
            });
        }
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.css,
            F = a.discardElement,
            C = a.defined,
            u = a.each,
            e = a.isFirefox,
            k = a.marginNames,
            t = a.merge,
            r = a.pick,
            x = a.setAnimation,
            f = a.stableSort,
            m = a.win,
            w = a.wrap;
        a.Legend = function (a, b) {
            this.init(a, b);
        };
        a.Legend.prototype = {
            init: function (a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled &&
                    (this.render(),
                    D(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes();
                    }));
            },
            setOptions: function (a) {
                var b = r(a.padding, 8);
                this.options = a;
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = r(a.symbolWidth, 16);
                this.pages = [];
            },
            update: function (a, b) {
                var d = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                r(b, !0) && d.redraw();
            },
            colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"](
                    "highcharts-legend-item-hidden"
                );
            },
            positionItem: function (a) {
                var b = this.options,
                    d = b.symbolPadding,
                    b = !b.rtl,
                    f = a._legendItemPos,
                    l = f[0],
                    f = f[1],
                    e = a.checkbox;
                (a = a.legendGroup) &&
                    a.element &&
                    a.translate(b ? l : this.legendWidth - l - 2 * d - 4, f);
                e && ((e.x = l), (e.y = f));
            },
            destroyItem: function (a) {
                var b = a.checkbox;
                u(
                    ["legendItem", "legendLine", "legendSymbol", "legendGroup"],
                    function (b) {
                        a[b] && (a[b] = a[b].destroy());
                    }
                );
                b && F(a.checkbox);
            },
            destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy());
                }
                u(this.getAllItems(), function (b) {
                    u(["legendItem", "legendGroup"], a, b);
                });
                u(
                    "clipRect up down pager nav box title group".split(" "),
                    a,
                    this
                );
                this.display = null;
            },
            positionCheckboxes: function (a) {
                var b = this.group && this.group.alignAttr,
                    d,
                    f = this.clipHeight || this.legendHeight,
                    l = this.titleHeight;
                b &&
                    ((d = b.translateY),
                    u(this.allItems, function (p) {
                        var e = p.checkbox,
                            m;
                        e &&
                            ((m = d + l + e.y + (a || 0) + 3),
                            B(e, {
                                left:
                                    b.translateX +
                                    p.checkboxOffset +
                                    e.x -
                                    20 +
                                    "px",
                                top: m + "px",
                                display:
                                    m > d - 6 && m < d + f - 6 ? "" : "none",
                            }));
                    }));
            },
            renderTitle: function () {
                var a = this.options,
                    b = this.padding,
                    f = a.title,
                    e = 0;
                f.text &&
                    (this.title ||
                        (this.title = this.chart.renderer
                            .label(
                                f.text,
                                b - 3,
                                b - 4,
                                null,
                                null,
                                null,
                                a.useHTML,
                                null,
                                "legend-title"
                            )
                            .attr({ zIndex: 1 })
                            .add(this.group)),
                    (a = this.title.getBBox()),
                    (e = a.height),
                    (this.offsetWidth = a.width),
                    this.contentGroup.attr({ translateY: e }));
                this.titleHeight = e;
            },
            setText: function (d) {
                var b = this.options;
                d.legendItem.attr({
                    text: b.labelFormat
                        ? a.format(b.labelFormat, d)
                        : b.labelFormatter.call(d),
                });
            },
            renderItem: function (a) {
                var b = this.chart,
                    d = b.renderer,
                    f = this.options,
                    l = "horizontal" === f.layout,
                    e = this.symbolWidth,
                    m = f.symbolPadding,
                    k = this.padding,
                    w = l ? r(f.itemDistance, 20) : 0,
                    g = !f.rtl,
                    y = f.width,
                    n = f.itemMarginBottom || 0,
                    c = this.itemMarginTop,
                    h = a.legendItem,
                    G = !a.series,
                    v = !G && a.series.drawLegendSymbol ? a.series : a,
                    q = v.options,
                    t = this.createCheckboxForItem && q && q.showCheckbox,
                    q = e + m + w + (t ? 20 : 0),
                    x = f.useHTML,
                    K = a.options.className;
                h ||
                    ((a.legendGroup = d
                        .g("legend-item")
                        .addClass(
                            "highcharts-" +
                                v.type +
                                "-series highcharts-color-" +
                                a.colorIndex +
                                (K ? " " + K : "") +
                                (G ? " highcharts-series-" + a.index : "")
                        )
                        .attr({ zIndex: 1 })
                        .add(this.scrollGroup)),
                    (a.legendItem = h =
                        d
                            .text("", g ? e + m : -m, this.baseline || 0, x)
                            .attr({ align: g ? "left" : "right", zIndex: 2 })
                            .add(a.legendGroup)),
                    this.baseline ||
                        ((this.fontMetrics = d.fontMetrics(12, h)),
                        (this.baseline = this.fontMetrics.f + 3 + c),
                        h.attr("y", this.baseline)),
                    (this.symbolHeight = f.symbolHeight || this.fontMetrics.f),
                    v.drawLegendSymbol(this, a),
                    this.setItemEvents && this.setItemEvents(a, h, x),
                    t && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                h.css({
                    width: (f.itemWidth || f.width || b.spacingBox.width) - q,
                });
                this.setText(a);
                d = h.getBBox();
                e = a.checkboxOffset =
                    f.itemWidth || a.legendItemWidth || d.width + q;
                this.itemHeight = d = Math.round(
                    a.legendItemHeight || d.height || this.symbolHeight
                );
                l &&
                    this.itemX - k + e >
                        (y || b.spacingBox.width - 2 * k - f.x) &&
                    ((this.itemX = k),
                    (this.itemY += c + this.lastLineHeight + n),
                    (this.lastLineHeight = 0));
                this.maxItemWidth = Math.max(this.maxItemWidth, e);
                this.lastItemY = c + this.itemY + n;
                this.lastLineHeight = Math.max(d, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                l
                    ? (this.itemX += e)
                    : ((this.itemY += c + d + n), (this.lastLineHeight = d));
                this.offsetWidth =
                    y ||
                    Math.max(
                        (l ? this.itemX - k - (a.checkbox ? 0 : w) : e) + k,
                        this.offsetWidth
                    );
            },
            getAllItems: function () {
                var a = [];
                u(this.chart.series, function (b) {
                    var d = b && b.options;
                    b &&
                        r(d.showInLegend, C(d.linkedTo) ? !1 : void 0, !0) &&
                        (a = a.concat(
                            b.legendItems ||
                                ("point" === d.legendType ? b.data : b)
                        ));
                });
                return a;
            },
            adjustMargins: function (a, b) {
                var d = this.chart,
                    f = this.options,
                    l =
                        f.align.charAt(0) +
                        f.verticalAlign.charAt(0) +
                        f.layout.charAt(0);
                f.floating ||
                    u(
                        [
                            /(lth|ct|rth)/,
                            /(rtv|rm|rbv)/,
                            /(rbh|cb|lbh)/,
                            /(lbv|lm|ltv)/,
                        ],
                        function (p, e) {
                            p.test(l) &&
                                !C(a[e]) &&
                                (d[k[e]] = Math.max(
                                    d[k[e]],
                                    d.legend[
                                        (e + 1) % 2
                                            ? "legendHeight"
                                            : "legendWidth"
                                    ] +
                                        [1, -1, -1, 1][e] *
                                            f[e % 2 ? "x" : "y"] +
                                        r(f.margin, 12) +
                                        b[e]
                                ));
                        }
                    );
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    p = b.renderer,
                    e = a.group,
                    l,
                    m,
                    k,
                    w,
                    r = a.box,
                    g = a.options,
                    y = a.padding;
                a.itemX = y;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                e ||
                    ((a.group = e = p.g("legend").attr({ zIndex: 7 }).add()),
                    (a.contentGroup = p.g().attr({ zIndex: 1 }).add(e)),
                    (a.scrollGroup = p.g().add(a.contentGroup)));
                a.renderTitle();
                l = a.getAllItems();
                f(l, function (a, c) {
                    return (
                        ((a.options && a.options.legendIndex) || 0) -
                        ((c.options && c.options.legendIndex) || 0)
                    );
                });
                g.reversed && l.reverse();
                a.allItems = l;
                a.display = m = !!l.length;
                a.lastLineHeight = 0;
                u(l, function (b) {
                    a.renderItem(b);
                });
                k = (g.width || a.offsetWidth) + y;
                w = a.lastItemY + a.lastLineHeight + a.titleHeight;
                w = a.handleOverflow(w);
                w += y;
                r ||
                    ((a.box = r =
                        p
                            .rect()
                            .addClass("highcharts-legend-box")
                            .attr({ r: g.borderRadius })
                            .add(e)),
                    (r.isNew = !0));
                0 < k &&
                    0 < w &&
                    (r[r.isNew ? "attr" : "animate"](
                        r.crisp(
                            { x: 0, y: 0, width: k, height: w },
                            r.strokeWidth()
                        )
                    ),
                    (r.isNew = !1));
                r[m ? "show" : "hide"]();
                "none" === e.getStyle("display") && (k = w = 0);
                a.legendWidth = k;
                a.legendHeight = w;
                u(l, function (b) {
                    a.positionItem(b);
                });
                m && e.align(t(g, { width: k, height: w }), !0, "spacingBox");
                b.isResizing || this.positionCheckboxes();
            },
            handleOverflow: function (a) {
                var b = this,
                    d = this.chart,
                    f = d.renderer,
                    l = this.options,
                    e = l.y,
                    m = this.padding,
                    d =
                        d.spacingBox.height +
                        ("top" === l.verticalAlign ? -e : e) -
                        m,
                    e = l.maxHeight,
                    k,
                    w = this.clipRect,
                    g = l.navigation,
                    y = r(g.animation, !0),
                    n = g.arrowSize || 12,
                    c = this.nav,
                    h = this.pages,
                    G,
                    v = this.allItems,
                    q = function (a) {
                        "number" === typeof a
                            ? w.attr({ height: a })
                            : w &&
                              ((b.clipRect = w.destroy()),
                              b.contentGroup.clip());
                        b.contentGroup.div &&
                            (b.contentGroup.div.style.clip = a
                                ? "rect(" + m + "px,9999px," + (m + a) + "px,0)"
                                : "auto");
                    };
                "horizontal" !== l.layout ||
                    "middle" === l.verticalAlign ||
                    l.floating ||
                    (d /= 2);
                e && (d = Math.min(d, e));
                h.length = 0;
                a > d && !1 !== g.enabled
                    ? ((this.clipHeight = k =
                          Math.max(d - 20 - this.titleHeight - m, 0)),
                      (this.currentPage = r(this.currentPage, 1)),
                      (this.fullHeight = a),
                      u(v, function (a, c) {
                          var b = a._legendItemPos[1];
                          a = Math.round(a.legendItem.getBBox().height);
                          var n = h.length;
                          if (!n || (b - h[n - 1] > k && (G || b) !== h[n - 1]))
                              h.push(G || b), n++;
                          c === v.length - 1 &&
                              b + a - h[n - 1] > k &&
                              h.push(b);
                          b !== G && (G = b);
                      }),
                      w ||
                          ((w = b.clipRect = f.clipRect(0, m, 9999, 0)),
                          b.contentGroup.clip(w)),
                      q(k),
                      c ||
                          ((this.nav = c =
                              f.g().attr({ zIndex: 1 }).add(this.group)),
                          (this.up = f
                              .symbol("triangle", 0, 0, n, n)
                              .on("click", function () {
                                  b.scroll(-1, y);
                              })
                              .add(c)),
                          (this.pager = f
                              .text("", 15, 10)
                              .addClass("highcharts-legend-navigation")
                              .add(c)),
                          (this.down = f
                              .symbol("triangle-down", 0, 0, n, n)
                              .on("click", function () {
                                  b.scroll(1, y);
                              })
                              .add(c))),
                      b.scroll(0),
                      (a = d))
                    : c &&
                      (q(),
                      (this.nav = c.destroy()),
                      this.scrollGroup.attr({ translateY: 1 }),
                      (this.clipHeight = 0));
                return a;
            },
            scroll: function (a, b) {
                var d = this.pages,
                    f = d.length;
                a = this.currentPage + a;
                var l = this.clipHeight,
                    e = this.pager,
                    m = this.padding;
                a > f && (a = f);
                0 < a &&
                    (void 0 !== b && x(b, this.chart),
                    this.nav.attr({
                        translateX: m,
                        translateY: l + this.padding + 7 + this.titleHeight,
                        visibility: "visible",
                    }),
                    this.up.attr({
                        class:
                            1 === a
                                ? "highcharts-legend-nav-inactive"
                                : "highcharts-legend-nav-active",
                    }),
                    e.attr({ text: a + "/" + f }),
                    this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        class:
                            a === f
                                ? "highcharts-legend-nav-inactive"
                                : "highcharts-legend-nav-active",
                    }),
                    (b = -d[a - 1] + this.initialItemY),
                    this.scrollGroup.animate({ translateY: b }),
                    (this.currentPage = a),
                    this.positionCheckboxes(b));
            },
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, b) {
                var d = a.symbolHeight,
                    f = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer
                    .rect(
                        f ? (a.symbolWidth - d) / 2 : 0,
                        a.baseline - d + 1,
                        f ? d : a.symbolWidth,
                        d,
                        r(a.options.symbolRadius, d / 2)
                    )
                    .addClass("highcharts-point")
                    .attr({ zIndex: 3 })
                    .add(b.legendGroup);
            },
            drawLineMarker: function (a) {
                var b = this.options.marker,
                    d,
                    f = a.symbolWidth,
                    l = a.symbolHeight;
                d = l / 2;
                var e = this.chart.renderer,
                    m = this.legendGroup;
                a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
                this.legendLine = e
                    .path(["M", 0, a, "L", f, a])
                    .addClass("highcharts-graph")
                    .attr({})
                    .add(m);
                b &&
                    !1 !== b.enabled &&
                    ((d = Math.min(r(b.radius, d), d)),
                    0 === this.symbol.indexOf("url") &&
                        ((b = t(b, { width: l, height: l })), (d = 0)),
                    (this.legendSymbol = b =
                        e
                            .symbol(
                                this.symbol,
                                f / 2 - d,
                                a - d,
                                2 * d,
                                2 * d,
                                b
                            )
                            .addClass("highcharts-point")
                            .add(m)),
                    (b.isMarker = !0));
            },
        };
        (/Trident\/7\.0/.test(m.navigator.userAgent) || e) &&
            w(a.Legend.prototype, "positionItem", function (a, b) {
                var d = this,
                    f = function () {
                        b._legendItemPos && a.call(d, b);
                    };
                f();
                setTimeout(f);
            });
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.animObject,
            F = a.attr,
            C = a.doc,
            u = a.Axis,
            e = a.createElement,
            k = a.defaultOptions,
            t = a.discardElement,
            r = a.charts,
            x = a.defined,
            f = a.each,
            m = a.extend,
            w = a.find,
            d = a.fireEvent,
            b = a.grep,
            p = a.isNumber,
            z = a.isObject,
            l = a.isString,
            A = a.Legend,
            I = a.marginNames,
            E = a.merge,
            H = a.objectEach,
            g = a.Pointer,
            y = a.pick,
            n = a.pInt,
            c = a.removeEvent,
            h = a.seriesTypes,
            G = a.splat,
            v = a.svg,
            q = a.syncTimeout,
            O = a.win,
            L = (a.Chart = function () {
                this.getArgs.apply(this, arguments);
            });
        a.chart = function (a, c, h) {
            return new L(a, c, h);
        };
        m(L.prototype, {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (l(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1]);
            },
            init: function (c, h) {
                var b,
                    n,
                    g = c.series,
                    d = c.plotOptions || {};
                c.series = null;
                b = E(k, c);
                for (n in b.plotOptions)
                    b.plotOptions[n].tooltip =
                        (d[n] && E(d[n].tooltip)) || void 0;
                b.tooltip.userOptions =
                    (c.chart && c.chart.forExport && c.tooltip.userOptions) ||
                    c.tooltip;
                b.series = c.series = g;
                this.userOptions = c;
                c = b.chart;
                n = c.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = { h: {}, v: {} };
                this.labelCollectors = [];
                this.callback = h;
                this.isResizing = 0;
                this.options = b;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = c.showAxes;
                var q = this;
                q.index = r.length;
                r.push(q);
                a.chartCount++;
                n &&
                    H(n, function (a, c) {
                        D(q, c, a);
                    });
                q.xAxis = [];
                q.yAxis = [];
                q.pointCount = q.colorCounter = q.symbolCounter = 0;
                q.firstRender();
            },
            initSeries: function (c) {
                var b = this.options.chart;
                (b = h[c.type || b.type || b.defaultSeriesType]) ||
                    a.error(17, !0);
                b = new b();
                b.init(this, c);
                return b;
            },
            orderSeries: function (a) {
                var c = this.series;
                for (a = a || 0; a < c.length; a++)
                    c[a] &&
                        ((c[a].index = a),
                        (c[a].name =
                            c[a].name || "Series " + (c[a].index + 1)));
            },
            isInsidePlot: function (a, c, h) {
                var b = h ? c : a;
                a = h ? a : c;
                return (
                    0 <= b &&
                    b <= this.plotWidth &&
                    0 <= a &&
                    a <= this.plotHeight
                );
            },
            redraw: function (c) {
                var h = this.axes,
                    b = this.series,
                    n = this.pointer,
                    g = this.legend,
                    q = this.isDirtyLegend,
                    l,
                    v,
                    e = this.hasCartesianSeries,
                    p = this.isDirtyBox,
                    y,
                    k = this.renderer,
                    G = k.isHidden(),
                    w = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(c, this);
                G && this.temporaryDisplay();
                this.layOutTitles();
                for (c = b.length; c--; )
                    if (
                        ((y = b[c]),
                        y.options.stacking && ((l = !0), y.isDirty))
                    ) {
                        v = !0;
                        break;
                    }
                if (v)
                    for (c = b.length; c--; )
                        (y = b[c]), y.options.stacking && (y.isDirty = !0);
                f(b, function (a) {
                    a.isDirty &&
                        "point" === a.options.legendType &&
                        (a.updateTotals && a.updateTotals(), (q = !0));
                    a.isDirtyData && d(a, "updatedData");
                });
                q &&
                    g.options.enabled &&
                    (g.render(), (this.isDirtyLegend = !1));
                l && this.getStacks();
                e &&
                    f(h, function (a) {
                        a.updateNames();
                        a.setScale();
                    });
                this.getMargins();
                e &&
                    (f(h, function (a) {
                        a.isDirty && (p = !0);
                    }),
                    f(h, function (a) {
                        var c = a.min + "," + a.max;
                        a.extKey !== c &&
                            ((a.extKey = c),
                            w.push(function () {
                                d(
                                    a,
                                    "afterSetExtremes",
                                    m(a.eventArgs, a.getExtremes())
                                );
                                delete a.eventArgs;
                            }));
                        (p || l) && a.redraw();
                    }));
                p && this.drawChartBox();
                d(this, "predraw");
                f(b, function (a) {
                    (p || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1;
                });
                n && n.reset(!0);
                k.draw();
                d(this, "redraw");
                d(this, "render");
                G && this.temporaryDisplay(!0);
                f(w, function (a) {
                    a.call();
                });
            },
            get: function (a) {
                function c(c) {
                    return c.id === a || (c.options && c.options.id === a);
                }
                var h,
                    b = this.series,
                    n;
                h = w(this.axes, c) || w(this.series, c);
                for (n = 0; !h && n < b.length; n++)
                    h = w(b[n].points || [], c);
                return h;
            },
            getAxes: function () {
                var a = this,
                    c = this.options,
                    h = (c.xAxis = G(c.xAxis || {})),
                    c = (c.yAxis = G(c.yAxis || {}));
                f(h, function (a, c) {
                    a.index = c;
                    a.isX = !0;
                });
                f(c, function (a, c) {
                    a.index = c;
                });
                h = h.concat(c);
                f(h, function (c) {
                    new u(a, c);
                });
            },
            getSelectedPoints: function () {
                var a = [];
                f(this.series, function (c) {
                    a = a.concat(
                        b(c.data || [], function (a) {
                            return a.selected;
                        })
                    );
                });
                return a;
            },
            getSelectedSeries: function () {
                return b(this.series, function (a) {
                    return a.selected;
                });
            },
            setTitle: function (a, c, h) {
                var b = this,
                    n = b.options,
                    g;
                g = n.title = E(n.title, a);
                n = n.subtitle = E(n.subtitle, c);
                f(
                    [
                        ["title", a, g],
                        ["subtitle", c, n],
                    ],
                    function (a, c) {
                        var h = a[0],
                            n = b[h],
                            g = a[1];
                        a = a[2];
                        n && g && (b[h] = n = n.destroy());
                        a &&
                            a.text &&
                            !n &&
                            ((b[h] = b.renderer
                                .text(a.text, 0, 0, a.useHTML)
                                .attr({
                                    align: a.align,
                                    class: "highcharts-" + h,
                                    zIndex: a.zIndex || 4,
                                })
                                .add()),
                            (b[h].update = function (a) {
                                b.setTitle(!c && a, c && a);
                            }));
                    }
                );
                b.layOutTitles(h);
            },
            layOutTitles: function (a) {
                var c = 0,
                    h,
                    b = this.renderer,
                    n = this.spacingBox;
                f(
                    ["title", "subtitle"],
                    function (a) {
                        var h = this[a],
                            g = this.options[a];
                        a = "title" === a ? -3 : g.verticalAlign ? 0 : c + 2;
                        var d;
                        h &&
                            ((d = b.fontMetrics(d, h).b),
                            h
                                .css({
                                    width:
                                        (g.width || n.width + g.widthAdjust) +
                                        "px",
                                })
                                .align(m({ y: a + d }, g), !1, "spacingBox"),
                            g.floating ||
                                g.verticalAlign ||
                                (c = Math.ceil(
                                    c + h.getBBox(g.useHTML).height
                                )));
                    },
                    this
                );
                h = this.titleOffset !== c;
                this.titleOffset = c;
                !this.isDirtyBox &&
                    h &&
                    ((this.isDirtyBox = h),
                    this.hasRendered &&
                        y(a, !0) &&
                        this.isDirtyBox &&
                        this.redraw());
            },
            getChartSize: function () {
                var c = this.options.chart,
                    h = c.width,
                    c = c.height,
                    b = this.renderTo;
                x(h) || (this.containerWidth = a.getStyle(b, "width"));
                x(c) || (this.containerHeight = a.getStyle(b, "height"));
                this.chartWidth = Math.max(0, h || this.containerWidth || 600);
                this.chartHeight = Math.max(
                    0,
                    a.relativeLength(c, this.chartWidth) ||
                        (1 < this.containerHeight ? this.containerHeight : 400)
                );
            },
            temporaryDisplay: function (c) {
                var h = this.renderTo;
                if (c)
                    for (; h && h.style; )
                        h.hcOrigStyle &&
                            (a.css(h, h.hcOrigStyle), delete h.hcOrigStyle),
                            h.hcOrigDetached &&
                                (C.body.removeChild(h),
                                (h.hcOrigDetached = !1)),
                            (h = h.parentNode);
                else
                    for (; h && h.style; ) {
                        C.body.contains(h) ||
                            h.parentNode ||
                            ((h.hcOrigDetached = !0), C.body.appendChild(h));
                        if (
                            "none" === a.getStyle(h, "display", !1) ||
                            h.hcOricDetached
                        )
                            (h.hcOrigStyle = {
                                display: h.style.display,
                                height: h.style.height,
                                overflow: h.style.overflow,
                            }),
                                (c = { display: "block", overflow: "hidden" }),
                                h !== this.renderTo && (c.height = 0),
                                a.css(h, c),
                                h.offsetWidth ||
                                    h.style.setProperty(
                                        "display",
                                        "block",
                                        "important"
                                    );
                        h = h.parentNode;
                        if (h === C.body) break;
                    }
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "");
            },
            getContainer: function () {
                var c,
                    h = this.options,
                    b = h.chart,
                    g,
                    d;
                c = this.renderTo;
                var q = a.uniqueKey(),
                    f;
                c || (this.renderTo = c = b.renderTo);
                l(c) && (this.renderTo = c = C.getElementById(c));
                c || a.error(13, !0);
                g = n(F(c, "data-highcharts-chart"));
                p(g) && r[g] && r[g].hasRendered && r[g].destroy();
                F(c, "data-highcharts-chart", this.index);
                c.innerHTML = "";
                b.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                g = this.chartWidth;
                d = this.chartHeight;
                this.container = c = e("div", { id: q }, void 0, c);
                this._cursor = c.style.cursor;
                this.renderer = new (a[b.renderer] || a.Renderer)(
                    c,
                    g,
                    d,
                    null,
                    b.forExport,
                    h.exporting && h.exporting.allowHTML
                );
                this.setClassName(b.className);
                for (f in h.defs) this.renderer.definition(h.defs[f]);
                this.renderer.chartIndex = this.index;
            },
            getMargins: function (a) {
                var c = this.spacing,
                    h = this.margin,
                    b = this.titleOffset;
                this.resetMargins();
                b &&
                    !x(h[0]) &&
                    (this.plotTop = Math.max(
                        this.plotTop,
                        b + this.options.title.margin + c[0]
                    ));
                this.legend &&
                    this.legend.display &&
                    this.legend.adjustMargins(h, c);
                this.extraMargin &&
                    (this[this.extraMargin.type] =
                        (this[this.extraMargin.type] || 0) +
                        this.extraMargin.value);
                this.adjustPlotArea && this.adjustPlotArea();
                a || this.getAxisMargins();
            },
            getAxisMargins: function () {
                var a = this,
                    c = (a.axisOffset = [0, 0, 0, 0]),
                    h = a.margin;
                a.hasCartesianSeries &&
                    f(a.axes, function (a) {
                        a.visible && a.getOffset();
                    });
                f(I, function (b, n) {
                    x(h[n]) || (a[b] += c[n]);
                });
                a.setChartSize();
            },
            reflow: function (c) {
                var h = this,
                    b = h.options.chart,
                    n = h.renderTo,
                    g = x(b.width) && x(b.height),
                    d = b.width || a.getStyle(n, "width"),
                    b = b.height || a.getStyle(n, "height"),
                    n = c ? c.target : O;
                if (!g && !h.isPrinting && d && b && (n === O || n === C)) {
                    if (d !== h.containerWidth || b !== h.containerHeight)
                        clearTimeout(h.reflowTimeout),
                            (h.reflowTimeout = q(
                                function () {
                                    h.container &&
                                        h.setSize(void 0, void 0, !1);
                                },
                                c ? 100 : 0
                            ));
                    h.containerWidth = d;
                    h.containerHeight = b;
                }
            },
            initReflow: function () {
                var a = this,
                    c;
                c = D(O, "resize", function (c) {
                    a.reflow(c);
                });
                D(a, "destroy", c);
            },
            setSize: function (c, h, b) {
                var n = this,
                    g = n.renderer;
                n.isResizing += 1;
                a.setAnimation(b, n);
                n.oldChartHeight = n.chartHeight;
                n.oldChartWidth = n.chartWidth;
                void 0 !== c && (n.options.chart.width = c);
                void 0 !== h && (n.options.chart.height = h);
                n.getChartSize();
                n.setChartSize(!0);
                g.setSize(n.chartWidth, n.chartHeight, b);
                f(n.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale();
                });
                n.isDirtyLegend = !0;
                n.isDirtyBox = !0;
                n.layOutTitles();
                n.getMargins();
                n.redraw(b);
                n.oldChartHeight = null;
                d(n, "resize");
                q(function () {
                    n &&
                        d(n, "endResize", null, function () {
                            --n.isResizing;
                        });
                }, B(void 0).duration);
            },
            setChartSize: function (a) {
                var c = this.inverted,
                    h = this.renderer,
                    b = this.chartWidth,
                    n = this.chartHeight,
                    g = this.options.chart,
                    d = this.spacing,
                    q = this.clipOffset,
                    l,
                    v,
                    e,
                    p;
                this.plotLeft = l = Math.round(this.plotLeft);
                this.plotTop = v = Math.round(this.plotTop);
                this.plotWidth = e = Math.max(
                    0,
                    Math.round(b - l - this.marginRight)
                );
                this.plotHeight = p = Math.max(
                    0,
                    Math.round(n - v - this.marginBottom)
                );
                this.plotSizeX = c ? p : e;
                this.plotSizeY = c ? e : p;
                this.plotBorderWidth = g.plotBorderWidth || 0;
                this.spacingBox = h.spacingBox = {
                    x: d[3],
                    y: d[0],
                    width: b - d[3] - d[1],
                    height: n - d[0] - d[2],
                };
                this.plotBox = h.plotBox = { x: l, y: v, width: e, height: p };
                b = 2 * Math.floor(this.plotBorderWidth / 2);
                c = Math.ceil(Math.max(b, q[3]) / 2);
                h = Math.ceil(Math.max(b, q[0]) / 2);
                this.clipBox = {
                    x: c,
                    y: h,
                    width: Math.floor(
                        this.plotSizeX - Math.max(b, q[1]) / 2 - c
                    ),
                    height: Math.max(
                        0,
                        Math.floor(this.plotSizeY - Math.max(b, q[2]) / 2 - h)
                    ),
                };
                a ||
                    f(this.axes, function (a) {
                        a.setAxisSize();
                        a.setAxisTranslation();
                    });
            },
            resetMargins: function () {
                var a = this,
                    c = a.options.chart;
                f(["margin", "spacing"], function (h) {
                    var b = c[h],
                        n = z(b) ? b : [b, b, b, b];
                    f(["Top", "Right", "Bottom", "Left"], function (b, g) {
                        a[h][g] = y(c[h + b], n[g]);
                    });
                });
                f(I, function (c, h) {
                    a[c] = y(a.margin[h], a.spacing[h]);
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0];
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    c = this.renderer,
                    h = this.chartWidth,
                    b = this.chartHeight,
                    n = this.chartBackground,
                    g = this.plotBackground,
                    d = this.plotBorder,
                    q,
                    f,
                    l = this.plotLeft,
                    v = this.plotTop,
                    e = this.plotWidth,
                    p = this.plotHeight,
                    m = this.plotBox,
                    y = this.clipRect,
                    k = this.clipBox,
                    G = "animate";
                n ||
                    ((this.chartBackground = n =
                        c.rect().addClass("highcharts-background").add()),
                    (G = "attr"));
                q = f = n.strokeWidth();
                n[G]({
                    x: f / 2,
                    y: f / 2,
                    width: h - f - (q % 2),
                    height: b - f - (q % 2),
                    r: a.borderRadius,
                });
                G = "animate";
                g ||
                    ((G = "attr"),
                    (this.plotBackground = g =
                        c.rect().addClass("highcharts-plot-background").add()));
                g[G](m);
                y
                    ? y.animate({ width: k.width, height: k.height })
                    : (this.clipRect = c.clipRect(k));
                G = "animate";
                d ||
                    ((G = "attr"),
                    (this.plotBorder = d =
                        c
                            .rect()
                            .addClass("highcharts-plot-border")
                            .attr({ zIndex: 1 })
                            .add()));
                d[G](
                    d.crisp(
                        { x: l, y: v, width: e, height: p },
                        -d.strokeWidth()
                    )
                );
                this.isDirtyBox = !1;
            },
            propFromSeries: function () {
                var a = this,
                    c = a.options.chart,
                    b,
                    n = a.options.series,
                    g,
                    d;
                f(["inverted", "angular", "polar"], function (q) {
                    b = h[c.type || c.defaultSeriesType];
                    d = c[q] || (b && b.prototype[q]);
                    for (g = n && n.length; !d && g--; )
                        (b = h[n[g].type]) && b.prototype[q] && (d = !0);
                    a[q] = d;
                });
            },
            linkSeries: function () {
                var a = this,
                    c = a.series;
                f(c, function (a) {
                    a.linkedSeries.length = 0;
                });
                f(c, function (c) {
                    var h = c.options.linkedTo;
                    l(h) &&
                        (h =
                            ":previous" === h
                                ? a.series[c.index - 1]
                                : a.get(h)) &&
                        h.linkedParent !== c &&
                        (h.linkedSeries.push(c),
                        (c.linkedParent = h),
                        (c.visible = y(
                            c.options.visible,
                            h.options.visible,
                            c.visible
                        )));
                });
            },
            renderSeries: function () {
                f(this.series, function (a) {
                    a.translate();
                    a.render();
                });
            },
            renderLabels: function () {
                var a = this,
                    c = a.options.labels;
                c.items &&
                    f(c.items, function (h) {
                        var b = m(c.style, h.style),
                            g = n(b.left) + a.plotLeft,
                            d = n(b.top) + a.plotTop + 12;
                        delete b.left;
                        delete b.top;
                        a.renderer
                            .text(h.html, g, d)
                            .attr({ zIndex: 2 })
                            .css(b)
                            .add();
                    });
            },
            render: function () {
                var a = this.axes,
                    c = this.renderer,
                    h = this.options,
                    b,
                    n,
                    g;
                this.setTitle();
                this.legend = new A(this, h.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                h = this.plotWidth;
                b = this.plotHeight -= 21;
                f(a, function (a) {
                    a.setScale();
                });
                this.getAxisMargins();
                n = 1.1 < h / this.plotWidth;
                g = 1.05 < b / this.plotHeight;
                if (n || g)
                    f(a, function (a) {
                        ((a.horiz && n) || (!a.horiz && g)) &&
                            a.setTickInterval(!0);
                    }),
                        this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries &&
                    f(a, function (a) {
                        a.visible && a.render();
                    });
                this.seriesGroup ||
                    (this.seriesGroup = c
                        .g("series-group")
                        .attr({ zIndex: 3 })
                        .add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0;
            },
            addCredits: function (a) {
                var c = this;
                a = E(!0, this.options.credits, a);
                a.enabled &&
                    !this.credits &&
                    ((this.credits = this.renderer
                        .text(a.text + (this.mapCredits || ""), 0, 0)
                        .addClass("highcharts-credits")
                        .on("click", function () {
                            a.href && (O.location.href = a.href);
                        })
                        .attr({ align: a.position.align, zIndex: 8 })
                        .add()
                        .align(a.position)),
                    (this.credits.update = function (a) {
                        c.credits = c.credits.destroy();
                        c.addCredits(a);
                    }));
            },
            destroy: function () {
                var h = this,
                    b = h.axes,
                    n = h.series,
                    g = h.container,
                    q,
                    l = g && g.parentNode;
                d(h, "destroy");
                h.renderer.forExport ? a.erase(r, h) : (r[h.index] = void 0);
                a.chartCount--;
                h.renderTo.removeAttribute("data-highcharts-chart");
                c(h);
                for (q = b.length; q--; ) b[q] = b[q].destroy();
                this.scroller &&
                    this.scroller.destroy &&
                    this.scroller.destroy();
                for (q = n.length; q--; ) n[q] = n[q].destroy();
                f(
                    "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(
                        " "
                    ),
                    function (a) {
                        var c = h[a];
                        c && c.destroy && (h[a] = c.destroy());
                    }
                );
                g && ((g.innerHTML = ""), c(g), l && t(g));
                H(h, function (a, c) {
                    delete h[c];
                });
            },
            isReadyToRender: function () {
                var a = this;
                return v || O != O.top || "complete" === C.readyState
                    ? !0
                    : (C.attachEvent("onreadystatechange", function () {
                          C.detachEvent("onreadystatechange", a.firstRender);
                          "complete" === C.readyState && a.firstRender();
                      }),
                      !1);
            },
            firstRender: function () {
                var a = this,
                    c = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    d(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    f(c.series || [], function (c) {
                        a.initSeries(c);
                    });
                    a.linkSeries();
                    d(a, "beforeRender");
                    g && (a.pointer = new g(a, c));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0);
                }
            },
            onload: function () {
                f(
                    [this.callback].concat(this.callbacks),
                    function (a) {
                        a && void 0 !== this.index && a.apply(this, [this]);
                    },
                    this
                );
                d(this, "load");
                d(this, "render");
                x(this.index) &&
                    !1 !== this.options.chart.reflow &&
                    this.initReflow();
                this.onload = null;
            },
        });
    })(J);
    (function (a) {
        var D,
            B = a.each,
            F = a.extend,
            C = a.erase,
            u = a.fireEvent,
            e = a.format,
            k = a.isArray,
            t = a.isNumber,
            r = a.pick,
            x = a.removeEvent;
        a.Point = D = function () {};
        a.Point.prototype = {
            init: function (a, e, k) {
                var d = a.chart.options.chart.colorCount;
                this.series = a;
                this.applyOptions(e, k);
                a.options.colorByPoint
                    ? ((e = a.colorCounter),
                      a.colorCounter++,
                      a.colorCounter === d && (a.colorCounter = 0))
                    : (e = a.colorIndex);
                this.colorIndex = r(this.colorIndex, e);
                a.chart.pointCount++;
                return this;
            },
            applyOptions: function (a, e) {
                var f = this.series,
                    d = f.options.pointValKey || f.pointValKey;
                a = D.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                d && (this.y = this[d]);
                this.isNull = r(
                    this.isValid && !this.isValid(),
                    null === this.x || !t(this.y, !0)
                );
                this.selected && (this.state = "select");
                "name" in this &&
                    void 0 === e &&
                    f.xAxis &&
                    f.xAxis.hasNames &&
                    (this.x = f.xAxis.nameToX(this));
                void 0 === this.x &&
                    f &&
                    (this.x = void 0 === e ? f.autoIncrement(this) : e);
                return this;
            },
            optionsToObject: function (a) {
                var f = {},
                    e = this.series,
                    d = e.options.keys,
                    b = d || e.pointArrayMap || ["y"],
                    p = b.length,
                    r = 0,
                    l = 0;
                if (t(a) || null === a) f[b[0]] = a;
                else if (k(a))
                    for (
                        !d &&
                        a.length > p &&
                        ((e = typeof a[0]),
                        "string" === e
                            ? (f.name = a[0])
                            : "number" === e && (f.x = a[0]),
                        r++);
                        l < p;

                    )
                        (d && void 0 === a[r]) || (f[b[l]] = a[r]), r++, l++;
                else
                    "object" === typeof a &&
                        ((f = a),
                        a.dataLabels && (e._hasPointLabels = !0),
                        a.marker && (e._hasPointMarkers = !0));
                return f;
            },
            getClassName: function () {
                return (
                    "highcharts-point" +
                    (this.selected ? " highcharts-point-select" : "") +
                    (this.negative ? " highcharts-negative" : "") +
                    (this.isNull ? " highcharts-null-point" : "") +
                    (void 0 !== this.colorIndex
                        ? " highcharts-color-" + this.colorIndex
                        : "") +
                    (this.options.className
                        ? " " + this.options.className
                        : "") +
                    (this.zone && this.zone.className
                        ? " " +
                          this.zone.className.replace("highcharts-negative", "")
                        : "")
                );
            },
            getZone: function () {
                var a = this.series,
                    e = a.zones,
                    a = a.zoneAxis || "y",
                    k = 0,
                    d;
                for (d = e[k]; this[a] >= d.value; ) d = e[++k];
                d && d.color && !this.options.color && (this.color = d.color);
                return d;
            },
            destroy: function () {
                var a = this.series.chart,
                    e = a.hoverPoints,
                    k;
                a.pointCount--;
                e &&
                    (this.setState(),
                    C(e, this),
                    e.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel)
                    x(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (k in this) this[k] = null;
            },
            destroyElements: function () {
                for (
                    var a = [
                            "graphic",
                            "dataLabel",
                            "dataLabelUpper",
                            "connector",
                            "shadowGroup",
                        ],
                        e,
                        k = 6;
                    k--;

                )
                    (e = a[k]), this[e] && (this[e] = this[e].destroy());
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal,
                };
            },
            tooltipFormatter: function (a) {
                var f = this.series,
                    k = f.tooltipOptions,
                    d = r(k.valueDecimals, ""),
                    b = k.valuePrefix || "",
                    p = k.valueSuffix || "";
                B(f.pointArrayMap || ["y"], function (f) {
                    f = "{point." + f;
                    if (b || p) a = a.replace(f + "}", b + f + "}" + p);
                    a = a.replace(f + "}", f + ":,." + d + "f}");
                });
                return e(a, { point: this, series: this.series });
            },
            firePointEvent: function (a, e, k) {
                var d = this,
                    b = this.series.options;
                (b.point.events[a] ||
                    (d.options && d.options.events && d.options.events[a])) &&
                    this.importEvents();
                "click" === a &&
                    b.allowPointSelect &&
                    (k = function (a) {
                        d.select &&
                            d.select(
                                null,
                                a.ctrlKey || a.metaKey || a.shiftKey
                            );
                    });
                u(this, a, e, k);
            },
            visible: !0,
        };
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.animObject,
            F = a.arrayMax,
            C = a.arrayMin,
            u = a.correctFloat,
            e = a.Date,
            k = a.defaultOptions,
            t = a.defined,
            r = a.each,
            x = a.erase,
            f = a.extend,
            m = a.fireEvent,
            w = a.grep,
            d = a.isArray,
            b = a.isNumber,
            p = a.isString,
            z = a.merge,
            l = a.objectEach,
            A = a.pick,
            I = a.removeEvent,
            E = a.splat,
            H = a.SVGElement,
            g = a.syncTimeout,
            y = a.win;
        a.Series = a.seriesType(
            "line",
            null,
            {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: { duration: 1e3 },
                events: {},
                marker: {
                    radius: 4,
                    states: {
                        hover: {
                            animation: { duration: 50 },
                            enabled: !0,
                            radiusPlus: 2,
                        },
                    },
                },
                point: { events: {} },
                dataLabels: {
                    align: "center",
                    formatter: function () {
                        return null === this.y
                            ? ""
                            : a.numberFormat(this.y, -1);
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5,
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    hover: {
                        animation: { duration: 50 },
                        lineWidthPlus: 1,
                        marker: {},
                        halo: { size: 10 },
                    },
                    select: { marker: {} },
                },
                stickyTracking: !0,
                turboThreshold: 1e3,
                findNearestPointBy: "x",
            },
            {
                isCartesian: !0,
                pointClass: a.Point,
                sorted: !0,
                requireSorting: !0,
                directTouch: !1,
                axisTypes: ["xAxis", "yAxis"],
                colorCounter: 0,
                parallelArrays: ["x", "y"],
                coll: "series",
                init: function (a, c) {
                    var h = this,
                        b,
                        n = a.series,
                        g;
                    h.chart = a;
                    h.options = c = h.setOptions(c);
                    h.linkedSeries = [];
                    h.bindAxes();
                    f(h, {
                        name: c.name,
                        state: "",
                        visible: !1 !== c.visible,
                        selected: !0 === c.selected,
                    });
                    b = c.events;
                    l(b, function (a, c) {
                        D(h, c, a);
                    });
                    if (
                        (b && b.click) ||
                        (c.point && c.point.events && c.point.events.click) ||
                        c.allowPointSelect
                    )
                        a.runTrackerClick = !0;
                    h.getColor();
                    h.getSymbol();
                    r(h.parallelArrays, function (a) {
                        h[a + "Data"] = [];
                    });
                    h.setData(c.data, !1);
                    h.isCartesian && (a.hasCartesianSeries = !0);
                    n.length && (g = n[n.length - 1]);
                    h._i = A(g && g._i, -1) + 1;
                    a.orderSeries(this.insert(n));
                },
                insert: function (a) {
                    var c = this.options.index,
                        h;
                    if (b(c)) {
                        for (h = a.length; h--; )
                            if (c >= A(a[h].options.index, a[h]._i)) {
                                a.splice(h + 1, 0, this);
                                break;
                            }
                        -1 === h && a.unshift(this);
                        h += 1;
                    } else a.push(this);
                    return A(h, a.length - 1);
                },
                bindAxes: function () {
                    var b = this,
                        c = b.options,
                        h = b.chart,
                        g;
                    r(b.axisTypes || [], function (n) {
                        r(h[n], function (a) {
                            g = a.options;
                            if (
                                c[n] === g.index ||
                                (void 0 !== c[n] && c[n] === g.id) ||
                                (void 0 === c[n] && 0 === g.index)
                            )
                                b.insert(a.series),
                                    (b[n] = a),
                                    (a.isDirty = !0);
                        });
                        b[n] || b.optionalAxis === n || a.error(18, !0);
                    });
                },
                updateParallelArrays: function (a, c) {
                    var h = a.series,
                        n = arguments,
                        g = b(c)
                            ? function (b) {
                                  var n =
                                      "y" === b && h.toYData
                                          ? h.toYData(a)
                                          : a[b];
                                  h[b + "Data"][c] = n;
                              }
                            : function (a) {
                                  Array.prototype[c].apply(
                                      h[a + "Data"],
                                      Array.prototype.slice.call(n, 2)
                                  );
                              };
                    r(h.parallelArrays, g);
                },
                autoIncrement: function () {
                    var a = this.options,
                        c = this.xIncrement,
                        h,
                        b = a.pointIntervalUnit,
                        c = A(c, a.pointStart, 0);
                    this.pointInterval = h = A(
                        this.pointInterval,
                        a.pointInterval,
                        1
                    );
                    b &&
                        ((a = new e(c)),
                        "day" === b
                            ? (a = +a[e.hcSetDate](a[e.hcGetDate]() + h))
                            : "month" === b
                            ? (a = +a[e.hcSetMonth](a[e.hcGetMonth]() + h))
                            : "year" === b &&
                              (a = +a[e.hcSetFullYear](
                                  a[e.hcGetFullYear]() + h
                              )),
                        (h = a - c));
                    this.xIncrement = c + h;
                    return c;
                },
                setOptions: function (a) {
                    var c = this.chart,
                        h = c.options,
                        b = h.plotOptions,
                        n = (c.userOptions || {}).plotOptions || {},
                        g = b[this.type];
                    this.userOptions = a;
                    c = z(g, b.series, a);
                    this.tooltipOptions = z(
                        k.tooltip,
                        k.plotOptions.series && k.plotOptions.series.tooltip,
                        k.plotOptions[this.type].tooltip,
                        h.tooltip.userOptions,
                        b.series && b.series.tooltip,
                        b[this.type].tooltip,
                        a.tooltip
                    );
                    this.stickyTracking = A(
                        a.stickyTracking,
                        n[this.type] && n[this.type].stickyTracking,
                        n.series && n.series.stickyTracking,
                        this.tooltipOptions.shared && !this.noSharedTooltip
                            ? !0
                            : c.stickyTracking
                    );
                    null === g.marker && delete c.marker;
                    this.zoneAxis = c.zoneAxis;
                    a = this.zones = (c.zones || []).slice();
                    (!c.negativeColor && !c.negativeFillColor) ||
                        c.zones ||
                        a.push({
                            value:
                                c[this.zoneAxis + "Threshold"] ||
                                c.threshold ||
                                0,
                            className: "highcharts-negative",
                        });
                    a.length && t(a[a.length - 1].value) && a.push({});
                    return c;
                },
                getCyclic: function (a, c, h) {
                    var b,
                        n = this.chart,
                        g = this.userOptions,
                        d = a + "Index",
                        l = a + "Counter",
                        f = h
                            ? h.length
                            : A(n.options.chart[a + "Count"], n[a + "Count"]);
                    c ||
                        ((b = A(g[d], g["_" + d])),
                        t(b) ||
                            (n.series.length || (n[l] = 0),
                            (g["_" + d] = b = n[l] % f),
                            (n[l] += 1)),
                        h && (c = h[b]));
                    void 0 !== b && (this[d] = b);
                    this[a] = c;
                },
                getColor: function () {
                    this.getCyclic("color");
                },
                getSymbol: function () {
                    this.getCyclic(
                        "symbol",
                        this.options.marker.symbol,
                        this.chart.options.symbols
                    );
                },
                drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
                setData: function (n, c, h, g) {
                    var l = this,
                        q = l.points,
                        f = (q && q.length) || 0,
                        e,
                        m = l.options,
                        y = l.chart,
                        k = null,
                        G = l.xAxis,
                        w = m.turboThreshold,
                        E = this.xData,
                        t = this.yData,
                        x = (e = l.pointArrayMap) && e.length;
                    n = n || [];
                    e = n.length;
                    c = A(c, !0);
                    if (
                        !1 !== g &&
                        e &&
                        f === e &&
                        !l.cropped &&
                        !l.hasGroupedData &&
                        l.visible
                    )
                        r(n, function (a, c) {
                            q[c].update &&
                                a !== m.data[c] &&
                                q[c].update(a, !1, null, !1);
                        });
                    else {
                        l.xIncrement = null;
                        l.colorCounter = 0;
                        r(this.parallelArrays, function (a) {
                            l[a + "Data"].length = 0;
                        });
                        if (w && e > w) {
                            for (h = 0; null === k && h < e; ) (k = n[h]), h++;
                            if (b(k))
                                for (h = 0; h < e; h++)
                                    (E[h] = this.autoIncrement()),
                                        (t[h] = n[h]);
                            else if (d(k))
                                if (x)
                                    for (h = 0; h < e; h++)
                                        (k = n[h]),
                                            (E[h] = k[0]),
                                            (t[h] = k.slice(1, x + 1));
                                else
                                    for (h = 0; h < e; h++)
                                        (k = n[h]),
                                            (E[h] = k[0]),
                                            (t[h] = k[1]);
                            else a.error(12);
                        } else
                            for (h = 0; h < e; h++)
                                void 0 !== n[h] &&
                                    ((k = { series: l }),
                                    l.pointClass.prototype.applyOptions.apply(
                                        k,
                                        [n[h]]
                                    ),
                                    l.updateParallelArrays(k, h));
                        t && p(t[0]) && a.error(14, !0);
                        l.data = [];
                        l.options.data = l.userOptions.data = n;
                        for (h = f; h--; )
                            q[h] && q[h].destroy && q[h].destroy();
                        G && (G.minRange = G.userMinRange);
                        l.isDirty = y.isDirtyBox = !0;
                        l.isDirtyData = !!q;
                        h = !1;
                    }
                    "point" === m.legendType &&
                        (this.processData(), this.generatePoints());
                    c && y.redraw(h);
                },
                processData: function (b) {
                    var c = this.xData,
                        h = this.yData,
                        n = c.length,
                        g;
                    g = 0;
                    var d,
                        l,
                        f = this.xAxis,
                        e,
                        p = this.options;
                    e = p.cropThreshold;
                    var m = this.getExtremesFromAll || p.getExtremesFromAll,
                        y = this.isCartesian,
                        p = f && f.val2lin,
                        k = f && f.isLog,
                        r,
                        w;
                    if (
                        y &&
                        !this.isDirty &&
                        !f.isDirty &&
                        !this.yAxis.isDirty &&
                        !b
                    )
                        return !1;
                    f && ((b = f.getExtremes()), (r = b.min), (w = b.max));
                    if (
                        y &&
                        this.sorted &&
                        !m &&
                        (!e || n > e || this.forceCrop)
                    )
                        if (c[n - 1] < r || c[0] > w) (c = []), (h = []);
                        else if (c[0] < r || c[n - 1] > w)
                            (g = this.cropData(this.xData, this.yData, r, w)),
                                (c = g.xData),
                                (h = g.yData),
                                (g = g.start),
                                (d = !0);
                    for (e = c.length || 1; --e; )
                        (n = k ? p(c[e]) - p(c[e - 1]) : c[e] - c[e - 1]),
                            0 < n && (void 0 === l || n < l)
                                ? (l = n)
                                : 0 > n && this.requireSorting && a.error(15);
                    this.cropped = d;
                    this.cropStart = g;
                    this.processedXData = c;
                    this.processedYData = h;
                    this.closestPointRange = l;
                },
                cropData: function (a, c, h, b) {
                    var n = a.length,
                        g = 0,
                        d = n,
                        l = A(this.cropShoulder, 1),
                        f;
                    for (f = 0; f < n; f++)
                        if (a[f] >= h) {
                            g = Math.max(0, f - l);
                            break;
                        }
                    for (h = f; h < n; h++)
                        if (a[h] > b) {
                            d = h + l;
                            break;
                        }
                    return {
                        xData: a.slice(g, d),
                        yData: c.slice(g, d),
                        start: g,
                        end: d,
                    };
                },
                generatePoints: function () {
                    var a = this.options,
                        c = a.data,
                        h = this.data,
                        b,
                        g = this.processedXData,
                        d = this.processedYData,
                        l = this.pointClass,
                        f = g.length,
                        e = this.cropStart || 0,
                        p,
                        m = this.hasGroupedData,
                        a = a.keys,
                        y,
                        k = [],
                        r;
                    h ||
                        m ||
                        ((h = []), (h.length = c.length), (h = this.data = h));
                    a && m && (this.options.keys = !1);
                    for (r = 0; r < f; r++)
                        (p = e + r),
                            m
                                ? ((y = new l().init(
                                      this,
                                      [g[r]].concat(E(d[r]))
                                  )),
                                  (y.dataGroup = this.groupMap[r]))
                                : (y = h[p]) ||
                                  void 0 === c[p] ||
                                  (h[p] = y = new l().init(this, c[p], g[r])),
                            y && ((y.index = p), (k[r] = y));
                    this.options.keys = a;
                    if (h && (f !== (b = h.length) || m))
                        for (r = 0; r < b; r++)
                            r !== e || m || (r += f),
                                h[r] &&
                                    (h[r].destroyElements(),
                                    (h[r].plotX = void 0));
                    this.data = h;
                    this.points = k;
                },
                getExtremes: function (a) {
                    var c = this.yAxis,
                        h = this.processedXData,
                        n,
                        g = [],
                        q = 0;
                    n = this.xAxis.getExtremes();
                    var l = n.min,
                        f = n.max,
                        e,
                        p,
                        y,
                        m;
                    a = a || this.stackedYData || this.processedYData || [];
                    n = a.length;
                    for (m = 0; m < n; m++)
                        if (
                            ((p = h[m]),
                            (y = a[m]),
                            (e =
                                (b(y, !0) || d(y)) &&
                                (!c.positiveValuesOnly || y.length || 0 < y)),
                            (p =
                                this.getExtremesFromAll ||
                                this.options.getExtremesFromAll ||
                                this.cropped ||
                                ((h[m + 1] || p) >= l && (h[m - 1] || p) <= f)),
                            e && p)
                        )
                            if ((e = y.length))
                                for (; e--; ) null !== y[e] && (g[q++] = y[e]);
                            else g[q++] = y;
                    this.dataMin = C(g);
                    this.dataMax = F(g);
                },
                translate: function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var a = this.options,
                        c = a.stacking,
                        h = this.xAxis,
                        g = h.categories,
                        d = this.yAxis,
                        q = this.points,
                        l = q.length,
                        f = !!this.modifyValue,
                        e = a.pointPlacement,
                        p = "between" === e || b(e),
                        y = a.threshold,
                        m = a.startFromThreshold ? y : 0,
                        k,
                        r,
                        w,
                        E,
                        x = Number.MAX_VALUE;
                    "between" === e && (e = 0.5);
                    b(e) && (e *= A(a.pointRange || h.pointRange));
                    for (a = 0; a < l; a++) {
                        var z = q[a],
                            H = z.x,
                            I = z.y;
                        r = z.low;
                        var B =
                                c &&
                                d.stacks[
                                    (this.negStacks && I < (m ? 0 : y)
                                        ? "-"
                                        : "") + this.stackKey
                                ],
                            C;
                        d.positiveValuesOnly &&
                            null !== I &&
                            0 >= I &&
                            (z.isNull = !0);
                        z.plotX = k = u(
                            Math.min(
                                Math.max(
                                    -1e5,
                                    h.translate(
                                        H,
                                        0,
                                        0,
                                        0,
                                        1,
                                        e,
                                        "flags" === this.type
                                    )
                                ),
                                1e5
                            )
                        );
                        c &&
                            this.visible &&
                            !z.isNull &&
                            B &&
                            B[H] &&
                            ((E = this.getStackIndicator(E, H, this.index)),
                            (C = B[H]),
                            (I = C.points[E.key]),
                            (r = I[0]),
                            (I = I[1]),
                            r === m && E.key === B[H].base && (r = A(y, d.min)),
                            d.positiveValuesOnly && 0 >= r && (r = null),
                            (z.total = z.stackTotal = C.total),
                            (z.percentage = C.total && (z.y / C.total) * 100),
                            (z.stackY = I),
                            C.setOffset(
                                this.pointXOffset || 0,
                                this.barW || 0
                            ));
                        z.yBottom = t(r) ? d.translate(r, 0, 1, 0, 1) : null;
                        f && (I = this.modifyValue(I, z));
                        z.plotY = r =
                            "number" === typeof I && Infinity !== I
                                ? Math.min(
                                      Math.max(
                                          -1e5,
                                          d.translate(I, 0, 1, 0, 1)
                                      ),
                                      1e5
                                  )
                                : void 0;
                        z.isInside =
                            void 0 !== r &&
                            0 <= r &&
                            r <= d.len &&
                            0 <= k &&
                            k <= h.len;
                        z.clientX = p ? u(h.translate(H, 0, 0, 0, 1, e)) : k;
                        z.negative = z.y < (y || 0);
                        z.category = g && void 0 !== g[z.x] ? g[z.x] : z.x;
                        z.isNull ||
                            (void 0 !== w && (x = Math.min(x, Math.abs(k - w))),
                            (w = k));
                        z.zone = this.zones.length && z.getZone();
                    }
                    this.closestPointRangePx = x;
                },
                getValidPoints: function (a, c) {
                    var h = this.chart;
                    return w(a || this.points || [], function (a) {
                        return c &&
                            !h.isInsidePlot(a.plotX, a.plotY, h.inverted)
                            ? !1
                            : !a.isNull;
                    });
                },
                setClip: function (a) {
                    var c = this.chart,
                        h = this.options,
                        b = c.renderer,
                        g = c.inverted,
                        n = this.clipBox,
                        d = n || c.clipBox,
                        l =
                            this.sharedClipKey ||
                            [
                                "_sharedClip",
                                a && a.duration,
                                a && a.easing,
                                d.height,
                                h.xAxis,
                                h.yAxis,
                            ].join(),
                        f = c[l],
                        e = c[l + "m"];
                    f ||
                        (a &&
                            ((d.width = 0),
                            g && (d.x = c.plotSizeX),
                            (c[l + "m"] = e =
                                b.clipRect(
                                    g ? c.plotSizeX + 99 : -99,
                                    g ? -c.plotLeft : -c.plotTop,
                                    99,
                                    g ? c.chartWidth : c.chartHeight
                                ))),
                        (c[l] = f = b.clipRect(d)),
                        (f.count = { length: 0 }));
                    a &&
                        !f.count[this.index] &&
                        ((f.count[this.index] = !0), (f.count.length += 1));
                    !1 !== h.clip &&
                        (this.group.clip(a || n ? f : c.clipRect),
                        this.markerGroup.clip(e),
                        (this.sharedClipKey = l));
                    a ||
                        (f.count[this.index] &&
                            (delete f.count[this.index], --f.count.length),
                        0 === f.count.length &&
                            l &&
                            c[l] &&
                            (n || (c[l] = c[l].destroy()),
                            c[l + "m"] && (c[l + "m"] = c[l + "m"].destroy())));
                },
                animate: function (a) {
                    var c = this.chart,
                        h = B(this.options.animation),
                        b;
                    a
                        ? this.setClip(h)
                        : ((b = this.sharedClipKey),
                          (a = c[b]) &&
                              a.animate({ width: c.plotSizeX, x: 0 }, h),
                          c[b + "m"] &&
                              c[b + "m"].animate(
                                  { width: c.plotSizeX + 99, x: 0 },
                                  h
                              ),
                          (this.animate = null));
                },
                afterAnimate: function () {
                    this.setClip();
                    m(this, "afterAnimate");
                    this.finishedAnimating = !0;
                },
                drawPoints: function () {
                    var a = this.points,
                        c = this.chart,
                        h,
                        g,
                        d,
                        l,
                        f = this.options.marker,
                        e,
                        p,
                        y,
                        m,
                        k = this[this.specialGroup] || this.markerGroup,
                        r = A(
                            f.enabled,
                            this.xAxis.isRadial ? !0 : null,
                            this.closestPointRangePx >= 2 * f.radius
                        );
                    if (!1 !== f.enabled || this._hasPointMarkers)
                        for (g = 0; g < a.length; g++)
                            (d = a[g]),
                                (h = d.plotY),
                                (l = d.graphic),
                                (e = d.marker || {}),
                                (p = !!d.marker),
                                (y = (r && void 0 === e.enabled) || e.enabled),
                                (m = d.isInside),
                                y && b(h) && null !== d.y
                                    ? ((h = A(e.symbol, this.symbol)),
                                      (d.hasImage = 0 === h.indexOf("url")),
                                      (y = this.markerAttribs(
                                          d,
                                          d.selected && "select"
                                      )),
                                      l
                                          ? l[m ? "show" : "hide"](!0).animate(
                                                y
                                            )
                                          : m &&
                                            (0 < y.width || d.hasImage) &&
                                            (d.graphic = l =
                                                c.renderer
                                                    .symbol(
                                                        h,
                                                        y.x,
                                                        y.y,
                                                        y.width,
                                                        y.height,
                                                        p ? e : f
                                                    )
                                                    .add(k)),
                                      l && l.addClass(d.getClassName(), !0))
                                    : l && (d.graphic = l.destroy());
                },
                markerAttribs: function (a, c) {
                    var h = this.options.marker,
                        b = a.marker || {},
                        g = A(b.radius, h.radius);
                    c &&
                        ((h = h.states[c]),
                        (c = b.states && b.states[c]),
                        (g = A(
                            c && c.radius,
                            h && h.radius,
                            g + ((h && h.radiusPlus) || 0)
                        )));
                    a.hasImage && (g = 0);
                    a = { x: Math.floor(a.plotX) - g, y: a.plotY - g };
                    g && (a.width = a.height = 2 * g);
                    return a;
                },
                destroy: function () {
                    var a = this,
                        c = a.chart,
                        h = /AppleWebKit\/533/.test(y.navigator.userAgent),
                        b,
                        g,
                        d = a.data || [],
                        f,
                        e;
                    m(a, "destroy");
                    I(a);
                    r(a.axisTypes || [], function (c) {
                        (e = a[c]) &&
                            e.series &&
                            (x(e.series, a), (e.isDirty = e.forceRedraw = !0));
                    });
                    a.legendItem && a.chart.legend.destroyItem(a);
                    for (g = d.length; g--; )
                        (f = d[g]) && f.destroy && f.destroy();
                    a.points = null;
                    clearTimeout(a.animationTimeout);
                    l(a, function (a, c) {
                        a instanceof H &&
                            !a.survive &&
                            ((b = h && "group" === c ? "hide" : "destroy"),
                            a[b]());
                    });
                    c.hoverSeries === a && (c.hoverSeries = null);
                    x(c.series, a);
                    c.orderSeries();
                    l(a, function (c, h) {
                        delete a[h];
                    });
                },
                getGraphPath: function (a, c, h) {
                    var b = this,
                        g = b.options,
                        n = g.step,
                        d,
                        l = [],
                        f = [],
                        e;
                    a = a || b.points;
                    (d = a.reversed) && a.reverse();
                    (n = { right: 1, center: 2 }[n] || (n && 3)) &&
                        d &&
                        (n = 4 - n);
                    !g.connectNulls || c || h || (a = this.getValidPoints(a));
                    r(a, function (d, q) {
                        var p = d.plotX,
                            y = d.plotY,
                            m = a[q - 1];
                        (d.leftCliff || (m && m.rightCliff)) && !h && (e = !0);
                        d.isNull && !t(c) && 0 < q
                            ? (e = !g.connectNulls)
                            : d.isNull && !c
                            ? (e = !0)
                            : (0 === q || e
                                  ? (q = ["M", d.plotX, d.plotY])
                                  : b.getPointSpline
                                  ? (q = b.getPointSpline(a, d, q))
                                  : n
                                  ? ((q =
                                        1 === n
                                            ? ["L", m.plotX, y]
                                            : 2 === n
                                            ? [
                                                  "L",
                                                  (m.plotX + p) / 2,
                                                  m.plotY,
                                                  "L",
                                                  (m.plotX + p) / 2,
                                                  y,
                                              ]
                                            : ["L", p, m.plotY]),
                                    q.push("L", p, y))
                                  : (q = ["L", p, y]),
                              f.push(d.x),
                              n && f.push(d.x),
                              l.push.apply(l, q),
                              (e = !1));
                    });
                    l.xMap = f;
                    return (b.graphPath = l);
                },
                drawGraph: function () {
                    var a = this,
                        c = (this.gappedPath || this.getGraphPath).call(this),
                        h = [["graph", "highcharts-graph"]];
                    r(this.zones, function (a, c) {
                        h.push([
                            "zone-graph-" + c,
                            "highcharts-graph highcharts-zone-graph-" +
                                c +
                                " " +
                                (a.className || ""),
                        ]);
                    });
                    r(h, function (h, b) {
                        b = h[0];
                        var g = a[b];
                        g
                            ? ((g.endX = c.xMap), g.animate({ d: c }))
                            : c.length &&
                              (a[b] = a.chart.renderer
                                  .path(c)
                                  .addClass(h[1])
                                  .attr({ zIndex: 1 })
                                  .add(a.group));
                        g && ((g.startX = c.xMap), (g.isArea = c.isArea));
                    });
                },
                applyZones: function () {
                    var a = this,
                        c = this.chart,
                        h = c.renderer,
                        b = this.zones,
                        g,
                        d,
                        l = this.clips || [],
                        f,
                        e = this.graph,
                        p = this.area,
                        y = Math.max(c.chartWidth, c.chartHeight),
                        m = this[(this.zoneAxis || "y") + "Axis"],
                        k,
                        w,
                        E = c.inverted,
                        z,
                        t,
                        x,
                        H,
                        u = !1;
                    b.length &&
                        (e || p) &&
                        m &&
                        void 0 !== m.min &&
                        ((w = m.reversed),
                        (z = m.horiz),
                        e && e.hide(),
                        p && p.hide(),
                        (k = m.getExtremes()),
                        r(b, function (b, n) {
                            g = w
                                ? z
                                    ? c.plotWidth
                                    : 0
                                : z
                                ? 0
                                : m.toPixels(k.min);
                            g = Math.min(Math.max(A(d, g), 0), y);
                            d = Math.min(
                                Math.max(
                                    Math.round(
                                        m.toPixels(A(b.value, k.max), !0)
                                    ),
                                    0
                                ),
                                y
                            );
                            u && (g = d = m.toPixels(k.max));
                            t = Math.abs(g - d);
                            x = Math.min(g, d);
                            H = Math.max(g, d);
                            m.isXAxis
                                ? ((f = {
                                      x: E ? H : x,
                                      y: 0,
                                      width: t,
                                      height: y,
                                  }),
                                  z || (f.x = c.plotHeight - f.x))
                                : ((f = {
                                      x: 0,
                                      y: E ? H : x,
                                      width: y,
                                      height: t,
                                  }),
                                  z && (f.y = c.plotWidth - f.y));
                            l[n]
                                ? l[n].animate(f)
                                : ((l[n] = h.clipRect(f)),
                                  e && a["zone-graph-" + n].clip(l[n]),
                                  p && a["zone-area-" + n].clip(l[n]));
                            u = b.value > k.max;
                        }),
                        (this.clips = l));
                },
                invertGroups: function (a) {
                    function c() {
                        r(["group", "markerGroup"], function (c) {
                            b[c] &&
                                (g.renderer.isVML &&
                                    b[c].attr({
                                        width: b.yAxis.len,
                                        height: b.xAxis.len,
                                    }),
                                (b[c].width = b.yAxis.len),
                                (b[c].height = b.xAxis.len),
                                b[c].invert(a));
                        });
                    }
                    var b = this,
                        g = b.chart,
                        n;
                    b.xAxis &&
                        ((n = D(g, "resize", c)),
                        D(b, "destroy", n),
                        c(a),
                        (b.invertGroups = c));
                },
                plotGroup: function (a, c, b, g, d) {
                    var h = this[a],
                        n = !h;
                    n &&
                        (this[a] = h =
                            this.chart.renderer
                                .g()
                                .attr({ zIndex: g || 0.1 })
                                .add(d));
                    h.addClass(
                        "highcharts-" +
                            c +
                            " highcharts-series-" +
                            this.index +
                            " highcharts-" +
                            this.type +
                            "-series " +
                            (t(this.colorIndex)
                                ? "highcharts-color-" + this.colorIndex + " "
                                : "") +
                            (this.options.className || "") +
                            (h.hasClass("highcharts-tracker")
                                ? " highcharts-tracker"
                                : ""),
                        !0
                    );
                    h.attr({ visibility: b })[n ? "attr" : "animate"](
                        this.getPlotBox()
                    );
                    return h;
                },
                getPlotBox: function () {
                    var a = this.chart,
                        c = this.xAxis,
                        b = this.yAxis;
                    a.inverted && ((c = b), (b = this.xAxis));
                    return {
                        translateX: c ? c.left : a.plotLeft,
                        translateY: b ? b.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1,
                    };
                },
                render: function () {
                    var a = this,
                        c = a.chart,
                        b,
                        d = a.options,
                        l =
                            !!a.animate &&
                            c.renderer.isSVG &&
                            B(d.animation).duration,
                        f = a.visible ? "inherit" : "hidden",
                        e = d.zIndex,
                        p = a.hasRendered,
                        y = c.seriesGroup,
                        m = c.inverted;
                    b = a.plotGroup("group", "series", f, e, y);
                    a.markerGroup = a.plotGroup(
                        "markerGroup",
                        "markers",
                        f,
                        e,
                        y
                    );
                    l && a.animate(!0);
                    b.inverted = a.isCartesian ? m : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.drawDataLabels && a.drawDataLabels();
                    a.visible && a.drawPoints();
                    a.drawTracker &&
                        !1 !== a.options.enableMouseTracking &&
                        a.drawTracker();
                    a.invertGroups(m);
                    !1 === d.clip || a.sharedClipKey || p || b.clip(c.clipRect);
                    l && a.animate();
                    p ||
                        (a.animationTimeout = g(function () {
                            a.afterAnimate();
                        }, l));
                    a.isDirty = !1;
                    a.hasRendered = !0;
                },
                redraw: function () {
                    var a = this.chart,
                        c = this.isDirty || this.isDirtyData,
                        b = this.group,
                        g = this.xAxis,
                        d = this.yAxis;
                    b &&
                        (a.inverted &&
                            b.attr({
                                width: a.plotWidth,
                                height: a.plotHeight,
                            }),
                        b.animate({
                            translateX: A(g && g.left, a.plotLeft),
                            translateY: A(d && d.top, a.plotTop),
                        }));
                    this.translate();
                    this.render();
                    c && delete this.kdTree;
                },
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function (a, c) {
                    var b = this.xAxis,
                        g = this.yAxis,
                        d = this.chart.inverted;
                    return this.searchKDTree(
                        {
                            clientX: d
                                ? b.len - a.chartY + b.pos
                                : a.chartX - b.pos,
                            plotY: d
                                ? g.len - a.chartX + g.pos
                                : a.chartY - g.pos,
                        },
                        c
                    );
                },
                buildKDTree: function () {
                    function a(b, h, g) {
                        var d, n;
                        if ((n = b && b.length))
                            return (
                                (d = c.kdAxisArray[h % g]),
                                b.sort(function (a, c) {
                                    return a[d] - c[d];
                                }),
                                (n = Math.floor(n / 2)),
                                {
                                    point: b[n],
                                    left: a(b.slice(0, n), h + 1, g),
                                    right: a(b.slice(n + 1), h + 1, g),
                                }
                            );
                    }
                    this.buildingKdTree = !0;
                    var c = this,
                        b =
                            -1 < c.options.findNearestPointBy.indexOf("y")
                                ? 2
                                : 1;
                    delete c.kdTree;
                    g(
                        function () {
                            c.kdTree = a(
                                c.getValidPoints(null, !c.directTouch),
                                b,
                                b
                            );
                            c.buildingKdTree = !1;
                        },
                        c.options.kdNow ? 0 : 1
                    );
                },
                searchKDTree: function (a, c) {
                    function b(a, c, h, f) {
                        var q = c.point,
                            e = g.kdAxisArray[h % f],
                            p,
                            y,
                            m = q;
                        y =
                            t(a[d]) && t(q[d])
                                ? Math.pow(a[d] - q[d], 2)
                                : null;
                        p =
                            t(a[n]) && t(q[n])
                                ? Math.pow(a[n] - q[n], 2)
                                : null;
                        p = (y || 0) + (p || 0);
                        q.dist = t(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                        q.distX = t(y) ? Math.sqrt(y) : Number.MAX_VALUE;
                        e = a[e] - q[e];
                        p = 0 > e ? "left" : "right";
                        y = 0 > e ? "right" : "left";
                        c[p] &&
                            ((p = b(a, c[p], h + 1, f)),
                            (m = p[l] < m[l] ? p : q));
                        c[y] &&
                            Math.sqrt(e * e) < m[l] &&
                            ((a = b(a, c[y], h + 1, f)),
                            (m = a[l] < m[l] ? a : m));
                        return m;
                    }
                    var g = this,
                        d = this.kdAxisArray[0],
                        n = this.kdAxisArray[1],
                        l = c ? "distX" : "dist";
                    c = -1 < g.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree();
                    if (this.kdTree) return b(a, this.kdTree, c, c);
                },
            }
        );
    })(J);
    (function (a) {
        var D = a.Axis,
            B = a.Chart,
            F = a.correctFloat,
            C = a.defined,
            u = a.destroyObjectProperties,
            e = a.each,
            k = a.format,
            t = a.objectEach,
            r = a.pick,
            x = a.Series;
        a.StackItem = function (a, e, k, d, b) {
            var f = a.chart.inverted;
            this.axis = a;
            this.isNegative = k;
            this.options = e;
            this.x = d;
            this.total = null;
            this.points = {};
            this.stack = b;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: e.align || (f ? (k ? "left" : "right") : "center"),
                verticalAlign:
                    e.verticalAlign || (f ? "middle" : k ? "bottom" : "top"),
                y: r(e.y, f ? 4 : k ? 14 : -6),
                x: r(e.x, f ? (k ? -6 : 6) : 0),
            };
            this.textAlign =
                e.textAlign || (f ? (k ? "right" : "left") : "center");
        };
        a.StackItem.prototype = {
            destroy: function () {
                u(this, this.axis);
            },
            render: function (a) {
                var f = this.options,
                    e = f.format,
                    e = e ? k(e, this) : f.formatter.call(this);
                this.label
                    ? this.label.attr({ text: e, visibility: "hidden" })
                    : (this.label = this.axis.chart.renderer
                          .text(e, null, null, f.useHTML)
                          .css(f.style)
                          .attr({
                              align: this.textAlign,
                              rotation: f.rotation,
                              visibility: "hidden",
                          })
                          .add(a));
            },
            setOffset: function (a, e) {
                var f = this.axis,
                    d = f.chart,
                    b = f.translate(
                        f.usePercentage ? 100 : this.total,
                        0,
                        0,
                        0,
                        1
                    ),
                    f = f.translate(0),
                    f = Math.abs(b - f);
                a = d.xAxis[0].translate(this.x) + a;
                b = this.getStackBox(d, this, a, b, e, f);
                if ((e = this.label))
                    e.align(this.alignOptions, null, b),
                        (b = e.alignAttr),
                        e[
                            !1 === this.options.crop || d.isInsidePlot(b.x, b.y)
                                ? "show"
                                : "hide"
                        ](!0);
            },
            getStackBox: function (a, e, k, d, b, p) {
                var f = e.axis.reversed,
                    l = a.inverted;
                a = a.plotHeight;
                e = (e.isNegative && !f) || (!e.isNegative && f);
                return {
                    x: l ? (e ? d : d - p) : k,
                    y: l ? a - k - b : e ? a - d - p : a - d,
                    width: l ? p : b,
                    height: l ? b : p,
                };
            },
        };
        B.prototype.getStacks = function () {
            var a = this;
            e(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
            });
            e(a.series, function (f) {
                !f.options.stacking ||
                    (!0 !== f.visible &&
                        !1 !== a.options.chart.ignoreHiddenSeries) ||
                    (f.stackKey = f.type + r(f.options.stack, ""));
            });
        };
        D.prototype.buildStacks = function () {
            var a = this.series,
                e = r(this.options.reversedStacks, !0),
                k = a.length,
                d;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (d = k; d--; ) a[e ? d : k - d - 1].setStackedPoints();
                for (d = 0; d < k; d++) a[d].modifyStacks();
            }
        };
        D.prototype.renderStackTotals = function () {
            var a = this.chart,
                e = a.renderer,
                k = this.stacks,
                d = this.stackTotalGroup;
            d ||
                (this.stackTotalGroup = d =
                    e
                        .g("stack-labels")
                        .attr({ visibility: "visible", zIndex: 6 })
                        .add());
            d.translate(a.plotLeft, a.plotTop);
            t(k, function (a) {
                t(a, function (a) {
                    a.render(d);
                });
            });
        };
        D.prototype.resetStacks = function () {
            var a = this,
                e = a.stacks;
            a.isXAxis ||
                t(e, function (f) {
                    t(f, function (d, b) {
                        d.touched < a.stacksTouched
                            ? (d.destroy(), delete f[b])
                            : ((d.total = null), (d.cum = null));
                    });
                });
        };
        D.prototype.cleanStacks = function () {
            var a;
            this.isXAxis ||
                (this.oldStacks && (a = this.stacks = this.oldStacks),
                t(a, function (a) {
                    t(a, function (a) {
                        a.cum = a.total;
                    });
                }));
        };
        x.prototype.setStackedPoints = function () {
            if (
                this.options.stacking &&
                (!0 === this.visible ||
                    !1 === this.chart.options.chart.ignoreHiddenSeries)
            ) {
                var f = this.processedXData,
                    e = this.processedYData,
                    k = [],
                    d = e.length,
                    b = this.options,
                    p = b.threshold,
                    z = b.startFromThreshold ? p : 0,
                    l = b.stack,
                    b = b.stacking,
                    A = this.stackKey,
                    t = "-" + A,
                    E = this.negStacks,
                    x = this.yAxis,
                    g = x.stacks,
                    y = x.oldStacks,
                    n,
                    c,
                    h,
                    G,
                    v,
                    q,
                    u;
                x.stacksTouched += 1;
                for (v = 0; v < d; v++)
                    (q = f[v]),
                        (u = e[v]),
                        (n = this.getStackIndicator(n, q, this.index)),
                        (G = n.key),
                        (h = (c = E && u < (z ? 0 : p)) ? t : A),
                        g[h] || (g[h] = {}),
                        g[h][q] ||
                            (y[h] && y[h][q]
                                ? ((g[h][q] = y[h][q]), (g[h][q].total = null))
                                : (g[h][q] = new a.StackItem(
                                      x,
                                      x.options.stackLabels,
                                      c,
                                      q,
                                      l
                                  ))),
                        (h = g[h][q]),
                        null !== u &&
                            ((h.points[G] = h.points[this.index] =
                                [r(h.cum, z)]),
                            C(h.cum) || (h.base = G),
                            (h.touched = x.stacksTouched),
                            0 < n.index &&
                                !1 === this.singleStacks &&
                                (h.points[G][0] =
                                    h.points[this.index + "," + q + ",0"][0])),
                        "percent" === b
                            ? ((c = c ? A : t),
                              E && g[c] && g[c][q]
                                  ? ((c = g[c][q]),
                                    (h.total = c.total =
                                        Math.max(c.total, h.total) +
                                            Math.abs(u) || 0))
                                  : (h.total = F(h.total + (Math.abs(u) || 0))))
                            : (h.total = F(h.total + (u || 0))),
                        (h.cum = r(h.cum, z) + (u || 0)),
                        null !== u && (h.points[G].push(h.cum), (k[v] = h.cum));
                "percent" === b && (x.usePercentage = !0);
                this.stackedYData = k;
                x.oldStacks = {};
            }
        };
        x.prototype.modifyStacks = function () {
            var a = this,
                m = a.stackKey,
                k = a.yAxis.stacks,
                d = a.processedXData,
                b,
                p = a.options.stacking;
            a[p + "Stacker"] &&
                e([m, "-" + m], function (f) {
                    for (var l = d.length, e, m; l--; )
                        if (
                            ((e = d[l]),
                            (b = a.getStackIndicator(b, e, a.index, f)),
                            (m = (e = k[f] && k[f][e]) && e.points[b.key]))
                        )
                            a[p + "Stacker"](m, e, l);
                });
        };
        x.prototype.percentStacker = function (a, e, k) {
            e = e.total ? 100 / e.total : 0;
            a[0] = F(a[0] * e);
            a[1] = F(a[1] * e);
            this.stackedYData[k] = a[1];
        };
        x.prototype.getStackIndicator = function (a, e, k, d) {
            !C(a) || a.x !== e || (d && a.key !== d)
                ? (a = { x: e, index: 0, key: d })
                : a.index++;
            a.key = [k, e, a.index].join();
            return a;
        };
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.Axis,
            F = a.createElement,
            C = a.css,
            u = a.defined,
            e = a.each,
            k = a.erase,
            t = a.extend,
            r = a.fireEvent,
            x = a.inArray,
            f = a.isNumber,
            m = a.isObject,
            w = a.isArray,
            d = a.merge,
            b = a.objectEach,
            p = a.pick,
            z = a.Point,
            l = a.Series,
            A = a.seriesTypes,
            I = a.setAnimation,
            E = a.splat;
        t(a.Chart.prototype, {
            addSeries: function (a, b, d) {
                var g,
                    c = this;
                a &&
                    ((b = p(b, !0)),
                    r(c, "addSeries", { options: a }, function () {
                        g = c.initSeries(a);
                        c.isDirtyLegend = !0;
                        c.linkSeries();
                        b && c.redraw(d);
                    }));
                return g;
            },
            addAxis: function (a, b, l, n) {
                var c = b ? "xAxis" : "yAxis",
                    h = this.options;
                a = d(a, { index: this[c].length, isX: b });
                b = new B(this, a);
                h[c] = E(h[c] || {});
                h[c].push(a);
                p(l, !0) && this.redraw(n);
                return b;
            },
            showLoading: function (a) {
                var b = this,
                    d = b.options,
                    n = b.loadingDiv,
                    c = function () {
                        n &&
                            C(n, {
                                left: b.plotLeft + "px",
                                top: b.plotTop + "px",
                                width: b.plotWidth + "px",
                                height: b.plotHeight + "px",
                            });
                    };
                n ||
                    ((b.loadingDiv = n =
                        F(
                            "div",
                            {
                                className:
                                    "highcharts-loading highcharts-loading-hidden",
                            },
                            null,
                            b.container
                        )),
                    (b.loadingSpan = F(
                        "span",
                        { className: "highcharts-loading-inner" },
                        null,
                        n
                    )),
                    D(b, "redraw", c));
                n.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || d.lang.loading;
                b.loadingShown = !0;
                c();
            },
            hideLoading: function () {
                var a = this.loadingDiv;
                a &&
                    (a.className =
                        "highcharts-loading highcharts-loading-hidden");
                this.loadingShown = !1;
            },
            propsRequireDirtyBox:
                "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
                    " "
                ),
            propsRequireUpdateSeries:
                "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(
                    " "
                ),
            update: function (a, g, l) {
                var n = this,
                    c = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                    },
                    h = a.chart,
                    y,
                    k,
                    q = [];
                if (h) {
                    d(!0, n.options.chart, h);
                    "className" in h && n.setClassName(h.className);
                    if ("inverted" in h || "polar" in h)
                        n.propFromSeries(), (y = !0);
                    "alignTicks" in h && (y = !0);
                    b(h, function (a, c) {
                        -1 !== x("chart." + c, n.propsRequireUpdateSeries) &&
                            (k = !0);
                        -1 !== x(c, n.propsRequireDirtyBox) &&
                            (n.isDirtyBox = !0);
                    });
                }
                a.plotOptions && d(!0, this.options.plotOptions, a.plotOptions);
                b(a, function (a, b) {
                    if (n[b] && "function" === typeof n[b].update)
                        n[b].update(a, !1);
                    else if ("function" === typeof n[c[b]]) n[c[b]](a);
                    "chart" !== b &&
                        -1 !== x(b, n.propsRequireUpdateSeries) &&
                        (k = !0);
                });
                e(
                    "xAxis yAxis zAxis series colorAxis pane".split(" "),
                    function (c) {
                        a[c] &&
                            (e(E(a[c]), function (a, b) {
                                (b = (u(a.id) && n.get(a.id)) || n[c][b]) &&
                                    b.coll === c &&
                                    (b.update(a, !1), l && (b.touched = !0));
                                if (!b && l)
                                    if ("series" === c)
                                        n.addSeries(a, !1).touched = !0;
                                    else if ("xAxis" === c || "yAxis" === c)
                                        n.addAxis(
                                            a,
                                            "xAxis" === c,
                                            !1
                                        ).touched = !0;
                            }),
                            l &&
                                e(n[c], function (a) {
                                    a.touched ? delete a.touched : q.push(a);
                                }));
                    }
                );
                e(q, function (a) {
                    a.remove(!1);
                });
                y &&
                    e(n.axes, function (a) {
                        a.update({}, !1);
                    });
                k &&
                    e(n.series, function (a) {
                        a.update({}, !1);
                    });
                a.loading && d(!0, n.options.loading, a.loading);
                y = h && h.width;
                h = h && h.height;
                (f(y) && y !== n.chartWidth) || (f(h) && h !== n.chartHeight)
                    ? n.setSize(y, h)
                    : p(g, !0) && n.redraw();
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a);
            },
        });
        t(z.prototype, {
            update: function (a, b, d, n) {
                function c() {
                    h.applyOptions(a);
                    null === h.y && l && (h.graphic = l.destroy());
                    m(a, !0) &&
                        (l &&
                            l.element &&
                            a &&
                            a.marker &&
                            void 0 !== a.marker.symbol &&
                            (h.graphic = l.destroy()),
                        a &&
                            a.dataLabels &&
                            h.dataLabel &&
                            (h.dataLabel = h.dataLabel.destroy()));
                    e = h.index;
                    g.updateParallelArrays(h, e);
                    y.data[e] = m(y.data[e], !0) || m(a, !0) ? h.options : a;
                    g.isDirty = g.isDirtyData = !0;
                    !g.fixedBox && g.hasCartesianSeries && (f.isDirtyBox = !0);
                    "point" === y.legendType && (f.isDirtyLegend = !0);
                    b && f.redraw(d);
                }
                var h = this,
                    g = h.series,
                    l = h.graphic,
                    e,
                    f = g.chart,
                    y = g.options;
                b = p(b, !0);
                !1 === n ? c() : h.firePointEvent("update", { options: a }, c);
            },
            remove: function (a, b) {
                this.series.removePoint(x(this, this.series.data), a, b);
            },
        });
        t(l.prototype, {
            addPoint: function (a, b, d, n) {
                var c = this.options,
                    h = this.data,
                    g = this.chart,
                    l = this.xAxis,
                    l = l && l.hasNames && l.names,
                    e = c.data,
                    f,
                    y,
                    k = this.xData,
                    m,
                    r;
                b = p(b, !0);
                f = { series: this };
                this.pointClass.prototype.applyOptions.apply(f, [a]);
                r = f.x;
                m = k.length;
                if (this.requireSorting && r < k[m - 1])
                    for (y = !0; m && k[m - 1] > r; ) m--;
                this.updateParallelArrays(f, "splice", m, 0, 0);
                this.updateParallelArrays(f, m);
                l && f.name && (l[r] = f.name);
                e.splice(m, 0, a);
                y && (this.data.splice(m, 0, null), this.processData());
                "point" === c.legendType && this.generatePoints();
                d &&
                    (h[0] && h[0].remove
                        ? h[0].remove(!1)
                        : (h.shift(),
                          this.updateParallelArrays(f, "shift"),
                          e.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(n);
            },
            removePoint: function (a, b, d) {
                var g = this,
                    c = g.data,
                    h = c[a],
                    l = g.points,
                    f = g.chart,
                    e = function () {
                        l && l.length === c.length && l.splice(a, 1);
                        c.splice(a, 1);
                        g.options.data.splice(a, 1);
                        g.updateParallelArrays(
                            h || { series: g },
                            "splice",
                            a,
                            1
                        );
                        h && h.destroy();
                        g.isDirty = !0;
                        g.isDirtyData = !0;
                        b && f.redraw();
                    };
                I(d, f);
                b = p(b, !0);
                h ? h.firePointEvent("remove", null, e) : e();
            },
            remove: function (a, b, d) {
                function g() {
                    c.destroy();
                    h.isDirtyLegend = h.isDirtyBox = !0;
                    h.linkSeries();
                    p(a, !0) && h.redraw(b);
                }
                var c = this,
                    h = c.chart;
                !1 !== d ? r(c, "remove", null, g) : g();
            },
            update: function (a, b) {
                var g = this,
                    n = g.chart,
                    c = g.userOptions,
                    h = g.oldType || g.type,
                    l = a.type || c.type || n.options.chart.type,
                    f = A[h].prototype,
                    q,
                    m = ["group", "markerGroup", "dataLabelsGroup"],
                    k = ["navigatorSeries", "baseSeries"],
                    r = g.finishedAnimating && { animation: !1 };
                if (Object.keys && "data" === Object.keys(a).toString())
                    return this.setData(a.data, b);
                if ((l && l !== h) || void 0 !== a.zIndex) m.length = 0;
                g.options.isInternal && (k.length = 0);
                k = m.concat(k);
                e(k, function (a) {
                    k[a] = g[a];
                    delete g[a];
                });
                a = d(
                    c,
                    r,
                    { index: g.index, pointStart: g.xData[0] },
                    { data: g.options.data },
                    a
                );
                g.remove(!1, null, !1);
                for (q in f) g[q] = void 0;
                t(g, A[l || h].prototype);
                e(k, function (a) {
                    g[a] = k[a];
                });
                g.init(n, a);
                g.oldType = h;
                n.linkSeries();
                p(b, !0) && n.redraw(!1);
            },
        });
        t(B.prototype, {
            update: function (a, b) {
                var g = this.chart;
                a = g.options[this.coll][this.options.index] = d(
                    this.userOptions,
                    a
                );
                this.destroy(!0);
                this.init(g, t(a, { events: void 0 }));
                g.isDirtyBox = !0;
                p(b, !0) && g.redraw();
            },
            remove: function (a) {
                for (
                    var b = this.chart,
                        d = this.coll,
                        n = this.series,
                        c = n.length;
                    c--;

                )
                    n[c] && n[c].remove(!1);
                k(b.axes, this);
                k(b[d], this);
                w(b.options[d])
                    ? b.options[d].splice(this.options.index, 1)
                    : delete b.options[d];
                e(b[d], function (a, c) {
                    a.options.index = c;
                });
                this.destroy();
                b.isDirtyBox = !0;
                p(a, !0) && b.redraw();
            },
            setTitle: function (a, b) {
                this.update({ title: a }, b);
            },
            setCategories: function (a, b) {
                this.update({ categories: a }, b);
            },
        });
    })(J);
    (function (a) {
        var D = a.each,
            B = a.map,
            F = a.pick,
            C = a.Series,
            u = a.seriesType;
        u(
            "area",
            "line",
            { softThreshold: !1, threshold: 0 },
            {
                singleStacks: !1,
                getStackPoints: function (e) {
                    var k = [],
                        t = [],
                        r = this.xAxis,
                        x = this.yAxis,
                        f = x.stacks[this.stackKey],
                        m = {},
                        w = this.index,
                        d = x.series,
                        b = d.length,
                        p,
                        z = F(x.options.reversedStacks, !0) ? 1 : -1,
                        l;
                    e = e || this.points;
                    if (this.options.stacking) {
                        for (l = 0; l < e.length; l++) m[e[l].x] = e[l];
                        a.objectEach(f, function (a, b) {
                            null !== a.total && t.push(b);
                        });
                        t.sort(function (a, b) {
                            return a - b;
                        });
                        p = B(d, function () {
                            return this.visible;
                        });
                        D(t, function (a, d) {
                            var e = 0,
                                A,
                                g;
                            if (m[a] && !m[a].isNull)
                                k.push(m[a]),
                                    D([-1, 1], function (e) {
                                        var n =
                                                1 === e
                                                    ? "rightNull"
                                                    : "leftNull",
                                            c = 0,
                                            h = f[t[d + e]];
                                        if (h)
                                            for (l = w; 0 <= l && l < b; )
                                                (A = h.points[l]),
                                                    A ||
                                                        (l === w
                                                            ? (m[a][n] = !0)
                                                            : p[l] &&
                                                              (g =
                                                                  f[a].points[
                                                                      l
                                                                  ]) &&
                                                              (c -=
                                                                  g[1] - g[0])),
                                                    (l += z);
                                        m[a][
                                            1 === e ? "rightCliff" : "leftCliff"
                                        ] = c;
                                    });
                            else {
                                for (l = w; 0 <= l && l < b; ) {
                                    if ((A = f[a].points[l])) {
                                        e = A[1];
                                        break;
                                    }
                                    l += z;
                                }
                                e = x.translate(e, 0, 1, 0, 1);
                                k.push({
                                    isNull: !0,
                                    plotX: r.translate(a, 0, 0, 0, 1),
                                    x: a,
                                    plotY: e,
                                    yBottom: e,
                                });
                            }
                        });
                    }
                    return k;
                },
                getGraphPath: function (a) {
                    var e = C.prototype.getGraphPath,
                        t = this.options,
                        r = t.stacking,
                        x = this.yAxis,
                        f,
                        m,
                        w = [],
                        d = [],
                        b = this.index,
                        p,
                        z = x.stacks[this.stackKey],
                        l = t.threshold,
                        A = x.getThreshold(t.threshold),
                        u,
                        t = t.connectNulls || "percent" === r,
                        E = function (f, g, e) {
                            var n = a[f];
                            f = r && z[n.x].points[b];
                            var c = n[e + "Null"] || 0;
                            e = n[e + "Cliff"] || 0;
                            var h,
                                y,
                                n = !0;
                            e || c
                                ? ((h = (c ? f[0] : f[1]) + e),
                                  (y = f[0] + e),
                                  (n = !!c))
                                : !r && a[g] && a[g].isNull && (h = y = l);
                            void 0 !== h &&
                                (d.push({
                                    plotX: p,
                                    plotY: null === h ? A : x.getThreshold(h),
                                    isNull: n,
                                    isCliff: !0,
                                }),
                                w.push({
                                    plotX: p,
                                    plotY: null === y ? A : x.getThreshold(y),
                                    doCurve: !1,
                                }));
                        };
                    a = a || this.points;
                    r && (a = this.getStackPoints(a));
                    for (f = 0; f < a.length; f++)
                        if (
                            ((m = a[f].isNull),
                            (p = F(a[f].rectPlotX, a[f].plotX)),
                            (u = F(a[f].yBottom, A)),
                            !m || t)
                        )
                            t || E(f, f - 1, "left"),
                                (m && !r && t) ||
                                    (d.push(a[f]),
                                    w.push({ x: f, plotX: p, plotY: u })),
                                t || E(f, f + 1, "right");
                    f = e.call(this, d, !0, !0);
                    w.reversed = !0;
                    m = e.call(this, w, !0, !0);
                    m.length && (m[0] = "L");
                    m = f.concat(m);
                    e = e.call(this, d, !1, t);
                    m.xMap = f.xMap;
                    this.areaPath = m;
                    return e;
                },
                drawGraph: function () {
                    this.areaPath = [];
                    C.prototype.drawGraph.apply(this);
                    var a = this,
                        k = this.areaPath,
                        t = this.options,
                        r = [["area", "highcharts-area"]];
                    D(this.zones, function (a, f) {
                        r.push([
                            "zone-area-" + f,
                            "highcharts-area highcharts-zone-area-" +
                                f +
                                " " +
                                a.className,
                        ]);
                    });
                    D(r, function (e) {
                        var f = e[0],
                            m = a[f];
                        m
                            ? ((m.endX = k.xMap), m.animate({ d: k }))
                            : ((m = a[f] =
                                  a.chart.renderer
                                      .path(k)
                                      .addClass(e[1])
                                      .attr({ zIndex: 0 })
                                      .add(a.group)),
                              (m.isArea = !0));
                        m.startX = k.xMap;
                        m.shiftUnit = t.step ? 2 : 1;
                    });
                },
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            }
        );
    })(J);
    (function (a) {
        var D = a.pick;
        a = a.seriesType;
        a(
            "spline",
            "line",
            {},
            {
                getPointSpline: function (a, F, C) {
                    var u = F.plotX,
                        e = F.plotY,
                        k = a[C - 1];
                    C = a[C + 1];
                    var t, r, x, f;
                    if (
                        k &&
                        !k.isNull &&
                        !1 !== k.doCurve &&
                        !F.isCliff &&
                        C &&
                        !C.isNull &&
                        !1 !== C.doCurve &&
                        !F.isCliff
                    ) {
                        a = k.plotY;
                        x = C.plotX;
                        C = C.plotY;
                        var m = 0;
                        t = (1.5 * u + k.plotX) / 2.5;
                        r = (1.5 * e + a) / 2.5;
                        x = (1.5 * u + x) / 2.5;
                        f = (1.5 * e + C) / 2.5;
                        x !== t && (m = ((f - r) * (x - u)) / (x - t) + e - f);
                        r += m;
                        f += m;
                        r > a && r > e
                            ? ((r = Math.max(a, e)), (f = 2 * e - r))
                            : r < a &&
                              r < e &&
                              ((r = Math.min(a, e)), (f = 2 * e - r));
                        f > C && f > e
                            ? ((f = Math.max(C, e)), (r = 2 * e - f))
                            : f < C &&
                              f < e &&
                              ((f = Math.min(C, e)), (r = 2 * e - f));
                        F.rightContX = x;
                        F.rightContY = f;
                    }
                    F = [
                        "C",
                        D(k.rightContX, k.plotX),
                        D(k.rightContY, k.plotY),
                        D(t, u),
                        D(r, e),
                        u,
                        e,
                    ];
                    k.rightContX = k.rightContY = null;
                    return F;
                },
            }
        );
    })(J);
    (function (a) {
        var D = a.seriesTypes.area.prototype,
            B = a.seriesType;
        B("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: D.getStackPoints,
            getGraphPath: D.getGraphPath,
            drawGraph: D.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
        });
    })(J);
    (function (a) {
        var D = a.animObject,
            B = a.each,
            F = a.extend,
            C = a.isNumber,
            u = a.merge,
            e = a.pick,
            k = a.Series,
            t = a.seriesType,
            r = a.svg;
        t(
            "column",
            "line",
            {
                borderRadius: 0,
                crisp: !0,
                groupPadding: 0.2,
                marker: null,
                pointPadding: 0.1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: { hover: { halo: !1 } },
                dataLabels: { align: null, verticalAlign: null, y: null },
                softThreshold: !1,
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: { distance: 6 },
                threshold: 0,
            },
            {
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function () {
                    k.prototype.init.apply(this, arguments);
                    var a = this,
                        f = a.chart;
                    f.hasRendered &&
                        B(f.series, function (f) {
                            f.type === a.type && (f.isDirty = !0);
                        });
                },
                getColumnMetrics: function () {
                    var a = this,
                        f = a.options,
                        k = a.xAxis,
                        r = a.yAxis,
                        d = k.reversed,
                        b,
                        p = {},
                        t = 0;
                    !1 === f.grouping
                        ? (t = 1)
                        : B(a.chart.series, function (d) {
                              var l = d.options,
                                  g = d.yAxis,
                                  f;
                              d.type !== a.type ||
                                  (!d.visible &&
                                      a.chart.options.chart
                                          .ignoreHiddenSeries) ||
                                  r.len !== g.len ||
                                  r.pos !== g.pos ||
                                  (l.stacking
                                      ? ((b = d.stackKey),
                                        void 0 === p[b] && (p[b] = t++),
                                        (f = p[b]))
                                      : !1 !== l.grouping && (f = t++),
                                  (d.columnIndex = f));
                          });
                    var l = Math.min(
                            Math.abs(k.transA) *
                                (k.ordinalSlope ||
                                    f.pointRange ||
                                    k.closestPointRange ||
                                    k.tickInterval ||
                                    1),
                            k.len
                        ),
                        A = l * f.groupPadding,
                        u = (l - 2 * A) / (t || 1),
                        f = Math.min(
                            f.maxPointWidth || k.len,
                            e(f.pointWidth, u * (1 - 2 * f.pointPadding))
                        );
                    a.columnMetrics = {
                        width: f,
                        offset:
                            (u - f) / 2 +
                            (A +
                                ((a.columnIndex || 0) + (d ? 1 : 0)) * u -
                                l / 2) *
                                (d ? -1 : 1),
                    };
                    return a.columnMetrics;
                },
                crispCol: function (a, f, e, k) {
                    var d = this.chart,
                        b = this.borderWidth,
                        p = -(b % 2 ? 0.5 : 0),
                        b = b % 2 ? 0.5 : 1;
                    d.inverted && d.renderer.isVML && (b += 1);
                    this.options.crisp &&
                        ((e = Math.round(a + e) + p),
                        (a = Math.round(a) + p),
                        (e -= a));
                    k = Math.round(f + k) + b;
                    p = 0.5 >= Math.abs(f) && 0.5 < k;
                    f = Math.round(f) + b;
                    k -= f;
                    p && k && (--f, (k += 1));
                    return { x: a, y: f, width: e, height: k };
                },
                translate: function () {
                    var a = this,
                        f = a.chart,
                        m = a.options,
                        r = (a.dense =
                            2 > a.closestPointRange * a.xAxis.transA),
                        r = (a.borderWidth = e(m.borderWidth, r ? 0 : 1)),
                        d = a.yAxis,
                        b = (a.translatedThreshold = d.getThreshold(
                            m.threshold
                        )),
                        p = e(m.minPointLength, 5),
                        t = a.getColumnMetrics(),
                        l = t.width,
                        A = (a.barW = Math.max(l, 1 + 2 * r)),
                        u = (a.pointXOffset = t.offset);
                    f.inverted && (b -= 0.5);
                    m.pointPadding && (A = Math.ceil(A));
                    k.prototype.translate.apply(a);
                    B(a.points, function (k) {
                        var m = e(k.yBottom, b),
                            g = 999 + Math.abs(m),
                            g = Math.min(Math.max(-g, k.plotY), d.len + g),
                            y = k.plotX + u,
                            n = A,
                            c = Math.min(g, m),
                            h,
                            r = Math.max(g, m) - c;
                        p &&
                            Math.abs(r) < p &&
                            ((r = p),
                            (h =
                                (!d.reversed && !k.negative) ||
                                (d.reversed && k.negative)),
                            0 === k.y && 0 >= a.dataMax && (h = !h),
                            (c =
                                Math.abs(c - b) > p ? m - p : b - (h ? p : 0)));
                        k.barX = y;
                        k.pointWidth = l;
                        k.tooltipPos = f.inverted
                            ? [
                                  d.len + d.pos - f.plotLeft - g,
                                  a.xAxis.len - y - n / 2,
                                  r,
                              ]
                            : [y + n / 2, g + d.pos - f.plotTop, r];
                        k.shapeType = "rect";
                        k.shapeArgs = a.crispCol.apply(
                            a,
                            k.isNull ? [y, b, n, 0] : [y, c, n, r]
                        );
                    });
                },
                getSymbol: a.noop,
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
                drawGraph: function () {
                    this.group[this.dense ? "addClass" : "removeClass"](
                        "highcharts-dense-data"
                    );
                },
                drawPoints: function () {
                    var a = this,
                        f = this.chart,
                        e = a.options,
                        k = f.renderer,
                        d = e.animationLimit || 250,
                        b;
                    B(a.points, function (p) {
                        var m = p.graphic;
                        if (C(p.plotY) && null !== p.y) {
                            b = p.shapeArgs;
                            if (m)
                                m[f.pointCount < d ? "animate" : "attr"](u(b));
                            else
                                p.graphic = m = k[p.shapeType](b).add(
                                    p.group || a.group
                                );
                            e.borderRadius && m.attr({ r: e.borderRadius });
                            m.addClass(p.getClassName(), !0);
                        } else m && (p.graphic = m.destroy());
                    });
                },
                animate: function (a) {
                    var f = this,
                        e = this.yAxis,
                        k = f.options,
                        d = this.chart.inverted,
                        b = {},
                        p = d ? "translateX" : "translateY",
                        t;
                    r &&
                        (a
                            ? ((b.scaleY = 0.001),
                              (a = Math.min(
                                  e.pos + e.len,
                                  Math.max(e.pos, e.toPixels(k.threshold))
                              )),
                              d
                                  ? (b.translateX = a - e.len)
                                  : (b.translateY = a),
                              f.group.attr(b))
                            : ((t = f.group.attr(p)),
                              f.group.animate(
                                  { scaleY: 1 },
                                  F(D(f.options.animation), {
                                      step: function (a, d) {
                                          b[p] = t + d.pos * (e.pos - t);
                                          f.group.attr(b);
                                      },
                                  })
                              ),
                              (f.animate = null)));
                },
                remove: function () {
                    var a = this,
                        e = a.chart;
                    e.hasRendered &&
                        B(e.series, function (e) {
                            e.type === a.type && (e.isDirty = !0);
                        });
                    k.prototype.remove.apply(a, arguments);
                },
            }
        );
    })(J);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, { inverted: !0 });
    })(J);
    (function (a) {
        var D = a.Series;
        a = a.seriesType;
        a(
            "scatter",
            "line",
            {
                lineWidth: 0,
                findNearestPointBy: "xy",
                marker: { enabled: !0 },
                tooltip: {
                    headerFormat:
                        '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cspan class\x3d"highcharts-header"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                    pointFormat:
                        "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e",
                },
            },
            {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function () {
                    this.options.lineWidth && D.prototype.drawGraph.call(this);
                },
            }
        );
    })(J);
    (function (a) {
        var D = a.deg2rad,
            B = a.isNumber,
            F = a.pick,
            C = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    e = this.chart,
                    k = 2 * (a.slicedOffset || 0),
                    t = e.plotWidth - 2 * k,
                    e = e.plotHeight - 2 * k,
                    r = a.center,
                    r = [
                        F(r[0], "50%"),
                        F(r[1], "50%"),
                        a.size || "100%",
                        a.innerSize || 0,
                    ],
                    x = Math.min(t, e),
                    f,
                    m;
                for (f = 0; 4 > f; ++f)
                    (m = r[f]),
                        (a = 2 > f || (2 === f && /%$/.test(m))),
                        (r[f] = C(m, [t, e, x, r[2]][f]) + (a ? k : 0));
                r[3] > r[2] && (r[3] = r[2]);
                return r;
            },
            getStartAndEndRadians: function (a, e) {
                a = B(a) ? a : 0;
                e = B(e) && e > a && 360 > e - a ? e : a + 360;
                return { start: D * (a + -90), end: D * (e + -90) };
            },
        };
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.CenteredSeriesMixin,
            F = a.defined,
            C = a.each,
            u = a.extend,
            e = B.getStartAndEndRadians,
            k = a.inArray,
            t = a.noop,
            r = a.pick,
            x = a.Point,
            f = a.Series,
            m = a.seriesType,
            w = a.setAnimation;
        m(
            "pie",
            "line",
            {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    distance: 30,
                    enabled: !0,
                    formatter: function () {
                        return this.point.isNull ? void 0 : this.point.name;
                    },
                    x: 0,
                },
                ignoreHiddenPoint: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: { followPointer: !0 },
            },
            {
                isCartesian: !1,
                requireSorting: !1,
                directTouch: !0,
                noSharedTooltip: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                axisTypes: [],
                pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
                animate: function (a) {
                    var b = this,
                        d = b.points,
                        e = b.startAngleRad;
                    a ||
                        (C(d, function (a) {
                            var d = a.graphic,
                                l = a.shapeArgs;
                            d &&
                                (d.attr({
                                    r: a.startR || b.center[3] / 2,
                                    start: e,
                                    end: e,
                                }),
                                d.animate(
                                    { r: l.r, start: l.start, end: l.end },
                                    b.options.animation
                                ));
                        }),
                        (b.animate = null));
                },
                updateTotals: function () {
                    var a,
                        b = 0,
                        e = this.points,
                        f = e.length,
                        l,
                        k = this.options.ignoreHiddenPoint;
                    for (a = 0; a < f; a++)
                        (l = e[a]),
                            (b += k && !l.visible ? 0 : l.isNull ? 0 : l.y);
                    this.total = b;
                    for (a = 0; a < f; a++)
                        (l = e[a]),
                            (l.percentage =
                                0 < b && (l.visible || !k)
                                    ? (l.y / b) * 100
                                    : 0),
                            (l.total = b);
                },
                generatePoints: function () {
                    f.prototype.generatePoints.call(this);
                    this.updateTotals();
                },
                translate: function (a) {
                    this.generatePoints();
                    var b = 0,
                        d = this.options,
                        f = d.slicedOffset,
                        l = f + (d.borderWidth || 0),
                        k,
                        m,
                        t,
                        w = e(d.startAngle, d.endAngle),
                        g = (this.startAngleRad = w.start),
                        w = (this.endAngleRad = w.end) - g,
                        y = this.points,
                        n,
                        c = d.dataLabels.distance,
                        d = d.ignoreHiddenPoint,
                        h,
                        G = y.length,
                        v;
                    a || (this.center = a = this.getCenter());
                    this.getX = function (c, b, h) {
                        t = Math.asin(
                            Math.min(
                                (c - a[1]) / (a[2] / 2 + h.labelDistance),
                                1
                            )
                        );
                        return (
                            a[0] +
                            (b ? -1 : 1) *
                                Math.cos(t) *
                                (a[2] / 2 + h.labelDistance)
                        );
                    };
                    for (h = 0; h < G; h++) {
                        v = y[h];
                        v.labelDistance = r(
                            v.options.dataLabels &&
                                v.options.dataLabels.distance,
                            c
                        );
                        this.maxLabelDistance = Math.max(
                            this.maxLabelDistance || 0,
                            v.labelDistance
                        );
                        k = g + b * w;
                        if (!d || v.visible) b += v.percentage / 100;
                        m = g + b * w;
                        v.shapeType = "arc";
                        v.shapeArgs = {
                            x: a[0],
                            y: a[1],
                            r: a[2] / 2,
                            innerR: a[3] / 2,
                            start: Math.round(1e3 * k) / 1e3,
                            end: Math.round(1e3 * m) / 1e3,
                        };
                        t = (m + k) / 2;
                        t > 1.5 * Math.PI
                            ? (t -= 2 * Math.PI)
                            : t < -Math.PI / 2 && (t += 2 * Math.PI);
                        v.slicedTranslation = {
                            translateX: Math.round(Math.cos(t) * f),
                            translateY: Math.round(Math.sin(t) * f),
                        };
                        m = (Math.cos(t) * a[2]) / 2;
                        n = (Math.sin(t) * a[2]) / 2;
                        v.tooltipPos = [a[0] + 0.7 * m, a[1] + 0.7 * n];
                        v.half = t < -Math.PI / 2 || t > Math.PI / 2 ? 1 : 0;
                        v.angle = t;
                        k = Math.min(l, v.labelDistance / 5);
                        v.labelPos = [
                            a[0] + m + Math.cos(t) * v.labelDistance,
                            a[1] + n + Math.sin(t) * v.labelDistance,
                            a[0] + m + Math.cos(t) * k,
                            a[1] + n + Math.sin(t) * k,
                            a[0] + m,
                            a[1] + n,
                            0 > v.labelDistance
                                ? "center"
                                : v.half
                                ? "right"
                                : "left",
                            t,
                        ];
                    }
                },
                drawGraph: null,
                drawPoints: function () {
                    var a = this,
                        b = a.chart.renderer,
                        e,
                        f,
                        l;
                    C(a.points, function (d) {
                        f = d.graphic;
                        d.isNull
                            ? f && (d.graphic = f.destroy())
                            : ((l = d.shapeArgs),
                              (e = d.getTranslate()),
                              f
                                  ? f
                                        .setRadialReference(a.center)
                                        .animate(u(l, e))
                                  : ((d.graphic = f =
                                        b[d.shapeType](l)
                                            .setRadialReference(a.center)
                                            .attr(e)
                                            .add(a.group)),
                                    d.visible ||
                                        f.attr({ visibility: "hidden" })),
                              f.addClass(d.getClassName()));
                    });
                },
                searchPoint: t,
                sortByAngle: function (a, b) {
                    a.sort(function (a, d) {
                        return void 0 !== a.angle && (d.angle - a.angle) * b;
                    });
                },
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
                getCenter: B.getCenter,
                getSymbol: t,
            },
            {
                init: function () {
                    x.prototype.init.apply(this, arguments);
                    var a = this,
                        b;
                    a.name = r(a.name, "Slice");
                    b = function (b) {
                        a.slice("select" === b.type);
                    };
                    D(a, "select", b);
                    D(a, "unselect", b);
                    return a;
                },
                isValid: function () {
                    return a.isNumber(this.y, !0) && 0 <= this.y;
                },
                setVisible: function (a, b) {
                    var d = this,
                        e = d.series,
                        l = e.chart,
                        f = e.options.ignoreHiddenPoint;
                    b = r(b, f);
                    a !== d.visible &&
                        ((d.visible =
                            d.options.visible =
                            a =
                                void 0 === a ? !d.visible : a),
                        (e.options.data[k(d, e.data)] = d.options),
                        C(
                            [
                                "graphic",
                                "dataLabel",
                                "connector",
                                "shadowGroup",
                            ],
                            function (b) {
                                if (d[b]) d[b][a ? "show" : "hide"](!0);
                            }
                        ),
                        d.legendItem && l.legend.colorizeItem(d, a),
                        a || "hover" !== d.state || d.setState(""),
                        f && (e.isDirty = !0),
                        b && l.redraw());
                },
                slice: function (a, b, e) {
                    var d = this.series;
                    w(e, d.chart);
                    r(b, !0);
                    this.sliced = this.options.sliced = F(a) ? a : !this.sliced;
                    d.options.data[k(this, d.data)] = this.options;
                    this.graphic.animate(this.getTranslate());
                },
                getTranslate: function () {
                    return this.sliced
                        ? this.slicedTranslation
                        : { translateX: 0, translateY: 0 };
                },
                haloPath: function (a) {
                    var b = this.shapeArgs;
                    return this.sliced || !this.visible
                        ? []
                        : this.series.chart.renderer.symbols.arc(
                              b.x,
                              b.y,
                              b.r + a,
                              b.r + a,
                              {
                                  innerR: this.shapeArgs.r,
                                  start: b.start,
                                  end: b.end,
                              }
                          );
                },
            }
        );
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.arrayMax,
            F = a.defined,
            C = a.each,
            u = a.extend,
            e = a.format,
            k = a.map,
            t = a.merge,
            r = a.noop,
            x = a.pick,
            f = a.relativeLength,
            m = a.Series,
            w = a.seriesTypes,
            d = a.stableSort;
        a.distribute = function (a, e) {
            function b(a, b) {
                return a.target - b.target;
            }
            var l,
                f = !0,
                p = a,
                m = [],
                r;
            r = 0;
            for (l = a.length; l--; ) r += a[l].size;
            if (r > e) {
                d(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0);
                });
                for (r = l = 0; r <= e; ) (r += a[l].size), l++;
                m = a.splice(l - 1, a.length);
            }
            d(a, b);
            for (
                a = k(a, function (a) {
                    return { size: a.size, targets: [a.target] };
                });
                f;

            ) {
                for (l = a.length; l--; )
                    (f = a[l]),
                        (r =
                            (Math.min.apply(0, f.targets) +
                                Math.max.apply(0, f.targets)) /
                            2),
                        (f.pos = Math.min(
                            Math.max(0, r - f.size / 2),
                            e - f.size
                        ));
                l = a.length;
                for (f = !1; l--; )
                    0 < l &&
                        a[l - 1].pos + a[l - 1].size > a[l].pos &&
                        ((a[l - 1].size += a[l].size),
                        (a[l - 1].targets = a[l - 1].targets.concat(
                            a[l].targets
                        )),
                        a[l - 1].pos + a[l - 1].size > e &&
                            (a[l - 1].pos = e - a[l - 1].size),
                        a.splice(l, 1),
                        (f = !0));
            }
            l = 0;
            C(a, function (a) {
                var b = 0;
                C(a.targets, function () {
                    p[l].pos = a.pos + b;
                    b += p[l].size;
                    l++;
                });
            });
            p.push.apply(p, m);
            d(p, b);
        };
        m.prototype.drawDataLabels = function () {
            var b = this,
                d = b.options,
                f = d.dataLabels,
                l = b.points,
                k,
                m,
                r = b.hasRendered || 0,
                w,
                g,
                y = x(f.defer, !!d.animation),
                n = b.chart.renderer;
            if (f.enabled || b._hasPointLabels)
                b.dlProcessOptions && b.dlProcessOptions(f),
                    (g = b.plotGroup(
                        "dataLabelsGroup",
                        "data-labels",
                        y && !r ? "hidden" : "visible",
                        f.zIndex || 6
                    )),
                    y &&
                        (g.attr({ opacity: +r }),
                        r ||
                            D(b, "afterAnimate", function () {
                                b.visible && g.show(!0);
                                g[d.animation ? "animate" : "attr"](
                                    { opacity: 1 },
                                    { duration: 200 }
                                );
                            })),
                    (m = f),
                    C(l, function (c) {
                        var h,
                            d = c.dataLabel,
                            l,
                            q,
                            p = c.connector,
                            y = !d,
                            r;
                        k = c.dlOptions || (c.options && c.options.dataLabels);
                        if ((h = x(k && k.enabled, m.enabled) && !c.isNull))
                            (f = t(m, k)),
                                (l = c.getLabelConfig()),
                                (r = f[c.formatPrefix + "Format"] || f.format),
                                (w = F(r) ? e(r, l) : f.formatter.call(l, f)),
                                (l = f.rotation),
                                (q = {
                                    r: f.borderRadius || 0,
                                    rotation: l,
                                    padding: f.padding,
                                    zIndex: 1,
                                }),
                                a.objectEach(q, function (a, c) {
                                    void 0 === a && delete q[c];
                                });
                        !d || (h && F(w))
                            ? h &&
                              F(w) &&
                              (d
                                  ? (q.text = w)
                                  : ((d = c.dataLabel =
                                        n[l ? "text" : "label"](
                                            w,
                                            0,
                                            -9999,
                                            f.shape,
                                            null,
                                            null,
                                            f.useHTML,
                                            null,
                                            "data-label"
                                        )),
                                    d.addClass(
                                        "highcharts-data-label-color-" +
                                            c.colorIndex +
                                            " " +
                                            (f.className || "") +
                                            (f.useHTML
                                                ? "highcharts-tracker"
                                                : "")
                                    )),
                              d.attr(q),
                              d.added || d.add(g),
                              b.alignDataLabel(c, d, f, null, y))
                            : ((c.dataLabel = d = d.destroy()),
                              p && (c.connector = p.destroy()));
                    });
        };
        m.prototype.alignDataLabel = function (a, d, f, l, e) {
            var b = this.chart,
                k = b.inverted,
                p = x(a.plotX, -9999),
                g = x(a.plotY, -9999),
                m = d.getBBox(),
                n,
                c = f.rotation,
                h = f.align,
                r =
                    this.visible &&
                    (a.series.forceDL ||
                        b.isInsidePlot(p, Math.round(g), k) ||
                        (l &&
                            b.isInsidePlot(
                                p,
                                k ? l.x + 1 : l.y + l.height - 1,
                                k
                            ))),
                v = "justify" === x(f.overflow, "justify");
            if (
                r &&
                ((n = b.renderer.fontMetrics(void 0, d).b),
                (l = u(
                    {
                        x: k ? this.yAxis.len - g : p,
                        y: Math.round(k ? this.xAxis.len - p : g),
                        width: 0,
                        height: 0,
                    },
                    l
                )),
                u(f, { width: m.width, height: m.height }),
                c
                    ? ((v = !1),
                      (p = b.renderer.rotCorr(n, c)),
                      (p = {
                          x: l.x + f.x + l.width / 2 + p.x,
                          y:
                              l.y +
                              f.y +
                              { top: 0, middle: 0.5, bottom: 1 }[
                                  f.verticalAlign
                              ] *
                                  l.height,
                      }),
                      d[e ? "attr" : "animate"](p).attr({ align: h }),
                      (g = (c + 720) % 360),
                      (g = 180 < g && 360 > g),
                      "left" === h
                          ? (p.y -= g ? m.height : 0)
                          : "center" === h
                          ? ((p.x -= m.width / 2), (p.y -= m.height / 2))
                          : "right" === h &&
                            ((p.x -= m.width), (p.y -= g ? 0 : m.height)))
                    : (d.align(f, null, l), (p = d.alignAttr)),
                v
                    ? (a.isLabelJustified = this.justifyDataLabel(
                          d,
                          f,
                          p,
                          m,
                          l,
                          e
                      ))
                    : x(f.crop, !0) &&
                      (r =
                          b.isInsidePlot(p.x, p.y) &&
                          b.isInsidePlot(p.x + m.width, p.y + m.height)),
                f.shape && !c)
            )
                d[e ? "attr" : "animate"]({
                    anchorX: k ? b.plotWidth - a.plotY : a.plotX,
                    anchorY: k ? b.plotHeight - a.plotX : a.plotY,
                });
            r || (d.attr({ y: -9999 }), (d.placed = !1));
        };
        m.prototype.justifyDataLabel = function (a, d, f, l, e, k) {
            var b = this.chart,
                p = d.align,
                g = d.verticalAlign,
                m,
                n,
                c = a.box ? 0 : a.padding || 0;
            m = f.x + c;
            0 > m &&
                ("right" === p ? (d.align = "left") : (d.x = -m), (n = !0));
            m = f.x + l.width - c;
            m > b.plotWidth &&
                ("left" === p ? (d.align = "right") : (d.x = b.plotWidth - m),
                (n = !0));
            m = f.y + c;
            0 > m &&
                ("bottom" === g ? (d.verticalAlign = "top") : (d.y = -m),
                (n = !0));
            m = f.y + l.height - c;
            m > b.plotHeight &&
                ("top" === g
                    ? (d.verticalAlign = "bottom")
                    : (d.y = b.plotHeight - m),
                (n = !0));
            n && ((a.placed = !k), a.align(d, null, e));
            return n;
        };
        w.pie &&
            ((w.pie.prototype.drawDataLabels = function () {
                var b = this,
                    d = b.data,
                    f,
                    l = b.chart,
                    e = b.options.dataLabels,
                    k = x(e.connectorPadding, 10),
                    r = x(e.connectorWidth, 1),
                    t = l.plotWidth,
                    g = l.plotHeight,
                    y,
                    n = b.center,
                    c = n[2] / 2,
                    h = n[1],
                    w,
                    v,
                    q,
                    u,
                    L = [[], []],
                    K,
                    D,
                    Q,
                    P,
                    M = [0, 0, 0, 0];
                b.visible &&
                    (e.enabled || b._hasPointLabels) &&
                    (C(d, function (a) {
                        a.dataLabel &&
                            a.visible &&
                            a.dataLabel.shortened &&
                            (a.dataLabel
                                .attr({ width: "auto" })
                                .css({ width: "auto", textOverflow: "clip" }),
                            (a.dataLabel.shortened = !1));
                    }),
                    m.prototype.drawDataLabels.apply(b),
                    C(d, function (a) {
                        a.dataLabel &&
                            a.visible &&
                            (L[a.half].push(a), (a.dataLabel._pos = null));
                    }),
                    C(L, function (d, p) {
                        var m,
                            y,
                            r = d.length,
                            E = [],
                            G;
                        if (r)
                            for (
                                b.sortByAngle(d, p - 0.5),
                                    0 < b.maxLabelDistance &&
                                        ((m = Math.max(
                                            0,
                                            h - c - b.maxLabelDistance
                                        )),
                                        (y = Math.min(
                                            h + c + b.maxLabelDistance,
                                            l.plotHeight
                                        )),
                                        C(d, function (a) {
                                            0 < a.labelDistance &&
                                                a.dataLabel &&
                                                ((a.top = Math.max(
                                                    0,
                                                    h - c - a.labelDistance
                                                )),
                                                (a.bottom = Math.min(
                                                    h + c + a.labelDistance,
                                                    l.plotHeight
                                                )),
                                                (G =
                                                    a.dataLabel.getBBox()
                                                        .height || 21),
                                                (a.positionsIndex =
                                                    E.push({
                                                        target:
                                                            a.labelPos[1] -
                                                            a.top +
                                                            G / 2,
                                                        size: G,
                                                        rank: a.y,
                                                    }) - 1));
                                        }),
                                        a.distribute(E, y + G - m)),
                                    P = 0;
                                P < r;
                                P++
                            )
                                (f = d[P]),
                                    (y = f.positionsIndex),
                                    (q = f.labelPos),
                                    (w = f.dataLabel),
                                    (Q =
                                        !1 === f.visible
                                            ? "hidden"
                                            : "inherit"),
                                    (D = m = q[1]),
                                    E &&
                                        F(E[y]) &&
                                        (void 0 === E[y].pos
                                            ? (Q = "hidden")
                                            : ((u = E[y].size),
                                              (D = f.top + E[y].pos))),
                                    delete f.positionIndex,
                                    (K = e.justify
                                        ? n[0] +
                                          (p ? -1 : 1) * (c + f.labelDistance)
                                        : b.getX(
                                              D < f.top + 2 || D > f.bottom - 2
                                                  ? m
                                                  : D,
                                              p,
                                              f
                                          )),
                                    (w._attr = { visibility: Q, align: q[6] }),
                                    (w._pos = {
                                        x:
                                            K +
                                            e.x +
                                            ({ left: k, right: -k }[q[6]] || 0),
                                        y: D + e.y - 10,
                                    }),
                                    (q.x = K),
                                    (q.y = D),
                                    x(e.crop, !0) &&
                                        ((v = w.getBBox().width),
                                        (m = null),
                                        K - v < k
                                            ? ((m = Math.round(v - K + k)),
                                              (M[3] = Math.max(m, M[3])))
                                            : K + v > t - k &&
                                              ((m = Math.round(K + v - t + k)),
                                              (M[1] = Math.max(m, M[1]))),
                                        0 > D - u / 2
                                            ? (M[0] = Math.max(
                                                  Math.round(-D + u / 2),
                                                  M[0]
                                              ))
                                            : D + u / 2 > g &&
                                              (M[2] = Math.max(
                                                  Math.round(D + u / 2 - g),
                                                  M[2]
                                              )),
                                        (w.sideOverflow = m));
                    }),
                    0 === B(M) || this.verifyDataLabelOverflow(M)) &&
                    (this.placeDataLabels(),
                    r &&
                        C(this.points, function (a) {
                            var c;
                            y = a.connector;
                            if (
                                (w = a.dataLabel) &&
                                w._pos &&
                                a.visible &&
                                0 < a.labelDistance
                            ) {
                                Q = w._attr.visibility;
                                if ((c = !y))
                                    a.connector = y = l.renderer
                                        .path()
                                        .addClass(
                                            "highcharts-data-label-connector  highcharts-color-" +
                                                a.colorIndex
                                        )
                                        .add(b.dataLabelsGroup);
                                y[c ? "attr" : "animate"]({
                                    d: b.connectorPath(a.labelPos),
                                });
                                y.attr("visibility", Q);
                            } else y && (a.connector = y.destroy());
                        }));
            }),
            (w.pie.prototype.connectorPath = function (a) {
                var b = a.x,
                    d = a.y;
                return x(this.options.dataLabels.softConnector, !0)
                    ? [
                          "M",
                          b + ("left" === a[6] ? 5 : -5),
                          d,
                          "C",
                          b,
                          d,
                          2 * a[2] - a[4],
                          2 * a[3] - a[5],
                          a[2],
                          a[3],
                          "L",
                          a[4],
                          a[5],
                      ]
                    : [
                          "M",
                          b + ("left" === a[6] ? 5 : -5),
                          d,
                          "L",
                          a[2],
                          a[3],
                          "L",
                          a[4],
                          a[5],
                      ];
            }),
            (w.pie.prototype.placeDataLabels = function () {
                C(
                    this.points,
                    function (a) {
                        var b = a.dataLabel;
                        b &&
                            a.visible &&
                            ((a = b._pos)
                                ? (b.sideOverflow &&
                                      ((b._attr.width =
                                          b.getBBox().width - b.sideOverflow),
                                      b.css({
                                          width: b._attr.width + "px",
                                          textOverflow: "ellipsis",
                                      }),
                                      (b.shortened = !0)),
                                  b.attr(b._attr),
                                  b[b.moved ? "animate" : "attr"](a),
                                  (b.moved = !0))
                                : b && b.attr({ y: -9999 }));
                    },
                    this
                );
            }),
            (w.pie.prototype.alignDataLabel = r),
            (w.pie.prototype.verifyDataLabelOverflow = function (a) {
                var b = this.center,
                    d = this.options,
                    l = d.center,
                    e = d.minSize || 80,
                    k,
                    m = null !== d.size;
                m ||
                    (null !== l[0]
                        ? (k = Math.max(b[2] - Math.max(a[1], a[3]), e))
                        : ((k = Math.max(b[2] - a[1] - a[3], e)),
                          (b[0] += (a[3] - a[1]) / 2)),
                    null !== l[1]
                        ? (k = Math.max(
                              Math.min(k, b[2] - Math.max(a[0], a[2])),
                              e
                          ))
                        : ((k = Math.max(Math.min(k, b[2] - a[0] - a[2]), e)),
                          (b[1] += (a[0] - a[2]) / 2)),
                    k < b[2]
                        ? ((b[2] = k),
                          (b[3] = Math.min(f(d.innerSize || 0, k), k)),
                          this.translate(b),
                          this.drawDataLabels && this.drawDataLabels())
                        : (m = !0));
                return m;
            }));
        w.column &&
            (w.column.prototype.alignDataLabel = function (a, d, f, e, k) {
                var b = this.chart.inverted,
                    l = a.series,
                    p = a.dlBox || a.shapeArgs,
                    g = x(
                        a.below,
                        a.plotY > x(this.translatedThreshold, l.yAxis.len)
                    ),
                    y = x(f.inside, !!this.options.stacking);
                p &&
                    ((e = t(p)),
                    0 > e.y && ((e.height += e.y), (e.y = 0)),
                    (p = e.y + e.height - l.yAxis.len),
                    0 < p && (e.height -= p),
                    b &&
                        (e = {
                            x: l.yAxis.len - e.y - e.height,
                            y: l.xAxis.len - e.x - e.width,
                            width: e.height,
                            height: e.width,
                        }),
                    y ||
                        (b
                            ? ((e.x += g ? 0 : e.width), (e.width = 0))
                            : ((e.y += g ? e.height : 0), (e.height = 0))));
                f.align = x(f.align, !b || y ? "center" : g ? "right" : "left");
                f.verticalAlign = x(
                    f.verticalAlign,
                    b || y ? "middle" : g ? "top" : "bottom"
                );
                m.prototype.alignDataLabel.call(this, a, d, f, e, k);
                a.isLabelJustified &&
                    a.contrastColor &&
                    a.dataLabel.css({ color: a.contrastColor });
            });
    })(J);
    (function (a) {
        var D = a.Chart,
            B = a.each,
            F = a.objectEach,
            C = a.pick,
            u = a.addEvent;
        D.prototype.callbacks.push(function (a) {
            u(a, "render", function () {
                var e = [];
                B(a.labelCollectors || [], function (a) {
                    e = e.concat(a());
                });
                B(a.yAxis || [], function (a) {
                    a.options.stackLabels &&
                        !a.options.stackLabels.allowOverlap &&
                        F(a.stacks, function (a) {
                            F(a, function (a) {
                                e.push(a.label);
                            });
                        });
                });
                B(a.series || [], function (a) {
                    var k = a.options.dataLabels,
                        t = a.dataLabelCollections || ["dataLabel"];
                    (k.enabled || a._hasPointLabels) &&
                        !k.allowOverlap &&
                        a.visible &&
                        B(t, function (f) {
                            B(a.points, function (a) {
                                a[f] &&
                                    ((a[f].labelrank = C(
                                        a.labelrank,
                                        a.shapeArgs && a.shapeArgs.height
                                    )),
                                    e.push(a[f]));
                            });
                        });
                });
                a.hideOverlappingLabels(e);
            });
        });
        D.prototype.hideOverlappingLabels = function (a) {
            var e = a.length,
                t,
                r,
                u,
                f,
                m,
                w,
                d,
                b,
                p,
                z = function (a, b, d, f, e, g, k, n) {
                    return !(e > a + d || e + k < a || g > b + f || g + n < b);
                };
            for (r = 0; r < e; r++)
                if ((t = a[r]))
                    (t.oldOpacity = t.opacity),
                        (t.newOpacity = 1),
                        t.width ||
                            ((u = t.getBBox()),
                            (t.width = u.width),
                            (t.height = u.height));
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0);
            });
            for (r = 0; r < e; r++)
                for (u = a[r], t = r + 1; t < e; ++t)
                    if (
                        ((f = a[t]),
                        u &&
                            f &&
                            u !== f &&
                            u.placed &&
                            f.placed &&
                            0 !== u.newOpacity &&
                            0 !== f.newOpacity &&
                            ((m = u.alignAttr),
                            (w = f.alignAttr),
                            (d = u.parentGroup),
                            (b = f.parentGroup),
                            (p = 2 * (u.box ? 0 : u.padding || 0)),
                            (m = z(
                                m.x + d.translateX,
                                m.y + d.translateY,
                                u.width - p,
                                u.height - p,
                                w.x + b.translateX,
                                w.y + b.translateY,
                                f.width - p,
                                f.height - p
                            ))))
                    )
                        (u.labelrank < f.labelrank ? u : f).newOpacity = 0;
            B(a, function (a) {
                var b, d;
                a &&
                    ((d = a.newOpacity),
                    a.oldOpacity !== d &&
                        a.placed &&
                        (d
                            ? a.show(!0)
                            : (b = function () {
                                  a.hide();
                              }),
                        (a.alignAttr.opacity = d),
                        a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)),
                    (a.isOld = !0));
            });
        };
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.Chart,
            F = a.createElement,
            C = a.css,
            u = a.defaultOptions,
            e = a.defaultPlotOptions,
            k = a.each,
            t = a.extend,
            r = a.fireEvent,
            x = a.hasTouch,
            f = a.inArray,
            m = a.isObject,
            w = a.Legend,
            d = a.merge,
            b = a.pick,
            p = a.Point,
            z = a.Series,
            l = a.seriesTypes,
            A = a.svg,
            I;
        I = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart.pointer,
                    d = function (a) {
                        var d = b.getPointFromEvent(a);
                        void 0 !== d &&
                            ((b.isDirectTouch = !0), d.onMouseOver(a));
                    };
                k(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel &&
                        (a.dataLabel.div
                            ? (a.dataLabel.div.point = a)
                            : (a.dataLabel.element.point = a));
                });
                a._hasTracking ||
                    (k(a.trackerGroups, function (g) {
                        if (
                            a[g] &&
                            (a[g]
                                .addClass("highcharts-tracker")
                                .on("mouseover", d)
                                .on("mouseout", function (a) {
                                    b.onTrackerMouseOut(a);
                                }),
                            x)
                        )
                            a[g].on("touchstart", d);
                    }),
                    (a._hasTracking = !0));
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options.trackByArea,
                    d = [].concat(b ? a.areaPath : a.graphPath),
                    f = d.length,
                    e = a.chart,
                    c = e.pointer,
                    h = e.renderer,
                    l = e.options.tooltip.snap,
                    m = a.tracker,
                    q,
                    p = function () {
                        if (e.hoverSeries !== a) a.onMouseOver();
                    },
                    r = "rgba(192,192,192," + (A ? 0.0001 : 0.002) + ")";
                if (f && !b)
                    for (q = f + 1; q--; )
                        "M" === d[q] &&
                            d.splice(q + 1, 0, d[q + 1] - l, d[q + 2], "L"),
                            ((q && "M" === d[q]) || q === f) &&
                                d.splice(q, 0, "L", d[q - 2] + l, d[q - 1]);
                m
                    ? m.attr({ d: d })
                    : a.graph &&
                      ((a.tracker = h
                          .path(d)
                          .attr({
                              "stroke-linejoin": "round",
                              visibility: a.visible ? "visible" : "hidden",
                              stroke: r,
                              fill: b ? r : "none",
                              "stroke-width":
                                  a.graph.strokeWidth() + (b ? 0 : 2 * l),
                              zIndex: 2,
                          })
                          .add(a.group)),
                      k([a.tracker, a.markerGroup], function (a) {
                          a.addClass("highcharts-tracker")
                              .on("mouseover", p)
                              .on("mouseout", function (a) {
                                  c.onTrackerMouseOut(a);
                              });
                          if (x) a.on("touchstart", p);
                      }));
            },
        };
        l.column && (l.column.prototype.drawTracker = I.drawTrackerPoint);
        l.pie && (l.pie.prototype.drawTracker = I.drawTrackerPoint);
        l.scatter && (l.scatter.prototype.drawTracker = I.drawTrackerPoint);
        t(w.prototype, {
            setItemEvents: function (a, b, d) {
                var g = this.chart.renderer.boxWrapper,
                    e =
                        "highcharts-legend-" +
                        (a.series ? "point" : "series") +
                        "-active";
                (d ? b : a.legendGroup)
                    .on("mouseover", function () {
                        a.setState("hover");
                        g.addClass(e);
                    })
                    .on("mouseout", function () {
                        g.removeClass(e);
                        a.setState();
                    })
                    .on("click", function (c) {
                        var b = function () {
                            a.setVisible && a.setVisible();
                        };
                        c = { browserEvent: c };
                        a.firePointEvent
                            ? a.firePointEvent("legendItemClick", c, b)
                            : r(a, "legendItemClick", c, b);
                    });
            },
            createCheckboxForItem: function (a) {
                a.checkbox = F(
                    "input",
                    {
                        type: "checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected,
                    },
                    this.options.itemCheckboxStyle,
                    this.chart.container
                );
                D(a.checkbox, "click", function (b) {
                    r(
                        a.series || a,
                        "checkboxClick",
                        { checked: b.target.checked, item: a },
                        function () {
                            a.select();
                        }
                    );
                });
            },
        });
        t(B.prototype, {
            showResetZoom: function () {
                var a = this,
                    b = u.lang,
                    d = a.options.chart.resetZoomButton,
                    e = d.theme,
                    f = e.states,
                    c = "chart" === d.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer
                    .button(
                        b.resetZoom,
                        null,
                        null,
                        function () {
                            a.zoomOut();
                        },
                        e,
                        f && f.hover
                    )
                    .attr({ align: d.position.align, title: b.resetZoomTitle })
                    .addClass("highcharts-reset-zoom")
                    .add()
                    .align(d.position, !1, c);
            },
            zoomOut: function () {
                var a = this;
                r(a, "selection", { resetSelection: !0 }, function () {
                    a.zoom();
                });
            },
            zoom: function (a) {
                var d,
                    g = this.pointer,
                    e = !1,
                    f;
                !a || a.resetSelection
                    ? (k(this.axes, function (a) {
                          d = a.zoom();
                      }),
                      (g.initiated = !1))
                    : k(a.xAxis.concat(a.yAxis), function (a) {
                          var c = a.axis;
                          g[c.isXAxis ? "zoomX" : "zoomY"] &&
                              ((d = c.zoom(a.min, a.max)),
                              c.displayBtn && (e = !0));
                      });
                f = this.resetZoomButton;
                e && !f
                    ? this.showResetZoom()
                    : !e && m(f) && (this.resetZoomButton = f.destroy());
                d &&
                    this.redraw(
                        b(
                            this.options.chart.animation,
                            a && a.animation,
                            100 > this.pointCount
                        )
                    );
            },
            pan: function (a, b) {
                var d = this,
                    e = d.hoverPoints,
                    f;
                e &&
                    k(e, function (a) {
                        a.setState();
                    });
                k("xy" === b ? [1, 0] : [1], function (c) {
                    c = d[c ? "xAxis" : "yAxis"][0];
                    var b = c.horiz,
                        g = a[b ? "chartX" : "chartY"],
                        b = b ? "mouseDownX" : "mouseDownY",
                        e = d[b],
                        n = (c.pointRange || 0) / 2,
                        l = c.getExtremes(),
                        k = c.toValue(e - g, !0) + n,
                        n = c.toValue(e + c.len - g, !0) - n,
                        m = n < k,
                        e = m ? n : k,
                        k = m ? k : n,
                        n = Math.min(
                            l.dataMin,
                            c.toValue(c.toPixels(l.min) - c.minPixelPadding)
                        ),
                        m = Math.max(
                            l.dataMax,
                            c.toValue(c.toPixels(l.max) + c.minPixelPadding)
                        ),
                        p;
                    p = n - e;
                    0 < p && ((k += p), (e = n));
                    p = k - m;
                    0 < p && ((k = m), (e -= p));
                    c.series.length &&
                        e !== l.min &&
                        k !== l.max &&
                        (c.setExtremes(e, k, !1, !1, { trigger: "pan" }),
                        (f = !0));
                    d[b] = g;
                });
                f && d.redraw(!1);
                C(d.container, { cursor: "move" });
            },
        });
        t(p.prototype, {
            select: function (a, d) {
                var g = this,
                    e = g.series,
                    n = e.chart;
                a = b(a, !g.selected);
                g.firePointEvent(
                    a ? "select" : "unselect",
                    { accumulate: d },
                    function () {
                        g.selected = g.options.selected = a;
                        e.options.data[f(g, e.data)] = g.options;
                        g.setState(a && "select");
                        d ||
                            k(n.getSelectedPoints(), function (a) {
                                a.selected &&
                                    a !== g &&
                                    ((a.selected = a.options.selected = !1),
                                    (e.options.data[f(a, e.data)] = a.options),
                                    a.setState(""),
                                    a.firePointEvent("unselect"));
                            });
                    }
                );
            },
            onMouseOver: function (a) {
                var b = this.series.chart,
                    d = b.pointer;
                a = a
                    ? d.normalize(a)
                    : d.getChartCoordinatesFromPoint(this, b.inverted);
                d.runPointActions(a, this);
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                k(a.hoverPoints || [], function (a) {
                    a.setState();
                });
                a.hoverPoints = a.hoverPoint = null;
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this,
                        e = d(b.series.options.point, b.options).events;
                    b.events = e;
                    a.objectEach(e, function (a, d) {
                        D(b, d, a);
                    });
                    this.hasImportedEvents = !0;
                }
            },
            setState: function (a, d) {
                var g = Math.floor(this.plotX),
                    f = this.plotY,
                    n = this.series,
                    c = n.options.states[a] || {},
                    h = e[n.type].marker && n.options.marker,
                    l = h && !1 === h.enabled,
                    k = (h && h.states && h.states[a]) || {},
                    q = !1 === k.enabled,
                    m = n.stateMarkerGraphic,
                    p = this.marker || {},
                    r = n.chart,
                    t = n.halo,
                    w,
                    u = h && n.markerAttribs;
                a = a || "";
                if (
                    !(
                        (a === this.state && !d) ||
                        (this.selected && "select" !== a) ||
                        !1 === c.enabled ||
                        (a && (q || (l && !1 === k.enabled))) ||
                        (a &&
                            p.states &&
                            p.states[a] &&
                            !1 === p.states[a].enabled)
                    )
                ) {
                    u && (w = n.markerAttribs(this, a));
                    if (this.graphic)
                        this.state &&
                            this.graphic.removeClass(
                                "highcharts-point-" + this.state
                            ),
                            a && this.graphic.addClass("highcharts-point-" + a),
                            w &&
                                this.graphic.animate(
                                    w,
                                    b(
                                        r.options.chart.animation,
                                        k.animation,
                                        h.animation
                                    )
                                ),
                            m && m.hide();
                    else {
                        if (a && k)
                            if (
                                ((h = p.symbol || n.symbol),
                                m && m.currentSymbol !== h && (m = m.destroy()),
                                m)
                            )
                                m[d ? "animate" : "attr"]({ x: w.x, y: w.y });
                            else
                                h &&
                                    ((n.stateMarkerGraphic = m =
                                        r.renderer
                                            .symbol(
                                                h,
                                                w.x,
                                                w.y,
                                                w.width,
                                                w.height
                                            )
                                            .add(n.markerGroup)),
                                    (m.currentSymbol = h));
                        m &&
                            (m[
                                a && r.isInsidePlot(g, f, r.inverted)
                                    ? "show"
                                    : "hide"
                            ](),
                            (m.element.point = this));
                    }
                    (g = c.halo) && g.size
                        ? (t ||
                              (n.halo = t =
                                  r.renderer
                                      .path()
                                      .add((this.graphic || m).parentGroup)),
                          t[d ? "animate" : "attr"]({
                              d: this.haloPath(g.size),
                          }),
                          t.attr({
                              class:
                                  "highcharts-halo highcharts-color-" +
                                  b(this.colorIndex, n.colorIndex),
                          }),
                          (t.point = this))
                        : t &&
                          t.point &&
                          t.point.haloPath &&
                          t.animate({ d: t.point.haloPath(0) });
                    this.state = a;
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(
                    Math.floor(this.plotX) - a,
                    this.plotY - a,
                    2 * a,
                    2 * a
                );
            },
        });
        t(z.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && r(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this;
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    d = b.tooltip,
                    e = b.hoverPoint;
                b.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && r(this, "mouseOut");
                !d ||
                    this.stickyTracking ||
                    (d.shared && !this.noSharedTooltip) ||
                    d.hide();
                this.setState();
            },
            setState: function (a) {
                var b = this;
                a = a || "";
                b.state !== a &&
                    (k(
                        [b.group, b.markerGroup, b.dataLabelsGroup],
                        function (d) {
                            d &&
                                (b.state &&
                                    d.removeClass(
                                        "highcharts-series-" + b.state
                                    ),
                                a && d.addClass("highcharts-series-" + a));
                        }
                    ),
                    (b.state = a));
            },
            setVisible: function (a, b) {
                var d = this,
                    e = d.chart,
                    f = d.legendItem,
                    c,
                    h = e.options.chart.ignoreHiddenSeries,
                    l = d.visible;
                c = (d.visible =
                    a =
                    d.options.visible =
                    d.userOptions.visible =
                        void 0 === a ? !l : a)
                    ? "show"
                    : "hide";
                k(
                    [
                        "group",
                        "dataLabelsGroup",
                        "markerGroup",
                        "tracker",
                        "tt",
                    ],
                    function (a) {
                        if (d[a]) d[a][c]();
                    }
                );
                if (
                    e.hoverSeries === d ||
                    (e.hoverPoint && e.hoverPoint.series) === d
                )
                    d.onMouseOut();
                f && e.legend.colorizeItem(d, a);
                d.isDirty = !0;
                d.options.stacking &&
                    k(e.series, function (a) {
                        a.options.stacking && a.visible && (a.isDirty = !0);
                    });
                k(d.linkedSeries, function (c) {
                    c.setVisible(a, !1);
                });
                h && (e.isDirtyBox = !0);
                !1 !== b && e.redraw();
                r(d, c);
            },
            show: function () {
                this.setVisible(!0);
            },
            hide: function () {
                this.setVisible(!1);
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                r(this, a ? "select" : "unselect");
            },
            drawTracker: I.drawTrackerGraph,
        });
    })(J);
    (function (a) {
        var D = a.Chart,
            B = a.each,
            F = a.inArray,
            C = a.isArray,
            u = a.isObject,
            e = a.pick,
            k = a.splat;
        D.prototype.setResponsive = function (e) {
            var k = this.options.responsive,
                t = [],
                f = this.currentResponsive;
            k &&
                k.rules &&
                B(
                    k.rules,
                    function (f) {
                        void 0 === f._id && (f._id = a.uniqueKey());
                        this.matchResponsiveRule(f, t, e);
                    },
                    this
                );
            var m = a.merge.apply(
                    0,
                    a.map(t, function (e) {
                        return a.find(k.rules, function (a) {
                            return a._id === e;
                        }).chartOptions;
                    })
                ),
                t = t.toString() || void 0;
            t !== (f && f.ruleIds) &&
                (f && this.update(f.undoOptions, e),
                t
                    ? ((this.currentResponsive = {
                          ruleIds: t,
                          mergedOptions: m,
                          undoOptions: this.currentOptions(m),
                      }),
                      this.update(m, e))
                    : (this.currentResponsive = void 0));
        };
        D.prototype.matchResponsiveRule = function (a, k) {
            var r = a.condition;
            (
                r.callback ||
                function () {
                    return (
                        this.chartWidth <= e(r.maxWidth, Number.MAX_VALUE) &&
                        this.chartHeight <= e(r.maxHeight, Number.MAX_VALUE) &&
                        this.chartWidth >= e(r.minWidth, 0) &&
                        this.chartHeight >= e(r.minHeight, 0)
                    );
                }
            ).call(this) && k.push(a._id);
        };
        D.prototype.currentOptions = function (e) {
            function r(e, m, t, d) {
                var b;
                a.objectEach(e, function (a, f) {
                    if (!d && -1 < F(f, ["series", "xAxis", "yAxis"]))
                        for (
                            e[f] = k(e[f]), t[f] = [], b = 0;
                            b < e[f].length;
                            b++
                        )
                            m[f][b] &&
                                ((t[f][b] = {}),
                                r(a[b], m[f][b], t[f][b], d + 1));
                    else
                        u(a)
                            ? ((t[f] = C(a) ? [] : {}),
                              r(a, m[f] || {}, t[f], d + 1))
                            : (t[f] = m[f] || null);
                });
            }
            var t = {};
            r(e, this.options, t, 0);
            return t;
        };
    })(J);
    (function (a) {
        var D = a.addEvent,
            B = a.Axis,
            F = a.Chart,
            C = a.css,
            u = a.dateFormat,
            e = a.defined,
            k = a.each,
            t = a.extend,
            r = a.noop,
            x = a.pick,
            f = a.timeUnits,
            m = a.wrap;
        m(a.Series.prototype, "init", function (a) {
            var d;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (d = this.xAxis) &&
                d.options.ordinal &&
                D(this, "updatedData", function () {
                    delete d.ordinalIndex;
                });
        });
        m(B.prototype, "getTimeTicks", function (a, d, b, k, m, l, r, t) {
            var p = 0,
                w,
                g,
                y = {},
                n,
                c,
                h,
                G = [],
                v = -Number.MAX_VALUE,
                q = this.options.tickPixelInterval;
            if (
                (!this.options.ordinal && !this.options.breaks) ||
                !l ||
                3 > l.length ||
                void 0 === b
            )
                return a.call(this, d, b, k, m);
            c = l.length;
            for (w = 0; w < c; w++) {
                h = w && l[w - 1] > k;
                l[w] < b && (p = w);
                if (w === c - 1 || l[w + 1] - l[w] > 5 * r || h) {
                    if (l[w] > v) {
                        for (
                            g = a.call(this, d, l[p], l[w], m);
                            g.length && g[0] <= v;

                        )
                            g.shift();
                        g.length && (v = g[g.length - 1]);
                        G = G.concat(g);
                    }
                    p = w + 1;
                }
                if (h) break;
            }
            a = g.info;
            if (t && a.unitRange <= f.hour) {
                w = G.length - 1;
                for (p = 1; p < w; p++)
                    u("%d", G[p]) !== u("%d", G[p - 1]) &&
                        ((y[G[p]] = "day"), (n = !0));
                n && (y[G[0]] = "day");
                a.higherRanks = y;
            }
            G.info = a;
            if (t && e(q)) {
                t = a = G.length;
                w = [];
                var A;
                for (n = []; t--; )
                    (p = this.translate(G[t])),
                        A && (n[t] = A - p),
                        (w[t] = A = p);
                n.sort();
                n = n[Math.floor(n.length / 2)];
                n < 0.6 * q && (n = null);
                t = G[a - 1] > k ? a - 1 : a;
                for (A = void 0; t--; )
                    (p = w[t]),
                        (k = Math.abs(A - p)),
                        A && k < 0.8 * q && (null === n || k < 0.8 * n)
                            ? (y[G[t]] && !y[G[t + 1]]
                                  ? ((k = t + 1), (A = p))
                                  : (k = t),
                              G.splice(k, 1))
                            : (A = p);
            }
            return G;
        });
        t(B.prototype, {
            beforeSetTickPositions: function () {
                var a,
                    d = [],
                    b = !1,
                    f,
                    m = this.getExtremes(),
                    l = m.min,
                    r = m.max,
                    t,
                    u = this.isXAxis && !!this.options.breaks,
                    m = this.options.ordinal,
                    C = Number.MAX_SAFE_INTEGER,
                    g = this.chart.options.chart.ignoreHiddenSeries;
                f = "highcharts-navigator-xaxis" === this.options.className;
                !this.options.overscroll ||
                    this.max !== this.dataMax ||
                    (this.chart.mouseIsDown && !f) ||
                    (this.eventArgs &&
                        (!this.eventArgs ||
                            "navigator" === this.eventArgs.trigger)) ||
                    ((this.max += this.options.overscroll),
                    !f &&
                        e(this.userMin) &&
                        (this.min += this.options.overscroll));
                if (m || u) {
                    k(this.series, function (b, e) {
                        if (
                            !(
                                (g && !1 === b.visible) ||
                                (!1 === b.takeOrdinalPosition && !u)
                            ) &&
                            ((d = d.concat(b.processedXData)),
                            (a = d.length),
                            d.sort(function (a, b) {
                                return a - b;
                            }),
                            (C = Math.min(C, x(b.closestPointRange, C))),
                            a)
                        )
                            for (e = a - 1; e--; )
                                d[e] === d[e + 1] && d.splice(e, 1);
                    });
                    a = d.length;
                    if (2 < a) {
                        f = d[1] - d[0];
                        for (t = a - 1; t-- && !b; )
                            d[t + 1] - d[t] !== f && (b = !0);
                        !this.options.keepOrdinalPadding &&
                            (d[0] - l > f || r - d[d.length - 1] > f) &&
                            (b = !0);
                    } else
                        this.options.overscroll &&
                            (2 === a
                                ? (C = d[1] - d[0])
                                : 1 === a
                                ? ((C = this.options.overscroll),
                                  (d = [d[0], d[0] + C]))
                                : (C = this.overscrollPointsRange));
                    b
                        ? (this.options.overscroll &&
                              ((this.overscrollPointsRange = C),
                              (d = d.concat(this.getOverscrollPositions()))),
                          (this.ordinalPositions = d),
                          (f = this.ordinal2lin(Math.max(l, d[0]), !0)),
                          (t = Math.max(
                              this.ordinal2lin(
                                  Math.min(r, d[d.length - 1]),
                                  !0
                              ),
                              1
                          )),
                          (this.ordinalSlope = r = (r - l) / (t - f)),
                          (this.ordinalOffset = l - f * r))
                        : ((this.overscrollPointsRange = x(
                              this.closestPointRange,
                              this.overscrollPointsRange
                          )),
                          (this.ordinalPositions =
                              this.ordinalSlope =
                              this.ordinalOffset =
                                  void 0));
                }
                this.isOrdinal = m && b;
                this.groupIntervalFactor = null;
            },
            val2lin: function (a, d) {
                var b = this.ordinalPositions;
                if (b) {
                    var e = b.length,
                        f,
                        l;
                    for (f = e; f--; )
                        if (b[f] === a) {
                            l = f;
                            break;
                        }
                    for (f = e - 1; f--; )
                        if (a > b[f] || 0 === f) {
                            a = (a - b[f]) / (b[f + 1] - b[f]);
                            l = f + a;
                            break;
                        }
                    d = d
                        ? l
                        : this.ordinalSlope * (l || 0) + this.ordinalOffset;
                } else d = a;
                return d;
            },
            lin2val: function (a, d) {
                var b = this.ordinalPositions;
                if (b) {
                    var e = this.ordinalSlope,
                        f = this.ordinalOffset,
                        l = b.length - 1,
                        k;
                    if (d)
                        0 > a
                            ? (a = b[0])
                            : a > l
                            ? (a = b[l])
                            : ((l = Math.floor(a)), (k = a - l));
                    else
                        for (; l--; )
                            if (((d = e * l + f), a >= d)) {
                                e = e * (l + 1) + f;
                                k = (a - d) / (e - d);
                                break;
                            }
                    return void 0 !== k && void 0 !== b[l]
                        ? b[l] + (k ? k * (b[l + 1] - b[l]) : 0)
                        : a;
                }
                return a;
            },
            getExtendedPositions: function () {
                var a = this,
                    d = a.chart,
                    b = a.series[0].currentDataGrouping,
                    e = a.ordinalIndex,
                    f = b ? b.count + b.unitName : "raw",
                    l = a.options.overscroll,
                    m = a.getExtremes(),
                    t,
                    u;
                e || (e = a.ordinalIndex = {});
                e[f] ||
                    ((t = {
                        series: [],
                        chart: d,
                        getExtremes: function () {
                            return { min: m.dataMin, max: m.dataMax + l };
                        },
                        options: { ordinal: !0 },
                        val2lin: B.prototype.val2lin,
                        ordinal2lin: B.prototype.ordinal2lin,
                    }),
                    k(a.series, function (e) {
                        u = {
                            xAxis: t,
                            xData: e.xData.slice(),
                            chart: d,
                            destroyGroupedData: r,
                        };
                        u.xData = u.xData.concat(a.getOverscrollPositions());
                        u.options = {
                            dataGrouping: b
                                ? {
                                      enabled: !0,
                                      forced: !0,
                                      approximation: "open",
                                      units: [[b.unitName, [b.count]]],
                                  }
                                : { enabled: !1 },
                        };
                        e.processData.apply(u);
                        t.series.push(u);
                    }),
                    a.beforeSetTickPositions.apply(t),
                    (e[f] = t.ordinalPositions));
                return e[f];
            },
            getOverscrollPositions: function () {
                var e = this.options.overscroll,
                    d = this.overscrollPointsRange,
                    b = [],
                    f = this.dataMax;
                if (a.defined(d))
                    for (b.push(f); f <= this.dataMax + e; )
                        (f += d), b.push(f);
                return b;
            },
            getGroupIntervalFactor: function (a, d, b) {
                var e;
                b = b.processedXData;
                var f = b.length,
                    l = [];
                e = this.groupIntervalFactor;
                if (!e) {
                    for (e = 0; e < f - 1; e++) l[e] = b[e + 1] - b[e];
                    l.sort(function (a, b) {
                        return a - b;
                    });
                    l = l[Math.floor(f / 2)];
                    a = Math.max(a, b[0]);
                    d = Math.min(d, b[f - 1]);
                    this.groupIntervalFactor = e = (f * l) / (d - a);
                }
                return e;
            },
            postProcessTickInterval: function (a) {
                var d = this.ordinalSlope;
                return d
                    ? this.options.breaks
                        ? this.closestPointRange
                        : a / (d / this.closestPointRange)
                    : a;
            },
        });
        B.prototype.ordinal2lin = B.prototype.val2lin;
        m(F.prototype, "pan", function (a, d) {
            var b = this.xAxis[0],
                e = b.options.overscroll,
                f = d.chartX,
                l = !1;
            if (b.options.ordinal && b.series.length) {
                var m = this.mouseDownX,
                    r = b.getExtremes(),
                    t = r.dataMax,
                    u = r.min,
                    g = r.max,
                    y = this.hoverPoints,
                    n = b.closestPointRange || b.overscrollPointsRange,
                    m = (m - f) / (b.translationSlope * (b.ordinalSlope || n)),
                    c = { ordinalPositions: b.getExtendedPositions() },
                    n = b.lin2val,
                    h = b.val2lin,
                    w;
                c.ordinalPositions
                    ? 1 < Math.abs(m) &&
                      (y &&
                          k(y, function (a) {
                              a.setState();
                          }),
                      0 > m
                          ? ((y = c), (w = b.ordinalPositions ? b : c))
                          : ((y = b.ordinalPositions ? b : c), (w = c)),
                      (c = w.ordinalPositions),
                      t > c[c.length - 1] && c.push(t),
                      (this.fixedRange = g - u),
                      (m = b.toFixedRange(
                          null,
                          null,
                          n.apply(y, [h.apply(y, [u, !0]) + m, !0]),
                          n.apply(w, [h.apply(w, [g, !0]) + m, !0])
                      )),
                      m.min >= Math.min(r.dataMin, u) &&
                          m.max <= Math.max(t, g) + e &&
                          b.setExtremes(m.min, m.max, !0, !1, {
                              trigger: "pan",
                          }),
                      (this.mouseDownX = f),
                      C(this.container, { cursor: "move" }))
                    : (l = !0);
            } else l = !0;
            l &&
                (e && (b.max = b.dataMax + e),
                a.apply(this, Array.prototype.slice.call(arguments, 1)));
        });
    })(J);
    (function (a) {
        function D() {
            return Array.prototype.slice.call(arguments, 1);
        }
        function B(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, F(this.pointArrayMap, ["y"]));
        }
        var F = a.pick,
            C = a.wrap,
            u = a.each,
            e = a.extend,
            k = a.isArray,
            t = a.fireEvent,
            r = a.Axis,
            x = a.Series;
        e(r.prototype, {
            isInBreak: function (a, e) {
                var f = a.repeat || Infinity,
                    d = a.from,
                    b = a.to - a.from;
                e = e >= d ? (e - d) % f : f - ((d - e) % f);
                return a.inclusive ? e <= b : e < b && 0 !== e;
            },
            isInAnyBreak: function (a, e) {
                var f = this.options.breaks,
                    d = f && f.length,
                    b,
                    k,
                    m;
                if (d) {
                    for (; d--; )
                        this.isInBreak(f[d], a) &&
                            ((b = !0),
                            k ||
                                (k = F(
                                    f[d].showPoints,
                                    this.isXAxis ? !1 : !0
                                )));
                    m = b && e ? b && !k : b;
                }
                return m;
            },
        });
        C(r.prototype, "setTickPositions", function (a) {
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (this.options.breaks) {
                var e = this.tickPositions,
                    f = this.tickPositions.info,
                    d = [],
                    b;
                for (b = 0; b < e.length; b++)
                    this.isInAnyBreak(e[b]) || d.push(e[b]);
                this.tickPositions = d;
                this.tickPositions.info = f;
            }
        });
        C(r.prototype, "init", function (a, e, w) {
            var d = this;
            w.breaks && w.breaks.length && (w.ordinal = !1);
            a.call(this, e, w);
            a = this.options.breaks;
            d.isBroken = k(a) && !!a.length;
            d.isBroken &&
                ((d.val2lin = function (a) {
                    var b = a,
                        e,
                        f;
                    for (f = 0; f < d.breakArray.length; f++)
                        if (((e = d.breakArray[f]), e.to <= a)) b -= e.len;
                        else if (e.from >= a) break;
                        else if (d.isInBreak(e, a)) {
                            b -= a - e.from;
                            break;
                        }
                    return b;
                }),
                (d.lin2val = function (a) {
                    var b, e;
                    for (
                        e = 0;
                        e < d.breakArray.length &&
                        !((b = d.breakArray[e]), b.from >= a);
                        e++
                    )
                        b.to < a
                            ? (a += b.len)
                            : d.isInBreak(b, a) && (a += b.len);
                    return a;
                }),
                (d.setExtremes = function (a, d, e, f, k) {
                    for (; this.isInAnyBreak(a); ) a -= this.closestPointRange;
                    for (; this.isInAnyBreak(d); ) d -= this.closestPointRange;
                    r.prototype.setExtremes.call(this, a, d, e, f, k);
                }),
                (d.setAxisTranslation = function (a) {
                    r.prototype.setAxisTranslation.call(this, a);
                    a = d.options.breaks;
                    var b = [],
                        e = [],
                        f = 0,
                        k,
                        m,
                        w = d.userMin || d.min,
                        x = d.userMax || d.max,
                        g = F(d.pointRangePadding, 0),
                        y,
                        n;
                    u(a, function (a) {
                        m = a.repeat || Infinity;
                        d.isInBreak(a, w) && (w += (a.to % m) - (w % m));
                        d.isInBreak(a, x) && (x -= (x % m) - (a.from % m));
                    });
                    u(a, function (a) {
                        y = a.from;
                        for (m = a.repeat || Infinity; y - m > w; ) y -= m;
                        for (; y < w; ) y += m;
                        for (n = y; n < x; n += m)
                            b.push({ value: n, move: "in" }),
                                b.push({
                                    value: n + (a.to - a.from),
                                    move: "out",
                                    size: a.breakSize,
                                });
                    });
                    b.sort(function (a, b) {
                        return a.value === b.value
                            ? ("in" === a.move ? 0 : 1) -
                                  ("in" === b.move ? 0 : 1)
                            : a.value - b.value;
                    });
                    k = 0;
                    y = w;
                    u(b, function (a) {
                        k += "in" === a.move ? 1 : -1;
                        1 === k && "in" === a.move && (y = a.value);
                        0 === k &&
                            (e.push({
                                from: y,
                                to: a.value,
                                len: a.value - y - (a.size || 0),
                            }),
                            (f += a.value - y - (a.size || 0)));
                    });
                    d.breakArray = e;
                    d.unitLength = x - w - f + g;
                    t(d, "afterBreaks");
                    d.options.staticScale
                        ? (d.transA = d.options.staticScale)
                        : d.unitLength &&
                          (d.transA *= (x - d.min + g) / d.unitLength);
                    g && (d.minPixelPadding = d.transA * d.minPointOffset);
                    d.min = w;
                    d.max = x;
                }));
        });
        C(x.prototype, "generatePoints", function (a) {
            a.apply(this, D(arguments));
            var e = this.xAxis,
                f = this.yAxis,
                d = this.points,
                b,
                k = d.length,
                r = this.options.connectNulls,
                l;
            if (e && f && (e.options.breaks || f.options.breaks))
                for (; k--; )
                    (b = d[k]),
                        (l = null === b.y && !1 === r),
                        l ||
                            (!e.isInAnyBreak(b.x, !0) &&
                                !f.isInAnyBreak(b.y, !0)) ||
                            (d.splice(k, 1),
                            this.data[k] && this.data[k].destroyElements());
        });
        a.Series.prototype.drawBreaks = function (a, e) {
            var f = this,
                d = f.points,
                b,
                k,
                m,
                l;
            a &&
                u(e, function (e) {
                    b = a.breakArray || [];
                    k = a.isXAxis ? a.min : F(f.options.threshold, a.min);
                    u(d, function (d) {
                        l = F(d["stack" + e.toUpperCase()], d[e]);
                        u(b, function (b) {
                            m = !1;
                            if (
                                (k < b.from && l > b.to) ||
                                (k > b.from && l < b.from)
                            )
                                m = "pointBreak";
                            else if (
                                (k < b.from && l > b.from && l < b.to) ||
                                (k > b.from && l > b.to && l < b.from)
                            )
                                m = "pointInBreak";
                            m && t(a, m, { point: d, brk: b });
                        });
                    });
                });
        };
        a.Series.prototype.gappedPath = function () {
            var e = this.options.gapSize,
                k = this.points.slice(),
                r = k.length - 1,
                d = this.yAxis,
                b;
            if (e && 0 < r)
                for (
                    "value" !== this.options.gapUnit &&
                    (e *= this.closestPointRange);
                    r--;

                )
                    k[r + 1].x - k[r].x > e &&
                        ((b = (k[r].x + k[r + 1].x) / 2),
                        k.splice(r + 1, 0, { isNull: !0, x: b }),
                        this.options.stacking &&
                            ((b = d.stacks[this.stackKey][b] =
                                new a.StackItem(
                                    d,
                                    d.options.stackLabels,
                                    !1,
                                    b,
                                    this.stack
                                )),
                            (b.total = 0)));
            return this.getGraphPath(k);
        };
        C(a.seriesTypes.column.prototype, "drawPoints", B);
        C(a.Series.prototype, "drawPoints", B);
    })(J);
    (function (a) {
        var D = a.arrayMax,
            B = a.arrayMin,
            F = a.Axis,
            C = a.defaultPlotOptions,
            u = a.defined,
            e = a.each,
            k = a.extend,
            t = a.format,
            r = a.isNumber,
            x = a.merge,
            f = a.pick,
            m = a.Point,
            w = a.Tooltip,
            d = a.wrap,
            b = a.Series.prototype,
            p = b.processData,
            z = b.generatePoints,
            l = b.destroy,
            A = {
                approximation: "average",
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                    millisecond: [
                        "%A, %b %e, %H:%M:%S.%L",
                        "%A, %b %e, %H:%M:%S.%L",
                        "-%H:%M:%S.%L",
                    ],
                    second: [
                        "%A, %b %e, %H:%M:%S",
                        "%A, %b %e, %H:%M:%S",
                        "-%H:%M:%S",
                    ],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: [
                        "Week from %A, %b %e, %Y",
                        "%A, %b %e",
                        "-%A, %b %e, %Y",
                    ],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"],
                },
            },
            I = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: { approximation: "sum", groupPixelWidth: 10 },
                arearange: { approximation: "range" },
                areasplinerange: { approximation: "range" },
                columnrange: { approximation: "range", groupPixelWidth: 10 },
                candlestick: { approximation: "ohlc", groupPixelWidth: 10 },
                ohlc: { approximation: "ohlc", groupPixelWidth: 5 },
            },
            E = (a.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null],
            ]),
            H = (a.approximations = {
                sum: function (a) {
                    var b = a.length,
                        d;
                    if (!b && a.hasNulls) d = null;
                    else if (b) for (d = 0; b--; ) d += a[b];
                    return d;
                },
                average: function (a) {
                    var b = a.length;
                    a = H.sum(a);
                    r(a) && b && (a /= b);
                    return a;
                },
                averages: function () {
                    var a = [];
                    e(arguments, function (b) {
                        a.push(H.average(b));
                    });
                    return a;
                },
                open: function (a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0;
                },
                high: function (a) {
                    return a.length ? D(a) : a.hasNulls ? null : void 0;
                },
                low: function (a) {
                    return a.length ? B(a) : a.hasNulls ? null : void 0;
                },
                close: function (a) {
                    return a.length
                        ? a[a.length - 1]
                        : a.hasNulls
                        ? null
                        : void 0;
                },
                ohlc: function (a, b, d, c) {
                    a = H.open(a);
                    b = H.high(b);
                    d = H.low(d);
                    c = H.close(c);
                    if (r(a) || r(b) || r(d) || r(c)) return [a, b, d, c];
                },
                range: function (a, b) {
                    a = H.low(a);
                    b = H.high(b);
                    if (r(a) || r(b)) return [a, b];
                    if (null === a && null === b) return null;
                },
            });
        b.groupData = function (a, b, d, c) {
            var h = this.data,
                f = this.options.data,
                g = [],
                n = [],
                l = [],
                k = a.length,
                m,
                p,
                y = !!b,
                t = [];
            c =
                "function" === typeof c
                    ? c
                    : H[c] ||
                      (I[this.type] && H[I[this.type].approximation]) ||
                      H[A.approximation];
            var u = this.pointArrayMap,
                w = u && u.length,
                x = 0;
            p = 0;
            var z, E;
            w
                ? e(u, function () {
                      t.push([]);
                  })
                : t.push([]);
            z = w || 1;
            for (E = 0; E <= k && !(a[E] >= d[0]); E++);
            for (E; E <= k; E++) {
                for (; (void 0 !== d[x + 1] && a[E] >= d[x + 1]) || E === k; ) {
                    m = d[x];
                    this.dataGroupInfo = { start: p, length: t[0].length };
                    p = c.apply(this, t);
                    void 0 !== p &&
                        (g.push(m), n.push(p), l.push(this.dataGroupInfo));
                    p = E;
                    for (m = 0; m < z; m++)
                        (t[m].length = 0), (t[m].hasNulls = !1);
                    x += 1;
                    if (E === k) break;
                }
                if (E === k) break;
                if (u) {
                    m = this.cropStart + E;
                    var C =
                            (h && h[m]) ||
                            this.pointClass.prototype.applyOptions.apply(
                                { series: this },
                                [f[m]]
                            ),
                        B;
                    for (m = 0; m < w; m++)
                        (B = C[u[m]]),
                            r(B)
                                ? t[m].push(B)
                                : null === B && (t[m].hasNulls = !0);
                } else
                    (m = y ? b[E] : null),
                        r(m)
                            ? t[0].push(m)
                            : null === m && (t[0].hasNulls = !0);
            }
            return [g, n, l];
        };
        b.processData = function () {
            var a = this.chart,
                d = this.options.dataGrouping,
                e = !1 !== this.allowDG && d && f(d.enabled, a.options.isStock),
                c = this.visible || !a.options.chart.ignoreHiddenSeries,
                h;
            this.forceCrop = e;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== p.apply(this, arguments) && e) {
                this.destroyGroupedData();
                var l = this.processedXData,
                    k = this.processedYData,
                    q = a.plotSizeX,
                    a = this.xAxis,
                    m = a.options.ordinal,
                    r = (this.groupPixelWidth =
                        a.getGroupPixelWidth && a.getGroupPixelWidth());
                if (r) {
                    this.isDirty = h = !0;
                    this.points = null;
                    var t = a.getExtremes(),
                        e = t.min,
                        t = t.max,
                        m = (m && a.getGroupIntervalFactor(e, t, this)) || 1,
                        q = ((r * (t - e)) / q) * m,
                        r = a.getTimeTicks(
                            a.normalizeTimeTickInterval(q, d.units || E),
                            Math.min(e, l[0]),
                            Math.max(t, l[l.length - 1]),
                            a.options.startOfWeek,
                            l,
                            this.closestPointRange
                        ),
                        l = b.groupData.apply(this, [l, k, r, d.approximation]),
                        k = l[0],
                        m = l[1];
                    if (d.smoothed && k.length) {
                        d = k.length - 1;
                        for (k[d] = Math.min(k[d], t); d-- && 0 < d; )
                            k[d] += q / 2;
                        k[0] = Math.max(k[0], e);
                    }
                    this.currentDataGrouping = r.info;
                    this.closestPointRange = r.info.totalRange;
                    this.groupMap = l[2];
                    u(k[0]) &&
                        k[0] < a.dataMin &&
                        c &&
                        (a.min === a.dataMin && (a.min = k[0]),
                        (a.dataMin = k[0]));
                    this.processedXData = k;
                    this.processedYData = m;
                } else this.currentDataGrouping = this.groupMap = null;
                this.hasGroupedData = h;
            }
        };
        b.destroyGroupedData = function () {
            var a = this.groupedData;
            e(a || [], function (b, d) {
                b && (a[d] = b.destroy ? b.destroy() : null);
            });
            this.groupedData = null;
        };
        b.generatePoints = function () {
            z.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null;
        };
        d(m.prototype, "update", function (b) {
            this.dataGroup
                ? a.error(24)
                : b.apply(this, [].slice.call(arguments, 1));
        });
        d(w.prototype, "tooltipFooterHeaderFormatter", function (b, d, e) {
            var c = d.series,
                h = c.tooltipOptions,
                f = c.options.dataGrouping,
                g = h.xDateFormat,
                l,
                n = c.xAxis,
                m = a.dateFormat;
            return n && "datetime" === n.options.type && f && r(d.key)
                ? ((b = c.currentDataGrouping),
                  (f = f.dateTimeLabelFormats),
                  b
                      ? ((n = f[b.unitName]),
                        1 === b.count ? (g = n[0]) : ((g = n[1]), (l = n[2])))
                      : !g && f && (g = this.getXDateFormat(d, h, n)),
                  (g = m(g, d.key)),
                  l && (g += m(l, d.key + b.totalRange - 1)),
                  t(h[(e ? "footer" : "header") + "Format"], {
                      point: k(d.point, { key: g }),
                      series: c,
                  }))
                : b.call(this, d, e);
        });
        b.destroy = function () {
            for (var a = this.groupedData || [], b = a.length; b--; )
                a[b] && a[b].destroy();
            l.apply(this);
        };
        d(b, "setOptions", function (a, b) {
            a = a.call(this, b);
            var d = this.type,
                c = this.chart.options.plotOptions,
                h = C[d].dataGrouping;
            I[d] &&
                (h || (h = x(A, I[d])),
                (a.dataGrouping = x(
                    h,
                    c.series && c.series.dataGrouping,
                    c[d].dataGrouping,
                    b.dataGrouping
                )));
            this.chart.options.isStock && (this.requireSorting = !0);
            return a;
        });
        d(F.prototype, "setScale", function (a) {
            a.call(this);
            e(this.series, function (a) {
                a.hasProcessed = !1;
            });
        });
        F.prototype.getGroupPixelWidth = function () {
            var a = this.series,
                b = a.length,
                d,
                c = 0,
                h = !1,
                e;
            for (d = b; d--; )
                (e = a[d].options.dataGrouping) &&
                    (c = Math.max(c, e.groupPixelWidth));
            for (d = b; d--; )
                (e = a[d].options.dataGrouping) &&
                    a[d].hasProcessed &&
                    ((b = (a[d].processedXData || a[d].data).length),
                    a[d].groupPixelWidth ||
                        b > this.chart.plotSizeX / c ||
                        (b && e.forced)) &&
                    (h = !0);
            return h ? c : 0;
        };
        F.prototype.setDataGrouping = function (a, b) {
            var d;
            b = f(b, !0);
            a || (a = { forced: !1, units: null });
            if (this instanceof F)
                for (d = this.series.length; d--; )
                    this.series[d].update({ dataGrouping: a }, !1);
            else
                e(
                    this.chart.options.series,
                    function (c) {
                        c.dataGrouping = a;
                    },
                    !1
                );
            b && this.chart.redraw();
        };
    })(J);
    (function (a) {
        var D = a.each,
            B = a.Point,
            F = a.seriesType,
            C = a.seriesTypes;
        F(
            "ohlc",
            "column",
            {
                lineWidth: 1,
                tooltip: {
                    pointFormat:
                        '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e',
                },
                threshold: null,
                stickyTracking: !0,
            },
            {
                directTouch: !1,
                pointArrayMap: ["open", "high", "low", "close"],
                toYData: function (a) {
                    return [a.open, a.high, a.low, a.close];
                },
                pointValKey: "close",
                translate: function () {
                    var a = this,
                        e = a.yAxis,
                        k = !!a.modifyValue,
                        t = [
                            "plotOpen",
                            "plotHigh",
                            "plotLow",
                            "plotClose",
                            "yBottom",
                        ];
                    C.column.prototype.translate.apply(a);
                    D(a.points, function (r) {
                        D(
                            [r.open, r.high, r.low, r.close, r.low],
                            function (u, f) {
                                null !== u &&
                                    (k && (u = a.modifyValue(u)),
                                    (r[t[f]] = e.toPixels(u, !0)));
                            }
                        );
                        r.tooltipPos[1] = r.plotHigh + e.pos - a.chart.plotTop;
                    });
                },
                drawPoints: function () {
                    var a = this,
                        e = a.chart;
                    D(a.points, function (k) {
                        var t,
                            r,
                            u,
                            f,
                            m = k.graphic,
                            w,
                            d = !m;
                        void 0 !== k.plotY &&
                            (m ||
                                (k.graphic = m =
                                    e.renderer.path().add(a.group)),
                            (r = (m.strokeWidth() % 2) / 2),
                            (w = Math.round(k.plotX) - r),
                            (u = Math.round(k.shapeArgs.width / 2)),
                            (f = [
                                "M",
                                w,
                                Math.round(k.yBottom),
                                "L",
                                w,
                                Math.round(k.plotHigh),
                            ]),
                            null !== k.open &&
                                ((t = Math.round(k.plotOpen) + r),
                                f.push("M", w, t, "L", w - u, t)),
                            null !== k.close &&
                                ((t = Math.round(k.plotClose) + r),
                                f.push("M", w, t, "L", w + u, t)),
                            m[d ? "attr" : "animate"]({ d: f }).addClass(
                                k.getClassName(),
                                !0
                            ));
                    });
                },
                animate: null,
            },
            {
                getClassName: function () {
                    return (
                        B.prototype.getClassName.call(this) +
                        (this.open < this.close
                            ? " highcharts-point-up"
                            : " highcharts-point-down")
                    );
                },
            }
        );
    })(J);
    (function (a) {
        var D = a.defaultPlotOptions,
            B = a.each,
            F = a.merge;
        a = a.seriesType;
        a(
            "candlestick",
            "ohlc",
            F(D.column, {
                states: { hover: { lineWidth: 2 } },
                tooltip: D.ohlc.tooltip,
                threshold: null,
            }),
            {
                drawPoints: function () {
                    var a = this,
                        u = a.chart;
                    B(a.points, function (e) {
                        var k = e.graphic,
                            t,
                            r,
                            x,
                            f,
                            m,
                            w,
                            d,
                            b = !k;
                        void 0 !== e.plotY &&
                            (k ||
                                (e.graphic = k =
                                    u.renderer.path().add(a.group)),
                            (m = (k.strokeWidth() % 2) / 2),
                            (w = Math.round(e.plotX) - m),
                            (t = e.plotOpen),
                            (r = e.plotClose),
                            (x = Math.min(t, r)),
                            (t = Math.max(t, r)),
                            (d = Math.round(e.shapeArgs.width / 2)),
                            (r = Math.round(x) !== Math.round(e.plotHigh)),
                            (f = t !== e.yBottom),
                            (x = Math.round(x) + m),
                            (t = Math.round(t) + m),
                            (m = []),
                            m.push(
                                "M",
                                w - d,
                                t,
                                "L",
                                w - d,
                                x,
                                "L",
                                w + d,
                                x,
                                "L",
                                w + d,
                                t,
                                "Z",
                                "M",
                                w,
                                x,
                                "L",
                                w,
                                r ? Math.round(e.plotHigh) : x,
                                "M",
                                w,
                                t,
                                "L",
                                w,
                                f ? Math.round(e.yBottom) : t
                            ),
                            k[b ? "attr" : "animate"]({ d: m }).addClass(
                                e.getClassName(),
                                !0
                            ));
                    });
                },
            }
        );
    })(J);
    W = (function (a) {
        var D = a.each,
            B = a.seriesTypes,
            F = a.stableSort;
        return {
            translate: function () {
                B.column.prototype.translate.apply(this);
                var a = this.options,
                    u = this.chart,
                    e = this.points,
                    k = e.length - 1,
                    t,
                    r,
                    x = a.onSeries;
                t = x && u.get(x);
                var a = a.onKey || "y",
                    x = t && t.options.step,
                    f = t && t.points,
                    m = f && f.length,
                    w = this.xAxis,
                    d = this.yAxis,
                    b = w.getExtremes(),
                    p = 0,
                    z,
                    l,
                    A;
                if (t && t.visible && m)
                    for (
                        p = (t.pointXOffset || 0) + (t.barW || 0) / 2,
                            t = t.currentDataGrouping,
                            l = f[m - 1].x + (t ? t.totalRange : 0),
                            F(e, function (a, b) {
                                return a.x - b.x;
                            }),
                            a = "plot" + a[0].toUpperCase() + a.substr(1);
                        m-- &&
                        e[k] &&
                        !((t = e[k]),
                        (z = f[m]),
                        z.x <= t.x &&
                            void 0 !== z[a] &&
                            (t.x <= l &&
                                ((t.plotY = z[a]),
                                z.x < t.x &&
                                    !x &&
                                    (A = f[m + 1]) &&
                                    void 0 !== A[a] &&
                                    (t.plotY +=
                                        ((t.x - z.x) / (A.x - z.x)) *
                                        (A[a] - z[a]))),
                            k--,
                            m++,
                            0 > k));

                    );
                D(e, function (a, f) {
                    var l;
                    void 0 === a.plotY &&
                        (a.x >= b.min && a.x <= b.max
                            ? (a.plotY =
                                  u.chartHeight -
                                  w.bottom -
                                  (w.opposite ? w.height : 0) +
                                  w.offset -
                                  d.top)
                            : (a.shapeArgs = {}));
                    a.plotX += p;
                    (r = e[f - 1]) &&
                        r.plotX === a.plotX &&
                        (void 0 === r.stackIndex && (r.stackIndex = 0),
                        (l = r.stackIndex + 1));
                    a.stackIndex = l;
                });
            },
        };
    })(J);
    (function (a, D) {
        var B = a.addEvent,
            F = a.each,
            C = a.noop,
            u = a.seriesType,
            e = a.TrackerMixin,
            k = a.SVGRenderer.prototype.symbols;
        u(
            "flags",
            "column",
            {
                pointRange: 0,
                shape: "flag",
                stackDistance: 12,
                textAlign: "center",
                tooltip: { pointFormat: "{point.text}\x3cbr/\x3e" },
                threshold: null,
                y: -30,
            },
            {
                sorted: !1,
                noSharedTooltip: !0,
                allowDG: !1,
                takeOrdinalPosition: !1,
                trackerGroups: ["markerGroup"],
                forceCrop: !0,
                init: a.Series.prototype.init,
                translate: D.translate,
                drawPoints: function () {
                    var e = this.points,
                        k = this.chart,
                        u = k.renderer,
                        f,
                        m,
                        w = this.options,
                        d = w.y,
                        b,
                        p,
                        z,
                        l,
                        A,
                        B,
                        E,
                        C = this.yAxis;
                    for (p = e.length; p--; )
                        (z = e[p]),
                            (E = z.plotX > this.xAxis.len),
                            (f = z.plotX),
                            (l = z.stackIndex),
                            (b = z.options.shape || w.shape),
                            (m = z.plotY),
                            void 0 !== m &&
                                (m =
                                    z.plotY +
                                    d -
                                    (void 0 !== l && l * w.stackDistance)),
                            (A = l ? void 0 : z.plotX),
                            (B = l ? void 0 : z.plotY),
                            (l = z.graphic),
                            void 0 !== m && 0 <= f && !E
                                ? (l ||
                                      ((l = z.graphic =
                                          u
                                              .label(
                                                  "",
                                                  null,
                                                  null,
                                                  b,
                                                  null,
                                                  null,
                                                  w.useHTML
                                              )
                                              .attr({
                                                  align:
                                                      "flag" === b
                                                          ? "left"
                                                          : "center",
                                                  width: w.width,
                                                  height: w.height,
                                                  "text-align": w.textAlign,
                                              })
                                              .addClass("highcharts-point")
                                              .add(this.markerGroup)),
                                      z.graphic.div &&
                                          (z.graphic.div.point = z)),
                                  0 < f && (f -= l.strokeWidth() % 2),
                                  l.attr({
                                      text: z.options.title || w.title || "A",
                                      x: f,
                                      y: m,
                                      anchorX: A,
                                      anchorY: B,
                                  }),
                                  (z.tooltipPos = k.inverted
                                      ? [
                                            C.len + C.pos - k.plotLeft - m,
                                            this.xAxis.len - f,
                                        ]
                                      : [f, m + C.pos - k.plotTop]))
                                : l && (z.graphic = l.destroy());
                    w.useHTML &&
                        a.wrap(this.markerGroup, "on", function (b) {
                            return a.SVGElement.prototype.on.apply(
                                b.apply(this, [].slice.call(arguments, 1)),
                                [].slice.call(arguments, 1)
                            );
                        });
                },
                drawTracker: function () {
                    var a = this.points;
                    e.drawTrackerPoint.apply(this);
                    F(a, function (e) {
                        var k = e.graphic;
                        k &&
                            B(k.element, "mouseover", function () {
                                0 < e.stackIndex &&
                                    !e.raised &&
                                    ((e._y = k.y),
                                    k.attr({ y: e._y - 8 }),
                                    (e.raised = !0));
                                F(a, function (a) {
                                    a !== e &&
                                        a.raised &&
                                        a.graphic &&
                                        (a.graphic.attr({ y: a._y }),
                                        (a.raised = !1));
                                });
                            });
                    });
                },
                animate: C,
                buildKDTree: C,
                setClip: C,
            }
        );
        k.flag = function (a, e, k, f, m) {
            return [
                "M",
                (m && m.anchorX) || a,
                (m && m.anchorY) || e,
                "L",
                a,
                e + f,
                a,
                e,
                a + k,
                e,
                a + k,
                e + f,
                a,
                e + f,
                "Z",
            ];
        };
        F(["circle", "square"], function (a) {
            k[a + "pin"] = function (e, t, f, m, u) {
                var d = u && u.anchorX;
                u = u && u.anchorY;
                "circle" === a &&
                    m > f &&
                    ((e -= Math.round((m - f) / 2)), (f = m));
                e = k[a](e, t, f, m);
                d && u && e.push("M", d, t > u ? t : t + m, "L", d, u);
                return e;
            };
        });
    })(J, W);
    (function (a) {
        function D(a, b, d) {
            this.init(a, b, d);
        }
        var B = a.addEvent,
            F = a.Axis,
            C = a.correctFloat,
            u = a.defaultOptions,
            e = a.defined,
            k = a.destroyObjectProperties,
            t = a.each,
            r = a.fireEvent,
            x = a.hasTouch,
            f = a.isTouchDevice,
            m = a.merge,
            w = a.pick,
            d = a.removeEvent,
            b = a.wrap,
            p,
            z = {
                height: f ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: a.svg && !f,
                margin: 10,
                minWidth: 6,
                step: 0.2,
                zIndex: 3,
            };
        u.scrollbar = m(!0, z, u.scrollbar);
        a.swapXY = p = function (a, b) {
            var d = a.length,
                e;
            if (b)
                for (b = 0; b < d; b += 3)
                    (e = a[b + 1]), (a[b + 1] = a[b + 2]), (a[b + 2] = e);
            return a;
        };
        D.prototype = {
            init: function (a, b, d) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = b;
                this.options = m(z, b);
                this.chart = d;
                this.size = w(this.options.size, this.options.height);
                b.enabled &&
                    (this.render(), this.initEvents(), this.addEvents());
            },
            render: function () {
                var a = this.renderer,
                    b = this.options,
                    d = this.size,
                    e;
                this.group = e = a
                    .g("scrollbar")
                    .attr({ zIndex: b.zIndex, translateY: -99999 })
                    .add();
                this.track = a
                    .rect()
                    .addClass("highcharts-scrollbar-track")
                    .attr({
                        x: 0,
                        r: b.trackBorderRadius || 0,
                        height: d,
                        width: d,
                    })
                    .add(e);
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 });
                this.scrollbarGroup = a.g().add(e);
                this.scrollbar = a
                    .rect()
                    .addClass("highcharts-scrollbar-thumb")
                    .attr({ height: d, width: d, r: b.barBorderRadius || 0 })
                    .add(this.scrollbarGroup);
                this.scrollbarRifles = a
                    .path(
                        p(
                            [
                                "M",
                                -3,
                                d / 4,
                                "L",
                                -3,
                                (2 * d) / 3,
                                "M",
                                0,
                                d / 4,
                                "L",
                                0,
                                (2 * d) / 3,
                                "M",
                                3,
                                d / 4,
                                "L",
                                3,
                                (2 * d) / 3,
                            ],
                            b.vertical
                        )
                    )
                    .addClass("highcharts-scrollbar-rifles")
                    .add(this.scrollbarGroup);
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(
                    (-this.scrollbarStrokeWidth % 2) / 2,
                    (-this.scrollbarStrokeWidth % 2) / 2
                );
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1);
            },
            position: function (a, b, d, e) {
                var f = this.options.vertical,
                    g = 0,
                    l = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = b + this.trackBorderWidth;
                this.width = d;
                this.xOffset = this.height = e;
                this.yOffset = g;
                f
                    ? ((this.width = this.yOffset = d = g = this.size),
                      (this.xOffset = b = 0),
                      (this.barWidth = e - 2 * d),
                      (this.x = a += this.options.margin))
                    : ((this.height = this.xOffset = e = b = this.size),
                      (this.barWidth = d - 2 * e),
                      (this.y += this.options.margin));
                this.group[l]({ translateX: a, translateY: this.y });
                this.track[l]({ width: d, height: e });
                this.scrollbarButtons[1][l]({
                    translateX: f ? 0 : d - b,
                    translateY: f ? e - g : 0,
                });
            },
            drawScrollbarButton: function (a) {
                var b = this.renderer,
                    d = this.scrollbarButtons,
                    e = this.options,
                    f = this.size,
                    g;
                g = b.g().add(this.group);
                d.push(g);
                g = b.rect().addClass("highcharts-scrollbar-button").add(g);
                g.attr(
                    g.crisp(
                        {
                            x: -0.5,
                            y: -0.5,
                            width: f + 1,
                            height: f + 1,
                            r: e.buttonBorderRadius,
                        },
                        g.strokeWidth()
                    )
                );
                b.path(
                    p(
                        [
                            "M",
                            f / 2 + (a ? -1 : 1),
                            f / 2 - 3,
                            "L",
                            f / 2 + (a ? -1 : 1),
                            f / 2 + 3,
                            "L",
                            f / 2 + (a ? 2 : -2),
                            f / 2,
                        ],
                        e.vertical
                    )
                )
                    .addClass("highcharts-scrollbar-arrow")
                    .add(d[a]);
            },
            setRange: function (a, b) {
                var d = this.options,
                    f = d.vertical,
                    l = d.minWidth,
                    g = this.barWidth,
                    k,
                    n,
                    c = this.rendered && !this.hasDragged ? "animate" : "attr";
                e(g) &&
                    ((a = Math.max(a, 0)),
                    (k = Math.ceil(g * a)),
                    (this.calculatedWidth = n = C(g * Math.min(b, 1) - k)),
                    n < l && ((k = (g - l + n) * a), (n = l)),
                    (l = Math.floor(k + this.xOffset + this.yOffset)),
                    (g = n / 2 - 0.5),
                    (this.from = a),
                    (this.to = b),
                    f
                        ? (this.scrollbarGroup[c]({ translateY: l }),
                          this.scrollbar[c]({ height: n }),
                          this.scrollbarRifles[c]({ translateY: g }),
                          (this.scrollbarTop = l),
                          (this.scrollbarLeft = 0))
                        : (this.scrollbarGroup[c]({ translateX: l }),
                          this.scrollbar[c]({ width: n }),
                          this.scrollbarRifles[c]({ translateX: g }),
                          (this.scrollbarLeft = l),
                          (this.scrollbarTop = 0)),
                    12 >= n
                        ? this.scrollbarRifles.hide()
                        : this.scrollbarRifles.show(!0),
                    !1 === d.showFull &&
                        (0 >= a && 1 <= b
                            ? this.group.hide()
                            : this.group.show()),
                    (this.rendered = !0));
            },
            initEvents: function () {
                var a = this;
                a.mouseMoveHandler = function (b) {
                    var d = a.chart.pointer.normalize(b),
                        e = a.options.vertical ? "chartY" : "chartX",
                        f = a.initPositions;
                    !a.grabbedCenter ||
                        (b.touches && 0 === b.touches[0][e]) ||
                        ((d = a.cursorToScrollbarPosition(d)[e]),
                        (e = a[e]),
                        (e = d - e),
                        (a.hasDragged = !0),
                        a.updatePosition(f[0] + e, f[1] + e),
                        a.hasDragged &&
                            r(a, "changed", {
                                from: a.from,
                                to: a.to,
                                trigger: "scrollbar",
                                DOMType: b.type,
                                DOMEvent: b,
                            }));
                };
                a.mouseUpHandler = function (b) {
                    a.hasDragged &&
                        r(a, "changed", {
                            from: a.from,
                            to: a.to,
                            trigger: "scrollbar",
                            DOMType: b.type,
                            DOMEvent: b,
                        });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null;
                };
                a.mouseDownHandler = function (b) {
                    b = a.chart.pointer.normalize(b);
                    b = a.cursorToScrollbarPosition(b);
                    a.chartX = b.chartX;
                    a.chartY = b.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0;
                };
                a.buttonToMinClick = function (b) {
                    var d = C(a.to - a.from) * a.options.step;
                    a.updatePosition(C(a.from - d), C(a.to - d));
                    r(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b,
                    });
                };
                a.buttonToMaxClick = function (b) {
                    var d = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + d, a.to + d);
                    r(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b,
                    });
                };
                a.trackClick = function (b) {
                    var d = a.chart.pointer.normalize(b),
                        e = a.to - a.from,
                        f = a.y + a.scrollbarTop,
                        g = a.x + a.scrollbarLeft;
                    (a.options.vertical && d.chartY > f) ||
                    (!a.options.vertical && d.chartX > g)
                        ? a.updatePosition(a.from + e, a.to + e)
                        : a.updatePosition(a.from - e, a.to - e);
                    r(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b,
                    });
                };
            },
            cursorToScrollbarPosition: function (a) {
                var b = this.options,
                    b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return {
                    chartX:
                        (a.chartX - this.x - this.xOffset) /
                        (this.barWidth - b),
                    chartY:
                        (a.chartY - this.y - this.yOffset) /
                        (this.barWidth - b),
                };
            },
            updatePosition: function (a, b) {
                1 < b && ((a = C(1 - C(b - a))), (b = 1));
                0 > a && ((b = C(b - a)), (a = 0));
                this.from = a;
                this.to = b;
            },
            update: function (a) {
                this.destroy();
                this.init(
                    this.chart.renderer,
                    m(!0, this.options, a),
                    this.chart
                );
            },
            addEvents: function () {
                var a = this.options.inverted ? [1, 0] : [0, 1],
                    b = this.scrollbarButtons,
                    d = this.scrollbarGroup.element,
                    e = this.mouseDownHandler,
                    f = this.mouseMoveHandler,
                    g = this.mouseUpHandler,
                    a = [
                        [b[a[0]].element, "click", this.buttonToMinClick],
                        [b[a[1]].element, "click", this.buttonToMaxClick],
                        [this.track.element, "click", this.trackClick],
                        [d, "mousedown", e],
                        [d.ownerDocument, "mousemove", f],
                        [d.ownerDocument, "mouseup", g],
                    ];
                x &&
                    a.push(
                        [d, "touchstart", e],
                        [d.ownerDocument, "touchmove", f],
                        [d.ownerDocument, "touchend", g]
                    );
                t(a, function (a) {
                    B.apply(null, a);
                });
                this._events = a;
            },
            removeEvents: function () {
                t(this._events, function (a) {
                    d.apply(null, a);
                });
                this._events.length = 0;
            },
            destroy: function () {
                var a = this.chart.scroller;
                this.removeEvents();
                t(
                    [
                        "track",
                        "scrollbarRifles",
                        "scrollbar",
                        "scrollbarGroup",
                        "group",
                    ],
                    function (a) {
                        this[a] &&
                            this[a].destroy &&
                            (this[a] = this[a].destroy());
                    },
                    this
                );
                a &&
                    this === a.scrollbar &&
                    ((a.scrollbar = null), k(a.scrollbarButtons));
            },
        };
        b(F.prototype, "init", function (a) {
            var b = this;
            a.apply(b, Array.prototype.slice.call(arguments, 1));
            b.options.scrollbar &&
                b.options.scrollbar.enabled &&
                ((b.options.scrollbar.vertical = !b.horiz),
                (b.options.startOnTick = b.options.endOnTick = !1),
                (b.scrollbar = new D(
                    b.chart.renderer,
                    b.options.scrollbar,
                    b.chart
                )),
                B(b.scrollbar, "changed", function (a) {
                    var d = Math.min(w(b.options.min, b.min), b.min, b.dataMin),
                        e =
                            Math.max(
                                w(b.options.max, b.max),
                                b.max,
                                b.dataMax
                            ) - d,
                        f;
                    (b.horiz && !b.reversed) || (!b.horiz && b.reversed)
                        ? ((f = d + e * this.to), (d += e * this.from))
                        : ((f = d + e * (1 - this.from)),
                          (d += e * (1 - this.to)));
                    b.setExtremes(d, f, !0, !1, a);
                }));
        });
        b(F.prototype, "render", function (a) {
            var b = Math.min(
                    w(this.options.min, this.min),
                    this.min,
                    w(this.dataMin, this.min)
                ),
                d = Math.max(
                    w(this.options.max, this.max),
                    this.max,
                    w(this.dataMax, this.max)
                ),
                f = this.scrollbar,
                k = this.titleOffset || 0;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (f) {
                this.horiz
                    ? (f.position(
                          this.left,
                          this.top +
                              this.height +
                              2 +
                              this.chart.scrollbarsOffsets[1] +
                              (this.opposite
                                  ? 0
                                  : k + this.axisTitleMargin + this.offset),
                          this.width,
                          this.height
                      ),
                      (k = 1))
                    : (f.position(
                          this.left +
                              this.width +
                              2 +
                              this.chart.scrollbarsOffsets[0] +
                              (this.opposite
                                  ? k + this.axisTitleMargin + this.offset
                                  : 0),
                          this.top,
                          this.width,
                          this.height
                      ),
                      (k = 0));
                if (
                    (!this.opposite && !this.horiz) ||
                    (this.opposite && this.horiz)
                )
                    this.chart.scrollbarsOffsets[k] +=
                        this.scrollbar.size + this.scrollbar.options.margin;
                isNaN(b) || isNaN(d) || !e(this.min) || !e(this.max)
                    ? f.setRange(0, 0)
                    : ((k = (this.min - b) / (d - b)),
                      (b = (this.max - b) / (d - b)),
                      (this.horiz && !this.reversed) ||
                      (!this.horiz && this.reversed)
                          ? f.setRange(k, b)
                          : f.setRange(1 - b, 1 - k));
            }
        });
        b(F.prototype, "getOffset", function (a) {
            var b = this.horiz ? 2 : 1,
                d = this.scrollbar;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            d &&
                ((this.chart.scrollbarsOffsets = [0, 0]),
                (this.chart.axisOffset[b] += d.size + d.options.margin));
        });
        b(F.prototype, "destroy", function (a) {
            this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
            a.apply(this, Array.prototype.slice.call(arguments, 1));
        });
        a.Scrollbar = D;
    })(J);
    (function (a) {
        function D(a) {
            this.init(a);
        }
        var B = a.addEvent,
            F = a.Axis,
            C = a.Chart,
            u = a.defaultOptions,
            e = a.defined,
            k = a.destroyObjectProperties,
            t = a.each,
            r = a.erase,
            x = a.error,
            f = a.extend,
            m = a.grep,
            w = a.hasTouch,
            d = a.isArray,
            b = a.isNumber,
            p = a.isObject,
            z = a.merge,
            l = a.pick,
            A = a.removeEvent,
            I = a.Scrollbar,
            E = a.Series,
            H = a.seriesTypes,
            g = a.wrap,
            y = [].concat(a.defaultDataGroupingUnits),
            n = function (a) {
                var c = m(arguments, b);
                if (c.length) return Math[a].apply(0, c);
            };
        y[4] = ["day", [1, 2, 3, 4]];
        y[5] = ["week", [1, 2, 3]];
        f(u, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                },
                series: {
                    type: void 0 === H.areaspline ? "line" : "areaspline",
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: y,
                    },
                    dataLabels: { enabled: !1, zIndex: 2 },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: { enabled: !1 },
                    pointRange: 0,
                    threshold: null,
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    tickPixelInterval: 200,
                    labels: { align: "left", x: 3, y: -4 },
                    crosshair: !1,
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0.1,
                    maxPadding: 0.1,
                    labels: { enabled: !1 },
                    crosshair: !1,
                    title: { text: null },
                    tickLength: 0,
                    tickWidth: 0,
                },
            },
        });
        a.Renderer.prototype.symbols["navigator-handle"] = function (
            a,
            b,
            d,
            e,
            f
        ) {
            a = f.width / 2;
            b = Math.round(a / 3) + 0.5;
            f = f.height;
            return [
                "M",
                -a - 1,
                0.5,
                "L",
                a,
                0.5,
                "L",
                a,
                f + 0.5,
                "L",
                -a - 1,
                f + 0.5,
                "L",
                -a - 1,
                0.5,
                "M",
                -b,
                4,
                "L",
                -b,
                f - 3,
                "M",
                b - 1,
                4,
                "L",
                b - 1,
                f - 3,
            ];
        };
        D.prototype = {
            drawHandle: function (a, b, d, e) {
                var c = this.navigatorOptions.handles.height;
                this.handles[b][e](
                    d
                        ? {
                              translateX: Math.round(
                                  this.left + this.height / 2
                              ),
                              translateY: Math.round(
                                  this.top + parseInt(a, 10) + 0.5 - c
                              ),
                          }
                        : {
                              translateX: Math.round(
                                  this.left + parseInt(a, 10)
                              ),
                              translateY: Math.round(
                                  this.top + this.height / 2 - c / 2 - 1
                              ),
                          }
                );
            },
            drawOutline: function (a, b, d, e) {
                var c = this.navigatorOptions.maskInside,
                    h = this.outline.strokeWidth(),
                    f = h / 2,
                    h = (h % 2) / 2,
                    g = this.outlineHeight,
                    n = this.scrollbarHeight,
                    k = this.size,
                    l = this.left - n,
                    m = this.top;
                d
                    ? ((l -= f),
                      (d = m + b + h),
                      (b = m + a + h),
                      (a = [
                          "M",
                          l + g,
                          m - n - h,
                          "L",
                          l + g,
                          d,
                          "L",
                          l,
                          d,
                          "L",
                          l,
                          b,
                          "L",
                          l + g,
                          b,
                          "L",
                          l + g,
                          m + k + n,
                      ].concat(
                          c ? ["M", l + g, d - f, "L", l + g, b + f] : []
                      )))
                    : ((a += l + n - h),
                      (b += l + n - h),
                      (m += f),
                      (a = [
                          "M",
                          l,
                          m,
                          "L",
                          a,
                          m,
                          "L",
                          a,
                          m + g,
                          "L",
                          b,
                          m + g,
                          "L",
                          b,
                          m,
                          "L",
                          l + k + 2 * n,
                          m,
                      ].concat(c ? ["M", a - f, m, "L", b + f, m] : [])));
                this.outline[e]({ d: a });
            },
            drawMasks: function (a, b, d, e) {
                var c = this.left,
                    h = this.top,
                    f = this.height,
                    g,
                    n,
                    k,
                    l;
                d
                    ? ((k = [c, c, c]),
                      (l = [h, h + a, h + b]),
                      (n = [f, f, f]),
                      (g = [a, b - a, this.size - b]))
                    : ((k = [c, c + a, c + b]),
                      (l = [h, h, h]),
                      (n = [a, b - a, this.size - b]),
                      (g = [f, f, f]));
                t(this.shades, function (a, c) {
                    a[e]({ x: k[c], y: l[c], width: n[c], height: g[c] });
                });
            },
            renderElements: function () {
                var a = this,
                    b = a.navigatorOptions,
                    d = b.maskInside,
                    e = a.chart,
                    f = e.renderer,
                    g;
                a.navigatorGroup = g = f
                    .g("navigator")
                    .attr({ zIndex: 8, visibility: "hidden" })
                    .add();
                t([!d, d, !d], function (c, b) {
                    a.shades[b] = f
                        .rect()
                        .addClass(
                            "highcharts-navigator-mask" +
                                (1 === b ? "-inside" : "-outside")
                        )
                        .add(g);
                });
                a.outline = f
                    .path()
                    .addClass("highcharts-navigator-outline")
                    .add(g);
                b.handles.enabled &&
                    t([0, 1], function (c) {
                        b.handles.inverted = e.inverted;
                        a.handles[c] = f.symbol(
                            b.handles.symbols[c],
                            -b.handles.width / 2 - 1,
                            0,
                            b.handles.width,
                            b.handles.height,
                            b.handles
                        );
                        a.handles[c]
                            .attr({ zIndex: 7 - c })
                            .addClass(
                                "highcharts-navigator-handle highcharts-navigator-handle-" +
                                    ["left", "right"][c]
                            )
                            .add(g);
                    });
            },
            update: function (a) {
                t(this.series || [], function (a) {
                    a.baseSeries && delete a.baseSeries.navigatorSeries;
                });
                this.destroy();
                z(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart);
            },
            render: function (c, d, f, g) {
                var h = this.chart,
                    n,
                    k,
                    m = this.scrollbarHeight,
                    p,
                    r = this.xAxis;
                n = r.fake ? h.xAxis[0] : r;
                var t = this.navigatorEnabled,
                    v,
                    y = this.rendered;
                k = h.inverted;
                var u,
                    w = h.xAxis[0].minRange,
                    x = h.xAxis[0].options.maxRange;
                if (!this.hasDragged || e(f)) {
                    if (!b(c) || !b(d))
                        if (y) (f = 0), (g = r.width);
                        else return;
                    this.left = l(
                        r.left,
                        h.plotLeft + m + (k ? h.plotWidth : 0)
                    );
                    this.size =
                        v =
                        p =
                            l(r.len, (k ? h.plotHeight : h.plotWidth) - 2 * m);
                    h = k ? m : p + 2 * m;
                    f = l(f, r.toPixels(c, !0));
                    g = l(g, r.toPixels(d, !0));
                    (b(f) && Infinity !== Math.abs(f)) || ((f = 0), (g = h));
                    c = r.toValue(f, !0);
                    d = r.toValue(g, !0);
                    u = Math.abs(a.correctFloat(d - c));
                    u < w
                        ? this.grabbedLeft
                            ? (f = r.toPixels(d - w, !0))
                            : this.grabbedRight && (g = r.toPixels(c + w, !0))
                        : e(x) &&
                          u > x &&
                          (this.grabbedLeft
                              ? (f = r.toPixels(d - x, !0))
                              : this.grabbedRight &&
                                (g = r.toPixels(c + x, !0)));
                    this.zoomedMax = Math.min(Math.max(f, g, 0), v);
                    this.zoomedMin = Math.min(
                        Math.max(
                            this.fixedWidth
                                ? this.zoomedMax - this.fixedWidth
                                : Math.min(f, g),
                            0
                        ),
                        v
                    );
                    this.range = this.zoomedMax - this.zoomedMin;
                    v = Math.round(this.zoomedMax);
                    f = Math.round(this.zoomedMin);
                    t &&
                        (this.navigatorGroup.attr({ visibility: "visible" }),
                        (y = y && !this.hasDragged ? "animate" : "attr"),
                        this.drawMasks(f, v, k, y),
                        this.drawOutline(f, v, k, y),
                        this.navigatorOptions.handles.enabled &&
                            (this.drawHandle(f, 0, k, y),
                            this.drawHandle(v, 1, k, y)));
                    this.scrollbar &&
                        (k
                            ? ((k = this.top - m),
                              (n =
                                  this.left -
                                  m +
                                  (t || !n.opposite
                                      ? 0
                                      : (n.titleOffset || 0) +
                                        n.axisTitleMargin)),
                              (m = p + 2 * m))
                            : ((k = this.top + (t ? this.height : -m)),
                              (n = this.left - m)),
                        this.scrollbar.position(n, k, h, m),
                        this.scrollbar.setRange(
                            this.zoomedMin / p,
                            this.zoomedMax / p
                        ));
                    this.rendered = !0;
                }
            },
            addMouseEvents: function () {
                var a = this,
                    b = a.chart,
                    d = b.container,
                    e = [],
                    f,
                    g;
                a.mouseMoveHandler = f = function (c) {
                    a.onMouseMove(c);
                };
                a.mouseUpHandler = g = function (c) {
                    a.onMouseUp(c);
                };
                e = a.getPartsEvents("mousedown");
                e.push(B(d, "mousemove", f), B(d.ownerDocument, "mouseup", g));
                w &&
                    (e.push(
                        B(d, "touchmove", f),
                        B(d.ownerDocument, "touchend", g)
                    ),
                    e.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = e;
                a.series &&
                    a.series[0] &&
                    e.push(
                        B(a.series[0].xAxis, "foundExtremes", function () {
                            b.navigator.modifyNavigatorAxisExtremes();
                        })
                    );
            },
            getPartsEvents: function (a) {
                var c = this,
                    b = [];
                t(["shades", "handles"], function (d) {
                    t(c[d], function (e, f) {
                        b.push(
                            B(e.element, a, function (a) {
                                c[d + "Mousedown"](a, f);
                            })
                        );
                    });
                });
                return b;
            },
            shadesMousedown: function (a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart,
                    d = this.xAxis,
                    e = this.zoomedMin,
                    f = this.left,
                    h = this.size,
                    g = this.range,
                    n = a.chartX,
                    k;
                c.inverted && ((n = a.chartY), (f = this.top));
                1 === b
                    ? ((this.grabbedCenter = n),
                      (this.fixedWidth = g),
                      (this.dragOffset = n - e))
                    : ((a = n - f - g / 2),
                      0 === b
                          ? (a = Math.max(0, a))
                          : 2 === b &&
                            a + g >= h &&
                            ((a = h - g),
                            (k = this.getUnionExtremes().dataMax)),
                      a !== e &&
                          ((this.fixedWidth = g),
                          (b = d.toFixedRange(a, a + g, null, k)),
                          c.xAxis[0].setExtremes(
                              Math.min(b.min, b.max),
                              Math.max(b.min, b.max),
                              !0,
                              null,
                              { trigger: "navigator" }
                          )));
            },
            handlesMousedown: function (a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0],
                    d =
                        (a.inverted && !c.reversed) ||
                        (!a.inverted && c.reversed);
                0 === b
                    ? ((this.grabbedLeft = !0),
                      (this.otherHandlePos = this.zoomedMax),
                      (this.fixedExtreme = d ? c.min : c.max))
                    : ((this.grabbedRight = !0),
                      (this.otherHandlePos = this.zoomedMin),
                      (this.fixedExtreme = d ? c.max : c.min));
                a.fixedRange = null;
            },
            onMouseMove: function (a) {
                var c = this,
                    b = c.chart,
                    d = c.left,
                    e = c.navigatorSize,
                    f = c.range,
                    g = c.dragOffset,
                    n = b.inverted;
                (a.touches && 0 === a.touches[0].pageX) ||
                    ((a = b.pointer.normalize(a)),
                    (b = a.chartX),
                    n && ((d = c.top), (b = a.chartY)),
                    c.grabbedLeft
                        ? ((c.hasDragged = !0),
                          c.render(0, 0, b - d, c.otherHandlePos))
                        : c.grabbedRight
                        ? ((c.hasDragged = !0),
                          c.render(0, 0, c.otherHandlePos, b - d))
                        : c.grabbedCenter &&
                          ((c.hasDragged = !0),
                          b < g ? (b = g) : b > e + g - f && (b = e + g - f),
                          c.render(0, 0, b - g, b - g + f)),
                    c.hasDragged &&
                        c.scrollbar &&
                        c.scrollbar.options.liveRedraw &&
                        ((a.DOMType = a.type),
                        setTimeout(function () {
                            c.onMouseUp(a);
                        }, 0)));
            },
            onMouseUp: function (a) {
                var c = this.chart,
                    b = this.xAxis,
                    d = this.scrollbar,
                    f,
                    g,
                    n = a.DOMEvent || a;
                ((!this.hasDragged || (d && d.hasDragged)) &&
                    "scrollbar" !== a.trigger) ||
                    (this.zoomedMin === this.otherHandlePos
                        ? (f = this.fixedExtreme)
                        : this.zoomedMax === this.otherHandlePos &&
                          (g = this.fixedExtreme),
                    this.zoomedMax === this.size &&
                        (g = this.getUnionExtremes().dataMax),
                    (b = b.toFixedRange(this.zoomedMin, this.zoomedMax, f, g)),
                    e(b.min) &&
                        c.xAxis[0].setExtremes(
                            Math.min(b.min, b.max),
                            Math.max(b.min, b.max),
                            !0,
                            this.hasDragged ? !1 : null,
                            {
                                trigger: "navigator",
                                triggerOp: "navigator-drag",
                                DOMEvent: n,
                            }
                        ));
                "mousemove" !== a.DOMType &&
                    (this.grabbedLeft =
                        this.grabbedRight =
                        this.grabbedCenter =
                        this.fixedWidth =
                        this.fixedExtreme =
                        this.otherHandlePos =
                        this.hasDragged =
                        this.dragOffset =
                            null);
            },
            removeEvents: function () {
                this.eventsToUnbind &&
                    (t(this.eventsToUnbind, function (a) {
                        a();
                    }),
                    (this.eventsToUnbind = void 0));
                this.removeBaseSeriesEvents();
            },
            removeBaseSeriesEvents: function () {
                var a = this.baseSeries || [];
                this.navigatorEnabled &&
                    a[0] &&
                    (!1 !== this.navigatorOptions.adaptToUpdatedData &&
                        t(
                            a,
                            function (a) {
                                A(a, "updatedData", this.updatedDataHandler);
                            },
                            this
                        ),
                    a[0].xAxis &&
                        A(
                            a[0].xAxis,
                            "foundExtremes",
                            this.modifyBaseAxisExtremes
                        ));
            },
            init: function (a) {
                var c = a.options,
                    b = c.navigator,
                    d = b.enabled,
                    e = c.scrollbar,
                    f = e.enabled,
                    c = d ? b.height : 0,
                    k = f ? e.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = c;
                this.scrollbarHeight = k;
                this.scrollbarEnabled = f;
                this.navigatorEnabled = d;
                this.navigatorOptions = b;
                this.scrollbarOptions = e;
                this.outlineHeight = c + k;
                this.opposite = l(b.opposite, !d && a.inverted);
                var m = this,
                    e = m.baseSeries,
                    f = a.xAxis.length,
                    p = a.yAxis.length,
                    r = (e && e[0] && e[0].xAxis) || a.xAxis[0];
                a.extraMargin = {
                    type: m.opposite ? "plotTop" : "marginBottom",
                    value: (d || !a.inverted ? m.outlineHeight : 0) + b.margin,
                };
                a.inverted &&
                    (a.extraMargin.type = m.opposite
                        ? "marginRight"
                        : "plotLeft");
                a.isDirtyBox = !0;
                m.navigatorEnabled
                    ? ((m.xAxis = new F(
                          a,
                          z(
                              {
                                  breaks: r.options.breaks,
                                  ordinal: r.options.ordinal,
                              },
                              b.xAxis,
                              {
                                  id: "navigator-x-axis",
                                  yAxis: "navigator-y-axis",
                                  isX: !0,
                                  type: "datetime",
                                  index: f,
                                  offset: 0,
                                  keepOrdinalPadding: !0,
                                  startOnTick: !1,
                                  endOnTick: !1,
                                  minPadding: 0,
                                  maxPadding: 0,
                                  zoomEnabled: !1,
                              },
                              a.inverted
                                  ? { offsets: [k, 0, -k, 0], width: c }
                                  : { offsets: [0, -k, 0, k], height: c }
                          )
                      )),
                      (m.yAxis = new F(
                          a,
                          z(
                              b.yAxis,
                              {
                                  id: "navigator-y-axis",
                                  alignTicks: !1,
                                  offset: 0,
                                  index: p,
                                  zoomEnabled: !1,
                              },
                              a.inverted ? { width: c } : { height: c }
                          )
                      )),
                      e || b.series.data
                          ? m.updateNavigatorSeries()
                          : 0 === a.series.length &&
                            g(a, "redraw", function (c, b) {
                                0 < a.series.length &&
                                    !m.series &&
                                    (m.setBaseSeries(), (a.redraw = c));
                                c.call(a, b);
                            }),
                      m.renderElements(),
                      m.addMouseEvents())
                    : (m.xAxis = {
                          translate: function (c, b) {
                              var d = a.xAxis[0],
                                  e = d.getExtremes(),
                                  f = d.len - 2 * k,
                                  h = n("min", d.options.min, e.dataMin),
                                  d = n("max", d.options.max, e.dataMax) - h;
                              return b ? (c * d) / f + h : (f * (c - h)) / d;
                          },
                          toPixels: function (a) {
                              return this.translate(a);
                          },
                          toValue: function (a) {
                              return this.translate(a, !0);
                          },
                          toFixedRange: F.prototype.toFixedRange,
                          fake: !0,
                      });
                a.options.scrollbar.enabled &&
                    ((a.scrollbar = m.scrollbar =
                        new I(
                            a.renderer,
                            z(a.options.scrollbar, {
                                margin: m.navigatorEnabled ? 0 : 10,
                                vertical: a.inverted,
                            }),
                            a
                        )),
                    B(m.scrollbar, "changed", function (c) {
                        var b = m.size,
                            d = b * this.to,
                            b = b * this.from;
                        m.hasDragged = m.scrollbar.hasDragged;
                        m.render(0, 0, b, d);
                        (a.options.scrollbar.liveRedraw ||
                            "mousemove" !== c.DOMType) &&
                            setTimeout(function () {
                                m.onMouseUp(c);
                            });
                    }));
                m.addBaseSeriesEvents();
                m.addChartEvents();
            },
            getUnionExtremes: function (a) {
                var c = this.chart.xAxis[0],
                    b = this.xAxis,
                    d = b.options,
                    e = c.options,
                    f;
                (a && null === c.dataMin) ||
                    (f = {
                        dataMin: l(
                            d && d.min,
                            n("min", e.min, c.dataMin, b.dataMin, b.min)
                        ),
                        dataMax: l(
                            d && d.max,
                            n("max", e.max, c.dataMax, b.dataMax, b.max)
                        ),
                    });
                return f;
            },
            setBaseSeries: function (a, b) {
                var c = this.chart,
                    d = (this.baseSeries = []);
                a = a || (c.options && c.options.navigator.baseSeries) || 0;
                t(c.series || [], function (c, b) {
                    c.options.isInternal ||
                        (!c.options.showInNavigator &&
                            ((b !== a && c.options.id !== a) ||
                                !1 === c.options.showInNavigator)) ||
                        d.push(c);
                });
                this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(b);
            },
            updateNavigatorSeries: function (c) {
                var b = this,
                    e = b.chart,
                    g = b.baseSeries,
                    n,
                    k,
                    l = b.navigatorOptions.series,
                    m,
                    p = {
                        enableMouseTracking: !1,
                        index: null,
                        linkedTo: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: !1,
                        isInternal: !0,
                        visible: !0,
                    },
                    r = (b.series = a.grep(b.series || [], function (c) {
                        var d = c.baseSeries;
                        return 0 > a.inArray(d, g)
                            ? (d &&
                                  (A(d, "updatedData", b.updatedDataHandler),
                                  delete d.navigatorSeries),
                              c.destroy(),
                              !1)
                            : !0;
                    }));
                g &&
                    g.length &&
                    t(g, function (a) {
                        var h = a.navigatorSeries,
                            q = f(
                                { color: a.color },
                                d(l) ? u.navigator.series : l
                            );
                        (h && !1 === b.navigatorOptions.adaptToUpdatedData) ||
                            ((p.name = "Navigator " + g.length),
                            (n = a.options || {}),
                            (m = n.navigatorOptions || {}),
                            (k = z(n, p, q, m)),
                            (q = m.data || q.data),
                            (b.hasNavigatorData = b.hasNavigatorData || !!q),
                            (k.data = q || (n.data && n.data.slice(0))),
                            h && h.options
                                ? h.update(k, c)
                                : ((a.navigatorSeries = e.initSeries(k)),
                                  (a.navigatorSeries.baseSeries = a),
                                  r.push(a.navigatorSeries)));
                    });
                if ((l.data && (!g || !g.length)) || d(l))
                    (b.hasNavigatorData = !1),
                        (l = a.splat(l)),
                        t(l, function (a, c) {
                            p.name = "Navigator " + (r.length + 1);
                            k = z(
                                u.navigator.series,
                                {
                                    color:
                                        (e.series[c] &&
                                            !e.series[c].options.isInternal &&
                                            e.series[c].color) ||
                                        e.options.colors[c] ||
                                        e.options.colors[0],
                                },
                                p,
                                a
                            );
                            k.data = a.data;
                            k.data &&
                                ((b.hasNavigatorData = !0),
                                r.push(e.initSeries(k)));
                        });
                this.addBaseSeriesEvents();
            },
            addBaseSeriesEvents: function () {
                var a = this,
                    b = a.baseSeries || [];
                b[0] &&
                    b[0].xAxis &&
                    B(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                t(
                    b,
                    function (c) {
                        B(c, "show", function () {
                            this.navigatorSeries && this.navigatorSeries.show();
                        });
                        B(c, "hide", function () {
                            this.navigatorSeries && this.navigatorSeries.hide();
                        });
                        !1 !== this.navigatorOptions.adaptToUpdatedData &&
                            c.xAxis &&
                            B(c, "updatedData", this.updatedDataHandler);
                        B(c, "remove", function () {
                            this.navigatorSeries &&
                                (r(a.series, this.navigatorSeries),
                                this.navigatorSeries.remove(!1),
                                delete this.navigatorSeries);
                        });
                    },
                    this
                );
            },
            modifyNavigatorAxisExtremes: function () {
                var a = this.xAxis,
                    b;
                a.getExtremes &&
                    (!(b = this.getUnionExtremes(!0)) ||
                        (b.dataMin === a.min && b.dataMax === a.max) ||
                        ((a.min = b.dataMin), (a.max = b.dataMax)));
            },
            modifyBaseAxisExtremes: function () {
                var a = this.chart.navigator,
                    d = this.getExtremes(),
                    e = d.dataMin,
                    f = d.dataMax,
                    d = d.max - d.min,
                    g = a.stickToMin,
                    n = a.stickToMax,
                    k = this.options.overscroll,
                    l,
                    m,
                    p = a.series && a.series[0],
                    r = !!this.setExtremes;
                (this.eventArgs &&
                    "rangeSelectorButton" === this.eventArgs.trigger) ||
                    (g && ((m = e), (l = m + d)),
                    n &&
                        ((l = f + k),
                        g ||
                            (m = Math.max(
                                l - d,
                                p && p.xData ? p.xData[0] : -Number.MAX_VALUE
                            ))),
                    r &&
                        (g || n) &&
                        b(m) &&
                        ((this.min = this.userMin = m),
                        (this.max = this.userMax = l)));
                a.stickToMin = a.stickToMax = null;
            },
            updatedDataHandler: function () {
                var a = this.chart.navigator,
                    d = this.navigatorSeries;
                a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin =
                    b(this.xAxis.min) &&
                    this.xAxis.min <= this.xData[0] &&
                    (!this.chart.fixedRange || !a.stickToMax);
                d &&
                    !a.hasNavigatorData &&
                    ((d.options.pointStart = this.xData[0]),
                    d.setData(this.options.data, !1, null, !1));
            },
            addChartEvents: function () {
                B(this.chart, "redraw", function () {
                    var a = this.navigator,
                        b =
                            a &&
                            ((a.baseSeries &&
                                a.baseSeries[0] &&
                                a.baseSeries[0].xAxis) ||
                                (a.scrollbar && this.xAxis[0]));
                    b && a.render(b.min, b.max);
                });
            },
            destroy: function () {
                this.removeEvents();
                this.xAxis &&
                    (r(this.chart.xAxis, this.xAxis),
                    r(this.chart.axes, this.xAxis));
                this.yAxis &&
                    (r(this.chart.yAxis, this.yAxis),
                    r(this.chart.axes, this.yAxis));
                t(this.series || [], function (a) {
                    a.destroy && a.destroy();
                });
                t(
                    "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(
                        " "
                    ),
                    function (a) {
                        this[a] && this[a].destroy && this[a].destroy();
                        this[a] = null;
                    },
                    this
                );
                t(
                    [this.handles],
                    function (a) {
                        k(a);
                    },
                    this
                );
            },
        };
        a.Navigator = D;
        g(F.prototype, "zoom", function (a, b, d) {
            var c = this.chart,
                f = c.options,
                h = f.chart.zoomType,
                g = f.navigator,
                f = f.rangeSelector,
                n;
            this.isXAxis &&
                ((g && g.enabled) || (f && f.enabled)) &&
                ("x" === h
                    ? (c.resetZoomButton = "blocked")
                    : "y" === h
                    ? (n = !1)
                    : "xy" === h &&
                      ((c = this.previousZoom),
                      e(b)
                          ? (this.previousZoom = [this.min, this.max])
                          : c &&
                            ((b = c[0]),
                            (d = c[1]),
                            delete this.previousZoom)));
            return void 0 !== n ? n : a.call(this, b, d);
        });
        g(C.prototype, "init", function (a, b, d) {
            B(this, "beforeRender", function () {
                var a = this.options;
                if (a.navigator.enabled || a.scrollbar.enabled)
                    this.scroller = this.navigator = new D(this);
            });
            a.call(this, b, d);
        });
        g(C.prototype, "setChartSize", function (a) {
            var b = this.legend,
                c = this.navigator,
                d,
                e,
                f,
                g;
            a.apply(this, [].slice.call(arguments, 1));
            c &&
                ((e = b && b.options),
                (f = c.xAxis),
                (g = c.yAxis),
                (d = c.scrollbarHeight),
                this.inverted
                    ? ((c.left = c.opposite
                          ? this.chartWidth - d - c.height
                          : this.spacing[3] + d),
                      (c.top = this.plotTop + d))
                    : ((c.left = this.plotLeft + d),
                      (c.top =
                          c.navigatorOptions.top ||
                          this.chartHeight -
                              c.height -
                              d -
                              this.spacing[2] -
                              (this.rangeSelector && this.extraBottomMargin
                                  ? this.rangeSelector.getHeight()
                                  : 0) -
                              (e &&
                              "bottom" === e.verticalAlign &&
                              e.enabled &&
                              !e.floating
                                  ? b.legendHeight + l(e.margin, 10)
                                  : 0))),
                f &&
                    g &&
                    (this.inverted
                        ? (f.options.left = g.options.left = c.left)
                        : (f.options.top = g.options.top = c.top),
                    f.setAxisSize(),
                    g.setAxisSize()));
        });
        g(E.prototype, "addPoint", function (a, b, d, e, f) {
            var c = this.options.turboThreshold;
            c &&
                this.xData.length > c &&
                p(b, !0) &&
                this.chart.navigator &&
                x(20, !0);
            a.call(this, b, d, e, f);
        });
        g(C.prototype, "addSeries", function (a, b, d, e) {
            a = a.call(this, b, !1, e);
            this.navigator && this.navigator.setBaseSeries(null, !1);
            l(d, !0) && this.redraw();
            return a;
        });
        g(E.prototype, "update", function (a, b, d) {
            a.call(this, b, !1);
            this.chart.navigator &&
                !this.options.isInternal &&
                this.chart.navigator.setBaseSeries(null, !1);
            l(d, !0) && this.chart.redraw();
        });
        C.prototype.callbacks.push(function (a) {
            var b = a.navigator;
            b && ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
        });
    })(J);
    (function (a) {
        function D(a) {
            this.init(a);
        }
        var B = a.addEvent,
            F = a.Axis,
            C = a.Chart,
            u = a.css,
            e = a.createElement,
            k = a.dateFormat,
            t = a.defaultOptions,
            r = t.global.useUTC,
            x = a.defined,
            f = a.destroyObjectProperties,
            m = a.discardElement,
            w = a.each,
            d = a.extend,
            b = a.fireEvent,
            p = a.Date,
            z = a.isNumber,
            l = a.merge,
            A = a.pick,
            I = a.pInt,
            E = a.splat,
            H = a.wrap;
        d(t, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: {
                    "stroke-width": 0,
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7,
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputPosition: { align: "right", x: 0, y: 0 },
                buttonPosition: { align: "left", x: 0, y: 0 },
            },
        });
        t.lang = l(t.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To",
        });
        D.prototype = {
            clickButton: function (a, b) {
                var d = this,
                    c = d.chart,
                    e = d.buttonOptions[a],
                    f = c.xAxis[0],
                    g =
                        (c.scroller && c.scroller.getUnionExtremes()) ||
                        f ||
                        {},
                    k = g.dataMin,
                    l = g.dataMax,
                    m,
                    p = f && Math.round(Math.min(f.max, A(l, f.max))),
                    t = e.type,
                    y,
                    g = e._range,
                    u,
                    x,
                    C,
                    D = e.dataGrouping;
                if (null !== k && null !== l) {
                    c.fixedRange = g;
                    D &&
                        ((this.forcedDataGrouping = !0),
                        F.prototype.setDataGrouping.call(
                            f || { chart: this.chart },
                            D,
                            !1
                        ));
                    if ("month" === t || "year" === t)
                        f
                            ? ((t = {
                                  range: e,
                                  max: p,
                                  dataMin: k,
                                  dataMax: l,
                              }),
                              (m = f.minFromRange.call(t)),
                              z(t.newMax) && (p = t.newMax))
                            : (g = e);
                    else if (g)
                        (m = Math.max(p - g, k)), (p = Math.min(m + g, l));
                    else if ("ytd" === t)
                        if (f)
                            void 0 === l &&
                                ((k = Number.MAX_VALUE),
                                (l = Number.MIN_VALUE),
                                w(c.series, function (a) {
                                    a = a.xData;
                                    k = Math.min(a[0], k);
                                    l = Math.max(a[a.length - 1], l);
                                }),
                                (b = !1)),
                                (p = d.getYTDExtremes(l, k, r)),
                                (m = u = p.min),
                                (p = p.max);
                        else {
                            B(c, "beforeRender", function () {
                                d.clickButton(a);
                            });
                            return;
                        }
                    else "all" === t && f && ((m = k), (p = l));
                    m += e._offsetMin;
                    p += e._offsetMax;
                    d.setSelected(a);
                    f
                        ? f.setExtremes(m, p, A(b, 1), null, {
                              trigger: "rangeSelectorButton",
                              rangeSelectorButton: e,
                          })
                        : ((y = E(c.options.xAxis)[0]),
                          (C = y.range),
                          (y.range = g),
                          (x = y.min),
                          (y.min = u),
                          B(c, "load", function () {
                              y.range = C;
                              y.min = x;
                          }));
                }
            },
            setSelected: function (a) {
                this.selected = this.options.selected = a;
            },
            defaultButtons: [
                { type: "month", count: 1, text: "1m" },
                { type: "month", count: 3, text: "3m" },
                { type: "month", count: 6, text: "6m" },
                { type: "ytd", text: "YTD" },
                { type: "year", count: 1, text: "1y" },
                { type: "all", text: "All" },
            ],
            init: function (a) {
                var d = this,
                    e = a.options.rangeSelector,
                    c = e.buttons || [].concat(d.defaultButtons),
                    f = e.selected,
                    g = function () {
                        var a = d.minInput,
                            c = d.maxInput;
                        a && a.blur && b(a, "blur");
                        c && c.blur && b(c, "blur");
                    };
                d.chart = a;
                d.options = e;
                d.buttons = [];
                a.extraTopMargin = e.height;
                d.buttonOptions = c;
                this.unMouseDown = B(a.container, "mousedown", g);
                this.unResize = B(a, "resize", g);
                w(c, d.computeButtonRange);
                void 0 !== f && c[f] && this.clickButton(f, !1);
                B(a, "load", function () {
                    B(a.xAxis[0], "setExtremes", function (b) {
                        this.max - this.min !== a.fixedRange &&
                            "rangeSelectorButton" !== b.trigger &&
                            "updatedData" !== b.trigger &&
                            d.forcedDataGrouping &&
                            this.setDataGrouping(!1, !1);
                    });
                });
            },
            updateButtonStates: function () {
                var a = this.chart,
                    b = a.xAxis[0],
                    d = Math.round(b.max - b.min),
                    c = !b.hasVisibleSeries,
                    a = (a.scroller && a.scroller.getUnionExtremes()) || b,
                    e = a.dataMin,
                    f = a.dataMax,
                    a = this.getYTDExtremes(f, e, r),
                    k = a.min,
                    l = a.max,
                    m = this.selected,
                    p = z(m),
                    t = this.options.allButtonsEnabled,
                    u = this.buttons;
                w(this.buttonOptions, function (a, h) {
                    var g = a._range,
                        n = a.type,
                        q = a.count || 1,
                        r = u[h],
                        y = 0;
                    a = a._offsetMax - a._offsetMin;
                    h = h === m;
                    var v = g > f - e,
                        w = g < b.minRange,
                        x = !1,
                        z = !1,
                        g = g === d;
                    ("month" === n || "year" === n) &&
                    d >= 864e5 * { month: 28, year: 365 }[n] * q + a &&
                    d <= 864e5 * { month: 31, year: 366 }[n] * q + a
                        ? (g = !0)
                        : "ytd" === n
                        ? ((g = l - k + a === d), (x = !h))
                        : "all" === n &&
                          ((g = b.max - b.min >= f - e), (z = !h && p && g));
                    n = !t && (v || w || z || c);
                    q = (h && g) || (g && !p && !x);
                    n ? (y = 3) : q && ((p = !0), (y = 2));
                    r.state !== y && r.setState(y);
                });
            },
            computeButtonRange: function (a) {
                var b = a.type,
                    d = a.count || 1,
                    c = {
                        millisecond: 1,
                        second: 1e3,
                        minute: 6e4,
                        hour: 36e5,
                        day: 864e5,
                        week: 6048e5,
                    };
                if (c[b]) a._range = c[b] * d;
                else if ("month" === b || "year" === b)
                    a._range = 864e5 * { month: 30, year: 365 }[b] * d;
                a._offsetMin = A(a.offsetMin, 0);
                a._offsetMax = A(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin;
            },
            setInputValue: function (a, b) {
                var d = this.chart.options.rangeSelector,
                    c = this[a + "Input"];
                x(b) && ((c.previousValue = c.HCTime), (c.HCTime = b));
                c.value = k(d.inputEditDateFormat || "%Y-%m-%d", c.HCTime);
                this[a + "DateBox"].attr({
                    text: k(d.inputDateFormat || "%b %e, %Y", c.HCTime),
                });
            },
            showInput: function (a) {
                var b = this.inputGroup,
                    d = this[a + "DateBox"];
                u(this[a + "Input"], {
                    left: b.translateX + d.x + "px",
                    top: b.translateY + "px",
                    width: d.width - 2 + "px",
                    height: d.height - 2 + "px",
                    border: "2px solid silver",
                });
            },
            hideInput: function (a) {
                u(this[a + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px",
                });
                this.setInputValue(a);
            },
            drawInput: function (a) {
                function b() {
                    var a = m.value,
                        b = (g.inputDateParser || Date.parse)(a),
                        e = c.xAxis[0],
                        f =
                            c.scroller && c.scroller.xAxis
                                ? c.scroller.xAxis
                                : e,
                        h = f.dataMin,
                        f = f.dataMax;
                    b !== m.previousValue &&
                        ((m.previousValue = b),
                        z(b) ||
                            ((b = a.split("-")),
                            (b = Date.UTC(I(b[0]), I(b[1]) - 1, I(b[2])))),
                        z(b) &&
                            (r || (b += 6e4 * new Date().getTimezoneOffset()),
                            l
                                ? b > d.maxInput.HCTime
                                    ? (b = void 0)
                                    : b < h && (b = h)
                                : b < d.minInput.HCTime
                                ? (b = void 0)
                                : b > f && (b = f),
                            void 0 !== b &&
                                e.setExtremes(
                                    l ? b : e.min,
                                    l ? e.max : b,
                                    void 0,
                                    void 0,
                                    { trigger: "rangeSelectorInput" }
                                )));
                }
                var d = this,
                    c = d.chart,
                    f = c.renderer,
                    g = c.options.rangeSelector,
                    k = d.div,
                    l = "min" === a,
                    m,
                    p,
                    u = this.inputGroup;
                this[a + "Label"] = p = f
                    .label(
                        t.lang[l ? "rangeSelectorFrom" : "rangeSelectorTo"],
                        this.inputGroup.offset
                    )
                    .addClass("highcharts-range-label")
                    .attr({ padding: 2 })
                    .add(u);
                u.offset += p.width + 5;
                this[a + "DateBox"] = f = f
                    .label("", u.offset)
                    .addClass("highcharts-range-input")
                    .attr({
                        padding: 2,
                        width: g.inputBoxWidth || 90,
                        height: g.inputBoxHeight || 17,
                        stroke: g.inputBoxBorderColor || "#cccccc",
                        "stroke-width": 1,
                        "text-align": "center",
                    })
                    .on("click", function () {
                        d.showInput(a);
                        d[a + "Input"].focus();
                    })
                    .add(u);
                u.offset += f.width + (l ? 10 : 0);
                this[a + "Input"] = m = e(
                    "input",
                    {
                        name: a,
                        className: "highcharts-range-selector",
                        type: "text",
                    },
                    { top: c.plotTop + "px" },
                    k
                );
                m.onfocus = function () {
                    d.showInput(a);
                };
                m.onblur = function () {
                    d.hideInput(a);
                };
                m.onchange = b;
                m.onkeypress = function (a) {
                    13 === a.keyCode && b();
                };
            },
            getPosition: function () {
                var a = this.chart,
                    b = a.options.rangeSelector,
                    a =
                        "top" === b.verticalAlign
                            ? a.plotTop - a.axisOffset[0]
                            : 0;
                return {
                    buttonTop: a + b.buttonPosition.y,
                    inputTop: a + b.inputPosition.y - 10,
                };
            },
            getYTDExtremes: function (a, b, d) {
                var c = new p(a),
                    e = c[p.hcGetFullYear]();
                d = d ? p.UTC(e, 0, 1) : +new p(e, 0, 1);
                b = Math.max(b || 0, d);
                c = c.getTime();
                return { max: Math.min(a || c, c), min: b };
            },
            render: function (a, b) {
                var d = this,
                    c = d.chart,
                    f = c.renderer,
                    g = c.container,
                    k = c.options,
                    l =
                        k.exporting &&
                        !1 !== k.exporting.enabled &&
                        k.navigation &&
                        k.navigation.buttonOptions,
                    m = t.lang,
                    p = d.div,
                    r = k.rangeSelector,
                    k = r.floating,
                    y = d.buttons,
                    p = d.inputGroup,
                    u = r.buttonTheme,
                    x = r.buttonPosition,
                    z = r.inputPosition,
                    B = r.inputEnabled,
                    C = u && u.states,
                    D = c.plotLeft,
                    E,
                    F = d.buttonGroup,
                    H;
                H = d.rendered;
                var I = d.options.verticalAlign,
                    J = c.legend,
                    N = J && J.options,
                    Z = x.y,
                    Y = z.y,
                    W = H || !1,
                    V = 0,
                    S = 0,
                    U;
                if (!1 !== r.enabled) {
                    H ||
                        ((d.group = H =
                            f
                                .g("range-selector-group")
                                .attr({ zIndex: 7 })
                                .add()),
                        (d.buttonGroup = F =
                            f.g("range-selector-buttons").add(H)),
                        (d.zoomText = f
                            .text(m.rangeSelectorZoom, A(D + x.x, D), 15)
                            .css(r.labelStyle)
                            .add(F)),
                        (E = A(D + x.x, D) + d.zoomText.getBBox().width + 5),
                        w(d.buttonOptions, function (a, b) {
                            y[b] = f
                                .button(
                                    a.text,
                                    E,
                                    0,
                                    function () {
                                        var c = a.events && a.events.click,
                                            e;
                                        c && (e = c.call(a));
                                        !1 !== e && d.clickButton(b);
                                        d.isActive = !0;
                                    },
                                    u,
                                    C && C.hover,
                                    C && C.select,
                                    C && C.disabled
                                )
                                .attr({ "text-align": "center" })
                                .add(F);
                            E += y[b].width + A(r.buttonSpacing, 5);
                        }),
                        !1 !== B &&
                            ((d.div = p =
                                e("div", null, {
                                    position: "relative",
                                    height: 0,
                                    zIndex: 1,
                                })),
                            g.parentNode.insertBefore(p, g),
                            (d.inputGroup = p = f.g("input-group").add(H)),
                            (p.offset = 0),
                            d.drawInput("min"),
                            d.drawInput("max")));
                    D = c.plotLeft - c.spacing[3];
                    d.updateButtonStates();
                    l &&
                        this.titleCollision(c) &&
                        "top" === I &&
                        "right" === x.align &&
                        x.y + F.getBBox().height - 12 < (l.y || 0) + l.height &&
                        (V = -40);
                    "left" === x.align
                        ? (U = x.x - c.spacing[3])
                        : "right" === x.align && (U = x.x + V - c.spacing[1]);
                    F.align(
                        {
                            y: x.y,
                            width: F.getBBox().width,
                            align: x.align,
                            x: U,
                        },
                        !0,
                        c.spacingBox
                    );
                    d.group.placed = W;
                    d.buttonGroup.placed = W;
                    !1 !== B &&
                        ((V =
                            l &&
                            this.titleCollision(c) &&
                            "top" === I &&
                            "right" === z.align &&
                            z.y - p.getBBox().height - 12 <
                                (l.y || 0) + l.height + c.spacing[0]
                                ? -40
                                : 0),
                        "left" === z.align
                            ? (U = D)
                            : "right" === z.align &&
                              (U = -Math.max(c.axisOffset[1], -V)),
                        p.align(
                            {
                                y: z.y,
                                width: p.getBBox().width,
                                align: z.align,
                                x: z.x + U - 2,
                            },
                            !0,
                            c.spacingBox
                        ),
                        (g =
                            p.alignAttr.translateX +
                            p.alignOptions.x -
                            V +
                            p.getBBox().x +
                            2),
                        (l = p.alignOptions.width),
                        (m = F.alignAttr.translateX + F.getBBox().x),
                        (U = F.getBBox().width + 20),
                        (z.align === x.align ||
                            (m + U > g &&
                                g + l > m &&
                                Z < Y + p.getBBox().height)) &&
                            p.attr({
                                translateX:
                                    p.alignAttr.translateX +
                                    (c.axisOffset[1] >= -V ? 0 : -V),
                                translateY:
                                    p.alignAttr.translateY +
                                    F.getBBox().height +
                                    10,
                            }),
                        d.setInputValue("min", a),
                        d.setInputValue("max", b),
                        (d.inputGroup.placed = W));
                    d.group.align({ verticalAlign: I }, !0, c.spacingBox);
                    a = d.group.getBBox().height + 20;
                    b = d.group.alignAttr.translateY;
                    "bottom" === I &&
                        ((J =
                            N &&
                            "bottom" === N.verticalAlign &&
                            N.enabled &&
                            !N.floating
                                ? J.legendHeight + A(N.margin, 10)
                                : 0),
                        (a = a + J - 20),
                        (S = b - a - (k ? 0 : r.y) - 10));
                    if ("top" === I)
                        k && (S = 0),
                            c.titleOffset &&
                                (S = c.titleOffset + c.options.title.margin),
                            (S += c.margin[0] - c.spacing[0] || 0);
                    else if ("middle" === I)
                        if (Y === Z) S = 0 > Y ? b + void 0 : b;
                        else if (Y || Z)
                            S =
                                0 > Y || 0 > Z
                                    ? S - Math.min(Y, Z)
                                    : b - a + NaN;
                    d.group.translate(r.x, r.y + Math.floor(S));
                    !1 !== B &&
                        ((d.minInput.style.marginTop =
                            d.group.translateY + "px"),
                        (d.maxInput.style.marginTop =
                            d.group.translateY + "px"));
                    d.rendered = !0;
                }
            },
            getHeight: function () {
                var a = this.options,
                    b = this.group,
                    d = a.y,
                    c = a.buttonPosition.y,
                    a = a.inputPosition.y,
                    b = b ? b.getBBox(!0).height + 13 + d : 0,
                    d = Math.min(a, c);
                if ((0 > a && 0 > c) || (0 < a && 0 < c)) b += Math.abs(d);
                return b;
            },
            titleCollision: function (a) {
                return !(a.options.title.text || a.options.subtitle.text);
            },
            update: function (a) {
                var b = this.chart;
                l(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                b.rangeSelector.render();
            },
            destroy: function () {
                var b = this,
                    d = b.minInput,
                    e = b.maxInput;
                b.unMouseDown();
                b.unResize();
                f(b.buttons);
                d && (d.onfocus = d.onblur = d.onchange = null);
                e && (e.onfocus = e.onblur = e.onchange = null);
                a.objectEach(
                    b,
                    function (a, d) {
                        a &&
                            "chart" !== d &&
                            (a.destroy
                                ? a.destroy()
                                : a.nodeType && m(this[d]));
                        a !== D.prototype[d] && (b[d] = null);
                    },
                    this
                );
            },
        };
        F.prototype.toFixedRange = function (a, b, d, c) {
            var e = this.chart && this.chart.fixedRange;
            a = A(d, this.translate(a, !0, !this.horiz));
            b = A(c, this.translate(b, !0, !this.horiz));
            d = e && (b - a) / e;
            0.7 < d && 1.3 > d && (c ? (a = b - e) : (b = a + e));
            z(a) || (a = b = void 0);
            return { min: a, max: b };
        };
        F.prototype.minFromRange = function () {
            var a = this.range,
                b = { month: "Month", year: "FullYear" }[a.type],
                d,
                c = this.max,
                e,
                f,
                k = function (a, c) {
                    var d = new Date(a),
                        e = d["get" + b]();
                    d["set" + b](e + c);
                    e === d["get" + b]() && d.setDate(0);
                    return d.getTime() - a;
                };
            z(a)
                ? ((d = c - a), (f = a))
                : ((d = c + k(c, -a.count)),
                  this.chart && (this.chart.fixedRange = c - d));
            e = A(this.dataMin, Number.MIN_VALUE);
            z(d) || (d = e);
            d <= e &&
                ((d = e),
                void 0 === f && (f = k(d, a.count)),
                (this.newMax = Math.min(d + f, this.dataMax)));
            z(c) || (d = void 0);
            return d;
        };
        H(C.prototype, "init", function (a, b, d) {
            B(this, "init", function () {
                this.options.rangeSelector.enabled &&
                    (this.rangeSelector = new D(this));
            });
            a.call(this, b, d);
        });
        H(C.prototype, "render", function (a, b, d) {
            var c = this.axes,
                e = this.rangeSelector;
            e &&
                (w(c, function (a) {
                    a.updateNames();
                    a.setScale();
                }),
                this.getAxisMargins(),
                e.render(),
                (c = e.options.verticalAlign),
                e.options.floating ||
                    ("bottom" === c
                        ? (this.extraBottomMargin = !0)
                        : "middle" !== c && (this.extraTopMargin = !0)));
            a.call(this, b, d);
        });
        H(C.prototype, "update", function (b, d, e, c) {
            var f = this.rangeSelector,
                g;
            this.extraTopMargin = this.extraBottomMargin = !1;
            f &&
                (f.render(),
                (g =
                    (d.rangeSelector && d.rangeSelector.verticalAlign) ||
                    (f.options && f.options.verticalAlign)),
                f.options.floating ||
                    ("bottom" === g
                        ? (this.extraBottomMargin = !0)
                        : "middle" !== g && (this.extraTopMargin = !0)));
            b.call(
                this,
                a.merge(!0, d, {
                    chart: {
                        marginBottom: A(
                            d.chart && d.chart.marginBottom,
                            this.margin.bottom
                        ),
                        spacingBottom: A(
                            d.chart && d.chart.spacingBottom,
                            this.spacing.bottom
                        ),
                    },
                }),
                e,
                c
            );
        });
        H(C.prototype, "redraw", function (a, b, d) {
            var c = this.rangeSelector;
            c &&
                !c.options.floating &&
                (c.render(),
                (c = c.options.verticalAlign),
                "bottom" === c
                    ? (this.extraBottomMargin = !0)
                    : "middle" !== c && (this.extraTopMargin = !0));
            a.call(this, b, d);
        });
        C.prototype.adjustPlotArea = function () {
            var a = this.rangeSelector;
            this.rangeSelector &&
                ((a = a.getHeight()),
                this.extraTopMargin && (this.plotTop += a),
                this.extraBottomMargin && (this.marginBottom += a));
        };
        C.prototype.callbacks.push(function (a) {
            function b() {
                d = a.xAxis[0].getExtremes();
                z(d.min) && c.render(d.min, d.max);
            }
            var d,
                c = a.rangeSelector,
                e,
                f;
            c &&
                ((f = B(a.xAxis[0], "afterSetExtremes", function (a) {
                    c.render(a.min, a.max);
                })),
                (e = B(a, "redraw", b)),
                b());
            B(a, "destroy", function () {
                c && (e(), f());
            });
        });
        a.RangeSelector = D;
    })(J);
    (function (a) {
        var D = a.arrayMax,
            B = a.arrayMin,
            F = a.Axis,
            C = a.Chart,
            u = a.defined,
            e = a.each,
            k = a.format,
            t = a.grep,
            r = a.inArray,
            x = a.isNumber,
            f = a.isString,
            m = a.map,
            w = a.merge,
            d = a.pick,
            b = a.Point,
            p = a.Series,
            z = a.splat,
            l = a.SVGRenderer,
            A = a.wrap,
            I = p.prototype,
            E = I.init,
            H = I.processData,
            g = b.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function (b, e, c) {
            var h = f(b) || b.nodeName,
                g = arguments[h ? 1 : 0],
                k = g.series,
                l = a.getOptions(),
                n,
                p = d(
                    g.navigator && g.navigator.enabled,
                    l.navigator.enabled,
                    !0
                ),
                r = p ? { startOnTick: !1, endOnTick: !1 } : null,
                t = { marker: { enabled: !1, radius: 2 } },
                u = { shadow: !1, borderWidth: 0 };
            g.xAxis = m(z(g.xAxis || {}), function (a) {
                return w(
                    {
                        minPadding: 0,
                        maxPadding: 0,
                        overscroll: 0,
                        ordinal: !0,
                        title: { text: null },
                        labels: { overflow: "justify" },
                        showLastLabel: !0,
                    },
                    l.xAxis,
                    a,
                    { type: "datetime", categories: null },
                    r
                );
            });
            g.yAxis = m(z(g.yAxis || {}), function (a) {
                n = d(a.opposite, !0);
                return w(
                    {
                        labels: { y: -2 },
                        opposite: n,
                        showLastLabel: !1,
                        title: { text: null },
                    },
                    l.yAxis,
                    a
                );
            });
            g.series = null;
            g = w(
                {
                    chart: { panning: !0, pinchType: "x" },
                    navigator: { enabled: p },
                    scrollbar: { enabled: d(l.scrollbar.enabled, !0) },
                    rangeSelector: { enabled: d(l.rangeSelector.enabled, !0) },
                    title: { text: null },
                    tooltip: { split: !0, crosshairs: !0 },
                    legend: { enabled: !1 },
                    plotOptions: {
                        line: t,
                        spline: t,
                        area: t,
                        areaspline: t,
                        arearange: t,
                        areasplinerange: t,
                        column: u,
                        columnrange: u,
                        candlestick: u,
                        ohlc: u,
                    },
                },
                g,
                { isStock: !0 }
            );
            g.series = k;
            return h ? new C(b, g, c) : new C(g, e);
        };
        A(F.prototype, "autoLabelAlign", function (a) {
            var b = this.chart,
                c = this.options,
                b = (b._labelPanes = b._labelPanes || {}),
                d = this.options.labels;
            return this.chart.options.isStock &&
                "yAxis" === this.coll &&
                ((c = c.top + "," + c.height), !b[c] && d.enabled)
                ? (15 === d.x && (d.x = 0),
                  void 0 === d.align && (d.align = "right"),
                  (b[c] = this),
                  "right")
                : a.apply(this, [].slice.call(arguments, 1));
        });
        A(F.prototype, "destroy", function (a) {
            var b = this.chart,
                c =
                    this.options &&
                    this.options.top + "," + this.options.height;
            c &&
                b._labelPanes &&
                b._labelPanes[c] === this &&
                delete b._labelPanes[c];
            return a.apply(this, Array.prototype.slice.call(arguments, 1));
        });
        A(F.prototype, "getPlotLinePath", function (b, g, c, h, k, l) {
            var n = this,
                p =
                    this.isLinked && !this.series
                        ? this.linkedParent.series
                        : this.series,
                t = n.chart,
                y = t.renderer,
                v = n.left,
                w = n.top,
                z,
                A,
                B,
                C,
                D = [],
                E = [],
                F,
                G;
            if ("xAxis" !== n.coll && "yAxis" !== n.coll)
                return b.apply(this, [].slice.call(arguments, 1));
            E = (function (a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = n.options[b];
                return x(a)
                    ? [t[b][a]]
                    : f(a)
                    ? [t.get(a)]
                    : m(p, function (a) {
                          return a[b];
                      });
            })(n.coll);
            e(n.isXAxis ? t.yAxis : t.xAxis, function (a) {
                if (
                    u(a.options.id)
                        ? -1 === a.options.id.indexOf("navigator")
                        : 1
                ) {
                    var b = a.isXAxis ? "yAxis" : "xAxis",
                        b = u(a.options[b]) ? t[b][a.options[b]] : t[b][0];
                    n === b && E.push(a);
                }
            });
            F = E.length ? [] : [n.isXAxis ? t.yAxis[0] : t.xAxis[0]];
            e(E, function (b) {
                -1 !== r(b, F) ||
                    a.find(F, function (a) {
                        return a.pos === b.pos && a.len && b.len;
                    }) ||
                    F.push(b);
            });
            G = d(l, n.translate(g, null, null, h));
            x(G) &&
                (n.horiz
                    ? e(F, function (a) {
                          var b;
                          A = a.pos;
                          C = A + a.len;
                          z = B = Math.round(G + n.transB);
                          if (z < v || z > v + n.width)
                              k
                                  ? (z = B =
                                        Math.min(Math.max(v, z), v + n.width))
                                  : (b = !0);
                          b || D.push("M", z, A, "L", B, C);
                      })
                    : e(F, function (a) {
                          var b;
                          z = a.pos;
                          B = z + a.len;
                          A = C = Math.round(w + n.height - G);
                          if (A < w || A > w + n.height)
                              k
                                  ? (A = C =
                                        Math.min(
                                            Math.max(w, A),
                                            n.top + n.height
                                        ))
                                  : (b = !0);
                          b || D.push("M", z, A, "L", B, C);
                      }));
            return 0 < D.length ? y.crispPolyLine(D, c || 1) : null;
        });
        F.prototype.getPlotBandPath = function (a, b) {
            b = this.getPlotLinePath(b, null, null, !0);
            a = this.getPlotLinePath(a, null, null, !0);
            var c = [],
                d;
            if (a && b)
                if (a.toString() === b.toString()) (c = a), (c.flat = !0);
                else
                    for (d = 0; d < a.length; d += 6)
                        c.push(
                            "M",
                            a[d + 1],
                            a[d + 2],
                            "L",
                            a[d + 4],
                            a[d + 5],
                            b[d + 4],
                            b[d + 5],
                            b[d + 1],
                            b[d + 2],
                            "z"
                        );
            else c = null;
            return c;
        };
        l.prototype.crispPolyLine = function (a, b) {
            var c;
            for (c = 0; c < a.length; c += 6)
                a[c + 1] === a[c + 4] &&
                    (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - (b % 2) / 2),
                    a[c + 2] === a[c + 5] &&
                        (a[c + 2] = a[c + 5] =
                            Math.round(a[c + 2]) + (b % 2) / 2);
            return a;
        };
        A(F.prototype, "hideCrosshair", function (a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide());
        });
        A(F.prototype, "drawCrosshair", function (a, b, c) {
            var e, f;
            a.call(this, b, c);
            if (
                u(this.crosshair.label) &&
                this.crosshair.label.enabled &&
                this.cross
            ) {
                a = this.chart;
                var g = this.options.crosshair.label,
                    l = this.horiz;
                e = this.opposite;
                f = this.left;
                var m = this.top,
                    n = this.crossLabel,
                    p,
                    r = g.format,
                    t = "",
                    w = "inside" === this.options.tickPosition,
                    y = !1 !== this.crosshair.snap,
                    x = 0;
                b || (b = this.cross && this.cross.e);
                p = l
                    ? "center"
                    : e
                    ? "right" === this.labelAlign
                        ? "right"
                        : "left"
                    : "left" === this.labelAlign
                    ? "left"
                    : "center";
                n ||
                    (n = this.crossLabel =
                        a.renderer
                            .label(null, null, null, g.shape || "callout")
                            .addClass(
                                "highcharts-crosshair-label" +
                                    (this.series[0] &&
                                        " highcharts-color-" +
                                            this.series[0].colorIndex)
                            )
                            .attr({
                                align: g.align || p,
                                padding: d(g.padding, 8),
                                r: d(g.borderRadius, 3),
                                zIndex: 2,
                            })
                            .add(this.labelGroup));
                l
                    ? ((p = y ? c.plotX + f : b.chartX),
                      (m += e ? 0 : this.height))
                    : ((p = e ? this.width + f : 0),
                      (m = y ? c.plotY + m : b.chartY));
                r ||
                    g.formatter ||
                    (this.isDatetimeAxis && (t = "%b %d, %Y"),
                    (r = "{value" + (t ? ":" + t : "") + "}"));
                b = y
                    ? c[this.isXAxis ? "x" : "y"]
                    : this.toValue(l ? b.chartX : b.chartY);
                n.attr({
                    text: r ? k(r, { value: b }) : g.formatter.call(this, b),
                    x: p,
                    y: m,
                    visibility: "visible",
                });
                b = n.getBBox();
                if (l) {
                    if ((w && !e) || (!w && e)) m = n.y - b.height;
                } else m = n.y - b.height / 2;
                l
                    ? ((e = f - b.x), (f = f + this.width - b.x))
                    : ((e = "left" === this.labelAlign ? f : 0),
                      (f =
                          "right" === this.labelAlign
                              ? f + this.width
                              : a.chartWidth));
                n.translateX < e && (x = e - n.translateX);
                n.translateX + b.width >= f &&
                    (x = -(n.translateX + b.width - f));
                n.attr({
                    x: p + x,
                    y: m,
                    anchorX: l ? p : this.opposite ? 0 : a.chartWidth,
                    anchorY: l
                        ? this.opposite
                            ? a.chartHeight
                            : 0
                        : m + b.height / 2,
                });
            }
        });
        I.init = function () {
            E.apply(this, arguments);
            this.setCompare(this.options.compare);
        };
        I.setCompare = function (a) {
            this.modifyValue =
                "value" === a || "percent" === a
                    ? function (b, c) {
                          var d = this.compareValue;
                          if (void 0 !== b && void 0 !== d)
                              return (
                                  (b =
                                      "value" === a
                                          ? b - d
                                          : (b / d) * 100 -
                                            (100 === this.options.compareBase
                                                ? 0
                                                : 100)),
                                  c && (c.change = b),
                                  b
                              );
                      }
                    : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0);
        };
        I.processData = function () {
            var a,
                b = -1,
                c,
                d,
                e = !0 === this.options.compareStart ? 0 : 1,
                f,
                g;
            H.apply(this, arguments);
            if (this.xAxis && this.processedYData)
                for (
                    c = this.processedXData,
                        d = this.processedYData,
                        f = d.length,
                        this.pointArrayMap &&
                            ((b = r("close", this.pointArrayMap)),
                            -1 === b &&
                                (b = r(
                                    this.pointValKey || "y",
                                    this.pointArrayMap
                                ))),
                        a = 0;
                    a < f - e;
                    a++
                )
                    if (
                        ((g = d[a] && -1 < b ? d[a][b] : d[a]),
                        x(g) && c[a + e] >= this.xAxis.min && 0 !== g)
                    ) {
                        this.compareValue = g;
                        break;
                    }
        };
        A(I, "getExtremes", function (a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue &&
                ((b = [
                    this.modifyValue(this.dataMin),
                    this.modifyValue(this.dataMax),
                ]),
                (this.dataMin = B(b)),
                (this.dataMax = D(b)));
        });
        F.prototype.setCompare = function (a, b) {
            this.isXAxis ||
                (e(this.series, function (b) {
                    b.setCompare(a);
                }),
                d(b, !0) && this.chart.redraw());
        };
        b.prototype.tooltipFormatter = function (b) {
            b = b.replace(
                "{point.change}",
                (0 < this.change ? "+" : "") +
                    a.numberFormat(
                        this.change,
                        d(this.series.tooltipOptions.changeDecimals, 2)
                    )
            );
            return g.apply(this, [b]);
        };
        A(p.prototype, "render", function (a) {
            (this.chart.is3d && this.chart.is3d()) ||
                this.chart.polar ||
                !this.xAxis ||
                this.xAxis.isRadial ||
                (!this.clipBox && this.animate
                    ? ((this.clipBox = w(this.chart.clipBox)),
                      (this.clipBox.width = this.xAxis.len),
                      (this.clipBox.height = this.yAxis.len))
                    : this.chart[this.sharedClipKey]
                    ? this.chart[this.sharedClipKey].attr({
                          width: this.xAxis.len,
                          height: this.yAxis.len,
                      })
                    : this.clipBox &&
                      ((this.clipBox.width = this.xAxis.len),
                      (this.clipBox.height = this.yAxis.len)));
            a.call(this);
        });
        A(C.prototype, "getSelectedPoints", function (a) {
            var b = a.call(this);
            e(this.series, function (a) {
                a.hasGroupedData &&
                    (b = b.concat(
                        t(a.points || [], function (a) {
                            return a.selected;
                        })
                    ));
            });
            return b;
        });
        A(C.prototype, "update", function (a, b) {
            "scrollbar" in b &&
                this.navigator &&
                (w(!0, this.options.scrollbar, b.scrollbar),
                this.navigator.update({}, !1),
                delete b.scrollbar);
            return a.apply(this, Array.prototype.slice.call(arguments, 1));
        });
    })(J);
    return J;
});
