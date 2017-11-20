const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name : String, 
    type: String
});

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};

// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

const Animal = mongoose.model('Animal', animalSchema);
let dog = new Animal({name : 'Puppy', type : 'Dog'});

mongoose.connect('mongodb://localhost:30000/test', {
	useMongoClient: true
}).then(
	db => {
        // dog.findSimilarTypes(function(err, dogs) {
        //   console.log(dogs); // woof
        // });
        
        Animal.findByName('Puppy', function(err, animals) {
          console.log(animals);
        });
	},
	err = {
		
	}
);