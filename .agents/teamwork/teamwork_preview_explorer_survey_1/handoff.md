# Comprehensive Codebase & Infrastructure Survey Report

**Agent**: `teamwork_preview_explorer_survey_1`  
**Role**: Codebase & Infrastructure Explorer  
**Working Directory**: `/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_explorer_survey_1`  
**Parent Orchestrator**: `teamwork_preview_orchestrator_1` (Conversation ID: `3ba8986c-f707-4b62-8a1b-f9d1db7005bd`)  
**Date**: 2026-10-26T02:29:00Z  

---

## 1. Observation

### 1.1 Project Structure & Manifests
- **Workspace Root**: `/Users/josephsukatendel/Documents/antigravity/sharp-curie`
- **Package Manifest (`package.json`)**:
  - `name`: `"show3d-education-prototype"`
  - `type`: `"module"`
  - `dependencies`:
    - `clsx`: `^2.1.1`
    - `lucide-react`: `^1.16.0`
    - `tailwind-merge`: `^3.0.2`
    - `three`: `^0.174.0`
  - `devDependencies`:
    - `@types/three`: `^0.174.0`
    - `@types/react`: `^19.0.10`
    - `@types/react-dom`: `^19.0.4`
    - `@vitejs/plugin-react`: `^4.3.4`
    - `autoprefixer`: `^10.4.20`
    - `postcss`: `^8.5.3`
    - `react`: `^19.0.0`
    - `react-dom`: `^19.0.0`
    - `tailwindcss`: `^3.4.17`
    - `typescript`: `^5.7.3`
    - `vite`: `^6.2.0`
  - `scripts`:
    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "preview": "vite preview"
    }
    ```
- **TypeScript Configuration (`tsconfig.json`)**:
  - Target: `ES2020`, Module: `ESNext`, ModuleResolution: `bundler`, JSX: `react-jsx`, Strict: `true`, SkipLibCheck: `true`. Includes `"src"`.
- **Bundler Configuration (`vite.config.ts`)**:
  - Vite v6.2.0 with `@vitejs/plugin-react`, Dev server configured on port 5173 with `host: true`.
- **Styling Configuration (`tailwind.config.js` & `src/index.css`)**:
  - Extends theme with Apple dark mode palette: `background: #08090c`, `mac.window: #12141A`, `mac.canvas: #08090C`, `mac.surface: #181A22`, `apple.blue: #0A84FF`, `apple.green: #30D158`, `apple.orange: #FF9F0A`.
  - Apple border radii: `apple-sm (10px)`, `apple-md (14px)`, `apple-lg (18px)`, `apple-xl (22px)`, `apple-2xl (28px)`, `apple-pill (9999px)`.
  - Glass utilities: `.apple-glass-card`, `.apple-glass-dock`, `.apple-glass-pill`, `.apple-intelligence-border`.
  - Font stack: SF Pro Display, -apple-system, BlinkMacSystemFont, Inter, sans-serif.

### 1.2 Build & Compilation Test Results
- **TypeScript Compiler Check**:
  - Command: `npx tsc -b`
  - Exit Code: `0`
  - Output: Empty (Zero compilation errors).
- **Vite Production Build Check**:
  - Command: `npm run build` (`tsc -b && vite build`)
  - Exit Code: `0`
  - Output:
    ```
    vite v6.4.3 building for production...
    transforming (1) src/main.tsx...
    transforming (1047) node_modules/lucide-react/dist/esm/icons/image-up.mjs
    ✓ 1907 modules transformed.
    dist/index.html                   1.16 kB │ gzip:   0.66 kB
    dist/assets/index-DHLtJzbf.css   63.00 kB │ gzip:  11.16 kB
    dist/assets/index-DDLgJild.js   455.05 kB │ gzip: 123.35 kB
    ✓ built in 1.57s
    ```

### 1.3 Testing Infrastructure Investigation
- **Test Script & Framework in Repository**:
  - `package.json` contains no `"test"` script.
  - Zero test files exist in `src/` (no `*.test.ts`, `*.test.tsx`, `*.spec.ts`).
  - Neither `vitest` nor `jest` is installed in `node_modules`.
- **Sandbox Network Behavior**:
  - Running `npx vitest` or `npx jest` triggers an npm registry download that fails with:
    `npm error 403 403 Forbidden - GET https://registry.npmjs.org/vitest`
    External package installations from registry.npmjs.org are blocked by sandboxed security policy.
