## Log

- Starter code from Stream Labs was sufficient to work with.
- Ran using a simple tool to live preview: https://www.npmjs.com/package/live-server
- added in aspect ratio (app.css)
- I've chosen to re-render the whole canvas when moving images. This is something that I'd like to change in the future, but starting out it's nice to have a simple mental model.
- I've persisted state into local storage. It's ok for keeping track of position, etc. But is reliant upon the image array always being in the same order.
- I'd be very curious of solutions within streamlabs to avoid re-rendering the canvas for every change and performance gains around that.
