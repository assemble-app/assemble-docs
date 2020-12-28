---
id: infinite_dom
title: Infinte DOM with finite state
---

Your view's state is limited to a certain amount of memory when serialized. When building things like a chat app, often you wan't the past history of events to be saved without having to keep them in memory.

Typically, Live HTML will replace divs in a when the list changes. Utilizing the `assemble-update` binding we can instead append or prepend the div. You *must* set a unique ID on the parent element and for each child element

### Putting it all together

The below example will keep all events in view even though one event is kept in memory. Because after each event the ID is unique, Live HTML will prepend the container to the list.

[Quick view](https://www.assemble.app/environment/3fbabc8b-109c-4568-a232-e9ed5240c7b0/quick_view/) for details and to fork. 


<iframe height="400" width="100%" src="https://www.assemble.app/environment/3fbabc8b-109c-4568-a232-e9ed5240c7b0/view/?iframe=true" title="Infinite DOM"></iframe>

```rust
extern crate assemble_app;
extern crate serde;
extern crate maud;
use assemble_app::*;
use maud::html;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap};

assemble_init! {{
    register_root_view!(ViewHandler);
}}


#[derive(Deserialize, Serialize)]
struct ViewHandler {
    id: String,
    chosen_animal: String,
}


#[derive(Deserialize, Serialize)]
struct MyClickEvent {
    animal: String,
}


impl View for ViewHandler {
  fn start(_is_connected: bool, _params: HashMap<String, String>) -> Result<Self> {
    Ok(ViewHandler {id: "initial".into(), chosen_animal: "❓".into()}).into()
  }

  fn render(&self) -> Result<Html> {
    let markup = html! {
        div class="bg-indigo-700" {
          div class="max-w-2xl mx-auto text-center py-16 px-8" {
            div id="clicks" assemble-update="prepend" {
              h2#(self.id) class="cursor-pointer mt-4 text-xl font-extrabold text-white" {
                "You clicked: " (self.chosen_animal)
              }
            }

            a href="#" assemble-click="i-was-clicked" assemble-value-animal="🐕" class="cursor-pointer mt-4 mx-6 text-2xl font-extrabold text-white" {
              "🐕"
            }
            a href="#" assemble-click="i-was-clicked" assemble-value-animal="🐈" class="cursor-pointer mt-4 mx-6 text-2xl font-extrabold text-white" {
              "🐈"
            }
          }

        }
    };
    Ok(markup.into_string())
  }
  
  
  fn local_event(&mut self, msg: &str, payload: &[u8]) -> Result<()> {
      match msg {
        "i-was-clicked" => {
          let id = random_string(10)?;
          let ev: MyClickEvent = deserialize(payload)?;
          self.chosen_animal = ev.animal;
          self.id = id;
          Ok(())
        }
        _ => Ok(())
      }
  }
    
}
```

### More info

Refer to the [LiveView docs](https://hexdocs.pm/phoenix_live_view/dom-patching.html) for more information about the binding.
