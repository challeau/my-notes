
[//]: # (TITLE Docker)
[//]: # (ENDPOINT /docker)

# Docker

> Docker is an open platform for **developing**, **shipping**, and **running applications**. Docker enables the separation of applications from infrastructure so software can be delivered quickly.

<br/>

## 1 - Containers

Containers are isolated environments: they can have their own processes, services, network interfaces, and mounts.

They are built on top of the host OS's kernel but each container has the software of their specific OS.
This allows users to run each component of an application in separate environments, with their own dependencies and libraries (containers only live as long as the process inside them are running).

Containers differ from Virtual Machines in the sense that VMs are completely isolated and run a complete operating system–including its own kernel. This leads to a higher utilization of underlying ressources, and more disk space (GB, in contrast containers use MB).

Generally, containers boot up faster and can communicate between each other thanks to networks, or with the host thanks to volumes and bind mounts.

<br/>

## 2 - Images

An image is a package or a template used to create one or more container.s. 

To create one, all the steps necessary to build the application should be written in a `Dockerfile`: set the working directory, install the dependencies, specify the entrypoint of the app etc.

Then the image can be built with the `docker build` command, which will create a local copy of the image. To publish it, use `docker push <name>`.

```commandline
$ docker build [-t <CUSTOM_TAG_NAME>] [-f <SOURCE_FILE>] <path>
```

- `-t` sets the optional tag name of the image.
- `-f` specifies the path for the Dockerfile (if it isn't `.`).
- `path` specifies where the copy should be built.

<br/>

## 3 - Dockerfile format

```dockerfile
# Comment
INSTRUCTION arguments
```

Docker runs instructions in a Dockerfile in order. 
The best practice is to structure your Dockerfile according to the following:
- Install tools that are needed to build your application.
- Install dependencies, libraries and packages.
- Build your application.

Those first steps are likely to change during development, but Docker will use cache up to the first change to build the image faster. 

Minimizing the number of steps in your image may improve build and pull performance. It's best practice to try and use the `RUN` command only once.

You can sort multi-line instructions with \ before a newline.

<br/>

### 3.1 FROM

```dockerfile
FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```
A Dockerfile must begin with a `FROM` instruction, which specifies the Parent Image from which you are building.

`FROM` may come only after parser directives, comments, and globally scoped `ARG`s:
```dockerfile
ARG  CODE_VERSION=latest
FROM base:${CODE_VERSION} 
```
An `ARG` declared before a `FROM` is outside the build stage, so it can’t be used in any instruction after a `FROM`. To use the default value of an `ARG` declared before the first `FROM` use an `ARG` instruction without a value:
```dockerfile
ARG VERSION=latest
FROM busybox:$VERSION
ARG VERSION
RUN echo $VERSION > image_version
```
<br/>

`FROM` can appear multiple times within a single Dockerfile to create multiple images or use one build stage as a dependency for another.

Optionally a name can be given to a new build stage by adding `AS <name>` to the `FROM` instruction. The name can be used in subsequent `FROM` and `COPY --from=<name>` instructions to refer to the image built in this stage.

The `tag` or `digest` values are optional. If you omit either of them, the builder assumes a `latest` tag by default. The builder returns an error if it cannot find the tag value.

The optional `--platform` flag can be used to specify the platform of the image in case `FROM` references a multi-platform image. For example, `linux/amd64`, `linux/arm64`, or `windows/amd64`. By default, the target platform of the build request is used. 
<br/>
Global build arguments can be used in the value of this flag, for example automatic platform ARGs allow you to force a stage to native build platform (`--platform=$BUILDPLATFORM`), and use it to cross-compile to the target platform inside the stage.

<br/>

### 3.2 RUN

```dockerfile
RUN <command>                               # the shell form. The command is run in a shell, which by default is
                                            # /bin/sh -c on Linux or cmd /S /C on Windows.
#OR

RUN ["executable", "param1", "param2"]      # the exec form. It makes it possible to avoid shell string munging
                                            # and to RUN commands using a base image that does not contain the
                                            # specified shell executable.
```

The `RUN` instruction will execute any commands in a new layer on top of the current image and commit the results. The resulting committed image will be used for the next step in the Dockerfile.

Layering `RUN` instructions and generating commits conforms to the core concepts of Docker, where **commits are cheap** and containers can be created from any point in an image’s history, much like source control.

To use a different shell than `/bin/bash`, use the exec form passing in the desired shell:
```dockerfile
RUN ["/bin/bash", "-c", "echo hello"] 
```
Note that the exec form is parsed as a JSON array, which means that you must use double-quotes (`"`) around words, and it is necessary to escape backslashes.

The cache for `RUN` instructions can be invalidated by using `docker build --no-cache`.

<br/>

#### 3.2.1 RUN --mount

```dockerfile
RUN --mount=[type=<TYPE>][,option=<value>[,option=<value>]...]
```

It allows you to create mounts that processes running as part of the build can access.

This can be used to **bind files** from other parts of the build without copying, **accessing build secrets** or **ssh-agent sockets**, or **creating cache locations** to speed up your build.

Mount types:

| Type             | Description                                                                                               |
|------------------|-----------------------------------------------------------------------------------------------------------|
| `bind` (default) | Bind-mount context directories (read-only).                                                               |
| `cache`          | Mount a temporary directory to cache directories for compilers and package managers.                      |
| `secret`         | Allow the build container to access secure files such as private keys without baking them into the image. |
| `ssh`            | Allow the build container to access SSH keys via SSH agents, with support for passphrases.                |

<br/>

#### 3.2.2 RUN --network

```dockerfile
RUN --network=<TYPE>
```
It allows control over which networking environment the command is run in.

Network types:

| Type              | Description                                                                                                                                                 |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| default (default) | Run in the default network.                                                                                                                                 |
| none              | Run with no network access.<br/>`pip` will only be able to install the packages provided in the tarfile, which can be controlled by an earlier build stage. |
| host              | Run in the host’s network environment.                                                                                                                      | 

<br/>

### 3.3 CMD

```dockerfile
CMD ["executable","param1","param2"]    # the exec form. This is the preferred form.

# OR 

CMD ["param1","param2"]                 # as default parameters to `ENTRYPOINT`.

# OR 

CMD command param1 param2               # the shell form.
```
There can only be one `CMD` instruction in a Dockerfile. If you list more than one `CMD` then only the last one will take effect.

The main purpose of a `CMD` is to **provide defaults for an executing container**. These defaults can include an executable, or they can omit the executable, in which case you must specify an `ENTRYPOINT` instruction as well.

If `CMD` is used to provide default arguments for the `ENTRYPOINT` instruction, both the `CMD` and `ENTRYPOINT` instructions should be specified with the JSON array format.

> Do not confuse `RUN` with `CMD`. `RUN` actually runs a command and commits the result; `CMD` does not execute anything at build time, but specifies the intended command for the image.

<br/>

### 3.4 LABEL

```dockerfile
LABEL <key>=<value> <key>=<value> <key>=<value> ...
```

The `LABEL` instruction adds metadata to an image. A `LABEL` is a key-value pair. To include spaces within a `LABEL` value, use quotes and backslashes as you would in command-line parsing.

An image can have more than one label. You can specify multiple labels on a single line.

Labels included in base or parent images (images in the `FROM` line) are inherited by your image. If a label already exists but with a different value, the most-recently-applied value overrides any previously-set value.

To view an image’s labels, use the `docker image inspect` command. You can use the `--format` option to show just the labels:
```commandline
docker image inspect --format='' myimage
```

<br/>

### 3.5 EXPOSE

```dockerfile
EXPOSE <port> [<port>/<protocol>...]
```
The `EXPOSE` instruction informs Docker that the container listens on the specified network ports at runtime. You can specify whether the port listens on TCP or UDP, and the default is TCP if the protocol is not specified.

The `EXPOSE` instruction does not actually publish the port. It functions as a type of documentation between the person who builds the image and the person who runs the container, about which ports are intended to be published. To actually publish the port when running the container, use the `-p` flag on `docker run` to publish and map one or more ports, or the `-P` flag to publish all exposed ports and map them to high-order ports.

Regardless of the `EXPOSE` settings, you can override them at runtime by using the `-p` flag:
```commandline
$ docker run -p 80:80/tcp -p 80:80/udp ...
```

<br/>

### 3.6 ENV

```dockerfile
ENV <key>=<value> ...
```

The `ENV` instruction sets the environment variable `<key>` to the value `<value>`. This value will be in the environment for all subsequent instructions in the build stage and can be replaced inline in many as well.

The value will be interpreted for other environment variables, so quote characters will be removed if they are not escaped. Like command line parsing, quotes and backslashes can be used to include spaces within values:
```dockerfile
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy

# OR
ENV MY_NAME="John Doe" MY_DOG=Rex\ The\ Dog \
    MY_CAT=fluffy
    
# OR without the =, but then they can't be one-line (discouraged)
ENV MY_VAR my-value
```

The environment variables set using `ENV` will persist when a container is run from the resulting image. You can view the values using `docker inspect`, and change them using `docker run --env <key>=<value>`.

Environment variable persistence can cause unexpected side effects. For example, setting `ENV DEBIAN_FRONTEND=noninteractive` changes the behavior of `apt-get`, and may confuse users of your image.

<br/>

### 3.7 ADD

```dockerfile
ADD [--chown=<user>:<group>] [--checksum=<checksum>] <src>... <dest>

# OR 

ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]                     # required for paths with whitespaces.
```
The `ADD` instruction copies new files, directories or remote file URLs from `<src>` and adds them to the filesystem of the image at the path `<dest>`.

Multiple `<src>` resources may be specified but if they are files or directories, their paths are interpreted as relative to the source of the context of the build.

Each `<src>` may contain wildcards and matching will be done using Go’s `filepath.Match` rules.

The `<dest>` is an absolute path, or a path relative to `WORKDIR`.

All new files and directories are created with a UID and GID of 0, unless the optional `--chown` flag specifies a given username, groupname, or UID/GID combination to request specific ownership of the content added.

> The `--chown` feature is only supported on Dockerfiles used to build Linux containers, and will not work on Windows containers.
<br/>Since user and group ownership concepts do not translate between Linux and Windows, the use of `/etc/passwd` and `/etc/group` for translating user and group names to IDs restricts this feature to only be viable for Linux OS-based containers.

<br/>

`ADD` obeys the following rules:
- The `<src>` path must be inside the context of the build; you cannot `ADD ../something /something`, because the first step of a `docker build` is to send the context directory (and subdirectories) to the docker daemon.
- If `<src>` is a URL and `<dest>` does not end with a trailing slash, then a file is downloaded from the URL and copied to `<dest>`.
- If `<src>` is a directory, the entire contents of the directory (NOT the directory) are copied, including filesystem metadata.
- If `<src>` is a local tar archive in a recognized compression format (identity, gzip, bzip2 or xz) then it is unpacked as a directory. Resources from remote URLs are not decompressed. 
- If `<src>` is any other kind of file, it is copied individually along with its metadata.
- If multiple `<src>` resources are specified, either directly or due to the use of a wildcard, then <dest> must be a directory, and it must end with a slash `/`.
- If `<dest>` doesn't exist, it is created along with all missing directories in its path.

<br/>

The checksum of a remote file can be verified with the `--checksum` flag:
```dockerfile
ADD --checksum=sha256:244...68d https://mirrors.edge.kernel.org/pub/linux/kernel/Historic/linux-0.01.tar.gz /
```

You can add a git repository to an image directly, without using the git command inside the image:
```docekrfile
ADD [--keep-git-dir=<boolean>] <git ref> <dir>
```
To add a private repo via SSH, create a Dockerfile with the following form:
```dockerfile
# syntax = docker/dockerfile-upstream:master-labs
FROM alpine
ADD git@git.example.com:foo/bar.git /bar
```
This Dockerfile can be built with `docker build --ssh` or `buildctl build --ssh`.

<br/>

### 3.8 COPY

```dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>

# OR

COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]    # required for paths with whitespaces.
```

The `COPY` instruction copies new files or directories from `<src>` and adds them to the filesystem of the container at the path `<dest>`.

Multiple `<src>` resources may be specified but the paths of files and directories will be interpreted as relative to the source of the context of the build.

Each `<src>` may contain wildcards and matching will be done using Go’s `filepath.Match` rules.

Optionally, `COPY` accepts a flag `--from=<name>` that can be used to set the source location to a previous build stage (created with `FROM .. AS <name>`) that will be used instead of a build context sent by the user. In case a build stage with a specified name can’t be found an image with the same name is attempted to be used instead.

`COPY` follows the same rules as `ADD`, except that it only duplicates files/directories in a specified location and **in their existing format**. This means that it doesn't deal with extracting a compressed file, but rather copies it as-is.

<br/>

#### COPY --link and ADD --link

Enabling this flag in `COPY` or `ADD` commands allows you to copy files with enhanced semantics where your files remain independent on their own layer and don't get invalidated when commands on previous layers are changed.

When `--link` is used your source files are copied into an empty destination directory. That directory is turned into a layer that is linked on top of your previous state.

This:
```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
COPY --link /foo /bar
```
Is equivalent of doing two builds:
```dockerfile
FROM alpine
```
and
```dockerfile
FROM scratch
COPY /foo /bar
```
and merging all the layers of both images together.


Use `--link` to reuse already built layers in subsequent builds with `--cache-from` even if the previous layers have changed. This is especially important for multi-stage builds where a `COPY --from` statement would previously get invalidated if any previous commands in the same stage changed, causing the need to rebuild the intermediate stages again.
<br/>With `--link` the layer the previous build generated is reused and merged on top of the new layers.

This also means you can easily rebase your images when the base images receive updates, without having to execute the whole build again.

When using `--link` the `COPY`/`ADD` commands are not allowed to read any files from the previous state. This means that if in previous state the destination directory was a path that contained a symlink, `COPY`/`ADD` can not follow it. In the final image the destination path created with `--link` will always be a path containing only directories.

If you don’t rely on the behavior of following symlinks in the destination path, using `--link` is always recommended. Its performance is equivalent or better than the default behavior and, it creates much better conditions for cache reuse.

### 3.9 ENTRYPOINT

```dockerfile
ENTRYPOINT command param1 param2                # the shell form

# OR

ENTRYPOINT ["executable", "param1", "param2"]   # the preferred exec form
```
An `ENTRYPOINT` allows you to **configure a container that will run as an executable**. Only the last `ENTRYPOINT` instruction in the Dockerfile will have an effect.

You can override the `ENTRYPOINT` instruction using the `docker run --entrypoint` flag.

Command line arguments to `docker run <image>` will be appended after all elements in an exec form `ENTRYPOINT`, and will override all elements specified using `CMD`. <br/>
This allows arguments to be passed to the entry point, i.e., `docker run <image> -d` will pass the `-d` argument to the entry point.

The shell form prevents any `CMD` or `docker run` command line arguments from being used, but has the disadvantage that your `ENTRYPOINT` will be started as a subcommand of `/bin/sh -c`, which does not pass signals. This means that the executable will not be the container’s `PID 1` - and will not receive Unix signals - so your executable will not receive a `SIGTERM` from `docker stop <container>`.

You can use the exec form of `ENTRYPOINT` to set fairly stable default commands and arguments and then use either form of `CMD` to set additional defaults that are more likely to be changed.

<br/>

#### CMD and ENTRYPOINT

Both `CMD` and `ENTRYPOINT` instructions define what command gets executed when running a container. There are few rules that describe their co-operation:
- Dockerfile should specify at least one of `CMD` or `ENTRYPOINT` commands.
- `ENTRYPOINT` should be defined when using the container as an executable.
- `CMD` should be used as a way of defining default arguments for an `ENTRYPOINT` command or for executing an ad-hoc command in a container.
- `CMD` will be overridden when running the container with alternative arguments.

The table below shows what command is executed for different `ENTRYPOINT`/`CMD` combinations:

|                              | no `ENTRYPOINT`              | `ENTRYPOINT exec_entry p1_entry` | `ENTRYPOINT [“exec_entry”, “p1_entry”]` |
|------------------------------|------------------------------|----------------------------------|-----------------------------------------|
| No `CMD`                     | error, not allowed           | `/bin/sh -c exec_entry p1_entry` | `exec_entry p1_entry`                   |
| `CMD [“exec_cmd”, “p1_cmd”]` | `exec_cmd p1_cmd`            | `/bin/sh -c exec_entry p1_entry` | `exec_entry p1_entry exec_cmd p1_cmd`   |
| `CMD exec_cmd p1_cmd`        | `/bin/sh -c exec_cmd p1_cmd` | `/bin/sh -c exec_entry p1_entry` | `/bin/sh -c exec_cmd p1_cmd`            |

<br/>

> If `CMD` is defined from the base image, setting `ENTRYPOINT` will reset `CMD` to an empty value. In this scenario, `CMD` must be defined in the current image to have a value.

<br/>

### 3.10 VOLUME

```dockerfile
VOLUME ["/data"]            # JSON array

# OR

VOLUME /var/log             # plain string

# OR

VOLUME /var/log /var/db     # plain strings
```
The `VOLUME` instruction creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers. 

The `docker run` command initializes the newly created volume with any data that exists at the specified location within the base image.

Keep the following things in mind about volumes in the Dockerfile:
- When using Windows-based containers, the destination of a volume inside the container must be a non-existing or empty directory, or a drive other than `C:`.
- If any build steps change the data within the volume after it has been declared, those changes will be discarded.
- The list is parsed as a JSON array. You must enclose words with double quotes (`"`) rather than single quotes (`'`).
- The host directory (mountpoint) is, by its nature, host-dependent. This is to preserve image portability, since a given host directory can’t be guaranteed to be available on all hosts. For this reason, you can't mount a host directory from within the Dockerfile. You must specify the mountpoint when you create or run the container.

<br/>

### 3.11 USER

```dockerfile
USER <user>[:<group>]

# OR

USER <UID>[:<GID>]
```
The `USER` instruction sets the username (or UID) and optionally the user group (or GID) to use as the default user and group for the remainder of the current stage. The specified user is used for `RUN` instructions and at runtime, runs the relevant `ENTRYPOINT` and `CMD` commands.

<br/>

### 3.12 WORKDIR

```dockerfile
WORKDIR /path/to/workdir
```

The `WORKDIR` instruction sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions that follow it in the Dockerfile.

If the `WORKDIR` doesn't exist, it will be created even if it’s not used in any subsequent Dockerfile instruction.

The `WORKDIR` instruction can be used multiple times in a Dockerfile. If a relative path is provided, it will be relative to the path of the previous `WORKDIR` instruction. For example:
```dockerfile
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd     # output: /a/b/c
```

The `WORKDIR` instruction can resolve environment variables previously set using `ENV`. You can only use environment variables explicitly set in the Dockerfile. For example:
```dockerfile
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME
RUN pwd     # output: /path/$DIRNAME
```

If not specified, the default working directory is `/`. In practice, if you aren’t building a Dockerfile from scratch (`FROM` scratch), the `WORKDIR` may likely be set by the base image you’re using.
<br/>
Therefore, to avoid unintended operations in unknown directories, it is best practice to set your `WORKDIR` explicitly.

<br/>

### 3.13 ARG

```dockerfile
ARG <name>[=<default value>]
```
The `ARG` instruction defines a **variable that users can pass** at build-time to the builder with the `docker build` command using the `--build-arg <varname>=<value>` flag. 
<br/>
A Dockerfile may include one or more `ARG` instructions.

> It is not recommended to use build-time variables for passing secrets like github keys, user credentials etc. Build-time variable values are visible to any user of the image with the `docker history` command.

<br/>

An `ARG` variable definition comes into effect from the line on which it is defined in the Dockerfile, not from the argument’s use on the command-line or elsewhere. For example, consider this Dockerfile:

```dockerfile
FROM busybox
USER ${user:-some_user}
ARG user
USER $user
# ...
```
A user builds this file by calling:
```commandline
$ docker build --build-arg user=what_user .
```
The `USER` at line 2 evaluates to `some_user` since the `user` variable is defined on the subsequent line 3. The `USER` at line 4 evaluates to `what_user` as `user` is defined and the `what_user` value was passed on the command line.
<br/>Prior to its definition by an `ARG` instruction, any use of a variable results in an empty string.

An `ARG` instruction goes out of scope at the end of the build stage where it was defined. To use an arg in multiple stages, each stage must include the `ARG` instruction.

<br/>

#### 3.13.1 Using ARG variables

You can use an `ARG` or an `ENV` instruction to specify variables that are available to the `RUN` instruction.

Environment variables defined using the `ENV` instruction always override an `ARG` instruction of the same name.

Consider these Dockerfiles, built with `docker build --build-arg CONT_IMG_VER=v2.0.1 .`
```dockerfile
# ENV overrides                     # ARG is used if provided
FROM ubuntu                         FROM ubuntu
ARG CONT_IMG_VER                    ARG CONT_IMG_VER
ENV CONT_IMG_VER=v1.0.0             ENV CONT_IMG_VER=${CONT_IMG_VER:-v1.0.0}
RUN echo $CONT_IMG_VER              RUN echo $CONT_IMG_VER

# outputs v1.0.0                   # outputs v2.0.1
```

Unlike an `ARG` instruction, `ENV` values are always persisted in the built image.

Consider a docker build without the `--build-arg` flag (`docker build .`).<br/>
Using the second Dockerfile example, `CONT_IMG_VER` is still persisted in the image but its value would be `v1.0.0` as it is the default set in line 3 by the `ENV` instruction.

The **variable expansion** technique in this example allows you to pass arguments from the command line and persist them in the final image by leveraging the `ENV` instruction. 

<br/>

#### 3.13.2 Predefined ARGs

Docker has a set of predefined `ARG` variables that you can use without a corresponding `ARG` instruction in the Dockerfile:
- HTTP_PROXY / http_proxy
- HTTPS_PROXY / https_proxy
- FTP_PROXY / ftp_proxy
- NO_PROXY / no_proxy
- ALL_PROXY / all_proxy

To use these, pass them on the command line using the `--build-arg` flag.


<br/>

#### 3.13.3 Impact on build caching

`ARG` variables are not persisted into the built image as `ENV` variables are. However, `ARG` variables do impact the build cache in similar ways.

If a Dockerfile defines an `ARG` variable whose value is different from a previous build, then a "cache miss" occurs upon its first usage, not its definition. In particular, all `RUN` instructions following an `ARG` instruction use the `ARG` variable implicitly (as an environment variable), thus can cause a cache miss.

All predefined `ARG` variables are exempt from caching unless there is a matching `ARG` statement in the Dockerfile.

Consider these Dockerfiles, that are all subject to a cache miss on line 3:
```dockerfile
FROM ubuntu                     FROM ubuntu             FROM ubuntu
ARG CONT_IMG_VER                ARG CONT_IMG_VER        ARG CONT_IMG_VER
RUN echo $CONT_IMG_VER          RUN echo hello          ENV CONT_IMG_VER=$CONT_IMG_VER
                                                        RUN echo $CONT_IMG_VER
```

After building the image with the `--build-arg CONT_IMG_VER=<value>`, the specification on line 2 does not cause a cache miss, line 3 does.
<br/>
In #2, `ARG CONT_IMG_VER` causes the RUN line to be identified as the same as running `CONT_IMG_VER=<value>; echo hello`, so if the `<value>` changes, we get a cache miss.
<br/>
In #3, the miss happens because the variable's value in the `ENV` references the `ARG` variable and that variable is changed through the command line.

If an `ENV` instruction overrides an `ARG` instruction of the same name like this:
```dockerfile
FROM ubuntu
ARG CONT_IMG_VER
ENV CONT_IMG_VER=hello
RUN echo $CONT_IMG_VER
```
Line 3 does not cause a cache miss because the value of `CONT_IMG_VER` is a constant (hello). As a result, the environment variables and values used on the `RUN` (line 4) doesn't change between builds.

<br/>

### 3.14 ONBUILD

```dockerfile
ONBUILD <INSTRUCTION>
```

The `ONBUILD` instruction adds to the image a trigger instruction to be executed at a later time, when the image is used as the base for another build. The trigger will be executed in the context of the downstream build, as if it had been inserted immediately after the `FROM` instruction in the downstream Dockerfile.

Any build instruction can be registered as a trigger.

This is useful if you are building an image which will be used as a base to build other images, for example an application build environment or a daemon which may be customized with user-specific configuration.

<br/>

### 3.15 STOPSIGNAL

```dockerfile
STOPSIGNAL signal
```
The `STOPSIGNAL` instruction sets the system call signal that will be sent to the container to exit. This signal can be a signal name in the format `SIG<NAME>`, for instance `SIGKILL`, or an unsigned number that matches a position in the kernel’s syscall table, for instance 9.

The default is `SIGTERM` if not defined.

The image's default `STOPSIGNAL` can be overridden per container, using the `--stop-signal` flag on `docker run` and `docker create`.


<br/>

### 3.16 HEALTHCHECK

```dockerfile
HEALTHCHECK [OPTIONS] CMD command   # check container health by running a command inside the container.

# OR

HEALTHCHECK NONE                    # disable any healthcheck inherited from the base image.
```

The `HEALTHCHECK` instruction tells Docker how to test a container to check that it is still working. This can detect cases such as a web server that is stuck in an infinite loop and unable to handle new connections, even though the server process is still running.

There can only be one `HEALTHCHECK` instruction in a Dockerfile. If you list more than one then only the last `HEALTHCHECK` will take effect.

When a container has a healthcheck specified, it has a health status in addition to its normal status. This status is initially `starting`. Whenever a health check passes, it becomes `healthy` (whatever state it was previously in). After a certain number of consecutive failures, it becomes `unhealthy`.

The command after the `CMD` keyword can be either a shell command or an exec array. The command’s exit status indicates the health status of the container. The possible values are:
- 0, success - the container is healthy and ready for use
- 1, unhealthy - the container is not working correctly
- 2, reserved - do not use this exit code

The options that can appear before CMD are:
- `--interval=DURATION` (default: 30s)
- `--timeout=DURATION` (default: 30s)
- `--start-period=DURATION` (default: 0s)
- `--retries=N` (default: 3)


For example, to check every five minutes or so that a web-server is able to serve the site’s main page within three seconds:
```dockerfile
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
```

To help debug failing probes, any output text (UTF-8 encoded) that the command writes on `stdout` or `stderr` will be stored in the health status and can be queried with `docker inspect`. Such output should be kept short (only the first 4096 bytes are stored currently).

When the health status of a container changes, a `health_status` event is generated with the new status.

<br/>

### 3.17 SHELL
```dockerfile
SHELL ["executable", "parameters"]
```

The `SHELL` instruction allows the default shell used for the shell form of commands to be overridden. The default shell on Linux is `["/bin/sh", "-c"]`, and on Windows is `["cmd", "/S", "/C"]`. 
<br/>The `SHELL` instruction must be written in JSON form in a Dockerfile.

The `SHELL` instruction is particularly useful on Windows where there are two commonly used and quite different native shells: `cmd` and `powershell`, as well as alternate shells available including `sh`.

The `SHELL` instruction can appear multiple times. Each `SHELL` instruction overrides all previous `SHELL` instructions, and affects all subsequent instructions.

It affects `RUN`, `CMD`, and `ENTRYPOINT` if they're in a shell form.

The `SHELL` instruction could also be used to modify the way in which a shell operates. For example, using `SHELL cmd /S /C /V:ON|OFF` on Windows, delayed environment variable expansion semantics could be modified.
<br/>It can also be used on Linux should an alternate shell be required such as `zsh`, `csh`, `tcsh` and others.

<br/>

## 4 - `.dockerignore`

The directory where you issue the `docker build` command is called the **build context**. Docker will send all the files and directories in your build directory to the Docker daemon as part of the build context.

If you have stuff in your directory that is not needed by your build, you’ll have an unnecessarily larger build context that results in a larger image size. For this reason, do not use your root directory (`/`) as the PATH for your build context, as it causes the build to transfer the entire contents of your hard drive to the Docker daemon.

You can remedy this situation by adding a `.dockerignore` file where you can specify the list of folders and files that should be ignored in the build context.

<br/>

## 5 - Best practices

- Create ephemeral containers.
- Pipe Dockerfile through stdin: build images by piping Dockerfile through stdin (can be done with `here-documents`).
- Exclude with `.dockerignore`.
- Use multi-stage builds.
- Don't install unnecessary packages.
- Decouple applications: one concern per container.
- Minimize the number of layers: limit the number of `RUN`, `ADD`, and `COPY`.
- Sort multi-line arguments alpha-numerically.
- Leverage build cache.

<br/>


## 6 - Docker and Python

### 6.1 Setup

Python provides an official image that already has all the tools and packages needed to run a Python application:
```dockerfile
# syntax=docker/dockerfile:1            --> get latest Docker parser
FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
```

Remember to publish the ports when running the container:
```commandline
$ docker run --publish 8000:5000 python-docker
```

<br/>

### 6.2 Run a database in a container

First, create volumes -one for the data and one for configuration of MySQL (eg):
```commandline
$ docker volume create mysql
$ docker volume create mysql_config
```

Then, create a network so the application and the database can communicate:
```commandline
$ docker network create mysqlnet
```

Now we can run MySQL in a container and attach to the volumes and network we created above:
```commandline
$ docker run --rm -d -v mysql:/var/lib/mysql \      # -d: detached
  -v mysql_config:/etc/mysql -p 3306:3306 \         # -v: use volumes
  --network mysqlnet \                              # --network: specify the network
  --name mysqldb \                                  # --name: give our container a name
  -e MYSQL_ROOT_PASSWORD=p@ssw0rd1 \                # -e: set env variable
  mysql
```

<br/>

### 6.3 Connect the application to the database

After updating `app.py` to use MySQL as a datastore (adding routes and connections), update `requirements.txt` to include the new dependencies (mysql-connector-python), and re-build the image.

Then, add the container to the database network and run our container:
```commandline
$ docker run \
  --rm -d \
  --network mysqlnet \
  --name rest-server \
  -p 8000:5000 \
  python-docker-dev
```

<br/>

## 7 - Use Compose to develop locally

Create a new file named `docker-compose.dev.yml` with the following contents:

```yaml
version: '3.8'

services:
 web:
  build:
   context: .
  ports:
  - 8000:5000
  volumes:
  - ./:/app

 mysqldb:
  image: mysql
  ports:
  - 3306:3306
  environment:
  - MYSQL_ROOT_PASSWORD=p@ssw0rd1
  volumes:
  - mysql:/var/lib/mysql
  - mysql_config:/etc/mysql

volumes:
  mysql:
  mysql_config:
```

Compose files allow us to store all the parameters we need to pass to `docker run`. 

`docker-compose` automatically creates a network and connects the services to it. 

To start the application, run:
```commandline
$ docker-compose -f docker-compose.dev.yml up --build
```
The `--build` flag tells Docker to compile the image and then start the containers.


## SOURCES
- [Docker reference](https://docs.docker.com/engine/reference/builder/)
- [Docker best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker and python](https://docs.docker.com/language/python/build-images/)

