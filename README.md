# Pipeline

A client-side, open source, JSON document-oriented database.

## Features

Released under the MIT. Please see LICENSE in the project root folder for more
information.

- Dynamic document-orientated schemas with JSON documents.
- Rich queries utilising familier javascript function definitions.

## Usage

###Instantiating

    var db = new Pipeline();
    db.createCollection('users'); // db is now and instance of a Pipeline db
    
    
###Inserting

Insert function takes any number of documents insert(document1, document2, ... documentN)

    db.users.insert({
    	name: 'Darth Vader',
    	age: 43
    }, {
    	name: 'Luke Skywalker',
    	age: 21
    });
    
###Searching / finding results

This example shows a simple query simpilar to SQL's `WHERE age = 21`
More keys are appended like an `AND` 
i.e. {age: 21, name: 'Darth Vader'} == `WHERE age = 21 AND name = 'Darth Vader'`
  
    var results = db.users.find({age: 21});
    
This example shows more complicated queries uing the functional syntax
The function is called on each document within the collection to determine a match.
Functions *MUST* return a boolean, `TRUE` meaning a positive match

    var results2 = db.users.find(function (){return name.indexOf('v') > -1});

## Authors

  * Rob Griffiths (rob AT bytespider DOT eu)
