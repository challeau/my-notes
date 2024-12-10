[//]: # (TITLE Monitoring)
[//]: # (ENDPOINT /monitoring)
[//]: # (PRIORITY 4)

# Monitoring with Prometheus

> Infrastructure monitoring tracks the availability, performance, and resource utilization of hosts, containers, and other backend components.

Prometheus is an **open-source systems monitoring and alerting toolkit**.  Prometheus **collects and stores its metrics as time series data**, i.e. metrics information is stored with the timestamp at which it was recorded, alongside optional key-value pairs called **labels**.

Prometheus's main features are:
- a multi-dimensional data model with time series data identified by metric name and key/value pairs
- PromQL, a flexible query language to leverage this dimensionality
- no reliance on distributed storage; single server nodes are autonomous
- time series collection happens via a pull model over HTTP
- pushing time series is supported via an intermediary gateway
- targets are discovered via service discovery or static configuration
- multiple modes of graphing and dashboarding support

## 1 - Introduction to Prometheus

### 1.1 - Metrics

Metrics are **numerical measurements** in layperson terms. The term **time series** refers to the **recording of changes over time**. 

What users want to measure differs from application to application. For a web server, it could be request times; for a database, it could be the number of active connections or active queries, and so on.

Metrics play an important role in **understanding why your application is working in a certain way**.

Let's assume you are running a web application and discover that it is slow. To learn what is happening with your application, you will need some information. For example, when the number of requests is high, the application may become slow. If you have the request count metric, you can determine the cause and increase the number of servers to handle the load.

### 1.2 - Components

The Prometheus ecosystem consists of multiple components, many of which are optional:

- the **main Prometheus server** which **scrapes and stores time series data**
- **client libraries** for instrumenting application code
- a push gateway for supporting short-lived jobs
- **special-purpose exporters for services** like HAProxy, StatsD, Graphite, etc.
- an **alertmanager** to handle alerts
- various support tools

Most Prometheus components are written in Go, making them easy to build and deploy as static binaries.

### 1.3 - Architecture

### 1.4 - Integration with Grafana

Grafana supports querying Prometheus. The Grafana data source for Prometheus is included since Grafana 2.5.0.

By default, Grafana will be listening on `http://localhost:3000`. The default login is `admin`/`admin`.

Here's a simple example of how to setup Prometheus with docker and automatically create a dashboard for metrics using IAC :
1. Define the containers


## 2 - Concepts

### 2.1 - Data Model

### 2.2 - Metrics types

### 2.3 - Jobs and instances


## 3 - Prometheus server

## 4 - 


## Sources

- [Prometheus official documentation](https://prometheus.io/docs/introduction/overview/)
- [Tom Riley's observability notes](https://observability.thomasriley.co.uk/introduction/)

