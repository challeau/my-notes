
[//]: # (TITLE Eve)
[//]: # (ENDPOINT /eve)

# Eve

> Eve is an **open source Python REST API framework** designed for human beings. It allows to effortlessly build and deploy highly customizable, fully featured RESTful Web Services.

Eve is **powered by Flask and Cerberus**, and it offers **native support for MongoDB** data stores.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Configuration](#1---configuration)
    - [1.1 - Setup](#11---setup)
    - [1.2 - Global Configuration](#12---global-configuration)
    - [1.3 - Domain configuration](#13---domain-configuration)
- [2 - HATEOAS](#2---hateoas)
- [3 - Interactions with the database](#3---interactions-with-the-database)
    - [3.1 - Inserting](#31---inserting)
        - [3.1.1 - Inserting a single document](#311---inserting-a-single-document)
        - [3.1.2 - Bulk inserting](#312---bulk-inserting)
        - [3.1.3 - Data validation](#313---data-validation)
    - [3.2 - Updating](#32---updating)
        - [3.2.1 - Conditional Requests](#321---conditional-requests)
        - [3.2.2 - Data Integrity and Concurrency Control](#322---data-integrity-and-concurrency-control)
- [4 - Rendering](#4---rendering)
- [5 - Filtering and sorting](#5---filtering-and-sorting)
    - [5.1 - Filtering](#51---filtering)
    - [5.2 - Sorting](#52---sorting)
- [6 - Event Hooks](#6---event-hooks)
    - [6.1 - Pre-Request event hooks](#61---pre-request-event-hooks)
        - [Dynamic lookup filters](#dynamic-lookup-filters)
    - [6.2 - Post-Request Event Hooks](#62---post-request-event-hooks)
    - [6.3 - Database event hooks](#63---database-event-hooks)
        - [6.3.1 - Fetch events](#631---fetch-events)
        - [6.3.2 - Insert events](#632---insert-events)
        - [6.3.3 - Replace events](#633---replace-events)
        - [6.3.4 - Update events](#634---update-events)
        - [6.3.5 - Delete events](#635---delete-events)
    - [6.4 - Aggregation event hooks](#64---aggregation-event-hooks)
- [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Configuration

### 1.1 - Setup

All you need to bring your API online is:
 - a **database**,
 - a **configuration file** or **dictionary**,
 - a **launch script**. 
 
Generally, Eve configuration is best done with configuration files. The configuration files themselves are actual Python files. However, Eve will give precedence to dictionary-based settings first, then it will try to locate a file passed in `EVE_SETTINGS` environmental variable (if set) and finally it will try to locate `settings.py` or a file with filename passed to ths `settings` flag in the constructor.

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

### 1.2 - Global Configuration

Besides defining the general API behavior, **most global configuration settings** are used to **define the standard endpoint ruleset**, and can be fine-tuned later, when configuring individual endpoints. Global configuration settings are **always uppercase**.

| Setting                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `URL_PREFIX`                                                                                          | URL prefix for all API endpoints. Will be used in conjunction with API_VERSION to build API endpoints. Defaults to `''`.                                                                                                                                                                                                                                                                               |
| `API_VERSION`                                                                                         | API version. Defaults to `''`.                                                                                                                                                                                                                                                                                                                                                                         |
| `ALLOWED_FILTERS`                                                                                     | List of fields on which filtering is allowed. Entries in this list work in a hierarchical way. Can be set to `[]` (no filters allowed) or `['*']` (filters allowed on every field). Unless your API is comprised of just one endpoint, this global setting should be used as an on/off switch, delegating explicit whitelisting at the local level (see `allowed_filters` below). Defaults to `['*']`. |
| `SORTING`                                                                                             | `True` if sorting is supported for GET requests, otherwise `False`. Can be overridden by resource settings. Defaults to `True`.                                                                                                                                                                                                                                                                        |
| `PAGINATION`                                                                                          | `True` if pagination is supported for GET requests, otherwise `False`. Can be overridden by resource settings. Defaults to `True`.                                                                                                                                                                                                                                                                     |
| `DATE_FORMAT`                                                                                         | A Python date format used to parse and render datetime values. When serving requests, matching JSON strings will be parsed and stored as datetime values. In responses, datetime values will be rendered as JSON strings using this format. Defaults to `a, %d %b %Y %H:%M:%S GMT`.                                                                                                                    |
| `RESOURCE_METHODS`                                                                                    | A list of HTTP methods supported at resource endpoints. Allowed values: GET, POST, DELETE. Defaults to `['GET']`.                                                                                                                                                                                                                                                                                      |
| `PUBLIC_METHODS`                                                                                      | A list of HTTP methods supported at resource endpoints, open to public access even when Authentication and Authorization is enabled. Can be overridden by resource settings. Defaults to `[]`.                                                                                                                                                                                                         |
| `ITEM_METHODS`                                                                                        | A list of HTTP methods supported at item endpoints. Allowed values: GET, PATCH, PUT and DELETE. Can be overridden by resource settings. Defaults to `['GET']`.                                                                                                                                                                                                                                         |
| `ALLOWED_ROLES`                                                                                       | A list of allowed roles for resource endpoints. Can be overridden by resource settings. Defaults to `[]`.                                                                                                                                                                                                                                                                                              |
| `X_DOMAINS`                                                                                           | CORS (Cross-Origin Resource Sharing) support. Allows API maintainers to specify which domains are allowed to perform CORS requests. Allowed values are: `None`, a list of domains, or `'*'` for a wide-open API. Defaults to `None`.                                                                                                                                                                   |
| `X_HEADERS`                                                                                           | CORS (Cross-Origin Resource Sharing) support. Allows API maintainers to specify which headers are allowed to be sent with CORS requests. Allowed values are: None or a list of headers names. Defaults to None.                                                                                                                                                                                        |
| `ITEMS`<br>`META`<br>`LAST_UPDATED`<br>`DATE_CREATED`                                                 | Allows to customize corresponding fields. Defaults to `_items`, `_meta`, `_updated`, `_created`.                                                                                                                                                                                                                                                                                                       |
| `RENDERERS`                                                                                           | Allows to change enabled renderers. Defaults to `['eve.render.JSONRenderer', 'eve.render.XMLRenderer']`.                                                                                                                                                                                                                                                                                               |
| `VERSIONING`                                                                                          | Enabled documents version control when `True`. Can be overridden by resource settings. Defaults to `False`.                                                                                                                                                                                                                                                                                            |
| `MONGO_URI`<br>`MONGO_HOST`<br>`MONGO_PORT`<br>`MONGO_USERNAME`<br>`MONGO_PASSWORD`<br>`MONGO_DBNAME` | MongoDB settings.                                                                                                                                                                                                                                                                                                                                                                                      |
| `MONGO_OPTIONS`                                                                                       | MongoDB keyword arguments to be passed to MongoClient class `__init__`. Defaults to` {'connect': True, 'tz_aware': True, 'appname': 'flask_app_name', 'uuidRepresentation': 'standard'}`.                                                                                                                                                                                                              |
| `DOMAIN`                                                                                              | A dict holding the API domain definition.                                                                                                                                                                                                                                                                                                                                                              |
| `OPLOG`                                                                                               | Set it to `True` to enable the Operations Log. Defaults to `False`.                                                                                                                                                                                                                                                                                                                                    |
| `SOFT_DELETE`                                                                                         | Enables soft delete when set to `True`. Defaults to `False`.                                                                                                                                                                                                                                                                                                                                           |

### 1.3 - Domain configuration

> In Eve terminology, a domain is the **definition of the API structure**, the area where you design your API, fine-tune resources endpoints, and define validation rules.

`DOMAIN` is a Python dictionary where **keys are API resources** and **values their definitions**.

```python
# Here we define two API endpoints, 'people' and 'works', leaving their
# definitions empty.
DOMAIN = {
    'people': {
		'schema': // schema,
		'item_title': 'person',
		'resource_methods': ['GET', 'POST']
	},
    'works': {},
}
```

Endpoint customization is mostly done by **overriding** some global settings, but other unique settings are also available. Resource settings are **always lowercase**.

See full list of customizations [here](https://docs.python-eve.org/en/stable/config.html#resource-item-endpoints).


## 2 - HATEOAS

> Hypermedia as the Engine of Application State 

**API entry points adhere to the HATEOAS principle**, a constraint of the REST application architecture that lets us use the hypermedia links in the API response contents. It **allows the client to dynamically navigate to the appropriate resources by traversing the hypermedia links**.

The term **'hypermedia'** refers to **any content that contains links to other forms of media** such as images, movies, and text. 

Entrypoints also provide **information about the resources accessible through the API**. In our case there's only one child resource available: `people`.

HATEOAS is **enabled by default**. Each GET response includes a `_links` section. Links **provide details on their relation relative to the resource being accessed**, and a **title**. Relations and titles can then be used by clients to **dynamically updated their UI**, or to **navigate the API** without knowing its structure beforehand. 

An example:

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

HATEOAS links are **always relative to the API entry point**, so if your API home is at `examples.com/api/v1`, the `self` link in the above example would mean that the `people` endpoint is located at `examples.com/api/v1/people`.


## 3 - Interactions with the database

> By default, Eve APIs are **read-only**.

To **connect** to a database, add the following line to the configuration:

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

You can **enable the full spectrum of CRUD operations**:
```python
# Enable GET, POST and DELETE at resource endpoints
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']
# Enable GET, PATCH, PUT and DELETE of individual items
ITEM_METHODS = ['GET', 'PATCH', 'PUT', 'DELETE']
```

### 3.1 - Inserting

#### 3.1.1 - Inserting a single document

```bash
curl -d '{"firstname": "barack", "lastname": "obama"}' -H 'Content-Type: application/json' http://myapi.com/people
```

The response payload will just contain the relevant document metadata (`status`, `_updated`, `_id`, `etag`, and `links`).

When a `201 Created` is returned following a POST request, the `Location` header is also included with the response. Its value is the URI to the new document.


#### 3.1.2 - Bulk inserting

Just enclose the documents in a JSON file:

```bash
curl -d '[{"firstname": "barack", "lastname": "obama"}, {"firstname": "mitt", "lastname": "romney"}]' -H 'Content-Type: application/json' http://myapi.com/people
```

When multiple documents are submitted the API takes advantage of MongoDB bulk insert capabilities which means that just **one request travels** from the client to the remote API, and a **single loopback is performed** between the API server and the database.

In case of successful multiple inserts, keep in mind that the `Location` header only returns the URI of the **first** created document.

#### 3.1.3 - Data validation

Data validation is **provided out-of-the-box**. Your **configuration** includes a **schema definition for every resource managed by the API**. Data sent to the API to be inserted/updated will be **validated against the schema**, and a resource will only be updated if validation passes.

The response will contain a success/error state for each item provided in the request.

When all documents pass validation and are inserted correctly the response status is `201 Created`. If any document fails validation the response status is `422 Unprocessable Entity`, or any other error code defined by `VALIDATION_ERROR_STATUS` configuration.

To create a schema, use the **Cerberus syntax**:

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

Data validation is **based on the Cerberus validation system**, therefore it is extensible: you can adapt it to your specific use case. Say that your API can only accept odd numbers for a certain field value; you can extend the validation class to validate that. Or say you want to make sure that a VAT field actually matches your own country VAT algorithm; you can do that too. As a matter of fact, **Eve's MongoDB data-layer itself extends Cerberus validation** by implementing the unique **schema field** constraint. 

### 3.2 - Updating

#### 3.2.1 - Conditional Requests

**Each resource representation** provides information on the **last time it was updated** (`Last-Modified`), along with a **hash value** computed on the representation itself (`ETag`).

These headers allow clients to perform conditional requests by using the `If-Modified-Since` header:

```bash
curl -H "If-Modified-Since: Wed, 05 Dec 2012 09:53:07 GMT" -i http://myapi.com/people/521d6840c437dc0002d1203c
```

Or the `If-None-Match` header:

```bash
curl -H "If-None-Match: 1234567890123456789012345678901234567890" -i http://myapi.com/people/521d6840c437dc0002d1203c
```


#### 3.2.2 - Data Integrity and Concurrency Control

API responses include a `ETag` header which also **allows for proper concurrency control**. An `ETag` is a **hash value representing the current state** of the resource on the server. Concurrency control **applies to all edition methods**: PATCH (edit), PUT (replace), DELETE (delete).

Consumers are **not allowed to edit** or delete a resource **unless they provide an up-to-date `ETag`** for the resource they are attempting to edit. This prevents overwriting items with obsolete versions.

When attempting one of these operations, you can get these responses:
- `428 PRECONDITION REQUIRED`. Problem: you didn't provide an `ETag`.
- `412 PRECONDITION FAILED`. Problem: the `ETag` provided does not match the `ETag` computed on the representation of the item currently stored.

Upon success of a patch, the server **returns the new `ETag`**, and the `_updated` value is changed. 

If your use case requires, you can opt to completely **disable concurrency control**. `ETag` match checks can be disabled by setting the `IF_MATCH` configuration variable to `False`. Alternatively, `ETag` match checks can be made optional by the client if `ENFORCE_IF_MATCH` is disabled. 


## 4 - Rendering

Eve responses are **automatically rendered as JSON**. Inbound documents (for inserts and edits) are in JSON format.

To get the response in XML, simply set the request `Accept` header:

```bash
curl -H "Accept: application/xml" -i http://myapi.com
```

Alternatively, you can **edit the default renderers** by changing `RENDERERS` value in the settings file:

```python
RENDERERS = [
    'eve.render.XMLRenderer',
    'eve.render.JSONRenderer'
]
```

Or you can **create your own renderer** by **subclassing** `eve.render.Renderer`. Each renderer should **set valid `mime` attribute and have `.render()` method implemented**.

> At least one renderer must always be enabled.


## 5 - Filtering and sorting

### 5.1 - Filtering

**Query strings are supported**, allowing for filtering and sorting. Both **native Mongo queries** and **Python conditional expressions** are supported.

Here we are asking for all documents where `lastname` value is Doe:

```
http://myapi.com/people?where={"lastname": "Doe"}
```

**Filtering on embedded document fields** is possible:

```
http://myapi.com/people?where={"location.city": "San Francisco"}
```

Date fields are also easy to query on:

```
http://myapi.com/people?where={"born": {"$gte":"Wed, 25 Feb 1987 17:00:00 GMT"}}
```

**Native Python syntax** works like this:

```
curl -i http://myapi.com/people?where=lastname=="Doe"
```
Both syntaxes allow for conditional and logical `And`/`Or` operators, however nested and combined.

Filters are enabled by default on all document fields. However, the API maintainer can choose to **blacklist** some, disable them all and/or whitelist allowed ones by setting the `ALLOWED_FILTERS` global configuration setting.

> If API scraping or DB DoS attacks are a concern, then globally disabling filters and whitelisting valid ones at the local level is the way to go.


### 5.2 - Sorting

Sorting is supported as well:

```
curl -i http://myapi.com/people?sort=city,-lastname
```

This would return documents sorted by city and then by lastname (descending).

> Prepending a minus sign to the field name reverses the sorting order for that field.


The MongoDB data layer also supports native MongoDB syntax:

```
http://myapi.com/people?sort=[("lastname", -1)]
```

**Sorting is enabled by default** and **can be disabled both globally and/or at resource level** by setting the `SORTING` global configuration setting. It is also possible to **set the default sort** at every API endpoints by setting the `default_sort` field of the `DOMAIN` global configuration setting.


## 6 - Event Hooks

### 6.1 - Pre-Request event hooks

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

Callbacks will **receive the resource** being requested, the **original `flask.request` object** and the **current lookup dictionary** as arguments (only exception being the `on_pre_POST` hook which does not provide a lookup argument).


#### Dynamic lookup filters

Since the lookup dictionary will be used by the data layer to retrieve resource documents, developers may choose to alter it in order to **add custom logic to the lookup query.**

Altering the lookup dictionary at runtime would have similar effects to applying Predefined Database Filters via configuration. However, you can only set static filters via configuration whereas by hooking to the `on_pre_<METHOD>` events you are **allowed to set dynamic filters** instead, which allows for additional flexibility.


### 6.2 - Post-Request Event Hooks

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


### 6.3 - Database event hooks

**Database event hooks work like request event hooks**. These events are fired before and after a database action. Here is an example of how events are configured:

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

The events are fired for resources and items **if the action is available for both**. And for each action two events will be fired:
- `on_<action_name>`: generic,
- `on_<action_name>_<resource_name>`: with the name of the resource.

| Action  | On what                                  | When                                                                | Event name/method signature                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|---------|------------------------------------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Fetch   | ressources<br/><br/>items<br/><br/>diffs | after<br/><br/>after<br/><br/>after                                 | `on_fetched_resource(resource_name, response)`<br/>`on_fetched_resource_<resource_name>(response)`<br/>`on_fetched_item(resource_name, response)`<br/>`on_fetched_item_<resource_name>(response)`<br/>`on_fetched_diffs(resource_name, response)`<br/>`on_fetched_diffs_<resource_name>(response)`                                                                                                                                                                               |
| Insert  | items                                    | before<br/><br/>after                                               | `on_insert(resource_name, items)`<br/>`on_insert_<resource_name>(items)`<br/>`on_inserted(resource_name, items)`<br/>`on_inserted_<resource_name>(items)`                                                                                                                                                                                                                                                                                                                        |
| Replace | items                                    | before<br/><br/>after                                               | `on_replace(resource_name, item, original)`<br/>`on_replace_<resource_name>(item, original)`<br/>`on_replaced(resource_name, item, original)`<br/>`on_replaced_<resource_name>(item, original)`                                                                                                                                                                                                                                                                                  |
| Update  | items                                    | before<br/><br/>after                                               | `on_update(resource_name, updates, original)`<br/>`on_update_<resource_name>(updates, original)`<br/>`on_updated(resource_name, updates, original)`<br/>`on_updated_<resource_name>(updates, original)`                                                                                                                                                                                                                                                                          |
| Delete  | items<br/><br/><br/><br/><br/>ressources | before<br/><br/>after<br/><br/><br/>before<br/><br/><br/><br/>after | `on_delete_item(resource_name, item)`<br/>`on_delete_item_<resource_name>(item)`<br/>`on_deleted_item(resource_name, item)`<br/>`on_deleted_item_<resource_name>(item)`<br/><br/>`on_delete_resource(resource_name)`<br/>`on_delete_resource_<resource_name>()`<br/>`on_delete_resource_originals(originals, lookup)`<br/>`on_delete_resource_originals_<resource_name>(originals, lookup)`<br/>`on_deleted_resource(resource_name)`<br/>`on_deleted_resource_<resource_name>()` |



#### 6.3.1 - Fetch events

They are **raised when items have just been read** from the database and are **about to be sent** to the client. Registered callback functions can manipulate the items as needed before they are returned to the client.

>  Item fetch events will work with Document Versioning for specific document versions like `?version=5` and all document versions with `?version=all.` 


#### 6.3.2 - Insert events

When a POST requests hits the API and **new items are about to be stored** in the database, these events are fired:
- `on_insert` for every resource endpoint.
- `on_insert_<resource_name>` for the specific `<resource_name>` resource endpoint.

Callback functions could hook into these events to arbitrarily add new fields or edit existing ones.

After the items have been inserted, these two events are fired:
- `on_inserted` for every resource endpoint.
- `on_inserted_<resource_name>` for the specific `<resource_name>` resource endpoint.

> Items passed to these events as arguments come in a list. And only those items that passed validation are sent.


#### 6.3.3 - Replace events

In the method signatures, `item` is the new item which is about to be stored and `original` is the item in the database that is being replaced. Callback functions could hook into these events to arbitrarily add or update item fields, or to perform other accessory action.


#### 6.3.4 - Update events

In the method signatures, updates stands for updates being applied to the item and original is the item in the database that is about to be updated. Callback functions could hook into these events to arbitrarily add or update fields in updates, or to perform other accessory action.

> `last_modified` and `etag` headers will **always be consistent** with the state of the items on the database (they won't be updated to reflect changes eventually applied by the callback functions).


#### 6.3.5 - Delete events

Callback functions could hook into these events to perform accessory actions, but you **can't arbitrarily abort the delete operation** at this point (use Data Validation).

If you were brave enough to enable the DELETE command on resource endpoints (allowing for wipe-out of the entire collection in one go), then you can be notified of such a disastrous occurrence by hooking a callback function to the `on_delete_resource(resource_name)` or `on_delete_resource_<resource_name>()` hooks.

Note that those two events are are useful in order to perform some **business logic before the actual remove operation** given the look-up and the list of originals.


### 6.4 - Aggregation event hooks

You can also **attach one or more callbacks to your aggregation endpoints**. The `before_aggregation` event is fired when an aggregation is about to be performed. Any attached callback function will **receive both the endpoint name and the aggregation pipeline** as arguments. The **pipeline can then be altered if needed**.

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

## Sources

- [Eve official doc](https://docs.python-eve.org/en/stable/features.html)
- [Global Configuration](https://docs.python-eve.org/en/stable/config.html#global)