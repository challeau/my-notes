
# DATABSES

## Definitions

> A database is an **organized collection of data stored and accessed electronically**.

Small databases can be stored on a file system, while large databases are hosted on computer clusters or cloud storage. 

> A database management system (DBMS) is the **software that interacts with end users**, **applications**, and the **database** itself to capture and analyze the data.

The DBMS software additionally encompasses the core facilities provided to administer the database.

The sum total of the **database**, the **DBMS** and the **associated applications** can be referred to as a **database system**. Often the term "database" is also used loosely to refer to any of the DBMS, the database system or an application associated with the database.

Database systems provide a number of properties:
- **Persistence**:  data still exists after the server is turned off.
- **Reliability**: data can always be accessed.
- **Efficiency**: data is accessed faster than through regular file-based parsing.
- **Scalability**: increasing infrastructure capacity is easy.
- **Concurrency**: many clients can connect to a database simultaneously.
- **Data abstractions**: data can be stored using complex data types.
- **High-level query language**.
<br />

# MongoDB

> MongoDB is a cross-platform, document-oriented, non-relational, distributed database program.

**Document-oriented**: particular kind of NoSQL database able to 'parse' data from documents that store said data under certain 'keys', with sophisticated support for retrieval.

**Non-relational**: database that does not use the tabular schema of rows and columns found in most traditional database systems. Here, data is set in **fields**, stored in **documents**, grouped in **collections**.

**Distributed**: data is stored **across different physical locations**. It may be stored in multiple computers located in the same physical location; or maybe dispersed over a network of interconnected computers.

In practice:
- MongoDB stores data as **JSON documents**. The document data model **maps naturally to objects in application code**, making it simple for developers to learn and use. The fields in a JSON document can vary from document to document.
- **Documents can be nested** to express hierarchical relationships and to store structures such as arrays.
- Every document will be given an hexadecimal `_id` if one isn't specified during creation.


## CRUD

> **create**, **read**, **update**, and **delete** (CRUD) are the four basic operations of **persistent storage**.

CRUD is also sometimes used to describe user interface conventions that facilitate viewing, searching, and changing information using computer-based forms and reports. 

CRUD in SQLs --> insert, select, update, delete.

Most of these operations will require queries.


### Query Logical Operators

| Operator   | Synthax                                      | selects the documents...                                                                                    |
|------------|----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| $and       | `{ $and: [ {<exp1>}, ... {<expN>} ] }`     | that satisfy all `<expressions>`                                                                            |
| $or        | `{ $or: [ {<exp1>}, ... {<expN>} ] }`        | that satisfy either `<expressions>`                                                                         |
| $nor       | `{ $nor: [ {<exp1>}, ... {<expN>} ] }`       | that fail all `<expressions>`                                                                               |
| $not       | `{ <field> : { $not: { <exp> } } }`          | that fail an `<expression>`                                                                                 |
| $ne        | `{ <field> : { $ne : <value> } }`            | where `<field>` isn't equal to `<value>`, or do not contain `<field>`                                       |
| $in        | `{ field: { $in: [<value1>, ... ] } }`       | where `<field>`'s value equals any value in the specified array                                             |
| $nin       | `{ field: { $nin: [ <value1>, ... ] } }`     | where `<field>`'s value is not in the specified array or it does not exist                                  |
| $elemMatch | `{ field: { $elemMatch: { <exp1>, ... } } }` | that contain a field with at least one element that matches all the `<expressions>`                         |
| $exists    | `{ field: { $exists: <boolean> } }`          | that contain `<field>` (even if null) if `<boolean>` is true or does not contain it if `<boolean>` is false |
| $type      | `{ field: { $type: <BSON type1>, ... } }`    | where the value of `<field>` is an instance of the specified BSON type                                      |


### Create

The create commands insert new documents into a collection. If the collection doesn’t exist, the operation will create it.

``` javascript
// Add a document to the collection
db.collection.insertOne(doc);
db.collection.insert(doc);		// deprecated

// Add one or more documents to the collection
db.collection.insertMany([docs]);
```


### Read

The read command retrieves documents from the database and reads their contents.

