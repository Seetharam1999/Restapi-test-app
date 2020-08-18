const express=require('express');
const bodyP=require('body-parser');
const leaderRouter=express.Router();

leaderRouter.use(bodyP.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end("will send the all leader to you!")
})
.post((req,res,next)=>{
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next)=>{
    res.end('Deleting all leaders');
});

leaderRouter.param("leaderID",(req,res,next,id)=>{
    req.params={
        leaderId:id
    }
    next();
})
leaderRouter.route('/:leaderID')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
     res.end('POST operation not supported on /leader/'+ req.params.leaderId);
})
.put((req, res, next) => {
    res.write('Updating the : ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
          ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});


module.exports=leaderRouter;