- **Node.js Environment & Native Testing Capabilities**:
  - Node version: `v25.2.1` (`node --version` output: `v25.2.1`).
  - Node v25 includes built-in test runner module `node:test` and assertion library `node:assert`.
  - Test verification executed:
    ```bash
    node -e "const test = require('node:test'); const assert = require('node:assert'); test('native runner works', () => { assert.strictEqual(1 + 1, 2); });"
    ```
    Output:
    ```
    ✔ native runner works (0.551ms)
    ℹ tests 1 pass 1 fail 0
    ```
  - Native TypeScript execution verification:
    ```bash
    node --experimental-strip-types -e "const x: number = 42; console.log('TypeScript stripped:', x);"
    ```
    Output: `TypeScript stripped: 42`.
  - Bundled local binaries in `node_modules/.bin`: `sucrase-node`, `jiti`, `esbuild`, `tsc`, `vite`.

### 1.4 Codebase Inventory & Component Mapping
Inspection of `src/` reveals 55 source files across key directories:

1. **Top-Level Orchestration**:
   - `src/App.tsx`: Currently mounts legacy `SplineNav`, `LandingView`, `ModuleStepFlow`, and `SplineEditorWorkspace`. Retains legacy Spline studio / landing page routing.
   - `src/main.tsx`: Standard React 19 `createRoot(document.getElementById('root')!)`.

2. **Apple HIG Navigation & Presentation**:
   - `src/components/layout/AppleTopNav.tsx` (105 lines): Apple HIG top navigation bar featuring:
     - Apple segmented control: `[ 🎓 Student Mode | 👩‍🏫 Facilitator Mode ]` cleanly switching `activeMode`.
     - Module indicator pill buttons (Modules 1 through 6).
     - Dedicated external CAD engine modal trigger button: `"Try Show3D Canvas"`.
   - `src/components/student/StudentKeynoteDeck.tsx` (588 lines): Distraction-free, full-screen 16:9 presentation deck:
     - Stages 0–2: 3 Visual Concept Slides per module with bold headlines, plain-language text, Key Concept definition card, and speaker-note Pro Tip.
     - Stage 3: Apple Intelligence Co-Design Challenge with PARTS prompt recipe token builder (Tensile Canopy, Modular Benches, 450W Solar, Cross-Ventilation), tactile levers (canopy color swatches, solar toggle), and crisp spatial vector preview card with MOE PLD Port 443 safety pill and `"Try in Show3D Canvas"` modal trigger.
     - Stage 4: Formative Knowledge Check with instant correct/incorrect visual feedback and contextual explanation.
     - Stage 5: Competency Badge summary card with 94% demonstrated human creative intent metric and `"View Verified Certificate"` trigger.
     - Keyboard navigation: Left/Right arrow keys and Spacebar.

3. **Facilitator Mode (Teacher Hub)**:
   - `src/components/teacher/TeacherDashboardView.tsx` (376 lines): Apple macOS/Classroom-inspired control center:
     - Cohort metrics banner: 28 Students (Class 3-Faith · D&T), +34.2% Pre vs Post Growth (61.8% → 96.0%), 1,120 / 5,000 Guaranteed Credit Pool, 10 / 10 Deliverables Ready.
     - Live Class Telemetry table: 28 student roster items with demonstrated competency tags, pre-diagnostic score, post-capstone score, growth delta, and credit usage. Filterable by All, Needs Support, Completed.
     - Curriculum & Rubrics: 10-Hour Syllabus breakdown, MOE "Four Learns" Rubric matrix (`Learn About AI`, `Learn to Use AI`, `Learn With AI`, `Learn Beyond AI`), 10 core programme deliverables pack download.
     - GeBIZ Procurement & Funding: E-Invoicing pilot specifications, School Enrichment Budget / ALP adaptation guidelines, and MOE Opportunity Fund eligibility.

