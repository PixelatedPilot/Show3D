export interface LessonSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  keyConcept: {
    term: string;
    definition: string;
  };
  visualType: 'compare_2d_3d' | 'wireframe_diagram' | 'prompt_formula' | 'pbr_properties' | 'ergonomics_diagram' | 'authorship_matrix';
  proTip: string;
}

export interface ModuleLessonContent {
  moduleId: number;
  moduleCode: string;
  moduleTitle: string;
  duration: string;
  overview: string;
  slides: LessonSlide[];
  keyTakeaways: string[];
}

export const MODULE_LESSONS: Record<number, ModuleLessonContent> = {
  1: {
    moduleId: 1,
    moduleCode: 'Module 1',
    moduleTitle: 'The 3D Dimension',
    duration: '60 min',
    overview: 'Learn how computers construct real physical volume using coordinate space, vertices, and wireframe polygons rather than flat 2D picture pixels.',
    slides: [
      {
        id: 'm1-s1',
        badge: 'Lesson 1.1 · Space & Depth',
        title: 'Pixels vs. Polygons: The Third Dimension',
        subtitle: 'Why a 3D model is fundamentally different from a flat 2D photo.',
        paragraphs: [
          'Every picture you see on Instagram, TikTok, or a website is a 2D image made of a flat grid of colored pixels. It has Width (X) and Height (Y), but zero physical depth.',
          'If you want to view the back of an object in a photo, you cannot—the information simply does not exist. The computer only saved a flat snapshot of light.',
          'In contrast, a 3D model exists inside a simulated physical space with three mathematical coordinate axes: Width (X), Height (Y), and Depth (Z). Because the object has true volume, you can orbit around it 360°, inspect its underside, measure its dimensions, and send it to a 3D printer.'
        ],
        keyConcept: {
          term: 'The Z-Axis (Depth)',
          definition: 'The third spatial coordinate that transforms flat 2D shapes into volumetric objects that can be rotated, measured, and physically manufactured.'
        },
        visualType: 'compare_2d_3d',
        proTip: 'In computer graphics, X is typically red (horizontal), Y is green (vertical height), and Z is blue (depth towards or away from you).'
      },
      {
        id: 'm1-s2',
        badge: 'Lesson 1.2 · The Geometry Engine',
        title: 'The Secret Skeleton: Vertices, Edges & Faces',
        subtitle: 'How computer graphics engines construct curved, solid objects from triangles.',
        paragraphs: [
          'Underneath every sleek 3D car, game character, or phone stand is a wire skeleton called a polygonal mesh. A mesh is built from three simple geometric elements:',
          '1. Vertices: Points located at specific (X, Y, Z) coordinates in 3D space.\n2. Edges: Straight mathematical lines connecting two vertices.\n3. Faces (Polygons): Flat surfaces enclosed by three or more edges.',
          'Why does almost all 3D software break surfaces into triangles? Because three points in space are always planar (completely flat). Graphics chips (GPUs) can calculate light bouncing off millions of tiny triangles at 60 frames per second with extreme speed.'
        ],
        keyConcept: {
          term: 'Polygonal Mesh',
          definition: 'A collection of vertices, edges, and polygon faces that define the geometric boundary and shape of a 3D object.'
        },
        visualType: 'wireframe_diagram',
        proTip: 'More triangles make curves look smoother, but too many triangles slow down mobile devices and school Chromebooks.'
      },
      {
        id: 'm1-s3',
        badge: 'Lesson 1.3 · Spatial AI',
        title: 'How 2D AI Differs from 3D Spatial AI',
        subtitle: 'Why generating 3D objects requires spatial understanding, not just painting pictures.',
        paragraphs: [
          'Tools like Midjourney and DALL-E generate 2D images by predicting pixel colors based on text tokens. They are brilliant digital painters, but they have no understanding of physical geometry.',
          'Show3D uses Spatial AI (Generative Diffusion & Neural Radiance Fields). Instead of painting flat pixels, the neural network predicts continuous 3D density, surface normal vectors, and geometric boundaries.',
          'This means the output is an interactive 3D asset (.GLTF or .STL file) that can be rotated in real-time WebGL, loaded into games, or sliced for 3D printing in your school D&T workshop.'
        ],
        keyConcept: {
          term: 'Spatial AI',
          definition: 'Artificial intelligence models that synthesize volumetric 3D coordinate geometry from text or image prompts rather than flat 2D pixel grids.'
        },
        visualType: 'compare_2d_3d',
        proTip: 'Always verify generated models in wireframe mode to make sure the geometry is solid and watertight (manifold).'
      }
    ],
    keyTakeaways: [
      '2D images are flat pixel grids (X, Y); 3D models possess true mathematical volume and depth (X, Y, Z).',
      '3D objects are constructed from meshes made of vertices (points), edges (lines), and polygon faces (flat triangles).',
      'Spatial AI generates explicit 3D geometry that can be inspected 360°, modified with real materials, and 3D printed.'
    ]
  },
  2: {
    moduleId: 2,
    moduleCode: 'Module 2',
    moduleTitle: 'The Prompt Forge',
    duration: '60 min',
    overview: 'Master the art of 3D prompt engineering: learn why vague words produce melted blobs and how structured prompt recipes produce functional products.',
    slides: [
      {
        id: 'm2-s1',
        badge: 'Lesson 2.1 · The Blank Canvas Trap',
        title: 'Why Vague Prompts Fail in 3D',
        subtitle: 'Generative AI lacks common sense; it needs clear functional constraints.',
        paragraphs: [
          'When beginners first try 3D generative AI, they often type vague sentences like: "Make a cool modern phone stand." What happens next is almost always disappointing: a melted, uneven plastic blob that cannot balance a device.',
          'Why does this happen? In 2D art, the word "cool" can be interpreted as stylish colors or lighting. But in 3D product design, "cool" tells the computer nothing about physical stability, device slot dimensions, or viewing angles.',
          'Generative AI models are statistical prediction engines. Without specific functional constraints, the model averages thousands of random shapes, producing impractical fantasy geometry.'
        ],
        keyConcept: {
          term: 'Constraint-Based Prompting',
          definition: 'Formulating prompts that specify functional dimensions, intended user interactions, and structural features rather than vague aesthetic adjectives.'
        },
        visualType: 'prompt_formula',
        proTip: 'Never prompt with adjectives alone (cool, pretty, nice). Always specify nouns and functional features (slot, base, chamfer).'
      },
      {
        id: 'm2-s2',
        badge: 'Lesson 2.2 · The PARTS Framework',
        title: 'The PARTS Formula for Product Design',
        subtitle: 'A reliable recipe to turn design thinking into precise 3D geometry.',
        paragraphs: [
          'In Singapore Design & Technology, we use the PARTS prompting formula to structure our prompts like professional industrial designers:',
          '• P - Persona & Purpose: Who is using it and for what? ("Ergonomic desk companion for secondary school study").\n• A - Angle & Ergonomics: How is the user positioned? ("60-degree viewing slot for hands-free video calls").\n• R - Routing & Openings: What practical cutouts are needed? ("Recessed cable notch for charging pass-through").\n• T - Theme & Form Language: What geometry defines the style? ("Geometric hexagonal base with beveled chamfers").\n• S - Scale & Structure: What are the physical boundaries? ("Weighted solid base to prevent tipping").',
          'When you combine these ingredients into a single prompt recipe, the AI has a clear blueprint to synthesize functional, elegant geometry.'
        ],
        keyConcept: {
          term: 'PARTS Framework',
          definition: 'A 5-part prompting methodology (Purpose, Angle, Routing, Theme, Structure) tailored for generative 3D product design.'
        },
        visualType: 'prompt_formula',
        proTip: 'Put functional features at the beginning of the prompt and aesthetic adjectives at the end to ensure the AI prioritizes usability.'
      },
      {
        id: 'm2-s3',
        badge: 'Lesson 2.3 · Physical Tolerances',
        title: 'Tolerances: Designing for Real Devices',
        subtitle: 'Why digital slots need wiggle room for real phone cases and cables.',
        paragraphs: [
          'In the digital world, objects can intersect without friction. But in the physical world, two solid items cannot occupy the same space.',
          'If a smartphone is 8mm thick, your 3D dock cradle slot must be at least 12mm to 14mm wide. Why? Because students use protective silicone or hard plastic phone cases, and a tight slot will scratch the screen.',
          'Similarly, charging cables have a stiff rubber neck. If your cable pass-through hole is too small or bends sharply at 90°, the internal copper wires will fray and break. Good design builds in generous clearance.'
        ],
        keyConcept: {
          term: 'Mechanical Tolerance',
          definition: 'The intentional physical clearance (extra millimeter gap) designed into parts to ensure they fit smoothly without jamming.'
        },
        visualType: 'ergonomics_diagram',
        proTip: 'Add 3mm to 5mm of clearance to device cradle slots to comfortably accommodate phone cases and pop-sockets.'
      }
    ],
    keyTakeaways: [
      'Vague prompts produce impractical blobs because AI lacks physical common sense.',
      'The PARTS formula (Purpose, Angle, Routing, Theme, Structure) guides AI to generate buildable geometry.',
      'Real products require physical tolerances (extra clearance) for phone cases and charging cables.'
    ]
  },
  3: {
    moduleId: 3,
    moduleCode: 'Module 3',
    moduleTitle: 'The 3D Synthesis',
    duration: '90 min',
    overview: 'Watch generative AI translate your prompt recipe into an interactive WebGL 3D model, and learn how to evaluate and iterate on the generated mesh.',
    slides: [
      {
        id: 'm3-s1',
        badge: 'Lesson 3.1 · Neural Synthesis',
        title: 'How 3D AI Builds a Mesh',
        subtitle: 'From text tokens to continuous volume inside your browser.',
        paragraphs: [
          'When you click "Synthesize 3D Model", Show3D transforms your prompt into mathematical tokens. These tokens navigate a multi-dimensional latent space trained on millions of 3D CAD assets and shapes.',
          'The AI generates a preliminary point cloud (thousands of coordinate dots in space). Next, a surface reconstruction algorithm connects the points into a continuous polygon mesh.',
          'Finally, the mesh is optimized and packaged into a WebGL format that your Chromebook or iPad can render in real time using your graphics hardware.'
        ],
        keyConcept: {
          term: '3D Latent Space',
          definition: 'A mathematical multidimensional map where the AI understands the geometric relationships between words and 3D shapes.'
        },
        visualType: 'compare_2d_3d',
        proTip: 'Real-time WebGL allows you to interact with complex 3D models right in the browser without installing heavy software.'
      },
      {
        id: 'm3-s2',
        badge: 'Lesson 3.2 · The Human Co-Pilot',
        title: 'The Human-in-the-Loop Mindset',
        subtitle: 'Why the first AI generation is a starting point, not the final product.',
        paragraphs: [
          'A common mistake beginners make is treating generative AI like a magical vending machine: you press a button once, and you expect perfection.',
          'Professional designers use the "Human-in-the-Loop" workflow. AI acts as a lightning-fast prototyping assistant that gives you an initial rough volume in seconds.',
          'Your job as the human designer is to evaluate the output critically: Does the cradle stand upright? Is the base wide enough to prevent tipping? Can the cable reach? If not, you iterate and refine!'
        ],
        keyConcept: {
          term: 'Human-in-the-Loop (HITL)',
          definition: 'A collaborative workflow where human intelligence directs, evaluates, and refines automated AI outputs.'
        },
        visualType: 'prompt_formula',
        proTip: 'Iteration is not failure—iteration is how great design happens in both school and industry.'
      },
      {
        id: 'm3-s3',
        badge: 'Lesson 3.3 · Spotting 3D Artifacts',
        title: 'How to Spot 3D AI Hallucinations',
        subtitle: 'Catching non-manifold geometry and floating parts before physical fabrication.',
        paragraphs: [
          'Just like language AI can hallucinate false facts, 3D AI can hallucinate flawed geometry:',
          '• Non-Manifold Edges: Geometry where faces have zero thickness or internal holes.\n• Floating Islands: Small disconnected pieces of mesh hovering in mid-air.\n• Inverted Normals: Faces that face inside-out, creating strange black shadows or transparent patches.',
          'By orbiting 360° and inspecting the model in wireframe mode, you can catch these artifacts and refine your parameters before moving to material customization.'
        ],
        keyConcept: {
          term: 'Manifold (Watertight) Geometry',
          definition: 'A solid 3D mesh with continuous, closed surfaces that has a clear inside and outside, essential for 3D printing.'
        },
        visualType: 'wireframe_diagram',
        proTip: 'A model is "watertight" if you could pour water inside it and none would leak out through holes in the mesh.'
      }
    ],
    keyTakeaways: [
      '3D AI transforms text into coordinate tokens, synthesizing points and polygonal meshes in WebGL.',
      'Adopt the Human-in-the-Loop mindset: AI creates the draft, but humans evaluate and guide the iteration.',
      'Always inspect 3D outputs 360° to catch hallucinations like floating fragments or non-manifold edges.'
    ]
  },
  4: {
    moduleId: 4,
    moduleCode: 'Module 4',
    moduleTitle: 'The Material Lab',
    duration: '60 min',
    overview: 'Explore the science of light, surface shaders, and physical materials to make your tech companion look, feel, and function like real gear.',
    slides: [
      {
        id: 'm4-s1',
        badge: 'Lesson 4.1 · Photons & Surfaces',
        title: 'How Light Works: Physically Based Rendering (PBR)',
        subtitle: 'Understanding roughness, metalness, and surface reflections.',
        paragraphs: [
          'In computer graphics, giving an object realistic appearance is called shading. Modern 3D engines use Physically Based Rendering (PBR), which simulates how real light particles (photons) bounce off surfaces.',
          'PBR relies on three core channels:\n1. Base Color (Albedo): The pure pigment of the material without shadows.\n2. Roughness: How microscopic bumps scatter light. Rough surfaces (rubber, matte wood) scatter light softly; smooth surfaces (polished glass) create sharp mirror reflections.\n3. Metalness: How conductive the surface is. Metals reflect the environment in their color; non-metals (dielectrics) reflect white light.',
          'By balancing these channels, you can make a digital model look like real anodized aluminum, warm bamboo, or cyberpunk neon.'
        ],
        keyConcept: {
          term: 'Physically Based Rendering (PBR)',
          definition: 'A computer graphics shading model that mimics real-world optical physics to render accurate light reflection on materials.'
        },
        visualType: 'pbr_properties',
        proTip: 'Matte stealth finishes (roughness ~0.8) are popular for desk accessories because they resist oily fingerprint smudges.'
      },
      {
        id: 'm4-s2',
        badge: 'Lesson 4.2 · Fabrication Physics',
        title: 'Choosing Materials for Physical 3D Printing',
        subtitle: 'Connecting digital 3D models to real materials in the school makerspace.',
        paragraphs: [
          'When you prepare to 3D print your tech companion in the school D&T lab, you must choose real physical filaments:',
          '• PLA Plastic: Made from renewable cornstarch. Inexpensive, easy to print, rigid, and available in vibrant colors. Perfect for desk organizers and phone cradles.\n• PETG: Tougher, heat-resistant, and slightly flexible. Excellent if your stand will sit in sunlight near a hot window.\n• Composite Wood Filament: Infused with 20% recycled wood fibers. Can be sanded, stained, and smells like real timber.',
          'Designing with the physical material in mind ensures your stand won’t warp or crack under daily use.'
        ],
        keyConcept: {
          term: 'Filament Properties',
          definition: 'The physical characteristics of 3D printing materials (tensile strength, heat resistance, weight, and surface finish).'
        },
        visualType: 'pbr_properties',
        proTip: 'For a desktop phone stand, PLA is the ideal filament because it prints with zero warping and crisp geometric corners.'
      },
      {
        id: 'm4-s3',
        badge: 'Lesson 4.3 · Ergonomic Legibility',
        title: 'Aesthetics on Your Desk: Light & Glare',
        subtitle: 'How color and texture affect your focus during homework and study.',
        paragraphs: [
          'A desk accessory sits in your peripheral vision for hours while you study or game. An overly glossy, mirror-bright chrome finish will reflect desk lamp glare directly into your eyes, causing eye fatigue.',
          'Industrial designers choose satin, matte, or textured finishes for desk items. Darker matte tones absorb light glare, while warm accent colors (like amber or teal) provide personality without visual distraction.',
          'In this module’s studio, you can test four curated finishes—Cyber Neon, Stealth Matte, Eco Bamboo, and Anodized Silver—to find the ideal balance of personality and focus.'
        ],
        keyConcept: {
          term: 'Visual Ergonomics',
          definition: 'Designing product surfaces and colors that eliminate distracting glare and reduce eye strain in study environments.'
        },
        visualType: 'pbr_properties',
        proTip: 'A two-tone design (dark matte chassis with a vibrant accent stripe) gives your dock a premium consumer tech look.'
      }
    ],
    keyTakeaways: [
      'PBR shading simulates optical physics using Base Color, Roughness (shine), and Metalness.',
      'Different 3D printing filaments (PLA, PETG, Wood composite) offer distinct strengths and tactile feel.',
      'Visual ergonomics matters: matte and satin finishes eliminate glare and eye fatigue during desk study.'
    ]
  },
  5: {
    moduleId: 5,
    moduleCode: 'Module 5',
    moduleTitle: 'Ergonomics & Peer Lab',
    duration: '60 min',
    overview: 'Test functional viewing angles for daily use, anchor 3D feedback pins on classmate projects, and master constructive peer critique.',
    slides: [
      {
        id: 'm5-s1',
        badge: 'Lesson 5.1 · Ergonomics in Action',
        title: 'The 60° Viewing Angle: Designing for Posture',
        subtitle: 'Why product geometry impacts your neck, spine, and daily comfort.',
        paragraphs: [
          'Ergonomics is the science of designing tools and environments to fit the human body safely and comfortably.',
          'When students look down at a flat phone lying on a desk, their neck bends at 45° to 60°. This posture multiplies the effective weight of the head on the cervical spine from 5kg to over 27kg (known as "text neck").',
          'By angling the device cradle at a 60° tilt, the phone screen points directly toward your eye level while seated. You can glance at notifications, study flashcards, or take a Zoom call with your spine in a neutral, healthy posture.'
        ],
        keyConcept: {
          term: 'The 60° Ergonomic Viewing Angle',
          definition: 'The optimal desktop phone cradle tilt that aligns screen visibility with seated eye level, reducing cervical neck strain.'
        },
        visualType: 'ergonomics_diagram',
        proTip: 'Angle plus weight: make sure the base is weighted or wide enough so tapping the top of the phone screen does not tip it backward.'
      },
      {
        id: 'm5-s2',
        badge: 'Lesson 5.2 · Cable Strain Relief',
        title: 'Cable Management: Preventing Cord Damage',
        subtitle: 'How smart pass-through notches protect your expensive charging cables.',
        paragraphs: [
          'Charging cables fail most frequently at the neck—the rubber joint right below the Lightning or USB-C plug. Sharp 90° bends cause the thin internal wires to fracture over time.',
          'An engineered phone dock incorporates a recessed pass-through notch and a gentle curved exit channel.',
          'This allows the cable to plug in smoothly while the phone rests in the cradle, keeping the cord straight and strain-free even when charging during use.'
        ],
        keyConcept: {
          term: 'Cable Strain Relief',
          definition: 'A structural channel that prevents charging cords from bending at sharp angles, extending their lifespan.'
        },
        visualType: 'ergonomics_diagram',
        proTip: 'Always design a 2mm rounded fillet on the edges of the cable notch to prevent plastic edges from fraying woven cables.'
      },
      {
        id: 'm5-s3',
        badge: 'Lesson 5.3 · Peer Critique',
        title: 'Constructive Critique with 3D Spatial Pins',
        subtitle: 'Why anchored 3D annotations beat vague chat comments every time.',
        paragraphs: [
          'In professional architecture and product design studios, teams don’t send long chat essays. They use spatial pins anchored directly to the 3D model coordinates.',
          'If a classmate places a pin on your cradle slot and writes: "Widen this slot by 4mm so thick bumper cases fit," you know exactly which face to adjust without guessing.',
          'The MOE D&T Rubric looks for constructive feedback: praise what succeeds, highlight a specific functional improvement, and propose a concrete solution.'
        ],
        keyConcept: {
          term: 'Spatial Annotation Pin',
          definition: 'A 3D coordinate marker that attaches feedback directly to a specific physical component of a digital model.'
        },
        visualType: 'authorship_matrix',
        proTip: 'Good feedback formula: 1) What works ("Great viewing tilt") + 2) Specific advice ("Widen cable notch by 5mm").'
      }
    ],
    keyTakeaways: [
      'Ergonomics prevents injury: a 60° cradle tilt prevents neck strain during desktop study and video calls.',
      'Cable pass-through channels provide strain relief, preventing broken charging cords.',
      '3D spatial annotation pins link feedback directly to coordinates, making peer critique specific and actionable.'
    ]
  },
  6: {
    moduleId: 6,
    moduleCode: 'Module 6',
    moduleTitle: 'Creator Showcase & Graduation',
    duration: '60 min',
    overview: 'Examine the ethics of AI authorship, celebrate your human design choices, and export your official MOE-aligned Show3D Creator Certificate.',
    slides: [
      {
        id: 'm6-s1',
        badge: 'Lesson 6.1 · The Authorship Question',
        title: 'Who is the Real Creator: You or the AI?',
        subtitle: 'Why human intentionality retains moral and creative ownership.',
        paragraphs: [
          'If an AI model synthesized the polygons of your 3D phone dock, can you honestly claim that YOU designed it?',
          'The answer from both Singapore MOE EdTech standards and international copyright law is an emphatic YES—provided you exercised human intentionality.',
          'Consider what you did:\n1. You identified the user need (desk clutter, study video calls, cable strain).\n2. You engineered the prompt recipe using the PARTS formula.\n3. You chose the physical materials and PBR shader properties.\n4. You tested the 60° ergonomic viewing angle and implemented classmate revisions.',
          'The AI is a computational synthesizer—a digital brush. The creativity, critical curation, and design decisions belong entirely to you.'
        ],
        keyConcept: {
          term: 'Human Intentionality',
          definition: 'The conscious, purposeful decision-making process by which a human directs, evaluates, and curates technological tools to solve a problem.'
        },
        visualType: 'authorship_matrix',
        proTip: 'Always be transparent about AI tool usage in your design portfolio: document what was human-directed and what was AI-synthesized.'
      },
      {
        id: 'm6-s2',
        badge: 'Lesson 6.2 · Computational Ethics',
        title: 'The Environmental Cost of AI Inference',
        subtitle: 'Why thoughtful, purposeful prompting is an ecological responsibility.',
        paragraphs: [
          'Every time a large neural network generates a 3D model, cloud servers in data centers run high-performance graphics processors (GPUs) at maximum capacity.',
          'These data centers consume substantial electrical power and require thousands of liters of cooling water. Frivolous, random spam generation wastes planetary resources.',
          'Being an ethical AI creator (MOE "Learn Beyond AI") means thinking before you prompt: plan your prompt recipe thoughtfully, evaluate each iteration with care, and create things that provide genuine value.'
        ],
        keyConcept: {
          term: 'Compute Sustainability',
          definition: 'Understanding the physical carbon, energy, and water footprint of cloud AI data centers and practicing mindful, purposeful technology usage.'
        },
        visualType: 'authorship_matrix',
        proTip: 'Plan your design on paper for 3 minutes before prompting—you will get better results and save computational energy.'
      },
      {
        id: 'm6-s3',
        badge: 'Lesson 6.3 · Digital Verification',
        title: 'Your Official MOE AI Creator Certificate',
        subtitle: 'Celebrating your graduation as a verified spatial computing creator.',
        paragraphs: [
          'Congratulations! You have completed all six modules of the Show3D AI Creator Programme.',
          'You have demonstrated the core competencies of the Singapore MOE EdTech Masterplan 2030:\n• Learn About AI: Coordinate space, vertices, and 3D meshes.\n• Learn to Use AI: Prompt recipes, PBR materials, and physical tolerances.\n• Learn With AI: Ergonomic testing and 3D peer critique pins.\n• Learn Beyond AI: Human authorship, ethics, and sustainable compute.',
          'You can now generate and download your official, verified MOE Course Certificate featuring your student name, school cohort, and verifiable credential record.'
        ],
        keyConcept: {
          term: 'MOE EdTech Masterplan 2030 Competency',
          definition: 'The official Singapore educational benchmark for student AI literacy, critical digital creation, and ethical technology mastery.'
        },
        visualType: 'authorship_matrix',
        proTip: 'Add your 3D model export (.GLTF) and certificate to your secondary school D&T portfolio for future polytechnic and university admissions!'
      }
    ],
    keyTakeaways: [
      'You are the true author because your human intentionality directed the problem definition, prompt recipe, and design refinements.',
      'Responsible AI literacy means being mindful of the real physical energy and water costs of cloud data centers.',
      'Your completed project satisfies the MOE EdTech Masterplan 2030 AI Literacy competencies across all "Four Learns".'
    ]
  }
};
