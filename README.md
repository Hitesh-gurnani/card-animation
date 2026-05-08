# Card Stack Animation

> A swipeable stack of event cards with two display modes — built with React, `react-spring`, and `react-use-gesture`.

---

## Overview

| Mode          | Description                                               |
| ------------- | --------------------------------------------------------- |
| **Card mode** | One centred card with two peeking behind to signal depth. |
| **List mode** | The last entry opens as a vertical list of compact rows.  |

Horizontal swipes (or click-and-drag) move between modes. Page-dot indicators reflect the current position — a **circle** marks card mode, a **diamond** marks list mode.

---

## Getting Started

```bash
cd card-animation
npm install
npm run dev
```

Then open the dev server URL printed in your terminal.

---

## Approach

- **One spring per card**, driving `x`, `scale`, `opacity`, and shadow.
- **Drag is classified each frame** (`next` / `prev` / `edge`) and a small pipeline of functions picks the right spring target.
- **Top card follows the finger**; the card behind it interpolates forward in sync to take its place.
- **Commit happens at 40%** of card width. Under threshold, springs return home.
- **Edges rubber-band** with `pow(x, 0.7)` for a natural resist feel.
- **List mode** is just a data entry with `type: "list"`. Rows fade in via CSS with a tiny stagger.
- **Page dots update on commit**, not mid-drag — diamond = list, circle = card.
- **`prefers-reduced-motion`** swaps slides for a 120ms cross-fade.

---

## Trade-offs

- **`react-spring` instead of Reanimated** — built web-first for Mobile Safari. Logic ports cleanly to Reanimated if needed.
- **Springs over tweens** — interrupt naturally, so rapid swipes feel responsive. Timing isn't a pixel-match to the reference.
- **Index-driven state** — dots and data commit at index change, not mid-drag. Simpler, and matches the reference.
- **SCSS keyframes for list entry** — fast to write, but doesn't interrupt as gracefully as a spring would.

---

## What I'd Change With More Time

- Port core logic to **Reanimated 3** for true React Native support.
- Add **velocity-aware commit** — a fast flick under 40% should still advance.
- Replace the list-entry CSS animation with **springs**, so backward swipes mid-entry feel tight.
- Make **peek count and offsets derive from container width** on resize.
- Drop **Ramda** (only used once) and lift constants into props for tunability.