4. **Curriculum & Data Foundations**:
   - `src/data/moduleLessons.ts` (418 lines): Comprehensive educational content for all 6 modules:
     - Module 1: The 3D Dimension (Coordinate space, mesh topology, spatial AI vs 2D diffusion).
     - Module 2: The Prompt Forge (Constraint-based prompting, PARTS framework, mechanical tolerances).
     - Module 3: The 3D Synthesis (Neural latent space, human-in-the-loop co-pilot, 3D hallucination detection).
     - Module 4: The Material Lab (PBR shaders, PLA/PETG/Wood fabrication physics, visual ergonomics).
     - Module 5: Ergonomics & Peer Lab (60° viewing angle, cable strain relief, 3D spatial annotation pins).
     - Module 6: Creator Showcase & Graduation (Authorship & human intentionality, compute sustainability, MOE certification).
   - `src/store/appStore.ts` (680 lines):
     - `LEARNING_MODULES`: 6 modules with code, title, duration, MOE Four Learns domain, summary, key skills, and badges.
     - `MODULE_QUIZZES`: Formative single-question checks with verified answer keys and detailed pedagogical explanations.
     - `STUDENT_ROSTER`: 28 students of Class 3-Faith with pre/post scores, credit usage, demonstrated skills, and status flags.
     - `MOE_RUBRIC_ITEMS`: Standardized criteria aligned with MOE EdTech Masterplan 2030.
     - `PROGRAMME_DELIVERABLES`: 10 core deliverables (Student Workbook, Prompt Guide, Trainer Lesson Plans, Worksheets, Mini Challenges, Capstone, Rubric, Portfolio Record, Teacher Telemetry, Certificate).
     - `STUDENT_SAFETY_SPEC`: Singapore PDPA compliance, Age 13+ school SSO, zero training on student data, automated prompt filter, Port 443 PLD firewall readiness.
     - `SCHOOL_PROCUREMENT_SPEC`: GeBIZ IT & Digital Media quotation readiness, School Enrichment Budgets, ALP alignment, 5,000 class credit pool.

5. **Modals & Support Dialogs**:
   - `src/components/layout/CertificateModal.tsx`: Verifiable MOE Course Certificate featuring student name Ethan Tan (Class 3-Faith), 94% Human Directed score, PARTS prompt documentation, and credential verification ID `SHOW3D-TPSS-2026-0842`.
   - `src/components/layout/Show3DCanvasModal.tsx`: Clean modal trigger with feature breakdown (Full Mesh CAD, Export to GLTF/USDZ, Zero-Install WebGL, Classroom Sync) and external link to launch full Show3D WebGL engine.
   - `src/components/layout/StudentSafetyModal.tsx`: Singapore PDPA & Student Safety architecture governance.
   - `src/components/layout/SchoolProcurementModal.tsx`: GeBIZ purchasing specifications, e-invoicing, and funding route comparisons.
   - `src/components/layout/PedagogyFrameworkModal.tsx`: Seymour Papert's Constructionism & MOE "Design-and-Make" syllabus breakdown.
   - `src/components/canvas/ThreeCanvas.tsx`: Interactive Three.js WebGL scene with OrbitControls, directional lighting, responsive mesh transformations, and 3D spatial annotation pins.

6. **Legacy / Out-of-Scope Components**:
   - `src/components/studio/*` (`SplineEditorWorkspace`, `SplineInspector`, `SplineLeftPanel`, `SplineViewportMock`, `StudioWorkflow`): Complex CAD tools with coordinate matrices and toolbar buttons.
   - `src/components/landing/LandingView.tsx`: Marketing landing page.
   - `src/components/modules/ModuleStepFlow.tsx`: Multi-stage flow with legacy tabs.
   - `src/components/layout/SplineNav.tsx`: Complex navigation bar.

---

## 2. Logic Chain

1. **Assessment of User Requirements**:
   - The authoritative user request (`ORIGINAL_REQUEST.md`) mandates:
     - Strict division into an Apple Keynote-style Student Learning Mode and an Apple Classroom-style Facilitator Mode.
     - Top-bar Apple-style segmented control cleanly switching between `[ 🎓 Student Mode | 👩‍🏫 Facilitator Mode ]` with zero UI leakage between roles.
     - Student Mode delivering an Apple Keynote slide deck with exactly 3 visual concept slides per module, smooth transitions, PARTS token builder, spatial preview card, formative check, and competency badge.
     - Facilitator Mode providing instant dual-tab switching between Live Class Monitoring and Curriculum/GeBIZ Procurement.
     - Elimination of all 3D CAD toolbar clutter, coordinate matrices, and dark hacker aesthetics from the student experience.
     - Full compliance with Singapore secondary school realities (PDPA, Port 443, 5,000 credit pool, GeBIZ transparency, Seymour Papert constructionism, MOE Four Learns).
     - Zero TypeScript errors (`tsc -b`) and a clean production build (`npm run build`).

