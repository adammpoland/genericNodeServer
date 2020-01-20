const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const WorkerSchema = new Schema({

    email:{
        type: String, //this will connect a user to this account
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    picPath:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: true
    },
    addressLineOne:{
        type: String,
        required: true
    },
    addressLineTwo:{
        type: String,
        required: false
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

        company: {
            type:String,
            required: false
        },
        jobTitle:{
            type:String,
            required: false
        },
        pay:{
            type:String,
            required: false
        },
        workDescription:{
            type:String,
            required: false
        },

	isEmployed:{
            type:String,
            required: false
        },
   
    school: {
        type:String,
        required: false
    },
    fieldOfStudy:{
        type:String,
        required: false
    },
    yearsAttended:{
        type:String,
        required: false
    },
        degreeDiplomaCertificate:{
        type:String,
        required: false
    },
    filesUploaded:{
        type: String,
        required: false
    },
    electrician:{
        type: Boolean,
        required: false
    },
    plumber:{
        type: Boolean,
        required: false
    },
    carpentry:{
        type: Boolean,
        required: false
    },
    concrete:{
        type: Boolean,
        required: false
    },
    flooring:{
        type: Boolean,
        required: false
    },
    masonry:{
        type: Boolean,
        required: false
    },
    dryWall:{
        type: Boolean,
        required: false
    },
    hvac:{
        type: Boolean,
        required: false
    },
    other:{
        type: Boolean,
        required: false
    },

    mostPaid:{
        type: String,
        required: true
    },
    currentlyWorking:{
        type: String,
        required: false
    },
    leastPaid:{
        type: String,
        required: true
    },
    vehicle:{
        type: String,
        required: true
    },
    timeAwayFromHome:{
        type: String,
        required: true
    },
    distanceWillingToTravel:{
        type: String,
        required: true
    },
    tools:{
	type: String,
	required: false
    },
    jobsAppliedTo:[{
        job: {
            type:String,
            required: false
        },
	title:{
	    type:String,
	    required: false
	
	},
	description:{
            type:String,
            required: false

        },
        city:{
            type:String,
            required: false

        },
        state:{
            type:String,
            required: false

        },

    }],

    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('workers', WorkerSchema)
