
[//]: # (TITLE MongoDB)
[//]: # (ENDPOINT /py-mongo)
[//]: # (PRIORITY 420)

# MongoDB & Python

MongoDB is a **document-oriented database** classified as NoSQL. It's become popular throughout the industry in recent years and integrates extremely well with Python. MongoDB uses **collections of documents instead of tables of rows** to organize and store data.

MongoDB stores data in **schemaless and flexible JSON-like documents**, meaning that you can have documents with a different set of fields in the same collection, without the need for satisfying a rigid table schema.

Python's native dictionary and list data types make it second only to JavaScript for manipulating JSON documents — and well-suited to working with BSON.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - PyMongo](#1---pymongo)
    - [1.1 - Connecting](#11---connecting)
    - [1.2 - CRUD](#12---crud)
        - [1.2.1 - Creating a collection and inserting documents](#121---creating-a-collection-and-inserting-documents)
        - [1.2.2 - Querying](#122---querying)
            - [Count documents](#count-documents)
            - [Query selectors](#query-selectors)
            - [Use case: request URL to ObjectId](#use-case-request-url-to-objectid)
        - [1.2.3 - Update documents](#123---update-documents)
        - [1.2.4 - Delete documents](#124---delete-documents)
    - [1.3 - Aggregation operations](#13---aggregation-operations)
        - [1.3.1 - Aggregation pipelines](#131---aggregation-pipelines)
        - [1.3.2 - Stages](#132---stages)
- [2 - MongoEngine](#2---mongoengine)
    - [2.1 - Connecting](#21---connecting)
    - [2.2 - Defining documents](#22---defining-documents)
        - [2.2.1 - Schemas](#221---schemas)
        - [2.2.2 - Fields](#222---fields)
            - [List fields](#list-fields)
            - [Embedded documents](#embedded-documents)
            - [Dictionary Fields](#dictionary-fields)
            - [Reference fields](#reference-fields)
    - [2.3 - CRUD ](#23---crud)
        - [2.3.1 - Creating and Updating](#231---creating-and-updating)
        - [2.3.2 - Reading data](#232---reading-data)
        - [2.3.3 - Deleting data](#233---deleting-data)
    - [2.4 - Aggregation](#24---aggregation)
- [3 - Key differences](#3---key-differences)
- [4 - Why chose MongoDB](#4---why-chose-mongodb)
- [Sources](#sources)

<!-- markdown-toc end -->


## 1 - PyMongo

PyMongo is MongoDB's **official native driver for Python**. It's a library that lets you connect to a MongoDB database and query the data stored using the MongoDB Query API. It is the recommended way to interface with the document data.

PyMongo is easy to use, and offers an **intuitive API for accessing databases, collections, and documents**.

Objects retrieved from MongoDB through PyMongo are **compatible with dictionaries and lists**, so we can easily manipulate, iterate, and print them.


### 1.1 - Connecting

After installing `pymongo` with `pip`, create a cluster on Atlas and a `mongodb` client.

```python
from pymongo import MongoClient

def get_database():
    # Create a client with the default host and port:
    client = MongoClient()

	# OR explicitely:
    client = MongoClient('localhost', 27017)

	# OR with an Atlas connection:
    CONNECTION_STRING = "mongodb+srv://user:pass@cluster.mongodb.net/test_database"
    client = MongoClient(CONNECTION_STRING)

    # Get a database dict style:
    db = client['test_database']

	# OR attribute style:
    db = client.test_database
    
    return db
```

An important note about databases (and collections) in MongoDB is that they are **created lazily** - they're created **when the first document is inserted** into them.


### 1.2 - CRUD

#### 1.2.1 - Creating a collection and inserting documents

To **create** a collection, **pass the collection name** to the database:

```python
db = get_database()

# attribute style
collection = db["test_collection"]

# OR dict style
collection = db.collection
```

To **insert** documents, gather your data in a **dict** and use `.insert_one()` or `.insert_many()`:

```python
famous_creeps = [
    {
        "_id": "66",	// omit for auto-indexing
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

`insert_many()` bulk inserts documents and returns an instance of the `InsertManyResult` object. Get a list of the `_id`s of the inserted documents with the `.inserted_ids` attribute.

`insert_one()` inserts one document and returns an instance of the `InsertOneResult` object. Get the `_id` of the inserted document with the `.inserted_id` attribute.


After inserting the first document, the collection has actually been created on the server. We can verify this by listing all the collections in our database:

```python
db.list_collection_names()
# [test_collection]
```

Note that documents can contain native Python types (like `datetime.datetime` instances) which will be automatically converted to and from the appropriate BSON types.

#### 1.2.2 - Querying

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

##### Count documents

If we just want to know how many documents match a query we can perform a `count_documents()` operation instead of a full query:

```python
# Get a count of all of the documents in a collection:
posts.count_documents({})

# OR get a count of documents that match a specific query:
posts.count_documents({"field": "value"})
```

#####  Query selectors

Comparison:

| Operator | Description |
|----------|-------------|
| $eq      | ==          |
| $ne      | !=          |
| $gt      | >           |
| $gte     | >=          |
| $lt      | <           |
| $lte     | <=          |


Logical:

| Name | Description                                                      |
|------|------------------------------------------------------------------|
| $and | returns all documents that match the conditions of all clauses   |
| $not | returns documents that do not match the query expression         |
| $nor | returns all documents that fail to match all clauses             |
| $or  | returns all documents that match the conditions of either clause |


Element:

| Name    | Description                                           |
|---------|-------------------------------------------------------|
| $exists | matches documents that have the specified field       |
| $type   | selects documents if a field is of the specified type |


Array:

| Name       | Description                                                                                     |
|------------|-------------------------------------------------------------------------------------------------|
| $all       | matches arrays that contain all elements specified in the query                                 |
| $elemMatch | selects documents if element in the array field matches all the specified $elemMatch conditions |
| $size      | selects documents if the array field is a specified size                                        |


Projection:

| Name       | Description                                                                            |
|------------|----------------------------------------------------------------------------------------|
| $          | projects the first element in an array that matches the query condition                |
| $elemMatch | projects the first element in an array that matches the specified $elemMatch condition |
| $meta      | projects the document's score assigned during $text operation                          |
| $slice     | limits the number of elements projected from an array. Supports skip and limit slices  |


##### Use case: request URL to ObjectId

To find a document based on its `_id`, you can get an ObjectId from a request URL and convert the ObjectId from the string before passing it to `find_one()`:

```python
from bson.objectid import ObjectId

# The web framework gets post_id from the URL and passes it as a string
def get(post_id):
    # Convert from string to ObjectId:
    document = client.db.collection.find_one({'_id': ObjectId(post_id)})
```

#### 1.2.3 - Update documents

**Document updates are permanent and cannot be rolled back**. Be careful when updating documents. This also applies to deleting documents. 

MongoDB CRUD allows users to update documents in three different ways:

| Operation                                                | Description                                        |
|----------------------------------------------------------|----------------------------------------------------|
| `db.collection.update_one(<query>, {$set: {<update>}})`  | updates the first document that matches the query  |
| `db.collection.update_many(<query>, {$set: {<update>}})` | updates all documents that match the query         |
| `db.collection.replace_one(<query>, {$set: {<update>}})` | replaces the first document that matches the query |


#### 1.2.4 - Delete documents

Use `delete_one()` or `delete_many()`.


### 1.3 - Aggregation operations

> Aggregation operations process multiple documents and return computed results.

You can use aggregation operations to:
- **Group values** from multiple documents together.
- **Perform operations** on the grouped data to **return a single result**.
- **Analyze data changes** over time.


#### 1.3.1 - Aggregation pipelines

An aggregation pipeline consists of **one or more stages that process documents**. Each stage performs an operation on the input documents (filter, group, calculate...) and the output documents are passed to the next stage. 

An aggregation pipeline can return results for groups of documents (total, average, max...).

For example:

```python
db.collection.aggregate(
    # Stage 1: Filter according to a 'size' field
   {
      $match: { size: "medium" }
   },
   # Stage 2: Group remaining documents according to
   #          a 'name' field and perform calculations
   {
      $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
   }

)
```

Aggregation pipelines run with the `db.collection.aggregate()` method do not modify documents in a collection, unless the pipeline contains a `$merge` or `$out` stage.

#### 1.3.2 - Stages

Find the complete list [here](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#stages).

| Stage                   | Description                                                                                                                                                                                               |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$set`<br/>`$addFields` | Adds new fields to documents                                                                                                                                                                              |
| `$unset`                | Removes/excludes fields from documents                                                                                                                                                                    |
| `$project`              | Reshapes each document in the stream, such as by adding new fields or removing existing fields                                                                                                            |
| `$match`                | Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage                                                                                         |
| `$group`                | Separates documents into groups according to a "group key" (often a field)                                                                                                                                |
| `$sort`                 | Reorders the document stream by a specified sort key<br/>Only the order changes; the documents remain unmodified                                                                                          |
| `$fill`                 | Populates null and missing field values within documents                                                                                                                                                  |
| `$count`                | Returns the number of documents at this stage of the aggregation pipeline                                                                                                                                 |
| `$lookup`               | Performs a left outer join to a collection in the same database to filter in documents from the "joined" collection for processing                                                                        |
| `$merge`<br/>`$out`     | Writes the resulting documents of the aggregation pipeline to a collection<br/>Must be the last stage in the pipeline<br/>`$out` replaces the collection if it already exists, `$merge` incorporates them |



## 2 - MongoEngine

MongoEngine is an **Object-Document Mapper** built on top of PyMongo, that provides **a class-based abstraction**. This means that all the models you create are classes. 

### 2.1 - Connecting

After installing MongoEngine with `pip`, run:

```python
import mongoengine

mongengine.connect(<db_name>)
```

### 2.2 - Defining documents

#### 2.2.1 - Schemas

MongoDB is **schemaless**, which means that no schema is enforced by the database: we may add and remove fields however we want.
 However, defining schemas for our documents can **help to iron out bugs** involving incorrect types or missing fields, and also allow us to **define utility methods** on our documents in the same way that traditional ORMs do.

To define a schema for a document, **create a class** that inherits from `Document`. Fields are specified by adding **field objects as class attributes** to the document class:

```python
from mongoengine import *
import datetime

class Page(Document):
    title = StringField(max_length=200, required=True)
    date_modified = DateTimeField(default=datetime.datetime.utcnow)
```

Say we've defined a schema for blog posts. If we later want to add video posts, we don't have to modify the collection at all, we just start using the new fields we need to support video posts. This fits with the Object-Oriented principle of inheritance nicely.

In fact, MongoEngine supports this kind of modeling out of the box: all you need do is turn on inheritance by setting `allow_inheritance` to `True` in the `meta`:

```python
class Post(Document):
    title = StringField(max_length=120, required=True)
    author = ReferenceField(User)

    meta = {'allow_inheritance': True}


class TextPost(Post):
    content = StringField()


class ImagePost(Post):
    image_path = StringField()
```


#### 2.2.2 - Fields

By default, fields are not required. To make a field mandatory, set the `required` keyword argument of a field to `True`. Fields also may have validation constraints available (such as `max_length` in the example above).

Fields may also take default values, which will be used if a value is not provided. Default values may optionally be a callable, which will be called to retrieve the value.


##### List fields

MongoDB allows storing lists of items. To add a list of items to a `Document`, use the `ListField` field type. `ListField` takes another field object as its first argument, which specifies which type elements may be stored within the list:
```python
class Page(Document):
    tags = ListField(StringField(max_length=50))
```

##### Embedded documents

MongoDB has the ability to embed documents within other documents. Schemata may be defined for these embedded documents, just as they may be for regular documents. To create an embedded document, just define a document as usual, but inherit from `EmbeddedDocument` rather than `Document`:

```python
class Comment(EmbeddedDocument):
    content = StringField()
```

To embed the document within another document, use the `EmbeddedDocumentField` field type, providing the embedded document class as the first argument:

```python
class Page(Document):
    comments = ListField(EmbeddedDocumentField(Comment))

comment1 = Comment(content='Good work!')
comment2 = Comment(content='Nice article!')
page = Page(comments=[comment1, comment2])
```


##### Dictionary Fields

Often, an embedded document may be used instead of a dictionary. Generally, embedded documents are recommended as dictionaries don't support validation or custom field types. However, sometimes you will not know the structure of what you want to store; in this situation a `DictField` is appropriate: 

```python
class SurveyResponse(Document):
    date = DateTimeField()
    user = ReferenceField(User)
    answers = DictField()
```


##### Reference fields

References may be stored to other documents in the database using the `ReferenceField`. Pass in another document class as the first argument to the constructor, then simply assign document objects to the field:

```python
class User(Document):
    name = StringField()

class Page(Document):
    content = StringField()
    author = ReferenceField(User)

john = User(name="John Smith")
john.save()

post = Page(content="Test Page")
post.author = john
post.save()
```

To add a `ReferenceField` that references the document being defined, use the string `'self'` in place of the document class as the argument to `ReferenceField`'s constructor. To reference a document that has not yet been defined, use the name of the undefined document as the constructor's argument:

```python
class Employee(Document):
    name = StringField()
    boss = ReferenceField('self')
    profile_page = ReferenceField('ProfilePage')

class ProfilePage(Document):
    content = StringField()
```

The `ReferenceField` object takes a keyword `reverse_delete_rule` for handling deletion rules if the reference is deleted. For example, to delete all the posts if a user is deleted, set the rule:

```python
class Post(Document):
    ...
    author = ReferenceField(User, reverse_delete_rule=CASCADE)
```

### 2.3 - CRUD 

#### 2.3.1 - Creating and Updating

First, create an instance of the document to be added and use its method `.save()`:

```python
# one line
me = User(email='me@example.com', first_name='Me', last_name='Moi').save()

# attribute syntax
you = User(email='you@example.com')
you.first_name = 'You'
you.last_name = 'Toi'
you.save()
```

If you change a field on an object that has already been saved and then call `save()` again, the document will be updated.


#### 2.3.2 - Reading data

Each document class/subclass has an `objects` attribute, which is used to access the documents in the database collection associated with that class:

```python
# reading class related data
for user in User.objects:
    print(user.first_name)

# reading subclass-specific data
for post in Post.objects:
    print(post.title)

	if isinstance(post, TextPost):
        print(post.content)

	if isinstance(post, LinkPost):
        print(post.link_url)
```

The `objects` attribute of a `Document` is actually a `QuerySet` object. This **lazily queries** the database only when you need the data. It may also be filtered to narrow down your query:

```python
for post in Post.objects(tags='mongodb'):
    print(post.title)
```

There are also methods available on `QuerySet` objects that allow different results to be returned.
For example, calling `first()` on the `objects` attribute will return a single document, the first matched by the query you provide.

Aggregation functions may also be used on `QuerySet` objects:

```python
num_posts = Post.objects(tags='mongodb').count()
```

Fields on embedded documents may also be referred to using **field lookup syntax** by using a **double-underscore** in place of the dot in object attribute access syntax:

```python
uk_posts = Post.objects(author__country='uk')
```


#### 2.3.3 - Deleting data

You can delete a single `Document` instance by calling its `delete` method:

```python
bad_user = User.objects.first()
bad_user.delete()
```

Or you can delete all documents in a matching query:
```python
User.objects(name="me").delete()
```

### 2.4 - Aggregation

If you need to run aggregation pipelines, MongoEngine provides an entry point to Pymongo's aggregation framework through `aggregate()`:

```python
class Person(Document):
    name = StringField()

Person(name='John').save()
Person(name='Bob').save()

pipeline = [
    {"$sort" : {"name" : -1}},
    {"$project": {"_id": 0, "name": {"$toUpper": "$name"}}}
    ]
data = Person.objects().aggregate(pipeline)
```

## 3 - Key differences

PyMongo includes all the functionalities of the MongoDB Query API. It is a powerful way to perform CRUD operations on a database and provides an **easy way to build aggregation pipelines**.
When using PyMongo directly, leveraging the power of those pipelines, developers can use their database to its full potential. Using **PyMongo could also avoid some bad habits that would cause performance issues**, such as using the ORM in a for loop rather than batching up commands in PyMongo.

But MongoEngine is more abstract, and it can be easier to learn when coming from an ORM background.

## 4 - Why chose MongoDB

In general, there are three main development goals behind the MongoDB database:
 - Scale well (handles more queries just by adding more machines to the server cluster).
 - Store rich data structures.
 - Provide a sophisticated query mechanism.

It is a **distributed database**, so **high availability**, **horizontal scaling**, and **geographic distribution** are built into the system.

MongoDB provides a **powerful query language** that supports **ad hoc queries**, **indexing**, **aggregation**, **geospatial search**, **text search**, and a lot more. This presents you with a powerful tool kit to access and work with your data. 

Unique features to MongoDB (as of writing):
 - **Scalability**: from a stand-alone server to complete clusters of independent servers.
 - **Load-balancing support**: MongoDB will automatically move data across various shards.
 - **Automatic failover support**: if your primary server goes down, then a new primary will be up and running automatically.
 - **Management tools**: you can track your machines using the cloud-based MongoDB Management Service (MMS).
 - **Memory efficiency**: thanks to the memory-mapped files, MongoDB is often more efficient than relational databases.


## Sources

- [MongoDB documentation](https://www.mongodb.com/docs/manual/)
- [MongoEngine documentation](http://docs.mongoengine.org/guide/defining-documents.html)
- [Real Python](https://realpython.com/introduction-to-mongodb-and-python/)


