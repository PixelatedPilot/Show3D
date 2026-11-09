# Handoff Report — Apple HIG UX/UI & System Architecture Explorer

**Agent**: `teamwork_preview_explorer_survey_3`  
**Role**: Apple HIG UX/UI & System Architecture Explorer  
**Mission**: Map the complete visual, interaction, and system architecture for the Apple HIG-compliant Show3D spatial AI platform.  
**Timestamp**: 2026-10-26T02:25:00Z  

---

## 1. Observation

Direct examination of the workspace (`/Users/josephsukatendel/Documents/antigravity/sharp-curie`) revealed the following concrete architectural facts:

### 1.1 Existing Navigation & Layout Routing
- In `src/App.tsx` (lines 121–180), navigation is routed across 5 disparate legacy modes (`landing`, `teacher`, `hub`, `lesson`, `studio`) controlled by `SplineNav.tsx`:
  ```tsx
  // src/App.tsx:124-132
  <SplineNav
    viewMode={eduState.viewMode}
    onNavigateMode={handleNavigateMode}
    onOpenTeacherHub={() => handleNavigateMode('teacher')}
    onLaunchCanvasModal={() => setIsCanvasModalOpen(true)}
    ...
  />
  ```
- `src/components/layout/AppleTopNav.tsx` already exists (lines 1–105) featuring a clean Apple-style segmented control:
  ```tsx
  // src/components/layout/AppleTopNav.tsx:43-67
  <div className="flex items-center bg-white/[0.06] border border-white/[0.08] p-0.5 rounded-apple-pill shadow-inner">
    <button onClick={() => onSwitchMode('student')} ...>
      <GraduationCap className="..." />
      <span>Student Mode</span>
    </button>
    <button onClick={() => onSwitchMode('facilitator')} ...>
      <Users className="..." />
      <span>Facilitator Mode</span>
    </button>
  </div>
  ```
  However, `AppleTopNav.tsx` is currently **unmounted** in `App.tsx` (0 grep imports across `src/`).

### 1.2 Student Presentation Experience
- `src/components/student/StudentKeynoteDeck.tsx` (lines 1–588) provides a 16:9 Keynote presentation container with:
  - Arrow key & spacebar navigation event listeners (`keydown` handler lines 80–93).
  - 6 slide stages per module: Stage 0–2 (3 concept reading slides), Stage 3 (Co-Design Challenge), Stage 4 (Formative Quiz), Stage 5 (Mastery Badge & Summary).
  - PARTS recipe ingredient chips (Shield, Trees, Sun, Wind tokens lines 40–45).
  - Tactile finish palette and solar toggle (lines 318–353).
  - Spatial SVG vector preview card with Port 443 PLD Safe pill and "Try in Show3D Canvas" modal trigger button (lines 357–407).
  - However, `StudentKeynoteDeck.tsx` is currently **unmounted** in `App.tsx` (0 grep imports across `src/`).

### 1.3 Facilitator Dashboard
- `src/components/teacher/TeacherDashboardView.tsx` (lines 1–376) currently contains 5 tabs:
  `['roster', 'syllabus', 'rubric', 'deliverables', 'agreement']`.
- The user requirements in `ORIGINAL_REQUEST.md` (lines 18–22) strictly mandate a dual-tab Apple Classroom control center:
  - **Tab 1: Live Class Monitoring**: 28-student roster cards (Class 3-Faith) displaying real-time slide location, active co-design status, hand-raise/help flags.
  - **Tab 2: Curriculum & GeBIZ Procurement**: Turnkey MOE D&T rubrics, pre/post gain telemetry, GeBIZ quotation pack generation, School Enrichment Budget guidelines, PDPA safety sheets.

### 1.4 Visual Theme & Materials
- `tailwind.config.js` (lines 8–60) already defines Apple system colors (`apple.blue: '#0A84FF'`, `apple.green: '#30D158'`, `apple.indigo: '#5E5CE6'`, `apple.orange: '#FF9F0A'`), but uses an ultra-dark canvas base (`#08090C`).
- Apple HIG Dark Mode specifications require the standard system dark surface progression:
  - Base canvas: `#1C1C1E` (Apple System Background)
  - Secondary surfaces: `#2C2C2E` (Apple Secondary Background)
  - Tertiary cards: `#3A3A3C` (Apple Tertiary Background)
  - System Blue accent: `#0A84FF`
  - Apple frosted glass blur materials: `backdrop-blur-xl` and `backdrop-blur-2xl`.

