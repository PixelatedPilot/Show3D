import { LEARNING_MODULES } from '../../store/appStore';

export type LabCategory = 'All' | 'Create' | 'Develop' | 'Explore' | 'Learn';

export interface FeaturedCarouselItem {
  id: string;
  moduleId: number;
  tag: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  ctaLabel: string;
  accentHex: string;
  tintBg: string;
  pillTextHex: string;
  moeDomain: string;
}

export const FEATURED_EXPERIMENTS: FeaturedCarouselItem[] = [
  {
    id: 'pavilion',
    moduleId: 3,
    tag: 'MODULE 03 · SPATIAL SYNTHESIS',
    name: 'Courtyard Tensile Pavilion',
    shortDesc: 'Engineer tropical campus shade & 450W solar micro-grids in 3D.',
    fullDesc: 'An interactive spatial AI challenge where students solve real 34°C afternoon heat on campus by balancing parabolic canopy curvature, high-albedo fabrics, and renewable solar wattage.',
    ctaLabel: 'Try it now — Courtyard Pavilion',
    accentHex: '#0A84FF',
    tintBg: '#0D2137',
    pillTextHex: '#FFFFFF',
    moeDomain: 'Learn to Use AI · Spatial Synthesis',
  },
  {
    id: 'prompt-forge',
    moduleId: 2,
    tag: 'MODULE 02 · PROMPT ARCHITECTURE',
    name: 'The Prompt Forge (PARTS)',
    shortDesc: 'Turn structured engineering logic into clean 3D geometry.',
    fullDesc: 'Replace random prompt guessing with the canonical 5-part PARTS recipe (Persona, Aim, Recipients, Theme, Structure) to synthesize watertight, printable 3D meshes.',
    ctaLabel: 'Try it now — The Prompt Forge',
    accentHex: '#FFD60A',
    tintBg: '#2C2405',
    pillTextHex: '#1C1C1E',
    moeDomain: 'Learn to Use AI · Prompt Architecture',
  },
  {
    id: 'material-lab',
    moduleId: 4,
    tag: 'MODULE 04 · PHYSICAL SHADERS',
    name: 'The Material Alchemist',
    shortDesc: 'Test real-world PBR shaders, thermal albedo, and PLA durability.',
    fullDesc: 'Experiment with Physically Based Rendering (PBR) surface finishes—comparing solar-reflective white PTFE, brushed aluminum, and eco-friendly bamboo for physical fabrication.',
    ctaLabel: 'Try it now — Material Lab',
    accentHex: '#30D158',
    tintBg: '#0E2914',
    pillTextHex: '#FFFFFF',
    moeDomain: 'Learn to Use AI · Physical Shaders',
  },
  {
    id: 'peer-lab',
    moduleId: 5,
    tag: 'MODULE 05 · COLLABORATIVE CRITIQUE',
    name: 'Ergonomics & Spatial Pins',
    shortDesc: 'Test 60° viewing angles and anchor 3D peer critique pins.',
    fullDesc: 'An experimental collaborative stage where students verify 60° ergonomic sightlines, inspect wall thickness for 3D slicing, and pin constructive D&T feedback directly onto 3D coordinates.',
    ctaLabel: 'Try it now — Ergonomics Lab',
    accentHex: '#FF375F',
    tintBg: '#2E0C14',
    pillTextHex: '#FFFFFF',
    moeDomain: 'Learn With AI · Collaborative Critique',
  },
  {
    id: 'dimension-3d',
    moduleId: 1,
    tag: 'MODULE 01 · COORDINATE GEOMETRY',
    name: 'The 3D Dimension',
    shortDesc: 'Inspect X-Y-Z coordinates and wireframe skeletons from 360°.',
    fullDesc: 'Discover how spatial computing builds true mathematical volume using vertices, edges, and polygon meshes—preparing young inventors to move beyond flat 2D screens.',
    ctaLabel: 'Try it now — The 3D Dimension',
    accentHex: '#64D2FF',
    tintBg: '#092332',
    pillTextHex: '#000000',
    moeDomain: 'Learn About AI · Coordinate Geometry',
  },
];

export interface ExperimentCardItem {
  id: number;
  category: Exclude<LabCategory, 'All'>;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  keySkill: string;
  badgeName: string;
  duration: string;
  moeLearn: string;
  studentChallenge: string;
  learningObjectives: string[];
  ctaText: string;
  accentHex: string;
  tintBg: string;
  spanWide?: boolean;
  visualKind: 'wireframe' | 'prompt' | 'synthesis' | 'materials' | 'ergonomics' | 'certificate';
}

