---
id: presence
title: Presence
---

A companion to events is the Presence feature. Presence allows you track "Whos online". Once your view is tracked by a presence, you will remain in the presence list until the view closes.


```rust
#[derive(Deserialize, Serialize)]
struct MyPresenceMetaData {
    something: u32
}

let meta = MyPresenceMetaData{something: 1};
presence_track("my-presence-topic", "my-user-key", &meta)?;
```

In order to subscribe to changes of a presence, you need to use `presence_subscribe` this is best done in the start method. Everytime someone joins or leaves, `presnce_event` will be called.

```rust

impl View for ViewHandler {
  fn start(is_connected: bool, _params: HashMap<String, String>) -> Result<Self> {
    presence_subscribe("my-presence-topic")?;
    // ..
  }

  // ..

  fn presence_event(&mut self, topic: &str, diff: PresenceDiffRaw) -> Result<()> {
      match topic {
        "my-presence-topic" => {
          let ev: PresenceDiff<MyPresenceMetaData> = presence_deserialize_diff(diff)?;
        
          // Do something

          Ok(())
        }
        _ => Ok(())
      }
  }
}

```

## Putting it all together

Below the app will keep a list of who is online. As other tabs open the environment, the list of online users will automatically update.

Open in [multiple tabs](https://www.assemble.app/environment/fcdc6e45-4e7b-4ac3-8d5e-07e8eaf31c49/view/) to see users enter and leave. 

[Quick view](https://www.assemble.app/environment/fcdc6e45-4e7b-4ac3-8d5e-07e8eaf31c49/quick_view/) for details and to fork. 


<iframe height="400" width="100%" src="https://www.assemble.app/environment/fcdc6e45-4e7b-4ac3-8d5e-07e8eaf31c49/view/?iframe=true" title="Presence"></iframe>

```rust
extern crate assemble_app;
extern crate serde;
extern crate maud;
use assemble_app::*;
use maud::html;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};

assemble_init! {{
    register_root_view!(ViewHandler);
}}


#[derive(Deserialize, Serialize)]
struct MyPresenceMetaData {
    something: String
}

#[derive(Deserialize, Serialize)]
struct ViewHandler {
    your_id: String,
    connected_users: HashSet<String>
}

impl View for ViewHandler {
  fn start(is_connected: bool, _params: HashMap<String, String>) -> Result<Self> {
    let meta = MyPresenceMetaData{something: random_string(10)?};
    presence_track("my-presence-topic", &format!("user-{}", meta.something), &meta)?;
    presence_subscribe("my-presence-topic")?;
    let initial_users = presence_list::<MyPresenceMetaData>("my-presence-topic")?;
    let mut hs = HashSet::new();
    
    for (k, _) in initial_users {
        hs.insert(k);
    }
    
    Ok(ViewHandler {your_id: meta.something, connected_users: hs})
  }

  fn render(&self) -> Result<Html> {
    let markup = html! {
        div class="bg-indigo-700" {
          div class="mx-auto text-center py-16 px-8" {
            h2 class="mt-4 text-3xl font-extrabold text-white" {
              "You are: " (self.your_id)
            }
            h2 class="mt-4 text-3xl font-extrabold text-white" {
              "Connected users"
            }
            @for (user) in &self.connected_users {
              p class="mt-4 text-lg leading-6 text-indigo-200" {
                (user)
              }
            }
          }

        }
    };
    Ok(markup.into_string())
  }

  fn presence_event(&mut self, topic: &str, diff: PresenceDiffRaw) -> Result<()> {
      match topic {
        "my-presence-topic" => {
          let ev: PresenceDiff<MyPresenceMetaData> = presence_deserialize_diff(diff)?;
        
          for (user, _meta) in ev.joins {
            self.connected_users.insert(user);
          }
          for (user, meta) in ev.leaves {
            self.connected_users.remove(&user);
          }

          Ok(())
        }
        _ => Ok(())
      }
  }
}
```