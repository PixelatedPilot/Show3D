# Handoff Report: Pedagogy, Curriculum & Compliance Specification

**Role**: Pedagogy, Curriculum & Compliance Explorer (`teamwork_preview_explorer_survey_2`)  
**Parent Orchestrator**: `teamwork_preview_orchestrator_1` (Conversation ID: `3ba8986c-f707-4b62-8a1b-f9d1db7005bd`)  
**Workspace Path**: `/Users/josephsukatendel/Documents/antigravity/sharp-curie`  
**Working Directory**: `/Users/josephsukatendel/Documents/antigravity/sharp-curie/.agents/teamwork/teamwork_preview_explorer_survey_2`  
**Date**: 2026-10-26T02:26:00Z  

---

## 1. Observation

Direct investigation of the repository and project artifacts revealed the following exact facts:

1. **Authoritative Requirements Document (`.agents/teamwork/ORIGINAL_REQUEST.md`)**:
   - Lines 12–17: Requirement R1 mandates an Apple Keynote-style Student Learning Experience with **exactly 3 visual concept slides per module** teaching spatial AI fundamentals:
     1. Coordinate Space
     2. Mesh Topology
     3. Prompt Scaffolding
     4. Digital Materials
     5. Ergonomics
     6. Sustainability
     Each slide must have a bold headline, friendly plain-language explanation, prominent Key Concept definition card, and speaker-note Pro Tip.
   - Lines 15–16: Interactive Co-Design Stage using visual recipe tokens (PARTS method) and architectural levers (curvature, reflectivity, solar wattage) with an instant crisp spatial preview card and a clean modal trigger to "Try in Show3D Canvas".
   - Lines 16–17: Formative Check & Badge with single-question check-in, immediate visual feedback explaining both correct and incorrect answers, digital competency badge, and portfolio record.
   - Lines 18–22: Facilitator Mode with Tab 1: Live Class Monitoring (28-student cohort, Class 3-Faith) and Tab 2: Curriculum & GeBIZ Procurement (MOE D&T rubrics, pre/post learning gain telemetry, GeBIZ quotes, School Enrichment Budget, PDPA safety).
   - Lines 23–28: R3 mandates substantive MOE pedagogy grounded in Seymour Papert's Constructionism, Singapore MOE D&T "Design-and-Make" syllabus, MOE "Four Learns" (WITH, ON, ABOUT, BEYOND AI), and Creator Ownership Scorecard (anti-cognitive offloading).
   - Lines 33–40: R5 mandates secondary research compliance: Singapore PDPA (Age 13+, SSO), zero model training on student prompts/geometries, Port 443 network readiness for MOE PLDs, 5,000 credit pool, GeBIZ quotes, School Enrichment Budget guidelines, and ALP themes without false grant claims.

2. **Existing Codebase State (`src/data/moduleLessons.ts` & `src/store/appStore.ts`)**:
   - `src/data/moduleLessons.ts` (lines 25–417) contains legacy draft lessons focusing on a desktop phone dock (`The 3D Dimension`, `The Prompt Forge`, `The 3D Synthesis`, `The Material Lab`, `Ergonomics & Peer Lab`, `Creator Showcase & Graduation`). While comprehensive, the naming and visual focus mix the courtyard pavilion with a desk companion dock, and do not cleanly match the 6 canonical modules required by R1:
     1. Coordinate Space
     2. Mesh Topology
     3. Prompt Scaffolding (PARTS recipe method)
     4. Digital Materials
     5. Ergonomics
     6. Sustainability
   - `src/components/student/StudentKeynoteDeck.tsx` (lines 59–60, 182–553) implements a 6-stage presentation flow (Slide 1, Slide 2, Slide 3, Co-Design Challenge, Formative Quiz, Badge & Summary). However, its Co-Design Stage currently hardcodes a single courtyard pavilion model and token set regardless of the active module.
   - `src/store/appStore.ts` (lines 328–357) tracks a 28-student cohort for Class 3-Faith with pre/post diagnostic scores, credit usage, and demonstrated skills.
   - `src/components/layout/SchoolProcurementModal.tsx` and `StudentSafetyModal.tsx` already capture institutional compliance parameters (Age 13+, Port 443, 5,000 credits, GeBIZ e-invoicing, decentralized enrichment budget) but these need to be consolidated directly into the primary Facilitator Hub view (Tab 2) as required by R2.

---

## 2. Logic Chain

From these observations, the pedagogical, curriculum, and compliance architecture must be organized into five tightly coupled structures:

```
[Singapore Secondary MOE D&T Priorities]
               │
               ▼
┌───────────────────────────────────────────────┐
│ 6 Modules (18 Visual Slides + Key Concepts)   │
│ 1. Coordinate Space   2. Mesh Topology        │
│ 3. Prompt Scaffolding 4. Digital Materials    │
│ 5. Ergonomics         6. Sustainability       │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ Interactive Co-Design Stage (Apple HIG)       │
│ - PARTS Scaffolding Tokens                    │
│ - Architectural Levers (Curve, Albedo, Solar) │
│ - Crisp Vector Spatial Preview (Port 443)     │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ Formative Check & Explanatory Feedback        │
│ - 3 Diagnostic Options per Module             │
│ - Clear Justifications (Why Right / Wrong)    │
│ - Apple-Style Competency Badge & Portfolio    │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ Pedagogical Governance & Anti-Offload         │
│ - Papert's Constructionism ("Design & Make")  │
│ - MOE Four Learns (ABOUT, USE, WITH, BEYOND)  │
│ - Creator Ownership Scorecard (Intent Metric) │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ Secondary Research Compliance                 │
│ - Singapore PDPA (Age 13+, SSO)               │
│ - Zero Model Training on Student Data         │
│ - MOE PLD Port 443 Readiness                  │
│ - 5,000 Pooled Credits & GeBIZ E-Invoicing    │
│ - Decentralized School Enrichment Budget      │
└───────────────────────────────────────────────┘
```

