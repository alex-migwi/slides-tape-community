# 💾 Terminal Recording Events (.tre)

`.tre` files are essentially the "magic" underlying `slides-tape`'s incredibly fast terminal video processing framework. They contain a frozen serialization of every single ANSI byte sequence your standard output emitted mapped linearly to millisecond time deltas. 

Whenever you run a terminal command like `node index.js run my-script.sh`, `slides-tape` fundamentally splits the workflow into **two completely separate/isolated phases**:

1. **Phase 1 (The Execution):** It boots up a physical native Unix PTY (pseudo-terminal) and genuinely executes your bash layout in the background. As the shell naturally spits out data, `slides-tape` intercepts the raw ANSI terminal bytes and records them line-by-line alongside local timestamp deltas. It then seamlessly saves this giant JSON array directly down to your hard drive inside a `.tre` file!
2. **Phase 2 (The Canvas Draw):** It later iterates over that `.tre` JSON log dynamically and pushes it statically through the natively isolated `@napi-rs/canvas` engine to compile the actual synthetic PNG images mapped dynamically to FFmpeg!

---

## ⚡ Why are .tre files so powerful?

Because **you can deliberately skip Phase 1 entirely** once you possess a `.tre` log!

Imagine you are rendering a bash script that naturally clones a Git repository, runs `npm install`, and coordinates heavy docker containers physically on your system. Physically evaluating that script takes **5 solid minutes** of real-world networking execution latency.

If you rendered an output, but suddenly realized the Font Size was too small, the Terminal width was natively too wide, or the playback pacing was naturally sluggish—you absolutely **do not** want to sit there waiting another 5 minutes for `npm install` to download physical internet packages again just to adjust a CSS font variable!

## 🚀 How to violently optimize rendering:

Whenever you execute a script natively, the engine inherently creates an identically named `.tre` log right beside the video.

To entirely bypass the physical Unix evaluation and perfectly generate a brand new video using the EXACT previously recorded native Unix session, simply inject the `--load-events` parameter dynamically:

```bash
node index.js run deploy.sh --load-events deploy.tre --speed 3.0 --font-size 22 --cols 140
```

Because `slides-tape` detects the payload override, it will forcefully abort booting `node-pty`, radically skip evaluating your actual terminal dependencies natively, and physically push the frozen time-crystal of your terminal session instantly past the Canvas compiler. 

**What previously took 5 minutes to simulate will perfectly render out into a beautifully adjusted MP4 instantaneously in 2–3 seconds!**

---

### Saving Event States Natively:

If you don't necessarily want `slides-tape` to auto-name the file implicitly for you based on the source structure, you can rigidly force a direct dump by providing the explicit `--save-events` parameter hook:

```bash
node index.js run deploy.sh --save-events my-custom-log.tre
```