---

## 2. Logic Chain

From these observations, we trace the architectural reasoning step-by-step:

1. **Top-Level Partitioning (Observation 1.1)**:
   Because `ORIGINAL_REQUEST.md` requires strict division into Student Learning Mode and Facilitator Management Mode with "zero UI leakage between roles", `App.tsx` must be refactored from the 5 legacy view modes into a clean binary role switch:
   `activeRole: 'student' | 'facilitator'`.
   The unmounted `AppleTopNav.tsx` component represents the exact top-bar control required and must become the primary navigation header in `App.tsx`.

2. **Full-Screen Keynote Stage for Student Mode (Observation 1.2)**:
   In Student Mode, students must experience a distraction-free, 16:9 Keynote slide deck. Mounting `StudentKeynoteDeck.tsx` directly as the student body fulfills R1:
   - Exactly 3 concept reading slides per module (lines 183–238).
   - Interactive Co-Design stage with PARTS tokens and tactile levers (lines 243–410).
   - Formative check with instant explanatory feedback (lines 414–482).
   - Apple award badge with verified 21CC competency metrics (lines 485–553).

3. **Facilitator Mode Simplification (Observation 1.3)**:
   `TeacherDashboardView.tsx` currently divides information across 5 tabs. To match R2 and Apple HIG simplicity, it must be consolidated into an Apple Classroom dual-tab segmented view:
   - **Tab 1**: Live Class Monitoring (Roster of 28 students from Class 3-Faith, real-time slide coordinates, hand-raise flags, credit usage).
   - **Tab 2**: Curriculum & GeBIZ Procurement (combining MOE D&T rubrics, pre/post telemetry, GeBIZ quotation download, School Enrichment Budget guidelines, and PDPA safety sheets).

4. **Apple HIG Design Alignment (Observation 1.4)**:
   Aligning `tailwind.config.js` and `src/index.css` to the authentic Apple Dark Mode palette (`#1C1C1E`, `#2C2C2E`, `#3A3A3C`, `#0A84FF`) and replacing CAD jargon ensures full compliance with Apple HIG and secondary school learning realities.

---

## 3. Detailed Architecture Specifications

### 3.1 Apple HIG Visual Design System

#### A. Color Tokens (Dark Mode Default)
| Token Name | Hex Code | Apple HIG Role | Usage in Show3D |
| :--- | :--- | :--- | :--- |
| `apple-bg-base` | `#1C1C1E` | System Background (Dark) | Full-screen app canvas background |
| `apple-bg-secondary` | `#2C2C2E` | Secondary System Background | Keynote presentation container & Classroom panels |
| `apple-bg-tertiary` | `#3A3A3C` | Tertiary System Background | Student roster cards, token boxes, quiz option buttons |
| `apple-bg-elevated` | `#48484A` | Quaternary / Card Highlight | Hover states, active segmented pill indicator |
| `apple-blue` | `#0A84FF` | System Blue (Primary Tint) | Primary CTA buttons, active module pill, selection highlights |
| `apple-green` | `#30D158` | System Green (Affirmative) | Correct quiz feedback, on-track student status, badge glow |
| `apple-orange` | `#FF9F0A` | System Orange (Warning/Attention) | Incorrect quiz retry notice, student help-flag / hand-raise alert |
| `apple-purple` | `#BF5AF2` | System Purple (Intelligence) | PARTS recipe chips, AI synthesis indicators |
| `apple-indigo` | `#5E5CE6` | System Indigo (Accents) | Key Concept definition cards, header gradients |
| `apple-border` | `rgba(255, 255, 255, 0.08)` | Hairline Separator | Window borders, table dividers |
| `apple-border-highlight` | `rgba(255, 255, 255, 0.16)` | Active Stroke | Focused inputs, card borders on hover |

