[//]: # (TITLE Relay)
[//]: # (ENDPOINT /relay)

# Relay

Relay is a **data management library for React** that lets you **fetch and update data with GraphQL**.

Relay brings the **composability** of React components to data fetching. **Each component declares its own data needs**, and Relay combines them into **efficient pre-loadable queries**. Every aspect of its design is to make the natural way of writing components also the most performant.

## 1 - Philosophy

### 1.1 - Features

- **Declarative data**.
- **Co-location and composability**: when you re-use a component on a different screen, your queries are automatically updated.
- **Pre-fetching**.
- **UI patterns**: Relay implements loading states, pagination, refetching, optimistic updates, rollbacks, etc.
- **Streaming and deferred data**: declaratively defer parts of your query and Relay will progressively re-render your UI as the data streams in.
- **Type safety**.
- **Hyper-optimized runtime**: its JIT-friendly runtime processes incoming data faster by statically determining what payloads to expect.

Relay has a **UI-agnostic layer** that **fetches and manages data**, and a **React-specific layer** that **handles loading states, pagination, and other UI paradigms**.

It is mainly supported when used with React, although you can access your Relay data outside of React if you need to. The React-specific parts of Relay are **based on `Suspense`**.

### 1.2 - How it works

Relay is a data management library for the client that's oriented around GraphQL, but uses it in a very specific way that gets the most benefit from it.

For the best performance, you want your app to issue a single request at the beginning of each screen or page instead of having individual components issue their own requests.

But the problem with that is that it **couples components and screens together**, creating a big maintenance problem: if the data changes shape then you have to modify the query. It becomes very difficult to maintain these big screen-wide queries.

> Relay's unique strength is to avoid this tradeoff by letting **each component declare its own data requirements locally**, but then **stitching those requirements together into larger queries**. That way you get both performance and maintainability.

It does this with a **compiler** that scans your JavaScript code for **fragments of GraphQL**, and then stitches those fragments together into complete queries.

Besides the compiler, Relay has **runtime code** that **manages the fetching and processing** of GraphQL. It maintains a **local cache** of all the data that has been retrieved (called the **Store**), and **vends out to each component the data** that belongs to it:

![center-eg](relay.png)

The advantage of having a **centralized Store** is that it **lets you keep your data consistent when it's updated**. This is because Relay **normalizes the data as it comes in**, meaning that it merges all the data it sees for a single graph node into **one place**, so it doesn't have multiple copies of the same node.

The development process is simple:

1. Define a query with ```graphql` query` ```.
2. Run the Relay compiler so that it knows about the new query: `npm run relay`.
3. Modify your React component to fetch and use the data returned by the server with `useLazyLoadQuery`.

Once the compiler successfully updates/generated the new compiled query, you will be able to find it in the generated folder.

## 2 - Querying

```js
import { graphql } from 'relay-runtime';

// embed graphQL in JS with the graphql`` tag
const NewsfeedQuery = graphql`

  query NewsfeedQuery {
    topStory {
      title
      summary
      poster {
        name
        profilePicture {
          url
        }
      }
      thumbnail {
        url
      }
    }
  }

`;
```

Let's break it down:

- The query is declared with the `query` tag.
- Fields like `title` and `url` are **scalar** fields.
- Fields like `poster` and `thumbnail` are **edge** fields: they lead to other nodes.

Now that the query is declared, run the relay compiler:

```bash
npm run graphql:update-schema
npm run relay
```

> Make sure to restart your server before updating the schema if you've made changes to it.

To fetch the data, simply call `useLazyLoadQuery()` from your component:

```jsx
import { useLazyLoadQuery } from "react-relay";

export default function Newsfeed({}) {
  const data = useLazyLoadQuery(
    // query name
    NewsfeedQuery,
    // arguments
    {},
  );

  // the data returned has the same shape as the query
  const story = data.topStory;
  
  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
```

The `useLazyLoadQuery` hook fetches the data when the component is first rendered.

### 2.1 - Queries are static

> All of the GraphQL strings in a Relay app are **pre-processed by the Relay compiler** and removed from the resulting bundled code. This means **you can't construct GraphQL queries at runtime** — they have to be static string literals so that they're **known at compile time**.

But it comes with major advantages:

- It allows Relay to **generate type definitions** for the results of the query, making your code more **type-safe**.
- Relay replaces the GraphQL string literal with an object that tells Relay what to do. This is **much faster** than using the GraphQL strings directly at runtime.
- Relay's compiler can be **configured to save queries** to the server when you build your app, so that at runtime the **client need only send a query ID instead of the query itself**. This saves bundle size and network bandwidth, and can prevent attackers from writing malicious queries since only those your app was built with need be available.

### 2.2 - Type system

The Relay compiler **generates TypeScript types corresponding to every piece of GraphQL** that you have in your app within a `graphql`` ` literal. Using Relay's generated types makes your app safer and more maintainable.

```js
import type {NewsfeedQuery as NewsfeedQueryType} from './__generated__/NewsfeedQuery.graphql';

function Newsfeed({}) {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  // ...
}
```

### 2.3 - Queries from interactions

## 3 - Fragments

### 3.3 - Refetchable fragments

## 4 - Interfaces and polymorphism

## 5 - Connections and pagination

## 6 - Mutations and Updates

## Sources

- Relay's [official doc](https://relay.dev/docs/)
