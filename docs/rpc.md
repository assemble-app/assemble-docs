---
id: rpc
title: Remote Procedure Calls (RPC)
---

import useBaseUrl from '@docusaurus/useBaseUrl';


Often times you will want to access your environment programatically without having to deal with a UI. Assemble integrates well into almost any workflow as it exposes RPC endpoints for you to take advantage of. RPC calls always take an optional argument (which is the decoded body of the request).


```rust
assemble_init! {{
  register_call!(my_rpc_call, my_rpc_call);
}}

#[derive(Deserialize, Serialize)]
struct MyEvent {
  x: String,
  y: String,
}

fn my_rpc_call(t: Option<MyEvent>) -> Result<Box<()>> {
    let ev = t.expect("Expected input");
    pubsub_publish_from("some-topic", "some-event", &ev)?;
    kv_set("my-bucket", &utc_now()?.to_rfc3339(), &ev)?;
    Ok(Box::new(()))
}
```

You can then call the endpoint using any REST client.

## Accessing via REST

First you will need an <a href={useBaseUrl('docs/local_development#1-get-an-api-key')}>API Key</a>.

After that locate your environment ID on your dashboard:

<img alt="Environment id" src={useBaseUrl('img/screenshots/environment-id.png')} />

Now you can call the JSON endpoint.

```bash
curl \
-H "Accept: application/json" \
-H 'Authorization: Bearer [API key]' \
-H "Content-Type: application/json" \
--data '{"x": "xxx", "y": "yyy"}' \
www.assemble.app/environment/[Your Environment ID]/rpc/my_rpc_call
```

You can also call the endpoint with MsgPack using the `application/x-msgpack`. If you are using the API in python or another programming language MsgPack is preferred as there is no exta conversion so it is faster and more accurate. You can also transmit binary data via MsgPack.