#### B. Blur Materials & Glassmorphism
- **Ultra-Thin Material**: `background: rgba(28, 28, 30, 0.65); backdrop-filter: blur(20px);` (used for floating status pills and badges).
- **Thin Material**: `background: rgba(44, 44, 46, 0.75); backdrop-filter: blur(28px);` (used for `AppleTopNav` header).
- **Regular Material**: `background: rgba(44, 44, 46, 0.85); backdrop-filter: blur(32px);` (used for 16:9 Keynote card container and Classroom hub).
- **Apple Intelligence Shimmer**:
  ```css
  background: linear-gradient(135deg, #00F0FF, #0A84FF 25%, #BF5AF2 50%, #FF375F 75%, #FF9F0A);
  ```

#### C. SF Pro Typography Scale
| Style Name | Size / Line-Height | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Large Title** | `34px / 41px` | Bold (`700`) | `-0.02em` | Keynote slide primary headlines |
| **Title 1** | `28px / 34px` | Bold (`700`) | `-0.015em` | Modal titles, badge completion title |
| **Title 2** | `22px / 28px` | SemiBold (`600`) | `-0.01em` | Section headers, quiz question text |
| **Title 3** | `20px / 25px` | SemiBold (`600`) | `-0.005em` | Key Concept card title, student card name |
| **Headline** | `17px / 22px` | SemiBold (`600`) | `-0.005em` | Button labels, table column headers |
| **Body** | `17px / 22px` | Regular (`400`) | `normal` | Slide reading paragraphs |
| **Callout** | `16px / 21px` | Regular (`400`) | `normal` | Subtitles, quiz option descriptions |
| **Subhead** | `15px / 20px` | Medium (`500`) | `normal` | Metadata labels, teacher card subtitles |
| **Footnote** | `13px / 18px` | Regular (`400`) | `normal` | Pro Tip explanations, quiz feedback text |
| **Caption 1** | `12px / 16px` | Medium (`500`) | `+0.02em` | D&T badge tags, status pill text |
| **Caption 2** | `11px / 13px` | Regular (`400`) | `+0.03em` | Monospace credit metrics, timestamps |

#### D. Plain-Language Copywriting Dictionary (Zero CAD Jargon)
All student-facing interface text strictly eliminates 3D CAD jargon, matrix mathematics, and dark hacker aesthetics:

| ❌ Banned CAD / Jargon Term | ✅ Apple HIG Plain-Language Equivalent | Pedagogical Rationale |
| :--- | :--- | :--- |
| B-Rep / NURBS Surface | **3D Shape & Volume** | Secondary students understand solid physical form |
| Polygonal Mesh Manifold | **Wireframe Skeleton** | Relatable metaphor for vertices and edge networks |
| Transformation Matrix / Euler Angles | **Position & 360° Orbit** | Avoids linear algebra intimidation |
| PBR Albedo / Roughness Shader | **Surface Finish & Texture** | Direct connection to physical D&T materials (wood, matte plastic) |
| Mechanical Clearance Envelope | **Wiggle Room & Fit Gap** | Tangible understanding of why phone cases need slot clearance |
| Photovoltaic Solar Wattage Array | **Sun-Power Roof Array** | Focuses on sustainable function rather than electrical physics |
| Tokenized Latent Vector Embedding | **Design Recipe Ingredients** | Food/cooking metaphor empowers creative assembly |
| Ergonomic Rotational Incline Theta | **Study Viewing Angle (60°)** | Connects geometry directly to student posture and eye-strain |
| Cyber-Hack Terminal / Overclock | **Spatial AI Studio** | Apple-grade educational tone instead of juvenile hacker tropes |

---

### 3.2 Apple Keynote-Style Student Mode Specification

