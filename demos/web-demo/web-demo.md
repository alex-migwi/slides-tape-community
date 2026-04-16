# Slides tape web automation demo

When you use a web block i.e. `web run`, the flow is specialized for browser automation and live streaming. Unlike standard shell runs that stream text, this streams a direct "video feed" of a headless browser.

```web run
# @goto https://google.com
# @wait 1s
# @highlight textarea[name="q"]
# @type textarea[name="q"] "slides-tape npm package"
# @wait 5s
```

---

## Test web UI Flow Automation

```web run

# @goto http://localhost:3000
# @wait 3s
# @click button[id="theme-toggle"]
# @wait 3s

# Toggle the theme back
# @click button[id="theme-toggle"]
# @wait 3s

# Show failed login
# @highlight input[id="email"]
# @type input[id="email"] "demo@comapny.com"
# @highlight input[id="password"]
# @type input[id="password"] "password123"
# @wait 500ms
# @click button[type="submit"]
# @wait 2s

# Clear the inputs
document.getElementById('email').value = ""
document.getElementById('password').value = ""
# @wait 2s

# Now login
# @highlight input[id="email"]
# @type input[id="email"] "demo@company.com"
# @highlight input[id="password"]
# @type input[id="password"] "password123"
# @wait 500ms
# @click button[type="submit"]
# @wait 2s

# @click a[id="products-link"]
# @wait 5s

# Go back to Dashboard
# @click a[id="dashboard-link"]
# @wait 500ms

# Add new Item
# @click button[id="new-item"]
# @highlight input[id="item-name"]
# @type input[id="item-name"] "Macbook Air M6"
# @click button[id="save"]
# @wait 100ms
document.getElementById('item-name').value = ""
# @type input[id="item-name"] "Dell XPS 360"
# @click button[id="save"]
# @wait 2s

# Logout
# @click .logout
# @wait 3s
alert("That's all folks.")
# @wait 2s
```
---

# Export the web run block into video

You can execute and record standalone browser automation scripts `web run` extracted from Markdown into an `mp4` video.

```bash
slides-tape web demo-tour.md -o demo-tour.mp4 -r 1280x720
```
| Option | Description |	Default |
| -------- | ------- | -------- |
| -o, --output <path> |	Encode directly to MP4 | - |
| -r, --resolution <WxH>|	Resolution for video | 	1920x1080 |
| -f, --fps <fps>|	Framerate for video | 30 |

---