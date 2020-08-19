const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const leaderSchema=new Schema({
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
    abbr: {
        type: String,
        default: ''
    },
    designation: {
        type: String,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
});

var leader=new mongoose.model('leader',leaderSchema);

module.exports=leader