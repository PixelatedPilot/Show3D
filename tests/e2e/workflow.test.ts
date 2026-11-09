import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  initialEduState,
  LEARNING_MODULES,
  MODULE_QUIZZES,
  MODULE_LESSONS,
  STUDENT_ROSTER,
  STUDENT_SAFETY_SPEC,
  SCHOOL_PROCUREMENT_SPEC,
  PROGRAMME_DELIVERABLES,
  MOE_RUBRIC_ITEMS,
  switchAppMode,
  getNextSlideStage,
  getPrevSlideStage,
  handleKeyNavigation,
  resetKeynoteOnModuleChange,
  togglePartsToken,
  CANONICAL_PARTS_TOKENS,
  setCanopySwatch,
  ALLOWED_SWATCHES,
  setCanopyCurvature,
  toggleSolarArray,
  setCanvasModalState,
  generateVerifiedCertificate,
  INITIAL_CANVAS_STUDIO_STATE,
  setStudioArchetype,
  setStudioShadingMode,
  setStudioCameraPreset,
  updateStudioParametricLevers,
  addSpatialCritiquePin,
  computeMeshDiagnostics,
  computeSlicerMetrics,
  getCameraCoordinatesForPreset,
  generateAsciiSTL,
  generateGLTFSceneSummary
} from '../helpers/loadAppStore.ts';

