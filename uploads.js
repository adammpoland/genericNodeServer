const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobSchema = new Schema({

    company:{
        type: String, //this will be the id of the company that created the job
        required: true
    },
    jobPicture:{
        type: String,
        required: false
    },
    jobTitle:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    experienceRequired:{
        type: String,
        required: false
    },
    educationRequired:{
        type: String,
        required: false
    },
    pay:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true
    },
    otherDetails:{
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('jobs', JobSchema);