```
┌────────────────────────────────────────────────────────────────────────┐
│ AppleTopNav: [Show3D] · [ 🎓 Student Mode | 👩‍🏫 Facilitator Mode ] · [Canvas ↗]│
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌──────────────────────── 16:9 Keynote Card ───────────────────────┐  │
│   │ Module 3: Prompt Scaffolding · Learn to Use AI    [● ● ● ○ ○ ○] │  │
│   ├──────────────────────────────────────────────────────────────────┤  │
│   │                                                                  │  │
│   │  [SLIDE BODY: Concept Slide 1/2/3 OR Co-Design OR Quiz OR Badge] │  │
│   │                                                                  │  │
│   ├──────────────────────────────────────────────────────────────────┤  │
│   │ [◀ Previous]       Use Arrow Keys or Space to Navigate    [Next ▶]│  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

#### A. Mechanics & Interaction
- **Aspect Ratio & Centering**: Fixed 16:9 Keynote presentation card (`w-full max-w-6xl aspect-[16/9] max-h-[86vh]`) centered within the dark canvas (`#1C1C1E`).
- **Smooth Step Transitions**: CSS translation and opacity transition (`transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`).
- **Dual Navigation**:
  - Full keyboard control: `ArrowRight` or `Space` advances slide; `ArrowLeft` returns to previous slide; `Escape` closes any open modal.
  - Interactive pill step indicator in header: 6 pill segments showing current progress (`Slide 1`, `Slide 2`, `Slide 3`, `Co-Design`, `Quiz`, `Badge`). Clicking any unlocked pill navigates directly.

#### B. The 6-Stage Slide Progression per Module
1. **Slide 1 (Concept Introduction)**:
   - Category Badge (e.g. `Lesson 3.1 · Prompt Structure`).
   - Bold Headline (e.g. *Why Vague Prompts Melt in 3D*).
   - Plain-language explanation (comparing 2D image prompts with 3D functional geometry).
   - Key Concept Card: Highlighted card with lightbulb icon (`term` and `definition`).
   - Speaker-Note Pro Tip: Yellow callout box with actionable workshop advice.
2. **Slide 2 (Geometric / Structural Principle)**:
   - Deep dive into the physical or mathematical mechanism (e.g. *The PARTS Prompting Formula*).
   - Visual breakdown diagram (Purpose, Angle, Routing, Theme, Structure).
   - Key Concept definition card (e.g. *Mechanical Tolerance*).
   - Pro Tip on cable bend radius and clearance.
3. **Slide 3 (Singapore D&T Application)**:
   - Real-world school design context (e.g. *Courtyard Study Spaces & PLD Desks*).
   - Connecting spatial AI output to 3D printing and physical workshop tools.
   - Key Concept definition card.
   - Pro Tip on checking wireframe watertightness before manufacturing.
4. **Slide 4 (Apple Intelligence Co-Design Stage)**:
   - Left side: PARTS Recipe Token Builder:
     - Chips for Feature (Tensile Canopy, Solar Roof), Material (Modular Timber, Anodized Metal), Environment (Airflow draft gaps, Cable pass-through).
     - 1-click token toggle with iridescent Apple Intelligence border highlight.
     - Tactile levers: Color palette swatch buttons (`#38bdf8`, `#ffffff`, `#10b981`, `#f59e0b`), Solar Array toggle switch.
   - Right side: Crisp Spatial Vector Preview Card:
     - Dynamic vector 3D rendering responding to lever changes.
     - Status pill: `MOE PLD Safe · Port 443`.
     - Action button: `[ Try in Show3D Canvas ↗ ]` (triggers modal without disrupting slide position).
5. **Slide 5 (Formative Knowledge Check)**:
   - Single high-value multiple-choice question.
   - 3 carefully differentiated options.
   - Immediate explanatory feedback:
     - Correct option: Apple green border, green checkmark icon, positive reinforcing explanation.
     - Incorrect option: Apple orange border, orange alert icon, constructive explanation guiding student reasoning.
6. **Slide 6 (Mastery Badge & Creative Intent Summary)**:
   - Glowing Apple Watch/Fitness style digital competency badge with bounce animation.
   - Demonstrated 21CC competency headline.
   - Human Creative Intent metric (e.g. *94% Human Directed*).
   - Key Takeaways checklist.
   - Action buttons: `[ View Verified Certificate ]` and `[ Next: Module X ▶ ]`.

---

### 3.3 Apple Classroom-Style Facilitator Mode Specification

