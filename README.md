# 📼 slides-tape

> The terminal-first, Markdown-native presentation engine. Write slides, record terminals, automate browsers — all from one CLI.

[![npm](https://img.shields.io/npm/v/slides-tape?color=crimson&style=flat-square)](https://www.npmjs.com/package/slides-tape)
[![node](https://img.shields.io/node/v/slides-tape?style=flat-square)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/slides-tape?style=flat-square)](LICENSE)

> OpenSource code will be available soon. We need to take care of some stuff first.

---

## ✨ What is slides-tape?

`slides-tape` turns Markdown files into fully-featured technical presentations. It combines:

- 🖥️ **A live browser viewer** — serve your slides as a beautiful interactive presentation
- 🎬 **A terminal video recorder** — export any bash/Python/Node script to MP4 using native Rust-speed canvas rendering
- 🌐 **A headless browser automation engine** — record real UI flows with Puppeteer, embedded directly into your slides
- 📦 **A slide deck exporter** — export your entire Markdown presentation to a standalone video file

---

### 🌐 [Official Documentation Site](https://slides-tape.chanansystems.co.ke)

For the full guide on directives, CLI options, and advanced rendering, visit the official site.

---

## 📦 Installation

```bash
# Install globally
npm install -g slides-tape

# Or run without installation
npx slides-tape serve talk.md
```

> **Requires Node.js 18+** and `ffmpeg` (system install or auto-bundled via `@ffmpeg-installer/ffmpeg`)

---

## 🚀 Quick Start

```bash
# 1. Serve your slides live in the browser
slides-tape serve my-talk.md

# 2. Record a terminal script to MP4
slides-tape run deploy.sh -o deploy.mp4

# 3. Export entire slide deck to video
slides-tape export my-talk.md -o talk.mp4

# 4. Run a standalone web UI demo
slides-tape web demo.md

# 5. Export a web demo to video
slides-tape web demo.md -o ui-tour.mp4
```

---

## 📝 Markdown Structure

Separate slides with `---`. Embed run blocks directly in slides:

````markdown
# 🚀 Deploying to Production

```bash run
echo "Building image..."
docker build -t myapp:latest .
echo "Done!"
```

---

# 🌐 Live UI Demo

```web run
# @goto http://localhost:3000/login
# @type input[name="email"] "admin@example.com"
# @type input[name="password"] "password"
# @click button[type="submit"]
# @wait 2s
```
````

---

## 🛠️ CLI Reference

### `serve <file.md>`

Start a live interactive presentation viewer.

```bash
slides-tape serve talk.md --port 8080 -d 6
```

| Option                      | Description        | Default                        |
| --------------------------- | ------------------ | ------------------------------ | --- |
| `--port <n>`                | HTTP port          | `3000`                         |
| `-d, --autoplay-duration <s | ms>`               | Wait time per slide in seconds | `4` |
| `--no-open`                 | Don't open browser | —                              |

---

### `run <script.sh>`

Record a shell script to MP4 using the native canvas renderer.

```bash
slides-tape run demo.sh -o demo.mp4 --speed 1.5 --font-size 16
```

| Option                   | Description                       | Default            |
| ------------------------ | --------------------------------- | ------------------ |
| `-o, --output <path>`    | Output file                       | `<script>.mp4`     |
| `-r, --resolution <WxH>` | Video resolution                  | `1920x1080`        |
| `-f, --fps <fps>`        | Framerate                         | `30`               |
| `--format <fmt>`         | `mp4` \| `webm`                   | `mp4`              |
| `--speed <n>`            | Playback speed multiplier         | `1`                |
| `--cols / --rows <n>`    | Terminal dimensions               | `120x30`           |
| `--ps1 <string>`         | Shell prompt                      | `"$ "`             |
| `--font-size <px>`       | Font size (pixels)                | `14`               |
| `--font-family <name>`   | Font family name                  | `"JetBrains Mono"` |
| `--load-events <path>`   | Re-render from a saved `.tre` log | —                  |
| `--skip-idle <ms>`       | Cap idle gaps longer than ms      | off                |
| `--highlight-cmds`       | Flash command starts              | off                |
| `--no-save-events`       | Disable auto-save of `.tre`       | —                  |
| `--keep-frames`          | Keep raw PNG frames               | —                  |

---

### `web <demo.md>`

Execute all `web run` blocks from a Markdown file.

```bash
# Watch automation live in Chromium
slides-tape web demo.md

# Export headlessly to MP4
slides-tape web demo.md -o ui-tour.mp4 --resolution 1280x720
```

| Option                   | Description      | Default     |
| ------------------------ | ---------------- | ----------- |
| `-o, --output <path>`    | Target MP4 path  | —           |
| `-r, --resolution <WxH>` | Video resolution | `1920x1080` |
| `-f, --fps <fps>`        | Framerate        | `30`        |

---

### `export <file.md>`

Export your entire slide deck to MP4/WebM.

```bash
# Export with custom transitions
slides-tape export talk.md -o talk.mp4 --transition-type zoom -t 800
```

| Option                   | Description                  | Default             |
| ------------------------ | ---------------------------- | ------------------- | --- |
| `-o, --output <path>`    | Output file                  | `<md>.mp4`          |
| `-r, --resolution <WxH>` | Video resolution             | `1920x1080`         |
| `-d, --duration <s       | ms>`                         | Wait time per slide | `4` |
| `-t, --transition <ms>`  | Crossfade duration           | `500`               |
| `--transition-type <n>`  | fade \| zoom \| wiperight... | `fade`              |
| `-f, --fps <fps>`        | Framerate                    | `30`                |
| `--format <fmt>`         | `mp4` \| `webm`              | `mp4`               |
| `--no-run`               | Skip all `run` blocks        | —                   |
| `--screenshot`           | Save PNG of every slide      | —                   |
| `--keep-frames`          | Keep raw PNG frames          | —                   |

---

## 🌐 Web Automation Directives

Inside `web run` blocks (in slides or standalone `.md` files):

```bash
# @goto <url>                    Navigate to a URL
# @wait <time>                   Wait (e.g. 2s, 500ms)
# @click <css-selector>          Click an element
# @type <css-selector> "text"    Type text into an input
```

**Selector examples:**

```bash
# @click button[type="submit"]
# @click table > tbody > tr:nth-child(1) > td:last-child > button
# @type input[name="email"] "admin@example.com"
# @type form p-button:nth-child(2) > input "search query"
```

---

## ⚡ .tre Event Logs

Every `slides-tape run` saves a `.tre` (Terminal Recording Event) file. Re-render instantly without re-running:

```bash
# First run — saves deploy.tre alongside deploy.mp4
slides-tape run deploy.sh

# Re-render instantly with new settings (no network calls, no waiting)
slides-tape run deploy.sh --load-events deploy.tre --speed 3 --font-size 20
```

See the [Terminal Event Log Guide](https://slides-tape.chanansystems.co.ke/docs.html#tre-events) for full technical documentation on Phase 2 rendering.

---

## 🎭 Presenter Features

**Speaker Notes** (visible only in presenter view, not exported):

```markdown
> Note: Emphasize that this runs at 10k req/s per node!
```

**Custom Slide Duration** (override global autoplay for one slide):

```markdown
<!-- duration: 12s -->
```

---

## 📚 Further Reading

- [Web Automation Guide](https://slides-tape.chanansystems.co.ke/docs.html#web-automation)
- [Terminal Event Log (.tre) Guide](https://slides-tape.chanansystems.co.ke/docs.html#tre-events)
- [Examples Showcase](https://slides-tape.chanansystems.co.ke/docs.html#examples)

---

## 📄 License

[CC-BY-NC-4.0](https://slides-tape.chanansystems.co.ke/docs.html#license) © Alex Muturi J.
