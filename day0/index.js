let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:30000/test', {
	useMongoClient: true
}).then(
	db => {
		console.log(db);
	},
	err = {
		
	}
);