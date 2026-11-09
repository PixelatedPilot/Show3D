# Show3D · AI Creator Programme for Singapore Secondary Schools

> **Course Context**: MGMT330 x Show3D (Group 7)  
> **Strategic Focus**: Singapore Go-To-Market Playbook · Institutional Secondary School Pathway (Idea 1)  
> **Alignment**: Ministry of Education (MOE) EdTech Masterplan 2030 & IMDA Code for Fun (CFF) AI Electives

An interactive, classroom-ready presentation prototype demonstrating the **Show3D AI Creator Programme** for secondary schools. Designed around the **"Vendor-Taught, Teacher-Facilitated"** delivery model, this solution removes teacher preparation burnout while providing students with a hands-on, self-paced spatial AI learning experience on their Personal Learning Devices (PLDs).

---

## 🚀 Quick Start (Local)

```bash
# Install dependencies (if not already installed)
npm install

# Start local development server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🛠️ Deploy to Netlify / Vercel

```bash
# Production build
npm run build

# Preview build locally
npm run preview
```

The output in `dist/` is ready for instant deployment on Netlify or Vercel.

---

## 🎯 Key Strategic Pillars Demonstrated in this Prototype

### 1. The "Vendor-Taught, Teacher-Facilitated" Delivery Pattern
Singapore secondary school teachers (Design & Technology, Computing, Art) do not have the bandwidth to design generative 3D curriculum or learn complex CAD software.
- **Show3D (The Software / Vendor) Teaches**: Self-paced, interactive micro-lessons guide students step-by-step through prompt engineering, spatial geometry, and digital craftsmanship.
- **The Teacher Facilitates**: Teachers monitor classroom progress via a **Zero-Prep Facilitation Hub**, assisting students who flag for help and reviewing final reflection rubrics.

### 2. 10-Hour / 6-Module Curriculum Pathway (IMDA Code for Fun Aligned)
- **MOD 01**: Foundations of 3D & AI *(Learn About AI · 1.5 hrs)*
- **MOD 02**: Campus Need Discovery *(Learn With AI · 1.5 hrs)*
- **MOD 03**: Prompt Engineering & Form Generation *(Learn to Use AI · 2.0 hrs · **Active in Prototype**)*
- **MOD 04**: Materials, Scaling & Digital Craft *(Learn to Use AI · 1.5 hrs)*
- **MOD 05**: Peer Critique & Spatial Annotation *(Learn With AI · 1.5 hrs)*
- **MOD 06**: Ethics, Authorship & Showcase *(Learn Beyond AI · 2.0 hrs)*

### 3. The 4-Step Student Challenge (Slide 26 UI)
*"Design an object that would improve your school courtyard"*
1. **01 Define a Need**: Environmental problem definition (intense 34°C Singapore afternoon heat) with selectable architectural constraints.
2. **02 Generate a 3D Concept**: PARTS prompt scaffolding (Persona, Aim, Recipients, Theme, Structure), architectural keyword chips, and simulated real-time 3D synthesis.
3. **03 Evaluate and Refine**: Direct human-in-the-loop controls—custom UV tensile fabric colors, 450W solar array toggle, and polygon wireframe topology inspection.
4. **04 Present and Explain**: MOE AI Literacy reflection prompts on human intentionality and design ethics, triggering the **Digital Certificate of Completion**.

### 4. Interactive 3D WebGL Canvas
- **Full OrbitControls**: Click and drag to orbit, scroll to zoom, right-click to pan.
- **Camera Presets**: Quick-switch between *Overview (3/4 Isometric)*, *Canopy & Shading*, *Solar Roof Top-Down*, and *Student Eye-Level*.
- **3D Feature Hotspots**: Interactive annotations explaining the tensile canopy, 450W solar array, modular timber benches, and natural cross-ventilation.

### 5. Teacher Facilitation Hub & Institutional Flywheel
- **Live Class Telemetry**: Real-time progress grid tracking all 28 students in Class 3-Faith with status badges (*On Track*, *Needs Assistance*, *Completed*).
- **MOE "Four Learns" Rubric**: Standardized evaluation criteria (*Learn About AI*, *Learn to Use AI*, *Learn With AI*, *Learn Beyond AI*).
- **School Adoption Flywheel (Slides 17 & 27)**: Visualizes the 6-stage lifecycle (*Awareness $\rightarrow$ Consider $\rightarrow$ Onboard $\rightarrow$ Delivery $\rightarrow$ Showcase $\rightarrow$ Renewal*) and how pilot renewal scales to Singapore's 131 secondary schools (157k+ students).

---

## 📂 Project Architecture

```
src/
├── components/
│   ├── canvas/
│   │   └── ThreeCanvas.tsx            # Three.js 3D WebGL Scene with OrbitControls & Reactive Mesh
│   ├── idea1-edu/
│   │   └── EduSidebar.tsx             # 4-Step Self-Taught Student Challenge Sidebar
│   └── layout/
│       ├── TopHeader.tsx              # School branding, class status, and quick modal triggers
│       ├── ModuleNavigator.tsx        # 6-Module Curriculum Pathway ribbon & inspector
│       ├── TeacherModal.tsx           # Teacher Facilitation Hub (Live Roster, Syllabus, MOE Rubric)
│       ├── SchoolLifecycleModal.tsx   # Slide 17 & 27 GTM Adoption Flywheel
│       └── ShowcaseModal.tsx          # Student Project Certificate & Portfolio Card
├── store/
│   └── appStore.ts                    # Curriculum modules, 28-student roster, and pilot state
├── types/
│   └── index.ts                       # TypeScript interfaces for education & 3D models
└── App.tsx                            # Root application orchestrator
```
