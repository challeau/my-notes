
[//]: # (TITLE MongoDB)
[//]: # (ENDPOINT /py-mongo)

# MongoDB with Python and Flask

Python's native dictionary and list data types make it second only to JavaScript for manipulating JSON documents — and well-suited to working with BSON.

PyMongo, the standard MongoDB driver library for Python, is easy to use and offers an intuitive API for accessing databases, collections, and documents.
Objects retrieved from MongoDB through PyMongo are compatible with dictionaries and lists, so we can easily manipulate, iterate, and print them.

<br/>

## 1 - Connecting Python and MongoDB Atlas

After installing `pymongo`, create a cluster on Atlas and a mongodb client:
```python
from pymongo import MongoClient


def get_database():
    # Create a client with the default host and port:
    client = MongoClient()
    # OR explicitely:
    client = MongoClient('localhost', 27017)
    # OR with an Atlas connection:
    client = MongoClient(CONNECTION_STRING)
    CONNECTION_STRING = "mongodb+srv://user:pass@cluster.mongodb.net/test_database"

    # Get a database dict style:
    db = client['test_database']
    # OR attribute style:
    db = client.test_database
    
    return db
```
An important note about databases (and collections) in MongoDB is that they are created lazily - they're created when the first document is inserted into them.

<br/>

## 2 - CRUD

### 2.1 C - creating a collection and inserting documents

To create a collection, pass the collection name to the database:
```python
db = get_database()

# attribute style
collection = db["test_collection"]
# OR dict style
collection = db.collection

```

<br/>

To insert documents, gather your data in a dict and use `.insert_one()` or `.insert_many()`:
```python
famous_creeps = [
    {
        "_id": "66",
        "name": "Lez",
        "age": "old",
        "occupation": "stay at home dad",
        "species": "human"
    },
    {
        "_id": "67",
        "name": "Sassy",
        "age": "ancient",
        "occupation": "traveller",
        "species": "sasquatch"
    }
]
collection.insert_many(famous_creeps)
```
`insert_many()` (bulk inserts) returns an instance of the `InsertManyResult` object. Get a list of the `_id`s of the inserted documents with its `inserted_ids` attribute.<br/>
`insert_one()` returns an instance of the `InsertOneResult` object. List the `_id` of the inserted document with its `inserted_id` attribute.

<br/>

After inserting the first document, the collection has actually been created on the server. We can verify this by listing all the collections in our database:
```python
db.list_collection_names()
# [test_collection]
```

Data in MongoDB is represented (and stored) using JSON-style documents. In PyMongo we use dictionaries to represent documents.<br/>
Note that documents can contain native Python types (like `datetime.datetime` instances) which will be automatically converted to and from the appropriate BSON types.

<br/>

### 2.2 R - querying

Query a single document:
```python
collection.find_one()
collection.find_one({"field": "value"})
```

Query more than one document:
```python
collection.find()
collection.find({"field": "value"})
```

#### 2.2.1 Count documents

If we just want to know how many documents match a query we can perform a `count_documents()` operation instead of a full query:
```python
# Get a count of all of the documents in a collection:
posts.count_documents({})
# OR get a count of documents that match a specific query:
posts.count_documents({"field": "value"})
```

#### 2.2.2 Query selectors

Comparison:

| Operator   | Description |
|------------|-------------|
| $eq        | ==          |
| $ne        | !=          |
| $gt        | \>          |
| $gte       | \>=         |
| $lt        | <           |
| $lte       | <=          |

<br/>

Logical:

| Name | Description                                                      |
|------|------------------------------------------------------------------|
| $and | returns all documents that match the conditions of all clauses   |
| $not | returns documents that do not match the query expression         |
| $nor | returns all documents that fail to match all clauses             |
| $or  | returns all documents that match the conditions of either clause |

<br/>

Element:

| Name    | Description                                           |
|---------|-------------------------------------------------------|
| $exists | matches documents that have the specified field       |
| $type   | selects documents if a field is of the specified type |

<br/>

Array:

| Name       | Description                                                                                     |
|------------|-------------------------------------------------------------------------------------------------|
| $all       | matches arrays that contain all elements specified in the query                                 |
| $elemMatch | selects documents if element in the array field matches all the specified $elemMatch conditions |
| $size      | selects documents if the array field is a specified size                                        |

<br/>

Projection:

| Name       | Description                                                                            |
|------------|----------------------------------------------------------------------------------------|
| $          | projects the first element in an array that matches the query condition                |
| $elemMatch | projects the first element in an array that matches the specified $elemMatch condition |
| $meta      | projects the document's score assigned during $text operation                          |
| $slice     | limits the number of elements projected from an array. Supports skip and limit slices  |

<br/>

#### 2.2.3 Use case: request URL to ObjectId

To find a document based on its `_id`, you can get an ObjectId from a request URL and convert the ObjectId from the string before passing it to `find_one()`:
```python
from bson.objectid import ObjectId

# The web framework gets post_id from the URL and passes it as a string
def get(post_id):
    # Convert from string to ObjectId:
    document = client.db.collection.find_one({'_id': ObjectId(post_id)})
```

<br/>

### 2.3 U - Update documents

Document updates are permanent and cannot be rolled back. Be careful when updating documents. This also applies to deleting documents.

MongoDB CRUD allows users to update documents in three different ways:

| Operation                                                                 | Description                                        |
|---------------------------------------------------------------------------|----------------------------------------------------|
| `db.collection.update_one(<query_selector>, {$set: {<updated_fields>}})`  | updates the first document that matches the query  |
| `db.collection.update_many(<query_selector>, {$set: {<updated_fields>}})` | updates all documents that match the query         |
| `db.collection.replace_one(<query_selector>, {$set: {<updated_fields>}})` | replaces the first document that matches the query |

<br/>

### 2.4 D - Delete documents

Use `delete_one()` or `delete_many()`.

<br/>

## 3 - Creating data models

### 3.1 Flask and MongoDB

You can use `MongoEngine` in combination with Flask. First, configure MongoDB’s information in Flask to be able to initialize the `MongoEngine` with your server, and connect the database and the server:
```python
from flask import Flask
from flask_mongoengine import MongoEngine

app.config['MONGODB_SETTINGS'] = {
    'db': 'test_database',
    'host': 'localhost',
    'port': 27017
}
db = MongoEngine()
db.init_app(app)
```

### 3.2 Create models
```python
class User(db.Document):
    name = db.StringField()
    email = db.StringField()
```

### 3.3 Query

The data in the database can be edited through the Model:
```python
User(name="megan" email="megan@gmail.com").save()   # CREATE

user = User.objects(name="doja", ...).first()      # READ

user.update(name="nicky")                           # UPDATE

user.delete()                                       # DELETE
```

<br/>
