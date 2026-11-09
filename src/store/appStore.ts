import type { 
  EduState, 
  LearningModule, 
  StudentRosterItem, 
  MOERubricItem, 
  AnnotationPin, 
  ModuleQuizData,
  PedagogyPhase,
  LessonSessionStep,
  ProgrammeDeliverable,
  StudentSafetySpec,
  SchoolProcurementSpec,
  DifferentiatedTrack
} from '../types/index.ts';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 1,
    code: 'Module 1',
    title: 'The 3D Dimension',
    duration: '60 min',
    status: 'active',
    moeLearn: 'Learn About AI',
    summary: 'Discover how computers create true 3D volume using vertices and wireframes rather than flat 2D images.',
    keySkill: '3D Space & Wireframe Skeletons',
    badgeName: 'Spatial Scout',
    studentChallenge: 'Orbit around your tech companion in 3D and reveal its internal wireframe geometry.',
    learningObjectives: [
      'Distinguish 3D spatial models from flat 2D pictures',
      'Inspect 3D coordinates (X, Y, Z) and surface wireframes',
      'Understand why 3D assets can be rotated and 3D printed'
    ],
    vendorScope: 'Interactive browser-based 3D viewport with single-focus guided steps.',
    teacherFacilitation: 'Introduce students to personal tech product design.'
  },
  {
    id: 2,
    code: 'Module 2',
    title: 'The Prompt Forge',
    duration: '60 min',
    status: 'active',
    moeLearn: 'Learn to Use AI',
    summary: 'Learn how smart prompt recipes with form and functional features prevent messy AI blobs.',
    keySkill: 'Structured 3D Prompt Recipes',
    badgeName: 'Prompt Architect',
    studentChallenge: 'Build a prompt recipe combining device type, ergonomic angle, and cable features.',
    learningObjectives: [
      'Understand why vague prompts fail in 3D generative modeling',
      'Use functional modifiers (cable notch, viewing angle, geometry)',
      'Construct a clear prompt recipe for your personal tech dock'
    ],
    vendorScope: 'Interactive prompt recipe block builder and real-time prompt preview.',
    teacherFacilitation: 'Guide students to think about real everyday phone and desk problems.'
  },
  {
    id: 3,
    code: 'Module 3',
    title: 'The 3D Synthesis',
    duration: '90 min',
    status: 'active',
    moeLearn: 'Learn to Use AI',
    summary: 'Watch generative AI transform your prompt recipe into an interactive 3D model right in your browser.',
    keySkill: 'Generative 3D Mesh Synthesis',
    badgeName: '3D Creator',
    studentChallenge: 'Synthesize your 3D tech dock and inspect its geometry from all 360 degrees.',
    learningObjectives: [
      'Synthesize an interactive 3D mesh from text directives',
      'Inspect generated surface volume from multiple angles',
      'Adopt an iterative mindset when collaborating with AI'
    ],
    vendorScope: 'Show3D WebGL synthesis engine and real-time 3D model drop.',
    teacherFacilitation: 'Encourage students to inspect and celebrate their generated 3D creations.'
  },
  {
    id: 4,
    code: 'Module 4',
    title: 'The Material Lab',
    duration: '60 min',
    status: 'active',
    moeLearn: 'Learn to Use AI',
    summary: 'Bring your product to life by testing real-world finishes like Cyber Neon, Stealth Matte, and Eco Bamboo.',
    keySkill: 'Surface Shaders & Physical Materials',
    badgeName: 'Material Alchemist',
    studentChallenge: 'Test surface finishes and evaluate which material best suits daily desk use.',
    learningObjectives: [
      'Understand how light interacts with plastic, aluminum, and wood',
      'Apply Physically Based Rendering (PBR) finishes to 3D geometry',
      'Evaluate material durability for physical 3D printing'
    ],
    vendorScope: 'Live material shader picker with studio lighting preview.',
    teacherFacilitation: 'Facilitate quick sharing of creative color and material styles.'
  },
  {
    id: 5,
    code: 'Module 5',
    title: 'Ergonomics & Peer Lab',
    duration: '60 min',
    status: 'active',
    moeLearn: 'Learn With AI',
    summary: 'Test the 60° study viewing angle and exchange constructive 3D feedback pins with classmates.',
    keySkill: 'Ergonomic Testing & 3D Feedback',
    badgeName: 'Design Collaborator',
    studentChallenge: 'Test the 60° ergonomic viewing angle and leave a constructive 3D pin on a classmate model.',
    learningObjectives: [
      'Test functional ergonomics: device tilt and cable pass-through clearance',
      'Anchor 3D critique pins directly onto physical components',
      'Formulate constructive, respectful feedback aligned with D&T rubrics'
    ],
    vendorScope: '3D spatial pin review system and ergonomic angle inspector.',
    teacherFacilitation: 'Highlight examples of helpful, specific peer suggestions.'
  },
  {
    id: 6,
    code: 'Module 6',
    title: 'Creator Showcase & Graduation',
    duration: '60 min',
    status: 'active',
    moeLearn: 'Learn Beyond AI',
    summary: 'Evaluate creative ownership, celebrate your human design decisions, and receive your MOE Certificate.',
    keySkill: 'AI Ethics & Creator Certification',
    badgeName: 'Certified Creator',
    studentChallenge: 'Review your Creator Ownership Scorecard and claim your verified course certificate.',
    learningObjectives: [
      'Articulate why human intentionality retains authorship over AI outputs',
      'Reflect on ethical and responsible digital technology use',
      'Export verified 3D portfolio record and MOE-aligned certificate'
    ],
    vendorScope: 'Creator ownership matrix and verified MOE completion certificate generator.',
    teacherFacilitation: 'Celebrate cohort completion and sign off on student rubrics.'
  }
];

