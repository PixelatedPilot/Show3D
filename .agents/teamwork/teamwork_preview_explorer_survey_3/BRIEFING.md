# BRIEFING — 2026-10-26T02:22:00Z

## Mission
Map the complete visual and interaction architecture for the Apple HIG-compliant Show3D spatial AI platform, partitioned into Keynote-style Student Learning Mode and Classroom-style Facilitator Management Mode.

## 🔒 My Identity
- Archetype: explorer
- Roles: Apple HIG UX/UI & System Architecture Explorer, Synthesis
- Working directory: /Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_explorer_survey_3
- Original parent: 3ba8986c-f707-4b62-8a1b-f9d1db7005bd
- Milestone: Phase 0 - Survey & Architecture Exploration

## 🔒 Key Constraints
- Read-only investigation — do NOT implement source code in this survey phase
- Write only to own directory (.agents/teamwork/teamwork_preview_explorer_survey_3/)
- Strictly adhere to Apple Human Interface Guidelines (Dark Mode #1C1C1E, #2C2C2E, #3A3A3C, #0A84FF)
- Plain-language copywriting (zero CAD jargon, matrix math, or hacker aesthetics)
- Clear role partitioning: Keynote-style Student Mode vs Classroom-style Facilitator Mode with zero UI leakage

## Current Parent
- Conversation ID: 3ba8986c-f707-4b62-8a1b-f9d1db7005bd
- Updated: 2026-10-26T02:22:00Z

## Investigation State
- **Explored paths**:
  - `ORIGINAL_REQUEST.md` (authoritative requirements)
  - `src/App.tsx` (view mode orchestration)
  - `src/components/layout/AppleTopNav.tsx` (Apple segmented navigation)
  - `src/components/student/StudentKeynoteDeck.tsx` (16:9 Keynote presentation container)
  - `src/components/teacher/TeacherDashboardView.tsx` (Classroom facilitator hub)
  - `src/store/appStore.ts` (Class 3-Faith 28-student roster, curriculum, rubrics)
  - `src/data/moduleLessons.ts` (6-module lesson slides, definitions, pro tips)
  - `tailwind.config.js` and `src/index.css` (Apple Dark Mode color palette & blur materials)
- **Key findings**:
  - Found prototype implementations of `AppleTopNav.tsx` and `StudentKeynoteDeck.tsx`, but `App.tsx` is still rendering `SplineNav` and complex multi-view routing (`landing`, `hub`, `lesson`, `studio`, `teacher`).
  - `TeacherDashboardView.tsx` currently has 5 tabs; needs to be consolidated into the strict 2-tab Apple Classroom model: Tab 1 (Live Class Monitoring for 28 students of Class 3-Faith) and Tab 2 (Curriculum & GeBIZ Procurement).
  - Designed the exact visual system (Dark Mode #1C1C1E, #2C2C2E, #3A3A3C, #0A84FF), SF Pro typography hierarchy, blur materials, copywriting dictionary, and full component/state architecture.
- **Unexplored areas**:
  - None for architecture exploration. Ready to write comprehensive `handoff.md`.

## Key Decisions Made
- Architecture must enforce a strict top-level state: `activeRole: 'student' | 'facilitator'`.
- Student Mode will mount `StudentKeynoteDeck` full-screen with 6 slide stages per module (3 concept slides, 1 co-design stage, 1 quiz, 1 badge summary).
- Facilitator Mode will mount `FacilitatorHubView` with dual-tab segmented control: Tab 1 (Live Monitoring) & Tab 2 (Curriculum & GeBIZ).
- External CAD studio will be cleanly isolated behind the "Try in Show3D Canvas" modal trigger, preventing CAD tool clutter from polluting the student Keynote experience.

## Artifact Index
- `.agents/teamwork/teamwork_preview_explorer_survey_3/DISPATCH.md` — Task dispatch
- `.agents/teamwork/teamwork_preview_explorer_survey_3/BRIEFING.md` — Situational awareness working memory
- `.agents/teamwork/teamwork_preview_explorer_survey_3/progress.md` — Liveness heartbeat
- `.agents/teamwork/teamwork_preview_explorer_survey_3/handoff.md` — Final comprehensive handoff report
