## Log

- Initial Assumption: Starter code from Stream Labs was sufficient to work with.
- Ran using a simple tool to live preview: https://www.npmjs.com/package/live-server
- added in aspect ratio (app.css)
- I've chosen to re-render the whole canvas when moving images. This is something that I'd like to change in the future, but starting out it's nice to have a simple mental model.
- I've persisted state into local storage. It's ok for keeping track of position, etc. But is reliant upon the image array always being in the same order.
- I'd be very curious of solutions within streamlabs to avoid re-rendering the canvas for every change and performance gains around that.

## Questions

- How long did it take you to complete this assignment? \*
  The assignment took me about 2 hours and 30 minutes. So right in that sweet spot. ;)

- What about this assignment did you find most challenging? \*
  Nothing was super challenging... However, I think the challenging part would be in performance. It seems to me that with some more research you might be able to find performance gains. I was a little time crunched, but at scale you'd definitely want to investigate this more.

- What about this assignment did you find unclear? \*
  The biggest question I found myself asking was... "Are there any gotchas?". Because on one hand it seemed easy enough, but on the other hand it seems like trusting the given code could also be a quick fail.

- What challenges did you face that you did not expect? \*
  The math and dealing with offset, walls, etc is simple enough math, but I had to write it out. ha.

- Do you feel like this assignment has an appropriate level of difficulty? \*
  Definitely.

- Briefly explain your decisions to use tools, frameworks and libraries like React, Vue, etc. \*
  I didn't use any because it seemed like you wanted just javascript to highlight that I'm not tied to a paticular frameworks.