export const MODULE_QUIZZES: Record<number, ModuleQuizData> = {
  1: {
    moduleId: 1,
    moduleTitle: 'The 3D Dimension',
    moeDomain: 'Learn About AI · Spatial Thinking',
    questions: [
      {
        id: 'q1-1',
        question: 'What is the biggest advantage of creating a 3D model compared to drawing a flat 2D picture?',
        contextNote: 'Think about how you interact with the object on screen and in real life.',
        options: [
          {
            id: 'opt-1',
            text: 'You can orbit 360° to inspect every angle, check real dimensions, and 3D print it into a real physical object.',
            isCorrect: true,
            explanation: 'Spot on! 3D models have mathematical depth (X, Y, Z), allowing you to rotate them, test real measurements, and fabricate them.'
          },
          {
            id: 'opt-2',
            text: '3D models are always smaller files than 2D JPEG photos.',
            isCorrect: false,
            explanation: 'Not quite. File size depends on complexity, not dimensions. The true superpower of 3D is physical volume and 360° inspection.'
          },
          {
            id: 'opt-3',
            text: '3D models can only be viewed in black and white.',
            isCorrect: false,
            explanation: 'Not at all! 3D models support realistic colors, shiny reflections, and textures.'
          }
        ]
      }
    ]
  },
  2: {
    moduleId: 2,
    moduleTitle: 'The Prompt Forge',
    moeDomain: 'Learn to Use AI · Prompt Engineering',
    questions: [
      {
        id: 'q2-1',
        question: 'If you type a vague prompt like "make a cool stand", what will likely happen?',
        contextNote: 'Consider how generative AI interprets instructions without details.',
        options: [
          {
            id: 'opt-1',
            text: 'The AI will guess randomly and might create an impractical blob that can’t actually hold a phone or pass a cable.',
            isCorrect: true,
            explanation: 'Exactly right! AI needs specific functional blocks (like device slot, viewing angle, and cable notch) to create something workable.'
          },
          {
            id: 'opt-2',
            text: 'The AI will shut down your computer for using too few words.',
            isCorrect: false,
            explanation: 'No, the computer will not shut down! But without details, the generated 3D shape won’t be practical.'
          },
          {
            id: 'opt-3',
            text: 'The AI will automatically guess the exact model of your phone.',
            isCorrect: false,
            explanation: 'AI cannot read your mind. You must give it clear, structured specifications in your prompt recipe.'
          }
        ]
      }
    ]
  },
  3: {
    moduleId: 3,
    moduleTitle: 'The 3D Synthesis',
    moeDomain: 'Learn to Use AI · Iterative Design',
    questions: [
      {
        id: 'q3-1',
        question: 'What is the best mindset when working with generative AI in product design?',
        contextNote: 'Think about how designers collaborate with digital tools.',
        options: [
          {
            id: 'opt-1',
            text: 'Treat AI as a creative co-pilot: generate an initial 3D concept, then inspect, test, and refine it with human craft.',
            isCorrect: true,
            explanation: 'Awesome answer! In modern design, AI gives you a fast starting point, but human designers evaluate and refine the final product.'
          },
          {
            id: 'opt-2',
            text: 'Accept the very first 3D shape the AI makes as perfect and never touch it again.',
            isCorrect: false,
            explanation: 'Good design takes iteration! Professional creators always test and tweak the first draft.'
          },
          {
            id: 'opt-3',
            text: 'Let AI make all your life decisions because computers know best.',
            isCorrect: false,
            explanation: 'Human creativity, empathy, and needs are what give products their real value!'
          }
        ]
      }
    ]
  },
  4: {
    moduleId: 4,
    moduleTitle: 'The Material Lab',
    moeDomain: 'Learn to Use AI · Materials & Real-World Craft',
    questions: [
      {
        id: 'q4-1',
        question: 'Why does choosing the right material matter when designing a real desk accessory?',
        contextNote: 'Think about how plastic, metal, and wood behave on your desk.',
        options: [
          {
            id: 'opt-1',
            text: 'Materials determine physical weight, surface grip, and durability—ensuring the stand won’t tip over or scratch your device.',
            isCorrect: true,
            explanation: 'You nailed it! A good stand needs weight for stability, a smooth slot so it doesn’t scratch your phone, and a finish that looks great.'
          },
          {
            id: 'opt-2',
            text: 'Colors are only for marketing and have no effect on physical objects.',
            isCorrect: false,
            explanation: 'Materials involve more than just color: they dictate texture, reflection, weight, and strength.'
          },
          {
            id: 'opt-3',
            text: 'All materials in 3D software cost real money to look at.',
            isCorrect: false,
            explanation: 'Testing virtual shaders in Show3D is completely free and lets you experiment before manufacturing!'
          }
        ]
      }
    ]
  },
  5: {
    moduleId: 5,
    moduleTitle: 'Ergonomics & Peer Lab',
    moeDomain: 'Learn With AI · Constructive Critique',
    questions: [
      {
        id: 'q5-1',
        question: 'Which of the following is the best example of constructive peer feedback on a 3D dock?',
        contextNote: 'Look for feedback that is specific, respectful, and helpful.',
        options: [
          {
            id: 'opt-1',
            text: '"The 60° tilt is great for study video calls, but consider widening the cable notch by 5mm so thicker braided chargers fit easily."',
            isCorrect: true,
            explanation: 'Brilliant! Constructive feedback praises what works well and suggests a specific, measurable improvement.'
          },
          {
            id: 'opt-2',
            text: '"This looks terrible, start over."',
            isCorrect: false,
            explanation: 'Unkind and unhelpful! Constructive critique focuses on specific solutions, not negative opinions.'
          },
          {
            id: 'opt-3',
            text: '"Looks okay, whatever."',
            isCorrect: false,
            explanation: 'Too vague! Helpful peer critique gives specific ideas to help your classmate level up.'
          }
        ]
      }
    ]
  },
  6: {
    moduleId: 6,
    moduleTitle: 'Creator Showcase & Graduation',
    moeDomain: 'Learn Beyond AI · Authorship & Ethics',
    questions: [
      {
        id: 'q6-1',
        question: 'Why are YOU the true creative author of this tech companion, even though AI assisted in generating the 3D shape?',
        contextNote: 'Focus on human intentionality and the design decisions you made.',
        options: [
          {
            id: 'opt-1',
            text: 'Because you defined the user problem, designed the prompt recipe, selected the materials, tested ergonomics, and refined the final design.',
            isCorrect: true,
            explanation: 'Correct! Human creativity is about intentional choices. The AI is a powerful digital paintbrush, but YOU are the creator and artist.'
          },
          {
            id: 'opt-2',
            text: 'Because computers are not allowed to have birthdays.',
            isCorrect: false,
            explanation: 'Funny, but not the reason! Authorship belongs to the human mind directing the design intent.'
          },
          {
            id: 'opt-3',
            text: 'Because AI did 100% of the thinking and humans just watched.',
            isCorrect: false,
            explanation: 'Far from it! You made all the critical design decisions that turned a raw idea into a functional product.'
          }
        ]
      }
    ]
  }
};