```
┌────────────────────────────────────────────────────────────────────────┐
│ AppleTopNav: [Show3D] · [ 🎓 Student Mode | 👩‍🏫 Facilitator Mode ] · [Canvas ↗]│
├────────────────────────────────────────────────────────────────────────┤
│ Teacher Facilitator Hub · Tampines Secondary School · Class 3-Faith     │
│ [ 👥 Tab 1: Live Class Monitoring  |  📋 Tab 2: Curriculum & GeBIZ ]   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  TAB 1: LIVE CLASS MONITORING                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 28 Enrolled Cohort │ +34.2% Growth Delta │ 1,120/5,000 Credits   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  Filters: [ All (28) | Needs Help (2) | On Track (22) | Done (4) ]     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Marcus Lee   │ │ Ethan Tan    │ │ Lucas Teo    │ │ Priya Sharma │   │
│  │ Mod 3: Slide4│ │ Mod 3: Slide2│ │ Mod 2: Slide1│ │ Mod 4: Done   │   │
│  │ ⚠️ Help Flag │ │ 🟢 On Track  │ │ ⚠️ Help Flag │ │ 🔵 Completed │   │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                                        │
│  TAB 2: CURRICULUM & GEBIZ PROCUREMENT                                 │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ [1. MOE Rubrics] [2. Pre/Post Gains] [3. GeBIZ Pack] [4. Safety] │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

#### A. Tab 1: Live Class Monitoring (Class 3-Faith)
- **Cohort Metadata**: Class 3-Faith, Tampines Secondary School (28 enrolled students).
- **Live Telemetry Strip**:
  - `Cohort Size`: 28 Active Students
  - `Pre/Post Growth Delta`: +34.2% (Pre: 61.8% → Post: 96.0%)
  - `Guaranteed Credit Pool`: 1,120 / 5,000 used (3,880 available · 0 students blocked)
  - `Help Requests`: 2 students flagging assistance
- **Classroom Student Roster Grid (Apple Classroom Squircle Cards)**:
  - 28 student cards arranged in a responsive grid.
  - Card visual hierarchy:
    - Top row: Student squircle initials avatar (`ET`, `SN`, `ML`, etc.) + Student Full Name.
    - Middle row: Current Slide Location badge (e.g. `Module 3 · Slide 4: Co-Design`).
    - Status Indicator:
      - `🟢 On Track`: Student progressing smoothly.
      - `🟡 Help Flag (Hand Raised)`: Amber glow with hand-raise icon. Prompts teacher action: `[ Acknowledge ]` / `[ Send Hint ]`.
      - `🔵 Completed`: Blue badge with verified certificate checkmark.
    - Bottom row: Demonstrated 21CC skill pill (e.g. *Solar Panel Integration*, *PARTS Prompting*) + Credits used (`38 / 50`).
  - Interactive Filter Pill: `[ All (28) | ⚠️ Needs Support (2) | 🟢 On Track (22) | 🔵 Completed (4) ]`.

#### B. Tab 2: Curriculum & GeBIZ Procurement
Divided into 5 clean, expandable Apple Settings-style cards:
1. **Turnkey MOE D&T Assessment Rubrics**:
   - Mapped to MOE's "Four Learns" Framework:
     - *Learn ABOUT AI*: Coordinate geometry, wireframe skeletons, spatial vs 2D diffusion.
     - *Learn ON / TO USE AI*: Structured PARTS prompt recipes, constraint-based parameter tuning.
     - *Learn WITH AI*: Applied human-AI product co-design, physical 3D print feasibility, peer critique pins.
     - *Learn BEYOND AI*: Anti-offloading reflection, moral authorship scorecard, environmental sustainability.
2. **Pre/Post Learning Gain Telemetry**:
   - Visual telemetry demonstrating +34.2% empirical learning growth across cohort.
   - Pre-diagnostic baseline (61.8%) vs Post-capstone mastery (96.0%).
   - Demonstrates measurable 21st Century Competencies (21CC) for school reporting.
3. **Turnkey GeBIZ Quotation Pack Generator**:
   - Specification: 1 Class (28 students), 6 sessions (10 hours).
   - Fixed institutional quotation: zero per-seat subscription lockouts; includes 5,000 pooled AI credits.
   - Primary action: `[ Download GeBIZ Quotation Pack (.PDF) ]`.
4. **School Enrichment Budget & Funding Guidelines**:
   - Clear institutional guidance for School Principals and D&T HODs:
     - Primary Route: Decentralized School Enrichment Budgets / School-Level Allocations.
     - Applied Learning Programme (ALP) alignment (STEM, Architecture, Smart Cities themes).
     - MOE Opportunity Fund (MOF) full subsidy compatibility for Financial Assistance Scheme (FAS) students.
     - Explicit compliance note: Schools utilize existing internal enrichment budgets rather than assuming a dedicated centralized grant.
5. **Singapore PDPA & Student Safety Specification Sheet**:
   - Minimum Age 13+ standard with school-managed SSO (no personal email collection).
   - Zero model training on student prompts or generated 3D geometries.
   - Port 443 network readiness: runs seamlessly on standard MOE PLD web filters without firewall exception requests.
   - Automated safe-prompt filtering: intercepts non-educational tokens and keeps students on-task.

---

### 3.4 Component Hierarchy & State Models

#### A. Component Hierarchy
```
src/
├── App.tsx                               [Root Orchestrator: manages activeRole ('student' | 'facilitator')]
│   ├── AppleTopNav.tsx                   [Top Segmented Header: [ 🎓 Student Mode | 👩‍🏫 Facilitator Mode ]]
│   │
│   ├── Student Mode View:
│   │   └── StudentKeynoteDeck.tsx        [Distraction-free 16:9 presentation container]
│   │       ├── KeynoteHeader             [Module code, title, 6-step progress dot indicator]
│   │       ├── ConceptSlideView          [Slides 1-3: reading text, key concept card, speaker pro-tip]
│   │       ├── CoDesignStageView         [Slide 4: PARTS tokens, tactile levers, vector 3D card]
│   │       ├── FormativeQuizView         [Slide 5: 1-question check with instant visual feedback]
│   │       ├── MasteryBadgeView          [Slide 6: Apple award badge, Creator Ownership scorecard]
│   │       └── KeynoteFooter             [Keyboard hint, Previous & Next action buttons]
│   │
│   ├── Facilitator Mode View:
│   │   └── FacilitatorDashboardView.tsx  [Classroom management hub with 2-tab segmented control]
│   │       ├── FacilitatorTabBar         [Segmented control: [ Live Monitoring | Curriculum & GeBIZ ]]
│   │       ├── LiveClassMonitoringTab    [Tab 1: Telemetry strip + 28 Class 3-Faith student cards]
│   │       │   ├── TelemetryHeader       [28 enrolled, +34.2% growth, 1,120/5,000 credit pool]
│   │       │   ├── FilterPillControl     [Filter by All, Needs Help, On Track, Completed]
│   │       │   └── StudentCardGrid       [28 student squircle cards with live slide & help flags]
│   │       └── CurriculumProcurementTab  [Tab 2: Turnkey MOE rubrics, GeBIZ pack, PDPA sheets]
│   │           ├── MOERubricsCard        [Four Learns framework assessment levels]
│   │           ├── GainTelemetryCard     [Pre/post growth metrics]
│   │           ├── GeBIZQuotationCard    [Turnkey PDF quotation & invoicing download]
│   │           ├── FundingGuidanceCard   [School Enrichment Budget & ALP guidance]
│   │           └── PDPASafetyCard        [Age 13+, zero model training, Port 443 safety]
│   │
│   └── Global Modals:
│       ├── Show3DCanvasModal.tsx         [Core WebGL CAD modeling engine modal]
│       └── CertificateModal.tsx          [Student verified MOE competency certificate]
```

#### B. State Models (`src/types/index.ts`)
```typescript
// Role switching
export type AppActiveRole = 'student' | 'facilitator';

