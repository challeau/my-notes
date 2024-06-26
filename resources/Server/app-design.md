[//]: # (TITLE Web Architecture)
[//]: # (ENDPOINT /architecture)
[//]: # (PRIORITY 2)

# Web App Architecture

Web application architecture describes the **interactions between applications, databases, and middleware** systems on the web. It ensures that multiple applications work simultaneously.

It has to not only deal with efficiency, but also with reliability, scalability, security, and robustness.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - How it works](#1---how-it-works)

<!-- markdown-toc end -->


## 1 - Components

Web apps rely on two structural components to run:
- The **frontend, or client-side code**: the code that is visible and accessible to the user via the **browser**. It **responds to user input**. It communicates only via HTTP requests and is not able to read files off a server directly.
- **The backend, or server-side code**: the code  that runs on the **server**. It typically consists of the server and the database. It **responds to HTTP requests**.

![center-eg](frontback.png)


Modern web apps still use the **3 tier architecture concept**, which separates applications into a **presentation** tier (frontend), an **application** tier (server), and a **data** tier (database).

Within the 3 tier web application architecture, **each layer runs on its own infrastructure**, and can be developed in parallel by different teams. Such a structure allows to **update and scale each tier** as needed **without impacting the other** tiers.


## 2 - Types of web application architecture

### 2.1 - Server side rendering (SSR)

https://kubernetes.io/docs/concepts/overview/


## Sources

- [Modern Web Application Architecture](https://integrio.net/blog/modern-web-application-architecture)