export const STUDENT_ROSTER: StudentRosterItem[] = [
  { id: 'st-01', name: 'Ethan Tan', avatar: 'ET', currentModule: 3, status: 'on_track', lastActive: 'Active now', creditsUsed: 38, reflectionScore: '96/100', preScore: 58, postScore: 96, demonstratedSkill: 'Tensile Geometry & PARTS Prompting' },
  { id: 'st-02', name: 'Siti Nurhaliza', avatar: 'SN', currentModule: 3, status: 'on_track', lastActive: '2m ago', creditsUsed: 42, reflectionScore: '95/100', preScore: 64, postScore: 95, demonstratedSkill: 'Solar Panel Integration' },
  { id: 'st-03', name: 'Priya Sharma', avatar: 'PS', currentModule: 4, status: 'completed', lastActive: '5m ago', creditsUsed: 45, reflectionScore: '98/100', preScore: 70, postScore: 98, demonstratedSkill: 'PBR Shaders & Material Craft' },
  { id: 'st-04', name: 'Marcus Lee', avatar: 'ML', currentModule: 3, status: 'needs_help', lastActive: '1m ago', creditsUsed: 50, preScore: 50, postScore: 84, demonstratedSkill: 'Prompt Refinement Iteration' },
  { id: 'st-05', name: 'Chloe Lim', avatar: 'CL', currentModule: 3, status: 'on_track', lastActive: '3m ago', creditsUsed: 35, preScore: 62, postScore: 92, demonstratedSkill: 'Cross-Ventilation Aerodynamics' },
  { id: 'st-06', name: 'Ahmad Faiz', avatar: 'AF', currentModule: 3, status: 'on_track', lastActive: 'Active now', creditsUsed: 40, preScore: 55, postScore: 90, demonstratedSkill: 'Modular Timber Seating' },
  { id: 'st-07', name: 'Rachel Wong', avatar: 'RW', currentModule: 4, status: 'completed', lastActive: '8m ago', creditsUsed: 48, reflectionScore: '94/100', preScore: 68, postScore: 94, demonstratedSkill: '60° Ergonomics & Clearance' },
  { id: 'st-08', name: 'Lucas Teo', avatar: 'LT', currentModule: 2, status: 'needs_help', lastActive: '12m ago', creditsUsed: 22, preScore: 48, postScore: 80, demonstratedSkill: 'Spatial Coordinate Basics' },
  { id: 'st-09', name: 'Divya Nair', avatar: 'DN', currentModule: 3, status: 'on_track', lastActive: '4m ago', creditsUsed: 39, preScore: 60, postScore: 91, demonstratedSkill: 'PARTS Persona & Structure' },
  { id: 'st-10', name: 'Benjamin Koh', avatar: 'BK', currentModule: 3, status: 'on_track', lastActive: '6m ago', creditsUsed: 36, preScore: 65, postScore: 93, demonstratedSkill: 'Sun Shading Angle Analysis' },
  { id: 'st-11', name: 'Nurul Huda', avatar: 'NH', currentModule: 3, status: 'on_track', lastActive: 'Active now', creditsUsed: 41, preScore: 59, postScore: 94, demonstratedSkill: 'Tensile Fabric Translucency' },
  { id: 'st-12', name: 'Isaac Ng', avatar: 'IN', currentModule: 3, status: 'on_track', lastActive: '7m ago', creditsUsed: 37, preScore: 63, postScore: 89, demonstratedSkill: 'Cable Routing Notch Alignment' },
  { id: 'st-13', name: 'Kavitha R.', avatar: 'KR', currentModule: 3, status: 'on_track', lastActive: '3m ago', creditsUsed: 44, preScore: 66, postScore: 95, demonstratedSkill: 'Biophilic Planter Modules' },
  { id: 'st-14', name: 'Darren Sim', avatar: 'DS', currentModule: 3, status: 'on_track', lastActive: '1m ago', creditsUsed: 40, preScore: 58, postScore: 88, demonstratedSkill: 'Procedural Mesh Inspection' },
  { id: 'st-15', name: 'Gwen Yeo', avatar: 'GY', currentModule: 4, status: 'completed', lastActive: '15m ago', creditsUsed: 46, reflectionScore: '96/100', preScore: 72, postScore: 97, demonstratedSkill: 'Physical 3D Print Feasibility' },
  { id: 'st-16', name: 'Hafiz Rahman', avatar: 'HR', currentModule: 3, status: 'on_track', lastActive: '9m ago', creditsUsed: 34, preScore: 54, postScore: 89, demonstratedSkill: 'Spatial Pin Peer Review' },
  { id: 'st-17', name: 'Jasmine Chua', avatar: 'JC', currentModule: 3, status: 'on_track', lastActive: 'Active now', creditsUsed: 38, preScore: 61, postScore: 93, demonstratedSkill: 'Thermal Chimney Lift' },
  { id: 'st-18', name: 'Bryan Chen', avatar: 'BC', currentModule: 3, status: 'on_track', lastActive: '4m ago', creditsUsed: 41, preScore: 57, postScore: 91, demonstratedSkill: 'PBR Roughness Optimization' },
  { id: 'st-19', name: 'Ananya Roy', avatar: 'AR', currentModule: 3, status: 'on_track', lastActive: '11m ago', creditsUsed: 35, preScore: 67, postScore: 96, demonstratedSkill: 'Creative Authorship Reflection' },
  { id: 'st-20', name: 'Timothy Low', avatar: 'TL', currentModule: 3, status: 'on_track', lastActive: '2m ago', creditsUsed: 43, preScore: 60, postScore: 90, demonstratedSkill: '450W Solar Cell Wireframe' },
  { id: 'st-21', name: 'Farah Zulaikha', avatar: 'FZ', currentModule: 3, status: 'on_track', lastActive: 'Active now', creditsUsed: 39, preScore: 63, postScore: 95, demonstratedSkill: 'Constructive D&T Critique' },
  { id: 'st-22', name: 'Sean Gomez', avatar: 'SG', currentModule: 3, status: 'on_track', lastActive: '5m ago', creditsUsed: 36, preScore: 58, postScore: 88, demonstratedSkill: 'Human-Centered Need Finding' },
  { id: 'st-23', name: 'Megan Chia', avatar: 'MC', currentModule: 3, status: 'on_track', lastActive: '8m ago', creditsUsed: 40, preScore: 65, postScore: 94, demonstratedSkill: 'Anti-Offloading Reflection' },
  { id: 'st-24', name: 'Zackary Tay', avatar: 'ZT', currentModule: 3, status: 'on_track', lastActive: '10m ago', creditsUsed: 37, preScore: 56, postScore: 87, demonstratedSkill: 'Hexagonal Stability Base' },
  { id: 'st-25', name: 'Nadia Binte Ali', avatar: 'NA', currentModule: 3, status: 'on_track', lastActive: '6m ago', creditsUsed: 42, preScore: 69, postScore: 96, demonstratedSkill: 'Design Thinking Empathy' },
  { id: 'st-26', name: 'Jayden See', avatar: 'JS', currentModule: 3, status: 'on_track', lastActive: '3m ago', creditsUsed: 38, preScore: 58, postScore: 89, demonstratedSkill: 'Iterative Prompt Refinement' },
  { id: 'st-27', name: 'Vandana M.', avatar: 'VM', currentModule: 4, status: 'completed', lastActive: '20m ago', creditsUsed: 47, reflectionScore: '97/100', preScore: 71, postScore: 98, demonstratedSkill: 'PBR Shaders & Solar Array' },
  { id: 'st-28', name: 'Nicholas Ho', avatar: 'NH', currentModule: 3, status: 'on_track', lastActive: 'Active now', creditsUsed: 41, preScore: 60, postScore: 92, demonstratedSkill: 'Zero-Prep Student Leadership' }
];