Below are the complete, turnkey specifications for all five areas:

---

### Component A: The 6 Curriculum Modules (Complete 18-Slide Specification)

#### Module 1: Coordinate Space
- **Module ID**: 1 | **Code**: `Module 1` | **Title**: `Coordinate Space`
- **Duration**: `60 min` | **MOE Alignment**: `Learn About AI`
- **Summary**: Discover how computers move from flat 2D screens into real physical volume using three simple coordinates: Width (X), Height (Y), and Depth (Z).
- **Badge**: `Spatial Scout` | **Key Skill**: `3D Cartesian Coordinates & Volume`

* **Slide 1.1**:
  * **Badge**: `Slide 1.1 · Dimensions & Depth`
  * **Headline**: `Beyond Flat Screens: Meet the Z-Axis`
  * **Subtitle**: `Why volumetric 3D models are fundamentally different from 2D pixel photos.`
  * **Explanation**:
    Every image you view on your phone or web browser is a flat 2D picture made of horizontal (X) and vertical (Y) pixels. If you want to look at the back or underside of an object in a photo, you cannot—that information simply does not exist.
    In 3D spatial computing, an extra dimension called Depth (Z) is introduced. This creates a virtual volume where objects have real physical thickness, allowing you to walk around them 360°, inspect every angle, and send them to your school workshop's 3D printer.
  * **Key Concept Card**:
    * **Term**: `The Z-Axis (Spatial Depth)`
    * **Definition**: `The third mathematical dimension that transforms flat 2D planes into volumetric 3D objects that can be rotated, measured, and physically manufactured.`
  * **Pro Tip**: `Remember: in standard 3D software, X is red (horizontal width), Y is green (vertical height), and Z is blue (depth towards and away from you).`

* **Slide 1.2**:
  * **Badge**: `Slide 1.2 · The Center of the World`
  * **Headline**: `The World Origin: Where Everything Begins`
  * **Subtitle**: `How coordinate spaces anchor digital objects in simulated space.`
  * **Explanation**:
    Every 3D space possesses an anchor point called the World Origin, located at (0, 0, 0) where the X, Y, and Z axes intersect. When you place a courtyard bench or a desk dock into a virtual scene, the computer calculates its position relative to this exact center.
    If an object is placed at (0, 0, 0), it rests centered on your floor grid. Understanding coordinates ensures your structures sit firmly on the ground plane rather than floating in empty air or clipping through the floor.
  * **Key Concept Card**:
    * **Term**: `The World Origin (0, 0, 0)`
    * **Definition**: `The fixed universal reference point in 3D coordinate space from which all digital object positions, rotations, and scales are calculated.`
  * **Pro Tip**: `Always align the bottom base of your design with Y=0 (the ground plane) so it rests flat when imported into school 3D slicers or game engines.`

* **Slide 1.3**:
  * **Badge**: `Slide 1.3 · Real-World Sizing`
  * **Headline**: `Bounding Boxes: Sizing Up Physical Scale`
  * **Subtitle**: `Connecting abstract digital units to millimeter workshop measurements.`
  * **Explanation**:
    Before generative AI synthesizes a 3D model, it requires boundaries. A bounding box is an invisible mathematical envelope that tightly encloses your design, defining its maximum width, height, and depth in millimeters.
    In Singapore Design & Technology, scale is everything. An outdoor courtyard pavilion has a bounding envelope of 4,000mm × 3,500mm × 2,800mm, whereas a desktop companion dock is 90mm × 80mm × 110mm. Specifying physical scale prevents models from generating microscopic or colossal.
  * **Key Concept Card**:
    * **Term**: `Bounding Box (Physical Envelope)`
    * **Definition**: `The minimum three-dimensional rectangular boundary enclosing an object, determining its true millimeter footprint and physical volume.`
  * **Pro Tip**: `Always check your design's bounding box in millimeters before generating; it saves hours of resizing in your school's 3D printing software.`

---

#### Module 2: Mesh Topology
- **Module ID**: 2 | **Code**: `Module 2` | **Title**: `Mesh Topology`
- **Duration**: `60 min` | **MOE Alignment**: `Learn About AI`
- **Summary**: Master the structural wireframe skeleton beneath every 3D surface: vertices, edges, triangles, and polygon density.
- **Badge**: `Mesh Architect` | **Key Skill**: `Polygonal Meshes & Watertight Geometry`

* **Slide 2.1**:
  * **Badge**: `Slide 2.1 · The Wireframe Skeleton`
  * **Headline**: `Vertices, Edges & Faces: The 3D Skeleton`
  * **Subtitle**: `How computers assemble complex curved products from simple triangles.`
  * **Explanation**:
    Underneath every sleek car, video game environment, or ergonomic phone cradle is a polygonal mesh—a wireframe skeleton made of three simple geometric elements:
    1. Vertices: Points located at specific (X, Y, Z) coordinate positions.
    2. Edges: Straight mathematical lines connecting two vertices.
    3. Faces: Flat triangular surfaces enclosed by three edges.
    Graphics processing units (GPUs) love triangles because three points in space are always planar (completely flat), allowing rapid real-time rendering at 60 frames per second.
  * **Key Concept Card**:
    * **Term**: `Polygonal Mesh`
    * **Definition**: `A network of vertices (points), edges (lines), and polygon faces (surfaces) that defines the boundary and shape of a digital 3D object.`
  * **Pro Tip**: `Click 'Wireframe Mode' in Show3D to reveal the underlying triangle skeleton and check if your geometry is clean and evenly spaced.`

