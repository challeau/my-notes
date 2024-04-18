[//]: # (TITLE Kubernetes)
[//]: # (ENDPOINT /kubernetes)
[//]: # (PRIORITY 3)

# Kubernetes

Kubernetes is a **portable, extensible, open source platform for managing containerized workloads and services**, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Philosophy](#1---philosophy)
- [2 - Components](#2---components)

<!-- markdown-toc end -->


## 1 - Philosophy

Similar to a VM, a container has its own filesystem, share of CPU, memory, process space, and more. As they are decoupled from the underlying infrastructure, they are portable across clouds and OS distributions.

In a production environment, you need to manage the containers that run the applications and ensure that there is no downtime. For example, if a container goes down, another container needs to start. Kubernetes provides you with a **framework to run distributed systems resiliently**. It takes care of **scaling** and **failover** for your application, provides **deployment patterns**, and more.

Kubernetes provides you with:

- **Service discovery and load balancing**<br>Kubernetes can expose a container using the DNS name or using their own IP address. If traffic to a container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.
- **Storage orchestration**<br>Kubernetes allows you to automatically mount a storage system of your choice, such as local storages, public cloud providers, and more.
- **Automated rollouts and rollbacks**<br>You can describe the desired state for your deployed containers using Kubernetes, and it can change the actual state to the desired state at a controlled rate. For example, you can automate Kubernetes to create new containers for your deployment, remove existing containers and adopt all their resources to the new container.
- **Automatic bin packing**<br>You provide Kubernetes with a cluster of nodes that it can use to run containerized tasks. You tell Kubernetes how much CPU and memory (RAM) each container needs. Kubernetes can fit containers onto your nodes to make the best use of your resources.
- **Self-healing**<br>Kubernetes restarts containers that fail, replaces containers, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.
- **Secret and configuration management**<br>Kubernetes lets you store and manage sensitive information, such as passwords, OAuth tokens, and SSH keys. You can deploy and update secrets and application configuration without rebuilding your container images, and without exposing secrets in your stack configuration.
- **Batch execution**<br>In addition to services, Kubernetes can manage your batch and CI workloads, replacing containers that fail, if desired.
- **Horizontal scaling**<br>(adding additional nodes/machines to your infra to cope with new demands)<br>Scale your application up and down with a simple command, with a UI, or automatically based on CPU usage.
- **IPv4/IPv6 dual-stack**<br>Allocation of IPv4 and IPv6 addresses to Pods and Services
- **Designed for extensibility**<br>Add features to your Kubernetes cluster without changing upstream source code.

## 2 - Components

1. When you deploy Kubernetes, you get a **cluster**.
2. A cluster is a **set of worker machines**, called **nodes**, that run containerized applications. Every cluster has at least one worker node.
3. The worker node.s host the **Pods** that are the **components of the application workload**.
4. The **control plane manages the worker nodes and the Pods in the cluster**.

In production environments, the control plane usually runs across multiple computers and a cluster usually runs multiple nodes, providing fault-tolerance and high availability.

![center-eg](components-of-kubernetes.svg)

### 2.1 - Control plane components

The control plane's components make **global decisions about the cluster** (for example scheduling), and **detect and respond to cluster events** (for example starting up a new pod when a Deployment's `replicas` field is unsatisfied).

Control plane components can be run on any machine in the cluster. However, for simplicity, setup scripts typically start all control plane components on the same machine, and do not run user containers on this machine.

#### 2.1.1 - `kube-apiserver`

**Exposes the Kubernetes API**. The API server is the **front end for the Kubernetes control plane**.

The main implementation of a Kubernetes API server is `kube-apiserver`. It is designed to scale (horizontally), and it **scales by deploying more instances**. You can run several instances of `kube-apiserver` and **balance traffic** between those instances.

#### 2.1.2 - `etcd`

**Consistent and highly-available key value store** used as Kubernetes' **backing store** for all cluster data.

If your Kubernetes cluster uses `etcd` as its backing store, make sure you have a back up plan for the data.

#### 2.1.3 - `kube-scheduler`

**Watches for newly created Pods** with no assigned node, and **selects a node for them to run on**.

Factors taken into account for scheduling decisions include: individual and collective resource requirements, hardware/software/policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and deadlines.

#### 2.1.4 - `kube-controller-manager`

**Runs controller processes**.

> In robotics and automation, a control loop is a **non-terminating loop that regulates the state of a system**. In Kubernetes, controllers are control loops that **watch the state of your cluster**, then **make or request changes** where needed. Each controller tries to move the current cluster state closer to the desired state.

Logically, **each controller is a separate process**, but to reduce complexity, they are **all compiled into a single binary and run in a single process**.

There are many different types of controllers. Some examples of them are:

- **Node controller**<br>Responsible for noticing and responding when nodes go down.
- **Job controller**<br>Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
- **EndpointSlice controller**<br>Populates EndpointSlice objects (to provide a link between Services and Pods).
- **ServiceAccount controller**<br>Create default ServiceAccounts for new namespaces.

#### 2.1.5 - `cloud-controller-manager`

**Embeds cloud-specific control logic**. The `cloud-controller-manager` lets you **link your cluster into your cloud provider's API**, and **separates** out the components that interact with that cloud platform from components that only interact with your cluster.

The `cloud-controller-manager` **only runs controllers that are specific to your cloud provider**. If you are running Kubernetes on your own premises, or in a learning environment inside your own PC, the cluster does not have a cloud controller manager.

As with the `kube-controller-manager`, the `cloud-controller-manager` combines several logically independent control loops into a single binary that you run as a single process. You can scale horizontally to improve performance or to help tolerate failures.

The following controllers can have cloud provider dependencies:

- **Node controller**<br>For checking the cloud provider to determine if a node has been deleted in the cloud after it stops responding.
- **Route controller**<br>For setting up routes in the underlying cloud infrastructure.
- **Service controller**<br>For creating, updating and deleting cloud provider load balancers.

### 2.2 - Node components

Node components run on every node, **maintaining running pods and providing the Kubernetes runtime environment**.

#### 2.2.1 - `kubelet`

An **agent that runs on each node in the cluster**. It **ensures that containers are running in a Pod**.

The kubelet takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy. The kubelet doesn't manage containers which were not created by Kubernetes.

#### 2.2.2 - `kube-proxy`

A **network proxy that runs on each node** in your cluster, implementing part of the Kubernetes Service concept.

It **maintains network rules** on nodes. These network rules **allow network communication to your Pods from network sessions** inside or outside of your cluster.

It uses the operating system packet filtering layer if there is one and it's available. Otherwise, it forwards the traffic itself.

#### 2.2.3 - `Container runtime`

A fundamental component that **empowers Kubernetes to run containers effectively**. It is responsible for **managing the execution and lifecycle of containers** within the Kubernetes environment.

Kubernetes supports container runtimes such as `containerd`, `CRI-O`, and any other implementation of the Kubernetes CRI (Container Runtime Interface).

### 2.3 - Addons

Addons use Kubernetes resources (DaemonSet, Deployment, etc) to **implement cluster features**.

Because these are providing cluster-level features, namespaced resources for addons belong within the kube-system namespace.

#### 2.3.1 - DNS

Cluster DNS is a **DNS server**, in addition to the other DNS server(s) in your environment, which **serves DNS records for Kubernetes services**.

Containers started by Kubernetes automatically include this DNS server in their DNS searches.

While the other addons are not strictly required, all Kubernetes clusters should have cluster DNS, as many examples rely on it.

#### 2.3.2 - Web UI (Dashboard)

Dashboard is a **general purpose, web-based UI for Kubernetes clusters**. It allows users to **manage and troubleshoot applications** running in the cluster, as well as the cluster itself.

#### 2.3.3 - Container Resource Monitoring

Container Resource Monitoring **records generic time-series metrics about containers** in a central database, and **provides a UI** for browsing that data.

#### 2.3.4 - Cluster-level Logging

A cluster-level logging mechanism is **responsible for saving container logs to a central log store** with search/browsing interface.

#### 2.3.5 - Network Plugins

Network plugins are **software components that implement the container network interface** (CNI) specification. They are **responsible for allocating IP addresses to pods** and **enabling them to communicate with each other** within the cluster.

