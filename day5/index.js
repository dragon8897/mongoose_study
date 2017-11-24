const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var childSchema = new Schema({ name: 'string' });

var parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments. Caveat: single nested subdocs only work
  // in mongoose >= 4.2.0
  child: childSchema
});


let connection = mongoose.createConnection('mongodb://localhost:30000/test', {
	useMongoClient: true
})

var Parent = connection.model('Parent', parentSchema);

connection.then(
    db => {
        var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] })
        parent.children[0].name = 'Peter';

        // `parent.children[0].save()` is a no-op, it triggers middleware but
        // does **not** actually save the subdocument. You need to save the parent
        // doc.
        parent.save(function(err, data) {
            console.log('saved');
        });
    },
    err = {
        
    }
);