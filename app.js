var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var mongodb = require('mongodb');
var session = require('express-session');

var bodyParser = require('body-parser');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/phoenix';


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/find', function (req, res) {
  //req.body
  //res.send({});
  console.log(mongo.find({usuario:req.body.usuario}, 'usuarios'));
  res.send(mongo.find({usuario:req.body.usuario}, 'usuarios'));
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server listening on port 3000');
});

var mongo = {
                insert: function (a,c){
                MongoClient.connect(url, function (err, db) {
                if(err){}else{
                db.collection(c).insert(a, function (err, result) {
                if(err){console.log(err);}else{console.log('Inserted.');}
                });
                db.close();
                }
                });},

              find: function (a,c){
                var found;
                MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('Connection established to', url);
                var collection = db.collection(c);
                found=collection.find(a).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){console.log(result);return result;}
                else {console.log('Found nothing.');}
                db.close();}
                );
                return found;
                }
                });
              }
            };