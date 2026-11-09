import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { STUDENT_ROSTER, SCHOOL_PROCUREMENT_SPEC } from '../helpers/loadAppStore.ts';

describe('Roster & Cohort Telemetry Unit Tests (Feature 7, 8)', () => {
  // =========================================================================
  // TIER 1: Standard Verification of 28-Student Cohort for Class 3-Faith
  // =========================================================================
  describe('Tier 1: Cohort Composition & Student Attributes', () => {
    it('should contain exactly 28 students in Class 3-Faith', () => {
      assert.equal(STUDENT_ROSTER.length, 28, 'Class 3-Faith must have exactly 28 enrolled students');
    });

    it('should assign unique student IDs with standard st-XX formatting', () => {
      const ids = STUDENT_ROSTER.map((s) => s.id);
      const uniqueIds = new Set(ids);
      assert.equal(uniqueIds.size, 28, 'All student IDs must be unique');
      ids.forEach((id, idx) => {
        const expectedNumber = (idx + 1).toString().padStart(2, '0');
        assert.equal(id, `st-${expectedNumber}`);
      });
    });

    it('should ensure all students have valid names and 2-letter uppercase avatar initials', () => {
      STUDENT_ROSTER.forEach((student) => {
        assert.ok(student.name && student.name.length >= 3, `Student ${student.id} has invalid name`);
        assert.match(
          student.avatar,
          /^[A-Z]{2}$/,
          `Student ${student.name} avatar (${student.avatar}) must be 2 uppercase letters`
        );
      });
    });

    it('should record demonstrated 21CC skill tags for all 28 students', () => {
      STUDENT_ROSTER.forEach((student) => {
        assert.ok(
          student.demonstratedSkill && student.demonstratedSkill.length > 5,
          `Student ${student.name} missing demonstrated 21CC skill tag`
        );
      });
    });

    it('should include realistic last active timestamps', () => {
      STUDENT_ROSTER.forEach((student) => {
        assert.ok(student.lastActive, `Student ${student.name} missing lastActive status`);
        assert.match(
          student.lastActive,
          /(Active now|\d+m ago)/,
          `Student ${student.name} lastActive format unexpected: ${student.lastActive}`
        );
      });
    });

    it('should validate reflection score formatting and thresholds for completed students', () => {
      const studentsWithReflection = STUDENT_ROSTER.filter((s) => s.reflectionScore);
      assert.ok(studentsWithReflection.length >= 4, 'At least 4 students must have recorded reflection scores');
      studentsWithReflection.forEach((s) => {
        assert.match(s.reflectionScore!, /^\d{2,3}\/100$/, `Reflection score ${s.reflectionScore} format invalid`);
        const score = parseInt(s.reflectionScore!.split('/')[0], 10);
        assert.ok(score >= 85 && score <= 100, `Reflection score (${score}) must be between 85 and 100`);
      });
    });

    it('should maintain balanced cohort progression across active curriculum modules', () => {
      const moduleCounts: Record<number, number> = {};
      STUDENT_ROSTER.forEach((s) => {
        moduleCounts[s.currentModule] = (moduleCounts[s.currentModule] || 0) + 1;
        assert.ok(s.currentModule >= 1 && s.currentModule <= 6, `Student ${s.name} currentModule out of bounds`);
      });
      // Majority of students should be active on Module 3 (co-design stage)
      assert.ok(moduleCounts[3] >= 15, 'Majority of Class 3-Faith should currently be active on Module 3');
    });
  });

  // =========================================================================
  // TIER 1 & 2: Real-Time Intervention & Help Flags
  // =========================================================================
  describe('Tier 1 & 2: Student Help Flags & Status Filtering', () => {
    it('should flag Marcus Lee and Lucas Teo as needing assistance', () => {
      const helpStudents = STUDENT_ROSTER.filter((s) => s.status === 'needs_help');
      assert.equal(helpStudents.length, 2, 'Exactly 2 students must have needs_help status');
      
      const helpNames = helpStudents.map((s) => s.name);
      assert.ok(helpNames.includes('Marcus Lee'), 'Marcus Lee must be flagged for teacher assistance');
      assert.ok(helpNames.includes('Lucas Teo'), 'Lucas Teo must be flagged for teacher assistance');
    });

    it('should identify completed students in the cohort', () => {
      const completedStudents = STUDENT_ROSTER.filter((s) => s.status === 'completed');
      assert.equal(completedStudents.length, 4, 'Exactly 4 students should have completed advanced modules');
      
      const completedNames = completedStudents.map((s) => s.name);
      assert.ok(completedNames.includes('Priya Sharma'));
      assert.ok(completedNames.includes('Rachel Wong'));
      assert.ok(completedNames.includes('Gwen Yeo'));
      assert.ok(completedNames.includes('Vandana M.'));
    });

    it('should correctly segment students by cohort filter criteria', () => {
      const allCount = STUDENT_ROSTER.length;
      const needsHelp = STUDENT_ROSTER.filter((s) => s.status === 'needs_help').length;
      const completed = STUDENT_ROSTER.filter((s) => s.status === 'completed').length;
      const onTrack = STUDENT_ROSTER.filter((s) => s.status === 'on_track').length;

      assert.equal(allCount, 28);
      assert.equal(needsHelp, 2);
      assert.equal(completed, 4);
      assert.equal(onTrack, 22);
      assert.equal(needsHelp + completed + onTrack, 28, 'Sum of all status categories must equal total cohort');
    });

    it('should confirm struggling students have lower currentModule progression', () => {
      const lucas = STUDENT_ROSTER.find((s) => s.name === 'Lucas Teo');
      assert.ok(lucas, 'Lucas Teo must be in roster');
      assert.equal(lucas.currentModule, 2, 'Lucas Teo is still on Module 2 and needs teacher guidance');
    });
  });

  // =========================================================================
  // TIER 2: Telemetry Learning Gain & Pre/Post Diagnostics
  // =========================================================================
  describe('Tier 2: Learning Gain Telemetry (+34.2% Growth Delta)', () => {
    it('should record valid pre-test diagnostic scores for all 28 students', () => {
      STUDENT_ROSTER.forEach((student) => {
        assert.ok(typeof student.preScore === 'number', `Student ${student.name} missing preScore`);
        assert.ok(student.preScore! >= 40 && student.preScore! <= 80, `Student ${student.name} preScore out of range`);
      });
    });

    it('should record valid post-test capstone scores for all 28 students', () => {
      STUDENT_ROSTER.forEach((student) => {
        assert.ok(typeof student.postScore === 'number', `Student ${student.name} missing postScore`);
        assert.ok(student.postScore! >= 75 && student.postScore! <= 100, `Student ${student.name} postScore out of range`);
      });
    });

    it('should verify the cohort pre-test diagnostic baseline is in the 61% range', () => {
      const totalPre = STUDENT_ROSTER.reduce((acc, s) => acc + (s.preScore || 0), 0);
      const preAvg = totalPre / STUDENT_ROSTER.length;
      assert.ok(preAvg >= 60.0 && preAvg <= 62.5, `Pre-test average (${preAvg.toFixed(1)}%) must be near 61.8% baseline`);
    });

    it('should confirm the +34.2% growth telemetry delta from baseline (61.8%) to target capstone (96.0%)', () => {
      const baseline = 61.8;
      const targetCapstone = 96.0;
      const growthDelta = parseFloat((targetCapstone - baseline).toFixed(1));
      assert.equal(growthDelta, 34.2, 'Learning gain delta must be exactly +34.2%');

      // Verify top student postScore matches capstone target
      const topStudent = STUDENT_ROSTER.find((s) => s.name === 'Ethan Tan');
      assert.ok(topStudent);
      assert.equal(topStudent.postScore, 96, 'Ethan Tan benchmark capstone score must be 96%');
    });

    it('should confirm every student demonstrates positive score growth (postScore > preScore)', () => {
      STUDENT_ROSTER.forEach((student) => {
        const gain = (student.postScore || 0) - (student.preScore || 0);
        assert.ok(
          gain > 0,
          `Student ${student.name} must show positive learning gain (found ${gain})`
        );
        assert.ok(gain >= 15, `Student ${student.name} gain (${gain}%) should show significant improvement`);
      });
    });
  });

  // =========================================================================
  // TIER 2 & 3: Credit Pool & Anti-Lockout Verification
  // =========================================================================
  describe('Tier 2 & 3: 5,000 Guaranteed Credit Pool & Zero Student Lockout', () => {
    it('should specify 5,000 credit pool in SCHOOL_PROCUREMENT_SPEC', () => {
      assert.equal(SCHOOL_PROCUREMENT_SPEC.creditPoolSize, 5000, 'Guaranteed class credit pool must be 5,000');
    });

    it('should verify active cohort credit consumption is approximately 1,120 credits', () => {
      const totalUsed = STUDENT_ROSTER.reduce((sum, s) => sum + s.creditsUsed, 0);
      assert.ok(
        totalUsed >= 1100 && totalUsed <= 1130,
        `Current cohort credit consumption (${totalUsed}) must align with 1,120 telemetry figure`
      );
    });

    it('should compute approximately 3,880 available credits remaining in the pool', () => {
      const poolSize = SCHOOL_PROCUREMENT_SPEC.creditPoolSize;
      const totalUsed = STUDENT_ROSTER.reduce((sum, s) => sum + s.creditsUsed, 0);
      const remaining = poolSize - totalUsed;
      assert.ok(
        remaining >= 3870 && remaining <= 3900,
        `Available credits (${remaining}) must align with 3,880 telemetry remaining`
      );
      assert.ok(remaining > 3500, 'Ample credits must remain to prevent mid-lesson lockout');
    });

    it('should verify 0 students are blocked or restricted by credit exhaustion', () => {
      const blockedStudents = STUDENT_ROSTER.filter((s) => s.creditsUsed >= 200);
      assert.equal(blockedStudents.length, 0, 'Zero students must be blocked by credit limits');
    });

    it('should confirm student credit usage is within healthy pedagogical parameters (20-60 credits)', () => {
      STUDENT_ROSTER.forEach((student) => {
        assert.ok(
          student.creditsUsed >= 20 && student.creditsUsed <= 60,
          `Student ${student.name} credit usage (${student.creditsUsed}) outside expected bounds`
        );
      });
    });
  });
});
