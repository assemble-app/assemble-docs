---
id: dom_events
title: DOM events and state
sidebar_label: DOM events and stateful content
---
import useBaseUrl from '@docusaurus/useBaseUrl';


## Interacting with the DOM
When building your dashboard you may want to add some functionality to the UI. This is easily done by utilizing special `assemble-` prefixed attributes in your HTML tags.

```rust
a href="#" assemble-click="i-was-clicked" assemble-value-my_param="I will be a param" { 
    "Click me!"
}
```

When these events trigger, they call the `local_event` function on your `View`. This method is called with a `msg` and `payload` argument. The `msg` is a text string to match on. The payload is a MsgPack encoded datastructure corrosponding to the event. The payload can be build using a form or the `assemble-value-*` attribute.

```rust
#[derive(Deserialize, Serialize)]
struct MyClickEvent {
    my_param: String,
}

// ...
impl View for ViewHandler {
    // ..

    fn local_event(&mut self, msg: &str, payload: &[u8]) -> Result<()> {
      match msg {
        "i-was-clicked" => {
          let item: MyClickEvent = deserialize?(payload);
          // Do something
          Ok(())
        }
        _ => Ok(())
      }
    }
}
```

### List of attributes

A list of available attributes are available here. Please refer to the [LiveView docs](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html#module-bindings) on their phoenix equivalent for more details (simply replace `assemble-` prefix with `phx-`)

  | Binding                | Attributes |
  |------------------------|------------|
  | [Params](https://hexdocs.pm/phoenix_live_view/bindings.html#click-events) | `assemble-value-*` |
  | [Click Events](https://hexdocs.pm/phoenix_live_view/bindings.html#click-events) | `assemble-click`, `assemble-capture-click` |
  | [Focus/Blur Events](https://hexdocs.pm/phoenix_live_view/bindings.html#focus-and-blur-events) | `assemble-blur`, `assemble-focus`, `assemble-window-blur`, `assemble-window-focus` |
  | [Key Events](https://hexdocs.pm/phoenix_live_view/bindings.html#key-events) | `assemble-keydown`, `assemble-keyup`, `assemble-window-keydown`, `assemble-window-keyup`, `assemble-key` |
  | [Form Events](https://hexdocs.pm/phoenix_live_view/form-bindings.html) | `assemble-change`, `assemble-submit`, `assemble-feedback-for`, `assemble-disable-with`, `assemble-trigger-action`, `assemble-auto-recover` |
  | [Rate Limiting](https://hexdocs.pm/phoenix_live_view/bindings.html#rate-limiting-events-with-debounce-and-throttle) | `assemble-debounce`, `assemble-throttle` |
  | [DOM Patching](https://hexdocs.pm/phoenix_live_view/dom-patching.html) | `assemble-update` |


## Changing your view's state
Your view must implement the `Deserialize` and `Serialize` traits from serde. After an event, your view's state is serialized using MsgPack until the next event that comes in. This allows you to create stateful apps by simply mutating your View's attributes.

See the <a href={useBaseUrl('docs/limits#data-size')}>limits</a> section for additional information about this serialization.



## Rendering Dynamic Content

Content can be built up using normal Rust programming in your render method. See [maud's documentation](https://maud.lambda.xyz/control-structures.html) about how to incorporate control structures into your app.


## Putting it together

Combining DOM events, stateful views and dynamic content, we can create an app which updates based on a click.

<iframe height="200" width="100%" src="https://www.assemble.app/environment/ce0bab0a-56cc-4640-83b3-ee91401b4f5f/view/?iframe=true" title="DOM event click"></iframe>


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
    chosen_animal: String,
}


#[derive(Deserialize, Serialize)]
struct MyClickEvent {
    animal: String,
}


impl View for ViewHandler {
  fn start(_is_connected: bool, _params: HashMap<String, String>) -> Result<Self> {
    Ok(ViewHandler {chosen_animal: "❓".into()}).into()
  }

  fn render(&self) -> Result<Html> {
    let markup = html! {
        div class="bg-indigo-700" {
          div class="max-w-2xl mx-auto text-center py-16 px-8" {
            h2 class="cursor-pointer mt-4 text-3xl font-extrabold text-white" {
              "You clicked: " (self.chosen_animal)
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
          let ev: MyClickEvent = deserialize(payload)?;
          self.chosen_animal = ev.animal;
          Ok(())
        }
        _ => Ok(())
      }
  }
    
}
```
