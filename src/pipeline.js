	
	var adapter, dataStore = {}, ArrayProto = Array.prototype;
	
	function Pipeline() {}
	
	Pipeline.prototype = {
		createCollection: function (collection) {
			dataStore[collection] = [];
			this[collection] = new DocumentCollection(collection);
			return this[collection];
		}
	};
	
	function DocumentCollection(collection) {
		this.name = collection;
	}
	DocumentCollection.prototype = {
		length: 0,
		find: function (query) {
			var results = dataStore[this.name], fn, fnBody, filter, i;

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
			
			if (typeof query == 'function') {
				fn = query.toString();
				fnBody = fn.substring(fn.indexOf('{') + 1, fn.indexOf('}'));
			}
			
			if (fnBody) {
				filter = Function.prototype.constructor.apply(this, ['element', 'with (element) {' + fnBody + '}']);
				results = dataStore[this.name].filter(filter);
			}
			
			return new DocumentCollectionCursor(results);
		},
		insert: function (document) {
			var records = ArrayProto.slice.call(arguments, 0), i = 0, len = records.length;
			for (; i < len; ++i) {
				if (!('_id' in records[i])) {
					records[i]._id = dataStore[this.name].length;
				}
				ArrayProto.push.apply(dataStore[this.name], [records[i]]);
			}
			this.length = dataStore[this.name].length;
			return this;
		},
		update: function (criteria, newObj) {
			var records = this.find(criteria), i = 0, j, len = records.length;
			for (; i < len; ++i) {
				for (j in newObj) {
					records[i][j] = newObj[j];
				}
			}
			return this;
		},
		save: function () {},
		remove: function (criteria) {
			var records = this.find(criteria), i = 0, j, len = records.length, index;
			for (; i < len; ++i) {
				index = dataStore[this.name].indexOf(records[i]);
				if (index > -1) {
					delete dataStore[this.name][index];
				};
			}

			dataStore[this.name] = dataStore[this.name].filter(function (e) {return e !== undefined;});
			
			this.length = dataStore[this.name].length;
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
	
