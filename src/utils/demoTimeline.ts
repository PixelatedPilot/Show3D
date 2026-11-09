import { TimelineState } from '../types';

export const TOTAL_DURATION = 60; // 1-minute full demonstration

// Mathematical easing helpers
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export const getTimelineState = (timeInSeconds: number): TimelineState => {
  // Cap at TOTAL_DURATION so it does NOT autoloop
  const t = Math.min(Math.max(0, timeInSeconds), TOTAL_DURATION);

  // Defaults
  let phase: TimelineState['phase'] = 'intro';
  let phaseTitle = 'Session Initialization';
  let toastMessage: string | null = null;

  // Camera defaults
  let radius = 6.8;
  let theta = 0.65;
  let phi = 1.15;
  let targetY = 1.35;

  // Sarah Cursor defaults
  let sarahVisible = false;
  let sarahX = 2.5;
  let sarahY = 1.8;
  let sarahZ = -1.5;
  let sarahAction = 'Viewing Studio';

  // Marcus Cursor defaults
  let marcusVisible = false;
  let marcusX = -2.5;
  let marcusY = 1.5;
  let marcusZ = 1.5;
  let marcusAction = 'Idle';

  // Mesh Lock defaults
  let isLocked = false;
  let lockedBy = 'Sarah Chen';
  let lockedColor = '#30D158';

  // Bench Transform defaults
  let benchX = 0;
  let benchY = 0;
  let benchZ = 0;
  let benchRotY = 0;

  // Comment Pins defaults
  let pin1Visible = false;
  let pin1CardOpen = false;
  let pin1Resolved = false;
  let typingReply = '';

  let pin2Visible = false;
  let pin2CardOpen = false;
  let pin2Resolved = false;

  // AI Generation Feed defaults
  let aiActive = false;
  let aiAuthor = 'Sarah Chen';
  let aiAuthorColor = '#30D158';
  let promptTyped = '';
  let aiProgress = 0;
  let aiStatusText = 'Idle';

  // Scene Models defaults
  let canopySpawned = false;
  let canopyScale = 0;
  let plantersSpawned = false;
  let plantersScale = 0;
  let lightsSpawned = false;
  let lightIntensity = 0;
  let canopyColor = '#0A84FF';

  // -------------------------------------------------------------
  // 1. INTRO (0.0s -> 5.0s)
  // -------------------------------------------------------------
  if (t < 5.0) {
    phase = 'intro';
    phaseTitle = '1. Team Joins Workspace';
    const progress = t / 5.0;
    const eased = easeInOutCubic(progress);

    radius = lerp(8.2, 6.8, eased);
    theta = lerp(0.35, 0.65, eased);
    phi = lerp(1.0, 1.15, eased);
    targetY = lerp(1.6, 1.35, eased);

    toastMessage = t > 1.0 ? 'Sarah Chen & Marcus Goh joined room · Campus Studio' : null;
  }

  // -------------------------------------------------------------
  // 2. SARAH 3D CURSOR INSPECTION (5.0s -> 10.0s)
  // -------------------------------------------------------------
  else if (t < 10.0) {
    phase = 'cursor_inspect';
    phaseTitle = '2. Real-Time 3D Spatial Cursors';
    const progress = (t - 5.0) / 5.0;
    const eased = easeInOutCubic(progress);

    sarahVisible = true;
    sarahAction = 'Inspecting Study Bench';

    // Glide smoothly from top-right towards the study bench handle
    sarahX = lerp(2.2, 0.35, eased) + 0.05 * Math.sin(t * 3);
    sarahY = lerp(1.6, 0.95, eased);
    sarahZ = lerp(-1.2, 0.3, eased);

    radius = lerp(6.8, 6.2, eased);
    theta = lerp(0.65, 0.72, eased);
    targetY = 1.3;

    toastMessage = 'Sarah Chen is inspecting Study Bench with 3D cursor';
  }

  // -------------------------------------------------------------
  // 3. MESH SELECTION LOCK & TRANSLATION (10.0s -> 15.0s)
  // -------------------------------------------------------------
  else if (t < 15.0) {
    phase = 'mesh_lock';
    phaseTitle = '3. Selection Lock & Live Mesh Edit';
    const progress = (t - 10.0) / 5.0;
    const eased = easeInOutCubic(progress);

    sarahVisible = true;
    sarahAction = 'Transforming Mesh';
    isLocked = true;

    benchZ = lerp(0, 0.5, eased);
    benchRotY = lerp(0, 0.08, eased);

    // Cursor stays directly locked to the bench handle as it moves!
    sarahX = 0.35;
    sarahY = 0.95;
    sarahZ = 0.3 + benchZ;

    radius = 6.2;
    theta = 0.72;
    targetY = 1.3;

    toastMessage = 'Sarah Chen is modifying transform (Object Locked)';
  }

  // -------------------------------------------------------------
  // 4. SPATIAL CRITIQUE PIN #1 (15.0s -> 21.0s)
  // -------------------------------------------------------------
  else if (t < 21.0) {
    phase = 'spatial_critique';
    phaseTitle = '4. 3D Spatial Surface Critique';
    benchZ = 0.5;
    benchRotY = 0.08;

    sarahVisible = true;
    sarahX = 0.35;
    sarahY = 0.95;
    sarahZ = 0.8;
    sarahAction = 'Reviewing Critique';

    pin1Visible = true;
    pin1CardOpen = t > 15.5;

    // Alex's reply typing effect
    if (t > 17.0 && t < 19.5) {
      const fullReply = 'Adjusted chamfer to 0.4mm for CNC router.';
      const charCount = Math.floor(lerp(0, fullReply.length, (t - 17.0) / 2.5));
      typingReply = fullReply.slice(0, charCount);
    } else if (t >= 19.5) {
      typingReply = 'Adjusted chamfer to 0.4mm for CNC router.';
      pin1Resolved = true; // turns green!
    }

    radius = 6.0;
    theta = 0.78;
    phi = 1.12;
    targetY = 1.25;

    toastMessage = pin1Resolved
      ? 'Spatial Critique #1 resolved by Alex Tan'
      : 'Marcus Goh pinned 3D Critique #1 on bench corner';
  }

  // -------------------------------------------------------------
  // 5. SARAH GENERATES TENSILE CANOPY (21.0s -> 26.0s)
  // -------------------------------------------------------------
  else if (t < 26.0) {
    phase = 'ai_canopy_gen';
    phaseTitle = '5. Collaborative AI Generation Stream';
    benchZ = 0.5;
    benchRotY = 0.08;
    pin1Visible = true;
    pin1Resolved = true;

    sarahVisible = false;
    aiActive = true;
    aiAuthor = 'Sarah Chen';
    aiAuthorColor = '#30D158';

    const fullPrompt = 'Curved tensile acoustic canopy with warm timber framing';
    const typeProgress = clamp((t - 21.0) / 2.0, 0, 1);
    promptTyped = fullPrompt.slice(0, Math.floor(typeProgress * fullPrompt.length));

    if (t >= 23.0) {
      const genProgress = clamp((t - 23.0) / 3.0, 0, 1);
      aiProgress = Math.floor(genProgress * 100);
      aiStatusText = `Generating Canopy: ${aiProgress}%`;
    }

    radius = lerp(6.0, 7.2, (t - 21.0) / 5.0);
    theta = lerp(0.78, 0.65, (t - 21.0) / 5.0);
    targetY = 1.45;

    toastMessage = t > 23.0
      ? `Sarah Chen is generating: 'Acoustic Canopy' (${aiProgress}%)`
      : 'Sarah Chen is typing an AI prompt...';
  }

  // -------------------------------------------------------------
  // 6. CANOPY MATERIALIZATION & SPAWN (26.0s -> 30.0s)
  // -------------------------------------------------------------
  else if (t < 30.0) {
    phase = 'canopy_spawn';
    phaseTitle = '6. Tensile Canopy Docks to Scene';
    benchZ = 0.5;
    benchRotY = 0.08;
    pin1Visible = true;
    pin1Resolved = true;

    canopySpawned = true;
    const spawnProgress = clamp((t - 26.0) / 1.5, 0, 1);
    canopyScale = easeOutBack(spawnProgress); // elastic bounce!

    aiAuthor = 'Sarah Chen';
    promptTyped = 'Curved tensile acoustic canopy with warm timber framing';
    aiProgress = 100;
    aiStatusText = 'Completed';

    radius = 7.0;
    theta = 0.65;
    targetY = 1.5;

    toastMessage = 'Tensile Canopy materialized and docked onto pillars!';
  }

  // -------------------------------------------------------------
  // 7. MARCUS GENERATES BIOPHILIC PLANTERS (30.0s -> 38.0s)
  // -------------------------------------------------------------
  else if (t < 38.0) {
    phase = 'marcus_planters_gen';
    phaseTitle = '7. Marcus Prompts: Biophilic Planters';
    benchZ = 0.5;
    benchRotY = 0.08;
    canopySpawned = true;
    canopyScale = 1.0;
    pin1Visible = false; // clean up pin 1 to focus on new assets

    // Marcus's 3D cursor appears on the pavilion flanks
    marcusVisible = true;
    const mProg = clamp((t - 30.0) / 4.0, 0, 1);
    marcusX = lerp(-2.4, -1.8, mProg) + 0.05 * Math.sin(t * 3);
    marcusY = 0.6;
    marcusZ = lerp(0.5, 0.1, mProg);
    marcusAction = 'Positioning Planters';

    aiActive = true;
    aiAuthor = 'Marcus Goh';
    aiAuthorColor = '#0A84FF';

    const planterPrompt = 'Dual modular biophilic planters with tropical foliage & aluminum base';
    const typeProg = clamp((t - 30.0) / 2.5, 0, 1);
    promptTyped = planterPrompt.slice(0, Math.floor(typeProg * planterPrompt.length));

    if (t >= 32.5) {
      const genProg = clamp((t - 32.5) / 3.0, 0, 1);
      aiProgress = Math.floor(genProg * 100);
      aiStatusText = `Generating Planters: ${aiProgress}%`;
    }

    // Spawn planters at 35.5s
    if (t >= 35.5) {
      plantersSpawned = true;
      const pSpawn = clamp((t - 35.5) / 1.5, 0, 1);
      plantersScale = easeOutBack(pSpawn);
    }

    radius = 7.0;
    theta = lerp(0.65, 0.45, (t - 30.0) / 8.0);
    targetY = 1.35;

    toastMessage = t > 35.5
      ? 'Marcus Goh generated: Modular Biophilic Planters'
      : `Marcus Goh is generating: 'Biophilic Planters' (${aiProgress}%)`;
  }

  // -------------------------------------------------------------
  // 8. SARAH GENERATES SOLAR PENDANT LIGHTING (38.0s -> 46.0s)
  // -------------------------------------------------------------
  else if (t < 46.0) {
    phase = 'sarah_lighting_gen';
    phaseTitle = '8. Sarah Prompts: Solar Lighting Cluster';
    benchZ = 0.5;
    benchRotY = 0.08;
    canopySpawned = true;
    canopyScale = 1.0;
    plantersSpawned = true;
    plantersScale = 1.0;

    sarahVisible = true;
    sarahAction = 'Wiring Solar Fixtures';
    sarahX = 0.1;
    sarahY = 2.4;
    sarahZ = 0.2;

    marcusVisible = false;

    aiActive = true;
    aiAuthor = 'Sarah Chen';
    aiAuthorColor = '#30D158';

    const lightPrompt = 'Modern pendant light cluster with warm 3000K LED illumination';
    const typeProg = clamp((t - 38.0) / 2.0, 0, 1);
    promptTyped = lightPrompt.slice(0, Math.floor(typeProg * lightPrompt.length));

    if (t >= 40.0) {
      const genProg = clamp((t - 40.0) / 2.5, 0, 1);
      aiProgress = Math.floor(genProg * 100);
      aiStatusText = `Generating Lighting: ${aiProgress}%`;
    }

    // Lights spawn and illuminate at 42.5s!
    if (t >= 42.5) {
      lightsSpawned = true;
      const lProg = clamp((t - 42.5) / 2.0, 0, 1);
      lightIntensity = lerp(0, 1.8, lProg);
    }

    radius = 6.4;
    theta = 0.55;
    phi = 1.18;
    targetY = 1.4;

    toastMessage = t > 42.5
      ? 'Solar Pendant Lights illuminated (Warm 3000K Glow)'
      : `Sarah Chen is generating: 'Pendant Lights' (${aiProgress}%)`;
  }

  // -------------------------------------------------------------
  // 9. TEAM REVIEW & VERIFICATION PIN #2 (46.0s -> 53.0s)
  // -------------------------------------------------------------
  else if (t < 53.0) {
    phase = 'team_review_pin2';
    phaseTitle = '9. Material Sync & Team Verification';
    benchZ = 0.5;
    benchRotY = 0.08;
    canopySpawned = true;
    canopyScale = 1.0;
    plantersSpawned = true;
    plantersScale = 1.0;
    lightsSpawned = true;
    lightIntensity = 1.8;

    // Dynamic material switch to Apple-style Cyan Fabric
    canopyColor = '#00A896';

    sarahVisible = true;
    sarahX = 0.6;
    sarahY = 1.0;
    sarahZ = 0.4;
    sarahAction = 'Inspecting Finish';

    marcusVisible = true;
    marcusX = -0.8;
    marcusY = 2.9;
    marcusZ = 0.1;
    marcusAction = 'Verifying Solar Battery';

    // Pin #2 on battery hub
    pin2Visible = true;
    pin2CardOpen = t > 47.5;
    pin2Resolved = t > 49.5;

    radius = 6.8;
    theta = lerp(0.55, 0.75, (t - 46.0) / 7.0);
    phi = 1.15;
    targetY = 1.45;

    toastMessage = pin2Resolved
      ? 'Marcus Goh verified: 450W Solar Battery linked to grid'
      : 'Alex Tan updated canopy material to Biophilic Cyan';
  }

  // -------------------------------------------------------------
  // 10. GRAND CINEMATIC 360° REVEAL & FINAL HOLD (53.0s -> 60.0s)
  // -------------------------------------------------------------
  else {
    phase = 'cinematic_finale';
    phaseTitle = '10. Assembly Complete · Ready for Founders';
    benchZ = 0.5;
    benchRotY = 0.08;
    canopySpawned = true;
    canopyScale = 1.0;
    plantersSpawned = true;
    plantersScale = 1.0;
    lightsSpawned = true;
    lightIntensity = 1.8;
    canopyColor = '#00A896';
    pin2Visible = true;
    pin2Resolved = true;

    sarahVisible = true;
    sarahX = 1.4;
    sarahY = 0.9;
    sarahZ = -0.2;
    sarahAction = 'Ready for Review';

    marcusVisible = true;
    marcusX = -1.4;
    marcusY = 0.9;
    marcusZ = -0.2;
    marcusAction = 'Ready for Review';

    // Cinematic slow 360° arc around the complete assembled courtyard
    const finaleProgress = (t - 53.0) / 7.0;
    radius = 7.4;
    theta = 0.75 + finaleProgress * 0.85; // smooth rotation
    phi = 1.14;
    targetY = 1.4;

    toastMessage = 'All 4 Models Assembled & Synchronized · Presentation Ready';
  }

  return {
    currentTime: t,
    duration: TOTAL_DURATION,
    isPlaying: t < TOTAL_DURATION, // Stops when reaching 60s
    phase,
    phaseTitle,
    sarahCursor: {
      visible: sarahVisible,
      x: sarahX,
      y: sarahY,
      z: sarahZ,
      actionText: sarahAction
    },
    marcusCursor: {
      visible: marcusVisible,
      x: marcusX,
      y: marcusY,
      z: marcusZ,
      actionText: marcusAction
    },
    meshLock: {
      locked: isLocked,
      lockedBy,
      lockedColor
    },
    benchTransform: {
      x: benchX,
      y: benchY,
      z: benchZ,
      rotationY: benchRotY
    },
    commentPin1: {
      visible: pin1Visible,
      cardOpen: pin1CardOpen,
      resolved: pin1Resolved,
      typingReply
    },
    commentPin2: {
      visible: pin2Visible,
      cardOpen: pin2CardOpen,
      resolved: pin2Resolved
    },
    aiGeneration: {
      active: aiActive,
      author: aiAuthor,
      authorColor: aiAuthorColor,
      promptTyped,
      progress: aiProgress,
      statusText: aiStatusText
    },
    sceneModels: {
      canopySpawned,
      canopyScale,
      plantersSpawned,
      plantersScale,
      lightsSpawned,
      lightIntensity,
      canopyColor
    },
    cameraState: {
      radius,
      theta,
      phi,
      targetY
    },
    toastMessage
  };
};
