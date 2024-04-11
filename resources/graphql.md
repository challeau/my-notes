[//]: # (TITLE GraphQL)
[//]: # (ENDPOINT /graphql)

# GraphQL

GraphQL is a **query language for APIs**, and a **server-side runtime for executing queries** using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by **defining types** whose **fields** hold data, then **providing functions** to produce the result.

<div class="container-row code-siblings">

<div class="code-title">GrpahQL schema language</div>

```graphql
# define an object type
type User {
  id: ID
  name: String
}

# define its associated Query type which contains
# all of the fields that _can_ be queried
type Query {
  me: User
}
```

<div class="code-title">JavaScript, for example</div>

```javascript
// define functions to return the results
function Query_me(request) {
  return request.auth.user
}

function User_name(user) {
  return user.getName()
}
```

</div>

After a GraphQL service is running (typically at a URL on a web service), it can **receive GraphQL queries to validate and execute**. The service first checks a query to ensure it only refers to the types and fields defined, and then runs the provided functions to produce a result.


## 1 - Types and schemas

Every GraphQL service defines a **set of types which completely describe the set of possible data you can query** on that service. Then, when queries come in, they are **validated and executed against that schema**.

> By default, **every type is nullable**. Use the **Non-Null type modifier** (`!`) to indicate a type is required.


### 1.1 - Basic types

#### 1.1.1 - Scalar types

The **scalar types represent the leaves of the query**, the fields that **resolve to some concrete data**.

In the following query, the `name` and `appearsIn` fields will resolve to scalar types:

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
{
  hero {
    name
    appearsIn
  }
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}
```

</div>


GraphQL comes with a set of default scalar types out of the box:
- `Int`: A signed 32‐bit integer.
- `Float`: A signed double-precision floating-point value.
- `String`: A UTF‐8 character sequence.
- `Boolean`: `true` or `false`.
- `ID`: The `ID` scalar type represents a **unique identifier**, often used to refetch an object or as the key for a cache. The `ID` type is serialized in the same way as a `String`; however, defining it as an `ID` signifies that it is not intended to be human‐readable.

In most GraphQL service implementations, there is also a way to **specify custom scalar types**. For example, we could define a `Date` type:

```graphql
scalar Date
```

Then it's up to **our implementation** to **define how that type should be serialized**, **deserialized**, and **validated**. For example, you could specify that the `Date` type should always be serialized into an integer timestamp, and your client should know to expect that format for any date fields.


#### 1.1.2 - Enumeration types

Also called `Enums`, enumeration types are a special kind of scalar that is **restricted to a particular set of allowed values**. This allows you to:
- **Validate** that any arguments of this type are one of the allowed values.
- Communicate through the type system that a field will **always be one of a finite set** of values.

Here's what an `enum` definition might look like in the GraphQL schema language:

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

This means that wherever we use the type `Episode` in our schema, we expect it to be **exactly one of** `NEWHOPE`, `EMPIRE`, or `JEDI`.

Note that GraphQL service implementations in various languages will have their own language-specific way to deal with `enums`. In languages that support `enums` as a first-class citizen, the implementation might take advantage of that; in a language like JavaScript with no `enum` support, these values might be internally mapped to a set of integers. 

However, these details don't leak out to the **client**, which **can operate entirely** in terms of the **string names** of the `enum` values.

#### 1.1.3 - Type modifiers

You can apply **additional type modifiers that affect validation** of the types the schema, or in your query variable declarations:
- The *Non-Null* type modifier (`<type>!`) will make the server always expect to return a non-null value for this field, and cause an execution error if it receives a null value.
- The *List* type modifier (`[<type>]`) indicates that a given field will **return an array of that type**.

Both modifiers also work for **arguments**, and they **can be combined**.

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

Note: in this example, the `List` cannot be null, but the `Episode` can.


### 1.2 - Object types

The most basic components of a GraphQL schema are object types, which just **represent a kind of object you can fetch from your service**, and **its fields**. 

```graphql
type Character {
  name: String!
  appearsIn: [Episode!]!
  size(unit: LengthUnit = METER): Float
}
```

#### 1.2.1 - Arguments and input types

Every field on a GraphQL object type can have **zero or more arguments**, for example the length field below:

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

**All arguments are named**. Unlike languages like JavaScript and Python where functions take a list of ordered arguments, all arguments in GraphQL are passed by name specifically. In this case, the `length` field has one defined argument, `unit`.

When an argument is optional, we can define a default value. For example, if the `unit` argument is not passed it will be set to `METER` by default.

You can also easily **pass complex objects as arguments**. This is particularly valuable in the case of **mutations**, where you might want to pass in a whole object to be created. These are called **Input Types**.

In the GraphQL schema language, input types look exactly the same as regular object types, but with the keyword input instead of type:

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}
```

The fields on an input object type can themselves refer to input object types, but you can't mix input and output types in your schema. Input object types also **can't have arguments on their fields**.


#### 1.2.3 - The Query and Mutation types

Most types in your schema will just be normal object types, but there are two types that are special within a schema:

```graphql
schema {
  query: Query
  mutation: Mutation
}
```

Every GraphQL service has a `query` type and may or may not have a `mutation` type. These types are the same as a regular object type, but they are special because they **define the entry point** of every GraphQL query. 

If we want to be able to query the `hero` and `droid` fields, then the GraphQL service needs to have a `Query` type with those fields:

```graphql
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```

Mutations work in a similar way - you define fields on the `Mutation` type, and those are available as the root mutation fields you can call in your query.


> 1. Schematize data with object types `type ObjName {fieldName: FieldType}`
> 2. Schematize entrypoints with query and mutations types `type Query {fieldName: FieldType}`


### 1.3 - Interfaces

Like many type systems, GraphQL supports **interfaces**. An `interface` is an **abstract type** that includes a certain **set of fields that a type must include** to implement the interface.

For example, you could have an interface `Character` that represents any character in the Star Wars trilogy:

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

This means that any type that implements `Character` **needs to have these exact fields**, with these **arguments** and **return types**.

For example, here are some types that might implement `Character`:

```graphql
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

You can see that both of these types have **all of the fields from the `Character` interface**, but also bring in **extra fields**, `totalCredits`, `starships` and `primaryFunction`, that are specific to that particular type of character.

Interfaces are useful when you want to **return an object or set of objects**, but those might be of several **different types**. In that case, you can only query fields that exist on the interface (eg `Character`).

To ask for a field on a specific object type, you need to use an **inline fragment** (see section 2.5). 


### 1.4 - Union Types

Union types, like interfaces, allow to return one of several different types, but they **lack the ability to define any shared fields** among the constituent types.

**Members of a union type need to be concrete object types**. You can't create a union type out of interfaces or other unions.

```graphql
union SearchResult = Human | Droid | Starship
```

Since there's no shared fields with unions, you need to use an inline fragment to be able to query any fields at all (see section 2.5).


## 2 - Querries

The syntax of a querry:

```graphql
operationType operationName($varName: varType) {
  field(argument: value)
  # Queries can have comments!
}
```

The **operation type** describes what type of operation you're intending to do. It can be either `query`, `mutation`, or `subscription`. 

The **operation name** is a **meaningful and explicit name for your operation**. It is only required in multi-operation documents, but its use is encouraged because it is very helpful for debugging and server-side logging. 

You can use the shorthand syntax and omit the **operation type** and **operation name**. These two forms are equivalent:

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
query HeroName {
  hero {
    name
  }
}
```

<div class="code-title">Shorthand query</div>

```graphql
{
  hero {
    name
  }
}
```

</div>

Note: its best practice to avoid the shorthand for readability. If you use the shorthand you can't supply a name or variable definitions for your operation.


### 2.1 - Fields

At its simplest, GraphQL is about asking for specific fields on objects. 

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
query HeroName {
  hero {
    name
  }
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

</div>

The **query** has exactly the **same shape** as the **result**. This is essential to GraphQL, because you always get back what you expect, and the server knows exactly what fields the client is asking for.

Fields can also refer to `Objects`. In that case, you can make a **sub-selection of fields** for that object. GraphQL queries can **traverse related objects and their fields**, letting clients fetch lots of related data in one request, instead of making several roundtrips as one would need in a classic REST architecture.

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
query HeroNameAndFriends{
  hero {
    name
    friends {
      name
    }
  }
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

</div>


### 2.2 - Arguments

In GraphQL, **every field and nested object can get its own set of arguments**, making GraphQL a complete replacement for making multiple API fetches. You can even pass arguments into scalar fields, to implement data transformations once on the server, instead of on every client separately.

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

</div>


### 2.3 - Variables

GraphQL makes it possible to **factor dynamic values out of the query** and pass them as a separate dictionary. These values are called **variables**.

> NEVER do string interpolation to construct queries from user-supplied value.

Setting them up is easy:
1. **Declare the variables** after the operation name. It works just like the argument declaration for a function in a typed language: list all the variables (prefixed by `$`) and their type.
2. **Replace the static value** in the query by `$varName`.
3. Pass `varName: <value>` in a separate, transport-specific **variables dictionary** (usually JSON).

<div class="container-row code-siblings">

<div class="container-column">

<div class="code-title">Query</div>

```graphql
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

<div class="code-title">Variables</div>

```json
{
  "episode": "JEDI"
}
```

</div>

<div class="code-title">Result</div>

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

</div>


**Default values** can also be assigned to the variables in the query by adding the default value after the type declaration:

<div class="code-title">Query</div>

```graphql
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

To make a variable required, add `!` after its type:

<div class="code-title">Query</div>

```graphql
query HeroNameAndFriends($episode: Episode!) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```


### 2.4 - Aliases

You can't directly query for the same field with different arguments. That's why you need aliases - they let you **rename the result of a field to anything** you want.

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
{
  empireHero: hero(episode: EMPIRE) {
    name
  }

  jediHero: hero(episode: JEDI) {
    name
  }
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

</div>

In the above example, the two hero fields would have conflicted, but since we can alias them to different names, we can get **both results in one request**.


### 2.5 - Fragments

GraphQL includes **reusable units called fragments**. Fragments let you **construct sets of fields**, and then **include them in queries** where you need to. 

<div class="code-title">Syntax</div>

```graphql
fragment fragName on <type> {
  field
}
```

Requesting two heroes's friends thanks to fragments: 

<div class="container-row code-siblings">

<div class="container-column">

<div class="code-title">Fragment definition</div>

```graphql
fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

<div class="code-title">Query</div>

```graphql
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
```

</div>

<div class="code-title">Result</div>

```json
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },

    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],

      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

</div>

The concept of fragments is frequently **used to split complicated application data requirements** into smaller chunks, especially when you need to combine lots of UI components with different fragments into one initial data fetch.


#### 2.5.1 - Using variables inside fragments

It is possible for fragments to **access variables declared in the query or mutation**.

<div class="container-row code-siblings">

<div class="container-column">

<div class="code-title">Fragment definition</div>

```graphql
fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

<div class="code-title">Query</div>

```graphql
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
```

</div>

<div class="code-title">Result</div>

```json
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "friendsConnection": {
        "totalCount": 4,
        "edges": [
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          },
          {
            "node": {
              "name": "C-3PO"
            }
          }
        ]
      }
    },
    "rightComparison": {
      "name": "R2-D2",
      "friendsConnection": {
        "totalCount": 3,
        "edges": [
          {
            "node": {
              "name": "Luke Skywalker"
            }
          },
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          }
        ]
      }
    }
  }
}
```

</div>


#### 2.5.2 - Inline fragments

If you are querying a field that returns an interface or a union type, you will need to use inline fragments to **access data on the underlying concrete type**. It's easiest to see with an example:

<div class="container-row code-siblings">

<div class="container-column">

<div class="code-title">Query</div>

```graphql
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name

    ... on Droid {  # inline fragment
      primaryFunction
    }

    ... on Human {
      height
    }
  }
}
```

<div class="code-title">Variables</div>

``` json
{
  "ep": "JEDI"
}
```

</div>

<div class="code-title">Result</div>

``` json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
```

</div>

In this query, the `hero` field returns the type `Character`, which might be either a `Human` or a `Droid` depending on the `episode` argument. In the **direct selection**, you can only ask for fields that **exist on the `Character` interface**, such as `name`.

To ask for a field on the concrete type, you need to use an **inline fragment with a type condition**. 

> Named fragments can also be used in the same way, since a named fragment always has a type attached.


#### 2.5.3 - Meta fields: `__typename`

GraphQL allows you to request `__typename`, a meta field, **at any point in a query** to get the name of the object type at that point.

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
```

