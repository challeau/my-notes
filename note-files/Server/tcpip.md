[//]: # (TITLE TCP/IP)
[//]: # (ENDPOINT /tcpip)
[//]: # (PRIORITY 1)

# TCP/IP and the Internet

The Internet links more than half a billion computers throughout the world. Strictly speaking, **the Internet is a network of networks**. It consists of **tens of thousands of separate computer networks, all interlinked**, so that a user on any of those networks can reach out and potentially touch a user on any of the other networks.

The Internet Protocol (IP) is the **network layer communications protocol** in the Internet protocol suite for **relaying data across network boundaries**. Its routing function enables internetworking, and **essentially establishes the Internet**.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [TCP/IP and the Internet](#tcpip-and-the-internet)
        - [Table of contents](#table-of-contents)
  - [1 - Definition](#1---definition)
  - [2 - The TCP/IP protocol framework](#2---the-tcpip-protocol-framework)
    - [2.1 - Network interface layer](#21---network-interface-layer)
    - [2.2 - Network layer](#22---network-layer)
    - [2.3 - Transport layer](#23---transport-layer)
    - [2.4 - Application layer](#24---application-layer)
  - [3 - IP addresses](#3---ip-addresses)
  - [3.1 - Binary operators](#31---binary-operators)
  - [3.2 - Networks and hosts](#32---networks-and-hosts)

<!-- markdown-toc end -->

## 1 - The internet

One of the official documents (RFC 2026) of the Internet Engineering Task Force (IETF) defines the Internet as "**a loosely organized international collaboration of autonomous, interconnected networks**.

Broken down piece by piece, this definition encompasses several key aspects:

Loosely organized
: **No single organization has authority over the Internet**.

International
: Nearly 200 countries are represented on the Internet.

Collaboration
: The Internet exists only because many different organizations cooperate to provide the services and support needed to sustain it. Much of the software that drives the Internet is **open-source software**.

Autonomous
: The Internet community respects that organizations that join the Internet are **free to make their own decisions about how they configure and operate their networks**.

Interconnected
: The whole key to the Internet is the concept of interconnection, which uses standard protocols that enable networks to communicate with each other. **Without the interconnection provided by the TCP/IP protocol, the Internet would not exist**.

Networks
: The Internet would be completely unmanageable if it consisted of half a billion individual users, all interconnected. That's why the Internet is often described as a **network of networks**.
<br>
Most individual users on the Internet don't access the Internet directly. Instead, they access the Internet indirectly through another network, or a dialup or broadband network provided by an Internet service provider (ISP).
<br>
In each case, however, the **users of the local network access the Internet via a gateway IP router**. The Internet is composed of **several distinct types of networks**: government agencies, military sites, educational institutions, businesses, ISPs, and commercial online services.

## 2 - The TCP/IP protocol suite

The **Internet Protocol** is a Network layer protocol that is **responsible for delivering packets to network devices**. The IP protocol uses **logical IP addresses** to refer to individual devices rather than physical (MAC) addresses.

A protocol called **ARP** (for Address Resolution Protocol) handles the task of converting IP addresses to MAC addresses.

> Because IP addresses consist of a **network part** and a **host part**, IP is a **routable protocol**. As such, it can forward a packet to another network if the host is not on the current network.
> 
> This ability is where IP gets its name: **an internet is a series of two or more connected TCP/IP networks that can be reached by routing**.

The **Transmission Control Protocol** is a connection-oriented Transport layer protocol. TCP lets a device **reliably send a packet to another device** on the same network or on a different network.

TCP **ensures that each packet is delivered** if at all possible. It does so by establishing a connection with the receiving device and then sending the packets. If a packet doesn't arrive, TCP resends the packet. The connection is closed only after the packet has been successfully delivered or an unrecoverable error condition has occurred.

One key aspect of TCP is that it's **always used for one-to-one communications**. In other words, TCP allows a single network device to exchange data with another single network device. TCP isn't used to broadcast messages to multiple network recipients.

### 2.1 - By layers

![center-eg](tcpip.png)

#### 2.2.1 - Network interface layer

It corresponds to the OSI **Physical** and **Data Link** layers. It is assumed to be **unreliable**.

#### 2.2.2 - Network layer

It's where **data is addressed, packaged, and routed** among networks. Several important Internet protocols operate at the Network layer:
- Internet Protocol (**IP**): routable protocol that uses IP addresses to **deliver packets** to network devices. IP is an intentionally unreliable protocol, so it **doesn't guarantee delivery of information**.
- Address Resolution Protocol (**ARP**): **resolves IP addresses to MAC addresses**, which uniquely identify hardware devices.
- Internet Control Message Protocol (**ICMP**): sends and receives **diagnostic** messages. ICMP is the basis of the ubiquitous **ping** command.
- Internet Group Management Protocol (**IGMP**): used to **multicast messages** to multiple IP addresses at once.


#### 2.2.3 - Transport layer

It's where **sessions are established** and **data packets are exchanged** between hosts. Two core protocols are found at this layer:
- **TCP**: provides **reliable connection-oriented transmission** between two hosts. TCP establishes a session between hosts, and then ensures delivery of packets.
- **UDP**: provides **connectionless, unreliable, one-to-one or one-to-many delivery**.


#### 2.2.4 - Application layer

It corresponds to the **Session**, **Presentation**, and **Application** layers of the OSI Reference Model. A few of the most popular Application layer protocols are: **HTTP**, **FTP**, **SMTP**, and **DNS**.


## 3 - IP addresses

> An IP address is a **number that uniquely identifies every host on an IP network**.  Its primary purpose is to **enable communications between networks**.

IP addresses operate at the **Network layer** of the TCP/IP protocol stack, so they are **independent of lower-level Data Link layer MAC addresses**. 
An IP address is **assigned** individually by the admin or **automatically** via the **DHCP** protocol.

There are two types of adresses:
- **Public addresses** are **registered and routable** on the **Internet**. **Globally unique**.
- **Private addresses** are only used in a **local network**. **Unique in this network only**.

Private address spaces:

| CIDR                    | Subnet Mask   | Address range                 |
|-------------------------|---------------|-------------------------------|
| 10.0.0.0/8              | 255.0.0.0     | 10.0.0.1 - 10.255.255.254     |
| 172.16.0.0/12           | 255.255.240.0 | 172.16.1.1 - 172.31.255.254   |
| 192.168.0.0/16          | 255.255.0.0   | 192.168.0.1 - 192.168.255.254 |

**Firewalls** use a technique called **network address translation** (NAT) to **translate private addresses to public ones** to allow devices access to the Internet from a private network, thus **hiding the private IP address** to the world.

There are two main formats for IP addresses:
- IPv4 --> 32 bits (4 octets)
- IPv6 --> 128 bits (16 octets)

IPv4 uses a 32-bit address, resulting in a limited pool of approximately 4.3 billion unique addresses. That includes the public IP address allocations.

In contrast, IPv6 employs a 128-bit address, providing a staggering 3.4 x 10^38 unique IP addresses to accommodate the ever-increasing number of connected devices.

### 3.1 - Binary operators

Logical operations for binary values:

| First value | Second value | AND | OR | XOR |
|-------------|--------------|-----|----|-----|
| 0           | 0            | 0   | 0  | 0   |
| 0           | 1            | 0   | 1  | 1   |
| 1           | 0            | 0   | 1  | 1   |
| 1           | 1            | 1   | 1  | 0   |

### 3.2 - Networks and hosts

An IPv4 address actually consists of two parts:
- The **network ID** (or network address): identifies the **network** on which a host computer can be found.
- The **host ID** (or host address): identifies a **specific device** on the network indicated by the network ID.

When the original designers of the IP protocol created the IP addressing scheme, they could have assigned an arbitrary number of IP address bits for the network ID. The remaining bits would then be used for the host ID. However, few networks would actually have that many hosts, so the idea of **IP address classes** were introduced.

The IP protocol defines **five different address classes**: A, B, C, D, and E. Each of classes A-C uses a different size for the network ID and host ID portion of the address.

The **first four bits** of the IP address are used to determine into **which class** an address fits:

![center-eg](ipclasses.png)

## 4 - IPv4 and IPv6

Internet Protocol version 4 (IPv4) is the first version of the Internet Protocol (IP) as a standalone specification. Internet Protocol version 6 (IPv6) is the most recent version of the Internet Protocol (IP).

--> classes + subnet masks for 4/6

- ARP: communication protocol used for discovering the link layer address, such as a MAC address, associated with a given internet layer address, typically an IPv4 address. IPv6 --> see NDP
- DHCP: a network management protocol used on IP networks for automatically assigning IP addresses and other communication parameters to devices connected to the network using a client-server architecture

- SLAAC: stateless address autoconfiguration, eq. to DHCP in ipv4 --> automatically assigning IP addresses
- NDP: protocol of the Internet protocol suite used with Internet Protocol Version 6 (IPv6). It operates at the internet layer of the Internet model, and is responsible for gathering various information required for network communication, including the configuration of local connections and the domain name servers and gateways.

## Protocols, briefly

TCP/IP --> protocol suite that relies on IP addresses to send data between network devices.

ARP --> protocol that converts internet layer adresses (IP) to link layer adresses (MAC).

DHCP --> protocol that assigns IP addresses.