export const MOE_RUBRIC_ITEMS: MOERubricItem[] = [
  {
    code: '01',
    learn: 'Learn About AI',
    focus: 'Spatial Concepts & 3D Geometry',
    status: 'Verified (100% Cohort)',
    desc: 'Students explain how prompt tokens translate into 3D geometry and recognize AI hallucination risks.',
    criteria: [
      'Differentiates 2D image synthesis from spatial 3D coordinate meshes',
      'Understands how mathematical vectors define volume and boundary',
      'Recognizes polygon density limits and geometry simplification'
    ]
  },
  {
    code: '02',
    learn: 'Learn to Use AI',
    focus: 'Prompt Recipes & Human Craft',
    status: 'Verified (93% Cohort)',
    desc: 'Students formulate structured prompts with form and functional specifications, refining finishes iteratively.',
    criteria: [
      'Applies physical modifiers to guide generative 3D output',
      'Avoids single-word prompts in favor of functional specifications',
      'Exercises direct human manipulation over colors, finishes, and wireframe topology'
    ]
  },
  {
    code: '03',
    learn: 'Learn With AI',
    focus: 'Applied Product Co-Creation & Peer Review',
    status: 'In Progress (Active Pilot)',
    desc: 'Students utilize AI as a collaborative design partner to solve real-world personal gadget needs.',
    criteria: [
      'Addresses authentic ergonomics (viewing angle, stability, cable management)',
      'Balances aesthetic style with physical 3D print feasibility',
      'Engages in constructive peer critique using spatial 3D pins'
    ]
  },
  {
    code: '04',
    learn: 'Learn Beyond AI',
    focus: 'Ethics, Authorship & Creator Reflection',
    status: 'In Progress (Active Pilot)',
    desc: 'Students evaluate intellectual property, human creative intent, and ethical boundaries in generative tools.',
    criteria: [
      'Critically evaluates who holds moral ownership of AI-assisted designs',
      'Articulates personal creative authorship and human intentionality',
      'Considers environmental and computational sustainability of AI models'
    ]
  }
];

