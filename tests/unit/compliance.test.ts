import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDENT_SAFETY_SPEC,
  SCHOOL_PROCUREMENT_SPEC,
  PROGRAMME_DELIVERABLES,
  MOE_RUBRIC_ITEMS
} from '../helpers/loadAppStore.ts';

describe('Institutional Compliance & Secondary Research Unit Tests (Feature 8, 9)', () => {
  // =========================================================================
  // TIER 1: Singapore PDPA & Student Data Protection Compliance
  // =========================================================================
  describe('Tier 1: Singapore PDPA & Student Safety Specifications', () => {
    it('should mandate Age 13+ compliance for Singapore secondary school students', () => {
      assert.ok(
        STUDENT_SAFETY_SPEC.minimumAge.includes('Age 13+'),
        'Must enforce Age 13+ minimum age compliance standard'
      );
      assert.match(
        STUDENT_SAFETY_SPEC.minimumAge,
        /(Secondary 1|13|13\+)/i,
        'Should explicitly reference Singapore Secondary 1-4 bracket'
      );
    });

    it('should specify school-managed SSO with zero personal data collection', () => {
      assert.match(
        STUDENT_SAFETY_SPEC.accountModel,
        /(School-Managed|SSO)/i,
        'Account model must specify school-managed SSO'
      );
      assert.match(
        STUDENT_SAFETY_SPEC.accountModel,
        /No personal student emails or social logins required/i,
        'Must strictly prohibit personal student emails and social media logins'
      );
    });

    it('should enforce strict zero model training on student prompts and 3D geometries', () => {
      assert.match(
        STUDENT_SAFETY_SPEC.dataPractices,
        /Zero Training on Student Data/i,
        'Data practice specification must explicitly mandate Zero Training on Student Data'
      );
      assert.match(
        STUDENT_SAFETY_SPEC.dataPractices,
        /never used to train/i,
        'Must guarantee student prompts and 3D outputs are never used to train foundation models'
      );
    });

    it('should provide automated safe-prompt content moderation', () => {
      assert.match(
        STUDENT_SAFETY_SPEC.contentModeration,
        /Automated Safe-Prompt Filtering/i,
        'Must specify automated safe-prompt filtering'
      );
      assert.match(
        STUDENT_SAFETY_SPEC.contentModeration,
        /blocks inappropriate or harmful/i,
        'Must proactively block inappropriate generations'
      );
    });
  });

  // =========================================================================
  // TIER 1 & 2: MOE Personal Learning Device (PLD) & Network Readiness
  // =========================================================================
  describe('Tier 1 & 2: MOE PLD Port 443 Network Readiness', () => {
    it('should guarantee standard HTTPS Port 443 compliance without firewall exception tickets', () => {
      assert.match(
        STUDENT_SAFETY_SPEC.firewallPort,
        /Port 443/i,
        'Must specify standard HTTPS Port 443'
      );
      assert.match(
        STUDENT_SAFETY_SPEC.firewallPort,
        /No custom WebSockets or blocked network ports/i,
        'Must guarantee zero blocked custom ports or school firewall tickets'
      );
    });

    it('should support standard MOE PLD platforms (Chromebooks, iPads, Windows laptops)', () => {
      assert.match(
        STUDENT_SAFETY_SPEC.pldCompatibility,
        /Chromebooks/i,
        'Must support NDLP standard Chromebooks'
      );
      assert.match(
        STUDENT_SAFETY_SPEC.pldCompatibility,
        /iPads/i,
        'Must support school iPads'
      );
      assert.match(
        STUDENT_SAFETY_SPEC.pldCompatibility,
        /Windows Laptops/i,
        'Must support Windows PLD laptops'
      );
    });
  });

  // =========================================================================
  // TIER 2: GeBIZ Procurement & School Enrichment Budget Guidelines
  // =========================================================================
  describe('Tier 2: GeBIZ Procurement & Honest School Funding Guidelines', () => {
    it('should specify standard GeBIZ category for IT & Digital Media Enrichment Training Services', () => {
      assert.match(
        SCHOOL_PROCUREMENT_SPEC.gebizCategory,
        /IT & Digital Media Enrichment Training Services/i,
        'GeBIZ category must match government procurement standards'
      );
      assert.match(
        SCHOOL_PROCUREMENT_SPEC.gebizCategory,
        /GeBIZ Quotation Ready/i,
        'Must be verified GeBIZ quotation ready'
      );
    });

    it('should route funding through decentralized School Enrichment Budgets', () => {
      assert.match(
        SCHOOL_PROCUREMENT_SPEC.fundingRoute,
        /School Enrichment Budgets/i,
        'Must indicate funding through School Enrichment Budgets'
      );
    });

    it('should accurately explain decentralized school budget authority with no false central grant claims', () => {
      assert.match(
        SCHOOL_PROCUREMENT_SPEC.edusaveContext,
        /(school-level enrichment budget authority|schools confirm allocation internally)/i,
        'Must clarify school-level allocation authority'
      );
      assert.doesNotMatch(
        SCHOOL_PROCUREMENT_SPEC.edusaveContext,
        /(pre-approved central MOE grant|guaranteed ministry subsidy)/i,
        'Must NOT make false claims of pre-approved centralized MOE grants'
      );
    });

    it('should detail Applied Learning Programme (ALP) theme adaptation', () => {
      assert.match(
        SCHOOL_PROCUREMENT_SPEC.alpThemeFit,
        /(STEM|Sustainability|Computing)/i,
        'ALP fit must address authentic themes like STEM, Sustainability, or Computing'
      );
    });

    it('should confirm MOE Opportunity Fund (OF) eligibility for 100% student inclusion', () => {
      assert.match(
        SCHOOL_PROCUREMENT_SPEC.opportunityFundFit,
        /MOE Opportunity Fund support/i,
        'Must cite MOE Opportunity Fund support'
      );
      assert.match(
        SCHOOL_PROCUREMENT_SPEC.opportunityFundFit,
        /lower-income Singapore Citizen students/i,
        'Must target financial support for lower-income Singapore Citizen students'
      );
    });
  });

  // =========================================================================
  // TIER 2 & 3: Turnkey Programme Deliverables & MOE Assessment Rubric
  // =========================================================================
  describe('Tier 2 & 3: 10 Programme Deliverables & MOE Four Learns Alignment', () => {
    it('should define exactly 10 turnkey programme deliverables', () => {
      assert.equal(PROGRAMME_DELIVERABLES.length, 10, 'There must be exactly 10 core programme deliverables');
    });

    it('should divide deliverables into 5 teaching resources and 5 student evidence artifacts', () => {
      const teachingResources = PROGRAMME_DELIVERABLES.filter((d) => d.category === 'teaching');
      const evidenceArtifacts = PROGRAMME_DELIVERABLES.filter((d) => d.category === 'evidence');

      assert.equal(teachingResources.length, 5, 'Must provide 5 teaching deliverables');
      assert.equal(evidenceArtifacts.length, 5, 'Must provide 5 evidence deliverables');
    });

    it('should include required teaching items: Workbook, Prompt Guide, Lesson Plans, Worksheets, Challenges', () => {
      const titles = PROGRAMME_DELIVERABLES.map((d) => d.title);
      assert.ok(titles.includes('Student Workbook'));
      assert.ok(titles.includes('Prompt Engineering Guide'));
      assert.ok(titles.includes('Trainer Lesson Plans'));
      assert.ok(titles.includes('Design-Thinking Worksheets'));
      assert.ok(titles.includes('Weekly Mini Challenges'));
    });

    it('should include required evidence items: Capstone, Rubric, Portfolio, Telemetry, Certificate', () => {
      const titles = PROGRAMME_DELIVERABLES.map((d) => d.title);
      assert.ok(titles.includes('Final Capstone Project'));
      assert.ok(titles.includes('Assessment Rubric'));
      assert.ok(titles.includes('Student Portfolio Record'));
      assert.ok(titles.includes('Teacher Telemetry & Observations'));
      assert.ok(titles.includes('Certificate of Participation & Demonstrated Competency'));
    });

    it('should define MOE "Four Learns" standardized assessment criteria in MOE_RUBRIC_ITEMS', () => {
      assert.ok(MOE_RUBRIC_ITEMS.length >= 4, 'Must define rubrics for all 4 MOE Learns domains');
      const domains = MOE_RUBRIC_ITEMS.map((r) => r.learn);
      assert.ok(domains.includes('Learn About AI'));
      assert.ok(domains.includes('Learn to Use AI'));
      assert.ok(domains.includes('Learn With AI'));
      assert.ok(domains.includes('Learn Beyond AI'));

      MOE_RUBRIC_ITEMS.forEach((rubric) => {
        assert.ok(rubric.desc && rubric.desc.length > 20, `Rubric ${rubric.code} description too short`);
        assert.ok(
          Array.isArray(rubric.criteria) && rubric.criteria.length >= 3,
          `Rubric ${rubric.code} must have at least 3 criteria`
        );
      });
    });

    it('should specify appropriate digital and printable formats across all 10 deliverables', () => {
      PROGRAMME_DELIVERABLES.forEach((del) => {
        assert.ok(del.format && del.format.length > 3, `Deliverable ${del.id} missing format specification`);
        assert.match(
          del.format,
          /(PDF|Guide|Pack|Worksheets|Tasks|Asset|Matrix|Record|Dashboard|Credential)/i,
          `Deliverable ${del.id} has unexpected format: ${del.format}`
        );
      });
    });

    it('should ensure all deliverables have verified MOE Masterplan 2030 or D&T curriculum alignments', () => {
      PROGRAMME_DELIVERABLES.forEach((del) => {
        assert.ok(
          del.moeAlignment && del.moeAlignment.length > 15,
          `Deliverable ${del.id} missing substantive MOE alignment text`
        );
      });
    });
  });
});
