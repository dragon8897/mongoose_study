const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  occupation: String,
});

personSchema.virtual('fullName').
  get(function() { return this.name.first + ' ' + this.name.last; }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

let connection = mongoose.createConnection('mongodb://localhost:30000/test', {
	useMongoClient: true
})

var Person = connection.model('Persons', personSchema);

connection.then(
    db => {
        Person.findOne({ 'name.last': 'Ghost' }, function (err, person) {
          if (err) return handleError(err);
          console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
        })
    },
    err = {
        
    }
);