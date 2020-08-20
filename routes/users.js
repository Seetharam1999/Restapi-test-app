  var express = require('express');
  const bodyParser=require('body-parser');
  var User=require('../Database/user');
  var router = express.Router();
  var passport=require('passport');
  
  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    User.find({})
    .then((dishes) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dishes);
  }, (err) => next(err))
  .catch((err) => next(err));
    
  });

  router.post('/signup',(req,res,next)=>{
    User.findOne({username:req.body.username})
      .then((user)=>{
        if(user!==null){
          var err=new Error("user "+req.body.username+"already Exists");
          err.status=403;
          next(err);
        }
        else{
          return User.create({
            username:req.body.username,
            password:req.body.password
          })
        }
      })
      .then((user)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json({status:"Registration Successfull",user:user});
      },(err)=>{
        next(err)
      })
      .catch(err=>{
        next(err);
      })
  });

  router.post('/login',(req,res,next)=>{

    if(!req.session.user){

      var authHeader=req.headers.authorization;
      if(!authHeader){
        var err=new Error("you are not authenticated");
        res.setHeader("WWW-Authenticate","Basic");
        err.status=401;
        return next(err);
      }

      var auth=new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');

      
      var username=auth[0];
      var password=auth[1];
      User.findOne({username:username})
      .then((user)=>{
        if(user===null){
          var err=new Error("User"+username+'does not exist');
          err.status=403;
          return next(err); 
        }
        else if(user.password!==password){
          var err=new Error("Your Password is incorrect");
          
          err.status=403;
          return next(err);
        }
        else if(user.username===username && user.password===password){
          req.session.user="authendicated";
          res.statusCode=200;
          res.setHeader("Conetent-Type","text/plain");
          res.end("Your are authendicated");
        }  
      })
      .catch(err=>{
        next(err);
      })
    

    }
    else{
      res.statusCode=200;
      res.setHeader("Content-Type","text/plain");
      res.end("your are already authendicated");
    }
  });
  router.get('/logout',(req,res,next)=>{
    if(req.session){
      req.session.destroy();
      res.clearCookie();
      res.redirect('/');
    }
    else{
      var err=new Error("you are not logged in");
      err.status=403;
      next(err);
    }
  })
  module.exports = router;