* **Slide 2.2**:
  * **Badge**: `Slide 2.2 · Performance & Smoothness`
  * **Headline**: `Polygon Budget: Balancing Curvature & Device Speed`
  * **Subtitle**: `Why more triangles look smoother but can slow down school Chromebooks.`
  * **Explanation**:
    To make a curved roof or a round volume look smooth, a 3D model needs more triangles. However, having millions of triangles requires immense computing memory, which can cause school Personal Learning Devices (PLDs) to freeze or stutter.
    Industrial designers operate with a 'polygon budget'. They optimize curves with just enough triangles to look clean and tactile, while keeping file sizes lightweight for instant web loading and smooth 60 FPS interactions.
  * **Key Concept Card**:
    * **Term**: `Polygon Budget (Polycount)`
    * **Definition**: `The allocated maximum number of triangular polygons in a 3D asset, balancing visual surface smoothness against device rendering performance.`
  * **Pro Tip**: `For school PLD web applications, aim for 8,000 to 25,000 triangles—this creates silky smooth curves while loading in under 1 second.`

* **Slide 2.3**:
  * **Badge**: `Slide 2.3 · Physical Fabrication`
  * **Headline**: `Watertight Geometry: Ready for the Workshop`
  * **Subtitle**: `Why 3D printers require closed, manifold solids with zero holes.`
  * **Explanation**:
    In digital space, surfaces can be paper-thin with zero weight. But in the physical workshop, every object must have solid thickness and volume.
    A mesh is described as 'manifold' or 'watertight' when its outer shell forms a continuous, completely sealed volume with no missing faces, inverted normals, or internal floating shards. If you could pour water inside your 3D model and none would leak out, it is ready to be 3D printed!
  * **Key Concept Card**:
    * **Term**: `Manifold (Watertight) Mesh`
    * **Definition**: `A closed 3D geometric volume without holes, non-manifold edges, or inverted faces, required for physical 3D printing and manufacturing.`
  * **Pro Tip**: `If slicing software displays warning highlights, check for non-manifold edges or holes before starting your print to prevent wasted plastic filament.`

---

#### Module 3: Prompt Scaffolding (PARTS Recipe Method)
- **Module ID**: 3 | **Code**: `Module 3` | **Title**: `Prompt Scaffolding`
- **Duration**: `90 min` | **MOE Alignment**: `Learn to Use AI`
- **Summary**: Formulate structured 3D prompt recipes using the Singapore D&T PARTS formula (Persona, Aim, Recipients, Theme, Structure).
- **Badge**: `Prompt Engineer` | **Key Skill**: `PARTS Method & Constraint Prompting`

* **Slide 3.1**:
  * **Badge**: `Slide 3.1 · The Blank Canvas Trap`
  * **Headline**: `Why Vague Prompts Produce Melted 3D Blobs`
  * **Subtitle**: `Generative AI lacks physical common sense without explicit functional constraints.`
  * **Explanation**:
    When students type vague requests like 'make a cool modern bench' into a 3D generative model, they almost always get an impractical, melted plastic blob.
    Why? In 2D image generators, 'cool' can be interpreted as moody colors or lighting. But in 3D product design, 'cool' tells the computer nothing about physical load, seating height, device slots, or weather resistance. To get workable geometry, you must provide structured physical constraints.
  * **Key Concept Card**:
    * **Term**: `Constraint-Based Prompting`
    * **Definition**: `Formulating generative prompts using functional dimensions, ergonomic angles, and structural features rather than vague aesthetic adjectives.`
  * **Pro Tip**: `Never use aesthetic adjectives alone (cool, pretty, stylish). Always pair them with functional nouns (tensile canopy, cable notch, hexagonal base).`

* **Slide 3.2**:
  * **Badge**: `Slide 3.2 · The PARTS Framework`
  * **Headline**: `The PARTS Recipe: Design Thinking in Code`
  * **Subtitle**: `A structured 5-part formula tailored for Singapore D&T generative design.`
  * **Explanation**:
    Singapore secondary schools use the PARTS framework to engineer prompts like professional industrial designers:
    - **P (Persona)**: Your design role (*"Sustainable school architect..."*)
    - **A (Aim)**: The functional objective (*"Outdoor courtyard shelter to reduce 34°C heat..."*)
    - **R (Recipients)**: Who will use it (*"Secondary students during afternoon recess..."*)
    - **T (Theme)**: The architectural styling (*"Biophilic tensile curvature with timber accents..."*)
    - **S (Structure)**: The physical parts (*"450W solar array, cross-ventilation louvers, modular seating..."*)
  * **Key Concept Card**:
    * **Term**: `The PARTS Framework`
    * **Definition**: `A 5-part prompting methodology (Persona, Aim, Recipients, Theme, Structure) tailored for generative 3D spatial engineering.`
  * **Pro Tip**: `Write P and A first to anchor your user problem, then finish with S to specify the exact physical components you want the AI to synthesize.`

