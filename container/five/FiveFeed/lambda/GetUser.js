!(function (e, i) {
  for (var a in i) e[a] = i[a]
})(
  exports,
  (function (e) {
    var i = {}
    function a(n) {
      if (i[n]) return i[n].exports
      var o = (i[n] = { i: n, l: !1, exports: {} })
      return e[n].call(o.exports, o, o.exports, a), (o.l = !0), o.exports
    }
    return (
      (a.m = e),
      (a.c = i),
      (a.d = function (e, i, n) {
        a.o(e, i) || Object.defineProperty(e, i, { enumerable: !0, get: n })
      }),
      (a.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (a.t = function (e, i) {
        if ((1 & i && (e = a(e)), 8 & i)) return e
        if (4 & i && 'object' == typeof e && e && e.__esModule) return e
        var n = Object.create(null)
        if (
          (a.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & i && 'string' != typeof e)
        )
          for (var o in e)
            a.d(
              n,
              o,
              function (i) {
                return e[i]
              }.bind(null, o)
            )
        return n
      }),
      (a.n = function (e) {
        var i =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return a.d(i, 'a', i), i
      }),
      (a.o = function (e, i) {
        return Object.prototype.hasOwnProperty.call(e, i)
      }),
      (a.p = ''),
      a((a.s = 37))
    )
  })([
    function (e, i) {
      e.exports = require('util')
    },
    function (e, i) {
      e.exports = require('stream')
    },
    function (e, i) {
      e.exports = require('url')
    },
    function (e, i) {
      e.exports = require('fs')
    },
    function (e, i, a) {
      'use strict'
      var n = a(0)
      function o(e, i) {
        Error.call(this), (this.name = e), (this.message = i)
      }
      function t(e) {
        o.call(this, 'InvalidValue', e)
      }
      function s(e, i, a) {
        o.call(
          this,
          'InvalidArity',
          'Function requires ' +
            (function (e, i) {
              return null === i
                ? 'at least ' + e
                : null === e
                ? 'up to ' + i
                : e === i
                ? e
                : 'from ' + e + ' to ' + i
            })(e, i) +
            ' arguments but ' +
            a +
            ' were given.'
        ),
          (this.min = e),
          (this.max = i),
          (this.actual = a)
      }
      function c(e, i) {
        var a = i.responseContent.errors,
          n = 0 === a.length ? '(empty "errors")' : a[0].code
        o.call(this, e, n), (this.requestResult = i)
      }
      function r(e) {
        c.call(this, 'BadRequest', e)
      }
      function p(e) {
        c.call(this, 'Unauthorized', e)
      }
      function l(e) {
        c.call(this, 'PermissionDenied', e)
      }
      function u(e) {
        c.call(this, 'NotFound', e)
      }
      function d(e) {
        c.call(this, 'MethodNotAllowed', e)
      }
      function m(e) {
        c.call(this, 'InternalError', e)
      }
      function x(e) {
        c.call(this, 'UnavailableError', e)
      }
      n.inherits(o, Error),
        n.inherits(t, o),
        n.inherits(s, o),
        n.inherits(c, o),
        (c.prototype.errors = function () {
          return this.requestResult.responseContent.errors
        }),
        (c.raiseForStatusCode = function (e) {
          var i = e.statusCode
          if (i < 200 || i >= 300)
            switch (i) {
              case 400:
                throw new r(e)
              case 401:
                throw new p(e)
              case 403:
                throw new l(e)
              case 404:
                throw new u(e)
              case 405:
                throw new d(e)
              case 500:
                throw new m(e)
              case 503:
                throw new x(e)
              default:
                throw new c('UnknownError', e)
            }
        }),
        n.inherits(r, c),
        n.inherits(p, c),
        n.inherits(l, c),
        n.inherits(u, c),
        n.inherits(d, c),
        n.inherits(m, c),
        n.inherits(x, c),
        (e.exports = {
          FaunaHTTPError: c,
          InvalidValue: t,
          InvalidArity: s,
          BadRequest: r,
          Unauthorized: p,
          PermissionDenied: l,
          NotFound: u,
          MethodNotAllowed: d,
          InternalError: m,
          UnavailableError: x,
        })
    },
    function (e, i, a) {
      'use strict'
      var n = a(86),
        o = a(4),
        t = a(10),
        s = a(0),
        c = s && s.inspect && s.inspect.custom,
        r = (s && s.inspect) || JSON.stringify
      function p() {}
      function l(e, i, a) {
        if (!e) throw new o.InvalidValue('id cannot be null or undefined')
        ;(this.value = { id: e }),
          i && (this.value.class = i),
          a && (this.value.database = a)
      }
      s.inherits(p, t),
        s.inherits(l, p),
        Object.defineProperty(l.prototype, 'class', {
          get: function () {
            return this.value.class
          },
        }),
        Object.defineProperty(l.prototype, 'database', {
          get: function () {
            return this.value.database
          },
        }),
        Object.defineProperty(l.prototype, 'id', {
          get: function () {
            return this.value.id
          },
        }),
        (l.prototype.toJSON = function () {
          return { '@ref': this.value }
        }),
        h(l, function () {
          var e = {
              classes: 'Class',
              databases: 'Database',
              indexes: 'Index',
              functions: 'Function',
            },
            i = function (a, n) {
              if (void 0 === a.class && void 0 === a.database)
                return (
                  a.id.charAt(0).toUpperCase() + a.id.slice(1) + '(' + n + ')'
                )
              var o = e[a.class.id]
              if (void 0 !== o) {
                var t =
                  void 0 !== a.database ? ', ' + a.database.toString() : ''
                return o + '("' + a.id + '"' + t + ')'
              }
              t = void 0 !== a.database ? a.database.toString() : ''
              return 'Ref(' + i(a.class, t) + ', "' + a.id + '")'
            }
          return i(this, '')
        }),
        (l.prototype.valueOf = function () {
          return this.value
        }),
        (l.prototype.equals = function (e) {
          return (
            e instanceof l &&
            this.id === e.id &&
            ((void 0 === this.class && void 0 === e.class) ||
              this.class.equals(e.class)) &&
            ((void 0 === this.database && void 0 === e.database) ||
              this.database.equals(e.database))
          )
        })
      var u = {
        CLASSES: new l('classes'),
        INDEXES: new l('indexes'),
        DATABASES: new l('databases'),
        FUNCTIONS: new l('functions'),
        KEYS: new l('keys'),
      }
      function d(e) {
        this.value = e
      }
      function m(e) {
        if (e instanceof Date) e = e.toISOString()
        else if ('Z' !== e.charAt(e.length - 1))
          throw new o.InvalidValue("Only allowed timezone is 'Z', got: " + e)
        this.value = e
      }
      function x(e) {
        e instanceof Date && (e = e.toISOString().slice(0, 10)),
          (this.value = e)
      }
      function f(e) {
        if (e instanceof ArrayBuffer) this.value = new Uint8Array(e)
        else if ('string' == typeof e) this.value = n.toByteArray(e)
        else {
          if (!(e instanceof Uint8Array))
            throw new o.InvalidValue(
              'Bytes type expect argument to be either Uint8Array|ArrayBuffer|string, got: ' +
                r(e)
            )
          this.value = e
        }
      }
      function v(e) {
        this.value = e
      }
      function h(e, i) {
        ;(e.prototype.toString = i),
          (e.prototype.inspect = i),
          c && (e.prototype[c] = i)
      }
      ;(u.fromName = function (e) {
        switch (e) {
          case 'classes':
            return u.CLASSES
          case 'indexes':
            return u.INDEXES
          case 'databases':
            return u.DATABASES
          case 'functions':
            return u.FUNCTIONS
          case 'keys':
            return u.KEYS
        }
        return new l(e)
      }),
        s.inherits(d, p),
        h(d, function () {
          return 'SetRef(' + r(this.value) + ')'
        }),
        (d.prototype.toJSON = function () {
          return { '@set': this.value }
        }),
        s.inherits(m, p),
        Object.defineProperty(m.prototype, 'date', {
          get: function () {
            return new Date(this.value)
          },
        }),
        h(m, function () {
          return 'Time("' + this.value + '")'
        }),
        (m.prototype.toJSON = function () {
          return { '@ts': this.value }
        }),
        s.inherits(x, p),
        Object.defineProperty(x.prototype, 'date', {
          get: function () {
            return new Date(this.value)
          },
        }),
        h(x, function () {
          return 'Date("' + this.value + '")'
        }),
        (x.prototype.toJSON = function () {
          return { '@date': this.value }
        }),
        s.inherits(f, p),
        h(f, function () {
          return 'Bytes("' + n.fromByteArray(this.value) + '")'
        }),
        (f.prototype.toJSON = function () {
          return { '@bytes': n.fromByteArray(this.value) }
        }),
        s.inherits(v, p),
        h(v, function () {
          return 'Query(' + t.toString(this.value) + ')'
        }),
        (v.prototype.toJSON = function () {
          return { '@query': this.value }
        }),
        (e.exports = {
          Value: p,
          Ref: l,
          Native: u,
          SetRef: d,
          FaunaTime: m,
          FaunaDate: x,
          Bytes: f,
          Query: v,
        })
    },
    function (e, i) {
      e.exports = require('path')
    },
    function (e, i) {
      e.exports = require('http')
    },
    function (e, i) {
      !(function () {
        'use strict'
        function e(i, a, n, o) {
          return this instanceof e
            ? ((this.domain = i || void 0),
              (this.path = a || '/'),
              (this.secure = !!n),
              (this.script = !!o),
              this)
            : new e(i, a, n, o)
        }
        function a(e, i, n) {
          return e instanceof a
            ? e
            : this instanceof a
            ? ((this.name = null),
              (this.value = null),
              (this.expiration_date = 1 / 0),
              (this.path = String(n || '/')),
              (this.explicit_path = !1),
              (this.domain = i || null),
              (this.explicit_domain = !1),
              (this.secure = !1),
              (this.noscript = !1),
              e && this.parse(e, i, n),
              this)
            : new a(e, i, n)
        }
        ;(e.All = Object.freeze(Object.create(null))),
          (i.CookieAccessInfo = e),
          (i.Cookie = a),
          (a.prototype.toString = function () {
            var e = [this.name + '=' + this.value]
            return (
              this.expiration_date !== 1 / 0 &&
                e.push(
                  'expires=' + new Date(this.expiration_date).toGMTString()
                ),
              this.domain && e.push('domain=' + this.domain),
              this.path && e.push('path=' + this.path),
              this.secure && e.push('secure'),
              this.noscript && e.push('httponly'),
              e.join('; ')
            )
          }),
          (a.prototype.toValueString = function () {
            return this.name + '=' + this.value
          })
        var n = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g
        function o() {
          var e, i
          return this instanceof o
            ? ((e = Object.create(null)),
              (this.setCookie = function (n, o, t) {
                var s, c
                if (
                  ((s = (n = new a(n, o, t)).expiration_date <= Date.now()),
                  void 0 !== e[n.name])
                ) {
                  for (i = e[n.name], c = 0; c < i.length; c += 1)
                    if (i[c].collidesWith(n))
                      return s
                        ? (i.splice(c, 1),
                          0 === i.length && delete e[n.name],
                          !1)
                        : ((i[c] = n), n)
                  return !s && (i.push(n), n)
                }
                return !s && ((e[n.name] = [n]), e[n.name])
              }),
              (this.getCookie = function (a, n) {
                var o, t
                if ((i = e[a]))
                  for (t = 0; t < i.length; t += 1)
                    if ((o = i[t]).expiration_date <= Date.now())
                      0 === i.length && delete e[o.name]
                    else if (o.matches(n)) return o
              }),
              (this.getCookies = function (i) {
                var a,
                  n,
                  o = []
                for (a in e) (n = this.getCookie(a, i)) && o.push(n)
                return (
                  (o.toString = function () {
                    return o.join(':')
                  }),
                  (o.toValueString = function () {
                    return o
                      .map(function (e) {
                        return e.toValueString()
                      })
                      .join(';')
                  }),
                  o
                )
              }),
              this)
            : new o()
        }
        ;(a.prototype.parse = function (e, i, n) {
          if (this instanceof a) {
            var o,
              t = e.split(';').filter(function (e) {
                return !!e
              }),
              s = t[0].match(/([^=]+)=([\s\S]*)/)
            if (!s)
              return void console.warn(
                "Invalid cookie header encountered. Header: '" + e + "'"
              )
            var c = s[1],
              r = s[2]
            if ('string' != typeof c || 0 === c.length || 'string' != typeof r)
              return void console.warn(
                "Unable to extract values from cookie header. Cookie: '" +
                  e +
                  "'"
              )
            for (this.name = c, this.value = r, o = 1; o < t.length; o += 1)
              switch (
                ((c = (s = t[o].match(/([^=]+)(?:=([\s\S]*))?/))[1]
                  .trim()
                  .toLowerCase()),
                (r = s[2]),
                c)
              ) {
                case 'httponly':
                  this.noscript = !0
                  break
                case 'expires':
                  this.expiration_date = r ? Number(Date.parse(r)) : 1 / 0
                  break
                case 'path':
                  ;(this.path = r ? r.trim() : ''), (this.explicit_path = !0)
                  break
                case 'domain':
                  ;(this.domain = r ? r.trim() : ''),
                    (this.explicit_domain = !!this.domain)
                  break
                case 'secure':
                  this.secure = !0
              }
            return (
              this.explicit_path || (this.path = n || '/'),
              this.explicit_domain || (this.domain = i),
              this
            )
          }
          return new a().parse(e, i, n)
        }),
          (a.prototype.matches = function (i) {
            return (
              i === e.All ||
              !(
                (this.noscript && i.script) ||
                (this.secure && !i.secure) ||
                !this.collidesWith(i)
              )
            )
          }),
          (a.prototype.collidesWith = function (e) {
            if ((this.path && !e.path) || (this.domain && !e.domain)) return !1
            if (this.path && 0 !== e.path.indexOf(this.path)) return !1
            if (this.explicit_path && 0 !== e.path.indexOf(this.path)) return !1
            var i = e.domain && e.domain.replace(/^[\.]/, ''),
              a = this.domain && this.domain.replace(/^[\.]/, '')
            if (a === i) return !0
            if (a) {
              if (!this.explicit_domain) return !1
              var n = i.indexOf(a)
              return -1 !== n && n === i.length - a.length
            }
            return !0
          }),
          (i.CookieJar = o),
          (o.prototype.setCookies = function (e, i, o) {
            var t,
              s,
              c = []
            for (
              e = (e = Array.isArray(e) ? e : e.split(n)).map(function (e) {
                return new a(e, i, o)
              }),
                t = 0;
              t < e.length;
              t += 1
            )
              (s = e[t]), this.setCookie(s, i, o) && c.push(s)
            return c
          })
      })()
    },
    function (e, i, a) {
      'use strict'
      var n = a(84),
        o = a(85),
        t = a(10),
        s = a(4),
        c = a(5),
        r = a(26)
      function p(e) {
        return d.exact(1, arguments), new t({ var: h(e) })
      }
      function l() {
        switch ((d.between(1, 2, arguments), arguments.length)) {
          case 1:
            var e = arguments[0]
            if ('function' == typeof e)
              return (function (e) {
                var i = n(e)
                switch (i.length) {
                  case 0:
                    throw new s.InvalidValue(
                      'Provided Function must take at least 1 argument.'
                    )
                  case 1:
                    return u(i[0], e(p(i[0])))
                  default:
                    return u(
                      i,
                      e.apply(
                        null,
                        i.map(function (e) {
                          return p(e)
                        })
                      )
                    )
                }
              })(e)
            if (e instanceof t) return e
            throw new s.InvalidValue(
              'Lambda function takes either a Function or an Expr.'
            )
          case 2:
            return u(arguments[0], arguments[1])
        }
      }
      function u(e, i) {
        return new t({ lambda: h(e), expr: h(i) })
      }
      function d(e, i, a) {
        if ((null !== e && a.length < e) || (null !== i && a.length > i))
          throw new s.InvalidArity(e, i, a.length)
      }
      function m(e, i) {
        for (var a in i) {
          var n = i[a]
          null !== n && (e[a] = n)
        }
        return e
      }
      function x(e) {
        var i = Array.isArray(e) ? e : Array.prototype.slice.call(e)
        return 1 === e.length ? e[0] : i
      }
      function f(e) {
        var i = []
        return i.push.apply(i, e), i
      }
      function v(e, i) {
        return void 0 === e ? i : e
      }
      function h(e) {
        return (
          d.exact(1, arguments),
          null === e
            ? null
            : e instanceof t
            ? e
            : 'symbol' == typeof e
            ? e.toString().replace(/Symbol\((.*)\)/, function (e, i) {
                return i
              })
            : 'function' == typeof e
            ? l(e)
            : Array.isArray(e)
            ? new t(
                e.map(function (e) {
                  return h(e)
                })
              )
            : e instanceof Uint8Array || e instanceof ArrayBuffer
            ? new c.Bytes(e)
            : 'object' == typeof e
            ? new t({ object: b(e) })
            : e
        )
      }
      function b(e) {
        if (null !== e) {
          var i = {}
          return (
            Object.keys(e).forEach(function (a) {
              i[a] = h(e[a])
            }),
            i
          )
        }
        return null
      }
      ;(d.exact = function (e, i) {
        d(e, e, i)
      }),
        (d.max = function (e, i) {
          d(null, e, i)
        }),
        (d.min = function (e, i) {
          d(e, null, i)
        }),
        (d.between = function (e, i, a) {
          d(e, i, a)
        }),
        (e.exports = {
          Ref: function () {
            switch ((d.between(1, 2, arguments), arguments.length)) {
              case 1:
                return new t({ '@ref': h(arguments[0]) })
              case 2:
                return new t({ ref: h(arguments[0]), id: h(arguments[1]) })
            }
          },
          Bytes: function (e) {
            return d.exact(1, arguments), new c.Bytes(e)
          },
          Abort: function (e) {
            return d.exact(1, arguments), new t({ abort: h(e) })
          },
          At: function (e, i) {
            return d.exact(2, arguments), new t({ at: h(e), expr: h(i) })
          },
          Let: function (e, i) {
            return (
              d.exact(2, arguments),
              'function' == typeof i &&
                (i = i.apply(
                  null,
                  Object.keys(e).map(function (e) {
                    return p(e)
                  })
                )),
              new t({ let: b(e), in: h(i) })
            )
          },
          Var: p,
          If: function (e, i, a) {
            return (
              d.exact(3, arguments), new t({ if: h(e), then: h(i), else: h(a) })
            )
          },
          Do: function () {
            d.min(1, arguments)
            var e = f(arguments)
            return new t({ do: h(e) })
          },
          Object: function (e) {
            return d.exact(1, arguments), new t({ object: b(e) })
          },
          Lambda: l,
          Call: function (e) {
            d.min(1, arguments)
            var i = f(arguments)
            return i.shift(), new t({ call: h(e), arguments: x(i) })
          },
          Query: function (e) {
            return d.exact(1, arguments), new t({ query: h(e) })
          },
          Map: function (e, i) {
            return d.exact(2, arguments), new t({ map: h(i), collection: h(e) })
          },
          Foreach: function (e, i) {
            return (
              d.exact(2, arguments), new t({ foreach: h(i), collection: h(e) })
            )
          },
          Filter: function (e, i) {
            return (
              d.exact(2, arguments), new t({ filter: h(i), collection: h(e) })
            )
          },
          Take: function (e, i) {
            return (
              d.exact(2, arguments), new t({ take: h(e), collection: h(i) })
            )
          },
          Drop: function (e, i) {
            return (
              d.exact(2, arguments), new t({ drop: h(e), collection: h(i) })
            )
          },
          Prepend: function (e, i) {
            return (
              d.exact(2, arguments), new t({ prepend: h(e), collection: h(i) })
            )
          },
          Append: function (e, i) {
            return (
              d.exact(2, arguments), new t({ append: h(e), collection: h(i) })
            )
          },
          IsEmpty: function (e) {
            return d.exact(1, arguments), new t({ is_empty: h(e) })
          },
          IsNonEmpty: function (e) {
            return d.exact(1, arguments), new t({ is_nonempty: h(e) })
          },
          Get: function (e, i) {
            return (
              d.between(1, 2, arguments),
              (i = v(i, null)),
              new t(m({ get: h(e) }, { ts: h(i) }))
            )
          },
          KeyFromSecret: function (e) {
            return d.exact(1, arguments), new t({ key_from_secret: h(e) })
          },
          Paginate: function (e, i) {
            return (
              d.between(1, 2, arguments),
              (i = v(i, {})),
              new t(r({ paginate: h(e) }, b(i)))
            )
          },
          Exists: function (e, i) {
            return (
              d.between(1, 2, arguments),
              (i = v(i, null)),
              new t(m({ exists: h(e) }, { ts: h(i) }))
            )
          },
          Create: function (e, i) {
            return (
              d.between(1, 2, arguments), new t({ create: h(e), params: h(i) })
            )
          },
          Update: function (e, i) {
            return d.exact(2, arguments), new t({ update: h(e), params: h(i) })
          },
          Replace: function (e, i) {
            return d.exact(2, arguments), new t({ replace: h(e), params: h(i) })
          },
          Delete: function (e) {
            return d.exact(1, arguments), new t({ delete: h(e) })
          },
          Insert: function (e, i, a, n) {
            return (
              d.exact(4, arguments),
              new t({ insert: h(e), ts: h(i), action: h(a), params: h(n) })
            )
          },
          Remove: function (e, i, a) {
            return (
              d.exact(3, arguments),
              new t({ remove: h(e), ts: h(i), action: h(a) })
            )
          },
          CreateClass: function (e) {
            return d.exact(1, arguments), new t({ create_class: h(e) })
          },
          CreateDatabase: function (e) {
            return d.exact(1, arguments), new t({ create_database: h(e) })
          },
          CreateIndex: function (e) {
            return d.exact(1, arguments), new t({ create_index: h(e) })
          },
          CreateKey: function (e) {
            return d.exact(1, arguments), new t({ create_key: h(e) })
          },
          CreateFunction: function (e) {
            return d.exact(1, arguments), new t({ create_function: h(e) })
          },
          Singleton: function (e) {
            return d.exact(1, arguments), new t({ singleton: h(e) })
          },
          Events: function (e) {
            return d.exact(1, arguments), new t({ events: h(e) })
          },
          Match: function (e) {
            d.min(1, arguments)
            var i = f(arguments)
            return i.shift(), new t({ match: h(e), terms: h(x(i)) })
          },
          Union: function () {
            return d.min(1, arguments), new t({ union: h(x(arguments)) })
          },
          Intersection: function () {
            return d.min(1, arguments), new t({ intersection: h(x(arguments)) })
          },
          Difference: function () {
            return d.min(1, arguments), new t({ difference: h(x(arguments)) })
          },
          Distinct: function (e) {
            return d.exact(1, arguments), new t({ distinct: h(e) })
          },
          Join: function (e, i) {
            return d.exact(2, arguments), new t({ join: h(e), with: h(i) })
          },
          Login: function (e, i) {
            return d.exact(2, arguments), new t({ login: h(e), params: h(i) })
          },
          Logout: function (e) {
            return d.exact(1, arguments), new t({ logout: h(e) })
          },
          Identify: function (e, i) {
            return (
              d.exact(2, arguments), new t({ identify: h(e), password: h(i) })
            )
          },
          Identity: function () {
            return d.exact(0, arguments), new t({ identity: null })
          },
          HasIdentity: function () {
            return d.exact(0, arguments), new t({ has_identity: null })
          },
          Concat: function (e, i) {
            return (
              d.min(1, arguments),
              (i = v(i, null)),
              new t(m({ concat: h(e) }, { separator: h(i) }))
            )
          },
          Casefold: function (e, i) {
            return (
              d.min(1, arguments),
              new t(m({ casefold: h(e) }, { normalizer: h(i) }))
            )
          },
          NGram: function (e, i, a) {
            return (
              d.between(1, 3, arguments),
              (i = v(i, null)),
              (a = v(a, null)),
              new t(m({ ngram: h(e) }, { min: h(i), max: h(a) }))
            )
          },
          Time: function (e) {
            return d.exact(1, arguments), new t({ time: h(e) })
          },
          Epoch: function (e, i) {
            return d.exact(2, arguments), new t({ epoch: h(e), unit: h(i) })
          },
          Date: function (e) {
            return d.exact(1, arguments), new t({ date: h(e) })
          },
          NextId: o(function () {
            return d.exact(0, arguments), new t({ next_id: null })
          }, 'NextId() is deprecated, use NewId() instead'),
          NewId: function () {
            return d.exact(0, arguments), new t({ new_id: null })
          },
          Database: function (e, i) {
            switch ((d.between(1, 2, arguments), arguments.length)) {
              case 1:
                return new t({ database: h(e) })
              case 2:
                return new t({ database: h(e), scope: h(i) })
            }
          },
          Index: function (e, i) {
            switch ((d.between(1, 2, arguments), arguments.length)) {
              case 1:
                return new t({ index: h(e) })
              case 2:
                return new t({ index: h(e), scope: h(i) })
            }
          },
          Class: function (e, i) {
            switch ((d.between(1, 2, arguments), arguments.length)) {
              case 1:
                return new t({ class: h(e) })
              case 2:
                return new t({ class: h(e), scope: h(i) })
            }
          },
          Function: function (e, i) {
            switch ((d.between(1, 2, arguments), arguments.length)) {
              case 1:
                return new t({ function: h(e) })
              case 2:
                return new t({ function: h(e), scope: h(i) })
            }
          },
          Classes: function (e) {
            return (
              d.max(1, arguments), (e = v(e, null)), new t({ classes: h(e) })
            )
          },
          Databases: function (e) {
            return (
              d.max(1, arguments), (e = v(e, null)), new t({ databases: h(e) })
            )
          },
          Indexes: function (e) {
            return (
              d.max(1, arguments), (e = v(e, null)), new t({ indexes: h(e) })
            )
          },
          Functions: function (e) {
            return (
              d.max(1, arguments), (e = v(e, null)), new t({ functions: h(e) })
            )
          },
          Keys: function (e) {
            return d.max(1, arguments), (e = v(e, null)), new t({ keys: h(e) })
          },
          Tokens: function (e) {
            return (
              d.max(1, arguments), (e = v(e, null)), new t({ tokens: h(e) })
            )
          },
          Credentials: function (e) {
            return (
              d.max(1, arguments),
              (e = v(e, null)),
              new t({ credentials: h(e) })
            )
          },
          Equals: function () {
            return d.min(1, arguments), new t({ equals: x(arguments) })
          },
          Contains: function (e, i) {
            return d.exact(2, arguments), new t({ contains: h(e), in: h(i) })
          },
          Select: function (e, i, a) {
            d.between(2, 3, arguments)
            var n = { select: h(e), from: h(i) }
            return void 0 !== a && (n.default = h(a)), new t(n)
          },
          SelectAll: function (e, i) {
            return (
              d.exact(2, arguments), new t({ select_all: h(e), from: h(i) })
            )
          },
          Add: function () {
            return d.min(1, arguments), new t({ add: h(x(arguments)) })
          },
          Multiply: function () {
            return d.min(1, arguments), new t({ multiply: h(x(arguments)) })
          },
          Subtract: function () {
            return d.min(1, arguments), new t({ subtract: h(x(arguments)) })
          },
          Divide: function () {
            return d.min(1, arguments), new t({ divide: h(x(arguments)) })
          },
          Modulo: function () {
            return d.min(1, arguments), new t({ modulo: h(x(arguments)) })
          },
          LT: function () {
            return d.min(1, arguments), new t({ lt: h(x(arguments)) })
          },
          LTE: function () {
            return d.min(1, arguments), new t({ lte: h(x(arguments)) })
          },
          GT: function () {
            return d.min(1, arguments), new t({ gt: h(x(arguments)) })
          },
          GTE: function () {
            return d.min(1, arguments), new t({ gte: h(x(arguments)) })
          },
          And: function () {
            return d.min(1, arguments), new t({ and: h(x(arguments)) })
          },
          Or: function () {
            return d.min(1, arguments), new t({ or: h(x(arguments)) })
          },
          Not: function (e) {
            return d.exact(1, arguments), new t({ not: h(e) })
          },
          ToString: function (e) {
            return d.exact(1, arguments), new t({ to_string: h(e) })
          },
          ToNumber: function (e) {
            return d.exact(1, arguments), new t({ to_number: h(e) })
          },
          ToTime: function (e) {
            return d.exact(1, arguments), new t({ to_time: h(e) })
          },
          ToDate: function (e) {
            return d.exact(1, arguments), new t({ to_date: h(e) })
          },
          wrap: h,
        })
    },
    function (e, i, a) {
      'use strict'
      function n(e) {
        this.raw = e
      }
      n.prototype.toJSON = function () {
        return this.raw
      }
      var o = [
          'Do',
          'Call',
          'Union',
          'Intersection',
          'Difference',
          'Equals',
          'Add',
          'Multiply',
          'Subtract',
          'Divide',
          'Modulo',
          'LT',
          'LTE',
          'GT',
          'GTE',
          'And',
          'Or',
        ],
        t = {
          is_nonempty: 'is_non_empty',
          lt: 'LT',
          lte: 'LTE',
          gt: 'GT',
          gte: 'GTE',
        },
        s = function (e, i) {
          e instanceof n && (e = e.raw)
          var a = typeof e
          if ('string' === a) return '"' + e + '"'
          if ('symbol' === a || 'number' === a || 'boolean' === a)
            return e.toString()
          if ('undefined' === a) return 'undefined'
          if (null === e) return 'null'
          if (Array.isArray(e)) {
            var c = e
              .map(function (e) {
                return s(e)
              })
              .join(', ')
            return o.includes(i) ? c : '[' + c + ']'
          }
          var r = Object.keys(e),
            p = r[0]
          if ('object' === p)
            return (
              '{' +
              Object.keys(e.object)
                .map(function (i) {
                  return i + ': ' + s(e.object[i])
                })
                .join(', ') +
              '}'
            )
          p in t && (p = t[p]),
            (p = p
              .split('_')
              .map(function (e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
              })
              .join(''))
          var l = r
            .map(function (i) {
              var a = e[i]
              return s(a, p)
            })
            .join(', ')
          return p + '(' + l + ')'
        }
      ;(n.toString = s), (e.exports = n)
    },
    function (e, i, a) {
      'use strict'
      const n = a(42)('superagent'),
        o = a(50),
        t = a(53),
        s = a(65),
        c = a(2).parse,
        r = a(2).format,
        p = a(2).resolve
      let l = a(21)
      const u = a(1),
        d = a(20),
        m = a(67).unzip,
        x = a(69),
        f = a(70),
        v = a(13),
        h = a(7),
        b = a(3),
        g = a(23),
        y = a(22),
        w = a(0),
        k = a(74),
        _ = a(75),
        j = a(8)
      function C(e, a) {
        return 'function' == typeof a
          ? new i.Request('GET', e).end(a)
          : 1 == arguments.length
          ? new i.Request('GET', e)
          : new i.Request(e, a)
      }
      function z() {}
      function E(e) {
        const i = `node-superagent/${k.version}`
        ;(e._header = { 'user-agent': i }), (e.header = { 'User-Agent': i })
      }
      function S(e, i) {
        u.call(this),
          'string' != typeof i && (i = r(i)),
          (this._agent = !1),
          (this._formData = null),
          (this.method = e),
          (this.url = i),
          E(this),
          (this.writable = !0),
          (this._redirects = 0),
          this.redirects('HEAD' === e ? 0 : 5),
          (this.cookies = ''),
          (this.qs = {}),
          (this._query = []),
          (this.qsRaw = this._query),
          (this._redirectList = []),
          (this._streamRequest = !1),
          this.once('end', this.clearTimeout.bind(this))
      }
      function O(e) {
        return /[\/+]json($|[^-\w])/.test(e)
      }
      function q(e) {
        return ~[301, 302, 303, 305, 307, 308].indexOf(e)
      }
      ;((i = e.exports = C).Request = S),
        (i.agent = a(77)),
        (i.Response = s),
        f.define(
          {
            'application/x-www-form-urlencoded': [
              'form',
              'urlencoded',
              'form-data',
            ],
          },
          !0
        ),
        (i.protocols = { 'http:': h, 'https:': v }),
        (i.serialize = {
          'application/x-www-form-urlencoded': g.stringify,
          'application/json': JSON.stringify,
        }),
        (i.parse = a(79)),
        w.inherits(S, u),
        _(S.prototype),
        (S.prototype.attach = function (e, i, a) {
          if (i) {
            if (this._data)
              throw Error("superagent can't mix .send() and .attach()")
            let o = a || {}
            'string' == typeof a && (o = { filename: a }),
              'string' == typeof i
                ? (o.filename || (o.filename = i),
                  n('creating `fs.ReadStream` instance for file: %s', i),
                  (i = b.createReadStream(i)))
                : !o.filename && i.path && (o.filename = i.path),
              this._getFormData().append(e, i, o)
          }
          return this
        }),
        (S.prototype._getFormData = function () {
          return (
            this._formData ||
              ((this._formData = new t()),
              this._formData.on('error', (e) => {
                this.emit('error', e), this.abort()
              })),
            this._formData
          )
        }),
        (S.prototype.agent = function (e) {
          return arguments.length ? ((this._agent = e), this) : this._agent
        }),
        (S.prototype.type = function (e) {
          return this.set('Content-Type', ~e.indexOf('/') ? e : f.lookup(e))
        }),
        (S.prototype.accept = function (e) {
          return this.set('Accept', ~e.indexOf('/') ? e : f.lookup(e))
        }),
        (S.prototype.query = function (e) {
          return (
            'string' == typeof e ? this._query.push(e) : x(this.qs, e), this
          )
        }),
        (S.prototype.write = function (e, i) {
          const a = this.request()
          return (
            this._streamRequest || (this._streamRequest = !0), a.write(e, i)
          )
        }),
        (S.prototype.pipe = function (e, i) {
          return (
            (this.piped = !0),
            this.buffer(!1),
            this.end(),
            this._pipeContinue(e, i)
          )
        }),
        (S.prototype._pipeContinue = function (e, i) {
          return (
            this.req.once('response', (a) => {
              if (q(a.statusCode) && this._redirects++ != this._maxRedirects)
                return this._redirect(a)._pipeContinue(e, i)
              if (((this.res = a), this._emitResponse(), !this._aborted)) {
                if (this._shouldUnzip(a)) {
                  const n = y.createUnzip()
                  n.on('error', (i) => {
                    i && 'Z_BUF_ERROR' === i.code
                      ? e.emit('end')
                      : e.emit('error', i)
                  }),
                    a.pipe(n).pipe(e, i)
                } else a.pipe(e, i)
                a.once('end', () => {
                  this.emit('end')
                })
              }
            }),
            e
          )
        }),
        (S.prototype.buffer = function (e) {
          return (this._buffer = !1 !== e), this
        }),
        (S.prototype._redirect = function (e) {
          let i = e.headers.location
          if (!i)
            return this.callback(
              new Error('No location header for redirect'),
              e
            )
          n('redirect %s -> %s', this.url, i), (i = p(this.url, i)), e.resume()
          let a = this.req._headers
          const o = c(i).host !== c(this.url).host
          return (
            (301 != e.statusCode && 302 != e.statusCode) ||
              ((a = d.cleanHeader(this.req._headers, o)),
              (this.method = 'HEAD' == this.method ? 'HEAD' : 'GET'),
              (this._data = null)),
            303 == e.statusCode &&
              ((a = d.cleanHeader(this.req._headers, o)),
              (this.method = 'GET'),
              (this._data = null)),
            delete a.host,
            delete this.req,
            delete this._formData,
            E(this),
            (this._endCalled = !1),
            (this.url = i),
            (this.qs = {}),
            (this._query.length = 0),
            this.set(a),
            this.emit('redirect', e),
            this._redirectList.push(this.url),
            this.end(this._callback),
            this
          )
        }),
        (S.prototype.auth = function (e, i, a) {
          1 === arguments.length && (i = ''),
            'object' == typeof i && null !== i && ((a = i), (i = '')),
            a || (a = { type: 'basic' })
          return this._auth(e, i, a, function (e) {
            return new Buffer(e).toString('base64')
          })
        }),
        (S.prototype.ca = function (e) {
          return (this._ca = e), this
        }),
        (S.prototype.key = function (e) {
          return (this._key = e), this
        }),
        (S.prototype.pfx = function (e) {
          return (
            'object' != typeof e || Buffer.isBuffer(e)
              ? (this._pfx = e)
              : ((this._pfx = e.pfx), (this._passphrase = e.passphrase)),
            this
          )
        }),
        (S.prototype.cert = function (e) {
          return (this._cert = e), this
        }),
        (S.prototype.request = function () {
          if (this.req) return this.req
          const e = {}
          try {
            const e = g.stringify(this.qs, {
              indices: !1,
              strictNullHandling: !0,
            })
            e && ((this.qs = {}), this._query.push(e)),
              this._finalizeQueryString()
          } catch (e) {
            return this.emit('error', e)
          }
          let a = this.url
          const n = this._retries
          if (
            (0 != a.indexOf('http') && (a = `http://${a}`),
            (a = c(a)),
            !0 === /^https?\+unix:/.test(a.protocol))
          ) {
            a.protocol = `${a.protocol.split('+')[0]}:`
            const i = a.path.match(/^([^/]+)(.+)$/)
            ;(e.socketPath = i[1].replace(/%2F/g, '/')), (a.path = i[2])
          }
          ;(e.method = this.method),
            (e.port = a.port),
            (e.path = a.path),
            (e.host = a.hostname),
            (e.ca = this._ca),
            (e.key = this._key),
            (e.pfx = this._pfx),
            (e.cert = this._cert),
            (e.passphrase = this._passphrase),
            (e.agent = this._agent)
          const o = i.protocols[a.protocol],
            t = (this.req = o.request(e))
          if (
            (t.setNoDelay(!0),
            'HEAD' != e.method &&
              t.setHeader('Accept-Encoding', 'gzip, deflate'),
            (this.protocol = a.protocol),
            (this.host = a.host),
            t.once('drain', () => {
              this.emit('drain')
            }),
            t.once('error', (e) => {
              this._aborted ||
                (this._retries === n && (this.response || this.callback(e)))
            }),
            a.auth)
          ) {
            const e = a.auth.split(':')
            this.auth(e[0], e[1])
          }
          this.username &&
            this.password &&
            this.auth(this.username, this.password)
          for (const e in this.header)
            this.header.hasOwnProperty(e) && t.setHeader(e, this.header[e])
          if (this.cookies)
            if (this.header.hasOwnProperty('cookie')) {
              const e = new j.CookieJar()
              e.setCookies(this.header.cookie.split(';')),
                e.setCookies(this.cookies.split(';')),
                t.setHeader(
                  'Cookie',
                  e.getCookies(j.CookieAccessInfo.All).toValueString()
                )
            } else t.setHeader('Cookie', this.cookies)
          return t
        }),
        (S.prototype.callback = function (e, i) {
          if (this._shouldRetry(e, i)) return this._retry()
          const a = this._callback || z
          if ((this.clearTimeout(), this.called))
            return console.warn('superagent: double callback bug')
          if (((this.called = !0), !e))
            try {
              if (!this._isResponseOK(i)) {
                let a = 'Unsuccessful HTTP response'
                i && (a = h.STATUS_CODES[i.status] || a),
                  ((e = new Error(a)).status = i ? i.status : void 0)
              }
            } catch (i) {
              e = i
            }
          if (!e) return a(null, i)
          ;(e.response = i),
            this._maxRetries && (e.retries = this._retries - 1),
            e && this.listeners('error').length > 0 && this.emit('error', e),
            a(e, i)
        }),
        (S.prototype._isHost = function (e) {
          return Buffer.isBuffer(e) || e instanceof u || e instanceof t
        }),
        (S.prototype._emitResponse = function (e, i) {
          const a = new s(this)
          return (
            (this.response = a),
            (a.redirects = this._redirectList),
            void 0 !== e && (a.body = e),
            (a.files = i),
            this.emit('response', a),
            a
          )
        }),
        (S.prototype.end = function (e) {
          return (
            this.request(),
            n('%s %s', this.method, this.url),
            this._endCalled &&
              console.warn(
                'Warning: .end() was called twice. This is not supported in superagent'
              ),
            (this._endCalled = !0),
            (this._callback = e || z),
            this._end()
          )
        }),
        (S.prototype._end = function () {
          let e = this._data
          const a = this.req
          let t = this._buffer
          const s = this.method
          if ((this._setTimeouts(), 'HEAD' != s && !a._headerSent)) {
            if ('string' != typeof e) {
              let n = a.getHeader('Content-Type')
              n && (n = n.split(';')[0])
              let o = i.serialize[n]
              !o && O(n) && (o = i.serialize['application/json']),
                o && (e = o(e))
            }
            e &&
              !a.getHeader('Content-Length') &&
              a.setHeader(
                'Content-Length',
                Buffer.isBuffer(e) ? e.length : Buffer.byteLength(e)
              )
          }
          a.once('response', (e) => {
            if (
              (n('%s %s -> %s', this.method, this.url, e.statusCode),
              this._responseTimeoutTimer &&
                clearTimeout(this._responseTimeoutTimer),
              this.piped)
            )
              return
            const s = this._maxRedirects,
              c = d.type(e.headers['content-type'] || '') || 'text/plain',
              r = c.split('/')[0],
              p = 'multipart' == r,
              l = q(e.statusCode)
            let u = this._parser
            const x = this._responseType
            if (((this.res = e), l && this._redirects++ != s))
              return this._redirect(e)
            if ('HEAD' == this.method)
              return (
                this.emit('end'), void this.callback(null, this._emitResponse())
              )
            if ((this._shouldUnzip(e) && m(a, e), !u))
              if (x) (u = i.parse.image), (t = !0)
              else if (p) {
                const e = new o.IncomingForm()
                ;(u = e.parse.bind(e)), (t = !0)
              } else
                !(function (e) {
                  const i = e.split('/')[0]
                  return 'image' == i || 'video' == i
                })(c)
                  ? i.parse[c]
                    ? (u = i.parse[c])
                    : 'text' == r
                    ? ((u = i.parse.text), (t = !1 !== t))
                    : O(c)
                    ? ((u = i.parse['application/json']), (t = !1 !== t))
                    : t && (u = i.parse.text)
                  : ((u = i.parse.image), (t = !0))
            ;((void 0 === t &&
              (function (e) {
                const i = e.split('/'),
                  a = i[0],
                  n = i[1]
                return 'text' == a || 'x-www-form-urlencoded' == n
              })(c)) ||
              O(c)) &&
              (t = !0)
            let f = !1
            if (t) {
              let i = this._maxResponseSize || 2e8
              e.on('data', (a) => {
                if ((i -= a.byteLength || a.length) < 0) {
                  const i = Error('Maximum response size reached')
                  ;(i.code = 'ETOOLARGE'), (f = !1), e.destroy(i)
                }
              })
            }
            if (u)
              try {
                ;(f = t),
                  u(e, (e, i, a) => {
                    if (!this.timedout)
                      return e && !this._aborted
                        ? this.callback(e)
                        : void (
                            f &&
                            (this.emit('end'),
                            this.callback(null, this._emitResponse(i, a)))
                          )
                  })
              } catch (e) {
                return void this.callback(e)
              }
            if (((this.res = e), t))
              e.once('error', (e) => {
                ;(f = !1), this.callback(e, null)
              }),
                f ||
                  e.once('end', () => {
                    n('end %s %s', this.method, this.url),
                      this.emit('end'),
                      this.callback(null, this._emitResponse())
                  })
            else {
              if (
                (n('unbuffered %s %s', this.method, this.url),
                this.callback(null, this._emitResponse()),
                p)
              )
                return
              e.once('end', () => {
                n('end %s %s', this.method, this.url), this.emit('end')
              })
            }
          }),
            this.emit('request', this)
          const c = () => {
              const e = a.getHeader('Content-Length')
              let i = 0
              const n = new u.Transform()
              return (
                (n._transform = (a, n, o) => {
                  ;(i += a.length),
                    this.emit('progress', {
                      direction: 'upload',
                      lengthComputable: !0,
                      loaded: i,
                      total: e,
                    }),
                    o(null, a)
                }),
                n
              )
            },
            r = this._formData
          if (r) {
            const e = r.getHeaders()
            for (const i in e)
              n('setting FormData header: "%s: %s"', i, e[i]),
                a.setHeader(i, e[i])
            r.getLength((e, i) => {
              n('got FormData Content-Length: %s', i),
                'number' == typeof i && a.setHeader('Content-Length', i),
                r.pipe(c()).pipe(a)
            })
          } else
            Buffer.isBuffer(e)
              ? ((e) => {
                  const i = new u.Readable(),
                    a = e.length,
                    n = a % 16384,
                    o = a - n
                  for (let a = 0; a < o; a += 16384) {
                    const n = e.slice(a, a + 16384)
                    i.push(n)
                  }
                  if (n > 0) {
                    const a = e.slice(-n)
                    i.push(a)
                  }
                  return i.push(null), i
                })(e)
                  .pipe(c())
                  .pipe(a)
              : a.end(e)
          return this
        }),
        (S.prototype._shouldUnzip = (e) =>
          204 !== e.statusCode &&
          304 !== e.statusCode &&
          '0' !== e.headers['content-length'] &&
          /^\s*(?:deflate|gzip)\s*$/.test(e.headers['content-encoding'])),
        -1 == l.indexOf('del') && (l = l.slice(0)).push('del'),
        l.forEach((e) => {
          const i = e
          ;(e = (e = 'del' == e ? 'delete' : e).toUpperCase()),
            (C[i] = (i, a, n) => {
              const o = C(e, i)
              return (
                'function' == typeof a && ((n = a), (a = null)),
                a && ('GET' === e || 'HEAD' === e ? o.query(a) : o.send(a)),
                n && o.end(n),
                o
              )
            })
        })
    },
    function (e, i, a) {
      'use strict'
      e.exports = function (e) {
        function i(e) {
          for (var i = 0, a = 0; a < e.length; a++)
            (i = (i << 5) - i + e.charCodeAt(a)), (i |= 0)
          return n.colors[Math.abs(i) % n.colors.length]
        }
        function n(e) {
          var a
          function s() {
            for (var e = arguments.length, i = new Array(e), o = 0; o < e; o++)
              i[o] = arguments[o]
            if (s.enabled) {
              var t = s,
                c = Number(new Date()),
                r = c - (a || c)
              ;(t.diff = r),
                (t.prev = a),
                (t.curr = c),
                (a = c),
                (i[0] = n.coerce(i[0])),
                'string' != typeof i[0] && i.unshift('%O')
              var p = 0
              ;(i[0] = i[0].replace(/%([a-zA-Z%])/g, function (e, a) {
                if ('%%' === e) return e
                p++
                var o = n.formatters[a]
                if ('function' == typeof o) {
                  var s = i[p]
                  ;(e = o.call(t, s)), i.splice(p, 1), p--
                }
                return e
              })),
                n.formatArgs.call(t, i),
                (t.log || n.log).apply(t, i)
            }
          }
          return (
            (s.namespace = e),
            (s.enabled = n.enabled(e)),
            (s.useColors = n.useColors()),
            (s.color = i(e)),
            (s.destroy = o),
            (s.extend = t),
            'function' == typeof n.init && n.init(s),
            n.instances.push(s),
            s
          )
        }
        function o() {
          var e = n.instances.indexOf(this)
          return -1 !== e && (n.instances.splice(e, 1), !0)
        }
        function t(e, i) {
          return n(this.namespace + (void 0 === i ? ':' : i) + e)
        }
        return (
          (n.debug = n),
          (n.default = n),
          (n.coerce = function (e) {
            return e instanceof Error ? e.stack || e.message : e
          }),
          (n.disable = function () {
            n.enable('')
          }),
          (n.enable = function (e) {
            var i
            n.save(e), (n.names = []), (n.skips = [])
            var a = ('string' == typeof e ? e : '').split(/[\s,]+/),
              o = a.length
            for (i = 0; i < o; i++)
              a[i] &&
                ('-' === (e = a[i].replace(/\*/g, '.*?'))[0]
                  ? n.skips.push(new RegExp('^' + e.substr(1) + '$'))
                  : n.names.push(new RegExp('^' + e + '$')))
            for (i = 0; i < n.instances.length; i++) {
              var t = n.instances[i]
              t.enabled = n.enabled(t.namespace)
            }
          }),
          (n.enabled = function (e) {
            if ('*' === e[e.length - 1]) return !0
            var i, a
            for (i = 0, a = n.skips.length; i < a; i++)
              if (n.skips[i].test(e)) return !1
            for (i = 0, a = n.names.length; i < a; i++)
              if (n.names[i].test(e)) return !0
            return !1
          }),
          (n.humanize = a(44)),
          Object.keys(e).forEach(function (i) {
            n[i] = e[i]
          }),
          (n.instances = []),
          (n.names = []),
          (n.skips = []),
          (n.formatters = {}),
          (n.selectColor = i),
          n.enable(n.load()),
          n
        )
      }
    },
    function (e, i) {
      e.exports = require('https')
    },
    function (e, i, a) {
      var n = a(15),
        o = a(16)
      e.exports = function (e, i, a, t) {
        var s = a.keyedList ? a.keyedList[a.index] : a.index
        a.jobs[s] = (function (e, i, a, o) {
          var t
          t = 2 == e.length ? e(a, n(o)) : e(a, i, n(o))
          return t
        })(i, s, e[s], function (e, i) {
          s in a.jobs &&
            (delete a.jobs[s], e ? o(a) : (a.results[s] = i), t(e, a.results))
        })
      }
    },
    function (e, i, a) {
      var n = a(62)
      e.exports = function (e) {
        var i = !1
        return (
          n(function () {
            i = !0
          }),
          function (a, o) {
            i
              ? e(a, o)
              : n(function () {
                  e(a, o)
                })
          }
        )
      }
    },
    function (e, i) {
      e.exports = function (e) {
        Object.keys(e.jobs).forEach(
          function (e) {
            'function' == typeof this.jobs[e] && this.jobs[e]()
          }.bind(e)
        ),
          (e.jobs = {})
      }
    },
    function (e, i) {
      e.exports = function (e, i) {
        var a = !Array.isArray(e),
          n = {
            index: 0,
            keyedList: a || i ? Object.keys(e) : null,
            jobs: {},
            results: a ? {} : [],
            size: a ? Object.keys(e).length : e.length,
          }
        i &&
          n.keyedList.sort(
            a
              ? i
              : function (a, n) {
                  return i(e[a], e[n])
                }
          )
        return n
      }
    },
    function (e, i, a) {
      var n = a(16),
        o = a(15)
      e.exports = function (e) {
        if (!Object.keys(this.jobs).length) return
        ;(this.index = this.size), n(this), o(e)(null, this.results)
      }
    },
    function (e, i, a) {
      var n = a(14),
        o = a(17),
        t = a(18)
      function s(e, i) {
        return e < i ? -1 : e > i ? 1 : 0
      }
      ;(e.exports = function (e, i, a, s) {
        var c = o(e, a)
        return (
          n(e, i, c, function a(o, t) {
            o
              ? s(o, t)
              : (c.index++,
                c.index < (c.keyedList || e).length
                  ? n(e, i, c, a)
                  : s(null, c.results))
          }),
          t.bind(c, s)
        )
      }),
        (e.exports.ascending = s),
        (e.exports.descending = function (e, i) {
          return -1 * s(e, i)
        })
    },
    function (e, i, a) {
      'use strict'
      ;(i.type = function (e) {
        return e.split(/ *; */).shift()
      }),
        (i.params = function (e) {
          return e.split(/ *; */).reduce(function (e, i) {
            var a = i.split(/ *= */),
              n = a.shift(),
              o = a.shift()
            return n && o && (e[n] = o), e
          }, {})
        }),
        (i.parseLinks = function (e) {
          return e.split(/ *, */).reduce(function (e, i) {
            var a = i.split(/ *; */),
              n = a[0].slice(1, -1)
            return (e[a[1].split(/ *= */)[1].slice(1, -1)] = n), e
          }, {})
        }),
        (i.cleanHeader = function (e, i) {
          return (
            delete e['content-type'],
            delete e['content-length'],
            delete e['transfer-encoding'],
            delete e.host,
            i && (delete e.authorization, delete e.cookie),
            e
          )
        })
    },
    function (e, i, a) {
      'use strict'
      /*!
       * methods
       * Copyright(c) 2013-2014 TJ Holowaychuk
       * Copyright(c) 2015-2016 Douglas Christopher Wilson
       * MIT Licensed
       */ var n = a(7)
      e.exports = (n.METHODS &&
        n.METHODS.map(function (e) {
          return e.toLowerCase()
        })) || [
        'get',
        'post',
        'put',
        'head',
        'delete',
        'options',
        'trace',
        'copy',
        'lock',
        'mkcol',
        'move',
        'purge',
        'propfind',
        'proppatch',
        'unlock',
        'report',
        'mkactivity',
        'checkout',
        'merge',
        'm-search',
        'notify',
        'subscribe',
        'unsubscribe',
        'patch',
        'search',
        'connect',
      ]
    },
    function (e, i) {
      e.exports = require('zlib')
    },
    function (e, i, a) {
      'use strict'
      var n = a(72),
        o = a(73),
        t = a(25)
      e.exports = { formats: t, parse: o, stringify: n }
    },
    function (e, i, a) {
      'use strict'
      var n = Object.prototype.hasOwnProperty,
        o = (function () {
          for (var e = [], i = 0; i < 256; ++i)
            e.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase())
          return e
        })()
      ;(i.arrayToObject = function (e, i) {
        for (
          var a = i && i.plainObjects ? Object.create(null) : {}, n = 0;
          n < e.length;
          ++n
        )
          void 0 !== e[n] && (a[n] = e[n])
        return a
      }),
        (i.merge = function (e, a, o) {
          if (!a) return e
          if ('object' != typeof a) {
            if (Array.isArray(e)) e.push(a)
            else {
              if ('object' != typeof e) return [e, a]
              ;(o.plainObjects ||
                o.allowPrototypes ||
                !n.call(Object.prototype, a)) &&
                (e[a] = !0)
            }
            return e
          }
          if ('object' != typeof e) return [e].concat(a)
          var t = e
          return (
            Array.isArray(e) &&
              !Array.isArray(a) &&
              (t = i.arrayToObject(e, o)),
            Array.isArray(e) && Array.isArray(a)
              ? (a.forEach(function (a, t) {
                  n.call(e, t)
                    ? e[t] && 'object' == typeof e[t]
                      ? (e[t] = i.merge(e[t], a, o))
                      : e.push(a)
                    : (e[t] = a)
                }),
                e)
              : Object.keys(a).reduce(function (e, t) {
                  var s = a[t]
                  return (
                    n.call(e, t) ? (e[t] = i.merge(e[t], s, o)) : (e[t] = s), e
                  )
                }, t)
          )
        }),
        (i.assign = function (e, i) {
          return Object.keys(i).reduce(function (e, a) {
            return (e[a] = i[a]), e
          }, e)
        }),
        (i.decode = function (e) {
          try {
            return decodeURIComponent(e.replace(/\+/g, ' '))
          } catch (i) {
            return e
          }
        }),
        (i.encode = function (e) {
          if (0 === e.length) return e
          for (
            var i = 'string' == typeof e ? e : String(e), a = '', n = 0;
            n < i.length;
            ++n
          ) {
            var t = i.charCodeAt(n)
            45 === t ||
            46 === t ||
            95 === t ||
            126 === t ||
            (t >= 48 && t <= 57) ||
            (t >= 65 && t <= 90) ||
            (t >= 97 && t <= 122)
              ? (a += i.charAt(n))
              : t < 128
              ? (a += o[t])
              : t < 2048
              ? (a += o[192 | (t >> 6)] + o[128 | (63 & t)])
              : t < 55296 || t >= 57344
              ? (a +=
                  o[224 | (t >> 12)] +
                  o[128 | ((t >> 6) & 63)] +
                  o[128 | (63 & t)])
              : ((n += 1),
                (t = 65536 + (((1023 & t) << 10) | (1023 & i.charCodeAt(n)))),
                (a +=
                  o[240 | (t >> 18)] +
                  o[128 | ((t >> 12) & 63)] +
                  o[128 | ((t >> 6) & 63)] +
                  o[128 | (63 & t)]))
          }
          return a
        }),
        (i.compact = function (e) {
          for (
            var i = [{ obj: { o: e }, prop: 'o' }], a = [], n = 0;
            n < i.length;
            ++n
          )
            for (
              var o = i[n], t = o.obj[o.prop], s = Object.keys(t), c = 0;
              c < s.length;
              ++c
            ) {
              var r = s[c],
                p = t[r]
              'object' == typeof p &&
                null !== p &&
                -1 === a.indexOf(p) &&
                (i.push({ obj: t, prop: r }), a.push(p))
            }
          return (function (e) {
            for (var i; e.length; ) {
              var a = e.pop()
              if (((i = a.obj[a.prop]), Array.isArray(i))) {
                for (var n = [], o = 0; o < i.length; ++o)
                  void 0 !== i[o] && n.push(i[o])
                a.obj[a.prop] = n
              }
            }
            return i
          })(i)
        }),
        (i.isRegExp = function (e) {
          return '[object RegExp]' === Object.prototype.toString.call(e)
        }),
        (i.isBuffer = function (e) {
          return (
            null !== e &&
            void 0 !== e &&
            !!(
              e.constructor &&
              e.constructor.isBuffer &&
              e.constructor.isBuffer(e)
            )
          )
        })
    },
    function (e, i, a) {
      'use strict'
      var n = String.prototype.replace,
        o = /%20/g
      e.exports = {
        default: 'RFC3986',
        formatters: {
          RFC1738: function (e) {
            return n.call(e, o, '+')
          },
          RFC3986: function (e) {
            return e
          },
        },
        RFC1738: 'RFC1738',
        RFC3986: 'RFC3986',
      }
    },
    function (e, i, a) {
      'use strict'
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var n = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        t = Object.prototype.propertyIsEnumerable
      e.exports = (function () {
        try {
          if (!Object.assign) return !1
          var e = new String('abc')
          if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0]))
            return !1
          for (var i = {}, a = 0; a < 10; a++)
            i['_' + String.fromCharCode(a)] = a
          if (
            '0123456789' !==
            Object.getOwnPropertyNames(i)
              .map(function (e) {
                return i[e]
              })
              .join('')
          )
            return !1
          var n = {}
          return (
            'abcdefghijklmnopqrst'.split('').forEach(function (e) {
              n[e] = e
            }),
            'abcdefghijklmnopqrst' ===
              Object.keys(Object.assign({}, n)).join('')
          )
        } catch (e) {
          return !1
        }
      })()
        ? Object.assign
        : function (e, i) {
            for (
              var a,
                s,
                c = (function (e) {
                  if (null === e || void 0 === e)
                    throw new TypeError(
                      'Object.assign cannot be called with null or undefined'
                    )
                  return Object(e)
                })(e),
                r = 1;
              r < arguments.length;
              r++
            ) {
              for (var p in (a = Object(arguments[r])))
                o.call(a, p) && (c[p] = a[p])
              if (n) {
                s = n(a)
                for (var l = 0; l < s.length; l++)
                  t.call(a, s[l]) && (c[s[l]] = a[s[l]])
              }
            }
            return c
          }
    },
    function (e, i, a) {
      'use strict'
      var n = a(5)
      function o(e, i) {
        if ('object' != typeof i || null === i) return i
        if ('@ref' in i) {
          var a = i['@ref']
          if (!('class' in a || 'database' in a)) return n.Native.fromName(a.id)
          var t = o('class', a.class),
            s = o('database', a.database)
          return new n.Ref(a.id, t, s)
        }
        return '@obj' in i
          ? i['@obj']
          : '@set' in i
          ? new n.SetRef(i['@set'])
          : '@ts' in i
          ? new n.FaunaTime(i['@ts'])
          : '@date' in i
          ? new n.FaunaDate(i['@date'])
          : '@bytes' in i
          ? new n.Bytes(i['@bytes'])
          : '@query' in i
          ? new n.Query(i['@query'])
          : i
      }
      e.exports = {
        toJSON: function (e, i) {
          return (i = void 0 !== i && i)
            ? JSON.stringify(e, null, '  ')
            : JSON.stringify(e)
        },
        parseJSON: function (e) {
          return JSON.parse(e, o)
        },
      }
    },
    function (e, i, a) {
      'use strict'
      function n(e, i, a, n, o, t, s, c, r, p, l, u) {
        ;(this.client = e),
          (this.method = i),
          (this.path = a),
          (this.query = n),
          (this.requestRaw = o),
          (this.requestContent = t),
          (this.responseRaw = s),
          (this.responseContent = c),
          (this.statusCode = r),
          (this.responseHeaders = p),
          (this.startTime = l),
          (this.endTime = u)
      }
      Object.defineProperty(n.prototype, 'auth', {
        get: function () {
          return this.client._secret
        },
      }),
        Object.defineProperty(n.prototype, 'timeTaken', {
          get: function () {
            return this.endTime - this.startTime
          },
        }),
        (e.exports = n)
    },
    function (e, i, a) {
      'use strict'
      var n = a(9),
        o = a(26),
        t = a(30).Promise
      function s(e, i, a) {
        void 0 === a && (a = {}),
          (this.reverse = !1),
          (this.params = {}),
          (this.before = void 0),
          (this.after = void 0),
          o(this.params, a),
          'before' in a
            ? ((this.before = a.before), delete this.params.before)
            : 'after' in a &&
              ((this.after = a.after), delete this.params.after),
          (this.client = e),
          (this.set = i),
          (this._faunaFunctions = [])
      }
      ;(s.prototype.map = function (e) {
        var i = this._clone()
        return (
          i._faunaFunctions.push(function (i) {
            return n.Map(i, e)
          }),
          i
        )
      }),
        (s.prototype.filter = function (e) {
          var i = this._clone()
          return (
            i._faunaFunctions.push(function (i) {
              return n.Filter(i, e)
            }),
            i
          )
        }),
        (s.prototype.each = function (e) {
          return this._retrieveNextPage(this.after, !1).then(
            this._consumePages(e, !1)
          )
        }),
        (s.prototype.eachReverse = function (e) {
          return this._retrieveNextPage(this.before, !0).then(
            this._consumePages(e, !0)
          )
        }),
        (s.prototype.previousPage = function () {
          return this._retrieveNextPage(this.before, !0).then(
            this._adjustCursors.bind(this)
          )
        }),
        (s.prototype.nextPage = function () {
          return this._retrieveNextPage(this.after, !1).then(
            this._adjustCursors.bind(this)
          )
        }),
        (s.prototype._adjustCursors = function (e) {
          return (
            void 0 !== e.after && (this.after = e.after),
            void 0 !== e.before && (this.before = e.before),
            e.data
          )
        }),
        (s.prototype._consumePages = function (e, i) {
          var a = this
          return function (n) {
            var o
            return (
              e(n.data),
              void 0 !== (o = i ? n.before : n.after)
                ? a._retrieveNextPage(o, i).then(a._consumePages(e, i))
                : t.resolve()
            )
          }
        }),
        (s.prototype._retrieveNextPage = function (e, i) {
          var a = {}
          o(a, this.params),
            void 0 !== e
              ? i
                ? (a.before = e)
                : (a.after = e)
              : i && (a.before = null)
          var t = n.Paginate(this.set, a)
          return (
            this._faunaFunctions.length > 0 &&
              this._faunaFunctions.forEach(function (e) {
                t = e(t)
              }),
            this.client.query(t)
          )
        }),
        (s.prototype._clone = function () {
          return Object.create(s.prototype, {
            client: { value: this.client },
            set: { value: this.set },
            _faunaFunctions: { value: this._faunaFunctions },
            before: { value: this.before },
            after: { value: this.after },
          })
        }),
        (e.exports = s)
    },
    function (e, i, a) {
      /*!
       * @overview es6-promise - a tiny implementation of Promises/A+.
       * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
       * @license   Licensed under MIT license
       *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
       * @version   v4.2.5+7f2b526d
       */
      !(function (i, a) {
        e.exports = a()
      })(0, function () {
        'use strict'
        function e(e) {
          return 'function' == typeof e
        }
        var i = Array.isArray
            ? Array.isArray
            : function (e) {
                return '[object Array]' === Object.prototype.toString.call(e)
              },
          a = 0,
          n = void 0,
          o = void 0,
          t = function (e, i) {
            ;(d[a] = e), (d[a + 1] = i), 2 === (a += 2) && (o ? o(m) : x())
          }
        var s = 'undefined' != typeof window ? window : void 0,
          c = s || {},
          r = c.MutationObserver || c.WebKitMutationObserver,
          p =
            'undefined' == typeof self &&
            'undefined' != typeof process &&
            '[object process]' === {}.toString.call(process),
          l =
            'undefined' != typeof Uint8ClampedArray &&
            'undefined' != typeof importScripts &&
            'undefined' != typeof MessageChannel
        function u() {
          var e = setTimeout
          return function () {
            return e(m, 1)
          }
        }
        var d = new Array(1e3)
        function m() {
          for (var e = 0; e < a; e += 2) {
            ;(0, d[e])(d[e + 1]), (d[e] = void 0), (d[e + 1] = void 0)
          }
          a = 0
        }
        var x = void 0
        function f(e, i) {
          var a = this,
            n = new this.constructor(b)
          void 0 === n[h] && F(n)
          var o = a._state
          if (o) {
            var s = arguments[o - 1]
            t(function () {
              return A(o, n, s, a._result)
            })
          } else O(a, n, e, i)
          return n
        }
        function v(e) {
          if (e && 'object' == typeof e && e.constructor === this) return e
          var i = new this(b)
          return C(i, e), i
        }
        x = p
          ? function () {
              return process.nextTick(m)
            }
          : r
          ? (function () {
              var e = 0,
                i = new r(m),
                a = document.createTextNode('')
              return (
                i.observe(a, { characterData: !0 }),
                function () {
                  a.data = e = ++e % 2
                }
              )
            })()
          : l
          ? (function () {
              var e = new MessageChannel()
              return (
                (e.port1.onmessage = m),
                function () {
                  return e.port2.postMessage(0)
                }
              )
            })()
          : void 0 === s
          ? (function () {
              try {
                var e = Function('return this')().require('vertx')
                return void 0 !== (n = e.runOnLoop || e.runOnContext)
                  ? function () {
                      n(m)
                    }
                  : u()
              } catch (e) {
                return u()
              }
            })()
          : u()
        var h = Math.random().toString(36).substring(2)
        function b() {}
        var g = void 0,
          y = 1,
          w = 2,
          k = { error: null }
        function _(e) {
          try {
            return e.then
          } catch (e) {
            return (k.error = e), k
          }
        }
        function j(i, a, n) {
          a.constructor === i.constructor &&
          n === f &&
          a.constructor.resolve === v
            ? (function (e, i) {
                i._state === y
                  ? E(e, i._result)
                  : i._state === w
                  ? S(e, i._result)
                  : O(
                      i,
                      void 0,
                      function (i) {
                        return C(e, i)
                      },
                      function (i) {
                        return S(e, i)
                      }
                    )
              })(i, a)
            : n === k
            ? (S(i, k.error), (k.error = null))
            : void 0 === n
            ? E(i, a)
            : e(n)
            ? (function (e, i, a) {
                t(function (e) {
                  var n = !1,
                    o = (function (e, i, a, n) {
                      try {
                        e.call(i, a, n)
                      } catch (e) {
                        return e
                      }
                    })(
                      a,
                      i,
                      function (a) {
                        n || ((n = !0), i !== a ? C(e, a) : E(e, a))
                      },
                      function (i) {
                        n || ((n = !0), S(e, i))
                      },
                      e._label
                    )
                  !n && o && ((n = !0), S(e, o))
                }, e)
              })(i, a, n)
            : E(i, a)
        }
        function C(e, i) {
          e === i
            ? S(e, new TypeError('You cannot resolve a promise with itself'))
            : !(function (e) {
                var i = typeof e
                return null !== e && ('object' === i || 'function' === i)
              })(i)
            ? E(e, i)
            : j(e, i, _(i))
        }
        function z(e) {
          e._onerror && e._onerror(e._result), q(e)
        }
        function E(e, i) {
          e._state === g &&
            ((e._result = i),
            (e._state = y),
            0 !== e._subscribers.length && t(q, e))
        }
        function S(e, i) {
          e._state === g && ((e._state = w), (e._result = i), t(z, e))
        }
        function O(e, i, a, n) {
          var o = e._subscribers,
            s = o.length
          ;(e._onerror = null),
            (o[s] = i),
            (o[s + y] = a),
            (o[s + w] = n),
            0 === s && e._state && t(q, e)
        }
        function q(e) {
          var i = e._subscribers,
            a = e._state
          if (0 !== i.length) {
            for (
              var n = void 0, o = void 0, t = e._result, s = 0;
              s < i.length;
              s += 3
            )
              (n = i[s]), (o = i[s + a]), n ? A(a, n, o, t) : o(t)
            e._subscribers.length = 0
          }
        }
        function A(i, a, n, o) {
          var t = e(n),
            s = void 0,
            c = void 0,
            r = void 0,
            p = void 0
          if (t) {
            if (
              ((s = (function (e, i) {
                try {
                  return e(i)
                } catch (e) {
                  return (k.error = e), k
                }
              })(n, o)) === k
                ? ((p = !0), (c = s.error), (s.error = null))
                : (r = !0),
              a === s)
            )
              return void S(
                a,
                new TypeError(
                  'A promises callback cannot return that same promise.'
                )
              )
          } else (s = o), (r = !0)
          a._state !== g ||
            (t && r
              ? C(a, s)
              : p
              ? S(a, c)
              : i === y
              ? E(a, s)
              : i === w && S(a, s))
        }
        var T = 0
        function F(e) {
          ;(e[h] = T++),
            (e._state = void 0),
            (e._result = void 0),
            (e._subscribers = [])
        }
        var D = (function () {
          function e(e, a) {
            ;(this._instanceConstructor = e),
              (this.promise = new e(b)),
              this.promise[h] || F(this.promise),
              i(a)
                ? ((this.length = a.length),
                  (this._remaining = a.length),
                  (this._result = new Array(this.length)),
                  0 === this.length
                    ? E(this.promise, this._result)
                    : ((this.length = this.length || 0),
                      this._enumerate(a),
                      0 === this._remaining && E(this.promise, this._result)))
                : S(
                    this.promise,
                    new Error('Array Methods must be provided an Array')
                  )
          }
          return (
            (e.prototype._enumerate = function (e) {
              for (var i = 0; this._state === g && i < e.length; i++)
                this._eachEntry(e[i], i)
            }),
            (e.prototype._eachEntry = function (e, i) {
              var a = this._instanceConstructor,
                n = a.resolve
              if (n === v) {
                var o = _(e)
                if (o === f && e._state !== g)
                  this._settledAt(e._state, i, e._result)
                else if ('function' != typeof o)
                  this._remaining--, (this._result[i] = e)
                else if (a === R) {
                  var t = new a(b)
                  j(t, e, o), this._willSettleAt(t, i)
                } else
                  this._willSettleAt(
                    new a(function (i) {
                      return i(e)
                    }),
                    i
                  )
              } else this._willSettleAt(n(e), i)
            }),
            (e.prototype._settledAt = function (e, i, a) {
              var n = this.promise
              n._state === g &&
                (this._remaining--, e === w ? S(n, a) : (this._result[i] = a)),
                0 === this._remaining && E(n, this._result)
            }),
            (e.prototype._willSettleAt = function (e, i) {
              var a = this
              O(
                e,
                void 0,
                function (e) {
                  return a._settledAt(y, i, e)
                },
                function (e) {
                  return a._settledAt(w, i, e)
                }
              )
            }),
            e
          )
        })()
        var R = (function () {
          function i(e) {
            ;(this[h] = T++),
              (this._result = this._state = void 0),
              (this._subscribers = []),
              b !== e &&
                ('function' != typeof e &&
                  (function () {
                    throw new TypeError(
                      'You must pass a resolver function as the first argument to the promise constructor'
                    )
                  })(),
                this instanceof i
                  ? (function (e, i) {
                      try {
                        i(
                          function (i) {
                            C(e, i)
                          },
                          function (i) {
                            S(e, i)
                          }
                        )
                      } catch (i) {
                        S(e, i)
                      }
                    })(this, e)
                  : (function () {
                      throw new TypeError(
                        "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                      )
                    })())
          }
          return (
            (i.prototype.catch = function (e) {
              return this.then(null, e)
            }),
            (i.prototype.finally = function (i) {
              var a = this.constructor
              return e(i)
                ? this.then(
                    function (e) {
                      return a.resolve(i()).then(function () {
                        return e
                      })
                    },
                    function (e) {
                      return a.resolve(i()).then(function () {
                        throw e
                      })
                    }
                  )
                : this.then(i, i)
            }),
            i
          )
        })()
        return (
          (R.prototype.then = f),
          (R.all = function (e) {
            return new D(this, e).promise
          }),
          (R.race = function (e) {
            var a = this
            return i(e)
              ? new a(function (i, n) {
                  for (var o = e.length, t = 0; t < o; t++)
                    a.resolve(e[t]).then(i, n)
                })
              : new a(function (e, i) {
                  return i(new TypeError('You must pass an array to race.'))
                })
          }),
          (R.resolve = v),
          (R.reject = function (e) {
            var i = new this(b)
            return S(i, e), i
          }),
          (R._setScheduler = function (e) {
            o = e
          }),
          (R._setAsap = function (e) {
            t = e
          }),
          (R._asap = t),
          (R.polyfill = function () {
            var e = void 0
            if ('undefined' != typeof global) e = global
            else if ('undefined' != typeof self) e = self
            else
              try {
                e = Function('return this')()
              } catch (e) {
                throw new Error(
                  'polyfill failed because global object is unavailable in this environment'
                )
              }
            var i = e.Promise
            if (i) {
              var a = null
              try {
                a = Object.prototype.toString.call(i.resolve())
              } catch (e) {}
              if ('[object Promise]' === a && !i.cast) return
            }
            e.Promise = R
          }),
          (R.Promise = R),
          R
        )
      })
    },
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, i, a) {
      'use strict'
      function n(e, i, a, n, o, t, s) {
        try {
          var c = e[t](s),
            r = c.value
        } catch (e) {
          return void a(e)
        }
        c.done ? i(r) : Promise.resolve(r).then(n, o)
      }
      a(38).config({ path: '.env.development' })
      const o = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        t = a(39)
      t.query, new t.Client({ secret: process.env.GATSBY_FAUNA_KEY })
      i.handler = (function () {
        var e = (function (e) {
          return function () {
            var i = this,
              a = arguments
            return new Promise(function (o, t) {
              var s = e.apply(i, a)
              function c(e) {
                n(s, o, t, c, r, 'next', e)
              }
              function r(e) {
                n(s, o, t, c, r, 'throw', e)
              }
              c(void 0)
            })
          }
        })(function* (e, i, a) {
          console.log('hey'),
            a(null, {
              statusCode: 200,
              headers: o,
              body: JSON.stringify('hey'),
            })
        })
        return function (i, a, n) {
          return e.apply(this, arguments)
        }
      })()
    },
    function (e, i, a) {
      'use strict'
      var n = a(3)
      function o(e) {
        var i = {}
        return (
          e
            .toString()
            .split('\n')
            .forEach(function (e) {
              var a = e.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
              if (null != a) {
                var n = a[1],
                  o = a[2] ? a[2] : '',
                  t = o ? o.length : 0
                t > 0 &&
                  '"' === o.charAt(0) &&
                  '"' === o.charAt(t - 1) &&
                  (o = o.replace(/\\n/gm, '\n')),
                  (o = o.replace(/(^['"]|['"]$)/g, '').trim()),
                  (i[n] = o)
              }
            }),
          i
        )
      }
      function t(e) {
        var i = '.env',
          a = 'utf8'
        e && (e.path && (i = e.path), e.encoding && (a = e.encoding))
        try {
          var t = o(n.readFileSync(i, { encoding: a }))
          return (
            Object.keys(t).forEach(function (e) {
              process.env[e] = process.env[e] || t[e]
            }),
            { parsed: t }
          )
        } catch (e) {
          return { error: e }
        }
      }
      ;(e.exports.config = t), (e.exports.load = t), (e.exports.parse = o)
    },
    function (e, i, a) {
      e.exports = {
        Client: a(40),
        Expr: a(10),
        PageHelper: a(29),
        RequestResult: a(28),
        clientLogger: a(88),
        errors: a(4),
        values: a(5),
        query: a(9),
      }
    },
    function (e, i, a) {
      'use strict'
      var n = a(41),
        o = a(11),
        t = a(4),
        s = a(9),
        c = a(5),
        r = a(27),
        p = a(28),
        l = a(87),
        u = a(29),
        d = a(30).Promise
      function m(e) {
        var i = l.applyDefaults(e, {
          domain: 'db.fauna.com',
          scheme: 'https',
          port: null,
          secret: null,
          timeout: 60,
          observer: null,
        })
        null === i.port && (i.port = 'https' === i.scheme ? 443 : 80),
          (this._baseUrl = i.scheme + '://' + i.domain + ':' + i.port),
          (this._timeout = Math.floor(1e3 * i.timeout)),
          (this._secret = i.secret),
          (this._observer = i.observer),
          (this._lastSeen = null)
      }
      function x(e, i) {
        return void 0 === e ? i : e
      }
      ;(m.prototype.query = function (e) {
        return this._execute('POST', '', s.wrap(e))
      }),
        (m.prototype.paginate = function (e, i) {
          return (i = x(i, {})), new u(this, e, i)
        }),
        (m.prototype.ping = function (e, i) {
          return this._execute('GET', 'ping', null, { scope: e, timeout: i })
        }),
        (m.prototype._execute = function (e, i, a, n) {
          ;(n = x(n, null)),
            i instanceof c.Ref && (i = i.value),
            null !== n && (n = l.removeUndefinedValues(n))
          var o = Date.now(),
            s = this
          return this._performRequest(e, i, a, n).then(function (c, l) {
            var u = Date.now(),
              d = r.parseJSON(c.text),
              m = new p(s, e, i, n, l, a, c.text, d, c.status, c.header, o, u)
            if ('x-last-seen-txn' in c.header) {
              var x = parseInt(c.header['x-last-seen-txn'], 10)
              null == s._lastSeen
                ? (s._lastSeen = x)
                : s._lastSeen < x && (s._lastSeen = x)
            }
            return (
              null != s._observer && s._observer(m),
              t.FaunaHTTPError.raiseForStatusCode(m),
              d.resource
            )
          })
        }),
        (m.prototype._performRequest = function (e, i, a, t) {
          var s = o(e, this._baseUrl + '/' + i)
          t && s.query(t)
          var c = JSON.stringify(a)
          return (
            s.type('json'),
            s.send(c),
            this._secret &&
              s.set(
                'Authorization',
                (function (e) {
                  return 'Basic ' + n(e + ':')
                })(this._secret)
              ),
            this._lastSeen && s.set('X-Last-Seen-Txn', this._lastSeen),
            s.set('X-FaunaDB-API-Version', '2.1'),
            s.timeout(this._timeout),
            new d(function (e, i) {
              s.end(function (a, n) {
                a && void 0 === a.response
                  ? i(a)
                  : !a ||
                    !a.response ||
                    (a.response.status >= 400 && a.response.status <= 599)
                  ? e(n, c)
                  : i(a)
              })
            })
          )
        }),
        (e.exports = m)
    },
    function (e, i) {
      e.exports = function (e) {
        return new Buffer(e).toString('base64')
      }
    },
    function (e, i, a) {
      'use strict'
      'undefined' == typeof process ||
      'renderer' === process.type ||
      !0 === process.browser ||
      process.__nwjs
        ? (e.exports = a(43))
        : (e.exports = a(45))
    },
    function (e, i, a) {
      'use strict'
      function n(e) {
        return (n =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              })(e)
      }
      ;(i.log = function () {
        var e
        return (
          'object' ===
            ('undefined' == typeof console ? 'undefined' : n(console)) &&
          console.log &&
          (e = console).log.apply(e, arguments)
        )
      }),
        (i.formatArgs = function (i) {
          if (
            ((i[0] =
              (this.useColors ? '%c' : '') +
              this.namespace +
              (this.useColors ? ' %c' : ' ') +
              i[0] +
              (this.useColors ? '%c ' : ' ') +
              '+' +
              e.exports.humanize(this.diff)),
            !this.useColors)
          )
            return
          var a = 'color: ' + this.color
          i.splice(1, 0, a, 'color: inherit')
          var n = 0,
            o = 0
          i[0].replace(/%[a-zA-Z%]/g, function (e) {
            '%%' !== e && '%c' === e && (o = ++n)
          }),
            i.splice(o, 0, a)
        }),
        (i.save = function (e) {
          try {
            e ? i.storage.setItem('debug', e) : i.storage.removeItem('debug')
          } catch (e) {}
        }),
        (i.load = function () {
          var e
          try {
            e = i.storage.getItem('debug')
          } catch (e) {}
          !e &&
            'undefined' != typeof process &&
            'env' in process &&
            (e = process.env.DEBUG)
          return e
        }),
        (i.useColors = function () {
          if (
            'undefined' != typeof window &&
            window.process &&
            ('renderer' === window.process.type || window.process.__nwjs)
          )
            return !0
          if (
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1
          return (
            ('undefined' != typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ('undefined' != typeof window &&
              window.console &&
              (window.console.firebug ||
                (window.console.exception && window.console.table))) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
              parseInt(RegExp.$1, 10) >= 31) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          )
        }),
        (i.storage = (function () {
          try {
            return localStorage
          } catch (e) {}
        })()),
        (i.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33',
        ]),
        (e.exports = a(12)(i)),
        (e.exports.formatters.j = function (e) {
          try {
            return JSON.stringify(e)
          } catch (e) {
            return '[UnexpectedJSONParseError]: ' + e.message
          }
        })
    },
    function (e, i) {
      var a = 1e3,
        n = 60 * a,
        o = 60 * n,
        t = 24 * o,
        s = 7 * t,
        c = 365.25 * t
      function r(e, i, a, n) {
        var o = i >= 1.5 * a
        return Math.round(e / a) + ' ' + n + (o ? 's' : '')
      }
      e.exports = function (e, i) {
        i = i || {}
        var p = typeof e
        if ('string' === p && e.length > 0)
          return (function (e) {
            if ((e = String(e)).length > 100) return
            var i =
              /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                e
              )
            if (!i) return
            var r = parseFloat(i[1])
            switch ((i[2] || 'ms').toLowerCase()) {
              case 'years':
              case 'year':
              case 'yrs':
              case 'yr':
              case 'y':
                return r * c
              case 'weeks':
              case 'week':
              case 'w':
                return r * s
              case 'days':
              case 'day':
              case 'd':
                return r * t
              case 'hours':
              case 'hour':
              case 'hrs':
              case 'hr':
              case 'h':
                return r * o
              case 'minutes':
              case 'minute':
              case 'mins':
              case 'min':
              case 'm':
                return r * n
              case 'seconds':
              case 'second':
              case 'secs':
              case 'sec':
              case 's':
                return r * a
              case 'milliseconds':
              case 'millisecond':
              case 'msecs':
              case 'msec':
              case 'ms':
                return r
              default:
                return
            }
          })(e)
        if ('number' === p && !1 === isNaN(e))
          return i.long
            ? (function (e) {
                var i = Math.abs(e)
                if (i >= t) return r(e, i, t, 'day')
                if (i >= o) return r(e, i, o, 'hour')
                if (i >= n) return r(e, i, n, 'minute')
                if (i >= a) return r(e, i, a, 'second')
                return e + ' ms'
              })(e)
            : (function (e) {
                var i = Math.abs(e)
                if (i >= t) return Math.round(e / t) + 'd'
                if (i >= o) return Math.round(e / o) + 'h'
                if (i >= n) return Math.round(e / n) + 'm'
                if (i >= a) return Math.round(e / a) + 's'
                return e + 'ms'
              })(e)
        throw new Error(
          'val is not a non-empty string or a valid number. val=' +
            JSON.stringify(e)
        )
      }
    },
    function (e, i, a) {
      'use strict'
      var n = a(46),
        o = a(0)
      ;(i.init = function (e) {
        e.inspectOpts = {}
        for (var a = Object.keys(i.inspectOpts), n = 0; n < a.length; n++)
          e.inspectOpts[a[n]] = i.inspectOpts[a[n]]
      }),
        (i.log = function () {
          return process.stderr.write(o.format.apply(o, arguments) + '\n')
        }),
        (i.formatArgs = function (a) {
          var n = this.namespace
          if (this.useColors) {
            var o = this.color,
              t = '[3' + (o < 8 ? o : '8;5;' + o),
              s = '  '.concat(t, ';1m').concat(n, ' [0m')
            ;(a[0] = s + a[0].split('\n').join('\n' + s)),
              a.push(t + 'm+' + e.exports.humanize(this.diff) + '[0m')
          } else
            a[0] =
              (function () {
                if (i.inspectOpts.hideDate) return ''
                return new Date().toISOString() + ' '
              })() +
              n +
              ' ' +
              a[0]
        }),
        (i.save = function (e) {
          e ? (process.env.DEBUG = e) : delete process.env.DEBUG
        }),
        (i.load = function () {
          return process.env.DEBUG
        }),
        (i.useColors = function () {
          return 'colors' in i.inspectOpts
            ? Boolean(i.inspectOpts.colors)
            : n.isatty(process.stderr.fd)
        }),
        (i.colors = [6, 2, 3, 4, 5, 1])
      try {
        var t = a(47)
        t &&
          (t.stderr || t).level >= 2 &&
          (i.colors = [
            20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62,
            63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112,
            113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165,
            166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196,
            197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209,
            214, 215, 220, 221,
          ])
      } catch (e) {}
      ;(i.inspectOpts = Object.keys(process.env)
        .filter(function (e) {
          return /^debug_/i.test(e)
        })
        .reduce(function (e, i) {
          var a = i
              .substring(6)
              .toLowerCase()
              .replace(/_([a-z])/g, function (e, i) {
                return i.toUpperCase()
              }),
            n = process.env[i]
          return (
            (n =
              !!/^(yes|on|true|enabled)$/i.test(n) ||
              (!/^(no|off|false|disabled)$/i.test(n) &&
                ('null' === n ? null : Number(n)))),
            (e[a] = n),
            e
          )
        }, {})),
        (e.exports = a(12)(i))
      var s = e.exports.formatters
      ;(s.o = function (e) {
        return (
          (this.inspectOpts.colors = this.useColors),
          o.inspect(e, this.inspectOpts).replace(/\s*\n\s*/g, ' ')
        )
      }),
        (s.O = function (e) {
          return (
            (this.inspectOpts.colors = this.useColors),
            o.inspect(e, this.inspectOpts)
          )
        })
    },
    function (e, i) {
      e.exports = require('tty')
    },
    function (e, i, a) {
      'use strict'
      const n = a(48),
        o = a(49),
        t = process.env
      let s
      function c(e) {
        return (function (e) {
          return (
            0 !== e && {
              level: e,
              hasBasic: !0,
              has256: e >= 2,
              has16m: e >= 3,
            }
          )
        })(
          (function (e) {
            if (!1 === s) return 0
            if (o('color=16m') || o('color=full') || o('color=truecolor'))
              return 3
            if (o('color=256')) return 2
            if (e && !e.isTTY && !0 !== s) return 0
            const i = s ? 1 : 0
            if ('win32' === process.platform) {
              const e = n.release().split('.')
              return Number(process.versions.node.split('.')[0]) >= 8 &&
                Number(e[0]) >= 10 &&
                Number(e[2]) >= 10586
                ? Number(e[2]) >= 14931
                  ? 3
                  : 2
                : 1
            }
            if ('CI' in t)
              return ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(
                (e) => e in t
              ) || 'codeship' === t.CI_NAME
                ? 1
                : i
            if ('TEAMCITY_VERSION' in t)
              return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(t.TEAMCITY_VERSION)
                ? 1
                : 0
            if ('truecolor' === t.COLORTERM) return 3
            if ('TERM_PROGRAM' in t) {
              const e = parseInt(
                (t.TERM_PROGRAM_VERSION || '').split('.')[0],
                10
              )
              switch (t.TERM_PROGRAM) {
                case 'iTerm.app':
                  return e >= 3 ? 3 : 2
                case 'Apple_Terminal':
                  return 2
              }
            }
            return /-256(color)?$/i.test(t.TERM)
              ? 2
              : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
                  t.TERM
                )
              ? 1
              : 'COLORTERM' in t
              ? 1
              : (t.TERM, i)
          })(e)
        )
      }
      o('no-color') || o('no-colors') || o('color=false')
        ? (s = !1)
        : (o('color') || o('colors') || o('color=true') || o('color=always')) &&
          (s = !0),
        'FORCE_COLOR' in t &&
          (s = 0 === t.FORCE_COLOR.length || 0 !== parseInt(t.FORCE_COLOR, 10)),
        (e.exports = {
          supportsColor: c,
          stdout: c(process.stdout),
          stderr: c(process.stderr),
        })
    },
    function (e, i) {
      e.exports = require('os')
    },
    function (e, i, a) {
      'use strict'
      e.exports = (e, i) => {
        i = i || process.argv
        const a = e.startsWith('-') ? '' : 1 === e.length ? '-' : '--',
          n = i.indexOf(a + e),
          o = i.indexOf('--')
        return -1 !== n && (-1 === o || n < o)
      }
    },
    function (e, i, a) {
      var n = a(51).IncomingForm
      ;(n.IncomingForm = n), (e.exports = n)
    },
    function (e, i, a) {
      var n
      global.GENTLY && (n = GENTLY.hijack(a(52)))
      var o = n('crypto'),
        t = n('fs'),
        s = n('util'),
        c = n('path'),
        r = n('./file'),
        p = n('./multipart_parser').MultipartParser,
        l = n('./querystring_parser').QuerystringParser,
        u = n('./octet_parser').OctetParser,
        d = n('./json_parser').JSONParser,
        m = n('string_decoder').StringDecoder,
        x = n('events').EventEmitter,
        f = n('stream').Stream,
        v = n('os')
      function h(e) {
        return this instanceof h
          ? (x.call(this),
            (e = e || {}),
            (this.error = null),
            (this.ended = !1),
            (this.maxFields = e.maxFields || 1e3),
            (this.maxFieldsSize = e.maxFieldsSize || 20971520),
            (this.maxFileSize = e.maxFileSize || 209715200),
            (this.keepExtensions = e.keepExtensions || !1),
            (this.uploadDir =
              e.uploadDir || (v.tmpdir && v.tmpdir()) || v.tmpDir()),
            (this.encoding = e.encoding || 'utf-8'),
            (this.headers = null),
            (this.type = null),
            (this.hash = e.hash || !1),
            (this.multiples = e.multiples || !1),
            (this.bytesReceived = null),
            (this.bytesExpected = null),
            (this._parser = null),
            (this._flushing = 0),
            (this._fieldsSize = 0),
            (this._fileSize = 0),
            (this.openedFiles = []),
            this)
          : new h(e)
      }
      s.inherits(h, x),
        (i.IncomingForm = h),
        (h.prototype.parse = function (e, i) {
          if (
            ((this.pause = function () {
              try {
                e.pause()
              } catch (e) {
                return this.ended || this._error(e), !1
              }
              return !0
            }),
            (this.resume = function () {
              try {
                e.resume()
              } catch (e) {
                return this.ended || this._error(e), !1
              }
              return !0
            }),
            i)
          ) {
            var a = {},
              n = {}
            this.on('field', function (e, i) {
              a[e] = i
            })
              .on('file', function (e, i) {
                this.multiples && n[e]
                  ? (Array.isArray(n[e]) || (n[e] = [n[e]]), n[e].push(i))
                  : (n[e] = i)
              })
              .on('error', function (e) {
                i(e, a, n)
              })
              .on('end', function () {
                i(null, a, n)
              })
          }
          this.writeHeaders(e.headers)
          var o = this
          return (
            e
              .on('error', function (e) {
                o._error(e)
              })
              .on('aborted', function () {
                o.emit('aborted'), o._error(new Error('Request aborted'))
              })
              .on('data', function (e) {
                o.write(e)
              })
              .on('end', function () {
                if (!o.error) {
                  var e = o._parser.end()
                  e && o._error(e)
                }
              }),
            this
          )
        }),
        (h.prototype.writeHeaders = function (e) {
          ;(this.headers = e),
            this._parseContentLength(),
            this._parseContentType()
        }),
        (h.prototype.write = function (e) {
          if (!this.error) {
            if (this._parser) {
              ;(this.bytesReceived += e.length),
                this.emit('progress', this.bytesReceived, this.bytesExpected)
              var i = this._parser.write(e)
              return (
                i !== e.length &&
                  this._error(
                    new Error(
                      'parser error, ' + i + ' of ' + e.length + ' bytes parsed'
                    )
                  ),
                i
              )
            }
            this._error(new Error('uninitialized parser'))
          }
        }),
        (h.prototype.pause = function () {
          return !1
        }),
        (h.prototype.resume = function () {
          return !1
        }),
        (h.prototype.onPart = function (e) {
          this.handlePart(e)
        }),
        (h.prototype.handlePart = function (e) {
          var i = this
          if (void 0 === e.filename) {
            var a = '',
              n = new m(this.encoding)
            return (
              e.on('data', function (e) {
                ;(i._fieldsSize += e.length),
                  i._fieldsSize > i.maxFieldsSize
                    ? i._error(
                        new Error(
                          'maxFieldsSize exceeded, received ' +
                            i._fieldsSize +
                            ' bytes of field data'
                        )
                      )
                    : (a += n.write(e))
              }),
              void e.on('end', function () {
                i.emit('field', e.name, a)
              })
            )
          }
          this._flushing++
          var o = new r({
            path: this._uploadPath(e.filename),
            name: e.filename,
            type: e.mime,
            hash: i.hash,
          })
          this.emit('fileBegin', e.name, o),
            o.open(),
            this.openedFiles.push(o),
            e.on('data', function (e) {
              ;(i._fileSize += e.length),
                i._fileSize > i.maxFileSize
                  ? i._error(
                      new Error(
                        'maxFileSize exceeded, received ' +
                          i._fileSize +
                          ' bytes of file data'
                      )
                    )
                  : 0 != e.length &&
                    (i.pause(),
                    o.write(e, function () {
                      i.resume()
                    }))
            }),
            e.on('end', function () {
              o.end(function () {
                i._flushing--, i.emit('file', e.name, o), i._maybeEnd()
              })
            })
        }),
        (h.prototype._parseContentType = function () {
          if (0 !== this.bytesExpected)
            if (this.headers['content-type'])
              if (this.headers['content-type'].match(/octet-stream/i))
                this._initOctetStream()
              else if (this.headers['content-type'].match(/urlencoded/i))
                this._initUrlencoded()
              else if (this.headers['content-type'].match(/multipart/i)) {
                var e = this.headers['content-type'].match(
                  /boundary=(?:"([^"]+)"|([^;]+))/i
                )
                e
                  ? this._initMultipart(e[1] || e[2])
                  : this._error(
                      new Error(
                        'bad content-type header, no multipart boundary'
                      )
                    )
              } else
                this.headers['content-type'].match(/json/i)
                  ? this._initJSONencoded()
                  : this._error(
                      new Error(
                        'bad content-type header, unknown content-type: ' +
                          this.headers['content-type']
                      )
                    )
            else
              this._error(new Error('bad content-type header, no content-type'))
          else
            this._parser = (function (e) {
              return {
                end: function () {
                  return (e.ended = !0), e._maybeEnd(), null
                },
              }
            })(this)
        }),
        (h.prototype._error = function (e) {
          this.error ||
            this.ended ||
            ((this.error = e),
            this.emit('error', e),
            Array.isArray(this.openedFiles) &&
              this.openedFiles.forEach(function (e) {
                e._writeStream.destroy(),
                  setTimeout(t.unlink, 0, e.path, function (e) {})
              }))
        }),
        (h.prototype._parseContentLength = function () {
          ;(this.bytesReceived = 0),
            this.headers['content-length']
              ? (this.bytesExpected = parseInt(
                  this.headers['content-length'],
                  10
                ))
              : void 0 === this.headers['transfer-encoding'] &&
                (this.bytesExpected = 0),
            null !== this.bytesExpected &&
              this.emit('progress', this.bytesReceived, this.bytesExpected)
        }),
        (h.prototype._newParser = function () {
          return new p()
        }),
        (h.prototype._initMultipart = function (e) {
          this.type = 'multipart'
          var i,
            a,
            n,
            o = new p(),
            t = this
          o.initWithBoundary(e),
            (o.onPartBegin = function () {
              ;((n = new f()).readable = !0),
                (n.headers = {}),
                (n.name = null),
                (n.filename = null),
                (n.mime = null),
                (n.transferEncoding = 'binary'),
                (n.transferBuffer = ''),
                (i = ''),
                (a = '')
            }),
            (o.onHeaderField = function (e, a, n) {
              i += e.toString(t.encoding, a, n)
            }),
            (o.onHeaderValue = function (e, i, n) {
              a += e.toString(t.encoding, i, n)
            }),
            (o.onHeaderEnd = function () {
              ;(i = i.toLowerCase()), (n.headers[i] = a)
              var e = a.match(
                /\bname=("([^"]*)"|([^\(\)<>@,;:\\"\/\[\]\?=\{\}\s\t/]+))/i
              )
              'content-disposition' == i
                ? (e && (n.name = e[2] || e[3] || ''),
                  (n.filename = t._fileName(a)))
                : 'content-type' == i
                ? (n.mime = a)
                : 'content-transfer-encoding' == i &&
                  (n.transferEncoding = a.toLowerCase()),
                (i = ''),
                (a = '')
            }),
            (o.onHeadersEnd = function () {
              switch (n.transferEncoding) {
                case 'binary':
                case '7bit':
                case '8bit':
                  ;(o.onPartData = function (e, i, a) {
                    n.emit('data', e.slice(i, a))
                  }),
                    (o.onPartEnd = function () {
                      n.emit('end')
                    })
                  break
                case 'base64':
                  ;(o.onPartData = function (e, i, a) {
                    n.transferBuffer += e.slice(i, a).toString('ascii')
                    var o = 4 * parseInt(n.transferBuffer.length / 4, 10)
                    n.emit(
                      'data',
                      new Buffer(n.transferBuffer.substring(0, o), 'base64')
                    ),
                      (n.transferBuffer = n.transferBuffer.substring(o))
                  }),
                    (o.onPartEnd = function () {
                      n.emit('data', new Buffer(n.transferBuffer, 'base64')),
                        n.emit('end')
                    })
                  break
                default:
                  return t._error(new Error('unknown transfer-encoding'))
              }
              t.onPart(n)
            }),
            (o.onEnd = function () {
              ;(t.ended = !0), t._maybeEnd()
            }),
            (this._parser = o)
        }),
        (h.prototype._fileName = function (e) {
          var i = e.match(
            /\bfilename=("(.*?)"|([^\(\)<>@,;:\\"\/\[\]\?=\{\}\s\t/]+))($|;\s)/i
          )
          if (i) {
            var a = i[2] || i[3] || '',
              n = a.substr(a.lastIndexOf('\\') + 1)
            return (n = (n = n.replace(/%22/g, '"')).replace(
              /&#([\d]{4});/g,
              function (e, i) {
                return String.fromCharCode(i)
              }
            ))
          }
        }),
        (h.prototype._initUrlencoded = function () {
          this.type = 'urlencoded'
          var e = new l(this.maxFields),
            i = this
          ;(e.onField = function (e, a) {
            i.emit('field', e, a)
          }),
            (e.onEnd = function () {
              ;(i.ended = !0), i._maybeEnd()
            }),
            (this._parser = e)
        }),
        (h.prototype._initOctetStream = function () {
          this.type = 'octet-stream'
          var e = this.headers['x-file-name'],
            i = this.headers['content-type'],
            a = new r({ path: this._uploadPath(e), name: e, type: i })
          this.emit('fileBegin', e, a),
            a.open(),
            this.openedFiles.push(a),
            this._flushing++
          var n = this
          n._parser = new u()
          var o = 0
          n._parser.on('data', function (e) {
            n.pause(),
              o++,
              a.write(e, function () {
                o--, n.resume(), n.ended && n._parser.emit('doneWritingFile')
              })
          }),
            n._parser.on('end', function () {
              n._flushing--, (n.ended = !0)
              var e = function () {
                a.end(function () {
                  n.emit('file', 'file', a), n._maybeEnd()
                })
              }
              0 === o ? e() : n._parser.once('doneWritingFile', e)
            })
        }),
        (h.prototype._initJSONencoded = function () {
          this.type = 'json'
          var e = new d(this),
            i = this
          ;(e.onField = function (e, a) {
            i.emit('field', e, a)
          }),
            (e.onEnd = function () {
              ;(i.ended = !0), i._maybeEnd()
            }),
            (this._parser = e)
        }),
        (h.prototype._uploadPath = function (e) {
          var i = 'upload_' + o.randomBytes(16).toString('hex')
          if (this.keepExtensions) {
            var a = c.extname(e)
            i += a = a.replace(/(\.[a-z0-9]+).*/i, '$1')
          }
          return c.join(this.uploadDir, i)
        }),
        (h.prototype._maybeEnd = function () {
          !this.ended || this._flushing || this.error || this.emit('end')
        })
    },
    function (e, i) {
      function a(e) {
        var i = new Error("Cannot find module '" + e + "'")
        throw ((i.code = 'MODULE_NOT_FOUND'), i)
      }
      ;(a.keys = function () {
        return []
      }),
        (a.resolve = a),
        (e.exports = a),
        (a.id = 52)
    },
    function (e, i, a) {
      var n = a(54),
        o = a(0),
        t = a(6),
        s = a(7),
        c = a(13),
        r = a(2).parse,
        p = a(3),
        l = a(57),
        u = a(60),
        d = a(64)
      function m(e) {
        if (!(this instanceof m)) return new m()
        for (var i in ((this._overheadLength = 0),
        (this._valueLength = 0),
        (this._valuesToMeasure = []),
        n.call(this),
        (e = e || {})))
          this[i] = e[i]
      }
      ;(e.exports = m),
        o.inherits(m, n),
        (m.LINE_BREAK = '\r\n'),
        (m.DEFAULT_CONTENT_TYPE = 'application/octet-stream'),
        (m.prototype.append = function (e, i, a) {
          'string' == typeof (a = a || {}) && (a = { filename: a })
          var t = n.prototype.append.bind(this)
          if (('number' == typeof i && (i = '' + i), o.isArray(i)))
            this._error(new Error('Arrays are not supported.'))
          else {
            var s = this._multiPartHeader(e, i, a),
              c = this._multiPartFooter()
            t(s), t(i), t(c), this._trackLength(s, i, a)
          }
        }),
        (m.prototype._trackLength = function (e, i, a) {
          var n = 0
          null != a.knownLength
            ? (n += +a.knownLength)
            : Buffer.isBuffer(i)
            ? (n = i.length)
            : 'string' == typeof i && (n = Buffer.byteLength(i)),
            (this._valueLength += n),
            (this._overheadLength +=
              Buffer.byteLength(e) + m.LINE_BREAK.length),
            i &&
              (i.path || (i.readable && i.hasOwnProperty('httpVersion'))) &&
              (a.knownLength || this._valuesToMeasure.push(i))
        }),
        (m.prototype._lengthRetriever = function (e, i) {
          e.hasOwnProperty('fd')
            ? void 0 != e.end && e.end != 1 / 0 && void 0 != e.start
              ? i(null, e.end + 1 - (e.start ? e.start : 0))
              : p.stat(e.path, function (a, n) {
                  var o
                  a
                    ? i(a)
                    : ((o = n.size - (e.start ? e.start : 0)), i(null, o))
                })
            : e.hasOwnProperty('httpVersion')
            ? i(null, +e.headers['content-length'])
            : e.hasOwnProperty('httpModule')
            ? (e.on('response', function (a) {
                e.pause(), i(null, +a.headers['content-length'])
              }),
              e.resume())
            : i('Unknown stream')
        }),
        (m.prototype._multiPartHeader = function (e, i, a) {
          if ('string' == typeof a.header) return a.header
          var n,
            o = this._getContentDisposition(i, a),
            t = this._getContentType(i, a),
            s = '',
            c = {
              'Content-Disposition': ['form-data', 'name="' + e + '"'].concat(
                o || []
              ),
              'Content-Type': [].concat(t || []),
            }
          for (var r in ('object' == typeof a.header && d(c, a.header), c))
            c.hasOwnProperty(r) &&
              null != (n = c[r]) &&
              (Array.isArray(n) || (n = [n]),
              n.length && (s += r + ': ' + n.join('; ') + m.LINE_BREAK))
          return '--' + this.getBoundary() + m.LINE_BREAK + s + m.LINE_BREAK
        }),
        (m.prototype._getContentDisposition = function (e, i) {
          var a, n
          return (
            'string' == typeof i.filepath
              ? (a = t.normalize(i.filepath).replace(/\\/g, '/'))
              : i.filename || e.name || e.path
              ? (a = t.basename(i.filename || e.name || e.path))
              : e.readable &&
                e.hasOwnProperty('httpVersion') &&
                (a = t.basename(e.client._httpMessage.path)),
            a && (n = 'filename="' + a + '"'),
            n
          )
        }),
        (m.prototype._getContentType = function (e, i) {
          var a = i.contentType
          return (
            !a && e.name && (a = l.lookup(e.name)),
            !a && e.path && (a = l.lookup(e.path)),
            !a &&
              e.readable &&
              e.hasOwnProperty('httpVersion') &&
              (a = e.headers['content-type']),
            a ||
              (!i.filepath && !i.filename) ||
              (a = l.lookup(i.filepath || i.filename)),
            a || 'object' != typeof e || (a = m.DEFAULT_CONTENT_TYPE),
            a
          )
        }),
        (m.prototype._multiPartFooter = function () {
          return function (e) {
            var i = m.LINE_BREAK
            0 === this._streams.length && (i += this._lastBoundary()), e(i)
          }.bind(this)
        }),
        (m.prototype._lastBoundary = function () {
          return '--' + this.getBoundary() + '--' + m.LINE_BREAK
        }),
        (m.prototype.getHeaders = function (e) {
          var i,
            a = {
              'content-type':
                'multipart/form-data; boundary=' + this.getBoundary(),
            }
          for (i in e) e.hasOwnProperty(i) && (a[i.toLowerCase()] = e[i])
          return a
        }),
        (m.prototype.getBoundary = function () {
          return this._boundary || this._generateBoundary(), this._boundary
        }),
        (m.prototype._generateBoundary = function () {
          for (var e = '--------------------------', i = 0; i < 24; i++)
            e += Math.floor(10 * Math.random()).toString(16)
          this._boundary = e
        }),
        (m.prototype.getLengthSync = function () {
          var e = this._overheadLength + this._valueLength
          return (
            this._streams.length && (e += this._lastBoundary().length),
            this.hasKnownLength() ||
              this._error(
                new Error('Cannot calculate proper length in synchronous way.')
              ),
            e
          )
        }),
        (m.prototype.hasKnownLength = function () {
          var e = !0
          return this._valuesToMeasure.length && (e = !1), e
        }),
        (m.prototype.getLength = function (e) {
          var i = this._overheadLength + this._valueLength
          this._streams.length && (i += this._lastBoundary().length),
            this._valuesToMeasure.length
              ? u.parallel(
                  this._valuesToMeasure,
                  this._lengthRetriever,
                  function (a, n) {
                    a
                      ? e(a)
                      : (n.forEach(function (e) {
                          i += e
                        }),
                        e(null, i))
                  }
                )
              : process.nextTick(e.bind(this, null, i))
        }),
        (m.prototype.submit = function (e, i) {
          var a,
            n,
            o = { method: 'post' }
          return (
            'string' == typeof e
              ? ((e = r(e)),
                (n = d(
                  {
                    port: e.port,
                    path: e.pathname,
                    host: e.hostname,
                    protocol: e.protocol,
                  },
                  o
                )))
              : (n = d(e, o)).port ||
                (n.port = 'https:' == n.protocol ? 443 : 80),
            (n.headers = this.getHeaders(e.headers)),
            (a = 'https:' == n.protocol ? c.request(n) : s.request(n)),
            this.getLength(
              function (e, n) {
                e
                  ? this._error(e)
                  : (a.setHeader('Content-Length', n),
                    this.pipe(a),
                    i &&
                      (a.on('error', i), a.on('response', i.bind(this, null))))
              }.bind(this)
            ),
            a
          )
        }),
        (m.prototype._error = function (e) {
          this.error || ((this.error = e), this.pause(), this.emit('error', e))
        }),
        (m.prototype.toString = function () {
          return '[object FormData]'
        })
    },
    function (e, i, a) {
      var n = a(0),
        o = a(1).Stream,
        t = a(55),
        s = a(56)
      function c() {
        ;(this.writable = !1),
          (this.readable = !0),
          (this.dataSize = 0),
          (this.maxDataSize = 2097152),
          (this.pauseStreams = !0),
          (this._released = !1),
          (this._streams = []),
          (this._currentStream = null)
      }
      ;(e.exports = c),
        n.inherits(c, o),
        (c.create = function (e) {
          var i = new this()
          for (var a in (e = e || {})) i[a] = e[a]
          return i
        }),
        (c.isStreamLike = function (e) {
          return (
            'function' != typeof e &&
            'string' != typeof e &&
            'boolean' != typeof e &&
            'number' != typeof e &&
            !Buffer.isBuffer(e)
          )
        }),
        (c.prototype.append = function (e) {
          if (c.isStreamLike(e)) {
            if (!(e instanceof t)) {
              var i = t.create(e, {
                maxDataSize: 1 / 0,
                pauseStream: this.pauseStreams,
              })
              e.on('data', this._checkDataSize.bind(this)), (e = i)
            }
            this._handleErrors(e), this.pauseStreams && e.pause()
          }
          return this._streams.push(e), this
        }),
        (c.prototype.pipe = function (e, i) {
          return o.prototype.pipe.call(this, e, i), this.resume(), e
        }),
        (c.prototype._getNext = function () {
          this._currentStream = null
          var e = this._streams.shift()
          void 0 !== e
            ? 'function' == typeof e
              ? e(
                  function (e) {
                    c.isStreamLike(e) &&
                      (e.on('data', this._checkDataSize.bind(this)),
                      this._handleErrors(e)),
                      s(this._pipeNext.bind(this, e))
                  }.bind(this)
                )
              : this._pipeNext(e)
            : this.end()
        }),
        (c.prototype._pipeNext = function (e) {
          if (((this._currentStream = e), c.isStreamLike(e)))
            return (
              e.on('end', this._getNext.bind(this)),
              void e.pipe(this, { end: !1 })
            )
          var i = e
          this.write(i), this._getNext()
        }),
        (c.prototype._handleErrors = function (e) {
          var i = this
          e.on('error', function (e) {
            i._emitError(e)
          })
        }),
        (c.prototype.write = function (e) {
          this.emit('data', e)
        }),
        (c.prototype.pause = function () {
          this.pauseStreams &&
            (this.pauseStreams &&
              this._currentStream &&
              'function' == typeof this._currentStream.pause &&
              this._currentStream.pause(),
            this.emit('pause'))
        }),
        (c.prototype.resume = function () {
          this._released ||
            ((this._released = !0), (this.writable = !0), this._getNext()),
            this.pauseStreams &&
              this._currentStream &&
              'function' == typeof this._currentStream.resume &&
              this._currentStream.resume(),
            this.emit('resume')
        }),
        (c.prototype.end = function () {
          this._reset(), this.emit('end')
        }),
        (c.prototype.destroy = function () {
          this._reset(), this.emit('close')
        }),
        (c.prototype._reset = function () {
          ;(this.writable = !1),
            (this._streams = []),
            (this._currentStream = null)
        }),
        (c.prototype._checkDataSize = function () {
          if ((this._updateDataSize(), !(this.dataSize <= this.maxDataSize))) {
            var e =
              'DelayedStream#maxDataSize of ' +
              this.maxDataSize +
              ' bytes exceeded.'
            this._emitError(new Error(e))
          }
        }),
        (c.prototype._updateDataSize = function () {
          this.dataSize = 0
          var e = this
          this._streams.forEach(function (i) {
            i.dataSize && (e.dataSize += i.dataSize)
          }),
            this._currentStream &&
              this._currentStream.dataSize &&
              (this.dataSize += this._currentStream.dataSize)
        }),
        (c.prototype._emitError = function (e) {
          this._reset(), this.emit('error', e)
        })
    },
    function (e, i, a) {
      var n = a(1).Stream,
        o = a(0)
      function t() {
        ;(this.source = null),
          (this.dataSize = 0),
          (this.maxDataSize = 1048576),
          (this.pauseStream = !0),
          (this._maxDataSizeExceeded = !1),
          (this._released = !1),
          (this._bufferedEvents = [])
      }
      ;(e.exports = t),
        o.inherits(t, n),
        (t.create = function (e, i) {
          var a = new this()
          for (var n in (i = i || {})) a[n] = i[n]
          a.source = e
          var o = e.emit
          return (
            (e.emit = function () {
              return a._handleEmit(arguments), o.apply(e, arguments)
            }),
            e.on('error', function () {}),
            a.pauseStream && e.pause(),
            a
          )
        }),
        Object.defineProperty(t.prototype, 'readable', {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return this.source.readable
          },
        }),
        (t.prototype.setEncoding = function () {
          return this.source.setEncoding.apply(this.source, arguments)
        }),
        (t.prototype.resume = function () {
          this._released || this.release(), this.source.resume()
        }),
        (t.prototype.pause = function () {
          this.source.pause()
        }),
        (t.prototype.release = function () {
          ;(this._released = !0),
            this._bufferedEvents.forEach(
              function (e) {
                this.emit.apply(this, e)
              }.bind(this)
            ),
            (this._bufferedEvents = [])
        }),
        (t.prototype.pipe = function () {
          var e = n.prototype.pipe.apply(this, arguments)
          return this.resume(), e
        }),
        (t.prototype._handleEmit = function (e) {
          this._released
            ? this.emit.apply(this, e)
            : ('data' === e[0] &&
                ((this.dataSize += e[1].length),
                this._checkIfMaxDataSizeExceeded()),
              this._bufferedEvents.push(e))
        }),
        (t.prototype._checkIfMaxDataSizeExceeded = function () {
          if (
            !(this._maxDataSizeExceeded || this.dataSize <= this.maxDataSize)
          ) {
            this._maxDataSizeExceeded = !0
            var e =
              'DelayedStream#maxDataSize of ' +
              this.maxDataSize +
              ' bytes exceeded.'
            this.emit('error', new Error(e))
          }
        })
    },
    function (e, i) {
      e.exports = function (e) {
        var i =
          'function' == typeof setImmediate
            ? setImmediate
            : 'object' == typeof process &&
              'function' == typeof process.nextTick
            ? process.nextTick
            : null
        i ? i(e) : setTimeout(e, 0)
      }
    },
    function (e, i, a) {
      'use strict'
      /*!
       * mime-types
       * Copyright(c) 2014 Jonathan Ong
       * Copyright(c) 2015 Douglas Christopher Wilson
       * MIT Licensed
       */ var n = a(58),
        o = a(6).extname,
        t = /^\s*([^;\s]*)(?:;|\s|$)/,
        s = /^text\//i
      function c(e) {
        if (!e || 'string' != typeof e) return !1
        var i = t.exec(e),
          a = i && n[i[1].toLowerCase()]
        return a && a.charset ? a.charset : !(!i || !s.test(i[1])) && 'UTF-8'
      }
      ;(i.charset = c),
        (i.charsets = { lookup: c }),
        (i.contentType = function (e) {
          if (!e || 'string' != typeof e) return !1
          var a = -1 === e.indexOf('/') ? i.lookup(e) : e
          if (!a) return !1
          if (-1 === a.indexOf('charset')) {
            var n = i.charset(a)
            n && (a += '; charset=' + n.toLowerCase())
          }
          return a
        }),
        (i.extension = function (e) {
          if (!e || 'string' != typeof e) return !1
          var a = t.exec(e),
            n = a && i.extensions[a[1].toLowerCase()]
          if (!n || !n.length) return !1
          return n[0]
        }),
        (i.extensions = Object.create(null)),
        (i.lookup = function (e) {
          if (!e || 'string' != typeof e) return !1
          var a = o('x.' + e)
            .toLowerCase()
            .substr(1)
          if (!a) return !1
          return i.types[a] || !1
        }),
        (i.types = Object.create(null)),
        (function (e, i) {
          var a = ['nginx', 'apache', void 0, 'iana']
          Object.keys(n).forEach(function (o) {
            var t = n[o],
              s = t.extensions
            if (s && s.length) {
              e[o] = s
              for (var c = 0; c < s.length; c++) {
                var r = s[c]
                if (i[r]) {
                  var p = a.indexOf(n[i[r]].source),
                    l = a.indexOf(t.source)
                  if (
                    'application/octet-stream' !== i[r] &&
                    (p > l ||
                      (p === l && 'application/' === i[r].substr(0, 12)))
                  )
                    continue
                }
                i[r] = o
              }
            }
          })
        })(i.extensions, i.types)
    },
    function (e, i, a) {
      /*!
       * mime-db
       * Copyright(c) 2014 Jonathan Ong
       * MIT Licensed
       */
      e.exports = a(59)
    },
    function (e) {
      e.exports = {
        'application/1d-interleaved-parityfec': { source: 'iana' },
        'application/3gpdash-qoe-report+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/3gpp-ims+xml': { source: 'iana', compressible: !0 },
        'application/a2l': { source: 'iana' },
        'application/activemessage': { source: 'iana' },
        'application/activity+json': { source: 'iana', compressible: !0 },
        'application/alto-costmap+json': { source: 'iana', compressible: !0 },
        'application/alto-costmapfilter+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/alto-directory+json': { source: 'iana', compressible: !0 },
        'application/alto-endpointcost+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/alto-endpointcostparams+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/alto-endpointprop+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/alto-endpointpropparams+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/alto-error+json': { source: 'iana', compressible: !0 },
        'application/alto-networkmap+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/alto-networkmapfilter+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/aml': { source: 'iana' },
        'application/andrew-inset': { source: 'iana', extensions: ['ez'] },
        'application/applefile': { source: 'iana' },
        'application/applixware': { source: 'apache', extensions: ['aw'] },
        'application/atf': { source: 'iana' },
        'application/atfx': { source: 'iana' },
        'application/atom+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['atom'],
        },
        'application/atomcat+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['atomcat'],
        },
        'application/atomdeleted+xml': { source: 'iana', compressible: !0 },
        'application/atomicmail': { source: 'iana' },
        'application/atomsvc+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['atomsvc'],
        },
        'application/atxml': { source: 'iana' },
        'application/auth-policy+xml': { source: 'iana', compressible: !0 },
        'application/bacnet-xdd+zip': { source: 'iana', compressible: !1 },
        'application/batch-smtp': { source: 'iana' },
        'application/bdoc': { compressible: !1, extensions: ['bdoc'] },
        'application/beep+xml': { source: 'iana', compressible: !0 },
        'application/calendar+json': { source: 'iana', compressible: !0 },
        'application/calendar+xml': { source: 'iana', compressible: !0 },
        'application/call-completion': { source: 'iana' },
        'application/cals-1840': { source: 'iana' },
        'application/cbor': { source: 'iana' },
        'application/cccex': { source: 'iana' },
        'application/ccmp+xml': { source: 'iana', compressible: !0 },
        'application/ccxml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['ccxml'],
        },
        'application/cdfx+xml': { source: 'iana', compressible: !0 },
        'application/cdmi-capability': {
          source: 'iana',
          extensions: ['cdmia'],
        },
        'application/cdmi-container': { source: 'iana', extensions: ['cdmic'] },
        'application/cdmi-domain': { source: 'iana', extensions: ['cdmid'] },
        'application/cdmi-object': { source: 'iana', extensions: ['cdmio'] },
        'application/cdmi-queue': { source: 'iana', extensions: ['cdmiq'] },
        'application/cdni': { source: 'iana' },
        'application/cea': { source: 'iana' },
        'application/cea-2018+xml': { source: 'iana', compressible: !0 },
        'application/cellml+xml': { source: 'iana', compressible: !0 },
        'application/cfw': { source: 'iana' },
        'application/clue_info+xml': { source: 'iana', compressible: !0 },
        'application/cms': { source: 'iana' },
        'application/cnrp+xml': { source: 'iana', compressible: !0 },
        'application/coap-group+json': { source: 'iana', compressible: !0 },
        'application/coap-payload': { source: 'iana' },
        'application/commonground': { source: 'iana' },
        'application/conference-info+xml': { source: 'iana', compressible: !0 },
        'application/cose': { source: 'iana' },
        'application/cose-key': { source: 'iana' },
        'application/cose-key-set': { source: 'iana' },
        'application/cpl+xml': { source: 'iana', compressible: !0 },
        'application/csrattrs': { source: 'iana' },
        'application/csta+xml': { source: 'iana', compressible: !0 },
        'application/cstadata+xml': { source: 'iana', compressible: !0 },
        'application/csvm+json': { source: 'iana', compressible: !0 },
        'application/cu-seeme': { source: 'apache', extensions: ['cu'] },
        'application/cwt': { source: 'iana' },
        'application/cybercash': { source: 'iana' },
        'application/dart': { compressible: !0 },
        'application/dash+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mpd'],
        },
        'application/dashdelta': { source: 'iana' },
        'application/davmount+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['davmount'],
        },
        'application/dca-rft': { source: 'iana' },
        'application/dcd': { source: 'iana' },
        'application/dec-dx': { source: 'iana' },
        'application/dialog-info+xml': { source: 'iana', compressible: !0 },
        'application/dicom': { source: 'iana' },
        'application/dicom+json': { source: 'iana', compressible: !0 },
        'application/dicom+xml': { source: 'iana', compressible: !0 },
        'application/dii': { source: 'iana' },
        'application/dit': { source: 'iana' },
        'application/dns': { source: 'iana' },
        'application/dns+json': { source: 'iana', compressible: !0 },
        'application/docbook+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['dbk'],
        },
        'application/dskpp+xml': { source: 'iana', compressible: !0 },
        'application/dssc+der': { source: 'iana', extensions: ['dssc'] },
        'application/dssc+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xdssc'],
        },
        'application/dvcs': { source: 'iana' },
        'application/ecmascript': {
          source: 'iana',
          compressible: !0,
          extensions: ['ecma', 'es'],
        },
        'application/edi-consent': { source: 'iana' },
        'application/edi-x12': { source: 'iana', compressible: !1 },
        'application/edifact': { source: 'iana', compressible: !1 },
        'application/efi': { source: 'iana' },
        'application/emergencycalldata.comment+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/emergencycalldata.control+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/emergencycalldata.deviceinfo+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/emergencycalldata.ecall.msd': { source: 'iana' },
        'application/emergencycalldata.providerinfo+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/emergencycalldata.serviceinfo+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/emergencycalldata.subscriberinfo+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/emergencycalldata.veds+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/emma+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['emma'],
        },
        'application/emotionml+xml': { source: 'iana', compressible: !0 },
        'application/encaprtp': { source: 'iana' },
        'application/epp+xml': { source: 'iana', compressible: !0 },
        'application/epub+zip': {
          source: 'iana',
          compressible: !1,
          extensions: ['epub'],
        },
        'application/eshop': { source: 'iana' },
        'application/exi': { source: 'iana', extensions: ['exi'] },
        'application/fastinfoset': { source: 'iana' },
        'application/fastsoap': { source: 'iana' },
        'application/fdt+xml': { source: 'iana', compressible: !0 },
        'application/fhir+json': { source: 'iana', compressible: !0 },
        'application/fhir+xml': { source: 'iana', compressible: !0 },
        'application/fido.trusted-apps+json': { compressible: !0 },
        'application/fits': { source: 'iana' },
        'application/font-sfnt': { source: 'iana' },
        'application/font-tdpfr': { source: 'iana', extensions: ['pfr'] },
        'application/font-woff': { source: 'iana', compressible: !1 },
        'application/framework-attributes+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/geo+json': {
          source: 'iana',
          compressible: !0,
          extensions: ['geojson'],
        },
        'application/geo+json-seq': { source: 'iana' },
        'application/geopackage+sqlite3': { source: 'iana' },
        'application/geoxacml+xml': { source: 'iana', compressible: !0 },
        'application/gltf-buffer': { source: 'iana' },
        'application/gml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['gml'],
        },
        'application/gpx+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['gpx'],
        },
        'application/gxf': { source: 'apache', extensions: ['gxf'] },
        'application/gzip': {
          source: 'iana',
          compressible: !1,
          extensions: ['gz'],
        },
        'application/h224': { source: 'iana' },
        'application/held+xml': { source: 'iana', compressible: !0 },
        'application/hjson': { extensions: ['hjson'] },
        'application/http': { source: 'iana' },
        'application/hyperstudio': { source: 'iana', extensions: ['stk'] },
        'application/ibe-key-request+xml': { source: 'iana', compressible: !0 },
        'application/ibe-pkg-reply+xml': { source: 'iana', compressible: !0 },
        'application/ibe-pp-data': { source: 'iana' },
        'application/iges': { source: 'iana' },
        'application/im-iscomposing+xml': { source: 'iana', compressible: !0 },
        'application/index': { source: 'iana' },
        'application/index.cmd': { source: 'iana' },
        'application/index.obj': { source: 'iana' },
        'application/index.response': { source: 'iana' },
        'application/index.vnd': { source: 'iana' },
        'application/inkml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['ink', 'inkml'],
        },
        'application/iotp': { source: 'iana' },
        'application/ipfix': { source: 'iana', extensions: ['ipfix'] },
        'application/ipp': { source: 'iana' },
        'application/isup': { source: 'iana' },
        'application/its+xml': { source: 'iana', compressible: !0 },
        'application/java-archive': {
          source: 'apache',
          compressible: !1,
          extensions: ['jar', 'war', 'ear'],
        },
        'application/java-serialized-object': {
          source: 'apache',
          compressible: !1,
          extensions: ['ser'],
        },
        'application/java-vm': {
          source: 'apache',
          compressible: !1,
          extensions: ['class'],
        },
        'application/javascript': {
          source: 'iana',
          charset: 'UTF-8',
          compressible: !0,
          extensions: ['js', 'mjs'],
        },
        'application/jf2feed+json': { source: 'iana', compressible: !0 },
        'application/jose': { source: 'iana' },
        'application/jose+json': { source: 'iana', compressible: !0 },
        'application/jrd+json': { source: 'iana', compressible: !0 },
        'application/json': {
          source: 'iana',
          charset: 'UTF-8',
          compressible: !0,
          extensions: ['json', 'map'],
        },
        'application/json-patch+json': { source: 'iana', compressible: !0 },
        'application/json-seq': { source: 'iana' },
        'application/json5': { extensions: ['json5'] },
        'application/jsonml+json': {
          source: 'apache',
          compressible: !0,
          extensions: ['jsonml'],
        },
        'application/jwk+json': { source: 'iana', compressible: !0 },
        'application/jwk-set+json': { source: 'iana', compressible: !0 },
        'application/jwt': { source: 'iana' },
        'application/kpml-request+xml': { source: 'iana', compressible: !0 },
        'application/kpml-response+xml': { source: 'iana', compressible: !0 },
        'application/ld+json': {
          source: 'iana',
          compressible: !0,
          extensions: ['jsonld'],
        },
        'application/lgr+xml': { source: 'iana', compressible: !0 },
        'application/link-format': { source: 'iana' },
        'application/load-control+xml': { source: 'iana', compressible: !0 },
        'application/lost+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['lostxml'],
        },
        'application/lostsync+xml': { source: 'iana', compressible: !0 },
        'application/lxf': { source: 'iana' },
        'application/mac-binhex40': { source: 'iana', extensions: ['hqx'] },
        'application/mac-compactpro': { source: 'apache', extensions: ['cpt'] },
        'application/macwriteii': { source: 'iana' },
        'application/mads+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mads'],
        },
        'application/manifest+json': {
          charset: 'UTF-8',
          compressible: !0,
          extensions: ['webmanifest'],
        },
        'application/marc': { source: 'iana', extensions: ['mrc'] },
        'application/marcxml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mrcx'],
        },
        'application/mathematica': {
          source: 'iana',
          extensions: ['ma', 'nb', 'mb'],
        },
        'application/mathml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mathml'],
        },
        'application/mathml-content+xml': { source: 'iana', compressible: !0 },
        'application/mathml-presentation+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/mbms-associated-procedure-description+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/mbms-deregister+xml': { source: 'iana', compressible: !0 },
        'application/mbms-envelope+xml': { source: 'iana', compressible: !0 },
        'application/mbms-msk+xml': { source: 'iana', compressible: !0 },
        'application/mbms-msk-response+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/mbms-protection-description+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/mbms-reception-report+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/mbms-register+xml': { source: 'iana', compressible: !0 },
        'application/mbms-register-response+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/mbms-schedule+xml': { source: 'iana', compressible: !0 },
        'application/mbms-user-service-description+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/mbox': { source: 'iana', extensions: ['mbox'] },
        'application/media-policy-dataset+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/media_control+xml': { source: 'iana', compressible: !0 },
        'application/mediaservercontrol+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mscml'],
        },
        'application/merge-patch+json': { source: 'iana', compressible: !0 },
        'application/metalink+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['metalink'],
        },
        'application/metalink4+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['meta4'],
        },
        'application/mets+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mets'],
        },
        'application/mf4': { source: 'iana' },
        'application/mikey': { source: 'iana' },
        'application/mmt-usd+xml': { source: 'iana', compressible: !0 },
        'application/mods+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mods'],
        },
        'application/moss-keys': { source: 'iana' },
        'application/moss-signature': { source: 'iana' },
        'application/mosskey-data': { source: 'iana' },
        'application/mosskey-request': { source: 'iana' },
        'application/mp21': { source: 'iana', extensions: ['m21', 'mp21'] },
        'application/mp4': { source: 'iana', extensions: ['mp4s', 'm4p'] },
        'application/mpeg4-generic': { source: 'iana' },
        'application/mpeg4-iod': { source: 'iana' },
        'application/mpeg4-iod-xmt': { source: 'iana' },
        'application/mrb-consumer+xml': { source: 'iana', compressible: !0 },
        'application/mrb-publish+xml': { source: 'iana', compressible: !0 },
        'application/msc-ivr+xml': { source: 'iana', compressible: !0 },
        'application/msc-mixer+xml': { source: 'iana', compressible: !0 },
        'application/msword': {
          source: 'iana',
          compressible: !1,
          extensions: ['doc', 'dot'],
        },
        'application/mud+json': { source: 'iana', compressible: !0 },
        'application/mxf': { source: 'iana', extensions: ['mxf'] },
        'application/n-quads': { source: 'iana' },
        'application/n-triples': { source: 'iana' },
        'application/nasdata': { source: 'iana' },
        'application/news-checkgroups': { source: 'iana' },
        'application/news-groupinfo': { source: 'iana' },
        'application/news-transmission': { source: 'iana' },
        'application/nlsml+xml': { source: 'iana', compressible: !0 },
        'application/node': { source: 'iana' },
        'application/nss': { source: 'iana' },
        'application/ocsp-request': { source: 'iana' },
        'application/ocsp-response': { source: 'iana' },
        'application/octet-stream': {
          source: 'iana',
          compressible: !1,
          extensions: [
            'bin',
            'dms',
            'lrf',
            'mar',
            'so',
            'dist',
            'distz',
            'pkg',
            'bpk',
            'dump',
            'elc',
            'deploy',
            'exe',
            'dll',
            'deb',
            'dmg',
            'iso',
            'img',
            'msi',
            'msp',
            'msm',
            'buffer',
          ],
        },
        'application/oda': { source: 'iana', extensions: ['oda'] },
        'application/odx': { source: 'iana' },
        'application/oebps-package+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['opf'],
        },
        'application/ogg': {
          source: 'iana',
          compressible: !1,
          extensions: ['ogx'],
        },
        'application/omdoc+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['omdoc'],
        },
        'application/onenote': {
          source: 'apache',
          extensions: ['onetoc', 'onetoc2', 'onetmp', 'onepkg'],
        },
        'application/oxps': { source: 'iana', extensions: ['oxps'] },
        'application/p2p-overlay+xml': { source: 'iana', compressible: !0 },
        'application/parityfec': { source: 'iana' },
        'application/passport': { source: 'iana' },
        'application/patch-ops-error+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xer'],
        },
        'application/pdf': {
          source: 'iana',
          compressible: !1,
          extensions: ['pdf'],
        },
        'application/pdx': { source: 'iana' },
        'application/pgp-encrypted': {
          source: 'iana',
          compressible: !1,
          extensions: ['pgp'],
        },
        'application/pgp-keys': { source: 'iana' },
        'application/pgp-signature': {
          source: 'iana',
          extensions: ['asc', 'sig'],
        },
        'application/pics-rules': { source: 'apache', extensions: ['prf'] },
        'application/pidf+xml': { source: 'iana', compressible: !0 },
        'application/pidf-diff+xml': { source: 'iana', compressible: !0 },
        'application/pkcs10': { source: 'iana', extensions: ['p10'] },
        'application/pkcs12': { source: 'iana' },
        'application/pkcs7-mime': {
          source: 'iana',
          extensions: ['p7m', 'p7c'],
        },
        'application/pkcs7-signature': { source: 'iana', extensions: ['p7s'] },
        'application/pkcs8': { source: 'iana', extensions: ['p8'] },
        'application/pkcs8-encrypted': { source: 'iana' },
        'application/pkix-attr-cert': { source: 'iana', extensions: ['ac'] },
        'application/pkix-cert': { source: 'iana', extensions: ['cer'] },
        'application/pkix-crl': { source: 'iana', extensions: ['crl'] },
        'application/pkix-pkipath': { source: 'iana', extensions: ['pkipath'] },
        'application/pkixcmp': { source: 'iana', extensions: ['pki'] },
        'application/pls+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['pls'],
        },
        'application/poc-settings+xml': { source: 'iana', compressible: !0 },
        'application/postscript': {
          source: 'iana',
          compressible: !0,
          extensions: ['ai', 'eps', 'ps'],
        },
        'application/ppsp-tracker+json': { source: 'iana', compressible: !0 },
        'application/problem+json': { source: 'iana', compressible: !0 },
        'application/problem+xml': { source: 'iana', compressible: !0 },
        'application/provenance+xml': { source: 'iana', compressible: !0 },
        'application/prs.alvestrand.titrax-sheet': { source: 'iana' },
        'application/prs.cww': { source: 'iana', extensions: ['cww'] },
        'application/prs.hpub+zip': { source: 'iana', compressible: !1 },
        'application/prs.nprend': { source: 'iana' },
        'application/prs.plucker': { source: 'iana' },
        'application/prs.rdf-xml-crypt': { source: 'iana' },
        'application/prs.xsf+xml': { source: 'iana', compressible: !0 },
        'application/pskc+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['pskcxml'],
        },
        'application/qsig': { source: 'iana' },
        'application/raml+yaml': { compressible: !0, extensions: ['raml'] },
        'application/raptorfec': { source: 'iana' },
        'application/rdap+json': { source: 'iana', compressible: !0 },
        'application/rdf+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['rdf', 'owl'],
        },
        'application/reginfo+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['rif'],
        },
        'application/relax-ng-compact-syntax': {
          source: 'iana',
          extensions: ['rnc'],
        },
        'application/remote-printing': { source: 'iana' },
        'application/reputon+json': { source: 'iana', compressible: !0 },
        'application/resource-lists+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['rl'],
        },
        'application/resource-lists-diff+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['rld'],
        },
        'application/rfc+xml': { source: 'iana', compressible: !0 },
        'application/riscos': { source: 'iana' },
        'application/rlmi+xml': { source: 'iana', compressible: !0 },
        'application/rls-services+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['rs'],
        },
        'application/route-apd+xml': { source: 'iana', compressible: !0 },
        'application/route-s-tsid+xml': { source: 'iana', compressible: !0 },
        'application/route-usd+xml': { source: 'iana', compressible: !0 },
        'application/rpki-ghostbusters': {
          source: 'iana',
          extensions: ['gbr'],
        },
        'application/rpki-manifest': { source: 'iana', extensions: ['mft'] },
        'application/rpki-publication': { source: 'iana' },
        'application/rpki-roa': { source: 'iana', extensions: ['roa'] },
        'application/rpki-updown': { source: 'iana' },
        'application/rsd+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['rsd'],
        },
        'application/rss+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['rss'],
        },
        'application/rtf': {
          source: 'iana',
          compressible: !0,
          extensions: ['rtf'],
        },
        'application/rtploopback': { source: 'iana' },
        'application/rtx': { source: 'iana' },
        'application/samlassertion+xml': { source: 'iana', compressible: !0 },
        'application/samlmetadata+xml': { source: 'iana', compressible: !0 },
        'application/sbml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['sbml'],
        },
        'application/scaip+xml': { source: 'iana', compressible: !0 },
        'application/scim+json': { source: 'iana', compressible: !0 },
        'application/scvp-cv-request': { source: 'iana', extensions: ['scq'] },
        'application/scvp-cv-response': { source: 'iana', extensions: ['scs'] },
        'application/scvp-vp-request': { source: 'iana', extensions: ['spq'] },
        'application/scvp-vp-response': { source: 'iana', extensions: ['spp'] },
        'application/sdp': { source: 'iana', extensions: ['sdp'] },
        'application/secevent+jwt': { source: 'iana' },
        'application/senml+cbor': { source: 'iana' },
        'application/senml+json': { source: 'iana', compressible: !0 },
        'application/senml+xml': { source: 'iana', compressible: !0 },
        'application/senml-exi': { source: 'iana' },
        'application/sensml+cbor': { source: 'iana' },
        'application/sensml+json': { source: 'iana', compressible: !0 },
        'application/sensml+xml': { source: 'iana', compressible: !0 },
        'application/sensml-exi': { source: 'iana' },
        'application/sep+xml': { source: 'iana', compressible: !0 },
        'application/sep-exi': { source: 'iana' },
        'application/session-info': { source: 'iana' },
        'application/set-payment': { source: 'iana' },
        'application/set-payment-initiation': {
          source: 'iana',
          extensions: ['setpay'],
        },
        'application/set-registration': { source: 'iana' },
        'application/set-registration-initiation': {
          source: 'iana',
          extensions: ['setreg'],
        },
        'application/sgml': { source: 'iana' },
        'application/sgml-open-catalog': { source: 'iana' },
        'application/shf+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['shf'],
        },
        'application/sieve': { source: 'iana' },
        'application/simple-filter+xml': { source: 'iana', compressible: !0 },
        'application/simple-message-summary': { source: 'iana' },
        'application/simplesymbolcontainer': { source: 'iana' },
        'application/slate': { source: 'iana' },
        'application/smil': { source: 'iana' },
        'application/smil+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['smi', 'smil'],
        },
        'application/smpte336m': { source: 'iana' },
        'application/soap+fastinfoset': { source: 'iana' },
        'application/soap+xml': { source: 'iana', compressible: !0 },
        'application/sparql-query': { source: 'iana', extensions: ['rq'] },
        'application/sparql-results+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['srx'],
        },
        'application/spirits-event+xml': { source: 'iana', compressible: !0 },
        'application/sql': { source: 'iana' },
        'application/srgs': { source: 'iana', extensions: ['gram'] },
        'application/srgs+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['grxml'],
        },
        'application/sru+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['sru'],
        },
        'application/ssdl+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['ssdl'],
        },
        'application/ssml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['ssml'],
        },
        'application/stix+json': { source: 'iana', compressible: !0 },
        'application/tamp-apex-update': { source: 'iana' },
        'application/tamp-apex-update-confirm': { source: 'iana' },
        'application/tamp-community-update': { source: 'iana' },
        'application/tamp-community-update-confirm': { source: 'iana' },
        'application/tamp-error': { source: 'iana' },
        'application/tamp-sequence-adjust': { source: 'iana' },
        'application/tamp-sequence-adjust-confirm': { source: 'iana' },
        'application/tamp-status-query': { source: 'iana' },
        'application/tamp-status-response': { source: 'iana' },
        'application/tamp-update': { source: 'iana' },
        'application/tamp-update-confirm': { source: 'iana' },
        'application/tar': { compressible: !0 },
        'application/taxii+json': { source: 'iana', compressible: !0 },
        'application/tei+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['tei', 'teicorpus'],
        },
        'application/thraud+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['tfi'],
        },
        'application/timestamp-query': { source: 'iana' },
        'application/timestamp-reply': { source: 'iana' },
        'application/timestamped-data': { source: 'iana', extensions: ['tsd'] },
        'application/tlsrpt+gzip': { source: 'iana' },
        'application/tlsrpt+json': { source: 'iana', compressible: !0 },
        'application/tnauthlist': { source: 'iana' },
        'application/trickle-ice-sdpfrag': { source: 'iana' },
        'application/trig': { source: 'iana' },
        'application/ttml+xml': { source: 'iana', compressible: !0 },
        'application/tve-trigger': { source: 'iana' },
        'application/ulpfec': { source: 'iana' },
        'application/urc-grpsheet+xml': { source: 'iana', compressible: !0 },
        'application/urc-ressheet+xml': { source: 'iana', compressible: !0 },
        'application/urc-targetdesc+xml': { source: 'iana', compressible: !0 },
        'application/urc-uisocketdesc+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vcard+json': { source: 'iana', compressible: !0 },
        'application/vcard+xml': { source: 'iana', compressible: !0 },
        'application/vemmi': { source: 'iana' },
        'application/vividence.scriptfile': { source: 'apache' },
        'application/vnd.1000minds.decision-model+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp-prose+xml': { source: 'iana', compressible: !0 },
        'application/vnd.3gpp-prose-pc3ch+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp-v2x-local-service-information': {
          source: 'iana',
        },
        'application/vnd.3gpp.access-transfer-events+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.bsf+xml': { source: 'iana', compressible: !0 },
        'application/vnd.3gpp.gmop+xml': { source: 'iana', compressible: !0 },
        'application/vnd.3gpp.mc-signalling-ear': { source: 'iana' },
        'application/vnd.3gpp.mcdata-payload': { source: 'iana' },
        'application/vnd.3gpp.mcdata-signalling': { source: 'iana' },
        'application/vnd.3gpp.mcptt-affiliation-command+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.mcptt-floor-request+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.mcptt-info+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.mcptt-location-info+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.mcptt-mbms-usage-info+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.mcptt-signed+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.mid-call+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.pic-bw-large': {
          source: 'iana',
          extensions: ['plb'],
        },
        'application/vnd.3gpp.pic-bw-small': {
          source: 'iana',
          extensions: ['psb'],
        },
        'application/vnd.3gpp.pic-bw-var': {
          source: 'iana',
          extensions: ['pvb'],
        },
        'application/vnd.3gpp.sms': { source: 'iana' },
        'application/vnd.3gpp.sms+xml': { source: 'iana', compressible: !0 },
        'application/vnd.3gpp.srvcc-ext+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.srvcc-info+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.state-and-event-info+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp.ussd+xml': { source: 'iana', compressible: !0 },
        'application/vnd.3gpp2.bcmcsinfo+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.3gpp2.sms': { source: 'iana' },
        'application/vnd.3gpp2.tcap': { source: 'iana', extensions: ['tcap'] },
        'application/vnd.3lightssoftware.imagescal': { source: 'iana' },
        'application/vnd.3m.post-it-notes': {
          source: 'iana',
          extensions: ['pwn'],
        },
        'application/vnd.accpac.simply.aso': {
          source: 'iana',
          extensions: ['aso'],
        },
        'application/vnd.accpac.simply.imp': {
          source: 'iana',
          extensions: ['imp'],
        },
        'application/vnd.acucobol': { source: 'iana', extensions: ['acu'] },
        'application/vnd.acucorp': {
          source: 'iana',
          extensions: ['atc', 'acutc'],
        },
        'application/vnd.adobe.air-application-installer-package+zip': {
          source: 'apache',
          compressible: !1,
          extensions: ['air'],
        },
        'application/vnd.adobe.flash.movie': { source: 'iana' },
        'application/vnd.adobe.formscentral.fcdt': {
          source: 'iana',
          extensions: ['fcdt'],
        },
        'application/vnd.adobe.fxp': {
          source: 'iana',
          extensions: ['fxp', 'fxpl'],
        },
        'application/vnd.adobe.partial-upload': { source: 'iana' },
        'application/vnd.adobe.xdp+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xdp'],
        },
        'application/vnd.adobe.xfdf': { source: 'iana', extensions: ['xfdf'] },
        'application/vnd.aether.imp': { source: 'iana' },
        'application/vnd.afpc.afplinedata': { source: 'iana' },
        'application/vnd.afpc.modca': { source: 'iana' },
        'application/vnd.ah-barcode': { source: 'iana' },
        'application/vnd.ahead.space': {
          source: 'iana',
          extensions: ['ahead'],
        },
        'application/vnd.airzip.filesecure.azf': {
          source: 'iana',
          extensions: ['azf'],
        },
        'application/vnd.airzip.filesecure.azs': {
          source: 'iana',
          extensions: ['azs'],
        },
        'application/vnd.amadeus+json': { source: 'iana', compressible: !0 },
        'application/vnd.amazon.ebook': {
          source: 'apache',
          extensions: ['azw'],
        },
        'application/vnd.amazon.mobi8-ebook': { source: 'iana' },
        'application/vnd.americandynamics.acc': {
          source: 'iana',
          extensions: ['acc'],
        },
        'application/vnd.amiga.ami': { source: 'iana', extensions: ['ami'] },
        'application/vnd.amundsen.maze+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.android.package-archive': {
          source: 'apache',
          compressible: !1,
          extensions: ['apk'],
        },
        'application/vnd.anki': { source: 'iana' },
        'application/vnd.anser-web-certificate-issue-initiation': {
          source: 'iana',
          extensions: ['cii'],
        },
        'application/vnd.anser-web-funds-transfer-initiation': {
          source: 'apache',
          extensions: ['fti'],
        },
        'application/vnd.antix.game-component': {
          source: 'iana',
          extensions: ['atx'],
        },
        'application/vnd.apache.thrift.binary': { source: 'iana' },
        'application/vnd.apache.thrift.compact': { source: 'iana' },
        'application/vnd.apache.thrift.json': { source: 'iana' },
        'application/vnd.api+json': { source: 'iana', compressible: !0 },
        'application/vnd.apothekende.reservation+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.apple.installer+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mpkg'],
        },
        'application/vnd.apple.keynote': {
          source: 'iana',
          extensions: ['keynote'],
        },
        'application/vnd.apple.mpegurl': {
          source: 'iana',
          extensions: ['m3u8'],
        },
        'application/vnd.apple.numbers': {
          source: 'iana',
          extensions: ['numbers'],
        },
        'application/vnd.apple.pages': {
          source: 'iana',
          extensions: ['pages'],
        },
        'application/vnd.apple.pkpass': {
          compressible: !1,
          extensions: ['pkpass'],
        },
        'application/vnd.arastra.swi': { source: 'iana' },
        'application/vnd.aristanetworks.swi': {
          source: 'iana',
          extensions: ['swi'],
        },
        'application/vnd.artisan+json': { source: 'iana', compressible: !0 },
        'application/vnd.artsquare': { source: 'iana' },
        'application/vnd.astraea-software.iota': {
          source: 'iana',
          extensions: ['iota'],
        },
        'application/vnd.audiograph': { source: 'iana', extensions: ['aep'] },
        'application/vnd.autopackage': { source: 'iana' },
        'application/vnd.avalon+json': { source: 'iana', compressible: !0 },
        'application/vnd.avistar+xml': { source: 'iana', compressible: !0 },
        'application/vnd.balsamiq.bmml+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.balsamiq.bmpr': { source: 'iana' },
        'application/vnd.banana-accounting': { source: 'iana' },
        'application/vnd.bbf.usp.msg': { source: 'iana' },
        'application/vnd.bbf.usp.msg+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.bekitzur-stech+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.bint.med-content': { source: 'iana' },
        'application/vnd.biopax.rdf+xml': { source: 'iana', compressible: !0 },
        'application/vnd.blink-idb-value-wrapper': { source: 'iana' },
        'application/vnd.blueice.multipass': {
          source: 'iana',
          extensions: ['mpm'],
        },
        'application/vnd.bluetooth.ep.oob': { source: 'iana' },
        'application/vnd.bluetooth.le.oob': { source: 'iana' },
        'application/vnd.bmi': { source: 'iana', extensions: ['bmi'] },
        'application/vnd.businessobjects': {
          source: 'iana',
          extensions: ['rep'],
        },
        'application/vnd.byu.uapi+json': { source: 'iana', compressible: !0 },
        'application/vnd.cab-jscript': { source: 'iana' },
        'application/vnd.canon-cpdl': { source: 'iana' },
        'application/vnd.canon-lips': { source: 'iana' },
        'application/vnd.capasystems-pg+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.cendio.thinlinc.clientconf': { source: 'iana' },
        'application/vnd.century-systems.tcp_stream': { source: 'iana' },
        'application/vnd.chemdraw+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['cdxml'],
        },
        'application/vnd.chess-pgn': { source: 'iana' },
        'application/vnd.chipnuts.karaoke-mmd': {
          source: 'iana',
          extensions: ['mmd'],
        },
        'application/vnd.cinderella': { source: 'iana', extensions: ['cdy'] },
        'application/vnd.cirpack.isdn-ext': { source: 'iana' },
        'application/vnd.citationstyles.style+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['csl'],
        },
        'application/vnd.claymore': { source: 'iana', extensions: ['cla'] },
        'application/vnd.cloanto.rp9': { source: 'iana', extensions: ['rp9'] },
        'application/vnd.clonk.c4group': {
          source: 'iana',
          extensions: ['c4g', 'c4d', 'c4f', 'c4p', 'c4u'],
        },
        'application/vnd.cluetrust.cartomobile-config': {
          source: 'iana',
          extensions: ['c11amc'],
        },
        'application/vnd.cluetrust.cartomobile-config-pkg': {
          source: 'iana',
          extensions: ['c11amz'],
        },
        'application/vnd.coffeescript': { source: 'iana' },
        'application/vnd.collabio.xodocuments.document': { source: 'iana' },
        'application/vnd.collabio.xodocuments.document-template': {
          source: 'iana',
        },
        'application/vnd.collabio.xodocuments.presentation': { source: 'iana' },
        'application/vnd.collabio.xodocuments.presentation-template': {
          source: 'iana',
        },
        'application/vnd.collabio.xodocuments.spreadsheet': { source: 'iana' },
        'application/vnd.collabio.xodocuments.spreadsheet-template': {
          source: 'iana',
        },
        'application/vnd.collection+json': { source: 'iana', compressible: !0 },
        'application/vnd.collection.doc+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.collection.next+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.comicbook+zip': { source: 'iana', compressible: !1 },
        'application/vnd.comicbook-rar': { source: 'iana' },
        'application/vnd.commerce-battelle': { source: 'iana' },
        'application/vnd.commonspace': { source: 'iana', extensions: ['csp'] },
        'application/vnd.contact.cmsg': {
          source: 'iana',
          extensions: ['cdbcmsg'],
        },
        'application/vnd.coreos.ignition+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.cosmocaller': { source: 'iana', extensions: ['cmc'] },
        'application/vnd.crick.clicker': {
          source: 'iana',
          extensions: ['clkx'],
        },
        'application/vnd.crick.clicker.keyboard': {
          source: 'iana',
          extensions: ['clkk'],
        },
        'application/vnd.crick.clicker.palette': {
          source: 'iana',
          extensions: ['clkp'],
        },
        'application/vnd.crick.clicker.template': {
          source: 'iana',
          extensions: ['clkt'],
        },
        'application/vnd.crick.clicker.wordbank': {
          source: 'iana',
          extensions: ['clkw'],
        },
        'application/vnd.criticaltools.wbs+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['wbs'],
        },
        'application/vnd.ctc-posml': { source: 'iana', extensions: ['pml'] },
        'application/vnd.ctct.ws+xml': { source: 'iana', compressible: !0 },
        'application/vnd.cups-pdf': { source: 'iana' },
        'application/vnd.cups-postscript': { source: 'iana' },
        'application/vnd.cups-ppd': { source: 'iana', extensions: ['ppd'] },
        'application/vnd.cups-raster': { source: 'iana' },
        'application/vnd.cups-raw': { source: 'iana' },
        'application/vnd.curl': { source: 'iana' },
        'application/vnd.curl.car': { source: 'apache', extensions: ['car'] },
        'application/vnd.curl.pcurl': {
          source: 'apache',
          extensions: ['pcurl'],
        },
        'application/vnd.cyan.dean.root+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.cybank': { source: 'iana' },
        'application/vnd.d2l.coursepackage1p0+zip': {
          source: 'iana',
          compressible: !1,
        },
        'application/vnd.dart': {
          source: 'iana',
          compressible: !0,
          extensions: ['dart'],
        },
        'application/vnd.data-vision.rdz': {
          source: 'iana',
          extensions: ['rdz'],
        },
        'application/vnd.datapackage+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dataresource+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.debian.binary-package': { source: 'iana' },
        'application/vnd.dece.data': {
          source: 'iana',
          extensions: ['uvf', 'uvvf', 'uvd', 'uvvd'],
        },
        'application/vnd.dece.ttml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['uvt', 'uvvt'],
        },
        'application/vnd.dece.unspecified': {
          source: 'iana',
          extensions: ['uvx', 'uvvx'],
        },
        'application/vnd.dece.zip': {
          source: 'iana',
          extensions: ['uvz', 'uvvz'],
        },
        'application/vnd.denovo.fcselayout-link': {
          source: 'iana',
          extensions: ['fe_launch'],
        },
        'application/vnd.desmume.movie': { source: 'iana' },
        'application/vnd.dir-bi.plate-dl-nosuffix': { source: 'iana' },
        'application/vnd.dm.delegation+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dna': { source: 'iana', extensions: ['dna'] },
        'application/vnd.document+json': { source: 'iana', compressible: !0 },
        'application/vnd.dolby.mlp': { source: 'apache', extensions: ['mlp'] },
        'application/vnd.dolby.mobile.1': { source: 'iana' },
        'application/vnd.dolby.mobile.2': { source: 'iana' },
        'application/vnd.doremir.scorecloud-binary-document': {
          source: 'iana',
        },
        'application/vnd.dpgraph': { source: 'iana', extensions: ['dpg'] },
        'application/vnd.dreamfactory': {
          source: 'iana',
          extensions: ['dfac'],
        },
        'application/vnd.drive+json': { source: 'iana', compressible: !0 },
        'application/vnd.ds-keypoint': {
          source: 'apache',
          extensions: ['kpxx'],
        },
        'application/vnd.dtg.local': { source: 'iana' },
        'application/vnd.dtg.local.flash': { source: 'iana' },
        'application/vnd.dtg.local.html': { source: 'iana' },
        'application/vnd.dvb.ait': { source: 'iana', extensions: ['ait'] },
        'application/vnd.dvb.dvbj': { source: 'iana' },
        'application/vnd.dvb.esgcontainer': { source: 'iana' },
        'application/vnd.dvb.ipdcdftnotifaccess': { source: 'iana' },
        'application/vnd.dvb.ipdcesgaccess': { source: 'iana' },
        'application/vnd.dvb.ipdcesgaccess2': { source: 'iana' },
        'application/vnd.dvb.ipdcesgpdd': { source: 'iana' },
        'application/vnd.dvb.ipdcroaming': { source: 'iana' },
        'application/vnd.dvb.iptv.alfec-base': { source: 'iana' },
        'application/vnd.dvb.iptv.alfec-enhancement': { source: 'iana' },
        'application/vnd.dvb.notif-aggregate-root+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dvb.notif-container+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dvb.notif-generic+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dvb.notif-ia-msglist+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dvb.notif-ia-registration-request+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dvb.notif-ia-registration-response+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dvb.notif-init+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.dvb.pfr': { source: 'iana' },
        'application/vnd.dvb.service': { source: 'iana', extensions: ['svc'] },
        'application/vnd.dxr': { source: 'iana' },
        'application/vnd.dynageo': { source: 'iana', extensions: ['geo'] },
        'application/vnd.dzr': { source: 'iana' },
        'application/vnd.easykaraoke.cdgdownload': { source: 'iana' },
        'application/vnd.ecdis-update': { source: 'iana' },
        'application/vnd.ecip.rlp': { source: 'iana' },
        'application/vnd.ecowin.chart': { source: 'iana', extensions: ['mag'] },
        'application/vnd.ecowin.filerequest': { source: 'iana' },
        'application/vnd.ecowin.fileupdate': { source: 'iana' },
        'application/vnd.ecowin.series': { source: 'iana' },
        'application/vnd.ecowin.seriesrequest': { source: 'iana' },
        'application/vnd.ecowin.seriesupdate': { source: 'iana' },
        'application/vnd.efi.img': { source: 'iana' },
        'application/vnd.efi.iso': { source: 'iana' },
        'application/vnd.emclient.accessrequest+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.enliven': { source: 'iana', extensions: ['nml'] },
        'application/vnd.enphase.envoy': { source: 'iana' },
        'application/vnd.eprints.data+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.epson.esf': { source: 'iana', extensions: ['esf'] },
        'application/vnd.epson.msf': { source: 'iana', extensions: ['msf'] },
        'application/vnd.epson.quickanime': {
          source: 'iana',
          extensions: ['qam'],
        },
        'application/vnd.epson.salt': { source: 'iana', extensions: ['slt'] },
        'application/vnd.epson.ssf': { source: 'iana', extensions: ['ssf'] },
        'application/vnd.ericsson.quickcall': { source: 'iana' },
        'application/vnd.espass-espass+zip': {
          source: 'iana',
          compressible: !1,
        },
        'application/vnd.eszigno3+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['es3', 'et3'],
        },
        'application/vnd.etsi.aoc+xml': { source: 'iana', compressible: !0 },
        'application/vnd.etsi.asic-e+zip': { source: 'iana', compressible: !1 },
        'application/vnd.etsi.asic-s+zip': { source: 'iana', compressible: !1 },
        'application/vnd.etsi.cug+xml': { source: 'iana', compressible: !0 },
        'application/vnd.etsi.iptvcommand+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvdiscovery+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvprofile+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvsad-bc+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvsad-cod+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvsad-npvr+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvservice+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvsync+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.iptvueprofile+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.mcid+xml': { source: 'iana', compressible: !0 },
        'application/vnd.etsi.mheg5': { source: 'iana' },
        'application/vnd.etsi.overload-control-policy-dataset+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.pstn+xml': { source: 'iana', compressible: !0 },
        'application/vnd.etsi.sci+xml': { source: 'iana', compressible: !0 },
        'application/vnd.etsi.simservs+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.etsi.timestamp-token': { source: 'iana' },
        'application/vnd.etsi.tsl+xml': { source: 'iana', compressible: !0 },
        'application/vnd.etsi.tsl.der': { source: 'iana' },
        'application/vnd.eudora.data': { source: 'iana' },
        'application/vnd.evolv.ecig.profile': { source: 'iana' },
        'application/vnd.evolv.ecig.settings': { source: 'iana' },
        'application/vnd.evolv.ecig.theme': { source: 'iana' },
        'application/vnd.ezpix-album': { source: 'iana', extensions: ['ez2'] },
        'application/vnd.ezpix-package': {
          source: 'iana',
          extensions: ['ez3'],
        },
        'application/vnd.f-secure.mobile': { source: 'iana' },
        'application/vnd.fastcopy-disk-image': { source: 'iana' },
        'application/vnd.fdf': { source: 'iana', extensions: ['fdf'] },
        'application/vnd.fdsn.mseed': { source: 'iana', extensions: ['mseed'] },
        'application/vnd.fdsn.seed': {
          source: 'iana',
          extensions: ['seed', 'dataless'],
        },
        'application/vnd.ffsns': { source: 'iana' },
        'application/vnd.filmit.zfc': { source: 'iana' },
        'application/vnd.fints': { source: 'iana' },
        'application/vnd.firemonkeys.cloudcell': { source: 'iana' },
        'application/vnd.flographit': { source: 'iana', extensions: ['gph'] },
        'application/vnd.fluxtime.clip': {
          source: 'iana',
          extensions: ['ftc'],
        },
        'application/vnd.font-fontforge-sfd': { source: 'iana' },
        'application/vnd.framemaker': {
          source: 'iana',
          extensions: ['fm', 'frame', 'maker', 'book'],
        },
        'application/vnd.frogans.fnc': { source: 'iana', extensions: ['fnc'] },
        'application/vnd.frogans.ltf': { source: 'iana', extensions: ['ltf'] },
        'application/vnd.fsc.weblaunch': {
          source: 'iana',
          extensions: ['fsc'],
        },
        'application/vnd.fujitsu.oasys': {
          source: 'iana',
          extensions: ['oas'],
        },
        'application/vnd.fujitsu.oasys2': {
          source: 'iana',
          extensions: ['oa2'],
        },
        'application/vnd.fujitsu.oasys3': {
          source: 'iana',
          extensions: ['oa3'],
        },
        'application/vnd.fujitsu.oasysgp': {
          source: 'iana',
          extensions: ['fg5'],
        },
        'application/vnd.fujitsu.oasysprs': {
          source: 'iana',
          extensions: ['bh2'],
        },
        'application/vnd.fujixerox.art-ex': { source: 'iana' },
        'application/vnd.fujixerox.art4': { source: 'iana' },
        'application/vnd.fujixerox.ddd': {
          source: 'iana',
          extensions: ['ddd'],
        },
        'application/vnd.fujixerox.docuworks': {
          source: 'iana',
          extensions: ['xdw'],
        },
        'application/vnd.fujixerox.docuworks.binder': {
          source: 'iana',
          extensions: ['xbd'],
        },
        'application/vnd.fujixerox.docuworks.container': { source: 'iana' },
        'application/vnd.fujixerox.hbpl': { source: 'iana' },
        'application/vnd.fut-misnet': { source: 'iana' },
        'application/vnd.futoin+json': { source: 'iana', compressible: !0 },
        'application/vnd.fuzzysheet': { source: 'iana', extensions: ['fzs'] },
        'application/vnd.genomatix.tuxedo': {
          source: 'iana',
          extensions: ['txd'],
        },
        'application/vnd.geo+json': { source: 'iana', compressible: !0 },
        'application/vnd.geocube+xml': { source: 'iana', compressible: !0 },
        'application/vnd.geogebra.file': {
          source: 'iana',
          extensions: ['ggb'],
        },
        'application/vnd.geogebra.tool': {
          source: 'iana',
          extensions: ['ggt'],
        },
        'application/vnd.geometry-explorer': {
          source: 'iana',
          extensions: ['gex', 'gre'],
        },
        'application/vnd.geonext': { source: 'iana', extensions: ['gxt'] },
        'application/vnd.geoplan': { source: 'iana', extensions: ['g2w'] },
        'application/vnd.geospace': { source: 'iana', extensions: ['g3w'] },
        'application/vnd.gerber': { source: 'iana' },
        'application/vnd.globalplatform.card-content-mgt': { source: 'iana' },
        'application/vnd.globalplatform.card-content-mgt-response': {
          source: 'iana',
        },
        'application/vnd.gmx': { source: 'iana', extensions: ['gmx'] },
        'application/vnd.google-apps.document': {
          compressible: !1,
          extensions: ['gdoc'],
        },
        'application/vnd.google-apps.presentation': {
          compressible: !1,
          extensions: ['gslides'],
        },
        'application/vnd.google-apps.spreadsheet': {
          compressible: !1,
          extensions: ['gsheet'],
        },
        'application/vnd.google-earth.kml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['kml'],
        },
        'application/vnd.google-earth.kmz': {
          source: 'iana',
          compressible: !1,
          extensions: ['kmz'],
        },
        'application/vnd.gov.sk.e-form+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.gov.sk.e-form+zip': {
          source: 'iana',
          compressible: !1,
        },
        'application/vnd.gov.sk.xmldatacontainer+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.grafeq': {
          source: 'iana',
          extensions: ['gqf', 'gqs'],
        },
        'application/vnd.gridmp': { source: 'iana' },
        'application/vnd.groove-account': {
          source: 'iana',
          extensions: ['gac'],
        },
        'application/vnd.groove-help': { source: 'iana', extensions: ['ghf'] },
        'application/vnd.groove-identity-message': {
          source: 'iana',
          extensions: ['gim'],
        },
        'application/vnd.groove-injector': {
          source: 'iana',
          extensions: ['grv'],
        },
        'application/vnd.groove-tool-message': {
          source: 'iana',
          extensions: ['gtm'],
        },
        'application/vnd.groove-tool-template': {
          source: 'iana',
          extensions: ['tpl'],
        },
        'application/vnd.groove-vcard': { source: 'iana', extensions: ['vcg'] },
        'application/vnd.hal+json': { source: 'iana', compressible: !0 },
        'application/vnd.hal+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['hal'],
        },
        'application/vnd.handheld-entertainment+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['zmm'],
        },
        'application/vnd.hbci': { source: 'iana', extensions: ['hbci'] },
        'application/vnd.hc+json': { source: 'iana', compressible: !0 },
        'application/vnd.hcl-bireports': { source: 'iana' },
        'application/vnd.hdt': { source: 'iana' },
        'application/vnd.heroku+json': { source: 'iana', compressible: !0 },
        'application/vnd.hhe.lesson-player': {
          source: 'iana',
          extensions: ['les'],
        },
        'application/vnd.hp-hpgl': { source: 'iana', extensions: ['hpgl'] },
        'application/vnd.hp-hpid': { source: 'iana', extensions: ['hpid'] },
        'application/vnd.hp-hps': { source: 'iana', extensions: ['hps'] },
        'application/vnd.hp-jlyt': { source: 'iana', extensions: ['jlt'] },
        'application/vnd.hp-pcl': { source: 'iana', extensions: ['pcl'] },
        'application/vnd.hp-pclxl': { source: 'iana', extensions: ['pclxl'] },
        'application/vnd.httphone': { source: 'iana' },
        'application/vnd.hydrostatix.sof-data': {
          source: 'iana',
          extensions: ['sfd-hdstx'],
        },
        'application/vnd.hyper+json': { source: 'iana', compressible: !0 },
        'application/vnd.hyper-item+json': { source: 'iana', compressible: !0 },
        'application/vnd.hyperdrive+json': { source: 'iana', compressible: !0 },
        'application/vnd.hzn-3d-crossword': { source: 'iana' },
        'application/vnd.ibm.afplinedata': { source: 'iana' },
        'application/vnd.ibm.electronic-media': { source: 'iana' },
        'application/vnd.ibm.minipay': { source: 'iana', extensions: ['mpy'] },
        'application/vnd.ibm.modcap': {
          source: 'iana',
          extensions: ['afp', 'listafp', 'list3820'],
        },
        'application/vnd.ibm.rights-management': {
          source: 'iana',
          extensions: ['irm'],
        },
        'application/vnd.ibm.secure-container': {
          source: 'iana',
          extensions: ['sc'],
        },
        'application/vnd.iccprofile': {
          source: 'iana',
          extensions: ['icc', 'icm'],
        },
        'application/vnd.ieee.1905': { source: 'iana' },
        'application/vnd.igloader': { source: 'iana', extensions: ['igl'] },
        'application/vnd.imagemeter.folder+zip': {
          source: 'iana',
          compressible: !1,
        },
        'application/vnd.imagemeter.image+zip': {
          source: 'iana',
          compressible: !1,
        },
        'application/vnd.immervision-ivp': {
          source: 'iana',
          extensions: ['ivp'],
        },
        'application/vnd.immervision-ivu': {
          source: 'iana',
          extensions: ['ivu'],
        },
        'application/vnd.ims.imsccv1p1': { source: 'iana' },
        'application/vnd.ims.imsccv1p2': { source: 'iana' },
        'application/vnd.ims.imsccv1p3': { source: 'iana' },
        'application/vnd.ims.lis.v2.result+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ims.lti.v2.toolconsumerprofile+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ims.lti.v2.toolproxy+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ims.lti.v2.toolproxy.id+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ims.lti.v2.toolsettings+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ims.lti.v2.toolsettings.simple+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.informedcontrol.rms+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.informix-visionary': { source: 'iana' },
        'application/vnd.infotech.project': { source: 'iana' },
        'application/vnd.infotech.project+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.innopath.wamp.notification': { source: 'iana' },
        'application/vnd.insors.igm': { source: 'iana', extensions: ['igm'] },
        'application/vnd.intercon.formnet': {
          source: 'iana',
          extensions: ['xpw', 'xpx'],
        },
        'application/vnd.intergeo': { source: 'iana', extensions: ['i2g'] },
        'application/vnd.intertrust.digibox': { source: 'iana' },
        'application/vnd.intertrust.nncp': { source: 'iana' },
        'application/vnd.intu.qbo': { source: 'iana', extensions: ['qbo'] },
        'application/vnd.intu.qfx': { source: 'iana', extensions: ['qfx'] },
        'application/vnd.iptc.g2.catalogitem+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.iptc.g2.conceptitem+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.iptc.g2.knowledgeitem+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.iptc.g2.newsitem+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.iptc.g2.newsmessage+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.iptc.g2.packageitem+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.iptc.g2.planningitem+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ipunplugged.rcprofile': {
          source: 'iana',
          extensions: ['rcprofile'],
        },
        'application/vnd.irepository.package+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['irp'],
        },
        'application/vnd.is-xpr': { source: 'iana', extensions: ['xpr'] },
        'application/vnd.isac.fcs': { source: 'iana', extensions: ['fcs'] },
        'application/vnd.jam': { source: 'iana', extensions: ['jam'] },
        'application/vnd.japannet-directory-service': { source: 'iana' },
        'application/vnd.japannet-jpnstore-wakeup': { source: 'iana' },
        'application/vnd.japannet-payment-wakeup': { source: 'iana' },
        'application/vnd.japannet-registration': { source: 'iana' },
        'application/vnd.japannet-registration-wakeup': { source: 'iana' },
        'application/vnd.japannet-setstore-wakeup': { source: 'iana' },
        'application/vnd.japannet-verification': { source: 'iana' },
        'application/vnd.japannet-verification-wakeup': { source: 'iana' },
        'application/vnd.jcp.javame.midlet-rms': {
          source: 'iana',
          extensions: ['rms'],
        },
        'application/vnd.jisp': { source: 'iana', extensions: ['jisp'] },
        'application/vnd.joost.joda-archive': {
          source: 'iana',
          extensions: ['joda'],
        },
        'application/vnd.jsk.isdn-ngn': { source: 'iana' },
        'application/vnd.kahootz': {
          source: 'iana',
          extensions: ['ktz', 'ktr'],
        },
        'application/vnd.kde.karbon': {
          source: 'iana',
          extensions: ['karbon'],
        },
        'application/vnd.kde.kchart': { source: 'iana', extensions: ['chrt'] },
        'application/vnd.kde.kformula': { source: 'iana', extensions: ['kfo'] },
        'application/vnd.kde.kivio': { source: 'iana', extensions: ['flw'] },
        'application/vnd.kde.kontour': { source: 'iana', extensions: ['kon'] },
        'application/vnd.kde.kpresenter': {
          source: 'iana',
          extensions: ['kpr', 'kpt'],
        },
        'application/vnd.kde.kspread': { source: 'iana', extensions: ['ksp'] },
        'application/vnd.kde.kword': {
          source: 'iana',
          extensions: ['kwd', 'kwt'],
        },
        'application/vnd.kenameaapp': { source: 'iana', extensions: ['htke'] },
        'application/vnd.kidspiration': { source: 'iana', extensions: ['kia'] },
        'application/vnd.kinar': { source: 'iana', extensions: ['kne', 'knp'] },
        'application/vnd.koan': {
          source: 'iana',
          extensions: ['skp', 'skd', 'skt', 'skm'],
        },
        'application/vnd.kodak-descriptor': {
          source: 'iana',
          extensions: ['sse'],
        },
        'application/vnd.las.las+json': { source: 'iana', compressible: !0 },
        'application/vnd.las.las+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['lasxml'],
        },
        'application/vnd.leap+json': { source: 'iana', compressible: !0 },
        'application/vnd.liberty-request+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.llamagraphics.life-balance.desktop': {
          source: 'iana',
          extensions: ['lbd'],
        },
        'application/vnd.llamagraphics.life-balance.exchange+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['lbe'],
        },
        'application/vnd.lotus-1-2-3': { source: 'iana', extensions: ['123'] },
        'application/vnd.lotus-approach': {
          source: 'iana',
          extensions: ['apr'],
        },
        'application/vnd.lotus-freelance': {
          source: 'iana',
          extensions: ['pre'],
        },
        'application/vnd.lotus-notes': { source: 'iana', extensions: ['nsf'] },
        'application/vnd.lotus-organizer': {
          source: 'iana',
          extensions: ['org'],
        },
        'application/vnd.lotus-screencam': {
          source: 'iana',
          extensions: ['scm'],
        },
        'application/vnd.lotus-wordpro': {
          source: 'iana',
          extensions: ['lwp'],
        },
        'application/vnd.macports.portpkg': {
          source: 'iana',
          extensions: ['portpkg'],
        },
        'application/vnd.mapbox-vector-tile': { source: 'iana' },
        'application/vnd.marlin.drm.actiontoken+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.marlin.drm.conftoken+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.marlin.drm.license+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.marlin.drm.mdcf': { source: 'iana' },
        'application/vnd.mason+json': { source: 'iana', compressible: !0 },
        'application/vnd.maxmind.maxmind-db': { source: 'iana' },
        'application/vnd.mcd': { source: 'iana', extensions: ['mcd'] },
        'application/vnd.medcalcdata': { source: 'iana', extensions: ['mc1'] },
        'application/vnd.mediastation.cdkey': {
          source: 'iana',
          extensions: ['cdkey'],
        },
        'application/vnd.meridian-slingshot': { source: 'iana' },
        'application/vnd.mfer': { source: 'iana', extensions: ['mwf'] },
        'application/vnd.mfmp': { source: 'iana', extensions: ['mfm'] },
        'application/vnd.micro+json': { source: 'iana', compressible: !0 },
        'application/vnd.micrografx.flo': {
          source: 'iana',
          extensions: ['flo'],
        },
        'application/vnd.micrografx.igx': {
          source: 'iana',
          extensions: ['igx'],
        },
        'application/vnd.microsoft.portable-executable': { source: 'iana' },
        'application/vnd.microsoft.windows.thumbnail-cache': { source: 'iana' },
        'application/vnd.miele+json': { source: 'iana', compressible: !0 },
        'application/vnd.mif': { source: 'iana', extensions: ['mif'] },
        'application/vnd.minisoft-hp3000-save': { source: 'iana' },
        'application/vnd.mitsubishi.misty-guard.trustweb': { source: 'iana' },
        'application/vnd.mobius.daf': { source: 'iana', extensions: ['daf'] },
        'application/vnd.mobius.dis': { source: 'iana', extensions: ['dis'] },
        'application/vnd.mobius.mbk': { source: 'iana', extensions: ['mbk'] },
        'application/vnd.mobius.mqy': { source: 'iana', extensions: ['mqy'] },
        'application/vnd.mobius.msl': { source: 'iana', extensions: ['msl'] },
        'application/vnd.mobius.plc': { source: 'iana', extensions: ['plc'] },
        'application/vnd.mobius.txf': { source: 'iana', extensions: ['txf'] },
        'application/vnd.mophun.application': {
          source: 'iana',
          extensions: ['mpn'],
        },
        'application/vnd.mophun.certificate': {
          source: 'iana',
          extensions: ['mpc'],
        },
        'application/vnd.motorola.flexsuite': { source: 'iana' },
        'application/vnd.motorola.flexsuite.adsi': { source: 'iana' },
        'application/vnd.motorola.flexsuite.fis': { source: 'iana' },
        'application/vnd.motorola.flexsuite.gotap': { source: 'iana' },
        'application/vnd.motorola.flexsuite.kmr': { source: 'iana' },
        'application/vnd.motorola.flexsuite.ttc': { source: 'iana' },
        'application/vnd.motorola.flexsuite.wem': { source: 'iana' },
        'application/vnd.motorola.iprm': { source: 'iana' },
        'application/vnd.mozilla.xul+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xul'],
        },
        'application/vnd.ms-3mfdocument': { source: 'iana' },
        'application/vnd.ms-artgalry': { source: 'iana', extensions: ['cil'] },
        'application/vnd.ms-asf': { source: 'iana' },
        'application/vnd.ms-cab-compressed': {
          source: 'iana',
          extensions: ['cab'],
        },
        'application/vnd.ms-color.iccprofile': { source: 'apache' },
        'application/vnd.ms-excel': {
          source: 'iana',
          compressible: !1,
          extensions: ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
        },
        'application/vnd.ms-excel.addin.macroenabled.12': {
          source: 'iana',
          extensions: ['xlam'],
        },
        'application/vnd.ms-excel.sheet.binary.macroenabled.12': {
          source: 'iana',
          extensions: ['xlsb'],
        },
        'application/vnd.ms-excel.sheet.macroenabled.12': {
          source: 'iana',
          extensions: ['xlsm'],
        },
        'application/vnd.ms-excel.template.macroenabled.12': {
          source: 'iana',
          extensions: ['xltm'],
        },
        'application/vnd.ms-fontobject': {
          source: 'iana',
          compressible: !0,
          extensions: ['eot'],
        },
        'application/vnd.ms-htmlhelp': { source: 'iana', extensions: ['chm'] },
        'application/vnd.ms-ims': { source: 'iana', extensions: ['ims'] },
        'application/vnd.ms-lrm': { source: 'iana', extensions: ['lrm'] },
        'application/vnd.ms-office.activex+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ms-officetheme': {
          source: 'iana',
          extensions: ['thmx'],
        },
        'application/vnd.ms-opentype': { source: 'apache', compressible: !0 },
        'application/vnd.ms-outlook': { compressible: !1, extensions: ['msg'] },
        'application/vnd.ms-package.obfuscated-opentype': { source: 'apache' },
        'application/vnd.ms-pki.seccat': {
          source: 'apache',
          extensions: ['cat'],
        },
        'application/vnd.ms-pki.stl': { source: 'apache', extensions: ['stl'] },
        'application/vnd.ms-playready.initiator+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ms-powerpoint': {
          source: 'iana',
          compressible: !1,
          extensions: ['ppt', 'pps', 'pot'],
        },
        'application/vnd.ms-powerpoint.addin.macroenabled.12': {
          source: 'iana',
          extensions: ['ppam'],
        },
        'application/vnd.ms-powerpoint.presentation.macroenabled.12': {
          source: 'iana',
          extensions: ['pptm'],
        },
        'application/vnd.ms-powerpoint.slide.macroenabled.12': {
          source: 'iana',
          extensions: ['sldm'],
        },
        'application/vnd.ms-powerpoint.slideshow.macroenabled.12': {
          source: 'iana',
          extensions: ['ppsm'],
        },
        'application/vnd.ms-powerpoint.template.macroenabled.12': {
          source: 'iana',
          extensions: ['potm'],
        },
        'application/vnd.ms-printdevicecapabilities+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ms-printing.printticket+xml': {
          source: 'apache',
          compressible: !0,
        },
        'application/vnd.ms-printschematicket+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.ms-project': {
          source: 'iana',
          extensions: ['mpp', 'mpt'],
        },
        'application/vnd.ms-tnef': { source: 'iana' },
        'application/vnd.ms-windows.devicepairing': { source: 'iana' },
        'application/vnd.ms-windows.nwprinting.oob': { source: 'iana' },
        'application/vnd.ms-windows.printerpairing': { source: 'iana' },
        'application/vnd.ms-windows.wsd.oob': { source: 'iana' },
        'application/vnd.ms-wmdrm.lic-chlg-req': { source: 'iana' },
        'application/vnd.ms-wmdrm.lic-resp': { source: 'iana' },
        'application/vnd.ms-wmdrm.meter-chlg-req': { source: 'iana' },
        'application/vnd.ms-wmdrm.meter-resp': { source: 'iana' },
        'application/vnd.ms-word.document.macroenabled.12': {
          source: 'iana',
          extensions: ['docm'],
        },
        'application/vnd.ms-word.template.macroenabled.12': {
          source: 'iana',
          extensions: ['dotm'],
        },
        'application/vnd.ms-works': {
          source: 'iana',
          extensions: ['wps', 'wks', 'wcm', 'wdb'],
        },
        'application/vnd.ms-wpl': { source: 'iana', extensions: ['wpl'] },
        'application/vnd.ms-xpsdocument': {
          source: 'iana',
          compressible: !1,
          extensions: ['xps'],
        },
        'application/vnd.msa-disk-image': { source: 'iana' },
        'application/vnd.mseq': { source: 'iana', extensions: ['mseq'] },
        'application/vnd.msign': { source: 'iana' },
        'application/vnd.multiad.creator': { source: 'iana' },
        'application/vnd.multiad.creator.cif': { source: 'iana' },
        'application/vnd.music-niff': { source: 'iana' },
        'application/vnd.musician': { source: 'iana', extensions: ['mus'] },
        'application/vnd.muvee.style': { source: 'iana', extensions: ['msty'] },
        'application/vnd.mynfc': { source: 'iana', extensions: ['taglet'] },
        'application/vnd.ncd.control': { source: 'iana' },
        'application/vnd.ncd.reference': { source: 'iana' },
        'application/vnd.nearst.inv+json': { source: 'iana', compressible: !0 },
        'application/vnd.nervana': { source: 'iana' },
        'application/vnd.netfpx': { source: 'iana' },
        'application/vnd.neurolanguage.nlu': {
          source: 'iana',
          extensions: ['nlu'],
        },
        'application/vnd.nimn': { source: 'iana' },
        'application/vnd.nintendo.nitro.rom': { source: 'iana' },
        'application/vnd.nintendo.snes.rom': { source: 'iana' },
        'application/vnd.nitf': { source: 'iana', extensions: ['ntf', 'nitf'] },
        'application/vnd.noblenet-directory': {
          source: 'iana',
          extensions: ['nnd'],
        },
        'application/vnd.noblenet-sealer': {
          source: 'iana',
          extensions: ['nns'],
        },
        'application/vnd.noblenet-web': { source: 'iana', extensions: ['nnw'] },
        'application/vnd.nokia.catalogs': { source: 'iana' },
        'application/vnd.nokia.conml+wbxml': { source: 'iana' },
        'application/vnd.nokia.conml+xml': { source: 'iana', compressible: !0 },
        'application/vnd.nokia.iptv.config+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.nokia.isds-radio-presets': { source: 'iana' },
        'application/vnd.nokia.landmark+wbxml': { source: 'iana' },
        'application/vnd.nokia.landmark+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.nokia.landmarkcollection+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.nokia.n-gage.ac+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.nokia.n-gage.data': {
          source: 'iana',
          extensions: ['ngdat'],
        },
        'application/vnd.nokia.n-gage.symbian.install': {
          source: 'iana',
          extensions: ['n-gage'],
        },
        'application/vnd.nokia.ncd': { source: 'iana' },
        'application/vnd.nokia.pcd+wbxml': { source: 'iana' },
        'application/vnd.nokia.pcd+xml': { source: 'iana', compressible: !0 },
        'application/vnd.nokia.radio-preset': {
          source: 'iana',
          extensions: ['rpst'],
        },
        'application/vnd.nokia.radio-presets': {
          source: 'iana',
          extensions: ['rpss'],
        },
        'application/vnd.novadigm.edm': { source: 'iana', extensions: ['edm'] },
        'application/vnd.novadigm.edx': { source: 'iana', extensions: ['edx'] },
        'application/vnd.novadigm.ext': { source: 'iana', extensions: ['ext'] },
        'application/vnd.ntt-local.content-share': { source: 'iana' },
        'application/vnd.ntt-local.file-transfer': { source: 'iana' },
        'application/vnd.ntt-local.ogw_remote-access': { source: 'iana' },
        'application/vnd.ntt-local.sip-ta_remote': { source: 'iana' },
        'application/vnd.ntt-local.sip-ta_tcp_stream': { source: 'iana' },
        'application/vnd.oasis.opendocument.chart': {
          source: 'iana',
          extensions: ['odc'],
        },
        'application/vnd.oasis.opendocument.chart-template': {
          source: 'iana',
          extensions: ['otc'],
        },
        'application/vnd.oasis.opendocument.database': {
          source: 'iana',
          extensions: ['odb'],
        },
        'application/vnd.oasis.opendocument.formula': {
          source: 'iana',
          extensions: ['odf'],
        },
        'application/vnd.oasis.opendocument.formula-template': {
          source: 'iana',
          extensions: ['odft'],
        },
        'application/vnd.oasis.opendocument.graphics': {
          source: 'iana',
          compressible: !1,
          extensions: ['odg'],
        },
        'application/vnd.oasis.opendocument.graphics-template': {
          source: 'iana',
          extensions: ['otg'],
        },
        'application/vnd.oasis.opendocument.image': {
          source: 'iana',
          extensions: ['odi'],
        },
        'application/vnd.oasis.opendocument.image-template': {
          source: 'iana',
          extensions: ['oti'],
        },
        'application/vnd.oasis.opendocument.presentation': {
          source: 'iana',
          compressible: !1,
          extensions: ['odp'],
        },
        'application/vnd.oasis.opendocument.presentation-template': {
          source: 'iana',
          extensions: ['otp'],
        },
        'application/vnd.oasis.opendocument.spreadsheet': {
          source: 'iana',
          compressible: !1,
          extensions: ['ods'],
        },
        'application/vnd.oasis.opendocument.spreadsheet-template': {
          source: 'iana',
          extensions: ['ots'],
        },
        'application/vnd.oasis.opendocument.text': {
          source: 'iana',
          compressible: !1,
          extensions: ['odt'],
        },
        'application/vnd.oasis.opendocument.text-master': {
          source: 'iana',
          extensions: ['odm'],
        },
        'application/vnd.oasis.opendocument.text-template': {
          source: 'iana',
          extensions: ['ott'],
        },
        'application/vnd.oasis.opendocument.text-web': {
          source: 'iana',
          extensions: ['oth'],
        },
        'application/vnd.obn': { source: 'iana' },
        'application/vnd.ocf+cbor': { source: 'iana' },
        'application/vnd.oftn.l10n+json': { source: 'iana', compressible: !0 },
        'application/vnd.oipf.contentaccessdownload+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.contentaccessstreaming+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.cspg-hexbinary': { source: 'iana' },
        'application/vnd.oipf.dae.svg+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.dae.xhtml+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.mippvcontrolmessage+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.pae.gem': { source: 'iana' },
        'application/vnd.oipf.spdiscovery+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.spdlist+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.ueprofile+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oipf.userprofile+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.olpc-sugar': { source: 'iana', extensions: ['xo'] },
        'application/vnd.oma-scws-config': { source: 'iana' },
        'application/vnd.oma-scws-http-request': { source: 'iana' },
        'application/vnd.oma-scws-http-response': { source: 'iana' },
        'application/vnd.oma.bcast.associated-procedure-parameter+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.bcast.drm-trigger+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.bcast.imd+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.bcast.ltkm': { source: 'iana' },
        'application/vnd.oma.bcast.notification+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.bcast.provisioningtrigger': { source: 'iana' },
        'application/vnd.oma.bcast.sgboot': { source: 'iana' },
        'application/vnd.oma.bcast.sgdd+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.bcast.sgdu': { source: 'iana' },
        'application/vnd.oma.bcast.simple-symbol-container': { source: 'iana' },
        'application/vnd.oma.bcast.smartcard-trigger+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.bcast.sprov+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.bcast.stkm': { source: 'iana' },
        'application/vnd.oma.cab-address-book+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.cab-feature-handler+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.cab-pcc+xml': { source: 'iana', compressible: !0 },
        'application/vnd.oma.cab-subs-invite+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.cab-user-prefs+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.dcd': { source: 'iana' },
        'application/vnd.oma.dcdc': { source: 'iana' },
        'application/vnd.oma.dd2+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['dd2'],
        },
        'application/vnd.oma.drm.risd+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.group-usage-list+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.lwm2m+json': { source: 'iana', compressible: !0 },
        'application/vnd.oma.lwm2m+tlv': { source: 'iana' },
        'application/vnd.oma.pal+xml': { source: 'iana', compressible: !0 },
        'application/vnd.oma.poc.detailed-progress-report+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.poc.final-report+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.poc.groups+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.poc.invocation-descriptor+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.poc.optimized-progress-report+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.push': { source: 'iana' },
        'application/vnd.oma.scidm.messages+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oma.xcap-directory+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.omads-email+xml': { source: 'iana', compressible: !0 },
        'application/vnd.omads-file+xml': { source: 'iana', compressible: !0 },
        'application/vnd.omads-folder+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.omaloc-supl-init': { source: 'iana' },
        'application/vnd.onepager': { source: 'iana' },
        'application/vnd.onepagertamp': { source: 'iana' },
        'application/vnd.onepagertamx': { source: 'iana' },
        'application/vnd.onepagertat': { source: 'iana' },
        'application/vnd.onepagertatp': { source: 'iana' },
        'application/vnd.onepagertatx': { source: 'iana' },
        'application/vnd.openblox.game+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openblox.game-binary': { source: 'iana' },
        'application/vnd.openeye.oeb': { source: 'iana' },
        'application/vnd.openofficeorg.extension': {
          source: 'apache',
          extensions: ['oxt'],
        },
        'application/vnd.openstreetmap.data+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openxmlformats-officedocument.custom-properties+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openxmlformats-officedocument.customxmlproperties+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.drawing+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openxmlformats-officedocument.drawingml.chart+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.extended-properties+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.comments+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          { source: 'iana', compressible: !1, extensions: ['pptx'] },
        'application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.presprops+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.slide': {
          source: 'iana',
          extensions: ['sldx'],
        },
        'application/vnd.openxmlformats-officedocument.presentationml.slide+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
          { source: 'iana', extensions: ['ppsx'] },
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.tags+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.template':
          { source: 'iana', extensions: ['potx'] },
        'application/vnd.openxmlformats-officedocument.presentationml.template.main+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
          source: 'iana',
          compressible: !1,
          extensions: ['xlsx'],
        },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template':
          { source: 'iana', extensions: ['xltx'] },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.theme+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openxmlformats-officedocument.themeoverride+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openxmlformats-officedocument.vmldrawing': {
          source: 'iana',
        },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          { source: 'iana', compressible: !1, extensions: ['docx'] },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
          { source: 'iana', extensions: ['dotx'] },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-package.core-properties+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml':
          { source: 'iana', compressible: !0 },
        'application/vnd.openxmlformats-package.relationships+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.oracle.resource+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.orange.indata': { source: 'iana' },
        'application/vnd.osa.netdeploy': { source: 'iana' },
        'application/vnd.osgeo.mapguide.package': {
          source: 'iana',
          extensions: ['mgp'],
        },
        'application/vnd.osgi.bundle': { source: 'iana' },
        'application/vnd.osgi.dp': { source: 'iana', extensions: ['dp'] },
        'application/vnd.osgi.subsystem': {
          source: 'iana',
          extensions: ['esa'],
        },
        'application/vnd.otps.ct-kip+xml': { source: 'iana', compressible: !0 },
        'application/vnd.oxli.countgraph': { source: 'iana' },
        'application/vnd.pagerduty+json': { source: 'iana', compressible: !0 },
        'application/vnd.palm': {
          source: 'iana',
          extensions: ['pdb', 'pqa', 'oprc'],
        },
        'application/vnd.panoply': { source: 'iana' },
        'application/vnd.paos.xml': { source: 'iana' },
        'application/vnd.patentdive': { source: 'iana' },
        'application/vnd.pawaafile': { source: 'iana', extensions: ['paw'] },
        'application/vnd.pcos': { source: 'iana' },
        'application/vnd.pg.format': { source: 'iana', extensions: ['str'] },
        'application/vnd.pg.osasli': { source: 'iana', extensions: ['ei6'] },
        'application/vnd.piaccess.application-licence': { source: 'iana' },
        'application/vnd.picsel': { source: 'iana', extensions: ['efif'] },
        'application/vnd.pmi.widget': { source: 'iana', extensions: ['wg'] },
        'application/vnd.poc.group-advertisement+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.pocketlearn': { source: 'iana', extensions: ['plf'] },
        'application/vnd.powerbuilder6': {
          source: 'iana',
          extensions: ['pbd'],
        },
        'application/vnd.powerbuilder6-s': { source: 'iana' },
        'application/vnd.powerbuilder7': { source: 'iana' },
        'application/vnd.powerbuilder7-s': { source: 'iana' },
        'application/vnd.powerbuilder75': { source: 'iana' },
        'application/vnd.powerbuilder75-s': { source: 'iana' },
        'application/vnd.preminet': { source: 'iana' },
        'application/vnd.previewsystems.box': {
          source: 'iana',
          extensions: ['box'],
        },
        'application/vnd.proteus.magazine': {
          source: 'iana',
          extensions: ['mgz'],
        },
        'application/vnd.psfs': { source: 'iana' },
        'application/vnd.publishare-delta-tree': {
          source: 'iana',
          extensions: ['qps'],
        },
        'application/vnd.pvi.ptid1': { source: 'iana', extensions: ['ptid'] },
        'application/vnd.pwg-multiplexed': { source: 'iana' },
        'application/vnd.pwg-xhtml-print+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.qualcomm.brew-app-res': { source: 'iana' },
        'application/vnd.quarantainenet': { source: 'iana' },
        'application/vnd.quark.quarkxpress': {
          source: 'iana',
          extensions: ['qxd', 'qxt', 'qwd', 'qwt', 'qxl', 'qxb'],
        },
        'application/vnd.quobject-quoxdocument': { source: 'iana' },
        'application/vnd.radisys.moml+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-audit+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-audit-conf+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-audit-conn+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-audit-dialog+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-audit-stream+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-conf+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-dialog+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-dialog-base+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-dialog-fax-detect+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-dialog-fax-sendrecv+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-dialog-group+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-dialog-speech+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.radisys.msml-dialog-transform+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.rainstor.data': { source: 'iana' },
        'application/vnd.rapid': { source: 'iana' },
        'application/vnd.rar': { source: 'iana' },
        'application/vnd.realvnc.bed': { source: 'iana', extensions: ['bed'] },
        'application/vnd.recordare.musicxml': {
          source: 'iana',
          extensions: ['mxl'],
        },
        'application/vnd.recordare.musicxml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['musicxml'],
        },
        'application/vnd.renlearn.rlprint': { source: 'iana' },
        'application/vnd.restful+json': { source: 'iana', compressible: !0 },
        'application/vnd.rig.cryptonote': {
          source: 'iana',
          extensions: ['cryptonote'],
        },
        'application/vnd.rim.cod': { source: 'apache', extensions: ['cod'] },
        'application/vnd.rn-realmedia': {
          source: 'apache',
          extensions: ['rm'],
        },
        'application/vnd.rn-realmedia-vbr': {
          source: 'apache',
          extensions: ['rmvb'],
        },
        'application/vnd.route66.link66+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['link66'],
        },
        'application/vnd.rs-274x': { source: 'iana' },
        'application/vnd.ruckus.download': { source: 'iana' },
        'application/vnd.s3sms': { source: 'iana' },
        'application/vnd.sailingtracker.track': {
          source: 'iana',
          extensions: ['st'],
        },
        'application/vnd.sbm.cid': { source: 'iana' },
        'application/vnd.sbm.mid2': { source: 'iana' },
        'application/vnd.scribus': { source: 'iana' },
        'application/vnd.sealed.3df': { source: 'iana' },
        'application/vnd.sealed.csf': { source: 'iana' },
        'application/vnd.sealed.doc': { source: 'iana' },
        'application/vnd.sealed.eml': { source: 'iana' },
        'application/vnd.sealed.mht': { source: 'iana' },
        'application/vnd.sealed.net': { source: 'iana' },
        'application/vnd.sealed.ppt': { source: 'iana' },
        'application/vnd.sealed.tiff': { source: 'iana' },
        'application/vnd.sealed.xls': { source: 'iana' },
        'application/vnd.sealedmedia.softseal.html': { source: 'iana' },
        'application/vnd.sealedmedia.softseal.pdf': { source: 'iana' },
        'application/vnd.seemail': { source: 'iana', extensions: ['see'] },
        'application/vnd.sema': { source: 'iana', extensions: ['sema'] },
        'application/vnd.semd': { source: 'iana', extensions: ['semd'] },
        'application/vnd.semf': { source: 'iana', extensions: ['semf'] },
        'application/vnd.shana.informed.formdata': {
          source: 'iana',
          extensions: ['ifm'],
        },
        'application/vnd.shana.informed.formtemplate': {
          source: 'iana',
          extensions: ['itp'],
        },
        'application/vnd.shana.informed.interchange': {
          source: 'iana',
          extensions: ['iif'],
        },
        'application/vnd.shana.informed.package': {
          source: 'iana',
          extensions: ['ipk'],
        },
        'application/vnd.shootproof+json': { source: 'iana', compressible: !0 },
        'application/vnd.sigrok.session': { source: 'iana' },
        'application/vnd.simtech-mindmapper': {
          source: 'iana',
          extensions: ['twd', 'twds'],
        },
        'application/vnd.siren+json': { source: 'iana', compressible: !0 },
        'application/vnd.smaf': { source: 'iana', extensions: ['mmf'] },
        'application/vnd.smart.notebook': { source: 'iana' },
        'application/vnd.smart.teacher': {
          source: 'iana',
          extensions: ['teacher'],
        },
        'application/vnd.software602.filler.form+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.software602.filler.form-xml-zip': { source: 'iana' },
        'application/vnd.solent.sdkm+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['sdkm', 'sdkd'],
        },
        'application/vnd.spotfire.dxp': { source: 'iana', extensions: ['dxp'] },
        'application/vnd.spotfire.sfs': { source: 'iana', extensions: ['sfs'] },
        'application/vnd.sqlite3': { source: 'iana' },
        'application/vnd.sss-cod': { source: 'iana' },
        'application/vnd.sss-dtf': { source: 'iana' },
        'application/vnd.sss-ntf': { source: 'iana' },
        'application/vnd.stardivision.calc': {
          source: 'apache',
          extensions: ['sdc'],
        },
        'application/vnd.stardivision.draw': {
          source: 'apache',
          extensions: ['sda'],
        },
        'application/vnd.stardivision.impress': {
          source: 'apache',
          extensions: ['sdd'],
        },
        'application/vnd.stardivision.math': {
          source: 'apache',
          extensions: ['smf'],
        },
        'application/vnd.stardivision.writer': {
          source: 'apache',
          extensions: ['sdw', 'vor'],
        },
        'application/vnd.stardivision.writer-global': {
          source: 'apache',
          extensions: ['sgl'],
        },
        'application/vnd.stepmania.package': {
          source: 'iana',
          extensions: ['smzip'],
        },
        'application/vnd.stepmania.stepchart': {
          source: 'iana',
          extensions: ['sm'],
        },
        'application/vnd.street-stream': { source: 'iana' },
        'application/vnd.sun.wadl+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['wadl'],
        },
        'application/vnd.sun.xml.calc': {
          source: 'apache',
          extensions: ['sxc'],
        },
        'application/vnd.sun.xml.calc.template': {
          source: 'apache',
          extensions: ['stc'],
        },
        'application/vnd.sun.xml.draw': {
          source: 'apache',
          extensions: ['sxd'],
        },
        'application/vnd.sun.xml.draw.template': {
          source: 'apache',
          extensions: ['std'],
        },
        'application/vnd.sun.xml.impress': {
          source: 'apache',
          extensions: ['sxi'],
        },
        'application/vnd.sun.xml.impress.template': {
          source: 'apache',
          extensions: ['sti'],
        },
        'application/vnd.sun.xml.math': {
          source: 'apache',
          extensions: ['sxm'],
        },
        'application/vnd.sun.xml.writer': {
          source: 'apache',
          extensions: ['sxw'],
        },
        'application/vnd.sun.xml.writer.global': {
          source: 'apache',
          extensions: ['sxg'],
        },
        'application/vnd.sun.xml.writer.template': {
          source: 'apache',
          extensions: ['stw'],
        },
        'application/vnd.sus-calendar': {
          source: 'iana',
          extensions: ['sus', 'susp'],
        },
        'application/vnd.svd': { source: 'iana', extensions: ['svd'] },
        'application/vnd.swiftview-ics': { source: 'iana' },
        'application/vnd.symbian.install': {
          source: 'apache',
          extensions: ['sis', 'sisx'],
        },
        'application/vnd.syncml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xsm'],
        },
        'application/vnd.syncml.dm+wbxml': {
          source: 'iana',
          extensions: ['bdm'],
        },
        'application/vnd.syncml.dm+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xdm'],
        },
        'application/vnd.syncml.dm.notification': { source: 'iana' },
        'application/vnd.syncml.dmddf+wbxml': { source: 'iana' },
        'application/vnd.syncml.dmddf+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.syncml.dmtnds+wbxml': { source: 'iana' },
        'application/vnd.syncml.dmtnds+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.syncml.ds.notification': { source: 'iana' },
        'application/vnd.tableschema+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.tao.intent-module-archive': {
          source: 'iana',
          extensions: ['tao'],
        },
        'application/vnd.tcpdump.pcap': {
          source: 'iana',
          extensions: ['pcap', 'cap', 'dmp'],
        },
        'application/vnd.think-cell.ppttc+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.tmd.mediaflex.api+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/vnd.tml': { source: 'iana' },
        'application/vnd.tmobile-livetv': {
          source: 'iana',
          extensions: ['tmo'],
        },
        'application/vnd.tri.onesource': { source: 'iana' },
        'application/vnd.trid.tpt': { source: 'iana', extensions: ['tpt'] },
        'application/vnd.triscape.mxs': { source: 'iana', extensions: ['mxs'] },
        'application/vnd.trueapp': { source: 'iana', extensions: ['tra'] },
        'application/vnd.truedoc': { source: 'iana' },
        'application/vnd.ubisoft.webplayer': { source: 'iana' },
        'application/vnd.ufdl': { source: 'iana', extensions: ['ufd', 'ufdl'] },
        'application/vnd.uiq.theme': { source: 'iana', extensions: ['utz'] },
        'application/vnd.umajin': { source: 'iana', extensions: ['umj'] },
        'application/vnd.unity': { source: 'iana', extensions: ['unityweb'] },
        'application/vnd.uoml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['uoml'],
        },
        'application/vnd.uplanet.alert': { source: 'iana' },
        'application/vnd.uplanet.alert-wbxml': { source: 'iana' },
        'application/vnd.uplanet.bearer-choice': { source: 'iana' },
        'application/vnd.uplanet.bearer-choice-wbxml': { source: 'iana' },
        'application/vnd.uplanet.cacheop': { source: 'iana' },
        'application/vnd.uplanet.cacheop-wbxml': { source: 'iana' },
        'application/vnd.uplanet.channel': { source: 'iana' },
        'application/vnd.uplanet.channel-wbxml': { source: 'iana' },
        'application/vnd.uplanet.list': { source: 'iana' },
        'application/vnd.uplanet.list-wbxml': { source: 'iana' },
        'application/vnd.uplanet.listcmd': { source: 'iana' },
        'application/vnd.uplanet.listcmd-wbxml': { source: 'iana' },
        'application/vnd.uplanet.signal': { source: 'iana' },
        'application/vnd.uri-map': { source: 'iana' },
        'application/vnd.valve.source.material': { source: 'iana' },
        'application/vnd.vcx': { source: 'iana', extensions: ['vcx'] },
        'application/vnd.vd-study': { source: 'iana' },
        'application/vnd.vectorworks': { source: 'iana' },
        'application/vnd.vel+json': { source: 'iana', compressible: !0 },
        'application/vnd.verimatrix.vcas': { source: 'iana' },
        'application/vnd.vidsoft.vidconference': { source: 'iana' },
        'application/vnd.visio': {
          source: 'iana',
          extensions: ['vsd', 'vst', 'vss', 'vsw'],
        },
        'application/vnd.visionary': { source: 'iana', extensions: ['vis'] },
        'application/vnd.vividence.scriptfile': { source: 'iana' },
        'application/vnd.vsf': { source: 'iana', extensions: ['vsf'] },
        'application/vnd.wap.sic': { source: 'iana' },
        'application/vnd.wap.slc': { source: 'iana' },
        'application/vnd.wap.wbxml': { source: 'iana', extensions: ['wbxml'] },
        'application/vnd.wap.wmlc': { source: 'iana', extensions: ['wmlc'] },
        'application/vnd.wap.wmlscriptc': {
          source: 'iana',
          extensions: ['wmlsc'],
        },
        'application/vnd.webturbo': { source: 'iana', extensions: ['wtb'] },
        'application/vnd.wfa.p2p': { source: 'iana' },
        'application/vnd.wfa.wsc': { source: 'iana' },
        'application/vnd.windows.devicepairing': { source: 'iana' },
        'application/vnd.wmc': { source: 'iana' },
        'application/vnd.wmf.bootstrap': { source: 'iana' },
        'application/vnd.wolfram.mathematica': { source: 'iana' },
        'application/vnd.wolfram.mathematica.package': { source: 'iana' },
        'application/vnd.wolfram.player': {
          source: 'iana',
          extensions: ['nbp'],
        },
        'application/vnd.wordperfect': { source: 'iana', extensions: ['wpd'] },
        'application/vnd.wqd': { source: 'iana', extensions: ['wqd'] },
        'application/vnd.wrq-hp3000-labelled': { source: 'iana' },
        'application/vnd.wt.stf': { source: 'iana', extensions: ['stf'] },
        'application/vnd.wv.csp+wbxml': { source: 'iana' },
        'application/vnd.wv.csp+xml': { source: 'iana', compressible: !0 },
        'application/vnd.wv.ssp+xml': { source: 'iana', compressible: !0 },
        'application/vnd.xacml+json': { source: 'iana', compressible: !0 },
        'application/vnd.xara': { source: 'iana', extensions: ['xar'] },
        'application/vnd.xfdl': { source: 'iana', extensions: ['xfdl'] },
        'application/vnd.xfdl.webform': { source: 'iana' },
        'application/vnd.xmi+xml': { source: 'iana', compressible: !0 },
        'application/vnd.xmpie.cpkg': { source: 'iana' },
        'application/vnd.xmpie.dpkg': { source: 'iana' },
        'application/vnd.xmpie.plan': { source: 'iana' },
        'application/vnd.xmpie.ppkg': { source: 'iana' },
        'application/vnd.xmpie.xlim': { source: 'iana' },
        'application/vnd.yamaha.hv-dic': {
          source: 'iana',
          extensions: ['hvd'],
        },
        'application/vnd.yamaha.hv-script': {
          source: 'iana',
          extensions: ['hvs'],
        },
        'application/vnd.yamaha.hv-voice': {
          source: 'iana',
          extensions: ['hvp'],
        },
        'application/vnd.yamaha.openscoreformat': {
          source: 'iana',
          extensions: ['osf'],
        },
        'application/vnd.yamaha.openscoreformat.osfpvg+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['osfpvg'],
        },
        'application/vnd.yamaha.remote-setup': { source: 'iana' },
        'application/vnd.yamaha.smaf-audio': {
          source: 'iana',
          extensions: ['saf'],
        },
        'application/vnd.yamaha.smaf-phrase': {
          source: 'iana',
          extensions: ['spf'],
        },
        'application/vnd.yamaha.through-ngn': { source: 'iana' },
        'application/vnd.yamaha.tunnel-udpencap': { source: 'iana' },
        'application/vnd.yaoweme': { source: 'iana' },
        'application/vnd.yellowriver-custom-menu': {
          source: 'iana',
          extensions: ['cmp'],
        },
        'application/vnd.youtube.yt': { source: 'iana' },
        'application/vnd.zul': { source: 'iana', extensions: ['zir', 'zirz'] },
        'application/vnd.zzazz.deck+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['zaz'],
        },
        'application/voicexml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['vxml'],
        },
        'application/voucher-cms+json': { source: 'iana', compressible: !0 },
        'application/vq-rtcpxr': { source: 'iana' },
        'application/wasm': { compressible: !0, extensions: ['wasm'] },
        'application/watcherinfo+xml': { source: 'iana', compressible: !0 },
        'application/webpush-options+json': {
          source: 'iana',
          compressible: !0,
        },
        'application/whoispp-query': { source: 'iana' },
        'application/whoispp-response': { source: 'iana' },
        'application/widget': { source: 'iana', extensions: ['wgt'] },
        'application/winhlp': { source: 'apache', extensions: ['hlp'] },
        'application/wita': { source: 'iana' },
        'application/wordperfect5.1': { source: 'iana' },
        'application/wsdl+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['wsdl'],
        },
        'application/wspolicy+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['wspolicy'],
        },
        'application/x-7z-compressed': {
          source: 'apache',
          compressible: !1,
          extensions: ['7z'],
        },
        'application/x-abiword': { source: 'apache', extensions: ['abw'] },
        'application/x-ace-compressed': {
          source: 'apache',
          extensions: ['ace'],
        },
        'application/x-amf': { source: 'apache' },
        'application/x-apple-diskimage': {
          source: 'apache',
          extensions: ['dmg'],
        },
        'application/x-arj': { compressible: !1, extensions: ['arj'] },
        'application/x-authorware-bin': {
          source: 'apache',
          extensions: ['aab', 'x32', 'u32', 'vox'],
        },
        'application/x-authorware-map': {
          source: 'apache',
          extensions: ['aam'],
        },
        'application/x-authorware-seg': {
          source: 'apache',
          extensions: ['aas'],
        },
        'application/x-bcpio': { source: 'apache', extensions: ['bcpio'] },
        'application/x-bdoc': { compressible: !1, extensions: ['bdoc'] },
        'application/x-bittorrent': {
          source: 'apache',
          extensions: ['torrent'],
        },
        'application/x-blorb': {
          source: 'apache',
          extensions: ['blb', 'blorb'],
        },
        'application/x-bzip': {
          source: 'apache',
          compressible: !1,
          extensions: ['bz'],
        },
        'application/x-bzip2': {
          source: 'apache',
          compressible: !1,
          extensions: ['bz2', 'boz'],
        },
        'application/x-cbr': {
          source: 'apache',
          extensions: ['cbr', 'cba', 'cbt', 'cbz', 'cb7'],
        },
        'application/x-cdlink': { source: 'apache', extensions: ['vcd'] },
        'application/x-cfs-compressed': {
          source: 'apache',
          extensions: ['cfs'],
        },
        'application/x-chat': { source: 'apache', extensions: ['chat'] },
        'application/x-chess-pgn': { source: 'apache', extensions: ['pgn'] },
        'application/x-chrome-extension': { extensions: ['crx'] },
        'application/x-cocoa': { source: 'nginx', extensions: ['cco'] },
        'application/x-compress': { source: 'apache' },
        'application/x-conference': { source: 'apache', extensions: ['nsc'] },
        'application/x-cpio': { source: 'apache', extensions: ['cpio'] },
        'application/x-csh': { source: 'apache', extensions: ['csh'] },
        'application/x-deb': { compressible: !1 },
        'application/x-debian-package': {
          source: 'apache',
          extensions: ['deb', 'udeb'],
        },
        'application/x-dgc-compressed': {
          source: 'apache',
          extensions: ['dgc'],
        },
        'application/x-director': {
          source: 'apache',
          extensions: [
            'dir',
            'dcr',
            'dxr',
            'cst',
            'cct',
            'cxt',
            'w3d',
            'fgd',
            'swa',
          ],
        },
        'application/x-doom': { source: 'apache', extensions: ['wad'] },
        'application/x-dtbncx+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['ncx'],
        },
        'application/x-dtbook+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['dtb'],
        },
        'application/x-dtbresource+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['res'],
        },
        'application/x-dvi': {
          source: 'apache',
          compressible: !1,
          extensions: ['dvi'],
        },
        'application/x-envoy': { source: 'apache', extensions: ['evy'] },
        'application/x-eva': { source: 'apache', extensions: ['eva'] },
        'application/x-font-bdf': { source: 'apache', extensions: ['bdf'] },
        'application/x-font-dos': { source: 'apache' },
        'application/x-font-framemaker': { source: 'apache' },
        'application/x-font-ghostscript': {
          source: 'apache',
          extensions: ['gsf'],
        },
        'application/x-font-libgrx': { source: 'apache' },
        'application/x-font-linux-psf': {
          source: 'apache',
          extensions: ['psf'],
        },
        'application/x-font-pcf': { source: 'apache', extensions: ['pcf'] },
        'application/x-font-snf': { source: 'apache', extensions: ['snf'] },
        'application/x-font-speedo': { source: 'apache' },
        'application/x-font-sunos-news': { source: 'apache' },
        'application/x-font-type1': {
          source: 'apache',
          extensions: ['pfa', 'pfb', 'pfm', 'afm'],
        },
        'application/x-font-vfont': { source: 'apache' },
        'application/x-freearc': { source: 'apache', extensions: ['arc'] },
        'application/x-futuresplash': { source: 'apache', extensions: ['spl'] },
        'application/x-gca-compressed': {
          source: 'apache',
          extensions: ['gca'],
        },
        'application/x-glulx': { source: 'apache', extensions: ['ulx'] },
        'application/x-gnumeric': {
          source: 'apache',
          extensions: ['gnumeric'],
        },
        'application/x-gramps-xml': {
          source: 'apache',
          extensions: ['gramps'],
        },
        'application/x-gtar': { source: 'apache', extensions: ['gtar'] },
        'application/x-gzip': { source: 'apache' },
        'application/x-hdf': { source: 'apache', extensions: ['hdf'] },
        'application/x-httpd-php': { compressible: !0, extensions: ['php'] },
        'application/x-install-instructions': {
          source: 'apache',
          extensions: ['install'],
        },
        'application/x-iso9660-image': {
          source: 'apache',
          extensions: ['iso'],
        },
        'application/x-java-archive-diff': {
          source: 'nginx',
          extensions: ['jardiff'],
        },
        'application/x-java-jnlp-file': {
          source: 'apache',
          compressible: !1,
          extensions: ['jnlp'],
        },
        'application/x-javascript': { compressible: !0 },
        'application/x-latex': {
          source: 'apache',
          compressible: !1,
          extensions: ['latex'],
        },
        'application/x-lua-bytecode': { extensions: ['luac'] },
        'application/x-lzh-compressed': {
          source: 'apache',
          extensions: ['lzh', 'lha'],
        },
        'application/x-makeself': { source: 'nginx', extensions: ['run'] },
        'application/x-mie': { source: 'apache', extensions: ['mie'] },
        'application/x-mobipocket-ebook': {
          source: 'apache',
          extensions: ['prc', 'mobi'],
        },
        'application/x-mpegurl': { compressible: !1 },
        'application/x-ms-application': {
          source: 'apache',
          extensions: ['application'],
        },
        'application/x-ms-shortcut': { source: 'apache', extensions: ['lnk'] },
        'application/x-ms-wmd': { source: 'apache', extensions: ['wmd'] },
        'application/x-ms-wmz': { source: 'apache', extensions: ['wmz'] },
        'application/x-ms-xbap': { source: 'apache', extensions: ['xbap'] },
        'application/x-msaccess': { source: 'apache', extensions: ['mdb'] },
        'application/x-msbinder': { source: 'apache', extensions: ['obd'] },
        'application/x-mscardfile': { source: 'apache', extensions: ['crd'] },
        'application/x-msclip': { source: 'apache', extensions: ['clp'] },
        'application/x-msdos-program': { extensions: ['exe'] },
        'application/x-msdownload': {
          source: 'apache',
          extensions: ['exe', 'dll', 'com', 'bat', 'msi'],
        },
        'application/x-msmediaview': {
          source: 'apache',
          extensions: ['mvb', 'm13', 'm14'],
        },
        'application/x-msmetafile': {
          source: 'apache',
          extensions: ['wmf', 'wmz', 'emf', 'emz'],
        },
        'application/x-msmoney': { source: 'apache', extensions: ['mny'] },
        'application/x-mspublisher': { source: 'apache', extensions: ['pub'] },
        'application/x-msschedule': { source: 'apache', extensions: ['scd'] },
        'application/x-msterminal': { source: 'apache', extensions: ['trm'] },
        'application/x-mswrite': { source: 'apache', extensions: ['wri'] },
        'application/x-netcdf': { source: 'apache', extensions: ['nc', 'cdf'] },
        'application/x-ns-proxy-autoconfig': {
          compressible: !0,
          extensions: ['pac'],
        },
        'application/x-nzb': { source: 'apache', extensions: ['nzb'] },
        'application/x-perl': { source: 'nginx', extensions: ['pl', 'pm'] },
        'application/x-pilot': { source: 'nginx', extensions: ['prc', 'pdb'] },
        'application/x-pkcs12': {
          source: 'apache',
          compressible: !1,
          extensions: ['p12', 'pfx'],
        },
        'application/x-pkcs7-certificates': {
          source: 'apache',
          extensions: ['p7b', 'spc'],
        },
        'application/x-pkcs7-certreqresp': {
          source: 'apache',
          extensions: ['p7r'],
        },
        'application/x-rar-compressed': {
          source: 'apache',
          compressible: !1,
          extensions: ['rar'],
        },
        'application/x-redhat-package-manager': {
          source: 'nginx',
          extensions: ['rpm'],
        },
        'application/x-research-info-systems': {
          source: 'apache',
          extensions: ['ris'],
        },
        'application/x-sea': { source: 'nginx', extensions: ['sea'] },
        'application/x-sh': {
          source: 'apache',
          compressible: !0,
          extensions: ['sh'],
        },
        'application/x-shar': { source: 'apache', extensions: ['shar'] },
        'application/x-shockwave-flash': {
          source: 'apache',
          compressible: !1,
          extensions: ['swf'],
        },
        'application/x-silverlight-app': {
          source: 'apache',
          extensions: ['xap'],
        },
        'application/x-sql': { source: 'apache', extensions: ['sql'] },
        'application/x-stuffit': {
          source: 'apache',
          compressible: !1,
          extensions: ['sit'],
        },
        'application/x-stuffitx': { source: 'apache', extensions: ['sitx'] },
        'application/x-subrip': { source: 'apache', extensions: ['srt'] },
        'application/x-sv4cpio': { source: 'apache', extensions: ['sv4cpio'] },
        'application/x-sv4crc': { source: 'apache', extensions: ['sv4crc'] },
        'application/x-t3vm-image': { source: 'apache', extensions: ['t3'] },
        'application/x-tads': { source: 'apache', extensions: ['gam'] },
        'application/x-tar': {
          source: 'apache',
          compressible: !0,
          extensions: ['tar'],
        },
        'application/x-tcl': { source: 'apache', extensions: ['tcl', 'tk'] },
        'application/x-tex': { source: 'apache', extensions: ['tex'] },
        'application/x-tex-tfm': { source: 'apache', extensions: ['tfm'] },
        'application/x-texinfo': {
          source: 'apache',
          extensions: ['texinfo', 'texi'],
        },
        'application/x-tgif': { source: 'apache', extensions: ['obj'] },
        'application/x-ustar': { source: 'apache', extensions: ['ustar'] },
        'application/x-virtualbox-hdd': {
          compressible: !0,
          extensions: ['hdd'],
        },
        'application/x-virtualbox-ova': {
          compressible: !0,
          extensions: ['ova'],
        },
        'application/x-virtualbox-ovf': {
          compressible: !0,
          extensions: ['ovf'],
        },
        'application/x-virtualbox-vbox': {
          compressible: !0,
          extensions: ['vbox'],
        },
        'application/x-virtualbox-vbox-extpack': {
          compressible: !1,
          extensions: ['vbox-extpack'],
        },
        'application/x-virtualbox-vdi': {
          compressible: !0,
          extensions: ['vdi'],
        },
        'application/x-virtualbox-vhd': {
          compressible: !0,
          extensions: ['vhd'],
        },
        'application/x-virtualbox-vmdk': {
          compressible: !0,
          extensions: ['vmdk'],
        },
        'application/x-wais-source': { source: 'apache', extensions: ['src'] },
        'application/x-web-app-manifest+json': {
          compressible: !0,
          extensions: ['webapp'],
        },
        'application/x-www-form-urlencoded': {
          source: 'iana',
          compressible: !0,
        },
        'application/x-x509-ca-cert': {
          source: 'apache',
          extensions: ['der', 'crt', 'pem'],
        },
        'application/x-xfig': { source: 'apache', extensions: ['fig'] },
        'application/x-xliff+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['xlf'],
        },
        'application/x-xpinstall': {
          source: 'apache',
          compressible: !1,
          extensions: ['xpi'],
        },
        'application/x-xz': { source: 'apache', extensions: ['xz'] },
        'application/x-zmachine': {
          source: 'apache',
          extensions: ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7', 'z8'],
        },
        'application/x400-bp': { source: 'iana' },
        'application/xacml+xml': { source: 'iana', compressible: !0 },
        'application/xaml+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['xaml'],
        },
        'application/xcap-att+xml': { source: 'iana', compressible: !0 },
        'application/xcap-caps+xml': { source: 'iana', compressible: !0 },
        'application/xcap-diff+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xdf'],
        },
        'application/xcap-el+xml': { source: 'iana', compressible: !0 },
        'application/xcap-error+xml': { source: 'iana', compressible: !0 },
        'application/xcap-ns+xml': { source: 'iana', compressible: !0 },
        'application/xcon-conference-info+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/xcon-conference-info-diff+xml': {
          source: 'iana',
          compressible: !0,
        },
        'application/xenc+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xenc'],
        },
        'application/xhtml+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xhtml', 'xht'],
        },
        'application/xhtml-voice+xml': { source: 'apache', compressible: !0 },
        'application/xliff+xml': { source: 'iana', compressible: !0 },
        'application/xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xml', 'xsl', 'xsd', 'rng'],
        },
        'application/xml-dtd': {
          source: 'iana',
          compressible: !0,
          extensions: ['dtd'],
        },
        'application/xml-external-parsed-entity': { source: 'iana' },
        'application/xml-patch+xml': { source: 'iana', compressible: !0 },
        'application/xmpp+xml': { source: 'iana', compressible: !0 },
        'application/xop+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xop'],
        },
        'application/xproc+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['xpl'],
        },
        'application/xslt+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['xslt'],
        },
        'application/xspf+xml': {
          source: 'apache',
          compressible: !0,
          extensions: ['xspf'],
        },
        'application/xv+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['mxml', 'xhvml', 'xvml', 'xvm'],
        },
        'application/yang': { source: 'iana', extensions: ['yang'] },
        'application/yang-data+json': { source: 'iana', compressible: !0 },
        'application/yang-data+xml': { source: 'iana', compressible: !0 },
        'application/yang-patch+json': { source: 'iana', compressible: !0 },
        'application/yang-patch+xml': { source: 'iana', compressible: !0 },
        'application/yin+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['yin'],
        },
        'application/zip': {
          source: 'iana',
          compressible: !1,
          extensions: ['zip'],
        },
        'application/zlib': { source: 'iana' },
        'application/zstd': { source: 'iana' },
        'audio/1d-interleaved-parityfec': { source: 'iana' },
        'audio/32kadpcm': { source: 'iana' },
        'audio/3gpp': {
          source: 'iana',
          compressible: !1,
          extensions: ['3gpp'],
        },
        'audio/3gpp2': { source: 'iana' },
        'audio/aac': { source: 'iana' },
        'audio/ac3': { source: 'iana' },
        'audio/adpcm': { source: 'apache', extensions: ['adp'] },
        'audio/amr': { source: 'iana' },
        'audio/amr-wb': { source: 'iana' },
        'audio/amr-wb+': { source: 'iana' },
        'audio/aptx': { source: 'iana' },
        'audio/asc': { source: 'iana' },
        'audio/atrac-advanced-lossless': { source: 'iana' },
        'audio/atrac-x': { source: 'iana' },
        'audio/atrac3': { source: 'iana' },
        'audio/basic': {
          source: 'iana',
          compressible: !1,
          extensions: ['au', 'snd'],
        },
        'audio/bv16': { source: 'iana' },
        'audio/bv32': { source: 'iana' },
        'audio/clearmode': { source: 'iana' },
        'audio/cn': { source: 'iana' },
        'audio/dat12': { source: 'iana' },
        'audio/dls': { source: 'iana' },
        'audio/dsr-es201108': { source: 'iana' },
        'audio/dsr-es202050': { source: 'iana' },
        'audio/dsr-es202211': { source: 'iana' },
        'audio/dsr-es202212': { source: 'iana' },
        'audio/dv': { source: 'iana' },
        'audio/dvi4': { source: 'iana' },
        'audio/eac3': { source: 'iana' },
        'audio/encaprtp': { source: 'iana' },
        'audio/evrc': { source: 'iana' },
        'audio/evrc-qcp': { source: 'iana' },
        'audio/evrc0': { source: 'iana' },
        'audio/evrc1': { source: 'iana' },
        'audio/evrcb': { source: 'iana' },
        'audio/evrcb0': { source: 'iana' },
        'audio/evrcb1': { source: 'iana' },
        'audio/evrcnw': { source: 'iana' },
        'audio/evrcnw0': { source: 'iana' },
        'audio/evrcnw1': { source: 'iana' },
        'audio/evrcwb': { source: 'iana' },
        'audio/evrcwb0': { source: 'iana' },
        'audio/evrcwb1': { source: 'iana' },
        'audio/evs': { source: 'iana' },
        'audio/fwdred': { source: 'iana' },
        'audio/g711-0': { source: 'iana' },
        'audio/g719': { source: 'iana' },
        'audio/g722': { source: 'iana' },
        'audio/g7221': { source: 'iana' },
        'audio/g723': { source: 'iana' },
        'audio/g726-16': { source: 'iana' },
        'audio/g726-24': { source: 'iana' },
        'audio/g726-32': { source: 'iana' },
        'audio/g726-40': { source: 'iana' },
        'audio/g728': { source: 'iana' },
        'audio/g729': { source: 'iana' },
        'audio/g7291': { source: 'iana' },
        'audio/g729d': { source: 'iana' },
        'audio/g729e': { source: 'iana' },
        'audio/gsm': { source: 'iana' },
        'audio/gsm-efr': { source: 'iana' },
        'audio/gsm-hr-08': { source: 'iana' },
        'audio/ilbc': { source: 'iana' },
        'audio/ip-mr_v2.5': { source: 'iana' },
        'audio/isac': { source: 'apache' },
        'audio/l16': { source: 'iana' },
        'audio/l20': { source: 'iana' },
        'audio/l24': { source: 'iana', compressible: !1 },
        'audio/l8': { source: 'iana' },
        'audio/lpc': { source: 'iana' },
        'audio/melp': { source: 'iana' },
        'audio/melp1200': { source: 'iana' },
        'audio/melp2400': { source: 'iana' },
        'audio/melp600': { source: 'iana' },
        'audio/midi': {
          source: 'apache',
          extensions: ['mid', 'midi', 'kar', 'rmi'],
        },
        'audio/mobile-xmf': { source: 'iana' },
        'audio/mp3': { compressible: !1, extensions: ['mp3'] },
        'audio/mp4': {
          source: 'iana',
          compressible: !1,
          extensions: ['m4a', 'mp4a'],
        },
        'audio/mp4a-latm': { source: 'iana' },
        'audio/mpa': { source: 'iana' },
        'audio/mpa-robust': { source: 'iana' },
        'audio/mpeg': {
          source: 'iana',
          compressible: !1,
          extensions: ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
        },
        'audio/mpeg4-generic': { source: 'iana' },
        'audio/musepack': { source: 'apache' },
        'audio/ogg': {
          source: 'iana',
          compressible: !1,
          extensions: ['oga', 'ogg', 'spx'],
        },
        'audio/opus': { source: 'iana' },
        'audio/parityfec': { source: 'iana' },
        'audio/pcma': { source: 'iana' },
        'audio/pcma-wb': { source: 'iana' },
        'audio/pcmu': { source: 'iana' },
        'audio/pcmu-wb': { source: 'iana' },
        'audio/prs.sid': { source: 'iana' },
        'audio/qcelp': { source: 'iana' },
        'audio/raptorfec': { source: 'iana' },
        'audio/red': { source: 'iana' },
        'audio/rtp-enc-aescm128': { source: 'iana' },
        'audio/rtp-midi': { source: 'iana' },
        'audio/rtploopback': { source: 'iana' },
        'audio/rtx': { source: 'iana' },
        'audio/s3m': { source: 'apache', extensions: ['s3m'] },
        'audio/silk': { source: 'apache', extensions: ['sil'] },
        'audio/smv': { source: 'iana' },
        'audio/smv-qcp': { source: 'iana' },
        'audio/smv0': { source: 'iana' },
        'audio/sp-midi': { source: 'iana' },
        'audio/speex': { source: 'iana' },
        'audio/t140c': { source: 'iana' },
        'audio/t38': { source: 'iana' },
        'audio/telephone-event': { source: 'iana' },
        'audio/tone': { source: 'iana' },
        'audio/uemclip': { source: 'iana' },
        'audio/ulpfec': { source: 'iana' },
        'audio/usac': { source: 'iana' },
        'audio/vdvi': { source: 'iana' },
        'audio/vmr-wb': { source: 'iana' },
        'audio/vnd.3gpp.iufp': { source: 'iana' },
        'audio/vnd.4sb': { source: 'iana' },
        'audio/vnd.audiokoz': { source: 'iana' },
        'audio/vnd.celp': { source: 'iana' },
        'audio/vnd.cisco.nse': { source: 'iana' },
        'audio/vnd.cmles.radio-events': { source: 'iana' },
        'audio/vnd.cns.anp1': { source: 'iana' },
        'audio/vnd.cns.inf1': { source: 'iana' },
        'audio/vnd.dece.audio': { source: 'iana', extensions: ['uva', 'uvva'] },
        'audio/vnd.digital-winds': { source: 'iana', extensions: ['eol'] },
        'audio/vnd.dlna.adts': { source: 'iana' },
        'audio/vnd.dolby.heaac.1': { source: 'iana' },
        'audio/vnd.dolby.heaac.2': { source: 'iana' },
        'audio/vnd.dolby.mlp': { source: 'iana' },
        'audio/vnd.dolby.mps': { source: 'iana' },
        'audio/vnd.dolby.pl2': { source: 'iana' },
        'audio/vnd.dolby.pl2x': { source: 'iana' },
        'audio/vnd.dolby.pl2z': { source: 'iana' },
        'audio/vnd.dolby.pulse.1': { source: 'iana' },
        'audio/vnd.dra': { source: 'iana', extensions: ['dra'] },
        'audio/vnd.dts': { source: 'iana', extensions: ['dts'] },
        'audio/vnd.dts.hd': { source: 'iana', extensions: ['dtshd'] },
        'audio/vnd.dvb.file': { source: 'iana' },
        'audio/vnd.everad.plj': { source: 'iana' },
        'audio/vnd.hns.audio': { source: 'iana' },
        'audio/vnd.lucent.voice': { source: 'iana', extensions: ['lvp'] },
        'audio/vnd.ms-playready.media.pya': {
          source: 'iana',
          extensions: ['pya'],
        },
        'audio/vnd.nokia.mobile-xmf': { source: 'iana' },
        'audio/vnd.nortel.vbk': { source: 'iana' },
        'audio/vnd.nuera.ecelp4800': {
          source: 'iana',
          extensions: ['ecelp4800'],
        },
        'audio/vnd.nuera.ecelp7470': {
          source: 'iana',
          extensions: ['ecelp7470'],
        },
        'audio/vnd.nuera.ecelp9600': {
          source: 'iana',
          extensions: ['ecelp9600'],
        },
        'audio/vnd.octel.sbc': { source: 'iana' },
        'audio/vnd.presonus.multitrack': { source: 'iana' },
        'audio/vnd.qcelp': { source: 'iana' },
        'audio/vnd.rhetorex.32kadpcm': { source: 'iana' },
        'audio/vnd.rip': { source: 'iana', extensions: ['rip'] },
        'audio/vnd.rn-realaudio': { compressible: !1 },
        'audio/vnd.sealedmedia.softseal.mpeg': { source: 'iana' },
        'audio/vnd.vmx.cvsd': { source: 'iana' },
        'audio/vnd.wave': { compressible: !1 },
        'audio/vorbis': { source: 'iana', compressible: !1 },
        'audio/vorbis-config': { source: 'iana' },
        'audio/wav': { compressible: !1, extensions: ['wav'] },
        'audio/wave': { compressible: !1, extensions: ['wav'] },
        'audio/webm': {
          source: 'apache',
          compressible: !1,
          extensions: ['weba'],
        },
        'audio/x-aac': {
          source: 'apache',
          compressible: !1,
          extensions: ['aac'],
        },
        'audio/x-aiff': {
          source: 'apache',
          extensions: ['aif', 'aiff', 'aifc'],
        },
        'audio/x-caf': {
          source: 'apache',
          compressible: !1,
          extensions: ['caf'],
        },
        'audio/x-flac': { source: 'apache', extensions: ['flac'] },
        'audio/x-m4a': { source: 'nginx', extensions: ['m4a'] },
        'audio/x-matroska': { source: 'apache', extensions: ['mka'] },
        'audio/x-mpegurl': { source: 'apache', extensions: ['m3u'] },
        'audio/x-ms-wax': { source: 'apache', extensions: ['wax'] },
        'audio/x-ms-wma': { source: 'apache', extensions: ['wma'] },
        'audio/x-pn-realaudio': { source: 'apache', extensions: ['ram', 'ra'] },
        'audio/x-pn-realaudio-plugin': {
          source: 'apache',
          extensions: ['rmp'],
        },
        'audio/x-realaudio': { source: 'nginx', extensions: ['ra'] },
        'audio/x-tta': { source: 'apache' },
        'audio/x-wav': { source: 'apache', extensions: ['wav'] },
        'audio/xm': { source: 'apache', extensions: ['xm'] },
        'chemical/x-cdx': { source: 'apache', extensions: ['cdx'] },
        'chemical/x-cif': { source: 'apache', extensions: ['cif'] },
        'chemical/x-cmdf': { source: 'apache', extensions: ['cmdf'] },
        'chemical/x-cml': { source: 'apache', extensions: ['cml'] },
        'chemical/x-csml': { source: 'apache', extensions: ['csml'] },
        'chemical/x-pdb': { source: 'apache' },
        'chemical/x-xyz': { source: 'apache', extensions: ['xyz'] },
        'font/collection': { source: 'iana', extensions: ['ttc'] },
        'font/otf': { source: 'iana', compressible: !0, extensions: ['otf'] },
        'font/sfnt': { source: 'iana' },
        'font/ttf': { source: 'iana', extensions: ['ttf'] },
        'font/woff': { source: 'iana', extensions: ['woff'] },
        'font/woff2': { source: 'iana', extensions: ['woff2'] },
        'image/aces': { source: 'iana', extensions: ['exr'] },
        'image/apng': { compressible: !1, extensions: ['apng'] },
        'image/avci': { source: 'iana' },
        'image/avcs': { source: 'iana' },
        'image/bmp': { source: 'iana', compressible: !0, extensions: ['bmp'] },
        'image/cgm': { source: 'iana', extensions: ['cgm'] },
        'image/dicom-rle': { source: 'iana', extensions: ['drle'] },
        'image/emf': { source: 'iana', extensions: ['emf'] },
        'image/fits': { source: 'iana', extensions: ['fits'] },
        'image/g3fax': { source: 'iana', extensions: ['g3'] },
        'image/gif': { source: 'iana', compressible: !1, extensions: ['gif'] },
        'image/heic': { source: 'iana' },
        'image/heic-sequence': { source: 'iana' },
        'image/heif': { source: 'iana' },
        'image/heif-sequence': { source: 'iana' },
        'image/ief': { source: 'iana', extensions: ['ief'] },
        'image/jls': { source: 'iana', extensions: ['jls'] },
        'image/jp2': {
          source: 'iana',
          compressible: !1,
          extensions: ['jp2', 'jpg2'],
        },
        'image/jpeg': {
          source: 'iana',
          compressible: !1,
          extensions: ['jpeg', 'jpg', 'jpe'],
        },
        'image/jpm': { source: 'iana', compressible: !1, extensions: ['jpm'] },
        'image/jpx': {
          source: 'iana',
          compressible: !1,
          extensions: ['jpx', 'jpf'],
        },
        'image/ktx': { source: 'iana', extensions: ['ktx'] },
        'image/naplps': { source: 'iana' },
        'image/pjpeg': { compressible: !1 },
        'image/png': { source: 'iana', compressible: !1, extensions: ['png'] },
        'image/prs.btif': { source: 'iana', extensions: ['btif'] },
        'image/prs.pti': { source: 'iana', extensions: ['pti'] },
        'image/pwg-raster': { source: 'iana' },
        'image/sgi': { source: 'apache', extensions: ['sgi'] },
        'image/svg+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['svg', 'svgz'],
        },
        'image/t38': { source: 'iana', extensions: ['t38'] },
        'image/tiff': {
          source: 'iana',
          compressible: !1,
          extensions: ['tif', 'tiff'],
        },
        'image/tiff-fx': { source: 'iana', extensions: ['tfx'] },
        'image/vnd.adobe.photoshop': {
          source: 'iana',
          compressible: !0,
          extensions: ['psd'],
        },
        'image/vnd.airzip.accelerator.azv': {
          source: 'iana',
          extensions: ['azv'],
        },
        'image/vnd.cns.inf2': { source: 'iana' },
        'image/vnd.dece.graphic': {
          source: 'iana',
          extensions: ['uvi', 'uvvi', 'uvg', 'uvvg'],
        },
        'image/vnd.djvu': { source: 'iana', extensions: ['djvu', 'djv'] },
        'image/vnd.dvb.subtitle': { source: 'iana', extensions: ['sub'] },
        'image/vnd.dwg': { source: 'iana', extensions: ['dwg'] },
        'image/vnd.dxf': { source: 'iana', extensions: ['dxf'] },
        'image/vnd.fastbidsheet': { source: 'iana', extensions: ['fbs'] },
        'image/vnd.fpx': { source: 'iana', extensions: ['fpx'] },
        'image/vnd.fst': { source: 'iana', extensions: ['fst'] },
        'image/vnd.fujixerox.edmics-mmr': {
          source: 'iana',
          extensions: ['mmr'],
        },
        'image/vnd.fujixerox.edmics-rlc': {
          source: 'iana',
          extensions: ['rlc'],
        },
        'image/vnd.globalgraphics.pgb': { source: 'iana' },
        'image/vnd.microsoft.icon': { source: 'iana', extensions: ['ico'] },
        'image/vnd.mix': { source: 'iana' },
        'image/vnd.mozilla.apng': { source: 'iana' },
        'image/vnd.ms-modi': { source: 'iana', extensions: ['mdi'] },
        'image/vnd.ms-photo': { source: 'apache', extensions: ['wdp'] },
        'image/vnd.net-fpx': { source: 'iana', extensions: ['npx'] },
        'image/vnd.radiance': { source: 'iana' },
        'image/vnd.sealed.png': { source: 'iana' },
        'image/vnd.sealedmedia.softseal.gif': { source: 'iana' },
        'image/vnd.sealedmedia.softseal.jpg': { source: 'iana' },
        'image/vnd.svf': { source: 'iana' },
        'image/vnd.tencent.tap': { source: 'iana', extensions: ['tap'] },
        'image/vnd.valve.source.texture': {
          source: 'iana',
          extensions: ['vtf'],
        },
        'image/vnd.wap.wbmp': { source: 'iana', extensions: ['wbmp'] },
        'image/vnd.xiff': { source: 'iana', extensions: ['xif'] },
        'image/vnd.zbrush.pcx': { source: 'iana', extensions: ['pcx'] },
        'image/webp': { source: 'apache', extensions: ['webp'] },
        'image/wmf': { source: 'iana', extensions: ['wmf'] },
        'image/x-3ds': { source: 'apache', extensions: ['3ds'] },
        'image/x-cmu-raster': { source: 'apache', extensions: ['ras'] },
        'image/x-cmx': { source: 'apache', extensions: ['cmx'] },
        'image/x-freehand': {
          source: 'apache',
          extensions: ['fh', 'fhc', 'fh4', 'fh5', 'fh7'],
        },
        'image/x-icon': {
          source: 'apache',
          compressible: !0,
          extensions: ['ico'],
        },
        'image/x-jng': { source: 'nginx', extensions: ['jng'] },
        'image/x-mrsid-image': { source: 'apache', extensions: ['sid'] },
        'image/x-ms-bmp': {
          source: 'nginx',
          compressible: !0,
          extensions: ['bmp'],
        },
        'image/x-pcx': { source: 'apache', extensions: ['pcx'] },
        'image/x-pict': { source: 'apache', extensions: ['pic', 'pct'] },
        'image/x-portable-anymap': { source: 'apache', extensions: ['pnm'] },
        'image/x-portable-bitmap': { source: 'apache', extensions: ['pbm'] },
        'image/x-portable-graymap': { source: 'apache', extensions: ['pgm'] },
        'image/x-portable-pixmap': { source: 'apache', extensions: ['ppm'] },
        'image/x-rgb': { source: 'apache', extensions: ['rgb'] },
        'image/x-tga': { source: 'apache', extensions: ['tga'] },
        'image/x-xbitmap': { source: 'apache', extensions: ['xbm'] },
        'image/x-xcf': { compressible: !1 },
        'image/x-xpixmap': { source: 'apache', extensions: ['xpm'] },
        'image/x-xwindowdump': { source: 'apache', extensions: ['xwd'] },
        'message/cpim': { source: 'iana' },
        'message/delivery-status': { source: 'iana' },
        'message/disposition-notification': {
          source: 'iana',
          extensions: ['disposition-notification'],
        },
        'message/external-body': { source: 'iana' },
        'message/feedback-report': { source: 'iana' },
        'message/global': { source: 'iana', extensions: ['u8msg'] },
        'message/global-delivery-status': {
          source: 'iana',
          extensions: ['u8dsn'],
        },
        'message/global-disposition-notification': {
          source: 'iana',
          extensions: ['u8mdn'],
        },
        'message/global-headers': { source: 'iana', extensions: ['u8hdr'] },
        'message/http': { source: 'iana', compressible: !1 },
        'message/imdn+xml': { source: 'iana', compressible: !0 },
        'message/news': { source: 'iana' },
        'message/partial': { source: 'iana', compressible: !1 },
        'message/rfc822': {
          source: 'iana',
          compressible: !0,
          extensions: ['eml', 'mime'],
        },
        'message/s-http': { source: 'iana' },
        'message/sip': { source: 'iana' },
        'message/sipfrag': { source: 'iana' },
        'message/tracking-status': { source: 'iana' },
        'message/vnd.si.simp': { source: 'iana' },
        'message/vnd.wfa.wsc': { source: 'iana', extensions: ['wsc'] },
        'model/3mf': { source: 'iana' },
        'model/gltf+json': {
          source: 'iana',
          compressible: !0,
          extensions: ['gltf'],
        },
        'model/gltf-binary': {
          source: 'iana',
          compressible: !0,
          extensions: ['glb'],
        },
        'model/iges': {
          source: 'iana',
          compressible: !1,
          extensions: ['igs', 'iges'],
        },
        'model/mesh': {
          source: 'iana',
          compressible: !1,
          extensions: ['msh', 'mesh', 'silo'],
        },
        'model/stl': { source: 'iana' },
        'model/vnd.collada+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['dae'],
        },
        'model/vnd.dwf': { source: 'iana', extensions: ['dwf'] },
        'model/vnd.flatland.3dml': { source: 'iana' },
        'model/vnd.gdl': { source: 'iana', extensions: ['gdl'] },
        'model/vnd.gs-gdl': { source: 'apache' },
        'model/vnd.gs.gdl': { source: 'iana' },
        'model/vnd.gtw': { source: 'iana', extensions: ['gtw'] },
        'model/vnd.moml+xml': { source: 'iana', compressible: !0 },
        'model/vnd.mts': { source: 'iana', extensions: ['mts'] },
        'model/vnd.opengex': { source: 'iana' },
        'model/vnd.parasolid.transmit.binary': { source: 'iana' },
        'model/vnd.parasolid.transmit.text': { source: 'iana' },
        'model/vnd.rosette.annotated-data-model': { source: 'iana' },
        'model/vnd.usdz+zip': { source: 'iana', compressible: !1 },
        'model/vnd.valve.source.compiled-map': { source: 'iana' },
        'model/vnd.vtu': { source: 'iana', extensions: ['vtu'] },
        'model/vrml': {
          source: 'iana',
          compressible: !1,
          extensions: ['wrl', 'vrml'],
        },
        'model/x3d+binary': {
          source: 'apache',
          compressible: !1,
          extensions: ['x3db', 'x3dbz'],
        },
        'model/x3d+fastinfoset': { source: 'iana' },
        'model/x3d+vrml': {
          source: 'apache',
          compressible: !1,
          extensions: ['x3dv', 'x3dvz'],
        },
        'model/x3d+xml': {
          source: 'iana',
          compressible: !0,
          extensions: ['x3d', 'x3dz'],
        },
        'model/x3d-vrml': { source: 'iana' },
        'multipart/alternative': { source: 'iana', compressible: !1 },
        'multipart/appledouble': { source: 'iana' },
        'multipart/byteranges': { source: 'iana' },
        'multipart/digest': { source: 'iana' },
        'multipart/encrypted': { source: 'iana', compressible: !1 },
        'multipart/form-data': { source: 'iana', compressible: !1 },
        'multipart/header-set': { source: 'iana' },
        'multipart/mixed': { source: 'iana', compressible: !1 },
        'multipart/multilingual': { source: 'iana' },
        'multipart/parallel': { source: 'iana' },
        'multipart/related': { source: 'iana', compressible: !1 },
        'multipart/report': { source: 'iana' },
        'multipart/signed': { source: 'iana', compressible: !1 },
        'multipart/vnd.bint.med-plus': { source: 'iana' },
        'multipart/voice-message': { source: 'iana' },
        'multipart/x-mixed-replace': { source: 'iana' },
        'text/1d-interleaved-parityfec': { source: 'iana' },
        'text/cache-manifest': {
          source: 'iana',
          compressible: !0,
          extensions: ['appcache', 'manifest'],
        },
        'text/calendar': { source: 'iana', extensions: ['ics', 'ifb'] },
        'text/calender': { compressible: !0 },
        'text/cmd': { compressible: !0 },
        'text/coffeescript': { extensions: ['coffee', 'litcoffee'] },
        'text/css': {
          source: 'iana',
          charset: 'UTF-8',
          compressible: !0,
          extensions: ['css'],
        },
        'text/csv': { source: 'iana', compressible: !0, extensions: ['csv'] },
        'text/csv-schema': { source: 'iana' },
        'text/directory': { source: 'iana' },
        'text/dns': { source: 'iana' },
        'text/ecmascript': { source: 'iana' },
        'text/encaprtp': { source: 'iana' },
        'text/enriched': { source: 'iana' },
        'text/fwdred': { source: 'iana' },
        'text/grammar-ref-list': { source: 'iana' },
        'text/html': {
          source: 'iana',
          compressible: !0,
          extensions: ['html', 'htm', 'shtml'],
        },
        'text/jade': { extensions: ['jade'] },
        'text/javascript': { source: 'iana', compressible: !0 },
        'text/jcr-cnd': { source: 'iana' },
        'text/jsx': { compressible: !0, extensions: ['jsx'] },
        'text/less': { extensions: ['less'] },
        'text/markdown': {
          source: 'iana',
          compressible: !0,
          extensions: ['markdown', 'md'],
        },
        'text/mathml': { source: 'nginx', extensions: ['mml'] },
        'text/mizar': { source: 'iana' },
        'text/n3': { source: 'iana', compressible: !0, extensions: ['n3'] },
        'text/parameters': { source: 'iana' },
        'text/parityfec': { source: 'iana' },
        'text/plain': {
          source: 'iana',
          compressible: !0,
          extensions: [
            'txt',
            'text',
            'conf',
            'def',
            'list',
            'log',
            'in',
            'ini',
          ],
        },
        'text/provenance-notation': { source: 'iana' },
        'text/prs.fallenstein.rst': { source: 'iana' },
        'text/prs.lines.tag': { source: 'iana', extensions: ['dsc'] },
        'text/prs.prop.logic': { source: 'iana' },
        'text/raptorfec': { source: 'iana' },
        'text/red': { source: 'iana' },
        'text/rfc822-headers': { source: 'iana' },
        'text/richtext': {
          source: 'iana',
          compressible: !0,
          extensions: ['rtx'],
        },
        'text/rtf': { source: 'iana', compressible: !0, extensions: ['rtf'] },
        'text/rtp-enc-aescm128': { source: 'iana' },
        'text/rtploopback': { source: 'iana' },
        'text/rtx': { source: 'iana' },
        'text/sgml': { source: 'iana', extensions: ['sgml', 'sgm'] },
        'text/shex': { extensions: ['shex'] },
        'text/slim': { extensions: ['slim', 'slm'] },
        'text/strings': { source: 'iana' },
        'text/stylus': { extensions: ['stylus', 'styl'] },
        'text/t140': { source: 'iana' },
        'text/tab-separated-values': {
          source: 'iana',
          compressible: !0,
          extensions: ['tsv'],
        },
        'text/troff': {
          source: 'iana',
          extensions: ['t', 'tr', 'roff', 'man', 'me', 'ms'],
        },
        'text/turtle': {
          source: 'iana',
          charset: 'UTF-8',
          extensions: ['ttl'],
        },
        'text/ulpfec': { source: 'iana' },
        'text/uri-list': {
          source: 'iana',
          compressible: !0,
          extensions: ['uri', 'uris', 'urls'],
        },
        'text/vcard': {
          source: 'iana',
          compressible: !0,
          extensions: ['vcard'],
        },
        'text/vnd.a': { source: 'iana' },
        'text/vnd.abc': { source: 'iana' },
        'text/vnd.ascii-art': { source: 'iana' },
        'text/vnd.curl': { source: 'iana', extensions: ['curl'] },
        'text/vnd.curl.dcurl': { source: 'apache', extensions: ['dcurl'] },
        'text/vnd.curl.mcurl': { source: 'apache', extensions: ['mcurl'] },
        'text/vnd.curl.scurl': { source: 'apache', extensions: ['scurl'] },
        'text/vnd.debian.copyright': { source: 'iana' },
        'text/vnd.dmclientscript': { source: 'iana' },
        'text/vnd.dvb.subtitle': { source: 'iana', extensions: ['sub'] },
        'text/vnd.esmertec.theme-descriptor': { source: 'iana' },
        'text/vnd.fly': { source: 'iana', extensions: ['fly'] },
        'text/vnd.fmi.flexstor': { source: 'iana', extensions: ['flx'] },
        'text/vnd.gml': { source: 'iana' },
        'text/vnd.graphviz': { source: 'iana', extensions: ['gv'] },
        'text/vnd.hgl': { source: 'iana' },
        'text/vnd.in3d.3dml': { source: 'iana', extensions: ['3dml'] },
        'text/vnd.in3d.spot': { source: 'iana', extensions: ['spot'] },
        'text/vnd.iptc.newsml': { source: 'iana' },
        'text/vnd.iptc.nitf': { source: 'iana' },
        'text/vnd.latex-z': { source: 'iana' },
        'text/vnd.motorola.reflex': { source: 'iana' },
        'text/vnd.ms-mediapackage': { source: 'iana' },
        'text/vnd.net2phone.commcenter.command': { source: 'iana' },
        'text/vnd.radisys.msml-basic-layout': { source: 'iana' },
        'text/vnd.si.uricatalogue': { source: 'iana' },
        'text/vnd.sun.j2me.app-descriptor': {
          source: 'iana',
          extensions: ['jad'],
        },
        'text/vnd.trolltech.linguist': { source: 'iana' },
        'text/vnd.wap.si': { source: 'iana' },
        'text/vnd.wap.sl': { source: 'iana' },
        'text/vnd.wap.wml': { source: 'iana', extensions: ['wml'] },
        'text/vnd.wap.wmlscript': { source: 'iana', extensions: ['wmls'] },
        'text/vtt': { charset: 'UTF-8', compressible: !0, extensions: ['vtt'] },
        'text/x-asm': { source: 'apache', extensions: ['s', 'asm'] },
        'text/x-c': {
          source: 'apache',
          extensions: ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic'],
        },
        'text/x-component': { source: 'nginx', extensions: ['htc'] },
        'text/x-fortran': {
          source: 'apache',
          extensions: ['f', 'for', 'f77', 'f90'],
        },
        'text/x-gwt-rpc': { compressible: !0 },
        'text/x-handlebars-template': { extensions: ['hbs'] },
        'text/x-java-source': { source: 'apache', extensions: ['java'] },
        'text/x-jquery-tmpl': { compressible: !0 },
        'text/x-lua': { extensions: ['lua'] },
        'text/x-markdown': { compressible: !0, extensions: ['mkd'] },
        'text/x-nfo': { source: 'apache', extensions: ['nfo'] },
        'text/x-opml': { source: 'apache', extensions: ['opml'] },
        'text/x-org': { compressible: !0, extensions: ['org'] },
        'text/x-pascal': { source: 'apache', extensions: ['p', 'pas'] },
        'text/x-processing': { compressible: !0, extensions: ['pde'] },
        'text/x-sass': { extensions: ['sass'] },
        'text/x-scss': { extensions: ['scss'] },
        'text/x-setext': { source: 'apache', extensions: ['etx'] },
        'text/x-sfv': { source: 'apache', extensions: ['sfv'] },
        'text/x-suse-ymp': { compressible: !0, extensions: ['ymp'] },
        'text/x-uuencode': { source: 'apache', extensions: ['uu'] },
        'text/x-vcalendar': { source: 'apache', extensions: ['vcs'] },
        'text/x-vcard': { source: 'apache', extensions: ['vcf'] },
        'text/xml': { source: 'iana', compressible: !0, extensions: ['xml'] },
        'text/xml-external-parsed-entity': { source: 'iana' },
        'text/yaml': { extensions: ['yaml', 'yml'] },
        'video/1d-interleaved-parityfec': { source: 'iana' },
        'video/3gpp': { source: 'iana', extensions: ['3gp', '3gpp'] },
        'video/3gpp-tt': { source: 'iana' },
        'video/3gpp2': { source: 'iana', extensions: ['3g2'] },
        'video/bmpeg': { source: 'iana' },
        'video/bt656': { source: 'iana' },
        'video/celb': { source: 'iana' },
        'video/dv': { source: 'iana' },
        'video/encaprtp': { source: 'iana' },
        'video/h261': { source: 'iana', extensions: ['h261'] },
        'video/h263': { source: 'iana', extensions: ['h263'] },
        'video/h263-1998': { source: 'iana' },
        'video/h263-2000': { source: 'iana' },
        'video/h264': { source: 'iana', extensions: ['h264'] },
        'video/h264-rcdo': { source: 'iana' },
        'video/h264-svc': { source: 'iana' },
        'video/h265': { source: 'iana' },
        'video/iso.segment': { source: 'iana' },
        'video/jpeg': { source: 'iana', extensions: ['jpgv'] },
        'video/jpeg2000': { source: 'iana' },
        'video/jpm': { source: 'apache', extensions: ['jpm', 'jpgm'] },
        'video/mj2': { source: 'iana', extensions: ['mj2', 'mjp2'] },
        'video/mp1s': { source: 'iana' },
        'video/mp2p': { source: 'iana' },
        'video/mp2t': { source: 'iana', extensions: ['ts'] },
        'video/mp4': {
          source: 'iana',
          compressible: !1,
          extensions: ['mp4', 'mp4v', 'mpg4'],
        },
        'video/mp4v-es': { source: 'iana' },
        'video/mpeg': {
          source: 'iana',
          compressible: !1,
          extensions: ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
        },
        'video/mpeg4-generic': { source: 'iana' },
        'video/mpv': { source: 'iana' },
        'video/nv': { source: 'iana' },
        'video/ogg': { source: 'iana', compressible: !1, extensions: ['ogv'] },
        'video/parityfec': { source: 'iana' },
        'video/pointer': { source: 'iana' },
        'video/quicktime': {
          source: 'iana',
          compressible: !1,
          extensions: ['qt', 'mov'],
        },
        'video/raptorfec': { source: 'iana' },
        'video/raw': { source: 'iana' },
        'video/rtp-enc-aescm128': { source: 'iana' },
        'video/rtploopback': { source: 'iana' },
        'video/rtx': { source: 'iana' },
        'video/smpte291': { source: 'iana' },
        'video/smpte292m': { source: 'iana' },
        'video/ulpfec': { source: 'iana' },
        'video/vc1': { source: 'iana' },
        'video/vnd.cctv': { source: 'iana' },
        'video/vnd.dece.hd': { source: 'iana', extensions: ['uvh', 'uvvh'] },
        'video/vnd.dece.mobile': {
          source: 'iana',
          extensions: ['uvm', 'uvvm'],
        },
        'video/vnd.dece.mp4': { source: 'iana' },
        'video/vnd.dece.pd': { source: 'iana', extensions: ['uvp', 'uvvp'] },
        'video/vnd.dece.sd': { source: 'iana', extensions: ['uvs', 'uvvs'] },
        'video/vnd.dece.video': { source: 'iana', extensions: ['uvv', 'uvvv'] },
        'video/vnd.directv.mpeg': { source: 'iana' },
        'video/vnd.directv.mpeg-tts': { source: 'iana' },
        'video/vnd.dlna.mpeg-tts': { source: 'iana' },
        'video/vnd.dvb.file': { source: 'iana', extensions: ['dvb'] },
        'video/vnd.fvt': { source: 'iana', extensions: ['fvt'] },
        'video/vnd.hns.video': { source: 'iana' },
        'video/vnd.iptvforum.1dparityfec-1010': { source: 'iana' },
        'video/vnd.iptvforum.1dparityfec-2005': { source: 'iana' },
        'video/vnd.iptvforum.2dparityfec-1010': { source: 'iana' },
        'video/vnd.iptvforum.2dparityfec-2005': { source: 'iana' },
        'video/vnd.iptvforum.ttsavc': { source: 'iana' },
        'video/vnd.iptvforum.ttsmpeg2': { source: 'iana' },
        'video/vnd.motorola.video': { source: 'iana' },
        'video/vnd.motorola.videop': { source: 'iana' },
        'video/vnd.mpegurl': { source: 'iana', extensions: ['mxu', 'm4u'] },
        'video/vnd.ms-playready.media.pyv': {
          source: 'iana',
          extensions: ['pyv'],
        },
        'video/vnd.nokia.interleaved-multimedia': { source: 'iana' },
        'video/vnd.nokia.mp4vr': { source: 'iana' },
        'video/vnd.nokia.videovoip': { source: 'iana' },
        'video/vnd.objectvideo': { source: 'iana' },
        'video/vnd.radgamettools.bink': { source: 'iana' },
        'video/vnd.radgamettools.smacker': { source: 'iana' },
        'video/vnd.sealed.mpeg1': { source: 'iana' },
        'video/vnd.sealed.mpeg4': { source: 'iana' },
        'video/vnd.sealed.swf': { source: 'iana' },
        'video/vnd.sealedmedia.softseal.mov': { source: 'iana' },
        'video/vnd.uvvu.mp4': { source: 'iana', extensions: ['uvu', 'uvvu'] },
        'video/vnd.vivo': { source: 'iana', extensions: ['viv'] },
        'video/vp8': { source: 'iana' },
        'video/webm': {
          source: 'apache',
          compressible: !1,
          extensions: ['webm'],
        },
        'video/x-f4v': { source: 'apache', extensions: ['f4v'] },
        'video/x-fli': { source: 'apache', extensions: ['fli'] },
        'video/x-flv': {
          source: 'apache',
          compressible: !1,
          extensions: ['flv'],
        },
        'video/x-m4v': { source: 'apache', extensions: ['m4v'] },
        'video/x-matroska': {
          source: 'apache',
          compressible: !1,
          extensions: ['mkv', 'mk3d', 'mks'],
        },
        'video/x-mng': { source: 'apache', extensions: ['mng'] },
        'video/x-ms-asf': { source: 'apache', extensions: ['asf', 'asx'] },
        'video/x-ms-vob': { source: 'apache', extensions: ['vob'] },
        'video/x-ms-wm': { source: 'apache', extensions: ['wm'] },
        'video/x-ms-wmv': {
          source: 'apache',
          compressible: !1,
          extensions: ['wmv'],
        },
        'video/x-ms-wmx': { source: 'apache', extensions: ['wmx'] },
        'video/x-ms-wvx': { source: 'apache', extensions: ['wvx'] },
        'video/x-msvideo': { source: 'apache', extensions: ['avi'] },
        'video/x-sgi-movie': { source: 'apache', extensions: ['movie'] },
        'video/x-smv': { source: 'apache', extensions: ['smv'] },
        'x-conference/x-cooltalk': { source: 'apache', extensions: ['ice'] },
        'x-shader/x-fragment': { compressible: !0 },
        'x-shader/x-vertex': { compressible: !0 },
      }
    },
    function (e, i, a) {
      e.exports = { parallel: a(61), serial: a(63), serialOrdered: a(19) }
    },
    function (e, i, a) {
      var n = a(14),
        o = a(17),
        t = a(18)
      e.exports = function (e, i, a) {
        var s = o(e)
        for (; s.index < (s.keyedList || e).length; )
          n(e, i, s, function (e, i) {
            e ? a(e, i) : 0 !== Object.keys(s.jobs).length || a(null, s.results)
          }),
            s.index++
        return t.bind(s, a)
      }
    },
    function (e, i) {
      e.exports = function (e) {
        var i =
          'function' == typeof setImmediate
            ? setImmediate
            : 'object' == typeof process &&
              'function' == typeof process.nextTick
            ? process.nextTick
            : null
        i ? i(e) : setTimeout(e, 0)
      }
    },
    function (e, i, a) {
      var n = a(19)
      e.exports = function (e, i, a) {
        return n(e, i, null, a)
      }
    },
    function (e, i) {
      e.exports = function (e, i) {
        return (
          Object.keys(i).forEach(function (a) {
            e[a] = e[a] || i[a]
          }),
          e
        )
      }
    },
    function (e, i, a) {
      'use strict'
      const n = a(0),
        o = a(1),
        t = a(66)
      function s(e) {
        o.call(this)
        const i = (this.res = e.res)
        ;(this.request = e),
          (this.req = e.req),
          (this.text = i.text),
          (this.body = void 0 !== i.body ? i.body : {}),
          (this.files = i.files || {}),
          (this.buffered = 'string' == typeof this.text),
          (this.header = this.headers = i.headers),
          this._setStatusProperties(i.statusCode),
          this._setHeaderProperties(this.header),
          (this.setEncoding = i.setEncoding.bind(i)),
          i.on('data', this.emit.bind(this, 'data')),
          i.on('end', this.emit.bind(this, 'end')),
          i.on('close', this.emit.bind(this, 'close')),
          i.on('error', this.emit.bind(this, 'error'))
      }
      ;(e.exports = s),
        n.inherits(s, o),
        t(s.prototype),
        (s.prototype.destroy = function (e) {
          this.res.destroy(e)
        }),
        (s.prototype.pause = function () {
          this.res.pause()
        }),
        (s.prototype.resume = function () {
          this.res.resume()
        }),
        (s.prototype.toError = function () {
          const e = this.req,
            i = e.method,
            a = e.path,
            n = `cannot ${i} ${a} (${this.status})`,
            o = new Error(n)
          return (
            (o.status = this.status),
            (o.text = this.text),
            (o.method = i),
            (o.path = a),
            o
          )
        }),
        (s.prototype.setStatusProperties = function (e) {
          return (
            console.warn(
              'In superagent 2.x setStatusProperties is a private method'
            ),
            this._setStatusProperties(e)
          )
        }),
        (s.prototype.toJSON = function () {
          return {
            req: this.request.toJSON(),
            header: this.header,
            status: this.status,
            text: this.text,
          }
        })
    },
    function (e, i, a) {
      'use strict'
      var n = a(20)
      function o(e) {
        if (e)
          return (function (e) {
            for (var i in o.prototype) e[i] = o.prototype[i]
            return e
          })(e)
      }
      ;(e.exports = o),
        (o.prototype.get = function (e) {
          return this.header[e.toLowerCase()]
        }),
        (o.prototype._setHeaderProperties = function (e) {
          var i = e['content-type'] || ''
          this.type = n.type(i)
          var a = n.params(i)
          for (var o in a) this[o] = a[o]
          this.links = {}
          try {
            e.link && (this.links = n.parseLinks(e.link))
          } catch (e) {}
        }),
        (o.prototype._setStatusProperties = function (e) {
          var i = (e / 100) | 0
          ;(this.status = this.statusCode = e),
            (this.statusType = i),
            (this.info = 1 == i),
            (this.ok = 2 == i),
            (this.redirect = 3 == i),
            (this.clientError = 4 == i),
            (this.serverError = 5 == i),
            (this.error = (4 == i || 5 == i) && this.toError()),
            (this.created = 201 == e),
            (this.accepted = 202 == e),
            (this.noContent = 204 == e),
            (this.badRequest = 400 == e),
            (this.unauthorized = 401 == e),
            (this.notAcceptable = 406 == e),
            (this.forbidden = 403 == e),
            (this.notFound = 404 == e),
            (this.unprocessableEntity = 422 == e)
        })
    },
    function (e, i, a) {
      'use strict'
      const n = a(68).StringDecoder,
        o = a(1),
        t = a(22)
      i.unzip = (e, i) => {
        const a = t.createUnzip(),
          s = new o()
        let c
        ;(s.req = e),
          a.on('error', (e) => {
            e && 'Z_BUF_ERROR' === e.code ? s.emit('end') : s.emit('error', e)
          }),
          i.pipe(a),
          (i.setEncoding = (e) => {
            c = new n(e)
          }),
          a.on('data', (e) => {
            if (c) {
              const i = c.write(e)
              i.length && s.emit('data', i)
            } else s.emit('data', e)
          }),
          a.on('end', () => {
            s.emit('end')
          })
        const r = i.on
        i.on = function (e, a) {
          return (
            'data' == e || 'end' == e
              ? s.on(e, a)
              : 'error' == e
              ? (s.on(e, a), r.call(i, e, a))
              : r.call(i, e, a),
            this
          )
        }
      }
    },
    function (e, i) {
      e.exports = require('string_decoder')
    },
    function (e, i, a) {
      'use strict'
      var n = Object.prototype.hasOwnProperty,
        o = Object.prototype.toString,
        t = Object.defineProperty,
        s = Object.getOwnPropertyDescriptor,
        c = function (e) {
          return 'function' == typeof Array.isArray
            ? Array.isArray(e)
            : '[object Array]' === o.call(e)
        },
        r = function (e) {
          if (!e || '[object Object]' !== o.call(e)) return !1
          var i,
            a = n.call(e, 'constructor'),
            t =
              e.constructor &&
              e.constructor.prototype &&
              n.call(e.constructor.prototype, 'isPrototypeOf')
          if (e.constructor && !a && !t) return !1
          for (i in e);
          return void 0 === i || n.call(e, i)
        },
        p = function (e, i) {
          t && '__proto__' === i.name
            ? t(e, i.name, {
                enumerable: !0,
                configurable: !0,
                value: i.newValue,
                writable: !0,
              })
            : (e[i.name] = i.newValue)
        },
        l = function (e, i) {
          if ('__proto__' === i) {
            if (!n.call(e, i)) return
            if (s) return s(e, i).value
          }
          return e[i]
        }
      e.exports = function e() {
        var i,
          a,
          n,
          o,
          t,
          s,
          u = arguments[0],
          d = 1,
          m = arguments.length,
          x = !1
        for (
          'boolean' == typeof u && ((x = u), (u = arguments[1] || {}), (d = 2)),
            (null == u || ('object' != typeof u && 'function' != typeof u)) &&
              (u = {});
          d < m;
          ++d
        )
          if (null != (i = arguments[d]))
            for (a in i)
              (n = l(u, a)),
                u !== (o = l(i, a)) &&
                  (x && o && (r(o) || (t = c(o)))
                    ? (t
                        ? ((t = !1), (s = n && c(n) ? n : []))
                        : (s = n && r(n) ? n : {}),
                      p(u, { name: a, newValue: e(x, s, o) }))
                    : void 0 !== o && p(u, { name: a, newValue: o }))
        return u
      }
    },
    function (e, i, a) {
      a(6)
      var n = a(3)
      function o() {
        ;(this.types = Object.create(null)),
          (this.extensions = Object.create(null))
      }
      ;(o.prototype.define = function (e) {
        for (var i in e) {
          for (var a = e[i], n = 0; n < a.length; n++)
            process.env.DEBUG_MIME &&
              this.types[a[n]] &&
              console.warn(
                (this._loading || 'define()').replace(/.*\//, ''),
                'changes "' +
                  a[n] +
                  '" extension type from ' +
                  this.types[a[n]] +
                  ' to ' +
                  i
              ),
              (this.types[a[n]] = i)
          this.extensions[i] || (this.extensions[i] = a[0])
        }
      }),
        (o.prototype.load = function (e) {
          this._loading = e
          var i = {}
          n
            .readFileSync(e, 'ascii')
            .split(/[\r\n]+/)
            .forEach(function (e) {
              var a = e.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/)
              i[a.shift()] = a
            }),
            this.define(i),
            (this._loading = null)
        }),
        (o.prototype.lookup = function (e, i) {
          var a = e.replace(/^.*[\.\/\\]/, '').toLowerCase()
          return this.types[a] || i || this.default_type
        }),
        (o.prototype.extension = function (e) {
          var i = e.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase()
          return this.extensions[i]
        })
      var t = new o()
      t.define(a(71)),
        (t.default_type = t.lookup('bin')),
        (t.Mime = o),
        (t.charsets = {
          lookup: function (e, i) {
            return /^text\/|^application\/(javascript|json)/.test(e)
              ? 'UTF-8'
              : i
          },
        }),
        (e.exports = t)
    },
    function (e) {
      e.exports = {
        'application/andrew-inset': ['ez'],
        'application/applixware': ['aw'],
        'application/atom+xml': ['atom'],
        'application/atomcat+xml': ['atomcat'],
        'application/atomsvc+xml': ['atomsvc'],
        'application/bdoc': ['bdoc'],
        'application/ccxml+xml': ['ccxml'],
        'application/cdmi-capability': ['cdmia'],
        'application/cdmi-container': ['cdmic'],
        'application/cdmi-domain': ['cdmid'],
        'application/cdmi-object': ['cdmio'],
        'application/cdmi-queue': ['cdmiq'],
        'application/cu-seeme': ['cu'],
        'application/dash+xml': ['mpd'],
        'application/davmount+xml': ['davmount'],
        'application/docbook+xml': ['dbk'],
        'application/dssc+der': ['dssc'],
        'application/dssc+xml': ['xdssc'],
        'application/ecmascript': ['ecma'],
        'application/emma+xml': ['emma'],
        'application/epub+zip': ['epub'],
        'application/exi': ['exi'],
        'application/font-tdpfr': ['pfr'],
        'application/font-woff': [],
        'application/font-woff2': [],
        'application/geo+json': ['geojson'],
        'application/gml+xml': ['gml'],
        'application/gpx+xml': ['gpx'],
        'application/gxf': ['gxf'],
        'application/gzip': ['gz'],
        'application/hyperstudio': ['stk'],
        'application/inkml+xml': ['ink', 'inkml'],
        'application/ipfix': ['ipfix'],
        'application/java-archive': ['jar', 'war', 'ear'],
        'application/java-serialized-object': ['ser'],
        'application/java-vm': ['class'],
        'application/javascript': ['js', 'mjs'],
        'application/json': ['json', 'map'],
        'application/json5': ['json5'],
        'application/jsonml+json': ['jsonml'],
        'application/ld+json': ['jsonld'],
        'application/lost+xml': ['lostxml'],
        'application/mac-binhex40': ['hqx'],
        'application/mac-compactpro': ['cpt'],
        'application/mads+xml': ['mads'],
        'application/manifest+json': ['webmanifest'],
        'application/marc': ['mrc'],
        'application/marcxml+xml': ['mrcx'],
        'application/mathematica': ['ma', 'nb', 'mb'],
        'application/mathml+xml': ['mathml'],
        'application/mbox': ['mbox'],
        'application/mediaservercontrol+xml': ['mscml'],
        'application/metalink+xml': ['metalink'],
        'application/metalink4+xml': ['meta4'],
        'application/mets+xml': ['mets'],
        'application/mods+xml': ['mods'],
        'application/mp21': ['m21', 'mp21'],
        'application/mp4': ['mp4s', 'm4p'],
        'application/msword': ['doc', 'dot'],
        'application/mxf': ['mxf'],
        'application/octet-stream': [
          'bin',
          'dms',
          'lrf',
          'mar',
          'so',
          'dist',
          'distz',
          'pkg',
          'bpk',
          'dump',
          'elc',
          'deploy',
          'exe',
          'dll',
          'deb',
          'dmg',
          'iso',
          'img',
          'msi',
          'msp',
          'msm',
          'buffer',
        ],
        'application/oda': ['oda'],
        'application/oebps-package+xml': ['opf'],
        'application/ogg': ['ogx'],
        'application/omdoc+xml': ['omdoc'],
        'application/onenote': ['onetoc', 'onetoc2', 'onetmp', 'onepkg'],
        'application/oxps': ['oxps'],
        'application/patch-ops-error+xml': ['xer'],
        'application/pdf': ['pdf'],
        'application/pgp-encrypted': ['pgp'],
        'application/pgp-signature': ['asc', 'sig'],
        'application/pics-rules': ['prf'],
        'application/pkcs10': ['p10'],
        'application/pkcs7-mime': ['p7m', 'p7c'],
        'application/pkcs7-signature': ['p7s'],
        'application/pkcs8': ['p8'],
        'application/pkix-attr-cert': ['ac'],
        'application/pkix-cert': ['cer'],
        'application/pkix-crl': ['crl'],
        'application/pkix-pkipath': ['pkipath'],
        'application/pkixcmp': ['pki'],
        'application/pls+xml': ['pls'],
        'application/postscript': ['ai', 'eps', 'ps'],
        'application/prs.cww': ['cww'],
        'application/pskc+xml': ['pskcxml'],
        'application/raml+yaml': ['raml'],
        'application/rdf+xml': ['rdf'],
        'application/reginfo+xml': ['rif'],
        'application/relax-ng-compact-syntax': ['rnc'],
        'application/resource-lists+xml': ['rl'],
        'application/resource-lists-diff+xml': ['rld'],
        'application/rls-services+xml': ['rs'],
        'application/rpki-ghostbusters': ['gbr'],
        'application/rpki-manifest': ['mft'],
        'application/rpki-roa': ['roa'],
        'application/rsd+xml': ['rsd'],
        'application/rss+xml': ['rss'],
        'application/rtf': ['rtf'],
        'application/sbml+xml': ['sbml'],
        'application/scvp-cv-request': ['scq'],
        'application/scvp-cv-response': ['scs'],
        'application/scvp-vp-request': ['spq'],
        'application/scvp-vp-response': ['spp'],
        'application/sdp': ['sdp'],
        'application/set-payment-initiation': ['setpay'],
        'application/set-registration-initiation': ['setreg'],
        'application/shf+xml': ['shf'],
        'application/smil+xml': ['smi', 'smil'],
        'application/sparql-query': ['rq'],
        'application/sparql-results+xml': ['srx'],
        'application/srgs': ['gram'],
        'application/srgs+xml': ['grxml'],
        'application/sru+xml': ['sru'],
        'application/ssdl+xml': ['ssdl'],
        'application/ssml+xml': ['ssml'],
        'application/tei+xml': ['tei', 'teicorpus'],
        'application/thraud+xml': ['tfi'],
        'application/timestamped-data': ['tsd'],
        'application/vnd.3gpp.pic-bw-large': ['plb'],
        'application/vnd.3gpp.pic-bw-small': ['psb'],
        'application/vnd.3gpp.pic-bw-var': ['pvb'],
        'application/vnd.3gpp2.tcap': ['tcap'],
        'application/vnd.3m.post-it-notes': ['pwn'],
        'application/vnd.accpac.simply.aso': ['aso'],
        'application/vnd.accpac.simply.imp': ['imp'],
        'application/vnd.acucobol': ['acu'],
        'application/vnd.acucorp': ['atc', 'acutc'],
        'application/vnd.adobe.air-application-installer-package+zip': ['air'],
        'application/vnd.adobe.formscentral.fcdt': ['fcdt'],
        'application/vnd.adobe.fxp': ['fxp', 'fxpl'],
        'application/vnd.adobe.xdp+xml': ['xdp'],
        'application/vnd.adobe.xfdf': ['xfdf'],
        'application/vnd.ahead.space': ['ahead'],
        'application/vnd.airzip.filesecure.azf': ['azf'],
        'application/vnd.airzip.filesecure.azs': ['azs'],
        'application/vnd.amazon.ebook': ['azw'],
        'application/vnd.americandynamics.acc': ['acc'],
        'application/vnd.amiga.ami': ['ami'],
        'application/vnd.android.package-archive': ['apk'],
        'application/vnd.anser-web-certificate-issue-initiation': ['cii'],
        'application/vnd.anser-web-funds-transfer-initiation': ['fti'],
        'application/vnd.antix.game-component': ['atx'],
        'application/vnd.apple.installer+xml': ['mpkg'],
        'application/vnd.apple.mpegurl': ['m3u8'],
        'application/vnd.apple.pkpass': ['pkpass'],
        'application/vnd.aristanetworks.swi': ['swi'],
        'application/vnd.astraea-software.iota': ['iota'],
        'application/vnd.audiograph': ['aep'],
        'application/vnd.blueice.multipass': ['mpm'],
        'application/vnd.bmi': ['bmi'],
        'application/vnd.businessobjects': ['rep'],
        'application/vnd.chemdraw+xml': ['cdxml'],
        'application/vnd.chipnuts.karaoke-mmd': ['mmd'],
        'application/vnd.cinderella': ['cdy'],
        'application/vnd.claymore': ['cla'],
        'application/vnd.cloanto.rp9': ['rp9'],
        'application/vnd.clonk.c4group': ['c4g', 'c4d', 'c4f', 'c4p', 'c4u'],
        'application/vnd.cluetrust.cartomobile-config': ['c11amc'],
        'application/vnd.cluetrust.cartomobile-config-pkg': ['c11amz'],
        'application/vnd.commonspace': ['csp'],
        'application/vnd.contact.cmsg': ['cdbcmsg'],
        'application/vnd.cosmocaller': ['cmc'],
        'application/vnd.crick.clicker': ['clkx'],
        'application/vnd.crick.clicker.keyboard': ['clkk'],
        'application/vnd.crick.clicker.palette': ['clkp'],
        'application/vnd.crick.clicker.template': ['clkt'],
        'application/vnd.crick.clicker.wordbank': ['clkw'],
        'application/vnd.criticaltools.wbs+xml': ['wbs'],
        'application/vnd.ctc-posml': ['pml'],
        'application/vnd.cups-ppd': ['ppd'],
        'application/vnd.curl.car': ['car'],
        'application/vnd.curl.pcurl': ['pcurl'],
        'application/vnd.dart': ['dart'],
        'application/vnd.data-vision.rdz': ['rdz'],
        'application/vnd.dece.data': ['uvf', 'uvvf', 'uvd', 'uvvd'],
        'application/vnd.dece.ttml+xml': ['uvt', 'uvvt'],
        'application/vnd.dece.unspecified': ['uvx', 'uvvx'],
        'application/vnd.dece.zip': ['uvz', 'uvvz'],
        'application/vnd.denovo.fcselayout-link': ['fe_launch'],
        'application/vnd.dna': ['dna'],
        'application/vnd.dolby.mlp': ['mlp'],
        'application/vnd.dpgraph': ['dpg'],
        'application/vnd.dreamfactory': ['dfac'],
        'application/vnd.ds-keypoint': ['kpxx'],
        'application/vnd.dvb.ait': ['ait'],
        'application/vnd.dvb.service': ['svc'],
        'application/vnd.dynageo': ['geo'],
        'application/vnd.ecowin.chart': ['mag'],
        'application/vnd.enliven': ['nml'],
        'application/vnd.epson.esf': ['esf'],
        'application/vnd.epson.msf': ['msf'],
        'application/vnd.epson.quickanime': ['qam'],
        'application/vnd.epson.salt': ['slt'],
        'application/vnd.epson.ssf': ['ssf'],
        'application/vnd.eszigno3+xml': ['es3', 'et3'],
        'application/vnd.ezpix-album': ['ez2'],
        'application/vnd.ezpix-package': ['ez3'],
        'application/vnd.fdf': ['fdf'],
        'application/vnd.fdsn.mseed': ['mseed'],
        'application/vnd.fdsn.seed': ['seed', 'dataless'],
        'application/vnd.flographit': ['gph'],
        'application/vnd.fluxtime.clip': ['ftc'],
        'application/vnd.framemaker': ['fm', 'frame', 'maker', 'book'],
        'application/vnd.frogans.fnc': ['fnc'],
        'application/vnd.frogans.ltf': ['ltf'],
        'application/vnd.fsc.weblaunch': ['fsc'],
        'application/vnd.fujitsu.oasys': ['oas'],
        'application/vnd.fujitsu.oasys2': ['oa2'],
        'application/vnd.fujitsu.oasys3': ['oa3'],
        'application/vnd.fujitsu.oasysgp': ['fg5'],
        'application/vnd.fujitsu.oasysprs': ['bh2'],
        'application/vnd.fujixerox.ddd': ['ddd'],
        'application/vnd.fujixerox.docuworks': ['xdw'],
        'application/vnd.fujixerox.docuworks.binder': ['xbd'],
        'application/vnd.fuzzysheet': ['fzs'],
        'application/vnd.genomatix.tuxedo': ['txd'],
        'application/vnd.geogebra.file': ['ggb'],
        'application/vnd.geogebra.tool': ['ggt'],
        'application/vnd.geometry-explorer': ['gex', 'gre'],
        'application/vnd.geonext': ['gxt'],
        'application/vnd.geoplan': ['g2w'],
        'application/vnd.geospace': ['g3w'],
        'application/vnd.gmx': ['gmx'],
        'application/vnd.google-apps.document': ['gdoc'],
        'application/vnd.google-apps.presentation': ['gslides'],
        'application/vnd.google-apps.spreadsheet': ['gsheet'],
        'application/vnd.google-earth.kml+xml': ['kml'],
        'application/vnd.google-earth.kmz': ['kmz'],
        'application/vnd.grafeq': ['gqf', 'gqs'],
        'application/vnd.groove-account': ['gac'],
        'application/vnd.groove-help': ['ghf'],
        'application/vnd.groove-identity-message': ['gim'],
        'application/vnd.groove-injector': ['grv'],
        'application/vnd.groove-tool-message': ['gtm'],
        'application/vnd.groove-tool-template': ['tpl'],
        'application/vnd.groove-vcard': ['vcg'],
        'application/vnd.hal+xml': ['hal'],
        'application/vnd.handheld-entertainment+xml': ['zmm'],
        'application/vnd.hbci': ['hbci'],
        'application/vnd.hhe.lesson-player': ['les'],
        'application/vnd.hp-hpgl': ['hpgl'],
        'application/vnd.hp-hpid': ['hpid'],
        'application/vnd.hp-hps': ['hps'],
        'application/vnd.hp-jlyt': ['jlt'],
        'application/vnd.hp-pcl': ['pcl'],
        'application/vnd.hp-pclxl': ['pclxl'],
        'application/vnd.hydrostatix.sof-data': ['sfd-hdstx'],
        'application/vnd.ibm.minipay': ['mpy'],
        'application/vnd.ibm.modcap': ['afp', 'listafp', 'list3820'],
        'application/vnd.ibm.rights-management': ['irm'],
        'application/vnd.ibm.secure-container': ['sc'],
        'application/vnd.iccprofile': ['icc', 'icm'],
        'application/vnd.igloader': ['igl'],
        'application/vnd.immervision-ivp': ['ivp'],
        'application/vnd.immervision-ivu': ['ivu'],
        'application/vnd.insors.igm': ['igm'],
        'application/vnd.intercon.formnet': ['xpw', 'xpx'],
        'application/vnd.intergeo': ['i2g'],
        'application/vnd.intu.qbo': ['qbo'],
        'application/vnd.intu.qfx': ['qfx'],
        'application/vnd.ipunplugged.rcprofile': ['rcprofile'],
        'application/vnd.irepository.package+xml': ['irp'],
        'application/vnd.is-xpr': ['xpr'],
        'application/vnd.isac.fcs': ['fcs'],
        'application/vnd.jam': ['jam'],
        'application/vnd.jcp.javame.midlet-rms': ['rms'],
        'application/vnd.jisp': ['jisp'],
        'application/vnd.joost.joda-archive': ['joda'],
        'application/vnd.kahootz': ['ktz', 'ktr'],
        'application/vnd.kde.karbon': ['karbon'],
        'application/vnd.kde.kchart': ['chrt'],
        'application/vnd.kde.kformula': ['kfo'],
        'application/vnd.kde.kivio': ['flw'],
        'application/vnd.kde.kontour': ['kon'],
        'application/vnd.kde.kpresenter': ['kpr', 'kpt'],
        'application/vnd.kde.kspread': ['ksp'],
        'application/vnd.kde.kword': ['kwd', 'kwt'],
        'application/vnd.kenameaapp': ['htke'],
        'application/vnd.kidspiration': ['kia'],
        'application/vnd.kinar': ['kne', 'knp'],
        'application/vnd.koan': ['skp', 'skd', 'skt', 'skm'],
        'application/vnd.kodak-descriptor': ['sse'],
        'application/vnd.las.las+xml': ['lasxml'],
        'application/vnd.llamagraphics.life-balance.desktop': ['lbd'],
        'application/vnd.llamagraphics.life-balance.exchange+xml': ['lbe'],
        'application/vnd.lotus-1-2-3': ['123'],
        'application/vnd.lotus-approach': ['apr'],
        'application/vnd.lotus-freelance': ['pre'],
        'application/vnd.lotus-notes': ['nsf'],
        'application/vnd.lotus-organizer': ['org'],
        'application/vnd.lotus-screencam': ['scm'],
        'application/vnd.lotus-wordpro': ['lwp'],
        'application/vnd.macports.portpkg': ['portpkg'],
        'application/vnd.mcd': ['mcd'],
        'application/vnd.medcalcdata': ['mc1'],
        'application/vnd.mediastation.cdkey': ['cdkey'],
        'application/vnd.mfer': ['mwf'],
        'application/vnd.mfmp': ['mfm'],
        'application/vnd.micrografx.flo': ['flo'],
        'application/vnd.micrografx.igx': ['igx'],
        'application/vnd.mif': ['mif'],
        'application/vnd.mobius.daf': ['daf'],
        'application/vnd.mobius.dis': ['dis'],
        'application/vnd.mobius.mbk': ['mbk'],
        'application/vnd.mobius.mqy': ['mqy'],
        'application/vnd.mobius.msl': ['msl'],
        'application/vnd.mobius.plc': ['plc'],
        'application/vnd.mobius.txf': ['txf'],
        'application/vnd.mophun.application': ['mpn'],
        'application/vnd.mophun.certificate': ['mpc'],
        'application/vnd.mozilla.xul+xml': ['xul'],
        'application/vnd.ms-artgalry': ['cil'],
        'application/vnd.ms-cab-compressed': ['cab'],
        'application/vnd.ms-excel': ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
        'application/vnd.ms-excel.addin.macroenabled.12': ['xlam'],
        'application/vnd.ms-excel.sheet.binary.macroenabled.12': ['xlsb'],
        'application/vnd.ms-excel.sheet.macroenabled.12': ['xlsm'],
        'application/vnd.ms-excel.template.macroenabled.12': ['xltm'],
        'application/vnd.ms-fontobject': ['eot'],
        'application/vnd.ms-htmlhelp': ['chm'],
        'application/vnd.ms-ims': ['ims'],
        'application/vnd.ms-lrm': ['lrm'],
        'application/vnd.ms-officetheme': ['thmx'],
        'application/vnd.ms-outlook': ['msg'],
        'application/vnd.ms-pki.seccat': ['cat'],
        'application/vnd.ms-pki.stl': ['stl'],
        'application/vnd.ms-powerpoint': ['ppt', 'pps', 'pot'],
        'application/vnd.ms-powerpoint.addin.macroenabled.12': ['ppam'],
        'application/vnd.ms-powerpoint.presentation.macroenabled.12': ['pptm'],
        'application/vnd.ms-powerpoint.slide.macroenabled.12': ['sldm'],
        'application/vnd.ms-powerpoint.slideshow.macroenabled.12': ['ppsm'],
        'application/vnd.ms-powerpoint.template.macroenabled.12': ['potm'],
        'application/vnd.ms-project': ['mpp', 'mpt'],
        'application/vnd.ms-word.document.macroenabled.12': ['docm'],
        'application/vnd.ms-word.template.macroenabled.12': ['dotm'],
        'application/vnd.ms-works': ['wps', 'wks', 'wcm', 'wdb'],
        'application/vnd.ms-wpl': ['wpl'],
        'application/vnd.ms-xpsdocument': ['xps'],
        'application/vnd.mseq': ['mseq'],
        'application/vnd.musician': ['mus'],
        'application/vnd.muvee.style': ['msty'],
        'application/vnd.mynfc': ['taglet'],
        'application/vnd.neurolanguage.nlu': ['nlu'],
        'application/vnd.nitf': ['ntf', 'nitf'],
        'application/vnd.noblenet-directory': ['nnd'],
        'application/vnd.noblenet-sealer': ['nns'],
        'application/vnd.noblenet-web': ['nnw'],
        'application/vnd.nokia.n-gage.data': ['ngdat'],
        'application/vnd.nokia.n-gage.symbian.install': ['n-gage'],
        'application/vnd.nokia.radio-preset': ['rpst'],
        'application/vnd.nokia.radio-presets': ['rpss'],
        'application/vnd.novadigm.edm': ['edm'],
        'application/vnd.novadigm.edx': ['edx'],
        'application/vnd.novadigm.ext': ['ext'],
        'application/vnd.oasis.opendocument.chart': ['odc'],
        'application/vnd.oasis.opendocument.chart-template': ['otc'],
        'application/vnd.oasis.opendocument.database': ['odb'],
        'application/vnd.oasis.opendocument.formula': ['odf'],
        'application/vnd.oasis.opendocument.formula-template': ['odft'],
        'application/vnd.oasis.opendocument.graphics': ['odg'],
        'application/vnd.oasis.opendocument.graphics-template': ['otg'],
        'application/vnd.oasis.opendocument.image': ['odi'],
        'application/vnd.oasis.opendocument.image-template': ['oti'],
        'application/vnd.oasis.opendocument.presentation': ['odp'],
        'application/vnd.oasis.opendocument.presentation-template': ['otp'],
        'application/vnd.oasis.opendocument.spreadsheet': ['ods'],
        'application/vnd.oasis.opendocument.spreadsheet-template': ['ots'],
        'application/vnd.oasis.opendocument.text': ['odt'],
        'application/vnd.oasis.opendocument.text-master': ['odm'],
        'application/vnd.oasis.opendocument.text-template': ['ott'],
        'application/vnd.oasis.opendocument.text-web': ['oth'],
        'application/vnd.olpc-sugar': ['xo'],
        'application/vnd.oma.dd2+xml': ['dd2'],
        'application/vnd.openofficeorg.extension': ['oxt'],
        'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          ['pptx'],
        'application/vnd.openxmlformats-officedocument.presentationml.slide': [
          'sldx',
        ],
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
          ['ppsx'],
        'application/vnd.openxmlformats-officedocument.presentationml.template':
          ['potx'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
          'xlsx',
        ],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template':
          ['xltx'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['docx'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
          ['dotx'],
        'application/vnd.osgeo.mapguide.package': ['mgp'],
        'application/vnd.osgi.dp': ['dp'],
        'application/vnd.osgi.subsystem': ['esa'],
        'application/vnd.palm': ['pdb', 'pqa', 'oprc'],
        'application/vnd.pawaafile': ['paw'],
        'application/vnd.pg.format': ['str'],
        'application/vnd.pg.osasli': ['ei6'],
        'application/vnd.picsel': ['efif'],
        'application/vnd.pmi.widget': ['wg'],
        'application/vnd.pocketlearn': ['plf'],
        'application/vnd.powerbuilder6': ['pbd'],
        'application/vnd.previewsystems.box': ['box'],
        'application/vnd.proteus.magazine': ['mgz'],
        'application/vnd.publishare-delta-tree': ['qps'],
        'application/vnd.pvi.ptid1': ['ptid'],
        'application/vnd.quark.quarkxpress': [
          'qxd',
          'qxt',
          'qwd',
          'qwt',
          'qxl',
          'qxb',
        ],
        'application/vnd.realvnc.bed': ['bed'],
        'application/vnd.recordare.musicxml': ['mxl'],
        'application/vnd.recordare.musicxml+xml': ['musicxml'],
        'application/vnd.rig.cryptonote': ['cryptonote'],
        'application/vnd.rim.cod': ['cod'],
        'application/vnd.rn-realmedia': ['rm'],
        'application/vnd.rn-realmedia-vbr': ['rmvb'],
        'application/vnd.route66.link66+xml': ['link66'],
        'application/vnd.sailingtracker.track': ['st'],
        'application/vnd.seemail': ['see'],
        'application/vnd.sema': ['sema'],
        'application/vnd.semd': ['semd'],
        'application/vnd.semf': ['semf'],
        'application/vnd.shana.informed.formdata': ['ifm'],
        'application/vnd.shana.informed.formtemplate': ['itp'],
        'application/vnd.shana.informed.interchange': ['iif'],
        'application/vnd.shana.informed.package': ['ipk'],
        'application/vnd.simtech-mindmapper': ['twd', 'twds'],
        'application/vnd.smaf': ['mmf'],
        'application/vnd.smart.teacher': ['teacher'],
        'application/vnd.solent.sdkm+xml': ['sdkm', 'sdkd'],
        'application/vnd.spotfire.dxp': ['dxp'],
        'application/vnd.spotfire.sfs': ['sfs'],
        'application/vnd.stardivision.calc': ['sdc'],
        'application/vnd.stardivision.draw': ['sda'],
        'application/vnd.stardivision.impress': ['sdd'],
        'application/vnd.stardivision.math': ['smf'],
        'application/vnd.stardivision.writer': ['sdw', 'vor'],
        'application/vnd.stardivision.writer-global': ['sgl'],
        'application/vnd.stepmania.package': ['smzip'],
        'application/vnd.stepmania.stepchart': ['sm'],
        'application/vnd.sun.wadl+xml': ['wadl'],
        'application/vnd.sun.xml.calc': ['sxc'],
        'application/vnd.sun.xml.calc.template': ['stc'],
        'application/vnd.sun.xml.draw': ['sxd'],
        'application/vnd.sun.xml.draw.template': ['std'],
        'application/vnd.sun.xml.impress': ['sxi'],
        'application/vnd.sun.xml.impress.template': ['sti'],
        'application/vnd.sun.xml.math': ['sxm'],
        'application/vnd.sun.xml.writer': ['sxw'],
        'application/vnd.sun.xml.writer.global': ['sxg'],
        'application/vnd.sun.xml.writer.template': ['stw'],
        'application/vnd.sus-calendar': ['sus', 'susp'],
        'application/vnd.svd': ['svd'],
        'application/vnd.symbian.install': ['sis', 'sisx'],
        'application/vnd.syncml+xml': ['xsm'],
        'application/vnd.syncml.dm+wbxml': ['bdm'],
        'application/vnd.syncml.dm+xml': ['xdm'],
        'application/vnd.tao.intent-module-archive': ['tao'],
        'application/vnd.tcpdump.pcap': ['pcap', 'cap', 'dmp'],
        'application/vnd.tmobile-livetv': ['tmo'],
        'application/vnd.trid.tpt': ['tpt'],
        'application/vnd.triscape.mxs': ['mxs'],
        'application/vnd.trueapp': ['tra'],
        'application/vnd.ufdl': ['ufd', 'ufdl'],
        'application/vnd.uiq.theme': ['utz'],
        'application/vnd.umajin': ['umj'],
        'application/vnd.unity': ['unityweb'],
        'application/vnd.uoml+xml': ['uoml'],
        'application/vnd.vcx': ['vcx'],
        'application/vnd.visio': ['vsd', 'vst', 'vss', 'vsw'],
        'application/vnd.visionary': ['vis'],
        'application/vnd.vsf': ['vsf'],
        'application/vnd.wap.wbxml': ['wbxml'],
        'application/vnd.wap.wmlc': ['wmlc'],
        'application/vnd.wap.wmlscriptc': ['wmlsc'],
        'application/vnd.webturbo': ['wtb'],
        'application/vnd.wolfram.player': ['nbp'],
        'application/vnd.wordperfect': ['wpd'],
        'application/vnd.wqd': ['wqd'],
        'application/vnd.wt.stf': ['stf'],
        'application/vnd.xara': ['xar'],
        'application/vnd.xfdl': ['xfdl'],
        'application/vnd.yamaha.hv-dic': ['hvd'],
        'application/vnd.yamaha.hv-script': ['hvs'],
        'application/vnd.yamaha.hv-voice': ['hvp'],
        'application/vnd.yamaha.openscoreformat': ['osf'],
        'application/vnd.yamaha.openscoreformat.osfpvg+xml': ['osfpvg'],
        'application/vnd.yamaha.smaf-audio': ['saf'],
        'application/vnd.yamaha.smaf-phrase': ['spf'],
        'application/vnd.yellowriver-custom-menu': ['cmp'],
        'application/vnd.zul': ['zir', 'zirz'],
        'application/vnd.zzazz.deck+xml': ['zaz'],
        'application/voicexml+xml': ['vxml'],
        'application/wasm': ['wasm'],
        'application/widget': ['wgt'],
        'application/winhlp': ['hlp'],
        'application/wsdl+xml': ['wsdl'],
        'application/wspolicy+xml': ['wspolicy'],
        'application/x-7z-compressed': ['7z'],
        'application/x-abiword': ['abw'],
        'application/x-ace-compressed': ['ace'],
        'application/x-apple-diskimage': [],
        'application/x-arj': ['arj'],
        'application/x-authorware-bin': ['aab', 'x32', 'u32', 'vox'],
        'application/x-authorware-map': ['aam'],
        'application/x-authorware-seg': ['aas'],
        'application/x-bcpio': ['bcpio'],
        'application/x-bdoc': [],
        'application/x-bittorrent': ['torrent'],
        'application/x-blorb': ['blb', 'blorb'],
        'application/x-bzip': ['bz'],
        'application/x-bzip2': ['bz2', 'boz'],
        'application/x-cbr': ['cbr', 'cba', 'cbt', 'cbz', 'cb7'],
        'application/x-cdlink': ['vcd'],
        'application/x-cfs-compressed': ['cfs'],
        'application/x-chat': ['chat'],
        'application/x-chess-pgn': ['pgn'],
        'application/x-chrome-extension': ['crx'],
        'application/x-cocoa': ['cco'],
        'application/x-conference': ['nsc'],
        'application/x-cpio': ['cpio'],
        'application/x-csh': ['csh'],
        'application/x-debian-package': ['udeb'],
        'application/x-dgc-compressed': ['dgc'],
        'application/x-director': [
          'dir',
          'dcr',
          'dxr',
          'cst',
          'cct',
          'cxt',
          'w3d',
          'fgd',
          'swa',
        ],
        'application/x-doom': ['wad'],
        'application/x-dtbncx+xml': ['ncx'],
        'application/x-dtbook+xml': ['dtb'],
        'application/x-dtbresource+xml': ['res'],
        'application/x-dvi': ['dvi'],
        'application/x-envoy': ['evy'],
        'application/x-eva': ['eva'],
        'application/x-font-bdf': ['bdf'],
        'application/x-font-ghostscript': ['gsf'],
        'application/x-font-linux-psf': ['psf'],
        'application/x-font-pcf': ['pcf'],
        'application/x-font-snf': ['snf'],
        'application/x-font-type1': ['pfa', 'pfb', 'pfm', 'afm'],
        'application/x-freearc': ['arc'],
        'application/x-futuresplash': ['spl'],
        'application/x-gca-compressed': ['gca'],
        'application/x-glulx': ['ulx'],
        'application/x-gnumeric': ['gnumeric'],
        'application/x-gramps-xml': ['gramps'],
        'application/x-gtar': ['gtar'],
        'application/x-hdf': ['hdf'],
        'application/x-httpd-php': ['php'],
        'application/x-install-instructions': ['install'],
        'application/x-iso9660-image': [],
        'application/x-java-archive-diff': ['jardiff'],
        'application/x-java-jnlp-file': ['jnlp'],
        'application/x-latex': ['latex'],
        'application/x-lua-bytecode': ['luac'],
        'application/x-lzh-compressed': ['lzh', 'lha'],
        'application/x-makeself': ['run'],
        'application/x-mie': ['mie'],
        'application/x-mobipocket-ebook': ['prc', 'mobi'],
        'application/x-ms-application': ['application'],
        'application/x-ms-shortcut': ['lnk'],
        'application/x-ms-wmd': ['wmd'],
        'application/x-ms-wmz': ['wmz'],
        'application/x-ms-xbap': ['xbap'],
        'application/x-msaccess': ['mdb'],
        'application/x-msbinder': ['obd'],
        'application/x-mscardfile': ['crd'],
        'application/x-msclip': ['clp'],
        'application/x-msdos-program': [],
        'application/x-msdownload': ['com', 'bat'],
        'application/x-msmediaview': ['mvb', 'm13', 'm14'],
        'application/x-msmetafile': ['wmf', 'emf', 'emz'],
        'application/x-msmoney': ['mny'],
        'application/x-mspublisher': ['pub'],
        'application/x-msschedule': ['scd'],
        'application/x-msterminal': ['trm'],
        'application/x-mswrite': ['wri'],
        'application/x-netcdf': ['nc', 'cdf'],
        'application/x-ns-proxy-autoconfig': ['pac'],
        'application/x-nzb': ['nzb'],
        'application/x-perl': ['pl', 'pm'],
        'application/x-pilot': [],
        'application/x-pkcs12': ['p12', 'pfx'],
        'application/x-pkcs7-certificates': ['p7b', 'spc'],
        'application/x-pkcs7-certreqresp': ['p7r'],
        'application/x-rar-compressed': ['rar'],
        'application/x-redhat-package-manager': ['rpm'],
        'application/x-research-info-systems': ['ris'],
        'application/x-sea': ['sea'],
        'application/x-sh': ['sh'],
        'application/x-shar': ['shar'],
        'application/x-shockwave-flash': ['swf'],
        'application/x-silverlight-app': ['xap'],
        'application/x-sql': ['sql'],
        'application/x-stuffit': ['sit'],
        'application/x-stuffitx': ['sitx'],
        'application/x-subrip': ['srt'],
        'application/x-sv4cpio': ['sv4cpio'],
        'application/x-sv4crc': ['sv4crc'],
        'application/x-t3vm-image': ['t3'],
        'application/x-tads': ['gam'],
        'application/x-tar': ['tar'],
        'application/x-tcl': ['tcl', 'tk'],
        'application/x-tex': ['tex'],
        'application/x-tex-tfm': ['tfm'],
        'application/x-texinfo': ['texinfo', 'texi'],
        'application/x-tgif': ['obj'],
        'application/x-ustar': ['ustar'],
        'application/x-virtualbox-hdd': ['hdd'],
        'application/x-virtualbox-ova': ['ova'],
        'application/x-virtualbox-ovf': ['ovf'],
        'application/x-virtualbox-vbox': ['vbox'],
        'application/x-virtualbox-vbox-extpack': ['vbox-extpack'],
        'application/x-virtualbox-vdi': ['vdi'],
        'application/x-virtualbox-vhd': ['vhd'],
        'application/x-virtualbox-vmdk': ['vmdk'],
        'application/x-wais-source': ['src'],
        'application/x-web-app-manifest+json': ['webapp'],
        'application/x-x509-ca-cert': ['der', 'crt', 'pem'],
        'application/x-xfig': ['fig'],
        'application/x-xliff+xml': ['xlf'],
        'application/x-xpinstall': ['xpi'],
        'application/x-xz': ['xz'],
        'application/x-zmachine': [
          'z1',
          'z2',
          'z3',
          'z4',
          'z5',
          'z6',
          'z7',
          'z8',
        ],
        'application/xaml+xml': ['xaml'],
        'application/xcap-diff+xml': ['xdf'],
        'application/xenc+xml': ['xenc'],
        'application/xhtml+xml': ['xhtml', 'xht'],
        'application/xml': ['xml', 'xsl', 'xsd', 'rng'],
        'application/xml-dtd': ['dtd'],
        'application/xop+xml': ['xop'],
        'application/xproc+xml': ['xpl'],
        'application/xslt+xml': ['xslt'],
        'application/xspf+xml': ['xspf'],
        'application/xv+xml': ['mxml', 'xhvml', 'xvml', 'xvm'],
        'application/yang': ['yang'],
        'application/yin+xml': ['yin'],
        'application/zip': ['zip'],
        'audio/3gpp': [],
        'audio/adpcm': ['adp'],
        'audio/basic': ['au', 'snd'],
        'audio/midi': ['mid', 'midi', 'kar', 'rmi'],
        'audio/mp3': [],
        'audio/mp4': ['m4a', 'mp4a'],
        'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
        'audio/ogg': ['oga', 'ogg', 'spx'],
        'audio/s3m': ['s3m'],
        'audio/silk': ['sil'],
        'audio/vnd.dece.audio': ['uva', 'uvva'],
        'audio/vnd.digital-winds': ['eol'],
        'audio/vnd.dra': ['dra'],
        'audio/vnd.dts': ['dts'],
        'audio/vnd.dts.hd': ['dtshd'],
        'audio/vnd.lucent.voice': ['lvp'],
        'audio/vnd.ms-playready.media.pya': ['pya'],
        'audio/vnd.nuera.ecelp4800': ['ecelp4800'],
        'audio/vnd.nuera.ecelp7470': ['ecelp7470'],
        'audio/vnd.nuera.ecelp9600': ['ecelp9600'],
        'audio/vnd.rip': ['rip'],
        'audio/wav': ['wav'],
        'audio/wave': [],
        'audio/webm': ['weba'],
        'audio/x-aac': ['aac'],
        'audio/x-aiff': ['aif', 'aiff', 'aifc'],
        'audio/x-caf': ['caf'],
        'audio/x-flac': ['flac'],
        'audio/x-m4a': [],
        'audio/x-matroska': ['mka'],
        'audio/x-mpegurl': ['m3u'],
        'audio/x-ms-wax': ['wax'],
        'audio/x-ms-wma': ['wma'],
        'audio/x-pn-realaudio': ['ram', 'ra'],
        'audio/x-pn-realaudio-plugin': ['rmp'],
        'audio/x-realaudio': [],
        'audio/x-wav': [],
        'audio/xm': ['xm'],
        'chemical/x-cdx': ['cdx'],
        'chemical/x-cif': ['cif'],
        'chemical/x-cmdf': ['cmdf'],
        'chemical/x-cml': ['cml'],
        'chemical/x-csml': ['csml'],
        'chemical/x-xyz': ['xyz'],
        'font/collection': ['ttc'],
        'font/otf': ['otf'],
        'font/ttf': ['ttf'],
        'font/woff': ['woff'],
        'font/woff2': ['woff2'],
        'image/apng': ['apng'],
        'image/bmp': ['bmp'],
        'image/cgm': ['cgm'],
        'image/g3fax': ['g3'],
        'image/gif': ['gif'],
        'image/ief': ['ief'],
        'image/jp2': ['jp2', 'jpg2'],
        'image/jpeg': ['jpeg', 'jpg', 'jpe'],
        'image/jpm': ['jpm'],
        'image/jpx': ['jpx', 'jpf'],
        'image/ktx': ['ktx'],
        'image/png': ['png'],
        'image/prs.btif': ['btif'],
        'image/sgi': ['sgi'],
        'image/svg+xml': ['svg', 'svgz'],
        'image/tiff': ['tiff', 'tif'],
        'image/vnd.adobe.photoshop': ['psd'],
        'image/vnd.dece.graphic': ['uvi', 'uvvi', 'uvg', 'uvvg'],
        'image/vnd.djvu': ['djvu', 'djv'],
        'image/vnd.dvb.subtitle': [],
        'image/vnd.dwg': ['dwg'],
        'image/vnd.dxf': ['dxf'],
        'image/vnd.fastbidsheet': ['fbs'],
        'image/vnd.fpx': ['fpx'],
        'image/vnd.fst': ['fst'],
        'image/vnd.fujixerox.edmics-mmr': ['mmr'],
        'image/vnd.fujixerox.edmics-rlc': ['rlc'],
        'image/vnd.ms-modi': ['mdi'],
        'image/vnd.ms-photo': ['wdp'],
        'image/vnd.net-fpx': ['npx'],
        'image/vnd.wap.wbmp': ['wbmp'],
        'image/vnd.xiff': ['xif'],
        'image/webp': ['webp'],
        'image/x-3ds': ['3ds'],
        'image/x-cmu-raster': ['ras'],
        'image/x-cmx': ['cmx'],
        'image/x-freehand': ['fh', 'fhc', 'fh4', 'fh5', 'fh7'],
        'image/x-icon': ['ico'],
        'image/x-jng': ['jng'],
        'image/x-mrsid-image': ['sid'],
        'image/x-ms-bmp': [],
        'image/x-pcx': ['pcx'],
        'image/x-pict': ['pic', 'pct'],
        'image/x-portable-anymap': ['pnm'],
        'image/x-portable-bitmap': ['pbm'],
        'image/x-portable-graymap': ['pgm'],
        'image/x-portable-pixmap': ['ppm'],
        'image/x-rgb': ['rgb'],
        'image/x-tga': ['tga'],
        'image/x-xbitmap': ['xbm'],
        'image/x-xpixmap': ['xpm'],
        'image/x-xwindowdump': ['xwd'],
        'message/rfc822': ['eml', 'mime'],
        'model/gltf+json': ['gltf'],
        'model/gltf-binary': ['glb'],
        'model/iges': ['igs', 'iges'],
        'model/mesh': ['msh', 'mesh', 'silo'],
        'model/vnd.collada+xml': ['dae'],
        'model/vnd.dwf': ['dwf'],
        'model/vnd.gdl': ['gdl'],
        'model/vnd.gtw': ['gtw'],
        'model/vnd.mts': ['mts'],
        'model/vnd.vtu': ['vtu'],
        'model/vrml': ['wrl', 'vrml'],
        'model/x3d+binary': ['x3db', 'x3dbz'],
        'model/x3d+vrml': ['x3dv', 'x3dvz'],
        'model/x3d+xml': ['x3d', 'x3dz'],
        'text/cache-manifest': ['appcache', 'manifest'],
        'text/calendar': ['ics', 'ifb'],
        'text/coffeescript': ['coffee', 'litcoffee'],
        'text/css': ['css'],
        'text/csv': ['csv'],
        'text/hjson': ['hjson'],
        'text/html': ['html', 'htm', 'shtml'],
        'text/jade': ['jade'],
        'text/jsx': ['jsx'],
        'text/less': ['less'],
        'text/markdown': ['markdown', 'md'],
        'text/mathml': ['mml'],
        'text/n3': ['n3'],
        'text/plain': [
          'txt',
          'text',
          'conf',
          'def',
          'list',
          'log',
          'in',
          'ini',
        ],
        'text/prs.lines.tag': ['dsc'],
        'text/richtext': ['rtx'],
        'text/rtf': [],
        'text/sgml': ['sgml', 'sgm'],
        'text/slim': ['slim', 'slm'],
        'text/stylus': ['stylus', 'styl'],
        'text/tab-separated-values': ['tsv'],
        'text/troff': ['t', 'tr', 'roff', 'man', 'me', 'ms'],
        'text/turtle': ['ttl'],
        'text/uri-list': ['uri', 'uris', 'urls'],
        'text/vcard': ['vcard'],
        'text/vnd.curl': ['curl'],
        'text/vnd.curl.dcurl': ['dcurl'],
        'text/vnd.curl.mcurl': ['mcurl'],
        'text/vnd.curl.scurl': ['scurl'],
        'text/vnd.dvb.subtitle': ['sub'],
        'text/vnd.fly': ['fly'],
        'text/vnd.fmi.flexstor': ['flx'],
        'text/vnd.graphviz': ['gv'],
        'text/vnd.in3d.3dml': ['3dml'],
        'text/vnd.in3d.spot': ['spot'],
        'text/vnd.sun.j2me.app-descriptor': ['jad'],
        'text/vnd.wap.wml': ['wml'],
        'text/vnd.wap.wmlscript': ['wmls'],
        'text/vtt': ['vtt'],
        'text/x-asm': ['s', 'asm'],
        'text/x-c': ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic'],
        'text/x-component': ['htc'],
        'text/x-fortran': ['f', 'for', 'f77', 'f90'],
        'text/x-handlebars-template': ['hbs'],
        'text/x-java-source': ['java'],
        'text/x-lua': ['lua'],
        'text/x-markdown': ['mkd'],
        'text/x-nfo': ['nfo'],
        'text/x-opml': ['opml'],
        'text/x-org': [],
        'text/x-pascal': ['p', 'pas'],
        'text/x-processing': ['pde'],
        'text/x-sass': ['sass'],
        'text/x-scss': ['scss'],
        'text/x-setext': ['etx'],
        'text/x-sfv': ['sfv'],
        'text/x-suse-ymp': ['ymp'],
        'text/x-uuencode': ['uu'],
        'text/x-vcalendar': ['vcs'],
        'text/x-vcard': ['vcf'],
        'text/xml': [],
        'text/yaml': ['yaml', 'yml'],
        'video/3gpp': ['3gp', '3gpp'],
        'video/3gpp2': ['3g2'],
        'video/h261': ['h261'],
        'video/h263': ['h263'],
        'video/h264': ['h264'],
        'video/jpeg': ['jpgv'],
        'video/jpm': ['jpgm'],
        'video/mj2': ['mj2', 'mjp2'],
        'video/mp2t': ['ts'],
        'video/mp4': ['mp4', 'mp4v', 'mpg4'],
        'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
        'video/ogg': ['ogv'],
        'video/quicktime': ['qt', 'mov'],
        'video/vnd.dece.hd': ['uvh', 'uvvh'],
        'video/vnd.dece.mobile': ['uvm', 'uvvm'],
        'video/vnd.dece.pd': ['uvp', 'uvvp'],
        'video/vnd.dece.sd': ['uvs', 'uvvs'],
        'video/vnd.dece.video': ['uvv', 'uvvv'],
        'video/vnd.dvb.file': ['dvb'],
        'video/vnd.fvt': ['fvt'],
        'video/vnd.mpegurl': ['mxu', 'm4u'],
        'video/vnd.ms-playready.media.pyv': ['pyv'],
        'video/vnd.uvvu.mp4': ['uvu', 'uvvu'],
        'video/vnd.vivo': ['viv'],
        'video/webm': ['webm'],
        'video/x-f4v': ['f4v'],
        'video/x-fli': ['fli'],
        'video/x-flv': ['flv'],
        'video/x-m4v': ['m4v'],
        'video/x-matroska': ['mkv', 'mk3d', 'mks'],
        'video/x-mng': ['mng'],
        'video/x-ms-asf': ['asf', 'asx'],
        'video/x-ms-vob': ['vob'],
        'video/x-ms-wm': ['wm'],
        'video/x-ms-wmv': ['wmv'],
        'video/x-ms-wmx': ['wmx'],
        'video/x-ms-wvx': ['wvx'],
        'video/x-msvideo': ['avi'],
        'video/x-sgi-movie': ['movie'],
        'video/x-smv': ['smv'],
        'x-conference/x-cooltalk': ['ice'],
      }
    },
    function (e, i, a) {
      'use strict'
      var n = a(24),
        o = a(25),
        t = {
          brackets: function (e) {
            return e + '[]'
          },
          indices: function (e, i) {
            return e + '[' + i + ']'
          },
          repeat: function (e) {
            return e
          },
        },
        s = Date.prototype.toISOString,
        c = {
          delimiter: '&',
          encode: !0,
          encoder: n.encode,
          encodeValuesOnly: !1,
          serializeDate: function (e) {
            return s.call(e)
          },
          skipNulls: !1,
          strictNullHandling: !1,
        },
        r = function e(i, a, o, t, s, r, p, l, u, d, m, x) {
          var f = i
          if ('function' == typeof p) f = p(a, f)
          else if (f instanceof Date) f = d(f)
          else if (null === f) {
            if (t) return r && !x ? r(a, c.encoder) : a
            f = ''
          }
          if (
            'string' == typeof f ||
            'number' == typeof f ||
            'boolean' == typeof f ||
            n.isBuffer(f)
          )
            return r
              ? [m(x ? a : r(a, c.encoder)) + '=' + m(r(f, c.encoder))]
              : [m(a) + '=' + m(String(f))]
          var v,
            h = []
          if (void 0 === f) return h
          if (Array.isArray(p)) v = p
          else {
            var b = Object.keys(f)
            v = l ? b.sort(l) : b
          }
          for (var g = 0; g < v.length; ++g) {
            var y = v[g]
            ;(s && null === f[y]) ||
              (h = Array.isArray(f)
                ? h.concat(e(f[y], o(a, y), o, t, s, r, p, l, u, d, m, x))
                : h.concat(
                    e(
                      f[y],
                      a + (u ? '.' + y : '[' + y + ']'),
                      o,
                      t,
                      s,
                      r,
                      p,
                      l,
                      u,
                      d,
                      m,
                      x
                    )
                  ))
          }
          return h
        }
      e.exports = function (e, i) {
        var a = e,
          s = i ? n.assign({}, i) : {}
        if (
          null !== s.encoder &&
          void 0 !== s.encoder &&
          'function' != typeof s.encoder
        )
          throw new TypeError('Encoder has to be a function.')
        var p = void 0 === s.delimiter ? c.delimiter : s.delimiter,
          l =
            'boolean' == typeof s.strictNullHandling
              ? s.strictNullHandling
              : c.strictNullHandling,
          u = 'boolean' == typeof s.skipNulls ? s.skipNulls : c.skipNulls,
          d = 'boolean' == typeof s.encode ? s.encode : c.encode,
          m = 'function' == typeof s.encoder ? s.encoder : c.encoder,
          x = 'function' == typeof s.sort ? s.sort : null,
          f = void 0 !== s.allowDots && s.allowDots,
          v =
            'function' == typeof s.serializeDate
              ? s.serializeDate
              : c.serializeDate,
          h =
            'boolean' == typeof s.encodeValuesOnly
              ? s.encodeValuesOnly
              : c.encodeValuesOnly
        if (void 0 === s.format) s.format = o.default
        else if (!Object.prototype.hasOwnProperty.call(o.formatters, s.format))
          throw new TypeError('Unknown format option provided.')
        var b,
          g,
          y = o.formatters[s.format]
        'function' == typeof s.filter
          ? (a = (g = s.filter)('', a))
          : Array.isArray(s.filter) && (b = g = s.filter)
        var w,
          k = []
        if ('object' != typeof a || null === a) return ''
        w =
          s.arrayFormat in t
            ? s.arrayFormat
            : 'indices' in s
            ? s.indices
              ? 'indices'
              : 'repeat'
            : 'indices'
        var _ = t[w]
        b || (b = Object.keys(a)), x && b.sort(x)
        for (var j = 0; j < b.length; ++j) {
          var C = b[j]
          ;(u && null === a[C]) ||
            (k = k.concat(r(a[C], C, _, l, u, d ? m : null, g, x, f, v, y, h)))
        }
        var z = k.join(p),
          E = !0 === s.addQueryPrefix ? '?' : ''
        return z.length > 0 ? E + z : ''
      }
    },
    function (e, i, a) {
      'use strict'
      var n = a(24),
        o = Object.prototype.hasOwnProperty,
        t = {
          allowDots: !1,
          allowPrototypes: !1,
          arrayLimit: 20,
          decoder: n.decode,
          delimiter: '&',
          depth: 5,
          parameterLimit: 1e3,
          plainObjects: !1,
          strictNullHandling: !1,
        },
        s = function (e, i, a) {
          if (e) {
            var n = a.allowDots ? e.replace(/\.([^.[]+)/g, '[$1]') : e,
              t = /(\[[^[\]]*])/g,
              s = /(\[[^[\]]*])/.exec(n),
              c = s ? n.slice(0, s.index) : n,
              r = []
            if (c) {
              if (
                !a.plainObjects &&
                o.call(Object.prototype, c) &&
                !a.allowPrototypes
              )
                return
              r.push(c)
            }
            for (var p = 0; null !== (s = t.exec(n)) && p < a.depth; ) {
              if (
                ((p += 1),
                !a.plainObjects &&
                  o.call(Object.prototype, s[1].slice(1, -1)) &&
                  !a.allowPrototypes)
              )
                return
              r.push(s[1])
            }
            return (
              s && r.push('[' + n.slice(s.index) + ']'),
              (function (e, i, a) {
                for (var n = i, o = e.length - 1; o >= 0; --o) {
                  var t,
                    s = e[o]
                  if ('[]' === s) t = (t = []).concat(n)
                  else {
                    t = a.plainObjects ? Object.create(null) : {}
                    var c =
                        '[' === s.charAt(0) && ']' === s.charAt(s.length - 1)
                          ? s.slice(1, -1)
                          : s,
                      r = parseInt(c, 10)
                    !isNaN(r) &&
                    s !== c &&
                    String(r) === c &&
                    r >= 0 &&
                    a.parseArrays &&
                    r <= a.arrayLimit
                      ? ((t = [])[r] = n)
                      : (t[c] = n)
                  }
                  n = t
                }
                return n
              })(r, i, a)
            )
          }
        }
      e.exports = function (e, i) {
        var a = i ? n.assign({}, i) : {}
        if (
          null !== a.decoder &&
          void 0 !== a.decoder &&
          'function' != typeof a.decoder
        )
          throw new TypeError('Decoder has to be a function.')
        if (
          ((a.ignoreQueryPrefix = !0 === a.ignoreQueryPrefix),
          (a.delimiter =
            'string' == typeof a.delimiter || n.isRegExp(a.delimiter)
              ? a.delimiter
              : t.delimiter),
          (a.depth = 'number' == typeof a.depth ? a.depth : t.depth),
          (a.arrayLimit =
            'number' == typeof a.arrayLimit ? a.arrayLimit : t.arrayLimit),
          (a.parseArrays = !1 !== a.parseArrays),
          (a.decoder = 'function' == typeof a.decoder ? a.decoder : t.decoder),
          (a.allowDots =
            'boolean' == typeof a.allowDots ? a.allowDots : t.allowDots),
          (a.plainObjects =
            'boolean' == typeof a.plainObjects
              ? a.plainObjects
              : t.plainObjects),
          (a.allowPrototypes =
            'boolean' == typeof a.allowPrototypes
              ? a.allowPrototypes
              : t.allowPrototypes),
          (a.parameterLimit =
            'number' == typeof a.parameterLimit
              ? a.parameterLimit
              : t.parameterLimit),
          (a.strictNullHandling =
            'boolean' == typeof a.strictNullHandling
              ? a.strictNullHandling
              : t.strictNullHandling),
          '' === e || null === e || void 0 === e)
        )
          return a.plainObjects ? Object.create(null) : {}
        for (
          var c =
              'string' == typeof e
                ? (function (e, i) {
                    for (
                      var a = {},
                        n = i.ignoreQueryPrefix ? e.replace(/^\?/, '') : e,
                        s =
                          i.parameterLimit === 1 / 0
                            ? void 0
                            : i.parameterLimit,
                        c = n.split(i.delimiter, s),
                        r = 0;
                      r < c.length;
                      ++r
                    ) {
                      var p,
                        l,
                        u = c[r],
                        d = u.indexOf(']='),
                        m = -1 === d ? u.indexOf('=') : d + 1
                      ;-1 === m
                        ? ((p = i.decoder(u, t.decoder)),
                          (l = i.strictNullHandling ? null : ''))
                        : ((p = i.decoder(u.slice(0, m), t.decoder)),
                          (l = i.decoder(u.slice(m + 1), t.decoder))),
                        o.call(a, p)
                          ? (a[p] = [].concat(a[p]).concat(l))
                          : (a[p] = l)
                    }
                    return a
                  })(e, a)
                : e,
            r = a.plainObjects ? Object.create(null) : {},
            p = Object.keys(c),
            l = 0;
          l < p.length;
          ++l
        ) {
          var u = p[l],
            d = s(u, c[u], a)
          r = n.merge(r, d, a)
        }
        return n.compact(r)
      }
    },
    function (e) {
      e.exports = {
        _args: [
          ['superagent@3.8.3', '/Users/nikiesfandiari/Desktop/five/FiveFeed'],
        ],
        _from: 'superagent@3.8.3',
        _id: 'superagent@3.8.3',
        _inBundle: !1,
        _integrity:
          'sha512-GLQtLMCoEIK4eDv6OGtkOoSMt3D+oq0y3dsxMuYuDvaNUvuT8eFBuLmfR0iYYzHC1e8hpzC6ZsxbuP6DIalMFA==',
        _location: '/superagent',
        _phantomChildren: {},
        _requested: {
          type: 'version',
          registry: !0,
          raw: 'superagent@3.8.3',
          name: 'superagent',
          escapedName: 'superagent',
          rawSpec: '3.8.3',
          saveSpec: null,
          fetchSpec: '3.8.3',
        },
        _requiredBy: ['/faunadb'],
        _resolved:
          'https://registry.npmjs.org/superagent/-/superagent-3.8.3.tgz',
        _spec: '3.8.3',
        _where: '/Users/nikiesfandiari/Desktop/five/FiveFeed',
        author: { name: 'TJ Holowaychuk', email: 'tj@vision-media.ca' },
        browser: {
          './lib/node/index.js': './lib/client.js',
          './test/support/server.js': './test/support/blank.js',
        },
        bugs: { url: 'https://github.com/visionmedia/superagent/issues' },
        component: { scripts: { superagent: 'lib/client.js' } },
        contributors: [
          { name: 'Kornel Lesiński', email: 'kornel@geekhood.net' },
          { name: 'Peter Lyons', email: 'pete@peterlyons.com' },
          { name: 'Hunter Loftis', email: 'hunter@hunterloftis.com' },
        ],
        dependencies: {
          'component-emitter': '^1.2.0',
          cookiejar: '^2.1.0',
          debug: '^3.1.0',
          extend: '^3.0.0',
          'form-data': '^2.3.1',
          formidable: '^1.2.0',
          methods: '^1.1.1',
          mime: '^1.4.1',
          qs: '^6.5.1',
          'readable-stream': '^2.3.5',
        },
        description:
          'elegant & feature rich browser / node HTTP with a fluent API',
        devDependencies: {
          Base64: '^1.0.1',
          'basic-auth-connect': '^1.0.0',
          'body-parser': '^1.18.2',
          browserify: '^14.1.0',
          'cookie-parser': '^1.4.3',
          express: '^4.16.3',
          'express-session': '^1.15.6',
          marked: '0.3.12',
          mocha: '^3.5.3',
          multer: '^1.3.0',
          should: '^11.2.0',
          'should-http': '^0.1.1',
          zuul: '^3.11.1',
        },
        engines: { node: '>= 4.0' },
        homepage: 'https://github.com/visionmedia/superagent#readme',
        keywords: ['http', 'ajax', 'request', 'agent'],
        license: 'MIT',
        main: './lib/node/index.js',
        name: 'superagent',
        repository: {
          type: 'git',
          url: 'git://github.com/visionmedia/superagent.git',
        },
        scripts: { prepare: 'make all', test: 'make test' },
        version: '3.8.3',
      }
    },
    function (e, i, a) {
      'use strict'
      var n = a(76)
      function o(e) {
        if (e)
          return (function (e) {
            for (var i in o.prototype) e[i] = o.prototype[i]
            return e
          })(e)
      }
      ;(e.exports = o),
        (o.prototype.clearTimeout = function () {
          return (
            clearTimeout(this._timer),
            clearTimeout(this._responseTimeoutTimer),
            delete this._timer,
            delete this._responseTimeoutTimer,
            this
          )
        }),
        (o.prototype.parse = function (e) {
          return (this._parser = e), this
        }),
        (o.prototype.responseType = function (e) {
          return (this._responseType = e), this
        }),
        (o.prototype.serialize = function (e) {
          return (this._serializer = e), this
        }),
        (o.prototype.timeout = function (e) {
          if (!e || 'object' != typeof e)
            return (this._timeout = e), (this._responseTimeout = 0), this
          for (var i in e)
            switch (i) {
              case 'deadline':
                this._timeout = e.deadline
                break
              case 'response':
                this._responseTimeout = e.response
                break
              default:
                console.warn('Unknown timeout option', i)
            }
          return this
        }),
        (o.prototype.retry = function (e, i) {
          return (
            (0 !== arguments.length && !0 !== e) || (e = 1),
            e <= 0 && (e = 0),
            (this._maxRetries = e),
            (this._retries = 0),
            (this._retryCallback = i),
            this
          )
        })
      var t = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT']
      ;(o.prototype._shouldRetry = function (e, i) {
        if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1
        if (this._retryCallback)
          try {
            var a = this._retryCallback(e, i)
            if (!0 === a) return !0
            if (!1 === a) return !1
          } catch (e) {
            console.error(e)
          }
        if (i && i.status && i.status >= 500 && 501 != i.status) return !0
        if (e) {
          if (e.code && ~t.indexOf(e.code)) return !0
          if (e.timeout && 'ECONNABORTED' == e.code) return !0
          if (e.crossDomain) return !0
        }
        return !1
      }),
        (o.prototype._retry = function () {
          return (
            this.clearTimeout(),
            this.req && ((this.req = null), (this.req = this.request())),
            (this._aborted = !1),
            (this.timedout = !1),
            this._end()
          )
        }),
        (o.prototype.then = function (e, i) {
          if (!this._fullfilledPromise) {
            var a = this
            this._endCalled &&
              console.warn(
                'Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises'
              ),
              (this._fullfilledPromise = new Promise(function (e, i) {
                a.end(function (a, n) {
                  a ? i(a) : e(n)
                })
              }))
          }
          return this._fullfilledPromise.then(e, i)
        }),
        (o.prototype.catch = function (e) {
          return this.then(void 0, e)
        }),
        (o.prototype.use = function (e) {
          return e(this), this
        }),
        (o.prototype.ok = function (e) {
          if ('function' != typeof e) throw Error('Callback required')
          return (this._okCallback = e), this
        }),
        (o.prototype._isResponseOK = function (e) {
          return (
            !!e &&
            (this._okCallback
              ? this._okCallback(e)
              : e.status >= 200 && e.status < 300)
          )
        }),
        (o.prototype.get = function (e) {
          return this._header[e.toLowerCase()]
        }),
        (o.prototype.getHeader = o.prototype.get),
        (o.prototype.set = function (e, i) {
          if (n(e)) {
            for (var a in e) this.set(a, e[a])
            return this
          }
          return (this._header[e.toLowerCase()] = i), (this.header[e] = i), this
        }),
        (o.prototype.unset = function (e) {
          return (
            delete this._header[e.toLowerCase()], delete this.header[e], this
          )
        }),
        (o.prototype.field = function (e, i) {
          if (null === e || void 0 === e)
            throw new Error('.field(name, val) name can not be empty')
          if (
            (this._data &&
              console.error(
                ".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"
              ),
            n(e))
          ) {
            for (var a in e) this.field(a, e[a])
            return this
          }
          if (Array.isArray(i)) {
            for (var o in i) this.field(e, i[o])
            return this
          }
          if (null === i || void 0 === i)
            throw new Error('.field(name, val) val can not be empty')
          return (
            'boolean' == typeof i && (i = '' + i),
            this._getFormData().append(e, i),
            this
          )
        }),
        (o.prototype.abort = function () {
          return this._aborted
            ? this
            : ((this._aborted = !0),
              this.xhr && this.xhr.abort(),
              this.req && this.req.abort(),
              this.clearTimeout(),
              this.emit('abort'),
              this)
        }),
        (o.prototype._auth = function (e, i, a, n) {
          switch (a.type) {
            case 'basic':
              this.set('Authorization', 'Basic ' + n(e + ':' + i))
              break
            case 'auto':
              ;(this.username = e), (this.password = i)
              break
            case 'bearer':
              this.set('Authorization', 'Bearer ' + e)
          }
          return this
        }),
        (o.prototype.withCredentials = function (e) {
          return void 0 == e && (e = !0), (this._withCredentials = e), this
        }),
        (o.prototype.redirects = function (e) {
          return (this._maxRedirects = e), this
        }),
        (o.prototype.maxResponseSize = function (e) {
          if ('number' != typeof e) throw TypeError('Invalid argument')
          return (this._maxResponseSize = e), this
        }),
        (o.prototype.toJSON = function () {
          return {
            method: this.method,
            url: this.url,
            data: this._data,
            headers: this._header,
          }
        }),
        (o.prototype.send = function (e) {
          var i = n(e),
            a = this._header['content-type']
          if (
            (this._formData &&
              console.error(
                ".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"
              ),
            i && !this._data)
          )
            Array.isArray(e)
              ? (this._data = [])
              : this._isHost(e) || (this._data = {})
          else if (e && this._data && this._isHost(this._data))
            throw Error("Can't merge these send calls")
          if (i && n(this._data)) for (var o in e) this._data[o] = e[o]
          else
            'string' == typeof e
              ? (a || this.type('form'),
                (a = this._header['content-type']),
                (this._data =
                  'application/x-www-form-urlencoded' == a
                    ? this._data
                      ? this._data + '&' + e
                      : e
                    : (this._data || '') + e))
              : (this._data = e)
          return !i || this._isHost(e) ? this : (a || this.type('json'), this)
        }),
        (o.prototype.sortQuery = function (e) {
          return (this._sort = void 0 === e || e), this
        }),
        (o.prototype._finalizeQueryString = function () {
          var e = this._query.join('&')
          if (
            (e && (this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + e),
            (this._query.length = 0),
            this._sort)
          ) {
            var i = this.url.indexOf('?')
            if (i >= 0) {
              var a = this.url.substring(i + 1).split('&')
              'function' == typeof this._sort ? a.sort(this._sort) : a.sort(),
                (this.url = this.url.substring(0, i) + '?' + a.join('&'))
            }
          }
        }),
        (o.prototype._appendQueryString = function () {
          console.trace('Unsupported')
        }),
        (o.prototype._timeoutError = function (e, i, a) {
          if (!this._aborted) {
            var n = new Error(e + i + 'ms exceeded')
            ;(n.timeout = i),
              (n.code = 'ECONNABORTED'),
              (n.errno = a),
              (this.timedout = !0),
              this.abort(),
              this.callback(n)
          }
        }),
        (o.prototype._setTimeouts = function () {
          var e = this
          this._timeout &&
            !this._timer &&
            (this._timer = setTimeout(function () {
              e._timeoutError('Timeout of ', e._timeout, 'ETIME')
            }, this._timeout)),
            this._responseTimeout &&
              !this._responseTimeoutTimer &&
              (this._responseTimeoutTimer = setTimeout(function () {
                e._timeoutError(
                  'Response timeout of ',
                  e._responseTimeout,
                  'ETIMEDOUT'
                )
              }, this._responseTimeout))
        })
    },
    function (e, i, a) {
      'use strict'
      e.exports = function (e) {
        return null !== e && 'object' == typeof e
      }
    },
    function (e, i, a) {
      'use strict'
      const n = a(8).CookieJar,
        o = a(8).CookieAccessInfo,
        t = a(2).parse,
        s = a(11),
        c = a(78)
      let r = a(21)
      function p(e) {
        if (!(this instanceof p)) return new p(e)
        c.call(this),
          (this.jar = new n()),
          e &&
            (e.ca && this.ca(e.ca),
            e.key && this.key(e.key),
            e.pfx && this.pfx(e.pfx),
            e.cert && this.cert(e.cert))
      }
      ;(e.exports = p),
        (p.prototype = Object.create(c.prototype)),
        (p.prototype._saveCookies = function (e) {
          const i = e.headers['set-cookie']
          i && this.jar.setCookies(i)
        }),
        (p.prototype._attachCookies = function (e) {
          const i = t(e.url),
            a = o(i.hostname, i.pathname, 'https:' == i.protocol),
            n = this.jar.getCookies(a).toValueString()
          e.cookies = n
        }),
        r.forEach((e) => {
          const i = e.toUpperCase()
          p.prototype[e] = function (e, a) {
            const n = new s.Request(i, e)
            return (
              n.on('response', this._saveCookies.bind(this)),
              n.on('redirect', this._saveCookies.bind(this)),
              n.on('redirect', this._attachCookies.bind(this, n)),
              this._attachCookies(n),
              this._setDefaults(n),
              a && n.end(a),
              n
            )
          }
        }),
        (p.prototype.del = p.prototype.delete)
    },
    function (e, i) {
      function a() {
        this._defaults = []
      }
      ;[
        'use',
        'on',
        'once',
        'set',
        'query',
        'type',
        'accept',
        'auth',
        'withCredentials',
        'sortQuery',
        'retry',
        'ok',
        'redirects',
        'timeout',
        'buffer',
        'serialize',
        'parse',
        'ca',
        'key',
        'pfx',
        'cert',
      ].forEach(function (e) {
        a.prototype[e] = function () {
          return this._defaults.push({ fn: e, arguments: arguments }), this
        }
      }),
        (a.prototype._setDefaults = function (e) {
          this._defaults.forEach(function (i) {
            e[i.fn].apply(e, i.arguments)
          })
        }),
        (e.exports = a)
    },
    function (e, i, a) {
      'use strict'
      ;(i['application/x-www-form-urlencoded'] = a(80)),
        (i['application/json'] = a(81)),
        (i.text = a(82))
      const n = a(83)
      ;(i['application/octet-stream'] = n),
        (i['application/pdf'] = n),
        (i.image = n)
    },
    function (e, i, a) {
      'use strict'
      const n = a(23)
      e.exports = function (e, i) {
        ;(e.text = ''),
          e.setEncoding('ascii'),
          e.on('data', (i) => {
            e.text += i
          }),
          e.on('end', () => {
            try {
              i(null, n.parse(e.text))
            } catch (e) {
              i(e)
            }
          })
      }
    },
    function (e, i, a) {
      'use strict'
      e.exports = function (e, i) {
        ;(e.text = ''),
          e.setEncoding('utf8'),
          e.on('data', (i) => {
            e.text += i
          }),
          e.on('end', () => {
            try {
              var a = e.text && JSON.parse(e.text)
            } catch (i) {
              var n = i
              ;(n.rawResponse = e.text || null), (n.statusCode = e.statusCode)
            } finally {
              i(n, a)
            }
          })
      }
    },
    function (e, i, a) {
      'use strict'
      e.exports = function (e, i) {
        ;(e.text = ''),
          e.setEncoding('utf8'),
          e.on('data', (i) => {
            e.text += i
          }),
          e.on('end', i)
      }
    },
    function (e, i, a) {
      'use strict'
      e.exports = (e, i) => {
        const a = []
        e.on('data', (e) => {
          a.push(e)
        }),
          e.on('end', () => {
            i(null, Buffer.concat(a))
          })
      }
    },
    function (e, i, a) {
      'use strict'
      e.exports = function (e) {
        if ('function' != typeof e)
          throw new Error(
            'Could not parse function signature for injection dependencies: Object is not a function'
          )
        if (!e.length) return []
        var i =
          /^()\(?([^)=]*)\)? *=>/.exec(e + '') ||
          /^[^(]+([^ \(]*) *\(([^\)]*)\)/.exec(e + '')
        if (!i)
          throw new Error(
            'Could not parse function signature for injection dependencies: ' +
              e
          )
        var a = i[2].replace(/\/\*[\S\s]*?\*\//g, ' ').replace(/\/\/.*/g, ' ')
        function n(e, i, a) {
          return (
            i +
            a
              .split(',')
              .map(function (e) {
                return e && e.trim()
              })
              .filter(Boolean)
              .join('@')
          )
        }
        return (a = (a = a.replace(/(\{)([^}]*)\}/g, n)).replace(
          /(\[)([^}]*)\]/g,
          n
        ))
          .split(',')
          .map(function (e) {
            return e && e.trim()
          })
          .map(function (e) {
            return '{' === e[0]
              ? e.substring(1).split('@')
              : '[' === e[0]
              ? { items: e.substring(1).split('@') }
              : e
          })
          .filter(Boolean)
      }
    },
    function (e, i, a) {
      e.exports = a(0).deprecate
    },
    function (e, i, a) {
      'use strict'
      ;(i.byteLength = function (e) {
        var i = p(e),
          a = i[0],
          n = i[1]
        return (3 * (a + n)) / 4 - n
      }),
        (i.toByteArray = function (e) {
          for (
            var i,
              a = p(e),
              n = a[0],
              s = a[1],
              c = new t(
                (function (e, i, a) {
                  return (3 * (i + a)) / 4 - a
                })(0, n, s)
              ),
              r = 0,
              l = s > 0 ? n - 4 : n,
              u = 0;
            u < l;
            u += 4
          )
            (i =
              (o[e.charCodeAt(u)] << 18) |
              (o[e.charCodeAt(u + 1)] << 12) |
              (o[e.charCodeAt(u + 2)] << 6) |
              o[e.charCodeAt(u + 3)]),
              (c[r++] = (i >> 16) & 255),
              (c[r++] = (i >> 8) & 255),
              (c[r++] = 255 & i)
          2 === s &&
            ((i = (o[e.charCodeAt(u)] << 2) | (o[e.charCodeAt(u + 1)] >> 4)),
            (c[r++] = 255 & i))
          1 === s &&
            ((i =
              (o[e.charCodeAt(u)] << 10) |
              (o[e.charCodeAt(u + 1)] << 4) |
              (o[e.charCodeAt(u + 2)] >> 2)),
            (c[r++] = (i >> 8) & 255),
            (c[r++] = 255 & i))
          return c
        }),
        (i.fromByteArray = function (e) {
          for (
            var i, a = e.length, o = a % 3, t = [], s = 0, c = a - o;
            s < c;
            s += 16383
          )
            t.push(u(e, s, s + 16383 > c ? c : s + 16383))
          1 === o
            ? ((i = e[a - 1]), t.push(n[i >> 2] + n[(i << 4) & 63] + '=='))
            : 2 === o &&
              ((i = (e[a - 2] << 8) + e[a - 1]),
              t.push(n[i >> 10] + n[(i >> 4) & 63] + n[(i << 2) & 63] + '='))
          return t.join('')
        })
      for (
        var n = [],
          o = [],
          t = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
          s =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          c = 0,
          r = s.length;
        c < r;
        ++c
      )
        (n[c] = s[c]), (o[s.charCodeAt(c)] = c)
      function p(e) {
        var i = e.length
        if (i % 4 > 0)
          throw new Error('Invalid string. Length must be a multiple of 4')
        var a = e.indexOf('=')
        return -1 === a && (a = i), [a, a === i ? 0 : 4 - (a % 4)]
      }
      function l(e) {
        return (
          n[(e >> 18) & 63] + n[(e >> 12) & 63] + n[(e >> 6) & 63] + n[63 & e]
        )
      }
      function u(e, i, a) {
        for (var n, o = [], t = i; t < a; t += 3)
          (n =
            ((e[t] << 16) & 16711680) +
            ((e[t + 1] << 8) & 65280) +
            (255 & e[t + 2])),
            o.push(l(n))
        return o.join('')
      }
      ;(o['-'.charCodeAt(0)] = 62), (o['_'.charCodeAt(0)] = 63)
    },
    function (e, i, a) {
      'use strict'
      e.exports = {
        applyDefaults: function (e, i) {
          var a = {}
          for (var n in e) {
            if (!(n in i)) throw new Error('No such option ' + n)
            a[n] = e[n]
          }
          for (var o in i) o in a || (a[o] = i[o])
          return a
        },
        removeUndefinedValues: function (e) {
          var i = {}
          for (var a in e) {
            var n = e[a]
            void 0 !== n && (i[a] = n)
          }
          return i
        },
      }
    },
    function (e, i, a) {
      'use strict'
      var n = a(27)
      function o(e) {
        var i = e.query,
          a = e.method,
          n = e.path,
          o = e.requestContent,
          s = e.responseHeaders,
          c = e.responseContent,
          r = e.statusCode,
          p = e.timeTaken,
          l = ''
        function u(e) {
          l += e
        }
        return (
          u(
            'Fauna ' +
              a +
              ' /' +
              n +
              (function (e) {
                if (null == e) return ''
                var i = Object.keys(e)
                if (0 === i.length) return ''
                return (
                  '?' +
                  i
                    .map(function (i) {
                      return i + '=' + e[i]
                    })
                    .join('&')
                )
              })(i) +
              '\n'
          ),
          null != o && u('  Request JSON: ' + t(o) + '\n'),
          u('  Response headers: ' + t(s) + '\n'),
          u('  Response JSON: ' + t(c) + '\n'),
          u('  Response (' + r + '): Network latency ' + p + 'ms\n'),
          l
        )
      }
      function t(e) {
        return (function (e) {
          return e.split('\n').join('\n  ')
        })(n.toJSON(e, !0))
      }
      e.exports = {
        logger: function (e) {
          return function (i) {
            return e(o(i))
          }
        },
        showRequestResult: o,
      }
    },
  ])
)
