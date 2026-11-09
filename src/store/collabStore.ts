import { Collaborator, SpatialCommentPin, SharedGenerationJob } from '../types';

export const initialCollaborators: Collaborator[] = [
  {
    id: 'user-alex',
    name: 'Alex Tan (You)',
    shortName: 'Alex',
    role: 'Lead Designer',
    color: '#5E5CE6',
    lightColor: 'rgba(94, 92, 230, 0.2)',
    status: 'online',
    activeAction: 'Viewing Isometric View',
    cursorWorld: [0, 0, 0],
    isEditing: false
  },
  {
    id: 'user-sarah',
    name: 'Sarah Chen',
    shortName: 'Sarah',
    role: 'Industrial Design',
    color: '#30D158',
    lightColor: 'rgba(48, 209, 88, 0.2)',
    status: 'active',
    activeAction: 'Transforming Study Bench',
    cursorWorld: [1.2, 0.8, -0.4],
    isEditing: true,
    editingObjectId: 'object-bench',
    isSpectating: false
  },
  {
    id: 'user-marcus',
    name: 'Marcus Goh',
    shortName: 'Marcus',
    role: '3D Modeler',
    color: '#0A84FF',
    lightColor: 'rgba(10, 132, 255, 0.2)',
    status: 'idle',
    activeAction: 'Inspecting Bevels & Wireframe',
    cursorWorld: [-1.4, 0.5, 0.8],
    isEditing: false,
    isSpectating: false
  }
];

export const initialComments: SpatialCommentPin[] = [
  {
    id: 'pin-1',
    number: 1,
    targetObjectId: 'object-bench',
    position: [0.8, 1.1, 0.3],
    author: 'Marcus Goh',
    authorRole: '3D Modeler',
    authorColor: '#0A84FF',
    comment: 'Should we soften the radius on these corner edges? Sharp corners might cause issues when 3D printing or CNC routing.',
    timestamp: '4m ago',
    resolved: false,
    replies: [
      {
        author: 'Alex Tan',
        text: 'Good catch Marcus. I bumped the chamfer to 0.4mm in the properties panel.',
        timestamp: '2m ago'
      }
    ]
  },
  {
    id: 'pin-2',
    number: 2,
    targetObjectId: 'object-canopy',
    position: [-0.6, 2.3, -0.2],
    author: 'Sarah Chen',
    authorRole: 'Industrial Design',
    authorColor: '#30D158',
    comment: 'Reinforced dual-strut aluminum bracket added here to withstand monsoon wind load.',
    timestamp: '12m ago',
    resolved: true,
    replies: [
      {
        author: 'Prof. Davies',
        text: 'Excellent structural consideration for tropical outdoor furniture.',
        timestamp: '8m ago'
      }
    ]
  }
];

export const sampleJobs: SharedGenerationJob[] = [
  {
    id: 'job-1',
    author: 'Sarah Chen',
    authorColor: '#30D158',
    prompt: 'Ergonomic recycled timber armrest with integrated solar cup holder',
    progress: 78,
    status: 'generating',
    assetName: 'Modular Armrest',
    timestamp: 'Just now'
  },
  {
    id: 'job-2',
    author: 'Alex Tan',
    authorColor: '#5E5CE6',
    prompt: 'Architectural tensile canopy with curved aluminum pillars',
    progress: 100,
    status: 'completed',
    assetName: 'Courtyard Pavilion',
    timestamp: '15m ago'
  }
];
