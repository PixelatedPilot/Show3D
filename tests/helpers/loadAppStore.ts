import jiti from 'jiti';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

const loader = jiti(import.meta.url);

export const appStore = loader(path.join(projectRoot, 'src/store/appStore.ts'));
export const moduleLessonsData = loader(path.join(projectRoot, 'src/data/moduleLessons.ts'));
export const workflowState = loader(path.join(projectRoot, 'src/utils/workflowState.ts'));

export const {
  LEARNING_MODULES,
  MODULE_QUIZZES,
  STUDENT_ROSTER,
  MOE_RUBRIC_ITEMS,
  PROGRAMME_DELIVERABLES,
  STUDENT_SAFETY_SPEC,
  SCHOOL_PROCUREMENT_SPEC,
  ANNOTATION_PINS,
  initialEduState,
  MACRO_CURRICULUM_PHASES
} = appStore;

export const { MODULE_LESSONS } = moduleLessonsData;

export const {
  switchAppMode,
  getNextSlideStage,
  getPrevSlideStage,
  handleKeyNavigation,
  resetKeynoteOnModuleChange,
  togglePartsToken,
  CANONICAL_PARTS_TOKENS,
  setCanopySwatch,
  ALLOWED_SWATCHES,
  setCanopyCurvature,
  toggleSolarArray,
  setCanvasModalState,
  generateVerifiedCertificate
} = workflowState;
