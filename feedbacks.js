const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FeedbackSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('feedbacks', FeedbackSchema)