const MODULE_VISUAL_CONFIG: Record<number, {
  category: Exclude<LabCategory, 'All'>;
  accentHex: string;
  tintBg: string;
  spanWide?: boolean;
  visualKind: 'wireframe' | 'prompt' | 'synthesis' | 'materials' | 'ergonomics' | 'certificate';
}> = {
  1: { category: 'Create', accentHex: '#64D2FF', tintBg: '#092332', spanWide: true, visualKind: 'wireframe' },
  2: { category: 'Develop', accentHex: '#FFD60A', tintBg: '#2C2405', visualKind: 'prompt' },
  3: { category: 'Create', accentHex: '#30D158', tintBg: '#0E2914', visualKind: 'synthesis' },
  4: { category: 'Develop', accentHex: '#0A84FF', tintBg: '#0D2137', visualKind: 'materials' },
  5: { category: 'Explore', accentHex: '#FF375F', tintBg: '#2E0C14', visualKind: 'ergonomics' },
  6: { category: 'Learn', accentHex: '#30D158', tintBg: '#0E2914', spanWide: true, visualKind: 'certificate' },
};

export const LAB_EXPERIMENT_CARDS: ExperimentCardItem[] = LEARNING_MODULES.map((m) => {
  const cfg = MODULE_VISUAL_CONFIG[m.id] || {
    category: 'Create' as const,
    accentHex: '#0A84FF',
    tintBg: '#0D2137',
    visualKind: 'wireframe' as const,
  };
  return {
    id: m.id,
    category: cfg.category,
    code: `MODULE 0${m.id} · ${m.code.toUpperCase()}`,
    title: m.title,
    subtitle: m.keySkill,
    summary: m.summary,
    keySkill: m.keySkill,
    badgeName: m.badgeName,
    duration: m.duration,
    moeLearn: m.moeLearn,
    studentChallenge: m.studentChallenge,
    learningObjectives: m.learningObjectives,
    ctaText: `Try Masterclass 0${m.id}`,
    accentHex: cfg.accentHex,
    tintBg: cfg.tintBg,
    spanWide: cfg.spanWide,
    visualKind: cfg.visualKind,
  };
});

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'My child has zero coding or 3D CAD experience. Will they be able to keep up?',
    answer: 'Absolutely. Show3D was built from the ground up for zero prior experience. We don’t ask students to learn complex, cluttered CAD interfaces. Instead, they direct geometry with plain English, visual parametric levers, and prompt architecture (PARTS). Our 1:8 mentor ratio guarantees that every student receives step-by-step guidance.',
    category: 'Curriculum & Experience',
  },
  {
    question: 'How do you prevent children from blindly copying AI answers?',
    answer: 'This is the foundational design principle of Show3D: Anti-Cognitive Offloading. Our platform measures and enforces a minimum 90% Human Intent Score. If an AI proposes a geometry, the student must critique its wall thickness, explain their curvature choices, and calibrate real-world physical constraints before any 3D print file is generated.',
    category: 'Pedagogy & Rigor',
  },
  {
    question: 'What does my child actually take home at graduation?',
    answer: 'Every student takes home two tangible proofs of mastery: (1) A precision 3D-printed physical artifact in non-toxic, biodegradable PLA that they designed and verified themselves, and (2) An authentic, tamper-evident Verified Certificate (complete with verification ID and MOE 21CC skill rubric) ready for Direct School Admission (DSA) portfolios.',
    category: 'Outcomes & Credentials',
  },
  {
    question: 'Is my child’s data and creative work kept private?',
    answer: 'Yes, 100%. We enforce strict Singapore PDPA compliance. Student creative prompts, geometry files, and reflections are never shared with third parties and are strictly never used to train public foundation models. We operate on a data-minimization principle where accounts are school- or parent-managed.',
    category: 'Safety & Privacy',
  },
  {
    question: 'What hardware or software do we need at home?',
    answer: 'Zero installations required. Show3D is 100% web-native and runs entirely over standard HTTPS Port 443 in any modern web browser (Chrome, Safari, Edge). It works smoothly on Chromebooks, iPads, and budget Windows laptops—including school-issued MOE PLD devices.',
    category: 'Technical Requirements',
  },
  {
    question: 'What is the pricing and cohort schedule?',
    answer: 'Tuition is $399 per child for the 5-day holiday camp. We offer two flexible options: intensive 5-day Holiday Bootcamps (March, June, Sept, Nov/Dec) and paced 6-week Weekend Labs (2 hours/week). Every seat is guaranteed 1:8 mentorship, physical 3D printing filament, and post-camp platform access.',
    category: 'Tuition & Schedules',
  },
];

export const PRICING_DETAILS = {
  priceString: 'From $399',
  rateDetail: '$399 per child (5-day holiday camp)',
  cohortLimit: 'Small cohorts (8–10 students per class)',
  mentorRatio: '1:8 dedicated mentor ratio',
};
