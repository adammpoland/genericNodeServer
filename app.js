const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hostURL = 'localhost:5000';
var session = require('express-session');
const app = express();

var methodOverride = require('method-override')
{ useUnifiedTopology: true }
//promise
mongoose.Promise = global.Promise;
const keys = require('./config/keys');

//connet to mongoose
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
	useUnifiedTopology: true
})
    .then(() => console.log('Mongo is connected'))
    .catch(err => console.log(err));

//mongoose.connect(kets.mongoURI, {useUnifiedTopology: true});

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
//session var middleware
app.use(session({secret:'XASDAasdiuDA',saveUninitialized: true,resave: true}));

    //body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


//load ideamodel
require('./models/workers');
require('./models/companys');
require('./models/jobs');
require('./models/users');
require('./models/feedbacks');



const Worker = mongoose.model('workers');
const Company = mongoose.model('companys');
const Job = mongoose.model('jobs');
const User = mongoose.model('users');
const Feedback = mongoose.model('feedbacks');
//


//set storage engiene
const storage = multer.diskStorage({
    destination: './public/uploads/',
   
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null,file.originalname+ '-' + Date.now() + path.extname(file.originalname));

    }
});

//init upload
const upload = multer({
    storage: storage
}).single('myFile'); //makesure that you have myFile not myfile. you have already made that mistake twice.


//starts ejs
app.set('view engine', 'ejs');

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/views", express.static(path.join(__dirname, 'views')));

app.use(express.static("./views"));




app.get('/', (req, res) => {
testSession = req.session;
    //DATABASE TO ARRAY
    User.find({}, (err, users) => {
        if (err) return console.log(err);

        res.json(users);
    });

    console.log(testSession.email);
});

app.post('/upload', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                console.log("err");
    
                console.log(err);
    
                res.render('index', {
                    msg: err
                    
                });
    
            } else {
                if (req.file == undefined) {
                    console.log(req.file);
    
                    res.render('index', {
                        msg: 'Error no file selected'
                    });
                } else {
                    console.log("it worked???");
            	    res.sendStatus(200);
           //         const newUser={
             //           title: req.file.filename,
                        //details: req.body.details
    
               //     }
                 //   new Idea(newUser)
                   //     .save()
                   
    
    
                }
            }
        })
    } catch (error) {
        
    }
   
});



//for downloads
app.post('/download', function (req, res) {
    let file = __dirname + '/public/uploads/'+req.body.title;
    console.log(file);
    res.download(file); // Set disposition and send it.
});



app.post('/login',(req,res) => {
  console.log("entered login func"); 
    try {
        // var idString = req.params.id;
        // var id = new mongoose.Types.ObjectId(String(idString));

    
        User.findOne({email: req.body.email},(err,user)=>{
            console.log(user);
	
	    if(user != null){
	    
	
            if(user.password == req.body.password){
                console.log("auth succesful");

		res.json(user);		
		
            }else{
		console.log("Wrong Password");
		    var user = {
		    	email: "incorrect",
			password: "incorrect",
			type: "error"
		    }
		    res.send(user);
	
	    }}else{
		    var user = {
                        email: "incorrect",
                        password: "incorrect",
                        type: "error"
                    }
                    res.send(user);
	    }
	
	});
	
    } catch (err) {
        console.log(err);
    }

});

app.post('/getProfile',(req,res) => {
  console.log("entered login func");
    try {
        // var idString = req.params.id;
        // var id = new mongoose.Types.ObjectId(String(idString));


        User.findOne({email: req.body.email},(err,user)=>{
            console.log(user);

	if(user.type=="worker"){
		console.log("entered worker");
                Worker.findOne({email: req.body.email},(err,worker)=>{
                console.log(worker);

                res.json(worker);
                });	

	}else if(user.type=="company"){
	
        	Company.findOne({email: req.body.email},(err,company)=>{
            	console.log(company);
  
		res.json(company);
		});
	}else{
	
	console.log("something went wrong");
	}

	});
 	} catch (err) {
        	console.log(err);
    	}

});
app.post('/signUpUser', (req, res) => {
   
    var user = {
        password: req.body.password,
        email: req.body.email,
	setUp: false,
        type: req.body.type
    }
    new User(user)
    .save();
        res.sendStatus(200);
   
    // return the list of jobs or workers

 });


