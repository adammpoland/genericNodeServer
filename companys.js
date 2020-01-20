const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompanySchema = new Schema({

    email:{
        type: String, //this will connect a user to this account
        required: true
    },
    picPath:{
        type: String,
        required: false
    },
    ownerFirstName:{
        type: String,
        required: true
    },
    ownerLastName:{
        type: String,
        required: true
    },
    businessName:{
        type: String,
        required: true
    },
    businessAddress:{
        type: String,
        required: false
    },
    businessAddressSecondLine:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    state:{
        type: String,
        required: false
    },
    zip:{
        type: String,
        required: false
    },
    yearsInBusiness:{
        type: String,
        required: true
    },
    numberOfEmployees:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
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
    potentialHires:[{
        job: {
            type:String,
            required: false
        },
        jobName:{
            type:String,
            required: false

        },
        worker:{
            type:String,
            required: false

        },
        workerName:{
            type:String,
            required: false

        },
	phone:{
            type:String,
            required: false

        },
	email:{
            type:String,
            required: false

        }

    }],

    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('companys', CompanySchema);
