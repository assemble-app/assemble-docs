---
id: what_is
title: What is Assemble?
sidebar_label: What is Assemble?
slug: /
---

[Assemble](https://www.assemble.app/) is a cutting edge platform for building dashboards and interactive apps that update and react to events. There are several key aspects of what makes assemble different and why once you start, its hard to go back to the traditional programming paradigm.

### * Preview status *

Assemble is currently in preview mode so we depend on you to report when things go wrong. In preview mode we can make no guarantee of the general cluster's responsiveness or uptime. That said, we are working to make this a rock solid platform for you to enjoy.

## Core Concepts

### Serverless Server-Side Apps
Your app is rendered server side using "Live HTML" technology developed in the [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html) framework. Live HTML is built on the latest web technologies to accelerate your development process. Your code is entirely executed on the server and DOM diffs are sent to the frontend over websockets. This improves the security model because you don't have to build complex APIs to synchronize backend state

Infrastructure is abstracted away so you don't have to worry about load-balancers, clustering, or maintaining servers. Everything is elastic. Spend more time building and sharing your app instead of endlessly tinkering with configs.


### Ordered Key-Value Eventually Consistent Database
Event based systems can consume a lot of data. This data is not appropriate to store in traditional relational database. Assemble's database is an Ordered Key-Value Store that is eventually consistent. What this means is that you can scan the database by keys in-order. This gives you extremely fine grained control of how you insert and store your data. You can build indexes, sets and everything you need exactly the way you need it.

Eventual consistency allows high-throughput data injestion at the cost of consistency. So when you write a key, it may not be immediately available for a few milliseconds.


### Event System
Events run the assemble ecosystem. Your app can publish and subscribe to events on the network and build your app. Events are constrained to individual environments and cause your app to rerender based on the side-effects from the event. Events are ephemeral, but you can persist these events into the database for later retrieval if you need.


### RPC
You can programatically interact with your environment by building RPC endpoints. You can interact with these endpoints with JSON or MsgPack REST calls. Calling the RPC with JSON will automatically convert the input to MsgPack for your app to consume. Connect and insert events and data into your environment from any language or machine.
