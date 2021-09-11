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
