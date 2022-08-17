
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

| Operator   | Synthax                                      | selects the documents...                                                                                         |
|------------|----------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| $and       | `{ $and: [ {<exp1>}, ... , {<expN>} ] }`     | that satisfy all ``<expressions>`                                                                                |
| $or        | `{ $or: [ {<exp1>}, ... {<expN>} ] }`        | that satisfy either `<expressions>`                                                                              |
| $nor       | `{ $nor: [ {<exp1>}, ... {<expN>} ] }`       | that fail all `<expressions>`                                                                                    |
| $not       | `{ <field> : { $not: { <exp> } } }`          | that fail an `<expression>`                                                                                      |
| $ne        | `{ <field> : { $ne : <value> } }`            | where `<field>` isn't equal to `<value>`, or do not contain `<field>`                                            |
| $in        | `{ field: { $in: [<value1>, ... ] } }`       | where `<field>`'s value equals any value in the specified array                                                  |
| $nin       | `{ field: { $nin: [ <value1>, ... ] } }`     | where `<field>`'s value is not in the specified array or it does not exist                                       |
| $elemMatch | `{ field: { $elemMatch: { <exp1>, ... } } }` | that contain a field with at least one element that matches all the `<expressions>`                              |
| $exists    | `{ field: { $exists: <boolean> } }`          | that contain `<field>` (even if it's null) if `<boolean>` is true or does not contain it if `<boolean>` is false |
| $type      | `{ field: { $type: <BSON type1>, ... } }`    | where the value of `<field>` is an instance of the specified BSON type                                           |


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

# BASICS

Start the database: ```sudo service mongod start```.
Import a database from a JSON file: ```mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray```