* **Slide 3.3**:
  * **Badge**: `Slide 3.3 · Direct Manipulation`
  * **Headline**: `Architectural Levers: Guiding the Generative Engine`
  * **Subtitle**: `Using sliders and tactile controls to shape curvature, albedo, and wattage.`
  * **Explanation**:
    Prompt words are just the starting blueprint; great design requires direct human adjustment. Instead of re-typing prompts repeatedly, Show3D equips you with tactile architectural levers.
    Adjust canopy curvature to optimize aerodynamics, tune surface reflectivity to reject midday sun, and toggle 450W solar arrays to power phone charging ports. Combining prompt recipes with parametric levers gives you full creative agency.
  * **Key Concept Card**:
    * **Term**: `Parametric Levers`
    * **Definition**: `Direct tactile controls (sliders and toggles) that adjust mathematical algorithm weights to fine-tune physical and geometric attributes.`
  * **Pro Tip**: `Adjust your curvature slider first to get the main aerodynamic silhouette right before dialing in solar wattage and surface finishes.`

---

#### Module 4: Digital Materials
- **Module ID**: 4 | **Code**: `Module 4` | **Title**: `Digital Materials`
- **Duration**: `60 min` | **MOE Alignment**: `Learn to Use AI`
- **Summary**: Explore Physically Based Rendering (PBR), light reflection channels, tropical solar albedo, and physical 3D print filaments.
- **Badge**: `Material Alchemist` | **Key Skill**: `PBR Shaders & Solar Reflectivity`

* **Slide 4.1**:
  * **Badge**: `Slide 4.1 · Optical Physics`
  * **Headline**: `Light & Surfaces: Physically Based Rendering (PBR)`
  * **Subtitle**: `Understanding Base Color, Roughness, and Metalness in computer graphics.`
  * **Explanation**:
    In modern computer graphics, giving a digital object a realistic appearance is called shading. Show3D uses Physically Based Rendering (PBR), which simulates how real sunlight photons bounce off surfaces.
    PBR relies on three core channels:
    1. Base Color (Albedo): The pure surface pigment without shadows.
    2. Roughness: Microscopic surface texture. Rough surfaces (matte wood) scatter light softly; smooth surfaces (polished chrome) reflect clear mirror reflections.
    3. Metalness: Whether the material conducts electricity like aluminum or acts as an insulator like plastic.
  * **Key Concept Card**:
    * **Term**: `Physically Based Rendering (PBR)`
    * **Definition**: `A computer graphics shading model that mimics real optical physics to render accurate light reflection, diffusion, and surface texture.`
  * **Pro Tip**: `Matte finishes with roughness around 0.75 are ideal for student study products because they eliminate distracting desk lamp glare.`

* **Slide 4.2**:
  * **Badge**: `Slide 4.2 · Tropical Architecture`
  * **Headline**: `Tensile Fabrics & Solar Glass: Beating the Sun`
  * **Subtitle**: `How high-albedo materials keep outdoor courtyard spaces cool.`
  * **Explanation**:
    In Singapore's tropical climate, building materials must withstand intense heat and UV rays. A dark metal roof absorbs solar radiation, turning outdoor courtyards into heat traps exceeding 40°C.
    Architects select high-albedo tensile PTFE membrane fabrics that reflect up to 85% of solar heat away into the atmosphere, keeping students cool underneath while allowing soft, diffused daylight to illuminate the seating area.
  * **Key Concept Card**:
    * **Term**: `Solar Reflectivity (Albedo)`
    * **Definition**: `The proportion of solar radiation reflected by a surface material, crucial for reducing ambient heat and combating urban heat islands.`
  * **Pro Tip**: `Choose bright white or light teal tensile fabrics for outdoor school canopies to maximize solar reflection and maintain comfortable shaded seating.`

* **Slide 4.3**:
  * **Badge**: `Slide 4.3 · Workshop Filaments`
  * **Headline**: `From Screen to Filament: Choosing 3D Print Materials`
  * **Subtitle**: `Matching digital CAD designs to physical thermoplastics in the makerspace.`
  * **Explanation**:
    When bringing your digital companion from the screen into the school D&T lab, you must choose real physical filaments:
    - **PLA Plastic**: Made from renewable cornstarch. Inexpensive, rigid, odorless, and easy to print with zero warping. Perfect for desk organizers.
    - **PETG Plastic**: Highly impact- and UV-resistant. Ideal for outdoor brackets exposed to hot Singapore rain and sun.
    - **Wood Composite**: Blended with 20% recycled sawdust. Can be sanded and stained, offering a warm tactile organic touch.
  * **Key Concept Card**:
    * **Term**: `Thermoplastic Filament`
    * **Definition**: `The physical spool of polymer material (PLA, PETG, Composite) melted and extruded layer-by-layer by a 3D printer to fabricate solid objects.`
  * **Pro Tip**: `Standard PLA is the safest and most reliable filament for secondary school labs—it emits no toxic odors and prints cleanly at 200°C.`

---

#### Module 5: Ergonomics
- **Module ID**: 5 | **Code**: `Module 5` | **Title**: `Ergonomics`
- **Duration**: `60 min` | **MOE Alignment**: `Learn With AI`
- **Summary**: Design for human posture, physical clearance tolerances, cable strain relief, and constructive 3D peer critique.
- **Badge**: `Ergonomic Specialist` | **Key Skill**: `Posture Angles, Tolerances & 3D Critique Pins`

