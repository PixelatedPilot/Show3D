# Milestone 1 Exploration Report: `index.html`, Typography & Global Root Styling

**Author**: `teamwork_explorer_m1_1`  
**Date**: 2026-11-06  
**Target File**: `/Users/josephsukatendel/Documents/antigravity/sharp-curie/index.html`  
**Scope**: Fonts (Manrope 520w, Inter, Material Symbols Outlined), root `<body>` classes, meta tags, favicon, and presentation readiness.

---

## 1. Executive Summary

Transitioning Show3D from Apple HIG / Spline Iridescent Glass to the **Romer Instrument-Grade Executive Design System** begins at the root entry document: `index.html`. 

Our investigation confirms:
1. **Fonts Currently Loaded**: Only Google Font `Inter` (`wght@400;500;600;700`) is currently loaded in `index.html`. `Manrope` and `Material Symbols Outlined` are completely absent.
2. **Manrope 520 Support**: Google Fonts v2 API **natively supports** `Manrope:wght@400;520;600;700`. Live curl tests verify that Google Fonts returns an explicit `@font-face` declaration for `font-weight: 520` pointing to the variable font woff2 file. Modern browsers support arbitrary variable font weights via standard `font-weight: 520` or `font-variation-settings: 'wght' 520`, with seamless fallback to `500`/`600` in older rendering engines.
3. **Material Symbols Outlined**: Currently missing. It should be imported with variable axes (`opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`) in a separate `<link>` tag without `display=swap` to eliminate Flash of Unstyled Content (FOUC) where icon ligature text flashes before the glyphs load.
4. **Body Classes**: Currently `<body class="bg-[#09090b] text-[#fafafa] antialiased overflow-hidden select-none font-sans">`. It should be updated to `class="bg-[#131314] text-[#e5e2e3] antialiased selection:bg-[#5E6BFF] selection:text-white"`. Crucially, removing `select-none` from `<body>` allows Romer's signature `selection:bg-[#5E6BFF]` to function for text inspection, while interactive canvas views manage `select-none` locally.
5. **Favicon & Meta Tags**: The current favicon uses Apple system blue (`fill='%230A84FF'`). We recommend updating it to Romer obsidian (`#131314`) with a `#5E6BFF` stroke ring and `#E5E2E3` 3D monogram. We also recommend adding `<meta name="theme-color" content="#131314" />` and `<meta name="color-scheme" content="dark" />` to synchronize browser chrome and OS controls with the Romer aesthetic.

---

## 2. Current State Inspection of `index.html`

Line-by-line inspection of the 17-line `index.html`:

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%230A84FF'/><text x='50' y='65' font-size='45' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>3D</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>Show3D · AI Creator Programme for Secondary Schools</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#09090b] text-[#fafafa] antialiased overflow-hidden select-none font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Deficiencies Identified:
| Area | Current State | Romer Requirement | Defect / Impact |
|---|---|---|---|
| **Display Font** | Missing | `Manrope` (weights 400, 520, 600, 700) | Executive headlines currently fall back to Apple system fonts (`-apple-system` / `SF Pro Display`) |
| **Body Font** | `Inter` 400–700 loaded | `Inter` 400, 500, 600, 700 | Retain Inter, but combine efficiently with Manrope |
| **Icon Font** | Missing (components import Lucide) | `Material Symbols Outlined` | Cannot render Romer Material-3 iconography or symbols if used |
| **Body Background** | `bg-[#09090b]` (zinc-950) | `bg-[#131314]` (Romer obsidian app surface) | Background hue mismatch with Romer `#131314` specifications |
| **Body Text** | `text-[#fafafa]` (zinc-50) | `text-[#e5e2e3]` (Romer on-surface ink) | Overly harsh pure white contrast instead of clinical off-white |
| **Selection Highlight**| Missing | `selection:bg-[#5E6BFF] selection:text-white` | Default browser selection blue used instead of Romer primary accent |
| **User Selection** | `select-none` on `<body>` | Selective selection enabled | Root `select-none` prevents user from seeing selection highlight anywhere |
| **Theme Color Meta** | Missing | `<meta name="theme-color" content="#131314" />` | Browser address bars (Safari iOS/macOS) render default/white chrome |
| **Color Scheme Meta**| Missing | `<meta name="color-scheme" content="dark" />` | Native scrollbars and system inputs do not auto-theme to dark mode |
| **Favicon** | Apple Blue `#0A84FF` circle | Obsidian `#131314` + `#5E6BFF` stroke | Visual artifact from previous Apple HIG theme |

---

## 3. Font Import Investigation & Variable Weight 520 Support

### 3.1 Verification of Manrope 520 via Google Fonts v2 API