export const ANNOTATION_PINS: AnnotationPin[] = [
  {
    id: 'pin-slot',
    title: '60° Device Cradle Slot',
    description: 'Ergonomic viewing angle optimized for video calls and hands-free desk study.',
    position: [0, 2.2, 0.4],
    color: '#0A84FF'
  },
  {
    id: 'pin-cable',
    title: 'Cable Pass-Through Notch',
    description: 'Recessed channel allows charging cable to plug in neatly without bending.',
    position: [0, 0.8, -0.6],
    color: '#30D158'
  },
  {
    id: 'pin-finish',
    title: 'Chamfered Beveled Edges',
    description: 'Smooth, tactile edges comfortable to touch and optimized for 3D printing.',
    position: [1.4, 1.5, 0],
    color: '#D97706'
  },
  {
    id: 'pin-base',
    title: 'Weighted Geometric Base',
    description: 'Hexagonal footprint prevents accidental tipping when tapping the screen.',
    position: [-1.4, 0.6, 0],
    color: '#BF5AF2'
  }
];

export const initialEduState: EduState = {
  viewMode: 'landing',
  activeModuleId: 1,
  step: 1,
  currentStage: 'mission',
  problemNeed: "Design a customizable desk dock & companion for your phone and earbuds with an ergonomic 60° study angle and cable pass-through.",
  selectedConstraints: [
    "60° Ergonomic Viewing Tilt",
    "Hidden Cable Pass-Through",
    "Acoustic Sound Amplifier",
    "3D Print Ready Geometry"
  ],
  creationMode: 'text',
  promptText: "A sleek geometric phone dock with a 60-degree viewing slot, curved cable routing channel, and matte chamfered edges.",
  selectedTags: [
    "60° ergonomic viewing slot",
    "Hidden cable pass-through",
    "Acoustic sound amplifier",
    "Weighted anti-slip base"
  ],
  isGenerating: false,
  generationProgress: 0,
  modelGenerated: true,
  canopyColor: "#0A84FF",
  benchColor: "#D97706",
  solarPanelsEnabled: true,
  wireframeMode: false,
  dockFinish: 'cyber',
  ergonomicAngleTested: false,
  reflectionQuestion1: "I defined the functional requirements for a desk phone stand: viewing angle and cable notch. The AI synthesized the geometric volume, and I tuned the surface finish and evaluated the ergonomics.",
  reflectionQuestion2: "I hold creative authorship because the problem idea, the prompt recipe, the material choices, and the final ergonomic adjustments were directed entirely by my human design choices.",
  isSubmitted: false,
  cameraPreset: 'overview',
  activeAnnotationId: null,
  completedQuizModuleIds: [],
  quizScores: {},
  earnedBadges: [],
  track: 'foundational',
  fallbackActive: false,
  authorshipScore: 94
};