``` javascript
// Select documents that match the <query_filter> and the fields specified in the projection object:
db.collection.find(query_filter, projection);

// Select all documents where <field> matches <value>:
db.collection.find( {<field>: <value>} );

// Select all documents
db.enemies.find({});
db.enemies.find();

// Operators can be used by wrapping operator and value in an object:
db.collection.find( { <field>: { <operator>: <value>} } );

// Fields set to 1 in the projection object will be returned, fileds set to 0 won't:
db.enemies.find({},	{ <field1>: 1, <field2>: 0 } );
```

Operators:
| Mongo Operator | Description |
|----------------|-------------|
| $eq            | ==          |
| $ne            | !=          |
| $gt            | >           |
| $gte           | >=          |
| $lt            | <           |
| $lte           | <=          |


### Update
The update commands allow us to update some fields in the document or replace a document.

``` javascript
// Update the first document that matches <filter> according to the rules set by <update>:
db.collection.updateOne(<filter>, <update>);

// Update all documents that match <filter>:
db.collection.updateMany(<filter>, <update>);

// Replace the first document that matches  <filter> with the <update> document:
// Replacing a document does not change its _id value. The _id field is immutable.
db.collection.replaceOne(<filter>, <update>);	
```


### Delete

The delete commands remove documents from our collections.

``` javascript
// Delete the first document that matches the filter object:
db.employees.deleteOne(<filter>);

// Delete all documents that match the filter object
db.employees.deleteMany(<filter>);

// Delete all documents
db.employees.deleteMany({});
db.employees.deleteMany();
```
<br />

## Basic commands

Start the database: ```sudo service mongod start```.

Import a database from a JSON file: ```mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray```


## Indexing

> Indexing allows databases to perform queries more efficiently.

When a collection doesn’t have indexes, MongoDB has to parse every single document to select the documents that match the query.<br />
If Mongo has an appropriate index to perform the query, it can decrease or limit the number of documents it needs to scan.

MongoDB automatically creates an index on the `_id` field upon the creation of a collection. Creating an index makes the parsing faster but can slow down the insertion.

### Single field index

``` javascript
// Assign an ascending index to <field>:
db.createIndex({ <field>: 1, ...});

// Assign a descending index to <field>:
db.createIndex({ <field>: -1, ...});
```


### Compound Index

Compound indexes are indexes on multiple fields. The order of the fields determine how the index stores its keys.

``` javascript
// Assign an ascending index to <field1>, and within each <field1>, a descending index to <field2>:
db.createIndex({ <field1>: 1, <field2>: -1 });
```

## Aggregation Framework

> Aggregation operations **process multiple documents** and **return computed results**. 

You can use aggregation operations to:
- Group values from multiple documents together,
- Perform operations on the grouped data to return a single result,
- Analyze data changes over time.

MongoDB’s aggregation framework is based on the concept of **data processing pipelines**. Documents enter a **multi-stage pipeline** (query == stage) that transforms the documents into an aggregated result.
**Basically, the output of one query is the input of the next query.**

| Pipeline Stages | Description                                                                                           |
|-----------------|-------------------------------------------------------------------------------------------------------|
| $match          | Filters the document stream                                                                           |
| $project        | Reshapes each document in the stream                                                                  |
| $sort           | Reorders the document stream by a specified sort key                                                  |
| $skip           | Skips the first n documents and passes the remaining documents unmodified to the pipeline             |
| $limit          | Passes the first n documents unmodified to the pipeline                                               |
| $group          | Groups input documents by a specified identifier expression and applies the accumulator expression(s) |
| $count          | Returns a count of the number of documents at this stage of the aggregation pipeline                  |
<br />

# DATA MODELS

## Document structure

It's critical to chose a coherent structure of documents when setting up databases. The structure of documents represents relationships between data.

### Referencing documents - relations

References **store the relationships between data by including links or references** from one document to another. Applications can resolve these references to access the related data.<br />
Broadly, these are **normalized data models**.
  
> Relations are associations between documents of different collections through their _id.


### Embedding documents

Another way of relating documents is by embedding them, saving the related document inside the main one.

When multiple documents (== subdocuments) are embedded in the same component, they will be an array of objects.