The Romer executive typography system uses `Manrope` at weight `520` for all display headlines (`hero-headline: 76px`, `h1: 48px`, `h2: 32px`, `h3: 24px`, `h4: 18px`).

We performed live HTTP tests against the Google Fonts CSS2 endpoint:
```bash
curl -s -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Manrope:wght@400;520;600;700&family=Inter:wght@400;500;600;700&display=swap"
```

**Results**:
- The endpoint returns **HTTP 200 OK**.
- Google Fonts generates explicit `@font-face` rules for `font-weight: 520`:
  ```css
  /* latin */
  @font-face {
    font-family: 'Manrope';
    font-style: normal;
    font-weight: 520;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
    unicode-range: U+0000-00FF, ...;
  }
  ```
- All weights (400, 520, 600, 700) point to the exact same variable font file (`xn7gYHE41ni1AdIRggexSvfedN4.woff2`), meaning **zero extra network payload** is incurred by requesting 520.

### 3.2 Browser Support & Fallback Mechanism for Weight 520
1. **Direct CSS Declaration**: Modern browsers (Chrome 62+, Safari 11+, Firefox 62+, Edge 79+) fully implement CSS Fonts Module Level 4, which permits any numeric value between 1 and 1000 for `font-weight`. When `font-weight: 520` is declared, the browser applies the variable font weight directly.
2. **Explicit Variable Setting (`font-variation-settings`)**:
   To guarantee that any rendering environment (including older webviews or headless tools) renders exact 520 weight:
   ```css
   font-family: 'Manrope', sans-serif;
   font-weight: 520;
   font-variation-settings: 'wght' 520;
   ```
3. **CSS Standard Fallback Behavior**:
   If a rendering engine rounds or clamps non-100-step weights, standard CSS font matching falls back to `500` (Medium) or `600` (SemiBold), preserving readable proportions without layout shifts.

### 3.3 Inter Font Weights
For body text, labels, and UI controls, `Inter` requires weights `400` (regular), `500` (medium), `600` (semi-bold), and optionally `700` (bold). Both `wght@400;500;600` and `wght@400;500;600;700` are served from the same variable font woff2 asset. Including `700` guarantees backwards compatibility with existing UI components that use Tailwind `font-bold`.

---

## 4. Icon Set Loading: Material Symbols Outlined

### 4.1 Specification & Configuration
Romer design specifications specify `Material Symbols Outlined`.
Google Fonts provides Material Symbols as a variable font with axes:
- `opsz`: Optical size (`20..48`)
- `wght`: Weight (`100..700`)
- `FILL`: Fill (`0..1`)
- `GRAD`: Grade (`-50..200`)

Target URL:
```
https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200
```

### 4.2 Critical Anti-FOUC Pattern (Why Separate `<link>` is Recommended)
In Google Fonts, passing `&display=swap` to an icon ligature font can cause **Flash of Unstyled Content (FOUC)**: while the font is downloading, the browser displays raw icon names as plain text (e.g., `"arrow_forward"`, `"close"`, `"check_circle"`).

**Best Practice Recommendation**:
- Load text fonts (`Inter`, `Manrope`) with `&display=swap` so text content renders immediately.
- Load `Material Symbols Outlined` in a separate `<link>` without `display=swap` (or with `display=block`). This ensures icons only render when the glyph font is ready, avoiding jarring text blips during client presentation.

```html
<!-- Typography (Fast swap for text readability) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;520;600;700&display=swap" rel="stylesheet">

<!-- Iconography (No display=swap to prevent ligature text flashing) -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

*(Note: If a single combined HTTP request is strictly desired, the combined URL is also valid: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;520;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap`.)*

---

## 5. Root Body Classes & Text Selection

### 5.1 Comparison of Body Classes
| Element | Existing Class List | Proposed Class List | Purpose |
|---|---|---|---|
| Background | `bg-[#09090b]` | `bg-[#131314]` | Matches Romer surface obsidian (`#131314`) |
| Text Color | `text-[#fafafa]` | `text-[#e5e2e3]` | Matches Romer on-surface ink (`#e5e2e3`) |
| Smoothing | `antialiased` | `antialiased` | Subpixel font rendering |
| Selection Bg | *(none)* | `selection:bg-[#5E6BFF]` | Romer primary accent indigo |
| Selection Text | *(none)* | `selection:text-white` | Crisp white selection text |
| User Select | `select-none` | *(removed)* | Allows user selection highlighting; specific components use `select-none` locally |
| Overflow | `overflow-hidden` | *(removed)* | Root container in `App.tsx` already enforces `h-screen w-screen overflow-hidden` |
| Font | `font-sans` | *(removed from body)* | Let semantic classes and `index.css` govern font mapping |

