self.AMP_CONFIG = {
    "allow-doc-opt-in": [
        "amp-date-picker",
        "amp-next-page",
        "ampdoc-shell",
        "disable-faster-amp-list",
        "inabox-rov",
        "inline-styles",
        "url-replacement-v2",
    ],
    "allow-url-opt-in": ["pump-early-frame"],
    canary: 0,
    expAdsenseA4A: 0.01,
    expDoubleclickA4A: 0.01,
    expDfpCanonicalFf: 0.05,
    expUnconditionedCanonical: 0.05,
    dbclk_a4a_viz_change: 0.02,
    a4aProfilingRate: 0.1,
    "ad-type-custom": 1,
    "ios-embed-wrapper": 1,
    "amp-apester-media": 1,
    "amp-ima-video": 1,
    "amp-playbuzz": 1,
    "chunked-amp": 1,
    "amp-auto-ads": 1,
    "amp-auto-ads-adsense-holdout": 0.1,
    "slidescroll-disable-css-snap": 1,
    "version-locking": 1,
    "as-use-attr-for-format": 0.01,
    a4aFastFetchDoubleclickLaunched: 0,
    a4aFastFetchAdSenseLaunched: 0,
    "a4a-new-signature-verifier": 1,
    "pump-early-frame": 1,
    "a4a-measure-get-ad-urls": 0,
    "3p-use-ampcontext": 1,
    "amp-animation": 1,
    "amp-live-list-sorting": 1,
    "amp-sidebar toolbar": 1,
    "svg-in-mustache": 0,
    "disable-faster-amp-list": 1,
    "a4a-safeframe-preloading-off": 0.01,
    expUnconditionedAdxIdentity: 0.01,
    expUnconditionedDfpIdentity: 0.01,
    expUnconditionedCanonicalHoldback: 0.01,
    "amp-consent": 1,
    "amp-img-native-srcset": 0.7,
    v: "011529106593171",
    type: "production",
};
/*AMP_CONFIG*/ try {
    (function () {
        var f;
        function aa(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.prototype = new c();
            a.prototype.constructor = a;
            for (var d in b)
                if (Object.defineProperties) {
                    var e = Object.getOwnPropertyDescriptor(b, d);
                    e && Object.defineProperty(a, d, e);
                } else a[d] = b[d];
        }
        var ea = (function (a) {
            return "undefined" != typeof window && window === a
                ? a
                : "undefined" != typeof global && null != global
                ? global
                : a;
        })(this);
        function fa(a, b) {
            b = void 0 === b ? "" : b;
            try {
                return decodeURIComponent(a);
            } catch (c) {
                return b;
            }
        }
        var ga = /(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;
        function n(a) {
            var b = Object.create(null);
            if (!a) return b;
            for (var c; (c = ga.exec(a)); ) {
                var d = fa(c[1], c[1]),
                    e = c[2] ? fa(c[2], c[2]) : "";
                b[d] = e;
            }
            return b;
        }
        var ha = "";
        function r(a) {
            var b = a || self,
                c;
            if (b.AMP_MODE) c = b.AMP_MODE;
            else {
                c = b;
                var d = n(c.location.originalHash || c.location.hash),
                    e = n(c.location.search);
                ha ||
                    (ha =
                        c.AMP_CONFIG && c.AMP_CONFIG.v
                            ? c.AMP_CONFIG.v
                            : "011529106593171");
                c = b.AMP_MODE = {
                    localDev: !1,
                    development: !("1" != d.development && !c.AMP_DEV_MODE),
                    examiner: "2" == d.development,
                    filter: d.filter,
                    geoOverride: d["amp-geo"],
                    minified: !0,
                    lite: void 0 != e.amp_lite,
                    test: !1,
                    log: d.log,
                    version: "1529106593171",
                    rtvVersion: ha,
                };
            }
            return c;
        }
        var ia = Object.prototype.toString;
        function ja(a) {
            return Array.isArray(a);
        }
        function ka(a) {
            return "[object Object]" === ia.call(a);
        }
        function pa(a) {
            return "number" === typeof a && isFinite(a);
        }
        function qa(a) {
            return 0 <= a.indexOf("\u200b\u200b\u200b");
        }
        function ra(a, b, c) {
            this.win = a;
            this.Lg = b;
            this.ab =
                this.win.console && this.win.console.log && "0" != r().log
                    ? this.Lg({
                          localDev: !1,
                          development: r(void 0).development,
                          filter: r(void 0).filter,
                          minified: !0,
                          lite: r(void 0).lite,
                          test: !1,
                          log: r(void 0).log,
                          version: r(void 0).version,
                          rtvVersion: r(void 0).rtvVersion,
                      })
                    : 0;
            this.Hc = c || "";
        }
        function sa(a, b, c) {
            if (0 != a.ab) {
                var d = a.win.console.log;
                "ERROR" == b
                    ? (d = a.win.console.error || d)
                    : "INFO" == b
                    ? (d = a.win.console.info || d)
                    : "WARN" == b && (d = a.win.console.warn || d);
                d.apply(a.win.console, c);
            }
        }
        f = ra.prototype;
        f.isEnabled = function () {
            return 0 != this.ab;
        };
        f.fine = function (a, b) {
            4 <= this.ab &&
                sa(this, "FINE", Array.prototype.slice.call(arguments, 1));
        };
        f.info = function (a, b) {
            3 <= this.ab &&
                sa(this, "INFO", Array.prototype.slice.call(arguments, 1));
        };
        f.warn = function (a, b) {
            2 <= this.ab &&
                sa(this, "WARN", Array.prototype.slice.call(arguments, 1));
        };
        f.Fa = function (a, b) {
            if (1 <= this.ab)
                sa(this, "ERROR", Array.prototype.slice.call(arguments, 1));
            else {
                var c = ta.apply(
                    null,
                    Array.prototype.slice.call(arguments, 1)
                );
                wa(this, c);
                return c;
            }
        };
        f.error = function (a, b) {
            var c = this.Fa.apply(this, arguments);
            c && ((c.name = a || c.name), self.reportError(c));
        };
        f.expectedError = function (a, b) {
            var c = this.Fa.apply(this, arguments);
            c && ((c.expected = !0), self.reportError(c));
        };
        f.createError = function (a) {
            var b = ta.apply(null, arguments);
            wa(this, b);
            return b;
        };
        f.createExpectedError = function (a) {
            var b = ta.apply(null, arguments);
            wa(this, b);
            b.expected = !0;
            return b;
        };
        f.assert = function (a, b, c) {
            var d;
            if (!a) {
                var e = (b || "Assertion failed").split("%s"),
                    g = e.shift(),
                    h = g,
                    k = [];
                "" != g && k.push(g);
                for (g = 2; g < arguments.length; g++) {
                    var l = arguments[g];
                    l && l.tagName && (d = l);
                    var m = e.shift();
                    k.push(l);
                    var q = m.trim();
                    "" != q && k.push(q);
                    var q = h,
                        p;
                    p =
                        (p = l) && 1 == p.nodeType
                            ? p.tagName.toLowerCase() + (p.id ? "#" + p.id : "")
                            : p;
                    h = q + (p + m);
                }
                g = Error(h);
                g.fromAssert = !0;
                g.associatedElement = d;
                g.messageArray = k;
                wa(this, g);
                self.reportError(g);
                throw g;
            }
            return a;
        };
        f.assertElement = function (a, b) {
            this.assert(
                a && 1 == a.nodeType,
                (b || "Element expected") + ": %s",
                a
            );
            return a;
        };
        f.assertString = function (a, b) {
            this.assert(
                "string" == typeof a,
                (b || "String expected") + ": %s",
                a
            );
            return a;
        };
        f.assertNumber = function (a, b) {
            this.assert(
                "number" == typeof a,
                (b || "Number expected") + ": %s",
                a
            );
            return a;
        };
        f.assertBoolean = function (a, b) {
            this.assert(!!a === a, (b || "Boolean expected") + ": %s", a);
            return a;
        };
        f.assertEnumValue = function (a, b, c) {
            a: {
                for (var d in a)
                    if (a[d] === b) {
                        a = !0;
                        break a;
                    }
                a = !1;
            }
            if (a) return b;
            this.assert(!1, 'Unknown %s value: "%s"', c || "enum", b);
        };
        function wa(a, b) {
            b = xa(b);
            a.Hc
                ? b.message
                    ? -1 == b.message.indexOf(a.Hc) && (b.message += a.Hc)
                    : (b.message = a.Hc)
                : qa(b.message) &&
                  (b.message = b.message.replace("\u200b\u200b\u200b", ""));
        }
        function xa(a) {
            var b = a.message,
                c = String(Math.random());
            a.message = c;
            if (a.message === c) return (a.message = b), a;
            var b = Error(a.message),
                d;
            for (d in a) b[d] = a[d];
            b.stack = a.stack;
            return b;
        }
        function ta(a) {
            for (var b = null, c = "", d = 0; d < arguments.length; d++) {
                var e = arguments[d];
                e instanceof Error && !b
                    ? (b = xa(e))
                    : (c && (c += " "), (c += e));
            }
            b ? c && (b.message = c + ": " + b.message) : (b = Error(c));
            return b;
        }
        function z(a) {
            var b = ta.apply(null, arguments);
            setTimeout(function () {
                self.reportError(b);
                throw b;
            });
        }
        self.log = self.log || { user: null, dev: null, userForEmbed: null };
        var Ba = self.log,
            Ca = null;
        function A(a) {
            Ba.user || (Ba.user = Da("\u200b\u200b\u200b"));
            var b = Ba.user.win;
            return a && a.ownerDocument.defaultView != b
                ? Ba.userForEmbed
                    ? Ba.userForEmbed
                    : (Ba.userForEmbed = Da("\u200b\u200b\u200b\u200b"))
                : Ba.user;
        }
        function Da(a) {
            if (!Ca) throw Error("failed to call initLogConstructor");
            return new Ca(
                self,
                function (a) {
                    var b = parseInt(a.log, 10);
                    return a.development || 1 <= b ? 4 : 2;
                },
                a
            );
        }
        function D() {
            if (Ba.dev) return Ba.dev;
            if (!Ca) throw Error("failed to call initLogConstructor");
            return (Ba.dev = new Ca(self, function (a) {
                a = parseInt(a.log, 10);
                return 3 <= a ? 4 : 2 <= a ? 3 : 0;
            }));
        }
        var Ea = Object.prototype.hasOwnProperty;
        function G(a) {
            var b = Object.create(null);
            a && Object.assign(b, a);
            return b;
        }
        function H(a) {
            return a || {};
        }
        function Fa(a, b) {
            var c = a.length - b.length;
            return 0 <= c && a.indexOf(b, c) == c;
        }
        function Ga(a, b) {
            return b.length > a.length ? !1 : 0 == a.lastIndexOf(b, 0);
        }
        var Ha = {},
            Ia = self.AMP_CONFIG || {};
        Ha.urls = {
            thirdParty: Ia.thirdPartyUrl || "https://3p.ampproject.net",
            thirdPartyFrameHost: Ia.thirdPartyFrameHost || "ampproject.net",
            thirdPartyFrameRegex:
                ("string" == typeof Ia.thirdPartyFrameRegex
                    ? new RegExp(Ia.thirdPartyFrameRegex)
                    : Ia.thirdPartyFrameRegex) || /^d-\d+\.ampproject\.net$/,
            cdn: Ia.cdnUrl || "https://cdn.ampproject.org",
            cdnProxyRegex:
                ("string" == typeof Ia.cdnProxyRegex
                    ? new RegExp(Ia.cdnProxyRegex)
                    : Ia.cdnProxyRegex) ||
                /^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/,
            localhostRegex: /^https?:\/\/localhost(:\d+)?$/,
            errorReporting:
                Ia.errorReportingUrl ||
                "https://amp-error-reporting.appspot.com/r",
            localDev: Ia.localDev || !1,
        };
        function Ja(a) {
            this.og = a;
            this.Qc = this.R = 0;
            this.Sa = Object.create(null);
        }
        Ja.prototype.has = function (a) {
            return !!this.Sa[a];
        };
        Ja.prototype.get = function (a) {
            var b = this.Sa[a];
            if (b) return (b.access = ++this.Qc), b.payload;
        };
        Ja.prototype.put = function (a, b) {
            this.has(a) || this.R++;
            this.Sa[a] = { payload: b, access: this.Qc };
            if (!(this.R <= this.og)) {
                D().warn("lru-cache", "Trimming LRU cache");
                a = this.Sa;
                var c = this.Qc + 1,
                    d,
                    e;
                for (e in a) {
                    var g = a[e].access;
                    g < c && ((c = g), (d = e));
                }
                void 0 !== d && (delete a[d], this.R--);
            }
        };
        var Ka = H({ c: !0, v: !0, a: !0, ad: !0 }),
            La,
            Ma,
            Pa = /[?&]amp_js[^&]*/,
            Qa = /[?&]amp_gsa[^&]*/,
            Ra = /[?&]usqp[^&]*/,
            Sa = ["javascript:", "data:", "vbscript:"];
        function Ta(a) {
            return a.origin || I(a.location.href).origin;
        }
        function I(a, b) {
            La ||
                ((La = self.document.createElement("a")),
                (Ma = self.UrlCache || (self.UrlCache = new Ja(100))));
            return Ua(La, a, b ? null : Ma);
        }
        function Ua(a, b, c) {
            if (c && c.has(b)) return c.get(b);
            a.href = b;
            a.protocol || (a.href = a.href);
            var d = {
                href: a.href,
                protocol: a.protocol,
                host: a.host,
                hostname: a.hostname,
                port: "0" == a.port ? "" : a.port,
                pathname: a.pathname,
                search: a.search,
                hash: a.hash,
                origin: null,
            };
            "/" !== d.pathname[0] && (d.pathname = "/" + d.pathname);
            if (
                ("http:" == d.protocol && 80 == d.port) ||
                ("https:" == d.protocol && 443 == d.port)
            )
                (d.port = ""), (d.host = d.hostname);
            d.origin =
                a.origin && "null" != a.origin
                    ? a.origin
                    : "data:" != d.protocol && d.host
                    ? d.protocol + "//" + d.host
                    : d.href;
            var e = d;
            c && c.put(b, e);
            return e;
        }
        function Va(a, b, c) {
            if (!b) return a;
            var d = a.split("#", 2),
                e = d[0].split("?", 2),
                g =
                    e[0] +
                    (e[1]
                        ? c
                            ? "?" + b + "&" + e[1]
                            : "?" + e[1] + "&" + b
                        : "?" + b);
            return (g += d[1] ? "#" + d[1] : "");
        }
        function bb(a, b) {
            return Va(a, cb(b));
        }
        function cb(a) {
            var b = [],
                c;
            for (c in a) {
                var d = a[c];
                if (null != d)
                    if (ja(d))
                        for (var e = 0; e < d.length; e++) {
                            var g = d[e];
                            b.push(
                                encodeURIComponent(c) +
                                    "=" +
                                    encodeURIComponent(g)
                            );
                        }
                    else
                        (e = d),
                            b.push(
                                encodeURIComponent(c) +
                                    "=" +
                                    encodeURIComponent(e)
                            );
            }
            return b.join("&");
        }
        function db(a) {
            "string" == typeof a && (a = I(a));
            return (
                "https:" == a.protocol ||
                "localhost" == a.hostname ||
                Fa(a.hostname, ".localhost")
            );
        }
        function eb(a, b, c) {
            c = void 0 === c ? "source" : c;
            A().assert(null != a, "%s %s must be available", b, c);
            var d = a;
            A().assert(
                db(d) || /^(\/\/)/.test(d),
                '%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',
                b,
                c,
                d
            );
            return d;
        }
        function fb(a) {
            var b = a.indexOf("#");
            return -1 == b ? a : a.substring(0, b);
        }
        function gb(a) {
            "string" == typeof a && (a = I(a));
            return Ha.urls.cdnProxyRegex.test(a.origin);
        }
        function hb(a) {
            if (!a) return !0;
            "string" == typeof a && (a = I(a));
            return !Sa.includes(a.protocol);
        }
        function ib(a) {
            "string" == typeof a && (a = I(a));
            if (!gb(a)) return a.href;
            var b = a.pathname.split("/"),
                c = b[1];
            A().assert(Ka[c], "Unknown path prefix in url %s", a.href);
            var d = b[2],
                e =
                    "s" == d
                        ? "https://" + decodeURIComponent(b[3])
                        : "http://" + decodeURIComponent(d);
            A().assert(0 < e.indexOf("."), "Expected a . in origin %s", e);
            b.splice(1, "s" == d ? 3 : 2);
            b = e + b.join("/");
            c =
                (c = a.search) && "?" != c
                    ? (c = c
                          .replace(Pa, "")
                          .replace(Qa, "")
                          .replace(Ra, "")
                          .replace(/^[?&]/, ""))
                        ? "?" + c
                        : ""
                    : "";
            return b + c + (a.hash || "");
        }
        function jb(a) {
            return I(ib(a)).origin;
        }
        function kb(a) {
            var b = I(a),
                c = n(b.search);
            A().assert(
                !("__amp_source_origin" in c),
                "Source origin is not allowed in %s",
                a
            );
        }
        function lb(a, b) {
            var c;
            try {
                c = a.document.cookie;
            } catch (k) {
                c = "";
            }
            var d = c;
            if (!d) return null;
            var e = d.split(";");
            for (a = 0; a < e.length; a++) {
                var g = e[a].trim(),
                    h = g.indexOf("=");
                if ((c = -1 != h))
                    (c = g.substring(0, h).trim()), (c = fa(c, void 0) == b);
                if (c) return (b = g.substring(h + 1).trim()), fa(b, b);
            }
            return null;
        }
        function mb(a, b, c, d, e) {
            if (!e || !e.allowOnProxyOrigin) {
                if (gb(a.location.href))
                    throw Error(
                        "Should never attempt to set cookie on proxy origin: " +
                            b
                    );
                var g = I(a.location.href).hostname.toLowerCase(),
                    h = I(Ha.urls.cdn).hostname.toLowerCase();
                if (g == h || Fa(g, "." + h))
                    throw Error(
                        "Should never attempt to set cookie on proxy origin. (in depth check): " +
                            b
                    );
            }
            if (e && e.highestAvailableDomain)
                for (
                    var k = a.location.hostname.split("."),
                        g = k[k.length - 1],
                        h = k.length - 2;
                    0 <= h;
                    h--
                )
                    if (
                        ((g = k[h] + "." + g), nb(a, b, c, d, g), lb(a, b) == c)
                    )
                        return;
            g = void 0;
            e && e.domain && (g = e.domain);
            nb(a, b, c, d, g);
        }
        function nb(a, b, c, d, e) {
            "ampproject.org" == e && ((c = "delete"), (d = 0));
            b =
                encodeURIComponent(b) +
                "=" +
                encodeURIComponent(c) +
                "; path=/" +
                (e ? "; domain=" + e : "") +
                "; expires=" +
                new Date(d).toUTCString();
            try {
                a.document.cookie = b;
            } catch (g) {}
        }
        function ob(a) {
            return !(!a.AMP_CONFIG || !a.AMP_CONFIG.canary);
        }
        function J(a, b) {
            var c = pb(a);
            return !!c[b];
        }
        function qb(a, b, c, d) {
            var e = J(a, b),
                g = !(void 0 !== c ? !c : e);
            if (g != e && ((pb(a)[b] = g), !d)) {
                var h = rb(a);
                h[b] = g;
                b = h;
                var k = [],
                    l;
                for (l in b) k.push((!1 === b[l] ? "-" : "") + l);
                mb(a, "AMP_EXP", k.join(","), Date.now() + 15552e6, {
                    domain: a.location.hostname,
                    allowOnProxyOrigin: !0,
                });
            }
            return g;
        }
        function pb(a) {
            if (a.__AMP__EXPERIMENT_TOGGLES) return a.__AMP__EXPERIMENT_TOGGLES;
            a.__AMP__EXPERIMENT_TOGGLES = Object.create(null);
            var b = a.__AMP__EXPERIMENT_TOGGLES;
            if (a.AMP_CONFIG)
                for (var c in a.AMP_CONFIG) {
                    var d = a.AMP_CONFIG[c];
                    "number" === typeof d &&
                        0 <= d &&
                        1 >= d &&
                        (b[c] = Math.random() < d);
                }
            if (
                a.AMP_CONFIG &&
                Array.isArray(a.AMP_CONFIG["allow-doc-opt-in"]) &&
                0 < a.AMP_CONFIG["allow-doc-opt-in"].length
            ) {
                var e = a.AMP_CONFIG["allow-doc-opt-in"],
                    g = a.document.head.querySelector(
                        'meta[name="amp-experiments-opt-in"]'
                    );
                if (g) {
                    var h = g.getAttribute("content").split(",");
                    for (c = 0; c < h.length; c++)
                        -1 != e.indexOf(h[c]) && (b[h[c]] = !0);
                }
            }
            Object.assign(b, rb(a));
            if (
                a.AMP_CONFIG &&
                Array.isArray(a.AMP_CONFIG["allow-url-opt-in"]) &&
                0 < a.AMP_CONFIG["allow-url-opt-in"].length
            ) {
                c = a.AMP_CONFIG["allow-url-opt-in"];
                a = n(a.location.originalHash || a.location.hash);
                for (var k = 0; k < c.length; k++) {
                    var l = a["e-" + c[k]];
                    "1" == l && (b[c[k]] = !0);
                    "0" == l && (b[c[k]] = !1);
                }
            }
            return b;
        }
        function rb(a) {
            var b = lb(a, "AMP_EXP"),
                c = b ? b.split(/\s*,\s*/g) : [];
            a = Object.create(null);
            for (var d = 0; d < c.length; d++)
                0 != c[d].length &&
                    ("-" == c[d][0]
                        ? (a[c[d].substr(1)] = !1)
                        : (a[c[d]] = !0));
            return a;
        }
        function sb(a, b) {
            var c = b || 0,
                d = this.length;
            for (b = 0 <= c ? c : Math.max(d + c, 0); b < d; b++) {
                var e = this[b];
                if (e === a || (a !== a && e !== e)) return !0;
            }
            return !1;
        }
        function tb(a) {
            return a == this || this.documentElement.contains(a);
        }
        function Db(a) {
            var b = a.HTMLDocument || a.Document;
            b.prototype.contains ||
                a.Object.defineProperty(b.prototype, "contains", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !0,
                    value: tb,
                });
        }
        function Eb(a) {
            return (a = Number(a)) ? (0 < a ? 1 : -1) : a;
        }
        var Fb = Object.prototype.hasOwnProperty;
        function Gb(a, b) {
            if (null == a)
                throw new TypeError(
                    "Cannot convert undefined or null to object"
                );
            for (var c = Object(a), d = 1; d < arguments.length; d++) {
                var e = arguments[d];
                if (null != e) for (var g in e) Fb.call(e, g) && (c[g] = e[g]);
            }
            return c;
        }
        function K(a) {
            if (!(this instanceof K))
                throw new TypeError("Constructor Promise requires `new`");
            if (!Hb(a)) throw new TypeError("Must pass resolver function");
            this._state = Ib;
            this._value = [];
            this._isChainEnd = !0;
            Jb(this, Kb(this, Lb), Kb(this, Mb), { then: a });
        }
        K.prototype.then = function (a, b) {
            a = Hb(a) ? a : void 0;
            b = Hb(b) ? b : void 0;
            if (a || b) this._isChainEnd = !1;
            return this._state(this._value, a, b);
        };
        K.prototype.catch = function (a) {
            return this.then(void 0, a);
        };
        K.resolve = function (a) {
            var b = this,
                c;
            return (c =
                a === Object(a) && a instanceof this
                    ? a
                    : new b(function (b) {
                          b(a);
                      }));
        };
        K.reject = function (a) {
            return new this(function (b, c) {
                c(a);
            });
        };
        K.all = function (a) {
            var b = this;
            return new b(function (c, d) {
                var e = a.length,
                    g = Array(e);
                if (0 === e) return c(g);
                Nb(a, function (a, k) {
                    b.resolve(a).then(function (a) {
                        g[k] = a;
                        0 === --e && c(g);
                    }, d);
                });
            });
        };
        K.race = function (a) {
            var b = this;
            return new b(function (c, d) {
                for (var e = 0; e < a.length; e++) b.resolve(a[e]).then(c, d);
            });
        };
        function Ob(a) {
            throw a;
        }
        K._overrideUnhandledExceptionHandler = function (a) {
            Ob = a;
        };
        function Lb(a, b, c, d) {
            if (!b) {
                if ((b = d)) (b = b.promise), (b._state = Lb), (b._value = a);
                return this;
            }
            d || (d = new Pb(this.constructor));
            Qb(Rb(d, b, a));
            return d.promise;
        }
        function Mb(a, b, c, d) {
            if (!c)
                return (
                    d && ((b = d.promise), (b._state = Mb), (b._value = a)),
                    this
                );
            d || (d = new Pb(this.constructor));
            Qb(Rb(d, c, a));
            return d.promise;
        }
        function Ib(a, b, c, d) {
            if (!d) {
                if (!b && !c) return this;
                d = new Pb(this.constructor);
            }
            a.push({
                deferred: d,
                onFulfilled: b || d.resolve,
                onRejected: c || d.reject,
            });
            return d.promise;
        }
        function Pb(a) {
            var b = this;
            this.promise = new a(function (a, d) {
                b.resolve = a;
                b.reject = d;
            });
            return b;
        }
        function Sb(a, b, c, d) {
            var e = a._value;
            a._state = b;
            a._value = c;
            d &&
                b === Ib &&
                d._state(c, void 0, void 0, {
                    promise: a,
                    resolve: void 0,
                    reject: void 0,
                });
            for (var g = 0; g < e.length; g++) {
                var h = e[g];
                a._state(c, h.onFulfilled, h.onRejected, h.deferred);
            }
            e.length = 0;
            b === Mb &&
                a._isChainEnd &&
                setTimeout(function () {
                    a._isChainEnd && Ob(c, a);
                }, 0);
        }
        function Kb(a, b) {
            return function (c) {
                Sb(a, b, c);
            };
        }
        function Tb() {}
        function Hb(a) {
            return "function" === typeof a;
        }
        function Nb(a, b) {
            for (var c = 0; c < a.length; c++) b(a[c], c);
        }
        function Rb(a, b, c) {
            var d = a.promise,
                e = a.resolve,
                g = a.reject;
            return function () {
                try {
                    var a = b(c);
                    Jb(d, e, g, a, a);
                } catch (k) {
                    g(k);
                }
            };
        }
        var Qb = (function () {
            function a() {
                for (var a = 0; a < e; a++) {
                    var b = d[a];
                    d[a] = null;
                    b();
                }
                e = 0;
            }
            function b(a) {
                0 === e && c();
                d[e++] = a;
            }
            var c;
            "undefined" !== typeof window && window.postMessage
                ? (window.addEventListener("message", a),
                  (c = function () {
                      window.postMessage("macro-task", "*");
                  }))
                : (c = function () {
                      setTimeout(a, 0);
                  });
            var d = Array(16),
                e = 0;
            return b;
        })();
        function Jb(a, b, c, d, e) {
            var g = c,
                h,
                k;
            try {
                if (d === a)
                    throw new TypeError("Cannot fulfill promise with itself");
                var l = d === Object(d);
                l && d instanceof a.constructor
                    ? Sb(a, d._state, d._value, d)
                    : l && (h = d.then) && Hb(h)
                    ? ((k = function (d) {
                          k = g = Tb;
                          Jb(a, b, c, d, d);
                      }),
                      (g = function (a) {
                          k = g = Tb;
                          c(a);
                      }),
                      h.call(
                          e,
                          function (a) {
                              k(a);
                          },
                          function (a) {
                              g(a);
                          }
                      ))
                    : b(d);
            } catch (m) {
                g(m);
            }
        }
        function Ub(a, b) {
            var c = void 0 === b ? this.contains(a) : !b;
            if (c) return this.remove(a), !1;
            this.add(a);
            return !0;
        }
        function Vb(a) {
            /Trident|MSIE|IEMobile/i.test(a.navigator.userAgent) &&
                a.DOMTokenList &&
                a.Object.defineProperty(a.DOMTokenList.prototype, "toggle", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !0,
                    value: Ub,
                });
        } /*
 Copyright (C) 2014-2016 by Andrea Giammarchi - @WebReflection

Use of this source code is governed by a MIT-style
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.

*/
        function Wb(a) {
            function b(a) {
                return a.toLowerCase();
            }
            var c = "auto";
            function d() {
                var a = ic.splice(0, ic.length);
                for (jc = 0; a.length; ) a.shift().call(null, a.shift());
            }
            function e(a, b) {
                for (var c = 0, d = a.length; c < d; c++) F(a[c], b);
            }
            function g(a) {
                for (var b = 0, c = a.length, d; b < c; b++)
                    (d = a[b]), ub(d, vb[k(d)]);
            }
            function h(a) {
                return function (b) {
                    sj(b) &&
                        (F(b, a), ba.length && e(b.querySelectorAll(ba), a));
                };
            }
            function k(a) {
                var b = Wa.call(a, "is"),
                    c = a.nodeName.toUpperCase();
                a = la.call(Na, b ? lc + b.toUpperCase() : wb + c);
                return b && -1 < a && !l(c, b) ? -1 : a;
            }
            function l(a, b) {
                return -1 < ba.indexOf(a + '[is="' + b + '"]');
            }
            function m(a) {
                var b = a.currentTarget,
                    c = a.attrChange,
                    d = a.attrName,
                    e = a.target,
                    g = a[mc] || 2,
                    h = a[pd] || 3;
                if (
                    nc &&
                    (!e || e === b) &&
                    b[ya] &&
                    "style" !== d &&
                    (a.prevValue !== a.newValue ||
                        ("" === a.newValue && (c === g || c === h)))
                )
                    b[ya](
                        d,
                        c === g ? null : a.prevValue,
                        c === h ? null : a.newValue
                    );
            }
            function q(a) {
                var b = h(a);
                return function (a) {
                    ic.push(b, a.target);
                    jc && clearTimeout(jc);
                    jc = setTimeout(d, 1);
                };
            }
            function p(a) {
                Bf && ((Bf = !1), a.currentTarget.removeEventListener(Cf, p));
                ba.length &&
                    e(
                        (a.target || E).querySelectorAll(ba),
                        a.detail === ma ? ma : ca
                    );
                Xa && y();
            }
            function u(a, b) {
                Df.call(this, a, b);
                qd.call(this, { target: this });
            }
            function t(a, b) {
                uj(a, b);
                oc
                    ? oc.observe(a, vj)
                    : (pc &&
                          ((a.setAttribute = u), (a[Z] = rd(a)), a[da](wj, qd)),
                      a[da](Oa, m));
                a[xb] && nc && ((a.created = !0), a[xb](), (a.created = !1));
            }
            function y() {
                for (var a, b = 0, c = yb.length; b < c; b++)
                    (a = yb[b]),
                        Ya.contains(a) || (c--, yb.splice(b--, 1), F(a, ma));
            }
            function B(a) {
                throw Error("A " + a + " type is already registered");
            }
            function F(a, b) {
                var c,
                    d = k(a);
                -1 < d &&
                    (sd(a, vb[d]),
                    (d = 0),
                    b !== ca || a[ca]
                        ? b !== ma ||
                          a[ma] ||
                          ((a[ca] = !1), (a[ma] = !0), (d = 1))
                        : ((a[ma] = !1),
                          (a[ca] = !0),
                          (d = 1),
                          Xa && 0 > la.call(yb, a) && yb.push(a)),
                    d && (c = a[b + ua]) && c.call(a));
            }
            function C() {}
            function x(a, c, d) {
                d = (d && d[zb]) || "";
                var e = c.prototype,
                    g = td(e),
                    h = c.observedAttributes || ud,
                    k = { prototype: g };
                qc(g, xb, {
                    value: function () {
                        if (rc) rc = !1;
                        else if (!this[Ab]) {
                            this[Ab] = !0;
                            new c(this);
                            e[xb] && e[xb].call(this);
                            var a = Bb[sc.get(c)];
                            (!Za || 1 < a.create.length) && Q(this);
                        }
                    },
                });
                qc(g, ya, {
                    value: function (a) {
                        -1 < la.call(h, a) && e[ya].apply(this, arguments);
                    },
                });
                e[Ef] && qc(g, xj, { value: e[Ef] });
                e[Ff] && qc(g, yj, { value: e[Ff] });
                d && (k[zb] = d);
                a = a.toUpperCase();
                Bb[a] = { constructor: c, create: d ? [d, b(a)] : [a] };
                sc.set(c, a);
                E[za](a.toLowerCase(), k);
                na(a);
                $a[a].r();
            }
            function v(a) {
                return (a = Bb[a.toUpperCase()]) && a.constructor;
            }
            function w(a) {
                return "string" === typeof a ? a : (a && a.is) || "";
            }
            function Q(a) {
                for (
                    var b = a[ya], c = b ? a.attributes : ud, d = c.length, e;
                    d--;

                )
                    (e = c[d]),
                        b.call(
                            a,
                            e.name || e.nodeName,
                            null,
                            e.value || e.nodeValue
                        );
            }
            function na(a) {
                a = a.toUpperCase();
                a in $a ||
                    (($a[a] = {}),
                    ($a[a].p = new Gf(function (b) {
                        $a[a].r = b;
                    })));
                return $a[a].p;
            }
            function oa() {
                function c(b) {
                    var c = a[b];
                    if (c) {
                        a[b] = function tj(a) {
                            var b;
                            a || (a = this);
                            a[Ab] ||
                                ((rc = !0),
                                (a = Bb[sc.get(a.constructor)]),
                                (a = (b = Za && 1 === a.create.length)
                                    ? Reflect.construct(c, ud, a.constructor)
                                    : E.createElement.apply(E, a.create)),
                                (a[Ab] = !0),
                                (rc = !1),
                                b || Q(a));
                            return a;
                        };
                        a[b].prototype = c.prototype;
                        try {
                            c.prototype.constructor = a[b];
                        } catch (tj) {
                            (zj = !0), ab(c, Ab, { value: a[b] });
                        }
                    }
                }
                va && delete a.customElements;
                ab(a, "customElements", { configurable: !0, value: new C() });
                ab(a, "CustomElementRegistry", { configurable: !0, value: C });
                for (
                    var d = Aa.get(/^HTML[A-Z]*[a-z]/), e = d.length;
                    e--;
                    c(d[e])
                );
                E.createElement = function (a, c) {
                    return (c = w(c))
                        ? vd.call(this, a, b(c))
                        : vd.call(this, a);
                };
                Hf || ((wd = !0), E[za](""));
            }
            var E = a.document,
                T = a.Object,
                Aa = (function (a) {
                    function b(a, b) {
                        b = b.toLowerCase();
                        b in e ||
                            ((e[a] = (e[a] || []).concat(b)),
                            (e[b] = e[b.toUpperCase()] = a));
                    }
                    function c(a) {
                        var b = [],
                            c;
                        for (c in e) a.test(c) && b.push(c);
                        return b;
                    }
                    var d = /^[A-Z]+[a-z]/,
                        e = (T.create || T)(null),
                        g = {},
                        h,
                        k,
                        l,
                        m;
                    for (k in a)
                        for (m in a[k])
                            for (
                                l = a[k][m], e[m] = l, h = 0;
                                h < l.length;
                                h++
                            )
                                e[l[h].toLowerCase()] = e[l[h].toUpperCase()] =
                                    m;
                    g.get = function (a) {
                        return "string" === typeof a
                            ? e[a] || (d.test(a) ? [] : "")
                            : c(a);
                    };
                    g.set = function tm(a, c) {
                        return d.test(a) ? b(a, c) : b(c, a), g;
                    };
                    return g;
                })({
                    collections: {
                        HTMLAllCollection: ["all"],
                        HTMLCollection: ["forms"],
                        HTMLFormControlsCollection: ["elements"],
                        HTMLOptionsCollection: ["options"],
                    },
                    elements: {
                        Element: ["element"],
                        HTMLAnchorElement: ["a"],
                        HTMLAppletElement: ["applet"],
                        HTMLAreaElement: ["area"],
                        HTMLAttachmentElement: ["attachment"],
                        HTMLAudioElement: ["audio"],
                        HTMLBRElement: ["br"],
                        HTMLBaseElement: ["base"],
                        HTMLBodyElement: ["body"],
                        HTMLButtonElement: ["button"],
                        HTMLCanvasElement: ["canvas"],
                        HTMLContentElement: ["content"],
                        HTMLDListElement: ["dl"],
                        HTMLDataElement: ["data"],
                        HTMLDataListElement: ["datalist"],
                        HTMLDetailsElement: ["details"],
                        HTMLDialogElement: ["dialog"],
                        HTMLDirectoryElement: ["dir"],
                        HTMLDivElement: ["div"],
                        HTMLDocument: ["document"],
                        HTMLElement:
                            "element abbr address article aside b bdi bdo cite code command dd dfn dt em figcaption figure footer header i kbd mark nav noscript rp rt ruby s samp section small strong sub summary sup u var wbr".split(
                                " "
                            ),
                        HTMLEmbedElement: ["embed"],
                        HTMLFieldSetElement: ["fieldset"],
                        HTMLFontElement: ["font"],
                        HTMLFormElement: ["form"],
                        HTMLFrameElement: ["frame"],
                        HTMLFrameSetElement: ["frameset"],
                        HTMLHRElement: ["hr"],
                        HTMLHeadElement: ["head"],
                        HTMLHeadingElement: "h1 h2 h3 h4 h5 h6".split(" "),
                        HTMLHtmlElement: ["html"],
                        HTMLIFrameElement: ["iframe"],
                        HTMLImageElement: ["img"],
                        HTMLInputElement: ["input"],
                        HTMLKeygenElement: ["keygen"],
                        HTMLLIElement: ["li"],
                        HTMLLabelElement: ["label"],
                        HTMLLegendElement: ["legend"],
                        HTMLLinkElement: ["link"],
                        HTMLMapElement: ["map"],
                        HTMLMarqueeElement: ["marquee"],
                        HTMLMediaElement: ["media"],
                        HTMLMenuElement: ["menu"],
                        HTMLMenuItemElement: ["menuitem"],
                        HTMLMetaElement: ["meta"],
                        HTMLMeterElement: ["meter"],
                        HTMLModElement: ["del", "ins"],
                        HTMLOListElement: ["ol"],
                        HTMLObjectElement: ["object"],
                        HTMLOptGroupElement: ["optgroup"],
                        HTMLOptionElement: ["option"],
                        HTMLOutputElement: ["output"],
                        HTMLParagraphElement: ["p"],
                        HTMLParamElement: ["param"],
                        HTMLPictureElement: ["picture"],
                        HTMLPreElement: ["pre"],
                        HTMLProgressElement: ["progress"],
                        HTMLQuoteElement: ["blockquote", "q", "quote"],
                        HTMLScriptElement: ["script"],
                        HTMLSelectElement: ["select"],
                        HTMLShadowElement: ["shadow"],
                        HTMLSlotElement: ["slot"],
                        HTMLSourceElement: ["source"],
                        HTMLSpanElement: ["span"],
                        HTMLStyleElement: ["style"],
                        HTMLTableCaptionElement: ["caption"],
                        HTMLTableCellElement: ["td", "th"],
                        HTMLTableColElement: ["col", "colgroup"],
                        HTMLTableElement: ["table"],
                        HTMLTableRowElement: ["tr"],
                        HTMLTableSectionElement: ["thead", "tbody", "tfoot"],
                        HTMLTemplateElement: ["template"],
                        HTMLTextAreaElement: ["textarea"],
                        HTMLTimeElement: ["time"],
                        HTMLTitleElement: ["title"],
                        HTMLTrackElement: ["track"],
                        HTMLUListElement: ["ul"],
                        HTMLUnknownElement: ["unknown", "vhgroupv", "vkeygen"],
                        HTMLVideoElement: ["video"],
                    },
                    nodes: {
                        Attr: ["node"],
                        Audio: ["audio"],
                        CDATASection: ["node"],
                        CharacterData: ["node"],
                        Comment: ["#comment"],
                        Document: ["#document"],
                        DocumentFragment: ["#document-fragment"],
                        DocumentType: ["node"],
                        HTMLDocument: ["#document"],
                        Image: ["img"],
                        Option: ["option"],
                        ProcessingInstruction: ["node"],
                        ShadowRoot: ["#shadow-root"],
                        Text: ["#text"],
                        XMLDocument: ["xml"],
                    },
                });
            c || (c = "auto");
            var za = "registerElement",
                Z = "__" + za + ((1e5 * a.Math.random()) >> 0),
                da = "addEventListener",
                ca = "attached",
                ua = "Callback",
                ma = "detached",
                zb = "extends",
                ya = "attributeChanged" + ua,
                xj = ca + ua,
                Ef = "connected" + ua,
                Ff = "disconnected" + ua,
                xb = "created" + ua,
                yj = ma + ua,
                mc = "ADDITION",
                xd = "MODIFICATION",
                pd = "REMOVAL",
                Oa = "DOMAttrModified",
                Cf = "DOMContentLoaded",
                wj = "DOMSubtreeModified",
                wb = "<",
                lc = "=",
                Aj = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
                Bj =
                    "ANNOTATION-XML COLOR-PROFILE FONT-FACE FONT-FACE-SRC FONT-FACE-URI FONT-FACE-FORMAT FONT-FACE-NAME MISSING-GLYPH".split(
                        " "
                    ),
                Na = [],
                vb = [],
                ba = "",
                Ya = E.documentElement,
                la =
                    Na.indexOf ||
                    function (a) {
                        for (var b = this.length; b-- && this[b] !== a; );
                        return b;
                    },
                yd = T.prototype,
                zd = yd.hasOwnProperty,
                tc = yd.isPrototypeOf,
                ab = T.defineProperty,
                ud = [],
                Ad = T.getOwnPropertyDescriptor,
                If = T.getOwnPropertyNames,
                Cj = T.getPrototypeOf,
                Jf = T.setPrototypeOf,
                Kf = !!T.__proto__,
                zj = !1,
                Ab = "__dreCEv1",
                va = a.customElements,
                Za =
                    "force" !== c &&
                    !!(va && va.define && va.get && va.whenDefined),
                Lf = T.create || T,
                Dj =
                    a.Map ||
                    function () {
                        var a = [],
                            b = [],
                            c;
                        return {
                            get: function (c) {
                                return b[la.call(a, c)];
                            },
                            set: function (d, e) {
                                c = la.call(a, d);
                                0 > c ? (b[a.push(d) - 1] = e) : (b[c] = e);
                            },
                        };
                    },
                Gf =
                    a.Promise ||
                    function (a) {
                        function b(a) {
                            for (d = !0; c.length; ) c.shift()(a);
                        }
                        var c = [],
                            d = !1,
                            e = {
                                catch: function () {
                                    return e;
                                },
                                then: function (a) {
                                    c.push(a);
                                    d && setTimeout(b, 1);
                                    return e;
                                },
                            };
                        a(b);
                        return e;
                    },
                rc = !1,
                Bb = Lf(null),
                $a = Lf(null),
                sc = new Dj(),
                td =
                    T.create ||
                    function kc(a) {
                        return a ? ((kc.prototype = a), new kc()) : this;
                    },
                uj =
                    Jf ||
                    (Kf
                        ? function (a, b) {
                              a.__proto__ = b;
                              return a;
                          }
                        : If && Ad
                        ? (function () {
                              function a(a, b) {
                                  for (
                                      var c, d = If(b), e = 0, g = d.length;
                                      e < g;
                                      e++
                                  )
                                      (c = d[e]),
                                          zd.call(a, c) || ab(a, c, Ad(b, c));
                              }
                              return function (b, c) {
                                  do a(b, c);
                                  while ((c = Cj(c)) && !tc.call(c, b));
                                  return b;
                              };
                          })()
                        : function (a, b) {
                              for (var c in b) a[c] = b[c];
                              return a;
                          }),
                Cb = a.MutationObserver || a.WebKitMutationObserver,
                W = (a.HTMLElement || a.Element || a.Node).prototype,
                Xa = !tc.call(W, Ya),
                qc = Xa
                    ? function (a, b, c) {
                          a[b] = c.value;
                          return a;
                      }
                    : ab,
                sj = Xa
                    ? function (a) {
                          return 1 === a.nodeType;
                      }
                    : function (a) {
                          return tc.call(W, a);
                      },
                yb = Xa && [],
                Mf = W.attachShadow,
                Ej = W.cloneNode,
                Bd = W.dispatchEvent,
                Wa = W.getAttribute,
                Fj = W.hasAttribute,
                Gj = W.removeAttribute,
                Df = W.setAttribute,
                uc = E.createElement,
                vd = uc,
                vj = Cb && {
                    attributes: !0,
                    characterData: !0,
                    attributeOldValue: !0,
                },
                Nf =
                    Cb ||
                    function () {
                        pc = !1;
                        Ya.removeEventListener(Oa, Nf);
                    },
                ic,
                jc = 0,
                Hf = za in E,
                Of = !0,
                wd = !1,
                pc = !0,
                Bf = !0,
                nc = !0,
                qd,
                vc,
                rd,
                oc,
                Cd,
                sd,
                ub;
            Hf ||
                (Jf || Kf
                    ? ((sd = function (a, b) {
                          tc.call(b, a) || t(a, b);
                      }),
                      (ub = t))
                    : (ub = sd =
                          function (a, b) {
                              a[Z] || ((a[Z] = T(!0)), t(a, b));
                          }),
                Xa
                    ? ((pc = !1),
                      (function () {
                          function a(a) {
                              var b = a.currentTarget,
                                  c = b[Z];
                              a = a.propertyName;
                              var d;
                              c.hasOwnProperty(a) &&
                                  ((c = c[a]),
                                  (d = new CustomEvent(Oa, { bubbles: !0 })),
                                  (d.attrName = c.name),
                                  (d.prevValue = c.value || null),
                                  (d.newValue = c.value = b[a] || null),
                                  null == d.prevValue
                                      ? (d[mc] = d.attrChange = 0)
                                      : (d[xd] = d.attrChange = 1),
                                  Bd.call(b, d));
                          }
                          function b(a, b) {
                              var c = Fj.call(this, a),
                                  d = c && Wa.call(this, a),
                                  e = new CustomEvent(Oa, { bubbles: !0 });
                              Df.call(this, a, b);
                              e.attrName = a;
                              e.prevValue = c ? d : null;
                              e.newValue = b;
                              c
                                  ? (e[xd] = e.attrChange = 1)
                                  : (e[mc] = e.attrChange = 0);
                              Bd.call(this, e);
                          }
                          function c(a) {
                              var b = new CustomEvent(Oa, { bubbles: !0 });
                              b.attrName = a;
                              b.prevValue = Wa.call(this, a);
                              b.newValue = null;
                              b[pd] = b.attrChange = 2;
                              Gj.call(this, a);
                              Bd.call(this, b);
                          }
                          var d = Ad(W, da),
                              e = d.value;
                          d.value = function (d, g, h) {
                              d === Oa &&
                                  this[ya] &&
                                  this.setAttribute !== b &&
                                  ((this[Z] = {
                                      className: {
                                          name: "class",
                                          value: this.className,
                                      },
                                  }),
                                  (this.setAttribute = b),
                                  (this.removeAttribute = c),
                                  e.call(this, "propertychange", a));
                              e.call(this, d, g, h);
                          };
                          ab(W, da, d);
                      })())
                    : Cb ||
                      (Ya[da](Oa, Nf),
                      Ya.setAttribute(Z, 1),
                      Ya.removeAttribute(Z),
                      pc &&
                          ((qd = function (a) {
                              var b, c, d;
                              if (this === a.target) {
                                  b = this[Z];
                                  this[Z] = c = rd(this);
                                  for (d in c) {
                                      if (!(d in b))
                                          return vc(0, this, d, b[d], c[d], mc);
                                      if (c[d] !== b[d])
                                          return vc(1, this, d, b[d], c[d], xd);
                                  }
                                  for (d in b)
                                      if (!(d in c))
                                          return vc(2, this, d, b[d], c[d], pd);
                              }
                          }),
                          (vc = function (a, b, c, d, e, g) {
                              c = {
                                  attrChange: a,
                                  currentTarget: b,
                                  attrName: c,
                                  prevValue: d,
                                  newValue: e,
                              };
                              c[g] = a;
                              m(c);
                          }),
                          (rd = function (a) {
                              for (
                                  var b,
                                      c = {},
                                      d = a.attributes,
                                      e = 0,
                                      g = d.length;
                                  e < g;
                                  e++
                              )
                                  (b = d[e]),
                                      (a = b.name),
                                      "setAttribute" !== a && (c[a] = b.value);
                              return c;
                          }))),
                (E[za] = function Af(a, b) {
                    function c() {
                        return l ? E.createElement(m, y) : E.createElement(m);
                    }
                    y = a.toUpperCase();
                    Of &&
                        ((Of = !1),
                        Cb
                            ? ((oc = (function (a, b) {
                                  function c(a, b) {
                                      for (
                                          var c = 0, d = a.length;
                                          c < d;
                                          b(a[c++])
                                      );
                                  }
                                  return new Cb(function (d) {
                                      for (
                                          var e, g, h, k = 0, l = d.length;
                                          k < l;
                                          k++
                                      )
                                          if (
                                              ((e = d[k]),
                                              "childList" === e.type)
                                          )
                                              c(e.addedNodes, a),
                                                  c(e.removedNodes, b);
                                          else if (
                                              ((g = e.target),
                                              nc &&
                                                  g[ya] &&
                                                  "style" !== e.attributeName &&
                                                  ((h = Wa.call(
                                                      g,
                                                      e.attributeName
                                                  )),
                                                  h !== e.oldValue))
                                          )
                                              g[ya](
                                                  e.attributeName,
                                                  e.oldValue,
                                                  h
                                              );
                                  });
                              })(h(ca), h(ma))),
                              (Cd = function (a) {
                                  oc.observe(a, { childList: !0, subtree: !0 });
                                  return a;
                              }),
                              Cd(E),
                              Mf &&
                                  (W.attachShadow = function () {
                                      return Cd(Mf.apply(this, arguments));
                                  }))
                            : ((ic = []),
                              E[da]("DOMNodeInserted", q(ca)),
                              E[da]("DOMNodeRemoved", q(ma))),
                        E[da](Cf, p),
                        E[da]("readystatechange", p),
                        (W.cloneNode = function (a) {
                            var b = Ej.call(this, !!a),
                                c = k(b);
                            -1 < c && ub(b, vb[c]);
                            a && ba.length && g(b.querySelectorAll(ba));
                            return b;
                        }));
                    if (wd) return (wd = !1);
                    -2 < la.call(Na, lc + y) + la.call(Na, wb + y) && B(a);
                    if (!Aj.test(y) || -1 < la.call(Bj, y))
                        throw Error("The type " + a + " is invalid");
                    var d = b || yd,
                        l = zd.call(d, zb),
                        m = l ? b[zb].toUpperCase() : y,
                        y;
                    l && -1 < la.call(Na, wb + m) && B(m);
                    b = Na.push((l ? lc : wb) + y) - 1;
                    ba = ba.concat(
                        ba.length ? "," : "",
                        l ? m + '[is="' + a.toLowerCase() + '"]' : m
                    );
                    c.prototype = vb[b] = zd.call(d, "prototype")
                        ? d.prototype
                        : td(W);
                    ba.length && e(E.querySelectorAll(ba), ca);
                    return c;
                }),
                (E.createElement = vd =
                    function (a, c) {
                        var d = w(c),
                            e = d ? uc.call(E, a, b(d)) : uc.call(E, a);
                        a = "" + a;
                        var g = la.call(
                                Na,
                                (d ? lc : wb) + (d || a).toUpperCase()
                            ),
                            h = -1 < g;
                        d &&
                            (e.setAttribute("is", (d = d.toLowerCase())),
                            h && (h = l(a.toUpperCase(), d)));
                        nc = !E.createElement.innerHTMLHelper;
                        h && ub(e, vb[g]);
                        return e;
                    }));
            C.prototype = {
                constructor: C,
                define: Za
                    ? function (a, b, c) {
                          if (c) x(a, b, c);
                          else {
                              var d = a.toUpperCase();
                              Bb[d] = { constructor: b, create: [d] };
                              sc.set(b, d);
                              va.define(a, b);
                          }
                      }
                    : x,
                get: Za
                    ? function (a) {
                          return va.get(a) || v(a);
                      }
                    : v,
                whenDefined: Za
                    ? function (a) {
                          return Gf.race([va.whenDefined(a), na(a)]);
                      }
                    : na,
            };
            if (va && "force" !== c)
                try {
                    (function (b, c, d) {
                        c[zb] = "a";
                        b.prototype = td(HTMLAnchorElement.prototype);
                        b.prototype.constructor = b;
                        a.customElements.define(d, b, c);
                        if (
                            Wa.call(E.createElement("a", { is: d }), "is") !==
                                d ||
                            (Za && Wa.call(new b(), "is") !== d)
                        )
                            throw c;
                    })(
                        function Af() {
                            return Reflect.construct(HTMLAnchorElement, [], Af);
                        },
                        {},
                        "document-register-element-a"
                    );
                } catch (kc) {
                    oa();
                }
            else oa();
            try {
                uc.call(E, "a", "a");
            } catch (kc) {
                b = function (a) {
                    return { is: a.toLowerCase() };
                };
            }
        }
        Wb(self);
        Vb(self);
        (function (a) {
            a.Math.sign ||
                a.Object.defineProperty(a.Math, "sign", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !0,
                    value: Eb,
                });
        })(self);
        (function (a) {
            a.Object.assign ||
                a.Object.defineProperty(a.Object, "assign", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !0,
                    value: Gb,
                });
        })(self);
        (function (a) {
            a.Promise ||
                ((a.Promise = K),
                K.default && (a.Promise = K.default),
                (a.Promise.resolve = K.resolve),
                (a.Promise.reject = K.reject),
                (a.Promise.all = K.all),
                (a.Promise.race = K.race));
        })(self);
        Db(self);
        (function (a) {
            a.Array.prototype.includes ||
                a.Object.defineProperty(Array.prototype, "includes", {
                    enumerable: !1,
                    configurable: !0,
                    writable: !0,
                    value: sb,
                });
        })(self);
        function L() {
            var a, b;
            this.promise = new Promise(function (c, d) {
                a = c;
                b = d;
            });
            this.resolve = a;
            this.reject = b;
        }
        function Xb(a) {
            return new Promise(function (b) {
                b(a());
            });
        }
        function Yb(a, b, c) {
            if (a.nodeType) {
                var d = Zb((a.ownerDocument || a).defaultView, b);
                if (d) return d;
            }
            return !a.nodeType || c ? M(a, b) : null;
        }
        function $b(a, b, c) {
            var d = ac(a);
            Zb(a, b);
            bc(a, a, b, function () {
                return c;
            });
            cc(a, b);
        }
        function Zb(a, b) {
            var c = ac(a);
            return a != c && dc(a, b) ? cc(a, b) : null;
        }
        function N(a, b, c) {
            var d;
            a = ac(a);
            bc(a, a, b, c);
            d && cc(a, b);
        }
        function O(a, b, c, d) {
            var e = ec(a),
                g = fc(e);
            bc(g, e, b, c);
            d && cc(g, b);
        }
        function P(a, b) {
            a = ac(a);
            return cc(a, b);
        }
        function gc(a) {
            a = ac(a);
            return dc(a, "performance") ? cc(a, "performance") : null;
        }
        function M(a, b) {
            a = ec(a);
            a = fc(a);
            return cc(a, b);
        }
        function hc(a, b) {
            return wc(fc(a), b);
        }
        function xc(a, b) {
            return yc(fc(a), b);
        }
        function zc(a, b) {
            a.__AMP_PARENT = b;
            a.__AMP_TOP = ac(b);
        }
        function ac(a) {
            return a.__AMP_TOP || a;
        }
        function Ac(a, b) {
            var c = (a.ownerDocument || a).defaultView;
            if (c && c != b && ac(c) == b)
                try {
                    return c.frameElement;
                } catch (d) {}
            return null;
        }
        function ec(a) {
            return a.nodeType
                ? P((a.ownerDocument || a).defaultView, "ampdoc").getAmpDoc(a)
                : a;
        }
        function fc(a) {
            a = ec(a);
            return a.isSingleDoc() ? a.win : a;
        }
        function cc(a, b) {
            dc(a, b);
            var c = Bc(a);
            a = c[b];
            a.obj ||
                ((a.obj = new a.ctor(a.context)),
                (a.ctor = null),
                (a.context = null),
                a.resolve && a.resolve(a.obj));
            return a.obj;
        }
        function bc(a, b, c, d) {
            var e = Bc(a),
                g = e[c];
            g ||
                (g = e[c] =
                    {
                        obj: null,
                        promise: null,
                        resolve: null,
                        context: null,
                        ctor: null,
                    });
            g.ctor ||
                g.obj ||
                ((g.ctor = d), (g.context = b), g.resolve && cc(a, c));
        }
        function wc(a, b) {
            var c = yc(a, b);
            if (c) return c;
            var d = new L(),
                e = d.promise,
                d = d.resolve;
            Bc(a)[b] = {
                obj: null,
                promise: e,
                resolve: d,
                context: null,
                ctor: null,
            };
            return e;
        }
        function yc(a, b) {
            var c = Bc(a)[b];
            if (c) {
                if (c.promise) return c.promise;
                cc(a, b);
                return (c.promise = Promise.resolve(c.obj));
            }
            return null;
        }
        function Bc(a) {
            var b = a.services;
            b || (b = a.services = {});
            return b;
        }
        function Cc(a, b) {
            var c = a.frameElement,
                d = ec(c),
                d = fc(d);
            dc(d, b) &&
                ((b = M(c, b)),
                "function" == typeof b.adoptEmbedWindow &&
                    b.adoptEmbedWindow(a));
        }
        function dc(a, b) {
            a = a.services && a.services[b];
            return !(!a || (!a.ctor && !a.obj));
        } /*
 https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
        var Dc =
            /(\0)|^(-)$|([\x01-\x1f\x7f]|^-?[0-9])|([\x80-\uffff0-9a-zA-Z_-]+)|[^]/g;
        function Ec(a, b, c, d, e) {
            return e
                ? e
                : b
                ? "\ufffd"
                : d
                ? a.slice(0, -1) +
                  "\\" +
                  a.slice(-1).charCodeAt(0).toString(16) +
                  " "
                : "\\" + a;
        }
        function Fc(a, b, c) {
            if (b(a)) c();
            else {
                var d = a.ownerDocument.defaultView;
                if (d.MutationObserver) {
                    var e = new d.MutationObserver(function () {
                        b(a) && (e.disconnect(), c());
                    });
                    e.observe(a, { childList: !0 });
                } else
                    var g = d.setInterval(function () {
                        b(a) && (d.clearInterval(g), c());
                    }, 5);
            }
        }
        function Gc(a, b) {
            Fc(
                a.documentElement,
                function () {
                    return !!a.body;
                },
                b
            );
        }
        function Hc(a) {
            return new Promise(function (b) {
                Gc(a, b);
            });
        }
        function Ic(a) {
            a.parentElement && a.parentElement.removeChild(a);
        }
        function Jc(a) {
            var b = a.isConnected;
            if (void 0 !== b) return b;
            do
                if (((a = Kc(a)), a.host)) a = a.host;
                else break;
            while (1);
            return a.nodeType === Node.DOCUMENT_NODE;
        }
        function Kc(a) {
            if (Node.prototype.getRootNode) return a.getRootNode() || a;
            for (; a.parentNode; a = a.parentNode);
            return a;
        }
        function Lc(a, b) {
            for (var c, d = a; d && d !== c; d = d.parentElement)
                if (b(d)) return d;
            return null;
        }
        function Mc(a, b) {
            for (; a; a = a.parentNode) if (b(a)) return a;
            return null;
        }
        function Nc(a, b) {
            if (a.closest) return a.closest(b);
            b = b.toUpperCase();
            return Lc(a, function (a) {
                return a.tagName == b;
            });
        }
        function Oc(a, b) {
            var c = [];
            for (a = a.firstElementChild; a; a = a.nextElementSibling)
                b(a) && c.push(a);
            return c;
        }
        function Pc(a, b) {
            for (a = a.lastElementChild; a; a = a.previousElementSibling)
                if (b(a)) return a;
            return null;
        }
        function Qc(a, b) {
            var c = [];
            for (a = a.firstChild; a; a = a.nextSibling) b(a) && c.push(a);
            return c;
        }
        var Rc;
        function Sc(a) {
            a = a.ownerDocument;
            try {
                var b = a.createElement("div"),
                    c = a.createElement("div");
                b.appendChild(c);
                return b.querySelector(":scope div") === c;
            } catch (d) {
                return !1;
            }
        }
        function Tc(a, b) {
            null == Rc && (Rc = Sc(a));
            if (Rc) return a.querySelector(":scope " + b);
            var c = "i-amphtml-scoped";
            a.classList.add(c);
            b = a.querySelector("." + c + " " + b);
            a.classList.remove(c);
            return b;
        }
        function Uc(a, b) {
            null == Rc && (Rc = Sc(a));
            if (Rc) return a.querySelectorAll(":scope " + b);
            a.classList.add("i-amphtml-scoped");
            b = a.querySelectorAll(".i-amphtml-scoped " + b);
            a.classList.remove("i-amphtml-scoped");
            return b;
        }
        function Vc(a, b, c) {
            var d, e;
            try {
                e = a.open(b, c, d);
            } catch (g) {
                D().error("DOM", "Failed to open url on target: ", c, g);
            }
            e || "_top" == c || a.open(b, "_top");
        }
        function Wc(a) {
            return a.parent && a.parent != a;
        }
        var Xc = [];
        function Yc(a, b, c) {
            var d = yc(a, b);
            return d ? d : Zc(a, b, c, !0);
        }
        function $c(a, b, c) {
            return ad(a, b, c, void 0).then(function (a) {
                return A().assert(
                    a,
                    "Service %s was requested to be provided through %s, but %s is not loaded in the current page. To fix this problem load the JavaScript file for %s in this page.",
                    b,
                    c,
                    c,
                    c
                );
            });
        }
        function ad(a, b, c, d) {
            var e = ec(a),
                g = xc(a, b);
            return g
                ? g
                : e
                      .whenBodyAvailable()
                      .then(function () {
                          return bd(e.win, c);
                      })
                      .then(function () {
                          var g;
                          d
                              ? (g = xc(a, b))
                              : ((g = e.win),
                                (g =
                                    g.ampExtendedElements &&
                                    g.ampExtendedElements[c]
                                        ? hc(a, b)
                                        : null));
                          return g;
                      });
        }
        function cd(a) {
            var b = Yb(a, "bind");
            if (b) return Promise.resolve(b);
            if (a.nodeType) {
                var b = (a.ownerDocument || a).defaultView,
                    c = ac(b);
                return b !== c
                    ? Zc(b, "bind", "amp-bind")
                    : ad(a, "bind", "amp-bind");
            }
            return Promise.resolve(null);
        }
        function bd(a, b) {
            return Promise.resolve().then(function () {
                if (Xc.includes(b)) {
                    var c = P(a, "extensions");
                    return c.waitForExtension(a, b);
                }
            });
        }
        function Zc(a, b, c, d) {
            return Hc(a.document)
                .then(function () {
                    return bd(a, c);
                })
                .then(function () {
                    return d
                        ? yc(a, b)
                        : a.ampExtendedElements && a.ampExtendedElements[c]
                        ? wc(a, b)
                        : null;
                });
        }
        function dd(a) {
            return P(a, "ampdoc");
        }
        function ed(a) {
            return M(a, "documentInfo").get();
        }
        function fd(a) {
            return P(a, "extensions");
        }
        function gd(a) {
            return P(a, "performance");
        }
        function hd(a) {
            return P(a, "platform");
        }
        function id(a) {
            return M(a, "resources");
        }
        function R(a) {
            return P(a, "timer");
        }
        function S(a) {
            return M(a, "viewer");
        }
        function jd(a) {
            return P(a, "vsync");
        }
        function kd(a) {
            return M(a, "viewport");
        }
        function ld(a) {
            var b = Object.create(null),
                c;
            for (c in a)
                if (md(a, c)) {
                    var d = a[c];
                    b[c] = ka(d) ? ld(d) : d;
                }
            return b;
        }
        function nd(a) {
            return JSON.parse(a);
        }
        function md(a, b) {
            return null == a || "object" != typeof a
                ? !1
                : Object.prototype.hasOwnProperty.call(a, b);
        }
        function od() {
            var a = Dd();
            return function (b) {
                return setTimeout(b, a());
            };
        }
        function Dd() {
            var a = 0;
            return function () {
                var b = Math.pow(1.5, a++),
                    c;
                c = b * (c || 0.3) * Math.random();
                0.5 < Math.random() && (c *= -1);
                b += c;
                return 1e3 * b;
            };
        }
        var Ed,
            Fd = "Webkit webkit Moz moz ms O o".split(" ");
        function Gd(a, b, c) {
            if (Ga(b, "--")) return b;
            Ed || (Ed = G());
            var d = Ed[b];
            if (!d || c) {
                d = b;
                if (void 0 === a[b]) {
                    var e = b.charAt(0).toUpperCase() + b.slice(1);
                    a: {
                        for (var g = 0; g < Fd.length; g++) {
                            var h = Fd[g] + e;
                            if (void 0 !== a[h]) {
                                e = h;
                                break a;
                            }
                        }
                        e = "";
                    }
                    var k = e;
                    void 0 !== a[k] && (d = k);
                }
                c || (Ed[b] = d);
            }
            return d;
        }
        function Hd(a, b) {
            for (var c in b)
                a.style.setProperty(Gd(b, c), b[c].toString(), "important");
        }
        function U(a, b, c, d) {
            (b = Gd(a.style, b, void 0)) && (a.style[b] = d ? c + d : c);
        }
        function Id(a) {
            var b = Gd(a.style, "display", void 0);
            if (b) return a.style[b];
        }
        function Jd(a, b) {
            for (var c in b) U(a, c, b[c]);
        }
        function Kd(a, b) {
            void 0 === b && (b = "none" == Id(a));
            U(a, "display", b ? "" : "none");
        }
        function Ld(a, b) {
            return a.getComputedStyle(b) || G();
        }
        var Md = {
            "amp-dynamic-css-classes":
                "[custom-element=amp-dynamic-css-classes]",
            variant: "amp-experiment",
            "amp-story": "amp-story[standalone]",
        };
        function Nd(a) {
            var b = Od(a).map(function (b) {
                return R(a).timeoutPromise(
                    3e3,
                    wc(a, b),
                    "Render timeout waiting for service " + b + " to be ready."
                );
            });
            return Promise.all(b);
        }
        function Od(a) {
            var b = a.document;
            return Object.keys(Md).filter(function (a) {
                return b.querySelector(Md[a]);
            });
        }
        function Pd(a, b, c, d, e) {
            var g = a.getHeadNode(),
                h = Qd(g, Rd(g, b), d || !1, e || null);
            if (c) {
                var k = a.getRootNode();
                if (Sd(k, h)) c(h);
                else
                    var l = setInterval(function () {
                        Sd(k, h) && (clearInterval(l), c(h));
                    }, 4);
            }
        }
        function Td(a, b, c, d, e) {
            var g = Qd(a.head, b, d || !1, e || null);
            if (c)
                if (Sd(a, g)) c(g);
                else
                    var h = setInterval(function () {
                        Sd(a, g) && (clearInterval(h), c(g));
                    }, 4);
        }
        function Qd(a, b, c, d) {
            var e = a.__AMP_CSS_SM;
            e || (e = a.__AMP_CSS_SM = G());
            var g = !c && d && "amp-custom" != d && "amp-keyframes" != d,
                h = c ? "amp-runtime" : g ? "amp-extension=" + d : null;
            if (h) {
                var k = Ud(a, e, h);
                if (k) return k;
            }
            var l = (a.ownerDocument || a).createElement("style");
            l.textContent = b;
            var m = null;
            c
                ? l.setAttribute("amp-runtime", "")
                : g
                ? (l.setAttribute("amp-extension", d || ""),
                  (m = Ud(a, e, "amp-runtime")))
                : (d && l.setAttribute(d, ""), (m = a.lastChild));
            (b = m)
                ? b.nextSibling
                    ? a.insertBefore(l, b.nextSibling)
                    : a.appendChild(l)
                : a.insertBefore(l, a.firstChild);
            h && (e[h] = l);
            return l;
        }
        function Ud(a, b, c) {
            return b[c]
                ? b[c]
                : (a = a.querySelector("style[" + c + "]"))
                ? (b[c] = a)
                : null;
        }
        function Rd(a, b) {
            return (a = a.__AMP_CSS_TR) ? a(b) : b;
        }
        function Vd(a, b) {
            var c = a.defaultView;
            if (!c.__AMP_BODY_VISIBLE) {
                var d = function () {
                    c.__AMP_BODY_VISIBLE = !0;
                    Jd(a.body, {
                        opacity: 1,
                        visibility: "visible",
                        animation: "none",
                    });
                    try {
                        id(a).renderStarted();
                    } catch (e) {}
                };
                try {
                    Gc(a, function () {
                        c.__AMP_BODY_VISIBLE ||
                            ((c.__AMP_BODY_VISIBLE = !0),
                            b
                                ? Nd(c)
                                      .catch(function (a) {
                                          z(a);
                                          return [];
                                      })
                                      .then(function (b) {
                                          d();
                                          0 < b.length &&
                                              id(a).schedulePass(1, !0);
                                          try {
                                              var e = gd(c);
                                              e.tick("mbv");
                                              e.flush();
                                          } catch (h) {}
                                      })
                                : d());
                    });
                } catch (e) {
                    d(), z(e);
                }
            }
        }
        function Sd(a, b) {
            var c = a.styleSheets;
            for (a = 0; a < c.length; a++) {
                var d = c[a];
                if (d.ownerNode == b) return !0;
            }
            return !1;
        }
        function Wd(a, b) {
            ad(a, "amp-analytics-instrumentation", "amp-analytics").then(
                function (c) {
                    c && c.triggerEventForTarget(a, "user-error", b);
                }
            );
        }
        var Xd;
        function Yd(a, b, c, d) {
            function e(a) {
                try {
                    return h(a);
                } catch (q) {
                    throw (self.reportError(q), q);
                }
            }
            var g = a,
                h = c,
                k = Zd(),
                l = !1;
            d && (l = d.capture);
            g.addEventListener(b, e, k ? d : l);
            return function () {
                g && g.removeEventListener(b, e, k ? d : l);
                e = g = h = null;
            };
        }
        function Zd() {
            if (void 0 !== Xd) return Xd;
            Xd = !1;
            try {
                var a = {
                    get capture() {
                        Xd = !0;
                    },
                };
                self.addEventListener("test-options", null, a);
                self.removeEventListener("test-options", null, a);
            } catch (b) {}
            return Xd;
        }
        function $d(a, b, c, d) {
            return Yd(a, b, c, d);
        }
        function ae(a, b, c, d) {
            var e = c,
                g = Yd(
                    a,
                    b,
                    function (a) {
                        try {
                            e(a);
                        } finally {
                            (e = null), g();
                        }
                    },
                    d
                );
            return g;
        }
        function be(a, b) {
            var c,
                d = new Promise(function (b) {
                    c = ae(a, "click", b, void 0);
                });
            d.then(c, c);
            b && b(c);
            return d;
        }
        function ce(a) {
            var b, c;
            if (
                a.complete ||
                "complete" == a.readyState ||
                (a.document && "complete" == a.document.readyState)
            )
                return Promise.resolve(a);
            var d = new Promise(function (d, g) {
                var e = a.tagName;
                b =
                    "AUDIO" === e || "VIDEO" === e
                        ? ae(a, "loadstart", d)
                        : ae(a, "load", d);
                e && (c = ae(a, "error", g));
            });
            return d.then(
                function () {
                    c && c();
                    return a;
                },
                function () {
                    b && b();
                    var c = a;
                    c && c.src && (c = c.src);
                    throw A().createError("Failed to load:", c);
                }
            );
        }
        var de = self.AMPErrors || [];
        self.AMPErrors = de;
        function ee(a) {
            ee = od();
            return ee(a);
        }
        function fe(a) {
            try {
                return JSON.stringify(a);
            } catch (b) {
                return String(a);
            }
        }
        var ge;
        function he(a, b) {
            try {
                var c;
                if (a)
                    if (void 0 !== a.message) (a = xa(a)), (c = !0);
                    else {
                        var d = a;
                        a = Error(fe(d));
                        a.origError = d;
                    }
                else a = Error("Unknown error");
                if (a.reported) return a;
                a.reported = !0;
                var e = b || a.associatedElement;
                e &&
                    e.classList &&
                    (e.classList.add("i-amphtml-error"),
                    r().development &&
                        (e.classList.add("i-amphtml-element-error"),
                        e.setAttribute("error-message", a.message)));
                if (self.console) {
                    var g = console.error || console.log;
                    a.messageArray
                        ? g.apply(console, a.messageArray)
                        : e
                        ? g.call(console, a.message, e)
                        : g.call(console, a.message);
                }
                e && e.Wa && e.Wa();
                ie.call(void 0, void 0, void 0, void 0, void 0, a);
            } catch (h) {
                setTimeout(function () {
                    throw h;
                });
            }
            return a;
        }
        function je(a) {
            return a
                ? "string" == typeof a
                    ? Ga(a, "BLOCK_BY_CONSENT")
                    : "string" == typeof a.message
                    ? Ga(a.message, "BLOCK_BY_CONSENT")
                    : !1
                : !1;
        }
        function ke() {
            var a = self;
            a.onerror = ie;
            a.addEventListener("unhandledrejection", function (a) {
                a.reason && "CANCELLED" === a.reason.message
                    ? a.preventDefault()
                    : he(a.reason || Error("rejected promise " + a));
            });
        }
        function ie(a, b, c, d, e) {
            this && this.document && Vd(this.document);
            if (!r().development) {
                var g = !1;
                try {
                    g = le();
                } catch (k) {}
                if (!(g && 0.01 < Math.random())) {
                    var h = me(a, b, c, d, e, g);
                    h &&
                        (ne(this, h),
                        ee(function () {
                            var a = new XMLHttpRequest();
                            a.open("POST", Ha.urls.errorReporting, !0);
                            a.send(JSON.stringify(h));
                        }));
                }
            }
        }
        function ne(a, b) {
            var c = dd(a);
            if (c.isSingleDoc()) {
                var d = c.getAmpDoc(),
                    e = d.getRootNode().documentElement,
                    g = e.hasAttribute("report-errors-to-viewer");
                if (g) {
                    var h = S(d);
                    h.hasCapability("errorReporter")
                        ? h.isTrustedViewer().then(function (a) {
                              if (!a) return !1;
                              h.sendMessage("error", b);
                              return !0;
                          })
                        : Promise.resolve(!1);
                } else Promise.resolve(!1);
            } else Promise.resolve(!1);
        }
        function me(a, b, c, d, e, g) {
            var h = !1;
            e &&
                ((a = e.message ? e.message : String(e)),
                e.expected && (h = !0));
            a || (a = "Unknown error");
            if (!/_reported_/.test(a) && "CANCELLED" != a) {
                var k = Math.random();
                if (-1 != a.indexOf("Failed to load:") || "Script error." == a)
                    if (((h = !0), 0.001 < k)) return;
                var l = qa(a);
                if (!(l && 0.1 < k)) {
                    var m = Object.create(null);
                    m.v = r().rtvVersion;
                    m.noAmp = g ? "1" : "0";
                    m.m = a.replace("\u200b\u200b\u200b", "");
                    m.a = l ? "1" : "0";
                    m.ex = h ? "1" : "0";
                    var q = "1p";
                    self.context && self.context.location
                        ? ((m["3p"] = "1"), (q = "3p"))
                        : r().runtime && (q = r().runtime);
                    m.rt = q;
                    m.ca = ob(self) ? "1" : "0";
                    g = self;
                    m.bt =
                        g.AMP_CONFIG && g.AMP_CONFIG.type
                            ? g.AMP_CONFIG.type
                            : "unknown";
                    self.location.ancestorOrigins &&
                        self.location.ancestorOrigins[0] &&
                        (m.or = self.location.ancestorOrigins[0]);
                    self.viewerState && (m.vs = self.viewerState);
                    self.parent && self.parent != self && (m.iem = "1");
                    if (self.AMP && self.AMP.viewer) {
                        var p = self.AMP.viewer.getResolvedViewerUrl(),
                            u = self.AMP.viewer.maybeGetMessagingOrigin();
                        p && (m.rvu = p);
                        u && (m.mso = u);
                    }
                    ge || (ge = oe());
                    m.jse = ge;
                    var t = [];
                    g = self.__AMP__EXPERIMENT_TOGGLES || null;
                    for (var y in g) t.push(y + "=" + (g[y] ? "1" : "0"));
                    m.exps = t.join(",");
                    e
                        ? ((m.el = e.associatedElement
                              ? e.associatedElement.tagName
                              : "u"),
                          e.args && (m.args = JSON.stringify(e.args)),
                          l || e.ignoreStack || !e.stack || (m.s = e.stack),
                          (e.message += " _reported_"))
                        : ((m.f = b || ""), (m.l = c || ""), (m.c = d || ""));
                    m.r = self.document.referrer;
                    m.ae = de.join(",");
                    m.fr = self.location.originalHash || self.location.hash;
                    25 <= de.length && de.splice(0, de.length - 25 + 1);
                    de.push(a);
                    return m;
                }
            }
        }
        function le() {
            for (
                var a = self.document.querySelectorAll("script[src]"), b = 0;
                b < a.length;
                b++
            )
                if (!gb(a[b].src.toLowerCase())) return !0;
            return !1;
        }
        function oe() {
            function a() {}
            a.prototype.t = function () {
                throw Error("message");
            };
            var b = new a();
            try {
                b.t();
            } catch (e) {
                var c = e.stack;
                if (Ga(c, "t@")) return "Safari";
                if (-1 < c.indexOf(".prototype.t@")) return "Firefox";
                var d = c.split("\n").pop();
                if (/\bat .* \(/i.test(d)) return "IE";
                if (Ga(c, "Error: message")) return "Chrome";
            }
            return "unknown";
        }
        function pe(a, b, c) {
            return ce(a).then(function () {
                return qe(a, b, c);
            });
        }
        function qe(a, b, c) {
            var d = a.performance && a.performance.timing;
            if (d && 0 != d.navigationStart) {
                var e = void 0 === c ? d[b] : d[c] - d[b];
                if (pa(e) && !(0 > e)) return e;
            }
        }
        function re(a, b) {
            var c = a.performance && a.performance.navigation;
            if (c && void 0 !== c[b]) return c[b];
        }
        function se(a) {
            this.ampdoc = a;
            this.Hb = this.Ib = void 0;
            this.ea = Object.create(null);
            this.sd = !1;
            te(this);
        }
        f = se.prototype;
        f.ac = function () {
            this.initialize();
            this.sd = !0;
        };
        f.initialize = function () {};
        f.get = function (a) {
            this.sd || this.ac();
            return this.ea[a];
        };
        f.set = function (a, b) {
            a.indexOf("RETURN");
            this.ea[a] = this.ea[a] || { sync: void 0, async: void 0 };
            this.ea[a].sync = b;
            this.Hb = this.Ib = void 0;
            return this;
        };
        f.setAsync = function (a, b) {
            a.indexOf("RETURN");
            this.ea[a] = this.ea[a] || { sync: void 0, async: void 0 };
            this.ea[a].async = b;
            this.Hb = this.Ib = void 0;
            return this;
        };
        f.setBoth = function (a, b, c) {
            return this.set(a, b).setAsync(a, c);
        };
        f.getExpr = function (a, b) {
            var c = this;
            this.sd || this.ac();
            var d = a ? Object.keys(a) : null;
            if (d && 0 < d.length) {
                var e = Object.keys(this.ea);
                d.forEach(function (a) {
                    void 0 === c.ea[a] && e.push(a);
                });
                return ue(this, e, b);
            }
            this.Ib || b || (this.Ib = ue(this, Object.keys(this.ea)));
            !this.Hb && b && (this.Hb = ue(this, Object.keys(this.ea), b));
            return b ? this.Hb : this.Ib;
        };
        function ue(a, b, c) {
            te(a) &&
                (b = b.filter(function (b) {
                    return te(a).includes(b);
                }));
            b.sort(function (a, b) {
                return b.length - a.length;
            });
            var d = b.join("|"),
                e = "\\$?(" + d + ")";
            c ||
                (e +=
                    "(?:\\(((?:\\s*[0-9a-zA-Z-_.]*\\s*(?=,|\\)),?)*)\\s*\\))?");
            return new RegExp(e, "g");
        }
        function te(a) {
            if (a.ke) return a.ke;
            var b = a.ampdoc.getRootNode().head;
            if (!b) return null;
            var c = b.querySelector('meta[name="amp-allowed-url-macros"]');
            if (!c) return null;
            a.ke = c
                .getAttribute("content")
                .split(",")
                .map(function (a) {
                    return a.trim();
                });
            return a.ke;
        }
        var ve;
        function we(a) {
            a = a.ownerDocument || a;
            (ve && ve.ownerDocument === a) || (ve = a.createElement("div"));
            return xe;
        }
        function xe(a) {
            ve.innerHTML = a[0];
            var b = ve.firstElementChild;
            ve.innerHTML = "";
            return b;
        }
        var ye = [
            '\n      <i-amphtml-sizer class="i-amphtml-sizer">\n        <img class="i-amphtml-intrinsic-sizer" />\n      </i-amphtml-sizer>',
        ];
        ye.raw = [
            '\n      <i-amphtml-sizer class="i-amphtml-sizer">\n        <img class="i-amphtml-intrinsic-sizer" />\n      </i-amphtml-sizer>',
        ];
        var ze = {
                NODISPLAY: "nodisplay",
                FIXED: "fixed",
                FIXED_HEIGHT: "fixed-height",
                RESPONSIVE: "responsive",
                CONTAINER: "container",
                FILL: "fill",
                FLEX_ITEM: "flex-item",
                FLUID: "fluid",
                INTRINSIC: "intrinsic",
            },
            Ae = {
                "AMP-PIXEL": { width: "0px", height: "0px" },
                "AMP-ANALYTICS": { width: "1px", height: "1px" },
                "AMP-AUDIO": null,
                "AMP-SOCIAL-SHARE": { width: "60px", height: "44px" },
            },
            Be = {
                "AMP-ANIM": !0,
                "AMP-BRIGHTCOVE": !0,
                "AMP-EMBED": !0,
                "AMP-FACEBOOK": !0,
                "AMP-FACEBOOK-COMMENTS": !0,
                "AMP-FACEBOOK-LIKE": !0,
                "AMP-FACEBOOK-PAGE": !0,
                "AMP-IFRAME": !0,
                "AMP-IMG": !0,
                "AMP-INSTAGRAM": !0,
                "AMP-LIST": !0,
                "AMP-OOYALA-PLAYER": !0,
                "AMP-PINTEREST": !0,
                "AMP-PLAYBUZZ": !0,
                "AMP-VIDEO": !0,
                "AMP-YOUTUBE": !0,
            };
        function Ce(a) {
            for (var b in ze) if (ze[b] == a) return ze[b];
        }
        function De(a) {
            return (
                "fixed" == a ||
                "fixed-height" == a ||
                "responsive" == a ||
                "fill" == a ||
                "flex-item" == a ||
                "fluid" == a ||
                "intrinsic" == a
            );
        }
        function Ee(a) {
            if ("number" == typeof a) return a + "px";
            if (
                a &&
                /^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)?$/.test(
                    a
                )
            )
                return /^\d+(\.\d+)?$/.test(a) ? a + "px" : a;
        }
        function Fe(a) {
            A().assert(
                /^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)$/.test(
                    a
                ),
                "Invalid length value: %s",
                a
            );
            return a;
        }
        function Ge(a) {
            A().assert(
                /^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|%)$/.test(a),
                "Invalid length or percent value: %s",
                a
            );
            return a;
        }
        function He(a) {
            Fe(a);
            var b = A().assert(
                a.match(/[a-z]+/i),
                "Failed to read units from %s",
                a
            );
            return b[0];
        }
        function Ie(a) {
            a = parseFloat(a);
            return pa(a) ? a : void 0;
        }
        function Je(a) {
            U(a, "display", "none");
            a.classList.add("i-amphtml-display");
        }
        function Ke(a) {
            return "undefined" !== typeof TextEncoder
                ? new TextEncoder("utf-8").encode(a)
                : Le(unescape(encodeURIComponent(a)));
        }
        function Le(a) {
            for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                b[c] = d;
            }
            return b;
        }
        function Me(a) {
            for (var b = Array(a.length), c = 0; c < a.length; c++)
                b[c] = String.fromCharCode(a[c]);
            return b.join("");
        }
        var Ne = { "+": "-", "/": "_", "=": "." };
        function Oe(a) {
            a = Me(a);
            return btoa(a).replace(/[+/=]/g, function (a) {
                return Ne[a];
            });
        }
        function V() {
            this.X = null;
        }
        f = V.prototype;
        f.add = function (a) {
            var b = this;
            this.X || (this.X = []);
            this.X.push(a);
            return function () {
                b.remove(a);
            };
        };
        f.remove = function (a) {
            this.X && ((a = this.X.indexOf(a)), -1 < a && this.X.splice(a, 1));
        };
        f.removeAll = function () {
            this.X && (this.X.length = 0);
        };
        f.fire = function (a) {
            if (this.X)
                for (var b = this.X, c = 0; c < b.length; c++) (0, b[c])(a);
        };
        f.getHandlerCount = function () {
            return this.X ? this.X.length : 0;
        };
        function Pe() {
            this.wa = G();
            this.Z = null;
        }
        f = Pe.prototype;
        f.get = function (a) {
            return this.wa[a] || null;
        };
        f.whenSignal = function (a) {
            var b = this.Z && this.Z[a];
            if (!b) {
                var c = this.wa[a];
                null != c
                    ? (b = {
                          promise:
                              "number" == typeof c
                                  ? Promise.resolve(c)
                                  : Promise.reject(c),
                      })
                    : ((c = new L()),
                      (b = {
                          promise: c.promise,
                          resolve: c.resolve,
                          reject: c.reject,
                      }));
                this.Z || (this.Z = G());
                this.Z[a] = b;
            }
            return b.promise;
        };
        f.signal = function (a, b) {
            if (null == this.wa[a]) {
                var c = b || Date.now();
                this.wa[a] = c;
                (a = this.Z && this.Z[a]) &&
                    a.resolve &&
                    (a.resolve(c), (a.resolve = void 0), (a.reject = void 0));
            }
        };
        f.rejectSignal = function (a, b) {
            null == this.wa[a] &&
                ((this.wa[a] = b),
                (a = this.Z && this.Z[a]) &&
                    a.reject &&
                    (a.reject(b), (a.resolve = void 0), (a.reject = void 0)));
        };
        f.reset = function (a) {
            this.wa[a] && delete this.wa[a];
            var b = this.Z && this.Z[a];
            b && !b.resolve && delete this.Z[a];
        };
        function Qe(a) {
            return "loading" != a.readyState && "uninitialized" != a.readyState;
        }
        function Re(a) {
            return "complete" == a.readyState;
        }
        function Se(a, b) {
            Te(a, Qe, b);
        }
        function Te(a, b, c) {
            var d = b(a);
            if (d) c(a);
            else {
                var e = function () {
                    b(a) &&
                        (d || ((d = !0), c(a)),
                        a.removeEventListener("readystatechange", e));
                };
                a.addEventListener("readystatechange", e);
            }
        }
        function Ue(a) {
            return new Promise(function (b) {
                Se(a, b);
            });
        }
        function Ve(a) {
            return new Promise(function (b) {
                Te(a, Re, b);
            });
        }
        function X(a, b, c, d) {
            return {
                left: a,
                top: b,
                width: c,
                height: d,
                bottom: b + d,
                right: a + c,
                x: a,
                y: b,
            };
        }
        function We(a) {
            for (
                var b = -Infinity,
                    c = Infinity,
                    d = -Infinity,
                    e = Infinity,
                    g = 0;
                g < arguments.length;
                g++
            ) {
                var h = arguments[g];
                if (
                    h &&
                    ((b = Math.max(b, h.left)),
                    (c = Math.min(c, h.left + h.width)),
                    (d = Math.max(d, h.top)),
                    (e = Math.min(e, h.top + h.height)),
                    c < b || e < d)
                )
                    return null;
            }
            return Infinity == c ? null : X(b, d, c - b, e - d);
        }
        function Xe(a, b, c) {
            return X(
                a.left - a.width * b,
                a.top - a.height * c,
                a.width * (1 + 2 * b),
                a.height * (1 + 2 * c)
            );
        }
        function Ye(a, b, c) {
            return (0 == b && 0 == c) || (0 == a.width && 0 == a.height)
                ? a
                : X(a.left + b, a.top + c, a.width, a.height);
        }
        function Ze(a) {
            this.Pa = a;
        }
        Ze.prototype.expand = function (a, b, c) {
            if (!a.length) return c ? a : Promise.resolve(a);
            var d = this.Pa.getExpr(b, !0),
                d = $e(a, d);
            return d.length ? af(this, a, d, b, c) : c ? a : Promise.resolve(a);
        };
        function $e(a, b) {
            var c = [];
            a.replace(b, function (a, b, g) {
                a = a.length;
                var d = a + g - 1;
                c.push({ start: g, stop: d, name: b, length: a });
            });
            return c;
        }
        function af(a, b, c, d, e) {
            function g() {
                for (var t = "", y = []; k < b.length && l <= c.length; ) {
                    if (m && k === m.start) {
                        var B = void 0;
                        d && d.hasOwnProperty(m.name)
                            ? (B = { name: m.name, prioritized: d[m.name] })
                            : ((B = a.Pa.get(m.name)), (B.name = m.name));
                        k = m.stop + 1;
                        m = c[++l];
                        "(" === b[k]
                            ? (k++,
                              q++,
                              h.push(B),
                              t.trim().length && y.push(t),
                              y.push(g()))
                            : (t.length && y.push(t), y.push(bf(B, void 0, e)));
                        t = "";
                    } else {
                        if ("`" === b[k])
                            p
                                ? (p = !1)
                                : ((u = p = !0),
                                  A().assert(
                                      "" === t.trim(),
                                      'The substring "' +
                                          t +
                                          '" was lost during url-replacement. Please ensure the url syntax is correct'
                                  ),
                                  (t = ""));
                        else if (q && "," === b[k] && !p) {
                            if (t.length) {
                                var F = u ? t : t.trim();
                                y.push(F);
                                u = !1;
                            }
                            "," === b[k + 1] && (y.push(""), k++);
                            t = "";
                        } else {
                            if (q && ")" === b[k] && !p) {
                                k++;
                                q--;
                                var C = h.pop(),
                                    x = u ? t : t.trim();
                                y.push(x);
                                u = !1;
                                return bf(C, y, e);
                            }
                            t += b[k];
                        }
                        k++;
                    }
                    k === b.length && t.length && y.push(t);
                }
                return e
                    ? y.join("")
                    : Promise.all(y)
                          .then(function (a) {
                              return a.join("");
                          })
                          .catch(function (a) {
                              z(a);
                              return "";
                          });
            }
            var h = [],
                k = 0,
                l = 0,
                m = c[l],
                q = 0,
                p = !1,
                u = !1;
            return g();
        }
        function bf(a, b, c) {
            var d;
            a.prioritized
                ? (d = a.prioritized)
                : c && a.sync
                ? (d = a.sync)
                : c
                ? (A().error(
                      "Expander",
                      "ignoring async replacement key: ",
                      a.name
                  ),
                  (d = ""))
                : (d = a.async || a.sync);
            var e;
            if (c) {
                c = d;
                try {
                    var g = "function" === typeof c ? c.apply(null, b) : c;
                    g && g.then
                        ? (A().error(
                              "Expander",
                              "ignoring async macro resolution"
                          ),
                          (e = ""))
                        : (e = null == g ? "" : encodeURIComponent(g));
                } catch (h) {
                    z(h), (e = "");
                }
            } else e = cf(d, b);
            return e;
        }
        function cf(a, b) {
            var c;
            try {
                return (
                    (c =
                        "function" === typeof a
                            ? b
                                ? Promise.all(b).then(function (b) {
                                      return a.apply(null, b);
                                  })
                                : Xb(a)
                            : Promise.resolve(a)),
                    c
                        .then(function (a) {
                            return null == a ? "" : encodeURIComponent(a);
                        })
                        .catch(function (a) {
                            z(a);
                            return "";
                        })
                );
            } catch (d) {
                return z(d), Promise.resolve("");
            }
        }
        var df = null,
            ef = ["gclid", "gclsrc"];
        function ff() {
            var a = self,
                b = new L(),
                c = b.promise,
                d = b.resolve;
            df = R(a)
                .timeoutPromise(8e3, c, "TrackImpressionPromise timeout")
                .catch(function (a) {
                    D().warn("IMPRESSION", a);
                });
            var b = S(a.document),
                e = b.isTrustedViewer(),
                g = b.isTrustedReferrer();
            Promise.all([e, g]).then(function (b) {
                var c = b[0],
                    e = b[1];
                if (c || e || J(a, "alp")) {
                    var g = gf(a),
                        h = hf(a);
                    Promise.all([g, h]).then(
                        function () {
                            d();
                        },
                        function () {}
                    );
                } else d();
            });
        }
        function gf(a) {
            var b = S(a.document);
            return b.getParam("replaceUrl")
                ? b.hasCapability("replaceUrl")
                    ? b.sendMessageAwaitResponse("getReplaceUrl", void 0).then(
                          function (a) {
                              a && "object" == typeof a
                                  ? b.replaceUrl(a.replaceUrl || null)
                                  : D().warn(
                                        "IMPRESSION",
                                        "get invalid replaceUrl response"
                                    );
                          },
                          function (a) {
                              D().warn(
                                  "IMPRESSION",
                                  "Error request replaceUrl from viewer",
                                  a
                              );
                          }
                      )
                    : (b.replaceUrl(b.getParam("replaceUrl") || null),
                      Promise.resolve())
                : Promise.resolve();
        }
        function hf(a) {
            var b = S(a.document),
                c = b.getParam("click");
            if (!c) return Promise.resolve();
            if (0 != c.indexOf("https://"))
                return (
                    A().warn(
                        "IMPRESSION",
                        "click fragment param should start with https://. Found ",
                        c
                    ),
                    Promise.resolve()
                );
            a.location.hash && (a.location.hash = "");
            return b
                .whenFirstVisible()
                .then(function () {
                    return jf(a, c);
                })
                .then(function (b) {
                    if (b) {
                        var c = b.location;
                        (b = b.tracking_url || c) &&
                            !gb(b) &&
                            (new Image().src = b);
                        if (c && a.history.replaceState) {
                            b = S(a.document);
                            var d = a.location.href,
                                c = I(c),
                                c = n(c.search),
                                c = bb(d, c);
                            a.history.replaceState(null, "", c);
                            b.maybeUpdateFragmentForCct();
                        }
                    }
                })
                .catch(function (a) {
                    A().warn("IMPRESSION", "Error on request clickUrl: ", a);
                });
        }
        function jf(a, b) {
            return P(a, "xhr")
                .fetchJson(b, {
                    credentials: "include",
                    requireAmpResponseSourceOrigin: !1,
                })
                .then(function (a) {
                    return 204 == a.status ? null : a.json();
                });
        }
        function kf(a) {
            return a.whenReady().then(function () {
                return !!a
                    .getBody()
                    .querySelector("amp-analytics[type=googleanalytics]");
            });
        }
        var lf = { ANCESTOR_ORIGIN: !0 };
        function mf(a) {
            return function () {
                return new Date()[a]();
            };
        }
        function nf(a, b) {
            return function () {
                return a[b];
            };
        }
        function of(a, b) {
            return function () {
                return a[b]();
            };
        }
        function pf(a) {
            se.call(this, a);
            this.be = this.le = null;
        }
        aa(pf, se);
        function qf(a, b, c, d) {
            a.setBoth(
                b,
                function () {
                    return qe(a.ampdoc.win, c, d);
                },
                function () {
                    return pe(a.ampdoc.win, c, d);
                }
            );
        }
        pf.prototype.initialize = function () {
            var a = this,
                b = kd(this.ampdoc);
            this.set("RANDOM", function () {
                return Math.random();
            });
            var c = Object.create(null);
            this.set("COUNTER", function (a) {
                return (c[a] = (c[a] | 0) + 1);
            });
            this.set("CANONICAL_URL", rf(this, "canonicalUrl"));
            this.set("CANONICAL_HOST", rf(this, "canonicalUrl", "host"));
            this.set(
                "CANONICAL_HOSTNAME",
                rf(this, "canonicalUrl", "hostname")
            );
            this.set("CANONICAL_PATH", rf(this, "canonicalUrl", "pathname"));
            this.setAsync("DOCUMENT_REFERRER", function () {
                return S(a.ampdoc).getReferrerUrl();
            });
            this.setAsync("EXTERNAL_REFERRER", function () {
                return S(a.ampdoc)
                    .getReferrerUrl()
                    .then(function (b) {
                        if (!b) return null;
                        var c = I(ib(b)).hostname,
                            d = a.ampdoc.win.location.hostname;
                        return c === d ? null : b;
                    });
            });
            this.set("TITLE", function () {
                return (
                    a.ampdoc.win.document.originalTitle ||
                    a.ampdoc.win.document.title
                );
            });
            this.set("AMPDOC_URL", function () {
                return fb(a.ampdoc.win.location.href);
            });
            this.set("AMPDOC_HOST", function () {
                var b = I(a.ampdoc.win.location.href);
                return b && b.host;
            });
            this.set("AMPDOC_HOSTNAME", function () {
                var b = I(a.ampdoc.win.location.href);
                return b && b.hostname;
            });
            this.setBoth(
                "SOURCE_URL",
                function () {
                    var b = ed(a.ampdoc);
                    return fb(b.sourceUrl);
                },
                function () {
                    return df.then(function () {
                        var b = ed(a.ampdoc);
                        return fb(b.sourceUrl);
                    });
                }
            );
            this.set("SOURCE_HOST", rf(this, "sourceUrl", "host"));
            this.set("SOURCE_HOSTNAME", rf(this, "sourceUrl", "hostname"));
            this.set("SOURCE_PATH", rf(this, "sourceUrl", "pathname"));
            this.set("PAGE_VIEW_ID", rf(this, "pageViewId"));
            this.setBoth(
                "QUERY_PARAM",
                function (b, c) {
                    c = void 0 === c ? "" : c;
                    return sf(a, b, c);
                },
                function (b, c) {
                    c = void 0 === c ? "" : c;
                    return df.then(function () {
                        return sf(a, b, c);
                    });
                }
            );
            this.setAsync(
                "FRAGMENT_PARAM",
                tf(this, "fragmentParam", "FRAGMENT_PARAM")
            );
            this.setAsync(
                "ANCESTOR_ORIGIN",
                tf(this, "ancestorOrigin", "ANCESTOR_ORIGIN")
            );
            var d = null;
            this.setBoth(
                "CLIENT_ID",
                function (a) {
                    return d ? d[a] : null;
                },
                function (b, c, h) {
                    A().assertString(
                        b,
                        "The first argument to CLIENT_ID, the fallback Cookie name, is required"
                    );
                    var e = Promise.resolve();
                    c &&
                        (e = $c(
                            a.ampdoc,
                            "userNotificationManager",
                            "amp-user-notification"
                        ).then(function (a) {
                            return a.get(c);
                        }));
                    return hc(a.ampdoc, "cid")
                        .then(function (a) {
                            return a.get(
                                {
                                    scope: b,
                                    createCookieIfNotPresent: !0,
                                    cookieName: h,
                                },
                                e
                            );
                        })
                        .then(function (a) {
                            d || (d = Object.create(null));
                            var c = h || b;
                            a &&
                                "_ga" == c &&
                                ("string" === typeof a
                                    ? (a = a.replace(/^(GA1|1)\.[\d-]+\./, ""))
                                    : D().error(
                                          "UrlReplacements",
                                          "non-string cid, what is it?",
                                          Object.keys(a)
                                      ));
                            return (d[b] = a);
                        });
                }
            );
            this.setAsync("VARIANT", function (b) {
                return uf(
                    a,
                    function (a) {
                        var c = a[b];
                        A().assert(
                            void 0 !== c,
                            "The value passed to VARIANT() is not a valid experiment name:" +
                                b
                        );
                        return null === c ? "none" : c;
                    },
                    "VARIANT"
                );
            });
            this.setAsync("VARIANTS", function () {
                return uf(
                    a,
                    function (a) {
                        var b = [],
                            c;
                        for (c in a) b.push(c + "." + (a[c] || "none"));
                        return b.join("!");
                    },
                    "VARIANTS"
                );
            });
            this.setAsync("AMP_GEO", function (b) {
                return vf(a, function (a) {
                    return b
                        ? (A().assert(
                              "ISOCountry" === b,
                              "The value passed to AMP_GEO() is not valid name:" +
                                  b
                          ),
                          a[b] || "unknown")
                        : a.ISOCountryGroups.join(",");
                });
            });
            this.setAsync("SHARE_TRACKING_INCOMING", function () {
                return wf(
                    a,
                    function (a) {
                        return a.incomingFragment;
                    },
                    "SHARE_TRACKING_INCOMING"
                );
            });
            this.setAsync("SHARE_TRACKING_OUTGOING", function () {
                return wf(
                    a,
                    function (a) {
                        return a.outgoingFragment;
                    },
                    "SHARE_TRACKING_OUTGOING"
                );
            });
            this.set("TIMESTAMP", mf("getTime"));
            this.set("TIMESTAMP_ISO", mf("toISOString"));
            this.set("TIMEZONE", mf("getTimezoneOffset"));
            this.set("TIMEZONE_CODE", function () {
                var b;
                "Intl" in a.ampdoc.win &&
                    "DateTimeFormat" in a.ampdoc.win.Intl &&
                    (b = new Intl.DateTimeFormat().resolvedOptions().timeZone);
                return b || "";
            });
            this.set("SCROLL_TOP", of(b, "getScrollTop"));
            this.set("SCROLL_LEFT", of(b, "getScrollLeft"));
            this.set("SCROLL_HEIGHT", of(b, "getScrollHeight"));
            this.set("SCROLL_WIDTH", of(b, "getScrollWidth"));
            this.set("VIEWPORT_HEIGHT", of(b, "getHeight"));
            this.set("VIEWPORT_WIDTH", of(b, "getWidth"));
            b = this.ampdoc.win.screen;
            this.set("SCREEN_WIDTH", nf(b, "width"));
            this.set("SCREEN_HEIGHT", nf(b, "height"));
            this.set("AVAILABLE_SCREEN_HEIGHT", nf(b, "availHeight"));
            this.set("AVAILABLE_SCREEN_WIDTH", nf(b, "availWidth"));
            this.set("SCREEN_COLOR_DEPTH", nf(b, "colorDepth"));
            this.set("DOCUMENT_CHARSET", function () {
                var b = a.ampdoc.win.document;
                return b.characterSet || b.charset;
            });
            this.set("BROWSER_LANGUAGE", function () {
                var b = a.ampdoc.win.navigator;
                return (
                    b.language ||
                    b.userLanguage ||
                    b.browserLanguage ||
                    ""
                ).toLowerCase();
            });
            this.set("USER_AGENT", function () {
                return a.ampdoc.win.navigator.userAgent;
            });
            qf(this, "PAGE_LOAD_TIME", "navigationStart", "loadEventStart");
            qf(
                this,
                "DOMAIN_LOOKUP_TIME",
                "domainLookupStart",
                "domainLookupEnd"
            );
            qf(this, "TCP_CONNECT_TIME", "connectStart", "connectEnd");
            qf(this, "SERVER_RESPONSE_TIME", "requestStart", "responseStart");
            qf(this, "PAGE_DOWNLOAD_TIME", "responseStart", "responseEnd");
            qf(this, "REDIRECT_TIME", "navigationStart", "fetchStart");
            qf(
                this,
                "DOM_INTERACTIVE_TIME",
                "navigationStart",
                "domInteractive"
            );
            qf(
                this,
                "CONTENT_LOAD_TIME",
                "navigationStart",
                "domContentLoadedEventStart"
            );
            this.setAsync("ACCESS_READER_ID", function () {
                return xf(
                    a,
                    function (a) {
                        return a.getAccessReaderId();
                    },
                    "ACCESS_READER_ID"
                );
            });
            this.setAsync("AUTHDATA", function (b) {
                A().assert(
                    b,
                    "The first argument to AUTHDATA, the field, is required"
                );
                return xf(
                    a,
                    function (a) {
                        return a.getAuthdataField(b);
                    },
                    "AUTHDATA"
                );
            });
            this.setAsync("VIEWER", function () {
                return S(a.ampdoc)
                    .getViewerOrigin()
                    .then(function (a) {
                        return void 0 == a ? "" : a;
                    });
            });
            this.setAsync("TOTAL_ENGAGED_TIME", function () {
                return $c(a.ampdoc, "activity", "amp-analytics").then(function (
                    a
                ) {
                    return a.getTotalEngagedTime();
                });
            });
            this.setAsync("INCREMENTAL_ENGAGED_TIME", function (b, c) {
                return $c(a.ampdoc, "activity", "amp-analytics").then(function (
                    a
                ) {
                    return a.getIncrementalEngagedTime(b, "false" !== c);
                });
            });
            this.set("NAV_TIMING", function (b, c) {
                A().assert(
                    b,
                    "The first argument to NAV_TIMING, the start attribute name, is required"
                );
                return qe(a.ampdoc.win, b, c);
            });
            this.setAsync("NAV_TIMING", function (b, c) {
                A().assert(
                    b,
                    "The first argument to NAV_TIMING, the start attribute name, is required"
                );
                return pe(a.ampdoc.win, b, c);
            });
            this.set("NAV_TYPE", function () {
                return re(a.ampdoc.win, "type");
            });
            this.set("NAV_REDIRECT_COUNT", function () {
                return re(a.ampdoc.win, "redirectCount");
            });
            this.set("AMP_VERSION", function () {
                return "1529106593171";
            });
            this.set("BACKGROUND_STATE", function () {
                return S(a.ampdoc).isVisible() ? "0" : "1";
            });
            this.setAsync("VIDEO_STATE", function (b, c) {
                var d = a.ampdoc.getRootNode(),
                    e = A().assertElement(
                        d.getElementById(b),
                        'Could not find an element with id="' +
                            b +
                            '" for VIDEO_STATE'
                    );
                return M(a.ampdoc, "video-manager")
                    .getAnalyticsDetails(e)
                    .then(function (a) {
                        return a ? a[c] : "";
                    });
            });
            this.setAsync(
                "STORY_PAGE_INDEX",
                yf(this, "pageIndex", "STORY_PAGE_INDEX")
            );
            this.setAsync("STORY_PAGE_ID", yf(this, "pageId", "STORY_PAGE_ID"));
            this.setAsync("FIRST_CONTENTFUL_PAINT", function () {
                return gd(a.ampdoc.win).getFirstContentfulPaint();
            });
            this.setAsync("FIRST_VIEWPORT_READY", function () {
                return gd(a.ampdoc.win).getFirstViewportReady();
            });
            this.setAsync("MAKE_BODY_VISIBLE", function () {
                return gd(a.ampdoc.win).getMakeBodyVisible();
            });
            this.setAsync("AMP_STATE", function (b) {
                return cd(a.ampdoc).then(function (a) {
                    return a ? a.getStateValue(b) : "";
                });
            });
        };
        function rf(a, b, c) {
            return function () {
                var d = ed(a.ampdoc)[b];
                return c ? I(d)[c] : d;
            };
        }
        function xf(a, b, c) {
            return Promise.all([
                ad(a.ampdoc, "access", "amp-access"),
                ad(a.ampdoc, "subscriptions", "amp-subscriptions"),
            ]).then(function (a) {
                a = a[0] || a[1];
                return a
                    ? b(a)
                    : (A().error(
                          "UrlReplacements",
                          "Access or subsciptions service is not installed to access: ",
                          c
                      ),
                      null);
            });
        }
        function sf(a, b, c) {
            A().assert(
                b,
                "The first argument to QUERY_PARAM, the query string param is required"
            );
            A().assert("string" == typeof b, "param should be a string");
            a = I(a.ampdoc.win.location.href);
            a = n(a.search);
            return "undefined" !== typeof a[b] ? a[b] : c;
        }
        function uf(a, b, c) {
            a.le || (a.le = Yc(a.ampdoc.win, "variant", "amp-experiment"));
            return a.le.then(function (a) {
                A().assert(
                    a,
                    "To use variable %s, amp-experiment should be configured",
                    c
                );
                return b(a);
            });
        }
        function vf(a, b) {
            return ad(a.ampdoc, "geo", "amp-geo", !0).then(function (a) {
                A().assert(
                    a,
                    "To use variable %s, amp-geo should be configured",
                    "AMP_GEO"
                );
                return b(a);
            });
        }
        function wf(a, b, c) {
            a.be ||
                (a.be = Yc(
                    a.ampdoc.win,
                    "share-tracking",
                    "amp-share-tracking"
                ));
            return a.be.then(function (a) {
                A().assert(
                    a,
                    "To use variable %s, amp-share-tracking should be configured",
                    c
                );
                return b(a);
            });
        }
        function yf(a, b, c) {
            return function () {
                return Yc(a.ampdoc.win, "story-variable", "amp-story").then(
                    function (a) {
                        A().assert(
                            a,
                            "To use variable %s amp-story should be configured",
                            c
                        );
                        return a[b];
                    }
                );
            };
        }
        function tf(a, b, c) {
            return function (d, e) {
                e = void 0 === e ? "" : e;
                return Yc(
                    a.ampdoc.win,
                    "viewer-integration-variable",
                    "amp-viewer-integration"
                ).then(function (a) {
                    A().assert(
                        a,
                        "To use variable %s amp-viewer-integration must be installed",
                        c
                    );
                    return a[b](d, e);
                });
            };
        }
        function zf(a, b) {
            this.ampdoc = a;
            this.Pa = b;
            this.wg = new Ze(this.Pa);
        }
        f = zf.prototype;
        f.expandStringSync = function (a, b, c, d) {
            return Pf(this, a, b, c, !0, d);
        };
        f.expandStringAsync = function (a, b) {
            return Pf(this, a, b);
        };
        f.expandUrlSync = function (a, b, c, d) {
            return Qf(a, Pf(this, a, b, c, !0, d));
        };
        f.expandUrlAsync = function (a, b, c) {
            return Pf(this, a, b, void 0, void 0, c).then(function (b) {
                return Qf(a, b);
            });
        };
        f.expandInputValueAsync = function (a) {
            return Rf(this, a, !1);
        };
        f.expandInputValueSync = function (a) {
            return Rf(this, a, !0);
        };
        function Rf(a, b, c) {
            "INPUT" == b.tagName &&
                (b.getAttribute("type") || "").toLowerCase();
            var d = Sf(b);
            if (!d) return c ? b.value : Promise.resolve(b.value);
            void 0 === b["amp-original-value"] &&
                (b["amp-original-value"] = b.value);
            a = Pf(a, b["amp-original-value"] || b.value, void 0, void 0, c, d);
            return c
                ? (b.value = a)
                : a.then(function (a) {
                      return (b.value = a);
                  });
        }
        function Sf(a, b) {
            if ((a = a.getAttribute("data-amp-replace"))) {
                var c = {};
                a.trim()
                    .split(/\s+/)
                    .forEach(function (a) {
                        !b || b.hasOwnProperty(a)
                            ? (c[a] = !0)
                            : A().warn(
                                  "URL",
                                  "Ignoring unsupported replacement",
                                  a
                              );
                    });
                return c;
            }
        }
        f.maybeExpandLink = function (a, b) {
            var c = { CLIENT_ID: !0, QUERY_PARAM: !0 },
                d = a.getAttribute("data-amp-addparams") || "",
                e = Sf(a, c);
            if (e || d || b) {
                var g = a["amp-original-href"] || a.getAttribute("href"),
                    h = I(g);
                null == a["amp-original-href"] && (a["amp-original-href"] = g);
                d && (g = bb(g, n(d)));
                a: {
                    var k = ed(this.ampdoc);
                    if (
                        h.origin == I(k.canonicalUrl).origin ||
                        h.origin == I(k.sourceUrl).origin
                    )
                        h = !0;
                    else {
                        if (
                            (k = this.ampdoc
                                .getRootNode()
                                .querySelector(
                                    "meta[name=amp-link-variable-allowed-origin]"
                                )) &&
                            k.hasAttribute("content")
                        )
                            for (
                                var k = k
                                        .getAttribute("content")
                                        .trim()
                                        .split(/\s+/),
                                    l = 0;
                                l < k.length;
                                l++
                            )
                                if (h.origin == I(k[l]).origin) {
                                    h = !0;
                                    break a;
                                }
                        h = !1;
                    }
                }
                var m = h;
                if (!m)
                    return (
                        e &&
                            A().warn(
                                "URL",
                                "Ignoring link replacement",
                                g,
                                " because the link does not go to the document's source, canonical, or whitelisted origin."
                            ),
                        (a.href = g)
                    );
                if (b) {
                    if (!e || !e.QUERY_PARAM) {
                        var q = { QUERY_PARAM: !0 };
                        b = this.expandUrlSync(b, void 0, void 0, q);
                    }
                    g = bb(g, n(b));
                }
                e && (g = this.expandUrlSync(g, void 0, void 0, e));
                return (a.href = g);
            }
        };
        function Pf(a, b, c, d, e, g) {
            var h = J(a.ampdoc.win, "url-replacement-v2");
            if (h) return a.wg.expand(b, c, e, g);
            var k = a.Pa.getExpr(c),
                l,
                m = b.replace(k, function (b, h, k) {
                    var q = [];
                    "string" == typeof k && (q = k.split(/,\s*/));
                    if (g && !g[h]) return b;
                    var p;
                    if (c && h in c) p = c[h];
                    else if ((p = a.Pa.get(h)))
                        if (e) {
                            if (((p = p.sync), !p))
                                return (
                                    A().error(
                                        "UrlReplacements",
                                        "ignoring async replacement key: ",
                                        h
                                    ),
                                    ""
                                );
                        } else p = p.async || p.sync;
                    var u;
                    try {
                        u = "function" == typeof p ? p.apply(null, q) : p;
                    } catch (C) {
                        e && (u = ""), z(C);
                    }
                    if (u && u.then) {
                        if (e)
                            return (
                                A().error(
                                    "UrlReplacements",
                                    "ignoring promise value for key: ",
                                    h
                                ),
                                ""
                            );
                        var F = u
                            .catch(function (a) {
                                z(a);
                            })
                            .then(function (a) {
                                m = m.replace(
                                    b,
                                    lf[b]
                                        ? a
                                        : null == a
                                        ? ""
                                        : encodeURIComponent(a)
                                );
                                d && (d[b] = a);
                            });
                        l = l
                            ? l.then(function () {
                                  return F;
                              })
                            : F;
                        return b;
                    }
                    d && (d[b] = u);
                    return lf[b] ? u : null == u ? "" : encodeURIComponent(u);
                });
            l &&
                (l = l.then(function () {
                    return m;
                }));
            return e ? m : l || Promise.resolve(m);
        }
        f.collectVars = function (a, b) {
            var c = Object.create(null);
            return Pf(this, a, b, c).then(function () {
                return c;
            });
        };
        f.collectUnwhitelistedVarsSync = function (a) {
            var b = a.getAttribute("src"),
                c = Object.create(null);
            this.expandStringSync(b, void 0, c);
            var d = Object.keys(c),
                e = Sf(a);
            return e
                ? d.filter(function (a) {
                      return !e[a];
                  })
                : d;
        };
        function Qf(a, b) {
            var c = I(b, !0).protocol,
                d = I(a, !0).protocol;
            if (c != d)
                return (
                    A().error(
                        "UrlReplacements",
                        "Illegal replacement of the protocol: ",
                        a
                    ),
                    a
                );
            A().assert(
                hb(b),
                "The replacement url has invalid protocol: %s",
                b
            );
            return b;
        }
        f.getVariableSource = function () {
            return this.Pa;
        };
        function Tf(a) {
            O(a, "url-replace", function (a) {
                return new zf(a, new pf(a));
            });
        }
        function Uf(a, b) {
            var c = 100;
            function d(d) {
                h = null;
                g = a.setTimeout(e, c);
                b.apply(null, d);
            }
            function e() {
                g = 0;
                h && d(h);
            }
            var g = 0,
                h = null;
            return function (a) {
                for (var b = [], c = 0; c < arguments.length; ++c)
                    b[c - 0] = arguments[c];
                g ? (h = b) : d(b);
            };
        }
        function Vf(a, b) {
            function c() {
                d = 0;
                var h = 300 - (a.Date.now() - e);
                if (0 < h) d = a.setTimeout(c, h);
                else {
                    var k = g;
                    g = null;
                    b.apply(null, k);
                }
            }
            var d = 0,
                e = 0,
                g = null;
            return function (b) {
                for (var h = [], l = 0; l < arguments.length; ++l)
                    h[l - 0] = arguments[l];
                e = a.Date.now();
                g = h;
                d || (d = a.setTimeout(c, 300));
            };
        }
        var cssText$$module$build$css =
            "html{overflow-x:hidden!important}body,html{height:auto!important}html.i-amphtml-fie{height:100%!important;width:100%!important}body{margin:0!important;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}[hidden]{display:none!important}html.i-amphtml-singledoc.i-amphtml-embedded{-ms-touch-action:pan-y;touch-action:pan-y}html.i-amphtml-fie>body,html.i-amphtml-singledoc>body{overflow:visible!important;position:relative!important}html.i-amphtml-webview>body{overflow-x:hidden!important;overflow-y:visible!important}html.i-amphtml-ios-embed-legacy>body{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important}html.i-amphtml-ios-embed{overflow-y:auto!important;position:static}#i-amphtml-wrapper{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;margin:0!important;display:block!important}html.i-amphtml-ios-embed.i-amphtml-ios-overscroll,html.i-amphtml-ios-embed.i-amphtml-ios-overscroll>#i-amphtml-wrapper{-webkit-overflow-scrolling:touch!important}#i-amphtml-wrapper>body{position:relative!important;border-top:1px solid transparent!important}.i-amphtml-element{display:inline-block}.i-amphtml-layout-fixed,[layout=fixed][width][height]:not(.i-amphtml-layout-fixed){display:inline-block;position:relative}.i-amphtml-layout-responsive,[layout=responsive][width][height]:not(.i-amphtml-layout-responsive),[width][height][sizes]:not(.i-amphtml-layout-responsive){display:block;position:relative}.i-amphtml-layout-intrinsic{display:inline-block;position:relative;max-width:100%}.i-amphtml-intrinsic-sizer{max-width:100%;display:block!important}.i-amphtml-layout-container,.i-amphtml-layout-fixed-height,[layout=container],[layout=fixed-height][height]{display:block;position:relative}.i-amphtml-layout-fill,[layout=fill]:not(.i-amphtml-layout-fill){display:block;overflow:hidden!important;position:absolute;top:0;left:0;bottom:0;right:0}.i-amphtml-layout-flex-item,[layout=flex-item]:not(.i-amphtml-layout-flex-item){display:block;position:relative;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.i-amphtml-layout-fluid{position:relative}.i-amphtml-layout-size-defined{overflow:hidden!important}.i-amphtml-layout-awaiting-size{position:absolute!important;top:auto!important;bottom:auto!important}i-amphtml-sizer{display:block!important}.i-amphtml-fill-content{display:block;height:0;max-height:100%;max-width:100%;min-height:100%;min-width:100%;width:0;margin:auto}.i-amphtml-layout-size-defined .i-amphtml-fill-content{position:absolute;top:0;left:0;bottom:0;right:0}.i-amphtml-layout-intrinsic .i-amphtml-sizer{max-width:100%}.i-amphtml-replaced-content,.i-amphtml-screen-reader{padding:0!important;border:none!important}.i-amphtml-screen-reader{position:fixed!important;top:0px!important;left:0px!important;width:4px!important;height:4px!important;opacity:0!important;overflow:hidden!important;margin:0!important;display:block!important;visibility:visible!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:8px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:12px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:16px!important}.i-amphtml-unresolved{position:relative;overflow:hidden!important}#i-amphtml-wrapper.i-amphtml-scroll-disabled,.i-amphtml-scroll-disabled{overflow-x:hidden!important;overflow-y:hidden!important}.i-amphtml-select-disabled{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.i-amphtml-notbuilt,[layout]:not(.i-amphtml-element){position:relative;overflow:hidden!important;color:transparent!important}.i-amphtml-notbuilt:not(.i-amphtml-layout-container)>*,[layout]:not([layout=container]):not(.i-amphtml-element)>*{display:none}.i-amphtml-ghost{visibility:hidden!important}[layout=nodisplay]:not(.i-amphtml-display){display:none!important}.i-amphtml-element>[placeholder],[layout]:not(.i-amphtml-element)>[placeholder]{display:block}.i-amphtml-element>[placeholder].amp-hidden,.i-amphtml-element>[placeholder].hidden{visibility:hidden}.i-amphtml-element:not(.amp-notsupported)>[fallback]{display:none}.i-amphtml-layout-size-defined>[fallback],.i-amphtml-layout-size-defined>[placeholder]{position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:1}.i-amphtml-notbuilt>[placeholder]{display:block!important}.i-amphtml-hidden-by-media-query{display:none!important}.i-amphtml-element-error{background:red!important;color:#fff!important;position:relative!important}.i-amphtml-element-error:before{content:attr(error-message)}i-amp-scroll-container,i-amphtml-scroll-container{position:absolute;top:0;left:0;right:0;bottom:0;display:block}i-amp-scroll-container.amp-active,i-amphtml-scroll-container.amp-active{overflow:auto;-webkit-overflow-scrolling:touch}.i-amphtml-loading-container{display:block!important;z-index:1}.i-amphtml-notbuilt>.i-amphtml-loading-container{display:block!important}.i-amphtml-loading-container.amp-hidden{visibility:hidden}.i-amphtml-loader-line{position:absolute;top:0;left:0;right:0;height:1px;overflow:hidden!important;background-color:hsla(0,0%,59%,0.2);display:block}.i-amphtml-loader-moving-line{display:block;position:absolute;width:100%;height:100%!important;background-color:hsla(0,0%,59%,0.65);z-index:2}@-webkit-keyframes i-amphtml-loader-line-moving{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}to{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes i-amphtml-loader-line-moving{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%)}to{-webkit-transform:translateX(100%);transform:translateX(100%)}}.i-amphtml-loader-line.amp-active .i-amphtml-loader-moving-line{-webkit-animation:i-amphtml-loader-line-moving 4s ease infinite;animation:i-amphtml-loader-line-moving 4s ease infinite}.i-amphtml-loader{position:absolute;display:block;height:10px;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;white-space:nowrap}.i-amphtml-loader.amp-active .i-amphtml-loader-dot{-webkit-animation:i-amphtml-loader-dots 2s infinite;animation:i-amphtml-loader-dots 2s infinite}.i-amphtml-loader-dot{position:relative;display:inline-block;height:10px;width:10px;margin:2px;border-radius:100%;background-color:rgba(0,0,0,0.3);box-shadow:2px 2px 2px 1px rgba(0,0,0,0.2);will-change:transform}.i-amphtml-loader .i-amphtml-loader-dot:first-child{-webkit-animation-delay:0s;animation-delay:0s}.i-amphtml-loader .i-amphtml-loader-dot:nth-child(2){-webkit-animation-delay:.1s;animation-delay:.1s}.i-amphtml-loader .i-amphtml-loader-dot:nth-child(3){-webkit-animation-delay:.2s;animation-delay:.2s}@-webkit-keyframes i-amphtml-loader-dots{0%,to{-webkit-transform:scale(.7);transform:scale(.7);background-color:rgba(0,0,0,0.3)}50%{-webkit-transform:scale(.8);transform:scale(.8);background-color:rgba(0,0,0,0.5)}}@keyframes i-amphtml-loader-dots{0%,to{-webkit-transform:scale(.7);transform:scale(.7);background-color:rgba(0,0,0,0.3)}50%{-webkit-transform:scale(.8);transform:scale(.8);background-color:rgba(0,0,0,0.5)}}.i-amphtml-element>[overflow]{cursor:pointer;position:relative;z-index:2;visibility:hidden}.i-amphtml-element>[overflow].amp-visible{visibility:visible}template{display:none!important}.amp-border-box,.amp-border-box *,.amp-border-box :after,.amp-border-box :before{box-sizing:border-box}amp-pixel{display:none!important}amp-instagram{padding:64px 0px 0px!important;background-color:#fff}amp-analytics,amp-story-auto-ads{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}amp-iframe iframe{box-sizing:border-box!important}[amp-access][amp-access-hide]{display:none}[subscriptions-dialog],html:not(.i-amphtml-subs-ready) [subscriptions-action],html:not(.i-amphtml-subs-ready) [subscriptions-section]{display:none!important}[visible-when-invalid],amp-experiment,amp-live-list>[update],amp-share-tracking,form [submit-error],form [submit-success],form [submitting]{display:none}.i-amphtml-jank-meter{position:fixed;background-color:rgba(232,72,95,0.5);bottom:0;right:0;color:#fff;font-size:16px;z-index:1000;padding:5px}amp-accordion{display:block!important}amp-accordion>section{float:none!important}amp-accordion>section>*{float:none!important;display:block!important;overflow:hidden!important;position:relative!important}.i-amphtml-accordion-content,.i-amphtml-accordion-header,amp-accordion,amp-accordion>section{margin:0}.i-amphtml-accordion-header{cursor:pointer;background-color:#efefef;padding-right:20px;border:1px solid #dfdfdf}amp-accordion>section>:last-child{display:none!important}amp-accordion>section[expanded]>:last-child{display:block!important}amp-story-page,amp-story[standalone]{display:block!important;height:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;width:100%!important}amp-story[standalone]{background-color:#fff!important;position:relative!important}amp-story-page{background-color:#757575}amp-story .i-amphtml-loader{display:none!important}[amp-fx^=fly-in]{visibility:hidden}\n/*# sourceURL=/css/amp.css*/";
        function Wf(a, b) {
            for (var c = [], d = 0, e = 0; e < a.length; e++) {
                var g = a[e];
                b(g, e, a) ? (d < e && (a[d] = g), d++) : c.push(g);
            }
            d < a.length && (a.length = d);
        }
        function Xf(a, b) {
            for (var c = 0; c < a.length; c++) if (b(a[c], c, a)) return c;
            return -1;
        }
        var Yf = Date.now();
        var Zf = ['\n      <div class="i-amphtml-jank-meter"></div>'];
        Zf.raw = ['\n      <div class="i-amphtml-jank-meter"></div>'];
        function $f(a) {
            this.w = a;
            this.kc = this.jc = this.Ob = this.Sb = 0;
            this.Jb = null;
            this.ra = gc(a);
            this.zb = this.ve = this.we = null;
            ag(this);
        }
        $f.prototype.onScheduled = function () {
            bg(this) && null == this.Jb && (this.Jb = this.w.Date.now());
        };
        $f.prototype.onRun = function () {
            if (bg(this) && null != this.Jb) {
                var a = this.w.Date.now() - this.Jb;
                this.Jb = null;
                this.Ob++;
                16 < a &&
                    (this.Sb++, D().info("JANK", "Paint latency: " + a + "ms"));
                if (this.ra && 200 == this.Ob) {
                    var b = this.w.Math.floor(
                        ((this.Ob - this.Sb) / this.Ob) * 100
                    );
                    this.ra.tickDelta("gfp", b);
                    this.ra.tickDelta("bf", this.Sb);
                    this.zb &&
                        (this.ra.tickDelta("lts", this.kc),
                        this.ra.tickDelta("ltc", this.jc),
                        this.zb.disconnect(),
                        (this.zb = null));
                    var c = 0;
                    this.we &&
                        null != this.ve &&
                        ((c = this.w.Math.max(
                            0,
                            this.w.Math.floor(100 * this.we.level - this.ve)
                        )),
                        this.ra.tickDelta("bd", c));
                    this.ra.flush();
                    if (J(this.w, "jank-meter")) {
                        var d = c,
                            e = this.w.document,
                            g = we(e)(Zf);
                        g.textContent =
                            "bf:" +
                            this.Sb +
                            ", lts: " +
                            this.kc +
                            ", " +
                            ("ltc:" + this.jc + ", bd:" + d);
                        e.body.appendChild(g);
                    }
                }
            }
        };
        function bg(a) {
            return (
                J(a.w, "jank-meter") ||
                (a.ra && a.ra.isPerformanceTrackingOn() && 200 > a.Ob)
            );
        }
        function ag(a) {
            bg(a) &&
                cg(a.w) &&
                ((a.zb = new a.w.PerformanceObserver(function (b) {
                    for (var c = b.getEntries(), d = 0; d < c.length; d++)
                        if ("longtask" == c[d].entryType) {
                            var e = a.w.Math.floor(c[d].duration / 50);
                            "cross-origin-descendant" == c[d].name
                                ? ((a.jc += e),
                                  A().info(
                                      "LONGTASK",
                                      "from child frame " + c[d].duration + "ms"
                                  ))
                                : ((a.kc += e),
                                  D().info(
                                      "LONGTASK",
                                      "from self frame " + c[d].duration + "ms"
                                  ));
                        }
                })),
                a.zb.observe({ entryTypes: ["longtask"] }));
        }
        function cg(a) {
            return (
                !!a.PerformanceObserver &&
                !!a.TaskAttributionTiming &&
                "containerName" in a.TaskAttributionTiming.prototype
            );
        }
        function dg(a, b, c) {
            var d = this;
            this.O = R(a);
            this.Ag = b;
            this.rg = c || 0;
            this.la = -1;
            this.Qd = 0;
            this.Ja = !1;
            this.ig = function () {
                return d.vc();
            };
        }
        dg.prototype.isPending = function () {
            return -1 != this.la;
        };
        dg.prototype.schedule = function (a) {
            var b = a || this.rg;
            this.Ja && 10 > b && (b = 10);
            var c = Date.now() + b;
            return !this.isPending() || -10 > c - this.Qd
                ? (this.cancel(),
                  (this.Qd = c),
                  (this.la = this.O.delay(this.ig, b)),
                  !0)
                : !1;
        };
        dg.prototype.vc = function () {
            this.la = -1;
            this.Qd = 0;
            this.Ja = !0;
            this.Ag();
            this.Ja = !1;
        };
        dg.prototype.cancel = function () {
            this.isPending() && (this.O.cancel(this.la), (this.la = -1));
        };
        var eg = /(\S+)(?:\s+(?:(-?\d+(?:\.\d+)?)([a-zA-Z]*)))?\s*(?:,|$)/g;
        function fg(a) {
            var b = a.getAttribute("srcset");
            if (b) {
                a = [];
                for (var c; (c = eg.exec(b)); ) {
                    var d = c[1],
                        e = void 0,
                        g;
                    if (c[2]) {
                        var h = c[3].toLowerCase();
                        if ("w" == h) e = parseInt(c[2], 10);
                        else if ("x" == h) g = parseFloat(c[2]);
                        else continue;
                    } else g = 1;
                    a.push({ url: d, width: e, dpr: g });
                }
                return new gg(a);
            }
            var k = A().assert(
                a.getAttribute("src"),
                'Either non-empty "srcset" or "src" attribute must be specified: %s',
                a
            );
            return hg(k);
        }
        function hg(a) {
            return new gg([{ url: a, width: void 0, dpr: 1 }]);
        }
        function gg(a) {
            A().assert(0 < a.length, "Srcset must have at least one source");
            this.Kb = a;
            for (var b = !1, c = !1, d = 0; d < a.length; d++)
                var e = a[d], b = b || !!e.width, c = c || !!e.dpr;
            A().assert(
                !!(b ^ c),
                "Srcset must have width or dpr sources, but not both"
            );
            a.sort(b ? ig : jg);
            this.$f = b;
        }
        gg.prototype.select = function (a, b) {
            if (this.$f) {
                b *= a;
                a = this.Kb;
                for (
                    var c = 0, d = Infinity, e = Infinity, g = 0;
                    g < a.length;
                    g++
                ) {
                    var h = a[g].width,
                        k = Math.abs(h - b);
                    if (k <= 1.1 * d || 1.2 < b / e) (c = g), (d = k), (e = h);
                    else break;
                }
            } else
                for (a = this.Kb, c = 0, d = Infinity, e = 0; e < a.length; e++)
                    if (((g = Math.abs(a[e].dpr - b)), g <= d))
                        (c = e), (d = g);
                    else break;
            b = c;
            return this.Kb[b].url;
        };
        gg.prototype.getUrls = function () {
            return this.Kb.map(function (a) {
                return a.url;
            });
        };
        gg.prototype.stringify = function (a) {
            for (var b = [], c = this.Kb, d = 0; d < c.length; d++) {
                var e = c[d],
                    g = e.url;
                a && (g = a(g));
                g = this.$f
                    ? g + (" " + e.width + "w")
                    : g + (" " + e.dpr + "x");
                b.push(g);
            }
            return b.join(", ");
        };
        function ig(a, b) {
            A().assert(a.width != b.width, "Duplicate width: %s", a.width);
            return a.width - b.width;
        }
        function jg(a, b) {
            A().assert(a.dpr != b.dpr, "Duplicate dpr: %s", a.dpr);
            return a.dpr - b.dpr;
        }
        function kg() {
            this.C = [];
        }
        kg.prototype.peek = function () {
            var a = this.C.length;
            return a ? this.C[a - 1].item : null;
        };
        kg.prototype.enqueue = function (a, b) {
            if (isNaN(b)) throw Error("Priority must not be NaN.");
            for (var c = b, d = -1, e = 0, g = this.C.length; e <= g; ) {
                d = Math.floor((e + g) / 2);
                if (d === this.C.length) break;
                if (this.C[d].priority < c) e = d + 1;
                else if (0 < d && this.C[d - 1].priority >= c) g = d - 1;
                else break;
            }
            this.C.splice(d, 0, { item: a, priority: b });
        };
        kg.prototype.dequeue = function () {
            return this.C.length ? this.C.pop().item : null;
        };
        ea.Object.defineProperties(kg.prototype, {
            length: {
                configurable: !0,
                enumerable: !0,
                get: function () {
                    return this.C.length;
                },
            },
        });
        var lg = /nochunking=1/.test(self.location.hash),
            mg = Promise.resolve();
        function ng(a, b) {
            lg
                ? mg.then(b)
                : (O(a, "chunk", og), M(a, "chunk").runForStartup(b));
        }
        function pg(a) {
            this.state = "not_run";
            this.gd = a;
        }
        function qg(a, b) {
            if ("run" != a.state) {
                a.state = "run";
                try {
                    a.gd(b);
                } catch (c) {
                    throw (a.tf(c), c);
                }
            }
        }
        pg.prototype.Ah = function () {
            return this.gd.displayName || this.gd.name;
        };
        pg.prototype.tf = function () {};
        pg.prototype.af = function () {
            return !1;
        };
        pg.prototype.Wf = function () {
            return !0;
        };
        function rg(a, b, c) {
            pg.call(this, a);
            var d = this;
            this.w = b;
            this.h = null;
            c.then(function (a) {
                d.h = a;
                d.h.isVisible() && qg(d, null);
                d.h.onVisibilityChanged(function () {
                    d.h.isVisible() && qg(d, null);
                });
            });
        }
        aa(rg, pg);
        rg.prototype.tf = function () {
            Vd(self.document);
        };
        rg.prototype.af = function () {
            return this.h
                ? this.h.isVisible()
                : this.w.document.hidden
                ? !1
                : !/visibilityState=(hidden|prerender)/.test(
                      this.w.location.hash
                  );
        };
        rg.prototype.Wf = function () {
            return !!this.h;
        };
        function og(a) {
            var b = this;
            this.w = a.win;
            this.I = new kg();
            this.ye = this.Qe.bind(this);
            this.uh = hc(a, "viewer");
            this.w.addEventListener("message", function (a) {
                "amp-macro-task" == a.data && b.Qe(null);
            });
        }
        og.prototype.run = function (a, b) {
            var c = new pg(a);
            sg(this, c, b);
        };
        og.prototype.runForStartup = function (a) {
            a = new rg(a, this.w, this.uh);
            sg(this, a, Number.POSITIVE_INFINITY);
        };
        function sg(a, b, c) {
            a.I.enqueue(b, c);
            mg.then(function () {
                a.Ka();
            });
        }
        function tg(a, b) {
            for (var c = a.I.peek(); c && "not_run" !== c.state; )
                a.I.dequeue(), (c = a.I.peek());
            c && b && a.I.dequeue();
            return c;
        }
        og.prototype.Qe = function (a) {
            var b = this,
                c = tg(this, !0);
            if (!c) return !1;
            var d = Date.now();
            qg(c, a);
            mg.then(function () {
                b.Ka();
            });
            return !0;
        };
        function ug(a) {
            mg.then(function () {
                a.ye(null);
            });
        }
        og.prototype.Ka = function () {
            var a = tg(this);
            a &&
                (a.af()
                    ? ug(this)
                    : a.Wf() && this.w.requestIdleCallback
                    ? vg(this.w, this.ye)
                    : this.w.postMessage("amp-macro-task", "*"));
        };
        function vg(a, b) {
            var c = 15,
                d = 2e3;
            function e(h) {
                if (h.timeRemaining() < c) {
                    var k = d - (Date.now() - g);
                    0 >= k || h.didTimeout
                        ? b(h)
                        : a.requestIdleCallback(e, { timeout: k });
                } else b(h);
            }
            var g = Date.now();
            a.requestIdleCallback(e, { timeout: d });
        }
        function wg(a) {
            return !!a && "function" == typeof a.getFormData;
        } /*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 Use of this source code is governed by a BSD-style
 license that can be found in the LICENSE file or at
 https://developers.google.com/open-source/licenses/bsd
*/
        var xg;
        function yg() {
            var a;
            if (void 0 === xg) {
                var b = a || Element;
                xg = b.prototype.attachShadow
                    ? "v1"
                    : b.prototype.createShadowRoot
                    ? "v0"
                    : "none";
            }
            return xg;
        }
        var zg = { composed: !1 };
        function Ag(a) {
            return "none" != yg() && Node.prototype.getRootNode
                ? a.getRootNode(zg)
                : Mc(a, function (a) {
                      return a
                          ? "I-AMPHTML-SHADOW-ROOT" == a.tagName
                              ? !0
                              : 11 == a.nodeType &&
                                "[object ShadowRoot]" ===
                                    Object.prototype.toString.call(a)
                          : !1;
                  });
        }
        var Bg = "__AMP_ACTION_MAP__" + Math.random(),
            Cg = { form: ["submit", "clear"] },
            Dg = {
                button: !0,
                checkbox: !0,
                link: !0,
                listbox: !0,
                menuitem: !0,
                menuitemcheckbox: !0,
                menuitemradio: !0,
                option: !0,
                radio: !0,
                scrollbar: !0,
                slider: !0,
                spinbutton: !0,
                switch: !0,
                tab: !0,
                treeitem: !0,
            };
        function Eg(a, b, c, d, e, g, h, k, l) {
            k = void 0 === k ? null : k;
            l = void 0 === l ? Math.random() : l;
            this.node = a;
            this.method = b;
            this.args = c;
            this.source = d;
            this.caller = e;
            this.event = g;
            this.trust = h;
            this.tagOrTarget = k || a.tagName;
            this.sequenceId = l;
        }
        Eg.prototype.satisfiesTrust = function (a) {
            return pa(this.trust)
                ? this.trust < a
                    ? (A().error(
                          "Action",
                          'Insufficient trust for "' +
                              this.method +
                              '" ' +
                              ("(" + this.trust + " < " + a + ").")
                      ),
                      !1)
                    : !0
                : (D().error(
                      "Action",
                      "Invalid trust for '" + this.method + "': " + this.trust
                  ),
                  !1);
        };
        function Fg(a, b) {
            this.ampdoc = a;
            this.sa = b || a.getRootNode();
            this.Qa = Gg(this);
            this.hd = G();
            this.Xe = G();
            this.addEvent("tap");
            this.addEvent("submit");
            this.addEvent("change");
            this.addEvent("input-debounced");
            this.addEvent("input-throttled");
            this.addEvent("valid");
            this.addEvent("invalid");
        }
        f = Fg.prototype;
        f.adoptEmbedWindow = function (a) {
            $b(a, "action", new Fg(this.ampdoc, a.document));
        };
        f.addEvent = function (a) {
            var b = this;
            if ("tap" == a)
                this.sa.addEventListener("click", function (c) {
                    c.defaultPrevented || b.trigger(c.target, a, c, 100);
                }),
                    this.sa.addEventListener("keydown", function (c) {
                        var d = c.target,
                            e = c.keyCode;
                        if (13 == e || 32 == e) {
                            var k = d.getAttribute("role"),
                                l;
                            if ((l = k))
                                (l = k.toLowerCase()), (l = Ea.call(Dg, l));
                            var m = l;
                            !c.defaultPrevented &&
                                m &&
                                (c.preventDefault(), b.trigger(d, a, c, 100));
                        }
                    });
            else if ("submit" == a)
                this.sa.addEventListener(a, function (c) {
                    b.trigger(c.target, a, c, 100);
                });
            else if ("change" == a)
                this.sa.addEventListener(a, function (c) {
                    var d = c.target;
                    Hg(c);
                    b.trigger(d, a, c, 100);
                });
            else if ("input-debounced" == a) {
                var c = Vf(this.ampdoc.win, function (c) {
                    b.trigger(c.target, a, c, 100);
                });
                this.sa.addEventListener("input", function (a) {
                    var b = new Ig(a);
                    Hg(b);
                    c(b);
                });
            } else if ("input-throttled" == a) {
                var d = Uf(this.ampdoc.win, function (c) {
                    b.trigger(c.target, a, c, 100);
                });
                this.sa.addEventListener("input", function (a) {
                    a = new Ig(a);
                    Hg(a);
                    d(a);
                });
            } else
                ("valid" != a && "invalid" != a) ||
                    this.sa.addEventListener(a, function (c) {
                        b.trigger(c.target, a, c, 100);
                    });
        };
        f.addGlobalTarget = function (a, b) {
            this.hd[a] = b;
        };
        f.addGlobalMethodHandler = function (a, b, c) {
            c = void 0 === c ? 100 : c;
            this.Xe[a] = { handler: b, minTrust: c };
        };
        f.trigger = function (a, b, c, d) {
            Jg(this, a, b, c, d);
        };
        f.execute = function (a, b, c, d, e, g, h) {
            var k = new Eg(a, b, c, d, e, g, h);
            Kg(this, k);
        };
        f.installActionHandler = function (a, b, c) {
            c = void 0 === c ? 100 : c;
            var d = a.getAttribute("id") || "",
                e = a.tagName + "#" + d;
            (d && "amp-" == d.substring(0, 4)) || a.tagName.toLowerCase();
            if (a.__AMP_ACTION_HANDLER__)
                D().error(
                    "Action",
                    "Action handler already installed for " + a
                );
            else {
                var g = a.__AMP_ACTION_QUEUE__;
                a.__AMP_ACTION_HANDLER__ = { handler: b, minTrust: c };
                ja(g) &&
                    R(a.ownerDocument.defaultView).delay(function () {
                        g.forEach(function (a) {
                            try {
                                a.satisfiesTrust(c) && b(a);
                            } catch (k) {
                                D().error(
                                    "Action",
                                    "Action execution failed:",
                                    a,
                                    k
                                );
                            }
                        });
                        a.__AMP_ACTION_QUEUE__.length = 0;
                    }, 1);
            }
        };
        f.hasAction = function (a, b, c) {
            return !!Lg(a, b, c);
        };
        f.setWhitelist = function (a) {
            this.Qa = a;
        };
        f.addToWhitelist = function (a) {
            this.Qa || (this.Qa = []);
            this.Qa.push(a);
        };
        function Jg(a, b, c, d, e) {
            var g = Lg(b, c);
            if (g) {
                var h = Math.random(),
                    k = null;
                g.actionInfos.forEach(function (c) {
                    function l() {
                        var k = a.hd[q] ? a.sa : a.sa.getElementById(q);
                        if (k)
                            return (
                                (k = new Eg(
                                    k,
                                    c.method,
                                    p,
                                    b,
                                    g.node,
                                    d,
                                    e,
                                    k.tagName || q,
                                    h
                                )),
                                Kg(a, k)
                            );
                        a.Fa(
                            'Target "' +
                                q +
                                '" not found for action ' +
                                ("[" + c.str + "].")
                        );
                    }
                    var q = c.target,
                        p = Mg(c.args, d);
                    k = k ? k.then(l) : l();
                });
            }
        }
        f.Fa = function (a, b) {
            if (b) throw ((a = A().createError("[Action] " + a)), he(a, b), a);
            A().error("Action", a);
        };
        function Kg(a, b) {
            var c = b.method,
                d = b.tagOrTarget;
            if (a.Qa) {
                var e = d + "." + c;
                if (!a.Qa.includes(e))
                    return (
                        a.Fa('"' + e + '" is not whitelisted (' + a.Qa + ")."),
                        null
                    );
            }
            var g = a.hd[d];
            if (g) return g(b);
            var e = b.node,
                h = a.Xe[c];
            if (h && b.satisfiesTrust(h.minTrust)) return h.handler(b);
            var k = e.tagName.toLowerCase();
            if ("amp-" == k.substring(0, 4))
                return (
                    e.enqueAction
                        ? e.enqueAction(b)
                        : a.Fa('Unrecognized AMP element "' + k + '".', e),
                    null
                );
            var l = Cg[k],
                m = e.getAttribute("id") || "";
            if ((m && "amp-" == m.substring(0, 4)) || (l && -1 < l.indexOf(c)))
                return (
                    (a = e.__AMP_ACTION_HANDLER__)
                        ? ((c = a.handler),
                          b.satisfiesTrust(a.minTrust) && c(b))
                        : ((e.__AMP_ACTION_QUEUE__ =
                              e.__AMP_ACTION_QUEUE__ || []),
                          e.__AMP_ACTION_QUEUE__.push(b)),
                    null
                );
            a.Fa(
                "Target (" + d + ") doesn't support \"" + c + '" action.',
                b.caller
            );
            return null;
        }
        function Lg(a, b, c) {
            for (; a && (!c || a != c); ) {
                var d = b,
                    e,
                    g,
                    h;
                e = a;
                h = e[Bg];
                if (void 0 === h) {
                    h = null;
                    if (e.hasAttribute("on")) {
                        var k = e.getAttribute("on"),
                            l = Ng.bind(null, k, e),
                            m = Og.bind(null, k, e),
                            q = null,
                            p = new Pg(k);
                        do
                            if (
                                ((h = p.next()),
                                h.type != Qg &&
                                    (h.type != Rg || ";" != h.value))
                            )
                                if (h.type == Sg || h.type == Tg) {
                                    var u = h.value;
                                    m(p.next(), [Rg], ":");
                                    var t = [];
                                    do {
                                        var y = m(p.next(), [Sg, Tg]).value,
                                            B = "activate",
                                            F = null;
                                        g = p.peek();
                                        if (
                                            g.type == Rg &&
                                            "." == g.value &&
                                            (p.next(),
                                            (B =
                                                m(p.next(), [Sg, Tg]).value ||
                                                B),
                                            (g = p.peek()),
                                            g.type == Rg && "(" == g.value)
                                        ) {
                                            p.next();
                                            var C;
                                            g = p;
                                            var F = m,
                                                x = l,
                                                v = g.peek(),
                                                w = null;
                                            if (v.type == Ug)
                                                (w = G()),
                                                    (C = g.next().value),
                                                    (w.__AMP_OBJECT_STRING__ =
                                                        C),
                                                    F(g.next(), [Rg], ")");
                                            else {
                                                do {
                                                    var Q = (C = g.next()),
                                                        v = Q.type,
                                                        Q = Q.value;
                                                    if (
                                                        v != Rg ||
                                                        ("," != Q && ")" != Q)
                                                    )
                                                        if (
                                                            v == Sg ||
                                                            v == Tg
                                                        ) {
                                                            F(
                                                                g.next(),
                                                                [Rg],
                                                                "="
                                                            );
                                                            C = F(g.next(!0), [
                                                                Sg,
                                                                Tg,
                                                            ]);
                                                            var na = [C];
                                                            if (C.type == Tg)
                                                                for (
                                                                    v =
                                                                        g.peek();
                                                                    v.type ==
                                                                        Rg &&
                                                                    "." ==
                                                                        v.value;
                                                                    v = g.peek()
                                                                )
                                                                    g.next(),
                                                                        (C = F(
                                                                            g.next(
                                                                                !1
                                                                            ),
                                                                            [Tg]
                                                                        )),
                                                                        na.push(
                                                                            C
                                                                        );
                                                            v = Vg(na);
                                                            w || (w = G());
                                                            w[Q] = v;
                                                            v = g.peek();
                                                            x(
                                                                v.type == Rg &&
                                                                    ("," ==
                                                                        v.value ||
                                                                        ")" ==
                                                                            v.value),
                                                                "Expected either [,] or [)]"
                                                            );
                                                        } else
                                                            x(
                                                                !1,
                                                                "; unexpected token [" +
                                                                    (C.value ||
                                                                        "") +
                                                                    "]"
                                                            );
                                                } while (
                                                    C.type != Rg ||
                                                    ")" != C.value
                                                );
                                            }
                                            F = w;
                                        }
                                        t.push({
                                            event: u,
                                            target: y,
                                            method: B,
                                            args: F,
                                            str: k,
                                        });
                                        g = p.peek();
                                    } while (
                                        g.type == Rg &&
                                        "," == g.value &&
                                        p.next()
                                    );
                                    q || (q = G());
                                    q[u] = t;
                                } else
                                    l(
                                        !1,
                                        "; unexpected token [" +
                                            (h.value || "") +
                                            "]"
                                    );
                        while (h.type != Qg);
                        h = q;
                    }
                    e[Bg] = h;
                }
                var oa = (e = h) ? e[d] || null : null;
                if ((d = oa))
                    if ((d = !a.disabled))
                        (d =
                            a.matches ||
                            a.webkitMatchesSelector ||
                            a.mozMatchesSelector ||
                            a.msMatchesSelector ||
                            a.oMatchesSelector),
                            (d = !(d && d.call(a, ":disabled")));
                if (d) return { node: a, actionInfos: oa };
                a = a.parentElement;
            }
            return null;
        }
        f.setActions = function (a, b) {
            a.setAttribute("on", b);
            delete a[Bg];
        };
        function Gg(a) {
            a = a.ampdoc.getRootNode().head;
            return a
                ? (a = a.querySelector('meta[name="amp-action-whitelist"]'))
                    ? a
                          .getAttribute("content")
                          .split(",")
                          .map(function (a) {
                              return a.trim();
                          })
                    : null
                : null;
        }
        function Hg(a) {
            var b = G(),
                c = a.target;
            void 0 !== c.value && (b.value = c.value);
            "INPUT" == c.tagName && (b.valueAsNumber = Number(c.value));
            void 0 !== c.checked && (b.checked = c.checked);
            if (void 0 !== c.min || void 0 !== c.max)
                (b.min = c.min), (b.max = c.max);
            0 < Object.keys(b).length && (a.detail = b);
        }
        function Ig(a) {
            this.detail = null;
            var b = this || G(),
                c;
            for (c in a) b[c] = "function" === typeof a[c] ? Wg : a[c];
        }
        function Wg() {}
        function Vg(a) {
            return 0 == a.length
                ? null
                : 1 == a.length
                ? a[0].value
                : {
                      expression: a
                          .map(function (a) {
                              return a.value;
                          })
                          .join("."),
                  };
        }
        function Mg(a, b) {
            if (!a) return a;
            var c = G();
            b && b.detail && (c.event = b.detail);
            var d = G();
            Object.keys(a).forEach(function (b) {
                var e = a[b];
                if ("object" == typeof e && e.expression) {
                    e = e.expression;
                    if ("." == e) e = c;
                    else {
                        for (
                            var e = e.split("."), h = c, k = 0;
                            k < e.length;
                            k++
                        ) {
                            var l = e[k];
                            if (l && h && void 0 !== h[l] && md(h, l)) h = h[l];
                            else {
                                h = void 0;
                                break;
                            }
                        }
                        e = h;
                    }
                    var m = e,
                        e = void 0 === m ? null : m;
                }
                d[b] = e;
            });
            return d;
        }
        function Ng(a, b, c, d) {
            return A().assert(
                c,
                "Invalid action definition in %s: [%s] %s",
                b,
                a,
                d || ""
            );
        }
        function Og(a, b, c, d, e) {
            void 0 !== e
                ? Ng(
                      a,
                      b,
                      d.includes(c.type) && c.value == e,
                      "; expected [" + e + "]"
                  )
                : Ng(a, b, d.includes(c.type));
            return c;
        }
        var Qg = 1,
            Rg = 2,
            Sg = 3,
            Tg = 4,
            Ug = 5;
        function Pg(a) {
            this.K = a;
            this.od = -1;
        }
        Pg.prototype.next = function (a) {
            var b = Xg(this, a || !1);
            this.od = b.index;
            return b;
        };
        Pg.prototype.peek = function (a) {
            return Xg(this, a || !1);
        };
        function Xg(a, b) {
            var c = a.od + 1;
            if (c >= a.K.length) return { type: Qg, index: a.od };
            var d = a.K.charAt(c);
            if (-1 != " \t\n\r\f\v\u00a0\u2028\u2029".indexOf(d)) {
                for (
                    c++;
                    c < a.K.length &&
                    -1 !=
                        " \t\n\r\f\v\u00a0\u2028\u2029".indexOf(a.K.charAt(c));
                    c++
                );
                if (c >= a.K.length) return { type: Qg, index: c };
                d = a.K.charAt(c);
            }
            if (
                b &&
                (Yg(d) || ("." == d && c + 1 < a.K.length && Yg(a.K[c + 1])))
            ) {
                for (var e = "." == d, g = c + 1; g < a.K.length; g++) {
                    var h = a.K.charAt(g);
                    if ("." == h) e = !0;
                    else if (!Yg(h)) break;
                }
                a = a.K.substring(c, g);
                a = e ? parseFloat(a) : parseInt(a, 10);
                c = g - 1;
                return { type: Sg, value: a, index: c };
            }
            if (-1 != ";:.()=,|!".indexOf(d))
                return { type: Rg, value: d, index: c };
            if (-1 != "\"'".indexOf(d)) {
                for (var g = -1, k = c + 1; k < a.K.length; k++)
                    if (a.K.charAt(k) == d) {
                        g = k;
                        break;
                    }
                if (-1 == g) return { type: 0, index: c };
                a = a.K.substring(c + 1, g);
                c = g;
                return { type: Sg, value: a, index: c };
            }
            if ("{" == d) {
                for (var l = 1, g = -1, d = c + 1; d < a.K.length; d++) {
                    var m = a.K[d];
                    "{" == m ? l++ : "}" == m && l--;
                    if (0 >= l) {
                        g = d;
                        break;
                    }
                }
                if (-1 == g) return { type: 0, index: c };
                a = a.K.substring(c, g + 1);
                c = g;
                return { type: Ug, value: a, index: c };
            }
            for (
                g = c + 1;
                g < a.K.length &&
                -1 ==
                    " \t\n\r\f\x0B\u00a0\u2028\u2029;:.()=,|!\"'{}".indexOf(
                        a.K.charAt(g)
                    );
                g++
            );
            a = a.K.substring(c, g);
            c = g - 1;
            return !b || ("true" != a && "false" != a)
                ? Yg(a.charAt(0))
                    ? { type: Sg, value: a, index: c }
                    : { type: Tg, value: a, index: c }
                : { type: Sg, value: "true" == a, index: c };
        }
        function Yg(a) {
            return "0" <= a && "9" >= a;
        }
        function Zg(a, b) {
            this.win = a;
            this.Ec = null;
            b && (this.Ec = new $g(a));
            this.na = null;
        }
        f = Zg.prototype;
        f.isSingleDoc = function () {
            return !!this.Ec;
        };
        f.hasAmpDocShell = function () {
            return !!this.na;
        };
        f.getAmpDoc = function (a) {
            if (this.Ec) return this.Ec;
            if (a === this.win.document) {
                if (this.na) return this.na;
                throw D().createError(
                    "Ampdoc for shell has not been installed"
                );
            }
            for (var b = a; b; ) {
                if (b.D) return b.D;
                var c = Ac(b, this.win);
                if (c) b = c;
                else {
                    b = Ag(b);
                    if (!b) {
                        if (this.na) return this.na;
                        break;
                    }
                    if ((c = b.__AMPDOC)) return c;
                    b = b.host;
                }
            }
            throw D().createError("No ampdoc found for", a);
        };
        f.installShadowDoc = function (a, b) {
            a = new ah(this.win, a, b);
            return (b.__AMPDOC = a);
        };
        f.installShellShadowDoc = function () {
            var a = this;
            this.na = new bh(this.win);
            this.win.document.__AMPDOC = this.na;
            Ue(this.win.document).then(function (b) {
                a.na.setBody(b.body);
                a.na.setReady();
            });
            return this.na;
        };
        function ch(a) {
            this.win = a;
            this.N = new Pe();
            this.Me = [];
        }
        f = ch.prototype;
        f.isSingleDoc = function () {
            return null;
        };
        f.getWin = function () {
            return this.win;
        };
        f.signals = function () {
            return this.N;
        };
        f.declaresExtension = function (a) {
            return -1 != this.Me.indexOf(a);
        };
        f.declareExtension = function (a) {
            this.declaresExtension(a) || this.Me.push(a);
        };
        f.getRootNode = function () {
            return null;
        };
        f.getHeadNode = function () {};
        f.isBodyAvailable = function () {
            return !1;
        };
        f.getBody = function () {
            return null;
        };
        f.whenBodyAvailable = function () {
            return null;
        };
        f.isReady = function () {
            return null;
        };
        f.whenReady = function () {
            return null;
        };
        f.getUrl = function () {
            return null;
        };
        f.getElementById = function (a) {
            return this.getRootNode().getElementById(a);
        };
        f.contains = function (a) {
            return this.getRootNode().contains(a);
        };
        function $g(a) {
            ch.call(this, a);
            var b = this;
            this.Uc = this.win.document.body
                ? Promise.resolve(this.win.document.body)
                : Hc(this.win.document).then(function () {
                      return b.getBody();
                  });
            this.Yd = Ue(this.win.document);
        }
        aa($g, ch);
        f = $g.prototype;
        f.isSingleDoc = function () {
            return !0;
        };
        f.getRootNode = function () {
            return this.win.document;
        };
        f.getUrl = function () {
            return this.win.location.href;
        };
        f.getHeadNode = function () {
            return this.win.document.head;
        };
        f.isBodyAvailable = function () {
            return !!this.win.document.body;
        };
        f.getBody = function () {
            return this.win.document.body;
        };
        f.whenBodyAvailable = function () {
            return this.Uc;
        };
        f.isReady = function () {
            return Qe(this.win.document);
        };
        f.whenReady = function () {
            return this.Yd;
        };
        function ah(a, b, c) {
            ch.call(this, a);
            this.je = b;
            this.Kf = c;
            this.Vc = null;
            var d = new L();
            this.Uc = d.promise;
            this.xe = d.resolve;
            this.Af = !1;
            var e = new L();
            this.Yd = e.promise;
            this.zf = e.resolve;
        }
        aa(ah, ch);
        f = ah.prototype;
        f.isSingleDoc = function () {
            return !1;
        };
        f.getRootNode = function () {
            return this.Kf;
        };
        f.getUrl = function () {
            return this.je;
        };
        f.getHeadNode = function () {
            return this.Kf;
        };
        f.isBodyAvailable = function () {
            return !!this.Vc;
        };
        f.getBody = function () {
            return this.Vc;
        };
        f.setBody = function (a) {
            this.Vc = a;
            this.xe(a);
            this.xe = void 0;
        };
        f.whenBodyAvailable = function () {
            return this.Uc;
        };
        f.isReady = function () {
            return this.Af;
        };
        f.setReady = function () {
            this.Af = !0;
            this.zf();
            this.zf = void 0;
        };
        f.whenReady = function () {
            return this.Yd;
        };
        function bh(a) {
            ah.call(this, a, a.location.href, a.document);
        }
        aa(bh, ah);
        bh.prototype.getHeadNode = function () {
            return this.win.document.head;
        };
        function dh() {
            var a = self;
            N(a, "ampdoc", function () {
                return new Zg(a, !0);
            });
        }
        function eh(a) {
            var b = this;
            this.win = a;
            this.qd = this.win.Date.now();
            this.qb = [];
            this.o = this.h = null;
            this.wb = this.zd = !1;
            this.Pe = G();
            this.se = "";
            this.Ue = this.Se = this.kf = null;
            this.addEnabledExperiment("rtv-" + r(this.win).rtvVersion);
            ob(this.win) && this.addEnabledExperiment("canary");
            Ve(a.document).then(function () {
                b.tick("ol");
                if (
                    !b.win.PerformancePaintTiming &&
                    b.win.chrome &&
                    "function" == typeof b.win.chrome.loadTimes
                ) {
                    var a =
                        1e3 * b.win.chrome.loadTimes().firstPaintTime -
                        b.win.performance.timing.navigationStart;
                    1 >= a || b.tickDelta("fp", a);
                }
                b.flush();
            });
            fh(this);
        }
        f = eh.prototype;
        f.coreServicesAvailable = function () {
            var a = this;
            this.h = S(this.win.document);
            this.o = id(this.win.document);
            this.wb = this.h.isEmbedded() && "1" === this.h.getParam("csi");
            this.h.onVisibilityChanged(this.flush.bind(this));
            gh(this);
            var b = this.h.whenMessagingReady();
            this.h.whenFirstVisible().then(function () {
                a.tick("ofv");
                a.flush();
            });
            return b
                ? b.then(function () {
                      a.zd = !0;
                      a.tickDelta("msr", a.win.Date.now() - a.qd);
                      hh(a);
                      a.flush();
                  })
                : Promise.resolve();
        };
        function fh(a) {
            if (a.win.PerformancePaintTiming) {
                var b = !1,
                    c = !1,
                    d = function (d) {
                        "first-paint" != d.name || b
                            ? "first-contentful-paint" != d.name ||
                              c ||
                              (a.tickDelta("fcp", d.startTime + d.duration),
                              (c = !0))
                            : (a.tickDelta("fp", d.startTime + d.duration),
                              (b = !0));
                    },
                    e = new a.win.PerformanceObserver(function (b) {
                        b.getEntries().forEach(d);
                        a.flush();
                    });
                a.win.performance.getEntriesByType("paint").forEach(d);
                e.observe({ entryTypes: ["paint"] });
            }
        }
        function gh(a) {
            var b = !a.h.hasBeenVisible(),
                c = b ? -1 : a.qd;
            b &&
                a.h.whenFirstVisible().then(function () {
                    c = a.win.Date.now();
                });
            ih(a).then(function () {
                if (b) {
                    var d = -1 < c ? a.win.Date.now() - c : 0;
                    a.h.whenFirstVisible().then(function () {
                        a.tickDelta("pc", d);
                    });
                    jh(a, d);
                    a.mark("pc");
                } else a.tick("pc"), jh(a, a.win.Date.now() - c);
                a.flush();
            });
        }
        function ih(a) {
            var b = kd(a.win.document).getSize(),
                b = X(0, 0, b.width, b.height);
            return a.o.getResourcesInRect(a.win, b, !0).then(function (a) {
                return Promise.all(
                    a.map(function (a) {
                        return a.loadedOnce();
                    })
                );
            });
        }
        f.tick = function (a, b) {
            var c = void 0 == b ? this.win.Date.now() : void 0,
                d = H({
                    label: a,
                    value: c,
                    delta: null != b ? Math.max(b, 0) : void 0,
                });
            this.zd && this.wb
                ? this.h.sendMessage("tick", d)
                : (50 <= this.qb.length && this.qb.shift(), this.qb.push(d));
            1 == arguments.length && this.mark(a);
            var e = Math.round(null != b ? Math.max(b, 0) : c - this.qd);
            switch (a) {
                case "fcp":
                    this.Se = e;
                    break;
                case "pc":
                    this.Ue = e;
                    break;
                case "mbv":
                    this.kf = e;
            }
        };
        f.mark = function (a) {
            this.win.performance &&
                this.win.performance.mark &&
                1 == arguments.length &&
                this.win.performance.mark(a);
        };
        f.tickDelta = function (a, b) {
            this.tick(a, b);
        };
        f.tickSinceVisible = function (a) {
            var b = this.win.Date.now(),
                c = this.h ? this.h.getFirstVisibleTime() : 0;
            this.tickDelta(a, c ? Math.max(b - c, 0) : 0);
        };
        f.flush = function () {
            this.zd &&
                this.wb &&
                this.h.sendMessage("sendCsi", H({ ampexp: this.se }), !0);
        };
        f.throttledFlush = function () {
            this.Of || (this.Of = Uf(this.win, this.flush.bind(this)));
            this.Of();
        };
        f.addEnabledExperiment = function (a) {
            this.Pe[a] = !0;
            this.se = Object.keys(this.Pe).join(",");
        };
        function hh(a) {
            a.h &&
                (a.wb &&
                    a.qb.forEach(function (b) {
                        a.h.sendMessage("tick", b);
                    }),
                (a.qb.length = 0));
        }
        function jh(a, b) {
            a.h && a.h.sendMessage("prerenderComplete", H({ value: b }), !0);
        }
        f.isPerformanceTrackingOn = function () {
            return this.wb;
        };
        f.getFirstContentfulPaint = function () {
            return this.Se;
        };
        f.getMakeBodyVisible = function () {
            return this.kf;
        };
        f.getFirstViewportReady = function () {
            return this.Ue;
        };
        var kh = ['\n        <link rel="preload" referrerpolicy="origin" />'];
        kh.raw = ['\n        <link rel="preload" referrerpolicy="origin" />'];
        var lh = null;
        function mh(a) {
            this.T = a.document;
            this.md = a.document.head;
            this.Bb = {};
            this.Vf = {};
            this.xc = hd(a);
            this.Bb[I(a.location.href).origin] = !0;
            var b;
            a: {
                if (!lh) {
                    b = a.document.createElement("link");
                    var c = b.relList;
                    b.as = "invalid-value";
                    if (!c || !c.supports) {
                        b = {};
                        break a;
                    }
                    lh = {
                        preconnect: c.supports("preconnect"),
                        preload: c.supports("preload"),
                        onlyValidAs: "invalid-value" != b.as,
                    };
                }
                b = lh;
            }
            this.Xb = b;
            this.O = R(a);
        }
        mh.prototype.url = function (a, b, c) {
            var d = this;
            a.whenFirstVisible().then(function () {
                d.je(a, b, c);
            });
        };
        mh.prototype.je = function (a, b, c) {
            if (nh(b)) {
                a = I(b).origin;
                b = Date.now();
                var d = this.Bb[a];
                if (d && b < d) c && (this.Bb[a] = b + 18e4);
                else {
                    this.Bb[a] = b + (c ? 18e4 : 1e4);
                    var e;
                    this.Xb.preconnect ||
                        ((e = this.T.createElement("link")),
                        e.setAttribute("rel", "dns-prefetch"),
                        e.setAttribute("href", a),
                        this.md.appendChild(e));
                    var g = this.T.createElement("link");
                    g.setAttribute("rel", "preconnect");
                    g.setAttribute("href", a);
                    g.setAttribute("referrerpolicy", "origin");
                    this.md.appendChild(g);
                    this.O.delay(function () {
                        e && e.parentNode && e.parentNode.removeChild(e);
                        g.parentNode && g.parentNode.removeChild(g);
                    }, 1e4);
                    oh(this, a);
                }
            }
        };
        mh.prototype.preload = function (a, b, c) {
            var d = this;
            nh(b) &&
                !this.Vf[b] &&
                ((this.Vf[b] = !0),
                this.url(a, b, !0),
                this.Xb.preload &&
                    (("document" == c && this.xc.isSafari()) ||
                        a.whenFirstVisible().then(function () {
                            var a = we(d.T)(kh);
                            a.setAttribute("href", b);
                            a.as = d.Xb.onlyValidAs ? "fetch" : "";
                            d.md.appendChild(a);
                        })));
        };
        function nh(a) {
            return Ga(a, "https:") || Ga(a, "http:") ? !0 : !1;
        }
        function oh(a, b) {
            if (!a.Xb.preconnect && a.xc.isSafari()) {
                var c = Date.now();
                a.Bb[b] = c + 18e4;
                var d = c - (c % 18e4);
                a = new XMLHttpRequest();
                a.open(
                    "HEAD",
                    b +
                        "/amp_preconnect_polyfill_404_or_other_error_expected._Do_not_worry_about_it?" +
                        d,
                    !0
                );
                a.withCredentials = !0;
                a.send();
            }
        }
        function ph(a, b) {
            this.wf = a;
            this.$ = b;
            this.h = null;
        }
        function qh(a) {
            a.h || (a.h = S(a.$));
            return a.h;
        }
        ph.prototype.url = function (a, b) {
            this.wf.url(qh(this), a, b);
        };
        ph.prototype.preload = function (a, b) {
            this.wf.preload(qh(this), a, b);
        };
        function rh(a) {
            this.element = a;
            this.layout_ = "nodisplay";
            this.layoutWidth_ = -1;
            this.inViewport_ = !1;
            this.win = a.ownerDocument.defaultView;
            this.actionMap_ = null;
            a = this.element;
            var b = a.ownerDocument.defaultView;
            N(b, "preconnect", mh);
            b = P(b, "preconnect");
            this.preconnect = new ph(b, a);
            this.config = null;
            this.layoutScheduleTime = 0;
        }
        f = rh.prototype;
        f.signals = function () {
            return this.element.signals();
        };
        f.getLayoutPriority = function () {
            return 0;
        };
        f.updateLayoutPriority = function (a) {
            this.element.getResources().updateLayoutPriority(this.element, a);
        };
        f.getLayout = function () {
            return this.layout_;
        };
        f.getLayoutBox = function () {
            return this.element.getLayoutBox();
        };
        f.getPageLayoutBox = function () {
            return this.element.getPageLayoutBox();
        };
        f.getWin = function () {
            return this.win;
        };
        f.getAmpDoc = function () {
            return this.element.getAmpDoc();
        };
        f.getVsync = function () {
            return jd(this.win);
        };
        f.getLayoutWidth = function () {
            return this.layoutWidth_;
        };
        f.getConsentPolicy = function () {
            var a = null;
            this.element.hasAttribute("data-block-on-consent") &&
                (a =
                    this.element.getAttribute("data-block-on-consent") ||
                    "default");
            return a;
        };
        f.isLayoutSupported = function (a) {
            return "nodisplay" == a;
        };
        f.isAlwaysFixed = function () {
            return !1;
        };
        f.isInViewport = function () {
            return this.inViewport_;
        };
        f.upgradeCallback = function () {
            return null;
        };
        f.createdCallback = function () {};
        f.firstAttachedCallback = function () {};
        f.buildCallback = function () {};
        f.preconnectCallback = function () {};
        f.detachedCallback = function () {};
        f.setAsOwner = function (a) {
            this.element.getResources().setOwner(a, this.element);
        };
        f.prerenderAllowed = function () {
            return !1;
        };
        f.createPlaceholderCallback = function () {
            return null;
        };
        f.renderOutsideViewport = function () {
            return "inabox" == r(this.win).runtime && J(this.win, "inabox-rov")
                ? !0
                : 3;
        };
        f.idleRenderOutsideViewport = function () {
            return !1;
        };
        f.isRelayoutNeeded = function () {
            return !1;
        };
        f.layoutCallback = function () {
            return Promise.resolve();
        };
        f.firstLayoutCompleted = function () {
            this.togglePlaceholder(!1);
        };
        f.viewportCallback = function () {};
        f.pauseCallback = function () {};
        f.resumeCallback = function () {};
        f.unlayoutCallback = function () {
            return !1;
        };
        f.unlayoutOnPause = function () {
            return !1;
        };
        f.reconstructWhenReparented = function () {
            return !0;
        };
        f.activate = function () {};
        f.activationTrust = function () {
            return 100;
        };
        f.loadPromise = function (a) {
            return ce(a);
        };
        function sh(a) {
            a.actionMap_ || (a.actionMap_ = a.win.Object.create(null));
        }
        f.registerAction = function (a, b, c) {
            c = void 0 === c ? 100 : c;
            sh(this);
            this.actionMap_[a] = { handler: b, minTrust: c };
        };
        f.executeAction = function (a) {
            if ("activate" == a.method) {
                if (a.satisfiesTrust(this.activationTrust()))
                    return this.activate(a);
            } else {
                sh(this);
                var b = this.actionMap_[a.method];
                A().assert(b, "Method not found: " + a.method + " in %s", this);
                var c = b.handler;
                if (a.satisfiesTrust(b.minTrust)) return c(a);
            }
        };
        f.getMaxDpr = function () {
            return this.element.getResources().getMaxDpr();
        };
        f.getDpr = function () {
            return this.element.getResources().getDpr();
        };
        f.propagateAttributes = function (a, b, c) {
            a = ja(a) ? a : [a];
            for (var d = 0; d < a.length; d++) {
                var e = a[d];
                this.element.hasAttribute(e)
                    ? b.setAttribute(e, this.element.getAttribute(e))
                    : c && b.removeAttribute(e);
            }
        };
        f.forwardEvents = function (a, b) {
            var c = this,
                d = (ja(a) ? a : [a]).map(function (a) {
                    return $d(b, a, function (b) {
                        c.element.dispatchCustomEvent(a, b.data || {});
                    });
                });
            return function () {
                return d.forEach(function (a) {
                    return a();
                });
            };
        };
        f.toggleLayoutDisplay = function (a) {
            this.element.toggleLayoutDisplay(a);
        };
        f.getPlaceholder = function () {
            return this.element.getPlaceholder();
        };
        f.togglePlaceholder = function (a) {
            this.element.togglePlaceholder(a);
        };
        f.getFallback = function () {
            return this.element.getFallback();
        };
        f.toggleFallback = function (a) {
            this.element.toggleFallback(a);
        };
        f.toggleLoading = function (a, b) {
            this.element.toggleLoading(a, { force: !!b });
        };
        f.isLoadingReused = function () {
            return !1;
        };
        f.getOverflowElement = function () {
            return this.element.getOverflowElement();
        };
        f.renderStarted = function () {
            this.element.renderStarted();
        };
        f.getRealChildNodes = function () {
            return this.element.getRealChildNodes();
        };
        f.getRealChildren = function () {
            return this.element.getRealChildren();
        };
        f.applyFillContent = function (a, b) {
            a.classList.add("i-amphtml-fill-content");
            b && a.classList.add("i-amphtml-replaced-content");
        };
        f.getViewport = function () {
            return kd(this.getAmpDoc());
        };
        f.getIntersectionElementLayoutBox = function () {
            return this.getLayoutBox();
        };
        f.scheduleLayout = function (a) {
            this.element.getResources().scheduleLayout(this.element, a);
        };
        f.schedulePause = function (a) {
            this.element.getResources().schedulePause(this.element, a);
        };
        f.scheduleResume = function (a) {
            this.element.getResources().scheduleResume(this.element, a);
        };
        f.schedulePreload = function (a) {
            this.element.getResources().schedulePreload(this.element, a);
        };
        f.scheduleUnlayout = function (a) {
            this.element.getResources().scheduleUnlayout(this.element, a);
        };
        f.updateInViewport = function (a, b) {
            this.element.getResources().updateInViewport(this.element, a, b);
        };
        f.changeHeight = function (a) {
            this.element.getResources().changeSize(this.element, a, void 0);
        };
        f.collapse = function () {
            this.element.getResources().collapseElement(this.element);
        };
        f.attemptCollapse = function () {
            return this.element.getResources().attemptCollapse(this.element);
        };
        f.attemptChangeHeight = function (a) {
            return this.element
                .getResources()
                .attemptChangeSize(this.element, a, void 0);
        };
        f.attemptChangeSize = function (a, b) {
            return this.element
                .getResources()
                .attemptChangeSize(this.element, a, b);
        };
        f.measureElement = function (a) {
            return this.element.getResources().measureElement(a);
        };
        f.mutateElement = function (a, b) {
            return this.measureMutateElement(null, a, b);
        };
        f.measureMutateElement = function (a, b, c) {
            return this.element
                .getResources()
                .measureMutateElement(c || this.element, a, b);
        };
        f.collapsedCallback = function () {};
        f.expand = function () {
            this.element.getResources().expandElement(this.element);
        };
        f.expandedCallback = function () {};
        f.mutatedAttributesCallback = function () {};
        f.onLayoutMeasure = function () {};
        f.onMeasureChanged = function () {};
        f.user = function () {
            return A(this.element);
        };
        f.declareLayer = function (a) {
            J(this.win, "layers");
            a && this.element.contains(a);
            return this.element.getLayers().declareLayer(a || this.element);
        };
        var th = [];
        function uh(a) {
            rh.call(this, a);
            th.push(this);
            Xc.push(a.nodeName.toLowerCase());
        }
        aa(uh, rh);
        uh.prototype.getLayoutPriority = function () {
            return 0;
        };
        uh.prototype.isLayoutSupported = function () {
            return !0;
        };
        uh.prototype.reconstructWhenReparented = function () {
            return !1;
        };
        var vh = { 0: "cld", 2: "adld" };
        function wh(a, b) {
            this.w = a;
            this.wc = gc(a);
            this.Zb = this.Yb = null;
            this.Ne = !1;
            this.Dd = vh[b];
        }
        wh.prototype.enterViewport = function () {
            this.Dd && !this.Yb && ((this.Yb = this.w.Date.now()), xh(this));
        };
        wh.prototype.startLayout = function () {
            this.Dd && !this.Zb && ((this.Zb = this.w.Date.now()), xh(this));
        };
        function xh(a) {
            if (
                a.wc &&
                a.wc.isPerformanceTrackingOn() &&
                !a.Ne &&
                a.Yb &&
                a.Zb
            ) {
                var b = a.w.Math.max(a.Zb - a.Yb, 0);
                a.wc.tickDelta(a.Dd, b);
                a.wc.throttledFlush();
                a.Ne = !0;
            }
        }
        function yh(a, b, c) {
            b.__AMP__RESOURCE = this;
            this.nd = a;
            this.element = b;
            this.debugid = b.tagName.toLowerCase() + "#" + a;
            this.hostWin = b.ownerDocument.defaultView;
            this.o = c;
            this.Ig = b.hasAttribute("placeholder");
            this.tb = !1;
            this.gb = void 0;
            this.F = b.isBuilt() ? 1 : 0;
            this.Wd = -1;
            this.ba = 0;
            this.gf = null;
            this.ec = !1;
            this.pa = X(-1e4, -1e4, 0, 0);
            this.rd = null;
            this.yd = !1;
            this.$a = this.Bc = this.Ac = null;
            this.Vd = void 0;
            this.jf = !1;
            a = new L();
            this.Mg = a.promise;
            this.Gd = a.resolve;
            this.J = J(this.hostWin, "layers");
        }
        function Y(a) {
            return a.__AMP__RESOURCE;
        }
        f = yh.prototype;
        f.getId = function () {
            return this.nd;
        };
        f.updateOwner = function (a) {
            this.gb = a;
        };
        f.getOwner = function () {
            if (void 0 === this.gb) {
                for (var a = this.element; a; a = a.parentElement)
                    if (a.__AMP__OWNER) {
                        this.gb = a.__AMP__OWNER;
                        break;
                    }
                void 0 === this.gb && (this.gb = null);
            }
            return this.gb;
        };
        f.hasOwner = function () {
            return !!this.getOwner();
        };
        f.getLayoutPriority = function () {
            return -1 != this.Wd ? this.Wd : this.element.getLayoutPriority();
        };
        f.updateLayoutPriority = function (a) {
            this.Wd = a;
        };
        f.getState = function () {
            return this.F;
        };
        f.isBuilt = function () {
            return this.element.isBuilt();
        };
        f.isBuilding = function () {
            return this.tb;
        };
        f.whenBuilt = function () {
            return this.element.signals().whenSignal("res-built");
        };
        f.build = function () {
            var a = this;
            if (
                this.tb ||
                !this.element.isUpgraded() ||
                !this.o.grantBuildPermission()
            )
                return null;
            this.tb = !0;
            return this.element.build().then(
                function () {
                    a.tb = !1;
                    a.hasBeenMeasured()
                        ? ((a.F = 2),
                          a.element.updateLayoutBox(a.getLayoutBox()))
                        : (a.F = 1);
                    a.element.signals().signal("res-built");
                    a.element.dispatchCustomEvent("amp:built");
                },
                function (b) {
                    a.maybeReportErrorOnBuildFailure(b);
                    a.tb = !1;
                    a.element.signals().rejectSignal("res-built", b);
                    throw b;
                }
            );
        };
        f.maybeReportErrorOnBuildFailure = function (a) {
            je(a) || D().error("Resource", "failed to build:", this.debugid, a);
        };
        f.applySizesAndMediaQuery = function () {
            this.element.applySizesAndMediaQuery();
        };
        f.changeSize = function (a, b, c) {
            this.element.changeSize(a, b, c);
            this.requestMeasure();
        };
        f.overflowCallback = function (a, b, c, d) {
            a && (this.Vd = { height: b, width: c, margins: d });
            this.element.overflowCallback(a, b, c, d);
        };
        f.resetPendingChangeSize = function () {
            this.Vd = void 0;
        };
        f.getPendingChangeSize = function () {
            return this.Vd;
        };
        f.getUpgradeDelayMs = function () {
            return this.element.getUpgradeDelayMs();
        };
        f.measure = function () {
            if (
                !(
                    this.Ig &&
                    this.element.parentElement &&
                    Ga(this.element.parentElement.tagName, "AMP-")
                ) ||
                "__AMP__RESOURCE" in this.element.parentElement
            ) {
                this.yd = !1;
                var a = this.getPageLayoutBox();
                if (this.J) {
                    var b = this.element;
                    b.getLayers().remeasure(b, !0);
                } else {
                    var b = this.o.getViewport(),
                        c = this.o.getViewport().getLayoutRect(this.element);
                    this.pa = c;
                    var d = !1;
                    if (b.supportsPositionFixed() && this.isDisplayed())
                        for (
                            var e = this.o.win,
                                g = e.document.body,
                                h = this.element;
                            h && h != g;
                            h = h.offsetParent
                        ) {
                            if (h.isAlwaysFixed && h.isAlwaysFixed()) {
                                d = !0;
                                break;
                            }
                            if (
                                b.isDeclaredFixed(h) &&
                                "fixed" == Ld(e, h).position
                            ) {
                                d = !0;
                                break;
                            }
                        }
                    if ((this.ec = d))
                        this.pa = Ye(c, -b.getScrollLeft(), -b.getScrollTop());
                }
                var k = this.getPageLayoutBox(),
                    b = a,
                    c = k,
                    l = !(b.width == c.width && b.height === c.height);
                (1 != this.F && a.top == k.top && !l) ||
                    !this.element.isUpgraded() ||
                    0 == this.F ||
                    (1 != this.F && !this.element.isRelayoutNeeded()) ||
                    (this.F = 2);
                this.hasBeenMeasured() || (this.rd = k);
                this.element.updateLayoutBox(k, l);
            }
        };
        f.completeCollapse = function () {
            Kd(this.element, !1);
            this.pa = this.J
                ? X(0, 0, 0, 0)
                : X(this.pa.left, this.pa.top, 0, 0);
            this.ec = !1;
            this.element.updateLayoutBox(this.getLayoutBox());
            var a = this.getOwner();
            a && a.collapsedCallback(this.element);
        };
        f.completeExpand = function () {
            Kd(this.element, !0);
            this.element.removeAttribute("hidden");
            this.requestMeasure();
        };
        f.isMeasureRequested = function () {
            return this.yd;
        };
        f.hasBeenMeasured = function () {
            return !!this.rd;
        };
        f.requestMeasure = function () {
            this.yd = !0;
        };
        f.getLayoutBox = function () {
            if (this.J) {
                var a = this.element,
                    b = a.getLayers(),
                    c = b.getScrolledPosition(a),
                    a = b.getSize(a);
                return X(c.left, c.top, a.width, a.height);
            }
            if (!this.ec) return this.pa;
            c = this.o.getViewport();
            return Ye(this.pa, c.getScrollLeft(), c.getScrollTop());
        };
        f.getPageLayoutBox = function () {
            if (this.J) {
                var a = this.element,
                    b = a.getLayers(),
                    c = b.getOffsetPosition(a),
                    a = b.getSize(a);
                return X(c.left, c.top, a.width, a.height);
            }
            return this.pa;
        };
        f.getInitialLayoutBox = function () {
            return this.rd || this.pa;
        };
        f.isDisplayed = function () {
            var a = "fluid" == this.element.getLayout(),
                b = this.getLayoutBox(),
                c = 0 < b.height && 0 < b.width;
            return (
                (a || c) &&
                !!this.element.ownerDocument &&
                !!this.element.ownerDocument.defaultView
            );
        };
        f.isFixed = function () {
            return this.ec;
        };
        f.overlaps = function (a) {
            var b = this.getLayoutBox();
            return (
                b.top <= a.bottom &&
                a.top <= b.bottom &&
                b.left <= a.right &&
                a.left <= b.right
            );
        };
        f.prerenderAllowed = function () {
            return this.element.prerenderAllowed();
        };
        f.whenWithinRenderOutsideViewport = function () {
            if (!this.isLayoutPending()) return Promise.resolve();
            if (this.Ac) return this.Ac;
            var a = new L();
            this.Bc = a.resolve;
            return (this.Ac = a.promise);
        };
        function zh(a) {
            a.Bc && (a.Bc(), (a.Ac = null), (a.Bc = null));
        }
        f.withinViewportMultiplier = function (a) {
            if (!0 === a || !1 === a) return a;
            a = Math.max(a, 0);
            if (this.J) {
                var b = this.element;
                return b.getLayers().iterateAncestry(b, this.Kg);
            }
            var c = this.o.getViewport().getRect(),
                d = this.getLayoutBox(),
                e = this.o.getScrollDirection(),
                g = 1,
                h = 0;
            if (c.right < d.left || c.left > d.right) return !1;
            if (c.bottom < d.top) (h = d.top - c.bottom), -1 == e && (g = 2);
            else if (c.top > d.bottom)
                (h = c.top - d.bottom), 1 == e && (g = 2);
            else return !0;
            return h < (c.height * a) / g;
        };
        f.Kg = function (a, b, c) {
            var d = 1 + c / 10,
                e = b.isActiveUnsafe() ? 1 : 2;
            b =
                b.getHorizontalViewportsFromParent() +
                b.getVerticalViewportsFromParent();
            return a + e * d * b;
        };
        f.renderOutsideViewport = function () {
            return this.hasOwner() ||
                this.withinViewportMultiplier(
                    this.element.renderOutsideViewport()
                )
                ? (zh(this), !0)
                : !1;
        };
        f.idleRenderOutsideViewport = function () {
            return this.withinViewportMultiplier(
                this.element.idleRenderOutsideViewport()
            );
        };
        f.layoutScheduled = function (a) {
            this.F = 3;
            this.element.layoutScheduleTime = a;
        };
        f.layoutCanceled = function () {
            this.F = this.hasBeenMeasured() ? 2 : 1;
        };
        f.startLayout = function () {
            var a = this;
            if (this.$a) return this.$a;
            if (4 == this.F) return Promise.resolve();
            if (5 == this.F) return Promise.reject(this.gf);
            this.isDisplayed();
            if (0 < this.ba && !this.element.isRelayoutNeeded())
                return (this.F = 4), Promise.resolve();
            this.ba++;
            this.F = 3;
            var b;
            try {
                b = this.element.layoutCallback();
            } catch (c) {
                return Promise.reject(c);
            }
            return (this.$a = b.then(
                function () {
                    return Ah(a, !0);
                },
                function (b) {
                    return Ah(a, !1, b);
                }
            ));
        };
        function Ah(a, b, c) {
            a.Gd && (a.Gd(), (a.Gd = null));
            a.$a = null;
            a.jf = !0;
            a.F = b ? 4 : 5;
            a.gf = c;
            if (!b) return Promise.reject(c);
        }
        f.isLayoutPending = function () {
            return 4 != this.F && 5 != this.F;
        };
        f.loadedOnce = function () {
            return this.Mg;
        };
        f.hasLoadedOnce = function () {
            return this.jf;
        };
        f.isInViewport = function () {
            var a = this.element.isInViewport();
            a && zh(this);
            return a;
        };
        f.setInViewport = function (a) {
            this.element.viewportCallback(a);
        };
        f.unlayout = function () {
            0 != this.F &&
                1 != this.F &&
                (this.setInViewport(!1),
                this.element.unlayoutCallback() &&
                    (this.element.togglePlaceholder(!0),
                    (this.F = 1),
                    (this.ba = 0),
                    (this.$a = null)));
        };
        f.getTaskId = function (a) {
            return this.debugid + "#" + a;
        };
        f.pause = function () {
            this.element.pauseCallback();
            this.element.unlayoutOnPause() && this.unlayout();
        };
        f.pauseOnRemove = function () {
            this.element.pauseCallback();
        };
        f.resume = function () {
            this.element.resumeCallback();
        };
        f.unload = function () {
            this.pause();
            this.unlayout();
        };
        f.disconnect = function () {
            delete this.element.__AMP__RESOURCE;
            this.element.disconnectedCallback();
        };
        var Bh = [
            '<div class="i-amphtml-loader">\n        <div class="i-amphtml-loader-dot"></div>\n        <div class="i-amphtml-loader-dot"></div>\n        <div class="i-amphtml-loader-dot"></div>\n      </div>',
        ];
        Bh.raw = [
            '<div class="i-amphtml-loader">\n        <div class="i-amphtml-loader-dot"></div>\n        <div class="i-amphtml-loader-dot"></div>\n        <div class="i-amphtml-loader-dot"></div>\n      </div>',
        ];
        var Ch = [
            '<div class="i-amphtml-loader-line">\n          <div class="i-amphtml-loader-moving-line"></div>\n        </div>',
        ];
        Ch.raw = [
            '<div class="i-amphtml-loader-line">\n          <div class="i-amphtml-loader-moving-line"></div>\n        </div>',
        ];
        var Dh = { "AMP-AD": !0 };
        function Eh(a, b) {
            var c = a.split(",");
            A().assert(0 < c.length, "sizes has to have at least one size");
            var d = [];
            c.forEach(function (a) {
                a = a.replace(/\s+/g, " ").trim();
                if (0 != a.length) {
                    var c,
                        e,
                        k = a.charAt(a.length - 1),
                        l,
                        m = !1;
                    if (")" == k) {
                        var m = !0,
                            q = 1;
                        for (l = a.length - 2; 0 <= l; l--) {
                            var p = a.charAt(l);
                            "(" == p ? q-- : ")" == p && q++;
                            if (0 == q) break;
                        }
                        var u = l - 1;
                        if (0 < l)
                            for (
                                l--;
                                0 <= l &&
                                ((p = a.charAt(l)),
                                "%" == p ||
                                    "-" == p ||
                                    "_" == p ||
                                    ("a" <= p && "z" >= p) ||
                                    ("A" <= p && "Z" >= p) ||
                                    ("0" <= p && "9" >= p));
                                l--
                            );
                        A().assert(l < u, 'Invalid CSS function in "%s"', a);
                    } else
                        for (
                            l = a.length - 2;
                            0 <= l &&
                            ((p = a.charAt(l)),
                            "%" == p ||
                                "." == p ||
                                ("a" <= p && "z" >= p) ||
                                ("A" <= p && "Z" >= p) ||
                                ("0" <= p && "9" >= p));
                            l--
                        );
                    0 <= l
                        ? ((c = a.substring(0, l + 1).trim()),
                          (e = a.substring(l + 1).trim()))
                        : ((e = a), (c = void 0));
                    d.push({ mediaQuery: c, size: m ? e : b ? Ge(e) : Fe(e) });
                }
            });
            return new Fh(d);
        }
        function Fh(a) {
            A().assert(0 < a.length, "SizeList must have at least one option");
            this.lh = a;
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                b < a.length - 1
                    ? A().assert(
                          c.mediaQuery,
                          "All options except for the last must have a media condition"
                      )
                    : A().assert(
                          !c.mediaQuery,
                          "The last option must not have a media condition"
                      );
            }
        }
        Fh.prototype.select = function (a) {
            for (var b = this.lh, c = b.length - 1, d = 0; d < c; d++) {
                var e = b[d];
                if (a.matchMedia(e.mediaQuery).matches) return e.size;
            }
            return b[c].size;
        };
        var Gh = [
            '\n            <div class="i-amphtml-loading-container i-amphtml-fill-content\n              amp-hidden"></div>',
        ];
        Gh.raw = [
            '\n            <div class="i-amphtml-loading-container i-amphtml-fill-content\n              amp-hidden"></div>',
        ];
        var Hh;
        function Ih(a, b) {
            function c(a) {
                return d.call(this, a) || this;
            }
            var d = Jh(a);
            aa(c, d);
            c.prototype.elementName = function () {
                return b;
            };
            return c;
        }
        function Jh(a) {
            function b(a) {
                a = c.call(this, a) || this;
                a.createdCallback();
                return a;
            }
            if (a.BaseCustomElementClass) return a.BaseCustomElementClass;
            var c = a.HTMLElement;
            aa(b, c);
            b.prototype.createdCallback = function () {
                this.bc = this.Ge = !1;
                this.Zc = null;
                this.readyState = "loading";
                this.everAttached = !1;
                this.Za = this.o = this.D = null;
                this.layout_ = "nodisplay";
                this.layoutWidth_ = -1;
                this.ba = 0;
                this.Db = this.Xa = this.wd = !1;
                this.Jd =
                    this.Hd =
                    this.sizerElement =
                    this.$b =
                    this.Fc =
                    this.lc =
                        void 0;
                this.Id = this.Ia = null;
                this.da = void 0;
                var b =
                    a.ampExtendedElements &&
                    a.ampExtendedElements[this.elementName()];
                this.implementation_ = new b(this);
                this.ib = 1;
                this.Uf = 0;
                this.vb = this.Da = void 0;
                this.N = new Pe();
                var c = gc(a);
                this.uf = c && c.isPerformanceTrackingOn();
                this.Fd = null;
                this.__AMP_UPG_RES &&
                    (this.__AMP_UPG_RES(this),
                    delete this.__AMP_UPG_RES,
                    delete this.__AMP_UPG_PRM);
            };
            b.prototype.elementName = function () {};
            b.prototype.signals = function () {
                return this.N;
            };
            b.prototype.getAmpDoc = function () {
                return this.D;
            };
            b.prototype.getResources = function () {
                return this.o;
            };
            b.prototype.getLayers = function () {
                return this.Za;
            };
            b.prototype.isUpgraded = function () {
                return 2 == this.ib;
            };
            b.prototype.upgrade = function (a) {
                this.vb ||
                    1 != this.ib ||
                    ((this.implementation_ = new a(this)),
                    this.everAttached && this.Rf());
            };
            b.prototype.getUpgradeDelayMs = function () {
                return this.Uf;
            };
            b.prototype.ed = function (b, c) {
                this.Uf = a.Date.now() - c;
                this.ib = 2;
                this.implementation_ = b;
                this.classList.remove("amp-unresolved");
                this.classList.remove("i-amphtml-unresolved");
                this.implementation_.createdCallback();
                this.cg();
                this.implementation_.layout_ = this.layout_;
                this.implementation_.layoutWidth_ = this.layoutWidth_;
                this.implementation_.firstAttachedCallback();
                this.Wa();
                this.getResources().upgraded(this);
            };
            b.prototype.cg = function () {
                if (
                    "nodisplay" != this.layout_ &&
                    !this.implementation_.isLayoutSupported(this.layout_)
                ) {
                    var a = "Layout not supported: " + this.layout_;
                    this.getAttribute("layout") ||
                        (a +=
                            ". The element did not specify a layout attribute. Check https://www.ampproject.org/docs/guides/responsive/control_layout and the respective element documentation for details.");
                    throw A().createError(a);
                }
            };
            b.prototype.isBuilt = function () {
                return this.Ge;
            };
            b.prototype.whenBuilt = function () {
                return this.N.whenSignal("built");
            };
            b.prototype.getLayoutPriority = function () {
                this.isUpgraded();
                return this.implementation_.getLayoutPriority();
            };
            b.prototype.build = function () {
                var a = this;
                this.isUpgraded();
                return this.Zc
                    ? this.Zc
                    : (this.Zc = new Promise(function (b, c) {
                          var d = a.implementation_.getConsentPolicy();
                          d
                              ? ad(
                                    a.getAmpDoc(),
                                    "consentPolicyManager",
                                    "amp-consent"
                                )
                                    .then(function (a) {
                                        return a ? a.whenPolicyUnblock(d) : !0;
                                    })
                                    .then(function (d) {
                                        1 == d
                                            ? b(
                                                  a.implementation_.buildCallback()
                                              )
                                            : c(Error("BLOCK_BY_CONSENT"));
                                    })
                              : b(a.implementation_.buildCallback());
                      }).then(
                          function () {
                              a.preconnect(!1);
                              a.Ge = !0;
                              a.classList.remove("i-amphtml-notbuilt");
                              a.classList.remove("amp-notbuilt");
                              a.N.signal("built");
                              a.Xa && a.Sf(!0);
                              a.Da &&
                                  R(a.ownerDocument.defaultView).delay(
                                      a.sg.bind(a),
                                      1
                                  );
                              if (!a.getPlaceholder()) {
                                  var b = a.createPlaceholder();
                                  b && a.appendChild(b);
                              }
                          },
                          function (b) {
                              a.N.rejectSignal("built", b);
                              je(b) || he(b, a);
                              throw b;
                          }
                      ));
            };
            b.prototype.preconnect = function (a) {
                var b = this;
                a
                    ? this.implementation_.preconnectCallback(a)
                    : R(this.ownerDocument.defaultView).delay(function () {
                          b.implementation_.preconnectCallback(a);
                      }, 1);
            };
            b.prototype.isAlwaysFixed = function () {
                return this.implementation_.isAlwaysFixed();
            };
            b.prototype.updateLayoutBox = function (a, b) {
                var c = this;
                this.layoutWidth_ = a.width;
                this.isUpgraded() &&
                    (this.implementation_.layoutWidth_ = this.layoutWidth_);
                if (this.isBuilt())
                    try {
                        if ((this.implementation_.onLayoutMeasure(), b))
                            this.implementation_.onMeasureChanged();
                    } catch (h) {
                        he(h, this);
                    }
                this.fc() &&
                    (this.Xa
                        ? this.toggleLoading(!0)
                        : 1e3 > a.top &&
                          0 <= a.top &&
                          this.oc(function () {
                              return c.xf();
                          }));
            };
            b.prototype.We = function () {
                void 0 === this.sizerElement &&
                    "responsive" === this.layout_ &&
                    (this.sizerElement = this.querySelector("i-amphtml-sizer"));
                return this.sizerElement || null;
            };
            b.prototype.applySizesAndMediaQuery = function () {
                void 0 === this.lc &&
                    (this.lc = this.getAttribute("media") || null);
                if (this.lc) {
                    var a = this.ownerDocument.defaultView;
                    this.classList.toggle(
                        "i-amphtml-hidden-by-media-query",
                        !a.matchMedia(this.lc).matches
                    );
                }
                if (void 0 === this.Fc) {
                    var b = this.getAttribute("sizes");
                    this.Fc = b ? Eh(b) : null;
                }
                this.Fc &&
                    U(
                        this,
                        "width",
                        this.Fc.select(this.ownerDocument.defaultView)
                    );
                void 0 === this.$b &&
                    "responsive" === this.layout_ &&
                    (this.$b = (b = this.getAttribute("heights"))
                        ? Eh(b, !0)
                        : null);
                this.$b &&
                    (b = this.We()) &&
                    U(
                        b,
                        "paddingTop",
                        this.$b.select(this.ownerDocument.defaultView)
                    );
            };
            b.prototype.changeSize = function (a, b, c) {
                var d = this.We();
                d &&
                    ((this.sizerElement = null),
                    U(d, "paddingTop", "0"),
                    this.oc(function () {
                        Ic(d);
                    }));
                void 0 !== a && U(this, "height", a, "px");
                void 0 !== b && U(this, "width", b, "px");
                c &&
                    (null != c.top && U(this, "marginTop", c.top, "px"),
                    null != c.right && U(this, "marginRight", c.right, "px"),
                    null != c.bottom && U(this, "marginBottom", c.bottom, "px"),
                    null != c.left && U(this, "marginLeft", c.left, "px"));
                this.Cg() && this.kh();
            };
            b.prototype.connectedCallback = function () {
                if (
                    !this.bc &&
                    Jc(this) &&
                    ((this.bc = !0),
                    this.everAttached ||
                        (this.classList.add("i-amphtml-element"),
                        this.classList.add("i-amphtml-notbuilt"),
                        this.classList.add("amp-notbuilt")),
                    void 0 === Hh &&
                        (Hh =
                            "content" in
                            self.document.createElement("template")),
                    Hh ||
                        void 0 !== this.vb ||
                        (this.vb = !!Nc(this, "template")),
                    !this.vb)
                ) {
                    if (!this.D) {
                        var a = this.ownerDocument.defaultView,
                            b = dd(a).getAmpDoc(this);
                        this.D = b;
                        var c = this.tagName.toLowerCase();
                        this.implementation_ instanceof uh &&
                            !b.declaresExtension(c) &&
                            fd(a).installExtensionForDoc(b, c);
                    }
                    this.o || (this.o = id(this.D));
                    J(this.D.win, "layers") &&
                        (this.Za || (this.Za = M(this.D, "layers")),
                        this.getLayers().add(this));
                    this.getResources().add(this);
                    if (this.everAttached) {
                        var h = this.reconstructWhenReparented();
                        h && this.Ef();
                        this.isUpgraded() &&
                            (h && this.getResources().upgraded(this),
                            this.Wa());
                    } else {
                        this.everAttached = !0;
                        try {
                            var k;
                            var l = this.getAttribute("i-amphtml-layout");
                            if (l) {
                                var m = Ce(l);
                                ("responsive" != m && "intrinsic" != m) ||
                                !this.firstElementChild
                                    ? "nodisplay" == m && Je(this)
                                    : (this.sizerElement =
                                          this.querySelector(
                                              "i-amphtml-sizer"
                                          ) || void 0);
                                k = m;
                            } else {
                                var q = this.getAttribute("layout"),
                                    p = this.getAttribute("width"),
                                    u = this.getAttribute("height"),
                                    t = this.getAttribute("sizes"),
                                    y = this.getAttribute("heights"),
                                    B = q ? Ce(q) : null;
                                A().assert(
                                    void 0 !== B,
                                    "Unknown layout: %s",
                                    q
                                );
                                var F = p && "auto" != p ? Ee(p) : p;
                                A().assert(
                                    void 0 !== F,
                                    "Invalid width value: %s",
                                    p
                                );
                                var C = u && "fluid" != u ? Ee(u) : u;
                                A().assert(
                                    void 0 !== C,
                                    "Invalid height value: %s",
                                    u
                                );
                                var x, v, w, Q;
                                if (
                                    !(Q =
                                        (B &&
                                            "fixed" != B &&
                                            "fixed-height" != B) ||
                                        (F && C))
                                ) {
                                    var na = this.tagName,
                                        na = na.toUpperCase();
                                    Q = void 0 === Ae[na];
                                }
                                if (Q) (x = F), (v = C);
                                else {
                                    var oa = this.tagName.toUpperCase();
                                    if (!Ae[oa]) {
                                        var E = this.ownerDocument,
                                            T = oa.replace(/^AMP\-/, ""),
                                            Aa = E.createElement(T);
                                        Aa.controls = !0;
                                        Jd(Aa, {
                                            position: "absolute",
                                            visibility: "hidden",
                                        });
                                        E.body.appendChild(Aa);
                                        Ae[oa] = {
                                            width: (Aa.offsetWidth || 1) + "px",
                                            height:
                                                (Aa.offsetHeight || 1) + "px",
                                        };
                                        E.body.removeChild(Aa);
                                    }
                                    var za = Ae[oa];
                                    x = F || "fixed-height" == B ? F : za.width;
                                    v = C || za.height;
                                }
                                w = B
                                    ? B
                                    : x || v
                                    ? "fluid" == v
                                        ? "fluid"
                                        : !v || (x && "auto" != x)
                                        ? v && x && (t || y)
                                            ? "responsive"
                                            : "fixed"
                                        : "fixed-height"
                                    : "container";
                                ("fixed" != w &&
                                    "fixed-height" != w &&
                                    "responsive" != w &&
                                    "intrinsic" != w) ||
                                    A().assert(
                                        v,
                                        "Expected height to be available: %s",
                                        u
                                    );
                                "fixed-height" == w &&
                                    A().assert(
                                        !x || "auto" == x,
                                        'Expected width to be either absent or equal "auto" for fixed-height layout: %s',
                                        p
                                    );
                                ("fixed" != w &&
                                    "responsive" != w &&
                                    "intrinsic" != w) ||
                                    A().assert(
                                        x && "auto" != x,
                                        'Expected width to be available and not equal to "auto": %s',
                                        p
                                    );
                                "responsive" == w || "intrinsic" == w
                                    ? A().assert(
                                          He(x) == He(v),
                                          "Length units should be the same for width and height: %s, %s",
                                          p,
                                          u
                                      )
                                    : A().assert(
                                          null === y,
                                          'Unexpected "heights" attribute for none-responsive layout'
                                      );
                                this.classList.add("i-amphtml-layout-" + w);
                                De(w) &&
                                    this.classList.add(
                                        "i-amphtml-layout-size-defined"
                                    );
                                if ("nodisplay" == w) Je(this);
                                else if ("fixed" == w)
                                    Jd(this, { width: x, height: v });
                                else if ("fixed-height" == w)
                                    U(this, "height", v);
                                else if ("responsive" == w) {
                                    var Z =
                                        this.ownerDocument.createElement(
                                            "i-amphtml-sizer"
                                        );
                                    Jd(Z, {
                                        display: "block",
                                        paddingTop: (Ie(v) / Ie(x)) * 100 + "%",
                                    });
                                    this.insertBefore(Z, this.firstChild);
                                    this.sizerElement = Z;
                                } else if ("intrinsic" == w) {
                                    var da = we(this)(ye),
                                        ca = da.firstElementChild;
                                    ca.setAttribute(
                                        "src",
                                        'data:image/svg+xml;charset=utf-8,<svg height="' +
                                            v +
                                            '" width="' +
                                            x +
                                            '" xmlns="http://www.w3.org/2000/svg" version="1.1"/>'
                                    );
                                    this.insertBefore(da, this.firstChild);
                                    this.sizerElement = ca;
                                } else
                                    "fill" != w &&
                                        "container" != w &&
                                        ("flex-item" == w
                                            ? (x && U(this, "width", x),
                                              v && U(this, "height", v))
                                            : "fluid" == w &&
                                              (this.classList.add(
                                                  "i-amphtml-layout-awaiting-size"
                                              ),
                                              x && U(this, "width", x),
                                              U(this, "height", 0)));
                                k = w;
                            }
                            this.layout_ = k;
                        } catch (ua) {
                            he(ua, this);
                        }
                        this.implementation_ instanceof uh || this.Rf();
                        this.isUpgraded() ||
                            (this.classList.add("amp-unresolved"),
                            this.classList.add("i-amphtml-unresolved"),
                            this.Wa());
                    }
                }
            };
            b.prototype.Cg = function () {
                return this.classList.contains(
                    "i-amphtml-layout-awaiting-size"
                );
            };
            b.prototype.kh = function () {
                this.classList.remove("i-amphtml-layout-awaiting-size");
            };
            b.prototype.attachedCallback = function () {
                this.connectedCallback();
            };
            b.prototype.Rf = function () {
                var b = this,
                    c = this.implementation_;
                if (1 == this.ib) {
                    this.ib = 4;
                    var g = a.Date.now(),
                        h = c.upgradeCallback();
                    h
                        ? "function" == typeof h.then
                            ? h
                                  .then(function (a) {
                                      b.ed(a || c, g);
                                  })
                                  .catch(function (a) {
                                      b.ib = 3;
                                      z(a);
                                  })
                            : this.ed(h, g)
                        : this.ed(c, g);
                }
            };
            b.prototype.disconnectedCallback = function () {
                this.vb ||
                    !this.bc ||
                    Jc(this) ||
                    ((this.bc = !1),
                    this.getResources().remove(this),
                    this.implementation_.detachedCallback());
            };
            b.prototype.detachedCallback = function () {
                this.disconnectedCallback();
            };
            b.prototype.dispatchCustomEvent = function (a, b) {
                b = b || {};
                var c = this.ownerDocument.createEvent("Event");
                c.data = b;
                c.initEvent(a, !0, !0);
                this.dispatchEvent(c);
            };
            b.prototype.Wa = function () {};
            b.prototype.prerenderAllowed = function () {
                return this.implementation_.prerenderAllowed();
            };
            b.prototype.createPlaceholder = function () {
                return this.implementation_.createPlaceholderCallback();
            };
            b.prototype.renderOutsideViewport = function () {
                return this.implementation_.renderOutsideViewport();
            };
            b.prototype.idleRenderOutsideViewport = function () {
                return this.implementation_.idleRenderOutsideViewport();
            };
            b.prototype.getLayoutBox = function () {
                return this.getResources()
                    .getResourceForElement(this)
                    .getLayoutBox();
            };
            b.prototype.getPageLayoutBox = function () {
                return this.getResources()
                    .getResourceForElement(this)
                    .getPageLayoutBox();
            };
            b.prototype.getOwner = function () {
                return this.getResources()
                    .getResourceForElement(this)
                    .getOwner();
            };
            b.prototype.getIntersectionChangeEntry = function () {
                var a = this.implementation_.getIntersectionElementLayoutBox(),
                    b = this.getResources()
                        .getResourceForElement(this)
                        .getOwner(),
                    c = this.implementation_.getViewport().getRect(),
                    h = b && b.getLayoutBox(),
                    k = We(a, h, c) || X(0, 0, 0, 0),
                    b = (k.width * k.height) / (a.width * a.height),
                    l = c;
                c &&
                    ((k = Ye(k, -c.left, -c.top)),
                    (a = Ye(a, -c.left, -c.top)),
                    (l = Ye(l, -c.left, -c.top)));
                return {
                    time:
                        "undefined" !== typeof performance && performance.now
                            ? performance.now()
                            : Date.now() - Yf,
                    rootBounds: l,
                    boundingClientRect: a,
                    intersectionRect: k,
                    intersectionRatio: b,
                };
            };
            b.prototype.getResourceId = function () {
                return this.getResources().getResourceForElement(this).getId();
            };
            b.prototype.yg = function () {
                return this.getResources()
                    .getResourceForElement(this)
                    .getState();
            };
            b.prototype.isRelayoutNeeded = function () {
                return this.implementation_.isRelayoutNeeded();
            };
            b.prototype.getImpl = function () {
                var a = this;
                return this.whenBuilt().then(function () {
                    return a.implementation_;
                });
            };
            b.prototype.getLayout = function () {
                return this.layout_;
            };
            b.prototype.layoutCallback = function () {
                var a = this;
                this.isBuilt();
                this.Wa();
                var b = 0 == this.ba;
                this.N.reset("unload");
                b && this.N.signal("load-start");
                this.uf && this.Ve().startLayout();
                var c = Xb(function () {
                    return a.implementation_.layoutCallback();
                });
                this.preconnect(!0);
                this.classList.add("i-amphtml-layout");
                return c.then(
                    function () {
                        b && a.N.signal("load-end");
                        a.readyState = "complete";
                        a.ba++;
                        a.toggleLoading(!1, { cleanup: !0 });
                        a.wd ||
                            (a.implementation_.firstLayoutCompleted(),
                            (a.wd = !0),
                            a.dispatchCustomEvent("amp:load:end"));
                    },
                    function (c) {
                        b && a.N.rejectSignal("load-end", c);
                        a.ba++;
                        a.toggleLoading(!1, { cleanup: !0 });
                        throw c;
                    }
                );
            };
            b.prototype.isInViewport = function () {
                return this.Xa;
            };
            b.prototype.viewportCallback = function (a) {
                var b = this;
                a != this.Xa &&
                    this.ownerDocument &&
                    this.ownerDocument.defaultView &&
                    ((this.Xa = a),
                    0 == this.ba &&
                        (a
                            ? R(this.ownerDocument.defaultView).delay(
                                  function () {
                                      b.Xa &&
                                          b.ownerDocument &&
                                          b.ownerDocument.defaultView &&
                                          b.toggleLoading(!0);
                                  },
                                  100
                              )
                            : this.toggleLoading(!1)),
                    this.isBuilt() && this.Sf(a));
            };
            b.prototype.Sf = function (a) {
                this.implementation_.inViewport_ = a;
                this.implementation_.viewportCallback(a);
                a && this.uf && this.Ve().enterViewport();
            };
            b.prototype.isPaused = function () {
                return this.Db;
            };
            b.prototype.pauseCallback = function () {
                this.Db ||
                    ((this.Db = !0),
                    this.viewportCallback(!1),
                    this.isBuilt() && this.implementation_.pauseCallback());
            };
            b.prototype.resumeCallback = function () {
                this.Db &&
                    ((this.Db = !1),
                    this.isBuilt() && this.implementation_.resumeCallback());
            };
            b.prototype.unlayoutCallback = function () {
                if (!this.isBuilt()) return !1;
                this.N.signal("unload");
                var a = this.implementation_.unlayoutCallback();
                a && this.Ef();
                return a;
            };
            b.prototype.Ef = function () {
                this.ba = 0;
                this.wd = !1;
                this.N.reset("render-start");
                this.N.reset("load-start");
                this.N.reset("load-end");
                this.N.reset("ini-load");
            };
            b.prototype.unlayoutOnPause = function () {
                return this.implementation_.unlayoutOnPause();
            };
            b.prototype.reconstructWhenReparented = function () {
                return this.implementation_.reconstructWhenReparented();
            };
            b.prototype.collapse = function () {
                this.implementation_.collapse();
            };
            b.prototype.collapsedCallback = function (a) {
                this.implementation_.collapsedCallback(a);
            };
            b.prototype.expand = function () {
                this.implementation_.expand();
            };
            b.prototype.expandedCallback = function (a) {
                this.implementation_.expandedCallback(a);
            };
            b.prototype.mutatedAttributesCallback = function (a) {
                this.implementation_.mutatedAttributesCallback(a);
            };
            b.prototype.enqueAction = function (a) {
                this.isBuilt()
                    ? this.Re(a, !1)
                    : (void 0 === this.Da && (this.Da = []), this.Da.push(a));
            };
            b.prototype.sg = function () {
                var a = this;
                if (this.Da) {
                    var b = this.Da;
                    this.Da = null;
                    b.forEach(function (b) {
                        a.Re(b, !0);
                    });
                }
            };
            b.prototype.Re = function (a, b) {
                try {
                    this.implementation_.executeAction(a, b);
                } catch (g) {
                    z("Action execution failed:", g, a.node.tagName, a.method);
                }
            };
            b.prototype.getRealChildNodes = function () {
                return Qc(this, function (a) {
                    return !Kh(a);
                });
            };
            b.prototype.getRealChildren = function () {
                return Oc(this, function (a) {
                    return !Kh(a);
                });
            };
            b.prototype.toggleLayoutDisplay = function (a) {
                this.classList.toggle("i-amphtml-display", a);
            };
            b.prototype.getPlaceholder = function () {
                return Pc(this, function (a) {
                    return (
                        a.hasAttribute("placeholder") && !("placeholder" in a)
                    );
                });
            };
            b.prototype.togglePlaceholder = function (a) {
                if (a) {
                    var b = this.getPlaceholder();
                    b && b.classList.remove("amp-hidden");
                } else
                    for (
                        var c = Uc(this, "> [placeholder]"), b = 0;
                        b < c.length;
                        b++
                    )
                        "placeholder" in c[b] ||
                            c[b].classList.add("amp-hidden");
            };
            b.prototype.getFallback = function () {
                return Tc(this, "> [fallback]");
            };
            b.prototype.toggleFallback = function (a) {
                var b = this.yg();
                if (!a || (0 != b && 1 != b && 2 != b))
                    if (
                        (this.classList.toggle("amp-notsupported", a), 1 == a)
                    ) {
                        var c = this.getFallback();
                        c && this.getResources().scheduleLayout(this, c);
                    }
            };
            b.prototype.renderStarted = function () {
                this.N.signal("render-start");
                this.togglePlaceholder(!1);
                this.toggleLoading(!1);
            };
            b.prototype.fc = function () {
                if (this.Eg()) return !1;
                void 0 === this.Hd &&
                    (this.Hd = this.hasAttribute("noloading"));
                var a;
                (a = this.Hd) ||
                    ((a = this.tagName.toUpperCase()),
                    (a = !("AMP-AD" == a || "AMP-EMBED" == a || Be[a])));
                return a ||
                    100 > this.layoutWidth_ ||
                    0 < this.ba ||
                    Kh(this) ||
                    !De(this.layout_)
                    ? !1
                    : !0;
            };
            b.prototype.Eg = function () {
                return (
                    (this.D && this.D.win != this.ownerDocument.defaultView) ||
                    "inabox" == r().runtime
                );
            };
            b.prototype.xf = function () {
                if (this.fc() && !this.Ia) {
                    var a = this.ownerDocument,
                        b = we(a)(Gh),
                        c = this.elementName(),
                        a = Dh[c.toUpperCase()] ? we(a)(Ch) : we(a)(Bh);
                    b.appendChild(a);
                    this.appendChild(b);
                    this.Ia = b;
                    this.Id = a;
                }
            };
            b.prototype.toggleLoading = function (a, b) {
                var c = this,
                    d = b && b.cleanup,
                    e = b && b.force;
                if (
                    !a ||
                    this.implementation_.isLoadingReused() ||
                    !(0 < this.ba || this.N.get("render-start"))
                )
                    if ((this.Jd = a) || this.Ia)
                        !a || e || this.fc()
                            ? this.oc(function () {
                                  var a = c.Jd;
                                  !a || e || c.fc() || (a = !1);
                                  a && c.xf();
                                  if (
                                      c.Ia &&
                                      (c.Ia.classList.toggle("amp-hidden", !a),
                                      c.Id.classList.toggle("amp-active", a),
                                      !a &&
                                          d &&
                                          !c.implementation_.isLoadingReused())
                                  ) {
                                      var b = c.Ia;
                                      c.Ia = null;
                                      c.Id = null;
                                      c.oc(function () {
                                          Ic(b);
                                      });
                                  }
                              })
                            : (this.Jd = !1);
            };
            b.prototype.Ve = function () {
                this.Fd ||
                    (this.Fd = new wh(
                        this.ownerDocument.defaultView,
                        this.getLayoutPriority()
                    ));
                return this.Fd;
            };
            b.prototype.getOverflowElement = function () {
                void 0 === this.da &&
                    (this.da = Tc(this, "> [overflow]")) &&
                    (this.da.hasAttribute("tabindex") ||
                        this.da.setAttribute("tabindex", "0"),
                    this.da.hasAttribute("role") ||
                        this.da.setAttribute("role", "button"));
                return this.da;
            };
            b.prototype.overflowCallback = function (a, b, c) {
                var d = this;
                this.getOverflowElement();
                this.da
                    ? (this.da.classList.toggle("amp-visible", a),
                      (this.da.onclick = a
                          ? function () {
                                var a = d.getResources();
                                a.changeSize(d, b, c);
                                a.mutateElement(d, function () {
                                    d.overflowCallback(!1, b, c);
                                });
                            }
                          : null))
                    : a &&
                      A().warn(
                          "CustomElement",
                          "Cannot resize element and overflow is not available",
                          this
                      );
            };
            b.prototype.oc = function (a) {
                this.o ? this.getResources().mutateElement(this, a) : a();
            };
            a.BaseCustomElementClass = b;
            return a.BaseCustomElementClass;
        }
        function Kh(a) {
            var b = "string" == typeof a ? a : a.tagName;
            return (b && Ga(b.toLowerCase(), "i-")) ||
                (a.tagName &&
                    (a.hasAttribute("placeholder") ||
                        a.hasAttribute("fallback") ||
                        a.hasAttribute("overflow")))
                ? !0
                : !1;
        }
        function Lh(a) {
            a.ampExtendedElements || (a.ampExtendedElements = {});
            return a.ampExtendedElements;
        }
        function Mh(a, b, c) {
            var d = Lh(a);
            if (!d[b]) Nh(a, b, c);
            else if (d[b] != c) {
                A().assert(
                    d[b] == uh,
                    "%s is already registered. The script tag for %s is likely included twice in the page.",
                    b,
                    b
                );
                d[b] = c;
                for (var e = 0; e < th.length; e++) {
                    var g = th[e],
                        h = g.element;
                    if (
                        h.tagName.toLowerCase() == b &&
                        h.ownerDocument.defaultView == a
                    ) {
                        try {
                            h.upgrade(c);
                        } catch (k) {
                            he(k, h);
                        }
                        th.splice(e--, 1);
                    }
                }
            }
        }
        function Oh(a) {
            for (
                var b = a
                        .getHeadNode()
                        .querySelectorAll("script[custom-element]"),
                    c = 0;
                c < b.length;
                c++
            ) {
                var d = b[c].getAttribute("custom-element");
                a.declareExtension(d);
                Ph(a.win, d);
            }
        }
        function Ph(a, b) {
            Lh(a)[b] || Nh(a, b, uh);
        }
        function Nh(a, b, c) {
            Lh(a)[b] = c;
            var d = Ih(a, b),
                e = "customElements" in a;
            e
                ? a.customElements.define(b, d)
                : a.document.registerElement(b, { prototype: d.prototype });
        }
        function Qh(a, b) {
            this.element = a;
            this.win = a.ownerDocument.defaultView || b;
            this.compileCallback();
        }
        Qh.prototype.compileCallback = function () {};
        Qh.prototype.render = function () {
            throw Error("Not implemented");
        };
        Qh.prototype.unwrap = function (a) {
            for (var b = null, c = a.firstChild; null != c; c = c.nextSibling)
                if (3 == c.nodeType) {
                    if (c.textContent.trim()) {
                        b = null;
                        break;
                    }
                } else if (8 != c.nodeType)
                    if (1 == c.nodeType)
                        if (b) {
                            b = null;
                            break;
                        } else b = c;
                    else b = null;
            return b || a;
        };
        function Rh(a) {
            this.w = a;
            this.Nb = {};
            this.ge = {};
            this.zh = void 0;
        }
        f = Rh.prototype;
        f.renderTemplate = function (a, b) {
            return Sh(this, a).then(function (a) {
                return a.render(b);
            });
        };
        f.renderTemplateArray = function (a, b) {
            return 0 == b.length
                ? Promise.resolve([])
                : Sh(this, a).then(function (a) {
                      return b.map(function (b) {
                          return a.render(b);
                      });
                  });
        };
        f.findAndRenderTemplate = function (a, b, c) {
            return this.renderTemplate(Th(a, c), b);
        };
        f.findAndRenderTemplateArray = function (a, b, c) {
            return this.renderTemplateArray(Th(a, c), b);
        };
        f.hasTemplate = function (a, b) {
            return !!Uh(a, b);
        };
        function Th(a, b) {
            b = Uh(a, b);
            A().assert(b, "Template not found for %s", a);
            A().assert(
                "TEMPLATE" == b.tagName,
                'Template element must be a "template" tag %s',
                b
            );
            return b;
        }
        function Uh(a, b) {
            var c = a.getAttribute("template");
            return c
                ? Kc(a).getElementById(c)
                : b
                ? Tc(a, b)
                : Tc(a, "> template");
        }
        function Sh(a, b) {
            var c = b.__AMP_IMPL_;
            if (c) return Promise.resolve(c);
            var c = A().assert(
                    b.getAttribute("type"),
                    "Type must be specified: %s",
                    b
                ),
                d = b.__AMP_WAIT_;
            if (d) return d;
            d = Vh(a, c).then(function (c) {
                var d = (b.__AMP_IMPL_ = new c(b, a.w));
                delete b.__AMP_WAIT_;
                return d;
            });
            return (b.__AMP_WAIT_ = d);
        }
        function Vh(a, b) {
            if (a.Nb[b]) return a.Nb[b];
            var c = new L(),
                d = c.promise,
                c = c.resolve;
            a.Nb[b] = d;
            a.ge[b] = c;
            return d;
        }
        var Wh = {
            PRERENDER: "prerender",
            VISIBLE: "visible",
            HIDDEN: "hidden",
            PAUSED: "paused",
            INACTIVE: "inactive",
        };
        var Xh = ["GET", "POST"],
            Yh = [ja, ka],
            Zh = { document: 1, text: 2 };
        function $h(a) {
            this.win = a;
            a = dd(a);
            this.Rc = a.isSingleDoc() ? a.getAmpDoc() : null;
        }
        f = $h.prototype;
        f.xg = function (a, b) {
            var c = this,
                d = arguments,
                e = b.credentials;
            return ai(this, a, b).then(function (e) {
                if (e) return e;
                wg(b.body) && (b.body = b.body.getFormData());
                return "document" == b.responseType
                    ? bi(a, b)
                    : (c.win.fetch || bi).apply(null, d);
            });
        };
        function ai(a, b, c) {
            if (!a.Rc) return Promise.resolve();
            var d = S(a.Rc),
                e = d.whenFirstVisible();
            if (!d.hasCapability("xhrInterceptor")) return e;
            var g = a.Rc.getRootNode().documentElement.hasAttribute(
                    "allow-xhr-interception"
                ),
                h = r(a.win).development;
            return g
                ? e
                      .then(function () {
                          return d.isTrustedViewer();
                      })
                      .then(function (e) {
                          if (e || h) {
                              var g = H({ originalRequest: ci(b, c) });
                              return d
                                  .sendMessageAwaitResponse("xhr", g)
                                  .then(function (b) {
                                      return di(a, b, c.responseType);
                                  });
                          }
                      })
                : e;
        }
        function ci(a, b) {
            var c = Object.assign({}, b);
            if (wg(b.body)) {
                c.headers = c.headers || {};
                c.headers["Content-Type"] = "multipart/form-data;charset=utf-8";
                b = b.body.entries();
                for (var d = [], e = b.next(); !e.done; e = b.next())
                    d.push(e.value);
                c.body = d;
            }
            return { input: a, init: c };
        }
        function di(a, b, c) {
            A().assert(ka(b), "Object expected: %s", b);
            var d = "document" == c;
            if ("function" === typeof a.win.Response && !d)
                return new a.win.Response(b.body, b.init);
            var e = G();
            a = {
                status: 200,
                statusText: "OK",
                responseText: b.body ? String(b.body) : "",
                getResponseHeader: function (a) {
                    return e[String(a).toLowerCase()] || null;
                },
            };
            b.init &&
                ((b = b.init),
                ja(b.headers) &&
                    b.headers.forEach(function (a) {
                        var b = a[0],
                            c = a[1];
                        e[String(b).toLowerCase()] = String(c);
                    }),
                b.status && (a.status = parseInt(b.status, 10)),
                b.statusText && (a.statusText = String(b.statusText)));
            d &&
                (a.responseXML = new DOMParser().parseFromString(
                    a.responseText,
                    "text/html"
                ));
            return new ei(a);
        }
        function fi(a, b, c) {
            c = void 0 === c ? {} : c;
            !1 !== c.ampCors
                ? (b = a.getCorsUrl(a.win, b))
                : (c.requireAmpResponseSourceOrigin = !1);
            !0 === c.requireAmpResponseSourceOrigin &&
                D().error(
                    "XHR",
                    "requireAmpResponseSourceOrigin is deprecated, use ampCors instead"
                );
            void 0 === c.requireAmpResponseSourceOrigin &&
                (c.requireAmpResponseSourceOrigin = !0);
            var d = Ta(a.win),
                e = I(b).origin;
            d == e &&
                ((c.headers = c.headers || {}),
                (c.headers["AMP-Same-Origin"] = "true"));
            return a.xg(b, c).then(
                function (b) {
                    var d = b.headers.get(
                        "AMP-Access-Control-Allow-Source-Origin"
                    );
                    if (d) {
                        var e = jb(a.win.location.href);
                        A().assert(
                            d == e,
                            "Returned AMP-Access-Control-Allow-Source-Origin is not equal to the current: " +
                                d +
                                (" vs " + e)
                        );
                    } else
                        c.requireAmpResponseSourceOrigin &&
                            A().assert(
                                !1,
                                "Response must contain the AMP-Access-Control-Allow-Source-Origin header"
                            );
                    return b;
                },
                function (a) {
                    throw A().createExpectedError(
                        "XHR",
                        "Failed fetching" + (" (" + e + "/...):"),
                        a && a.message
                    );
                }
            );
        }
        f.fetchJson = function (a, b) {
            var c = gi(b, "application/json");
            if ("POST" == c.method && !wg(c.body)) {
                Yh.some(function (a) {
                    return a(c.body);
                });
                c.headers["Content-Type"] =
                    c.headers["Content-Type"] || "text/plain;charset=utf-8";
                var d = c.headers["Content-Type"];
                c.body =
                    "application/x-www-form-urlencoded" === d
                        ? cb(c.body)
                        : JSON.stringify(c.body);
            }
            return this.fetch(a, c);
        };
        f.fetchText = function (a, b) {
            return this.fetch(a, gi(b, "text/plain"));
        };
        f.fetchDocument = function (a, b) {
            b = gi(b, "text/html");
            b.responseType = "document";
            return this.fetch(a, b).then(function (a) {
                return a.T();
            });
        };
        f.fetch = function (a, b) {
            b = gi(b);
            return fi(this, a, b).then(function (a) {
                return hi(a);
            });
        };
        f.sendSignal = function (a, b) {
            return fi(this, a, b).then(function (a) {
                return hi(a);
            });
        };
        f.getCorsUrl = function (a, b) {
            kb(b);
            a = jb(a.location.href);
            a =
                encodeURIComponent("__amp_source_origin") +
                "=" +
                encodeURIComponent(a);
            return Va(b, a, void 0);
        };
        function gi(a, b) {
            a = a || {};
            var c;
            c = a.method;
            void 0 === c
                ? (c = "GET")
                : ((c = c.toUpperCase()), Xh.includes(c));
            a.method = c;
            a.headers = a.headers || {};
            b && (a.headers.Accept = b);
            return a;
        }
        function bi(a, b) {
            return new Promise(function (c, d) {
                var e = ii(b.method || "GET", a);
                "include" == b.credentials && (e.withCredentials = !0);
                b.responseType in Zh && (e.responseType = b.responseType);
                b.headers &&
                    Object.keys(b.headers).forEach(function (a) {
                        e.setRequestHeader(a, b.headers[a]);
                    });
                e.onreadystatechange = function () {
                    2 > e.readyState ||
                        (100 > e.status || 599 < e.status
                            ? ((e.onreadystatechange = null),
                              d(
                                  A().createExpectedError(
                                      "Unknown HTTP status " + e.status
                                  )
                              ))
                            : 4 == e.readyState && c(new ei(e)));
                };
                e.onerror = function () {
                    d(A().createExpectedError("Network failure"));
                };
                e.onabort = function () {
                    d(A().createExpectedError("Request aborted"));
                };
                "POST" == b.method ? e.send(b.body) : e.send();
            });
        }
        function ii(a, b) {
            var c = new XMLHttpRequest();
            if ("withCredentials" in c) c.open(a, b, !0);
            else if ("undefined" != typeof XDomainRequest)
                (c = new XDomainRequest()), c.open(a, b);
            else throw D().createExpectedError("CORS is not supported");
            return c;
        }
        function hi(a) {
            return new Promise(function (b) {
                if (a.ok) return b(a);
                b = a.status;
                var c = A().createError("HTTP error " + b);
                c.retriable = 415 == b || (500 <= b && 600 > b);
                c.response = a;
                throw c;
            });
        }
        function ei(a) {
            this.Ca = a;
            this.status = this.Ca.status;
            this.ok = 200 <= this.status && 300 > this.status;
            this.headers = new ji(a);
            this.bodyUsed = !1;
            this.body = null;
        }
        f = ei.prototype;
        f.clone = function () {
            return new ei(this.Ca);
        };
        function ki(a) {
            a.bodyUsed = !0;
            return Promise.resolve(a.Ca.responseText);
        }
        f.text = function () {
            return ki(this);
        };
        f.json = function () {
            return ki(this).then(nd);
        };
        f.T = function () {
            this.bodyUsed = !0;
            A().assert(
                this.Ca.responseXML,
                "responseXML should exist. Make sure to return Content-Type: text/html header."
            );
            return Promise.resolve(this.Ca.responseXML);
        };
        f.arrayBuffer = function () {
            return ki(this).then(Ke);
        };
        function ji(a) {
            this.Ca = a;
        }
        ji.prototype.get = function (a) {
            return this.Ca.getResponseHeader(a);
        };
        ji.prototype.has = function (a) {
            return null != this.Ca.getResponseHeader(a);
        };
        function li(a) {
            $h.call(this, a);
            this.sb = G();
        }
        aa(li, $h);
        li.prototype.fetch = function (a, b) {
            var c = this,
                d = (b && b.headers && b.headers.Accept) || "",
                e = !b || !b.method || "GET" === b.method,
                g = fb(a) + d,
                h = !!this.sb[g];
            if (e && h)
                return this.sb[g].then(function (a) {
                    return a.clone();
                });
            var k = $h.prototype.fetch.call(this, a, b);
            e &&
                (this.sb[g] = k.then(
                    function (a) {
                        delete c.sb[g];
                        return a.clone();
                    },
                    function (a) {
                        delete c.sb[g];
                        throw a;
                    }
                ));
            return k;
        };
        function mi(a) {
            this.D = a;
            this.h = S(this.D);
            this.Xd = null;
            this.O = R(this.D.win);
        }
        mi.prototype.isSupported = function () {
            return this.h.isCctEmbedded() && this.h.isProxyOrigin();
        };
        mi.prototype.getScopedCid = function (a) {
            var b = this;
            if (!this.h.isCctEmbedded()) return Promise.resolve(null);
            this.Xd ||
                (this.Xd = this.rb(
                    "https://ampcid.google.com/v1/cache:getClientId?key=AIzaSyDKtqGxnoeIqVM33Uf7hRSa3GJxuzR7mLc"
                ));
            return this.Xd.then(function (c) {
                return c ? ni(b, c, a) : null;
            });
        };
        mi.prototype.rb = function (a, b) {
            b = void 0 === b ? !0 : b;
            var c = this,
                d = H({ publisherOrigin: jb(this.D.win.location) });
            return this.O.timeoutPromise(
                3e4,
                P(this.D.win, "xhr").fetchJson(a, {
                    method: "POST",
                    ampCors: !1,
                    credentials: "include",
                    mode: "cors",
                    body: d,
                })
            )
                .then(function (a) {
                    return a.json().then(function (a) {
                        if (a.optOut) return null;
                        var d = a.publisherClientId;
                        if (!d && b && a.alternateUrl) {
                            var e =
                                a.alternateUrl +
                                "?key=AIzaSyDKtqGxnoeIqVM33Uf7hRSa3GJxuzR7mLc";
                            return c.rb(e, !1);
                        }
                        return d;
                    });
                })
                .catch(function (a) {
                    a && a.response
                        ? a.response.json().then(function (a) {
                              D().error("CacheCidApi", JSON.stringify(a));
                          })
                        : D().error("CacheCidApi", a);
                    return null;
                });
        };
        function ni(a, b, c) {
            b = b + ";" + c;
            return P(a.D.win, "crypto")
                .sha384Base64(b)
                .then(function (a) {
                    return "amp-" + a;
                });
        }
        function oi(a) {
            this.w = a.win;
            this.O = R(this.w);
            this.cd = {};
            var b = ed(a).canonicalUrl;
            this.bd = b ? I(b).origin : null;
        }
        oi.prototype.getScopedCid = function (a, b) {
            var c = this;
            if (this.cd[b]) return this.cd[b];
            var d;
            return (this.cd[b] = this.O.poll(200, function () {
                d = lb(c.w, "AMP_TOKEN");
                return "$RETRIEVING" !== d;
            }).then(function () {
                if ("$OPT_OUT" === d) return "$OPT_OUT";
                var e = "$NOT_FOUND" === d && gb(c.w.document.referrer);
                if (!e && d && "$" === d[0]) return null;
                (d && (!d || "$" !== d[0])) || pi(c, "$RETRIEVING", 3e4);
                return c
                    .rb(
                        "https://ampcid.google.com/v1/publisher:getClientId?key=" +
                            a,
                        b,
                        d
                    )
                    .then(function (e) {
                        var g = c.Ye(e);
                        if (!g && e.alternateUrl) {
                            var k = e.alternateUrl + "?key=" + a;
                            return c.rb(k, b, d).then(c.Ye.bind(c));
                        }
                        return g;
                    })
                    .catch(function (a) {
                        pi(c, "$ERROR", 3e4);
                        a && a.response
                            ? a.response.json().then(function (a) {
                                  D().error("GoogleCidApi", JSON.stringify(a));
                              })
                            : D().error("GoogleCidApi", a);
                        return null;
                    });
            }));
        };
        oi.prototype.rb = function (a, b, c) {
            b = H({ originScope: b, canonicalOrigin: this.bd });
            c && (b.securityToken = c);
            return this.O.timeoutPromise(
                3e4,
                P(this.w, "xhr")
                    .fetchJson(a, {
                        method: "POST",
                        ampCors: !1,
                        credentials: "include",
                        mode: "cors",
                        body: b,
                    })
                    .then(function (a) {
                        return a.json();
                    })
            );
        };
        oi.prototype.Ye = function (a) {
            if (a.optOut) return pi(this, "$OPT_OUT", 31536e6), "$OPT_OUT";
            if (a.clientId)
                return pi(this, a.securityToken, 31536e6), a.clientId;
            if (a.alternateUrl) return null;
            pi(this, "$NOT_FOUND", 36e5);
            return null;
        };
        function pi(a, b, c) {
            if (b) {
                var d = a.w,
                    e = c;
                a = a.w.Date.now() + e;
                mb(d, "AMP_TOKEN", b, a, { highestAvailableDomain: !0 });
            }
        }
        function qi(a) {
            this.D = a;
            this.h = S(this.D);
            this.bd = (a = ed(this.D).canonicalUrl) ? I(a).origin : null;
        }
        qi.prototype.isSupported = function () {
            return this.h.hasCapability("cid")
                ? this.h.isTrustedViewer()
                : Promise.resolve(!1);
        };
        qi.prototype.getScopedCid = function (a, b) {
            b = H({ scope: b, clientIdApi: !!a, canonicalOrigin: this.bd });
            a && (b.apiKey = a);
            return this.h.sendMessageAwaitResponse("cid", b);
        };
        var ri = /^[a-zA-Z0-9-_.]+$/,
            si = { googleanalytics: "AMP_ECID_GOOGLE" },
            ti = { googleanalytics: "AIzaSyA65lEHUEizIsNtlbNo-l2K18dT680nsaM" };
        function ui(a) {
            this.ampdoc = a;
            this.Tc = null;
            this.fd = Object.create(null);
            this.He = new mi(a);
            this.Xf = new qi(a);
            this.pg = new oi(a);
            this.Sc = null;
        }
        ui.prototype.get = function (a, b, c) {
            var d = this;
            A().assert(
                ri.test(a.scope) && ri.test(a.cookieName),
                "The CID scope and cookie name must only use the characters [a-zA-Z0-9-_.]+\nInstead found: %s",
                a.scope
            );
            return b
                .then(function () {
                    return S(d.ampdoc).whenFirstVisible();
                })
                .then(function () {
                    return vi(d.ampdoc);
                })
                .then(function (e) {
                    if (e) return "";
                    var g = wi(d, a, c || b);
                    return R(d.ampdoc.win)
                        .timeoutPromise(
                            1e4,
                            g,
                            'Getting cid for "' + a.scope + '" timed out'
                        )
                        .catch(function (a) {
                            z(a);
                        });
                });
        };
        ui.prototype.optOut = function () {
            return xi(this.ampdoc);
        };
        function wi(a, b, c) {
            var d = b.scope,
                e = I(a.ampdoc.win.location.href);
            if (!gb(e)) {
                var g = yi(a, d);
                return g
                    ? a.pg.getScopedCid(g, d).then(function (e) {
                          return "$OPT_OUT" == e
                              ? null
                              : e
                              ? (zi(a.ampdoc.win, b.cookieName || d, e), e)
                              : Ai(a, b, c);
                      })
                    : Ai(a, b, c);
            }
            return a.Xf.isSupported().then(function (b) {
                if (b) {
                    var g = yi(a, d);
                    return a.Xf.getScopedCid(g, d);
                }
                return a.He.isSupported() && yi(a, d)
                    ? a.He.getScopedCid(d).then(function (b) {
                          return b ? b : Bi(a, c, d, e);
                      })
                    : Bi(a, c, d, e);
            });
        }
        function Bi(a, b, c, d) {
            return Ci(a, b).then(function (b) {
                return P(a.ampdoc.win, "crypto").sha384Base64(b + Di(d) + c);
            });
        }
        function yi(a, b) {
            a.Sc || (a.Sc = Ei(a));
            return a.Sc[b];
        }
        function Ei(a) {
            var b = {},
                c = a.ampdoc.win.document.head.querySelector(
                    "meta[name=amp-google-client-id-api]"
                );
            c &&
                c.hasAttribute("content") &&
                c
                    .getAttribute("content")
                    .split(",")
                    .forEach(function (a) {
                        a = a.trim();
                        if (0 < a.indexOf("=")) {
                            var c = a.split("=");
                            a = c[0].trim();
                            b[a] = c[1].trim();
                        } else {
                            var d = a;
                            (a = si[d])
                                ? (b[a] = ti[d])
                                : A().error(
                                      "CID",
                                      "Unsupported client for Google CID API: " +
                                          d
                                  );
                        }
                    });
            return b;
        }
        function xi(a) {
            S(a).sendMessage("cidOptOut", {});
            return hc(a, "storage").then(function (a) {
                return a.set("amp-cid-optout", !0);
            });
        }
        function vi(a) {
            return hc(a, "storage")
                .then(function (a) {
                    return a.get("amp-cid-optout").then(function (a) {
                        return !!a;
                    });
                })
                .catch(function () {
                    return !1;
                });
        }
        function zi(a, b, c) {
            var d = Date.now() + 31536e6;
            mb(a, b, c, d, { highestAvailableDomain: !0 });
        }
        function Ai(a, b, c) {
            var d = a.ampdoc.win,
                e = b.scope,
                g = b.cookieName || e,
                h = lb(d, g);
            if (!h && !b.createCookieIfNotPresent) return Promise.resolve(null);
            if (a.fd[e]) return a.fd[e];
            if (h) return /^amp-/.test(h) && zi(d, g, h), Promise.resolve(h);
            var k = Fi(d).then(function (a) {
                return "amp-" + a;
            });
            Promise.all([k, c]).then(function (a) {
                var b = a[0],
                    c = lb(d, g);
                c || zi(d, g, b);
            });
            return (a.fd[e] = k);
        }
        function Di(a) {
            A().assert(gb(a), "Expected proxy origin %s", a.origin);
            return jb(a);
        }
        function Ci(a, b) {
            if (a.Tc) return a.Tc;
            var c = a.ampdoc.win;
            return (a.Tc = Gi(a.ampdoc).then(function (d) {
                var e = !1,
                    g;
                d && !Hi(d)
                    ? ((g = Promise.resolve(d.cid)), Ii(d) && (e = !0))
                    : ((g = P(c, "crypto").sha384Base64(Ji(c))), (e = !0));
                e &&
                    g.then(function (c) {
                        Ki(a.ampdoc, b, c);
                    });
                return g;
            }));
        }
        function Ki(a, b, c) {
            var d = a.win;
            Wc(d)
                ? Li(a, Mi(c))
                : b.then(function () {
                      try {
                          d.localStorage.setItem("amp-cid", Mi(c));
                      } catch (e) {}
                  });
        }
        function Li(a, b) {
            var c = S(a);
            return c.isTrustedViewer().then(function (a) {
                if (a)
                    return (
                        D().expectedError(
                            "CID",
                            "Viewer does not provide cap=cid"
                        ),
                        c.sendMessageAwaitResponse("cid", b).then(function (a) {
                            var b;
                            if ((b = a)) {
                                var c;
                                a: {
                                    try {
                                        c = nd(a);
                                        break a;
                                    } catch (k) {}
                                    c = void 0;
                                }
                                b = !c;
                            }
                            return b
                                ? (D().expectedError(
                                      "CID",
                                      "invalid cid format"
                                  ),
                                  JSON.stringify(
                                      H({ time: Date.now(), cid: a })
                                  ))
                                : a;
                        })
                    );
            });
        }
        function Mi(a) {
            return JSON.stringify(H({ time: Date.now(), cid: a }));
        }
        function Gi(a) {
            var b = a.win,
                c;
            try {
                c = b.localStorage.getItem("amp-cid");
            } catch (e) {}
            var d = Promise.resolve(c);
            !c && Wc(b) && (d = Li(a));
            return d.then(function (a) {
                if (!a) return null;
                a = nd(a);
                return { time: a.time, cid: a.cid };
            });
        }
        function Hi(a) {
            var b = a.time,
                c = Date.now();
            return b + 31536e6 < c;
        }
        function Ii(a) {
            a = a.time;
            var b = Date.now();
            return a + 864e5 < b;
        }
        function Ji(a) {
            var b;
            a.crypto && a.crypto.getRandomValues
                ? ((b = new Uint8Array(16)), a.crypto.getRandomValues(b))
                : (b = null);
            return b
                ? b
                : String(
                      a.location.href +
                          Date.now() +
                          a.Math.random() +
                          a.screen.width +
                          a.screen.height
                  );
        }
        function Fi(a) {
            var b = Ji(a);
            if ("string" == typeof b) return P(a, "crypto").sha384Base64(b);
            var c = b;
            return Xb(function () {
                return Oe(c).replace(/\.+$/, "");
            });
        }
        function Ni(a) {
            this.w = a;
            var b = null,
                c = !1;
            a.crypto &&
                (a.crypto.subtle
                    ? (b = a.crypto.subtle)
                    : a.crypto.webkitSubtle &&
                      ((b = a.crypto.webkitSubtle), (c = !0)));
            this.pkcsAlgo = {
                name: "RSASSA-PKCS1-v1_5",
                hash: { name: "SHA-256" },
            };
            this.subtle = b;
            this.Hg = c;
            this.Eb = null;
        }
        f = Ni.prototype;
        f.sha384 = function (a) {
            var b = this;
            "string" === typeof a && (a = Le(a));
            if (!this.subtle || this.Eb)
                return (this.Eb || Oi(this)).then(function (b) {
                    return b.sha384(a);
                });
            try {
                return this.subtle.digest({ name: "SHA-384" }, a).then(
                    function (a) {
                        return new Uint8Array(a);
                    },
                    function (c) {
                        c.message &&
                            0 > c.message.indexOf("secure origin") &&
                            D().error(
                                "Crypto",
                                "SubtleCrypto failed, fallback to closure lib.",
                                c
                            );
                        return Oi(b).then(function () {
                            return b.sha384(a);
                        });
                    }
                );
            } catch (c) {
                return (
                    D().error(
                        "Crypto",
                        "SubtleCrypto failed, fallback to closure lib.",
                        c
                    ),
                    Oi(this).then(function () {
                        return b.sha384(a);
                    })
                );
            }
        };
        f.sha384Base64 = function (a) {
            return this.sha384(a).then(function (a) {
                return Oe(a);
            });
        };
        f.uniform = function (a) {
            return this.sha384(a).then(function (a) {
                for (var b = 0, d = 2; 0 <= d; d--) b = (b + a[d]) / 256;
                return b;
            });
        };
        function Oi(a) {
            return a.Eb
                ? a.Eb
                : (a.Eb = fd(a.w)
                      .preloadExtension("amp-crypto-polyfill")
                      .then(function () {
                          return P(a.w, "crypto-polyfill");
                      }));
        }
        f.isPkcsAvailable = function () {
            return !!this.subtle && !1 !== this.w.isSecureContext;
        };
        f.importPkcsKey = function (a) {
            this.isPkcsAvailable();
            var b = this.Hg ? Ke(JSON.stringify(a)) : a;
            return this.subtle.importKey("jwk", b, this.pkcsAlgo, !0, [
                "verify",
            ]);
        };
        f.verifyPkcs = function (a, b, c) {
            this.isPkcsAvailable();
            return this.subtle.verify(this.pkcsAlgo, a, b, c);
        };
        var Pi = ["prefetch", "preload", "preconnect", "dns-prefetch"];
        function Qi(a) {
            this.D = a;
            this.pd = null;
        }
        Qi.prototype.get = function () {
            if (this.pd) return this.pd;
            var a = this.D,
                b = a.getUrl(),
                c = ib(b),
                d = (b = a.getRootNode()) && b.AMP && b.AMP.canonicalUrl;
            if (!d)
                var e = b.querySelector("link[rel=canonical]"),
                    d = e ? I(e.href).href : c;
            var g = String(Math.floor(1e4 * a.win.Math.random())),
                h = Ri(a.win.document),
                k = Si(a.win.document);
            return (this.pd = {
                get sourceUrl() {
                    return ib(a.getUrl());
                },
                canonicalUrl: d,
                pageViewId: g,
                linkRels: h,
                metaTags: k,
            });
        };
        function Ri(a) {
            var b = G();
            if (a.head) {
                var c = a.head.querySelectorAll("link[rel]");
                a = {};
                for (var d = 0; d < c.length; a = { href: a.href }, d++) {
                    var e = c[d];
                    a.href = e.href;
                    var g = e.getAttribute("rel");
                    g &&
                        a.href &&
                        g.split(/\s+/).forEach(
                            (function (a) {
                                return function (c) {
                                    if (-1 == Pi.indexOf(c)) {
                                        var d = b[c];
                                        d
                                            ? (ja(d) || (d = b[c] = [d]),
                                              d.push(a.href))
                                            : (b[c] = a.href);
                                    }
                                };
                            })(a)
                        );
                }
            }
            return b;
        }
        function Si(a) {
            var b = G();
            if (a.head) {
                var c = a.head.querySelectorAll("meta[name]");
                for (a = 0; a < c.length; a++) {
                    var d = c[a],
                        e = d.getAttribute("content");
                    if ((d = d.getAttribute("name")) && e) {
                        var g = b[d];
                        g ? (ja(g) || (g = b[d] = [g]), g.push(e)) : (b[d] = e);
                    }
                }
            }
            return b;
        }
        function Ti(a) {
            this.win = a;
            this.T = a.document;
            this.Ha = Gd(this.T, "hidden", !0);
            void 0 === this.T[this.Ha] && (this.Ha = null);
            this.Mc = Gd(this.T, "visibilityState", !0);
            void 0 === this.T[this.Mc] && (this.Mc = null);
            this.Qb = new V();
            this.Lc = null;
            if (this.Ha) {
                this.Lc = "visibilitychange";
                var b = this.Ha.indexOf("Hidden");
                -1 != b &&
                    (this.Lc = this.Ha.substring(0, b) + "Visibilitychange");
            }
            this.hg = this.Sd.bind(this);
            this.Lc && this.T.addEventListener(this.Lc, this.hg);
            this.Ra = null;
        }
        f = Ti.prototype;
        f.isHidden = function () {
            return this.Ha ? this.T[this.Ha] : !1;
        };
        f.getVisibilityState = function () {
            return this.Mc
                ? this.T[this.Mc]
                : this.isHidden()
                ? "hidden"
                : "visible";
        };
        f.onVisibilityChanged = function (a) {
            return this.Qb.add(a);
        };
        f.Sd = function () {
            this.Qb.fire();
        };
        f.onBodyAvailable = function (a) {
            var b = this.T;
            if (b.body) return a(), null;
            this.Ra ||
                ((this.Ra = new V()),
                Fc(
                    b.documentElement,
                    function () {
                        return !!b.body;
                    },
                    this.Pg.bind(this)
                ));
            return this.Ra.add(a);
        };
        f.Pg = function () {
            this.Ra.fire();
            this.Ra.removeAll();
            this.Ra = null;
        };
        function Ui(a, b) {
            var c = this;
            this.ampdoc = a;
            this.ka = b || a.getRootNode();
            this.G = kd(this.ampdoc);
            this.h = S(this.ampdoc);
            this.M = M(this.ampdoc, "history");
            var d = hd(this.ampdoc.win);
            this.Gg = d.isIos() && d.isSafari();
            this.ub = Wc(this.ampdoc.win) && this.h.isOvertakeHistory();
            this.cc = this.ka != this.ampdoc.getRootNode();
            this.Fg = "inabox" == r(this.ampdoc.win).runtime;
            this.Oe = null;
            this.kb = this.zg.bind(this);
            this.ka.addEventListener("click", this.kb);
            this.ka.addEventListener("contextmenu", this.kb);
            this.te = !1;
            kf(this.ampdoc).then(function (a) {
                c.te = a;
            });
            this.Pc = null;
        }
        Ui.prototype.adoptEmbedWindow = function (a) {
            $b(a, "navigation", new Ui(this.ampdoc, a.document));
        };
        Ui.prototype.cleanup = function () {
            this.kb &&
                (this.ka.removeEventListener("click", this.kb),
                this.ka.removeEventListener("contextmenu", this.kb));
        };
        Ui.prototype.navigateTo = function (a, b, c) {
            if (hb(b)) {
                if (
                    c &&
                    (this.Pc || (this.Pc = Vi(this)),
                    this.Pc.includes(c) && this.h.navigateToAmpUrl(b, c))
                )
                    return;
                a.top.location.href = b;
            } else
                A().error(
                    "navigation",
                    "Cannot navigate to invalid protocol: " + b
                );
        };
        function Vi(a) {
            return (a = a.ka.querySelector(
                'meta[name="amp-to-amp-navigation"]'
            )) && a.hasAttribute("content")
                ? a
                      .getAttribute("content")
                      .split(",")
                      .map(function (a) {
                          return a.trim();
                      })
                : [];
        }
        Ui.prototype.zg = function (a) {
            if (!a.defaultPrevented) {
                var b = Nc(a.target, "A");
                if (b && b.href)
                    if ("click" == a.type) {
                        Wi(this, b);
                        var c = Xi(this, b.href);
                        if (!Yi(this, a, b, c)) {
                            var d;
                            if (this.ub) {
                                d = b.ownerDocument.defaultView;
                                var e = b.href,
                                    g = c.protocol;
                                "ftp:" == g
                                    ? (Vc(d, e, "_blank"),
                                      a.preventDefault(),
                                      (d = !0))
                                    : ((g = /^(https?|mailto):$/.test(g)),
                                      this.Gg && !g
                                          ? (Vc(d, e, "_top"),
                                            a.preventDefault(),
                                            (d = !0))
                                          : (d = !1));
                            } else d = !1;
                            d || Zi(this, a, b, c);
                        }
                    } else "contextmenu" == a.type && Wi(this, b);
            }
        };
        function Wi(a, b) {
            var c = null;
            if (a.te && !a.cc) {
                a = I(a.ampdoc.win.location.href);
                var d = n(a.search);
                a = [];
                for (var e = 0; e < ef.length; e++) {
                    var g = ef[e];
                    "undefined" !== typeof d[g] && a.push(g);
                }
                d = b.getAttribute("data-amp-addparams");
                e = b.href;
                d && (e = bb(e, n(d)));
                d = I(e);
                d = n(d.search);
                for (e = a.length - 1; 0 <= e; e--)
                    "undefined" !== typeof d[a[e]] && a.splice(e, 1);
                d = "";
                for (e = 0; e < a.length; e++)
                    (g = a[e]),
                        (d +=
                            0 == e
                                ? g + "=QUERY_PARAM(" + g + ")"
                                : "&" + g + "=QUERY_PARAM(" + g + ")");
                c = d;
            }
            var h = Yb(b, "url-replace", !0);
            h.maybeExpandLink(b, c);
        }
        function Yi(a, b, c, d) {
            if (!c.hasAttribute("rel")) return !1;
            var e = c
                .getAttribute("rel")
                .split(" ")
                .map(function (a) {
                    return a.trim();
                });
            return e.includes("amphtml")
                ? a.h.navigateToAmpUrl(d.href, "<a rel=amphtml>")
                    ? (b.preventDefault(), !0)
                    : !1
                : !1;
        }
        function Zi(a, b, c, d) {
            var e = Xi(a, ""),
                g = "" + d.origin + d.pathname + d.search,
                h = "" + e.origin + e.pathname + e.search;
            if (d.hash && g == h) {
                if ((b.preventDefault(), !a.cc)) {
                    var k = d.hash.slice(1),
                        l = null;
                    if (k)
                        var m = String(k).replace(Dc, Ec),
                            l =
                                a.ka.getElementById(k) ||
                                a.ka.querySelector('a[name="' + m + '"]');
                    d.hash != e.hash
                        ? a.M.replaceStateForTarget(d.hash).then(function () {
                              $i(a, l, k);
                          })
                        : $i(a, l, k);
                }
            } else if (a.cc || a.Fg) {
                var q = (c.getAttribute("target") || "").toLowerCase();
                "_top" != q &&
                    "_blank" != q &&
                    c.setAttribute("target", "_blank");
            }
        }
        function $i(a, b, c) {
            b
                ? (a.G.scrollIntoView(b),
                  R(a.ampdoc.win).delay(function () {
                      return a.G.scrollIntoView(b);
                  }, 1))
                : D().warn(
                      "navigation",
                      "failed to find element with id=" +
                          c +
                          " or a[name=" +
                          c +
                          "]"
                  );
        }
        function Xi(a, b) {
            if (a.cc) {
                var c = a.Oe;
                if (!c) {
                    var d = a.ka.ownerDocument || a.ka,
                        c = d.createElement("a");
                    a.Oe = c;
                }
                return Ua(c, b);
            }
            return I(b || a.ampdoc.win.location.href);
        }
        function aj(a) {
            if (!a.defaultPrevented) {
                var b = a.target;
                if (b && "FORM" == b.tagName) {
                    var c = b.classList.contains("i-amphtml-form"),
                        d;
                    (d = c
                        ? !b.hasAttribute("amp-novalidate")
                        : !b.hasAttribute("novalidate")) &&
                        b.checkValidity &&
                        !b.checkValidity() &&
                        a.preventDefault();
                    for (var e = b.elements, g = 0; g < e.length; g++)
                        A().assert(
                            !e[g].name || "__amp_source_origin" != e[g].name,
                            "Illegal input name, %s found: %s",
                            "__amp_source_origin",
                            e[g]
                        );
                    var e = b.getAttribute("action"),
                        h = b.getAttribute("action-xhr"),
                        g = (b.getAttribute("method") || "GET").toUpperCase();
                    h &&
                        (eb(h, b, "action-xhr"),
                        A().assert(
                            !gb(h),
                            "form action-xhr should not be on AMP CDN: %s",
                            b
                        ),
                        kb(h));
                    e &&
                        (eb(e, b, "action"),
                        A().assert(
                            !gb(e),
                            "form action should not be on AMP CDN: %s",
                            b
                        ),
                        kb(e));
                    if ("GET" == g)
                        A().assert(
                            h || e,
                            "form action-xhr or action attribute is required for method=GET: %s",
                            b
                        );
                    else if ("POST" == g) {
                        if (e) {
                            var k = "form";
                            A().error(
                                k,
                                "action attribute is invalid for method=POST: %s",
                                b
                            );
                        }
                        h ||
                            (a.preventDefault(),
                            A().assert(
                                !1,
                                "Only XHR based (via action-xhr attribute) submissions are support for POST requests. %s",
                                b
                            ));
                    }
                    (e = b.getAttribute("target"))
                        ? A().assert(
                              "_blank" == e || "_top" == e,
                              "form target=%s is invalid can only be _blank or _top: %s",
                              e,
                              b
                          )
                        : b.setAttribute("target", "_top");
                    h &&
                        (a.preventDefault(),
                        a.stopImmediatePropagation(),
                        Yb(b, "action", !0).execute(
                            b,
                            "submit",
                            null,
                            b,
                            b,
                            a,
                            100
                        ));
                }
            }
        }
        function bj(a, b) {
            this.D = a;
            this.O = R(a.win);
            this.j = b;
            this.B = 0;
            this.Ma = [];
            this.C = [];
            this.j.setOnStackIndexUpdated(this.Y.bind(this));
        }
        f = bj.prototype;
        f.Tb = function () {
            this.j.Tb();
        };
        f.push = function (a) {
            var b = this;
            return cj(
                this,
                function () {
                    return b.j.push().then(function (c) {
                        b.Y(c);
                        a && (b.Ma[c] = a);
                        return c;
                    });
                },
                "push"
            );
        };
        f.pop = function (a) {
            var b = this;
            return cj(
                this,
                function () {
                    return b.j.pop(a).then(function (a) {
                        b.Y(a);
                    });
                },
                "pop"
            );
        };
        f.goBack = function () {
            var a = this;
            return cj(
                this,
                function () {
                    return 0 >= a.B
                        ? Promise.resolve()
                        : a.j.pop(a.B).then(function (b) {
                              a.Y(b);
                          });
                },
                "goBack"
            );
        };
        f.replaceStateForTarget = function (a) {
            var b = this,
                c = this.D.win.location.hash;
            return this.push(function () {
                b.D.win.location.replace(c || "#");
            }).then(function () {
                b.j.replaceStateForTarget(a);
            });
        };
        f.getFragment = function () {
            return this.j.getFragment();
        };
        f.updateFragment = function (a) {
            "#" == a[0] && (a = a.substr(1));
            return this.j.updateFragment(a);
        };
        f.Y = function (a) {
            this.B = a;
            if (!(this.B >= this.Ma.length - 1)) {
                a = [];
                for (var b = this.Ma.length - 1; b > this.B; b--)
                    this.Ma[b] && (a.push(this.Ma[b]), (this.Ma[b] = void 0));
                this.Ma.splice(this.B + 1);
                if (0 < a.length)
                    for (b = 0; b < a.length; b++) this.O.delay(a[b], 1);
            }
        };
        function cj(a, b, c) {
            var d = new L(),
                e = d.promise,
                g = Error("history trace for " + c + ": ");
            a.C.push({
                callback: b,
                resolve: d.resolve,
                reject: d.reject,
                trace: g,
            });
            1 == a.C.length && dj(a);
            return e;
        }
        function dj(a) {
            if (0 != a.C.length) {
                var b = a.C[0],
                    c;
                try {
                    c = b.callback();
                } catch (d) {
                    c = Promise.reject(d);
                }
                c.then(
                    function (a) {
                        b.resolve(a);
                    },
                    function (a) {
                        D().error("History", "failed to execute a task:", a);
                        b.trace &&
                            ((b.trace.message += a),
                            D().error("History", b.trace));
                        b.reject(a);
                    }
                ).then(function () {
                    a.C.splice(0, 1);
                    dj(a);
                });
            }
        }
        function ej(a) {
            var b = this;
            this.win = a;
            this.O = R(a);
            a = this.win.history;
            this.Na = a.length - 1;
            a.state &&
                void 0 !== a.state["AMP.History"] &&
                (this.Na = Math.min(a.state["AMP.History"], this.Na));
            this.B = this.Na;
            this.Y = null;
            this.Lf = "state" in a;
            this.Oa = fj(this, this.B);
            var c, d;
            a.pushState && a.replaceState
                ? ((this.tc = a.originalPushState || a.pushState.bind(a)),
                  (this.Ab = a.originalReplaceState || a.replaceState.bind(a)),
                  (c = function (a, c, d) {
                      b.Oa = a;
                      b.tc(a, c, d || null);
                  }),
                  (d = function (a, c, d) {
                      b.Oa = a;
                      void 0 !== d ? b.Ab(a, c, d) : b.Ab(a, c);
                  }),
                  a.originalPushState || (a.originalPushState = this.tc),
                  a.originalReplaceState || (a.originalReplaceState = this.Ab))
                : ((c = function (a) {
                      b.Oa = a;
                  }),
                  (d = function (a) {
                      b.Oa = a;
                  }));
            this.Zg = c;
            this.Cc = d;
            try {
                this.Cc(fj(this, this.B, !0));
            } catch (e) {
                D().error(
                    "History",
                    "Initial replaceState failed: " + e.message
                );
            }
            a.pushState = this.Ze.bind(this);
            a.replaceState = this.$e.bind(this);
            this.yc = function () {
                var a = b.Lf ? b.win.history.state : b.Oa,
                    c = a ? a["AMP.History"] : void 0,
                    d = b.B,
                    k = b.Oc;
                b.Oc = void 0;
                d > b.win.history.length - 2 &&
                    ((d = b.win.history.length - 2), b.Ba(d));
                d =
                    void 0 == c
                        ? d + 1
                        : c < b.win.history.length
                        ? c
                        : b.win.history.length - 1;
                a || (a = {});
                a["AMP.History"] = d;
                b.Cc(a, void 0, void 0);
                d != b.B && b.Ba(d);
                d < b.Na && (b.Na = d);
                k && k.resolve();
            };
            this.win.addEventListener("popstate", this.yc);
        }
        f = ej.prototype;
        f.Tb = function () {
            this.tc && (this.win.history.pushState = this.tc);
            this.Ab && (this.win.history.replaceState = this.Ab);
            this.win.removeEventListener("popstate", this.yc);
        };
        function fj(a, b, c) {
            a = G(c ? (a.Lf ? a.win.history.state : a.Oa) : void 0);
            a["AMP.History"] = b;
            return a;
        }
        f.setOnStackIndexUpdated = function (a) {
            this.Y = a;
        };
        f.push = function () {
            var a = this;
            return gj(this, function () {
                a.Ze();
                return Promise.resolve(a.B);
            });
        };
        f.pop = function (a) {
            var b = this;
            a = Math.max(a, this.Na);
            return gj(this, function () {
                return hj(b, b.B - a + 1);
            });
        };
        f.backTo = function (a) {
            var b = this;
            a = Math.max(a, this.Na);
            return gj(this, function () {
                return hj(b, b.B - a);
            });
        };
        function gj(a, b) {
            return a.Oc ? a.Oc.promise.then(b, b) : b();
        }
        function ij(a) {
            var b,
                c,
                d = a.O.timeoutPromise(
                    500,
                    new Promise(function (a, d) {
                        b = a;
                        c = d;
                    })
                );
            a.Oc = { promise: d, resolve: b, reject: c };
            return d;
        }
        function hj(a, b) {
            if (0 >= b) return Promise.resolve(a.B);
            a.Oa = fj(a, a.B - b);
            var c = ij(a);
            a.win.history.go(-b);
            return c.then(function () {
                return Promise.resolve(a.B);
            });
        }
        f.Ze = function (a, b, c) {
            a || (a = {});
            var d = this.B + 1;
            a["AMP.History"] = d;
            this.Zg(a, b, c);
            d != this.win.history.length - 1 &&
                ((d = this.win.history.length - 1),
                (a["AMP.History"] = d),
                this.Cc(a));
            this.Ba(d);
        };
        f.replaceStateForTarget = function (a) {
            var b = this;
            gj(this, function () {
                b.win.removeEventListener("popstate", b.yc);
                try {
                    b.win.location.replace(a);
                } finally {
                    b.win.addEventListener("popstate", b.yc);
                }
                b.$e();
                return Promise.resolve();
            });
        };
        f.$e = function (a, b, c) {
            a || (a = {});
            var d = Math.min(this.B, this.win.history.length - 1);
            a["AMP.History"] = d;
            this.Cc(a, b, c);
            this.Ba(d);
        };
        f.Ba = function (a) {
            a = Math.min(a, this.win.history.length - 1);
            this.B != a && ((this.B = a), this.Y && this.Y(a));
        };
        f.getFragment = function () {
            var a = this.win.location.hash,
                a = a.substr(1);
            return Promise.resolve(a);
        };
        f.updateFragment = function (a) {
            this.win.history.replaceState &&
                this.win.history.replaceState({}, "", "#" + a);
            return Promise.resolve();
        };
        function jj(a, b) {
            this.win = a;
            this.h = b;
            this.B = 0;
            this.Y = null;
            this.qh = this.h.onMessage("historyPopped", this.Qg.bind(this));
        }
        f = jj.prototype;
        f.replaceStateForTarget = function (a) {
            this.win.location.replace(a);
        };
        f.Tb = function () {
            this.qh();
        };
        f.setOnStackIndexUpdated = function (a) {
            this.Y = a;
        };
        f.push = function () {
            var a = this;
            this.Ba(this.B + 1);
            return this.h
                .sendMessageAwaitResponse(
                    "pushHistory",
                    H({ stackIndex: this.B })
                )
                .then(function () {
                    return a.B;
                });
        };
        f.pop = function (a) {
            var b = this;
            return a > this.B
                ? Promise.resolve(this.B)
                : this.h
                      .sendMessageAwaitResponse(
                          "popHistory",
                          H({ stackIndex: this.B })
                      )
                      .then(function () {
                          b.Ba(a - 1);
                          return b.B;
                      });
        };
        f.Qg = function (a) {
            this.Ba(a.newStackIndex);
        };
        f.Ba = function (a) {
            this.B != a && ((this.B = a), this.Y && this.Y(a));
        };
        f.getFragment = function () {
            return this.h.hasCapability("fragment")
                ? this.h
                      .sendMessageAwaitResponse("getFragment", void 0, !0)
                      .then(function (a) {
                          if (!a) return "";
                          "#" == a[0] && (a = a.substr(1));
                          return a;
                      })
                : Promise.resolve("");
        };
        f.updateFragment = function (a) {
            return this.h.hasCapability("fragment")
                ? this.h.sendMessageAwaitResponse(
                      "replaceHistory",
                      H({ fragment: a }),
                      !0
                  )
                : Promise.resolve();
        };
        function kj(a) {
            var b = S(a);
            b.isOvertakeHistory() || a.win.AMP_TEST_IFRAME
                ? (b = new jj(a.win, b))
                : (N(a.win, "global-history-binding", ej),
                  (b = P(a.win, "global-history-binding")));
            return new bj(a, b);
        }
        function lj(a) {
            this.win = a;
            this.fg = this.Rg.bind(this);
            this.gg = this.Sg.bind(this);
            this.Wc = this.ze = this.Xc = null;
            this.ld =
                "ontouchstart" in a ||
                (void 0 !== a.navigator.maxTouchPoints &&
                    0 < a.navigator.maxTouchPoints) ||
                void 0 !== a.DocumentTouch;
            this.xb = !1;
            this.win.document.addEventListener("keydown", this.fg);
            this.win.document.addEventListener("mousedown", this.gg);
            this.kd = !0;
            this.pf = 0;
            this.oh = new V();
            this.qf = new V();
            this.Cd = new V();
            this.ld &&
                ((this.kd = !this.ld),
                (this.Xc = this.Tg.bind(this)),
                ae(a.document, "mousemove", this.Xc));
        }
        f = lj.prototype;
        f.isTouchDetected = function () {
            return this.ld;
        };
        f.onTouchDetected = function (a, b) {
            b && a(this.isTouchDetected());
            return this.oh.add(a);
        };
        f.isMouseDetected = function () {
            return this.kd;
        };
        f.onMouseDetected = function (a, b) {
            b && a(this.isMouseDetected());
            return this.qf.add(a);
        };
        f.isKeyboardActive = function () {
            return this.xb;
        };
        f.onKeyboardStateChanged = function (a, b) {
            b && a(this.isKeyboardActive());
            return this.Cd.add(a);
        };
        f.Rg = function (a) {
            this.xb ||
                a.defaultPrevented ||
                ((a = a.target),
                a &&
                    ("INPUT" == a.tagName ||
                        "TEXTAREA" == a.tagName ||
                        "SELECT" == a.tagName ||
                        "OPTION" == a.tagName ||
                        a.hasAttribute("contenteditable"))) ||
                ((this.xb = !0), this.Cd.fire(!0));
        };
        f.Sg = function () {
            this.xb && ((this.xb = !1), this.Cd.fire(!1));
        };
        f.Tg = function (a) {
            var b = this;
            if (a.sourceCapabilities && a.sourceCapabilities.firesTouchEvents)
                this.nf();
            else {
                this.Wc ||
                    ((this.Wc = this.Og.bind(this)),
                    (this.ze = this.nf.bind(this)));
                var c,
                    d = be(this.win.document, function (a) {
                        c = a;
                    });
                return R(this.win)
                    .timeoutPromise(300, d)
                    .then(this.ze, function () {
                        c && c();
                        b.Wc();
                    });
            }
        };
        f.Og = function () {
            this.kd = !0;
            this.qf.fire(!0);
        };
        f.nf = function () {
            this.pf++;
            3 >= this.pf && ae(this.win.document, "mousemove", this.Xc);
        };
        function mj(a) {
            this.S = a.navigator;
        }
        f = mj.prototype;
        f.isAndroid = function () {
            return /Android/i.test(this.S.userAgent);
        };
        f.isIos = function () {
            return /iPhone|iPad|iPod/i.test(this.S.userAgent);
        };
        f.isSafari = function () {
            return (
                /Safari/i.test(this.S.userAgent) &&
                !this.isChrome() &&
                !this.isIe() &&
                !this.isEdge() &&
                !this.isFirefox() &&
                !this.isOpera()
            );
        };
        f.isChrome = function () {
            return (
                /Chrome|CriOS/i.test(this.S.userAgent) &&
                !this.isEdge() &&
                !this.isOpera()
            );
        };
        f.isFirefox = function () {
            return /Firefox|FxiOS/i.test(this.S.userAgent) && !this.isEdge();
        };
        f.isOpera = function () {
            return /OPR\/|Opera|OPiOS/i.test(this.S.userAgent);
        };
        f.isIe = function () {
            return /Trident|MSIE|IEMobile/i.test(this.S.userAgent);
        };
        f.isEdge = function () {
            return /Edge/i.test(this.S.userAgent);
        };
        f.isWebKit = function () {
            return /WebKit/i.test(this.S.userAgent) && !this.isEdge();
        };
        f.isStandalone = function () {
            return this.isIos() && this.S.standalone;
        };
        f.isBot = function () {
            return /bot/i.test(this.S.userAgent);
        };
        f.getMajorVersion = function () {
            return this.isSafari()
                ? this.isIos()
                    ? this.getIosMajorVersion() || 0
                    : nj(this, /\sVersion\/(\d+)/, 1)
                : this.isChrome()
                ? nj(this, /(Chrome|CriOS)\/(\d+)/, 2)
                : this.isFirefox()
                ? nj(this, /(Firefox|FxiOS)\/(\d+)/, 2)
                : this.isOpera()
                ? nj(this, /(OPR|Opera|OPiOS)\/(\d+)/, 2)
                : this.isIe()
                ? nj(this, /MSIE\s(\d+)/, 1)
                : this.isEdge()
                ? nj(this, /Edge\/(\d+)/, 1)
                : 0;
        };
        function nj(a, b, c) {
            if (!a.S.userAgent) return 0;
            a = a.S.userAgent.match(b);
            return !a || c >= a.length ? 0 : parseInt(a[c], 10);
        }
        f.getIosVersionString = function () {
            if (!this.S.userAgent || !this.isIos()) return "";
            var a = this.S.userAgent.match(
                /OS ([0-9]+[_.][0-9]+([_.][0-9]+)?)\b/
            );
            return a ? (a = a[1].replace(/_/g, ".")) : "";
        };
        f.getIosMajorVersion = function () {
            var a = this.getIosVersionString();
            return "" == a ? null : Number(a.split(".")[0]);
        };
        function oj(a) {
            this.F = a;
            this.Qf = Object.create(null);
        }
        oj.prototype.addTransition = function (a, b, c) {
            var d = a + "|" + b;
            this.Qf[d] = c;
        };
        oj.prototype.setState = function (a) {
            var b = this.F;
            this.F = a;
            (a = this.Qf[b + "|" + a]) && a();
        };
        function pj(a, b) {
            var c = this;
            this.win = a;
            this.Yg = b;
            this.M = [];
            this.rf = new V();
            this.Je = function (a) {
                a.target && 1 == a.target.nodeType && qj(c, a.target);
            };
            this.Ie = function () {
                R(a).delay(function () {
                    qj(c, c.win.document.activeElement);
                }, 500);
            };
            this.win.document.addEventListener("focus", this.Je, !0);
            this.win.addEventListener("blur", this.Ie);
        }
        f = pj.prototype;
        f.Tb = function () {
            this.win.document.removeEventListener("focus", this.Je, !0);
            this.win.removeEventListener("blur", this.Ie);
        };
        f.onFocus = function (a) {
            return this.rf.add(a);
        };
        function qj(a, b) {
            var c = Date.now();
            0 == a.M.length || a.M[a.M.length - 1].el != b
                ? a.M.push({ el: b, time: c })
                : (a.M[a.M.length - 1].time = c);
            a.purgeBefore(c - a.Yg);
            a.rf.fire(b);
        }
        f.getLast = function () {
            return 0 == this.M.length ? null : this.M[this.M.length - 1].el;
        };
        f.purgeBefore = function (a) {
            for (var b = this.M.length - 1, c = 0; c < this.M.length; c++)
                if (this.M[c].time >= a) {
                    b = c - 1;
                    break;
                }
            -1 != b && this.M.splice(0, b + 1);
        };
        f.hasDescendantsOf = function (a) {
            this.win.document.activeElement &&
                qj(this, this.win.document.activeElement);
            for (var b = 0; b < this.M.length; b++)
                if (a.contains(this.M[b].el)) return !0;
            return !1;
        };
        function rj() {
            this.I = [];
            this.Mb = {};
            this.ef = this.ff = 0;
        }
        f = rj.prototype;
        f.getSize = function () {
            return this.I.length;
        };
        f.getLastEnqueueTime = function () {
            return this.ff;
        };
        f.getLastDequeueTime = function () {
            return this.ef;
        };
        f.getTaskById = function (a) {
            return this.Mb[a] || null;
        };
        f.enqueue = function (a) {
            this.I.push(a);
            this.Mb[a.id] = a;
            this.ff = Date.now();
        };
        f.dequeue = function (a) {
            var b = this.removeAtIndex(a, this.I.indexOf(this.Mb[a.id]));
            if (!b) return !1;
            this.ef = Date.now();
            return !0;
        };
        f.peek = function (a, b) {
            for (var c = 1e6, d = null, e = 0; e < this.I.length; e++) {
                var g = this.I[e],
                    h = a(g, b);
                h < c && ((c = h), (d = g));
            }
            return d;
        };
        f.forEach = function (a) {
            this.I.forEach(a);
        };
        f.removeAtIndex = function (a, b) {
            var c = this.Mb[a.id];
            if (!c || this.I[b] != c) return !1;
            this.I.splice(b, 1);
            delete this.Mb[a.id];
            return !0;
        };
        f.purge = function (a) {
            for (var b = this.I.length; b--; )
                a(this.I[b]) && this.removeAtIndex(this.I[b], b);
        };
        function Hj(a) {
            var b;
            return !(b || hd(a)).isIe() || Ij(a)
                ? null
                : new Promise(function (b) {
                      var c = Date.now() + 2e3,
                          e = a.setInterval(function () {
                              var d = Date.now(),
                                  h = Ij(a);
                              if (h || d > c)
                                  a.clearInterval(e),
                                      b(),
                                      h ||
                                          D().error(
                                              "ie-media-bug",
                                              "IE media never resolved"
                                          );
                          }, 10);
                  });
        }
        function Ij(a) {
            var b =
                "(min-width: " +
                (a.innerWidth - 1) +
                "px)" +
                (" AND (max-width: " + (a.innerWidth + 1) + "px)");
            try {
                return a.matchMedia(b).matches;
            } catch (c) {
                return (
                    D().error("ie-media-bug", "IE matchMedia failed: ", c), !0
                );
            }
        }
        function Jj(a) {
            var b = this;
            this.ampdoc = a;
            this.win = a.win;
            this.h = S(a);
            this.ia = this.h.isRuntimeOn();
            this.Dg = !1;
            this.lf = this.win.devicePixelRatio || 1;
            this.fh = 0;
            this.o = [];
            this.kg = this.qe = 0;
            this.ha = this.h.isVisible();
            this.xa = this.h.getPrerenderSize();
            this.pb = !1;
            this.Te = !0;
            this.re = !1;
            this.va = -1;
            this.hb = !0;
            this.Gb = -1;
            this.Ed = this.ic = 0;
            this.vc = new dg(this.win, function () {
                return b.doPass();
            });
            this.Df = new dg(this.win, function () {
                b.hb = !0;
                b.schedulePass();
            });
            this.oa = new rj();
            this.C = new rj();
            this.J = J(this.win, "layers");
            var c;
            this.Ae = c = this.J ? this.mg.bind(this) : this.ng.bind(this);
            this.fa = [];
            this.qa = [];
            this.vd = !1;
            this.G = kd(this.ampdoc);
            this.A = jd(this.win);
            this.oe = new pj(this.win, 6e4);
            this.ne = !1;
            this.Vb = 0;
            this.bb = !1;
            this.Zf = new oj(this.h.getVisibilityState());
            Kj(this, this.Zf);
            this.G.onChanged(function (a) {
                b.ic = Date.now();
                b.Ed = a.velocity;
                a.relayoutAll && ((b.hb = !0), (b.bb = !0));
                b.schedulePass();
            });
            this.G.onScroll(function () {
                b.ic = Date.now();
            });
            this.J &&
                ((this.Za = a = M(this.ampdoc, "layers")),
                a.onScroll(function () {
                    b.schedulePass();
                }),
                (this.eg = this.lg.bind(this)));
            this.h.onVisibilityChanged(function () {
                -1 == b.va && b.h.isVisible() && (b.va = Date.now());
                b.schedulePass();
            });
            this.h.onRuntimeState(function (a) {
                b.ia = a;
                b.schedulePass(1);
            });
            this.oe.onFocus(function (a) {
                Lj(b, a);
            });
            this.schedulePass();
            this.rebuildDomWhenReady();
        }
        f = Jj.prototype;
        f.rebuildDomWhenReady = function () {
            var a = this;
            this.ampdoc.whenReady().then(function () {
                function b() {
                    return a.Df.schedule();
                }
                a.pb = !0;
                Mj(a);
                a.qa = null;
                var c = Hj(a.win);
                c ? c.then(b) : b();
                Nj(a);
                Promise.race([ce(a.win), R(a.win).promise(3100)]).then(b);
                a.win.document.fonts &&
                    "loaded" != a.win.document.fonts.status &&
                    a.win.document.fonts.ready.then(b);
            });
        };
        f.get = function () {
            return this.o.slice(0);
        };
        f.isRuntimeOn = function () {
            return this.ia;
        };
        f.renderStarted = function () {
            this.ampdoc.signals().signal("render-start");
        };
        f.getMeasuredResources = function (a, b) {
            var c = this;
            return this.ampdoc
                .signals()
                .whenSignal("ready-scan")
                .then(function () {
                    var b = [];
                    c.o.forEach(function (d) {
                        d.hasBeenMeasured() ||
                            d.hostWin != a ||
                            d.hasOwner() ||
                            b.push(Oj(c, d));
                    });
                    return Promise.all(b);
                })
                .then(function () {
                    return c.o.filter(function (c) {
                        return (
                            c.hostWin == a &&
                            !c.hasOwner() &&
                            c.hasBeenMeasured() &&
                            b(c)
                        );
                    });
                });
        };
        f.getResourcesInRect = function (a, b, c) {
            return this.getMeasuredResources(a, function (a) {
                return !a.isDisplayed() ||
                    (!a.overlaps(b) && !a.isFixed()) ||
                    (c && !a.prerenderAllowed())
                    ? !1
                    : !0;
            });
        };
        function Nj(a) {
            var b = P(a.win, "input");
            b.onTouchDetected(function (b) {
                Pj(a, "amp-mode-touch", b);
            }, !0);
            b.onMouseDetected(function (b) {
                Pj(a, "amp-mode-mouse", b);
            }, !0);
            b.onKeyboardStateChanged(function (b) {
                Pj(a, "amp-mode-keyboard-active", b);
            }, !0);
        }
        function Pj(a, b, c) {
            a.ampdoc.whenBodyAvailable().then(function (d) {
                a.A.mutate(function () {
                    d.classList.toggle(b, c);
                });
            });
        }
        f.getMaxDpr = function () {
            return this.lf;
        };
        f.getDpr = function () {
            return this.lf;
        };
        f.getResourceForElement = function (a) {
            return Y(a);
        };
        f.getResourceForElementOptional = function (a) {
            return Y(a);
        };
        f.getElementLayoutBox = function (a) {
            var b = this,
                c = this.getResourceForElementOptional(a);
            return c
                ? Oj(this, c)
                : this.A.measurePromise(function () {
                      return b.getViewport().getLayoutRect(a);
                  });
        };
        function Oj(a, b) {
            return b.hasBeenMeasured()
                ? Xb(function () {
                      return b.getPageLayoutBox();
                  })
                : a.A.measurePromise(function () {
                      b.measure();
                      return b.getPageLayoutBox();
                  });
        }
        f.getViewport = function () {
            return this.G;
        };
        f.getScrollDirection = function () {
            return Math.sign(this.Ed) || 1;
        };
        f.add = function (a) {
            this.qe++;
            1 == this.qe && this.G.ensureReadyForElements();
            var b = Y(a);
            b && 0 != b.getState() && !a.reconstructWhenReparented()
                ? b.requestMeasure()
                : (b = new yh(++this.fh, a, this));
            this.o.push(b);
            this.Df.schedule(1e3);
        };
        f.grantBuildPermission = function () {
            return 20 > this.kg++ || this.h.hasBeenVisible();
        };
        function Qj(a, b, c) {
            var d;
            c = void 0 === c ? !1 : c;
            d = void 0 === d ? !0 : d;
            var e = a.ia || a.Dg,
                g =
                    "prerender" != a.h.getVisibilityState() ||
                    b.prerenderAllowed();
            e &&
                g &&
                (a.pb
                    ? Rj(a, b, d)
                    : b.isBuilt() ||
                      b.isBuilding() ||
                      (c && a.qa.includes(b)) ||
                      (a.qa.push(b), Mj(a, d)));
        }
        function Mj(a, b) {
            if (!a.vd)
                try {
                    a.vd = !0;
                    b = void 0 === b ? !0 : b;
                    b = void 0 === b ? !0 : b;
                    for (var c = 0; c < a.qa.length; c++) {
                        var d = a.qa[c],
                            e;
                        if (!(e = a.pb))
                            a: {
                                var g = a.ampdoc.getRootNode(),
                                    h = d.element;
                                do
                                    if (h.nextSibling) {
                                        e = !0;
                                        break a;
                                    }
                                while ((h = h.parentNode) && h != g);
                                e = !1;
                            }
                        e && (a.qa.splice(c--, 1), Rj(a, d, b));
                    }
                } finally {
                    a.vd = !1;
                }
        }
        function Rj(a, b, c) {
            var d = b.build();
            d &&
                c &&
                d.then(
                    function () {
                        return a.schedulePass();
                    },
                    function (c) {
                        Sj(a, b);
                        if (!je(c)) throw c;
                    }
                );
        }
        f.remove = function (a) {
            (a = Y(a)) && Sj(this, a);
        };
        function Sj(a, b, c) {
            var d = a.o.indexOf(b);
            -1 != d && a.o.splice(d, 1);
            b.isBuilt() && (b.pauseOnRemove(), c && b.disconnect());
            Tj(a, b, !0);
        }
        f.removeForChildWindow = function (a) {
            var b = this,
                c = this.o.filter(function (b) {
                    return b.hostWin == a;
                });
            c.forEach(function (a) {
                return Sj(b, a, !0);
            });
        };
        f.upgraded = function (a) {
            a = Y(a);
            Qj(this, a);
        };
        f.setOwner = function (a, b) {
            b.contains(a);
            Y(a) && Y(a).updateOwner(b);
            a.__AMP__OWNER = b;
            a = a.getElementsByClassName("i-amphtml-element");
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                Y(c) && Y(c).updateOwner(void 0);
            }
        };
        f.requireLayout = function (a, b) {
            var c = this,
                d = [];
            Uj(this, a, function (a) {
                4 != a.getState() &&
                    (3 != a.getState()
                        ? d.push(
                              a.whenBuilt().then(function () {
                                  a.measure();
                                  if (a.isDisplayed())
                                      return (
                                          Vj(c, a, !0, b, !0), a.loadedOnce()
                                      );
                              })
                          )
                        : a.isDisplayed() && d.push(a.loadedOnce()));
            });
            return Promise.all(d);
        };
        f.scheduleLayout = function (a, b) {
            Wj(this, Y(a), !0, Xj(b));
        };
        f.schedulePause = function (a, b) {
            var c = Y(a);
            b = Xj(b);
            Yj(this, c, b, function (a) {
                a.pause();
            });
        };
        f.scheduleResume = function (a, b) {
            a = Y(a);
            b = Xj(b);
            Yj(this, a, b, function (a) {
                a.resume();
            });
        };
        f.scheduleUnlayout = function (a, b) {
            a = Y(a);
            b = Xj(b);
            Yj(this, a, b, function (a) {
                a.unlayout();
            });
        };
        f.schedulePreload = function (a, b) {
            Wj(this, Y(a), !1, Xj(b));
        };
        f.updateLayoutPriority = function (a, b) {
            var c = Y(a);
            c.updateLayoutPriority(b);
            this.C.forEach(function (a) {
                a.resource == c && (a.priority = b);
            });
            this.schedulePass();
        };
        f.updateInViewport = function (a, b, c) {
            Zj(this, Y(a), Xj(b), c);
        };
        f.changeSize = function (a, b, c, d, e) {
            ak(this, Y(a), b, c, e, !0, d);
        };
        f.attemptChangeSize = function (a, b, c, d) {
            var e = this;
            return new Promise(function (g, h) {
                ak(e, Y(a), b, c, d, !1, function (a) {
                    a ? g() : h(Error("changeSize attempt denied"));
                });
            });
        };
        f.measureElement = function (a) {
            return this.A.measurePromise(a);
        };
        f.mutateElement = function (a, b) {
            return this.measureMutateElement(a, null, b);
        };
        f.measureMutateElement = function (a, b, c) {
            return this.J ? bk(this, a, b, c) : ck(this, a, b, c);
        };
        function ck(a, b, c, d) {
            function e() {
                var c = a.G.getLayoutRect(b);
                return 0 != c.width && 0 != c.height ? c.top : -1;
            }
            var g = -1;
            return a.A.runPromise({
                measure: function () {
                    c && c();
                    g = e();
                },
                mutate: function () {
                    d();
                    b.classList.contains("i-amphtml-element") &&
                        Y(b).requestMeasure();
                    for (
                        var c = b.getElementsByClassName("i-amphtml-element"),
                            k = 0;
                        k < c.length;
                        k++
                    )
                        Y(c[k]).requestMeasure();
                    -1 != g && dk(a, g);
                    a.schedulePass(70);
                    a.A.measure(function () {
                        var b = e();
                        -1 != b && b != g && (dk(a, b), a.schedulePass(70));
                        a.bb = !0;
                    });
                },
            });
        }
        function bk(a, b, c, d) {
            return a.A.runPromise({
                measure: c || void 0,
                mutate: function () {
                    d();
                    a.dirtyElement(b);
                },
            });
        }
        f.dirtyElement = function (a) {
            if (this.J) this.Za.dirty(a);
            else {
                var b = a.classList.contains("i-amphtml-element");
                b && ((a = Y(a)), dk(this, a.getLayoutBox().top));
                this.schedulePass(70, !b);
            }
        };
        f.attemptCollapse = function (a) {
            var b = this;
            return new Promise(function (c, d) {
                ak(b, Y(a), 0, 0, void 0, !1, function (b) {
                    b
                        ? (Y(a).completeCollapse(), c())
                        : d(Error("collapse attempt denied"));
                });
            });
        };
        f.collapseElement = function (a) {
            var b = this.G.getLayoutRect(a);
            a = Y(a);
            0 != b.width && 0 != b.height && dk(this, b.top);
            a.completeCollapse();
            this.schedulePass(70);
        };
        f.expandElement = function (a) {
            var b = Y(a);
            b.completeExpand();
            (b = b.getOwner()) && b.expandedCallback(a);
            this.schedulePass(70);
        };
        f.schedulePass = function (a, b) {
            b && (this.hb = !0);
            return this.vc.schedule(a);
        };
        f.schedulePassVsync = function () {
            var a = this;
            this.ne ||
                ((this.ne = !0),
                this.A.mutate(function () {
                    return a.doPass();
                }));
        };
        f.ampInitComplete = function () {
            this.re = !0;
            this.schedulePass();
        };
        f.doPass = function () {
            var a = this;
            if (this.ia) {
                this.ha = this.h.isVisible();
                this.xa = this.h.getPrerenderSize();
                var b = this.pb && this.Te;
                if (b) {
                    this.Te = !1;
                    var c = this.win.document,
                        d = ed(this.ampdoc);
                    this.h.sendMessage(
                        "documentLoaded",
                        H({
                            title: c.title,
                            sourceUrl: ib(this.ampdoc.getUrl()),
                            serverLayout:
                                c.documentElement.hasAttribute(
                                    "i-amphtml-element"
                                ),
                            linkRels: d.linkRels,
                            metaTags: d.metaTags,
                        }),
                        !0
                    );
                    this.Vb = this.G.getContentHeight();
                    this.h.sendMessage(
                        "documentHeight",
                        H({ height: this.Vb }),
                        !0
                    );
                }
                var e = this.G.getSize();
                this.vc.cancel();
                this.ne = !1;
                this.Zf.setState(this.h.getVisibilityState());
                this.pb &&
                    this.re &&
                    !this.ampdoc.signals().get("ready-scan") &&
                    this.ampdoc.signals().signal("ready-scan");
                this.bb &&
                    ((this.bb = !1),
                    this.A.measure(function () {
                        var b = a.G.getContentHeight();
                        b != a.Vb &&
                            (a.h.sendMessage(
                                "documentHeight",
                                H({ height: b }),
                                !0
                            ),
                            (a.Vb = b));
                    }));
            }
        };
        function ek(a) {
            var b = Date.now(),
                c = a.G.getRect(),
                d = c.height / 10,
                e = c.height / 10,
                g = (0.01 > Math.abs(a.Ed) && 500 < b - a.ic) || 1e3 < b - a.ic;
            if (0 < a.fa.length) {
                var h = a.fa;
                a.fa = [];
                for (var k = -1, l = [], m = 0, b = 0; b < h.length; b++) {
                    var q = h[b],
                        p = q.resource,
                        u = p.getLayoutBox(),
                        t = 0,
                        y = 0,
                        B = u,
                        F = B.top,
                        C = B.bottom,
                        x = void 0;
                    q.marginChange &&
                        ((x = q.marginChange.newMargins),
                        (B = q.marginChange.currentMargins),
                        void 0 != x.top && (t = x.top - B.top),
                        void 0 != x.bottom && (y = x.bottom - B.bottom),
                        t && (F = u.top - B.top),
                        y && (C = u.bottom + B.bottom));
                    var v = q.newHeight - u.height,
                        w = !1;
                    if (0 != v || 0 != t || 0 != y)
                        if (q.force || !a.ha) w = !0;
                        else if (a.oe.hasDescendantsOf(p.element)) w = !0;
                        else if (
                            F >= c.bottom - e ||
                            (0 == t &&
                                u.bottom + Math.min(v, 0) >= c.bottom - e)
                        )
                            w = !0;
                        else if (1 < c.top && C <= c.top + d) {
                            if (0 > v && c.top + m < -v) continue;
                            g ? ((m += v), l.push(q)) : a.fa.push(q);
                            continue;
                        } else
                            fk(a, p, u)
                                ? (w = !0)
                                : 0 > v ||
                                  0 > t ||
                                  0 > y ||
                                  q.resource.overflowCallback(
                                      !0,
                                      q.newHeight,
                                      q.newWidth,
                                      x
                                  );
                    w &&
                        (0 <= u.top &&
                            (k = -1 == k ? u.top : Math.min(k, u.top)),
                        q.resource.changeSize(q.newHeight, q.newWidth, x),
                        q.resource.overflowCallback(
                            !1,
                            q.newHeight,
                            q.newWidth,
                            x
                        ),
                        (a.bb = !0));
                    q.callback && q.callback(w);
                }
                -1 != k && dk(a, k);
                0 < l.length &&
                    a.A.run(
                        {
                            measure: function (b) {
                                b.scrollHeight = a.G.getScrollHeight();
                                b.scrollTop = a.G.getScrollTop();
                            },
                            mutate: function (b) {
                                var c = -1;
                                l.forEach(function (a) {
                                    var b = a.resource.getLayoutBox();
                                    c = -1 == c ? b.top : Math.min(c, b.top);
                                    a.resource.changeSize(
                                        a.newHeight,
                                        a.newWidth,
                                        a.marginChange
                                            ? a.marginChange.newMargins
                                            : void 0
                                    );
                                    a.callback && a.callback(!0);
                                });
                                -1 != c && dk(a, c);
                                var d = a.G.getScrollHeight();
                                d != b.scrollHeight &&
                                    a.G.setScrollTop(
                                        b.scrollTop + (d - b.scrollHeight)
                                    );
                                a.bb = !0;
                            },
                        },
                        {}
                    );
            }
        }
        function fk(a, b, c) {
            var d,
                e = a.G.getContentHeight();
            a = Math.max(0.85 * e, e - 1e3);
            var g = c || b.getLayoutBox(),
                h = d || b.getInitialLayoutBox();
            return g.bottom >= a || h.bottom >= a;
        }
        function dk(a, b) {
            a.J ? (a.hb = !0) : (a.Gb = -1 == a.Gb ? b : Math.min(b, a.Gb));
        }
        function Lj(a, b) {
            var c = Lc(b, function (a) {
                return !!Y(a);
            });
            if (c) {
                b = Y(c);
                var d = b.getPendingChangeSize();
                void 0 !== d && ak(a, b, d.height, d.width, d.margins, !0);
            }
        }
        function gk(a) {
            var b = Date.now(),
                c = a.hb;
            a.hb = !1;
            var d = a.Gb;
            a.Gb = -1;
            for (var e = 0, g = 0, h = 0; h < a.o.length; h++) {
                var k = a.o[h];
                0 != k.getState() || k.isBuilding() || Qj(a, k, !0);
                if (c || !k.hasBeenMeasured() || 1 == k.getState())
                    k.applySizesAndMediaQuery(), e++;
                k.isMeasureRequested() && g++;
            }
            var l;
            if (0 < e || 0 < g || c || -1 != d)
                for (h = 0; h < a.o.length; h++)
                    if (((k = a.o[h]), !k.hasOwner() || k.isMeasureRequested()))
                        if (
                            c ||
                            1 == k.getState() ||
                            !k.hasBeenMeasured() ||
                            k.isMeasureRequested() ||
                            (-1 != d && k.getLayoutBox().bottom >= d)
                        ) {
                            var m = k.isDisplayed();
                            k.measure();
                            m && !k.isDisplayed() && (l || (l = []), l.push(k));
                        }
            l &&
                a.A.mutate(function () {
                    l.forEach(function (b) {
                        b.unload();
                        Tj(a, b);
                    });
                });
            var d = a.G.getRect(),
                q;
            q = a.ha ? Xe(d, 0.25, 2) : 0 < a.xa ? Xe(d, 0, a.xa - 1) : null;
            for (
                var p = a.ha ? Xe(d, 0.25, 0.25) : d, d = 0;
                d < a.o.length;
                d++
            )
                if (((h = a.o[d]), 0 != h.getState() && !h.hasOwner())) {
                    var u = a.ha && h.isDisplayed() && h.overlaps(p);
                    h.setInViewport(u);
                }
            if (q)
                for (d = 0; d < a.o.length; d++)
                    (h = a.o[d]),
                        2 != h.getState() ||
                            h.hasOwner() ||
                            (h.isDisplayed() && h.overlaps(q) && Vj(a, h, !0));
            if (
                a.ha &&
                0 == a.oa.getSize() &&
                0 == a.C.getSize() &&
                b > a.oa.getLastDequeueTime() + 5e3
            ) {
                for (var t = 0, b = 0; b < a.o.length && 4 > t; b++)
                    (d = a.o[b]),
                        2 == d.getState() &&
                            !d.hasOwner() &&
                            d.isDisplayed() &&
                            d.idleRenderOutsideViewport() &&
                            (Vj(a, d, !1), t++);
                for (b = 0; b < a.o.length && 4 > t; b++)
                    (d = a.o[b]),
                        2 == d.getState() &&
                            !d.hasOwner() &&
                            d.isDisplayed() &&
                            (Vj(a, d, !1), t++);
            }
        }
        f.ng = function (a) {
            var b = this.G.getRect(),
                c = a.resource.getLayoutBox(),
                d = Math.floor((c.top - b.top) / b.height);
            Math.sign(d) != this.getScrollDirection() && (d *= 2);
            d = Math.abs(d);
            return 10 * a.priority + d;
        };
        f.mg = function (a, b) {
            var c = this.Za.iterateAncestry(a.resource.element, this.eg, b);
            return 10 * a.priority + c;
        };
        f.lg = function (a, b, c, d) {
            var e = b.getId();
            if (Ea.call(d, e)) return d[e];
            a = a || 0;
            c = 1 + c / 10;
            var g = b.isActiveUnsafe() ? 1 : 2;
            b =
                b.getHorizontalDistanceFromParent() +
                b.getVerticalDistanceFromParent();
            return (d[e] = a + g * c * b);
        };
        function hk(a, b) {
            var c = Date.now();
            if (0 == a.oa.getSize()) {
                if (-1 === a.va) return 0;
                var d = 1e3 * b.priority;
                return Math.max(d - (c - a.va), 0);
            }
            var e = 0;
            a.oa.forEach(function (a) {
                e = Math.max(
                    e,
                    Math.max(1e3 * (b.priority - a.priority), 0) -
                        (c - a.startTime)
                );
            });
            return e;
        }
        f.bh = function (a) {
            this.C.getTaskById(a.id) || this.C.enqueue(a);
        };
        f.Mf = function (a, b, c) {
            this.oa.dequeue(a);
            this.schedulePass(1e3);
            if (!b)
                return (
                    D().info(
                        "Resources",
                        "task failed:",
                        a.id,
                        a.resource.debugid,
                        c
                    ),
                    Promise.reject(c)
                );
        };
        function ak(a, b, c, d, e, g, h) {
            b.hasBeenMeasured() && !e
                ? ik(a, b, c, d, void 0, g, h)
                : a.A.measure(function () {
                      b.hasBeenMeasured() || b.measure();
                      var k;
                      e
                          ? ((k = Ld(a.win, b.element)),
                            (k = {
                                top: parseInt(k.marginTop, 10) || 0,
                                right: parseInt(k.marginRight, 10) || 0,
                                bottom: parseInt(k.marginBottom, 10) || 0,
                                left: parseInt(k.marginLeft, 10) || 0,
                            }),
                            (k = { newMargins: e, currentMargins: k }))
                          : (k = void 0);
                      var l = k;
                      ik(a, b, c, d, l, g, h);
                  });
        }
        function ik(a, b, c, d, e, g, h) {
            b.resetPendingChangeSize();
            var k = b.getPageLayoutBox();
            if (
                !(k =
                    (void 0 !== c && c != k.height) ||
                    (void 0 !== d && d != k.width)) &&
                (k = void 0 !== e)
            )
                var k = e.currentMargins,
                    l = e.newMargins,
                    k =
                        (void 0 !== l.top && l.top != k.top) ||
                        (void 0 !== l.right && l.right != k.right) ||
                        (void 0 !== l.bottom && l.bottom != k.bottom) ||
                        (void 0 !== l.left && l.left != k.left);
            if (k) {
                k = null;
                for (l = 0; l < a.fa.length; l++)
                    if (a.fa[l].resource == b) {
                        k = a.fa[l];
                        break;
                    }
                k
                    ? ((k.newHeight = c),
                      (k.newWidth = d),
                      (k.marginChange = e),
                      (k.force = g || k.force),
                      (k.callback = h))
                    : a.fa.push({
                          resource: b,
                          newHeight: c,
                          newWidth: d,
                          marginChange: e,
                          force: g,
                          callback: h,
                      });
                a.schedulePassVsync();
            } else
                void 0 === c &&
                    void 0 === d &&
                    void 0 === e &&
                    D().error(
                        "Resources",
                        "attempting to change size with undefined dimensions",
                        b.debugid
                    ),
                    h && h(!0);
        }
        function jk(a, b, c) {
            return 0 != b.getState() &&
                b.isDisplayed() &&
                (a.ha ||
                    ("prerender" == a.h.getVisibilityState() &&
                        b.prerenderAllowed())) &&
                (c ||
                    b.isInViewport() ||
                    b.renderOutsideViewport() ||
                    b.idleRenderOutsideViewport())
                ? !0
                : !1;
        }
        function Vj(a, b, c, d, e) {
            0 != b.getState() && b.isDisplayed();
            var g = e || !1;
            jk(a, b, g) &&
                (c
                    ? a.Ka(b, "L", 0, d || 0, g, b.startLayout.bind(b))
                    : a.Ka(b, "P", 2, d || 0, g, b.startLayout.bind(b)));
        }
        function Wj(a, b, c, d) {
            Yj(a, b, d, function (d) {
                0 == d.getState()
                    ? d.whenBuilt().then(function () {
                          kk(a, d, c, b.getLayoutPriority());
                      })
                    : kk(a, d, c, b.getLayoutPriority());
            });
        }
        function kk(a, b, c, d) {
            b.measure();
            2 == b.getState() && b.isDisplayed() && Vj(a, b, c, d);
        }
        f.Ka = function (a, b, c, d, e, g) {
            b = a.getTaskId(b);
            a = {
                id: b,
                resource: a,
                priority: Math.max(a.getLayoutPriority(), d) + c,
                forceOutsideViewport: e,
                callback: g,
                scheduleTime: Date.now(),
                startTime: 0,
                promise: null,
            };
            var h = this.C.getTaskById(b);
            if (!h || a.priority < h.priority)
                h && this.C.dequeue(h),
                    this.C.enqueue(a),
                    this.schedulePass(hk(this, a));
            a.resource.layoutScheduled(a.scheduleTime);
        };
        function Zj(a, b, c, d) {
            var e = b.isInViewport() && d;
            Yj(a, b, c, function (a) {
                a.setInViewport(e);
            });
        }
        function Yj(a, b, c, d) {
            c.forEach(function (c) {
                b.element.contains(c);
                Uj(a, c, d);
            });
        }
        function Uj(a, b, c) {
            if (b.classList.contains("i-amphtml-element"))
                c(Y(b)), (b = b.getPlaceholder()) && Uj(a, b, c);
            else {
                a = b.getElementsByClassName("i-amphtml-element");
                b = [];
                for (var d = 0; d < a.length; d++) {
                    for (var e = a[d], g = !1, h = 0; h < b.length; h++)
                        if (b[h].contains(e)) {
                            g = !0;
                            break;
                        }
                    g || (b.push(e), c(Y(e)));
                }
            }
        }
        function Kj(a, b) {
            function c() {
                a.o.forEach(function (a) {
                    return a.resume();
                });
                h();
            }
            function d() {
                a.o.forEach(function (b) {
                    b.unload();
                    Tj(a, b);
                });
                a.unselectText();
            }
            function e() {
                a.o.forEach(function (a) {
                    return a.pause();
                });
            }
            function g() {}
            function h() {
                var b = a.G.getSize();
                if (0 < b.height && 0 < b.width) {
                    0 < a.fa.length && ek(a);
                    gk(a);
                    for (
                        var b = Date.now(),
                            c = -1,
                            d = Object.create(null),
                            e = a.C.peek(a.Ae, d);
                        e;

                    ) {
                        c = hk(a, e);
                        if (16 < c) break;
                        a.C.dequeue(e);
                        (c = a.oa.getTaskById(e.id))
                            ? ((e = a.bh.bind(a, e)), c.promise.then(e, e))
                            : (e.resource.measure(),
                              jk(a, e.resource, e.forceOutsideViewport)
                                  ? ((e.promise = e.callback()),
                                    (e.startTime = b),
                                    a.oa.enqueue(e),
                                    e.promise
                                        .then(
                                            a.Mf.bind(a, e, !0),
                                            a.Mf.bind(a, e, !1)
                                        )
                                        .catch(he))
                                  : e.resource.layoutCanceled());
                        e = a.C.peek(a.Ae, d);
                        c = -1;
                    }
                    0 <= c
                        ? (b = c)
                        : ((b = 2 * (b - a.oa.getLastDequeueTime())),
                          (b = Math.max(Math.min(3e4, b), 5e3)));
                    0 < a.fa.length && (b = Math.min(b, 500));
                    a.ha && a.schedulePass(b);
                }
            }
            var k = "prerender",
                l = "hidden",
                m = "paused",
                q = "inactive";
            b.addTransition(k, k, h);
            b.addTransition(k, "visible", h);
            b.addTransition(k, l, h);
            b.addTransition(k, q, h);
            b.addTransition(k, m, h);
            b.addTransition("visible", "visible", h);
            b.addTransition("visible", l, h);
            b.addTransition("visible", q, d);
            b.addTransition("visible", m, e);
            b.addTransition(l, "visible", h);
            b.addTransition(l, l, h);
            b.addTransition(l, q, d);
            b.addTransition(l, m, e);
            b.addTransition(q, "visible", c);
            b.addTransition(q, l, c);
            b.addTransition(q, q, g);
            b.addTransition(q, m, h);
            b.addTransition(m, "visible", c);
            b.addTransition(m, l, h);
            b.addTransition(m, q, d);
            b.addTransition(m, m, g);
        }
        f.unselectText = function () {
            try {
                this.win.getSelection().removeAllRanges();
            } catch (a) {}
        };
        function Tj(a, b, c) {
            1 == b.getState() &&
                (a.C.purge(function (a) {
                    return a.resource == b;
                }),
                a.oa.purge(function (a) {
                    return a.resource == b;
                }),
                Wf(a.fa, function (a) {
                    return a.resource != b;
                }));
            if (0 == b.getState() && c && a.qa) {
                var d = a.qa.indexOf(b);
                -1 != d && a.qa.splice(d, 1);
            }
        }
        function Xj(a) {
            return ja(a) ? a : [a];
        }
        function lk(a) {
            return "none" == Id(a) || a.hasAttribute("hidden");
        }
        var mk = ["top", "bottom", "center"];
        function nk(a) {
            this.ampdoc = a;
            this.ag = Yb(a, "action", !0);
            this.o = id(a);
            this.G = kd(a);
            ok(this, this.ag);
        }
        f = nk.prototype;
        f.adoptEmbedWindow = function (a) {
            ok(this, Yb(a.document, "action", !0));
        };
        function ok(a, b) {
            b.addGlobalTarget("AMP", a.handleAmpTarget.bind(a));
            b.addGlobalMethodHandler("hide", a.handleHide.bind(a));
            b.addGlobalMethodHandler("show", a.handleShow.bind(a));
            b.addGlobalMethodHandler(
                "toggleVisibility",
                a.handleToggle.bind(a)
            );
            b.addGlobalMethodHandler("scrollTo", a.handleScrollTo.bind(a));
            b.addGlobalMethodHandler("focus", a.handleFocus.bind(a));
        }
        f.handleAmpTarget = function (a) {
            var b = this;
            if (!a.satisfiesTrust(100)) return null;
            var c = a.node,
                d = a.caller,
                e = a.method,
                g = a.args,
                h = (c.ownerDocument || c).defaultView;
            switch (e) {
                case "pushState":
                case "setState":
                    return cd(c).then(function (b) {
                        A().assert(b, "AMP-BIND is not installed.");
                        return b.invoke(a);
                    });
                case "navigateTo":
                    return (
                        (c = Promise.resolve()),
                        Ga(d.tagName, "AMP-") &&
                            (c = d.getImpl().then(function (a) {
                                "function" == typeof a.throwIfCannotNavigate &&
                                    a.throwIfCannotNavigate();
                            })),
                        c.then(
                            function () {
                                M(b.ampdoc, "navigation").navigateTo(
                                    h,
                                    g.url,
                                    "AMP." + e
                                );
                            },
                            function (a) {
                                A().error("STANDARD-ACTIONS", a.message);
                            }
                        )
                    );
                case "goBack":
                    return M(this.ampdoc, "history").goBack(), null;
                case "print":
                    return h.print(), null;
                case "optoutOfCid":
                    return hc(this.ampdoc, "cid")
                        .then(function (a) {
                            return a.optOut();
                        })
                        .catch(function (a) {
                            D().error(
                                "STANDARD-ACTIONS",
                                "Failed to opt out of CID",
                                a
                            );
                        });
            }
            throw A().createError("Unknown AMP action ", e);
        };
        f.handleScrollTo = function (a) {
            if (!a.satisfiesTrust(100)) return null;
            var b = a.node,
                c =
                    a.args && a.args.duration && 0 <= a.args.duration
                        ? a.args.duration
                        : 500;
            a =
                a.args && a.args.position && mk.includes(a.args.position)
                    ? a.args.position
                    : "top";
            this.G.animateScrollIntoView(b, c, "ease-in", a);
            return null;
        };
        f.handleFocus = function (a) {
            if (!a.satisfiesTrust(100)) return null;
            try {
                a.node.focus();
            } catch (b) {}
            return null;
        };
        f.handleHide = function (a) {
            var b = a.node;
            this.o.mutateElement(b, function () {
                b.classList.contains("i-amphtml-element")
                    ? b.collapse()
                    : Kd(b, !1);
            });
            return null;
        };
        f.handleShow = function (a) {
            var b = a.node,
                c = b.ownerDocument.defaultView;
            if (b.classList.contains("i-amphtml-layout-nodisplay"))
                return (
                    A().warn(
                        "STANDARD-ACTIONS",
                        "Elements with layout=nodisplay cannot be dynamically shown.",
                        b
                    ),
                    null
                );
            jd(c).measure(function () {
                "none" != Ld(c, b).display ||
                    lk(b) ||
                    A().warn(
                        "STANDARD-ACTIONS",
                        'Elements can only be dynamically shown when they have the "hidden" attribute set or when they were dynamically hidden.',
                        b
                    );
            });
            this.o.mutateElement(b, function () {
                b.classList.contains("i-amphtml-element")
                    ? b.expand()
                    : (Kd(b, !0), b.removeAttribute("hidden"));
            });
            return null;
        };
        f.handleToggle = function (a) {
            return lk(a.node) ? this.handleShow(a) : this.handleHide(a);
        };
        function pk(a, b, c) {
            this.ampdoc = a;
            this.h = b;
            this.j = c;
            this.uc = jb(this.ampdoc.win.location);
            this.Gc = null;
        }
        pk.prototype.get = function (a) {
            return qk(this).then(function (b) {
                return b.get(a);
            });
        };
        pk.prototype.set = function (a, b) {
            return rk(this, function (c) {
                return c.set(a, b);
            });
        };
        pk.prototype.remove = function (a) {
            return rk(this, function (b) {
                return b.remove(a);
            });
        };
        function qk(a) {
            a.Gc ||
                (a.Gc = a.j
                    .loadBlob(a.uc)
                    .then(function (a) {
                        return a ? nd(atob(a)) : {};
                    })
                    .catch(function (a) {
                        D().expectedError(
                            "Storage",
                            "Failed to load store: ",
                            a
                        );
                        return {};
                    })
                    .then(function (a) {
                        return new sk(a);
                    }));
            return a.Gc;
        }
        function rk(a, b) {
            return qk(a)
                .then(function (c) {
                    b(c);
                    c = btoa(JSON.stringify(c.obj));
                    return a.j.saveBlob(a.uc, c);
                })
                .then(a.jg.bind(a));
        }
        function tk(a) {
            a.h.onBroadcast(function (b) {
                "amp-storage-reset" == b.type &&
                    b.origin == a.uc &&
                    (a.Gc = null);
            });
        }
        pk.prototype.jg = function () {
            this.h.broadcast({ type: "amp-storage-reset", origin: this.uc });
        };
        function sk(a, b) {
            this.obj = ld(a);
            this.Ng = b || 8;
            this.ta = this.obj.vv || Object.create(null);
            this.obj.vv || (this.obj.vv = this.ta);
        }
        sk.prototype.get = function (a) {
            return (a = this.ta[a]) ? a.v : void 0;
        };
        sk.prototype.set = function (a, b) {
            void 0 !== this.ta[a]
                ? ((a = this.ta[a]), (a.v = b), (a.t = Date.now()))
                : (this.ta[a] = H({ v: b, t: Date.now() }));
            b = Object.keys(this.ta);
            if (b.length > this.Ng) {
                var c = Infinity,
                    d = null;
                for (a = 0; a < b.length; a++) {
                    var e = this.ta[b[a]];
                    e.t < c && ((d = b[a]), (c = e.t));
                }
                d && delete this.ta[d];
            }
        };
        sk.prototype.remove = function (a) {
            delete this.ta[a];
        };
        function uk(a) {
            this.win = a;
            var b;
            try {
                "localStorage" in this.win
                    ? (this.win.localStorage.getItem("test"), (b = !0))
                    : (b = !1);
            } catch (c) {
                b = !1;
            }
            this.xd = b;
            this.xd ||
                ((a = Error("localStorage not supported.")),
                D().expectedError("Storage", a));
        }
        uk.prototype.loadBlob = function (a) {
            var b = this;
            return new Promise(function (c) {
                b.xd
                    ? c(b.win.localStorage.getItem("amp-store:" + a))
                    : c(null);
            });
        };
        uk.prototype.saveBlob = function (a, b) {
            var c = this;
            return new Promise(function (d) {
                c.xd && c.win.localStorage.setItem("amp-store:" + a, b);
                d();
            });
        };
        function vk(a) {
            this.h = a;
        }
        vk.prototype.loadBlob = function (a) {
            return this.h
                .sendMessageAwaitResponse("loadStore", H({ origin: a }))
                .then(function (a) {
                    return a.blob;
                });
        };
        vk.prototype.saveBlob = function (a, b) {
            return this.h.sendMessageAwaitResponse(
                "saveStore",
                H({ origin: a, blob: b })
            );
        };
        function wk(a) {
            O(
                a,
                "storage",
                function () {
                    var b = S(a),
                        c = parseInt(b.getParam("storage"), 10),
                        d = c ? new vk(b) : new uk(a.win),
                        b = new pk(a, b, d);
                    tk(b);
                    return b;
                },
                !0
            );
        }
        function xk(a) {
            this.win = a;
            this.eh = Promise.resolve();
            this.nh = 0;
            this.$c = {};
            this.ee = Date.now();
        }
        f = xk.prototype;
        f.timeSinceStart = function () {
            return Date.now() - this.ee;
        };
        f.delay = function (a, b) {
            var c = this;
            if (!b) {
                var d = "p" + this.nh++;
                this.eh
                    .then(function () {
                        c.$c[d] ? delete c.$c[d] : a();
                    })
                    .catch(he);
                return d;
            }
            return this.win.setTimeout(function () {
                try {
                    a();
                } catch (e) {
                    throw (he(e), e);
                }
            }, b);
        };
        f.cancel = function (a) {
            "string" == typeof a ? (this.$c[a] = !0) : this.win.clearTimeout(a);
        };
        f.promise = function (a) {
            var b = this;
            return new Promise(function (c) {
                var d = b.delay(c, a);
                if (-1 == d) throw Error("Failed to schedule timer.");
            });
        };
        f.timeoutPromise = function (a, b, c) {
            function d() {
                e.cancel(g);
            }
            var e = this,
                g,
                h = new Promise(function (b, d) {
                    g = e.delay(function () {
                        d(A().createError(c || "timeout"));
                    }, a);
                    if (-1 == g) throw Error("Failed to schedule timer.");
                });
            if (!b) return h;
            b.then(d, d);
            return Promise.race([h, b]);
        };
        f.poll = function (a, b) {
            var c = this;
            return new Promise(function (d) {
                var e = c.win.setInterval(function () {
                    b() && (c.win.clearInterval(e), d());
                }, a);
            });
        };
        function yk(a, b) {
            this.D = a;
            a = b || a.getRootNode();
            this.bg = (a.ownerDocument || a).createElement("a");
            this.Sa = new Ja(100);
        }
        f = yk.prototype;
        f.adoptEmbedWindow = function (a) {
            $b(a, "url", new yk(this.D, a.document));
        };
        f.parse = function (a, b) {
            return Ua(this.bg, a, b ? null : this.Sa);
        };
        f.isProtocolValid = function (a) {
            return hb(a);
        };
        f.getSourceOrigin = function (a) {
            return jb(a);
        };
        f.assertHttpsUrl = function (a, b, c) {
            return eb(a, b, void 0 === c ? "source" : c);
        };
        f.assertAbsoluteHttpOrHttpsUrl = function (a) {
            A().assert(
                /^https?\:/i.test(a),
                'URL must start with "http://" or "https://". Invalid value: %s',
                a
            );
            return I(a).href;
        };
        f.isProxyOrigin = function (a) {
            return gb(a);
        };
        f.isSecure = function (a) {
            return db(this.parse(a));
        };
        function zk(a, b, c, d) {
            var e = new Ak(0, 0, a, b, c, d, 1, 1);
            return e.solveYValueFromXValue.bind(e);
        }
        function Ak(a, b, c, d, e, g, h, k) {
            this.x0 = a;
            this.y0 = b;
            this.x1 = c;
            this.y1 = d;
            this.x2 = e;
            this.y2 = g;
            this.x3 = h;
            this.y3 = k;
        }
        f = Ak.prototype;
        f.solveYValueFromXValue = function (a) {
            return this.getPointY(this.solvePositionFromXValue(a));
        };
        f.solvePositionFromXValue = function (a) {
            var b = 1e-6,
                c = (a - this.x0) / (this.x3 - this.x0);
            if (0 >= c) return 0;
            if (1 <= c) return 1;
            for (var d = 0, e = 1, g = 0, h = 0; 8 > h; h++) {
                var g = this.getPointX(c),
                    k = (this.getPointX(c + b) - g) / b;
                if (Math.abs(g - a) < b) return c;
                if (Math.abs(k) < b) break;
                else g < a ? (d = c) : (e = c), (c -= (g - a) / k);
            }
            for (h = 0; Math.abs(g - a) > b && 8 > h; h++)
                g < a
                    ? ((d = c), (c = (c + e) / 2))
                    : ((e = c), (c = (c + d) / 2)),
                    (g = this.getPointX(c));
            return c;
        };
        f.getPointX = function (a) {
            if (0 == a) return this.x0;
            if (1 == a) return this.x3;
            var b = this.lerp(this.x0, this.x1, a),
                c = this.lerp(this.x1, this.x2, a),
                d = this.lerp(this.x2, this.x3, a),
                b = this.lerp(b, c, a),
                c = this.lerp(c, d, a);
            return this.lerp(b, c, a);
        };
        f.getPointY = function (a) {
            if (0 == a) return this.y0;
            if (1 == a) return this.y3;
            var b = this.lerp(this.y0, this.y1, a),
                c = this.lerp(this.y1, this.y2, a),
                d = this.lerp(this.y2, this.y3, a),
                b = this.lerp(b, c, a),
                c = this.lerp(c, d, a);
            return this.lerp(b, c, a);
        };
        f.lerp = function (a, b, c) {
            return a + c * (b - a);
        };
        var Bk = zk(0.25, 0.1, 0.25, 1),
            Ck = zk(0.42, 0, 1, 1),
            Dk = zk(0, 0, 0.58, 1),
            Ek = zk(0.42, 0, 0.58, 1),
            Fk = {
                linear: function (a) {
                    return a;
                },
                ease: Bk,
                "ease-in": Ck,
                "ease-out": Dk,
                "ease-in-out": Ek,
            };
        function Gk(a) {
            if (!a) return null;
            if ("string" == typeof a) {
                if (-1 != a.indexOf("cubic-bezier")) {
                    var b = a.match(/cubic-bezier\((.+)\)/);
                    if (
                        b &&
                        ((b = b[1].split(",").map(parseFloat)), 4 == b.length)
                    ) {
                        for (var c = 0; 4 > c; c++)
                            if (isNaN(b[c])) return null;
                        return zk(b[0], b[1], b[2], b[3]);
                    }
                    return null;
                }
                return Fk[a];
            }
            return a;
        }
        function Hk() {}
        function Ik(a, b) {
            this.nb = a;
            this.A = b || jd(self);
            this.Le = null;
            this.V = [];
        }
        function Jk(a, b, c, d) {
            return new Ik(a).setCurve(d).add(0, b, 1).start(c);
        }
        Ik.prototype.setCurve = function (a) {
            a && (this.Le = Gk(a));
            return this;
        };
        Ik.prototype.add = function (a, b, c, d) {
            this.V.push({ delay: a, func: b, duration: c, curve: Gk(d) });
            return this;
        };
        Ik.prototype.start = function (a) {
            var b = new Kk(this.A, this.nb, this.V, this.Le, a);
            return b;
        };
        function Kk(a, b, c, d, e) {
            this.A = a;
            this.nb = b;
            this.V = [];
            for (b = 0; b < c.length; b++) {
                var g = c[b];
                this.V.push({
                    delay: g.delay,
                    func: g.func,
                    duration: g.duration,
                    curve: g.curve || d,
                    started: !1,
                    completed: !1,
                });
            }
            this.ug = e;
            this.ee = Date.now();
            this.Ja = !0;
            this.F = {};
            e = new L();
            this.yf = e.promise;
            this.dh = e.resolve;
            this.ah = e.reject;
            this.Nf = this.A.createAnimTask(this.nb, {
                mutate: this.mh.bind(this),
            });
            this.A.canAnimate(this.nb)
                ? this.Nf(this.F)
                : (D().warn("Animation", "cannot animate"), this.Ua(!1, 0));
        }
        f = Kk.prototype;
        f.then = function (a, b) {
            return a || b ? this.yf.then(a, b) : this.yf;
        };
        f.thenAlways = function (a) {
            a = a || Hk;
            return this.then(a, a);
        };
        f.halt = function (a) {
            this.Ua(!1, a || 0);
        };
        f.Ua = function (a, b) {
            if (this.Ja) {
                this.Ja = !1;
                if (0 != b) {
                    1 < this.V.length &&
                        this.V.sort(function (a, b) {
                            return (
                                a.delay + a.duration - (b.delay + b.duration)
                            );
                        });
                    try {
                        if (0 < b)
                            for (b = 0; b < this.V.length; b++)
                                this.V[b].func(1, !0);
                        else
                            for (var c = this.V.length - 1; 0 <= c; c--)
                                this.V[c].func(0, !1);
                    } catch (d) {
                        D().error("Animation", "completion failed: " + d, d),
                            (a = !1);
                    }
                }
                a ? this.dh() : this.ah();
            }
        };
        f.mh = function () {
            if (this.Ja) {
                for (
                    var a = Date.now(),
                        b = Math.min((a - this.ee) / this.ug, 1),
                        c = 0;
                    c < this.V.length;
                    c++
                ) {
                    var d = this.V[c];
                    !d.started && b >= d.delay && (d.started = !0);
                }
                for (c = 0; c < this.V.length; c++)
                    if (((d = this.V[c]), d.started && !d.completed))
                        a: {
                            var e, g;
                            if (0 < d.duration) {
                                if (
                                    ((e = g =
                                        Math.min(
                                            (b - d.delay) / d.duration,
                                            1
                                        )),
                                    d.curve && 1 != e)
                                )
                                    try {
                                        e = d.curve(g);
                                    } catch (h) {
                                        D().error(
                                            "Animation",
                                            "step curve failed: " + h,
                                            h
                                        );
                                        this.Ua(!1, 0);
                                        break a;
                                    }
                            } else e = g = 1;
                            1 == g && (d.completed = !0);
                            try {
                                d.func(e, d.completed);
                            } catch (h) {
                                D().error(
                                    "Animation",
                                    "step mutate failed: " + h,
                                    h
                                ),
                                    this.Ua(!1, 0);
                            }
                        }
                1 == b
                    ? this.Ua(!0, 0)
                    : this.A.canAnimate(this.nb)
                    ? this.Nf(this.F)
                    : (D().warn("Animation", "cancel animation"),
                      this.Ua(!1, 0));
            }
        };
        var Lk = [
            '\n          <i-amphtml-fpa style="display: none"></i-amphtml-fpa>',
        ];
        Lk.raw = [
            '\n          <i-amphtml-fpa style="display: none"></i-amphtml-fpa>',
        ];
        function Mk(a, b, c, d, e) {
            this.ampdoc = a;
            this.A = b;
            this.dg = c;
            this.Ub = this.P = d;
            this.Aa = e && a.isSingleDoc();
            this.ga = null;
            this.qg = 0;
            this.U = [];
        }
        f = Mk.prototype;
        f.setVisible = function (a) {
            var b = this;
            this.ga &&
                this.A.mutate(function () {
                    U(b.ga, "visibility", a ? "visible" : "hidden");
                });
        };
        f.setup = function () {
            var a = this.ampdoc.getRootNode().styleSheets;
            if (a) {
                for (var b = [], c = [], d = 0; d < a.length; d++) {
                    var e = a[d],
                        g = e.ownerNode;
                    e.disabled ||
                        !g ||
                        "STYLE" != g.tagName ||
                        g.hasAttribute("amp-boilerplate") ||
                        g.hasAttribute("amp-runtime") ||
                        g.hasAttribute("amp-extension") ||
                        Nk(this, e.cssRules, b, c);
                }
                this.trySetupSelectorsNoInline(b, c);
                Ok(this);
                d = hd(this.ampdoc.win);
                0 < this.U.length &&
                    !this.Aa &&
                    d.isIos() &&
                    A().warn(
                        "FixedLayer",
                        "Please test this page inside of an AMP Viewer such as Google's because the fixed or sticky positioning might have slightly different layout."
                    );
                this.update();
            }
        };
        f.updatePaddingTop = function (a, b) {
            this.P = a;
            b || (this.Ub = a);
            this.update();
        };
        f.transformMutate = function (a) {
            a
                ? this.U.forEach(function (b) {
                      b.fixedNow &&
                          b.top &&
                          (U(b.element, "transition", "none"),
                          b.transform && "none" != b.transform
                              ? U(b.element, "transform", b.transform + " " + a)
                              : U(b.element, "transform", a));
                  })
                : this.U.forEach(function (a) {
                      a.fixedNow &&
                          a.top &&
                          Jd(a.element, { transform: "", transition: "" });
                  });
        };
        f.addElement = function (a, b) {
            var c = this.ampdoc.win;
            a.offsetParent ||
                "none" !== Ld(c, a).display ||
                D().error(
                    "FixedLayer",
                    "Tried to add display:none element to FixedLayer",
                    a.tagName
                );
            Pk(this, a, "*", "fixed", b);
            Ok(this);
            return this.update();
        };
        f.removeElement = function (a) {
            var b = this,
                c = Qk(this, a);
            0 < c.length &&
                this.ga &&
                this.A.mutate(function () {
                    for (var a = 0; a < c.length; a++) {
                        var e = c[a];
                        "fixed" == e.position && Rk(b, e);
                    }
                });
        };
        f.isDeclaredFixed = function (a) {
            return !!a.__AMP_DECLFIXED;
        };
        f.isDeclaredSticky = function (a) {
            return !!a.__AMP_DECLSTICKY;
        };
        f.update = function () {
            var a = this;
            this.U.filter(function (b) {
                return !a.ampdoc.contains(b.element);
            }).forEach(function (b) {
                return Qk(a, b.element);
            });
            if (0 == this.U.length) return Promise.resolve();
            var b = !1;
            return this.A.runPromise(
                {
                    measure: function (c) {
                        for (
                            var d = a.U, e = [], g = a.ampdoc.win, h = 0;
                            h < d.length;
                            h++
                        )
                            Hd(d[h].element, {
                                top: "",
                                bottom: "-9999vh",
                                transition: "none",
                            });
                        for (h = 0; h < d.length; h++)
                            e.push(Ld(g, d[h].element).top);
                        for (h = 0; h < d.length; h++)
                            U(d[h].element, "bottom", "");
                        for (h = 0; h < d.length; h++) {
                            var k = d[h],
                                l = k.element,
                                m = Ld(g, l),
                                q = l.offsetWidth,
                                p = l.offsetHeight,
                                u = l.offsetTop,
                                t = m,
                                y = void 0 === t.position ? "" : t.position,
                                l = void 0 === t.display ? "" : t.display,
                                B = t.bottom,
                                F = t.zIndex,
                                C = parseFloat(m.opacity),
                                t = m[Gd(m, "transform")],
                                m = m.top,
                                x =
                                    "fixed" == y &&
                                    (k.forceTransfer || (0 < q && 0 < p)),
                                v = Fa(y, "sticky"),
                                w = "none" !== l;
                            if (w && (x || v)) {
                                if ("auto" === m || e[h] !== m)
                                    m = x && u === a.Ub + a.dg ? "0px" : "";
                                var Q =
                                    x &&
                                    (k.forceTransfer ||
                                        (0 < C &&
                                            300 > p &&
                                            ((!!m && 0 == parseInt(m, 10)) ||
                                                (!!B &&
                                                    0 == parseInt(B, 10)))));
                                Q && (b = !0);
                                c[k.id] = {
                                    fixed: x,
                                    sticky: v,
                                    transferrable: Q,
                                    top: m,
                                    zIndex: F,
                                    transform: t,
                                };
                            } else
                                c[k.id] = {
                                    fixed: !1,
                                    sticky: !1,
                                    transferrable: !1,
                                    top: "",
                                    zIndex: "",
                                };
                        }
                    },
                    mutate: function (c) {
                        if (b && a.Aa) {
                            var d = Sk(a);
                            d.className != a.ampdoc.getBody().className &&
                                (d.className = a.ampdoc.getBody().className);
                        }
                        for (var e = a.U, g = 0; g < e.length; g++) {
                            var h = e[g],
                                k = c[h.id];
                            U(h.element, "transition", "none");
                            U(h.element, "transition", "");
                            if (k) {
                                var l = g,
                                    m = k,
                                    q = h.element,
                                    p = h.fixedNow;
                                h.fixedNow = m.fixed;
                                h.stickyNow = m.sticky;
                                h.top = m.fixed || m.sticky ? m.top : "";
                                h.transform = m.transform;
                                !p || (m.fixed && m.transferrable) || Rk(a, h);
                                m.top &&
                                    (m.fixed || m.sticky) &&
                                    (m.fixed || !a.Aa
                                        ? U(
                                              q,
                                              "top",
                                              "calc(" +
                                                  m.top +
                                                  " + " +
                                                  a.P +
                                                  "px)"
                                          )
                                        : a.Ub === a.P
                                        ? U(q, "top", m.top)
                                        : U(
                                              q,
                                              "top",
                                              "calc(" +
                                                  m.top +
                                                  " - " +
                                                  a.Ub +
                                                  "px)"
                                          ));
                                a.Aa &&
                                    m.fixed &&
                                    !p &&
                                    m.transferrable &&
                                    Tk(a, h, l, m);
                            }
                        }
                    },
                },
                {}
            ).catch(function (a) {
                D().error("FixedLayer", "Failed to mutate fixed elements:", a);
            });
        };
        f.trySetupSelectorsNoInline = function (a, b) {
            try {
                for (var c = 0; c < a.length; c++)
                    for (
                        var d = a[c],
                            e = this.ampdoc.getRootNode().querySelectorAll(d),
                            g = 0;
                        g < e.length && !(10 < g);
                        g++
                    )
                        Pk(this, e[g], d, "fixed");
                for (a = 0; a < b.length; a++)
                    for (
                        var h = b[a],
                            k = this.ampdoc.getRootNode().querySelectorAll(h),
                            c = 0;
                        c < k.length;
                        c++
                    )
                        Pk(this, k[c], h, "sticky");
            } catch (l) {
                D().error("FixedLayer", "Failed to setup fixed elements:", l);
            }
        };
        function Pk(a, b, c, d, e) {
            J(a.ampdoc.win, "inline-styles") &&
                b.hasAttribute("style") &&
                (b.style.top || b.style.bottom) &&
                A().error(
                    "FixedLayer",
                    "Inline styles with `top`, `bottom` and other CSS rules are not supported yet for fixed or sticky elements (#14186). Unexpected behavior may occur.",
                    b
                );
            for (var g = null, h = 0; h < a.U.length; h++) {
                var k = a.U[h];
                if (k.element == b && k.position == d) {
                    g = k;
                    break;
                }
            }
            h = "fixed" == d;
            g
                ? g.selectors.includes(c) || g.selectors.push(c)
                : ((g = "F" + a.qg++),
                  b.setAttribute("i-amphtml-fixedid", g),
                  h ? (b.__AMP_DECLFIXED = !0) : (b.__AMP_DECLSTICKY = !0),
                  (g = {
                      id: g,
                      element: b,
                      position: d,
                      selectors: [c],
                      fixedNow: !1,
                      stickyNow: !1,
                  }),
                  a.U.push(g));
            g.forceTransfer = h && !!e;
        }
        function Qk(a, b) {
            for (var c = [], d = 0; d < a.U.length; d++) {
                var e = a.U[d];
                e.element == b &&
                    (a.A.mutate(function () {
                        U(b, "top", "");
                    }),
                    a.U.splice(d, 1),
                    c.push(e));
            }
            return c;
        }
        function Ok(a) {
            a.U.sort(function (a, c) {
                return a.element.compareDocumentPosition(c.element) & 1
                    ? 1
                    : -1;
            });
        }
        function Tk(a, b, c, d) {
            var e = b.element;
            e.parentElement != a.ga &&
                (A().warn(
                    "FixedLayer",
                    "In order to improve scrolling performance in Safari, we now move the element to a fixed positioning layer:",
                    b.element
                ),
                b.placeholder ||
                    (U(e, "pointer-events", "initial"),
                    (b.placeholder = we(e)(Lk)).setAttribute(
                        "i-amphtml-fixedid",
                        b.id
                    )),
                U(
                    e,
                    "zIndex",
                    "calc(" + (1e4 + c) + " + " + (d.zIndex || 0) + ")"
                ),
                e.parentElement.replaceChild(b.placeholder, e),
                Sk(a).appendChild(e),
                b.selectors.some(function (a) {
                    var b;
                    a: {
                        try {
                            var c =
                                e.matches ||
                                e.webkitMatchesSelector ||
                                e.mozMatchesSelector ||
                                e.msMatchesSelector ||
                                e.oMatchesSelector;
                            if (c) {
                                b = c.call(e, a);
                                break a;
                            }
                        } catch (l) {
                            D().error(
                                "FixedLayer",
                                "Failed to test query match:",
                                l
                            );
                        }
                        b = !1;
                    }
                    return b;
                }) ||
                    (A().warn(
                        "FixedLayer",
                        "Failed to move the element to the fixed position layer. This is most likely due to the compound CSS selector:",
                        b.element
                    ),
                    Rk(a, b)));
        }
        function Rk(a, b) {
            b.placeholder &&
                a.ampdoc.contains(b.placeholder) &&
                (a.ampdoc.contains(b.element)
                    ? (U(b.element, "zIndex", ""),
                      b.placeholder.parentElement.replaceChild(
                          b.element,
                          b.placeholder
                      ))
                    : b.placeholder.parentElement.removeChild(b.placeholder));
        }
        function Sk(a) {
            if (!a.Aa || a.ga) return a.ga;
            var b = a.ampdoc.win.document;
            a.ga = b.body.cloneNode(!1);
            a.ga.removeAttribute("style");
            Jd(a.ga, {
                position: "absolute",
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                pointerEvents: "none",
                overflow: "hidden",
                animation: "none",
                background: "none",
                border: "none",
                borderImage: "none",
                boxSizing: "border-box",
                boxShadow: "none",
                display: "block",
                float: "none",
                margin: 0,
                opacity: 1,
                outline: "none",
                padding: "none",
                transform: "none",
                transition: "none",
                visibility: "visible",
            });
            b.documentElement.appendChild(a.ga);
            return a.ga;
        }
        function Nk(a, b, c, d) {
            for (var e = 0; e < b.length; e++) {
                var g = b[e];
                1 == g.type
                    ? "*" != g.selectorText &&
                      g.style.position &&
                      ("fixed" == g.style.position
                          ? c.push(g.selectorText)
                          : Fa(g.style.position, "sticky") &&
                            d.push(g.selectorText))
                    : 4 == g.type
                    ? Nk(a, g.cssRules, c, d)
                    : 12 == g.type && Nk(a, g.cssRules, c, d);
            }
        }
        function Uk(a) {
            var b = this;
            this.ampdoc = a;
            this.win = a.win;
            this.xc = hd(this.win);
            this.za = new V();
            this.ya = new V();
            this.mb = function () {
                b.za.fire();
            };
            this.lb = function () {
                return b.ya.fire();
            };
            this.J = J(this.win, "layers");
        }
        f = Uk.prototype;
        f.connect = function () {
            this.win.addEventListener("scroll", this.mb);
            this.win.addEventListener("resize", this.lb);
        };
        f.disconnect = function () {
            this.win.removeEventListener("scroll", this.mb);
            this.win.removeEventListener("resize", this.lb);
        };
        f.ensureReadyForElements = function () {};
        f.getBorderTop = function () {
            return 0;
        };
        f.requiresFixedLayerTransfer = function () {
            return !1;
        };
        f.supportsPositionFixed = function () {
            return !0;
        };
        f.onScroll = function (a) {
            this.za.add(a);
        };
        f.onResize = function (a) {
            this.ya.add(a);
        };
        f.updatePaddingTop = function (a) {
            Hd(this.win.document.documentElement, { "padding-top": a + "px" });
        };
        f.hideViewerHeader = function (a) {
            a || this.updatePaddingTop(0);
        };
        f.showViewerHeader = function (a, b) {
            a || this.updatePaddingTop(b);
        };
        f.disableScroll = function () {
            this.win.document.documentElement.classList.add(
                "i-amphtml-scroll-disabled"
            );
        };
        f.resetScroll = function () {
            this.win.document.documentElement.classList.remove(
                "i-amphtml-scroll-disabled"
            );
        };
        f.updateLightboxMode = function () {
            return Promise.resolve();
        };
        f.getSize = function () {
            var a = this.win.innerWidth,
                b = this.win.innerHeight;
            if (a && b) return { width: a, height: b };
            var c = this.win.document.documentElement;
            return { width: c.clientWidth, height: c.clientHeight };
        };
        f.getScrollTop = function () {
            var a =
                    this.getScrollingElement().scrollTop ||
                    this.win.pageYOffset,
                b = this.ampdoc.getRootNode().host;
            return b ? a - b.offsetTop : a;
        };
        f.getScrollLeft = function () {
            return 0;
        };
        f.getScrollWidth = function () {
            return this.getScrollingElement().scrollWidth;
        };
        f.getScrollHeight = function () {
            return this.getScrollingElement().scrollHeight;
        };
        f.getContentHeight = function () {
            var a = this.win.document.body.getBoundingClientRect();
            return a.height + a.top + this.getScrollTop();
        };
        f.getLayoutRect = function (a, b, c) {
            a = a.getBoundingClientRect();
            if (this.J) return X(a.left, a.top, a.width, a.height);
            var d = void 0 != c ? c : this.getScrollTop(),
                e = void 0 != b ? b : this.getScrollLeft();
            return X(
                Math.round(a.left + e),
                Math.round(a.top + d),
                Math.round(a.width),
                Math.round(a.height)
            );
        };
        f.getRootClientRectAsync = function () {
            return Promise.resolve(null);
        };
        f.setScrollTop = function (a) {
            this.getScrollingElement().scrollTop = a;
        };
        f.getScrollingElement = function () {
            var a = this.win.document;
            return a.scrollingElement
                ? a.scrollingElement
                : a.body && this.xc.isWebKit()
                ? a.body
                : a.documentElement;
        };
        function Vk(a, b) {
            return { left: a, top: b };
        }
        var Wk = [],
            Xk = 0;
        function Yk(a, b) {
            var c = this;
            a = a.win;
            this.ih = b;
            this.Rd = null;
            this.yb = [];
            this.Kc = [];
            this.Kc.push(
                $d(
                    a.document,
                    "scroll",
                    function (a) {
                        a = a.target;
                        var d = a.nodeType == Node.ELEMENT_NODE ? a : b;
                        a = d;
                        var g = Zk(a);
                        g && g.isLayer()
                            ? g.dirtyScrollMeasurements()
                            : (g = $k(c, a, !1));
                        c.pe = g;
                        c.Rd && c.Rd();
                    },
                    { capture: !0, passive: !0 }
                )
            );
            this.Kc.push(
                $d(
                    a,
                    "resize",
                    function () {
                        for (var a = c.yb, b = 0; b < a.length; b++) {
                            var g = a[b];
                            g.undeclareLayer();
                            g.forgetParentLayer();
                        }
                    },
                    { capture: !0, passive: !0 }
                )
            );
            this.pe = $k(this, b, !0);
        }
        f = Yk.prototype;
        f.dispose = function () {
            this.Kc.forEach(function (a) {
                return a();
            });
            this.Kc.length = 0;
        };
        f.add = function (a) {
            var b = Zk(a);
            b || (b = new al(a));
            -1 === this.yb.indexOf(b) && this.yb.push(b);
            return b;
        };
        f.remove = function (a) {
            if ((a = Zk(a))) {
                var b = this.yb.indexOf(a);
                -1 < b && this.yb.splice(b, 1);
                (b = a.getParentLayer()) && b.remove(a);
                a.undeclareLayer();
            }
        };
        f.getScrolledPosition = function (a, b) {
            return this.add(a).getScrolledPosition(b);
        };
        f.getOffsetPosition = function (a, b) {
            return this.add(a).getOffsetPosition(b);
        };
        f.getSize = function (a) {
            return this.add(a).getSize();
        };
        f.remeasure = function (a, b) {
            a = this.add(a);
            a = a.getParentLayer() || a;
            b && a.dirtyMeasurements();
            a.remeasure();
        };
        f.declareLayer = function (a) {
            $k(this, a, !1);
        };
        f.dirty = function (a) {
            var b = bl(a) || Zk(this.ih);
            b.dirtyMeasurements();
        };
        function $k(a, b, c) {
            a = a.add(b);
            a.declareLayer(c);
            return a;
        }
        f.onScroll = function (a) {
            this.Rd = a;
        };
        f.getActiveLayer = function () {
            return this.pe;
        };
        f.iterateAncestry = function (a, b, c) {
            return this.add(a).iterateAncestry(b, c);
        };
        function al(a) {
            a.__AMP_LAYOUT = this;
            this.$ = a;
            this.nd = a.tagName + "-" + Xk++;
            this.Cb = void 0;
            this.fb = !0;
            this.R = { height: 0, width: 0 };
            this.vf = Vk(0, 0);
            this.ud = void 0;
            this.pc = this.Ad = this.Ya = !1;
            this.ma = this.La = 0;
            this.Ta = [];
        }
        function Zk(a) {
            return a.__AMP_LAYOUT || null;
        }
        function bl(a, b) {
            if (!b && (b = Zk(a))) return b.getParentLayer();
            b = a.ownerDocument.defaultView;
            for (var c = a, d = a; d; d = d.parentNode) {
                var e = d === a ? null : Zk(d);
                if (e && e.isLayer()) return e;
                if (d === c) {
                    if ("fixed" == Ld(b, c).position)
                        return (
                            M(c, "layers").declareLayer(c),
                            c === a ? null : Zk(c)
                        );
                    c = c.offsetParent;
                }
            }
            return null;
        }
        f = al.prototype;
        f.getId = function () {
            return this.nd;
        };
        f.contains = function (a) {
            return a !== this && this.$.contains(a.$);
        };
        f.add = function (a) {
            this.isLayer();
            this.contains(a);
            this.Ta.push(a);
        };
        f.remove = function (a) {
            this.isLayer();
            a.getParentLayer();
            var b = this.Ta.indexOf(a);
            -1 < b && (this.Ta.splice(b, 1), a.forgetParentLayer());
        };
        f.isLayer = function () {
            return this.Ya;
        };
        f.declareLayer = function (a) {
            this.Ya ||
                ((this.Ya = !0),
                (this.Ad = a),
                (this.pc = this.fb = !0),
                (a = this.getParentLayer()) && a.Aa(this));
        };
        f.undeclareLayer = function () {
            if (this.Ya && !this.Ad) {
                var a = this.$;
                "fixed" !== Ld(a.ownerDocument.defaultView, a).position &&
                    ((this.Ya = !1),
                    (a = this.getParentLayer() || bl(this.$, !0)),
                    this.Aa(a));
            }
        };
        f.Aa = function (a) {
            var b = a.contains(this);
            Wf(this.Ta, function (c) {
                return b || a.contains(c)
                    ? ((c.fb = !0), (c.Cb = a), a.Ta.push(c), !1)
                    : !0;
            });
        };
        f.getParentLayer = function () {
            if (void 0 === this.Cb) {
                var a = bl(this.$, !0);
                (this.Cb = a) && a.add(this);
            }
            return this.Cb;
        };
        f.forgetParentLayer = function () {
            this.Cb = void 0;
        };
        f.getSize = function () {
            this.remeasure();
            return this.R;
        };
        f.getOffsetFromParent = function () {
            this.remeasure();
            return this.vf;
        };
        f.isActiveUnsafe = function () {
            return this.ud;
        };
        f.getHorizontalDistanceFromParent = function () {
            var a = this.getParentLayer();
            if (!a) return 0;
            var b = this.getOffsetFromParent().left,
                c = this.getSize().width,
                d = a.getScrollLeft(),
                e = a.getSize().width;
            return b + c < d ? d - (b + c) : d + e < b ? b - (d + e) : 0;
        };
        f.getHorizontalViewportsFromParent = function () {
            var a = this.getHorizontalDistanceFromParent();
            if (0 === a) return 0;
            var b = this.getParentLayer().getSize().width;
            return a / b;
        };
        f.getVerticalDistanceFromParent = function () {
            var a = this.getParentLayer();
            if (!a) return 0;
            var b = this.getOffsetFromParent().top,
                c = this.getSize().height,
                d = a.getScrollTop(),
                e = a.getSize().height;
            return b + c < d ? d - (b + c) : d + e < b ? b - (d + e) : 0;
        };
        f.getVerticalViewportsFromParent = function () {
            var a = this.getVerticalDistanceFromParent();
            if (0 === a) return 0;
            var b = this.getParentLayer().getSize().height;
            return a / b;
        };
        f.getScrollTop = function () {
            cl(this);
            return this.ma;
        };
        f.getScrollLeft = function () {
            cl(this);
            return this.La;
        };
        f.getScrolledPosition = function (a) {
            var b = this.getScrollLeft(),
                c = this.getScrollTop(),
                d = a ? bl(a) : null;
            for (a = this; a !== d; a = a.getParentLayer())
                var e = a.getOffsetFromParent(),
                    b = b + (e.left - a.getScrollLeft()),
                    c = c + (e.top - a.getScrollTop());
            return Vk(b, c);
        };
        f.getOffsetPosition = function (a) {
            var b = 0,
                c = 0;
            a = a ? bl(a) : null;
            for (var d = this; d !== a; d = d.getParentLayer())
                var e = d.getOffsetFromParent(), b = b + e.left, c = c + e.top;
            return Vk(b, c);
        };
        f.dirtyMeasurements = function () {
            this.fb = !0;
        };
        f.dirtyScrollMeasurements = function () {
            this.pc = !0;
        };
        f.remeasure = function () {
            for (
                var a = this, b = this.getParentLayer();
                b;
                b = b.getParentLayer()
            )
                b.fb && (a = b);
            a.fb && dl(a);
        };
        f.iterateAncestry = function (a, b) {
            for (
                var c = M(this.$, "layers").getActiveLayer(),
                    d = c === this || c.contains(this),
                    e = this;
                e;

            )
                Wk.push(e),
                    (e.ud = d),
                    e === c && (d = !1),
                    (e = e.getParentLayer());
            for (var g = void 0, e = Wk.length, h = 0; h < e; h++) {
                var k = Wk.pop(),
                    g = a(g, k, h, b);
                k.ud = void 0;
            }
            return g;
        };
        function dl(a, b) {
            cl(a);
            a.fb = !1;
            var c = a.$,
                d = b;
            if (!d)
                var e = a.getParentLayer(),
                    d = e ? el(e) : Vk(0, 0);
            a.R = { height: c.clientHeight, width: c.clientWidth };
            e = c.getBoundingClientRect();
            c = e.left;
            e = e.top;
            a.Ad && ((c += a.getScrollLeft()), (e += a.getScrollTop()));
            a.vf = Vk(c - d.left, e - d.top);
            c = a.Ta;
            if (c.length) for (a = el(a), e = 0; e < c.length; e++) dl(c[e], a);
        }
        function cl(a) {
            a.Ya &&
                a.pc &&
                ((a.pc = !1), (a.La = a.$.scrollLeft), (a.ma = a.$.scrollTop));
        }
        function el(a) {
            var b = a.getScrolledPosition();
            return Vk(b.left - a.getScrollLeft(), b.top - a.getScrollTop());
        }
        function fl(a, b) {
            O(
                a,
                "layers",
                function (a) {
                    return new Yk(a, b);
                },
                !0
            );
        }
        function gl(a, b) {
            return function (c) {
                return a + (b - a) * c;
            };
        }
        function hl(a) {
            var b = this;
            this.win = a;
            a = this.win.document;
            var c = a.documentElement,
                d = c.className;
            c.className = "i-amphtml-ios-embed";
            var e = a.createElement("html");
            this.W = e;
            e.id = "i-amphtml-wrapper";
            e.className = d;
            this.za = new V();
            this.ya = new V();
            this.mb = this.sf.bind(this);
            this.lb = function () {
                return b.ya.fire();
            };
            this.J = J(this.win, "layers");
            this.If = !1;
            Gc(a, this.Jf.bind(this));
            Ue(a).then(function () {
                c.classList.add("i-amphtml-ios-overscroll");
            });
        }
        f = hl.prototype;
        f.ensureReadyForElements = function () {
            this.Jf();
        };
        f.Jf = function () {
            if (!this.If) {
                this.If = !0;
                var a = this.win.document,
                    b = a.body;
                a.documentElement.appendChild(this.W);
                this.W.appendChild(b);
                Object.defineProperty(a, "body", {
                    get: function () {
                        return b;
                    },
                });
                this.sf();
            }
        };
        f.connect = function () {
            this.win.addEventListener("resize", this.lb);
            this.W.addEventListener("scroll", this.mb);
        };
        f.disconnect = function () {
            this.win.removeEventListener("resize", this.lb);
            this.W.removeEventListener("scroll", this.mb);
        };
        f.getBorderTop = function () {
            return 1;
        };
        f.requiresFixedLayerTransfer = function () {
            return !0;
        };
        f.supportsPositionFixed = function () {
            return !0;
        };
        f.onScroll = function (a) {
            this.za.add(a);
        };
        f.onResize = function (a) {
            this.ya.add(a);
        };
        f.updatePaddingTop = function (a) {
            Hd(this.W, { "padding-top": a + "px" });
        };
        f.hideViewerHeader = function (a) {
            a || this.updatePaddingTop(0);
        };
        f.showViewerHeader = function (a, b) {
            a || this.updatePaddingTop(b);
        };
        f.disableScroll = function () {
            this.W.classList.add("i-amphtml-scroll-disabled");
        };
        f.resetScroll = function () {
            this.W.classList.remove("i-amphtml-scroll-disabled");
        };
        f.updateLightboxMode = function () {
            return Promise.resolve();
        };
        f.getSize = function () {
            return { width: this.win.innerWidth, height: this.win.innerHeight };
        };
        f.getScrollTop = function () {
            return this.W.scrollTop;
        };
        f.getScrollLeft = function () {
            return 0;
        };
        f.getScrollWidth = function () {
            return this.W.scrollWidth;
        };
        f.getScrollHeight = function () {
            return this.W.scrollHeight;
        };
        f.getContentHeight = function () {
            var a = this.win.document.body.getBoundingClientRect();
            return a.height + a.top + this.getScrollTop();
        };
        f.getLayoutRect = function (a, b, c) {
            a = a.getBoundingClientRect();
            if (this.J) return X(a.left, a.top, a.width, a.height);
            c = void 0 != c ? c : this.getScrollTop();
            b = void 0 != b ? b : this.getScrollLeft();
            return X(
                Math.round(a.left + b),
                Math.round(a.top + c),
                Math.round(a.width),
                Math.round(a.height)
            );
        };
        f.getRootClientRectAsync = function () {
            return Promise.resolve(null);
        };
        f.setScrollTop = function (a) {
            this.W.scrollTop = a || 1;
        };
        f.sf = function (a) {
            0 == this.W.scrollTop &&
                ((this.W.scrollTop = 1), a && a.preventDefault());
            a && this.za.fire();
        };
        f.getScrollingElement = function () {
            return this.W;
        };
        function il(a, b, c) {
            var d = this;
            this.ampdoc = a;
            this.Ga = this.ampdoc.win.document;
            this.j = b;
            this.h = c;
            this.ma = this.R = this.Fb = null;
            this.Zd = !1;
            this.La = null;
            this.P = Number(c.getParam("paddingTop") || 0);
            this.hc = 0;
            this.O = R(this.ampdoc.win);
            this.A = jd(this.ampdoc.win);
            this.$d = !1;
            this.Hf = 0;
            this.Ke = new V();
            this.za = new V();
            this.ya = new V();
            this.Td = this.Pb = void 0;
            (this.J = J(this.ampdoc.win, "layers")) &&
                fl(this.ampdoc, this.j.getScrollingElement());
            this.aa = new Mk(
                this.ampdoc,
                this.A,
                this.j.getBorderTop(),
                this.P,
                this.j.requiresFixedLayerTransfer()
            );
            this.ampdoc.whenReady().then(function () {
                return d.aa.setup();
            });
            this.h.onMessage("viewport", this.rh.bind(this));
            this.h.onMessage("scroll", this.vh.bind(this));
            this.h.onMessage("disableScroll", this.tg.bind(this));
            this.j.updatePaddingTop(this.P);
            this.j.onScroll(this.hh.bind(this));
            this.j.onResize(this.Ff.bind(this));
            this.onScroll(this.jh.bind(this));
            this.ha = !1;
            this.h.onVisibilityChanged(this.Tf.bind(this));
            this.Tf();
            this.ampdoc.isSingleDoc() &&
                this.Ga.documentElement.classList.add("i-amphtml-singledoc");
            c.isEmbedded()
                ? this.Ga.documentElement.classList.add("i-amphtml-embedded")
                : this.Ga.documentElement.classList.add("i-amphtml-standalone");
            Wc(this.ampdoc.win) &&
                this.Ga.documentElement.classList.add("i-amphtml-iframed");
            "1" === c.getParam("webview") &&
                this.Ga.documentElement.classList.add("i-amphtml-webview");
            Wc(this.ampdoc.win) &&
                "scrollRestoration" in this.ampdoc.win.history &&
                (this.ampdoc.win.history.scrollRestoration = "manual");
        }
        f = il.prototype;
        f.dispose = function () {
            this.j.disconnect();
        };
        f.ensureReadyForElements = function () {
            this.j.ensureReadyForElements();
        };
        f.Tf = function () {
            var a = this.h.isVisible();
            a != this.ha &&
                ((this.ha = a)
                    ? (this.j.connect(), this.R && this.Ff())
                    : this.j.disconnect());
        };
        f.getPaddingTop = function () {
            return this.P;
        };
        f.getTop = function () {
            return this.getScrollTop();
        };
        f.getScrollTop = function () {
            null == this.ma && (this.ma = this.j.getScrollTop());
            return this.ma;
        };
        f.getScrollLeft = function () {
            null == this.La && (this.La = this.j.getScrollLeft());
            return this.La;
        };
        f.setScrollTop = function (a) {
            this.ma = null;
            this.j.setScrollTop(a);
        };
        f.updatePaddingBottom = function (a) {
            this.ampdoc.whenBodyAvailable().then(function (b) {
                U(b, "borderBottom", a + "px solid transparent");
            });
        };
        f.getSize = function () {
            if (this.R) return this.R;
            this.R = this.j.getSize();
            if (0 == this.R.width || 0 == this.R.height) {
                var a = this.h.getVisibilityState();
                ("prerender" == a || "visible" == a) &&
                    0.01 > Math.random() &&
                    D().error("Viewport", "viewport has zero dimensions");
            }
            return this.R;
        };
        f.getHeight = function () {
            return this.getSize().height;
        };
        f.getWidth = function () {
            return this.getSize().width;
        };
        f.getScrollWidth = function () {
            return this.j.getScrollWidth();
        };
        f.getScrollHeight = function () {
            return this.j.getScrollHeight();
        };
        f.getContentHeight = function () {
            return this.j.getContentHeight();
        };
        f.getRect = function () {
            if (null == this.Fb) {
                var a = 0,
                    b = 0;
                this.J ||
                    ((a = this.getScrollTop()), (b = this.getScrollLeft()));
                var c = this.getSize();
                this.Fb = X(b, a, c.width, c.height);
            }
            return this.Fb;
        };
        f.getLayoutRect = function (a) {
            var b = this.getScrollLeft(),
                c = this.getScrollTop(),
                d = Ac(a, this.ampdoc.win);
            return d
                ? ((a = this.j.getLayoutRect(a, 0, 0)),
                  (b = this.j.getLayoutRect(d, b, c)),
                  X(
                      Math.round(a.left + b.left),
                      Math.round(a.top + b.top),
                      Math.round(a.width),
                      Math.round(a.height)
                  ))
                : this.j.getLayoutRect(a, b, c);
        };
        f.getClientRectAsync = function (a) {
            var b = this;
            if (this.J)
                return this.A.measurePromise(function () {
                    return b.getLayoutRect(a);
                });
            var c = this.A.measurePromise(function () {
                    return a.getBoundingClientRect();
                }),
                d = this.j.getRootClientRectAsync(),
                e = Ac(a, this.ampdoc.win);
            e &&
                (d = this.A.measurePromise(function () {
                    return e.getBoundingClientRect();
                }));
            return Promise.all([c, d]).then(function (a) {
                var b = a[0];
                return (a = a[1])
                    ? Ye(b, a.left, a.top)
                    : X(
                          Number(b.left),
                          Number(b.top),
                          Number(b.width),
                          Number(b.height)
                      );
            });
        };
        f.supportsPositionFixed = function () {
            return this.j.supportsPositionFixed();
        };
        f.isDeclaredFixed = function (a) {
            return this.aa.isDeclaredFixed(a);
        };
        f.scrollIntoView = function (a) {
            var b = this.j.getLayoutRect(a).top,
                c;
            c = this.J ? b + this.getScrollTop() : Math.max(0, b - this.P);
            this.j.setScrollTop(c);
        };
        f.animateScrollIntoView = function (a, b, c, d) {
            b = void 0 === b ? 500 : b;
            c = void 0 === c ? "ease-in" : c;
            d = void 0 === d ? "top" : d;
            var e = this;
            a = this.j.getLayoutRect(a);
            switch (d) {
                case "bottom":
                    d = -this.getHeight() + a.height;
                    break;
                case "center":
                    d = -this.getHeight() / 2 + a.height / 2;
                    break;
                default:
                    d = 0;
            }
            var g;
            if (this.J) (d = a.top + d), (g = 0);
            else {
                var h = a.top - this.P + d;
                d = Math.max(0, h);
                g = this.getScrollTop();
            }
            if (d == g) return Promise.resolve();
            var k = gl(g, d);
            return Jk(
                this.ampdoc.getRootNode(),
                function (a) {
                    e.j.setScrollTop(k(a));
                },
                b,
                c
            ).then();
        };
        f.onChanged = function (a) {
            return this.Ke.add(a);
        };
        f.onScroll = function (a) {
            return this.za.add(a);
        };
        f.onResize = function (a) {
            return this.ya.add(a);
        };
        f.enterLightboxMode = function (a) {
            this.h.sendMessage("requestFullOverlay", {}, !0);
            this.enterOverlayMode();
            this.hideFixedLayer();
            a && this.maybeEnterFieLightboxMode(a);
            return this.j.updateLightboxMode(!0);
        };
        f.leaveLightboxMode = function (a) {
            this.h.sendMessage("cancelFullOverlay", {}, !0);
            this.showFixedLayer();
            this.leaveOverlayMode();
            a && this.maybeLeaveFieLightboxMode(a);
            return this.j.updateLightboxMode(!1);
        };
        f.isLightboxExperimentOn = function () {
            return J(this.ampdoc.win, "amp-lightbox-a4a-proto");
        };
        f.maybeEnterFieLightboxMode = function (a) {
            var b = jl(this, a);
            b && (this.isLightboxExperimentOn(), b.enterFullOverlayMode());
        };
        f.maybeLeaveFieLightboxMode = function (a) {
            (a = jl(this, a)) && a.leaveFullOverlayMode();
        };
        function jl(a, b) {
            var c = Ac(b, a.ampdoc.win);
            return c && c.__AMP_EMBED__;
        }
        f.enterOverlayMode = function () {
            this.disableTouchZoom();
            this.disableScroll();
        };
        f.leaveOverlayMode = function () {
            this.resetScroll();
            this.restoreOriginalTouchZoom();
        };
        f.disableScroll = function () {
            var a = this;
            this.A.mutate(function () {
                a.j.disableScroll();
            });
        };
        f.resetScroll = function () {
            var a = this;
            this.A.mutate(function () {
                a.j.resetScroll();
            });
        };
        f.resetTouchZoom = function () {
            var a = this,
                b = this.ampdoc.win.innerHeight,
                c = this.Ga.documentElement.clientHeight;
            (b && c && b === c) ||
                (this.disableTouchZoom() &&
                    this.O.delay(function () {
                        a.restoreOriginalTouchZoom();
                    }, 50));
        };
        f.disableTouchZoom = function () {
            var a = kl(this);
            if (!a) return !1;
            var b = a.content,
                c = { "maximum-scale": "1", "user-scalable": "no" };
            var d = Object.create(null);
            if (b)
                for (var e = b.split(/,|;/), g = 0; g < e.length; g++) {
                    var h = e[g].split("="),
                        k = h[0].trim(),
                        h = h[1],
                        h = (h || "").trim();
                    k && (d[k] = h);
                }
            var e = !1,
                l;
            for (l in c)
                d[l] !== c[l] &&
                    ((e = !0), void 0 !== c[l] ? (d[l] = c[l]) : delete d[l]);
            if (e) {
                var b = "",
                    m;
                for (m in d)
                    0 < b.length && (b += ","),
                        (b = d[m] ? b + (m + "=" + d[m]) : b + m);
            }
            d = b;
            return ll(this, d);
        };
        f.restoreOriginalTouchZoom = function () {
            return void 0 !== this.Td ? ll(this, this.Td) : !1;
        };
        f.hasScrolled = function () {
            return 0 < this.Hf;
        };
        f.hideFixedLayer = function () {
            this.aa.setVisible(!1);
        };
        f.showFixedLayer = function () {
            this.aa.setVisible(!0);
        };
        f.updateFixedLayer = function () {
            this.aa.update();
        };
        f.addToFixedLayer = function (a, b) {
            return this.aa.addElement(a, b);
        };
        f.removeFromFixedLayer = function (a) {
            this.aa.removeElement(a);
        };
        function ll(a, b) {
            return (a = kl(a)) && a.content != b ? ((a.content = b), !0) : !1;
        }
        function kl(a) {
            if (Wc(a.ampdoc.win)) return null;
            void 0 === a.Pb &&
                ((a.Pb = a.Ga.querySelector("meta[name=viewport]")),
                a.Pb && (a.Td = a.Pb.content));
            return a.Pb;
        }
        f.vh = function (a) {
            var b = a.scrollTop;
            this.setScrollTop(b);
        };
        f.rh = function (a) {
            var b = this,
                c = a.paddingTop,
                d = a.duration || 0,
                e = a.curve,
                g = a["transient"];
            void 0 != c &&
                c != this.P &&
                ((this.hc = this.P),
                (this.P = c),
                this.P < this.hc
                    ? (this.j.hideViewerHeader(g, this.hc), ml(this, d, e, g))
                    : ml(this, d, e, g).then(function () {
                          b.j.showViewerHeader(g, b.P);
                      }));
        };
        f.tg = function (a) {
            a ? this.disableScroll() : this.resetScroll();
        };
        function ml(a, b, c, d) {
            a.aa.updatePaddingTop(a.P, d);
            if (0 >= b) return Promise.resolve();
            var e = gl(a.hc - a.P, 0);
            return Jk(
                a.ampdoc.getRootNode(),
                function (b) {
                    b = e(b);
                    a.aa.transformMutate("translateY(" + b + "px)");
                },
                b,
                c
            ).thenAlways(function () {
                a.aa.transformMutate(null);
            });
        }
        function nl(a, b, c) {
            var d = a.getSize(),
                e = a.getScrollTop(),
                g = a.getScrollLeft();
            a.Ke.fire({
                relayoutAll: b,
                top: e,
                left: g,
                width: d.width,
                height: d.height,
                velocity: c,
            });
        }
        f.hh = function () {
            var a = this;
            this.Fb = null;
            this.Hf++;
            this.La = this.j.getScrollLeft();
            var b = this.j.getScrollTop();
            if (!(0 > b)) {
                this.ma = b;
                if (!this.$d) {
                    this.$d = !0;
                    var c = Date.now();
                    this.O.delay(function () {
                        a.A.measure(function () {
                            a.Pf(c, b);
                        });
                    }, 36);
                }
                this.za.fire();
            }
        };
        f.Pf = function (a, b) {
            var c = this,
                d = (this.ma = this.j.getScrollTop()),
                e = Date.now(),
                g = 0;
            e != a && (g = (d - b) / (e - a));
            0.03 > Math.abs(g)
                ? (nl(this, !1, g), (this.$d = !1))
                : this.O.delay(function () {
                      return c.A.measure(c.Pf.bind(c, e, d));
                  }, 20);
        };
        f.jh = function () {
            var a = this;
            this.Zd ||
                ((this.Zd = !0),
                this.A.measure(function () {
                    a.Zd = !1;
                    a.h.sendMessage(
                        "scroll",
                        H({ scrollTop: a.getScrollTop() }),
                        !0
                    );
                }));
        };
        f.Ff = function () {
            var a = this;
            this.Fb = null;
            var b = this.R;
            this.R = null;
            var c = this.getSize();
            this.aa.update().then(function () {
                var d = !b || b.width != c.width;
                nl(a, d, 0);
                var e = d || b.height != c.height;
                e &&
                    a.ya.fire({
                        relayoutAll: d,
                        width: c.width,
                        height: c.height,
                    });
            });
        };
        function ol(a) {
            var b = S(a),
                c;
            if ((c = a.isSingleDoc())) {
                c = a.win;
                var d = b.getParam("viewportType") || pl;
                hd(c).isIos() && d == pl
                    ? !Wc(c) && r(c).development
                        ? (c = ql)
                        : (Wc(c), (c = Wc(c) && b.isEmbedded() ? ql : d))
                    : (c = d);
                c = c == ql;
            }
            c = c ? new hl(a.win) : new Uk(a);
            return new il(a, c, b);
        }
        var pl = "natural",
            ql = "natural-ios-embed";
        function rl(a) {
            var b = this;
            this.win = a;
            this.Ea = dd(this.win);
            this.ob = P(this.win, "documentState");
            this.$g = sl(this);
            this.I = [];
            this.Pd = [];
            this.fe = [];
            this.Od = [];
            this.la = !1;
            this.Nd = this.qc = null;
            this.Yc = this.gh.bind(this);
            this.Bg = new dg(this.win, this.Yc, 16);
            this.ue = new dg(this.win, this.Yc, 40);
            this.ce = null;
            var c = this.Sd.bind(this);
            if (this.Ea.isSingleDoc())
                hc(this.Ea.getAmpDoc(), "viewer").then(function (a) {
                    b.ce = a;
                    a.onVisibilityChanged(c);
                });
            else this.ob.onVisibilityChanged(c);
            this.df = new $f(this.win);
        }
        f = rl.prototype;
        f.Sd = function () {
            this.la && tl(this);
        };
        f.run = function (a, b) {
            this.I.push(a);
            this.fe.push(b || void 0);
            this.Ka();
        };
        f.runPromise = function (a, b) {
            this.run(a, b);
            if (this.qc) return this.qc;
            a = new L();
            this.Nd = a.resolve;
            return (this.qc = a.promise);
        };
        f.createTask = function (a) {
            var b = this;
            return function (c) {
                b.run(a, c);
            };
        };
        f.mutate = function (a) {
            this.run({ measure: void 0, mutate: a });
        };
        f.mutatePromise = function (a) {
            return this.runPromise({ measure: void 0, mutate: a });
        };
        f.measure = function (a) {
            this.run({ measure: a, mutate: void 0 });
        };
        f.measurePromise = function (a) {
            var b = this;
            return new Promise(function (c) {
                b.measure(function () {
                    c(a());
                });
            });
        };
        f.canAnimate = function (a) {
            return ul(this, a);
        };
        function ul(a, b) {
            return a.ob.isHidden()
                ? !1
                : a.ce
                ? a.ce.isVisible()
                : b
                ? ((a = a.Ea.getAmpDoc(b)), S(a).isVisible())
                : !0;
        }
        f.runAnim = function (a, b, c) {
            if (!ul(this, a))
                return (
                    D().warn(
                        "VSYNC",
                        "Did not schedule a vsync request, because document was invisible"
                    ),
                    !1
                );
            this.run(b, c);
            return !0;
        };
        f.createAnimTask = function (a, b) {
            var c = this;
            return function (d) {
                return c.runAnim(a, b, d);
            };
        };
        f.runAnimMutateSeries = function (a, b, c) {
            var d = this;
            return ul(this, a)
                ? new Promise(function (e, g) {
                      var h = Date.now(),
                          k = 0,
                          l = d.createAnimTask(a, {
                              mutate: function (a) {
                                  var d = Date.now() - h;
                                  b(d, d - k, a)
                                      ? c && d > c
                                          ? g(Error("timeout"))
                                          : ((k = d), l(a))
                                      : e();
                              },
                          });
                      l({});
                  })
                : Promise.reject(Error("CANCELLED"));
        };
        f.Ka = function () {
            this.la || ((this.la = !0), this.df.onScheduled(), tl(this));
        };
        function tl(a) {
            ul(a) ? (a.$g(a.Yc), a.ue.schedule()) : a.Bg.schedule();
        }
        f.gh = function () {
            this.ue.cancel();
            this.la = !1;
            this.df.onRun();
            var a = this.I,
                b = this.fe,
                c = this.Nd;
            this.qc = this.Nd = null;
            this.I = this.Pd;
            this.fe = this.Od;
            for (var d = 0; d < a.length; d++)
                a[d].measure &&
                    !vl(a[d].measure, b[d]) &&
                    (a[d].mutate = void 0);
            for (d = 0; d < a.length; d++) a[d].mutate && vl(a[d].mutate, b[d]);
            this.Pd = a;
            this.Od = b;
            this.Pd.length = 0;
            this.Od.length = 0;
            c && c();
        };
        function sl(a) {
            var b =
                a.win.requestAnimationFrame ||
                a.win.webkitRequestAnimationFrame;
            if (b) return b.bind(a.win);
            var c = 0;
            return function (b) {
                var d = Date.now(),
                    g = Math.max(0, 16 - (d - c));
                c = d + g;
                a.win.setTimeout(b, g);
            };
        }
        function vl(a, b) {
            try {
                a(b);
            } catch (c) {
                return z(c), !1;
            }
            return !0;
        }
        var wl =
                "alt title referrerpolicy aria-label aria-describedby aria-labelledby".split(
                    " "
                ),
            xl = wl.concat(["srcset", "src", "sizes"]);
        function yl(a) {
            rh.call(this, a);
            this.cf = this.Rb = !0;
            this.Lb = this.H = null;
            this.jb = J(this.win, "amp-img-native-srcset");
        }
        aa(yl, rh);
        f = yl.prototype;
        f.mutatedAttributesCallback = function (a) {
            var b = !1;
            this.jb ||
                (void 0 !== a.srcset
                    ? ((this.Lb = fg(this.element)), (b = !0))
                    : void 0 !== a.src &&
                      ((this.Lb = hg(this.element.getAttribute("src"))),
                      (b = !0)),
                b && this.H && zl(this));
            if (this.H) {
                var c = this.jb ? xl : wl,
                    d = c.filter(function (b) {
                        return void 0 !== a[b];
                    });
                this.propagateAttributes(d, this.H, !0);
                this.jb && Al(this);
            }
        };
        f.preconnectCallback = function (a) {
            var b = this.element.getAttribute("src");
            if (b) this.preconnect.url(b, a);
            else {
                var c = this.element.getAttribute("srcset");
                if (c) {
                    var d = /https?:\/\/\S+/.exec(c);
                    d && this.preconnect.url(d[0], a);
                }
            }
        };
        f.buildCallback = function () {
            this.cf = !this.element.hasAttribute("noprerender");
        };
        f.isLayoutSupported = function (a) {
            return De(a);
        };
        f.ac = function () {
            this.H ||
                (this.jb || this.Lb || (this.Lb = fg(this.element)),
                (this.Rb = !this.element.hasAttribute("fallback")),
                this.element.hasAttribute("i-amphtml-ssr") &&
                    (this.H = this.element.querySelector("img")),
                (this.H = this.H || new Image()),
                this.H.setAttribute("decoding", "async"),
                this.element.id &&
                    this.H.setAttribute("amp-img-id", this.element.id),
                "img" == this.element.getAttribute("role") &&
                    (this.element.removeAttribute("role"),
                    this.user().error(
                        "AMP-IMG",
                        "Setting role=img on amp-img elements breaks screen readers please just set alt or ARIA attributes, they will be correctly propagated for the underlying <img> element."
                    )),
                this.jb
                    ? (this.propagateAttributes(xl, this.H), Al(this))
                    : this.propagateAttributes(wl, this.H),
                this.applyFillContent(this.H, !0),
                this.element.appendChild(this.H));
        };
        f.prerenderAllowed = function () {
            return this.cf;
        };
        f.isRelayoutNeeded = function () {
            return !0;
        };
        f.reconstructWhenReparented = function () {
            return !1;
        };
        f.layoutCallback = function () {
            var a = this;
            this.ac();
            var b = zl(this);
            this.Rb &&
                ((b = b.catch(function (b) {
                    Bl(a);
                    throw b;
                })),
                (this.Rb = !1));
            return b;
        };
        function Al(a) {
            if (!a.H.hasAttribute("src") && 0 == "srcset" in a.H) {
                var b = a.element.getAttribute("srcset");
                (b = /\S+/.match(b)) && a.H.setAttribute("src", b[0]);
            }
        }
        function zl(a) {
            if (0 >= a.getLayoutWidth()) return Promise.resolve();
            if (!a.jb) {
                var b = a.Lb.select(
                    a.getViewport().getWidth() || a.win.screen.width,
                    a.getDpr()
                );
                if (b == a.H.getAttribute("src")) return Promise.resolve();
                a.H.setAttribute("src", b);
            }
            return a.loadPromise(a.H).then(function () {
                !a.Rb &&
                    a.H.classList.contains("i-amphtml-ghost") &&
                    a.getVsync().mutate(function () {
                        a.H.classList.remove("i-amphtml-ghost");
                        a.toggleFallback(!1);
                    });
            });
        }
        function Bl(a) {
            a.getVsync().mutate(function () {
                a.H.classList.add("i-amphtml-ghost");
                a.toggleFallback(!0);
                a.togglePlaceholder(!1);
            });
        }
        function Cl(a) {
            rh.apply(this, arguments);
        }
        aa(Cl, rh);
        Cl.prototype.isLayoutSupported = function (a) {
            return De(a);
        };
        Cl.prototype.buildCallback = function () {
            var a = this.win.document.createElement("div");
            this.applyFillContent(a);
            this.getRealChildNodes().forEach(function (b) {
                a.appendChild(b);
            });
            this.element.appendChild(a);
        };
        function Dl(a) {
            rh.call(this, a);
            this.he = null;
        }
        aa(Dl, rh);
        Dl.prototype.isLayoutSupported = function () {
            return !0;
        };
        Dl.prototype.buildCallback = function () {
            this.element.setAttribute("aria-hidden", "true");
            (this.zc = this.element.getAttribute("referrerpolicy")) &&
                A().assert(
                    "no-referrer" == this.zc,
                    'amp-pixel: invalid "referrerpolicy" value "' +
                        this.zc +
                        '". Only "no-referrer" is supported'
                );
            this.element.hasAttribute("i-amphtml-ssr") &&
            this.element.querySelector("img")
                ? D().info("amp-pixel", "inabox img already present")
                : S(this.getAmpDoc())
                      .whenFirstVisible()
                      .then(this.ph.bind(this));
        };
        Dl.prototype.ph = function () {
            var a = this;
            if (this.he)
                return D().error("amp-pixel", "duplicate pixel"), this.he;
            this.he = R(this.win)
                .promise(1)
                .then(function () {
                    var b = a.element.getAttribute("src");
                    if (b)
                        return Yb(a.element, "url-replace", !0)
                            .expandUrlAsync(El(b))
                            .then(function (b) {
                                var c;
                                if (a.zc)
                                    if (
                                        ((c = a.element),
                                        "referrerPolicy" in Image.prototype)
                                    )
                                        c = Fl(
                                            c.ownerDocument.defaultView,
                                            b,
                                            !0
                                        );
                                    else {
                                        var e = c.ownerDocument,
                                            g = H({ src: "about:blank" }),
                                            e = e.createElement("iframe"),
                                            h;
                                        for (h in g) e.setAttribute(h, g[h]);
                                        c.appendChild(e);
                                        Fl(e.contentWindow, b);
                                        c = e;
                                    }
                                else c = Fl(a.win, b);
                                var k = c;
                                D().info("amp-pixel", "pixel triggered: ", b);
                                return k;
                            });
                });
        };
        function El(a) {
            A().assert(
                /^(https\:\/\/|\/\/)/i.test(a),
                'The <amp-pixel> src attribute must start with "https://" or "//". Invalid value: ' +
                    a
            );
            return a;
        }
        function Fl(a, b, c) {
            a = new a.Image();
            c && (a.referrerPolicy = "no-referrer");
            a.src = b;
            return a;
        }
        var Gl = ["amp-ad", "amp-embed", "amp-video"],
            Hl = ["amp-mustache"];
        function Il(a) {
            this.win = a;
            this.Ea = dd(a);
            this.Wb = {};
            this.Va = null;
        }
        f = Il.prototype;
        f.registerExtension = function (a, b, c) {
            var d = Jl(this, a, !0);
            try {
                (this.Va = a),
                    b(c),
                    (d.loaded = !0),
                    d.resolve && d.resolve(d.extension);
            } catch (e) {
                throw ((d.error = e), d.reject && d.reject(e), e);
            } finally {
                this.Va = null;
            }
        };
        f.waitForExtension = function (a, b, c) {
            return R(a).timeoutPromise(
                c || 8e3,
                Kl(Jl(this, b, !1)),
                "Render timeout waiting for extension " + b + " to be load."
            );
        };
        f.preloadExtension = function (a, b) {
            "amp-embed" == a && (a = "amp-ad");
            var c = Jl(this, a, !1),
                d;
            c.loaded || c.error
                ? (d = !1)
                : (void 0 === c.scriptPresent &&
                      ((d = this.win.document.head.querySelector(
                          '[custom-element="' + a + '"]'
                      )),
                      (c.scriptPresent = !!d)),
                  (d = !c.scriptPresent));
            if (d) {
                d = this.win.document.createElement("script");
                d.async = !0;
                d.setAttribute(
                    0 <= Hl.indexOf(a) ? "custom-template" : "custom-element",
                    a
                );
                d.setAttribute("data-script", a);
                d.setAttribute("i-amphtml-inserted", "");
                var e = Ha.urls.cdn,
                    g = r().rtvVersion;
                d.src =
                    e + "/rtv/" + g + "/v0/" + a + "-" + (b || "0.1") + ".js";
                this.win.document.head.appendChild(d);
                c.scriptPresent = !0;
            }
            return Kl(c);
        };
        f.installExtensionForDoc = function (a, b, c) {
            var d = this,
                e = a.getRootNode(),
                g = e.__AMP_EXT_LDR;
            g || (g = e.__AMP_EXT_LDR = G());
            if (g[b]) return g[b];
            Ph(a.win, b);
            return (g[b] = this.preloadExtension(b, c).then(function () {
                return Ll(d, a, b);
            }));
        };
        f.reloadExtension = function (a, b) {
            this.Wb[a] && delete this.Wb[a];
            b.removeAttribute("custom-element");
            b.setAttribute("i-amphtml-loaded-new-version", a);
            return this.preloadExtension(a);
        };
        f.loadElementClass = function (a) {
            return this.preloadExtension(a).then(function (b) {
                return b.elements[a].implementationClass;
            });
        };
        f.addElement = function (a, b, c) {
            Ml(this, a).extension.elements[a] = {
                implementationClass: b,
                css: c,
            };
            this.addDocFactory(function (d) {
                Nl(d, a, b, c);
            });
        };
        function Nl(a, b, c, d) {
            d
                ? Pd(
                      a,
                      d,
                      function () {
                          Ol(a.win, b, c);
                      },
                      !1,
                      b
                  )
                : Ol(a.win, b, c);
        }
        function Ol(a, b, c) {
            Mh(a, b, c);
            N(a, b, Pl);
        }
        f.addService = function (a, b) {
            Ml(this).extension.services.push(a);
            this.addDocFactory(function (c) {
                O(c, a, b, !0);
            });
        };
        f.addDocFactory = function (a, b) {
            var c = Ml(this, b);
            c.docFactories.push(a);
            if (
                this.Va &&
                (this.Ea.isSingleDoc() || this.Ea.hasAmpDocShell())
            ) {
                var d = this.Ea.getAmpDoc(this.win.document);
                (d.declaresExtension(this.Va) || c.auto) && a(d);
            }
        };
        f.installExtensionsInDoc = function (a, b) {
            var c = this,
                d = [];
            b.forEach(function (b) {
                d.push(Ll(c, a, b));
            });
            return Promise.all(d);
        };
        function Ll(a, b, c) {
            var d = Jl(a, c, !1);
            return Kl(d).then(function () {
                b.declareExtension(c);
                d.docFactories.forEach(function (a) {
                    try {
                        a(b);
                    } catch (g) {
                        z("Doc factory failed: ", g, c);
                    }
                });
            });
        }
        f.installExtensionsInChildWindow = function (a, b, c) {
            var d = this,
                e = this.win;
            zc(a, a.frameElement.ownerDocument.defaultView);
            Ql(a);
            Td(a.document, cssText$$module$build$css, null, !0, "amp-runtime");
            c && c(a);
            Rl(a);
            Sl(e, a);
            Tl(a);
            var g = [];
            b.forEach(function (b) {
                Gl.includes(b) || Ph(a, b);
                var c = d.preloadExtension(b).then(function (c) {
                    c.services.forEach(function (b) {
                        Cc(a, b);
                    });
                    var d = null,
                        e = {},
                        g;
                    for (g in c.elements) {
                        e.elementName = g;
                        e.elementDef = c.elements[e.elementName];
                        var h = new Promise(
                            (function (c) {
                                return function (d) {
                                    c.elementDef.css
                                        ? Td(
                                              a.document,
                                              c.elementDef.css,
                                              d,
                                              !1,
                                              b
                                          )
                                        : d();
                                };
                            })(e)
                        ).then(
                            (function (b) {
                                return function () {
                                    Mh(
                                        a,
                                        b.elementName,
                                        b.elementDef.implementationClass
                                    );
                                };
                            })(e)
                        );
                        d ? d.push(h) : (d = [h]);
                        e = {
                            elementDef: e.elementDef,
                            elementName: e.elementName,
                        };
                    }
                    return d
                        ? Promise.all(d).then(function () {
                              return c;
                          })
                        : c;
                });
                g.push(c);
            });
            return Promise.all(g);
        };
        function Jl(a, b, c) {
            var d = a.Wb[b];
            d ||
                ((d = {
                    extension: { elements: {}, services: [] },
                    auto: c,
                    docFactories: [],
                    promise: void 0,
                    resolve: void 0,
                    reject: void 0,
                    loaded: void 0,
                    error: void 0,
                    scriptPresent: void 0,
                }),
                (a.Wb[b] = d));
            return d;
        }
        function Ml(a, b) {
            a.Va || D().error("extensions", "unknown extension for ", b);
            return Jl(a, a.Va || "_UNKNOWN_", !0);
        }
        function Kl(a) {
            if (!a.promise)
                if (a.loaded) a.promise = Promise.resolve(a.extension);
                else if (a.error) a.promise = Promise.reject(a.error);
                else {
                    var b = new L();
                    a.promise = b.promise;
                    a.resolve = b.resolve;
                    a.reject = b.reject;
                }
            return a.promise;
        }
        function Sl(a, b) {
            var c = Lh(a)["amp-img"];
            Nh(b, "amp-img", c || uh);
            a = Lh(a)["amp-pixel"];
            Nh(b, "amp-pixel", a || uh);
        }
        function Tl(a) {
            Gl.forEach(function (b) {
                Ph(a, b);
            });
        }
        function Ql(a) {
            Db(a);
            Vb(a);
            Wb(a);
        }
        function Rl(a) {
            Cc(a, "url");
            Cc(a, "action");
            Cc(a, "standard-actions");
            Cc(a, "navigation");
        }
        function Pl() {
            return {};
        }
        var Ul =
                /^(https?:\/\/)((www[0-9]*|web|ftp|wap|home|mobile|amp|m)\.)+/i,
            Vl = [/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/],
            Wl = [/^t.co$/];
        function Xl(a, b) {
            var c = this;
            this.ampdoc = a;
            this.win = a.win;
            this.ub = Wc(this.win);
            this.ob = P(this.win, "documentState");
            this.ia = !0;
            this.Ud = !1;
            this.Yf = this.Nc = "visible";
            this.xa = 1;
            this.Kd = G();
            this.mc = G();
            this.Gf = new V();
            this.Qb = new V();
            this.Fe = new V();
            this.nc = this.cb = null;
            this.eb = [];
            this.L = {};
            this.ie =
                this.me =
                this.Md =
                this.hf =
                this.va =
                this.sc =
                this.rc =
                    null;
            var d = new L();
            this.xh = d.promise;
            this.yh = d.resolve;
            b
                ? Object.assign(this.L, b)
                : (this.win.name &&
                      0 == this.win.name.indexOf("__AMP__") &&
                      Yl(this.win.name.substring(7), this.L),
                  this.win.location.hash && Yl(this.win.location.hash, this.L));
            this.ia = !parseInt(this.L.off, 10);
            this.Ud = !(!parseInt(this.L.history, 10) && !this.Ud);
            Zl(this, this.L.visibilityState);
            this.xa = parseInt(this.L.prerenderSize, 10) || this.xa;
            this.gc = !this.ub && "1" == this.L.webview;
            this.dc = !(
                !(
                    (this.ub &&
                        !this.win.AMP_TEST_IFRAME &&
                        (this.L.origin ||
                            this.L.visibilityState ||
                            -1 !=
                                this.win.location.search.indexOf(
                                    "amp_js_v"
                                ))) ||
                    this.gc
                ) && a.isSingleDoc()
            );
            this.bf = !this.ub && "1" === n(this.win.location.search).amp_gsa;
            a = I(this.ampdoc.win.location.href);
            this.Jg = gb(a);
            this.jd = this.isVisible();
            this.ob.onVisibilityChanged(this.Bf.bind(this));
            this.Ld = this.dc
                ? R(this.win)
                      .timeoutPromise(
                          2e4,
                          new Promise(function (a) {
                              c.Md = a;
                          })
                      )
                      .catch(function (a) {
                          throw $l(a);
                      })
                : null;
            this.mf = this.dc
                ? this.Ld.catch(function (a) {
                      he($l(a));
                  })
                : null;
            var e, g;
            this.dc
                ? this.win.location.ancestorOrigins && !this.gc
                    ? ((e =
                          0 < this.win.location.ancestorOrigins.length &&
                          am(this, this.win.location.ancestorOrigins[0])),
                      (g = Promise.resolve(e)))
                    : ((a = new L()), (g = a.promise), (this.ie = a.resolve))
                : ((e = !1), (g = Promise.resolve(!1)));
            this.Bd = g;
            this.sh = new Promise(function (a) {
                c.isEmbedded()
                    ? c.win.location.ancestorOrigins &&
                      0 < c.win.location.ancestorOrigins.length
                        ? a(c.win.location.ancestorOrigins[0])
                        : (R(c.win).delay(function () {
                              return a("");
                          }, 1e3),
                          (c.me = a))
                    : a("");
            });
            this.Jc =
                this.isEmbedded() && "referrer" in this.L && !1 !== e
                    ? this.L.referrer
                    : this.win.document.referrer;
            this.Cf = new Promise(function (a) {
                c.isEmbedded() && "referrer" in c.L
                    ? c.Bd.then(function (b) {
                          b
                              ? a(c.L.referrer)
                              : (a(c.win.document.referrer),
                                c.Jc != c.win.document.referrer &&
                                    (D().expectedError(
                                        "Viewer",
                                        "Untrusted viewer referrer override: " +
                                            c.Jc +
                                            " at " +
                                            c.nc
                                    ),
                                    (c.Jc = c.win.document.referrer)));
                      })
                    : a(c.win.document.referrer);
            });
            this.Dc = fb(this.win.location.href || "");
            this.wh = new Promise(function (a) {
                var b = c.L.viewerUrl;
                c.isEmbedded() && b
                    ? c.Bd.then(function (d) {
                          d
                              ? (c.Dc = b)
                              : D().error(
                                    "Viewer",
                                    "Untrusted viewer url override: " +
                                        b +
                                        " at " +
                                        c.nc
                                );
                          a(c.Dc);
                      })
                    : a(c.Dc);
            });
            this.L.click &&
                ((a = fb(this.win.location.href)),
                a != this.win.location.href &&
                    this.win.history.replaceState &&
                    (this.win.location.originalHash ||
                        (this.win.location.originalHash =
                            this.win.location.hash),
                    this.win.history.replaceState({}, "", a)));
            this.Bf();
            bm(this);
            this.maybeUpdateFragmentForCct();
        }
        function bm(a) {
            if (a.isVisible()) {
                var b = Date.now();
                a.va || (a.va = b);
                a.hf = b;
                a.jd = !0;
                a.yh();
                a.sc && (a.sc(), (a.sc = null), (a.rc = null));
            }
            a.Qb.fire();
        }
        f = Xl.prototype;
        f.getParam = function (a) {
            return this.L[a];
        };
        f.hasCapability = function (a) {
            var b = this.L.cap;
            return b ? -1 != b.split(",").indexOf(a) : !1;
        };
        f.navigateToAmpUrl = function (a, b) {
            return this.hasCapability("a2a")
                ? (this.sendMessage(
                      "a2aNavigate",
                      H({ url: a, requestedBy: b })
                  ),
                  !0)
                : !1;
        };
        f.isEmbedded = function () {
            return this.dc;
        };
        f.isWebviewEmbedded = function () {
            return this.gc;
        };
        f.isCctEmbedded = function () {
            return this.bf;
        };
        f.isProxyOrigin = function () {
            return this.Jg;
        };
        f.maybeUpdateFragmentForCct = function () {
            if (this.bf && this.win.history.replaceState) {
                var a = jb(this.win.location.href),
                    b = ed(this.ampdoc).canonicalUrl,
                    c = jb(b);
                if (cm(a, c)) {
                    var a = this.win.location.href,
                        d = a.indexOf("#"),
                        e = -1 == d ? "" : a.substring(d),
                        g = "ampshare=" + encodeURIComponent(b);
                    this.win.history.replaceState(
                        {},
                        "",
                        e ? e + "&" + g : "#" + g
                    );
                }
            }
        };
        function cm(a, b) {
            function c(a) {
                return 2 < a.split(".").length ? a.replace(Ul, "$1") : a;
            }
            return c(a) == c(b);
        }
        f.isRuntimeOn = function () {
            return this.ia;
        };
        f.toggleRuntime = function () {
            this.ia = !this.ia;
            this.Gf.fire(this.ia);
        };
        f.onRuntimeState = function (a) {
            return this.Gf.add(a);
        };
        f.isOvertakeHistory = function () {
            return this.Ud;
        };
        f.getVisibilityState = function () {
            return this.Nc;
        };
        f.Bf = function () {
            Zl(this, this.Yf);
        };
        function Zl(a, b) {
            if (b) {
                var c = a.Nc;
                b = D().assertEnumValue(Wh, b, "VisibilityState");
                "hidden" === b && (b = a.jd ? "inactive" : "prerender");
                a.Yf = b;
                !a.ob.isHidden() ||
                    ("visible" !== b && "paused" !== b) ||
                    (b = "hidden");
                a.Nc = b;
                c !== b && bm(a);
            }
        }
        f.isVisible = function () {
            return "visible" == this.getVisibilityState();
        };
        f.hasBeenVisible = function () {
            return this.jd;
        };
        f.whenFirstVisible = function () {
            return this.xh;
        };
        f.whenNextVisible = function () {
            if (this.isVisible()) return Promise.resolve();
            if (this.rc) return this.rc;
            var a = new L();
            this.sc = a.resolve;
            return (this.rc = a.promise);
        };
        f.getFirstVisibleTime = function () {
            return this.va;
        };
        f.getLastVisibleTime = function () {
            return this.hf;
        };
        f.getPrerenderSize = function () {
            return this.xa;
        };
        f.getResolvedViewerUrl = function () {
            return this.Dc;
        };
        f.getViewerUrl = function () {
            return this.wh;
        };
        f.maybeGetMessagingOrigin = function () {
            return this.nc;
        };
        function dm(a) {
            var b = I(a);
            return "https:" != b.protocol
                ? !1
                : Wl.some(function (a) {
                      return a.test(b.hostname);
                  });
        }
        f.getUnconfirmedReferrerUrl = function () {
            return this.Jc;
        };
        f.getReferrerUrl = function () {
            return this.Cf;
        };
        f.isTrustedViewer = function () {
            return this.Bd;
        };
        f.isTrustedReferrer = function () {
            return this.Cf.then(function (a) {
                return dm(a);
            });
        };
        f.getViewerOrigin = function () {
            return this.sh;
        };
        function am(a, b) {
            if (a.gc && /^www\.[.a-z]+$/.test(b))
                return Vl.some(function (a) {
                    return a.test(b);
                });
            var c = I(b);
            return "https:" != c.protocol
                ? !1
                : Vl.some(function (a) {
                      return a.test(c.hostname);
                  });
        }
        f.onVisibilityChanged = function (a) {
            return this.Qb.add(a);
        };
        f.onMessage = function (a, b) {
            var c = this.Kd[a];
            c || ((c = new V()), (this.Kd[a] = c));
            return c.add(b);
        };
        f.onMessageRespond = function (a, b) {
            var c = this;
            this.mc[a] = b;
            return function () {
                c.mc[a] === b && delete c.mc[a];
            };
        };
        f.receiveMessage = function (a, b) {
            if ("visibilitychange" == a)
                return (
                    void 0 !== b.prerenderSize && (this.xa = b.prerenderSize),
                    Zl(this, b.state),
                    Promise.resolve()
                );
            if ("broadcast" == a) return this.Fe.fire(b), Promise.resolve();
            var c = this.Kd[a];
            c && c.fire(b);
            if ((a = this.mc[a])) return a(b);
            if (c) return Promise.resolve();
        };
        f.setMessageDeliverer = function (a, b) {
            var c = this;
            if (this.cb)
                throw Error("message channel can only be initialized once");
            if (null == b) throw Error("message channel must have an origin");
            this.cb = a;
            this.nc = b;
            this.Md && this.Md();
            this.ie && this.ie(b ? am(this, b) : !1);
            this.me && this.me(b || "");
            0 < this.eb.length &&
                ((b = this.eb.slice(0)),
                (this.eb = []),
                b.forEach(function (a) {
                    var b = c.cb(a.eventType, a.data, a.awaitResponse);
                    a.awaitResponse && a.responseResolver(b);
                }));
        };
        f.sendMessage = function (a, b, c) {
            c = void 0 === c ? !1 : c;
            em(this, a, b, c, !1);
        };
        f.sendMessageAwaitResponse = function (a, b, c) {
            return em(this, a, b, void 0 === c ? !1 : c, !0);
        };
        function em(a, b, c, d, e) {
            if (a.cb)
                return Xb(function () {
                    return a.cb(b, c, e);
                });
            if (!a.Ld) return e ? Promise.reject($l()) : Promise.resolve();
            if (!d)
                return a.Ld.then(function () {
                    return a.cb(b, c, e);
                });
            var g = Xf(a.eb, function (a) {
                return a.eventType == b;
            });
            if (-1 != g)
                (d = a.eb.splice(g, 1)[0]),
                    (d.data = c),
                    (d.awaitResponse = d.awaitResponse || e);
            else {
                d = new L();
                var h = d.resolve;
                d = {
                    eventType: b,
                    data: c,
                    awaitResponse: e,
                    responsePromise: d.promise,
                    responseResolver: h,
                };
            }
            a.eb.push(d);
            return d.responsePromise;
        }
        f.broadcast = function (a) {
            this.mf && this.sendMessage("broadcast", a);
        };
        f.onBroadcast = function (a) {
            return this.Fe.add(a);
        };
        f.whenMessagingReady = function () {
            return this.mf;
        };
        f.replaceUrl = function (a) {
            if (a && this.ampdoc.isSingleDoc() && this.win.history.replaceState)
                try {
                    var b = I(this.win.location.href),
                        c = I(fb(a) + this.win.location.hash);
                    b.origin == c.origin &&
                        jb(b) == jb(c) &&
                        (this.win.history.replaceState({}, "", c.href),
                        (this.win.location.originalHref = b.href));
                } catch (d) {
                    D().error("Viewer", "replaceUrl failed", d);
                }
        };
        function Yl(a, b) {
            a = n(a);
            for (var c in a) b[c] = a[c];
        }
        function $l(a) {
            return a instanceof Error
                ? ((a = xa(a)),
                  (a.message = "No messaging channel: " + a.message),
                  a)
                : Error("No messaging channel: " + a);
        }
        function fm(a) {
            O(
                a,
                "viewer",
                function () {
                    return new Xl(a, void 0);
                },
                !0
            );
        }
        (function () {
            Ca = ra;
            D();
            A();
        })();
        (function (a) {
            self.reportError = a;
        })(
            function (a, b, c) {
                he(b, c);
                b &&
                    a &&
                    qa(b.message) &&
                    !(0 <= b.message.indexOf("\u200b\u200b\u200b\u200b")) &&
                    J(a, "user-error-reporting") &&
                    ((b = { errorName: b.name, errorMessage: b.message }),
                    (a = dd(a).getAmpDoc().getRootNode()),
                    Wd(a.documentElement || a.body || a, b));
            }.bind(null, self)
        );
        function gm(a) {
            N(a, "crypto", Ni);
            N(a, "batched-xhr", li);
            N(a, "documentState", Ti);
            N(a, "platform", mj);
            N(a, "templates", Rh);
            N(a, "timer", xk);
            N(a, "timer", xk);
            N(a, "vsync", rl);
            N(a, "xhr", $h);
            N(a, "input", lj);
        }
        function hm(a) {
            var b = self;
            function c(a) {
                function c() {
                    g.then(function () {
                        "function" == typeof a
                            ? a(b.AMP)
                            : e.registerExtension(a.n, a.f, b.AMP);
                    });
                }
                "function" == typeof a || "high" == a.p
                    ? Promise.resolve().then(c)
                    : ((c.displayName = a.n), ng(b.document, c));
            }
            if (b.AMP_TAG) Promise.resolve();
            else {
                b.AMP_TAG = !0;
                var d = b.AMP || [];
                N(b, "extensions", Il);
                var e = fd(b);
                gm(b);
                Tl(b);
                b.AMP = { win: b };
                b.AMP.config = Ha;
                b.AMP.BaseElement = rh;
                b.AMP.BaseTemplate = Qh;
                b.AMP.registerElement = e.addElement.bind(e);
                b.AMP.registerTemplate = function (a, c) {
                    var d = P(b, "templates");
                    if (d.Nb[a]) {
                        var e = d.ge[a];
                        A().assert(e, "Duplicate template type: %s", a);
                        delete d.ge[a];
                        e(c);
                    } else d.Nb[a] = Promise.resolve(c);
                };
                b.AMP.registerServiceForDoc = e.addService.bind(e);
                b.AMP.isExperimentOn = J.bind(null, b);
                b.AMP.toggleExperiment = qb.bind(null, b);
                b.AMP.setTickFunction = function () {};
                var g = a(b, e);
                for (a = 0; a < d.length; a++) {
                    var h = d[a];
                    if (im(b, h)) d.splice(a--, 1);
                    else if ("function" == typeof h || "high" == h.p) {
                        try {
                            c(h);
                        } catch (k) {
                            D().error("runtime", "Extension failed: ", k, h.n);
                        }
                        d.splice(a--, 1);
                    }
                }
                jm(b, function () {
                    b.AMP.push = function (a) {
                        im(b, a) || c(a);
                    };
                    for (var a = 0; a < d.length; a++) {
                        var e = d[a];
                        if (!im(b, e))
                            try {
                                c(e);
                            } catch (m) {
                                D().error(
                                    "runtime",
                                    "Extension failed: ",
                                    m,
                                    e.n
                                );
                            }
                    }
                    d.length = 0;
                });
                b.AMP.push || (b.AMP.push = d.push.bind(d));
                hd(b).isIos() &&
                    U(b.document.documentElement, "cursor", "pointer");
            }
        }
        function km() {
            hm(function (a) {
                var b = dd(a).getAmpDoc();
                a.AMP.ampdoc = b;
                var c = S(a.document);
                a.AMP.viewer = c;
                r().development &&
                    ((a.AMP.toggleRuntime = c.toggleRuntime.bind(c)),
                    (a.AMP.resources = id(a.document)));
                c = kd(a.document);
                a.AMP.viewport = {};
                a.AMP.viewport.getScrollLeft = c.getScrollLeft.bind(c);
                a.AMP.viewport.getScrollWidth = c.getScrollWidth.bind(c);
                a.AMP.viewport.getWidth = c.getWidth.bind(c);
                return Hc(a.document).then(function () {
                    Oh(b);
                });
            });
        }
        function im(a, b) {
            if (
                !J(a, "version-locking") ||
                "function" == typeof b ||
                "1529106593171" == b.v
            )
                return !1;
            var c = a.document.head.querySelector(
                '[custom-element="' + b.n + '"]:not([i-amphtml-inserted])'
            );
            if (!c) return !1;
            fd(a).reloadExtension(b.n, c);
            return !0;
        }
        function jm(a, b) {
            J(a, "pump-early-frame")
                ? a.document.body
                    ? 0 < Od(a).length
                        ? b()
                        : R(a).delay(b, 1)
                    : b()
                : b();
        }
        function lm() {
            var a = self;
            Se(a.document, function () {
                return mm(a);
            });
        }
        function mm(a) {
            var b = 0,
                c = a.performance;
            c &&
                c.timing &&
                c.timing.responseStart &&
                (b = Date.now() - c.timing.responseStart);
            var d = Math.max(1, 250 - b);
            a.setTimeout(function () {
                nm(a);
                var b = a.document.styleSheets;
                if (b) {
                    for (
                        var c = a.document.querySelectorAll(
                                'link[rel~="stylesheet"]:not([href^="' +
                                    String(Ha.urls.cdn).replace(Dc, Ec) +
                                    '"])'
                            ),
                            h = [],
                            k = 0;
                        k < c.length;
                        k++
                    ) {
                        for (var l = c[k], m = !1, q = 0; q < b.length; q++)
                            if (b[q].ownerNode == l) {
                                m = !0;
                                break;
                            }
                        m || h.push(l);
                    }
                    k = {};
                    for (
                        l = 0;
                        l < h.length;
                        k = { ja: k.ja, media: k.media }, l++
                    )
                        (k.ja = h[l]),
                            (k.media = k.ja.media || "all"),
                            (k.ja.media = "not-matching"),
                            (k.ja.onload = (function (b) {
                                return function () {
                                    b.ja.media = b.media;
                                    nm(a);
                                };
                            })(k)),
                            k.ja.setAttribute("i-amphtml-timeout", d),
                            k.ja.parentNode.insertBefore(
                                k.ja,
                                k.ja.nextSibling
                            );
                }
            }, d);
        }
        function nm(a) {
            if (
                J(a, "font-display-swap") &&
                ((a = a.document), a.fonts || a.fonts.values)
            )
                for (var b = a.fonts.values(); (a = b.next()); ) {
                    var c = a.value;
                    if (!c) break;
                    "loading" == c.status &&
                        "display" in c &&
                        "auto" == c.display &&
                        (c.display = "swap");
                }
        }
        function om(a, b) {
            this.ua = a;
            this.G = b;
            this.Ic = !1;
            this.de = 0;
            this.Ee = this.Xg.bind(this);
            this.De = this.Wg.bind(this);
            this.Ce = this.Vg.bind(this);
            this.Be = this.Ug.bind(this);
            this.ua.addEventListener("touchstart", this.Ee, !0);
        }
        f = om.prototype;
        f.cleanup = function () {
            pm(this);
            this.ua.removeEventListener("touchstart", this.Ee, !0);
        };
        f.Xg = function (a) {
            this.Ic ||
                !a.touches ||
                1 != a.touches.length ||
                0 < this.G.getScrollTop() ||
                ((a = a.touches[0].clientY),
                (this.Ic = !0),
                (this.de = a),
                this.ua.addEventListener("touchmove", this.De, !0),
                this.ua.addEventListener("touchend", this.Ce, !0),
                this.ua.addEventListener("touchcancel", this.Be, !0));
        };
        function pm(a) {
            a.Ic = !1;
            a.de = 0;
            a.ua.removeEventListener("touchmove", a.De, !0);
            a.ua.removeEventListener("touchend", a.Ce, !0);
            a.ua.removeEventListener("touchcancel", a.Be, !0);
        }
        f.Wg = function (a) {
            if (this.Ic) {
                var b = a.touches[0].clientY - this.de;
                0 < b && a.preventDefault();
                0 != b && pm(this);
            }
        };
        f.Vg = function () {
            pm(this);
        };
        f.Ug = function () {
            pm(this);
        };
        function qm() {
            var a = self,
                b = a.location.href;
            Ga(b, "about:") ||
                (r().development
                    ? rm(a.document, Ha.urls.cdn + "/v0/validator.js").then(
                          function () {
                              amp.validator.validateUrlAndLog(
                                  b,
                                  a.document,
                                  r().filter
                              );
                          }
                      )
                    : r().examiner &&
                      rm(a.document, Ha.urls.cdn + "/examiner.js"));
        }
        function rm(a, b) {
            var c = a.createElement("script");
            c.src = b;
            b = ce(c).then(
                function () {
                    a.head.removeChild(c);
                },
                function () {}
            );
            a.head.appendChild(c);
            return b;
        }
        self.location && (self.location.originalHash = self.location.hash);
        var sm;
        try {
            ke(), dh(), (sm = dd(self));
        } catch (a) {
            throw (Vd(self.document), a);
        }
        ng(self.document, function initial() {
            var b = sm.getAmpDoc(self.document);
            N(self, "performance", eh);
            var c = gd(self);
            self.document.documentElement.hasAttribute(
                "i-amphtml-no-boilerplate"
            ) && c.addEnabledExperiment("no-boilerplate");
            N(self, "platform", mj);
            lm();
            c.tick("is");
            Pd(
                b,
                cssText$$module$build$css,
                function () {
                    ng(self.document, function () {
                        gm(self);
                        O(b, "url", yk, !0);
                        O(b, "cid", ui);
                        O(b, "documentInfo", Qi);
                        fm(b);
                        O(b, "viewport", ol, !0);
                        O(b, "history", kj);
                        O(b, "resources", Jj);
                        Tf(b);
                        O(b, "action", Fg, !0);
                        O(b, "standard-actions", nk, !0);
                        wk(b);
                        O(b, "navigation", Ui, !0);
                        b.getRootNode().addEventListener("submit", aj, !0);
                        c.coreServicesAvailable();
                        ff();
                    });
                    ng(self.document, function e() {
                        var b = self;
                        Nh(b, "amp-img", yl);
                        Nh(b, "amp-pixel", Dl);
                        Nh(b, "amp-layout", Cl);
                    });
                    ng(self.document, function g() {
                        km();
                    });
                    ng(self.document, function () {
                        Oh(b);
                    });
                    ng(self.document, function h() {
                        var b = self;
                        "0" == S(b.document).getParam("p2r") &&
                            hd(b).isChrome() &&
                            new om(b.document, kd(b.document));
                        qm();
                        Vd(self.document, !0);
                    });
                    ng(self.document, function k() {
                        c.tick("e_is");
                        id(b).ampInitComplete();
                        c.flush();
                    });
                },
                !0,
                "amp-runtime"
            );
        });
        self.console &&
            (console.info || console.log).call(
                console,
                "Powered by AMP \u26a1 HTML \u2013 Version 1529106593171",
                self.location.href
            );
        self.document.documentElement.setAttribute(
            "amp-version",
            "1529106593171"
        );
    })();
} catch (e) {
    setTimeout(function () {
        var s = document.body.style;
        s.opacity = 1;
        s.visibility = "visible";
        s.animation = "none";
        s.WebkitAnimation = "none;";
    }, 1000);
    throw e;
}
//# sourceMappingURL=v0.js.map
