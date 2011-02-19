# Pipeline

A client-side, open source, JSON document-oriented database.

## Features

Released under the MIT. Please see LICENSE in the project root folder for more
information.

- Dynamic document-orientated schemas with JSON documents.
- Rich queries utilising familier javascript function definitions.

## Usage

    var db = new Pipeline();
    db.createCollection('users');
    
    db.users.insert({
    	name: 'Darth Vader',
    	age: 43
    }, {
    	name: 'Luke Skywalker',
    	age: 21
    });
    
    var results = db.users.find({age: 21});
    var results2 = db.users.find(function (){return name.indexOf('v') > -1});

## Authors

  * Rob Griffiths (rob AT bytespider DOT eu)
