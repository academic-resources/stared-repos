var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = new express.Router();
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var connectionUrl = "mongodb://localhost:27017/testdb";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function dbConnection(){
    return new Promise((resolve, reject) => {
        MongoClient.connect(connectionUrl, function(err, db) {
            if(err) { reject(err); }
            resolve(db);        
        });
    });    
}

function findFn(req, res){    
    var searchObj = {};
    if(req.params.id) {searchObj = { _id: new mongo.ObjectID(req.params.id)};}
    dbConnection().then((db) => {
        db.collection(req.params.collection)
            .find(searchObj).toArray((err, result) => {
                if(err) { res.status(500).json(err); }
                res.json(result);
                db.close();
            });
    }).catch((err) => {res.status(500).json(err);});    
}

function createFn(req, res){    
    dbConnection().then((db) => {
        db.collection(req.params.collection)
        .insertMany(req.body.data, (err, result) => {
            if(err) { res.status(500).json(err); }
            res.json(result);
            db.close();
        });            
    }).catch((err) => {res.status(500).json(err);});            
}

function deleteFn(req, res){ 
    var searchObj = {};
    if(req.params.id) {searchObj = { _id: new mongo.ObjectID(req.params.id)};}   
    dbConnection().then((db) => {
        db.collection(req.params.collection)
        .deleteOne(searchObj, (err, result) => {
            if(err) { res.status(500).json(err); }
            res.json(result);
            db.close();
        });            
    }).catch((err) => {res.status(500).json(err);});            
}

function updateFn(req, res){
    var searchObj = {};
    if(req.params.id) {searchObj = { _id: new mongo.ObjectID(req.params.id)};}
    dbConnection().then((db) => {        
        db.collection(req.params.collection)
        .updateOne(searchObj, {$set: req.body.data}, true, (err, result) => {
            if(err) { res.status(500).json(err); }                    
            res.json(result);
            db.close();
        });            
    }).catch((err) => {res.status(500).json(err);});        
}

router.get("/:collection", findFn);
router.get("/:collection/:id", findFn);
router.post("/:collection", createFn);
router.put("/:collection/:id", updateFn);
router.delete("/:collection/:id", deleteFn);

app.use("/api/", router);

app.listen(4040, () => {
    console.log("Listening on : 4040");
});