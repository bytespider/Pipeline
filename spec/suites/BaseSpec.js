test('Basics', function () {
    ok(Pipeline !== undefined, 'Pipeline Constructor exists');

	var db = new Pipeline();
    ok(db instanceof Pipeline, 'new Pipeline returns a instance');
    
    ok(!(db.users instanceof DocumentCollection), 'The database has no users collection');
    
	var collection = db.createCollection('users'); // create a collection
	
    ok(collection instanceof DocumentCollection, 'Pipeline::createCollection() returns a collection');
    ok(db.users instanceof DocumentCollection, 'The database has a users collection');
    console.log(collection);
    
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
	console.log(cursor1);
	
	var cursor2 = db.users.find(function() {return age > 21;});
	equals(cursor2.length, 2, 'DocumentCollection::find() found 2 results using function query');
	console.log(cursor2);
	
	var cursor3 = db.users.find({age: 21, name: 'Luke Skywalker'});
	equals(cursor3.length, 1, 'DocumentCollection::find() found 2 results using JSON query');
	console.log(cursor3);
	
	var cursor4 = db.users.find('name == "Luke Skywalker"');
	equals(cursor4.length, 1, 'DocumentCollection::find() found 2 results using string query');
	console.log(cursor4);
	
	db.users.update({age: 43}, {name: 'Anakin Skywalker'});
	var cursor5 = db.users.find({_id: 0});
	equals(cursor5[0].name, 'Anakin Skywalker', 'DocumentCollection::update() updated record 0 with new name "Anakin Skywalker"');
	console.log(cursor5);
	
	db.users.remove(function () {return age > 800});
	var cursor6 = db.users.find();
	equals(cursor6.length, 3, 'DocumentCollection::remove() removed 1 record');
	console.log(cursor6);
	
	db.dropCollection('users');
	
	//Persistence test
	if (!db.episodes) {
		var collection = db.createCollection('episodes'); // create a collection
		console.log(collection);
		collection.insert({
			name: 'Star Wars Episode I: The Phantom Menace',
			year: 1999
		},{
			name: 'Star Wars Episode II: Attack of the Clones',
			year: 2002
		},{
			name: 'Star Wars Episode III: Revenge of the Sith',
			year: 2005
		},{
			name: 'Star Wars Episode IV: A New Hope',
			year: 1977
		},{
			name: 'Star Wars Episode V: The Empire Strikes Back',
			year: 1980
		},{
			name: 'Star Wars Episode VI: Return of the Jedi',
			year: 1983
		});
		
		alert('Inserted ' + collection.length + ' records for persistence test, Please refresh to complete');
		
	} else {
		ok(db.episodes instanceof DocumentCollection, 'The database persisted episodes collection');
	}
	
});