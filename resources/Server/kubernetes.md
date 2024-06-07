[//]: # (TITLE Kubernetes)
[//]: # (ENDPOINT /kubernetes)
[//]: # (PRIORITY 3)

# Kubernetes

Kubernetes is a **portable, extensible, open source platform for managing containerized workloads and services**, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Overview](#1---overview)
    - [1.1 - Philosophy](#11---philosophy)
- [1.2 - Basic principles](#12---basic-principles)
	- [2 - Objects](#2---objects)
		- [2.1 - Describing a Kubernetes object](#21---describing-a-kubernetes-object)
		- [2.2 - Naming](#22---naming)
- [2.2.1 - Name and UID](#221---name-and-uid)
- [2.2.2 - Labels and annotations](#222---labels-and-annotations)
		- [2.3 - Namespaces](#23---namespaces)
		- [2.4 - Finalizers](#24---finalizers)
		- [2.5 - Ownership and dependents](#25---ownership-and-dependents)
		- [2.6 - Object management](#26---object-management)
- [2.6.1 - Imperative commands](#261---imperative-commands)
- [2.6.2 - Imperative object configuration](#262---imperative-object-configuration)
- [2.6.3 - Declarative object configuration](#263---declarative-object-configuration)
	- [3 - Components](#3---components)
		- [3.1 - Control plane components](#31---control-plane-components)
- [3.1.1 - `kube-apiserver`](#311---kube-apiserver)
- [3.1.2 - `etcd`](#312---etcd)
- [3.1.3 - `kube-scheduler`](#313---kube-scheduler)
- [3.1.4 - `kube-controller-manager`](#314---kube-controller-manager)
- [3.1.5 - `cloud-controller-manager`](#315---cloud-controller-manager)
		- [3.2 - Node components](#32---node-components)
- [3.2.1 - `kubelet`](#321---kubelet)
- [3.2.2 - `kube-proxy`](#322---kube-proxy)
- [3.2.3 - `Container runtime`](#323---container-runtime)
		- [3.3 - Addons](#33---addons)
- [3.3.1 - DNS](#331---dns)
- [3.3.2 - Web UI (Dashboard)](#332---web-ui-dashboard)
- [3.3.3 - Container Resource Monitoring](#333---container-resource-monitoring)
- [3.3.4 - Cluster-level Logging](#334---cluster-level-logging)
- [3.3.5 - Network Plugins](#335---network-plugins)
	- [4 - The Kubernetes API](#4---the-kubernetes-api)
   - [5 - Operators](#5---operators)
- [How operators manage Kubernetes applications](#how-operators-manage-kubernetes-applications)
	- [Getting started](#getting-started)
		- [Configuring Kubectl for cloud-based Kubernetes cluster](#configuring-kubectl-for-cloud-based-kubernetes-cluster)
- [`kubectl config`](#kubectl-config)
- [Config files](#config-files)
		- [Node and Cluster Management](#node-and-cluster-management)
	- [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Overview

### 1.1 - Philosophy

Similar to a VM, a container has its own filesystem, share of CPU, memory, process space, and more. As they are decoupled from the underlying infrastructure, they are portable across clouds and OS distributions.

In a production environment, you need to manage the containers that run the applications and ensure that there is no downtime. For example, if a container goes down, another container needs to start. Kubernetes provides you with a **framework to run distributed systems resiliently**. It takes care of **scaling** and **failover** for your application, provides **deployment patterns**, and more.

Kubernetes provides you with:

<div class="grid list-with-hints">

<div class="hint-block">
	<span class="hint-title">Service discovery and load balancing</span>
	<span class="hint">Kubernetes can expose a container using the DNS name or using their own IP address. If traffic to a container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Storage orchestration</span>
	<span class="hint">Kubernetes allows you to automatically mount a storage system of your choice, such as local storages, public cloud providers, and more.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Automated rollouts and rollbacks</span>
	<span class="hint">You can describe the desired state for your deployed containers using Kubernetes, and it can change the actual state to the desired state at a controlled rate. For example, you can automate Kubernetes to create new containers for your deployment, remove existing containers and adopt all their resources to the new container.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Automatic bin packing</span>
	<span class="hint">You provide Kubernetes with a cluster of nodes that it can use to run containerized tasks. You tell Kubernetes how much CPU and memory (RAM) each container needs. Kubernetes can fit containers onto your nodes to make the best use of your resources.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Self-healing</span>
	<span class="hint">Kubernetes restarts containers that fail, replaces containers, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Secret and configuration management</span>
	<span class="hint">Kubernetes lets you store and manage sensitive information, such as passwords, OAuth tokens, and SSH keys. You can deploy and update secrets and application configuration without rebuilding your container images, and without exposing secrets in your stack configuration.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Batch execution</span>
	<span class="hint">In addition to services, Kubernetes can manage your batch and CI workloads, replacing containers that fail, if desired.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Horizontal scaling</span>
	<span class="hint">> adding additional nodes/machines to your infra to cope with new demands.<br>Scale your application up and down with a simple command, with a UI, or automatically based on CPU usage.</span>
</div>

<div class="hint-block">
	<span class="hint-title">IPv4/IPv6 dual-stack</span>
	<span class="hint">Allocation of IPv4 and IPv6 addresses to Pods and Services.</span>
</div>

<div class="hint-block">
	<span class="hint-title">Designed for extensibility</span>
	<span class="hint">Add features to your Kubernetes cluster without changing upstream source code.</span>
</div>

</div>

### 1.2 - Basic principles

![center-eg](k8s-diagram.png)

1. When you deploy Kubernetes, you get a **cluster**.
2. A cluster is a **set of worker machines**, called **nodes**, that run containerized applications. Every cluster has at least one worker node.
3. The worker nodes host the **Pods** that are the **components of the application workload**.
4. The **control plane manages the worker nodes and the Pods in the cluster**. The Kubernetes API exposes an HTTP API that lets end users, different parts of your cluster, and external components communicate with one another.
5. **Resource objects** are used to represent the **state** of your cluster. Specifically, they can describe what containerized applications are running (and on which nodes), the resources available to those applications, the policies around how those applications behave.
6. Resources are **endpoints** in the Kubernetes API that store collections of API objects of a certain kind (eg: the built-in pods resource contains a collection of Pod objects).
7. You can specify **Custom Resources**: they're extensions of the Kubernetes API that is not necessarily available in a default Kubernetes installation. It represents a customization of a particular Kubernetes installation.

In production environments, the control plane usually runs across multiple computers and a cluster usually runs multiple nodes, providing fault-tolerance and high availability.

<div class="vocab-list">

|                 |                                                                                                                                                                                                                                                                                                                                                                       |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Node**        | A virtual or physical machine that is managed by the control plane and contains the services necessary to run Pods.                                                                                                                                                                                                                                                   |
| **Pods**        | A group of one or more containers, with shared storage and network resources, and a specification for how to run the containers.                                                                                                                                                                                                                                      |
| **Workload**    | An application running on Kubernetes. Workloads are run inside a set of pods.                                                                                                                                                                                                                                                                                         |
| **Deployment**  | A resource object that manages a set of Pods to run an application workload, usually one that doesn't maintain state.                                                                                                                                                                                                                                                 |
| **ReplicaSet**  | A resource object that maintains a stable set of replica Pods running at any given time. As such, it is often used to guarantee the availability of a specified number of identical Pods                                                                                                                                                                              |
| **StatefulSet** | A resource object that lets you run one or more related Pods that track state somehow. For example, if your workload records data persistently, you can run a StatefulSet that matches each Pod with a PersistentVolume. Your code, running in the Pods for that StatefulSet, can replicate data to other Pods in the same StatefulSet to improve overall resilience. |
| **Service**     | An abstraction to help you expose groups of Pods over a network. Each Service object defines a logical set of endpoints (usually these endpoints are Pods) along with a policy about how to make those pods accessible.                                                                                                                                               |
| **Ingress**     | An API object that manages external access to the services in a cluster, typically HTTP. Ingress may provide load balancing, SSL termination and name-based virtual hosting.                                                                                                                                                                                          |

</div>

Kubernetes provides several built-in **workload resources**:

- **Deployment** and **ReplicaSet**<br>Deployment is a good fit for **managing a stateless application workload** on your cluster (**no** stored knowledge of or reference to past transactions), where any Pod in the Deployment is interchangeable and can be replaced if needed.
- **StatefulSet**<br>It lets you **run one or more related Pods that do track state somehow**. For example, if your workload records data persistently, you can run a StatefulSet that matches each Pod with a PersistentVolume. Your code, running in the Pods for that StatefulSet, can replicate data to other Pods in the same StatefulSet to improve overall resilience.
- **DaemonSet**<br>It defines Pods that **provide facilities that are local to nodes**. Every time you add a node to your cluster that matches the specification in a DaemonSet, the control plane schedules a Pod for that DaemonSet onto the new node. Each pod in a DaemonSet performs a job similar to a system daemon on a classic Unix / POSIX server. A DaemonSet might be fundamental to the operation of your cluster, such as a plugin to run cluster networking, it might help you to manage the node, or it could provide optional behavior that enhances the container platform you are running.
- **Job** and **CronJob**<br>They provide different ways to **define tasks that run to completion and then stop**. You can use a Job to define a task that runs to completion, just once. You can use a CronJob to run the same Job multiple times according a schedule.

### 1.3 - Kubectl quick reference


## 2 - Objects

Kubernetes objects are **persistent entities** in the Kubernetes system. Kubernetes uses these entities to **represent the state of your cluster**. Specifically, they can describe:

- What containerized **applications** are running (and on which nodes).
- The **resources** available to those applications.
- The **policies** around how those applications behave, such as restart policies, upgrades, and fault-tolerance.

> A Kubernetes object is a "**record of intent**": once you create the object, the Kubernetes system will **constantly work to ensure that object exists**. By creating an object, you're effectively telling the Kubernetes system what you want your cluster's workload to look like; this is your cluster's desired state.

To **create, modify, or delete** Kubernetes objects, you'll need to use the **Kubernetes API**. The `kubectl` CLI makes the necessary Kubernetes API calls for you. You can also use the Kubernetes API directly in your own programs using one of the Client Libraries.

### 2.1 - Describing a Kubernetes object

Almost every Kubernetes object includes **two nested object fields that govern the object's configuration**: the **object spec** and the **object status**.

For objects that have a spec, you have to set this when you create the object, providing a description of the characteristics you want the resource to have: **its desired state**.

The status describes the **current state** of the object, supplied and updated by the Kubernetes system and its components. The Kubernetes control plane continually and actively manages every object's actual state to match the desired state you supplied.

For example: in Kubernetes, a Deployment is an object that can represent an application running on your cluster. When you create the Deployment, you might set the Deployment spec to specify that you want three replicas of the application to be running. The Kubernetes system reads the Deployment spec and starts three instances of your desired application--updating the status to match your spec. If any of those instances should fail (a status change), the Kubernetes system responds to the difference between spec and status by making a correction (in this case, starting a replacement instance).

When you create an object, you must provide the object spec that describes its desired state, as well as some basic information about the object (such as a name). 

When you use the Kubernetes API to create the object (either directly or via `kubectl`), that API request **must include that information as JSON** in the request body. Most often, you provide the information to `kubectl` in file known as a **manifest**. By convention, manifests are **YAML** (you could also use JSON format). Tools such as `kubectl` convert the information from a manifest into JSON or another supported serialization format when making the API request over HTTP.

Here's an example manifest that shows the required fields and object spec for a Kubernetes Deployment:

```yaml
apiVersion: apps/v1       # required
kind: Deployment          # required
metadata:
  name: nginx-deployment  # required
  namespace: my-namespace
spec:                     # required
  selector:
    matchLabels:
      app: nginx
  replicas: 2 # tells deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

To create a `Deployment` using this manifest, use:

```sh
kubectl apply -f <url or path of .yaml>
```

The precise format of the object `spec` is **different for every Kubernetes object**, and contains nested fields specific to that object.

The `kubectl` tool uses the `--validate` flag to set the level of field validation. It accepts the values `ignore`, `warn`, and `strict` while also accepting the values `true` (== `strict`) and `false` (==`ignore`). The default validation setting for `kubectl` is `--validate=true`.

### 2.2 - Naming

#### 2.2.1 - Name and UID

Each object in your cluster has a **Name** that is **unique for that type of resource**. Every Kubernetes object also has a **UID that is unique across your whole cluster**.

Names must be **unique across all API versions** of the same resource. API resources are **distinguished by their API group**, **resource type**, **namespace** (for namespaced resources), and **name**. In other words, API version is irrelevant in this context.

> In cases when objects represent a physical entity, like a Node representing a physical host, when the host is re-created under the same name without deleting and re-creating the Node, Kubernetes treats the new host as the old one, which may lead to **inconsistencies**.

Every object created over the whole lifetime of a Kubernetes cluster has a distinct UID. It is intended to **distinguish between historical occurrences** of similar entities.
Kubernetes UIDs are universally unique identifiers (UUIDs).

#### 2.2.2 - Labels and annotations

For **non-unique user-provided attributes**, Kubernetes provides **labels** and **annotations**.

Labels are **key/value pairs** that are **attached to objects** such as Pods. Labels are **intended to be used to specify identifying attributes** of objects that are **meaningful and relevant to users**, but do not directly imply semantics to the core system. Labels can be **used to organize and to select subsets of objects**. 

Labels can be attached to objects at **creation time** and subsequently **added and modified at any time**. Each object can have a set of key/value labels defined. **Each Key must be unique for a given object**.

``` json
"metadata": {
  "labels": {
    "key1" : "value1",
    "key2" : "value2"
  }
}
```

Labels allow for **efficient queries and watches** and are ideal for use in UIs and CLIs. 

**Non-identifying** information should be recorded using **annotations**. Clients such as tools and libraries can retrieve this metadata.

Find a list of common labels [here](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/).

Find more about how to select objects through labels [here](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors), and to select through resources fields [here](https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/).


### 2.3 - Namespaces

Namespaces provide a mechanism for **isolating groups of resources within a single cluster**. Names of resources need to be **unique within a namespace**, but not across namespaces. Namespace-based scoping is **applicable only for namespaced objects** (Deployments, Services...) and not for cluster-wide objects (StorageClass, Nodes, PersistentVolumes...).

They are intended for use in environments with many users spread across multiple teams, or projects.

You can list the current namespaces in a cluster using:

```
kubectl get namespace
```

To set the namespace for a current request, use the `--namespace` flag:

```
kubectl run nginx --image=nginx --namespace=<insert-namespace-name-here>
kubectl get pods --namespace=<insert-namespace-name-here>
```

You can permanently **save the namespace** for all subsequent `kubectl` commands in that context:

```
kubectl config set-context --current --namespace=<insert-namespace-name-here>
# Validate it
kubectl config view --minify | grep namespace:
```

When you create a Service, it creates a **corresponding DNS entry**. This entry is of the form `<service-name>.<namespace-name>.svc.cluster.local`, which means that if a container only uses `<service-name>`, it will resolve to the service which is local to a namespace. This is useful for using the same configuration across multiple namespaces such as Development, Staging and Production.

To see which Kubernetes resources are and aren't in a namespace:

```sh
# In a namespace
kubectl api-resources --namespaced=true

# Not in a namespace
kubectl api-resources --namespaced=false
```

### 2.4 - Finalizers

Finalizers are **namespaced keys** that tell Kubernetes to **wait until specific conditions are met** before it fully deletes resources marked for deletion. Finalizers **alert controllers to clean up resources the deleted object owned**.

You can use finalizers to control **garbage collection** of resources and objects.

Finalizers don't usually specify the code to execute. Instead, they are **typically lists of keys on a specific resource similar to annotations**. Kubernetes specifies some finalizers automatically, but you can also specify your own.

When you create a resource using a manifest file, you can **specify finalizers** in the `metadata.finalizers` field. When you attempt to delete the resource, the API server handling the delete request notices the values in the finalizers field and does the following:

1. Modifies the object to add a `metadata.deletionTimestamp` field with the time you started the deletion.
2. Prevents the object from being removed until all items are removed from its `metadata.finalizers` field.
3. Returns a `202` status code (HTTP "Accepted").

The controller managing that finalizer notices the update to the object setting the `metadata.deletionTimestamp`, indicating deletion of the object has been requested. The controller then attempts to satisfy the requirements of the finalizers specified for that resource. Each time a finalizer condition is satisfied, the controller removes that key from the resource's `finalizers` field. When the `finalizers` field is emptied, an object with a `deletionTimestamp` field set is automatically deleted.

You can also use finalizers to **prevent deletion of unmanaged resources**.

### 2.5 - Ownership and dependents

In Kubernetes, some objects are **owners of other objects**. These owned objects are **dependents** of their owner.

Owner references help different parts of Kubernetes **avoid interfering with objects they don’t control**.

Dependent objects have a `metadata.ownerReferences` field that **references their owner object**. A valid owner reference consists of the **object name and a UID within the same namespace** as the dependent object. Kubernetes sets the value of this field automatically for objects that are dependents of other objects like ReplicaSets, DaemonSets, Deployments, Jobs and CronJobs, and ReplicationControllers. You can also configure these relationships manually by changing the value of this field. However, you usually don't need to and can allow Kubernetes to automatically manage the relationships.

Dependent objects also have an `ownerReferences.blockOwnerDeletion` field that takes a boolean value and **controls whether specific dependents can block garbage collection** from deleting their owner object. Kubernetes automatically sets this field to `true` if a controller sets the value of the `metadata.ownerReferences` field. You can also set the value of the `blockOwnerDeletion` field manually to control which dependents block garbage collection.


### 2.6 - Object management

> Warning !! A Kubernetes object should be managed using **only one technique**. Mixing and matching techniques for the same object results in undefined behavior.

| Management technique             | Operates on          | Recommended env.     | Supported writers | Learning curve |
|----------------------------------|----------------------|----------------------|-------------------|----------------|
| Imperative commands              | Live objects         | Development projects | 1+                | Lowest         |
| Imperative object configuration  | Individual files     | Production projects  | 1                 | Moderate       |
| Declarative object configuration | Directories of files | Production projects  | 1+                | Highest        |

#### 2.6.1 - Imperative commands

When using imperative commands, a user **operates directly on live** objects in a cluster. The user provides operations to the `kubectl` command as arguments or flags.

This is the recommended way to get started or to run a one-off task in a cluster. Because this technique operates directly on live objects, it provides no history of previous configurations.

For example, to run an instance of the nginx container by creating a Deployment object:

```sh
kubectl create deployment nginx --image nginx
```

Advantages compared to object configuration:

- Commands are expressed as a **single action** word.
- Commands require only a **single step** to make changes to the cluster.

Disadvantages compared to object configuration:

- Commands do **not** integrate with **change review** processes.
- Commands do **not** provide an **audit trail** associated with changes.
- Commands do **not** provide a **source of records** except for what is live.
- Commands do **not** provide a **template** for creating new objects.

#### 2.6.2 - Imperative object configuration 

In imperative object configuration, the `kubectl` command **specifies the operation** (create, replace, etc.), optional flags and at least one file name. The file specified must contain a **full definition of the object** in YAML or JSON format.

> Warning!! The imperative replace command **replaces the existing spec** with the newly provided one, dropping all changes to the object missing from the configuration file. **This approach should not be used with resource types whose specs are updated independently of the configuration file**.

Services of type `LoadBalancer`, for example, have their `externalIPs` field updated independently from the configuration by the cluster.

For example, to create the objects defined in a configuration file:

```
kubectl create -f nginx.yaml
```

To delete the objects defined in two configuration files:

```
kubectl delete -f nginx.yaml -f redis.yaml
```

To update the objects defined in a configuration file by overwriting the live configuration:

```
kubectl replace -f nginx.yaml
```

Advantages compared to imperative commands:

- Object configuration can be **stored in a source control system** such as Git.
- Object configuration can **integrate with processes** such as reviewing changes before push and audit trails.
- Object configuration **provides a template** for creating new objects.

Disadvantages compared to imperative commands:

- Object configuration requires basic understanding of the object schema.
- Object configuration requires the additional step of writing a YAML file.

Advantages compared to declarative object configuration:

- Imperative object configuration behavior is simpler and easier to understand.
- As of Kubernetes version 1.5, imperative object configuration is more mature.

Disadvantages compared to declarative object configuration:

- Imperative object configuration **works best on files, not directories**.
- **Updates to live objects must be reflected in configuration files**, or they will be lost during the next replacement.

#### 2.6.3 - Declarative object configuration

When using declarative object configuration, a user **operates on object configuration files stored locally**, however the user **does not define the operations to be taken on the files**. Create, update, and delete operations are **automatically detected** per-object by `kubectl`. This enables working on directories, where different operations might be needed for different objects.

Note: Declarative object configuration retains changes made by other writers, even if the changes are not merged back to the object configuration file. This is possible by using the patch API operation to write only observed differences, instead of using the replace API operation to replace the entire object configuration.

In practice, you can first `diff` to see what changes are going to be made, and then `apply`.

For example, to process all object configuration files in the configs directory, and create or patch the live objects:

```
kubectl diff -f configs/
kubectl apply -f configs/
```

To recursively process directories:
```
kubectl diff -R -f configs/
kubectl apply -R -f configs/
```

Advantages compared to imperative object configuration:

- Changes made directly to live objects are retained, even if they are not merged back into the configuration files.
- Declarative object configuration has better support for operating on directories and automatically detecting operation types (create, patch, delete) per-object.

Disadvantages compared to imperative object configuration:

- Declarative object configuration is harder to debug and understand results when they are unexpected.
- Partial updates using diffs create complex merge and patch operations.


## 3 - Components

![center-eg](components-of-kubernetes.svg)

### 3.1 - Control plane components

The control plane's components make **global decisions about the cluster** (for example scheduling), and **detect and respond to cluster events** (for example starting up a new pod when a Deployment's `replicas` field is unsatisfied).

Control plane components can be run on any machine in the cluster. However, for simplicity, setup scripts typically start all control plane components on the same machine, and do not run user containers on this machine.

#### 3.1.1 - `kube-apiserver`

**Exposes the Kubernetes API**. The API server is the **front end for the Kubernetes control plane**.

The main implementation of a Kubernetes API server is `kube-apiserver`. It is designed to scale (horizontally), and it **scales by deploying more instances**. You can run several instances of `kube-apiserver` and **balance traffic** between those instances.

See more about the API in #4.

#### 3.1.2 - `etcd`

**Consistent and highly-available key value store** used as Kubernetes' **backing store** for all cluster data.

If your Kubernetes cluster uses `etcd` as its backing store, make sure you have a back up plan for the data.

#### 3.1.3 - `kube-scheduler`

**Watches for newly created Pods** with no assigned node, and **selects a node for them to run on**.

Factors taken into account for scheduling decisions include: individual and collective resource requirements, hardware/software/policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and deadlines.

#### 3.1.4 - `kube-controller-manager`

**Runs controller processes**.

> In robotics and automation, a control loop is a **non-terminating loop that regulates the state of a system**. In Kubernetes, controllers are control loops that **watch the state of your cluster**, then **make or request changes** where needed. Each controller tries to move the current cluster state closer to the desired state.

Logically, **each controller is a separate process**, but to reduce complexity, they are **all compiled into a single binary and run in a single process**.

There are many different types of controllers. Some examples of them are:

- **Node controller**<br>Responsible for noticing and responding when nodes go down.
- **Job controller**<br>Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
- **EndpointSlice controller**<br>Populates EndpointSlice objects (to provide a link between Services and Pods).
- **ServiceAccount controller**<br>Create default ServiceAccounts for new namespaces.

#### 3.1.5 - `cloud-controller-manager`

**Embeds cloud-specific control logic**. The `cloud-controller-manager` lets you **link your cluster into your cloud provider's API**, and **separates** out the components that interact with that cloud platform from components that only interact with your cluster.

The `cloud-controller-manager` **only runs controllers that are specific to your cloud provider**. If you are running Kubernetes on your own premises, or in a learning environment inside your own PC, the cluster does not have a cloud controller manager.

As with the `kube-controller-manager`, the `cloud-controller-manager` combines several logically independent control loops into a single binary that you run as a single process. You can scale horizontally to improve performance or to help tolerate failures.

The following controllers can have cloud provider dependencies:

- **Node controller**<br>For checking the cloud provider to determine if a node has been deleted in the cloud after it stops responding.
- **Route controller**<br>For setting up routes in the underlying cloud infrastructure.
- **Service controller**<br>For creating, updating and deleting cloud provider load balancers.

### 3.2 - Node components

Node components run on every node, **maintaining running pods and providing the Kubernetes runtime environment**.

#### 3.2.1 - `kubelet`

An **agent that runs on each node in the cluster**. It **ensures that containers are running in a Pod**.

The kubelet takes a set of PodSpecs that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running and healthy. The kubelet doesn't manage containers which were not created by Kubernetes.

#### 3.2.2 - `kube-proxy`

A **network proxy that runs on each node** in your cluster, implementing part of the Kubernetes Service concept.

It **maintains network rules** on nodes. These network rules **allow network communication to your Pods from network sessions** inside or outside of your cluster.

It uses the operating system packet filtering layer if there is one and it's available. Otherwise, it forwards the traffic itself.

#### 3.2.3 - `Container runtime`

A fundamental component that **empowers Kubernetes to run containers effectively**. It is responsible for **managing the execution and lifecycle of containers** within the Kubernetes environment.

Kubernetes supports container runtimes such as `containerd`, `CRI-O`, and any other implementation of the Kubernetes CRI (Container Runtime Interface).

### 3.3 - Addons

Addons use Kubernetes resources (DaemonSet, Deployment, etc) to **implement cluster features**.

Because these are providing cluster-level features, namespaced resources for addons belong within the kube-system namespace.

#### 3.3.1 - DNS

Cluster DNS is a **DNS server**, in addition to the other DNS server(s) in your environment, which **serves DNS records for Kubernetes services**.

Containers started by Kubernetes automatically include this DNS server in their DNS searches.

While the other addons are not strictly required, all Kubernetes clusters should have cluster DNS, as many examples rely on it.

#### 3.3.2 - Web UI (Dashboard)

Dashboard is a **general purpose, web-based UI for Kubernetes clusters**. It allows users to **manage and troubleshoot applications** running in the cluster, as well as the cluster itself.

#### 3.3.3 - Container Resource Monitoring

Container Resource Monitoring **records generic time-series metrics about containers** in a central database, and **provides a UI** for browsing that data.

#### 3.3.4 - Cluster-level Logging

A cluster-level logging mechanism is **responsible for saving container logs to a central log store** with search/browsing interface.

#### 3.3.5 - Network Plugins

Network plugins are **software components that implement the container network interface** (CNI) specification. They are **responsible for allocating IP addresses to pods** and **enabling them to communicate with each other** within the cluster.

## 4 - The Kubernetes API

The core of Kubernetes' control plane is the API server. The API server **exposes an HTTP API that lets end users, different parts of your cluster, and external components communicate with one another**.

The Kubernetes API lets you query and manipulate the state of API objects in Kubernetes. Kubernetes stores the serialized state of objects by writing them into `etcd`.

Most operations can be performed through the `kubectl` command-line interface or other command-line tools, but you can also access the API directly using REST calls.

**Each Kubernetes cluster publishes the specification of the APIs that the cluster serves**. There are two mechanisms that Kubernetes uses to publish these API specifications; both are useful to enable automatic interoperability. The two supported mechanisms are as follows:
- The **Discovery API**<br>It provides information about the Kubernetes APIs: API names, resources, versions, and supported operations. This is a Kubernetes specific term as it is a separate API from the Kubernetes OpenAPI. It is intended to be a brief summary of the available resources and it does not detail specific schema for the resources. For reference about resource schemas, please refer to the OpenAPI document.
- The Kubernetes **OpenAPI Document**<br>It provides (full) OpenAPI v2.0 and 3.0 schemas for all Kubernetes API endpoints. The OpenAPI v3 is the preferred method for accessing OpenAPI as it provides a more comprehensive and accurate view of the API. It includes all the available API paths, as well as all resources consumed and produced for every operations on every endpoints. It also includes any extensibility components that a cluster supports. The data is a complete specification and is significantly larger than that from the Discovery API.

Find more about them [here](https://kubernetes.io/docs/concepts/overview/kubernetes-api/#discovery-api).

The Kubernetes API can be **extended** in one of two ways:
- **Custom resources** let you declaratively define how the API server should provide your chosen resource API. See #5.
- You can also extend the Kubernetes API by implementing an **[aggregation layer](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/apiserver-aggregation/)**.
	
## 5 - Operators

A Kubernetes operator is a **method of packaging, deploying, and managing** a Kubernetes application.

It's an **application-specific controller** that extends the functionality of the Kubernetes API to create, configure, and manage instances of complex applications on behalf of a Kubernetes user.

It builds upon the basic Kubernetes resource and controller concepts, but **includes domain or application-specific knowledge to automate** the entire life cycle of the software it manages.

In Kubernetes, controllers of the control plane implement control loops that repeatedly compare the desired state of the cluster to its actual state. If the cluster's actual state doesn’t match the desired state, then the controller takes action to fix the problem.

> An operator is a **custom Kubernetes controller** that uses custom resources (CR) to manage applications and their components.

High-level **configuration** and settings are provided by the user within a **CR**. The Kubernetes operator **translates the high-level directives into low level actions**, based on best practices embedded within the operator’s logic.

A **custom resource** is the **API extension mechanism** in Kubernetes. A **custom resource definition (CRD)** defines a CR and lists out all of the configuration available to users of the operator.

The Kubernetes operator **watches a CR type and takes application-specific actions** to make the **current state match the desired state** in that resource.

Kubernetes operators introduce new **object types through CRDs**. CRDs can be handled by the Kubernetes API just **like built-in objects**, including interaction via kubectl and inclusion in role-based access control (RBAC) policies.

A Kubernetes operator **continues to monitor its application as it runs**, and **can back up data**, **recover** from failures, and **upgrade** the application over time, automatically.

The actions a Kubernetes operator performs can include almost anything: scaling a complex app, application version upgrades, or even managing kernel modules for nodes in a computational cluster with specialized hardware.

### How operators manage Kubernetes applications

Kubernetes can manage and scale stateless applications, such as web apps, mobile backends, and API services, without requiring any additional knowledge about how these applications operate. The built-in features of Kubernetes are designed to easily handle these tasks.

However, **stateful applications**, like databases and monitoring systems, **require additional domain-specific knowledge** that Kubernetes doesn’t have. It needs this knowledge in order to scale, upgrade, and reconfigure these applications.

Kubernetes operators **encode this specific domain knowledge** into Kubernetes **extensions** so that it can manage and automate an application’s life cycle. By removing difficult manual application management tasks, Kubernetes operators make these processes **scalable, repeatable, and standardized**.

For application developers, **operators make it easier to deploy and run the foundation services** on which their apps depend.<br>
For infrastructure engineers and vendors, **operators provide a consistent way to distribute software** on Kubernetes clusters and **reduce support burdens** by identifying and correcting application problems.

Operators allow you to write code to **automate a task, beyond the basic automation features** provided in Kubernetes.

The function of the operator pattern is to **capture the intentions of how a human operator would manage a service**. A human operator needs to have a complete understanding of how an app or service should work, how to deploy it, and how to fix any problems that may occur.

The creation of an operator often **starts with automating the application’s installation** and self-service provisioning, and follows with more complex automation capabilities.

There is also a Kubernetes operator software development kit (SDK) that can help you develop your own operator. The SDK provides the tools to build, test, and package operators with a choice of creating operators using Helm charts, Ansible Playbooks or Golang.

## Getting started

### Configuring Kubectl for cloud-based Kubernetes cluster

You need the cluster configuration details to connect kubectl to your cluster. These details typically include:

- Cluster API Server: The endpoint where your cluster is running.
- Cluster Certificate Authority: The certificate authority data for your cluster.
- Authentication Token: A token for authenticating with the cluster (used in some configurations).

#### `kubectl config`

```
kubectl config set-cluster <cluster-name> --server=<cluster-api-server-address> --certificate-authority=<path/to/certificate-authority>
kubectl config set-credentials <cluster-cred-name> --token=<auth-token>
kubectl config set-context <cluster-context-name> --cluster=<cluster-name> --user=<>
```

If working with namespaces, add: `-n <namespace>`;

#### Config files

You can directly edit the kubeconfig file (usually located at ~/.kube/config) to add multiple clusters:

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: <certificate-authority-data>
    server: https://cluster-api-server-address
  name: <cluster-name>
contexts:
- context:
    cluster: <cluster-name>
    user: cluster-cred
  name: cluster-context
current-context: cluster-context
kind: Config
preferences: {}
users:
- name: cluster-cred
  user:
    token: <auth-token>
```

Once you've configured kubectl, you can test the connection by running:

```
kubectl cluster-info
```

### Node and Cluster Management


See:
https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions
https://devopscube.com/kubernetes-objects-resources/
https://kubernetes.io/docs/reference/kubectl/quick-reference/
https://www.rabbitmq.com/kubernetes/operator/operator-overview
https://www.rabbitmq.com/kubernetes/operator/using-operator

## Sources

- [K8s official doc](https://kubernetes.io/docs/concepts/overview/)
- [Redhat on operators](https://www.redhat.com/en/topics/containers/what-is-a-kubernetes-operator)
- [Getting started](https://dev.to/fizy_hector/getting-started-with-kubectl-a-guide-to-kubernetes-2e7n)
