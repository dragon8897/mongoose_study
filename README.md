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

