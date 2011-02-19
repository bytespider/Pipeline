/**
 *  @license
 *  Pipeline version @VERSION
 *  Copyright (c) 2011 Rob Griffiths (http://bytespider.eu)
 *  Pipeline is freely distributable under the terms of an MIT-style license.
 */

(function(){
	function Pipeline() {
		
	}
	
	Pipeline.prototype = {
		createCollection: function (collection) {
			this[collection] = new DocumentCollection();
			return this[collection];
		}
	};
	
	function DocumentCollection() {}
	DocumentCollection.prototype = {
		find: function () {},
		insert: function () {},
		update: function () {},
		save: function () {},
		remove: function () {},
	};
	
	window['Pipeline'] =  Pipeline;
})();

function obj() {
}
obj.prototype = [];

var prototype = {
	constructor: obj,
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

for (var i in prototype) {
	obj.prototype[i] = prototype[i];
}

var obj1 = new obj();
console.log(obj1);


// var Pipeline = (function () {
// 	var x, y, z;
// 	
// 	return (function PipelineConstructor(a) {
// 		return (function (db) {
// 			var db;
// 			
// 			function Pipeline() {};
// 			Pipeline.prototype = {
// 				collection: function (collection) {
// 					this[collection] = new DocumentCollection(collection);
// 				}
// 			};
// 			
// 			function DocumentCollection(collection) {
// 				return (function () {
// 					
// 				})();
// 			};
// 			DocumentCollection.prototype = {};
// 			
// 			return new Pipeline();
// 		})(a);
// 	});
// })();


/*var Pipeline = (function () {
	return function PipelineFactory(db) {
		var db, data = {};
		
		function Pipeline() {}
		Pipeline.prototype = {
			get name() {return db;},
			createCollection: function (collection) {
				if (!data[collection]) {
					var args = Array.prototype.slice.call(arguments, 1);
					
					data[collection] = DocumentCollection.prototype.clone.apply(this, args);
				}
				
				Object.defineProperty(this, collection, {
					configurable: true,
					enumerable: true,
					get: function () {return data[collection]},
					set: function (value) {data[collection] = value}
				});
				
				return data[collection];
			}
		}
		return new Pipeline();
	};
})();


function DocumentCollection() {
	
	var i = 0, len = arguments.length;
	if (len == 1 && typeof arguments[0] == 'number') {
		for (i; i < arguments[0]; ++i) {
			this[i];
		}
	} else {
		for (i; i < len; ++i) {
			this[i] = arguments[i];
		}
	}
	
	this.length = i;
}

var DocumentCollectionPrototype = {
	toString: function () {return this.join()},
	clone: function () {
		var args = arguments;
		function clone() {DocumentCollection.apply(this, args)}
		clone.prototype = DocumentCollection.prototype;
	
		return new clone;
	},
	
	save: function () {
		for (var i = 0, args = arguments, len = args.length; i < len; ++i) {
			if (!('_id' in arguments[i])) {
				args[i]._id = this.length;
			}
			var found = this.filter(function (item) {return item._id == args[i]._id});
			var index = this.indexOf(found[0]);
			
			if (index > -1) {
				this[i] = args[i];
			} else {
				Array.prototype.push.call(this, args[i]);
			}
		}
	},
	slice: function (offset, limit) {
		var args = Array.prototype.slice.apply(this, arguments);
		return this.clone.apply(this, args);
	},
	limit: function (limit) {
		return this.slice(0, limit);
	},
	find: function (callback) {
		return this.clone.apply(this, this.filter(callback));
	},
	count: function () {
		return this.length;
	},
	remove: function (callback) {
		this.forEach(function(element, index, array){
			callback(element) && (delete array[index]);
		});
		
		return this;
	}
};
DocumentCollectionPrototype.prototype = new Array();

DocumentCollection.prototype = DocumentCollectionPrototype;
DocumentCollection.prototype.constructor = DocumentCollection;


var db = new Pipeline('demo');
var users = db.createCollection('users');

db.users.save({name: 'rob'}, {name: 'james'});
db.users.save({_id: 0, name: 'james'});
db.users.save({name: 'andy'});
db.users.save({name: 'fi'});
console.debug(users);

var resultSeta = db.users.find(function (item) {return item.name.length == 4 });
var resultSetb = db.users.remove(function (item) {return item.name == 'rob'});
console.debug(resultSeta);
console.debug(resultSetb);*/