// Facilitator Hub tab state
export type FacilitatorHubTab = 'monitoring' | 'curriculum_procurement';

// Student presentation slide stages (0 to 5)
export type KeynoteSlideStage = 
  | 0 // Concept Slide 1
  | 1 // Concept Slide 2
  | 2 // Concept Slide 3
  | 3 // Co-Design Challenge (PARTS + Levers)
  | 4 // Formative Quiz Check
  | 5; // Mastery Badge & Creator Ownership

// Student live monitoring item (28 cohort members)
export interface CohortStudent {
  id: string; // 'st-01' to 'st-28'
  name: string; // e.g. 'Marcus Lee'
  avatar: string; // 'ML'
  currentModule: number; // 1 to 6
  slideLocation: string; // 'Mod 3 · Slide 4: Co-Design'
  status: 'on_track' | 'needs_help' | 'completed';
  handRaised: boolean;
  creditsUsed: number; // e.g. 38
  maxCredits: number; // 50
  preScore: number; // e.g. 50
  postScore: number; // e.g. 84
  demonstratedSkill: string; // e.g. 'PARTS Prompting Refinement'
  creatorIntentScore: number; // e.g. 94%
}
```

---

## 4. Caveats

1. **Read-Only Survey Scope**: In accordance with the dispatch rules, this survey did not modify any source code in `src/`. All proposals are documented in this report.
2. **WebGL Canvas Modal Independence**: Show3D Canvas modal triggers launch an isolated iframe or WebGL view; it does not replace the lightweight Keynote deck, guaranteeing low GPU overhead on student PLDs (Chromebooks/iPads).
3. **No CAD Tools in Student View**: No 3D transform gizmos, vertex editors, or CAD toolbars are exposed in Student Mode; all interactions occur through plain-language PARTS tokens, sliders, and toggle switches.

---

## 5. Conclusion

The application architecture is primed for an elegant, high-impact implementation:
1. `App.tsx` can cleanly switch between `student` and `facilitator` roles via `AppleTopNav.tsx`.
2. `StudentKeynoteDeck.tsx` delivers the complete Apple Keynote 3-slide + co-design + quiz + badge experience with keyboard navigation and zero CAD clutter.
3. `TeacherDashboardView.tsx` consolidates into a clean Apple Classroom 2-tab control center: Tab 1 (Live 28-Student Roster of Class 3-Faith with hand-raise flags) and Tab 2 (Curriculum & GeBIZ Procurement Pack).
4. All copywriting and visual styling adhere to Apple HIG Dark Mode (`#1C1C1E`, `#2C2C2E`, `#3A3A3C`, `#0A84FF`), SF Pro typography, and plain-language design communication.

