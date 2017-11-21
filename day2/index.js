const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

personSchema.virtual('fullName').
  get(function() { return this.name.first + ' ' + this.name.last; }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });


const Person = mongoose.model('Person', personSchema);
let axl = new Person({
  name: { first: 'Axl', last: 'Rose' }
});

mongoose.connect('mongodb://localhost:30000/test', {
	useMongoClient: true
}).then(
	db => {
        console.log(axl.fullName);
        axl.fullName = 'William Roses';
        axl.save();
	},
	err = {
		
	}
);