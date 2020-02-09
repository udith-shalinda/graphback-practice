const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:Number,
        required:true,
    },
    createEvents:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Event'
    }

});

module.exports = mongoose.model("User" ,userSchema);