---

## 6. Verification Method

To verify the implementation once executed by the team:

### 6.1 TypeScript & Build Verification
```bash
# 1. Type check
npx tsc -b

# 2. Production build
npm run build
```
*Expected Result*: Zero TypeScript errors, build succeeds cleanly.

### 6.2 Visual & Interaction Verification
1. **Top Segmented Switch**: Open application in browser. Verify clicking `[ 🎓 Student Mode ]` displays the full-screen Keynote stage. Verify clicking `[ 👩‍🏫 Facilitator Mode ]` displays the Apple Classroom control center with zero student UI leakage.
2. **Keynote Slide Flow**: In Student Mode, press `ArrowRight` or `Space`. Verify navigation smoothly advances through Slide 1, Slide 2, Slide 3, Co-Design Stage, Quiz, and Badge.
3. **Co-Design Stage**: On Slide 4, click PARTS token chips and toggle solar array. Verify the 3D preview card updates dynamically. Click `[ Try in Show3D Canvas ]` and verify modal opens.
4. **Formative Quiz**: On Slide 5, click an option. Verify instant explanatory feedback appears in green (correct) or orange (incorrect).
5. **Facilitator Tabs**: In Facilitator Mode, switch between `Tab 1: Live Class Monitoring` (verify 28 student cards for Class 3-Faith, hand-raise alerts for Marcus Lee & Lucas Teo, 1,120/5,000 credit pool) and `Tab 2: Curriculum & GeBIZ Procurement` (verify MOE rubrics, +34.2% gain telemetry, GeBIZ quotation button, and PDPA safety sheets).