app.post('/feedback', (req, res) => {

    var feedback = {
        title: req.body.title,
        feedback: req.body.feedback
    }
    new Feedback(feedback)
    .save();
        res.sendStatus(200);

    // return the list of jobs or workers

 });

app.post('/addJob', (req,res) => {
	console.log('entered addJob');
 	var job = {
        	company: req.body.company,
        	pic: req.body.pic,
        	jobTitle: req.body.jobTitle,
        	description: req.body.description,
        	experienceRequired: req.body.experienceRequired,
        	educationRequired: req.body.educationRequired,
        	pay: req.body.pay,
        	city: req.body.city,
        	state: req.body.state,
        	zip: req.body.zip,
		plumber: req.body.plumber,
         	carpentry: req.body.carpentry,
         	concrete: req.body.concrete,
         	flooring: req.body.flooring,
         	masonry: req.body.masonry,
         	dryWall: req.body.dryWall,
         	hvac: req.body.hvac,
        	other: req.body.other,
        	otherDetails: req.body.otherDetails
    	}
    	new Job(job)
    	.save();
	res.sendStatus(200);
});


app.post('/workerSetUpProfile', (req,res) => {
         console.log('entered workerSetUpProfile');

	 console.log(req.body);
	

         var worker = {
                 email: req.body.email,
                 fullName: req.body.fullName,
                 phone: req.body.phone,
		 picPath: req.body.picPath,
                 description: req.body.description,
                 addressLineOne: req.body.addressLineOne,
                 addressLineTwo: req.body.addressLineTwo,
                 city: req.body.city,
                 state: req.body.state,
                 zip: req.body.zip,

                 workHistory: req.body.workHistory,
		 educationHistory: req.body.workHistory,

		 filesUploaded: req.body.filesUploaded,
		// trades:req.body.trades,
		 electrician: req.body.electrician,
		 plumber: req.body.plumber,
		 carpentry: req.body.carpentry,
		 concrete: req.body.concrete,
		 flooring: req.body.flooring,
		 masonry: req.body.masonry,
		 dryWall: req.body.dryWall,
		 hvac: req.body.hvac,
		 other: req.body.other,

		 company: req.body.company,
		 jobTitle: req.body.jobTitle,
		 pay: req.body.pay,
		 workDescription: req.body.workDescription,
		 isEmployed: req.body.isEmployed,

		 school: req.body.school,
		 fieldOfStudy: req.body.fieldOfStudy,
		 yearsAttended: req.body.yearsAttended,
		 degreeDiplomaCertificate: req.body.degreeDiplomaCertificate,

                 mostPaid: req.body.mostPaid,
                 leastPaid: req.body.leastPaid,
                 vehicle: req.body.vehicle,
                 timeAwayFromHome: req.body.timeAwayFromHome,
                 distanceWillingToTravel: req.body.distanceWillingToTravel,

                 tools:req.body.tools
         }

         new Worker(worker)
		.save();

	res.sendStatus(200);
 });


app.post('/companySetUpProfile', (req,res) => {
         console.log('entered companySetUpProfile');

         console.log(req.body);


         var company = {
                 email: req.body.email,
		 picPath: req.body.picPath,
                 ownerFirstName: req.body.ownerFirstName,
                 ownerLastName: req.body.ownerLastName,
                 businessName: req.body.businessName,
                 businessAddressLineOne: req.body.addressLineOne,
                 businessAddressLineTwo: req.body.addressLineTwo,
                 city: req.body.city,
                 state: req.body.state,
                 zip: req.body.zip,
                 filesUploaded: req.body.filesUploaded,
                // trades:req.body.trades,
		 
		electrician: req.body.electrician,
                 plumber: req.body.plumber,
                 carpentry: req.body.carpentry,
                 concrete: req.body.concrete,
                 flooring: req.body.flooring,
                 masonry: req.body.masonry,
                 dryWall: req.body.dryWall,
                 hvac: req.body.hvac,
                 other: req.body.other,
                 yearsInBusiness: req.body.yearsInBusiness,
                 numberOfEmployees: req.body.numberOfEmployees,
                 description: req.body.description
         }

         new Company(company)
                .save();

        res.sendStatus(200);
 });


app.get('/getJob', (req,res) => {
        console.log('entered jobSearch');

 	Job.find({}, (err, jobs) => {
         	if (err) return console.log(err);

       		 res.json(jobs);
	});
});


