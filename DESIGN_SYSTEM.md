# Embassy Website Design System

Guidelines for building the Brazil–Canada embassy website as a set of separate pages. The current `index.html` is the visual reference. New pages should feel like parts of one official, contemporary site rather than independent designs.

## Visual direction

- Aim for a calm, confident diplomatic presence: modern editorial typography, clear information, generous spacing and restrained motion.
- Bring Brazilian warmth and Canadian clarity together through deep greens, sunny yellows, a small tropical accent palette and quiet warm neutrals.
- Prefer clear layouts and useful visual hierarchy over decoration. Avoid flag-pattern backgrounds, excessive gradients, novelty effects and dense blocks of copy.

## Color system

Use this approximate balance across intentional brand-color areas on a page:

| Share | Role | Suggested colors |
| --- | --- | --- |
| 70% green | Primary identity, major feature areas, headings, buttons, navigation emphasis and data visualization | Deep forest `#142C29`, Brazilian green `#08785C`, supporting green `#13845E` |
| 25% yellow | Warm secondary surfaces, callouts, section markers, selected states, chart series and small decorative details | Sun yellow `#E8C547`, warm gold `#E8B64D`, pale yellow `#F1DC85` |
| 5% other vivid tropical colors | Rare, high-contrast highlights such as a status dot, small icon or one chart category | Coral `#CF5146`; optional ocean blue `#398DB4` |

These percentages describe the distribution of the site's **brand colors**, not a requirement to fill every pixel. Keep reading surfaces light and quiet: warm paper `#F5F4EF`, soft green `#E9EEE5`, white `#FFFEFA`. Use neutral surfaces as breathing room, while making green and yellow clearly more prominent than in the initial prototype. Do not let coral or blue compete with the green and yellow identity.

### Color use

- Use deep green for body text on light backgrounds and dark green for full-width feature sections.
- Use Brazilian green for primary buttons, links, section labels and selected navigation states.
- Use yellow for secondary emphasis and highlights. Keep text on yellow dark green or near-black for contrast.
- Reserve coral and blue for small accents; do not use them for large page backgrounds or primary actions.
- Keep borders subtle (`#DCE1D8`) and shadows soft. Avoid using color alone to communicate status.

## Typography

- Use **Manrope** for display headings, page titles, card titles and prominent figures.
- Use **DM Sans** for body copy, labels, navigation, metadata and controls.
- Keep headings compact and editorial, with clear size steps. Large page titles should scale down on small screens without clipping.
- Body text should remain comfortable to read, typically 14–16 px on desktop and no smaller than 12 px on mobile for core content.
- Use uppercase sparingly for short labels and navigation. Add letter spacing to small labels, not paragraphs.
- If web fonts are unavailable, fall back to a clean sans-serif stack.

## Shared header and navigation

Every page must use the same header structure and behavior as the existing header in `index.html`:

1. A thin Brazil-inspired green–yellow–coral rule at the very top.
2. A left-aligned brand link with the circular green mark and two-line wordmark.
3. A central navigation row containing links to the site's pages.
4. Right-aligned account actions: login or profile control, followed by the language selector.

### Header rules

- Keep the header sticky at the top, with a translucent warm-paper background, subtle blur and a fine bottom border.
- Use the existing desktop proportions: about 78 px tall, with the brand at left, page links centered and account/language controls at right.
- Keep the brand mark, wordmark, link style, spacing and control shapes consistent on every page.
- Show the current page with a clear green active state (for example, a short underline or a stronger text color). Keep hover and keyboard-focus states visible.
- Reuse the same localized page names and the same language order on every page: French by default, then English and Portuguese.
- Keep login/profile and language controls in the same order and location. A signed-in state should look identical throughout the site.
- At tablet widths, reduce navigation gaps before changing the structure. At mobile widths, use a compact header and provide a menu control for page links instead of silently dropping navigation. Keep account and language controls reachable.
- Use one shared header component or a copied, maintained template so updates to the brand, navigation and account controls stay synchronized across separate HTML pages.

## Layout and spacing

- Center content in a responsive container with a maximum width near 1180 px.
- On desktop, use approximately 24 px outer gutters; on mobile, use 17–20 px gutters.
- Give major sections generous vertical spacing (roughly 76–108 px on desktop, 56–76 px on mobile).
- Use a consistent spacing rhythm based on 4, 8, 12, 16, 24 and 32 px increments.
- Align section headings, grids and cards to the same content edges.
- Prefer asymmetrical editorial layouts for feature content, then use orderly grids for facts and service choices.
- Use square or lightly rounded corners. Avoid overly pill-shaped cards; reserve rounded pills for compact controls or tags.

## Page structure and reusable components

- Start each page with a short section label and a clear page title. Add a concise introduction when needed.
- Reuse the same section-heading pattern: small uppercase kicker, large Manrope heading and optional short explanatory note.
- Use white or pale-green cards for grouped information, with consistent padding and fine borders or soft shadows.
- Use deep-green panels for prominent service or contact areas. Add yellow details for emphasis.
- Buttons should have a clear hierarchy: solid green for the primary action, light or outlined for secondary actions, and text links for low-priority actions.
- Dialogs and profile/service screens should use the same paper, green, yellow and typography tokens as the main pages.
- Keep chart colors consistent and label charts directly. Include values or a legend so the information is understandable without color alone.

## Imagery and graphic details

- Prefer original, restrained illustrations, maps, geometric motifs and real contextual photography over generic decorative stock imagery.
- Use Brazilian and Canadian references subtly: tropical foliage, landscape contours, map lines, civic architecture or a restrained two-country color cue.
- Keep imagery secondary to the information and use consistent image treatment across pages.
- Use coral or ocean blue only for a few small details, not as a second competing identity.

## Interaction and accessibility

- Use smooth transitions for hover, opening panels and active states; keep animations short and purposeful.
- Respect `prefers-reduced-motion` and provide a non-animated way to reach the same content.
- Ensure all controls work by keyboard, have visible focus states and have accessible names.
- Maintain readable contrast, especially for small labels and text over colored surfaces.
- Make interactive targets comfortable to tap on mobile and do not rely on hover alone.
- Keep dialogs dismissible by an explicit close control and Escape key, and return focus to the control that opened them.

## Language and content

- French is the default language. Provide English and Portuguese versions for all navigation, labels, forms, notices and page content.
- Keep navigation position and page structure consistent when language changes; allow text to wrap without breaking the layout.
- Use plain, respectful language appropriate for an official public-facing service.
- Identify demonstration-only content clearly. Do not present fabricated contact details, services or official titles as real.

## Responsive behavior

- Design from the shared desktop grid, then simplify columns for tablet and mobile without changing the visual identity.
- Collapse multi-column facts and team layouts into one or two readable columns as the viewport narrows.
- Keep headings, modal content, charts and navigation from overflowing horizontally.
- Preserve access to every page and action on mobile, including the language selector and account controls.

## Implementation tokens

Use these shared CSS custom properties as the starting point for each page:

```css
:root {
  --ink: #142c29;
  --green: #08785c;
  --green-bright: #13845e;
  --yellow: #e8c547;
  --gold: #e8b64d;
  --yellow-pale: #f1dc85;
  --coral: #cf5146;
  --blue-accent: #398db4;
  --paper: #f5f4ef;
  --surface: #fffefa;
  --surface-green: #e9eee5;
  --muted: #6f7e78;
  --line: #dce1d8;
}
```

When a new page is added, update the shared navigation links in every page and verify the French, English and Portuguese labels remain consistent.