* **Slide 5.1**:
  * **Badge**: `Slide 5.1 · Spine & Posture`
  * **Headline**: `The 60° Angle: Designing for Healthy Posture`
  * **Subtitle**: `Why product geometry directly protects your cervical spine and neck.`
  * **Explanation**:
    Ergonomics is the science of designing products and environments to fit the human body comfortably and safely.
    When students hunch over a phone lying flat on a study desk, their neck bends at 45° to 60°. This posture multiplies the gravitational weight of the head on the cervical spine from 5kg to over 27kg—a leading cause of student fatigue and 'text neck'.
    Angling device cradles at a 60° tilt aligns the screen with natural seated eye level, keeping the spine in a neutral posture during homework and video calls.
  * **Key Concept Card**:
    * **Term**: `The 60° Ergonomic Viewing Angle`
    * **Definition**: `The optimal desktop tilt angle that aligns device visibility with seated eye level, eliminating cervical neck strain and posture fatigue.`
  * **Pro Tip**: `Ensure the weighted base of your stand extends forward far enough to keep the center of gravity stable when tapping the top of the phone screen.`

* **Slide 5.2**:
  * **Badge**: `Slide 5.2 · Mechanical Tolerances`
  * **Headline**: `Clearance & Strain Relief: Preventing Broken Cables`
  * **Subtitle**: `Designing extra millimeter gaps for phone cases and charging cords.`
  * **Explanation**:
    In 3D CAD software, virtual objects can intersect with zero friction. But in physical reality, two solid objects cannot occupy the same space.
    If a phone is 8mm thick, your cradle slot must be at least 12mm to 14mm wide to accommodate protective bumper cases.
    Similarly, charging cables fracture if bent sharply at 90 degrees. An engineered dock includes a recessed cable pass-through notch and smooth 3mm rounded fillets for gentle strain relief.
  * **Key Concept Card**:
    * **Term**: `Mechanical Clearance & Strain Relief`
    * **Definition**: `Intentional extra spacing and curved channels designed into parts to ensure smooth assembly and prevent electrical wire fatigue.`
  * **Pro Tip**: `Always round off interior edges of your cable notch with a 2mm–3mm fillet to prevent rigid plastic corners from fraying woven cables.`

* **Slide 5.3**:
  * **Badge**: `Slide 5.3 · Peer Collaboration`
  * **Headline**: `3D Spatial Annotation Pins: Actionable Critique`
  * **Subtitle**: `Why anchored 3D markers beat vague text comments in design reviews.`
  * **Explanation**:
    In professional design and engineering studios, teams don't send long text messages. They place 3D annotation pins anchored directly to specific spatial coordinates on the digital prototype.
    When reviewing a classmate's project, use the Singapore D&T constructive critique formula:
    1. Praise what works: *"The 60° angle provides great visibility."*
    2. Highlight a specific limitation: *"The cable notch is only 6mm wide."*
    3. Recommend a concrete fix: *"Widen the notch to 12mm so braided USB-C cables fit."*
  * **Key Concept Card**:
    * **Term**: `Spatial Annotation Pin`
    * **Definition**: `A 3D coordinate marker that attaches specific, actionable design feedback directly to physical geometry on a digital model.`
  * **Pro Tip**: `Constructive peer feedback is always measurable: don't just say 'widen this'—suggest the exact millimeter dimensions needed.`

---

#### Module 6: Sustainability
- **Module ID**: 6 | **Code**: `Module 6` | **Title**: `Sustainability`
- **Duration**: `60 min` | **MOE Alignment**: `Learn Beyond AI`
- **Summary**: Address urban climate resilience, compute energy sustainability, and assert human intentionality over AI tools.
- **Badge**: `Certified Spatial Creator` | **Key Skill**: `Compute Ethics & Creator Ownership`

* **Slide 6.1**:
  * **Badge**: `Slide 6.1 · Climate Resilience`
  * **Headline**: `Beating the Urban Heat Island: Passive Courtyard Cooling`
  * **Subtitle**: `Designing aerodynamic shade structures that lower Singapore temperatures naturally.`
  * **Explanation**:
    Concrete school courtyards in Singapore absorb afternoon sunlight and radiate heat, creating an 'Urban Heat Island' effect where ground temperatures exceed 38°C.
    Sustainable architectural design employs passive cooling strategies:
    - Saddle-curved tensile canopies that create natural thermal updrafts.
    - Open cross-ventilation draft gaps that capture Singapore's northeast and southwest monsoon breezes.
    - Integrated biophilic planter modules that cool the air through plant evapotranspiration.
  * **Key Concept Card**:
    * **Term**: `Passive Urban Cooling`
    * **Definition**: `Architectural design strategies (aerodynamic geometry, shading, and natural breezes) that lower ambient temperatures without powered air conditioning.`
  * **Pro Tip**: `Orient your canopy's open cross-ventilation gaps towards prevailing wind directions to maintain a continuous natural breeze through the courtyard.`

* **Slide 6.2**:
  * **Badge**: `Slide 6.2 · Compute Ethics`
  * **Headline**: `The Hidden Carbon Cost of AI: Compute Sustainability`
  * **Subtitle**: `Why mindful prompt recipes conserve data center power and clean water.`
  * **Explanation**:
    Generating 3D models with neural networks feels instant, but cloud data centers consume substantial electrical power and thousands of liters of clean water for cooling high-performance GPUs.
    Thoughtless, repetitive prompt spamming wastes planetary resources. Being an ethical AI creator (MOE 'Learn Beyond AI') means thinking before you prompt: plan your prompt recipe on paper, analyze your constraints, and generate with clear purpose.
  * **Key Concept Card**:
    * **Term**: `Compute Sustainability`
    * **Definition**: `Awareness of the physical electrical and water footprint of cloud AI inference, encouraging purposeful and efficient prompting habits.`
  * **Pro Tip**: `Spend 3 minutes sketching your prompt tokens and physical constraints before generating; you will get better geometry on your first try and save energy.`

