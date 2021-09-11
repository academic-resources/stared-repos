;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var frame = document.createElement('div');
var next = document.createElement('div');
var last = document.createElement('div');
var style = document.createElement('style');

style.textContent = "div{height:300px;width:300px;display:inline-block}"
document.head.appendChild(style);
frame.style.background = "green";
next.style.background = "yellow";
last.style.background = "pink";

document.body.appendChild(last)
document.body.appendChild(frame)
document.body.appendChild(next)

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS91c2VyL2RldmVsb3BtZW50L2Jhcm4vY2Fyb3VzZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG52YXIgbmV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xudmFyIGxhc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbnZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbnN0eWxlLnRleHRDb250ZW50ID0gXCJkaXZ7aGVpZ2h0OjMwMHB4O3dpZHRoOjMwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrfVwiXG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbmZyYW1lLnN0eWxlLmJhY2tncm91bmQgPSBcImdyZWVuXCI7XG5uZXh0LnN0eWxlLmJhY2tncm91bmQgPSBcInllbGxvd1wiO1xubGFzdC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJwaW5rXCI7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGFzdClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZnJhbWUpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5leHQpXG4iXX0=
;