export const MACRO_CURRICULUM_PHASES: PedagogyPhase[] = [
  {
    phase: 1,
    title: 'Problem Empathy & Spatial Foundations',
    duration: '2.5 Hours (Modules 1 & 2)',
    moeDomain: 'Learn About AI',
    focus: 'Demystifying 3D volumes, X/Y/Z coordinate grids, and human need discovery.',
    deliverable: 'Problem Definition Brief & User Constraint Checklist',
    constructionistActivity: 'Inspecting 3D wireframe topology and defining functional parameters for campus cooling or desk ergonomics.'
  },
  {
    phase: 2,
    title: 'Structured Prompting & Form Synthesis',
    duration: '2.0 Hours (Module 3)',
    moeDomain: 'Learn to Use AI',
    focus: 'PARTS prompt engineering framework (Persona, Aim, Recipients, Theme, Structure).',
    deliverable: 'Synthesized 3D Model Draft v1 + Prompt Recipe Log',
    constructionistActivity: 'Translating human design specifications into spatial prompts, inspecting initial geometry, and recovering from imperfect AI meshes.'
  },
  {
    phase: 3,
    title: 'Materials, Sustainability & Physical Craft',
    duration: '1.5 Hours (Module 4)',
    moeDomain: 'Learn to Use AI',
    focus: 'Physically Based Rendering (PBR) shaders, solar harvest calculation, UV reflectivity, and 3D print feasibility.',
    deliverable: 'Material-Engineered Model with Environmental Specs',
    constructionistActivity: 'Applying realistic tensile membrane materials, configuring 450W solar arrays, and evaluating physical manufacturing constraints.'
  },
  {
    phase: 4,
    title: 'Ergonomics, Peer Critique & Collaborative Studio',
    duration: '2.0 Hours (Module 5)',
    moeDomain: 'Learn With AI',
    focus: 'Functional testing (60° tilt, cable clearance) and spatial peer review pins.',
    deliverable: 'Classmate 3D Review Feedback & Revised Model v2',
    constructionistActivity: 'Placing interactive 3D pins on classmate models, articulating constructive design feedback, and refining models iteratively.'
  },
  {
    phase: 5,
    title: 'Authorship, Anti-Cognitive Offload & Showcase',
    duration: '2.0 Hours (Module 6)',
    moeDomain: 'Learn Beyond AI',
    focus: 'Creator Ownership Scorecard, ethical reflection, and human agency over AI.',
    deliverable: 'Student Capstone Portfolio & Participation Certificate',
    constructionistActivity: 'Documenting human design intent across all stages to verify anti-cognitive offloading and demonstrate mastery.'
  }
];

