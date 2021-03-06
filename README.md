# mongoose_study

mongoose 学习笔记


## Day0

1. 创建连接
2. 监听连接成功

### Warning
1. connect
```
(node:1215) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
```
	- 使用 **useMongoClient** 配置：
	```
	useMongoClient: true
	```
2. Promise 
```
(node:1215) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
```
	- 使用 v8 自带的 **Promise** ：
	```
	mongoose.Promise = global.Promise;
	```


## Day1

1. 实例方法

	```
	animalSchema.methods.findSimilarTypes = function(cb) {
  		return this.model('Animal').find({ type: this.type }, cb);
	};
	```
2. 静态方法

	```
	animalSchema.statics.findByName = function(name, cb) {
		return this.find({ name: new RegExp(name, 'i') }, cb);
	};
	```
3. 查询帮助方法（链式调用）

	```
	animalSchema.query.byName = function(name) {
		return this.find({ name: new RegExp(name, 'i') });
	};
	```
	
### Questions
- 这三种方法的调用方法有什么区别？

## Day2

1. 虚拟属性（不会实际存储）

	```
	personSchema.virtual('fullName').
	  get(function() { return this.name.first + ' ' + this.name.last; }).
	  set(function(v) {
	    this.name.first = v.substr(0, v.indexOf(' '));
	    this.name.last = v.substr(v.indexOf(' ') + 1);
	  });
	```

2. 别名

	```
	var personSchema = new Schema({
	  n: {
	    type: String,
	    // Now accessing `name` will get you the value of `n`, and setting `n` will set the value of `name`
	    alias: 'name'
	  }
	});
	
	```
	
