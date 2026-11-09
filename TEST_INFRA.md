# E2E Test Infra: Show3D Singapore Secondary Rebuild

## Test Philosophy
- Opaque-box, requirement-driven. Derived from `ORIGINAL_REQUEST.md` and user-facing specifications.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload Testing.
- Zero external package dependencies: utilizes Node v25 native runner (`node:test`, `node:assert`, `--experimental-strip-types`).

## Feature Inventory
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|----------------------|:------:|:------:|:------:|
| 1 | 6 Curriculum Modules | ORIGINAL_REQUEST §R1 | 6 | 6 | ✓ |
| 2 | 18 Visual Concept Slides | ORIGINAL_REQUEST §R1 | 6 | 6 | ✓ |
| 3 | Interactive Co-Design & PARTS Tokens | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 4 | Parametric Levers & Spatial Preview | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 5 | Formative Diagnostic Checks & Feedback | ORIGINAL_REQUEST §R1 | 6 | 6 | ✓ |
| 6 | Digital Badges & Creator Ownership | ORIGINAL_REQUEST §R1, §R3 | 5 | 5 | ✓ |
| 7 | Live Class Monitoring (28 Students, Class 3-Faith) | ORIGINAL_REQUEST §R2 | 6 | 6 | ✓ |
| 8 | Curriculum & GeBIZ Procurement Pack | ORIGINAL_REQUEST §R2, §R5 | 5 | 5 | ✓ |
| 9 | Secondary Research Compliance (PDPA, Port 443, 5k Credits) | ORIGINAL_REQUEST §R5 | 5 | 5 | ✓ |
| 10 | Apple HIG Segregated Role Switching | ORIGINAL_REQUEST §R1, §R2, §R4 | 5 | 5 | ✓ |

## Test Architecture
- **Test Runner**: Native Node.js v25 (`node --test --experimental-strip-types 'tests/**/*.test.ts'`)
- **Invocation**: `npm test`
- **Pass/Fail Semantics**: Exit code 0 indicates all assertion checks pass.
- **Directory Layout**:
  - `tests/unit/curriculum.test.ts`: Module structure, slide counts, key concepts, pro tips, quizzes.
  - `tests/unit/roster.test.ts`: 28 students of Class 3-Faith, help flags, telemetry delta, credit pool.
  - `tests/unit/compliance.test.ts`: PDPA Age 13+, Port 443 readiness, 5,000 credit pool, GeBIZ specs.
  - `tests/e2e/student-flow.test.ts`: Complete student progression through slides, co-design, quiz, badge.
  - `tests/e2e/facilitator-flow.test.ts`: Facilitator mode switching, student card filtering, quotation generation.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Full Student Module 3 Journey | Keynote slides, PARTS tokens, architectural levers, formative check, badge | High |
| 2 | Facilitator Live Classroom Intervention | Cohort telemetry, filtering help flags (Marcus Lee & Lucas Teo), acknowledging student | Medium |
| 3 | Turnkey GeBIZ Procurement Audit | 10-hour syllabus, MOE Four Learns rubrics, GeBIZ PDF pack generation, budget compliance | Medium |
| 4 | School PLD Port 443 & PDPA Safety Audit | Single-cohort SSO, zero model training assertion, no firewall exceptions | High |
| 5 | Anti-Cognitive Offloading Intent Scorecard | Human intentionality calculation, 94% Human Directed certificate generation | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature (50+ test cases)
- Tier 2: ≥5 per feature (50+ test cases)
- Tier 3: pairwise coverage of major feature interactions (15+ test cases)
- Tier 4: ≥5 realistic application scenarios (5 test cases)
- Total planned test cases: 120+ assertions