app.post('/setUp', (req,res) => {

User.findOne({email: req.body.email},(err,user)=>{
                 console.log(req.body.email);
                console.log(user);
             }).then(user => {
                 //test.name = req.body.title;
                 //test.details = req.body.details;

         user.setUp = true;
                 user.save()
                   .then(company => {
                        res.send(200);

                   })
             })
});



app.post('/editCompanyProfile', (req,res) => {

Company.findOne({email: req.body.email},(err,company)=>{
                 console.log(req.body.email);
                console.log(company);
             }).then(company => {
                 //test.name = req.body.title;
                 //test.details = req.body.details;

        // company.email = req.body.fname;
         company.ownerFirstName = req.body.ownerFirstName;
	 company.ownerLastName = req.body.ownerLastName;
         company.picPath = req.body.picPath;
	 company.businessName = req.body.businessName;	     
         company.description = req.body.description;
         company.businessAddress= req.body.businessAddressLineOne;
         company.businessAddressSecondLine = req.body.businessAddressLineTwo;
         company.city = req.body.city;
         company.state = req.body.state;
         company.zip = req.body.zip;
	 company.electrician = req.body.electrician,
         company.plumber = req.body.plumber,
         company.carpentry = req.body.carpentry,
         company.concrete = req.body.concrete,
         company.flooring = req.body.flooring,
         company.masonry = req.body.masonry,
         company.dryWall = req.body.dryWall,
         company.hvac = req.body.hvac,
         company.other = req.body.other,
         //worker.filesUploaded = req.body.filesUploaded;
        // worker.trades = req.body.trades;

         company.yearsInBusiness = req.body.yearsInBusiness;
         company.numberOfEmployees = req.body.numberOfEmployees;
                 company.save()
                   .then(company => {
                        res.send(200);

                   })
             })

});



app.post('/editWorkerProfile', (req,res) => {

Worker.findOne({email: req.body.email},(err,worker)=>{
                 console.log(req.body.email);
                console.log(worker);
             }).then(worker => {
                 //test.name = req.body.title;
                 //test.details = req.body.details;

         worker.fullName = req.body.fullName;
         worker.phone = req.body.phone;
         worker.picPath = req.body.picPath;
         worker.description = req.body.description;
         worker.addressLineOne = req.body.addressLineOne;
         worker.addressLineTwo = req.body.addressLineTwo;
         worker.city = req.body.city;
         worker.state = req.body.state;
         worker.zip = req.body.zip;

         worker.workHistory = req.body.workHistory;
         worker.educationHistory = req.body.educationHistory;

         worker.filesUploaded = req.body.filesUploaded;
         worker.trades = req.body.trades;

         worker.mostPaid = req.body.mostPaid;
         worker.leastPaid = req.body.leastPaid;
         worker.vehicle = req.body.vehicle;
         worker.timeAwayFromHome = req.body.timeAwayFromHome;
         worker.distanceWillingToTravel = req.body.distanceWillingToTravel;

         worker.tools = req.body.tools;
                 worker.save()
                   .then(worker => {
                        res.send(200);

                   })
             })

});

app.post('/editJob', (req,res) => {

Job.findOne({_id: req.body._id},(err,job)=>{
                 console.log(req.body._id);
                console.log(job);
             }).then(job => {
                 //test.name = req.body.title;
               
	 job.picPath = req.body.picPath;
	job.jobTitle = req.body.jobTitle;
	job.description = req.body.description;
	job.experienceRequired = req.body.experienceRequired;
	job.educationRequired  = req.body.educationRequired;
	job.pay = req.body.pay;                               
         job.city = req.body.city;
         job.state = req.body.state;
         job.zip = req.body.zip;
         job.electrician = req.body.electrician,
         job.plumber = req.body.plumber,
         job.carpentry = req.body.carpentry,
         job.concrete = req.body.concrete,
         job.flooring = req.body.flooring,
         job.masonry = req.body.masonry,
         job.dryWall = req.body.dryWall,
         job.hvac = req.body.hvac,
         job.other = req.body.other,

        job.otherDetails = req.body.otherDetails
                 job.save()
                   .then(job => {
                        res.send(200);

                   })
             })

});

app.post('/jobSearch', (req,res) => {
         console.log('entered specific jobSearch');
	

	//both city and state
	 console.log(req.body.city);
         console.log(req.body.state);
	var  query = {$and:[{city:{$regex: req.body.city, $options: 'i'}},{state:{$regex: req.body.state, $options: 'i'}}]}
      
        Job.find(query, (err, jobs) => {
                 if (err) return console.log(err);
		          console.log(jobs);
                  res.json(jobs);
         });


 });


