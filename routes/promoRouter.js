const express=require('express');
const bodyP=require('body-parser');
const promoRouter=express.Router();

promoRouter.use(bodyP.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end("will send the all promotion to you!")
})
.post((req,res,next)=>{
    res.end('Will add the Promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res,next)=>{
    res.end('Deleting all Promotions');
});

promoRouter.param("promoID",(req,res,next,id)=>{
    req.params={
        promoId:id
    }
    next();
})
promoRouter.route('/:promoID')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
     res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req, res, next) => {
    res.write('Updating the : ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
          ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});


module.exports=promoRouter;