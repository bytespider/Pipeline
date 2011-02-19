test('Basics', function () {
    ok(Pipeline !== undefined, 'Pipeline Constructor exists exists');

	var db = new Pipeline();
    ok(db instanceof Pipeline, 'Pipeline returns a instance');
    
    equals(db.users, undefined, 'The database has no users collection');
    
	var collection = db.createCollection('users'); // create a collection
	
    
    ok(collection instanceof Object, 'Pipeline::createCollection returns a collection');
    
    
    equals(typeof collection.find, 'function', 'DocumentCollection has a find function');
    equals(typeof collection.insert, 'function', 'DocumentCollection has a insert function');
    equals(typeof collection.update, 'function', 'DocumentCollection has a update function');
    equals(typeof collection.save, 'function', 'DocumentCollection has a save function');
    equals(typeof collection.remove, 'function', 'DocumentCollection has a remove function');
    
});