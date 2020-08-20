  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  
  var logger = require('morgan');
  var session=require('express-session');
  var FileStore=require('session-file-store')(session);
  const mongoose=require('mongoose');
 
  const url="mongodb://127.0.0.1:27017/Confusion";


  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var dishRouter=require('./routes/dishRouter');
  var leaderRouter=require('./routes/leaderRouter');
  var promoRouter=require('./routes/promoRouter');
  var app = express();


  const connect=mongoose.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true  });
  connect.then((db) => {
      console.log("Connected correctly to DATABASE server ");
  }, (err) => { console.log(err); });
  
 
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //app.use(cookieParser('12345-67890-09876-54321'));
  app.use(session({
    name:'session-id',
    secret:'12345-67890-09876-54321',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()

  }));
  app.use('/', indexRouter);
  app.use('/users', usersRouter);

  function auth(req,res,next){
    console.log(req.session);

    if(!req.session.user){
      var err=new Error("you are not authenticated");
      res.setHeader("WWW-Authenticate","Basic");
      err.status=401;
      return next(err);
    }
    else{
      if(req.session.user==='authendicated'){
        next();
      }
      else{
        var err=new Error("you are not authenticated");
        err.status=403;
        return next(err);
      }
    }
  }
  app.use(auth)

  app.use(express.static(path.join(__dirname, 'public')));

  
  app.use('/dishes',dishRouter);
  app.use('/leaders',leaderRouter);
  app.use('/promotion',promoRouter);



  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
