var http 						= require('http')
var ecstatic 				= require('ecstatic')
var path 						= require('path')
var fs 							= require('fs')
var level 					= require('level')
var sublevel 				= require('level-sublevel')
var formidable 			= require('formidable')
var utils 					= require('util')
var router 					= require('router')()	
var db 							= sublevel(level('./db', {valueEncoding: 'json'}))
var inventorydb 		= db.sublevel('inventory')
var artistdb 				= db.sublevel('artist')
var sellerdb 				= db.sublevel('seller')
var server 					= http.createServer(handler)

var static		= ecstatic({root: __dirname + '/public'})

router.post('/post', function (req, res) {

	var form = new formidable.IncomingForm()

	form.uploadDir = __dirname + '/tmp'
	
	form.parse(req, function (err, fields, files) {
		// set key
		var key = fields.inventoryNumber
		
		res.writeHead(302, {'Location': '/'})
		res.end()

		// check for inventory number
		inventorydb.get(fields.inventoryNumber, function (err, index) {
			// not in db
			if (err) {
				console.log('New Inventory Number')

				inventorydb.put('inv!' + fields.inventoryNumber, JSON.stringify(fields), function (err) {
					if (err) console.log(err)
				})
			}
			// already in db
			else {
				inventorydb.put(fields.inventoryNumber, JSON.stringify(fields), function (err) {
					if (err) console.log(err)
				})
			}
		})

		// check for artist
		artistdb.get(fields.artist, function (err, index) {
			if (err) {
				console.log('New artist')

				artistdb.put(fields.artist, JSON.stringify(fields), function (err) {
					if (err) console.log(err)
				})
			}
			else {
				artistdb.put(fields.artist, JSON.stringify(fields), function (err) {
					if (err) console.log(err)
				})
			}
		})

		// check for seller
		sellerdb.get(fields.seller, function (err, index) {
			if (err) {
				console.log('New Seller')

				sellerdb.put(fields.invoiceSeller, JSON.stringify(fields), function (err) {
					if (err) console.log(err)
				})
			}
			else {
				sellerdb.put(fields.invoiceSeller, JSON.stringify(fields), function (err) {
					if (err) console.log(err)
				})
			}
		})		
	})
})

// get ID's
router.get('/api/inventory/:id', function (req, res) {
	res.writeHead(200, {'content-type': 'application/JSON'})
	var key 	= req.params.id

	if(key === 'all'){
		var options = {
			gt:'inv!',
			lt:'inv!~'
		}
		var st = inventorydb.createReadStream(options, function (err) {
    	if (err) return console.log(err) 
		})

		st.on('error', function(err){
			res.write(JSON.stringify(err))
		})
		st.on('data', function(data){
			var write = JSON.stringify(data)
			res.write(write + '\n')
		})
		st.on('close', function(){
			res.end()
		})
	}

	else{
		inventorydb.get('inv!' + key, function (err, value) {
  	  if (err) return console.log(err) 
    	console.log(utils.inspect(JSON.parse(value)))
			res.end(value)
		})
	}
		
})

// get artist
router.get('/api/artist/:id', function (req, res) {
	res.writeHead(200, {'content-type': 'application/JSON'})
	var artist = req.params.id

	artistdb.get(artist, function (err, index) {
		if (err) return console.log(err)
		console.log(utils.inspect(JSON.parse(index)))
		res.end(index)
	})
})

// get seller
router.get('/seller/:id', function (req, res) {
	res.writeHead(200, {'content-type': 'application/JSON'})
	var seller = req.params.id

	sellerdb.get(seller, function (err, index) {
		if (err) return console.log(err)
		console.log(utils.inspect(JSON.parse(index)))
		res.end(index)
	})
})

// server handler function
function handler (req, res) {
	
	router(req, res, function () { static(req, res)})
}

server.listen(11001, function () {
	console.log('server listening on http://localhost:11001')
})
