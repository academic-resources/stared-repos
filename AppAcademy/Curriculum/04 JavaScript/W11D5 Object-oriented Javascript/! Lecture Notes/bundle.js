!(function (e) {
  var t = {};
  function o(n) {
    if (t[n]) return t[n].exports;
    var r = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
  }
  (o.m = e),
    (o.c = t),
    (o.d = function (e, t, n) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (o.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function (e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (o.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          o.d(
            n,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (o.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = ""),
    o((o.s = 0));
})([
  function (e, t, o) {
    o(1), new Dog("lola", "squeaky frog"), new Cat("Charlie");
  },
  function (e, t, o) {
    (function (e) {
      function t(e, t) {
        r.call(this, e), (this.favoriteToy = t);
      }
      function o() {}
      function n(e) {
        this.name = e;
      }
      function r(e) {
        this.name = e;
      }
      (o.prototype = r.prototype),
        (t.prototype = new o()),
        (t.prototype.constructor = t),
        (t.prototype.bark = function () {
          console.log("woof woof");
        }),
        (n.prototype = Object.create(r.prototype)),
        (n.prototype.constructor = n),
        (n.prototype.meow = function () {
          console.log("meow");
        }),
        (r.prototype.eat = function () {
          console.log("nom nom nom");
        });
      new t("Lola", "Squeaky Frog"), new n("Charlie"), new r();
      e.export = Proto;
    }.call(this, o(2)(e)));
  },
  function (e, t) {
    e.exports = function (e) {
      return (
        e.webpackPolyfill ||
          ((e.deprecate = function () {}),
          (e.paths = []),
          e.children || (e.children = []),
          Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function () {
              return e.l;
            },
          }),
          Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function () {
              return e.i;
            },
          }),
          (e.webpackPolyfill = 1)),
        e
      );
    };
  },
]);