export const MICRO_LESSON_FLOW: LessonSessionStep[] = [
  {
    step: 1,
    timeRange: '00 – 10 min',
    name: 'Engage & Empathize',
    roleVendor: 'Presents real-world Singapore scenario hook (midday 34°C heat / cable strain).',
    roleTeacher: 'Facilitates brief class discussion on human pain points.',
    roleStudent: 'Identifies core functional problem and user recipient needs.',
    cognitiveGoal: 'Activate prior knowledge and anchor design intent.'
  },
  {
    step: 2,
    timeRange: '10 – 25 min',
    name: 'Scaffold & Deconstruct',
    roleVendor: 'Delivers bite-sized interactive micro-lesson with PARTS framework chips.',
    roleTeacher: 'Monitors classroom pacing and checks in with hesitant learners.',
    roleStudent: 'Constructs structured prompt recipe avoiding vague single-word queries.',
    cognitiveGoal: 'Dual-coding of visual geometry and structured linguistic prompts.'
  },
  {
    step: 3,
    timeRange: '25 – 55 min',
    name: 'Make & Synthesize (HITL)',
    roleVendor: 'Runs fast spatial preview; instant fallback available if network lags.',
    roleTeacher: 'Guides students who flag for assistance on the live telemetry dashboard.',
    roleStudent: 'Iteratively refines 3D geometry, adjusts solar/shade features, and tunes shaders.',
    cognitiveGoal: 'Productive struggle and human-in-the-loop (HITL) physical craft.'
  },
  {
    step: 4,
    timeRange: '55 – 70 min',
    name: 'Critique & Peer Review',
    roleVendor: 'Enables 3D spatial pin placement and peer inspection pins.',
    roleTeacher: 'Highlights constructive, measurable feedback examples to class.',
    roleStudent: 'Tests classmate ergonomics (60° tilt) and leaves actionable revision pins.',
    cognitiveGoal: 'Formative evaluation and social-constructivist feedback.'
  },
  {
    step: 5,
    timeRange: '70 – 80 min',
    name: 'Reflect & Anti-Offload',
    roleVendor: 'Logs formative quiz diagnostic and compiles Creator Ownership Scorecard.',
    roleTeacher: 'Reviews class mastery trends (+34% skill delta) and signs off on rubrics.',
    roleStudent: 'Articulates human intentionality in portfolio to retain creative authorship.',
    cognitiveGoal: 'Metacognitive synthesis and Learn Beyond AI reinforcement.'
  }
];