* **Slide 6.3**:
  * **Badge**: `Slide 6.3 · Creative Authorship`
  * **Headline**: `Who is the Creator? You vs. The Neural Network`
  * **Subtitle**: `Why human intentionality retains moral ownership and creative credit.`
  * **Explanation**:
    If a generative AI algorithm synthesized the polygons of your 3D canopy or dock, can you honestly claim that YOU are the creator?
    The answer from Singapore MOE EdTech standards is an emphatic YES—provided you exercised human intentionality!
    Consider what you did:
    1. You identified the user problem (school courtyard heat or desk neck fatigue).
    2. You engineered the prompt recipe using the PARTS method.
    3. You selected the sustainable materials and PBR surface properties.
    4. You tested ergonomic angles, reviewed peer feedback, and refined the design.
    The AI is a digital chisel. The creativity, empathy, and design decisions belong entirely to you.
  * **Key Concept Card**:
    * **Term**: `Human Intentionality (Anti-Cognitive Offload)`
    * **Definition**: `The deliberate human reasoning, problem framing, critical evaluation, and aesthetic curation that maintains creative ownership over AI tools.`
  * **Pro Tip**: `Always document your design rationale in your D&T portfolio: explaining your intentional choices proves that you directed the AI rather than let the AI think for you.`

---

### Component B: Interactive Co-Design Stage Mechanics

The Co-Design card seamlessly bridges theory and practice using an Apple Intelligence-inspired UI:

1. **PARTS Scaffolding Tokens**:
   - **Persona**: `[Architect]`, `[Industrial Designer]`, `[Ergonomist]`, `[Eco-Specialist]`
   - **Aim**: `[Courtyard Cooling Pavilion]`, `[Ergonomic Study Companion]`, `[Acoustic Pod]`, `[Modular Bench]`
   - **Recipients**: `[Secondary 3 Students]`, `[D&T Cohort]`, `[Campus Community]`, `[Study Groups]`
   - **Theme**: `[Biophilic Curvature]`, `[Minimalist Precision]`, `[Tensile Aerodynamic]`, `[Modern Timber]`
   - **Structure**: `[Tensile Fabric Canopy]`, `[450W Solar Roof Array]`, `[Cross-Ventilation Draft Gaps]`, `[Modular Timber Benches]`, `[Cable Pass-Through Notch]`, `[Weighted Hexagonal Foot]`
   - **Interaction**: Single-click to add or remove tokens with subtle spring animation, updating the synthesized prompt recipe text dynamically.

2. **Parametric Architectural Levers**:
   - **Canopy Curvature Slider (`0% – 100%`)**: Adjusts aerodynamic saddle curvature in real-time, morphing the SVG spatial preview vectors between flat, parabolic, and hyperbolic tensile geometries.
   - **Surface Reflectivity / Albedo Swatches**:
     - `#0A84FF` (Atmospheric Sky Blue · 72% Albedo)
     - `#FFFFFF` (High-Albedo Solar White · 88% Albedo · Coolest Microclimate)
     - `#30D158` (Biophilic Palm Green · Natural Shading)
     - `#FF9F0A` (Warm Amber · Evening Illumination Accent)
   - **450W Solar Array Toggle**:
     - Instant switch with tactile green indicator.
     - Adds photovoltaic dark-cell geometry to the roof structure and enables power generation telemetry (charging up to 8 student devices simultaneously).

3. **Crisp Spatial Vector Preview Card**:
   - High-contrast Apple dark aesthetic (`#090B10` background, 24px subtle coordinate grid).
   - Dynamically reactive vector SVG illustrating canopy curves, structural steel columns, solar array, and timber decking.
   - **Security Pill**: `MOE PLD Safe · Port 443` with pulsing green liveness dot.
   - **Action Trigger**: Prominent button `"Try in Show3D Canvas"` opening the full WebGL Three.js interactive viewport with OrbitControls, camera presets, and wireframe inspection.

---

### Component C: Formative Checks, Feedback, Badges & Portfolio Records

Each module culminates in a single high-impact diagnostic question with 3 options, providing instant pedagogical feedback for both correct and incorrect choices:

