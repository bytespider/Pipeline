/**
 *  @license
 *  Pipeline version @VERSION
 *  Copyright (c) 2010 Rob Griffiths (http://bytespider.eu)
 *  Pipeline is freely distributable under the terms of an MIT-style license.
 */

var Pipeline = (function(){
	
})();

function obj() {
}
obj.prototype = new Array();

var prototype = {
	constructor: obj,
	toString: function () {return Array.prototype.join()},
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
	reduceRight: undefined,
};

for (var i in prototype) {
	obj.prototype[i] = prototype[i];
}

var obj1 = new obj;
console.log(obj1);

