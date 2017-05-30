var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var MongoClient = mongodb.MongoClient;
var uri = 'mongodb://127.0.0.1:27017/phoenix';
var url = 'mongodb://ianpuchetti:5446@cluster0-shard-00-00-5nuxu.mongodb.net:27017,cluster0-shard-00-01-5nuxu.mongodb.net:27017,cluster0-shard-00-02-5nuxu.mongodb.net:27017/phoenix?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
  	res.render('inicio', { title: 'Phoenix-Log' , user: req.session.user});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});

router.post('/login', function(req, res, next) {
	MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var collection = db.collection('users');
                collection.find({user:req.body.user, password:req.body.password}).toArray(function (err, result) {
                if(err){console.log(err);res.redirect('/');console.log('error')}
                else if (result.length){console.log('found');req.session.user=req.body.user;res.redirect('/');}
                else {res.redirect('/');console.log('nothing')}
                db.close();}
                );
                }
                });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

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

              find: function (a,c,f){
                var found;
                MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('Connection established to', url);
                var collection = db.collection(c);
                found=collection.find(a).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){console.log(result);return result;f();}
                else {console.log('Found nothing.');}
                db.close();}
                );
                return found;
                }
                });
              }
            };
