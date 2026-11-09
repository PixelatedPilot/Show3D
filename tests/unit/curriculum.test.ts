import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LEARNING_MODULES, MODULE_QUIZZES, MODULE_LESSONS } from '../helpers/loadAppStore.ts';

describe('Curriculum Unit Tests (Feature 1, 2, 5, 6)', () => {
  // =========================================================================
  // TIER 1: Standard Unit Verification for 6 Curriculum Modules
  // =========================================================================
  describe('Tier 1: 6 Curriculum Modules Structure & MOE Four Learns Alignment', () => {
    it('should define exactly 6 curriculum modules in LEARNING_MODULES', () => {
      assert.equal(LEARNING_MODULES.length, 6, 'Curriculum must contain exactly 6 modules');
    });

    it('should assign sequential IDs from 1 to 6 with standard codes', () => {
      const ids = LEARNING_MODULES.map((m) => m.id);
      assert.deepEqual(ids, [1, 2, 3, 4, 5, 6]);

      LEARNING_MODULES.forEach((m, idx) => {
        assert.equal(m.code, `Module ${idx + 1}`);
        assert.ok(m.title && m.title.trim().length > 0, `Module ${m.id} must have a non-empty title`);
      });
    });

    it('should map every module to a valid MOE Four Learns pedagogical domain', () => {
      const validDomains = new Set([
        'Learn About AI',
        'Learn to Use AI',
        'Learn With AI',
        'Learn Beyond AI'
      ]);

      LEARNING_MODULES.forEach((m) => {
        assert.ok(
          validDomains.has(m.moeLearn),
          `Module ${m.id} (${m.title}) has invalid MOE domain: ${m.moeLearn}`
        );
      });
    });

    it('should define realistic lesson durations for secondary school periods', () => {
      LEARNING_MODULES.forEach((m) => {
        assert.match(m.duration, /^\d+\s*min$/, `Module ${m.id} duration must be formatted in minutes (e.g. 60 min)`);
        const minutes = parseInt(m.duration, 10);
        assert.ok(minutes >= 45 && minutes <= 120, `Module ${m.id} duration (${minutes}m) must be within 45-120 minutes`);
      });
    });

    it('should include key skills, student challenge, and learning objectives for each module', () => {
      LEARNING_MODULES.forEach((m) => {
        assert.ok(m.keySkill && m.keySkill.length > 5, `Module ${m.id} missing key skill description`);
        assert.ok(m.studentChallenge && m.studentChallenge.length > 10, `Module ${m.id} missing student challenge`);
        assert.ok(Array.isArray(m.learningObjectives) && m.learningObjectives.length >= 3, `Module ${m.id} must define at least 3 learning objectives`);
      });
    });

    it('should assign a distinct digital badge title to each module', () => {
      const badges = LEARNING_MODULES.map((m) => m.badgeName);
      const uniqueBadges = new Set(badges);
      assert.equal(uniqueBadges.size, 6, 'All 6 badges must be distinct');
      assert.ok(badges.includes('Spatial Scout'), 'Module 1 badge must be Spatial Scout');
      assert.ok(badges.includes('Prompt Architect'), 'Module 2 badge must be Prompt Architect');
    });
  });

  // =========================================================================
  // TIER 1 & 2: 18 Visual Concept Slides Verification
  // =========================================================================
  describe('Tier 1 & 2: 18 Visual Concept Slides (3 Slides per Module)', () => {
    it('should contain lesson entries for all 6 module IDs in MODULE_LESSONS', () => {
      const lessonKeys = Object.keys(MODULE_LESSONS).map(Number);
      assert.equal(lessonKeys.length, 6);
      assert.deepEqual(lessonKeys.sort((a, b) => a - b), [1, 2, 3, 4, 5, 6]);
    });

    it('should contain exactly 3 visual concept slides per module (18 total)', () => {
      let totalSlides = 0;
      for (let i = 1; i <= 6; i++) {
        const lesson = MODULE_LESSONS[i];
        assert.ok(lesson, `MODULE_LESSONS[${i}] must exist`);
        assert.equal(
          lesson.slides.length,
          3,
          `Module ${i} must have exactly 3 visual concept slides (found ${lesson.slides.length})`
        );
        totalSlides += lesson.slides.length;
      }
      assert.equal(totalSlides, 18, 'There must be exactly 18 slides across the curriculum');
    });

    it('should provide bold headline, subtitle, and multi-paragraph explanation for every slide', () => {
      for (let i = 1; i <= 6; i++) {
        const lesson = MODULE_LESSONS[i];
        lesson.slides.forEach((slide, sIdx) => {
          assert.ok(slide.title && slide.title.length > 5, `Module ${i} slide ${sIdx + 1} headline too short`);
          assert.ok(slide.subtitle && slide.subtitle.length > 10, `Module ${i} slide ${sIdx + 1} subtitle too short`);
          assert.ok(
            Array.isArray(slide.paragraphs) && slide.paragraphs.length >= 2,
            `Module ${i} slide ${sIdx + 1} must have at least 2 explanatory paragraphs`
          );
        });
      }
    });

    it('should provide a prominent Key Concept card with term and definition on every slide', () => {
      for (let i = 1; i <= 6; i++) {
        const lesson = MODULE_LESSONS[i];
        lesson.slides.forEach((slide, sIdx) => {
          assert.ok(slide.keyConcept, `Module ${i} slide ${sIdx + 1} missing keyConcept card`);
          assert.ok(
            slide.keyConcept.term && slide.keyConcept.term.length > 3,
            `Module ${i} slide ${sIdx + 1} keyConcept.term must be substantive`
          );
          assert.ok(
            slide.keyConcept.definition && slide.keyConcept.definition.length > 20,
            `Module ${i} slide ${sIdx + 1} keyConcept.definition must be substantive (>20 chars)`
          );
        });
      }
    });

    it('should include a speaker-note style Pro Tip on every visual slide', () => {
      for (let i = 1; i <= 6; i++) {
        const lesson = MODULE_LESSONS[i];
        lesson.slides.forEach((slide, sIdx) => {
          assert.ok(
            slide.proTip && slide.proTip.length > 15,
            `Module ${i} slide ${sIdx + 1} must have an actionable pro tip (>15 chars)`
          );
        });
      }
    });

    it('should provide key takeaways for each module review slide', () => {
      for (let i = 1; i <= 6; i++) {
        const lesson = MODULE_LESSONS[i];
        assert.ok(
          Array.isArray(lesson.keyTakeaways) && lesson.keyTakeaways.length >= 3,
          `Module ${i} must provide at least 3 key takeaways`
        );
      }
    });

    it('should adhere to Apple HIG copywriting by eliminating complex 3D CAD jargon in student slides', () => {
      const prohibitedJargon = ['quaternion', 'euler angle', 'transform matrix', 'affine transformation', 'b-spline basis'];
      for (let i = 1; i <= 6; i++) {
        const lesson = MODULE_LESSONS[i];
        lesson.slides.forEach((slide, sIdx) => {
          const fullText = `${slide.title} ${slide.subtitle} ${slide.paragraphs.join(' ')}`.toLowerCase();
          prohibitedJargon.forEach((jargon) => {
            assert.ok(
              !fullText.includes(jargon),
              `Module ${i} slide ${sIdx + 1} contains prohibited CAD jargon: "${jargon}"`
            );
          });
        });
      }
    });

    it('should assign valid visual diagram types suited for PLD web performance', () => {
      const validVisualTypes = new Set([
        'compare_2d_3d',
        'wireframe_diagram',
        'prompt_formula',
        'pbr_properties',
        'ergonomics_diagram',
        'authorship_matrix'
      ]);
      for (let i = 1; i <= 6; i++) {
        MODULE_LESSONS[i].slides.forEach((slide, sIdx) => {
          assert.ok(
            validVisualTypes.has(slide.visualType),
            `Module ${i} slide ${sIdx + 1} has unrecognized visualType: ${slide.visualType}`
          );
        });
      }
    });
  });

  // =========================================================================
  // TIER 1 & 2: Formative Diagnostic Quizzes & Feedback
  // =========================================================================
  describe('Tier 1 & 2: Formative Diagnostic Quizzes & Explanatory Feedback', () => {
    it('should define formative quiz datasets for all 6 modules', () => {
      for (let i = 1; i <= 6; i++) {
        const quiz = MODULE_QUIZZES[i];
        assert.ok(quiz, `Quiz dataset for Module ${i} must exist in MODULE_QUIZZES`);
        assert.equal(quiz.moduleId, i);
        assert.ok(quiz.questions && quiz.questions.length >= 1, `Quiz ${i} must have at least one question`);
      }
    });

    it('should provide exactly 3 options per diagnostic question', () => {
      for (let i = 1; i <= 6; i++) {
        const quiz = MODULE_QUIZZES[i];
        quiz.questions.forEach((q, qIdx) => {
          assert.equal(
            q.options.length,
            3,
            `Module ${i} Question ${qIdx + 1} must have exactly 3 options (found ${q.options.length})`
          );
        });
      }
    });

    it('should ensure exactly one correct option per question', () => {
      for (let i = 1; i <= 6; i++) {
        const quiz = MODULE_QUIZZES[i];
        quiz.questions.forEach((q, qIdx) => {
          const correctCount = q.options.filter((o) => o.isCorrect).length;
          assert.equal(
            correctCount,
            1,
            `Module ${i} Question ${qIdx + 1} must have exactly 1 correct option (found ${correctCount})`
          );
        });
      }
    });

    it('should verify explanatory feedback is populated for both correct and incorrect choices', () => {
      for (let i = 1; i <= 6; i++) {
        const quiz = MODULE_QUIZZES[i];
        quiz.questions.forEach((q, qIdx) => {
          q.options.forEach((opt, oIdx) => {
            assert.ok(
              opt.explanation && opt.explanation.trim().length > 15,
              `Module ${i} Question ${qIdx + 1} Option ${oIdx + 1} explanation missing or too short`
            );
          });
        });
      }
    });

    it('should verify correct options directly address core Singapore D&T pedagogical topics', () => {
      // Mod 1: Coordinates/Volume vs 2D
      const q1 = MODULE_QUIZZES[1].questions[0];
      const correct1 = q1.options.find((o) => o.isCorrect);
      assert.match(correct1!.text.toLowerCase(), /(volume|depth|z-axis|3d printer|rotate|dimension)/);

      // Mod 2: Structured prompt / functional features
      const q2 = MODULE_QUIZZES[2].questions[0];
      const correct2 = q2.options.find((o) => o.isCorrect);
      assert.match(correct2!.text.toLowerCase(), /(recipe|functional|angle|cable|clear|specif)/);

      // Mod 3: AI as creative co-pilot
      const q3 = MODULE_QUIZZES[3].questions[0];
      const correct3 = q3.options.find((o) => o.isCorrect);
      assert.match(correct3!.text.toLowerCase(), /(co-pilot|collaborat|refine|human|inspect)/);

      // Mod 5: Constructive peer feedback
      const q5 = MODULE_QUIZZES[5].questions[0];
      const correct5 = q5.options.find((o) => o.isCorrect);
      assert.match(correct5!.text.toLowerCase(), /(60°|notch|constructive|praise|suggest|measur)/);

      // Mod 6: Human authorship & intentionality
      const q6 = MODULE_QUIZZES[6].questions[0];
      const correct6 = q6.options.find((o) => o.isCorrect);
      assert.match(correct6!.text.toLowerCase(), /(problem|recipe|material|ergonomic|decision|intentional)/);
    });
  });

  // =========================================================================
  // TIER 3: Combinatorial & Domain Integrity Checks
  // =========================================================================
  describe('Tier 3: Domain Cross-Referencing & Content Consistency', () => {
    it('should ensure consistency between LEARNING_MODULES titles and MODULE_LESSONS titles', () => {
      LEARNING_MODULES.forEach((m) => {
        const lesson = MODULE_LESSONS[m.id];
        assert.equal(lesson.moduleCode, m.code);
        assert.equal(lesson.moduleTitle, m.title);
      });
    });

    it('should ensure all 6 modules have unique visual type representations across slides', () => {
      const allVisualTypes = new Set<string>();
      for (let i = 1; i <= 6; i++) {
        MODULE_LESSONS[i].slides.forEach((s) => {
          allVisualTypes.add(s.visualType);
        });
      }
      assert.ok(allVisualTypes.size >= 5, 'Should utilize at least 5 distinct visual diagram types across the curriculum');
    });

    it('should ensure all slide key concept definitions are distinct with zero accidental duplicate copy', () => {
      const terms = new Set<string>();
      for (let i = 1; i <= 6; i++) {
        MODULE_LESSONS[i].slides.forEach((s) => {
          assert.ok(!terms.has(s.keyConcept.term), `Duplicate Key Concept term found: ${s.keyConcept.term}`);
          terms.add(s.keyConcept.term);
        });
      }
      assert.equal(terms.size, 18, 'All 18 slides must have unique key concepts');
    });
  });
});
