---
id: limits
title: Limits
sidebar_label: Limits
---

There are some restrictions placed on operations performed on the platform in order to maintain an equitable computing platform. These limits are configurable on either a user level or on a cluster level if you need a more comprehensive enterprise solution.

## WebAssembly VM Invocations

### Rate Limit
* Users are limited to 10 invocations per second.
* Invocations must complete within 5s of starting.

### Data size
* Function return statements
    * View state, RPC functions, Render Function, Event and Message Handler functions
        * 10 Mb
* Platform calls
    * Storing data, sending a message, calls that you make to the platform.
        * 900 kb


## Database Operations

### Rate Limit
* Limit of 25 writes per invocation

### Data size
* SET and PATCH
    * 900kb max item size.
        * Computed by key and object serialized to MsgPack including struct field names.
    * Be careful patching objects as the individual patch may be less than 900kb, but the resulting item size will fail.
* SCAN
    * Max 1000 items scanned per call.
    * Max 50mb of items returned per scan
        * This may mean that you return less than the limit even though there exists more rows in the database.

## Events

### Rate Limit
* Limit of 10 publishes per invocation

### Data size
* 900kb per publication

## Wasm File 

### Data size

* App versions are limited to 10mb of size. 
    * The platform accepts brotli compressed files to facilate making it under this limit
    * If you are building form the command line manually make sure you use wasm-opt