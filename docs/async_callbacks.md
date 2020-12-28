---
id: async_callbacks
title: Async callbacks and timouts
sidebar_label: Async callbacks and timouts
---

Sometimes you want to have additional events called to your view with a timeout. This allows you to schedule local events without the DOM being triggered. To do this use the `local_send_timeout` to send another `local_event` after a timeout period.

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
        // This will be called immediately on a click
        "i-was-clicked" => {
          let item: MyClickEvent = deserialize?(payload);
          
          local_send_timeout("after-timeout-event", item, 500)?;

          Ok(())
        }
        // This will be called 500ms after a click
        "after-timeout-event" => {
          let item: MyClickEvent = deserialize?(payload);
          
          // Do something

          Ok(())
        }
        _ => Ok(())
      }
    }
}
```