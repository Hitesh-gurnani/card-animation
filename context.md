Card Stack Animation
Frontend Animation Assignment
Reference video
https://drive.google.com/file/d/1trXFyEkBFAMRAmy0pQ7SZ4hdWWWNyR6a/view

Context
We want a card-stack carousel for event recommendations on the home feed. The stack lives inside an assistant message bubble — picture the AI surfacing a few events for the user, presented as a deck of cards they can flip through. The reference recording shows the exact behaviour we want to reproduce.
This assignment evaluates animation craft: timing, easing, choreography of multiple elements, and gesture-following. The component itself is small. The motion is what we are hiring for.
Reference video: drive.google.com/file/d/1trXFyEkBFAMRAmy0pQ7SZ4hdWWWNyR6a
What you are building
A horizontally swipeable stack of event cards with two display modes:
Card mode — one large event card centred, with up to two cards peeking from the right edge to signal "more behind."
List mode — when the user reaches a designated index in the stack, the remaining items render as a vertical list of compact rows instead of stacked cards.
The user moves between modes by swiping (or clicking-and-dragging) horizontally. Page-dot indicators below the stack reflect the current position. A diamond-shaped dot marks list mode; circle dots mark card mode.
Key behaviours from the reference

1. Forward swipe — card to card
   From the moment the user starts dragging the top card:
   The top card follows the pointer/finger horizontally. It does not rotate. It does not scale. It just translates with the input.
   The card behind it (currently peeking ~12px from the right edge) animates forward simultaneously: it slides leftward into the centred position and scales up slightly to match the top card’s footprint.
   A third card behind that one slides in from the right to take the new "peek" slot, maintaining the sense of depth.
   Once the top card crosses a threshold (~40% of card width), it commits: it continues off-screen to the right and the new front card snaps into place. If the threshold is not crossed, everything springs back to the original positions.
   The page-dot indicator updates the moment the commit happens, not gradually.
2. Forward swipe — card to list
   When the next item in the stack is configured as the "list view" entry, the swipe animation differs:
   The current top card slides off to the right exactly as in card-to-card.
   Behind it, instead of one card sliding forward, the entire list of remaining items animates in as a stack of horizontal rows. Each row enters from a slight horizontal offset on the right and settles into its row position.
   Rows arrive close to simultaneously, not sequentially staggered. The whole list reads as one unit, not a cascade.
3. Backward swipe — list to card
   Reversing direction restores the previous card:
   The list view slides off to the right as a single unit.
   The previous card slides in from the left and lands in the centred position.
   The peek-card on the right and the indicator dots update at commit time.
   The motion is symmetric to the forward direction — same duration, same easing, mirrored translation.
4. Resting state
   At rest, the front card sits flush against the left padding of the bubble. Two cards peek from behind on the right at small offsets, suggesting depth without competing for attention. There is no idle animation, no shimmer, no auto-advance.

Edge cases to handle
First card: no swipe-back possible. The stack should rubber-band (resist with diminishing returns) if dragged right.
Last card before list: the list mode transition is the "swipe forward" target.
After list mode: there is no further forward state. Rubber-band again.
Rapid repeated swipes: each must feel responsive. Do not queue animations — interrupt the in-flight tween and start the next one from the current position.
Reduced motion: when preferred-reduced-motion is set, replace the slide with a 120ms cross-fade. Still update the dots and content correctly.
Resize / orientation change: recompute card width and peek offsets without re-mounting state.
Tech stack & constraints
Framework: React (web), React Native
Animation library: https://docs.swmansion.com/react-native-reanimated/
Styling: whatever you are fastest in — Tailwind, CSS modules, styled-components.
Data: mock the event data inline. No API calls needed. Use ~5 placeholder cards plus 1 list-mode entry.
Browsers: latest Chrome and Safari. Mobile Safari is the priority — that is where most of our users will see this.
Deliverables
A working component in a GitHub repo.
A short README explaining your approach, the trade-offs you considered, and anything you would change with more time.
A 30–60 second screen recording of the component in action — same orientation as the reference video. This matters; we want to see how it feels at full speed.

What we are looking for
In rough order of importance:
Motion quality. Does it feel like a reference? Does the eye track from one state to the next without confusion?
Gesture handling. Does the drag feel locked to your finger? Does it commit and snap-back convincingly?
Choreography. The peek cards, the indicator dots, the list rows — do they move in concert, or does it feel like separate things happening near each other?
Code quality. Readable, sensibly factored, no premature abstraction. We do not need a full design system — we need a component a teammate can pick up.
Edge case awareness. You do not need to ship every edge case from the list above; you do need to show you noticed them.

Out of scope Theming, dark mode, accessibility beyond reduced-motion, internationalisation, the actual chat bubble around the stack, the search input below, the category icons. Focus on the stack itself.
