var route = require('wayfarer')('/')
var fs = require('fs')
var events = require('./lib/events.js')
var xhr  = require('hyperquest')
var mustache  = require('mustache')
var concat = require('concat-stream')
var catchLinks = require('catch-links')
var menu = require('./lib/events.js')()

var template = fs.readFileSync('public/templates/details.html', 'utf8')
var content = document.getElementById('content')

route.on('/', function () {
  var tmpl = ' <div style="display: block; font-size: 2em; padding: 1em"><a href="/inventory/{{inventoryNumber}}">inventory {{inventoryNumber}}</a></div>'
  var dummy = document.createElement('div')
  var reqStream = xhr('http://' + location.hostname + ':' + location.port  + '/api/inventory/all')
  var concatStrem = concat(handler)
  reqStream.pipe(concatStrem)

  function handler (data) {
    data = data.toString('utf8')
    data = data.split('\n')
    data = data.filter(Boolean)

    data.forEach(function (e, i) {
      var item = JSON.parse(e)
      var value = JSON.parse(item.value)
      var html = mustache.render(tmpl, value)
      console.log(html)
      dummy.innerHTML = html
      console.log(dummy.children[0])
      content.appendChild(dummy.children[0])
    })
  }

})
route.on('templates/details', function () {

})
route.on('inventory/:number', function (params) {
  var reqStream = xhr('http://' + location.hostname + ':' + location.port  + '/api/inventory/' + params.number)
  var concatStrem = concat(handler)
  reqStream.pipe(concatStrem)

  function handler (data) {
    data = data.toString('utf8')
    data = JSON.parse(data)

    var html = mustache.render(template, data)
    content.innerHTML = html

    console.log(data)
  }
})

route.on('artist/:name', function (params) {
  var reqStream = xhr('http://' + location.hostname + ':' + location.port  + '/api/artist/' + params.name)
  var concatStrem = concat(handler)
  reqStream.pipe(concatStrem)

  function handler (data) {
    data = data.toString('utf8')
    data = JSON.parse(data)

    var html = mustache.render(template, data)
    content.innerHTML = html

    console.log(data)
  }

})
catchLinks(window, function (href) {
  console.log(href.split('.')[0])
  route(href.split('.')[0])
});
route('/')
