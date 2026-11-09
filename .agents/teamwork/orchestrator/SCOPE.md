# Scope: Romer Design Language Adaptation

## Architecture
Transition Show3D from Apple HIG / Spline Iridescent Glass to Romer Instrument-Grade Executive Design System across:
1. Core Design Tokens & Global CSS (`index.html`, `tailwind.config.js`, `src/index.css`)
2. Global Navigation Shell (`src/components/layout/AppleTopNav.tsx`, `src/App.tsx`)
3. Student Keynote Deck Analytical Layout (`src/components/student/StudentKeynoteDeck.tsx`)
4. Facilitator Hub Command Center & Procurement Document View (`src/components/facilitator/FacilitatorHub.tsx`, `src/components/teacher/TeacherDashboardView.tsx`)
5. High-Density Executive Landing View (`src/components/landing/LandingView.tsx`)
6. Global Modals (`src/components/layout/Show3DCanvasModal.tsx`, `CertificateModal.tsx`, `SchoolProcurementModal.tsx`, `StudentSafetyModal.tsx`, `PedagogyFrameworkModal.tsx`)

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | Design Tokens & Global Styling | Fonts (Manrope 520w, Inter, Material Symbols), dark tokens, hairlines (#232426), obsidian (#070708/#131314), tight radii, dot/grid textures | M1 | R1, Reference §1-§2 | DONE |
| 2 | Global Navigation Shell | 48px executive bar, monogram, SHOW3D wordmark, horizontal mode tabs with bottom indicator, M01-M06 segmented bar, Canvas trigger | M2 | R2, Reference §3 Phase 2 | DONE |
| 3 | High-Density Executive Landing | 10-section landing page, fixed 80px header, hero multi-pane technical chart, FIG 0.1/0.2/0.3 cards, signal intelligence, quotes in #D1EBEB/#C4FF44, CTA, footer | M2 | R5, Reference §3 Phase 5 | DONE |
| 4 | Student Keynote Deck Analytical Layout | 3-pane layout, left stages sidebar with status dots, center stage with document toolbar, 60px grid wireframe, formative cards, scorecard, right PARTS tokens/levers panel | M3 | R3, Reference §3 Phase 3 | DONE |
| 5 | Facilitator Command Center & GeBIZ View | Tab 1 live monitoring with telemetry streams, student roster cards with status badges, inspector drawer; Tab 2 GeBIZ PDF document view (REP-GEBIZ-2026.pdf) with rubric tables | M4 | R4, Reference §3 Phase 4 | DONE |
| 6 | Global Modals Styling | Romer document & config panel aesthetic for Show3DCanvasModal, SchoolProcurementModal, StudentSafetyModal, PedagogyFrameworkModal, CertificateModal as REP-WOR-2023-W42.pdf | M4 | R6, Reference §3 Phase 6 | DONE |
| 7 | Full Integration & Verification | Pass npm test (76/76 tests), npx tsc -b, npm run build, full visual review | M5 | Acceptance Criteria | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Design Tokens & Global Styling Foundation | index.html, tailwind.config.js, src/index.css | none | DONE |
| M2 | Global Navigation Shell & Landing Page | AppleTopNav.tsx, App.tsx, LandingView.tsx | M1 | DONE |
| M3 | Student Keynote Deck Analytical Layout | StudentKeynoteDeck.tsx | M1 | DONE |
| M4 | Facilitator Hub & Global Modals | FacilitatorHub.tsx, TeacherDashboardView.tsx, modals | M1 | DONE |
| M5 | Full Integration & Consolidated Verification | App.tsx integration, test suite 76/76, tsc, build, forensic audit | M2, M3, M4 | DONE |

## Interface Contracts
- All 76 tests in tests/ rely on data structures in src/store/appStore.ts, src/data/moduleLessons.ts, src/utils/workflowState.ts. These files' interfaces and exported methods are preserved intact.
- Component prop contracts and state reducers remain fully compatible.
- Styling aliases (e.g. apple.*, spline.*) in tailwind.config.js and src/index.css are preserved to prevent regressions.

## Code Layout
- Foundation (M1): index.html, tailwind.config.js, src/index.css
- Nav & Landing (M2): src/components/layout/AppleTopNav.tsx, src/components/landing/LandingView.tsx
- Student Mode (M3): src/components/student/StudentKeynoteDeck.tsx
- Facilitator Mode & Modals (M4): src/components/facilitator/FacilitatorHub.tsx, src/components/teacher/TeacherDashboardView.tsx, src/components/layout/*Modal.tsx
- Top Shell & Integration (M5): src/App.tsx
