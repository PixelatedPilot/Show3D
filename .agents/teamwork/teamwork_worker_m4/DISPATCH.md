## 2026-11-06T10:03:35Z
You are teamwork_worker_m4.
Working directory: /Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_worker_m4
Workspace root: /Users/josephsukatendel/Documents/antigravity/sharp-curie
Parent conversation ID: b70ca448-d0fb-4a94-bb76-941f504ab9ca

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY: You MUST read the original user request before starting work:
/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/ORIGINAL_REQUEST.md

Reference materials:
- Reference plan: /Users/josephsukatendel/.gemini/antigravity/brain/8a020730-b719-4c40-b9ac-361aeae13130/romer_design_adaptation_plan.md (§3 Phase 4 & Phase 6)

YOUR EXCLUSIVE WRITE OWNERSHIP (You own ONLY these files, do not edit other files):
1. `src/components/facilitator/FacilitatorHub.tsx`
2. `src/components/teacher/TeacherDashboardView.tsx`
3. `src/components/layout/Show3DCanvasModal.tsx`
4. `src/components/layout/CertificateModal.tsx`
5. `src/components/layout/SchoolProcurementModal.tsx`
6. `src/components/layout/StudentSafetyModal.tsx`
7. `src/components/layout/PedagogyFrameworkModal.tsx`

Your Task:
Implement R4 (Facilitator Hub Command Center & Procurement Document View) and R6 (Global Modals Styling) following Romer's executive design language:

1. In `FacilitatorHub.tsx` & `TeacherDashboardView.tsx`:
   - Left Sidebar (`w-64 bg-surface-container-lowest border-r border-outline-variant`):
     - Header: "Facilitator Hub" (`font-h3`) + "Class 3-Faith · Tampines Secondary" (`font-body-md text-on-surface-variant`).
     - View switcher (Report Types pattern):
       - `Live Class Monitoring` (`System Overview // 28_ACTV`) with cyan status dot.
       - `Curriculum & GeBIZ Pack` (`Procurement & Ops // MOE_2030`).
     - Live telemetry stream blocks:
       - `LEARNING_GAIN`: `+34.2%` (`ACTV` in `#50d8e9`) with sparkline.
       - `CREDIT_POOL`: `3,886 / 5,000` (`OK // 77.7%` in `#5E6BFF`) with sparkline.
       - `HELP_QUEUE`: `02` (`WARN // INTERVENTION` in `#ffb689`).
   - Tab 1: Live Class Monitoring:
     - Search input + Romer segmented filter bar (`All (28)`, `Active`, `Needs Help (2)`, `Completed (4)`).
     - 28-student cohort cards in `bg-[#101112] border border-[#232426] hover:border-[#454655] rounded-lg p-md relative`.
     - Status badges using Romer `SIGNAL_SUMMARY` pattern:
       - `on_track`: cyan dot + `OK // SYNC`
       - `needs_help`: tertiary dot + `WARN // HELP_FLAG`
       - `completed`: primary dot + `DONE // 100%`
     - Right inspector drawer (`w-80 bg-surface-container-low border-l border-outline-variant glass-panel`):
       - Selected student real-time telemetry, formative assessment note editor, and Romer Control Queue action buttons (`Send Scaffolding Hint`, `Unlock Quiz`, `Project to Display`).
   - Tab 2: Curriculum & GeBIZ Procurement (`REP-MOE-2026-GEBIZ.pdf` Document View):
     - Document toolbar (`REP-GEBIZ-2026-TPSS.pdf`, `Page 1 / 2`).
     - Document header (`MOE D&T Curriculum & GeBIZ Specification`, `Status: E-INVOICING_READY`).
     - Telemetry summary cards (`+34.2% Learning Gain`, `5,000 Pooled Credits`, `Port 443 Verified`).
     - MOE "Four Learns" Rubric & Turnkey Deliverables formatted as clinical tables.
     - Action buttons: "Download GeBIZ Pack" (`bg-[#5E6BFF]`) and "Open Funding Guide" (`border-[#232426]`).

2. In Global Modals (`src/components/layout/`):
   - `CertificateModal.tsx`: Styled as executive audit document (`REP-WOR-2023-W42.pdf`) with top shimmer, `Status: VERIFIED`, 94% Human Creative Intent telemetry bar, and verifiable certification seals.
   - `Show3DCanvasModal.tsx`, `SchoolProcurementModal.tsx`, `StudentSafetyModal.tsx`, `PedagogyFrameworkModal.tsx`:
     - Obsidian glass background, 1px `#232426` hairline borders, top shimmer edge, tight corner radii (`rounded-lg`), clinical headers and clean action buttons.

3. Preserve all state logic, student data arrays, filter handling, modal visibility triggers, and export actions so that all unit/E2E tests pass.
4. Verify with `npx tsc -b`.
5. Write your `handoff.md` and `progress.md` in your working directory.
6. When complete, send a message to orchestrator (b70ca448-d0fb-4a94-bb76-941f504ab9ca).
