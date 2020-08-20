    // const mongoose=require('mongoose');
 
    // const url="mongodb://127.0.0.1:27017/Confusion";

    // const connect=mongoose.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true  });
    // connect.then((db) => {
    //     console.log("Connected correctly to DATABASE server ");
    // }, (err) => { console.log(err); });
    
   
    // Dishes.create({
    //     name:"Uthapizzaaa",
    //     //  dishID:1,
    //     description:'sample test',
       
    //     })

    //     .then(dishes=>{
    //         console.log(dishes);

    //         return Dishes.findByIdAndUpdate(dishes._id,{
    //             $set:{
    //                 description:"updated test "
    //             }
    //         },{
    //             new:true
    //         }).exec();
    //     })
    //     .then(dish=>{
    //         console.log(dish)
    //         dish.Comments.push({
    //             comment:"nothing",
    //             rating:2,
    //             author:'srs'
    //         })
    //     return dish.save();

    //     })
    //     .then((dish)=>{
    //         console.log(dish);
    //         return Dishes.deleteMany();
    //     })
    //     .then(()=>{
    //         return mongoose.connection.close();
    //     })

    //     .catch(err=>{
    //         console.log(err)
    //         })
    //     });

    // const MongoClient=require('mongodb').MongoClient;
    // const assert=require('assert');
    // const dboper = require('./operations');
    // const mongoose=require('mongoose');


    // const url="mongodb://127.0.0.1:27017";
    // const dbname="test";
    // MongoClient.connect(url)
    // .then((client) => {
   // 
    //     console.log('Connected correctly to server');
    //     const db = client.db(dbname);

    //     dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    //         "dishes")
    //         .then((result) => {
    //             console.log("Insert Document:\n", result.ops);

    //             return dboper.findDocuments(db, "dishes");
    //         })
    //         .then((docs) => {
    //             console.log("Found Documents:\n", docs);

    //             return dboper.updateDocument(db, { name: "Vadonut" },
    //                     { description: "Updated Test" }, "dishes");

    //         })
    //         .then((result) => {
    //             console.log("Updated Document:\n", result.result);

    //             return dboper.findDocuments(db, "dishes");
    //         })
    //         .then((docs) => {
    //             console.log("Found Updated Documents:\n", docs);
                            
    //             return db.dropCollection("dishes");
    //         })
    //         .then((result) => {
    //             console.log("Dropped Collection: ", result);

    //             return client.close();
    //         })
    //         .catch((err) => console.log(err));

    // })
//     // .catch((err) => console.log(err));
//  module.exports=connect;