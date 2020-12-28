---
id: hello_world
title: Hello world
sidebar_label: Hello world
---

To implement a Live HTML component, you must implement two methods, `start` and `render`. When the page first loads, the `start` method is called 1 time with a HashMap of GET parameters that were in the URL. After you return an instance of your View, the `render` method will be called to compute the UI. After every event, the render method is called again, so it is important that no expensive computations take place inside the render method. All platform functions are disabled inside during render.

## Basic Strings with unreset

To return HTML for your view, simple return a string from your `View`'s `render` method. The CSS styles of the page have been reset so there are no default brower styles. In order to get basic styles use the class `unreset`

<iframe height="100" width="100%" src="https://www.assemble.app/environment/ca4d3b0d-293a-4577-9444-3c607b0c4baa/view/?iframe=true" title="Hello World Basic"></iframe>

```rust
extern crate assemble_app;
extern crate serde;
use assemble_app::*;
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
    Ok(r#"<div class="unreset"><h1>Hello world</h1></div>"#.into())
  }
}
```





## Using Maud and Tailwind

Returning strings is not advised. You should properly escape string variables that you interpolate into your template. A more "rusty" approach is to use `maud` macro's to build the HTML for you.

Assemble includes [tailwind](https://tailwindcss.com/) for adding styles to your view. With tailwind you don't need to write CSS and simply style your HTML with classes.

<iframe height="200px" width="100%" src="https://www.assemble.app/environment/b76dcec8-1052-44a0-9691-460b74587c9f/view/?iframe=true" title="Hello World"></iframe>

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
          div class="max-w-2xl mx-auto text-center py-16 px-8" {
            h2 class="mt-4 text-3xl font-extrabold text-white" {
              "Hello world"
            }
          }

        }
    };
    Ok(markup.into_string())
  }
}
```



