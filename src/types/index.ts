export type StrategicMode = 'edu' | 'collab';

export type AppViewMode = 'landing' | 'hub' | 'lesson' | 'studio' | 'teacher';

export type EduStep = 1 | 2 | 3 | 4;

export type EduStage = 'mission' | 'try' | 'quiz' | 'mastery';

export type CameraViewPreset = 'overview' | 'canopy' | 'solar' | 'eyelevel';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  contextNote?: string;
  options: QuizOption[];
}

export interface ModuleQuizData {
  moduleId: number;
  moduleTitle: string;
  moeDomain: string;
  questions: QuizQuestion[];
}

export interface LearningModule {
  id: number;
  code: string;
  title: string;
  duration: string;
  status: 'completed' | 'active' | 'upcoming';
  moeLearn: 'Learn About AI' | 'Learn to Use AI' | 'Learn With AI' | 'Learn Beyond AI';
  summary: string;
  keySkill: string;
  badgeName: string;
  studentChallenge: string;
  learningObjectives: string[];
  vendorScope: string;
  teacherFacilitation: string;
}

export type DifferentiatedTrack = 'foundational' | 'extended';

export interface PedagogyPhase {
  phase: number;
  title: string;
  duration: string;
  moeDomain: 'Learn About AI' | 'Learn to Use AI' | 'Learn With AI' | 'Learn Beyond AI';
  focus: string;
  deliverable: string;
  constructionistActivity: string;
}

export interface LessonSessionStep {
  step: number;
  timeRange: string;
  name: string;
  roleVendor: string;
  roleTeacher: string;
  roleStudent: string;
  cognitiveGoal: string;
}

export interface ProgrammeDeliverable {
  id: string;
  title: string;
  category: 'teaching' | 'evidence';
  format: string;
  description: string;
  moeAlignment: string;
}

export interface StudentSafetySpec {
  minimumAge: string;
  accountModel: string;
  dataPractices: string;
  contentModeration: string;
  pldCompatibility: string;
  firewallPort: string;
}

export interface SchoolProcurementSpec {
  gebizCategory: string;
  fundingRoute: string;
  edusaveContext: string;
  alpThemeFit: string;
  opportunityFundFit: string;
  creditPoolSize: number;
}

export interface StudentRosterItem {
  id: string;
  name: string;
  avatar: string;
  currentModule: number;
  status: 'on_track' | 'needs_help' | 'completed';
  lastActive: string;
  creditsUsed: number;
  reflectionScore?: string;
  preScore?: number;
  postScore?: number;
  demonstratedSkill?: string;
}

export interface MOERubricItem {
  code: string;
  learn: string;
  focus: string;
  status: string;
  desc: string;
  criteria: string[];
}

export interface AnnotationPin {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  color: string;
}

export interface EduState {
  viewMode: AppViewMode;
  activeModuleId: number;
  step: EduStep;
  currentStage: EduStage;
  problemNeed: string;
  selectedConstraints: string[];
  creationMode: 'text' | 'image' | 'agent';
  promptText: string;
  selectedTags: string[];
  isGenerating: boolean;
  generationProgress: number;
  modelGenerated: boolean;
  canopyColor: string;
  benchColor: string;
  solarPanelsEnabled: boolean;
  wireframeMode: boolean;
  dockFinish: 'cyber' | 'stealth' | 'timber' | 'silver';
  ergonomicAngleTested: boolean;
  reflectionQuestion1: string;
  reflectionQuestion2: string;
  isSubmitted: boolean;
  showMicroCoach?: boolean;
  cameraPreset: CameraViewPreset;
  activeAnnotationId: string | null;
  completedQuizModuleIds: number[];
  quizScores: Record<number, number>;
  earnedBadges: string[];
  track?: DifferentiatedTrack;
  fallbackActive?: boolean;
  authorshipScore?: number;
}

// Retained legacy interfaces for complete compatibility
export interface Collaborator {
  id: string;
  name: string;
  shortName: string;
  role: string;
  color: string;
  lightColor: string;
  status: string;
  activeAction: string;
  cursorWorld: [number, number, number];
  isEditing: boolean;
  editingObjectId?: string;
  isSpectating?: boolean;
}

export interface SpatialCommentPin {
  id: string;
  number: number;
  targetObjectId: string;
  position: [number, number, number];
  author: string;
  authorRole: string;
  authorColor: string;
  comment: string;
  timestamp: string;
  resolved: boolean;
  replies: {
    author: string;
    text: string;
    timestamp: string;
  }[];
}

export interface SharedGenerationJob {
  id: string;
  author: string;
  authorColor: string;
  prompt: string;
  progress: number;
  status: 'generating' | 'completed';
  assetName: string;
  timestamp: string;
}

export interface TimelineState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  phase: 
    | 'intro'
    | 'cursor_inspect'
    | 'mesh_lock'
    | 'spatial_critique'
    | 'ai_canopy_gen'
    | 'canopy_spawn'
    | 'marcus_planters_gen'
    | 'planters_spawn'
    | 'sarah_lighting_gen'
    | 'lighting_turn_on'
    | 'team_review_pin2'
    | 'cinematic_finale';
  phaseTitle: string;
  sarahCursor: {
    visible: boolean;
    x: number;
    y: number;
    z: number;
    actionText: string;
  };
  marcusCursor: {
    visible: boolean;
    x: number;
    y: number;
    z: number;
    actionText: string;
  };
  meshLock: {
    locked: boolean;
    lockedBy: string;
    lockedColor: string;
  };
  benchTransform: {
    x: number;
    y: number;
    z: number;
    rotationY: number;
  };
  commentPin1: {
    visible: boolean;
    cardOpen: boolean;
    resolved: boolean;
    typingReply: string;
  };
  commentPin2: {
    visible: boolean;
    cardOpen: boolean;
    resolved: boolean;
  };
  aiGeneration: {
    active: boolean;
    author: string;
    authorColor: string;
    promptTyped: string;
    progress: number;
    statusText: string;
  };
  sceneModels: {
    canopySpawned: boolean;
    canopyScale: number;
    plantersSpawned: boolean;
    plantersScale: number;
    lightsSpawned: boolean;
    lightIntensity: number;
    canopyColor: string;
  };
  cameraState: {
    radius: number;
    theta: number;
    phi: number;
    targetY: number;
  };
  toastMessage: string | null;
}