2. **Analysis of Current Workspace Assets vs. Requirements**:
   - **`AppleTopNav.tsx`** already implements the exact top-bar Apple segmented control required by R1/R4, with instant mode switching (`activeMode: 'student' | 'facilitator'`), module pills (1–6), and "Try Show3D Canvas" modal trigger.
   - **`StudentKeynoteDeck.tsx`** already satisfies R1:
     - 16:9 presentation card container.
     - 3 visual concept slides per module from `MODULE_LESSONS` (18 complete slides).
     - Apple Intelligence PARTS prompt token builder and crisp spatial vector preview card.
     - Formative quiz with instant visual feedback and explanations from `MODULE_QUIZZES`.
     - Digital competency badge card with verified 94% human creative intent metric and certificate modal trigger.
     - Keyboard navigation (ArrowLeft, ArrowRight, Space).
   - **`TeacherDashboardView.tsx`** satisfies R2:
     - 28-student cohort telemetry for Class 3-Faith.
     - +34.2% pre/post growth, 5,000 credit pool status, help flags.
     - 10-Hour Syllabus, MOE Four Learns rubrics, 10 core deliverables, and GeBIZ agreement/procurement guide.
     - Needs a minor layout refinement to ensure the top tab navigation cleanly presents the two primary domains: Tab 1: Live Class Monitoring vs. Tab 2: Curriculum & GeBIZ Procurement.
   - **Current Discrepancy in `App.tsx`**:
     - `App.tsx` currently imports and displays `SplineNav`, `LandingView`, `ModuleStepFlow`, and `SplineEditorWorkspace`.
     - This causes role leakage and exposes complex CAD toolbars and landing page marketing, contrary to R1 and R4.
     - **Conclusion for `App.tsx`**: Rebuilding `App.tsx` to mount `AppleTopNav` at the top and cleanly toggle between `StudentKeynoteDeck` and `TeacherDashboardView` (with the modal triggers for `CertificateModal`, `Show3DCanvasModal`, `StudentSafetyModal`, `SchoolProcurementModal`, and `PedagogyFrameworkModal`) directly achieves complete alignment with `ORIGINAL_REQUEST.md`.

3. **Analysis of Testing Infrastructure**:
   - External package installation is disallowed due to sandbox network policies (npm registry returns 403 Forbidden).
   - However, Node v25.2.1 is available on the machine and includes native `node:test` and `node:assert`.
   - Node v25 supports direct TypeScript execution via `--experimental-strip-types`.
   - A lightweight test suite can be created in a `tests/` directory (e.g. `tests/curriculum.test.ts`, `tests/roster.test.ts`, `tests/build.test.ts`) that runs with `node --test --experimental-strip-types`.
   - Adding a `"test": "node --test --experimental-strip-types 'tests/**/*.test.ts'"` script to `package.json` provides an instant, zero-dependency, offline-ready test runner that verifies all acceptance criteria in milliseconds.

---

## 3. Caveats

1. **Network Sandbox Restriction**:
   - Attempting `npm install vitest` or downloading third-party test runners will fail due to network sandboxing (403 Forbidden). Downstream agents must NOT attempt to run `npm install <package>`. All unit tests must use the native Node.js test runner (`node:test`, `node:assert`, `node --experimental-strip-types`).
2. **WebGL Context in Headless Test Environments**:
   - Running full Three.js WebGL render calls in headless CI/CLI environments can fail without a mock WebGL canvas context. Tests should validate data integrity, curriculum coverage, state transitions, and component compilation rather than full headless WebGL render buffers.
3. **Legacy Files in `src/components/studio/`**:
   - Legacy files in `src/components/studio/` do not cause build errors if unreferenced, but can be safely excluded or left dormant to avoid build regressions. Downstream implementers should verify that `App.tsx` does not import any unused legacy components.

---

## 4. Conclusion & Recommended Action Plan

### 4.1 Architecture Strategy: Adaptation vs. Creation
| Component / Module | Action | Rationale |
|---|---|---|
| `src/App.tsx` | **Refactor / Rebuild** | Replace legacy multi-mode/Spline routing with clean Apple HIG container switching between `StudentKeynoteDeck` and `TeacherDashboardView` via `AppleTopNav`. |
| `src/components/layout/AppleTopNav.tsx` | **Adapt & Wire** | Already built; perfectly provides segmented switch `[ 🎓 Student Mode \| 👩‍🏫 Facilitator Mode ]`, module pills, and "Try Show3D Canvas" trigger. |
| `src/components/student/StudentKeynoteDeck.tsx` | **Adapt & Mount** | Already implements full R1 Keynote deck with 3 visual reading slides, PARTS co-design stage, formative quiz, and badge summary. |
| `src/components/teacher/TeacherDashboardView.tsx` | **Refine & Mount** | Group existing tabs into clean dual-tab switching: Tab 1: Live Class Monitoring (Roster & Skills Delta) and Tab 2: Curriculum & GeBIZ Procurement (Syllabus, Rubrics, 10 Deliverables, GeBIZ Pack). |
| `src/components/layout/*Modal.tsx` | **Adapt & Wire** | Keep `CertificateModal`, `Show3DCanvasModal`, `StudentSafetyModal`, `SchoolProcurementModal`, and `PedagogyFrameworkModal` accessible via header/card actions. |
| `src/data/moduleLessons.ts` & `src/store/appStore.ts` | **Retain & Protect** | Complete, rich curriculum dataset for all 6 modules, 28 students, rubrics, and compliance specs. Zero modifications needed. |
| `tests/` Test Suite | **Create from Scratch** | Add native Node 25 test suite (`tests/curriculum.test.ts`) validating 6 modules, 18 slides, 28 roster students, rubrics, and compliance data with zero external dependencies. |