export const PROGRAMME_DELIVERABLES: ProgrammeDeliverable[] = [
  {
    id: 'del-01',
    title: 'Student Workbook',
    category: 'teaching',
    format: 'Digital / Printable PDF',
    description: 'Step-by-step tutorials, spatial screenshots, and short practice challenges for self-paced learning.',
    moeAlignment: 'NDLP Student Personal Learning Device (PLD) self-directed learning'
  },
  {
    id: 'del-02',
    title: 'Prompt Engineering Guide',
    category: 'teaching',
    format: 'Digital Interactive Guide',
    description: 'PARTS prompt templates, architectural modifier chips, and AI output evaluation criteria.',
    moeAlignment: 'Learn to Use AI · Prompt Literacy & Scaffolding'
  },
  {
    id: 'del-03',
    title: 'Trainer Lesson Plans',
    category: 'teaching',
    format: 'Educator Pack (6 Modules)',
    description: 'Detailed lesson objectives, time breakdowns, live demonstration cues, and teaching facilitation notes.',
    moeAlignment: 'Zero-Prep Vendor-Taught, Teacher-Facilitated delivery model'
  },
  {
    id: 'del-04',
    title: 'Design-Thinking Worksheets',
    category: 'teaching',
    format: 'Guided Canvas Worksheets',
    description: 'Problem identification, empathy observations, user constraint matrices, and iterative prototypes.',
    moeAlignment: 'Lower Secondary D&T Design-and-Make Project syllabus'
  },
  {
    id: 'del-05',
    title: 'Weekly Mini Challenges',
    category: 'teaching',
    format: '6 Hands-On Micro Tasks',
    description: 'Short practical weekly tasks building progressive spatial competencies without cognitive overload.',
    moeAlignment: 'Continuous formative learning & progressive skill scaffolding'
  },
  {
    id: 'del-06',
    title: 'Final Capstone Project',
    category: 'evidence',
    format: 'Original 3D Spatial Asset',
    description: 'An original 3D solution solving a real-world campus heat or desktop ergonomic challenge.',
    moeAlignment: 'Authentic real-world design application'
  },
  {
    id: 'del-07',
    title: 'Assessment Rubric',
    category: 'evidence',
    format: 'MOE 4-Learns Aligned Matrix',
    description: 'Standardized criteria evaluating spatial understanding, prompt precision, craft, and ethics.',
    moeAlignment: 'MOE Four Learns & D&T assessment rubrics'
  },
  {
    id: 'del-08',
    title: 'Student Portfolio Record',
    category: 'evidence',
    format: 'Verifiable Digital Record',
    description: 'Compilation of original problem need, AI prompt history, iterative revisions, and final 3D model.',
    moeAlignment: 'Demonstration of authentic learning journey and human creative intent'
  },
  {
    id: 'del-09',
    title: 'Teacher Telemetry & Observations',
    category: 'evidence',
    format: 'Live Class Dashboard',
    description: 'Real-time telemetry logging student engagement, help requests, and pre- vs post-skill improvement.',
    moeAlignment: 'Evidence-based learning analytics & targeted student intervention'
  },
  {
    id: 'del-10',
    title: 'Certificate of Participation & Demonstrated Competency',
    category: 'evidence',
    format: 'Verifiable Credential with ID',
    description: 'Documenting verified participation and demonstrated spatial AI skills (not an unverified formal qualification).',
    moeAlignment: 'Authentic recognition of student effort and 21st Century Competencies (21CC)'
  }
];

export const STUDENT_SAFETY_SPEC: StudentSafetySpec = {
  minimumAge: 'Age 13+ Compliant (Designed for Singapore Secondary 1–4)',
  accountModel: 'School-Managed Class SSO (No personal student emails or social logins required)',
  dataPractices: 'Zero Training on Student Data (Student prompts and 3D outputs are never used to train public AI models)',
  contentModeration: 'Automated Safe-Prompt Filtering (Proactively blocks inappropriate or harmful generations)',
  pldCompatibility: 'Fully tested on MOE PLD standard Chromebooks, iPads, and Windows Laptops',
  firewallPort: 'Standard HTTPS Port 443 Safe (No custom WebSockets or blocked network ports)'
};

export const SCHOOL_PROCUREMENT_SPEC: SchoolProcurementSpec = {
  gebizCategory: 'IT & Digital Media Enrichment Training Services (GeBIZ Quotation Ready)',
  fundingRoute: 'Payable via School Enrichment Budgets / Edusave School-Level Allocations',
  edusaveContext: 'Historical dedicated Edusave scheme replaced by school-level enrichment budget authority; schools confirm allocation internally',
  alpThemeFit: 'Theme-adaptable to School Applied Learning Programmes (STEM, Sustainability, Computing)',
  opportunityFundFit: 'Eligible for MOE Opportunity Fund support for lower-income Singapore Citizen students',
  creditPoolSize: 5000
};

