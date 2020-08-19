const express=require('express');
const bodyP=require('body-parser');
const leaderRouter=express.Router();
const leader=require('../Database/leaderSchema');
leaderRouter.use(bodyP.json());

leaderRouter.route('/')

.get((req,res,next)=>{
    leader.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=>{
    leader.create(req.body)
    .then((leader) => {
        console.log('leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next)=>{
    leader.deleteMany()
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
});


leaderRouter.route('/:leaderID')

.get((req,res,next) => {
   leader.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
     res.end('POST operation not supported on /leader/'+ req.params.leaderId);
})
.put((req, res, next) => {
    leader.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true }).exec()
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete((req, res, next) => {
    leader.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports=leaderRouter;