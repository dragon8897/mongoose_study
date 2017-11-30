const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const assert = require('assert');

var userSchema = new Schema({
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: 'invalid number!'
    },
    required: [true, 'User phone number required']
  }
});


let connection = mongoose.createConnection('mongodb://localhost:30000/test', {
	useMongoClient: true
})

var User = connection.model('user', userSchema);

connection.then(
    db => {
        // var user = new User();
        // var error;
        //
        // user.phone = '555.0123';
        // error = user.validateSync();
        // assert.equal(error.errors['phone'].message,
        //   '555.0123 is not a valid phone number!');
        //
        // user.phone = '';
        // error = user.validateSync();
        // assert.equal(error.errors['phone'].message,
        //   'User phone number required');
        //
        // user.phone = '201-555-0123';
        // // Validation succeeds! Phone number is defined
        // // and fits `DDD-DDD-DDDD`
        // error = user.validateSync();
        // assert.equal(error, null);
        
        var opts = { runValidators: true };
        User.update({}, { phone: '201-555-012d' }, opts, function (err) {
            if (err) {
                assert.equal(err.errors.phone.message, 'invalid s number!');
            }
        });
    },
    err = {
        
    }
);