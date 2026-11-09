## 2026-11-06T10:03:12Z
From: b70ca448-d0fb-4a94-bb76-941f504ab9ca (orchestrator)
Priority: MESSAGE_PRIORITY_HIGH

You are teamwork_worker_m2.
Working directory: /Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_worker_m2
Workspace root: /Users/josephsukatendel/Documents/antigravity/sharp-curie
Parent conversation ID: b70ca448-d0fb-4a94-bb76-941f504ab9ca

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY: You MUST read the original user request before starting work:
/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/ORIGINAL_REQUEST.md

Reference materials:
- Reference plan: /Users/josephsukatendel/.gemini/antigravity/brain/8a020730-b719-4c40-b9ac-361aeae13130/romer_design_adaptation_plan.md (§3 Phase 2 & Phase 5)

YOUR EXCLUSIVE WRITE OWNERSHIP (You own ONLY these files, do not edit other files):
1. `src/components/layout/AppleTopNav.tsx`
2. `src/App.tsx`
3. `src/components/landing/LandingView.tsx`

Your Task:
Implement R2 (Global Navigation Shell) and R5 (High-Density Executive Landing View) strictly following the Romer design language.

1. In `src/components/layout/AppleTopNav.tsx` & `src/App.tsx`:
   - 48px executive top bar (`h-12 bg-surface border-b border-outline-variant px-md`).
   - Left: Geometric monogram (`w-6 h-6 rounded-full border border-custom-text-muted flex items-center justify-center font-h4 font-bold`) + bold `SHOW3D` wordmark (`font-h4 tracking-tighter text-on-surface`) and `SYS // SG_MOE_D&T` mono badge.
   - Horizontal mode/view tabs with active bottom indicator lines (`text-primary border-b-2 border-primary pb-3 relative top-[6px]` for active; `text-on-surface-variant hover:text-on-surface` for inactive). Modes: Student Learning Mode (`student`) and Facilitator Mode (`facilitator`). Include landing view trigger if applicable or keep mode switching clean.
   - Right: Module quick-select segmented bar (`M01`–`M06`) inside a crisp `#101112` container (`border border-[#1B1C1E] rounded p-xs`) with active module highlighted in `bg-[#191A1C] text-primary shadow`.
   - "Try Show3D Canvas" button styled as Romer primary action (`bg-[#5E6BFF] text-[#F0F1F2] rounded py-1.5 px-3 font-label-sm`).
   - Ensure all props, role switching callbacks (`onSelectRole`, `onSelectModule`, `onOpenCanvas`, etc.) work without breaking.

2. In `src/components/landing/LandingView.tsx`:
   - Restructure into the 10-section high-density executive landing page described in §3 Phase 5 of the reference plan:
     1. Fixed 80px header: `bg-custom-bg border-b border-custom-divider` with circular monogram, Show3D title, nav links, high-contrast CTA (`bg-white text-black font-bold`).
     2. Hero & multi-pane technical mockup: `76px` Manrope headline ("The spatial command deck for focused classrooms") + muted subheadline + CTAs + 620px 3-pane technical preview (left telemetry stream, center 80px-grid SVG oscillation with technical callouts like `P_OPTIMAL_SYNC` and `Δ_LEARNING_GAIN`, right signal summary & live decision log).
     3. 3 product principle schematic cards: `FIG 0.1 / UNIFIED KEYNOTE VIEW`, `FIG 0.2 / PARTS CO-DESIGN GRAPH`, `FIG 0.3 / FORMATIVE RHYTHM` (400px cards with `.dot-pattern` wells, SVG schematics, and corner coordinates).
     4. Signal intelligence section (technical grid container, corner reticles, telemetry thread).
     5. Decision command center section (timeline SVG analysis, operational telemetry instrument hub, floating Control Queue card).
     6. Insights timeline (4-column connected node timeline: `01 Approval & PDPA`, `02 Capacity & Credits`, `03 Diagnostic Movement`, `04 Classroom Rhythm`).
     7. Editorial customer quote cards in high-contrast cyan (`#D1EBEB`) and lime (`#C4FF44`) with black text.
     8. Final CTA & footer: 76px centered closing statement ("Built for clarity. Ready for Term 1.") and `#0d0e0f` footer.
   - Preserve all existing interactive triggers (opening modals, switching to student/facilitator mode, launching canvas).

3. Verify with `npx tsc -b`.
4. Write your `handoff.md` and `progress.md` in your working directory.
5. When complete, send a message to orchestrator (b70ca448-d0fb-4a94-bb76-941f504ab9ca).
