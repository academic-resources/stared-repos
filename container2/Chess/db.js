var redis = require('redis')
	,	chess = redis.createClient()
;

chess.select('chessboards')

chess.lpush('boards', 1)

var script = '\
local key = "boards" \
for i = 0, 1001, 1 do \
 local index = i \
 redis.call("hset", key, i, "1") \
end \
return redis.call("lrange", key, 0, -1)';

chess.eval(script, 0, function(err, msg){
	console.log(err, msg)
})

module.exports = chess;