const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({ name: 'string', size: 'string' });


let connection = mongoose.createConnection('mongodb://localhost:30000/test', {
	useMongoClient: true
})

let Tank = connection.model('Tank', schema);

connection.then(
    db => {
        // Tank.create({ size: 'small' }, function (err, small) {
        //     console.log(err);
        //     if (err) return handleError(err);
        //     console.log('saved');
        // })
        // Tank.remove({ size: 'small' }, function (err) {
        //       if (err) return handleError(err);
        //       // removed!
        //       console.log('removed');
        //     });
        // Tank.find({ size: 'small' }).exec(function (err, t) {
//             console.log(t);
//         });
        Tank.findById('5a1667623449ea200204ee11', function (err, tank) {
            if (err) return console.log(err);
            tank.size = 'large';
            tank.save(function (err, updatedTank) {
                console.log('updated');
            });
        });
    },
    err = {
        
    }
);