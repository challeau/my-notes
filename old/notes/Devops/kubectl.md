[//]: # (TITLE Kubectl)
[//]: # (ENDPOINT /kubectl)
[//]: # (PRIORITY 4)

# Kubectl reference

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Common options](#1---common-options)
- [2 - Configuration](#2---configuration)

<!-- markdown-toc end -->


## 1 - Common options


<div class="vocab-list">

|                    |                                                                                                                     |
|:-------------------|---------------------------------------------------------------------------------------------------------------------|
| `-n <namespace>`   | Run the command on a specific namespace.<br>If `-n` isn't specified, commands are applied on the default namespace. |
| `--all-namespaces` | Run the comand accross all namespaces. Shorthand: `-A` .                                                            |
| `-o=<format>`      | Format the output.<br>Format options: `json`, `yaml`, `wide` (== plain-text + more details).                        |
| `-f <file>`        | Specify the file.s to use to create a resource.<br>`<file>` can be a file, directory, or url.                       |
| `-l <label>`       | Filter using a specified label.                                                                                     |

</div>

## 2 - Configuration

```sh
# view current config
kubectl config view

# view current context
kubectl config current-context

# WITH a config file
# apply a configuration to a resource (create or update)
kubectl apply -f <file/dir/url>

# see changes that apply would make
kubectl diff


# WITHOUT a config file
# set a cluster entry
kubectl config set-cluster <cluster-name> --server=<cluster-api-server-address> --certificate-authority=<path/to/certificate-authority>

# set a user entry
kubectl config set-credentials <cluster-cred-name> --token=<auth-token>

# set a context --> permanently save the namespace for all subsequent kubectl commands in that context.
kubectl config set-context --current --namespace=ggckad-s2


kubectl config set-context <cluster-context-name> --cluster=<cluster-name> --user=<>
```

Cluster management:

```sh
# endpoint information about the master and services
kubectl cluster-info

# view the cluster configuration
kubectl config view

# display a list od contexts
kubectl config get-contexts

# display the current context
kubectl config current-context

# list all api resources available
kubectl api-resources
```

Object management:

```
# declarative management: only the required outcome is specified
kubectl apply -f <config file/dir/url>

# create, replace or delete a resource
# imperative management: all steps are specified
kubectl create/replace/delete -f <config file/dir/url>
```

```sh
# list ALL OBJECTS
kubectl get all

# DAEMONSET
# list all
kubectl get daemonset

# manage object
kubectl create daemonset <name>
kubectl edit daemonset <name>
kubectl delete daemonset <name>

# manage rollout
kubectl rollout daemonset

# display detailed state
kubectl describe ds <name>

# DEPLOYMENTS
# list all
kubectl get deployments

# 
kubectl


#
kubectl

#
kubectl

#
kubectl

#
kubectl
```



