test('Basics', function () {
    ok(Pipeline !== undefined, 'Pipeline Constructor exists');

	var db = new Pipeline();
    ok(db instanceof Pipeline, 'new Pipeline returns a instance');
    
    equals(db.users, undefined, 'The database has no users collection');
    
	var collection = db.createCollection('users'); // create a collection
	
    ok(collection instanceof DocumentCollection, 'Pipeline::createCollection() returns a collection');
    ok(db.users instanceof DocumentCollection, 'The database has a users collection');
    
    equals(typeof collection.find, 'function', 'DocumentCollection has a find function');
    equals(typeof collection.insert, 'function', 'DocumentCollection has a insert function');
    equals(typeof collection.update, 'function', 'DocumentCollection has a update function');
    equals(typeof collection.save, 'function', 'DocumentCollection has a save function');
    equals(typeof collection.remove, 'function', 'DocumentCollection has a remove function');
    equals(typeof collection.length, 'number', 'DocumentCollection has a length property');
    
    collection.insert({
    	name: 'Darth Vader',
    	age: 43
    });
    equals(collection.length, 1, 'DocumentCollection has 1 new record after insert');
    
    collection.insert({
    	name: 'Leia Organa Solo',
    	age: 21
    });
    collection.insert({
    	name: 'Luke Skywalker',
    	age: 21
    },{
    	name: 'Yoda',
    	age: 899
    });
    equals(collection.length, 4, 'DocumentCollection has 4 records');
    
    var cursor1 = db.users.find();
    ok(cursor1 instanceof DocumentCollectionCursor, 'DocumentCollection::find() returns a cursor');
	
	var cursor2 = db.users.find(function() {return age > 21;});
	equals(cursor2.length, 2, 'DocumentCollection::find() found 2 results using function query');
	
	var cursor3 = db.users.find({age: 21, name: 'Luke Skywalker'});
	equals(cursor3.length, 1, 'DocumentCollection::find() found 2 results using JSON query');
});