
var origin = process.argv[2] || "0.0.0.0"

origin += ':3333'

exports.board = function(req, res){
  res.render('index', {origin: origin});
};
exports.index = function(req, res){
  var gameID = Math.ceil( Math.random() * Date.now() )
  res.redirect('/board/' + gameID);
}
