# DISPATCH — teamwork_preview_worker_remediate_m1

## Identity
- Role: Remediation Worker for Milestone 1
- Working directory: /Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_worker_remediate_m1
- Parent Orchestrator: teamwork_preview_orchestrator_1 (Conversation ID: 3ba8986c-f707-4b62-8a1b-f9d1db7005bd)

## Mandate & Scope
Implement the complete Milestone 1 remediation plan designed by `explorer_remediate_m1` to resolve all Forensic Integrity Violations.

## Inputs
- Remediation Architecture Specification (MANDATORY: read this first!):
  `/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_explorer_remediate_m1/handoff.md`
- Authoritative User Request:
  `/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/ORIGINAL_REQUEST.md`
- Forensic Audit Report:
  `/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_auditor_m1_1/handoff.md`

## File Ownership
You exclusively own and may edit:
1. `src/utils/workflowState.ts` (create)
2. `src/store/appStore.ts` (fix line 14 import)
3. `package.json` (add jiti and @types/node to devDependencies)
4. `tsconfig.json` (allowImportingTsExtensions)
5. `tests/helpers/loadAppStore.ts` (export workflowState)
6. `tests/e2e/workflow.test.ts` (rewrite completely with real function executions)
7. `src/App.tsx`, `src/components/student/StudentKeynoteDeck.tsx`, `src/components/layout/CertificateModal.tsx` (wire workflowState functions)
8. `TEST_READY.md` (update truthfully)

## Specific Execution Steps
1. Create `src/utils/workflowState.ts` with all functions and types specified in `teamwork_preview_explorer_remediate_m1/handoff.md § 3.1`.
2. Update `src/store/appStore.ts` line 14 to use `import type { ... } from '../types/index.ts';`.
3. Update `package.json` to declare `"jiti": "^1.21.7"` and `"@types/node": "^22.13.0"` in `devDependencies`.
4. Update `tsconfig.json` to include `"allowImportingTsExtensions": true`.
5. Update `tests/helpers/loadAppStore.ts` to export all workflow utilities from `src/utils/workflowState.ts`.
6. Rewrite `tests/e2e/workflow.test.ts` to import and execute genuine production functions directly, eliminating 100% of tautologies and mock closures.
7. Wire `src/App.tsx`, `src/components/student/StudentKeynoteDeck.tsx`, and `src/components/layout/CertificateModal.tsx` to consume these exported functions.
8. Update `TEST_READY.md` with accurate test counts and metrics.
9. Verify by running:
   - `npm test` (verify all tests pass with 0 failures)
   - `npx tsc -b` (verify 0 TypeScript errors)
   - `npm run build` (verify clean production build in `dist/`)
10. Write your report in `handoff.md` and notify parent orchestrator via `send_message`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-10-26T03:04:53Z
You are teamwork_preview_worker_remediate_m1.
Your working directory is: /Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_worker_remediate_m1
Your parent orchestrator is: teamwork_preview_orchestrator_1 (Conversation ID: 3ba8986c-f707-4b62-8a1b-f9d1db7005bd).

MANDATORY FIRST STEP: Read the authoritative user request at:
/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/ORIGINAL_REQUEST.md

READ REMEDIATION PLAN:
Read the complete remediation architecture and code specifications at:
/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_explorer_remediate_m1/handoff.md
Also read your instructions at:
/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_worker_remediate_m1/DISPATCH.md

Your role is Remediation Worker for Milestone 1.
Implement the plan:
1. Create `src/utils/workflowState.ts` with all pure functions and constants.
2. Fix `src/store/appStore.ts` line 14 import: `import type { ... } from '../types/index.ts';`.
3. Add `"jiti": "^1.21.7"` and `"@types/node": "^22.13.0"` to `devDependencies` in `package.json`.
4. Add `"allowImportingTsExtensions": true` to `tsconfig.json`.
5. Update `tests/helpers/loadAppStore.ts` to export workflowState utilities.
6. Rewrite `tests/e2e/workflow.test.ts` to import and execute these genuine production functions directly.
7. Wire `src/App.tsx`, `src/components/student/StudentKeynoteDeck.tsx`, and `src/components/layout/CertificateModal.tsx` to consume workflowState functions.
8. Update `TEST_READY.md`.
9. Verify: run `npm test`, `npx tsc -b`, and `npm run build`.
10. Write your handoff report to:
/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_worker_remediate_m1/handoff.md
Send a completion message back to parent orchestrator.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
