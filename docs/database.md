---
id: database
title: Interacting with the database
sidebar_label: Interacting with the database
slug: /database
---

Eventually you will want to persist data to stay around after you close your browser tab. Every Assemble environment comes with a database that you can use to store data.

## Putting data in

```rust
#[derive(Deserialize, Serialize)]
struct MyData {
    some_param: String,
    other_param: u32
}

kv_set(
    "my-bucket",
    "my-item-key",
    &MyData{some_param: "Hello world".into(), other_param: 0}
)?;
```

## Getting data out

```rust
let data: Option<MyData> = kv_get("my-bucket", "my-item-key")?;
```

## Patching data

Sometimes you only want to update one field without having to read the whole object, change the field and write the whole object back. Patching objects allow you to do this by creating a struct with only the fields you want to change.


```rust
#[derive(Deserialize, Serialize)]
struct MyDataPatch {
    other_param: u32
}

kv_patch("my-bucket", "my-item-key", &MyDataPatch{other_param: 0})?;
```

## Scanning data

When you want to read the objects by the order of the keys, use the scan functionality. This is useful for displaying lists and building indexes.

```rust
let scan_opts = ScanOpts::default().reverse(true).limit(LIMIT);
let items = kv_scan::<MyData>("my-bucket", &scan_opts)?;
for (key, item) in items {
    // do something
}
```

## Counters

Sometimes you want to simply keep count of things. For this, reading a key, updating it and writing it back out is not desirable. Assemble supplies the counter type to accomodate this.

```rust
counter_increment("my-bucket", "my-counter", 1)?;
let current_count = counter_get("my-bucket", "my-counter")?
```



## Putting it all together

Lets continue building our example from the previous section by storing events in the database after every click and when the View starts, scanning the database and loading the most recent ones.

[Quick view](https://www.assemble.app/environment/8bd8ffc6-85cd-4466-8320-5cd56d94b1aa/quick_view/) for details and to fork. 


<iframe height="400" width="100%" src="https://www.assemble.app/environment/8bd8ffc6-85cd-4466-8320-5cd56d94b1aa/view/?iframe=true" title="Database"></iframe>

```rust
extern crate assemble_app;
extern crate serde;
extern crate maud;
use assemble_app::*;
use maud::html;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, VecDeque};

assemble_init! {{
    register_root_view!(ViewHandler);
}}

#[derive(Deserialize, Serialize)]
struct MyEvent {
    description: String,
    face: String,
}

#[derive(Deserialize, Serialize)]
struct ViewHandler {
  recent_events: VecDeque<MyEvent>
}

const LIMIT: u32 = 10;

impl View for ViewHandler {
  fn start(_is_connected: bool, _params: HashMap<String, String>) -> Result<Self> {
    pubsub_subscribe("events")?;

    let mut vd = VecDeque::new();

    let events = kv_scan::<MyEvent>("event_bucket", &ScanOpts::default().reverse(true).limit(LIMIT))?;
    for (_, event) in events {
        vd.push_front(event);
    }
    Ok(ViewHandler { recent_events: vd })
  }

  fn render(&self) -> Result<Html> {
    let markup = html! {
        div class="bg-indigo-700" {
          div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8" {
            button assemble-click="click" assemble-value-description="Panda"  assemble-value-face="🐼" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto" {
              "Pick panda (🐼)"
            }
            button assemble-click="click" assemble-value-description="Gorilla"  assemble-value-face="🦍" class="mx-4 mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto" {
              "Pick gorilla (🦍)"
            }
            button assemble-click="click" assemble-value-description="Tiger"  assemble-value-face="🐯" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto" {
              "Pick tiger (🐯)"
            }
            h2 class="mt-4 text-3xl font-extrabold text-white sm:text-4xl" {
              span class="block" {
                "Last 100 Events"
              }
            }
            @for (event) in &self.recent_events {
              p class="mt-4 text-lg leading-6 text-indigo-200" {
                "Somebody picked a " (event.description) " " (event.face)
              }
            }
          }

        }
    };
    Ok(markup.into_string())
  }

  fn local_event(&mut self, msg: &str, payload: &[u8]) -> Result<()> {
    match msg {
      "click" => {
        let ev: MyEvent = deserialize(payload)?;
        kv_set("event_bucket", &utc_now()?.to_rfc3339(), &ev)?;
        pubsub_publish_from("events", "new_event", &ev)?;
        self.recent_events.push_front(ev);
        self.recent_events.truncate(LIMIT as usize);
        
        Ok(())
      }
      _ => Ok(())
    }
  }

  fn pubsub_event(&mut self, topic: &str, event: &str, payload: &[u8]) -> Result<()> {
    match &(topic, event) {
      ("events", "new_event") => {
        self.recent_events.push_front(deserialize(payload)?);
        self.recent_events.truncate(LIMIT as usize);
        Ok(())
      }
      _ => Ok(())
    }
  }
}
```