app.post('/workerSearch', (req,res) => {
         console.log('entered specific worker Search');


        //both city and state
         console.log(req.body.city);
         console.log(req.body.state);
        var  query = {$and:[{city:{$regex: req.body.city, $options: 'i'}},{state:{$regex: req.body.state, $options: 'i'}}]}

        Worker.find(query, (err, workers) => {
                 if (err) return console.log(err);
                          console.log(workers);
                  res.json(workers);
         });
        
        
 });


app.post('/getJob', (req,res) => {
         console.log('entered getJob');

         console.log(req.body._id);

         Job.findOne({_id: req.body._id}, (err, job) => {
                 if (err) return console.log(err);
                  res.json(job);
         });
 });

app.post('/hire', (req,res) => {
Worker.findOne({email: req.body.email},(err,worker)=>{
                 console.log(req.body.email);
                console.log(worker);
             }).then(worker => {
                 //test.name = req.body.title;
                 //test.details = req.body.details;

            var job = {
               job: req.body._id,
               title: req.body.title,
               description: req.body.description,
               city: req.body.city,
               state: req.body.state,

            }

            worker.jobsAppliedTo.push(job);

                 worker.save()
                   .then(worker => {
                        res.send(200);

                   })
             })



});

app.post('/applied', (req,res) => {
	var workerName = "";
	var workerPhone = "";
	var workerEmail = "";
Worker.findOne({email: req.body.email},(err,worker)=>{
                 console.log(req.body.email);
		console.log(worker);
		workerPhone = worker.phone;
		workerEmail = worker.email;
		workerName = worker.fullName;
             }).then(worker => {
                 //test.name = req.body.title;
                 //test.details = req.body.details;
               
            var job = {
               job: req.body._id,
	       title: req.body.title,
	       description: req.body.description,
	       city: req.body.city,
	       state: req.body.state,

            }

            worker.jobsAppliedTo.push(job);
                 
                 worker.save()
                   .then(worker => {
			console.log("jobs applied to saved");
         
                   })
             })
Company.findOne({email: req.body.company},(err,company)=>{
                 console.log(req.body.email);
                console.log(company);
             }).then(company => {
                 //test.name = req.body.title;
                 //test.details = req.body.details;

            var potentialHire = {
               job: req.body._id,
	       jobName: req.body.title,
               worker: req.body.email,
	       workerName: workerName,
	       phone: workerPhone,
	       email: workerEmail
            }

            company.potentialHires.push(potentialHire);

                 company.save()
                   .then(company => {
                        res.sendStatus(200);

                   })
             })


});

app.post('/getMyJobs', (req,res) => {
         console.log('entered workerSearch');

         Job.find({company: req.body.email}, (err, jobs) => {
                console.log(jobs);

                 if (err) return console.log(err);

                 res.json(jobs);
        });
 });



app.post('/getWorker', (req,res) => {
         console.log('entered workerSearch');

         Worker.findOne({email: req.body._id}, (err, worker) => {
		console.log(worker);

                 if (err) return console.log(err);

                 res.json(worker);
        });
 });


app.get('/workerSearch', (req,res) => {
         console.log('entered workerSearch');
 
         Worker.find({}, (err, workers) => {
       
		 
		 if (err) return console.log(err);
 
                 res.json(workers);
	});
 });


const port = 5004;

app.listen(port, () => console.log('server started on 5004'));
/*
worker.fname = req.body.fname;
         worker.lname = req.body.lname;
         worker.picPath = req.body.picPath;
         worker.description = req.body.description;
         worker.addressLineOne = req.body.addressLineOne;
         worker.addressLineTwo = req.body.addressLineTwo;
         worker.city = req.body.city;
         worker.state = req.body.state;
         worker.zip = req.body.zip;

         worker.workHistory = req.body.workHistory;
         worker.educationHistory = req.body.educationHistory;

         worker.filesUploaded = req.body.filesUploaded;
         worker.trades = req.body.trades;

         worker.mostPaid = req.body.mostPaid;
         worker.leastPaid = req.body.leastPaid;
         worker.vehicle = req.body.vehicle;
         worker.timeAwayFromHome = req.body.timeAwayFromHome;
         worker.distanceWillingToTravel = req.body.distanceWillingToTravel;

         worker.tools = req.body.tools;*/
