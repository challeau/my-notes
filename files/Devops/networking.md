[//]: # (TITLE Networking 101)
[//]: # (ENDPOINT /network)
[//]: # (PRIORITY 0)

# Networking 101

A **network** is nothing more than **two or more computers connected to each other** so that they can **exchange information** (e-mail, documents), **share resources** (disk storage, printers) or **share applications** (business, educative programs).

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Basics](#1---basics)
- [2 - Network topology](#2---network-topology)
    - [2.1 - Bus topology](#21---bus-topology)
    - [2.2 - Star topology](#22---star-topology)
    - [2.3 - Ring topology](#23---ring-topology)
    - [2.4 - Mesh topology](#24---mesh-topology)
    - [2.5 - Network expansion](#25---network-expansion)
- [3 - Setup](#3---setup)
    - [3.1 - Hardware](#31---hardware)
    - [3.2 - Software](#32---software)
- [4 - Protocols and standards](#4---protocols-and-standards)
    - [4.1 - Definition](#41---definition)
    - [4.2 - The OSI Reference Model](#42---the-osi-reference-model)
        - [4.2.1 - The layers](#421---the-layers)
        - [4.2.2 - Following a packet through the layers](#422---following-a-packet-through-the-layers)
    - [4.3 - The Ethernet Protocol](#43---the-ethernet-protocol)
    - [4.4 - The TCP/IP protocol suite](#44---the-tcpip-protocol-suite)
        - [4.4.1 - IP](#441---ip)
        - [4.4.2 - TCP](#442---tcp)
        - [4.4.3 - UDP](#443---udp)
        - [4.4.4 - TCP vs UDP](#444---tcp-vs-udp)
- [Sources](#sources)

<!-- markdown-toc end -->

## 1 - Basics

The **network computer that contains the resources that are shared** with other network computers is called a **server**. Any computer that's not a server is called a **client**.

The distinction between client and server computers can be more or less segregated : 
- A **dedicated server** can perform no other tasks besides network services. 
- A **peer-to-peer network**, in contrast, enables any computer on the network to function as both a client and a server.

The connection between a server's computers is made via **electrical signals** (electrical cables), **impulses of light** (fiber-optic cables), or **radio signals** (wireless).

It's common to **categorize** networks based on the **geographical size they cover**, *not* the number of computers involved:
- **Local area networks** (LAN): its computers are relatively close together (within an office/building/campus). They can contain **hundreds or even thousands of computers, typically within 100m**.
- **Metropolitan area networks** (MAN): typically used to **connect two or more LANs that are within the same city** but are far enough apart that the networks can't be connected using a simple cable or wireless connection.
- **Wide area networks** (WAN): **spans a large geographic territory**, such as an entire city or region, or even an entire country. WANs are typically **used to connect two or more LANs that are relatively far apart** (e.g. offices in =/ cities).


## 2 - Network topology

The term network topology refers to the **shape of the connection between computers and other network components**. Two key terms in network topology:
- **Node**: **device that is connected to the network**. Network topology deals with how the nodes of a network are connected to each other.
- **Packet**: **message sent over the network from one node to another**. The packet includes the address of the node that sent the packet, the address of the node the packet is being sent to, and data.


### 2.1 - Bus topology

In a bus topology, **all nodes on the network are directly connected** and can see **every packet that's sent**. 

![center-eg](bus.png)

Each node looks at each packet to determine whether the packet is intended for it. If so, the node **claims** the packet. If not, the node **ignores** the packet. Many networks today still have elements that rely on bus topology.

If the electrical **connection** in a bus network **breaks**, the **entire network is effectively disabled**. Even the nodes on the same side of a break will be unable to communicate with each other, because the open end of the cable left by the break disrupt proper transmission of electrical signals.


### 2.2 - Star topology

In a star topology, **each node is connected to a central device called a hub or a switch**. Star topologies are commonly used with LANs.

![center-eg](star.png)

Difference between a hub and a switch:
- A **hub doesn't know anything about the nodes that are connected to each of its ports**. It sends a duplicate copy of the packet to all its ports.
- A **switch knows which node is connected to each of its ports**. It sends the packet only to the port that the recipient is connected to.

Strictly speaking, **only networks that use switches have a true star topology**. If the network uses a hub, the network topology has the physical appearance of a star, but is actually a bus since all the nodes see all the packets.

> In a **true star topology**, **each node sees only those packets that were sent specifically to it**, or **to all nodes** on the network (broadcast packets).

If a cable in a star network breaks, **only the node connected to that cable is isolated** from the network. The other nodes can continue to operate without interruption - unless, of course, the node that's isolated because of the break happens to be the file server.


### 2.3 - Ring topology

In a ring topology, **packets are sent around the circle from node to node**. Each node looks at each packet to decide whether the packet was intended for it. If not, the packet is passed on to the next computer in the ring.

![center-eg](ring.png)

> Ring networks were **popular thanks to ARCNET** (factory automation), **Token Ring** (IBM Midrange computers) and **FDDI** (early type of fiber-optic network connection). However they have all vanished from business networks.

While bus topology and ring topology both use a single cable to connect devices, they **differ in the way that data is transmitted**. In a bus topology, the data is broadcast to all nodes on the network **simultaneously**, while in ring topology, data is transmitted in a **unidirectional loop**.

### 2.4 - Mesh topology

In a mesh topology, nodes are **interconnected in a decentralized manner**. There are **multiple connections between each of the nodes on the network**. They are common for **MANs and WANs**.

![center-eg](mesh.png)

These networks use devices called **routers** to **route packets from network to network**. For **reliability and performance** reasons, routers are usually arranged in a way that provides **multiple paths between any two nodes** on the network.

Mesh networks **aren't very practical in a LAN setting**. For example, to network eight computers in a mesh topology, each computer would have to have seven network interface cards, and 28 cables would be required to connect each computer to the seven other computers in the network.

> The **advantage** of a mesh topology is that if one cable breaks, the network can use an **alternative route** to deliver its packets.


### 2.5 - Network expansion

For **larger networks**, it's common to create more complicated topologies that **combine stars and buses**. 

For example, a **bus can be used to connect several stars**. In this case, **two or more hubs/switches are connected to each other using a bus,** and are **the center of a star** that connects two or more computers to the network. The **bus that connects the switches** is sometimes called a **backbone**.

Another way to expand a star topology is to use a technique called **daisychaining**: a **switch is connected to another switch** as if it were one of the nodes on the star.


## 3 - Setup

### 3.1 - Hardware

All networks, large or small, require **specialized network hardware** to make them work.

For small networks, the hardware may consist of nothing more than a collection of computers that are equipped with network ports, a cable for each computer, and a network switch that all the computers plug in to via the cable.
Larger networks may have additional components, such as routers or repeaters.


All networks are built from the following basic building blocks:

|                       |                                                                                                                                                                                                                                                                                                           |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **Client computers**  | Computers that **end users use to access the resources** of the network                                                                                                                                                                                                                                   |
| **Server computers**  | Computers that **provide shared resources** as well as network services, provided thanks to special software                                                                                                                                                                                              |
| **Network interface** | An interface that's installed in a computer to **enable it to communicate over a network**. Almost all network interfaces implement the **Ethernet** standard                                                                                                                                             |
| **Connections**       | Computers in a network are usually **physically connected** to each other with cables, or radio transmitters/receivers (wireless)                                                                                                                                                                         |
| **Switches**          | Each computer in a network is connected by cable to a device known as a switch, which in turn, **connects to the rest of the network**<br>Each switch contains a certain number of **ports**, typically **8 or 16** (one per computer). Switches can be connected to each other to build larger networks. |


The main advantage of wireless networking is its **flexibility** (client computers can be located anywhere within range of the network broadcast), but it's **inherently less secure** than a cabled network.


### 3.2 - Software

Network software **streamlines the operations, design, monitoring, and implementation** of computer networks. 

Some of the hardware like routers and switches have embedded softwares, but the **decoupling of software from hardware**, called **software-defined networking** (SDN), works exceptionally well to **simplify the management of infrastructure**, making it more adaptable to the constantly evolving course of the tech world. 

> The use of network software makes it possible to **administer from one centralized user interface** while completely eliminating the need to acquire additional hardware. 

They help to handle:
- **User management**: allows administrators to **add or remove users** from the network.
- **File management**: lets administrators decide the **location of data storage** and **control user access** to that data.
- **Access**: enables users to enjoy uninterrupted access to network resources.
- **Network security systems**: assist administrators in looking after **security** and **preventing data breaches**.


## 4 - Protocols and standards

> **Protocols** allow **network components** to **communicate** with each other.  **Standards** allow **network components manufactured by different companies** to **work together**.


### 4.1 - Definition

#### > Protocols

**Protocols** are **sets of rules that enables effective communications to occur**.

Computer networks depend upon many different types of protocols in order to work. These protocols are very **rigidly defined**, as the network's components need to know how to communicate. Protocols come in many different types, often called **layers**.

Various protocols tend to be used together in matched sets called **protocol suites**. Such as:
- **TCP/IP**: originally developed for Unix networks, it's the protocol of the Internet and most LANs.
- **Ethernet**: low-level protocol that spells out the **electrical characteristics of the network hardware** used by most LANs.

#### > Standards

**Standards** are **agreed-upon definitions of a protocol**. In the early days of computer networking, each computer manufacturer developed its own networking protocols. As a result, you weren't able to easily mix equipment from different manufacturers on a single network. Standards are **industry-wide protocol definitions** that are **not tied to a particular manufacturer**. 

Many organizations are involved in setting standards for networking: ANSI, IEEE, ISO, IETF, W3C.


### 4.2 - The OSI Reference Model

The OSI model **breaks the various aspects of a computer network into seven distinct layers**,  each successive layer enveloping the layer beneath it, **hiding its details from the levels above**. It's a **framework** within which various networking standards can fit, with protocols often spanning on several layers.

OSI stands for Open Systems Interconnection.

#### > The layers

| # | Layer        | Description                                                                                                                                          | Protocols       |
|---|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| 1 | Physical     | Governs the **layout of cables and devices** such as repeaters and hubs                                                                              | USB, Bluetooth  |
| 2 | Data Link    | Provides **MAC addresses** to uniquely identify network nodes and **a means for data to be sent** over the Physical layer in the form of **packets** | Ethernet, SDLC  |
| 3 | Network      | Handles **routing of data across network segments**                                                                                                  | IPv4/IPv6, IPX  |
| 4 | Transport    | Provides for **reliable delivery** of packets                                                                                                        | TCP, UDP        |
| 5 | Session      | **Establishes sessions** between network **applications**                                                                                            | NFS, SQL, X     |
| 6 | Presentation | **Converts data** so that systems with different data formats can exchange information, and can compress/encrypt the data                            | MIDI, HTTP/HTML |
| 7 | Application  | Allows **applications to request network services**                                                                                                  | DNS, FTP, NFS   |

Layers **1-3** (lower levels) deal with the **mechanics of how information is sent** from one computer to another over a network. 

Layers **4-7** (upper levels) deal with **how application software can relate to the network** through application programming interfaces.

> In application, actual networking protocols don't follow the OSI model to the letter. Still, the OSI model **provides a convenient** -if not completely accurate- **conceptual picture** of how networking works.


#### > Following a packet through the layers

When an end-user application sends data to another network computer, the **data enters the network through an Application layer interface**, then **works its way down** through the protocol stack. Along the way, the protocol at each layer **manipulates the data**. 

When the **receiving** computer receives the data, the data **works its way up** through the protocol stack. The protocol at each layer **reverses the processing** that was done by the corresponding layer on the sending computer.

![center-eg](datanav.png)


### 4.3 - The Ethernet Protocol

> Ethernet is a **family of wired networking technologies** for **connecting a number of computer systems to form a network**.

It uses protocols to **control the passing of information** and to **avoid simultaneous transmission** by two or more systems. It's by far the most popular set of protocols for the **Physical and Data Link** layers.

Ethernet divides the **Data Link layer into two separate layers** known as the **Logical Link Control** (LLC) layer and the **Medium Access Control** (MAC) layer.


### 4.4 - The TCP/IP protocol suite

> TCP/IP is a **suite of protocols on which the internet is built**. It is **based on a four-layer model** of networking that is similar to the seven-layer OSI model.

![center-eg](tcpip.png)


#### > IP

For more information see `/tcpip`, the next page.

The **Internet Protocol** is a **Network layer protocol that is responsible for delivering packets to network devices**. The IP protocol uses **logical IP addresses** to refer to **individual devices** rather than physical (MAC) addresses.

A protocol called **ARP** (for Address Resolution Protocol) handles the task of **converting IP addresses to MAC addresses**.

Because IP addresses consist of a **network part** and a **host part**, IP is a **routable protocol**. As such, it can **forward a packet to another network** if the host is not on the current network.
This ability is where IP gets its name. An internet is a series of two or more connected TCP/IP networks that can be reached by routing.


#### > TCP

The **Transmission Control Protocol** is a **connection-oriented Transport layer protocol**. 

TCP lets a device **reliably send a packet to another device** on the same network or on a different network. TCP **ensures that each packet is delivered if at all possible**. It does so by **establishing a connection** with the receiving device and **then sending the packets**. If a packet doesn't arrive, TCP **resends** the packet. The connection is closed only after the packet has been successfully delivered or an unrecoverable error condition has occurred.

One key aspect of TCP is that it's **always used for one-to-one communications**. In other words, TCP allows a single network device to exchange data with another single network device. TCP isn't used to broadcast messages to multiple network recipients.


#### > UDP

The **User Datagram Protocol** is a **connectionless Transport layer protocol** that is used when the **overhead of a connection isn't required**. Hence, UDP is **datagram-oriented**.

UDP **places a packet on the network** via the IP protocol, then it **forgets** about it. UDP **doesn't guarantee that the packet actually arrives** at its destination. 
Most applications that use UDP simply **wait for any replies** expected as a result of packets sent via UDP. If a reply doesn't arrive within a certain period of time, the application either sends the packet again or gives up.

#### > TCP vs UDP

| Metric                  | TCP         | UDP      |
|-------------------------|-------------|----------|
| Orientation             | Connection  | Datagram |
| Error management        | Elaborate   | Basic    |
| Guarantees reception    | ✔️           | ❌       |
| Broadcasting management | ❌          | ✔️        |
| Strength                | Reliability | Speed    |


## Sources

- Networking All-in-One Desk Reference for Dummies, 4th edition, Doug Lowe. 
