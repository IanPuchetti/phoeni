var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var session = require('express-session');
var MongoClient = mongodb.MongoClient;
var uri = 'mongodb://127.0.0.1:27017/phoenix';
var url = 'mongodb://ianpuchetti:5446@cluster0-shard-00-00-5nuxu.mongodb.net:27017,cluster0-shard-00-01-5nuxu.mongodb.net:27017,cluster0-shard-00-02-5nuxu.mongodb.net:27017/phoenix?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

//INICIO
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('inicio', { title: 'Phoenix-Log' , user: req.session.user, menu:'general'});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});

//CAMIONES
router.get('/bases/camiones', function(req, res, next) {
  if(req.session.user){
    res.render('camiones', { title: 'Phoenix-Log' , user: req.session.user, menu:'general'});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});


//BASES

router.post('/bases/query', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var collection = db.collection(req.body.collection);
                collection.find(req.body.query).project(req.body.project).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){res.send(result);}
                else {console.log('nothing');res.send(result);}
                db.close();}
                );
                }
                });
});

//CHOFERES
router.get('/bases/choferes', function(req, res, next) {
  if(req.session.user){
    res.render('choferes', { title: 'Phoenix-Log' , user: req.session.user, menu:'general'});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});





router.post('/bases/choferes/agregar', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                db.collection('choferes').find(req.body).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){res.send('repetido');}
                else {
                    db.collection('choferes').insert(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            }});
});

router.post('/bases/choferes/borrar', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                 db.collection('choferes').remove(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            });




router.post('/bases/choferes/modificar', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var _id = new mongodb.ObjectID(req.body._id);
                delete req.body._id;
                var collection = db.collection('choferes');
                collection.update({_id:_id},{$set:req.body},function (err, result) {
                if(err){res.send(err);}
                else if (result){res.send('ok');}
                else {res.send('error');}
                db.close();}
                );
                }
                });
});

//ACOPLADOS
router.get('/bases/acoplados', function(req, res, next) {
  if(req.session.user){
    res.render('acoplados', { title: 'Phoenix-Log' , user: req.session.user, menu:'general'});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});

//DEPOSITOS
router.get('/bases/depositos', function(req, res, next) {
  if(req.session.user){
    res.render('depositos', { title: 'Phoenix-Log' , user: req.session.user, menu:'general'});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});

//MIS DATOS
router.get('/mis-datos', function(req, res, next) {
  if(req.session.user){
    res.render('mis-datos', { title: 'Phoenix-Log' , user: req.session.user, menu:'general'});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});

router.post('/mis-datos/datos', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var collection = db.collection('users');
                collection.find({user:req.body.user}).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){res.send(result);}
                else {console.log('nothing')}
                db.close();}
                );
                }
                });
});


router.post('/mis-datos/agregar/usuario', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                db.collection('users').insert(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
});




router.post('/mis-datos/modificar/password', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var collection = db.collection('users');
                collection.update({user:req.body.user},{user:req.body.user, password:req.body.password, mail:req.body.mail},function (err, result) {
                if(err){res.send('error');}
                else if (result){res.send('ok');}
                else {res.send('error');}
                db.close();}
                );
                }
                });
});

//MIS DATOS
router.get('/parametros', function(req, res, next) {
  if(req.session.user){
    res.render('parametros', { title: 'Phoenix-Log' , user: req.session.user, menu:'general'});
  }else{
    res.render('index', { title: 'Phoenix-Log' });
}
});

router.post('/parametros/datos', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var collection = db.collection(req.body.collection);
                collection.find(req.body.query).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){res.send(result);}
                else {console.log('nothing');res.send(result);}
                db.close();}
                );
                }
                });
});


//PAISES

router.post('/parametros/agregar/paises', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                db.collection('paises').find(req.body).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){res.send('repetido');}
                else {
                    db.collection('paises').insert(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            }});
});

router.post('/parametros/borrar/paises', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                 db.collection('paises').remove(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            });




router.post('/parametros/modificar/paises', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var _id = new mongodb.ObjectID(req.body._id);
                var collection = db.collection('paises');
                collection.update({_id:_id},{$set:{pais:req.body.pais_n}},function (err, result) {
                if(err){res.send('error');}
                else if (result){res.send('ok');}
                else {res.send('error');}
                db.close();}
                );
                }
                });
});


//PROVINCIAS

router.post('/parametros/agregar/provincias', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                db.collection('provincias').find(req.body).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){res.send('repetido');}
                else {
                    db.collection('provincias').insert(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            }});
});

router.post('/parametros/borrar/provincias', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                 db.collection('provincias').remove(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            });




router.post('/parametros/modificar/provincias', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var _id = new mongodb.ObjectID(req.body._id);
                console.log(req.body._id+' - '+req.body.provincia);
                var collection = db.collection('provincias');
                collection.update({_id:_id},{$set:{provincia:req.body.provincia}},function (err, result) {
                if(err){res.send('error');}
                else if (result){res.send('ok');}
                else {res.send('error');}
                db.close();}
                );
                }
                });
});

//CIUDADES

router.post('/parametros/agregar/ciudades', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                db.collection('ciudades').find(req.body).toArray(function (err, result) {
                if(err){console.log(err);}
                else if (result.length){res.send('repetido');}
                else {
                    db.collection('ciudades').insert(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            }});
});

router.post('/parametros/borrar/ciudades', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if(err){}else{
                 db.collection('ciudades').remove(req.body, function (err, result) {
                if(err){console.log(err);}else{res.send('ok');}
                });
                db.close();
                }
            });
            });




router.post('/parametros/modificar/ciudades', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
                if (err) {}else{
                console.log('connected');
                var _id = new mongodb.ObjectID(req.body._id);
                var collection = db.collection('ciudades');
                collection.update({_id:_id},{$set:{ciudad:req.body.ciudad}},function (err, result) {
                if(err){res.send('error');}
                else if (result){res.send('ok');}
                else {res.send('error');}
                db.close();}
                );
                }
                });
});


//LOGIN
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

//LOGOUT

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
