/**
 *  @license
 *  Pipeline version @VERSION
 *  Copyright (c) 2011 Rob Griffiths (http://bytespider.eu)
 *  Pipeline is freely distributable under the terms of an MIT-style license.
 */

//(function(){
	var dataStore = {}, ArrayProto = Array.prototype;
	
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
		find: function () {
			if (arguments.length == 0) {
				return new DocumentCollectionCursor(dataStore[this.name]);
			}
		},
		insert: function () {
			var records = ArrayProto.slice.call(arguments, 0);
			ArrayProto.push.apply(dataStore[this.name], records);
			this.length = dataStore[this.name].length;
			return this;
		},
		update: function () {},
		save: function () {},
		remove: function () {},
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
	
	window['Pipeline'] =  Pipeline;
//})();
