---
id: environment_events
title: Environment events
sidebar_label: Environment events
---

Assemble is a platform of events. Your view should be built to respond to those events. Events are consumed by subscribing to topics. this is normally best performed in the `start` function of your `View`


```rust
impl View for ViewHandler {
    fn start(_params: HashMap<String, String>) -> Result<Self> {
      pubsub_subscribe("my-awesome-topic")?;

      Ok(ViewHandler { })
    }
    // ..
}

```


To publish events, use the `pubsub_publish` and `pubsub_publish_from` functions. Be aware that using `pubsub_publish` your view will receive the same event that you published. In order to prevent this it is recommended to just always use `pubsub_publish_from` which will prevent this from happening.

```rust
#[derive(Deserialize, Serialize)]
struct MyEnvEvent {
    my_param: String,
}

// ..

pubsub_publish_from(
    "my-awesome-topic",
    "my-event",
    &MyEnvEvent{my_param: "Hello world"}
)?;
```

Events from the topic will be streamed into your view's `pubsub_event` method.

```rust
impl View for ViewHandler {
    // ..

    fn pubsub_event(&mut self, topic: &str, event: &str, payload: &[u8]) -> Result<()> {
        match topic {
            "my-awesome-topic" => {
                match event {
                    "my-event" => {
                        let ev: MyEnvEvent = deserialize(payload)?;
                        // Do something
                        Ok(())
                    }
                    _ => Ok(())
                }
            }
            _ => Ok(())
        }
        // ..
    }
    // ..
}
```

### Putting it all together

Combining local DOM events with PubSub events lets you build collaborative allications easily. This example uses a double-ended queue to keep a list of the latest 10 events in the environment.

<iframe height="400" width="100%" src="https://www.assemble.app/environment/d7f7bd7a-1a82-40d3-ac0a-5a6630966d40/view/?iframe=true" title="Environment Events"></iframe>

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