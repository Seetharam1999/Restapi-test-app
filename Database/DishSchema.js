const mongoose=require('mongoose');

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema=mongoose.Schema;
const CommentSchema=Schema({
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
const DishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[CommentSchema],
},{
    timestamps:true
});

var Dishes=new mongoose.model('dishes',DishSchema);
module.exports=Dishes;