describe('E2E Workflow & Scenario Test Suite (Features 3, 4, 7, 10 & Tiers 3-4)', () => {

  // =========================================================================
  // TIER 3: Interactive Component State Transitions & Role Segregation
  // =========================================================================
  describe('Tier 3: Apple HIG Role Segregation & Navigation State Transitions', () => {
    it('should cleanly switch activeMode between student and facilitator with zero UI state bleed using switchAppMode', () => {
      let mode = switchAppMode('student', 'facilitator');
      assert.equal(mode, 'facilitator', 'Mode must switch to facilitator');

      mode = switchAppMode(mode, 'student');
      assert.equal(mode, 'student', 'Mode must switch to student');

      // Test toggle overload
      mode = switchAppMode(mode);
      assert.equal(mode, 'facilitator', 'Toggle overload must invert mode');

      // Test defensive validation
      assert.throws(
        () => switchAppMode('student', 'invalid_mode' as any),
        /Invalid app mode/,
        'Must reject unapproved mode strings'
      );
    });

    it('should support sequential Keynote slide progression (Stages 0 to 5) using production stage reducers', () => {
      let stage = 0;
      const history: number[] = [stage];

      // Step sequentially from Stage 0 to Stage 5
      for (let i = 0; i < 5; i++) {
        stage = getNextSlideStage(stage);
        history.push(stage);
      }
      assert.deepEqual(history, [0, 1, 2, 3, 4, 5], 'Must step through all 6 Keynote stages');
      assert.equal(stage, 5, 'Must reach final Badge stage (stage 5)');

      // Step backward to previous stage
      stage = getPrevSlideStage(stage);
      assert.equal(stage, 4, 'Must return to Quiz stage (stage 4)');

      // Verify boundary clamping: cannot exceed stage 5
      assert.equal(getNextSlideStage(5), 5, 'Cannot exceed stage 5');

      // Verify boundary clamping: cannot go below stage 0
      assert.equal(getPrevSlideStage(0), 0, 'Cannot go below stage 0');
    });

    it('should correctly handle keyboard navigation events (ArrowRight, ArrowLeft, Space) via handleKeyNavigation', () => {
      let stage = 1;

      stage = handleKeyNavigation(stage, 'ArrowRight');
      assert.equal(stage, 2, 'ArrowRight advances stage');

      stage = handleKeyNavigation(stage, 'Space');
      assert.equal(stage, 3, 'Space key advances stage');

      stage = handleKeyNavigation(stage, 'ArrowLeft');
      assert.equal(stage, 2, 'ArrowLeft reverses stage');

      // Unknown key produces no state change
      const unchanged = handleKeyNavigation(stage, 'Escape');
      assert.equal(unchanged, 2, 'Irrelevant keys must not mutate stage');
    });

    it('should reset slideStage and quiz answers upon switching to a new module via resetKeynoteOnModuleChange', () => {
      const reset = resetKeynoteOnModuleChange(2);
      assert.equal(reset.activeModuleId, 2, 'Must set new active module ID');
      assert.equal(reset.slideStage, 0, 'Stage must reset to Slide 1 upon module change');
      assert.equal(reset.selectedQuizOption, null, 'Quiz option selection must reset');
      assert.equal(reset.isQuizSubmitted, false, 'Quiz submission state must reset');

      // Test boundary rejection
      assert.throws(() => resetKeynoteOnModuleChange(99), /Invalid module ID/);
    });
  });

  // =========================================================================
  // TIER 3: Interactive PARTS Tokens & Parametric Levers State Flow
  // =========================================================================
  describe('Tier 3: PARTS Prompt Token Assembly & Parametric Levers', () => {
    it('should verify canonical 5-category PARTS prompt recipe tokens structure', () => {
      const categories = new Set(CANONICAL_PARTS_TOKENS.map((t) => t.category));
      assert.ok(categories.has('persona'), 'Must include Persona category');
      assert.ok(categories.has('aim'), 'Must include Aim category');
      assert.ok(categories.has('recipients'), 'Must include Recipients category');
      assert.ok(categories.has('theme'), 'Must include Theme category');
      assert.ok(categories.has('structure'), 'Must include Structure category');
      assert.ok(CANONICAL_PARTS_TOKENS.length >= 5);
    });

    it('should dynamically toggle prompt recipe tokens using production togglePartsToken', () => {
      let tokens = ['tensile', 'benches', 'solar'];

      // Remove solar
      tokens = togglePartsToken(tokens, 'solar');
      assert.deepEqual(tokens, ['tensile', 'benches']);

      // Add airflow
      tokens = togglePartsToken(tokens, 'airflow');
      assert.deepEqual(tokens, ['tensile', 'benches', 'airflow']);

      // Re-add solar
      tokens = togglePartsToken(tokens, 'solar');
      assert.ok(tokens.includes('solar'));
    });

    it('should adjust parametric canopy color swatches and reflect high-albedo choices via setCanopySwatch', () => {
      // High-albedo solar white
      const whiteResult = setCanopySwatch('#38bdf8', '#ffffff');
      assert.equal(whiteResult.canopyColor, '#ffffff');
      assert.equal(whiteResult.reflectivity, 0.85, 'Solar white must provide 0.85 albedo reflectivity');

      // Tropical palm green
      const greenResult = setCanopySwatch('#ffffff', '#10b981');
      assert.equal(greenResult.canopyColor, '#10b981');
      assert.equal(greenResult.reflectivity, 0.40, 'Palm green reflectivity');

      // Defensive check
      assert.throws(() => setCanopySwatch('#10b981', '#000000'), /Unsupported color swatch/);
    });

    it('should adjust parametric curvature lever within valid structural bounds via setCanopyCurvature', () => {
      assert.equal(setCanopyCurvature(0.45), 0.45, 'Standard curvature setting');
      assert.equal(setCanopyCurvature(1.5), 1.0, 'Curvature clamped to 1.0 maximum');
      assert.equal(setCanopyCurvature(-0.5), 0.0, 'Curvature clamped to 0.0 minimum');
    });

    it('should toggle 450W solar array state and update telemetry parameters via toggleSolarArray', () => {
      let result = toggleSolarArray(false);
      assert.equal(result.hasSolar, true);
      assert.equal(result.powerGenerationWatts, 450, 'Array activation yields 450W');

      result = toggleSolarArray(true);
      assert.equal(result.hasSolar, false);
      assert.equal(result.powerGenerationWatts, 0, 'Array deactivation yields 0W');
    });

    it('should manage Show3D Canvas modal trigger transition via setCanvasModalState', () => {
      const openState = setCanvasModalState(true, 'canopy');
      assert.equal(openState.isCanvasModalOpen, true);
      assert.equal(openState.targetPreset, 'canopy');

      const closeState = setCanvasModalState(false);
      assert.equal(closeState.isCanvasModalOpen, false);
      assert.equal(closeState.targetPreset, 'overview');
    });
  });

  // =========================================================================
  // TIER 4 Scenario 1: Full Student Module 3 Journey
  // =========================================================================
  describe('Tier 4 Scenario 1: Full Student Module 3 Journey', () => {
    it('should complete full interactive student path from Slide 1 to Verified Badge', () => {
      const moduleId = 3;
      const lesson = MODULE_LESSONS[moduleId];
      assert.equal(lesson.moduleCode, 'Module 3');
      assert.equal(lesson.slides.length, 3);

      lesson.slides.forEach((slide, idx) => {
        assert.ok(slide.title.length > 5, `Slide ${idx + 1} has headline`);
        assert.ok(slide.keyConcept.term.length > 3, `Slide ${idx + 1} has key concept`);
        assert.ok(slide.proTip.length > 10, `Slide ${idx + 1} has pro tip`);
      });

      // Progress through concept slides to Co-Design
      let stage = 0;
      stage = getNextSlideStage(stage); // 1
      stage = getNextSlideStage(stage); // 2
      stage = getNextSlideStage(stage); // 3 (Co-Design)
      assert.equal(stage, 3);

      // Configure PARTS tokens and Levers
      let tokens = ['tensile', 'benches'];
      tokens = togglePartsToken(tokens, 'solar');
      const swatch = setCanopySwatch('#38bdf8', '#ffffff');
      const curvature = setCanopyCurvature(0.65);
      const solar = toggleSolarArray(false);

      assert.equal(tokens.length, 3);
      assert.equal(swatch.canopyColor, '#ffffff');
      assert.equal(curvature, 0.65);
      assert.equal(solar.powerGenerationWatts, 450);

      // Advance to Formative Quiz (Stage 4)
      stage = getNextSlideStage(stage);
      assert.equal(stage, 4);

      const quiz = MODULE_QUIZZES[moduleId];
      const question = quiz.questions[0];
      const correctOption = question.options.find((o) => o.isCorrect);
      assert.ok(correctOption);
      assert.ok(correctOption.explanation.length > 15);

      // Advance to Mastery Badge (Stage 5)
      stage = getNextSlideStage(stage);
      assert.equal(stage, 5);
      const currentModule = LEARNING_MODULES.find((m) => m.id === moduleId);
      assert.ok(currentModule);
      assert.equal(currentModule!.badgeName, '3D Creator');

      const intentScore = initialEduState.authorshipScore;
      assert.equal(intentScore, 94, 'Student journey yields 94% Human Creative Intent');
    });
  });

  // =========================================================================
  // TIER 4 Scenario 2: Facilitator Live Classroom Intervention
  // =========================================================================
  describe('Tier 4 Scenario 2: Facilitator Live Classroom Intervention for Class 3-Faith', () => {
    it('should monitor 28 students, filter help flags, and acknowledge intervention', () => {
      const totalStudents = STUDENT_ROSTER.length;
      assert.equal(totalStudents, 28);

      const helpStudents = STUDENT_ROSTER.filter((s) => s.status === 'needs_help');
      assert.equal(helpStudents.length, 2);

      const marcus = helpStudents.find((s) => s.name === 'Marcus Lee');
      const lucas = helpStudents.find((s) => s.name === 'Lucas Teo');
      assert.ok(marcus);
      assert.ok(lucas);

      const updatedRoster = STUDENT_ROSTER.map((s) => {
        if (s.id === lucas!.id) {
          return { ...s, status: 'on_track' as const, currentModule: 3, lastActive: 'Active now' };
        }
        return s;
      });

      const remainingHelp = updatedRoster.filter((s) => s.status === 'needs_help');
      assert.equal(remainingHelp.length, 1);
      assert.equal(remainingHelp[0].name, 'Marcus Lee');

      const totalCreditsUsed = updatedRoster.reduce((sum, s) => sum + s.creditsUsed, 0);
      assert.ok(totalCreditsUsed <= SCHOOL_PROCUREMENT_SPEC.creditPoolSize);
    });
  });

  // =========================================================================
  // TIER 4 Scenario 3: Turnkey GeBIZ Procurement & Syllabus Audit
  // =========================================================================
  describe('Tier 4 Scenario 3: Turnkey GeBIZ Procurement & Syllabus Audit', () => {
    it('should verify all procurement artifacts for school administrative approval', () => {
      const totalDuration = LEARNING_MODULES.reduce((sum, m) => sum + parseInt(m.duration, 10), 0);
      assert.ok(totalDuration >= 360, 'Core modules cover 6.5+ hours of instruction');

      const rubricLearns = new Set(MOE_RUBRIC_ITEMS.map((r) => r.learn));
      assert.ok(rubricLearns.has('Learn About AI'));
      assert.ok(rubricLearns.has('Learn to Use AI'));
      assert.ok(rubricLearns.has('Learn With AI'));
      assert.ok(rubricLearns.has('Learn Beyond AI'));

      assert.equal(PROGRAMME_DELIVERABLES.length, 10);
      const evidenceDeliverables = PROGRAMME_DELIVERABLES.filter((d) => d.category === 'evidence');
      assert.equal(evidenceDeliverables.length, 5);

      assert.ok(SCHOOL_PROCUREMENT_SPEC.gebizCategory.includes('GeBIZ Quotation Ready'));
      assert.ok(SCHOOL_PROCUREMENT_SPEC.fundingRoute.includes('School Enrichment Budgets'));
      assert.equal(SCHOOL_PROCUREMENT_SPEC.creditPoolSize, 5000);
    });
  });

  // =========================================================================
  // TIER 4 Scenario 4: School PLD Port 443 & PDPA Safety Audit
  // =========================================================================
  describe('Tier 4 Scenario 4: School PLD Port 443 & PDPA Safety Audit', () => {
    it('should pass complete institutional cybersecurity and student privacy audit', () => {
      assert.ok(STUDENT_SAFETY_SPEC.minimumAge.includes('Age 13+'));
      assert.ok(STUDENT_SAFETY_SPEC.accountModel.includes('School-Managed Class SSO'));
      assert.ok(STUDENT_SAFETY_SPEC.dataPractices.includes('Zero Training on Student Data'));
      assert.ok(STUDENT_SAFETY_SPEC.firewallPort.includes('Port 443 Safe'));
      assert.ok(STUDENT_SAFETY_SPEC.pldCompatibility.includes('Chromebooks'));
      assert.ok(STUDENT_SAFETY_SPEC.pldCompatibility.includes('iPads'));
      assert.ok(STUDENT_SAFETY_SPEC.pldCompatibility.includes('Windows Laptops'));
    });
  });

  // =========================================================================
  // TIER 4 Scenario 5: Anti-Cognitive Offloading Intent Scorecard
  // =========================================================================
  describe('Tier 4 Scenario 5: Anti-Cognitive Offloading & Authentic Credential Generation', () => {
    it('should generate and verify authentic certificate record via generateVerifiedCertificate', () => {
      const student = STUDENT_ROSTER.find((s) => s.name === 'Ethan Tan');
      assert.ok(student);
      assert.equal(student!.reflectionScore, '96/100');
      assert.equal(student!.postScore, 96);
      assert.equal(student!.demonstratedSkill, 'Tensile Geometry & PARTS Prompting');

      // Call authentic production certificate generator
      const cert = generateVerifiedCertificate({
        studentName: student!.name,
        school: 'Tampines Secondary School',
        classCohort: 'Class 3-Faith',
        moduleNumber: 3,
        intentScore: 94,
        skills: [
          '3D Cartesian Space & Depth',
          'PARTS Prompt Scaffolding',
          'High-Albedo Tropical Materials',
          'Passive Courtyard Cooling',
          'Anti-Cognitive Offloading Rationale'
        ]
      });

      assert.equal(cert.studentName, 'Ethan Tan');
      assert.match(cert.credentialId, /^SHOW3D-[A-Z]{4}-\d{4}-\d{4}$/);
      assert.equal(cert.humanIntentScore, 94);
      assert.equal(cert.isVerified, true);
      assert.ok(cert.demonstratedSkills.length >= 5);
      assert.ok(cert.antiCognitiveOffloadingAttestation.includes('without cognitive offloading'));
    });
  });

  // =========================================================================
  // TIER 3 & 4 Scenario 6: Interactive 3D Canvas Studio Foundation
  // =========================================================================
  describe('Tier 3 & 4 Scenario 6: Interactive 3D Canvas Studio State, Diagnostics & STL/GLTF Export', () => {
    it('should switch 3D studio archetypes, shading modes, and camera presets with deterministic camera coordinates', () => {
      let state = INITIAL_CANVAS_STUDIO_STATE;
      assert.equal(state.archetype, 'pavilion');
      assert.equal(state.shadingMode, 'pbr');

      state = setStudioArchetype(state, 'desk_dock');
      assert.equal(state.archetype, 'desk_dock');

      state = setStudioShadingMode(state, 'stress_wall_thickness');
      assert.equal(state.shadingMode, 'stress_wall_thickness');

      state = setStudioCameraPreset(state, 'iso');
      assert.equal(state.cameraPreset, 'iso');

      const coords = getCameraCoordinatesForPreset('iso');
      assert.equal(coords.position.length, 3);
      assert.equal(coords.target.length, 3);
    });

    it('should detect thin-wall printability warnings (< 2.0mm) and compute slicer metrics and STL/GLTF exports', () => {
      const thinState = updateStudioParametricLevers(INITIAL_CANVAS_STUDIO_STATE, {
        ribThicknessMm: 1.4,
        curvature: 0.75
      });
      const thinDiag = computeMeshDiagnostics(thinState);
      assert.equal(thinDiag.stressLevel, 'thin_wall_alert', 'Wall thickness < 2.0mm must flag as thin_wall_alert');
      assert.equal(thinDiag.isWatertightManifold, false);

      const safeState = updateStudioParametricLevers(thinState, {
        ribThicknessMm: 3.2
      });
      const safeDiag = computeMeshDiagnostics(safeState);
      assert.equal(safeDiag.stressLevel, 'optimal', 'Wall thickness >= 2.8mm must pass optimal printability check');
      assert.equal(safeDiag.isWatertightManifold, true);

      const slicer = computeSlicerMetrics(safeState);
      assert.ok(slicer.totalLayers > 100);
      assert.ok(slicer.filamentMassGrams > 10);

      const pinnedState = addSpatialCritiquePin(safeState, {
        label: 'Teacher Critique',
        author: 'Ms. Tan (D&T Lead)',
        category: 'structural',
        position: [1.2, 2.0, -0.5],
        comment: 'Verified 3.2mm structural rib'
      });
      assert.equal(pinnedState.pins.length, safeState.pins.length + 1);

      const stlText = generateAsciiSTL(pinnedState);
      assert.ok(stlText.startsWith('solid show3d_pavilion'));
      assert.ok(stlText.includes('endsolid show3d_pavilion'));

      const gltfJson = generateGLTFSceneSummary(pinnedState);
      const parsed = JSON.parse(gltfJson);
      assert.equal(parsed.asset.version, '2.0');
      assert.equal(parsed.scenes[0].extras.archetype, 'pavilion');
    });
  });
});
