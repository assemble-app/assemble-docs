---
id: dashboards
title: Dashboards by embeding views
---

Combining views into one is as simple as embedding an iframe.

`https://www.assemble.app/environment/[Your Environment Id]/view/?iframe=true`

The `?iframe=true` prevents the standard header from appearing.

<iframe width="100%" height="200px" src="https://www.assemble.app/environment/501651cc-0f12-4272-80a9-9d3d92faa3de/view/?iframe=true"></iframe>

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
}

impl View for ViewHandler {
  fn start(_is_connected: bool, _params: HashMap<String, String>) -> Result<Self> {
    Ok(ViewHandler {})
  }

  fn render(&self) -> Result<Html> {
    let markup = html! {
        div class="bg-indigo-700" {
          div class="grid grid-cols-3 gap-4" {
            iframe class="w-full h-96" src="/environment/ce0bab0a-56cc-4640-83b3-ee91401b4f5f/view/?iframe=true" {
                
            }
            iframe class="w-full h-96 col-span-2" src="/environment/b76dcec8-1052-44a0-9691-460b74587c9f/view/?iframe=true" {
                
            }
          }

        }
    };
    Ok(markup.into_string())
  }
}
```