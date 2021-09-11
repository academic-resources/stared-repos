"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-05-16
 * @modified
 *
 * @description
 * @augments
 * @example
 * @link
 *
 */

const log = console.log;


// generic
// parse url https://gist.github.com/jed/964849
const parseUrl = (
  function (a){
    return function(b,c,d){
      a.href=b;
      c={};
      for(d in a) {
        if(""+a[d]===a[d]) {
          c[d]=a[d];
        }
        return c
      }
    }
  }(document.createElement("a"))
)

// http://stackoverflow.com/questions/6139107
const selectElementContents = el => {
  const range = document.createRange()
  range.selectNodeContents(el)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

const clearSelection = () => {
  if (document.selection) {
    document.selection.empty()
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges()
  }
}

// copieur
const copieur = (src, button, a) => {
  button || (button = document.getElementById('copy-button'))
  a || (a = document.getElementById('copy-alert'))

  function whichTransitionEvent() {
    var t
    var el = document.createElement('fakeelement')
    var transitions = {
      transition:'transitionend',
      OTransition:'oTransitionEnd',
      MozTransition:'transitionend',
      WebkitTransition:'webkitTransitionEnd'
    }

    for (t in transitions) {
      if (el.style[t]) return transitions[t]
    }
  }
  var inPopState = false
  function removeAlert() {
    inPopState = false
    a.classList.remove('pop')
    button.classList.remove('pop')
  }

  var transition = whichTransitionEvent()
  if (transition) {
    a.addEventListener(transition, removeAlert)
  }

  return button.onclick = function copyOnClick() {
    if (!inPopState) {
      console.log('copyinge')
      inPopState = true
      a.classList.add('pop')
      button.classList.add('pop')
      if (!transition) {
        setTimeout(removeAlert, 1000)
      }
    }
    var success
    var focusedElement = document.activeElement
    selectElementContents(src)
    try {
      success = document.execCommand('copy')
    } catch (err) {
      success = false
    }
    clearSelection()
    if (!success) {
      prompt('Oldschool copy box for you', src.textContent)
    }
    setTimeout(function() { focusedElement.focus() }, 10);
  }
}


// adapted from npm/parse-curl
const scan = (str, pattern, callback) => {
  let result = ""
  while (str.length > 0) {
    const match = str.match(pattern)
    if (match) {
      result += str.slice(0, match.index)
      result += callback(match)
      str = str.slice(match.index + match[0].length)
    } else {
      result += str
      str = ""
    }
  }
}

const splitReg = /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/

const split = line => {
  if (line === undefined) line = ""

  const words = []
  let field = ""
  scan(line, splitReg, ([ raw, word, sq, dq, escape, garbage, seperator ]) => {
    if (garbage !== undefined) throw Error("Unmatched quote")
    field += word || (sq || dq || escape).replace(/\\(?=.)/, "")
    if (seperator !== undefined) {
      words.push(field)
      field = ""
    }
  })
  if (field) {
    words.push(field)
  }
  return words
}

const rewrite = baseArgs => baseArgs.reduce((args, a) => {
  if (a.indexOf('-X') === 0) {
    args.push('-X')
    args.push(a.slice(2))
  } else {
    args.push(a)
  }

  return args
}, [])

const matchUrl = /((^https?:\/\/)|(^(?:[0-9]{1,3}\.){3}[0-9]{1,3})|localhost)/
const addArg = (currentValue, arg) => currentValue
  ? currentValue +'&'+ arg
  : arg

const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase()
const forbidden = [
  'Accept-Charset',
  'Accept-Encoding',
  'Access-Control-Request-Headers',
  'Access-Control-Request-Method',
  'Connection',
  'Content-Length',
  'Cookie',
  'Cookie2',
  'Date',
  'DNT',
  'Expect',
  'Host',
  'Keep-Alive',
  'Origin',
  'Referer',
  'TE',
  'Trailer',
  'Transfer-Encoding',
  'Upgrade',
  'Via',
]

const parseCurl = (s, clean) => {
  if (0 != s.indexOf('curl ')) throw Error('Missing curl keyword')
  let out = { method: 'GET', headers: {} }
  let state = ''
  let urlParams = ''
  let fallbackUrl = ''
  let formString = ''
  rewrite(split(s)).forEach(arg => {
    switch (true) {
      case !out.url && matchUrl.test(arg):
        out.url = arg
        break

      case arg == '-A' || arg == '--user-agent':
        state = 'user-agent'
        break

      case arg == '-H' || arg == '--header':
        state = 'header'
        break

      case arg == '-F' || arg == '--form' || arg == '--form-data':
        state = 'form'
        break

      case arg == '--form-string':
        state = 'form-string'
        break

      case arg == '-d' || arg == '--data' || arg == '--data-ascii' || arg == '--data-binary':
        state = 'data'
        break

      case arg == '--data-urlencode':
        state = 'url'
        break

      case arg == '-u' || arg == '--user':
        state = 'user'
        break

      case arg == '-I' || arg == '--head':
        out.method = 'HEAD'
        break

      case arg == '-X' || arg == '--request':
        state = 'method'
        break

      case arg == '-b' || arg =='--cookie':
        state = 'cookie'
        break

      case arg == '--compressed':
        out.headers['Accept-Encoding'] || (out.headers['Accept-Encoding'] = 'deflate, gzip')
        break

      case !!arg:
        switch (state) {
          case 'header':
            const delimIndex = arg.indexOf(':')
            const headerKey = arg.slice(0, delimIndex)
              .split('-')
              .map(capitalize)
              .join('-')

            if (headerKey === 'Cookie') {
              out.credentials = 'include'
            } else {
              out.headers[headerKey] = arg.slice(delimIndex + 1)
                .trim()
            }
            state = ''
            break
          case 'user-agent':
            out.headers['User-Agent'] = arg
            state = ''
            break
          case 'url':
            urlParams = addArg(urlParams, arg)
            state = ''
            break
          case 'data':
          case 'data-binary':
            out.headers['Content-Type'] || (out.headers['Content-Type'] = 'application/x-www-form-urlencoded')
            out.body = state === 'data' ? addArg(out.body, arg) : out.body
            state = ''
            break
          case 'form-string':
            formString = arg
            break
          case 'form':
            out.headers['Content-Type'] || (out.headers['Content-Type'] = 'multipart/form-data')
            ;(out.formData || (out.formData = [])).push([
              arg.slice(0, arg.indexOf('=')),
              arg.slice(arg.indexOf('=') + 1),
            ])
            break
          case 'user':
            out.headers['Authorization'] = 'Basic '+ btoa(arg)
            state = ''
            break
          case 'method':
            out.method = arg
            state = ''
            break
          case 'cookie':
            out.headers['Set-Cookie'] = arg
            state = ''
            break
        }
        break
      default:
        fallbackUrl = arg
        break
    }
  })

  if (urlParams) {
    out.url = out.url + (parseUrl(out.url).search ? '&' : '?') + urlParams
  }

  const forbiddenKeys = forbidden
    .filter(key => key in out.headers)
    .map(key => { delete out.headers[key]; return key })

  if (forbiddenKeys.length) {
    const msg = forbiddenKeys.length > 1
      ? `${forbiddenKeys.join(', ')} are forbidden headers`
      : `${forbiddenKeys} is a forbidden header`
    console.log(`${msg} in fetch, so they are skipped (see https://fetch.spec.whatwg.org/#terminology-headers)`)
  }

  if (formString) {
    out.headers['Content-Type'] += '; boundary=' + formString
  }

  if (clean) {
    // http2 pseudo header
    delete out.headers.Authority
    delete out.headers.Scheme
    delete out.headers.Method
    delete out.headers.Path
    // automaticaly added
    delete out.headers['Accept-Language']
    delete out.headers['User-Agent' ]
  }

  if (out.body && out.method.toLowerCase() === 'get') {
    out.method = 'POST'
  }

  return out
}
// specific code
const _id = document.getElementById.bind(document)
const _textArea = _id('input')
const _result = _id('result')
const _clean = _id('clean')
const isNotEmpty = obj => obj && Object.keys(obj).length > 0
const isObj = obj => obj.constructor === Object || !obj.constructor
const _class = (className, text) => `<span class="${className}">${text}</span>`
const _quote = (className, text) =>
  `"<span class="${className}">${JSON.stringify(text).slice(1, -1)}</span>"`
const classes = [ 'keyword', 'key', 'value', 'url', 'op', 'var' ]


classes.forEach(key => {
  _class[key] = t => _class(key, t)
  _class[key].text = t => _quote(key, t)
})

const _base = _class.keyword('fetch')

/* options :
 - Extra comma
 - referer
 - cookies
 - User-Agent
 - Connection
 - Accept(s)
 - Cache-Control + Pragma
 - always quotes
 //
 * Features
 - highlight url and url options
 - set spacer
*/
const matchLegalChars = /^[a-zA-Z$_][$_a-zA-Z0-9]+$/
const spacer = '  ' // 2 spaces, you know it
const noCase = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
const VariableSymbol = Symbol('variable')
const formatOpts = (indent, opts) => '{\n'+ Object.keys(opts).sort(noCase)
  .map(key => {
    const rawVal = opts[key]
    if (!rawVal) return
    if (rawVal[VariableSymbol]) return _class.var(spacer + rawVal[VariableSymbol])
    const legalKey = matchLegalChars.test(key)
      ? _class.key(key)
      : _class.key.text(key)

    return `${indent}${legalKey}: ${isObj(rawVal)
      ? formatOpts(indent + spacer, rawVal)
      : _class.value.text(rawVal) }`
  }).filter(Boolean).join(',\n') + `\n${indent.slice(spacer.length)}}`

const formatFetch = (url, opts) => isNotEmpty(opts)
  ? `${_base}(${_class.url(JSON.stringify(url))}, ${formatOpts(spacer, opts)})`
  : `${_base}(${_class.url(JSON.stringify(url))})`

const printResult = (url, opts, extra) => _result.innerHTML = extra
  ? extra +'\n'+ formatFetch(url, opts)
  : formatFetch(url, opts)

let _prevError = ''
let _prevInput = ''
let _prevHeight = 50
let _forceResize = false
const update = () => {
  try {
    const newInput = _textArea.value + _clean.checked
    if (_prevInput === newInput) return
    if (newInput.length < _prevInput.length) {
      // force resize
      _textArea.style.height = '5px'
      _forceResize = true
    }
    localStorage.save = _textArea.value
    _prevInput = newInput

    // update height
    const { scrollHeight, style } = _textArea
    if (_forceResize || scrollHeight !== _prevHeight) {
      style.height = (_prevHeight = Math.max(50, scrollHeight)) +'px'
      _forceResize = false
    }

    // update render
    const { method, headers, url, body, formData } = parseCurl(_textArea.value, _clean.checked)
    const opts = {}
    if (method !== 'GET') opts.method = method
    if (isNotEmpty(headers)) opts.headers = headers
    if (isNotEmpty(body)) opts.body = body
    if (isNotEmpty(formData)) {
      opts.body = { [VariableSymbol]: 'body' }
      printResult(url, opts, formData.reduce((acc, [ key, value ]) =>
        `${acc}${_class.var('body')}.${_class.keyword('append')}(${_class.value.text(key)}, ${_class.value.text(value)})\n`,
        `${_class.url('const')} ${_class.var('body')} ${_class.op('= new')} ${_class.url('FormData')}\n`))
    } else {
      printResult(url, opts)
    }
  } catch (err) {
    if (_prevError !== err.message) {
      _prevError = err.message
      console.error(err)
    }
    _result.innerHTML = `<span class="error">${err.message}</span>`
  }
}

const loop = () => update(requestAnimationFrame(loop))

_textArea.value = localStorage.save
  ? localStorage.save
  : 'curl -u xgqfrms:eGdxZnJtcy1naXRodWItY3VybC10b2ZldGNoLWFwaQ== https://api.github.com/user';

// window.btoa(`xgqfrms-github-curl-tofetch-api`);

_result.onfocus = () => selectElementContents(_result)
window.onfocus = _textArea.onfocus = () => _textArea.select()
_textArea.onblur = _result.onblur = clearSelection

loop()

copieur(_result);
