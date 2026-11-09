# DISPATCH — teamwork_preview_explorer_remediate_m1

## Identity
- Role: Remediation Explorer for Milestone 1 Forensic Audit Failure
- Working directory: /Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_explorer_remediate_m1
- Parent Orchestrator: teamwork_preview_orchestrator_1 (Conversation ID: 3ba8986c-f707-4b62-8a1b-f9d1db7005bd)

## Objective
Analyze the root causes of the Forensic Integrity Violation on Milestone 1 and design an authentic, comprehensive remediation plan.
You MUST read the full Forensic Auditor's evidence report:
`/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_auditor_m1_1/handoff.md`

## Audit Failure Evidence Summary
The Forensic Auditor issued an unconditional BINARY VETO (INTEGRITY VIOLATION) with the following exact findings:
1. **Tautological Assertions in `tests/e2e/workflow.test.ts:21-33`**:
   - `let activeMode = 'student'; assert.equal(activeMode, 'student'); activeMode = 'facilitator'; assert.equal(activeMode, 'facilitator');`
   - Tests local variables instead of application code. Identical to `assert.equal(1, 1)`.
2. **Self-Testing Mock Closures in `tests/e2e/workflow.test.ts:35-173`**:
   - Tests define local functions (`handleNext`, `simulateKeyEvent`, `toggleToken`, `setColor`, `toggleSolar`) in test closures and assert on their own logic rather than importing real functions from `src/`.
   - Real `src/App.tsx` and `StudentKeynoteDeck.tsx` are completely bypassed.
3. **Inline In-Memory Object Mock Asserted on Itself (`tests/e2e/workflow.test.ts:334-353`)**:
   - Declares `const certificateRecord = { ... }` inline and asserts on itself rather than testing an authentic certificate generator.
4. **False Attestation in `TEST_READY.md` (Line 112)**:
   - Claims "Zero facades, zero hardcoded trivial passes" while `workflow.test.ts` contains literal tautologies and inline mocks.
5. **Undeclared Transitive Dependency Risk**:
   - `tests/helpers/loadAppStore.ts` imports `jiti`, which is not listed in `package.json`.
   - Native ESM fails because `src/store/appStore.ts` line 14 has extensionless import `from '../types'`.

Reviewer 1, Reviewer 2, and Challenger 2 also concurred with REQUEST_CHANGES. Additionally, Challenger 2 noted missing coverage for `curvature` and `reflectivity` architectural levers, and the "Try in Show3D Canvas" modal trigger.

## Tasks
1. Investigate the codebase and formulate a remediation architecture that eliminates all tautologies and facades:
   - Design a genuine pure state transition utility module (e.g. `src/utils/workflowState.ts` or `src/store/workflowState.ts`) containing:
     - Role switching logic (`switchAppMode`)
     - Keynote slide navigation (`getNextSlideStage`, `getPrevSlideStage`, `handleKeyNavigation`)
     - Module selection & reset (`resetKeynoteOnModuleChange`)
     - PARTS recipe token mutations (`togglePartsToken`)
     - Parametric architectural levers (`setCanopySwatch`, `setCanopyCurvature`, `toggleSolarArray`)
     - Verifiable certificate generation (`generateVerifiedCertificate`)
     - Canvas modal state handler
   - Design the fix for ESM directory imports in `src/store/appStore.ts` (adding `/index.ts`) and removing `jiti` or declaring it in `package.json`.
   - Ensure `App.tsx` and `StudentKeynoteDeck.tsx` will consume these exported utilities so production and tests share the exact same logic.
2. Outline the exact implementation plan for the worker in `handoff.md`.
3. Send completion message back to parent orchestrator.


## 2026-10-26T02:57:43Z
[Message from 3ba8986c-f707-4b62-8a1b-f9d1db7005bd]
Remediation task for Milestone 1 Forensic Audit Failure. Read ORIGINAL_REQUEST.md, Forensic Auditor report, Reviewer reports, Challenger report, and formulate comprehensive remediation plan in handoff.md.
