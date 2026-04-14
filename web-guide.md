# 🌐 `slides-tape` Browser Automation Guide

`slides-tape` extends far beyond just compiling standard `bash` terminal commands into MP4 videos. It implements a fully-featured, natively bridged **Puppeteer** engine capable of securely projecting complex web UI interactions directly onto your presentation projector, or physically piping them straight into `ffmpeg` during offline headless exports.

---

## 1. Defining a Web Payload

To tell `slides-tape` you are interacting with a browser instead of the local unix shell, flag the markdown execution block with the `web` identifier.

````markdown
```web run
# @goto https://example.com
```
````

### 2. Available Directives

The `web run` execution engine relies on simplified "Directives" abstracted specifically for presentations. They drastically lower the boilerplate overhead required to orchestrate headless DOM interactions compared to standard raw Puppeteer hooks.

You can prefix these directives using `#` or `//`.

| Directive | Description | Example |
| :--- | :--- | :--- |
| **`@goto <url>`** | Navigates the viewport to the target URL and automatically waits until network connections idle locally before proceeding. | `# @goto http://localhost:8080/app` |
| **`@wait <ms>`** | Hard halts the automation engine temporarily. Essential for letting CSS animation transitions or background layout jitter complete cleanly before the next action. | `# @wait 500ms` or `# @wait 2s` |
| **`@click <selector>`** | Replicates a physical coordinate-mouse click onto the specified CSS payload. | `# @click form > submit.enabled` |
| **`@type <selector> <text>`** | Emulates a real human physically typing characters linearly onto the target input block. The parser perfectly handles advanced CSS selectors containing spaces natively. You can optionally wrap the text payload directly in `"quotes"`. | `# @type table > .row input[type="text"] admin@example.com` |

### Supported CSS Selectors

Because `slides-tape` fundamentally natively bridges to Chromium, **any** standard frontend CSS/query selector is perfectly supported. You are not artificially limited!

#### Selector Examples:
- **ID & Class Strings:** `# @click #login-btn` or `# @type .search-box "query"`
- **Attribute Queries:** `# @type input[name="email"] "admin@test.com"`
- **Relational Depth:** `# @click table > tbody > tr > button`
- **Pseudo-selectors:** `# @click p-tab:nth-child(4)` or `# @click ul > li:last-child`
- **Chained Queries:** `# @click button[title="Edit"]:not([disabled])`

> [!WARNING]
> Ensure you are using formally valid CSS syntax structurally! `tr:nth-child(last)` is intrinsically invalid CSS syntax globally and will immediately crash the engine. You must natively use `:last-child` instead.

---

## 3. Custom Slides Durations

Typically, when running `slides-tape serve`, the "Autoplay" execution loops sequentially using the global baseline interval (e.g., 4 seconds per slide). 

However, live Web Automations often explicitly require *longer* delays naturally to accommodate intense UI navigations, backend fetching, etc.

You can physically override the global auto-advancement duration on a **per-slide basis** using a standard Markdown HTML comment decorator immediately below the `---` page break. This gracefully ensures Autoplay slows down just enough for the complete headless interaction to visually execute across the projector un-severed!

```markdown
---
<!-- duration: 15s -->

# My Lengthy Dashboard Demonstration!
```

---

## 4. Advanced Javascript Sandbox Executions

For complex application mocks requiring logic beyond simple typing or clicking, `slides-tape` intrinsically drops its sandbox. 

If it intercepts *any* line in a `web` block that doesn't definitively map to a primitive `# @` directive, it securely transpiles and natively maps the raw javascript payload over to the underlying browser evaluation engine `page.evaluate()`.

**This allows you to organically orchestrate any physical DOM API instantly!**

````markdown
```web run
# 1. Boot up the framework
# @goto http://localhost:3000

# 2. Fire pure asynchronous javascript organically!
document.querySelector('body').style.backgroundColor = 'red';
document.title = 'Hacked via slides-tape!';
```
````
