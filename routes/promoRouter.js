const express=require('express');
const bodyP=require('body-parser');
const promoRouter=express.Router();
const promotion=require('../Database/promoSchema');
promoRouter.use(bodyP.json());

promoRouter.route('/')

.get((req,res,next)=>{
    promotion.find({})
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=>{
    promotion.create(req.body)
    .then((promo) => {
        console.log('leader Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res,next)=>{
   promotion.deleteMany()
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
});

promoRouter.route('/:promoID')

.get((req,res,next) => {
    promotion.findById(req.params.promoID)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
     res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req, res, next) => {
    promotion.findByIdAndUpdate(req.params.promoID, {
        $set: req.body
    }, { new: true }).exec()
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete((req, res, next) => {
    promotion.findByIdAndRemove(req.params.promoID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports=promoRouter;