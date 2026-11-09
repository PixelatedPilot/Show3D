# Project: Show3D Singapore Secondary Rebuild

## Architecture
Show3D is an Apple HIG-compliant spatial AI learning platform built for Singapore secondary schools (D&T curriculum, Seymour Papert Constructionism, MOE "Four Learns").

The system architecture is strictly bifurcated into two mutually exclusive, zero-leakage view modes:
1. **Student Mode (`StudentKeynoteDeck.tsx`)**:
   - Distraction-free, 16:9 Keynote presentation deck.
   - 6 sequential curriculum modules (Coordinate Space, Mesh Topology, Prompt Scaffolding, Digital Materials, Ergonomics, Sustainability).
   - Each module contains:
     - 3 Visual Concept Slides (bold headline, plain-language explanation, Key Concept card, Pro Tip).
     - 1 Interactive Co-Design Stage (Apple Intelligence PARTS tokens, parametric levers for curvature/reflectivity/solar wattage, vector spatial preview, "Try in Show3D Canvas" trigger).
     - 1 Formative Diagnostic Check (single-question check with instant visual feedback and explanatory reasoning for correct & incorrect options).
     - 1 Digital Competency Badge (Apple Watch/Fitness style badge, 94% human creative intent metric, certificate trigger).
2. **Facilitator Mode (`TeacherDashboardView.tsx`)**:
   - Apple macOS/Classroom-inspired control center with a clean 2-tab segmented control:
     - **Tab 1: Live Class Monitoring**: 28-student cohort cards (Class 3-Faith) displaying real-time slide location, active co-design status, hand-raise/help flags, and credit usage. Filterable by All, Needs Help, On Track, Completed.
     - **Tab 2: Curriculum & GeBIZ Procurement**: Turnkey MOE D&T assessment rubrics (Four Learns), pre/post learning gain telemetry (+34.2%), GeBIZ quotation pack generation, School Enrichment Budget guidelines, and Singapore PDPA safety sheets.
3. **Navigation & Global Modals (`App.tsx`, `AppleTopNav.tsx`)**:
   - Top-bar Apple-style segmented control: `[ 🎓 Student Mode | 👩‍🏫 Facilitator Mode ]`.
   - Modals for Canvas, Student Safety (PDPA), School Procurement (GeBIZ), Pedagogy Framework, and Certificate.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Native Testing Infra | Node 25 native test suite (`node:test`, `node:assert`, `--experimental-strip-types`) with Tiers 1-4 E2E test cases | M1 | Survey 1 |
