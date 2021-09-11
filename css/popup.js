var fs = require('fs')
var s5 = fs.readFileSync('../css/popup.css');
var html = require('hyperscript');
var center = require('../uxer/center');

var style = html('style', s5)

document.head.appendChild(style);

var box = html('div.box')

var popup = html('div.popup', box)

document.body.appendChild(popup);
center(box)

window.addEventListener('resize', function(){
	center(box)
})

module.exports = popup;