const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
        
    },
    author:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});
const DishSchema =new mongoose.Schema({
    dish:{
        type:String,
        required:true
    },
    dishID:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Comments:[CommentSchema]
},{
    timestamps:true
});

var dishes=new mongoose.model('dishes',DishSchema);

module.exports=dishes;