| 2 | 6 Curriculum Modules | Coordinate Space, Mesh Topology, Prompt Scaffolding, Digital Materials, Ergonomics, Sustainability | M2 | Survey 2 |
| 3 | 18 Visual Concept Slides | 3 visual slides per module with bold headline, plain-language text, Key Concept card, speaker Pro Tip | M2 | Survey 2 |
| 4 | Formative Diagnostic Quizzes | 6 diagnostic questions with instant explanatory feedback for both correct and incorrect options | M2 | Survey 2 |
| 5 | Apple HIG Dark Palette & Typography | `#1C1C1E` base, `#2C2C2E` secondary, `#3A3A3C` cards, `#0A84FF` blue accent, blur materials, SF Pro hierarchy | M2 | Survey 3 |
| 6 | Secondary Research Compliance Data | PDPA (Age 13+, SSO), zero model training, Port 443 PLD readiness, 5,000 credit pool, GeBIZ quotes, School Enrichment Budget | M2 | Survey 2 |
| 7 | Keynote Presentation Deck Flow | 16:9 full-screen presentation container with smooth transitions and keyboard/touch navigation | M3 | Survey 3 |
| 8 | Apple Intelligence Co-Design Stage | PARTS recipe token chips, parametric levers (curvature, reflectivity swatches, solar toggle), vector spatial preview | M3 | Survey 2, 3 |
| 9 | Show3D Canvas Trigger | Clean modal trigger `"Try in Show3D Canvas"` launching interactive WebGL viewport without slide disruption | M3 | Survey 1, 3 |
| 10 | Digital Competency Badges & Scorecard | Apple-style award badges, 94% human creative intent metric, portfolio record, verifiable certificate | M3 | Survey 2, 3 |
| 11 | Facilitator Live Monitoring (Tab 1) | 28-student roster cards for Class 3-Faith, slide coordinates, active co-design, hand-raise alerts, filters | M4 | Survey 3 |
| 12 | Facilitator Procurement Hub (Tab 2) | Turnkey MOE D&T rubrics, pre/post gain telemetry (+34.2%), GeBIZ quotation pack, funding guide, PDPA sheets | M4 | Survey 2, 3 |
| 13 | Top Segmented Role Switching | `AppleTopNav` segmented toggle between `[ 🎓 Student Mode | 👩‍🏫 Facilitator Mode ]` with zero UI leakage | M5 | Survey 1, 3 |
| 14 | Zero TypeScript & Build Errors | Clean compilation with `tsc -b` and production bundle with `npm run build` | M5 | Survey 1 |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | E2E Testing Infrastructure | Create native Node.js test suite (`tests/` directory) covering Tiers 1–4, add `"test"` script, publish `TEST_READY.md` | none | PLANNED |
| M2 | Curriculum & Compliance Foundations | Update `moduleLessons.ts`, `appStore.ts`, and Tailwind styling to match 6 canonical modules, 18 slides, quizzes, badges, and HIG dark mode tokens | M1 | PLANNED |
| M3 | Student Keynote Deck & Co-Design Stage | Polish `StudentKeynoteDeck.tsx` with 16:9 layout, keyboard navigation, PARTS tokens, architectural levers, vector preview, formative feedback, and badges | M2 | PLANNED |
| M4 | Facilitator Mode Classroom Hub | Refine `TeacherDashboardView.tsx` into clean 2-tab control center: Tab 1 Live Monitoring (28 students, help flags) & Tab 2 Curriculum/GeBIZ | M2 | PLANNED |
| M5 | Integration, Role Segregation & Verification | Refactor `App.tsx` with `AppleTopNav` switching, wire modals, verify 100% test pass, `tsc -b`, and `npm run build` | M3, M4 | PLANNED |

---

## Interface Contracts

### App State (`src/types/index.ts`)
```typescript
export type AppActiveRole = 'student' | 'facilitator';
export type FacilitatorHubTab = 'monitoring' | 'curriculum_procurement';
export type KeynoteSlideStage = 0 | 1 | 2 | 3 | 4 | 5;
```

### Module Lesson Interface (`src/data/moduleLessons.ts`)
```typescript
export interface VisualConceptSlide {
  id: string;
  badge: string;
  headline: string;
  subtitle: string;
  explanation: string;
  keyConcept: {
    term: string;
    definition: string;
  };
  proTip: string;
}

export interface ModuleLessonData {
  id: number;
  code: string;
  title: string;
  duration: string;
  moeDomain: string;
  slides: [VisualConceptSlide, VisualConceptSlide, VisualConceptSlide];
  quiz: {
    question: string;
    options: {
      id: string;
      label: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
  badge: {
    title: string;
    icon: string;
    competency: string;
    intentScore: number;
  };
}
```

---

## Code Layout
- `src/App.tsx`: Top-level orchestrator mounting `AppleTopNav` and switching between Student and Facilitator modes (Owned by M5)
- `src/components/layout/AppleTopNav.tsx`: Top segmented header bar (Owned by M5)
- `src/components/student/StudentKeynoteDeck.tsx`: Full-screen 16:9 Keynote deck (Owned by M3)
- `src/components/teacher/TeacherDashboardView.tsx`: Apple Classroom 2-tab facilitator hub (Owned by M4)
- `src/data/moduleLessons.ts`: Educational content for 6 modules and 18 slides (Owned by M2)
- `src/store/appStore.ts`: Roster (28 students), quizzes, rubrics, compliance specs (Owned by M2)
- `src/index.css` & `tailwind.config.js`: Apple HIG dark mode tokens and blur materials (Owned by M2)
- `tests/`: E2E and Unit test suite files (Owned by M1)
- `package.json`: Scripts configuration (Owned by M1)
