
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

## MongoDB

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

### Create

The create commands insert new documents into a collection. If the collection doesn’t exist, the operation will create it.

Commands:

``` javascript
db.collection.insertOne(doc)		// Adds a document to the collection
db.collection.insertMany([docs])	// Adds one or more documents to the collection
db.collection.insert(doc)			// Same as .insertOne() but deprecated
```

### Read

The read command retrieves documents from the database and reads their contents. 

Commands: 
``` javascript
db.collection.find(query_filter, projection);
// query_filter > object that specifies which documents to return
// projection > object that allows us to return only certain fields from those documents

db.collection.find({<field>: <value>});		// Select all documents where <field> matches <value>.
db.enemies.find({});							// Select all documents. the empty object can be ommited.

db.collection.find(							// Operators can be used by wrapping operator and value in an object.
    { <field>: { <operator>: <value>} }
  );

db.enemies.find({},							// Will return the 1st property because its set to 1.
				{ <property1>: 1, <property2>: 0 } // Won't return the 2nd property because its set to 0.
	);
```

Operators:
| Mongo Operators | Description |
|-----------------|-------------|
| $eq             | ==          |
| $ne             | !=          |
| $gt             | >           |
| $gte            | >=          |
| $lt             | <           |
| $lte            | <=          |

### Update
The update commands allow us to update some fields in the document or replace a document:

``` javascript
db.collection.updateOne (<filter>, <update>)	// Updates the first document that matches <filter>.
// filter > object to match. If several are matched the first one is update with this command.
// update > field to be updated in the document.

db.collection.updateMany(<filter>, <update>)	// Updates all documents that match <filter>.
db.collection.replaceOne(<filter>, <update>)	// Replaces the <filter> document with the <update> document.
// Replacing a document does not change its _id value. The _id field is immutable.
```

### Delete

The delete commands remove documents from our collections.

``` javascript
db.employees.deleteOne(<filter>);	// deletes the first document that matches the filter object

db.employees.deleteMany(<filter>);	// deletes all documents that match the filter object
db.employees.deleteMany({});	// deletes all documents

```
<br />

# MONGODB BASICS

Start the database: ```sudo service mongod start```.

Import a database from a JSON file: ```mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray```