3. Schema 配置属性
    - [autoIndex](http://mongoosejs.com/docs/guide.html#autoIndex)
    - [capped](http://mongoosejs.com/docs/guide.html#capped)
    - [collection](http://mongoosejs.com/docs/guide.html#collection)
    - [emitIndexErrors](http://mongoosejs.com/docs/guide.html#emitIndexErrors)
    - [id](http://mongoosejs.com/docs/guide.html#id)
    - [_id](http://mongoosejs.com/docs/guide.html#_id)
    - [minimize](http://mongoosejs.com/docs/guide.html#minimize)
    - [read](http://mongoosejs.com/docs/guide.html#read)
    - [safe](http://mongoosejs.com/docs/guide.html#safe)
    - [shardKey](http://mongoosejs.com/docs/guide.html#shardKey)
    - [strict](http://mongoosejs.com/docs/guide.html#strict)
    - [toJSON](http://mongoosejs.com/docs/guide.html#toJSON)
    - [toObject](http://mongoosejs.com/docs/guide.html#toObject)
    - [typeKey](http://mongoosejs.com/docs/guide.html#typeKey)
    - [validateBeforeSave](http://mongoosejs.com/docs/guide.html#validateBeforeSave)
    - [versionKey](http://mongoosejs.com/docs/guide.html#versionKey)
    - [collation](http://mongoosejs.com/docs/guide.html#collation)
    - [skipVersioning](http://mongoosejs.com/docs/guide.html#skipVersioning)
    - [timestamps](http://mongoosejs.com/docs/guide.html#timestamps)
    - [retainKeyOrder](http://mongoosejs.com/docs/guide.html#retainKeyOrder)


## Day3

1. Schema 的类型定义

	- String
	- Number
	- Data
	- Buffer
	- Boolean
	- Mixed
	- Objectid
	- Array

2. 类型属性

	- All:
		- required
		- default
		- select
		- validate
		- get
		- set
		- alias

	- Indexes:
		- index
		- unique
		- sparse

	- String:
		- lowercase
		- uppercase
		- trim
		- match
		- enum

	- Number:
		- min
		- max

	- Data:
		- min
		- max

### Notice

- Dates 更改后需要使用 `doc.markmodified()` 标记更改

	```
	var Assignment = mongoose.model('Assignment', { dueDate: Date });
	Assignment.findOne(function (err, doc) {
	  doc.dueDate.setMonth(3);
	  doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE
	  
	  doc.markModified('dueDate');
	  doc.save(callback); // works
	})
	```
	
## Day4

1. `model` 创建的两种方式

	- `var Tank = mongoose.model('Tank', yourSchema);`
	- 通过 connection 创建

		```
		var connection = mongoose.createConnection('mongodb://localhost:27017/test');
		var Tank = connection.model('Tank', yourSchema);
		```
		
2. `document` 操作

	- add

	```
	Tank.create({ size: 'small' }, function (err, small) {
	  if (err) return handleError(err);
	  // saved!
	})
	```
	- remove

	```
	Tank.remove({ size: 'large' }, function (err) {
	  if (err) return handleError(err);
	  // removed!
	});
	```
	- query

	```
	Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
	```
	- update

	```
	Tank.findById(id, function (err, tank) {
	  if (err) return handleError(err);
	  
	  tank.size = 'large';
	  tank.save(function (err, updatedTank) {
	    if (err) return handleError(err);
	    res.send(updatedTank);
	  });
	});
	```
	
## Day5

1. 子文档

    ```
    var childSchema = new Schema({ name: 'string' });

    var parentSchema = new Schema({
      // Array of subdocuments
      children: [childSchema],
      // Single nested subdocuments. Caveat: single nested subdocs only work
      // in mongoose >= 4.2.0
      child: childSchema
    });
    ```

	- 增

	   ```
	   parent.children.push({ name: 'Liesl' });
	   ```
	- 删

	   ```
        // Equivalent to `parent.children.pull(_id)`
        parent.children.id(_id).remove();
        // Equivalent to `parent.child = null`
        parent.child.remove();
	   ```
	- 查

	   ```
	   var doc = parent.children.id(_id);
	   ```
	- hook

	   ```
        // Below code will print out 1-4 in order
        var childSchema = new mongoose.Schema({ name: 'string' });
        
        childSchema.pre('validate', function(next) {
          console.log('2');
          next();
        });
        
        childSchema.pre('save', function(next) {
          console.log('3');
          next();
        });
        
        var parentSchema = new mongoose.Schema({
          child: childSchema,
            });
            
        parentSchema.pre('validate', function(next) {
          console.log('1');
          next();
        });
        
        parentSchema.pre('save', function(next) {
          console.log('4');
          next();
        });
	   ```

## Day6

1. 查询数据的格式

    ```
    Person.
    find({
      occupation: /host/,
      'name.last': 'Ghost',
      age: { $gt: 17, $lt: 66 },
      likes: { $in: ['vaporizing', 'talking'] }
    }).
    limit(10).
    sort({ occupation: -1 }).
    select({ name: 1, occupation: 1 }).
    exec(callback);
    ```
    
2. 数据量较大是采用流处理模式

    ```
    var cursor = Person.find({ occupation: /host/ }).cursor();
    cursor.on('data', function(doc) {
      // Called once for every document
    });
    cursor.on('close', function() {
      // Called when done
    });
    ```
    
## Day7

### 校验

1. 內建校验

    - All
        - required
    - Number
        - min
        - max
    - String
        - enum
        - match
        - maxlength
        - minlength
2. 自定义校验
    - 同步校验

        ```
        var userSchema = new Schema({
          phone: {
            type: String,
            validate: {
              validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
              },
              message: '{VALUE} is not a valid phone number!'
            },
            required: [true, 'User phone number required']
          }
        });
        ```
    - 异步校验

        ```
        var userSchema = new Schema({
          phone: {
            type: String,
            validate: {
              // `isAsync` is not strictly necessary in mongoose 4.x, but relying
              // on 2 argument validators being async is deprecated. Set the
              // `isAsync` option to `true` to make deprecation warnings go away.
              isAsync: true,
              validator: function(v, cb) {
                setTimeout(function() {
                  var phoneRegex = /\d{3}-\d{3}-\d{4}/;
                  var msg = v + ' is not a valid phone number!';
                  // First argument is a boolean, whether validator succeeded
                  // 2nd argument is an optional error message override
                  cb(phoneRegex.test(v), msg);
                }, 5);
              },
              // Default error message, overridden by 2nd argument to `cb()` above
              message: 'Default error message'
            },
            required: [true, 'User phone number required']
          }
        });
        ```
3. update 时的校验
    - 使用配置 `runValidators: true`

        ```
        var opts = { runValidators: true };
        User.update({}, { phone: '201-555-012d' }, opts, function (err) {
            if (err) {
                assert.equal(err.errors.phone.message, 'invalid s number!');
            }
        });
        ```

