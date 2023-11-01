
[//]: # (TITLE Eve & MongoEngine)
[//]: # (ENDPOINT /eve)

# MongoEngine and Eve

# 1. MongoEngine

> MongoEngine is an Object-Document Mapper, written in Python for working with MongoDB.

To install it, simply run:
```commandline
python -m pip install -U mongoengine
```

Before we can start using MongoEngine, we need to tell it how to connect to our instance of mongod:
```python
import mongoengine

mongengine.connect(<db_name>)
```

<br/>

## 1.1. Defining documents

### 1.1.1. Schemas

MongoDB is **schemaless**, which means that no schema is enforced by the database: we may add and remove fields however we want.
<br/>However, defining schemas for our documents can help to iron out bugs involving incorrect types or missing fields, and also allow us to define utility methods on our documents in the same way that traditional ORMs do.

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

 <br/>

### 1.1.2. Fields

By default, fields are not required. To make a field mandatory, set the `required` keyword argument of a field to `True`. Fields also may have validation constraints available (such as `max_length` in the example above).

Fields may also take default values, which will be used if a value is not provided. Default values may optionally be a callable, which will be called to retrieve the value.

<br/>

#### List fields

MongoDB allows storing lists of items. To add a list of items to a `Document`, use the `ListField` field type. `ListField` takes another field object as its first argument, which specifies which type elements may be stored within the list:
```python
class Page(Document):
    tags = ListField(StringField(max_length=50))
```

<br/>

#### Embedded documents
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

<br/>

#### Dictionary Fields

Often, an embedded document may be used instead of a dictionary. Generally, embedded documents are recommended as dictionaries don't support validation or custom field types. However, sometimes you will not know the structure of what you want to store; in this situation a `DictField` is appropriate: 
```python
class SurveyResponse(Document):
    date = DateTimeField()
    user = ReferenceField(User)
    answers = DictField()
```

<br/>

#### Reference fields

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

To add a ReferenceField that references the document being defined, use the string `'self'` in place of the document class as the argument to `ReferenceField`'s constructor. To reference a document that has not yet been defined, use the name of the undefined document as the constructor's argument:
```python
class Employee(Document):
    name = StringField()
    boss = ReferenceField('self')
    profile_page = ReferenceField('ProfilePage')

class ProfilePage(Document):
    content = StringField()
```

The ReferenceField object takes a keyword `reverse_delete_rule` for handling deletion rules if the reference is deleted. For example, to delete all the posts if a user is deleted, set the rule:
```python
class Post(Document):
    ...
    author = ReferenceField(User, reverse_delete_rule=CASCADE)
```

<br/>

## 1.2. CRUD 

### 1.2.1. Adding data - C U

First, create an instance of the document to be added:
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

<br/>

### 1.2.2. Accessing data - R

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

The `objects` attribute of a `Document` is actually a `QuerySet` object. This lazily queries the database only when you need the data. It may also be filtered to narrow down your query:
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

<br/>

### 1.2.3. Removing data - D

You can delete a single `Document` instance byb calling its `delete` method:
```python
bad_user = User.objects.first()
bad_user.delete()
```

<br/>

Or you can delete all documents in a matching query:
```python
User.objects(name="me").delete()
```

<br/>

## 1.3. Aggregation operations

> Aggregation operations process multiple documents and return computed results.

You can use aggregation operations to:
- Group values from multiple documents together.
- Perform operations on the grouped data to return a single result.
- Analyze data changes over time.

### 1.3.1. Aggregation pipelines

> An aggregation pipeline consists of one or more stages that process documents.

Each stage performs an operation on the input documents (filter, group, calculate...) and the output documents are passed to the next stage. 


An aggregation pipeline can return results for groups of documents (total, average, max...).

For example:
```python
db.collection.aggregate(
    // Stage 1: Filter according to a 'size' field
   {
      $match: { size: "medium" }
   },
   // Stage 2: Group remaining documents according to a 'name' field and perform calculations
   {
      $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
   }

)
```

Aggregation pipelines run with the `db.collection.aggregate()` method do not modify documents in a collection, unless the pipeline contains a `$merge` or `$out` stage.

### 1.3.2. Stages

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




# 2. Eve

> Eve is an open source Python REST API framework designed for human beings. It allows to effortlessly build and deploy highly customizable, fully featured RESTful Web Services.

Eve is powered by Flask and Cerberus, and it offers native support for MongoDB data stores.

All you need to bring your API online is a database, a configuration file (defaults to `settings.py`) or dictionary, and a launch script. 

Setting up with a dictionary:
```python
from eve import Eve

settings = {'DOMAIN': {'people': {}}}

app = Eve(settings=settings)
app.run()
```

Or with a configuration file:
```python
# run.py                                # settings.py
from eve import Eve                     DOMAIN = {'people': {}}
app = Eve()

if __name__ == '__main__':
    app.run()
```

<br/>

## 2.1. HATEOAS

API entry points adhere to the HATEOAS principle, a constraint of the REST application architecture that lets us use the hypermedia links in the API response contents. It allows the client to dynamically navigate to the appropriate resources by traversing the hypermedia links.

The term 'hypermedia' refers to any content that contains links to other forms of media such as images, movies, and text. 

Entrypoints also provide information about the resources accessible through the API. In our case there’s only one child resource available: `people`.

HATEOAS is enabled by default. Each GET response includes a `_links` section. Links provide details on their relation relative to the resource being accessed, and a title. Relations and titles can then be used by clients to dynamically updated their UI, or to navigate the API without knowing its structure beforehand. An example:
```json
{
    "_links": {
        "self": {
            "href": "people",
            "title": "people"
        },
        "parent": {
            "href": "/",
            "title": "home"
        },
        "next": {
            "href": "people?page=2",
            "title": "next page"
        },
        "last": {
            "href": "people?page=10",
            "title": "last page"
        }
    }
} 
```
HATEOAS links are always relative to the API entry point, so if your API home is at `examples.com/api/v1`, the `self` link in the above example would mean that the `people` endpoint is located at `examples.com/api/v1/people`.

<br/>

## 2.2. Interactions with the database

> By default, Eve APIs are read-only.  

To connect to a database, add the following line to the configuration:
```python
MONGO_HOST = 'localhost'
MONGO_PORT = 27017

# Skip this block if your db has no auth. But it really should.
MONGO_USERNAME = '<your username>'
MONGO_PASSWORD = '<your password>'

# Name of the database on which the user can be authenticated,
# needed if --auth mode is enabled.
MONGO_AUTH_SOURCE = '<dbname>'

MONGO_DBNAME = 'apitest'
```

You can enable the full spectrum of CRUD operations:
```python
# Enable GET, POST and DELETE at resource endpoints
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
# Enable GET, PATCH, PUT and DELETE of individual items
ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']
```

### 2.2.1. Inserting

#### Inserting a single document

```commandline
curl -d '{"firstname": "barack", "lastname": "obama"}' -H 'Content-Type: application/json' http://myapi.com/people
```

The response payload will just contain the relevant document metadata (`status`, `_updated`, `_id`, `etag`, and `links`).

When a `201 Created` is returned following a POST request, the `Location` header is also included with the response. Its value is the URI to the new document.

<br/>

#### Bulk inserting

Just enclose the documents in a JSON file:
```commandline
curl -d '[{"firstname": "barack", "lastname": "obama"}, {"firstname": "mitt", "lastname": "romney"}]' -H 'Content-Type: application/json' http://myapi.com/people
```

When multiple documents are submitted the API takes advantage of MongoDB bulk insert capabilities which means that not only there’s just one request traveling from the client to the remote API, but also that a single loopback is performed between the API server and the database.

In case of successful multiple inserts, keep in mind that the `Location` header only returns the URI of the first created document.

<br/>

#### Data validation

> Data validation is provided out-of-the-box.

Your configuration includes a schema definition for every resource managed by the API. Data sent to the API to be inserted/updated will be validated against the schema, and a resource will only be updated if validation passes.

The response will contain a success/error state for each item provided in the request

When all documents pass validation and are inserted correctly the response status is `201 Created`. If any document fails validation the response status is `422 Unprocessable Entity`, or any other error code defined by `VALIDATION_ERROR_STATUS` configuration.

To create a schema, use the Cerberus syntax:
```python
schema = {
    'firstname': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 10,
    },
    'lastname': {
        'type': 'string',
        'minlength': 1,
        'maxlength': 15,
        'required': True,
        'unique': True,
    },
    'role': {
        'type': 'list',
        'allowed': ["author", "contributor", "copy"],
    },
    'location': {
        'type': 'dict',
        'schema': {
            'address': {'type': 'string'},
            'city': {'type': 'string'}
        },
    },
    'born': {
        'type': 'datetime',
    },
}
```

<br/>

Data validation is based on the Cerberus validation system, therefore it is extensible: you can adapt it to your specific use case.

Say that your API can only accept odd numbers for a certain field value; you can extend the validation class to validate that. Or say you want to make sure that a VAT field actually matches your own country VAT algorithm; you can do that too.

As a matter of fact, Eve's MongoDB data-layer itself extends Cerberus validation by implementing the unique schema field constraint. 

Both settings have a global scope and will apply to all endpoints. You can then enable or disable HTTP methods at individual endpoint level:


<br/>

### 2.2.2. Updating

#### Conditional Requests

Each resource representation provides information on the last time it was updated (`Last-Modified`), along with a hash value computed on the representation itself (`ETag`).

These headers allow clients to perform conditional requests by using the `If-Modified-Since` header:
```commandline
curl -H "If-Modified-Since: Wed, 05 Dec 2012 09:53:07 GMT" -i http://myapi.com/people/521d6840c437dc0002d1203c
```

Or the `If-None-Match` header:
```commandline
curl -H "If-None-Match: 1234567890123456789012345678901234567890" -i http://myapi.com/people/521d6840c437dc0002d1203c
```

<br/>

#### Data Integrity and Concurrency Control

API responses include a ETag header which also allows for proper concurrency control. An ETag is a hash value representing the current state of the resource on the server.
<br/> Concurrency control applies to all edition methods: PATCH (edit), PUT (replace), DELETE (delete).

Consumers are not allowed to edit or delete a resource unless they provide an up-to-date ETag for the resource they are attempting to edit. This prevents overwriting items with obsolete versions.

When attempting one of these operations, you can get these responses:
- `428 PRECONDITION REQUIRED`. Problem: you didn't provide an ETag.
- `412 PRECONDITION FAILED`. Problem: the ETag provided does not match the ETag computed on the representation of the item currently stored.

Upon success of a patch, the server returns the new ETag, and the `_updated` value is changed. 

If your use case requires, you can opt to completely disable concurrency control. ETag match checks can be disabled by setting the `IF_MATCH` configuration variable to `False`.

Alternatively, ETag match checks can be made optional by the client if `ENFORCE_IF_MATCH` is disabled. 

<br/>

## 2.3. Rendering

Eve responses are automatically rendered as JSON. To get the response in XML, imply set the request Accept header:
```commandline
curl -H "Accept: application/xml" -i http://myapi.com
```

Alternatively, you can edit the default renderers by changing `RENDERERS` value in the settings file:
```python
RENDERERS = [
    'eve.render.XMLRenderer',
    'eve.render.JSONRenderer'
]
```

Or you can create your own renderer by subclassing `eve.render.Renderer`. Each renderer should set valid `mime` attribute and have `.render()` method implemented.

Inbound documents (for inserts and edits) are in JSON format.

> At least one renderer must always be enabled.

<br/>

## 2.4. Filtering and sorting

### 2.4.1. Filtering

Query strings are supported, allowing for filtering and sorting. Both native Mongo queries and Python conditional expressions are supported.

Here we are asking for all documents where lastname value is Doe:
```
http://myapi.com/people?where={"lastname": "Doe"}
```

Filtering on embedded document fields is possible:
```
http://myapi.com/people?where={"location.city": "San Francisco"}
```

Date fields are also easy to query on:
```
http://myapi.com/people?where={"born": {"$gte":"Wed, 25 Feb 1987 17:00:00 GMT"}}
```

Native Python syntax works like this:
```
curl -i http://myapi.com/people?where=lastname=="Doe"
```
Both syntaxes allow for conditional and logical `And`/`Or` operators, however nested and combined.

Filters are enabled by default on all document fields. However, the API maintainer can choose to blacklist some, disable them all and/or whitelist allowed ones.

<br/>

### 2.4.1. Sorting

Sorting is supported as well:
```
curl -i http://myapi.com/people?sort=city,-lastname
```
Would return documents sorted by city and then by lastname (descending).

> Prepending a minus sign to the field name reverses the sorting order for that field.

<br/>

The MongoDB data layer also supports native MongoDB syntax:
```
http://myapi.com/people?sort=[("lastname", -1)]
```

Sorting is enabled by default and can be disabled both globally and/or at resource level. It is also possible to set the default sort at every API endpoints.

<br/>

## 2.5. Event Hooks

### 2.5.1. Pre-Request event hooks

When a GET/HEAD, POST, PATCH, PUT, DELETE request is received, both a `on_pre_<method>` and a `on_pre_<method>_<resource>` event is raised. You can subscribe to these events with multiple callback functions:

```python
def pre_get_callback(resource, request, lookup):
    print('A GET request on the "%s" endpoint has just been received!' % resource)

def pre_contacts_get_callback(request, lookup):
    print('A GET request on the contacts endpoint has just been received!')

    
app = Eve()

app.on_pre_GET += pre_get_callback
app.on_pre_GET_contacts += pre_contacts_get_callback

app.run()
```

Callbacks will receive the resource being requested, the original `flask.request` object and the current lookup dictionary as arguments (only exception being the `on_pre_POST` hook which does not provide a lookup argument).

<br/>

#### Dynamic lookup filters

Since the lookup dictionary will be used by the data layer to retrieve resource documents, developers may choose to alter it in order to add custom logic to the lookup query.

Altering the lookup dictionary at runtime would have similar effects to applying Predefined Database Filters via configuration. However, you can only set static filters via configuration whereas by hooking to the `on_pre_<METHOD>` events you are allowed to set dynamic filters instead, which allows for additional flexibility.

<br/>

### 2.5.2. Post-Request Event Hooks

When a GET, POST, PATCH, PUT, DELETE method has been executed, both a `on_post_<method>` and `on_post_<method>_<resource>` event is raised. You can subscribe to these events with multiple callback functions.

```python
def post_get_callback(resource, request, payload):
    print('A GET request on the "%s" endpoint has just been received!' % resource)

def post_contacts_get_callback(request, payolad):
    print('A GET request on the contacts endpoint has just been received!')

    
app = Eve()

app.on_post_GET += post_get_callback
app.on_post_GET_contacts += post_contacts_get_callback

app.run()
```

Callbacks will receive the resource accessed, original `flask.request` object and the response payload.

<br/>

### 2.5.3. Database event hooks

Database event hooks work like request event hooks. These events are fired before and after a database action. Here is an example of how events are configured:
```python
def add_signature(resource, response):
    response['SIGNATURE'] = "A %s from eve" % resource

app = Eve()
app.on_fetched_item += add_signature
```

You may use flask's `abort()` to interrupt the database operation:
```python
from flask import abort

def check_update_access(resource, updates, original):
    abort(403)

app = Eve()
app.on_insert_item += check_update_access
```

The events are fired for resources and items if the action is available for both. And for each action two events will be fired:
- `on_<action_name>`: generic,
- `on_<action_name>_<resource_name>`: with the name of the resource.

| Action  | On what                                  | When                                                                | Event name/method signature                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|---------|------------------------------------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Fetch   | ressources<br/><br/>items<br/><br/>diffs | after<br/><br/>after<br/><br/>after                                 | `on_fetched_resource(resource_name, response)`<br/>`on_fetched_resource_<resource_name>(response)`<br/>`on_fetched_item(resource_name, response)`<br/>`on_fetched_item_<resource_name>(response)`<br/>`on_fetched_diffs(resource_name, response)`<br/>`on_fetched_diffs_<resource_name>(response)`                                                                                                                                                                               |
| Insert  | items                                    | before<br/><br/>after                                               | `on_insert(resource_name, items)`<br/>`on_insert_<resource_name>(items)`<br/>`on_inserted(resource_name, items)`<br/>`on_inserted_<resource_name>(items)`                                                                                                                                                                                                                                                                                                                        |
| Replace | items                                    | before<br/><br/>after                                               | `on_replace(resource_name, item, original)`<br/>`on_replace_<resource_name>(item, original)`<br/>`on_replaced(resource_name, item, original)`<br/>`on_replaced_<resource_name>(item, original)`                                                                                                                                                                                                                                                                                  |
| Update  | items                                    | before<br/><br/>after                                               | `on_update(resource_name, updates, original)`<br/>`on_update_<resource_name>(updates, original)`<br/>`on_updated(resource_name, updates, original)`<br/>`on_updated_<resource_name>(updates, original)`                                                                                                                                                                                                                                                                          |
| Delete  | items<br/><br/><br/><br/><br/>ressources | before<br/><br/>after<br/><br/><br/>before<br/><br/><br/><br/>after | `on_delete_item(resource_name, item)`<br/>`on_delete_item_<resource_name>(item)`<br/>`on_deleted_item(resource_name, item)`<br/>`on_deleted_item_<resource_name>(item)`<br/><br/>`on_delete_resource(resource_name)`<br/>`on_delete_resource_<resource_name>()`<br/>`on_delete_resource_originals(originals, lookup)`<br/>`on_delete_resource_originals_<resource_name>(originals, lookup)`<br/>`on_deleted_resource(resource_name)`<br/>`on_deleted_resource_<resource_name>()` |


<br/>

#### Fetch events

They are raised when items have just been read from the database and are about to be sent to the client. Registered callback functions can manipulate the items as needed before they are returned to the client.

>  item fetch events will work with Document Versioning for specific document versions like `?version=5` and all document versions with `?version=all.` 

<br/>

#### Insert events

When a POST requests hits the API and new items are about to be stored in the database, these events are fired:
- `on_insert` for every resource endpoint.
- `on_insert_<resource_name>` for the specific `<resource_name>` resource endpoint.

Callback functions could hook into these events to arbitrarily add new fields or edit existing ones.

After the items have been inserted, these two events are fired:
- `on_inserted` for every resource endpoint.
- `on_inserted_<resource_name>` for the specific `<resource_name>` resource endpoint.

> Items passed to these events as arguments come in a list. And only those items that passed validation are sent.

<br/>

#### Replace events

In the method signatures, `item` is the new item which is about to be stored and `original` is the item in the database that is being replaced. Callback functions could hook into these events to arbitrarily add or update item fields, or to perform other accessory action.

<br/>

#### Update events

In the method signatures, updates stands for updates being applied to the item and original is the item in the database that is about to be updated. Callback functions could hook into these events to arbitrarily add or update fields in updates, or to perform other accessory action.

> `last_modified` and `etag` headers will always be consistent with the state of the items on the database (they won’t be updated to reflect changes eventually applied by the callback functions).

<br/>

#### Delete events

Callback functions could hook into these events to perform accessory actions, but you can’t arbitrarily abort the delete operation at this point (use Data Validation).

Resources
If you were brave enough to enable the DELETE command on resource endpoints (allowing for wipe-out of the entire collection in one go), then you can be notified of such a disastrous occurrence by hooking a callback function to the `on_delete_resource(resource_name)` or `on_delete_resource_<resource_name>()` hooks.

Note that those two events are are useful in order to perform some business logic before the actual remove operation given the look-up and the list of originals.

<br/>

### 2.5.4. Aggregation event hooks

You can also attach one or more callbacks to your aggregation endpoints. The `before_aggregation` event is fired when an aggregation is about to be performed. Any attached callback function will receive both the endpoint name and the aggregation pipeline as arguments. The pipeline can then be altered if needed.

```python
def on_aggregate(endpoint, pipeline):
  pipeline.append({"$unwind": "$tags"})

app = Eve()
app.before_aggregation += on_aggregate
```

The `after_aggregation` event is fired when the aggregation has been performed. An attached callback function could leverage this event to modify the documents before they are returned to the client.
```python
def alter_documents(endpoint, documents):
  for document in documents:
    document['hello'] = 'well, hello!'

app = Eve()
app.after_aggregation += alter_documents
```

<br/>