> A document in Mongo cannot be more than 16Mb in size, so take it easy on subdocuments.


## Mongoose

### Definitions

- **Object Document Mapper** (ODM): library that **translates data from documents** in our database **to objects** in JavaScript.
- **Data model**: defines the data, logic, and rules of the application.
- **Schema**: maps to a MongoDB collection and defines the shape of the documents within that collection.


### Setup

In the terminal:
``` bash
npm install mongoose
```

In ```app.js``` :
``` javascript
// import package:
const mongoose = require('mongoose');

// connect to the db:
mongoose
  .connect('mongodb://localhost/exampleApp')
  .then(x => console.log(`Connected to Mongo! }"`))
  .catch(err => console.error('Error connecting to mongo', err));
```

The **same instance of Mongoose is shared across your application**, meaning that once you `require` and `connect` to mongoose one time, any `require('mongoose')` in other files after that will be talking to the `exampleApp` database.

### Models

``` javascript
// define new Schema: .Schema({ <field>: <dataType> ... })
const authorSchema = new mongoose.Schema({
  name: String // OR name: { type: String, ... }
});

// create an instance: .model(<modelName>, <Schema>)
const Author = mongoose.model('Author', authorSchema); 

// embedding:
const bookSchema = new mongoose.Schema({
  title: String,
  author: [authorSchema]
});

// referencing:
const bookSchema = new mongoose.Schema({
  title: String,
  author: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Author'} ]
});

// set defaults (validation):
const biographySchema = new mongoose.Schema({
  name: String,
  picture: {
	type: String,
	default: 'images/default.png'
  }
});
```
### Validation in models

- Validation is **defined in the Schema**.
- Validation occurs when a document attempts to be saved, after defaults have been applied.
- Mongoose doesn't care about complex error message construction. **Errors have type identifiers**. For example, "min" is the identifier for the error triggered when a number doesn't meet the minimum value. The path and value that triggered the error can be accessed in the `ValidationError` object.
- Validation is an **internal piece of middleware**.
- Validation is **asynchronously recursive**: when you call Model#save, embedded documents validation is executed. If an error happens, your Model#save callback receives it.

Built-in validators:
| Field property | Possible values | Description                     |
|----------------|-----------------|---------------------------------|
| type           |                 | Sets a type for the field       |
| default        | Anything        | Sets a default value            |
| required       | true            | Adds a required validator       |
| unique         | true            | Declares a unique index         |
| enum           | An array        | Adds an enum validator          |
| min            | A number        | Sets a minimum number validator |
| max            | A number        | Sets a maximum number validator |
| minlength      | A number        | Sets a minimum length validator |
| maxlength      | A number        | Sets a maximum length validator |
| trim           | true            | Adds a trim setter              |
| lowercase      | true            | Adds an lowercase setter        |
| match          | A regex         | Sets a regex validator          |
| validate       | An object       | Adds a custom validator         |
| set            | A function      | Adds a custom setter            |


### Getters and setters

Mongoose getters and setters allow you to **execute custom logic** when getting or setting a property on a Mongoose document. 

**Getters** let you **transform data in MongoDB** into a more user friendly form, and **setters** let you **transform user data before it gets to MongoDB**.
\>\> Getters do not impact the underlying data stored in MongoDB.


### Mongoose methods

| Model method         | Description                                                  |
|----------------------|--------------------------------------------------------------|
| .find()              | Finds documents                                              |
| .findOne()           | Finds one document                                           |
| .findById()          | Finds a single document by its `_id` field                   |
| .findByIdAndUpdate() | Updates a single document based on its _id field             |
| .findByIdAndRemove() | Removes a single document based on its _id field             |
| .updateOne()         | Updates one document                                         |
| .updateMany()        | Updates many documents                                       |
| .deleteOne()         | Deletes one document                                         |
| .deleteMany()        | Deletes many documents                                       |
| .countDocuments()    | Counts number of matching documents in a database collection |


| Document method | Description                                           |
|-----------------|-------------------------------------------------------|
| save            | Saves this document                                   |
| toObject        | Converts this document into a plain javascript object |
| toString        | Helper for console.log                                |