</div>

In the above query, `search` returns a union type that can be one of three options. It would be impossible to tell apart the different types from the client without the `__typename` field.


### 2.6 - Directives

A directive can be **attached to a field** or fragment inclusion, and can **affect execution of the query** in any way the server desires. The core GraphQL specification includes exactly two directives, which must be supported by any spec-compliant GraphQL server implementation:
- `@include(if: Boolean)`: only include this field in the result if the argument is `true`.
- `@skip(if: Boolean)`: skip this field if the argument is `true`.

<div class="code-title">Query</div>

```graphql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

With `withFriends` set as `false`:

<div class="container-row code-siblings">

<div class="code-title">Variables</div>

```json
{
  "episode": "JEDI",
  "withFriends": false
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

</div>

With `withFriends` set as `true`:

<div class="container-row code-siblings">

<div class="code-title">Variables</div>

```json
{
  "episode": "JEDI",
  "withFriends": true
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

</div>


## 3 - Mutations

Most discussions of GraphQL focus on data fetching, but any complete data platform needs a way to modify server-side data as well.

Technically any query could be implemented to cause a data write. However, it's useful to establish a convention that **any operations that cause writes should be sent explicitly via a mutation**.

Mutations are declared like querries, and can also contain multiple fields. The new data is passed like variables are.

Just like in queries, if the mutation field returns an object type, you can ask for nested fields. This can be useful for **fetching the new state of an object after an update**.

<div class="container-row code-siblings">

<div class="container-column">

<div class="code-title">Mutation</div>

```graphql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

<div class="code-title">Variables</div>

```json
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

</div>

<div class="code-title">Result</div>

```json
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

</div>

Although they're similar, there's one important distinction between queries and mutations, other than the name: while query fields are executed in parallel, **mutation fields run in series**, one after the other.

This means that if we send two mutations in one request, the **first is guaranteed to finish before the second begins**, ensuring that we don't end up with a **race condition**.


## 4 - Validation

By using the type system, it can be predetermined whether a GraphQL query is valid or not. This allows servers and clients to effectively inform developers when an invalid query has been created, without having to rely on runtime checks.

Here are *some* invalid types of querries:
- Querries for fields that don't exist on a given type.
- Querries that return something other than a scalar/enum.
- Querries for additional fields on a given scalar field.
- A fragment cannot refer to itself or create a cycle, as this could result in an unbounded result:
  ```graphql
  {
    hero {
      ...NameAndAppearancesAndFriends
    }
  }

  fragment NameAndAppearancesAndFriends on Character {
    name
    appearsIn
    friends {
      ...NameAndAppearancesAndFriends   # error
    }
  }
  ```


## 5 - Execution

After being validated, a GraphQL query is **executed by a GraphQL server** which returns a result that mirrors the shape of the requested query, typically as JSON.

> GraphQL cannot execute a query without a type system.

You can think of each field in a GraphQL query as a function or method of the previous type which returns the next type. In fact, this is exactly how GraphQL works. Ea**ch field on each type is backed by a function** called the **resolver** which is provided by the GraphQL server developer. **When a field is executed, the corresponding resolver is called to produce the next value**.

If a field produces a scalar value like a string or number, then the execution completes. However if a field produces an object value then the query will contain another selection of fields which apply to that object. This **continues until scalar values are reached**. 


### 5.1 - Root fields and resolvers

At the top level of every GraphQL server is a type that represents **all of the possible entry points** into the GraphQL API, it's often called the `Root` type or the `Query` type.

A resolver function receives four arguments:
- `obj`: the **previous object**, which for a field on the root `Query` type is often not used.
- `args`: the **arguments provided to the field** in the GraphQL query.
- `context`: a value which is provided to every resolver and **holds important contextual information** like the currently logged in user, or access to a database.
- `info`: a value which holds **field-specific information relevant to the current query** as well as the **schema details** (search `GraphQLResolveInfo` for more details).


### 5.2 - Trivial resolvers

<div class="code-title">JavaScript</div>

```javascript
Human: {
  name(obj, args, context, info) {
    return obj.name
  }
}
```

Note: GraphQL libraries will let you **omit resolvers** that simple and will just assume that if a resolver isn't provided for a field, that a **property of the same name should be read and returned**.


### 5.3 - Asynchronous resolvers

<div class="code-title">JavaScript</div>

```javascript
Query: {
  human(obj, args, context, info) {
    return context.db.loadHumanByID(args.id).then(
      userData => new Human(userData)
    )
  }
}
```

In this example, the `context` is used to **provide access to a database** which is used to load the data for a user by the `id` provided as an argument in the GraphQL query. Since loading from a database is an asynchronous operation, this **returns a `Promise`**. 

In JavaScript, `Promises` are used to work with asynchronous values, but the same concept exists in many languages, often called `Futures`, `Tasks` or `Deferred`. When the database returns, we can construct and return a new `Human` object.

Notice that **while the resolver function needs to be aware of Promises**, the **GraphQL query does not**. It simply expects the `human` field to return something which it can then ask the name of. **During execution, GraphQL will wait for `Promises` to complete before continuing** and will do so with optimal concurrency.

When a list of `Promises` is returned, GraphQL will **wait for all of these `Promises` concurrently** before continuing, and when left with a list of objects, it will **concurrently continue** yet again to **load the fields** on each of these items.


### 5.4 - Producing the result

As each field is resolved, the **resulting value is placed into a key-value map** with the field name (or alias) as the key and the resolved value as the value. This **continues from the bottom leaf fields of the query all the way back up** to the original field on the root `Query` type. 

Collectively, these produce a **structure that mirrors the original query** which can then be sent (typically as JSON) to the client which requested it.

<div class="container-row code-siblings">

<div class="code-title">Query</div>

```graphql
{
  human(id: 1002) {
    name
    appearsIn
    starships {
      name
    }
  }
}
```

<div class="code-title">Result</div>

```json
{
  "data": {
    "human": {
      "name": "Han Solo",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "starships": [
        {
          "name": "Millenium Falcon"
        },
        {
          "name": "Imperial shuttle"
        }
      ]
    }
  }
}
```

</div>

## 6 - Introspection

The **Schema Introspection** allows developers to **query the API schema and see all the available resources**.

This means that potential attackers can get a good understanding of your API and they can even get access to resources that are not meant to be publicly available. All this information available to potential attackers makes it easier to exploit your GraphQL API.

> Although it can be helpful, especially in the dev environment, **turning off the introspection in production is recommended**.

### 6.1 - `__schema`

The query that enables us to fetch the whole schema. It's used to gain information about the directives, available types, and available operation types.

<div class="code-title">SDL definition</div>

```graphql
type __Schema {
  types: [__Type!]!
  queryType: __Type!
  mutationType: __Type
  subscriptionType: __Type
  directives: [__Directive!]!
}
```

The basic introspection query for fetching the type system of the schema might look like this:

```graphql
{
  __schema {
    directives {
      name
      description
    }
    subscriptionType {
      name
      description
    }
    types {
      name
      description
    }
    queryType {
      name
      description
    }
    mutationType {
      name
      description
    }
  }
}
```

A lot of fields in the selection sets for `queryType`, `mutationType`, `subscriptionType` and `types` are the same, so we can define some fragments:


<div class="container-row code-siblings">

<div class="code-title">Fragment definition</div>

```graphql
# get a type's definition and its fields info
fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

# get all the info of the received input values
fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

# recursively querries info on types
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
```

<div class="code-title">Query</div>

```graphql
 query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
```

</div>

### 6.2 - `__type`

The query that unables us to get **information on the exact type** we are interested in. To do so, we are required to **specify the argument `name`** of the type. 

We can reuse the FullType fragment to get all the information:

```graphql
query introspectionPlanetType {
  __type(name: "Planet") {
    ...FullType
  }
}
```

### 6.3 - `__typename`

This query is **available through all types** when querying. This shows us **what type we are querying** and is important for caching clients like Apollo or Relay to **construct the cache**.

## 7 - Philosophy

GraphQL isn't opinionated on matters like network, authorization, and pagination. However, there are common best pracices:

- GraphQL is **typically served over HTTP via a single endpoint** which expresses the full set of capabilities of the service.
- GraphQL services typically respond using **JSON**, and it's encouraged that any production GraphQL services enable **GZIP**.
- Avoid breaking changes and **serve a versionless API**: GraphQL only returns the data that's explicitly requested, so new capabilities can be added via new types and new fields on those types without creating a breaking change.
- Use non-null types only when `null` isn't an appropriate value for a failed field. That way, if an error/exception happens, the querried field will return `null` instead of having a complete failure for the request.
- Pagination is left to the API designer, but there's a best practice pattern called "**Connections**". Some client tools for GraphQL, such as Relay, know about the Connections pattern and can automatically provide support for client-side pagination.
- Avoid repeatedly loading data from your databases by using a batching technique.

### 7.1 - Desiging the data model

> With GraphQL, you **model your business domain as a graph**.

Graphs are powerful tools for modeling many real-world phenomena because they **resemble our natural mental models and verbal descriptions of the underlying process**. With GraphQL, you model your business domain as a graph by defining a schema; within your schema, you define different types of nodes and how they connect/relate to one another. On the client.

This creates a pattern similar to Object-Oriented Programming: types that reference other types. On the server, since GraphQL only defines the interface, you have the freedom to use it with any backend.

**Your business logic layer should act as the single source of truth for enforcing business domain rules**: all validation and authorization checks will be performed at that level, and all entrypoints into the system will be processed with the same rules.

Don't try to model your entire business domain in one sitting. Rather, build only the part of the schema that you need for one scenario at a time. By gradually expanding the schema, you will get validation and feedback more frequently to steer you toward building the right solution.

### 7.2 - Serving over HTTP

HTTP is the most common choice for client-server protocol when using GraphQL because of its **ubiquity**. Here are some guidelines for setting up a GraphQL server to operate over HTTP:

- GraphQL should be placed **at the end of the request pipeline**, after all authentication middleware, so that you have access to the same session and user information you would in your HTTP endpoint handlers.
- A GraphQL server operates on a single URL/endpoint (usually `/graphql`), and **all GraphQL requests for a given service should be directed at this endpoint**.
- A GraphQL server should support `GET` and `POST` requests. The way to handle this changes with the implementation you use.
- Regardless of the method by which the query and variables were sent, the **response should be returned in the body** of the request in **JSON** format. If there were no errors returned, the "errors" field should not be present on the response. 

### 7.3 - Authorizations

> Authorization is a type of **business logic** that describes whether a given user/session/context has permission to perform an action or see a piece of data.

Enforcing this kind of behavior should happen in the **business logic layer**. Defining authorization logic inside the resolver is fine when learning GraphQL or prototyping, but it would be hard to maintain for a production codebase since you would need to duplicate this code for each entry point into the service.

It's recommended to pass a **fully-hydrated `User` object** instead of an opaque token or API key to your business logic layer. This way, we can handle the distinct concerns of authentication and authorization in different stages of the request processing pipeline.

### 7.4 - Pagination

A common use case in GraphQL is **traversing the relationship between sets of objects**. There are a number of different ways that these relationships can be exposed in GraphQL.

You can slice a field that returns a Plural type:

```graphql
{
  hero {
    name
    friends(first: 2) {
      name
    }
  }
}
```

There are different ways to paginate:

- **Offset** pagination: `friends(first:2 offset:2)`.
- **ID**-based pagination: use the **ID** of the last item that was fetched - `friends(first:2 after:$friendId)`.
- **Connection** pagination: use a cursor to the last item that was fetched: `friends(first:2 after:$friendCursor)`.

A **connection** is a way to **get all of the nodes that are connected to another node**. It's a **list of edges**, the lines that connect two nodes together, representing some kind of relationship between them.

**Cursor-based pagination is the most powerful**, especially if the cursors are **opaque**. **Either offset or ID-based** pagination can be implemented using cursor-based pagination (by making the cursor the offset or the ID), and using cursors gives **additional flexibility** if the pagination model changes in the future.

> As a reminder that the cursors are opaque and that their format should not be relied upon, we suggest base64 encoding them.

For example, if we wanted to fetch all the users that are connected to a specific user:

<div class="code-title">Query</div>

```graphql
{
  user(id: "ZW5jaG9kZSBIZWxsb1dvcmxk") {
    id
    name

    # Connection v
    friendsConnection(first: 3) {
      edges {
        cursor
        node {
          id
          name
        }
      }
      
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
```

The `friendsConnection` field returns a Collection object. The connection object will then have a field for the edges, as well as other information (like total count and information about whether a next page exists). 

Note that we also might include `endCursor` and `startCursor` in this `PageInfo` object. This way, if we don't need any of the additional information that the edge contains, we don't need to query for the edges at all, since we got the cursors needed for pagination from pageInfo.

In graph theory, **an edge can have properties of its own** which act effectively as **metadata**. For example, they can hold a timestamp to represent the date of a connection between two users.

### 7.4 - GID

To provide options for GraphQL clients to elegantly **handle caching** and **data refetching**, GraphQL servers need to **expose object identifiers in a standardized way**.

For this to work, a client will need to query via a standard mechanism to request an object by ID. Then, in the response, the schema will need to provide a standard way of providing these IDs.

Because little is known about the object other than its ID, we call these objects "nodes". Here is an example query for a node:

```graphql
{
  node(id: "4") {
    id
    ... on User {
      name
    }
  }
}
```

- The GraphQL schema is **formatted to allow fetching any object via the node field** on the root query object. This returns objects which conform to a `Node` interface.
- The `id` field can be **extracted** out of the response **safely**, and can be **stored for re-use** via **caching** and **refetching**.
- Clients can **use interface fragments** to **extract additional information** specific to the type which conform to the node interface. In this case a "User".

The `Node` interface looks like:

```graphql
# An object with a Globally Unique ID
interface Node {
  # The ID of the object.
  id: ID!
}
```

With a User conforming via:

```graphql
type User implements Node {
  id: ID!
  # Full name
  name: String!
}
```

#### 7.4.1 - The `Node` interface

The server must provide an interface called `Node`:

- It **includes exactly one field**, called `id` that **returns a non-null ID**.
- This `id` should be a **globally unique** identifier for this object.
- Given just this id, the server should be able to **refetch** the object.

<div class="container-row code-siblings">

<div class="code-title">Introspection query</div>

```graphql
{
  __type(name: "Node") {
    name
    kind
    fields {
      name
      type {
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}
```

<div class="code-title">Response</div>

```json
{
  "__type": {
    "name": "Node",
    "kind": "INTERFACE",
    "fields": [
      {
        "name": "id",
        "type": {
          "kind": "NON_NULL",
          "ofType": {
            "name": "ID",
            "kind": "SCALAR"
          }
        }
      }
    ]
  }
}
```

</div>

#### 7.4.2 - The `node` root field

The server must provide a root field called `node`:

- It must take exactly **one argument**, a **non-null ID** named `id` and returns the `Node` interface.
- When passing the value of the `id` field on an object that implements `Node`, the root field should **refetch the identical object**.
- The server may return `null` if the data can't be fetched.

<div class="container-row code-siblings">

<div class="code-title">Introspection query</div>

```graphql
{
  __schema {
    queryType {
      fields {
        name
        type {
          name
          kind
        }
        args {
          name
          type {
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
}
```

<div class="code-title">Response</div>

```json
{
  "__schema": {
    "queryType": {
      "fields": [
        // other types here
        {
          "name": "node",
          "type": {
            "name": "Node",
            "kind": "INTERFACE"
          },
          "args": [
            {
              "name": "id",
              "type": {
                "kind": "NON_NULL",
                "ofType": {
                  "name": "ID",
                  "kind": "SCALAR"
                }
              }
            }
          ]
        }
      ]
    }
  }
}
```

</div>

#### 7.4.3 - Field stability

> If two objects appear in a query, both implementing `Node` with identical IDs, then the two objects **must be equal**.

For the purposes of this definition, object equality is defined as follows:

- If a field is queried on both objects, the result of querying that field on the first object must be equal to the result of querying that field on the second object.
- If the field returns a scalar, equality is defined as is appropriate for that scalar.
- If the field returns an enum, equality is defined as both fields returning the same enum value.
- If the field returns an object, equality is defined recursively as per the above.

See about plural identifying root fields [here](https://graphql.org/learn/global-object-identification/#plural-identifying-root-fields).

#### 7.4.4 - Caching

> Providing Object Identifiers allows clients to build rich caches.

In GraphQL there's **no URL-like primitive that provides this globally unique identifier for a given object**. It's hence a best practice for the API to **expose such an identifier** for clients to use.

One possible pattern for this is **reserving a field, like `id`, to be a globally unique identifier**. 

If the backend uses something like **UUIDs** for identifiers, then exposing this globally unique ID may be very straightforward. If the backend doesn't have a globally unique ID for every object already, the GraphQL layer might have to construct it. 

Oftentimes, that's as simple as **appending the name of the type to the ID** and using that as the identifier. The server might then make that ID **opaque by base64-encoding it**.

In cases where there's compatibility issues with existing APIs, the GraphQL API can **expose the previous API's IDs in a separate field**. This gives us the best of both worlds:

- GraphQL clients can continue to rely on a consistent mechanism for getting a globally unique ID.
- Clients that need to work with our previous API can also fetch previousApiId from the object, and use that.

## Sources

- GraphQL's [official doc](https://graphql.org/learn/)
- On [introspection](https://learning.atheros.ai/blog/graphql-introspection-and-introspection-queries)
- [Introspection query](https://gist.github.com/a7v8x/c30d92d2ca2458035aadc41702da367d)
- [Connections](https://www.apollographql.com/blog/explaining-graphql-connections)