| Module | Diagnostic Question | Correct Answer & Feedback | Incorrect Distractor 1 & Feedback | Incorrect Distractor 2 & Feedback | Digital Badge |
|---|---|---|---|---|---|
| **Mod 1: Coordinate Space** | Why does adding a third dimension (Z-axis) make a 3D model far more useful for D&T than a flat 2D picture? | **A: You can orbit 360°, inspect real physical dimensions, and send it to a 3D printer for fabrication.**<br>*Spot on! The Z-axis adds physical volume and mathematical depth, enabling full rotational inspection and physical manufacturing.* | **B: 3D model files are always much smaller in megabytes than 2D photos.**<br>*Not quite. File size depends on complexity, not dimensions. 3D's true superpower is physical volume and 360° inspection.* | **C: 3D models can only be viewed in black and white wireframes.**<br>*Incorrect. 3D models support rich PBR materials, realistic colors, surface textures, and dynamic lighting reflections.* | **Spatial Scout Badge** |
| **Mod 2: Mesh Topology** | Why must a 3D design be 'manifold' (watertight) before sending it to a school 3D printer? | **B: 3D printers need a continuous, closed volume with clear inside and outside walls to slice solid material layers without errors.**<br>*Exactly right! A manifold mesh has no holes or inverted faces, allowing slicing software to calculate solid plastic infill without failing.* | **A: Because it makes the 3D printer print twice as fast regardless of temperature.**<br>*Print speed depends on printer hardware and layer height settings, not whether the mesh is manifold.* | **C: Because non-manifold models consume too much electricity from the wall outlet.**<br>*A flawed mesh causes print failures and physical jams, not electrical overloads. Slicers simply cannot interpret broken geometry.* | **Mesh Architect Badge** |
| **Mod 3: Prompt Scaffolding** | How does the Singapore D&T PARTS framework help you avoid 'melted plastic blobs' when using 3D AI? | **B: It replaces vague aesthetic adjectives with specific functional constraints: Persona, Aim, Recipients, Theme, and physical Structure.**<br>*Bingo! 3D generative AI requires clear mechanical constraints rather than subjective words like 'cool' or 'futuristic'.* | **A: It automatically purchases paid credits from the school store.**<br>*PARTS is a structured thinking framework, not a financial payment tool.* | **C: It bypasses the AI completely and loads a pre-made model from a video game.**<br>*The PARTS framework guides generative synthesis; it does not download pre-made game assets. You remain the designer.* | **Prompt Engineer Badge** |
| **Mod 4: Digital Materials** | When designing an outdoor courtyard canopy for Singapore's sunny weather, why is high-albedo tensile fabric superior to dark metal sheets? | **A: High-albedo white fabrics reflect up to 85% of solar heat, preventing heat build-up underneath while allowing diffused natural daylight to pass through.**<br>*Brilliant! High reflectivity bounces solar radiation away, lowering ambient temperatures beneath the canopy and combating the urban heat island effect.* | **B: Dark metal sheets attract more Wi-Fi signal to the school courtyard.**<br>*Metal surfaces actually reflect and block radio frequency Wi-Fi waves, and dark materials absorb intense heat, creating an unbearable microclimate.* | **C: Tensile fabrics are 100% soundproof and completely block all wind.**<br>*Tensile canopies are designed to encourage natural cross-ventilation breezes, not block air or create airtight chambers.* | **Material Alchemist Badge** |
| **Mod 5: Ergonomics** | Why is a 60° cradle viewing angle critical when designing a secondary student study companion? | **A: It aligns the screen with natural seated eye level, reducing cervical neck strain caused by looking down at flat desks.**<br>*Spot on! Angling the screen at 60° keeps the neck and spine in a neutral posture, preventing the 27kg gravitational strain of 'text neck' during long study sessions.* | **B: It prevents other students in the classroom from seeing what is on your screen.**<br>*Ergonomics is about human physiology, posture, and musculoskeletal comfort, not screen privacy filters.* | **C: 60° is the only angle at which wireless charging signals can travel through plastic.**<br>*Wireless charging operates via inductive magnetic fields which work regardless of angle, as long as coils are within 3–5mm of alignment.* | **Ergonomic Specialist Badge** |
| **Mod 6: Sustainability** | Why does human intentionality give YOU creative ownership of your 3D design, even though AI generated the initial polygons? | **B: Because you identified the user need, engineered the prompt recipe, selected sustainable materials, tested ergonomics, and refined the design.**<br>*Exactly right! Creative authorship belongs to the human mind that directs the problem-solving journey. AI is a digital chisel; you are the architect.* | **A: Because AI models are legally classified as biological humans in Singapore.**<br>*AI models are mathematical software tools without legal personhood, moral agency, or creative rights.* | **C: Because you clicked the 'Generate' button faster than anyone else in your class.**<br>*Speed has nothing to do with creative authorship. True ownership comes from thoughtful design decisions, critical evaluation, and human purpose.* | **Certified Spatial Creator Badge** |

---

### Component D: Pedagogical Frameworks & Learning Science

1. **Seymour Papert's Constructionism**:
   - Grounded in Papert’s seminal insight that the deepest learning occurs when students actively construct a tangible, personally meaningful, and sharable public artifact (an "object-to-think-with").
   - Spatial 3D models in Show3D serve as digital "microworlds" where students test hypotheses about heat, shade, structural balance, and ergonomics in real-time.
   - Productive struggle: AI provides rapid drafts, but students must troubleshoot flaws (imperfect meshes, steep overhangs, weak base stability) through iterative refinement.

2. **Singapore MOE D&T "Design-and-Make" Syllabus**:
   - Fully aligned with Lower Secondary Design & Technology core curriculum:
     - **Phase 1: Need Identification & Empathy**: Tackles authentic Singapore campus pain points (midday 34°C courtyard heat / study neck strain).
     - **Phase 2: Idea Scaffolding & Concept Generation**: Systematically translates user requirements into PARTS prompt recipes.
     - **Phase 3: Development & Virtual Prototyping**: Modulates curvature, albedo, and 450W solar arrays with direct human craft.
     - **Phase 4: Testing & Evaluation**: Tests 60° ergonomics, cable strain relief, and engages in collaborative peer review with 3D spatial pins.

3. **MOE "Four Learns" Framework**:
   - **Learn ABOUT AI**: Demystifies Cartesian grids, vector surface normals, polygonal polycounts, and latent diffusion. AI is presented as mathematical geometry, not magical mystery.
   - **Learn to USE AI**: Teaches the PARTS prompt scaffolding framework, parametric levers, and PBR shader materials to generate functional physical solutions.
   - **Learn WITH AI**: Partners with generative AI as an iterative co-pilot, conducting ergonomic evaluations, physical clearance calculations, and collaborative peer critique.
   - **Learn BEYOND AI**: Critically evaluates ethical dilemmas, environmental data center energy consumption (compute sustainability), human intellectual property, and moral authorship.

