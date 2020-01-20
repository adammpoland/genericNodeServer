const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    setUp:{
        type: Boolean,
        required: false
    },
    type:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema)