### 4.2 Step-by-Step Downstream Implementation Blueprint
1. **Update `package.json`**:
   - Add `"test": "node --test --experimental-strip-types 'tests/**/*.test.ts'"` to `scripts`.
2. **Create Test Suite (`tests/curriculum.test.ts`)**:
   - Test that all 6 modules exist in `LEARNING_MODULES`.
   - Test that each of the 6 modules in `MODULE_LESSONS` contains exactly 3 visual concept slides with bold headlines, key concepts, and pro tips.
   - Test that each module has a formative quiz in `MODULE_QUIZZES` with verified correct options and explanations.
   - Test that `STUDENT_ROSTER` contains exactly 28 students with pre/post scores and demonstrated skills.
   - Test that `STUDENT_SAFETY_SPEC` and `SCHOOL_PROCUREMENT_SPEC` meet PDPA, Port 443, 5,000 credit pool, and GeBIZ requirements.
3. **Refactor `src/App.tsx`**:
   - Set default mode to `'student'` with state `activeMode: 'student' | 'facilitator'`.
   - Mount `AppleTopNav` as the sticky top header.
   - Render `StudentKeynoteDeck` when `activeMode === 'student'`.
   - Render `TeacherDashboardView` when `activeMode === 'facilitator'`.
   - Keep support modals (`CertificateModal`, `Show3DCanvasModal`, `StudentSafetyModal`, `SchoolProcurementModal`, `PedagogyFrameworkModal`) wired cleanly.
4. **Refine `TeacherDashboardView.tsx`**:
   - Ensure the primary tab segmented control presents the two main views:
     - `[ 👥 Live Class Monitoring | 📋 Curriculum & GeBIZ Procurement ]`
     - Tab 1 displays the 28-student roster table, growth telemetry, and help flags.
     - Tab 2 displays the 10-hour syllabus, MOE Four Learns rubrics, 10 core deliverables, and GeBIZ quotation pack.
5. **Run Verification**:
   - Run `npx tsc -b` (confirm 0 errors).
   - Run `npm test` (confirm all native tests pass).
   - Run `npm run build` (confirm clean Vite production bundle in `dist/`).

---

## 5. Verification Method

To independently reproduce and verify every finding in this report:

1. **Verify TypeScript Compilation**:
   ```bash
   npx tsc -b
   ```
   *Expected Output*: Exit code `0` with zero error messages.

2. **Verify Production Build**:
   ```bash
   npm run build
   ```
   *Expected Output*: Vite completes build in < 2.0s generating `dist/index.html`, `dist/assets/*.css`, and `dist/assets/*.js`.

3. **Verify Node.js Version & Native Test Runner**:
   ```bash
   node --version
   ```
   *Expected Output*: `v25.2.1` or higher.
   ```bash
   node -e "const test = require('node:test'); const assert = require('node:assert'); test('native runner', () => { assert.strictEqual(true, true); });"
   ```
   *Expected Output*: `✔ native runner (pass 1, fail 0)`.

4. **Verify Component Files Exist**:
   - Inspect `src/components/layout/AppleTopNav.tsx`
   - Inspect `src/components/student/StudentKeynoteDeck.tsx`
   - Inspect `src/components/teacher/TeacherDashboardView.tsx`
   - Inspect `src/data/moduleLessons.ts`
   - Inspect `src/store/appStore.ts`

5. **Invalidation Conditions**:
   - If `npx tsc -b` reports syntax or import errors.
   - If `npm run build` fails to generate the `dist/` bundle.
   - If `AppleTopNav.tsx` or `StudentKeynoteDeck.tsx` are modified in ways that re-introduce Spline CAD toolbars or dark hacker aesthetics.
