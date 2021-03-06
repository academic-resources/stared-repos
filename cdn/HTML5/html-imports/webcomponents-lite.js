/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function () {
    /*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    "use strict";
    var n,
        ca =
            "function" == typeof Object.defineProperties
                ? Object.defineProperty
                : function (a, b, c) {
                      a != Array.prototype &&
                          a != Object.prototype &&
                          (a[b] = c.value);
                  },
        q =
            "undefined" != typeof window && window === this
                ? this
                : "undefined" != typeof global && null != global
                ? global
                : this;
    function da() {
        da = function () {};
        q.Symbol || (q.Symbol = ea);
    }
    var ea = (function () {
        var a = 0;
        return function (b) {
            return "jscomp_symbol_" + (b || "") + a++;
        };
    })();
    function fa() {
        da();
        var a = q.Symbol.iterator;
        a || (a = q.Symbol.iterator = q.Symbol("iterator"));
        "function" != typeof Array.prototype[a] &&
            ca(Array.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return ha(this);
                },
            });
        fa = function () {};
    }
    function ha(a) {
        var b = 0;
        return ia(function () {
            return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
        });
    }
    function ia(a) {
        fa();
        a = { next: a };
        a[q.Symbol.iterator] = function () {
            return this;
        };
        return a;
    }
    function ja(a) {
        fa();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : ha(a);
    }
    function ka(a) {
        for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
        return c;
    }
    (function () {
        if (
            !(function () {
                var a = document.createEvent("Event");
                a.initEvent("foo", !0, !0);
                a.preventDefault();
                return a.defaultPrevented;
            })()
        ) {
            var a = Event.prototype.preventDefault;
            Event.prototype.preventDefault = function () {
                this.cancelable &&
                    (a.call(this),
                    Object.defineProperty(this, "defaultPrevented", {
                        get: function () {
                            return !0;
                        },
                        configurable: !0,
                    }));
            };
        }
        var b = /Trident/.test(navigator.userAgent);
        if (
            !window.CustomEvent ||
            (b && "function" !== typeof window.CustomEvent)
        )
            (window.CustomEvent = function (a, b) {
                b = b || {};
                var c = document.createEvent("CustomEvent");
                c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
                return c;
            }),
                (window.CustomEvent.prototype = window.Event.prototype);
        if (!window.Event || (b && "function" !== typeof window.Event)) {
            var c = window.Event;
            window.Event = function (a, b) {
                b = b || {};
                var c = document.createEvent("Event");
                c.initEvent(a, !!b.bubbles, !!b.cancelable);
                return c;
            };
            if (c) for (var d in c) window.Event[d] = c[d];
            window.Event.prototype = c.prototype;
        }
        if (
            !window.MouseEvent ||
            (b && "function" !== typeof window.MouseEvent)
        ) {
            b = window.MouseEvent;
            window.MouseEvent = function (a, b) {
                b = b || {};
                var c = document.createEvent("MouseEvent");
                c.initMouseEvent(
                    a,
                    !!b.bubbles,
                    !!b.cancelable,
                    b.view || window,
                    b.detail,
                    b.screenX,
                    b.screenY,
                    b.clientX,
                    b.clientY,
                    b.ctrlKey,
                    b.altKey,
                    b.shiftKey,
                    b.metaKey,
                    b.button,
                    b.relatedTarget
                );
                return c;
            };
            if (b) for (d in b) window.MouseEvent[d] = b[d];
            window.MouseEvent.prototype = b.prototype;
        }
        Array.from ||
            (Array.from = function (a) {
                return [].slice.call(a);
            });
        Object.assign ||
            (Object.assign = function (a, b) {
                for (
                    var c = [].slice.call(arguments, 1), d = 0, e;
                    d < c.length;
                    d++
                )
                    if ((e = c[d]))
                        for (
                            var f = a,
                                m = e,
                                p = Object.getOwnPropertyNames(m),
                                x = 0;
                            x < p.length;
                            x++
                        )
                            (e = p[x]), (f[e] = m[e]);
                return a;
            });
    })(window.WebComponents);
    (function () {
        function a() {}
        function b(a, b) {
            if (!a.childNodes.length) return [];
            switch (a.nodeType) {
                case Node.DOCUMENT_NODE:
                    return va.call(a, b);
                case Node.DOCUMENT_FRAGMENT_NODE:
                    return jb.call(a, b);
                default:
                    return Y.call(a, b);
            }
        }
        var c = "undefined" === typeof HTMLTemplateElement,
            d = !(
                document.createDocumentFragment().cloneNode() instanceof
                DocumentFragment
            ),
            e = !1;
        /Trident/.test(navigator.userAgent) &&
            (function () {
                function a(a, b) {
                    if (a instanceof DocumentFragment)
                        for (var d; (d = a.firstChild); ) c.call(this, d, b);
                    else c.call(this, a, b);
                    return a;
                }
                e = !0;
                var b = Node.prototype.cloneNode;
                Node.prototype.cloneNode = function (a) {
                    a = b.call(this, a);
                    this instanceof DocumentFragment &&
                        (a.__proto__ = DocumentFragment.prototype);
                    return a;
                };
                DocumentFragment.prototype.querySelectorAll =
                    HTMLElement.prototype.querySelectorAll;
                DocumentFragment.prototype.querySelector =
                    HTMLElement.prototype.querySelector;
                Object.defineProperties(DocumentFragment.prototype, {
                    nodeType: {
                        get: function () {
                            return Node.DOCUMENT_FRAGMENT_NODE;
                        },
                        configurable: !0,
                    },
                    localName: { get: function () {}, configurable: !0 },
                    nodeName: {
                        get: function () {
                            return "#document-fragment";
                        },
                        configurable: !0,
                    },
                });
                var c = Node.prototype.insertBefore;
                Node.prototype.insertBefore = a;
                var d = Node.prototype.appendChild;
                Node.prototype.appendChild = function (b) {
                    b instanceof DocumentFragment
                        ? a.call(this, b, null)
                        : d.call(this, b);
                    return b;
                };
                var f = Node.prototype.removeChild,
                    h = Node.prototype.replaceChild;
                Node.prototype.replaceChild = function (b, c) {
                    b instanceof DocumentFragment
                        ? (a.call(this, b, c), f.call(this, c))
                        : h.call(this, b, c);
                    return c;
                };
                Document.prototype.createDocumentFragment = function () {
                    var a = this.createElement("df");
                    a.__proto__ = DocumentFragment.prototype;
                    return a;
                };
                var g = Document.prototype.importNode;
                Document.prototype.importNode = function (a, b) {
                    b = g.call(this, a, b || !1);
                    a instanceof DocumentFragment &&
                        (b.__proto__ = DocumentFragment.prototype);
                    return b;
                };
            })();
        var f = Node.prototype.cloneNode,
            h = Document.prototype.createElement,
            g = Document.prototype.importNode,
            k = Node.prototype.removeChild,
            l = Node.prototype.appendChild,
            m = Node.prototype.replaceChild,
            p = DOMParser.prototype.parseFromString,
            x = Object.getOwnPropertyDescriptor(
                window.HTMLElement.prototype,
                "innerHTML"
            ) || {
                get: function () {
                    return this.innerHTML;
                },
                set: function (a) {
                    this.innerHTML = a;
                },
            },
            N = Object.getOwnPropertyDescriptor(
                window.Node.prototype,
                "childNodes"
            ) || {
                get: function () {
                    return this.childNodes;
                },
            },
            Y = Element.prototype.querySelectorAll,
            va = Document.prototype.querySelectorAll,
            jb = DocumentFragment.prototype.querySelectorAll,
            kb = (function () {
                if (!c) {
                    var a = document.createElement("template"),
                        b = document.createElement("template");
                    b.content.appendChild(document.createElement("div"));
                    a.content.appendChild(b);
                    a = a.cloneNode(!0);
                    return (
                        0 === a.content.childNodes.length ||
                        0 === a.content.firstChild.content.childNodes.length ||
                        d
                    );
                }
            })();
        if (c) {
            var T = document.implementation.createHTMLDocument("template"),
                C = !0,
                Z = document.createElement("style");
            Z.textContent = "template{display:none;}";
            var oa = document.head;
            oa.insertBefore(Z, oa.firstElementChild);
            a.prototype = Object.create(HTMLElement.prototype);
            var wa = !document.createElement("div").hasOwnProperty("innerHTML");
            a.H = function (b) {
                if (
                    !b.content &&
                    b.namespaceURI === document.documentElement.namespaceURI
                ) {
                    b.content = T.createDocumentFragment();
                    for (var c; (c = b.firstChild); ) l.call(b.content, c);
                    if (wa) b.__proto__ = a.prototype;
                    else if (
                        ((b.cloneNode = function (b) {
                            return a.a(this, b);
                        }),
                        C)
                    )
                        try {
                            Q(b), aa(b);
                        } catch (rh) {
                            C = !1;
                        }
                    a.C(b.content);
                }
            };
            var ba = {
                    option: ["select"],
                    thead: ["table"],
                    col: ["colgroup", "table"],
                    tr: ["tbody", "table"],
                    th: ["tr", "tbody", "table"],
                    td: ["tr", "tbody", "table"],
                },
                Q = function (b) {
                    Object.defineProperty(b, "innerHTML", {
                        get: function () {
                            return lb(this);
                        },
                        set: function (b) {
                            var c =
                                ba[
                                    (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(
                                        b
                                    ) || ["", ""])[1].toLowerCase()
                                ];
                            if (c)
                                for (var d = 0; d < c.length; d++)
                                    b =
                                        "<" +
                                        c[d] +
                                        ">" +
                                        b +
                                        "</" +
                                        c[d] +
                                        ">";
                            T.body.innerHTML = b;
                            for (a.C(T); this.content.firstChild; )
                                k.call(this.content, this.content.firstChild);
                            b = T.body;
                            if (c)
                                for (d = 0; d < c.length; d++) b = b.lastChild;
                            for (; b.firstChild; )
                                l.call(this.content, b.firstChild);
                        },
                        configurable: !0,
                    });
                },
                aa = function (a) {
                    Object.defineProperty(a, "outerHTML", {
                        get: function () {
                            return (
                                "<template>" + this.innerHTML + "</template>"
                            );
                        },
                        set: function (a) {
                            if (this.parentNode) {
                                T.body.innerHTML = a;
                                for (
                                    a =
                                        this.ownerDocument.createDocumentFragment();
                                    T.body.firstChild;

                                )
                                    l.call(a, T.body.firstChild);
                                m.call(this.parentNode, a, this);
                            } else
                                throw Error(
                                    "Failed to set the 'outerHTML' property on 'Element': This element has no parent node."
                                );
                        },
                        configurable: !0,
                    });
                };
            Q(a.prototype);
            aa(a.prototype);
            a.C = function (c) {
                c = b(c, "template");
                for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++)
                    a.H(f);
            };
            document.addEventListener("DOMContentLoaded", function () {
                a.C(document);
            });
            Document.prototype.createElement = function () {
                var b = h.apply(this, arguments);
                "template" === b.localName && a.H(b);
                return b;
            };
            DOMParser.prototype.parseFromString = function () {
                var b = p.apply(this, arguments);
                a.C(b);
                return b;
            };
            Object.defineProperty(HTMLElement.prototype, "innerHTML", {
                get: function () {
                    return lb(this);
                },
                set: function (b) {
                    x.set.call(this, b);
                    a.C(this);
                },
                configurable: !0,
                enumerable: !0,
            });
            var bf = /[&\u00A0"]/g,
                yc = /[&\u00A0<>]/g,
                zc = function (a) {
                    switch (a) {
                        case "&":
                            return "&amp;";
                        case "<":
                            return "&lt;";
                        case ">":
                            return "&gt;";
                        case '"':
                            return "&quot;";
                        case "\u00a0":
                            return "&nbsp;";
                    }
                };
            Z = function (a) {
                for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
                return b;
            };
            var cf = Z(
                    "area base br col command embed hr img input keygen link meta param source track wbr".split(
                        " "
                    )
                ),
                df = Z(
                    "style script xmp iframe noembed noframes plaintext noscript".split(
                        " "
                    )
                ),
                lb = function (a, b) {
                    "template" === a.localName && (a = a.content);
                    for (
                        var c = "",
                            d = b ? b(a) : N.get.call(a),
                            e = 0,
                            f = d.length,
                            h;
                        e < f && (h = d[e]);
                        e++
                    ) {
                        a: {
                            var g = h;
                            var k = a;
                            var l = b;
                            switch (g.nodeType) {
                                case Node.ELEMENT_NODE:
                                    for (
                                        var Q = g.localName,
                                            m = "<" + Q,
                                            aa = g.attributes,
                                            p = 0;
                                        (k = aa[p]);
                                        p++
                                    )
                                        m +=
                                            " " +
                                            k.name +
                                            '="' +
                                            k.value.replace(bf, zc) +
                                            '"';
                                    m += ">";
                                    g = cf[Q]
                                        ? m
                                        : m + lb(g, l) + "</" + Q + ">";
                                    break a;
                                case Node.TEXT_NODE:
                                    g = g.data;
                                    g =
                                        k && df[k.localName]
                                            ? g
                                            : g.replace(yc, zc);
                                    break a;
                                case Node.COMMENT_NODE:
                                    g = "\x3c!--" + g.data + "--\x3e";
                                    break a;
                                default:
                                    throw (
                                        (window.console.error(g),
                                        Error("not implemented"))
                                    );
                            }
                        }
                        c += g;
                    }
                    return c;
                };
        }
        if (c || kb) {
            a.a = function (a, b) {
                var c = f.call(a, !1);
                this.H && this.H(c);
                b &&
                    (l.call(c.content, f.call(a.content, !0)),
                    mb(c.content, a.content));
                return c;
            };
            var mb = function (c, d) {
                    if (
                        d.querySelectorAll &&
                        ((d = b(d, "template")), 0 !== d.length)
                    ) {
                        c = b(c, "template");
                        for (var e = 0, f = c.length, h, g; e < f; e++)
                            (g = d[e]),
                                (h = c[e]),
                                a && a.H && a.H(g),
                                m.call(h.parentNode, ef.call(g, !0), h);
                    }
                },
                ef = (Node.prototype.cloneNode = function (b) {
                    if (!e && d && this instanceof DocumentFragment)
                        if (b) var c = ff.call(this.ownerDocument, this, !0);
                        else return this.ownerDocument.createDocumentFragment();
                    else
                        this.nodeType === Node.ELEMENT_NODE &&
                        "template" === this.localName &&
                        this.namespaceURI ==
                            document.documentElement.namespaceURI
                            ? (c = a.a(this, b))
                            : (c = f.call(this, b));
                    b && mb(c, this);
                    return c;
                }),
                ff = (Document.prototype.importNode = function (c, d) {
                    d = d || !1;
                    if ("template" === c.localName) return a.a(c, d);
                    var e = g.call(this, c, d);
                    if (d) {
                        mb(e, c);
                        c = b(
                            e,
                            'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]'
                        );
                        for (var f, k = 0; k < c.length; k++) {
                            f = c[k];
                            d = h.call(document, "script");
                            d.textContent = f.textContent;
                            for (
                                var l = f.attributes, Q = 0, aa;
                                Q < l.length;
                                Q++
                            )
                                (aa = l[Q]), d.setAttribute(aa.name, aa.value);
                            m.call(f.parentNode, d, f);
                        }
                    }
                    return e;
                });
        }
        c && (window.HTMLTemplateElement = a);
    })();
    var la = setTimeout;
    function ma() {}
    function na(a, b) {
        return function () {
            a.apply(b, arguments);
        };
    }
    function r(a) {
        if (!(this instanceof r))
            throw new TypeError("Promises must be constructed via new");
        if ("function" !== typeof a) throw new TypeError("not a function");
        this.v = 0;
        this.qa = !1;
        this.j = void 0;
        this.K = [];
        pa(a, this);
    }
    function qa(a, b) {
        for (; 3 === a.v; ) a = a.j;
        0 === a.v
            ? a.K.push(b)
            : ((a.qa = !0),
              ra(function () {
                  var c = 1 === a.v ? b.Ua : b.Va;
                  if (null === c) (1 === a.v ? sa : ta)(b.ja, a.j);
                  else {
                      try {
                          var d = c(a.j);
                      } catch (e) {
                          ta(b.ja, e);
                          return;
                      }
                      sa(b.ja, d);
                  }
              }));
    }
    function sa(a, b) {
        try {
            if (b === a)
                throw new TypeError(
                    "A promise cannot be resolved with itself."
                );
            if (b && ("object" === typeof b || "function" === typeof b)) {
                var c = b.then;
                if (b instanceof r) {
                    a.v = 3;
                    a.j = b;
                    ua(a);
                    return;
                }
                if ("function" === typeof c) {
                    pa(na(c, b), a);
                    return;
                }
            }
            a.v = 1;
            a.j = b;
            ua(a);
        } catch (d) {
            ta(a, d);
        }
    }
    function ta(a, b) {
        a.v = 2;
        a.j = b;
        ua(a);
    }
    function ua(a) {
        2 === a.v &&
            0 === a.K.length &&
            ra(function () {
                a.qa ||
                    ("undefined" !== typeof console &&
                        console &&
                        console.warn(
                            "Possible Unhandled Promise Rejection:",
                            a.j
                        ));
            });
        for (var b = 0, c = a.K.length; b < c; b++) qa(a, a.K[b]);
        a.K = null;
    }
    function xa(a, b, c) {
        this.Ua = "function" === typeof a ? a : null;
        this.Va = "function" === typeof b ? b : null;
        this.ja = c;
    }
    function pa(a, b) {
        var c = !1;
        try {
            a(
                function (a) {
                    c || ((c = !0), sa(b, a));
                },
                function (a) {
                    c || ((c = !0), ta(b, a));
                }
            );
        } catch (d) {
            c || ((c = !0), ta(b, d));
        }
    }
    r.prototype["catch"] = function (a) {
        return this.then(null, a);
    };
    r.prototype.then = function (a, b) {
        var c = new this.constructor(ma);
        qa(this, new xa(a, b, c));
        return c;
    };
    r.prototype["finally"] = function (a) {
        var b = this.constructor;
        return this.then(
            function (c) {
                return b.resolve(a()).then(function () {
                    return c;
                });
            },
            function (c) {
                return b.resolve(a()).then(function () {
                    return b.reject(c);
                });
            }
        );
    };
    function ya(a) {
        return new r(function (b, c) {
            function d(a, h) {
                try {
                    if (
                        h &&
                        ("object" === typeof h || "function" === typeof h)
                    ) {
                        var g = h.then;
                        if ("function" === typeof g) {
                            g.call(
                                h,
                                function (b) {
                                    d(a, b);
                                },
                                c
                            );
                            return;
                        }
                    }
                    e[a] = h;
                    0 === --f && b(e);
                } catch (m) {
                    c(m);
                }
            }
            if (!a || "undefined" === typeof a.length)
                throw new TypeError("Promise.all accepts an array");
            var e = Array.prototype.slice.call(a);
            if (0 === e.length) return b([]);
            for (var f = e.length, h = 0; h < e.length; h++) d(h, e[h]);
        });
    }
    function za(a) {
        return a && "object" === typeof a && a.constructor === r
            ? a
            : new r(function (b) {
                  b(a);
              });
    }
    function Aa(a) {
        return new r(function (b, c) {
            c(a);
        });
    }
    function Ba(a) {
        return new r(function (b, c) {
            for (var d = 0, e = a.length; d < e; d++) a[d].then(b, c);
        });
    }
    var ra =
        ("function" === typeof setImmediate &&
            function (a) {
                setImmediate(a);
            }) ||
        function (a) {
            la(a, 0);
        }; /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    if (!window.Promise) {
        window.Promise = r;
        r.prototype.then = r.prototype.then;
        r.all = ya;
        r.race = Ba;
        r.resolve = za;
        r.reject = Aa;
        var Ca = document.createTextNode(""),
            Da = [];
        new MutationObserver(function () {
            for (var a = Da.length, b = 0; b < a; b++) Da[b]();
            Da.splice(0, a);
        }).observe(Ca, { characterData: !0 });
        ra = function (a) {
            Da.push(a);
            Ca.textContent = 0 < Ca.textContent.length ? "" : "a";
        };
    }
    (function (a) {
        function b(a, b) {
            if ("function" === typeof window.CustomEvent)
                return new CustomEvent(a, b);
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
            return c;
        }
        function c(a) {
            if (N) return a.ownerDocument !== document ? a.ownerDocument : null;
            var b = a.__importDoc;
            if (!b && a.parentNode) {
                b = a.parentNode;
                if ("function" === typeof b.closest)
                    b = b.closest("link[rel=import]");
                else for (; !g(b) && (b = b.parentNode); );
                a.__importDoc = b;
            }
            return b;
        }
        function d(a) {
            var b = m(document, "link[rel=import]:not([import-dependency])"),
                c = b.length;
            c
                ? p(b, function (b) {
                      return h(b, function () {
                          0 === --c && a();
                      });
                  })
                : a();
        }
        function e(a) {
            function b() {
                "loading" !== document.readyState &&
                    document.body &&
                    (document.removeEventListener("readystatechange", b), a());
            }
            document.addEventListener("readystatechange", b);
            b();
        }
        function f(a) {
            e(function () {
                return d(function () {
                    return a && a();
                });
            });
        }
        function h(a, b) {
            if (a.__loaded) b && b();
            else if (
                ("script" === a.localName && !a.src) ||
                ("style" === a.localName && !a.firstChild)
            )
                (a.__loaded = !0), b && b();
            else {
                var c = function (d) {
                    a.removeEventListener(d.type, c);
                    a.__loaded = !0;
                    b && b();
                };
                a.addEventListener("load", c);
                (oa && "style" === a.localName) ||
                    a.addEventListener("error", c);
            }
        }
        function g(a) {
            return (
                a.nodeType === Node.ELEMENT_NODE &&
                "link" === a.localName &&
                "import" === a.rel
            );
        }
        function k() {
            var a = this;
            this.a = {};
            this.b = 0;
            this.c = new MutationObserver(function (b) {
                return a.Qa(b);
            });
            this.c.observe(document.head, { childList: !0, subtree: !0 });
            this.loadImports(document);
        }
        function l(a) {
            p(m(a, "template"), function (a) {
                p(
                    m(
                        a.content,
                        'script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]'
                    ),
                    function (a) {
                        var b = document.createElement("script");
                        p(a.attributes, function (a) {
                            return b.setAttribute(a.name, a.value);
                        });
                        b.textContent = a.textContent;
                        a.parentNode.replaceChild(b, a);
                    }
                );
                l(a.content);
            });
        }
        function m(a, b) {
            return a.childNodes.length ? a.querySelectorAll(b) : Y;
        }
        function p(a, b, c) {
            var d = a ? a.length : 0,
                e = c ? -1 : 1;
            for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c);
        }
        var x = document.createElement("link"),
            N = "import" in x,
            Y = x.querySelectorAll("*"),
            va = null;
        !1 === "currentScript" in document &&
            Object.defineProperty(document, "currentScript", {
                get: function () {
                    return (
                        va ||
                        ("complete" !== document.readyState
                            ? document.scripts[document.scripts.length - 1]
                            : null)
                    );
                },
                configurable: !0,
            });
        var jb = /(url\()([^)]*)(\))/g,
            kb = /(@import[\s]+(?!url\())([^;]*)(;)/g,
            T = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g,
            C = {
                La: function (a, b) {
                    a.href &&
                        a.setAttribute("href", C.Z(a.getAttribute("href"), b));
                    a.src &&
                        a.setAttribute("src", C.Z(a.getAttribute("src"), b));
                    if ("style" === a.localName) {
                        var c = C.ua(a.textContent, b, jb);
                        a.textContent = C.ua(c, b, kb);
                    }
                },
                ua: function (a, b, c) {
                    return a.replace(c, function (a, c, d, e) {
                        a = d.replace(/["']/g, "");
                        b && (a = C.Z(a, b));
                        return c + "'" + a + "'" + e;
                    });
                },
                Z: function (a, b) {
                    if (void 0 === C.fa) {
                        C.fa = !1;
                        try {
                            var c = new URL("b", "http://a");
                            c.pathname = "c%20d";
                            C.fa = "http://a/c%20d" === c.href;
                        } catch (yc) {}
                    }
                    if (C.fa) return new URL(a, b).href;
                    c = C.Ea;
                    c ||
                        ((c =
                            document.implementation.createHTMLDocument("temp")),
                        (C.Ea = c),
                        (c.ma = c.createElement("base")),
                        c.head.appendChild(c.ma),
                        (c.la = c.createElement("a")));
                    c.ma.href = b;
                    c.la.href = a;
                    return c.la.href || a;
                },
            },
            Z = {
                async: !0,
                load: function (a, b, c) {
                    if (a)
                        if (a.match(/^data:/)) {
                            a = a.split(",");
                            var d = a[1];
                            d =
                                -1 < a[0].indexOf(";base64")
                                    ? atob(d)
                                    : decodeURIComponent(d);
                            b(d);
                        } else {
                            var e = new XMLHttpRequest();
                            e.open("GET", a, Z.async);
                            e.onload = function () {
                                var a =
                                    e.responseURL ||
                                    e.getResponseHeader("Location");
                                a &&
                                    0 === a.indexOf("/") &&
                                    (a =
                                        (location.origin ||
                                            location.protocol +
                                                "//" +
                                                location.host) + a);
                                var d = e.response || e.responseText;
                                304 === e.status ||
                                0 === e.status ||
                                (200 <= e.status && 300 > e.status)
                                    ? b(d, a)
                                    : c(d);
                            };
                            e.send();
                        }
                    else c("error: href must be specified");
                },
            },
            oa =
                /Trident/.test(navigator.userAgent) ||
                /Edge\/\d./i.test(navigator.userAgent);
        k.prototype.loadImports = function (a) {
            var b = this;
            a = m(a, "link[rel=import]");
            p(a, function (a) {
                return b.h(a);
            });
        };
        k.prototype.h = function (a) {
            var b = this,
                c = a.href;
            if (void 0 !== this.a[c]) {
                var d = this.a[c];
                d && d.__loaded && ((a.__import = d), this.f(a));
            } else
                this.b++,
                    (this.a[c] = "pending"),
                    Z.load(
                        c,
                        function (a, d) {
                            a = b.Ra(a, d || c);
                            b.a[c] = a;
                            b.b--;
                            b.loadImports(a);
                            b.o();
                        },
                        function () {
                            b.a[c] = null;
                            b.b--;
                            b.o();
                        }
                    );
        };
        k.prototype.Ra = function (a, b) {
            if (!a) return document.createDocumentFragment();
            oa &&
                (a = a.replace(T, function (a, b, c) {
                    return -1 === a.indexOf("type=")
                        ? b + " type=import-disable " + c
                        : a;
                }));
            var c = document.createElement("template");
            c.innerHTML = a;
            if (c.content) (a = c.content), l(a);
            else
                for (a = document.createDocumentFragment(); c.firstChild; )
                    a.appendChild(c.firstChild);
            if ((c = a.querySelector("base")))
                (b = C.Z(c.getAttribute("href"), b)), c.removeAttribute("href");
            c = m(
                a,
                'link[rel=import],link[rel=stylesheet][href][type=import-disable],style:not([type]),link[rel=stylesheet][href]:not([type]),script:not([type]),script[type="application/javascript"],script[type="text/javascript"],script[type="module"]'
            );
            var d = 0;
            p(c, function (a) {
                h(a);
                C.La(a, b);
                a.setAttribute("import-dependency", "");
                if ("script" === a.localName && !a.src && a.textContent) {
                    if ("module" === a.type)
                        throw Error(
                            "Inline module scripts are not supported in HTML Imports."
                        );
                    a.setAttribute(
                        "src",
                        "data:text/javascript;charset=utf-8," +
                            encodeURIComponent(
                                a.textContent +
                                    ("\n//# sourceURL=" +
                                        b +
                                        (d ? "-" + d : "") +
                                        ".js\n")
                            )
                    );
                    a.textContent = "";
                    d++;
                }
            });
            return a;
        };
        k.prototype.o = function () {
            var a = this;
            if (!this.b) {
                this.c.disconnect();
                this.flatten(document);
                var b = !1,
                    c = !1,
                    d = function () {
                        c &&
                            b &&
                            (a.loadImports(document),
                            a.b ||
                                (a.c.observe(document.head, {
                                    childList: !0,
                                    subtree: !0,
                                }),
                                a.ha()));
                    };
                this.Ta(function () {
                    c = !0;
                    d();
                });
                this.Sa(function () {
                    b = !0;
                    d();
                });
            }
        };
        k.prototype.flatten = function (a) {
            var b = this;
            a = m(a, "link[rel=import]");
            p(a, function (a) {
                var c = b.a[a.href];
                (a.__import = c) &&
                    c.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
                    ((b.a[a.href] = a),
                    (a.readyState = "loading"),
                    (a.__import = a),
                    b.flatten(c),
                    a.appendChild(c));
            });
        };
        k.prototype.Sa = function (a) {
            function b(e) {
                if (e < d) {
                    var f = c[e],
                        g = document.createElement("script");
                    f.removeAttribute("import-dependency");
                    p(f.attributes, function (a) {
                        return g.setAttribute(a.name, a.value);
                    });
                    va = g;
                    f.parentNode.replaceChild(g, f);
                    h(g, function () {
                        va = null;
                        b(e + 1);
                    });
                } else a();
            }
            var c = m(document, "script[import-dependency]"),
                d = c.length;
            b(0);
        };
        k.prototype.Ta = function (a) {
            var b = m(
                    document,
                    "style[import-dependency],link[rel=stylesheet][import-dependency]"
                ),
                d = b.length;
            if (d) {
                var e =
                    oa &&
                    !!document.querySelector(
                        "link[rel=stylesheet][href][type=import-disable]"
                    );
                p(b, function (b) {
                    h(b, function () {
                        b.removeAttribute("import-dependency");
                        0 === --d && a();
                    });
                    if (e && b.parentNode !== document.head) {
                        var f = document.createElement(b.localName);
                        f.__appliedElement = b;
                        f.setAttribute("type", "import-placeholder");
                        b.parentNode.insertBefore(f, b.nextSibling);
                        for (f = c(b); f && c(f); ) f = c(f);
                        f.parentNode !== document.head && (f = null);
                        document.head.insertBefore(b, f);
                        b.removeAttribute("type");
                    }
                });
            } else a();
        };
        k.prototype.ha = function () {
            var a = this,
                b = m(document, "link[rel=import]");
            p(
                b,
                function (b) {
                    return a.f(b);
                },
                !0
            );
        };
        k.prototype.f = function (a) {
            a.__loaded ||
                ((a.__loaded = !0),
                a.import && (a.import.readyState = "complete"),
                a.dispatchEvent(
                    b(a.import ? "load" : "error", {
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0,
                    })
                ));
        };
        k.prototype.Qa = function (a) {
            var b = this;
            p(a, function (a) {
                return p(a.addedNodes, function (a) {
                    a &&
                        a.nodeType === Node.ELEMENT_NODE &&
                        (g(a) ? b.h(a) : b.loadImports(a));
                });
            });
        };
        var wa = null;
        if (N)
            (x = m(document, "link[rel=import]")),
                p(x, function (a) {
                    (a.import && "loading" === a.import.readyState) ||
                        (a.__loaded = !0);
                }),
                (x = function (a) {
                    a = a.target;
                    g(a) && (a.__loaded = !0);
                }),
                document.addEventListener("load", x, !0),
                document.addEventListener("error", x, !0);
        else {
            var ba = Object.getOwnPropertyDescriptor(Node.prototype, "baseURI");
            Object.defineProperty(
                (!ba || ba.configurable ? Node : Element).prototype,
                "baseURI",
                {
                    get: function () {
                        var a = g(this) ? this : c(this);
                        return a
                            ? a.href
                            : ba && ba.get
                            ? ba.get.call(this)
                            : (
                                  document.querySelector("base") ||
                                  window.location
                              ).href;
                    },
                    configurable: !0,
                    enumerable: !0,
                }
            );
            Object.defineProperty(HTMLLinkElement.prototype, "import", {
                get: function () {
                    return this.__import || null;
                },
                configurable: !0,
                enumerable: !0,
            });
            e(function () {
                wa = new k();
            });
        }
        f(function () {
            return document.dispatchEvent(
                b("HTMLImportsLoaded", {
                    cancelable: !0,
                    bubbles: !0,
                    detail: void 0,
                })
            );
        });
        a.useNative = N;
        a.whenReady = f;
        a.importForElement = c;
        a.loadImports = function (a) {
            wa && wa.loadImports(a);
        };
    })((window.HTMLImports = window.HTMLImports || {})); /*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    window.WebComponents = window.WebComponents || { flags: {} };
    var Ea = document.querySelector('script[src*="webcomponents-lite.js"]'),
        Fa = /wc-(.+)/,
        t = {};
    if (!t.noOpts) {
        location.search
            .slice(1)
            .split("&")
            .forEach(function (a) {
                a = a.split("=");
                var b;
                a[0] && (b = a[0].match(Fa)) && (t[b[1]] = a[1] || !0);
            });
        if (Ea)
            for (var Ga = 0, Ha = void 0; (Ha = Ea.attributes[Ga]); Ga++)
                "src" !== Ha.name && (t[Ha.name] = Ha.value || !0);
        if (t.log && t.log.split) {
            var Ia = t.log.split(",");
            t.log = {};
            Ia.forEach(function (a) {
                t.log[a] = !0;
            });
        } else t.log = {};
    }
    window.WebComponents.flags = t;
    var Ja = t.shadydom;
    Ja &&
        ((window.ShadyDOM = window.ShadyDOM || {}),
        (window.ShadyDOM.force = Ja));
    var Ka = t.register || t.ce;
    Ka &&
        window.customElements &&
        (window.customElements.forcePolyfill = Ka); /*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    function La() {
        this.ta = this.root = null;
        this.W = !1;
        this.D =
            this.R =
            this.ga =
            this.assignedSlot =
            this.assignedNodes =
            this.I =
                null;
        this.childNodes =
            this.nextSibling =
            this.previousSibling =
            this.lastChild =
            this.firstChild =
            this.parentNode =
            this.L =
                void 0;
        this.Aa = this.oa = !1;
        this.P = {};
    }
    La.prototype.toJSON = function () {
        return {};
    };
    function u(a) {
        a.da || (a.da = new La());
        return a.da;
    }
    function v(a) {
        return a && a.da;
    }
    var w = window.ShadyDOM || {};
    w.Na = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
    var Ma = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
    w.w = !!(Ma && Ma.configurable && Ma.get);
    w.ia = w.force || !w.Na;
    var Na = navigator.userAgent.match("Trident"),
        Oa = navigator.userAgent.match("Edge");
    void 0 === w.wa && (w.wa = w.w && (Na || Oa));
    function Pa(a) {
        return (a = v(a)) && void 0 !== a.firstChild;
    }
    function y(a) {
        return "ShadyRoot" === a.Ga;
    }
    function Qa(a) {
        a = a.getRootNode();
        if (y(a)) return a;
    }
    var Ra = Element.prototype,
        Sa =
            Ra.matches ||
            Ra.matchesSelector ||
            Ra.mozMatchesSelector ||
            Ra.msMatchesSelector ||
            Ra.oMatchesSelector ||
            Ra.webkitMatchesSelector;
    function Ta(a, b) {
        if (a && b)
            for (
                var c = Object.getOwnPropertyNames(b), d = 0, e = void 0;
                d < c.length && (e = c[d]);
                d++
            ) {
                var f = e,
                    h = a,
                    g = Object.getOwnPropertyDescriptor(b, f);
                g && Object.defineProperty(h, f, g);
            }
    }
    function Ua(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d)
            c[d - 1] = arguments[d];
        for (d = 0; d < c.length; d++) Ta(a, c[d]);
        return a;
    }
    function Va(a, b) {
        for (var c in b) a[c] = b[c];
    }
    var Wa = document.createTextNode(""),
        Xa = 0,
        Ya = [];
    new MutationObserver(function () {
        for (; Ya.length; )
            try {
                Ya.shift()();
            } catch (a) {
                throw ((Wa.textContent = Xa++), a);
            }
    }).observe(Wa, { characterData: !0 });
    function Za(a) {
        Ya.push(a);
        Wa.textContent = Xa++;
    }
    var $a = !!document.contains;
    function ab(a, b) {
        for (; b; ) {
            if (b == a) return !0;
            b = b.parentNode;
        }
        return !1;
    }
    function bb(a) {
        for (var b = a.length - 1; 0 <= b; b--) {
            var c = a[b],
                d = c.getAttribute("id") || c.getAttribute("name");
            d && "length" !== d && isNaN(d) && (a[d] = c);
        }
        a.item = function (b) {
            return a[b];
        };
        a.namedItem = function (b) {
            if ("length" !== b && isNaN(b) && a[b]) return a[b];
            for (var c = ja(a), d = c.next(); !d.done; d = c.next())
                if (
                    ((d = d.value),
                    (d.getAttribute("id") || d.getAttribute("name")) == b)
                )
                    return d;
            return null;
        };
        return a;
    }
    var cb = [],
        db;
    function eb(a) {
        db || ((db = !0), Za(fb));
        cb.push(a);
    }
    function fb() {
        db = !1;
        for (var a = !!cb.length; cb.length; ) cb.shift()();
        return a;
    }
    fb.list = cb;
    function gb() {
        this.a = !1;
        this.addedNodes = [];
        this.removedNodes = [];
        this.U = new Set();
    }
    function hb(a) {
        a.a ||
            ((a.a = !0),
            Za(function () {
                a.flush();
            }));
    }
    gb.prototype.flush = function () {
        if (this.a) {
            this.a = !1;
            var a = this.takeRecords();
            a.length &&
                this.U.forEach(function (b) {
                    b(a);
                });
        }
    };
    gb.prototype.takeRecords = function () {
        if (this.addedNodes.length || this.removedNodes.length) {
            var a = [
                {
                    addedNodes: this.addedNodes,
                    removedNodes: this.removedNodes,
                },
            ];
            this.addedNodes = [];
            this.removedNodes = [];
            return a;
        }
        return [];
    };
    function ib(a, b) {
        var c = u(a);
        c.I || (c.I = new gb());
        c.I.U.add(b);
        var d = c.I;
        return {
            Fa: b,
            G: d,
            Ha: a,
            takeRecords: function () {
                return d.takeRecords();
            },
        };
    }
    function nb(a) {
        var b = a && a.G;
        b && (b.U.delete(a.Fa), b.U.size || (u(a.Ha).I = null));
    }
    function ob(a, b) {
        var c = b.getRootNode();
        return a
            .map(function (a) {
                var b = c === a.target.getRootNode();
                if (b && a.addedNodes) {
                    if (
                        ((b = Array.from(a.addedNodes).filter(function (a) {
                            return c === a.getRootNode();
                        })),
                        b.length)
                    )
                        return (
                            (a = Object.create(a)),
                            Object.defineProperty(a, "addedNodes", {
                                value: b,
                                configurable: !0,
                            }),
                            a
                        );
                } else if (b) return a;
            })
            .filter(function (a) {
                return a;
            });
    }
    var pb = Element.prototype.insertBefore,
        qb = Element.prototype.replaceChild,
        rb = Element.prototype.removeChild,
        sb = Element.prototype.setAttribute,
        tb = Element.prototype.removeAttribute,
        ub = Element.prototype.cloneNode,
        vb = Document.prototype.importNode,
        wb = Element.prototype.addEventListener,
        xb = Element.prototype.removeEventListener,
        yb = Window.prototype.addEventListener,
        zb = Window.prototype.removeEventListener,
        Ab = Element.prototype.dispatchEvent,
        Bb = Node.prototype.contains || HTMLElement.prototype.contains,
        Cb = Document.prototype.getElementById,
        Db = Element.prototype.querySelector,
        Eb = DocumentFragment.prototype.querySelector,
        Fb = Document.prototype.querySelector,
        Gb = Element.prototype.querySelectorAll,
        Hb = DocumentFragment.prototype.querySelectorAll,
        Ib = Document.prototype.querySelectorAll,
        z = {};
    z.appendChild = Element.prototype.appendChild;
    z.insertBefore = pb;
    z.replaceChild = qb;
    z.removeChild = rb;
    z.setAttribute = sb;
    z.removeAttribute = tb;
    z.cloneNode = ub;
    z.importNode = vb;
    z.addEventListener = wb;
    z.removeEventListener = xb;
    z.eb = yb;
    z.fb = zb;
    z.dispatchEvent = Ab;
    z.contains = Bb;
    z.getElementById = Cb;
    z.nb = Db;
    z.qb = Eb;
    z.lb = Fb;
    z.querySelector = function (a) {
        switch (this.nodeType) {
            case Node.ELEMENT_NODE:
                return Db.call(this, a);
            case Node.DOCUMENT_NODE:
                return Fb.call(this, a);
            default:
                return Eb.call(this, a);
        }
    };
    z.ob = Gb;
    z.rb = Hb;
    z.mb = Ib;
    z.querySelectorAll = function (a) {
        switch (this.nodeType) {
            case Node.ELEMENT_NODE:
                return Gb.call(this, a);
            case Node.DOCUMENT_NODE:
                return Ib.call(this, a);
            default:
                return Hb.call(this, a);
        }
    };
    var Jb = /[&\u00A0"]/g,
        Kb = /[&\u00A0<>]/g;
    function Lb(a) {
        switch (a) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "\u00a0":
                return "&nbsp;";
        }
    }
    function Mb(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
        return b;
    }
    var Nb = Mb(
            "area base br col command embed hr img input keygen link meta param source track wbr".split(
                " "
            )
        ),
        Ob = Mb(
            "style script xmp iframe noembed noframes plaintext noscript".split(
                " "
            )
        );
    function Pb(a, b) {
        "template" === a.localName && (a = a.content);
        for (
            var c = "",
                d = b ? b(a) : a.childNodes,
                e = 0,
                f = d.length,
                h = void 0;
            e < f && (h = d[e]);
            e++
        ) {
            a: {
                var g = h;
                var k = a,
                    l = b;
                switch (g.nodeType) {
                    case Node.ELEMENT_NODE:
                        k = g.localName;
                        for (
                            var m = "<" + k, p = g.attributes, x = 0, N;
                            (N = p[x]);
                            x++
                        )
                            m +=
                                " " +
                                N.name +
                                '="' +
                                N.value.replace(Jb, Lb) +
                                '"';
                        m += ">";
                        g = Nb[k] ? m : m + Pb(g, l) + "</" + k + ">";
                        break a;
                    case Node.TEXT_NODE:
                        g = g.data;
                        g = k && Ob[k.localName] ? g : g.replace(Kb, Lb);
                        break a;
                    case Node.COMMENT_NODE:
                        g = "\x3c!--" + g.data + "--\x3e";
                        break a;
                    default:
                        throw (
                            (window.console.error(g), Error("not implemented"))
                        );
                }
            }
            c += g;
        }
        return c;
    }
    var A = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
        B = document.createTreeWalker(
            document,
            NodeFilter.SHOW_ELEMENT,
            null,
            !1
        );
    function Qb(a) {
        var b = [];
        A.currentNode = a;
        for (a = A.firstChild(); a; ) b.push(a), (a = A.nextSibling());
        return b;
    }
    var D = {
        parentNode: function (a) {
            A.currentNode = a;
            return A.parentNode();
        },
        firstChild: function (a) {
            A.currentNode = a;
            return A.firstChild();
        },
        lastChild: function (a) {
            A.currentNode = a;
            return A.lastChild();
        },
        previousSibling: function (a) {
            A.currentNode = a;
            return A.previousSibling();
        },
        nextSibling: function (a) {
            A.currentNode = a;
            return A.nextSibling();
        },
    };
    D.childNodes = Qb;
    D.parentElement = function (a) {
        B.currentNode = a;
        return B.parentNode();
    };
    D.firstElementChild = function (a) {
        B.currentNode = a;
        return B.firstChild();
    };
    D.lastElementChild = function (a) {
        B.currentNode = a;
        return B.lastChild();
    };
    D.previousElementSibling = function (a) {
        B.currentNode = a;
        return B.previousSibling();
    };
    D.nextElementSibling = function (a) {
        B.currentNode = a;
        return B.nextSibling();
    };
    D.children = function (a) {
        var b = [];
        B.currentNode = a;
        for (a = B.firstChild(); a; ) b.push(a), (a = B.nextSibling());
        return bb(b);
    };
    D.innerHTML = function (a) {
        return Pb(a, function (a) {
            return Qb(a);
        });
    };
    D.textContent = function (a) {
        switch (a.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
                a = document.createTreeWalker(
                    a,
                    NodeFilter.SHOW_TEXT,
                    null,
                    !1
                );
                for (var b = "", c; (c = a.nextNode()); ) b += c.nodeValue;
                return b;
            default:
                return a.nodeValue;
        }
    };
    var Rb = w.w,
        Sb = [Node.prototype, Element.prototype, HTMLElement.prototype];
    function E(a) {
        var b;
        a: {
            for (b = 0; b < Sb.length; b++) {
                var c = Sb[b];
                if (c.hasOwnProperty(a)) {
                    b = c;
                    break a;
                }
            }
            b = void 0;
        }
        if (!b) throw Error("Could not find descriptor for " + a);
        return Object.getOwnPropertyDescriptor(b, a);
    }
    var F = Rb
            ? {
                  parentNode: E("parentNode"),
                  firstChild: E("firstChild"),
                  lastChild: E("lastChild"),
                  previousSibling: E("previousSibling"),
                  nextSibling: E("nextSibling"),
                  childNodes: E("childNodes"),
                  parentElement: E("parentElement"),
                  previousElementSibling: E("previousElementSibling"),
                  nextElementSibling: E("nextElementSibling"),
                  innerHTML: E("innerHTML"),
                  textContent: E("textContent"),
                  firstElementChild: E("firstElementChild"),
                  lastElementChild: E("lastElementChild"),
                  children: E("children"),
              }
            : {},
        Tb = Rb
            ? {
                  firstElementChild: Object.getOwnPropertyDescriptor(
                      DocumentFragment.prototype,
                      "firstElementChild"
                  ),
                  lastElementChild: Object.getOwnPropertyDescriptor(
                      DocumentFragment.prototype,
                      "lastElementChild"
                  ),
                  children: Object.getOwnPropertyDescriptor(
                      DocumentFragment.prototype,
                      "children"
                  ),
              }
            : {},
        Ub = Rb
            ? {
                  firstElementChild: Object.getOwnPropertyDescriptor(
                      Document.prototype,
                      "firstElementChild"
                  ),
                  lastElementChild: Object.getOwnPropertyDescriptor(
                      Document.prototype,
                      "lastElementChild"
                  ),
                  children: Object.getOwnPropertyDescriptor(
                      Document.prototype,
                      "children"
                  ),
              }
            : {},
        Vb = {
            sa: F,
            pb: Tb,
            kb: Ub,
            parentNode: function (a) {
                return F.parentNode.get.call(a);
            },
            firstChild: function (a) {
                return F.firstChild.get.call(a);
            },
            lastChild: function (a) {
                return F.lastChild.get.call(a);
            },
            previousSibling: function (a) {
                return F.previousSibling.get.call(a);
            },
            nextSibling: function (a) {
                return F.nextSibling.get.call(a);
            },
            childNodes: function (a) {
                return Array.prototype.slice.call(F.childNodes.get.call(a));
            },
            parentElement: function (a) {
                return F.parentElement.get.call(a);
            },
            previousElementSibling: function (a) {
                return F.previousElementSibling.get.call(a);
            },
            nextElementSibling: function (a) {
                return F.nextElementSibling.get.call(a);
            },
            innerHTML: function (a) {
                return F.innerHTML.get.call(a);
            },
            textContent: function (a) {
                return F.textContent.get.call(a);
            },
            children: function (a) {
                switch (a.nodeType) {
                    case Node.DOCUMENT_FRAGMENT_NODE:
                        return Tb.children.get.call(a);
                    case Node.DOCUMENT_NODE:
                        return Ub.children.get.call(a);
                    default:
                        return F.children.get.call(a);
                }
            },
            firstElementChild: function (a) {
                switch (a.nodeType) {
                    case Node.DOCUMENT_FRAGMENT_NODE:
                        return Tb.firstElementChild.get.call(a);
                    case Node.DOCUMENT_NODE:
                        return Ub.firstElementChild.get.call(a);
                    default:
                        return F.firstElementChild.get.call(a);
                }
            },
            lastElementChild: function (a) {
                switch (a.nodeType) {
                    case Node.DOCUMENT_FRAGMENT_NODE:
                        return Tb.lastElementChild.get.call(a);
                    case Node.DOCUMENT_NODE:
                        return Ub.lastElementChild.get.call(a);
                    default:
                        return F.lastElementChild.get.call(a);
                }
            },
        };
    var G = w.wa ? Vb : D;
    function Wb(a) {
        for (; a.firstChild; ) a.removeChild(a.firstChild);
    }
    var Xb = w.w,
        Yb = document.implementation.createHTMLDocument("inert"),
        Zb = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
        $b = Zb && Zb.get,
        ac = Object.getOwnPropertyDescriptor(
            Document.prototype,
            "activeElement"
        ),
        bc = {
            parentElement: {
                get: function () {
                    var a = v(this);
                    (a = a && a.parentNode) &&
                        a.nodeType !== Node.ELEMENT_NODE &&
                        (a = null);
                    return void 0 !== a ? a : G.parentElement(this);
                },
                configurable: !0,
            },
            parentNode: {
                get: function () {
                    var a = v(this);
                    a = a && a.parentNode;
                    return void 0 !== a ? a : G.parentNode(this);
                },
                configurable: !0,
            },
            nextSibling: {
                get: function () {
                    var a = v(this);
                    a = a && a.nextSibling;
                    return void 0 !== a ? a : G.nextSibling(this);
                },
                configurable: !0,
            },
            previousSibling: {
                get: function () {
                    var a = v(this);
                    a = a && a.previousSibling;
                    return void 0 !== a ? a : G.previousSibling(this);
                },
                configurable: !0,
            },
            nextElementSibling: {
                get: function () {
                    var a = v(this);
                    if (a && void 0 !== a.nextSibling) {
                        for (
                            a = this.nextSibling;
                            a && a.nodeType !== Node.ELEMENT_NODE;

                        )
                            a = a.nextSibling;
                        return a;
                    }
                    return G.nextElementSibling(this);
                },
                configurable: !0,
            },
            previousElementSibling: {
                get: function () {
                    var a = v(this);
                    if (a && void 0 !== a.previousSibling) {
                        for (
                            a = this.previousSibling;
                            a && a.nodeType !== Node.ELEMENT_NODE;

                        )
                            a = a.previousSibling;
                        return a;
                    }
                    return G.previousElementSibling(this);
                },
                configurable: !0,
            },
        },
        cc = {
            className: {
                get: function () {
                    return this.getAttribute("class") || "";
                },
                set: function (a) {
                    this.setAttribute("class", a);
                },
                configurable: !0,
            },
        },
        dc = {
            childNodes: {
                get: function () {
                    if (Pa(this)) {
                        var a = v(this);
                        if (!a.childNodes) {
                            a.childNodes = [];
                            for (var b = this.firstChild; b; b = b.nextSibling)
                                a.childNodes.push(b);
                        }
                        var c = a.childNodes;
                    } else c = G.childNodes(this);
                    c.item = function (a) {
                        return c[a];
                    };
                    return c;
                },
                configurable: !0,
            },
            childElementCount: {
                get: function () {
                    return this.children.length;
                },
                configurable: !0,
            },
            firstChild: {
                get: function () {
                    var a = v(this);
                    a = a && a.firstChild;
                    return void 0 !== a ? a : G.firstChild(this);
                },
                configurable: !0,
            },
            lastChild: {
                get: function () {
                    var a = v(this);
                    a = a && a.lastChild;
                    return void 0 !== a ? a : G.lastChild(this);
                },
                configurable: !0,
            },
            textContent: {
                get: function () {
                    if (Pa(this)) {
                        for (
                            var a = [], b = 0, c = this.childNodes, d;
                            (d = c[b]);
                            b++
                        )
                            d.nodeType !== Node.COMMENT_NODE &&
                                a.push(d.textContent);
                        return a.join("");
                    }
                    return G.textContent(this);
                },
                set: function (a) {
                    if ("undefined" === typeof a || null === a) a = "";
                    switch (this.nodeType) {
                        case Node.ELEMENT_NODE:
                        case Node.DOCUMENT_FRAGMENT_NODE:
                            if (!Pa(this) && Xb) {
                                var b = this.firstChild;
                                (b != this.lastChild ||
                                    (b && b.nodeType != Node.TEXT_NODE)) &&
                                    Wb(this);
                                Vb.sa.textContent.set.call(this, a);
                            } else
                                Wb(this),
                                    (0 < a.length ||
                                        this.nodeType === Node.ELEMENT_NODE) &&
                                        this.appendChild(
                                            document.createTextNode(a)
                                        );
                            break;
                        default:
                            this.nodeValue = a;
                    }
                },
                configurable: !0,
            },
            firstElementChild: {
                get: function () {
                    var a = v(this);
                    if (a && void 0 !== a.firstChild) {
                        for (
                            a = this.firstChild;
                            a && a.nodeType !== Node.ELEMENT_NODE;

                        )
                            a = a.nextSibling;
                        return a;
                    }
                    return G.firstElementChild(this);
                },
                configurable: !0,
            },
            lastElementChild: {
                get: function () {
                    var a = v(this);
                    if (a && void 0 !== a.lastChild) {
                        for (
                            a = this.lastChild;
                            a && a.nodeType !== Node.ELEMENT_NODE;

                        )
                            a = a.previousSibling;
                        return a;
                    }
                    return G.lastElementChild(this);
                },
                configurable: !0,
            },
            children: {
                get: function () {
                    return Pa(this)
                        ? bb(
                              Array.prototype.filter.call(
                                  this.childNodes,
                                  function (a) {
                                      return a.nodeType === Node.ELEMENT_NODE;
                                  }
                              )
                          )
                        : G.children(this);
                },
                configurable: !0,
            },
            innerHTML: {
                get: function () {
                    return Pa(this)
                        ? Pb(
                              "template" === this.localName
                                  ? this.content
                                  : this
                          )
                        : G.innerHTML(this);
                },
                set: function (a) {
                    var b = "template" === this.localName ? this.content : this;
                    Wb(b);
                    var c = this.localName || "div";
                    c =
                        this.namespaceURI &&
                        this.namespaceURI !== Yb.namespaceURI
                            ? Yb.createElementNS(this.namespaceURI, c)
                            : Yb.createElement(c);
                    Xb ? Vb.sa.innerHTML.set.call(c, a) : (c.innerHTML = a);
                    for (
                        a = "template" === this.localName ? c.content : c;
                        a.firstChild;

                    )
                        b.appendChild(a.firstChild);
                },
                configurable: !0,
            },
        },
        ec = {
            shadowRoot: {
                get: function () {
                    var a = v(this);
                    return (a && a.ta) || null;
                },
                configurable: !0,
            },
        },
        fc = {
            activeElement: {
                get: function () {
                    var a =
                        ac && ac.get
                            ? ac.get.call(document)
                            : w.w
                            ? void 0
                            : document.activeElement;
                    if (a && a.nodeType) {
                        var b = !!y(this);
                        if (
                            this === document ||
                            (b &&
                                this.host !== a &&
                                z.contains.call(this.host, a))
                        ) {
                            for (b = Qa(a); b && b !== this; )
                                (a = b.host), (b = Qa(a));
                            a =
                                this === document
                                    ? b
                                        ? null
                                        : a
                                    : b === this
                                    ? a
                                    : null;
                        } else a = null;
                    } else a = null;
                    return a;
                },
                set: function () {},
                configurable: !0,
            },
        };
    function H(a, b, c) {
        for (var d in b) {
            var e = Object.getOwnPropertyDescriptor(a, d);
            (e && e.configurable) || (!e && c)
                ? Object.defineProperty(a, d, b[d])
                : c && console.warn("Could not define", d, "on", a);
        }
    }
    function gc(a) {
        H(a, bc);
        H(a, cc);
        H(a, dc);
        H(a, fc);
    }
    function hc() {
        var a = ic.prototype;
        a.__proto__ = DocumentFragment.prototype;
        H(a, bc, !0);
        H(a, dc, !0);
        H(a, fc, !0);
        Object.defineProperties(a, {
            nodeType: { value: Node.DOCUMENT_FRAGMENT_NODE, configurable: !0 },
            nodeName: { value: "#document-fragment", configurable: !0 },
            nodeValue: { value: null, configurable: !0 },
        });
        ["localName", "namespaceURI", "prefix"].forEach(function (b) {
            Object.defineProperty(a, b, { value: void 0, configurable: !0 });
        });
        ["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
            Object.defineProperty(a, b, {
                get: function () {
                    return this.host[b];
                },
                configurable: !0,
            });
        });
    }
    var jc = w.w
            ? function () {}
            : function (a) {
                  var b = u(a);
                  b.oa || ((b.oa = !0), H(a, bc, !0), H(a, cc, !0));
              },
        kc = w.w
            ? function () {}
            : function (a) {
                  u(a).Aa || (H(a, dc, !0), H(a, ec, !0));
              };
    var lc = G.childNodes;
    function mc(a, b, c) {
        kc(b);
        var d = u(b);
        void 0 !== d.firstChild && (d.childNodes = null);
        if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            d = a.childNodes;
            for (var e = 0; e < d.length; e++) nc(d[e], b, c);
            a = u(a);
            b = void 0 !== a.firstChild ? null : void 0;
            a.firstChild = a.lastChild = b;
            a.childNodes = b;
        } else nc(a, b, c);
    }
    function nc(a, b, c) {
        jc(a);
        c = c || null;
        var d = u(a),
            e = u(b),
            f = c ? u(c) : null;
        d.previousSibling = c ? f.previousSibling : b.lastChild;
        if ((f = v(d.previousSibling))) f.nextSibling = a;
        if ((f = v((d.nextSibling = c)))) f.previousSibling = a;
        d.parentNode = b;
        c
            ? c === e.firstChild && (e.firstChild = a)
            : ((e.lastChild = a), e.firstChild || (e.firstChild = a));
        e.childNodes = null;
    }
    function oc(a, b) {
        var c = u(a);
        b = u(b);
        a === b.firstChild && (b.firstChild = c.nextSibling);
        a === b.lastChild && (b.lastChild = c.previousSibling);
        a = c.previousSibling;
        var d = c.nextSibling;
        a && (u(a).nextSibling = d);
        d && (u(d).previousSibling = a);
        c.parentNode = c.previousSibling = c.nextSibling = void 0;
        void 0 !== b.childNodes && (b.childNodes = null);
    }
    function pc(a) {
        var b = u(a);
        if (void 0 === b.firstChild) {
            b.childNodes = null;
            var c = lc(a);
            b.firstChild = c[0] || null;
            b.lastChild = c[c.length - 1] || null;
            kc(a);
            for (b = 0; b < c.length; b++) {
                var d = c[b],
                    e = u(d);
                e.parentNode = a;
                e.nextSibling = c[b + 1] || null;
                e.previousSibling = c[b - 1] || null;
                jc(d);
            }
        }
    }
    var qc = G.parentNode;
    function rc(a, b, c) {
        if (b === a)
            throw Error(
                "Failed to execute 'appendChild' on 'Node': The new child element contains the parent."
            );
        if (c) {
            var d = v(c);
            d = d && d.parentNode;
            if ((void 0 !== d && d !== a) || (void 0 === d && qc(c) !== a))
                throw Error(
                    "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
                );
        }
        if (c === b) return b;
        var e = [],
            f = sc,
            h = Qa(a),
            g = h ? h.host.localName : "";
        if (b.parentNode) {
            var k = tc(b);
            uc(
                b.parentNode,
                b,
                !!h || !(b.getRootNode() instanceof ShadowRoot)
            );
            f = function (a, b) {
                vc() && (wc(a, k), sc(a, b));
            };
        }
        d = !0;
        var l = !xc(b, g);
        !h ||
            (b.__noInsertionPoint && !l) ||
            Ac(b, function (a) {
                "slot" === a.localName && e.push(a);
                l && f(a, g);
            });
        e.length && Bc(h, e);
        ("slot" === a.localName || e.length) && h && Cc(h);
        Pa(a) &&
            (mc(b, a, c),
            (h = v(a)),
            Dc(a) ? (Cc(h.root), (d = !1)) : h.root && (d = !1));
        d
            ? ((d = y(a) ? a.host : a),
              c
                  ? ((c = Ec(c)), z.insertBefore.call(d, b, c))
                  : z.appendChild.call(d, b))
            : b.ownerDocument !== a.ownerDocument &&
              a.ownerDocument.adoptNode(b);
        Fc(a, b);
        return b;
    }
    function uc(a, b, c) {
        c = void 0 === c ? !1 : c;
        if (b.parentNode !== a)
            throw Error(
                "The node to be removed is not a child of this node: " + b
            );
        var d = Qa(b),
            e = v(a);
        if (Pa(a) && (oc(b, a), Dc(a))) {
            Cc(e.root);
            var f = !0;
        }
        if (vc() && !c && d) {
            var h = tc(b);
            Ac(b, function (a) {
                wc(a, h);
            });
        }
        Gc(b);
        if (d) {
            var g = a && "slot" === a.localName;
            g && (f = !0);
            ((c = Hc(d, b)) || g) && Cc(d);
        }
        f ||
            ((f = y(a) ? a.host : a),
            ((!e.root && "slot" !== b.localName) || f === qc(b)) &&
                z.removeChild.call(f, b));
        Fc(a, null, b);
        return b;
    }
    function Gc(a) {
        var b = v(a);
        if (b && void 0 !== b.L) {
            b = a.childNodes;
            for (var c = 0, d = b.length, e = void 0; c < d && (e = b[c]); c++)
                Gc(e);
        }
        if ((a = v(a))) a.L = void 0;
    }
    function Ec(a) {
        var b = a;
        a &&
            "slot" === a.localName &&
            (b =
                (b = (b = v(a)) && b.D) && b.length ? b[0] : Ec(a.nextSibling));
        return b;
    }
    function Dc(a) {
        return (a = (a = v(a)) && a.root) && Ic(a);
    }
    function Jc(a, b) {
        if ("slot" === b) (a = a.parentNode), Dc(a) && Cc(v(a).root);
        else if ("slot" === a.localName && "name" === b && (b = Qa(a))) {
            if (b.g) {
                Kc(b);
                var c = a.Da,
                    d = Lc(a);
                if (d !== c) {
                    c = b.i[c];
                    var e = c.indexOf(a);
                    0 <= e && c.splice(e, 1);
                    c = b.i[d] || (b.i[d] = []);
                    c.push(a);
                    1 < c.length && (b.i[d] = Mc(c));
                }
            }
            Cc(b);
        }
    }
    function Fc(a, b, c) {
        if ((a = (a = v(a)) && a.I))
            b && a.addedNodes.push(b), c && a.removedNodes.push(c), hb(a);
    }
    function Nc(a) {
        if (a && a.nodeType) {
            var b = u(a),
                c = b.L;
            void 0 === c &&
                (y(a)
                    ? ((c = a), (b.L = c))
                    : ((c = (c = a.parentNode) ? Nc(c) : a),
                      z.contains.call(document.documentElement, a) &&
                          (b.L = c)));
            return c;
        }
    }
    function Oc(a, b, c) {
        var d = [];
        Pc(a.childNodes, b, c, d);
        return d;
    }
    function Pc(a, b, c, d) {
        for (var e = 0, f = a.length, h = void 0; e < f && (h = a[e]); e++) {
            var g;
            if ((g = h.nodeType === Node.ELEMENT_NODE)) {
                g = h;
                var k = b,
                    l = c,
                    m = d,
                    p = k(g);
                p && m.push(g);
                l && l(p) ? (g = p) : (Pc(g.childNodes, k, l, m), (g = void 0));
            }
            if (g) break;
        }
    }
    var Qc = null;
    function vc() {
        Qc || (Qc = window.ShadyCSS && window.ShadyCSS.ScopingShim);
        return Qc || null;
    }
    function Rc(a, b, c) {
        var d = vc();
        d && "class" === b
            ? d.setElementClass(a, c)
            : (z.setAttribute.call(a, b, c), Jc(a, b));
    }
    function Sc(a, b) {
        if (a.ownerDocument !== document || "template" === a.localName)
            return z.importNode.call(document, a, b);
        var c = z.importNode.call(document, a, !1);
        if (b) {
            a = a.childNodes;
            b = 0;
            for (var d; b < a.length; b++) (d = Sc(a[b], !0)), c.appendChild(d);
        }
        return c;
    }
    function sc(a, b) {
        var c = vc();
        c && c.scopeNode(a, b);
    }
    function wc(a, b) {
        var c = vc();
        c && c.unscopeNode(a, b);
    }
    function xc(a, b) {
        var c = vc();
        if (!c) return !0;
        if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            c = !0;
            for (var d = 0; c && d < a.childNodes.length; d++)
                c = c && xc(a.childNodes[d], b);
            return c;
        }
        return a.nodeType !== Node.ELEMENT_NODE
            ? !0
            : c.currentScopeForNode(a) === b;
    }
    function tc(a) {
        if (a.nodeType !== Node.ELEMENT_NODE) return "";
        var b = vc();
        return b ? b.currentScopeForNode(a) : "";
    }
    function Ac(a, b) {
        if (a) {
            a.nodeType === Node.ELEMENT_NODE && b(a);
            for (var c = 0, d; c < a.childNodes.length; c++)
                (d = a.childNodes[c]),
                    d.nodeType === Node.ELEMENT_NODE && Ac(d, b);
        }
    }
    var Tc = "__eventWrappers" + Date.now(),
        Uc = (function () {
            var a = Object.getOwnPropertyDescriptor(
                Event.prototype,
                "composed"
            );
            return a
                ? function (b) {
                      return a.get.call(b);
                  }
                : null;
        })(),
        Vc = {
            blur: !0,
            focus: !0,
            focusin: !0,
            focusout: !0,
            click: !0,
            dblclick: !0,
            mousedown: !0,
            mouseenter: !0,
            mouseleave: !0,
            mousemove: !0,
            mouseout: !0,
            mouseover: !0,
            mouseup: !0,
            wheel: !0,
            beforeinput: !0,
            input: !0,
            keydown: !0,
            keyup: !0,
            compositionstart: !0,
            compositionupdate: !0,
            compositionend: !0,
            touchstart: !0,
            touchend: !0,
            touchmove: !0,
            touchcancel: !0,
            pointerover: !0,
            pointerenter: !0,
            pointerdown: !0,
            pointermove: !0,
            pointerup: !0,
            pointercancel: !0,
            pointerout: !0,
            pointerleave: !0,
            gotpointercapture: !0,
            lostpointercapture: !0,
            dragstart: !0,
            drag: !0,
            dragenter: !0,
            dragleave: !0,
            dragover: !0,
            drop: !0,
            dragend: !0,
            DOMActivate: !0,
            DOMFocusIn: !0,
            DOMFocusOut: !0,
            keypress: !0,
        },
        Wc = {
            DOMAttrModified: !0,
            DOMAttributeNameChanged: !0,
            DOMCharacterDataModified: !0,
            DOMElementNameChanged: !0,
            DOMNodeInserted: !0,
            DOMNodeInsertedIntoDocument: !0,
            DOMNodeRemoved: !0,
            DOMNodeRemovedFromDocument: !0,
            DOMSubtreeModified: !0,
        };
    function Xc(a, b) {
        var c = [],
            d = a;
        for (a = a === window ? window : a.getRootNode(); d; )
            c.push(d),
                (d = d.assignedSlot
                    ? d.assignedSlot
                    : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
                      d.host &&
                      (b || d !== a)
                    ? d.host
                    : d.parentNode);
        c[c.length - 1] === document && c.push(window);
        return c;
    }
    function Yc(a, b) {
        if (!y) return a;
        a = Xc(a, !0);
        for (var c = 0, d, e = void 0, f, h = void 0; c < b.length; c++)
            if (
                ((d = b[c]),
                (f = d === window ? window : d.getRootNode()),
                f !== e && ((h = a.indexOf(f)), (e = f)),
                !y(f) || -1 < h)
            )
                return d;
    }
    var Zc = {
        get composed() {
            void 0 === this.O &&
                (Uc
                    ? (this.O =
                          "focusin" === this.type ||
                          "focusout" === this.type ||
                          Uc(this))
                    : !1 !== this.isTrusted && (this.O = Vc[this.type]));
            return this.O || !1;
        },
        composedPath: function () {
            this.na || (this.na = Xc(this.__target, this.composed));
            return this.na;
        },
        get target() {
            return Yc(
                this.currentTarget || this.__previousCurrentTarget,
                this.composedPath()
            );
        },
        get relatedTarget() {
            if (!this.ca) return null;
            this.pa || (this.pa = Xc(this.ca, !0));
            return Yc(
                this.currentTarget || this.__previousCurrentTarget,
                this.pa
            );
        },
        stopPropagation: function () {
            Event.prototype.stopPropagation.call(this);
            this.ba = !0;
        },
        stopImmediatePropagation: function () {
            Event.prototype.stopImmediatePropagation.call(this);
            this.ba = this.za = !0;
        },
    };
    function $c(a) {
        function b(b, d) {
            b = new a(b, d);
            b.O = d && !!d.composed;
            return b;
        }
        Va(b, a);
        b.prototype = a.prototype;
        return b;
    }
    var ad = { focus: !0, blur: !0 };
    function bd(a) {
        return a.__target !== a.target || a.ca !== a.relatedTarget;
    }
    function cd(a, b, c) {
        if (
            (c =
                b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c])
        )
            for (
                var d = 0, e;
                (e = c[d]) &&
                (!bd(a) || a.target !== a.relatedTarget) &&
                (e.call(b, a), !a.za);
                d++
            );
    }
    function dd(a) {
        var b = a.composedPath();
        Object.defineProperty(a, "currentTarget", {
            get: function () {
                return d;
            },
            configurable: !0,
        });
        for (var c = b.length - 1; 0 <= c; c--) {
            var d = b[c];
            cd(a, d, "capture");
            if (a.ba) return;
        }
        Object.defineProperty(a, "eventPhase", {
            get: function () {
                return Event.AT_TARGET;
            },
        });
        var e;
        for (c = 0; c < b.length; c++) {
            d = b[c];
            var f = v(d);
            f = f && f.root;
            if (0 === c || (f && f === e))
                if (
                    (cd(a, d, "bubble"),
                    d !== window && (e = d.getRootNode()),
                    a.ba)
                )
                    break;
        }
    }
    function ed(a, b, c, d, e, f) {
        for (var h = 0; h < a.length; h++) {
            var g = a[h],
                k = g.type,
                l = g.capture,
                m = g.once,
                p = g.passive;
            if (b === g.node && c === k && d === l && e === m && f === p)
                return h;
        }
        return -1;
    }
    function fd(a, b, c) {
        if (b) {
            var d = typeof b;
            if ("function" === d || "object" === d)
                if (
                    "object" !== d ||
                    (b.handleEvent && "function" === typeof b.handleEvent)
                ) {
                    var e = this instanceof Window ? z.eb : z.addEventListener;
                    if (Wc[a]) return e.call(this, a, b, c);
                    if (c && "object" === typeof c) {
                        var f = !!c.capture;
                        var h = !!c.once;
                        var g = !!c.passive;
                    } else (f = !!c), (g = h = !1);
                    var k = (c && c.ea) || this,
                        l = b[Tc];
                    if (l) {
                        if (-1 < ed(l, k, a, f, h, g)) return;
                    } else b[Tc] = [];
                    l = function (e) {
                        h && this.removeEventListener(a, b, c);
                        e.__target || gd(e);
                        if (k !== this) {
                            var f = Object.getOwnPropertyDescriptor(
                                e,
                                "currentTarget"
                            );
                            Object.defineProperty(e, "currentTarget", {
                                get: function () {
                                    return k;
                                },
                                configurable: !0,
                            });
                        }
                        e.__previousCurrentTarget = e.currentTarget;
                        if (!y(k) || -1 != e.composedPath().indexOf(k))
                            if (e.composed || -1 < e.composedPath().indexOf(k))
                                if (bd(e) && e.target === e.relatedTarget)
                                    e.eventPhase === Event.BUBBLING_PHASE &&
                                        e.stopImmediatePropagation();
                                else if (
                                    e.eventPhase === Event.CAPTURING_PHASE ||
                                    e.bubbles ||
                                    e.target === k ||
                                    k instanceof Window
                                ) {
                                    var g =
                                        "function" === d
                                            ? b.call(k, e)
                                            : b.handleEvent && b.handleEvent(e);
                                    k !== this &&
                                        (f
                                            ? (Object.defineProperty(
                                                  e,
                                                  "currentTarget",
                                                  f
                                              ),
                                              (f = null))
                                            : delete e.currentTarget);
                                    return g;
                                }
                    };
                    b[Tc].push({
                        node: k,
                        type: a,
                        capture: f,
                        once: h,
                        passive: g,
                        gb: l,
                    });
                    ad[a]
                        ? ((this.__handlers = this.__handlers || {}),
                          (this.__handlers[a] = this.__handlers[a] || {
                              capture: [],
                              bubble: [],
                          }),
                          this.__handlers[a][f ? "capture" : "bubble"].push(l))
                        : e.call(this, a, l, c);
                }
        }
    }
    function hd(a, b, c) {
        if (b) {
            var d = this instanceof Window ? z.fb : z.removeEventListener;
            if (Wc[a]) return d.call(this, a, b, c);
            if (c && "object" === typeof c) {
                var e = !!c.capture;
                var f = !!c.once;
                var h = !!c.passive;
            } else (e = !!c), (h = f = !1);
            var g = (c && c.ea) || this,
                k = void 0;
            var l = null;
            try {
                l = b[Tc];
            } catch (m) {}
            l &&
                ((f = ed(l, g, a, e, f, h)),
                -1 < f &&
                    ((k = l.splice(f, 1)[0].gb), l.length || (b[Tc] = void 0)));
            d.call(this, a, k || b, c);
            k &&
                ad[a] &&
                this.__handlers &&
                this.__handlers[a] &&
                ((a = this.__handlers[a][e ? "capture" : "bubble"]),
                (k = a.indexOf(k)),
                -1 < k && a.splice(k, 1));
        }
    }
    function id() {
        for (var a in ad)
            window.addEventListener(
                a,
                function (a) {
                    a.__target || (gd(a), dd(a));
                },
                !0
            );
    }
    function gd(a) {
        a.__target = a.target;
        a.ca = a.relatedTarget;
        if (w.w) {
            var b = Object.getPrototypeOf(a);
            if (!b.hasOwnProperty("__patchProto")) {
                var c = Object.create(b);
                c.hb = b;
                Ta(c, Zc);
                b.__patchProto = c;
            }
            a.__proto__ = b.__patchProto;
        } else Ta(a, Zc);
    }
    var jd = $c(window.Event),
        kd = $c(window.CustomEvent),
        ld = $c(window.MouseEvent);
    function md() {
        window.Event = jd;
        window.CustomEvent = kd;
        window.MouseEvent = ld;
        id();
        if (
            !Uc &&
            Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")
        ) {
            var a = function () {
                var a = new MouseEvent("click", {
                    bubbles: !0,
                    cancelable: !0,
                    composed: !0,
                });
                this.dispatchEvent(a);
            };
            Element.prototype.click
                ? (Element.prototype.click = a)
                : HTMLElement.prototype.click &&
                  (HTMLElement.prototype.click = a);
        }
    }
    function nd(a, b) {
        return { index: a, M: [], T: b };
    }
    function od(a, b, c, d) {
        var e = 0,
            f = 0,
            h = 0,
            g = 0,
            k = Math.min(b - e, d - f);
        if (0 == e && 0 == f)
            a: {
                for (h = 0; h < k; h++) if (a[h] !== c[h]) break a;
                h = k;
            }
        if (b == a.length && d == c.length) {
            g = a.length;
            for (var l = c.length, m = 0; m < k - h && pd(a[--g], c[--l]); )
                m++;
            g = m;
        }
        e += h;
        f += h;
        b -= g;
        d -= g;
        if (0 == b - e && 0 == d - f) return [];
        if (e == b) {
            for (b = nd(e, 0); f < d; ) b.M.push(c[f++]);
            return [b];
        }
        if (f == d) return [nd(e, b - e)];
        k = e;
        h = f;
        d = d - h + 1;
        g = b - k + 1;
        b = Array(d);
        for (l = 0; l < d; l++) (b[l] = Array(g)), (b[l][0] = l);
        for (l = 0; l < g; l++) b[0][l] = l;
        for (l = 1; l < d; l++)
            for (m = 1; m < g; m++)
                if (a[k + m - 1] === c[h + l - 1]) b[l][m] = b[l - 1][m - 1];
                else {
                    var p = b[l - 1][m] + 1,
                        x = b[l][m - 1] + 1;
                    b[l][m] = p < x ? p : x;
                }
        k = b.length - 1;
        h = b[0].length - 1;
        d = b[k][h];
        for (a = []; 0 < k || 0 < h; )
            0 == k
                ? (a.push(2), h--)
                : 0 == h
                ? (a.push(3), k--)
                : ((g = b[k - 1][h - 1]),
                  (l = b[k - 1][h]),
                  (m = b[k][h - 1]),
                  (p = l < m ? (l < g ? l : g) : m < g ? m : g),
                  p == g
                      ? (g == d ? a.push(0) : (a.push(1), (d = g)), k--, h--)
                      : p == l
                      ? (a.push(3), k--, (d = l))
                      : (a.push(2), h--, (d = m)));
        a.reverse();
        b = void 0;
        k = [];
        for (h = 0; h < a.length; h++)
            switch (a[h]) {
                case 0:
                    b && (k.push(b), (b = void 0));
                    e++;
                    f++;
                    break;
                case 1:
                    b || (b = nd(e, 0));
                    b.T++;
                    e++;
                    b.M.push(c[f]);
                    f++;
                    break;
                case 2:
                    b || (b = nd(e, 0));
                    b.T++;
                    e++;
                    break;
                case 3:
                    b || (b = nd(e, 0)), b.M.push(c[f]), f++;
            }
        b && k.push(b);
        return k;
    }
    function pd(a, b) {
        return a === b;
    }
    var qd = G.parentNode,
        rd = G.childNodes,
        sd = {},
        td = w.deferConnectionCallbacks && "loading" === document.readyState,
        ud;
    function vd(a) {
        var b = [];
        do b.unshift(a);
        while ((a = a.parentNode));
        return b;
    }
    function ic(a, b, c) {
        if (a !== sd) throw new TypeError("Illegal constructor");
        this.Ga = "ShadyRoot";
        this.host = b;
        this.c = c && c.mode;
        pc(b);
        a = u(b);
        a.root = this;
        a.ta = "closed" !== this.c ? this : null;
        a = u(this);
        a.firstChild =
            a.lastChild =
            a.parentNode =
            a.nextSibling =
            a.previousSibling =
                null;
        a.childNodes = [];
        this.b = this.S = !1;
        this.a = this.i = this.g = null;
        Cc(this);
    }
    function Cc(a) {
        a.S ||
            ((a.S = !0),
            eb(function () {
                return wd(a);
            }));
    }
    function wd(a) {
        for (var b; a; ) {
            a.S && (b = a);
            a: {
                var c = a;
                a = c.host.getRootNode();
                if (y(a))
                    for (var d = c.host.childNodes, e = 0; e < d.length; e++)
                        if (((c = d[e]), "slot" == c.localName)) break a;
                a = void 0;
            }
        }
        b && b._renderRoot();
    }
    ic.prototype._renderRoot = function () {
        var a = td;
        td = !0;
        this.S = !1;
        if (this.g) {
            Kc(this);
            for (var b = 0, c; b < this.g.length; b++) {
                c = this.g[b];
                var d = v(c),
                    e = d.assignedNodes;
                d.assignedNodes = [];
                d.D = [];
                if ((d.ga = e))
                    for (d = 0; d < e.length; d++) {
                        var f = v(e[d]);
                        f.R = f.assignedSlot;
                        f.assignedSlot === c && (f.assignedSlot = null);
                    }
            }
            for (b = this.host.firstChild; b; b = b.nextSibling) xd(this, b);
            for (b = 0; b < this.g.length; b++) {
                c = this.g[b];
                e = v(c);
                if (!e.assignedNodes.length)
                    for (d = c.firstChild; d; d = d.nextSibling) xd(this, d, c);
                (d = (d = v(c.parentNode)) && d.root) &&
                    Ic(d) &&
                    d._renderRoot();
                yd(this, e.D, e.assignedNodes);
                if ((d = e.ga)) {
                    for (f = 0; f < d.length; f++) v(d[f]).R = null;
                    e.ga = null;
                    d.length > e.assignedNodes.length && (e.W = !0);
                }
                e.W && ((e.W = !1), zd(this, c));
            }
            c = this.g;
            b = [];
            for (e = 0; e < c.length; e++)
                (d = c[e].parentNode),
                    ((f = v(d)) && f.root) || !(0 > b.indexOf(d)) || b.push(d);
            for (c = 0; c < b.length; c++) {
                f = b[c];
                e = f === this ? this.host : f;
                d = [];
                f = f.childNodes;
                for (var h = 0; h < f.length; h++) {
                    var g = f[h];
                    if ("slot" == g.localName) {
                        g = v(g).D;
                        for (var k = 0; k < g.length; k++) d.push(g[k]);
                    } else d.push(g);
                }
                f = rd(e);
                h = od(d, d.length, f, f.length);
                k = g = 0;
                for (var l = void 0; g < h.length && (l = h[g]); g++) {
                    for (
                        var m = 0, p = void 0;
                        m < l.M.length && (p = l.M[m]);
                        m++
                    )
                        qd(p) === e && z.removeChild.call(e, p),
                            f.splice(l.index + k, 1);
                    k -= l.T;
                }
                k = 0;
                for (l = void 0; k < h.length && (l = h[k]); k++)
                    for (g = f[l.index], m = l.index; m < l.index + l.T; m++)
                        (p = d[m]),
                            z.insertBefore.call(e, p, g),
                            f.splice(m, 0, p);
            }
        }
        if (!this.b)
            for (b = this.host.childNodes, c = 0, e = b.length; c < e; c++)
                (d = b[c]),
                    (f = v(d)),
                    qd(d) !== this.host ||
                        ("slot" !== d.localName && f.assignedSlot) ||
                        z.removeChild.call(this.host, d);
        this.b = !0;
        td = a;
        ud && ud();
    };
    function xd(a, b, c) {
        var d = u(b),
            e = d.R;
        d.R = null;
        c || (c = (a = a.i[b.slot || "__catchall"]) && a[0]);
        c
            ? (u(c).assignedNodes.push(b), (d.assignedSlot = c))
            : (d.assignedSlot = void 0);
        e !== d.assignedSlot && d.assignedSlot && (u(d.assignedSlot).W = !0);
    }
    function yd(a, b, c) {
        for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++)
            if ("slot" == e.localName) {
                var f = v(e).assignedNodes;
                f && f.length && yd(a, b, f);
            } else b.push(c[d]);
    }
    function zd(a, b) {
        z.dispatchEvent.call(b, new Event("slotchange"));
        b = v(b);
        b.assignedSlot && zd(a, b.assignedSlot);
    }
    function Bc(a, b) {
        a.a = a.a || [];
        a.g = a.g || [];
        a.i = a.i || {};
        a.a.push.apply(a.a, b instanceof Array ? b : ka(ja(b)));
    }
    function Kc(a) {
        if (a.a && a.a.length) {
            for (var b = a.a, c, d = 0; d < b.length; d++) {
                var e = b[d];
                pc(e);
                pc(e.parentNode);
                var f = Lc(e);
                a.i[f]
                    ? ((c = c || {}), (c[f] = !0), a.i[f].push(e))
                    : (a.i[f] = [e]);
                a.g.push(e);
            }
            if (c) for (var h in c) a.i[h] = Mc(a.i[h]);
            a.a = [];
        }
    }
    function Lc(a) {
        var b = a.name || a.getAttribute("name") || "__catchall";
        return (a.Da = b);
    }
    function Mc(a) {
        return a.sort(function (a, c) {
            a = vd(a);
            for (var b = vd(c), e = 0; e < a.length; e++) {
                c = a[e];
                var f = b[e];
                if (c !== f)
                    return (
                        (a = Array.from(c.parentNode.childNodes)),
                        a.indexOf(c) - a.indexOf(f)
                    );
            }
        });
    }
    function Hc(a, b) {
        if (a.g) {
            Kc(a);
            var c = a.i,
                d;
            for (d in c)
                for (var e = c[d], f = 0; f < e.length; f++) {
                    var h = e[f];
                    if (ab(b, h)) {
                        e.splice(f, 1);
                        var g = a.g.indexOf(h);
                        0 <= g && a.g.splice(g, 1);
                        f--;
                        h = v(h);
                        if ((g = h.D))
                            for (var k = 0; k < g.length; k++) {
                                var l = g[k],
                                    m = qd(l);
                                m && z.removeChild.call(m, l);
                            }
                        h.D = [];
                        h.assignedNodes = [];
                        g = !0;
                    }
                }
            return g;
        }
    }
    function Ic(a) {
        Kc(a);
        return !(!a.g || !a.g.length);
    }
    if (window.customElements && w.ia) {
        var Ad = new Map();
        ud = function () {
            var a = Array.from(Ad);
            Ad.clear();
            a = ja(a);
            for (var b = a.next(); !b.done; b = a.next()) {
                b = ja(b.value);
                var c = b.next().value;
                b.next().value ? c.Ba() : c.Ca();
            }
        };
        td &&
            document.addEventListener(
                "readystatechange",
                function () {
                    td = !1;
                    ud();
                },
                { once: !0 }
            );
        var Bd = function (a, b, c) {
                var d = 0,
                    e = "__isConnected" + d++;
                if (b || c)
                    (a.prototype.connectedCallback = a.prototype.Ba =
                        function () {
                            td
                                ? Ad.set(this, !0)
                                : this[e] ||
                                  ((this[e] = !0), b && b.call(this));
                        }),
                        (a.prototype.disconnectedCallback = a.prototype.Ca =
                            function () {
                                td
                                    ? this.isConnected || Ad.set(this, !1)
                                    : this[e] &&
                                      ((this[e] = !1), c && c.call(this));
                            });
                return a;
            },
            Cd = window.customElements.define;
        Object.defineProperty(
            window.CustomElementRegistry.prototype,
            "define",
            {
                value: function (a, b) {
                    var c = b.prototype.connectedCallback,
                        d = b.prototype.disconnectedCallback;
                    Cd.call(window.customElements, a, Bd(b, c, d));
                    b.prototype.connectedCallback = c;
                    b.prototype.disconnectedCallback = d;
                },
            }
        );
    }
    function Dd(a) {
        var b = a.getRootNode();
        y(b) && wd(b);
        return ((a = v(a)) && a.assignedSlot) || null;
    }
    var Ed = {
            addEventListener: fd.bind(window),
            removeEventListener: hd.bind(window),
        },
        Fd = {
            addEventListener: fd,
            removeEventListener: hd,
            appendChild: function (a) {
                return rc(this, a);
            },
            insertBefore: function (a, b) {
                return rc(this, a, b);
            },
            removeChild: function (a) {
                return uc(this, a);
            },
            replaceChild: function (a, b) {
                rc(this, a, b);
                uc(this, b);
                return a;
            },
            cloneNode: function (a) {
                if ("template" == this.localName)
                    var b = z.cloneNode.call(this, a);
                else if (
                    ((b = z.cloneNode.call(this, !1)),
                    a && b.nodeType !== Node.ATTRIBUTE_NODE)
                ) {
                    a = this.childNodes;
                    for (var c = 0, d; c < a.length; c++)
                        (d = a[c].cloneNode(!0)), b.appendChild(d);
                }
                return b;
            },
            getRootNode: function () {
                return Nc(this);
            },
            contains: function (a) {
                return ab(this, a);
            },
            dispatchEvent: function (a) {
                fb();
                return z.dispatchEvent.call(this, a);
            },
        };
    Object.defineProperties(Fd, {
        isConnected: {
            get: function () {
                if ($b && $b.call(this)) return !0;
                if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
                var a = this.ownerDocument;
                if ($a) {
                    if (z.contains.call(a, this)) return !0;
                } else if (
                    a.documentElement &&
                    z.contains.call(a.documentElement, this)
                )
                    return !0;
                for (a = this; a && !(a instanceof Document); )
                    a = a.parentNode || (y(a) ? a.host : void 0);
                return !!(a && a instanceof Document);
            },
            configurable: !0,
        },
    });
    var Gd = {
            get assignedSlot() {
                return Dd(this);
            },
        },
        Hd = {
            querySelector: function (a) {
                return (
                    Oc(
                        this,
                        function (b) {
                            return Sa.call(b, a);
                        },
                        function (a) {
                            return !!a;
                        }
                    )[0] || null
                );
            },
            querySelectorAll: function (a, b) {
                if (b) {
                    b = Array.prototype.slice.call(
                        z.querySelectorAll.call(this, a)
                    );
                    var c = this.getRootNode();
                    return b.filter(function (a) {
                        return a.getRootNode() == c;
                    });
                }
                return Oc(this, function (b) {
                    return Sa.call(b, a);
                });
            },
        },
        Id = {
            assignedNodes: function (a) {
                if ("slot" === this.localName) {
                    var b = this.getRootNode();
                    y(b) && wd(b);
                    return (b = v(this))
                        ? (a && a.flatten ? b.D : b.assignedNodes) || []
                        : [];
                }
            },
        },
        Jd = Ua(
            {
                setAttribute: function (a, b) {
                    Rc(this, a, b);
                },
                removeAttribute: function (a) {
                    z.removeAttribute.call(this, a);
                    Jc(this, a);
                },
                attachShadow: function (a) {
                    if (!this) throw "Must provide a host.";
                    if (!a) throw "Not enough arguments.";
                    return new ic(sd, this, a);
                },
                get slot() {
                    return this.getAttribute("slot");
                },
                set slot(a) {
                    Rc(this, "slot", a);
                },
                get assignedSlot() {
                    return Dd(this);
                },
            },
            Hd,
            Id
        );
    Object.defineProperties(Jd, ec);
    var Kd = Ua(
        {
            importNode: function (a, b) {
                return Sc(a, b);
            },
            getElementById: function (a) {
                return (
                    Oc(
                        this,
                        function (b) {
                            return b.id == a;
                        },
                        function (a) {
                            return !!a;
                        }
                    )[0] || null
                );
            },
        },
        Hd
    );
    Object.defineProperties(Kd, { _activeElement: fc.activeElement });
    for (
        var Ld = HTMLElement.prototype.blur,
            Md = {
                blur: function () {
                    var a = v(this);
                    (a = (a = a && a.root) && a.activeElement)
                        ? a.blur()
                        : Ld.call(this);
                },
            },
            Nd = {},
            Od = ja(Object.getOwnPropertyNames(Document.prototype)),
            Pd = Od.next();
        !Pd.done;
        Nd = { s: Nd.s }, Pd = Od.next()
    )
        (Nd.s = Pd.value),
            "on" === Nd.s.substring(0, 2) &&
                Object.defineProperty(Md, Nd.s, {
                    set: (function (a) {
                        return function (b) {
                            var c = u(this),
                                d = a.s.substring(2);
                            c.P[a.s] && this.removeEventListener(d, c.P[a.s]);
                            this.addEventListener(d, b, {});
                            c.P[a.s] = b;
                        };
                    })(Nd),
                    get: (function (a) {
                        return function () {
                            var b = v(this);
                            return b && b.P[a.s];
                        };
                    })(Nd),
                    configurable: !0,
                });
    var Qd = {
        addEventListener: function (a, b, c) {
            "object" !== typeof c && (c = { capture: !!c });
            c.ea = this;
            this.host.addEventListener(a, b, c);
        },
        removeEventListener: function (a, b, c) {
            "object" !== typeof c && (c = { capture: !!c });
            c.ea = this;
            this.host.removeEventListener(a, b, c);
        },
        getElementById: function (a) {
            return (
                Oc(
                    this,
                    function (b) {
                        return b.id == a;
                    },
                    function (a) {
                        return !!a;
                    }
                )[0] || null
            );
        },
    };
    function I(a, b) {
        for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
            var e = c[d],
                f = Object.getOwnPropertyDescriptor(b, e);
            f.value ? (a[e] = f.value) : Object.defineProperty(a, e, f);
        }
    }
    if (w.ia) {
        var ShadyDOM = {
            inUse: w.ia,
            patch: function (a) {
                kc(a);
                jc(a);
                return a;
            },
            isShadyRoot: y,
            enqueue: eb,
            flush: fb,
            settings: w,
            filterMutations: ob,
            observeChildren: ib,
            unobserveChildren: nb,
            nativeMethods: z,
            nativeTree: G,
            deferConnectionCallbacks: w.deferConnectionCallbacks,
            handlesDynamicScoping: !0,
        };
        window.ShadyDOM = ShadyDOM;
        md();
        var Rd =
            (window.customElements &&
                window.customElements.nativeHTMLElement) ||
            HTMLElement;
        I(ic.prototype, Qd);
        I(window.Node.prototype, Fd);
        I(window.Window.prototype, Ed);
        I(window.Text.prototype, Gd);
        I(window.DocumentFragment.prototype, Hd);
        I(window.Element.prototype, Jd);
        I(window.Document.prototype, Kd);
        window.HTMLSlotElement && I(window.HTMLSlotElement.prototype, Id);
        I(Rd.prototype, Md);
        w.w &&
            (gc(window.Node.prototype),
            gc(window.Text.prototype),
            gc(window.DocumentFragment.prototype),
            gc(window.Element.prototype),
            gc(Rd.prototype),
            gc(window.Document.prototype),
            window.HTMLSlotElement && gc(window.HTMLSlotElement.prototype));
        hc();
        window.ShadowRoot = ic;
    }
    var Sd = new Set(
        "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(
            " "
        )
    );
    function Td(a) {
        var b = Sd.has(a);
        a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
        return !b && a;
    }
    function J(a) {
        var b = a.isConnected;
        if (void 0 !== b) return b;
        for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
            a =
                a.parentNode ||
                (window.ShadowRoot && a instanceof ShadowRoot
                    ? a.host
                    : void 0);
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }
    function Ud(a, b) {
        for (; b && b !== a && !b.nextSibling; ) b = b.parentNode;
        return b && b !== a ? b.nextSibling : null;
    }
    function Vd(a, b, c) {
        c = void 0 === c ? new Set() : c;
        for (var d = a; d; ) {
            if (d.nodeType === Node.ELEMENT_NODE) {
                var e = d;
                b(e);
                var f = e.localName;
                if ("link" === f && "import" === e.getAttribute("rel")) {
                    d = e.import;
                    if (d instanceof Node && !c.has(d))
                        for (c.add(d), d = d.firstChild; d; d = d.nextSibling)
                            Vd(d, b, c);
                    d = Ud(a, e);
                    continue;
                } else if ("template" === f) {
                    d = Ud(a, e);
                    continue;
                }
                if ((e = e.__CE_shadowRoot))
                    for (e = e.firstChild; e; e = e.nextSibling) Vd(e, b, c);
            }
            d = d.firstChild ? d.firstChild : Ud(a, d);
        }
    }
    function K(a, b, c) {
        a[b] = c;
    }
    function Wd() {
        this.a = new Map();
        this.h = new Map();
        this.f = [];
        this.c = !1;
    }
    function Xd(a, b, c) {
        a.a.set(b, c);
        a.h.set(c.constructor, c);
    }
    function Yd(a, b) {
        a.c = !0;
        a.f.push(b);
    }
    function Zd(a, b) {
        a.c &&
            Vd(b, function (b) {
                return a.b(b);
            });
    }
    Wd.prototype.b = function (a) {
        if (this.c && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var b = 0; b < this.f.length; b++) this.f[b](a);
        }
    };
    function L(a, b) {
        var c = [];
        Vd(b, function (a) {
            return c.push(a);
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state ? a.connectedCallback(d) : $d(a, d);
        }
    }
    function M(a, b) {
        var c = [];
        Vd(b, function (a) {
            return c.push(a);
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state && a.disconnectedCallback(d);
        }
    }
    function O(a, b, c) {
        c = void 0 === c ? {} : c;
        var d = c.cb || new Set(),
            e =
                c.$ ||
                function (b) {
                    return $d(a, b);
                },
            f = [];
        Vd(
            b,
            function (b) {
                if (
                    "link" === b.localName &&
                    "import" === b.getAttribute("rel")
                ) {
                    var c = b.import;
                    c instanceof Node &&
                        ((c.__CE_isImportDocument = !0),
                        (c.__CE_hasRegistry = !0));
                    c && "complete" === c.readyState
                        ? (c.__CE_documentLoadHandled = !0)
                        : b.addEventListener("load", function () {
                              var c = b.import;
                              if (!c.__CE_documentLoadHandled) {
                                  c.__CE_documentLoadHandled = !0;
                                  var f = new Set(d);
                                  f.delete(c);
                                  O(a, c, { cb: f, $: e });
                              }
                          });
                } else f.push(b);
            },
            d
        );
        if (a.c) for (b = 0; b < f.length; b++) a.b(f[b]);
        for (b = 0; b < f.length; b++) e(f[b]);
    }
    function $d(a, b) {
        if (void 0 === b.__CE_state) {
            var c = b.ownerDocument;
            if (
                c.defaultView ||
                (c.__CE_isImportDocument && c.__CE_hasRegistry)
            )
                if ((c = a.a.get(b.localName))) {
                    c.constructionStack.push(b);
                    var d = c.constructor;
                    try {
                        try {
                            if (new d() !== b)
                                throw Error(
                                    "The custom element constructor did not produce the element being upgraded."
                                );
                        } finally {
                            c.constructionStack.pop();
                        }
                    } catch (h) {
                        throw ((b.__CE_state = 2), h);
                    }
                    b.__CE_state = 1;
                    b.__CE_definition = c;
                    if (c.attributeChangedCallback)
                        for (
                            c = c.observedAttributes, d = 0;
                            d < c.length;
                            d++
                        ) {
                            var e = c[d],
                                f = b.getAttribute(e);
                            null !== f &&
                                a.attributeChangedCallback(b, e, null, f, null);
                        }
                    J(b) && a.connectedCallback(b);
                }
        }
    }
    Wd.prototype.connectedCallback = function (a) {
        var b = a.__CE_definition;
        b.connectedCallback && b.connectedCallback.call(a);
    };
    Wd.prototype.disconnectedCallback = function (a) {
        var b = a.__CE_definition;
        b.disconnectedCallback && b.disconnectedCallback.call(a);
    };
    Wd.prototype.attributeChangedCallback = function (a, b, c, d, e) {
        var f = a.__CE_definition;
        f.attributeChangedCallback &&
            -1 < f.observedAttributes.indexOf(b) &&
            f.attributeChangedCallback.call(a, b, c, d, e);
    };
    function ae(a) {
        var b = document;
        this.b = a;
        this.a = b;
        this.G = void 0;
        O(this.b, this.a);
        "loading" === this.a.readyState &&
            ((this.G = new MutationObserver(this.c.bind(this))),
            this.G.observe(this.a, { childList: !0, subtree: !0 }));
    }
    function be(a) {
        a.G && a.G.disconnect();
    }
    ae.prototype.c = function (a) {
        var b = this.a.readyState;
        ("interactive" !== b && "complete" !== b) || be(this);
        for (b = 0; b < a.length; b++)
            for (var c = a[b].addedNodes, d = 0; d < c.length; d++)
                O(this.b, c[d]);
    };
    function ce() {
        var a = this;
        this.a = this.j = void 0;
        this.b = new Promise(function (b) {
            a.a = b;
            a.j && b(a.j);
        });
    }
    ce.prototype.resolve = function (a) {
        if (this.j) throw Error("Already resolved.");
        this.j = a;
        this.a && this.a(a);
    };
    function P(a) {
        this.c = !1;
        this.a = a;
        this.o = new Map();
        this.f = function (a) {
            return a();
        };
        this.b = !1;
        this.h = [];
        this.ha = new ae(a);
    }
    n = P.prototype;
    n.xa = function (a, b) {
        var c = this;
        if (!(b instanceof Function))
            throw new TypeError(
                "Custom element constructors must be functions."
            );
        if (!Td(a))
            throw new SyntaxError("The element name '" + a + "' is not valid.");
        if (this.a.a.get(a))
            throw Error(
                "A custom element with name '" +
                    a +
                    "' has already been defined."
            );
        if (this.c) throw Error("A custom element is already being defined.");
        this.c = !0;
        try {
            var d = function (a) {
                    var b = e[a];
                    if (void 0 !== b && !(b instanceof Function))
                        throw Error(
                            "The '" + a + "' callback must be a function."
                        );
                    return b;
                },
                e = b.prototype;
            if (!(e instanceof Object))
                throw new TypeError(
                    "The custom element constructor's prototype is not an object."
                );
            var f = d("connectedCallback");
            var h = d("disconnectedCallback");
            var g = d("adoptedCallback");
            var k = d("attributeChangedCallback");
            var l = b.observedAttributes || [];
        } catch (m) {
            return;
        } finally {
            this.c = !1;
        }
        b = {
            localName: a,
            constructor: b,
            connectedCallback: f,
            disconnectedCallback: h,
            adoptedCallback: g,
            attributeChangedCallback: k,
            observedAttributes: l,
            constructionStack: [],
        };
        Xd(this.a, a, b);
        this.h.push(b);
        this.b ||
            ((this.b = !0),
            this.f(function () {
                return de(c);
            }));
    };
    n.$ = function (a) {
        O(this.a, a);
    };
    function de(a) {
        if (!1 !== a.b) {
            a.b = !1;
            for (var b = a.h, c = [], d = new Map(), e = 0; e < b.length; e++)
                d.set(b[e].localName, []);
            O(a.a, document, {
                $: function (b) {
                    if (void 0 === b.__CE_state) {
                        var e = b.localName,
                            f = d.get(e);
                        f ? f.push(b) : a.a.a.get(e) && c.push(b);
                    }
                },
            });
            for (e = 0; e < c.length; e++) $d(a.a, c[e]);
            for (; 0 < b.length; ) {
                var f = b.shift();
                e = f.localName;
                f = d.get(f.localName);
                for (var h = 0; h < f.length; h++) $d(a.a, f[h]);
                (e = a.o.get(e)) && e.resolve(void 0);
            }
        }
    }
    n.get = function (a) {
        if ((a = this.a.a.get(a))) return a.constructor;
    };
    n.ya = function (a) {
        if (!Td(a))
            return Promise.reject(
                new SyntaxError(
                    "'" + a + "' is not a valid custom element name."
                )
            );
        var b = this.o.get(a);
        if (b) return b.b;
        b = new ce();
        this.o.set(a, b);
        this.a.a.get(a) &&
            !this.h.some(function (b) {
                return b.localName === a;
            }) &&
            b.resolve(void 0);
        return b.b;
    };
    n.Wa = function (a) {
        be(this.ha);
        var b = this.f;
        this.f = function (c) {
            return a(function () {
                return b(c);
            });
        };
    };
    window.CustomElementRegistry = P;
    P.prototype.define = P.prototype.xa;
    P.prototype.upgrade = P.prototype.$;
    P.prototype.get = P.prototype.get;
    P.prototype.whenDefined = P.prototype.ya;
    P.prototype.polyfillWrapFlushCallback = P.prototype.Wa;
    var ee = window.Document.prototype.createElement,
        fe = window.Document.prototype.createElementNS,
        ge = window.Document.prototype.importNode,
        he = window.Document.prototype.prepend,
        ie = window.Document.prototype.append,
        je = window.DocumentFragment.prototype.prepend,
        ke = window.DocumentFragment.prototype.append,
        le = window.Node.prototype.cloneNode,
        me = window.Node.prototype.appendChild,
        ne = window.Node.prototype.insertBefore,
        oe = window.Node.prototype.removeChild,
        pe = window.Node.prototype.replaceChild,
        qe = Object.getOwnPropertyDescriptor(
            window.Node.prototype,
            "textContent"
        ),
        re = window.Element.prototype.attachShadow,
        se = Object.getOwnPropertyDescriptor(
            window.Element.prototype,
            "innerHTML"
        ),
        te = window.Element.prototype.getAttribute,
        ue = window.Element.prototype.setAttribute,
        ve = window.Element.prototype.removeAttribute,
        we = window.Element.prototype.getAttributeNS,
        xe = window.Element.prototype.setAttributeNS,
        ye = window.Element.prototype.removeAttributeNS,
        ze = window.Element.prototype.insertAdjacentElement,
        Ae = window.Element.prototype.insertAdjacentHTML,
        Be = window.Element.prototype.prepend,
        Ce = window.Element.prototype.append,
        De = window.Element.prototype.before,
        Ee = window.Element.prototype.after,
        Fe = window.Element.prototype.replaceWith,
        Ge = window.Element.prototype.remove,
        He = window.HTMLElement,
        Ie = Object.getOwnPropertyDescriptor(
            window.HTMLElement.prototype,
            "innerHTML"
        ),
        Je = window.HTMLElement.prototype.insertAdjacentElement,
        Ke = window.HTMLElement.prototype.insertAdjacentHTML;
    var Le = new (function () {})();
    function Me() {
        var a = Ne;
        window.HTMLElement = (function () {
            function b() {
                var b = this.constructor,
                    d = a.h.get(b);
                if (!d)
                    throw Error(
                        "The custom element being constructed was not registered with `customElements`."
                    );
                var e = d.constructionStack;
                if (0 === e.length)
                    return (
                        (e = ee.call(document, d.localName)),
                        Object.setPrototypeOf(e, b.prototype),
                        (e.__CE_state = 1),
                        (e.__CE_definition = d),
                        a.b(e),
                        e
                    );
                d = e.length - 1;
                var f = e[d];
                if (f === Le)
                    throw Error(
                        "The HTMLElement constructor was either called reentrantly for this constructor or called multiple times."
                    );
                e[d] = Le;
                Object.setPrototypeOf(f, b.prototype);
                a.b(f);
                return f;
            }
            b.prototype = He.prototype;
            Object.defineProperty(b.prototype, "constructor", {
                writable: !0,
                configurable: !0,
                enumerable: !1,
                value: b,
            });
            return b;
        })();
    }
    function Oe(a, b, c) {
        function d(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e)
                    d[e] = arguments[e];
                e = [];
                for (var f = [], l = 0; l < d.length; l++) {
                    var m = d[l];
                    m instanceof Element && J(m) && f.push(m);
                    if (m instanceof DocumentFragment)
                        for (m = m.firstChild; m; m = m.nextSibling) e.push(m);
                    else e.push(m);
                }
                b.apply(this, d);
                for (d = 0; d < f.length; d++) M(a, f[d]);
                if (J(this))
                    for (d = 0; d < e.length; d++)
                        (f = e[d]), f instanceof Element && L(a, f);
            };
        }
        void 0 !== c.Y && (b.prepend = d(c.Y));
        void 0 !== c.append && (b.append = d(c.append));
    }
    function Pe() {
        var a = Ne;
        K(Document.prototype, "createElement", function (b) {
            if (this.__CE_hasRegistry) {
                var c = a.a.get(b);
                if (c) return new c.constructor();
            }
            b = ee.call(this, b);
            a.b(b);
            return b;
        });
        K(Document.prototype, "importNode", function (b, c) {
            b = ge.call(this, b, c);
            this.__CE_hasRegistry ? O(a, b) : Zd(a, b);
            return b;
        });
        K(Document.prototype, "createElementNS", function (b, c) {
            if (
                this.__CE_hasRegistry &&
                (null === b || "http://www.w3.org/1999/xhtml" === b)
            ) {
                var d = a.a.get(c);
                if (d) return new d.constructor();
            }
            b = fe.call(this, b, c);
            a.b(b);
            return b;
        });
        Oe(a, Document.prototype, { Y: he, append: ie });
    }
    function Qe() {
        function a(a, d) {
            Object.defineProperty(a, "textContent", {
                enumerable: d.enumerable,
                configurable: !0,
                get: d.get,
                set: function (a) {
                    if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a);
                    else {
                        var c = void 0;
                        if (this.firstChild) {
                            var e = this.childNodes,
                                g = e.length;
                            if (0 < g && J(this)) {
                                c = Array(g);
                                for (var k = 0; k < g; k++) c[k] = e[k];
                            }
                        }
                        d.set.call(this, a);
                        if (c) for (a = 0; a < c.length; a++) M(b, c[a]);
                    }
                },
            });
        }
        var b = Ne;
        K(Node.prototype, "insertBefore", function (a, d) {
            if (a instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(a.childNodes);
                a = ne.call(this, a, d);
                if (J(this)) for (d = 0; d < c.length; d++) L(b, c[d]);
                return a;
            }
            c = J(a);
            d = ne.call(this, a, d);
            c && M(b, a);
            J(this) && L(b, a);
            return d;
        });
        K(Node.prototype, "appendChild", function (a) {
            if (a instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(a.childNodes);
                a = me.call(this, a);
                if (J(this)) for (var e = 0; e < c.length; e++) L(b, c[e]);
                return a;
            }
            c = J(a);
            e = me.call(this, a);
            c && M(b, a);
            J(this) && L(b, a);
            return e;
        });
        K(Node.prototype, "cloneNode", function (a) {
            a = le.call(this, a);
            this.ownerDocument.__CE_hasRegistry ? O(b, a) : Zd(b, a);
            return a;
        });
        K(Node.prototype, "removeChild", function (a) {
            var c = J(a),
                e = oe.call(this, a);
            c && M(b, a);
            return e;
        });
        K(Node.prototype, "replaceChild", function (a, d) {
            if (a instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(a.childNodes);
                a = pe.call(this, a, d);
                if (J(this)) for (M(b, d), d = 0; d < c.length; d++) L(b, c[d]);
                return a;
            }
            c = J(a);
            var f = pe.call(this, a, d),
                h = J(this);
            h && M(b, d);
            c && M(b, a);
            h && L(b, a);
            return f;
        });
        qe && qe.get
            ? a(Node.prototype, qe)
            : Yd(b, function (b) {
                  a(b, {
                      enumerable: !0,
                      configurable: !0,
                      get: function () {
                          for (
                              var a = [], b = 0;
                              b < this.childNodes.length;
                              b++
                          )
                              a.push(this.childNodes[b].textContent);
                          return a.join("");
                      },
                      set: function (a) {
                          for (; this.firstChild; )
                              oe.call(this, this.firstChild);
                          me.call(this, document.createTextNode(a));
                      },
                  });
              });
    }
    function Re(a) {
        function b(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e)
                    d[e] = arguments[e];
                e = [];
                for (var g = [], k = 0; k < d.length; k++) {
                    var l = d[k];
                    l instanceof Element && J(l) && g.push(l);
                    if (l instanceof DocumentFragment)
                        for (l = l.firstChild; l; l = l.nextSibling) e.push(l);
                    else e.push(l);
                }
                b.apply(this, d);
                for (d = 0; d < g.length; d++) M(a, g[d]);
                if (J(this))
                    for (d = 0; d < e.length; d++)
                        (g = e[d]), g instanceof Element && L(a, g);
            };
        }
        var c = Element.prototype;
        void 0 !== De && (c.before = b(De));
        void 0 !== De && (c.after = b(Ee));
        void 0 !== Fe &&
            K(c, "replaceWith", function (b) {
                for (var c = [], d = 0; d < arguments.length; ++d)
                    c[d] = arguments[d];
                d = [];
                for (var h = [], g = 0; g < c.length; g++) {
                    var k = c[g];
                    k instanceof Element && J(k) && h.push(k);
                    if (k instanceof DocumentFragment)
                        for (k = k.firstChild; k; k = k.nextSibling) d.push(k);
                    else d.push(k);
                }
                g = J(this);
                Fe.apply(this, c);
                for (c = 0; c < h.length; c++) M(a, h[c]);
                if (g)
                    for (M(a, this), c = 0; c < d.length; c++)
                        (h = d[c]), h instanceof Element && L(a, h);
            });
        void 0 !== Ge &&
            K(c, "remove", function () {
                var b = J(this);
                Ge.call(this);
                b && M(a, this);
            });
    }
    function Se() {
        function a(a, b) {
            Object.defineProperty(a, "innerHTML", {
                enumerable: b.enumerable,
                configurable: !0,
                get: b.get,
                set: function (a) {
                    var c = this,
                        e = void 0;
                    J(this) &&
                        ((e = []),
                        Vd(this, function (a) {
                            a !== c && e.push(a);
                        }));
                    b.set.call(this, a);
                    if (e)
                        for (var f = 0; f < e.length; f++) {
                            var h = e[f];
                            1 === h.__CE_state && d.disconnectedCallback(h);
                        }
                    this.ownerDocument.__CE_hasRegistry
                        ? O(d, this)
                        : Zd(d, this);
                    return a;
                },
            });
        }
        function b(a, b) {
            K(a, "insertAdjacentElement", function (a, c) {
                var e = J(c);
                a = b.call(this, a, c);
                e && M(d, c);
                J(a) && L(d, c);
                return a;
            });
        }
        function c(a, b) {
            function c(a, b) {
                for (var c = []; a !== b; a = a.nextSibling) c.push(a);
                for (b = 0; b < c.length; b++) O(d, c[b]);
            }
            K(a, "insertAdjacentHTML", function (a, d) {
                a = a.toLowerCase();
                if ("beforebegin" === a) {
                    var e = this.previousSibling;
                    b.call(this, a, d);
                    c(e || this.parentNode.firstChild, this);
                } else if ("afterbegin" === a)
                    (e = this.firstChild),
                        b.call(this, a, d),
                        c(this.firstChild, e);
                else if ("beforeend" === a)
                    (e = this.lastChild),
                        b.call(this, a, d),
                        c(e || this.firstChild, null);
                else if ("afterend" === a)
                    (e = this.nextSibling),
                        b.call(this, a, d),
                        c(this.nextSibling, e);
                else
                    throw new SyntaxError(
                        "The value provided (" +
                            String(a) +
                            ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
                    );
            });
        }
        var d = Ne;
        re &&
            K(Element.prototype, "attachShadow", function (a) {
                return (this.__CE_shadowRoot = a = re.call(this, a));
            });
        se && se.get
            ? a(Element.prototype, se)
            : Ie && Ie.get
            ? a(HTMLElement.prototype, Ie)
            : Yd(d, function (b) {
                  a(b, {
                      enumerable: !0,
                      configurable: !0,
                      get: function () {
                          return le.call(this, !0).innerHTML;
                      },
                      set: function (a) {
                          var b = "template" === this.localName,
                              c = b ? this.content : this,
                              d = fe.call(
                                  document,
                                  this.namespaceURI,
                                  this.localName
                              );
                          for (d.innerHTML = a; 0 < c.childNodes.length; )
                              oe.call(c, c.childNodes[0]);
                          for (a = b ? d.content : d; 0 < a.childNodes.length; )
                              me.call(c, a.childNodes[0]);
                      },
                  });
              });
        K(Element.prototype, "setAttribute", function (a, b) {
            if (1 !== this.__CE_state) return ue.call(this, a, b);
            var c = te.call(this, a);
            ue.call(this, a, b);
            b = te.call(this, a);
            d.attributeChangedCallback(this, a, c, b, null);
        });
        K(Element.prototype, "setAttributeNS", function (a, b, c) {
            if (1 !== this.__CE_state) return xe.call(this, a, b, c);
            var e = we.call(this, a, b);
            xe.call(this, a, b, c);
            c = we.call(this, a, b);
            d.attributeChangedCallback(this, b, e, c, a);
        });
        K(Element.prototype, "removeAttribute", function (a) {
            if (1 !== this.__CE_state) return ve.call(this, a);
            var b = te.call(this, a);
            ve.call(this, a);
            null !== b && d.attributeChangedCallback(this, a, b, null, null);
        });
        K(Element.prototype, "removeAttributeNS", function (a, b) {
            if (1 !== this.__CE_state) return ye.call(this, a, b);
            var c = we.call(this, a, b);
            ye.call(this, a, b);
            var e = we.call(this, a, b);
            c !== e && d.attributeChangedCallback(this, b, c, e, a);
        });
        Je
            ? b(HTMLElement.prototype, Je)
            : ze
            ? b(Element.prototype, ze)
            : console.warn(
                  "Custom Elements: `Element#insertAdjacentElement` was not patched."
              );
        Ke
            ? c(HTMLElement.prototype, Ke)
            : Ae
            ? c(Element.prototype, Ae)
            : console.warn(
                  "Custom Elements: `Element#insertAdjacentHTML` was not patched."
              );
        Oe(d, Element.prototype, { Y: Be, append: Ce });
        Re(d);
    }
    var Te = window.customElements;
    if (
        !Te ||
        Te.forcePolyfill ||
        "function" != typeof Te.define ||
        "function" != typeof Te.get
    ) {
        var Ne = new Wd();
        Me();
        Pe();
        Oe(Ne, DocumentFragment.prototype, { Y: je, append: ke });
        Qe();
        Se();
        document.__CE_hasRegistry = !0;
        var customElements = new P(Ne);
        Object.defineProperty(window, "customElements", {
            configurable: !0,
            enumerable: !0,
            value: customElements,
        });
    }
    function Ue() {
        this.end = this.start = 0;
        this.rules = this.parent = this.previous = null;
        this.cssText = this.parsedCssText = "";
        this.atRule = !1;
        this.type = 0;
        this.parsedSelector = this.selector = this.keyframesName = "";
    }
    function Ve(a) {
        a = a.replace(We, "").replace(Xe, "");
        var b = Ye,
            c = a,
            d = new Ue();
        d.start = 0;
        d.end = c.length;
        for (var e = d, f = 0, h = c.length; f < h; f++)
            if ("{" === c[f]) {
                e.rules || (e.rules = []);
                var g = e,
                    k = g.rules[g.rules.length - 1] || null;
                e = new Ue();
                e.start = f + 1;
                e.parent = g;
                e.previous = k;
                g.rules.push(e);
            } else "}" === c[f] && ((e.end = f + 1), (e = e.parent || d));
        return b(d, a);
    }
    function Ye(a, b) {
        var c = b.substring(a.start, a.end - 1);
        a.parsedCssText = a.cssText = c.trim();
        a.parent &&
            ((c = b.substring(
                a.previous ? a.previous.end : a.parent.start,
                a.start - 1
            )),
            (c = Ze(c)),
            (c = c.replace($e, " ")),
            (c = c.substring(c.lastIndexOf(";") + 1)),
            (c = a.parsedSelector = a.selector = c.trim()),
            (a.atRule = 0 === c.indexOf("@")),
            a.atRule
                ? 0 === c.indexOf("@media")
                    ? (a.type = af)
                    : c.match(gf) &&
                      ((a.type = hf),
                      (a.keyframesName = a.selector.split($e).pop()))
                : (a.type = 0 === c.indexOf("--") ? jf : kf));
        if ((c = a.rules))
            for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++)
                Ye(f, b);
        return a;
    }
    function Ze(a) {
        return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
            a = c;
            for (c = 6 - a.length; c--; ) a = "0" + a;
            return "\\" + a;
        });
    }
    function lf(a, b, c) {
        c = void 0 === c ? "" : c;
        var d = "";
        if (a.cssText || a.rules) {
            var e = a.rules,
                f;
            if ((f = e))
                (f = e[0]),
                    (f = !(f && f.selector && 0 === f.selector.indexOf("--")));
            if (f) {
                f = 0;
                for (var h = e.length, g = void 0; f < h && (g = e[f]); f++)
                    d = lf(g, b, d);
            } else
                b
                    ? (b = a.cssText)
                    : ((b = a.cssText),
                      (b = b.replace(mf, "").replace(nf, "")),
                      (b = b.replace(of, "").replace(pf, ""))),
                    (d = b.trim()) && (d = "  " + d + "\n");
        }
        d &&
            (a.selector && (c += a.selector + " {\n"),
            (c += d),
            a.selector && (c += "}\n\n"));
        return c;
    }
    var kf = 1,
        hf = 7,
        af = 4,
        jf = 1e3,
        We = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
        Xe = /@import[^;]*;/gim,
        mf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        nf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        of = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
        pf = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        gf = /^@[^\s]*keyframes/,
        $e = /\s+/g;
    var R = !(window.ShadyDOM && window.ShadyDOM.inUse),
        qf;
    function rf(a) {
        qf =
            a && a.shimcssproperties
                ? !1
                : R ||
                  !(
                      navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
                      !window.CSS ||
                      !CSS.supports ||
                      !CSS.supports("box-shadow", "0 0 0 var(--foo)")
                  );
    }
    window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
        ? (qf = window.ShadyCSS.nativeCss)
        : window.ShadyCSS
        ? (rf(window.ShadyCSS), (window.ShadyCSS = void 0))
        : rf(window.WebComponents && window.WebComponents.flags);
    var S = qf;
    var sf =
            /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
        tf = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
        uf = /(--[\w-]+)\s*([:,;)]|$)/gi,
        vf = /(animation\s*:)|(animation-name\s*:)/,
        wf = /@media\s(.*)/,
        xf = /\{[^}]*\}/g;
    var yf = new Set();
    function zf(a, b) {
        if (!a) return "";
        "string" === typeof a && (a = Ve(a));
        b && Af(a, b);
        return lf(a, S);
    }
    function Bf(a) {
        !a.__cssRules && a.textContent && (a.__cssRules = Ve(a.textContent));
        return a.__cssRules || null;
    }
    function Cf(a) {
        return !!a.parent && a.parent.type === hf;
    }
    function Af(a, b, c, d) {
        if (a) {
            var e = !1,
                f = a.type;
            if (d && f === af) {
                var h = a.selector.match(wf);
                h && (window.matchMedia(h[1]).matches || (e = !0));
            }
            f === kf ? b(a) : c && f === hf ? c(a) : f === jf && (e = !0);
            if ((a = a.rules) && !e)
                for (e = 0, f = a.length, h = void 0; e < f && (h = a[e]); e++)
                    Af(h, b, c, d);
        }
    }
    function Df(a, b, c, d) {
        var e = document.createElement("style");
        b && e.setAttribute("scope", b);
        e.textContent = a;
        Ef(e, c, d);
        return e;
    }
    var Ff = null;
    function Gf(a) {
        a = document.createComment(" Shady DOM styles for " + a + " ");
        var b = document.head;
        b.insertBefore(a, (Ff ? Ff.nextSibling : null) || b.firstChild);
        return (Ff = a);
    }
    function Ef(a, b, c) {
        b = b || document.head;
        b.insertBefore(a, (c && c.nextSibling) || b.firstChild);
        Ff
            ? a.compareDocumentPosition(Ff) ===
                  Node.DOCUMENT_POSITION_PRECEDING && (Ff = a)
            : (Ff = a);
    }
    function Hf(a, b) {
        for (var c = 0, d = a.length; b < d; b++)
            if ("(" === a[b]) c++;
            else if (")" === a[b] && 0 === --c) return b;
        return -1;
    }
    function If(a, b) {
        var c = a.indexOf("var(");
        if (-1 === c) return b(a, "", "", "");
        var d = Hf(a, c + 3),
            e = a.substring(c + 4, d);
        c = a.substring(0, c);
        a = If(a.substring(d + 1), b);
        d = e.indexOf(",");
        return -1 === d
            ? b(c, e.trim(), "", a)
            : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
    }
    function Jf(a, b) {
        R
            ? a.setAttribute("class", b)
            : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
    }
    function Kf(a) {
        var b = a.localName,
            c = "";
        b
            ? -1 < b.indexOf("-") ||
              ((c = b), (b = (a.getAttribute && a.getAttribute("is")) || ""))
            : ((b = a.is), (c = a.extends));
        return { is: b, N: c };
    }
    function Lf(a) {
        for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++)
            if ("(" === a[d]) {
                var e = Hf(a, d);
                c += a.slice(d, e + 1);
                d = e;
            } else "," === a[d] ? (b.push(c), (c = "")) : (c += a[d]);
        c && b.push(c);
        return b;
    }
    function Mf(a) {
        if (void 0 === a.aa) {
            var b = a.getAttribute("css-build");
            if (b) a.aa = b;
            else {
                a: {
                    b =
                        "template" === a.localName
                            ? a.content.firstChild
                            : a.firstChild;
                    if (
                        b instanceof Comment &&
                        ((b = b.textContent.trim().split(":")),
                        "css-build" === b[0])
                    ) {
                        b = b[1];
                        break a;
                    }
                    b = "";
                }
                if ("" !== b) {
                    var c =
                        "template" === a.localName
                            ? a.content.firstChild
                            : a.firstChild;
                    c.parentNode.removeChild(c);
                }
                a.aa = b;
            }
        }
        return a.aa || "";
    }
    function Nf() {}
    function Of(a, b) {
        Pf(U, a, function (a) {
            Qf(a, b || "");
        });
    }
    function Pf(a, b, c) {
        b.nodeType === Node.ELEMENT_NODE && c(b);
        if (
            (b =
                "template" === b.localName
                    ? (b.content || b.ib || b).childNodes
                    : b.children || b.childNodes)
        )
            for (var d = 0; d < b.length; d++) Pf(a, b[d], c);
    }
    function Qf(a, b, c) {
        if (b)
            if (a.classList)
                c
                    ? (a.classList.remove("style-scope"), a.classList.remove(b))
                    : (a.classList.add("style-scope"), a.classList.add(b));
            else if (a.getAttribute) {
                var d = a.getAttribute(Rf);
                c
                    ? d &&
                      ((b = d.replace("style-scope", "").replace(b, "")),
                      Jf(a, b))
                    : Jf(a, (d ? d + " " : "") + "style-scope " + b);
            }
    }
    function Sf(a, b, c) {
        Pf(U, a, function (a) {
            Qf(a, b, !0);
            Qf(a, c);
        });
    }
    function Tf(a, b) {
        Pf(U, a, function (a) {
            Qf(a, b || "", !0);
        });
    }
    function Uf(a, b, c, d) {
        var e = U;
        R || "shady" === (void 0 === d ? "" : d)
            ? (b = zf(b, c))
            : ((a = Kf(a)), (b = Vf(e, b, a.is, a.N, c) + "\n\n"));
        return b.trim();
    }
    function Vf(a, b, c, d, e) {
        var f = Wf(c, d);
        c = c ? Xf + c : "";
        return zf(b, function (b) {
            b.c || ((b.selector = b.m = Yf(a, b, a.b, c, f)), (b.c = !0));
            e && e(b, c, f);
        });
    }
    function Wf(a, b) {
        return b ? "[is=" + a + "]" : a;
    }
    function Yf(a, b, c, d, e) {
        var f = Lf(b.selector);
        if (!Cf(b)) {
            b = 0;
            for (var h = f.length, g = void 0; b < h && (g = f[b]); b++)
                f[b] = c.call(a, g, d, e);
        }
        return f
            .filter(function (a) {
                return !!a;
            })
            .join(Zf);
    }
    function $f(a) {
        return a.replace(ag, function (a, c, d) {
            -1 < d.indexOf("+")
                ? (d = d.replace(/\+/g, "___"))
                : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));
            return ":" + c + "(" + d + ")";
        });
    }
    function bg(a) {
        for (var b = [], c; (c = a.match(cg)); ) {
            var d = c.index,
                e = Hf(a, d);
            if (-1 === e) throw Error(c.input + " selector missing ')'");
            c = a.slice(d, e + 1);
            a = a.replace(c, "\ue000");
            b.push(c);
        }
        return { ka: a, matches: b };
    }
    function dg(a, b) {
        var c = a.split("\ue000");
        return b.reduce(function (a, b, f) {
            return a + b + c[f + 1];
        }, c[0]);
    }
    Nf.prototype.b = function (a, b, c) {
        var d = !1;
        a = a.trim();
        var e = ag.test(a);
        e &&
            ((a = a.replace(ag, function (a, b, c) {
                return ":" + b + "(" + c.replace(/\s/g, "") + ")";
            })),
            (a = $f(a)));
        var f = cg.test(a);
        if (f) {
            var h = bg(a);
            a = h.ka;
            h = h.matches;
        }
        a = a.replace(eg, fg + " $1");
        a = a.replace(gg, function (a, e, f) {
            d ||
                ((a = hg(f, e, b, c)),
                (d = d || a.stop),
                (e = a.Ja),
                (f = a.value));
            return e + f;
        });
        f && (a = dg(a, h));
        e && (a = $f(a));
        return a;
    };
    function hg(a, b, c, d) {
        var e = a.indexOf(ig);
        0 <= a.indexOf(fg) ? (a = jg(a, d)) : 0 !== e && (a = c ? kg(a, c) : a);
        c = !1;
        0 <= e && ((b = ""), (c = !0));
        if (c) {
            var f = !0;
            c &&
                (a = a.replace(lg, function (a, b) {
                    return " > " + b;
                }));
        }
        a = a.replace(mg, function (a, b, c) {
            return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]';
        });
        return { value: a, Ja: b, stop: f };
    }
    function kg(a, b) {
        a = a.split(ng);
        a[0] += b;
        return a.join(ng);
    }
    function jg(a, b) {
        var c = a.match(og);
        return (c = (c && c[2].trim()) || "")
            ? c[0].match(pg)
                ? a.replace(og, function (a, c, f) {
                      return b + f;
                  })
                : c.split(pg)[0] === b
                ? c
                : qg
            : a.replace(fg, b);
    }
    function rg(a) {
        a.selector === sg && (a.selector = "html");
    }
    Nf.prototype.c = function (a) {
        return a.match(fg)
            ? ""
            : a.match(ig)
            ? this.b(a, tg)
            : kg(a.trim(), tg);
    };
    q.Object.defineProperties(Nf.prototype, {
        a: {
            configurable: !0,
            enumerable: !0,
            get: function () {
                return "style-scope";
            },
        },
    });
    var ag = /:(nth[-\w]+)\(([^)]+)\)/,
        tg = ":not(.style-scope)",
        Zf = ",",
        gg = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
        pg = /[[.:#*]/,
        fg = ":host",
        sg = ":root",
        ig = "::slotted",
        eg = new RegExp("^(" + ig + ")"),
        og = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        lg = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        mg = /(.*):dir\((?:(ltr|rtl))\)/,
        Xf = ".",
        ng = ":",
        Rf = "class",
        qg = "should_not_match",
        cg = /:(?:matches|any|-(?:webkit|moz)-any)/,
        U = new Nf();
    function ug(a, b, c, d, e) {
        this.B = a || null;
        this.b = b || null;
        this.c = c || [];
        this.J = null;
        this.V = e || "";
        this.N = d || "";
        this.a = this.u = this.F = null;
    }
    function V(a) {
        return a ? a.__styleInfo : null;
    }
    function vg(a, b) {
        return (a.__styleInfo = b);
    }
    ug.prototype.f = function () {
        return this.B;
    };
    ug.prototype._getStyleRules = ug.prototype.f;
    function wg(a) {
        var b =
            this.matches ||
            this.matchesSelector ||
            this.mozMatchesSelector ||
            this.msMatchesSelector ||
            this.oMatchesSelector ||
            this.webkitMatchesSelector;
        return b && b.call(this, a);
    }
    var xg = navigator.userAgent.match("Trident");
    function yg() {}
    function zg(a) {
        var b = {},
            c = [],
            d = 0;
        Af(
            a,
            function (a) {
                Ag(a);
                a.index = d++;
                a = a.l.cssText;
                for (var c; (c = uf.exec(a)); ) {
                    var e = c[1];
                    ":" !== c[2] && (b[e] = !0);
                }
            },
            function (a) {
                c.push(a);
            }
        );
        a.b = c;
        a = [];
        for (var e in b) a.push(e);
        return a;
    }
    function Ag(a) {
        if (!a.l) {
            var b = {},
                c = {};
            Bg(a, c) && ((b.A = c), (a.rules = null));
            b.cssText = a.parsedCssText.replace(xf, "").replace(sf, "");
            a.l = b;
        }
    }
    function Bg(a, b) {
        var c = a.l;
        if (c) {
            if (c.A) return Object.assign(b, c.A), !0;
        } else {
            c = a.parsedCssText;
            for (var d; (a = sf.exec(c)); ) {
                d = (a[2] || a[3]).trim();
                if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;
                d = !0;
            }
            return d;
        }
    }
    function Cg(a, b, c) {
        b &&
            (b =
                0 <= b.indexOf(";")
                    ? Dg(a, b, c)
                    : If(b, function (b, e, f, h) {
                          if (!e) return b + h;
                          (e = Cg(a, c[e], c)) && "initial" !== e
                              ? "apply-shim-inherit" === e && (e = "inherit")
                              : (e = Cg(a, c[f] || f, c) || f);
                          return b + (e || "") + h;
                      }));
        return (b && b.trim()) || "";
    }
    function Dg(a, b, c) {
        b = b.split(";");
        for (var d = 0, e, f; d < b.length; d++)
            if ((e = b[d])) {
                tf.lastIndex = 0;
                if ((f = tf.exec(e))) e = Cg(a, c[f[1]], c);
                else if (((f = e.indexOf(":")), -1 !== f)) {
                    var h = e.substring(f);
                    h = h.trim();
                    h = Cg(a, h, c) || h;
                    e = e.substring(0, f) + h;
                }
                b[d] =
                    e && e.lastIndexOf(";") === e.length - 1
                        ? e.slice(0, -1)
                        : e || "";
            }
        return b.join(";");
    }
    function Eg(a, b) {
        var c = {},
            d = [];
        Af(
            a,
            function (a) {
                a.l || Ag(a);
                var e = a.m || a.parsedSelector;
                b &&
                    a.l.A &&
                    e &&
                    wg.call(b, e) &&
                    (Bg(a, c),
                    (a = a.index),
                    (e = parseInt(a / 32, 10)),
                    (d[e] = (d[e] || 0) | (1 << a % 32)));
            },
            null,
            !0
        );
        return { A: c, key: d };
    }
    function Fg(a, b, c, d) {
        b.l || Ag(b);
        if (b.l.A) {
            var e = Kf(a);
            a = e.is;
            e = e.N;
            e = a ? Wf(a, e) : "html";
            var f = b.parsedSelector,
                h = ":host > *" === f || "html" === f,
                g = 0 === f.indexOf(":host") && !h;
            "shady" === c &&
                ((h = f === e + " > *." + e || -1 !== f.indexOf("html")),
                (g = !h && 0 === f.indexOf(e)));
            if (h || g)
                (c = e),
                    g &&
                        (b.m || (b.m = Yf(U, b, U.b, a ? Xf + a : "", e)),
                        (c = b.m || e)),
                    d({ ka: c, Pa: g, sb: h });
        }
    }
    function Gg(a, b, c) {
        var d = {},
            e = {};
        Af(
            b,
            function (b) {
                Fg(a, b, c, function (c) {
                    wg.call(a.jb || a, c.ka) && (c.Pa ? Bg(b, d) : Bg(b, e));
                });
            },
            null,
            !0
        );
        return { Xa: e, Oa: d };
    }
    function Hg(a, b, c, d) {
        var e = Kf(b),
            f = Wf(e.is, e.N),
            h = new RegExp(
                "(?:^|[^.#[:])" +
                    (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) +
                    "($|[.:[\\s>+~])"
            ),
            g = V(b);
        e = g.B;
        g = g.V;
        var k = Ig(e, d);
        return Uf(
            b,
            e,
            function (b) {
                var e = "";
                b.l || Ag(b);
                b.l.cssText && (e = Dg(a, b.l.cssText, c));
                b.cssText = e;
                if (!R && !Cf(b) && b.cssText) {
                    var g = (e = b.cssText);
                    null == b.ra && (b.ra = vf.test(e));
                    if (b.ra)
                        if (null == b.X) {
                            b.X = [];
                            for (var l in k)
                                (g = k[l]),
                                    (g = g(e)),
                                    e !== g && ((e = g), b.X.push(l));
                        } else {
                            for (l = 0; l < b.X.length; ++l)
                                (g = k[b.X[l]]), (e = g(e));
                            g = e;
                        }
                    b.cssText = g;
                    b.m = b.m || b.selector;
                    e = "." + d;
                    l = Lf(b.m);
                    g = 0;
                    for (var N = l.length, Y = void 0; g < N && (Y = l[g]); g++)
                        l[g] = Y.match(h) ? Y.replace(f, e) : e + " " + Y;
                    b.selector = l.join(",");
                }
            },
            g
        );
    }
    function Ig(a, b) {
        a = a.b;
        var c = {};
        if (!R && a)
            for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
                var f = e,
                    h = b;
                f.f = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");
                f.a = f.keyframesName + "-" + h;
                f.m = f.m || f.selector;
                f.selector = f.m.replace(f.keyframesName, f.a);
                c[e.keyframesName] = Jg(e);
            }
        return c;
    }
    function Jg(a) {
        return function (b) {
            return b.replace(a.f, a.a);
        };
    }
    function Kg(a, b) {
        var c = Lg,
            d = Bf(a);
        a.textContent = zf(d, function (a) {
            var d = (a.cssText = a.parsedCssText);
            a.l &&
                a.l.cssText &&
                ((d = d.replace(mf, "").replace(nf, "")),
                (a.cssText = Dg(c, d, b)));
        });
    }
    q.Object.defineProperties(yg.prototype, {
        a: {
            configurable: !0,
            enumerable: !0,
            get: function () {
                return "x-scope";
            },
        },
    });
    var Lg = new yg();
    var Mg = {},
        Ng = window.customElements;
    if (Ng && !R) {
        var Og = Ng.define;
        Ng.define = function (a, b, c) {
            Mg[a] || (Mg[a] = Gf(a));
            Og.call(Ng, a, b, c);
        };
    }
    function Pg() {
        this.cache = {};
    }
    Pg.prototype.store = function (a, b, c, d) {
        var e = this.cache[a] || [];
        e.push({ A: b, styleElement: c, u: d });
        100 < e.length && e.shift();
        this.cache[a] = e;
    };
    Pg.prototype.fetch = function (a, b, c) {
        if ((a = this.cache[a]))
            for (var d = a.length - 1; 0 <= d; d--) {
                var e = a[d],
                    f;
                a: {
                    for (f = 0; f < c.length; f++) {
                        var h = c[f];
                        if (e.A[h] !== b[h]) {
                            f = !1;
                            break a;
                        }
                    }
                    f = !0;
                }
                if (f) return e;
            }
    };
    function Qg() {}
    function Rg(a) {
        var b = [];
        a.classList
            ? (b = Array.from(a.classList))
            : a instanceof window.SVGElement &&
              a.hasAttribute("class") &&
              (b = a.getAttribute("class").split(/\s+/));
        a = b;
        b = a.indexOf(U.a);
        return -1 < b ? a[b + 1] : "";
    }
    function Sg(a) {
        var b = a.getRootNode();
        return b === a || b === a.ownerDocument
            ? ""
            : (a = b.host)
            ? Kf(a).is
            : "";
    }
    function Tg(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (
                c.target !== document.documentElement &&
                c.target !== document.head
            )
                for (var d = 0; d < c.addedNodes.length; d++) {
                    var e = c.addedNodes[d];
                    if (e.nodeType === Node.ELEMENT_NODE) {
                        var f = e.getRootNode(),
                            h = Rg(e);
                        if (
                            h &&
                            f === e.ownerDocument &&
                            (("style" !== e.localName &&
                                "template" !== e.localName) ||
                                "" === Mf(e))
                        )
                            Tf(e, h);
                        else if (f instanceof ShadowRoot)
                            for (
                                f = Sg(e),
                                    f !== h && Sf(e, h, f),
                                    e =
                                        window.ShadyDOM.nativeMethods.querySelectorAll.call(
                                            e,
                                            ":not(." + U.a + ")"
                                        ),
                                    h = 0;
                                h < e.length;
                                h++
                            ) {
                                f = e[h];
                                var g = Sg(f);
                                g && Qf(f, g);
                            }
                    }
                }
        }
    }
    if (!(R || (window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping))) {
        var Ug = new MutationObserver(Tg),
            Vg = function (a) {
                Ug.observe(a, { childList: !0, subtree: !0 });
            };
        if (
            window.customElements &&
            !window.customElements.polyfillWrapFlushCallback
        )
            Vg(document);
        else {
            var Wg = function () {
                Vg(document.body);
            };
            window.HTMLImports
                ? window.HTMLImports.whenReady(Wg)
                : requestAnimationFrame(function () {
                      if ("loading" === document.readyState) {
                          var a = function () {
                              Wg();
                              document.removeEventListener(
                                  "readystatechange",
                                  a
                              );
                          };
                          document.addEventListener("readystatechange", a);
                      } else Wg();
                  });
        }
        Qg = function () {
            Tg(Ug.takeRecords());
        };
    }
    var Xg = Qg;
    var Yg = {};
    var Zg = Promise.resolve();
    function $g(a) {
        if ((a = Yg[a]))
            (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
                (a._applyShimValidatingVersion =
                    a._applyShimValidatingVersion || 0),
                (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1);
    }
    function ah(a) {
        return a._applyShimCurrentVersion === a._applyShimNextVersion;
    }
    function bh(a) {
        a._applyShimValidatingVersion = a._applyShimNextVersion;
        a.b ||
            ((a.b = !0),
            Zg.then(function () {
                a._applyShimCurrentVersion = a._applyShimNextVersion;
                a.b = !1;
            }));
    }
    var ch = new Pg();
    function W() {
        this.o = {};
        this.c = document.documentElement;
        var a = new Ue();
        a.rules = [];
        this.f = vg(this.c, new ug(a));
        this.h = !1;
        this.b = this.a = null;
    }
    n = W.prototype;
    n.flush = function () {
        Xg();
    };
    n.Ma = function (a) {
        return Bf(a);
    };
    n.ab = function (a) {
        return zf(a);
    };
    n.prepareTemplate = function (a, b, c) {
        this.prepareTemplateDom(a, b);
        this.prepareTemplateStyles(a, b, c);
    };
    n.prepareTemplateStyles = function (a, b, c) {
        if (!a.h) {
            R || Mg[b] || (Mg[b] = Gf(b));
            a.h = !0;
            a.name = b;
            a.extends = c;
            Yg[b] = a;
            var d = Mf(a);
            var e = [];
            for (
                var f = a.content.querySelectorAll("style"), h = 0;
                h < f.length;
                h++
            ) {
                var g = f[h];
                if (g.hasAttribute("shady-unscoped")) {
                    if (!R) {
                        var k = g.textContent;
                        yf.has(k) ||
                            (yf.add(k),
                            (k = g.cloneNode(!0)),
                            document.head.appendChild(k));
                        g.parentNode.removeChild(g);
                    }
                } else e.push(g.textContent), g.parentNode.removeChild(g);
            }
            e = e.join("").trim();
            c = { is: b, extends: c };
            dh(this);
            if ((f = "" === Mf(a)))
                (f = tf.test(e) || sf.test(e)),
                    (tf.lastIndex = 0),
                    (sf.lastIndex = 0);
            e = Ve(e);
            f && S && this.a && this.a.transformRules(e, b);
            a._styleAst = e;
            e = [];
            S || (e = zg(a._styleAst));
            if (!e.length || S)
                (f = R ? a.content : null),
                    (b = Mg[b] || null),
                    (d = Uf(c, a._styleAst, null, d)),
                    (d = d.length ? Df(d, c.is, f, b) : void 0),
                    (a.a = d);
            a.f = e;
        }
    };
    n.prepareTemplateDom = function (a, b) {
        var c = Mf(a);
        R || "shady" === c || a.c || ((a.c = !0), Of(a.content, b));
    };
    function eh(a) {
        !a.b &&
            window.ShadyCSS &&
            window.ShadyCSS.CustomStyleInterface &&
            ((a.b = window.ShadyCSS.CustomStyleInterface),
            (a.b.transformCallback = function (b) {
                a.va(b);
            }),
            (a.b.validateCallback = function () {
                requestAnimationFrame(function () {
                    (a.b.enqueued || a.h) && a.flushCustomStyles();
                });
            }));
    }
    function dh(a) {
        !a.a &&
            window.ShadyCSS &&
            window.ShadyCSS.ApplyShim &&
            ((a.a = window.ShadyCSS.ApplyShim), (a.a.invalidCallback = $g));
        eh(a);
    }
    n.flushCustomStyles = function () {
        dh(this);
        if (this.b) {
            var a = this.b.processStyles();
            if (this.b.enqueued) {
                if (S)
                    for (var b = 0; b < a.length; b++) {
                        var c = this.b.getStyleForCustomStyle(a[b]);
                        if (c && S && this.a) {
                            var d = Bf(c);
                            dh(this);
                            this.a.transformRules(d);
                            c.textContent = zf(d);
                        }
                    }
                else
                    for (fh(this, this.c, this.f), b = 0; b < a.length; b++)
                        (c = this.b.getStyleForCustomStyle(a[b])) &&
                            Kg(c, this.f.F);
                this.b.enqueued = !1;
                this.h && !S && this.styleDocument();
            }
        }
    };
    n.styleElement = function (a, b) {
        var c = V(a);
        if (!c) {
            var d = Kf(a);
            c = d.is;
            d = d.N;
            var e = Mg[c] || null;
            c = Yg[c];
            if (c) {
                var f = c._styleAst;
                var h = c.f;
                var g = Mf(c);
            }
            f = new ug(f, e, h, d, g);
            c && vg(a, f);
            c = f;
        }
        a !== this.c && (this.h = !0);
        b && ((c.J = c.J || {}), Object.assign(c.J, b));
        if (S) {
            b = c;
            f = Kf(a).is;
            if (b.J) {
                h = b.J;
                for (var k in h)
                    null === k
                        ? a.style.removeProperty(k)
                        : a.style.setProperty(k, h[k]);
            }
            if (
                !((!(k = Yg[f]) && a !== this.c) || (k && "" !== Mf(k))) &&
                k &&
                k.a &&
                !ah(k)
            ) {
                if (
                    ah(k) ||
                    k._applyShimValidatingVersion !== k._applyShimNextVersion
                )
                    dh(this),
                        this.a && this.a.transformRules(k._styleAst, f),
                        (k.a.textContent = Uf(a, b.B)),
                        bh(k);
                R &&
                    (f = a.shadowRoot) &&
                    (f.querySelector("style").textContent = Uf(a, b.B));
                b.B = k._styleAst;
            }
        } else if (((k = c), this.flush(), fh(this, a, k), k.c && k.c.length)) {
            b = Kf(a).is;
            c = (f = ch.fetch(b, k.F, k.c)) ? f.styleElement : null;
            h = k.u;
            (g = f && f.u) ||
                ((g = this.o[b] = (this.o[b] || 0) + 1), (g = b + "-" + g));
            k.u = g;
            g = k.u;
            d = Lg;
            d = c ? c.textContent || "" : Hg(d, a, k.F, g);
            e = V(a);
            var l = e.a;
            l &&
                !R &&
                l !== c &&
                (l._useCount--,
                0 >= l._useCount &&
                    l.parentNode &&
                    l.parentNode.removeChild(l));
            R
                ? e.a
                    ? ((e.a.textContent = d), (c = e.a))
                    : d && (c = Df(d, g, a.shadowRoot, e.b))
                : c
                ? c.parentNode ||
                  (xg && -1 < d.indexOf("@media") && (c.textContent = d),
                  Ef(c, null, e.b))
                : d && (c = Df(d, g, null, e.b));
            c &&
                ((c._useCount = c._useCount || 0),
                e.a != c && c._useCount++,
                (e.a = c));
            g = c;
            R ||
                ((c = k.u),
                (e = d = a.getAttribute("class") || ""),
                h &&
                    (e = d.replace(
                        new RegExp("\\s*x-scope\\s*" + h + "\\s*", "g"),
                        " "
                    )),
                (e += (e ? " " : "") + "x-scope " + c),
                d !== e && Jf(a, e));
            f || ch.store(b, k.F, g, k.u);
        }
    };
    function gh(a, b) {
        return (b = b.getRootNode().host) ? (V(b) ? b : gh(a, b)) : a.c;
    }
    function fh(a, b, c) {
        a = gh(a, b);
        var d = V(a);
        a = Object.create(d.F || null);
        var e = Gg(b, c.B, c.V);
        b = Eg(d.B, b).A;
        Object.assign(a, e.Oa, b, e.Xa);
        b = c.J;
        for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e;
        f = Lg;
        b = Object.getOwnPropertyNames(a);
        for (e = 0; e < b.length; e++) (d = b[e]), (a[d] = Cg(f, a[d], a));
        c.F = a;
    }
    n.styleDocument = function (a) {
        this.styleSubtree(this.c, a);
    };
    n.styleSubtree = function (a, b) {
        var c = a.shadowRoot;
        (c || a === this.c) && this.styleElement(a, b);
        if ((b = c && (c.children || c.childNodes)))
            for (a = 0; a < b.length; a++) this.styleSubtree(b[a]);
        else if ((a = a.children || a.childNodes))
            for (b = 0; b < a.length; b++) this.styleSubtree(a[b]);
    };
    n.va = function (a) {
        var b = this,
            c = Bf(a),
            d = Mf(a);
        d !== this.f.V && (this.f.V = d);
        Af(c, function (a) {
            if (R) rg(a);
            else {
                var c = U;
                a.selector = a.parsedSelector;
                rg(a);
                a.selector = a.m = Yf(c, a, c.c, void 0, void 0);
            }
            S && "" === d && (dh(b), b.a && b.a.transformRule(a));
        });
        S ? (a.textContent = zf(c)) : this.f.B.rules.push(c);
    };
    n.getComputedStyleValue = function (a, b) {
        var c;
        S || (c = (V(a) || V(gh(this, a))).F[b]);
        return (c = c || window.getComputedStyle(a).getPropertyValue(b))
            ? c.trim()
            : "";
    };
    n.$a = function (a, b) {
        var c = a.getRootNode();
        b = b ? b.split(/\s/) : [];
        c = c.host && c.host.localName;
        if (!c) {
            var d = a.getAttribute("class");
            if (d) {
                d = d.split(/\s/);
                for (var e = 0; e < d.length; e++)
                    if (d[e] === U.a) {
                        c = d[e + 1];
                        break;
                    }
            }
        }
        c && b.push(U.a, c);
        S || ((c = V(a)) && c.u && b.push(Lg.a, c.u));
        Jf(a, b.join(" "));
    };
    n.Ia = function (a) {
        return V(a);
    };
    n.Za = function (a, b) {
        Qf(a, b);
    };
    n.bb = function (a, b) {
        Qf(a, b, !0);
    };
    n.Ya = function (a) {
        return Sg(a);
    };
    n.Ka = function (a) {
        return Rg(a);
    };
    W.prototype.flush = W.prototype.flush;
    W.prototype.prepareTemplate = W.prototype.prepareTemplate;
    W.prototype.styleElement = W.prototype.styleElement;
    W.prototype.styleDocument = W.prototype.styleDocument;
    W.prototype.styleSubtree = W.prototype.styleSubtree;
    W.prototype.getComputedStyleValue = W.prototype.getComputedStyleValue;
    W.prototype.setElementClass = W.prototype.$a;
    W.prototype._styleInfoForNode = W.prototype.Ia;
    W.prototype.transformCustomStyleForDocument = W.prototype.va;
    W.prototype.getStyleAst = W.prototype.Ma;
    W.prototype.styleAstToString = W.prototype.ab;
    W.prototype.flushCustomStyles = W.prototype.flushCustomStyles;
    W.prototype.scopeNode = W.prototype.Za;
    W.prototype.unscopeNode = W.prototype.bb;
    W.prototype.scopeForNode = W.prototype.Ya;
    W.prototype.currentScopeForNode = W.prototype.Ka;
    Object.defineProperties(W.prototype, {
        nativeShadow: {
            get: function () {
                return R;
            },
        },
        nativeCss: {
            get: function () {
                return S;
            },
        },
    });
    var X = new W(),
        hh,
        ih;
    window.ShadyCSS &&
        ((hh = window.ShadyCSS.ApplyShim),
        (ih = window.ShadyCSS.CustomStyleInterface));
    window.ShadyCSS = {
        ScopingShim: X,
        prepareTemplate: function (a, b, c) {
            X.flushCustomStyles();
            X.prepareTemplate(a, b, c);
        },
        prepareTemplateDom: function (a, b) {
            X.prepareTemplateDom(a, b);
        },
        prepareTemplateStyles: function (a, b, c) {
            X.flushCustomStyles();
            X.prepareTemplateStyles(a, b, c);
        },
        styleSubtree: function (a, b) {
            X.flushCustomStyles();
            X.styleSubtree(a, b);
        },
        styleElement: function (a) {
            X.flushCustomStyles();
            X.styleElement(a);
        },
        styleDocument: function (a) {
            X.flushCustomStyles();
            X.styleDocument(a);
        },
        flushCustomStyles: function () {
            X.flushCustomStyles();
        },
        getComputedStyleValue: function (a, b) {
            return X.getComputedStyleValue(a, b);
        },
        nativeCss: S,
        nativeShadow: R,
    };
    hh && (window.ShadyCSS.ApplyShim = hh);
    ih && (window.ShadyCSS.CustomStyleInterface = ih);
    var jh = window.customElements,
        kh = window.HTMLImports,
        lh = window.HTMLTemplateElement;
    window.WebComponents = window.WebComponents || {};
    if (jh && jh.polyfillWrapFlushCallback) {
        var mh,
            nh = function () {
                if (mh) {
                    lh.C && lh.C(window.document);
                    var a = mh;
                    mh = null;
                    a();
                    return !0;
                }
            },
            oh = kh.whenReady;
        jh.polyfillWrapFlushCallback(function (a) {
            mh = a;
            oh(nh);
        });
        kh.whenReady = function (a) {
            oh(function () {
                nh() ? kh.whenReady(a) : a();
            });
        };
    }
    kh.whenReady(function () {
        requestAnimationFrame(function () {
            window.WebComponents.ready = !0;
            document.dispatchEvent(
                new CustomEvent("WebComponentsReady", { bubbles: !0 })
            );
        });
    });
    var ph = document.createElement("style");
    ph.textContent =
        "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
    var qh = document.querySelector("head");
    qh.insertBefore(ph, qh.firstChild);
}.call(this));

//# sourceMappingURL=webcomponents-lite.js.map
