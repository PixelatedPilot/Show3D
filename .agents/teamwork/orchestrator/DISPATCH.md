## 2026-11-06T09:46:32Z

Replicate and adapt the "Romer" Executive Reports and High-Density Executive Landing Page design language across the existing website codebase (/Users/josephsukatendel/Documents/antigravity/sharp-curie) to deliver a polished UI for client presentation.

Working directory: /Users/josephsukatendel/Documents/antigravity/sharp-curie
Integrity mode: development

Reference material: /Users/josephsukatendel/.gemini/antigravity/brain/8a020730-b719-4c40-b9ac-361aeae13130/romer_design_adaptation_plan.md

## Requirements

### R1. Design Tokens and Global Styling Foundation
Implement the Romer design tokens across `index.html`, `tailwind.config.js`, and `src/index.css`. This includes loading Google Fonts (Manrope 520w for display headings, Inter for body and controls, Material Symbols Outlined), dark theme tokens (obsidian background `#070708` / `#131314`, surface containers, hairlines `#232426`, primary accent `#bec2ff` / `#5E6BFF`, secondary accent `#50d8e9`, tertiary/warning `#ffb689`, text ink `#e5e2e3` / `#9A9DA3`), tight corner radii (DEFAULT 2px, lg 4px, xl 8px), and ambient surface textures (`.dot-pattern`, technical 60px/80px grid, top shimmer line, and corner target reticles) while preserving existing styling aliases.

### R2. Global Navigation Shell
Adapt `src/components/layout/AppleTopNav.tsx` and `src/App.tsx` into a 48px Romer executive top bar featuring the geometric monogram and SHOW3D wordmark, clean horizontal mode/view tabs with active bottom indicator lines, module quick-select segmented bar (`M01`–`M06`), and the Canvas trigger.

### R3. Student Keynote Deck Analytical Layout
Adapt `src/components/student/StudentKeynoteDeck.tsx` into Romer's 3-pane executive reports/dashboard layout: a left sidebar with module stages and status dots, a center document/stage viewport with document toolbar, shimmer highlight, 60px grid wireframe preview, formative check cards, and digital competency scorecard, and a right configuration/telemetry panel with PARTS prompt recipe tokens, curvature/reflectivity levers, and solar array toggle.

### R4. Facilitator Hub Command Center and Procurement Document View
Transform `src/components/facilitator/FacilitatorHub.tsx` and `src/components/teacher/TeacherDashboardView.tsx` into an executive command center: Tab 1 featuring live class monitoring with telemetry streams, student roster cards with status badges and an intervention inspector drawer; Tab 2 featuring the GeBIZ curriculum and procurement document preview (`REP-GEBIZ-2026.pdf`) with telemetry cards and MOE rubric tables.

### R5. High-Density Executive Landing View
Restructure `src/components/landing/LandingView.tsx` into a 10-section high-density executive landing page featuring a fixed 80px header, hero section with multi-pane technical chart mockup, 3 product principle schematic cards (FIG 0.1/0.2/0.3), signal intelligence section, decision command center, 4-column connected node insights timeline, editorial quote cards in high-contrast cyan (`#D1EBEB`) and lime (`#C4FF44`), closing call-to-action, and footer.

### R6. Global Modals Styling
Update the global modals in `src/components/layout/` (`Show3DCanvasModal`, `CertificateModal`, `SchoolProcurementModal`, `StudentSafetyModal`, `PedagogyFrameworkModal`) to follow Romer's document and configuration panel aesthetic, with `CertificateModal` styled as an executive audit document (`REP-WOR-2023-W42.pdf`).

## Verification Resources
- Build and test pipeline (`npm test && npx tsc -b && npm run build`)

## Acceptance Criteria

### Verification
- [ ] Single consolidated check passes: `npm test && npx tsc -b && npm run build` (all 76 tests pass with 0 errors) and the UI views (top bar, student deck, facilitator hub, landing page, modals) visually conform to the Romer executive design language for client presentation.


## 2026-11-06T10:02:01Z

PRIORITY DIRECTIVE from User via Sentinel:
"Skip any checks and just do one final audit at the end, I want implementation now".

Instructions:
1. Skip all intermediate reviews, reviewer passes, challenger passes, and sub-milestone gate checks.
2. Proceed immediately with direct, fast, parallel implementation across all milestones (M1: Tokens/CSS, M2: Nav/Landing, M3: Student Deck, M4: Facilitator Hub & Modals).
3. Reserve only the single final consolidated check (`npm test && npx tsc -b && npm run build`) at the very end when all components are adapted.
4. Execute fast and notify when complete.
