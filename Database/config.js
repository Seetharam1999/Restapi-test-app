const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const dboper = require('./operations');
const mongoose=require('mongoose');


const url="mongodb://127.0.0.1:27017";
const dbName="test";

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    const db=client.db(dbName);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            //client.close();
                            db.dropCollection("dishes", (result) => {
                                 console.log("Dropped Collection: ", result);

                             client.close();
                             });
                        });
                    });
            });
    });
    // const collection=db.collection("dishes");
    // collection.insertOne({
    //     "Name":'srs',
    //     "description":'test'
    // },(err,result)=>{
    //     assert.equal(err,null)
    //     console.log("After Insert :/");
    //     console.log(result.ops);
    //     collection.find({}).toArray((err,docs)=>{
    //         assert.equal(err,null);
    //         console.log("Found \n");
    //         console.log(docs);
    //         db.dropCollection("dishes",(err,result)=>{
    //             assert.equal(err,null);
    //             client.close();
    //         })
    //     })
    // })
});

module.exports=MongoClient;