**Recommended `<body>` tag**:
```html
<body class="bg-[#131314] text-[#e5e2e3] antialiased selection:bg-[#5E6BFF] selection:text-white">
```

---

## 6. Meta Tags, Title & Favicon Recommendations

### 6.1 Theme Color & Color Scheme
Adding the following meta tags to `<head>` elevates the executive presentation:
```html
<meta name="theme-color" content="#131314" />
<meta name="color-scheme" content="dark" />
```
- `<meta name="theme-color" content="#131314" />`: Sets browser chrome and mobile address bars to Romer obsidian `#131314`.
- `<meta name="color-scheme" content="dark" />`: Informs browser engines that the application is dark-themed, applying dark defaults to scrollbars and system dialogs.

### 6.2 Favicon Adaptation
The existing inline SVG favicon:
```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%230A84FF'/><text x='50' y='65' font-size='45' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>3D</text></svg>" />
```
Uses Apple system blue (`%230A84FF`).

**Proposed Romer Favicon**:
```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23131314' stroke='%235E6BFF' stroke-width='4'/><text x='50' y='63' font-size='40' text-anchor='middle' fill='%23E5E2E3' font-family='sans-serif' font-weight='700'>3D</text></svg>" />
```
- Background: Obsidian `#131314`
- Border: 4px hairline `#5E6BFF` (Romer primary)
- Text: Crisp off-white `#E5E2E3`

### 6.3 Document Title
```html
<title>Show3D · AI Creator Programme for Secondary Schools</title>
```
Retaining this title is recommended because it matches the Singapore Secondary Schools / MOE curriculum mandate while maintaining professional branding.

---

## 7. Concrete Code Diff for `index.html`

```diff
--- a/index.html
+++ b/index.html
@@ -2,16 +2,19 @@
 <html lang="en" class="dark">
   <head>
     <meta charset="UTF-8" />
-    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%230A84FF'/><text x='50' y='65' font-size='45' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>3D</text></svg>" />
+    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23131314' stroke='%235E6BFF' stroke-width='4'/><text x='50' y='63' font-size='40' text-anchor='middle' fill='%23E5E2E3' font-family='sans-serif' font-weight='700'>3D</text></svg>" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
+    <meta name="theme-color" content="#131314" />
+    <meta name="color-scheme" content="dark" />
     <title>Show3D · AI Creator Programme for Secondary Schools</title>
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
-    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
+    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;520;600;700&display=swap" rel="stylesheet">
+    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
   </head>
-  <body class="bg-[#09090b] text-[#fafafa] antialiased overflow-hidden select-none font-sans">
+  <body class="bg-[#131314] text-[#e5e2e3] antialiased selection:bg-[#5E6BFF] selection:text-white">
     <div id="root"></div>
     <script type="module" src="/src/main.tsx"></script>
   </body>
 </html>
```

### Complete Proposed `index.html`
```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23131314' stroke='%235E6BFF' stroke-width='4'/><text x='50' y='63' font-size='40' text-anchor='middle' fill='%23E5E2E3' font-family='sans-serif' font-weight='700'>3D</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <meta name="theme-color" content="#131314" />
    <meta name="color-scheme" content="dark" />
    <title>Show3D · AI Creator Programme for Secondary Schools</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;520;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  </head>
  <body class="bg-[#131314] text-[#e5e2e3] antialiased selection:bg-[#5E6BFF] selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 8. Downstream Integration Guidance (for Milestone 1 Implementers)

When the implementer applies the `index.html` changes and updates `tailwind.config.js` and `src/index.css`:

1. **`tailwind.config.js`**:
   - Map display font families:
     ```javascript
     fontFamily: {
       sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
       manrope: ['Manrope', 'sans-serif'],
       h1: ['Manrope', 'sans-serif'],
       h2: ['Manrope', 'sans-serif'],
       h3: ['Manrope', 'sans-serif'],
       h4: ['Manrope', 'sans-serif'],
       mono: ['Inter', 'monospace'],
     }
     ```
   - Provide custom font weight utility for `520`:
     ```javascript
     fontWeight: {
       romer: '520',
     }
     ```
2. **`src/index.css`**:
   - Update `body` base CSS:
     ```css
     body {
       margin: 0;
       padding: 0;
       background-color: #131314;
       color: #e5e2e3;
       font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
     }
     ```
   - Add `.font-romer-headline` / `.manrope-520` helper class:
     ```css
     .font-romer-headline {
       font-family: 'Manrope', sans-serif;
       font-weight: 520;
       font-variation-settings: 'wght' 520;
     }
     ```
   - Ensure Material Symbols utility is available if direct HTML elements are used:
     ```css
     .material-symbols-outlined {
       font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
     }
     ```
