	
	var dataStore = {}, ArrayProto = Array.prototype;
	
	function Pipeline(config) {
		var dbName, adapter, itemPrefix, jsonstring, collectionName;
		
		config || (config = {});
		dbName = config.name || 'default';
		
		dataStore[dbName] = {}; // initialise global datastore with new database
	
		adapter = config.adapter || window.localStorage;
		
		this.saveDatabase = function () {
			for (var collectionName in dataStore[dbName]) {
				adapter.setItem(dbName + '.' + collectionName, JSON.stringify(dataStore[dbName][collectionName]));
			}
		};
		
		this.createCollection = function (collection) {
			return Pipeline.prototype.createCollection.call(this, collection, dbName);
		};
		
		this.dropCollection = function (collection) {
			Pipeline.prototype.dropCollection.call(this, collection, dbName);
			adapter.removeItem(dbName + '.' + collection);
		};
		
		// load from the adapter
		for (var i in adapter) {
			itemPrefix = dbName + '.';
			if (i.indexOf(itemPrefix) === 0) {
				jsonstring = adapter.getItem(i);
				collectionName = i.replace(itemPrefix, '');
				if (jsonstring) {
					dataStore[dbName][collectionName] = JSON.parse(adapter.getItem(i));
					this.createCollection(collectionName, dbName);
				}
			}
		}
	}
	
	Pipeline.prototype = {
		createCollection: function (collection, dbName) {
			if (collection in this) {
				return this[collection];
			}
			
			if (!(collection in dataStore[dbName])) {
				dataStore[dbName][collection] = [];
			}
			this[collection] = new DocumentCollection(collection, dbName);
			this[collection].saveDatabase = this.saveDatabase;
			
			this.saveDatabase();
			
			return this[collection];
		},
		dropCollection: function (collection, dbName) {
			if (collection in this) {
				delete dataStore[dbName][collection];
				delete this[collection];
			}
			this.saveDatabase();
		}
	};
	
	function DocumentCollection(collection, dbName) {
		this.name = collection;
		this.dbName = dbName;
	}
	DocumentCollection.prototype = {
		length: 0,
		find: function (query) {
			var results = dataStore[this.dbName][this.name], fn, fnBody, filter, i;

			if (typeof query == 'object') {
				fn = [];
				for (i in query) {
					var value = query[i];
					if (typeof value == 'string') {
						value = '"'+value+'"';
					}
					fn.push(i + ' == ' + value);
				}

				fnBody = 'return ' + fn.join(' && ');
			}
			
			if (typeof query == 'string') {
				fnBody = 'return ' + query;
			}
			
			if (typeof query == 'function') {
				fn = query.toString();
				fnBody = fn.substring(fn.indexOf('{') + 1, fn.indexOf('}'));
			}
			
			if (fnBody) {
				filter = Function.prototype.constructor.apply(this, ['element', 'with (element) {' + fnBody + '}']);
				results = dataStore[this.dbName][this.name].filter(filter);
			}
			
			return new DocumentCollectionCursor(results);
		},
		insert: function (newObj) {
			var records = ArrayProto.slice.call(arguments, 0), i = 0, len = records.length;
			for (; i < len; ++i) {
				if (!('_id' in records[i])) {
					records[i]._id = dataStore[this.dbName][this.name].length;
				}
				ArrayProto.push.apply(dataStore[this.dbName][this.name], [records[i]]);
			}
			this.length = dataStore[this.dbName][this.name].length;
			this.saveDatabase();
			
			return this;
		},
		update: function (criteria, newObj) {
			var records = this.find(criteria), i = 0, j, len = records.length;
			for (; i < len; ++i) {
				for (j in newObj) {
					records[i][j] = newObj[j];
				}
			}
			this.saveDatabase();
			
			return this;
		},
		save: function () {},
		remove: function (criteria) {
			var records = this.find(criteria), i = 0, j, len = records.length, index;
			for (; i < len; ++i) {
				index = dataStore[this.dbName][this.name].indexOf(records[i]);
				if (index > -1) {
					delete dataStore[this.dbName][this.name][index];
				};
			}

			dataStore[this.dbName][this.name] = dataStore[this.dbName][this.name].filter(function (e) {return e !== undefined;});
			
			this.length = dataStore[this.dbName][this.name].length;
			this.saveDatabase();
			
			return this;
		},
	};
	
	function DocumentCollectionCursor(array) {
		ArrayProto.push.apply(this, array);
	}
	DocumentCollectionCursor.prototype = [];
	 
	var extend = {
		constructor: DocumentCollectionCursor,
		toString: function () {return Array.prototype.join();},
		join: undefined,
		push: undefined,
		pop: undefined,
		concat: undefined,
		splice: undefined,
		shift: undefined,
		unshift: undefined,
		reverse: undefined,
		every: undefined,
		map: undefined,
		some: undefined,
		reduce: undefined,
		reduceRight: undefined
	};
	
	for (var i in extend) {
		DocumentCollectionCursor.prototype[i] = extend[i];
	}
	
