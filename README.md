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