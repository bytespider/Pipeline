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