4. **Creator Ownership Scorecard (Anti-Cognitive Offloading)**:
   - When students passively prompt and accept AI output without thought, cognitive offloading occurs and critical thinking atrophies.
   - Show3D enforces the Creator Ownership Scorecard:
     - Mandates student documentation of the design rationale at each milestone.
     - Quantifies human-directed decisions: prompt modifications, slider adjustments, color/material overrides, peer pin revisions.
     - Computes a verifiable **"Human Creative Intent Index"** (e.g. 94% Human Directed) which is permanently engraved on their verifiable MOE completion certificate.

---

### Component E: Secondary Research Compliance & Singapore Educational Realities

1. **Singapore Personal Data Protection Act (PDPA) Compliance**:
   - **Age 13+ Compliant**: Designed for Singapore Secondary 1 through 4 students (ages 13–17).
   - **School-Managed Class SSO**: Single-cohort login or anonymized student IDs (e.g. `TPSS-3F-01`). No personal student email addresses, phone numbers, or social media logins required.
2. **Zero Model Training on Student Prompts & Geometries**:
   - Student prompts, 3D spatial models, reflection notes, and audio/text annotations are strictly quarantined.
   - Explicit zero-retention / zero-training policy: student inputs are never used to train, retrain, or fine-tune public or proprietary foundation models.
3. **Port 443 Network Readiness for MOE Personal Learning Devices (PLDs)**:
   - MOE National Digital Literacy Programme (NDLP) equips secondary students with standardized PLDs (Chromebooks, iPads, Windows laptops) restricted by MOE Device Management Applications (DMA).
   - Show3D operates strictly over standard HTTPS (Port 443) via encrypted web traffic.
   - Zero custom network ports, zero blocked WebSocket protocols, zero firewall exception tickets required from school IT administrators.
4. **Guaranteed 5,000 Class Credit Pool**:
   - Secondary school classes run on rigid 75-minute period schedules. Running out of AI generation credits mid-lesson disrupts teaching and creates teacher panic.
   - Show3D provisions a pooled cohort quota of 5,000 generation credits per class license.
   - Enables all 28 students to iterate freely (averaging 35–50 generations per student) with zero mid-lesson paywalls or account freezes.
5. **GeBIZ Quotation Pack & Institutional Procurement**:
   - Government Electronic Business (GeBIZ) ready vendor registration under IT & Digital Media Enrichment Training Services.
   - Standardized quotation packages compliant with Singapore AGD (Accountant-General's Department) e-invoicing standards.
6. **School Enrichment Budget & Funding Route Reality**:
   - Transparent funding guidance: No false claims of "pre-approved centralized MOE grants".
   - Primary route: Funded through decentralized School Enrichment Budgets / school-level departmental budget allocations (D&T, Computing, Infocomm).
   - Applied Learning Programme (ALP) theme adaptation: Fits school STEM, Sustainability, or Smart Nation enrichment themes.
   - MOE Opportunity Fund (OF): Eligible for targeted financial subsidies for Singapore Citizen students from lower-income backgrounds, ensuring 100% cohort inclusion.

---

## 3. Caveats

1. **Visual Slide Media vs. Vector Rendering**:
   - In Student Mode, visual concept slides should use crisp CSS/SVG diagrams and high-contrast Key Concept cards rather than heavy external image assets to ensure instant loading on school PLDs under limited classroom Wi-Fi bandwidth.
2. **Three.js WebGL Performance on PLDs**:
   - MOE standard Chromebooks have integrated graphics. While the full Three.js WebGL canvas modal works, keeping the Keynote presentation view fast and responsive via SVG/CSS previews ensures zero lag during full-class instruction.
3. **Facilitator Mode Role Boundary**:
   - As emphasized in R1 and R2, Student Mode and Facilitator Mode must remain strictly segregated via the top Apple segmented control. Facilitator features (roster monitoring, GeBIZ quotes, and rubrics) must never leak into the student presentation view.

---

## 4. Conclusion

The pedagogical substance, curriculum progression, and compliance architecture for Show3D are now completely specified and aligned with Singapore secondary school realities:
- All 6 modules (Coordinate Space, Mesh Topology, Prompt Scaffolding, Digital Materials, Ergonomics, Sustainability) have full 3-slide visual lesson definitions (18 slides total), key concepts, and pro tips.
- The interactive Co-Design stage has fully defined PARTS prompt tokens, parametric levers (curvature, reflectivity, solar wattage), and crisp spatial preview mechanics.
- All 6 formative checks feature comprehensive explanatory feedback for both correct and incorrect choices, paired with Apple-style competency badges.
- Pedagogical frameworks (Constructionism, MOE D&T, Four Learns, Creator Ownership Scorecard) and secondary research compliance (PDPA, Port 443, 5,000 credit pool, GeBIZ quotes, Enrichment Budgets) are fully resolved.

---

## 5. Verification Method

To independently verify this specification against the codebase:
1. **Curriculum & Slide Content Inspection**:
   - Check `src/data/moduleLessons.ts` to ensure it reflects the exact 6 modules, 18 slides, key concept cards, and pro tips specified in Component A.
2. **Quiz & Badge Data Inspection**:
   - Check `src/store/appStore.ts` under `MODULE_QUIZZES` and `LEARNING_MODULES` to verify that all 6 diagnostic questions and options match Component C.
3. **Student Mode UI Flow**:
   - Run `npm run build` and `npm run dev` to verify that navigating slides 0–2 (concepts), slide 3 (co-design), slide 4 (quiz with explanations), and slide 5 (badge) executes cleanly with zero runtime or TypeScript errors.
4. **Facilitator Mode Verification**:
   - Verify that Tab 1 renders the 28-student roster for Class 3-Faith and Tab 2 renders the GeBIZ quotation pack, rubrics, and compliance data.
