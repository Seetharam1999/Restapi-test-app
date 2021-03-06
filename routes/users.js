  var express = require('express');
  const bodyParser=require('body-parser');
  var User=require('../Database/user');
  var router = express.Router();
  var passport=require('passport');
  var authenticate=require('../authendicate');
  
  router.use(bodyParser.json());

  /* GET users listing. */
  router.get('/', function(req, res, next) {
   
  });

  router.post('/signup',(req,res,next)=>{
    User.register(new User({username:req.body.username}),
    req.body.password,(err,user)=>{
        if(err){
          res.statusCode=500;
          res.setHeader("Content-Type","application/json");
          res.json({err:err})
        }
        else{
         passport.authenticate('local')(req,res,()=>{
          res.statusCode=200;
          res.setHeader("Content-Type","application/json");
          res.json({success:true,status:"Registration Successfull"});
          
        });
      }
  });
});


  router.post('/login', passport.authenticate('local'), (req, res) => {
    var token=authenticate.getToken({_id:req.user._id});

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true,token:token, status: 'You are successfully logged in!'});
  });


  // router.post('/login',(req,res,next)=>{

  //   if(!req.session.user){

  //     var authHeader=req.headers.authorization;
  //     if(!authHeader){
  //       var err=new Error("you are not authenticated");
  //       res.setHeader("WWW-Authenticate","Basic");
  //       err.status=401;
  //       return next(err);
  //     }

  //     var auth=new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');

      
  //     var username=auth[0];
  //     var password=auth[1];
  //     User.findOne({username:username})
  //     .then((user)=>{
  //       if(user===null){
  //         var err=new Error("User"+username+'does not exist');
  //         err.status=403;
  //         return next(err); 
  //       }
  //       else if(user.password!==password){
  //         var err=new Error("Your Password is incorrect");
          
  //         err.status=403;
  //         return next(err);
  //       }
  //       else if(user.username===username && user.password===password){
  //         req.session.user="authendicated";
  //         res.statusCode=200;
  //         res.setHeader("Conetent-Type","text/plain");
  //         res.end("Your are authendicated");
  //       }  
  //     })
  //     .catch(err=>{
  //       next(err);
  //     })
    

  //   }
  //   else{
  //     res.statusCode=200;
  //     res.setHeader("Content-Type","text/plain");
  //     res.end("your are already authendicated");
  //   }
  // });
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
