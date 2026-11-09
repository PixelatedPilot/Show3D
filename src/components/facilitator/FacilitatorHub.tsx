import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  Award,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText,
  Search,
  Filter,
  Eye,
  Tv,
  Send,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers,
  Zap,
  Info,
  Check,
  Copy,
  X
} from 'lucide-react';
import {
  LEARNING_MODULES,
  STUDENT_ROSTER,
  MOE_RUBRIC_ITEMS,
  PROGRAMME_DELIVERABLES,
  SCHOOL_PROCUREMENT_SPEC
} from '../../store/appStore';
import { StudentRosterItem } from '../../types';

interface FacilitatorHubProps {
  onSwitchToStudent: () => void;
  onLaunchCanvasModal: () => void;
  onOpenProcurementModal?: () => void;
}

type FacilitatorTab = 'monitoring' | 'curriculum_procurement';
type StudentFilter = 'all' | 'active' | 'needs_help' | 'completed';

export const FacilitatorHub: React.FC<FacilitatorHubProps> = ({
  onSwitchToStudent,
  onLaunchCanvasModal,
  onOpenProcurementModal,
}) => {
  const [activeTab, setActiveTab] = useState<FacilitatorTab>('monitoring');
  const [studentFilter, setStudentFilter] = useState<StudentFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentRosterItem | null>(null);
  const [teacherNotes, setTeacherNotes] = useState<Record<string, string>>({
    'st-04': 'Marcus was struggling with wall thickness < 2mm. Prompt hint sent to add ribbing.',
    'st-08': 'Lucas needed clarification on X vs Z axis orientation for base stability.'
  });
  const [activeNoteText, setActiveNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredStudents = STUDENT_ROSTER.filter((s) => {
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !(s.demonstratedSkill || '').toLowerCase().includes(q)) {
        return false;
      }
    }
    // Filter by status pill
    if (studentFilter === 'needs_help') return s.status === 'needs_help';
    if (studentFilter === 'completed') return s.status === 'completed';
    if (studentFilter === 'active') return s.status === 'on_track';
    return true;
  });

  const handleSelectStudent = (student: StudentRosterItem) => {
    setSelectedStudent(student);
    setActiveNoteText(teacherNotes[student.id] || '');
  };

  const handleSaveNote = () => {
    if (!selectedStudent) return;
    setTeacherNotes((prev) => ({
      ...prev,
      [selectedStudent.id]: activeNoteText
    }));
    showToast(`Saved formative assessment note for ${selectedStudent.name}`);
  };

  const handleSendHint = (hint: string) => {
    if (!selectedStudent) return;
    showToast(`Scaffolding hint sent to ${selectedStudent.name}'s screen`);
  };

  const handleResetQuiz = () => {
    if (!selectedStudent) return;
    showToast(`Formative check unlocked for ${selectedStudent.name}`);
  };

  const handleAirPlay = () => {
    if (!selectedStudent) return;
    showToast(`Projecting ${selectedStudent.name}'s 3D workspace to front display`);
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-4rem)] bg-[#131314] text-[#E3E3E3] overflow-hidden font-sans select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1E1F22] border border-[#6DD58C]/40 text-[#E3E3E3] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2">
          <div className="size-2 rounded-full bg-[#6DD58C] animate-ping" />
          <span className="font-mono text-[11px]">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          LEFT SIDEBAR (Google Labs Instructor Command Hub)
         ======================================================== */}
      <aside className="w-64 bg-[#1A1B1E] border-r border-white/[0.07] flex flex-col justify-between shrink-0 overflow-y-auto z-10">
        <div className="p-4 space-y-5">
          
          {/* Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#162238] border border-[#A8C7FA]/25">
              <span className="size-1.5 rounded-full bg-[#A8C7FA]" />
              <span className="text-[10px] font-mono tracking-wider text-[#A8C7FA] uppercase font-semibold">
                Instructor Command
              </span>
            </div>
            <h1 className="text-lg font-display font-medium text-white tracking-tight">
              Instructor Hub
            </h1>
            <p className="text-xs text-[#9AA0A6]">
              Teen Cohort (Ages 13–16) · Holiday Camp
            </p>
          </div>

          {/* View Switcher */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA0A6] px-1 font-semibold">
              VIEWS
            </div>
            
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`w-full p-3 rounded-2xl text-left transition-all flex items-start gap-2.5 border ${
                activeTab === 'monitoring'
                  ? 'bg-[#282A2E] border-white/[0.12] text-white shadow-sm'
                  : 'bg-transparent border-transparent text-[#9AA0A6] hover:text-white hover:bg-[#1E1F22]'
              }`}
            >
              <span className="size-2 rounded-full bg-[#6DD58C] mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold leading-tight text-white">
                  Live Class Monitoring
                </div>
                <div className="text-[10px] text-[#9AA0A6] mt-0.5">
                  28 Active Students
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('curriculum_procurement')}
              className={`w-full p-3 rounded-2xl text-left transition-all flex items-start gap-2.5 border ${
                activeTab === 'curriculum_procurement'
                  ? 'bg-[#282A2E] border-white/[0.12] text-white shadow-sm'
                  : 'bg-transparent border-transparent text-[#9AA0A6] hover:text-white hover:bg-[#1E1F22]'
              }`}
            >
              <FileText className="size-3.5 text-[#A8C7FA] mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold leading-tight text-white">
                  Curriculum & Partner Kit
                </div>
                <div className="text-[10px] text-[#9AA0A6] mt-0.5">
                  Turnkey Lesson Materials
                </div>
              </div>
            </button>
          </div>

          {/* Live Telemetry Stream Blocks */}
          <div className="space-y-2.5 pt-3 border-t border-white/[0.07]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#9AA0A6] px-1">
              LIVE TELEMETRY STREAMS
            </div>

            {/* Block 1: LEARNING_GAIN */}
            <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#9AA0A6]">LEARNING_GAIN</span>
                <span className="text-[#6DD58C] font-semibold">ACTV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-medium text-[#E3E3E3] tracking-tight">
                  +34.2%
                </span>
                {/* Sparkline */}
                <svg className="w-16 h-5 stroke-[#6DD58C] fill-none" viewBox="0 0 64 20">
                  <path d="M 0 16 Q 16 14, 28 9 T 50 6 T 64 2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-[10px] font-mono text-[#9AA0A6]">
                Pre: 61.8% → Post: 96.0%
              </div>
            </div>

            {/* Block 2: CREDIT_POOL */}
            <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#9AA0A6]">CREDIT_POOL</span>
                <span className="text-[#A8C7FA] font-semibold">OK // 77.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-display font-medium text-[#E3E3E3] tracking-tight">
                  3,886 / 5,000
                </span>
                {/* Sparkline */}
                <svg className="w-16 h-5 stroke-[#A8C7FA] fill-none" viewBox="0 0 64 20">
                  <path d="M 0 14 L 14 12 L 28 15 L 42 8 L 56 10 L 64 4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-[10px] font-mono text-[#9AA0A6]">
                1,114 used · 0 locked
              </div>
            </div>

            {/* Block 3: HELP_QUEUE */}
            <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#9AA0A6]">HELP_QUEUE</span>
                <span className="text-[#FDD663] font-semibold">INTERVENTION</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-medium text-[#FDD663] tracking-tight">
                  02
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2B2210] text-[#FDD663] border border-[#FDD663]/25">
                  ACTION_REQ
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#9AA0A6] truncate">
                Marcus Lee, Lucas Teo
              </div>
            </div>

          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/[0.07] space-y-2 bg-[#131314]/60">
          <button
            onClick={onSwitchToStudent}
            className="w-full py-2 px-3.5 rounded-full bg-[#282A2E] hover:bg-[#33363B] border border-white/[0.08] text-xs text-[#E3E3E3] flex items-center justify-between transition-colors"
          >
            <span>Test as Student</span>
            <ChevronRight className="size-3.5 text-[#9AA0A6]" />
          </button>

          <button
            onClick={onLaunchCanvasModal}
            className="w-full py-2 px-3.5 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-xs text-[#062E6F] flex items-center justify-center gap-1.5 transition-colors font-semibold"
          >
            <Eye className="size-3.5" />
            <span>Launch 3D Canvas</span>
          </button>

          <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-[#9AA0A6]">
            <span>PORT 443 HTTPS</span>
            <span>SG PDPA COMPLIANT</span>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MAIN VIEWPORT (CENTER & RIGHT SPLIT)
         ======================================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ========================================================
            TAB 1: LIVE CLASS MONITORING
           ======================================================== */}
        {activeTab === 'monitoring' && (
          <div className="flex-1 flex overflow-hidden">
            
            {/* Center: Cohort Grid Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#131314]">
              
              {/* Toolbar */}
              <div className="h-14 border-b border-white/[0.07] px-5 flex items-center justify-between gap-3 shrink-0 bg-[#1A1B1E]">
                
                {/* Search Box */}
                <div className="relative w-56 sm:w-64">
                  <Search className="size-3.5 text-[#9AA0A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search student or skill..."
                    className="w-full bg-[#131314] border border-white/[0.08] focus:border-[#A8C7FA] rounded-full pl-9 pr-3.5 py-1.5 text-xs text-[#E3E3E3] placeholder-[#9AA0A6] outline-none transition-colors font-sans"
                  />
                </div>

                {/* Google Labs Pill Filter Bar */}
                <div className="flex items-center gap-1 bg-[#131314] p-1 border border-white/[0.08] rounded-full">
                  {[
                    { id: 'all' as StudentFilter, label: 'All (28)', count: 28 },
                    { id: 'active' as StudentFilter, label: 'Active', count: 22 },
                    { id: 'needs_help' as StudentFilter, label: 'Needs Help (2)', count: 2, alert: true },
                    { id: 'completed' as StudentFilter, label: 'Completed (4)', count: 4 },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setStudentFilter(f.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                        studentFilter === f.id
                          ? f.alert
                            ? 'bg-[#2B2210] text-[#FDD663] border border-[#FDD663]/40 font-semibold'
                            : 'bg-[#A8C7FA] text-[#062E6F] font-semibold'
                          : 'text-[#9AA0A6] hover:text-[#E3E3E3] border border-transparent'
                      }`}
                    >
                      <span>{f.label}</span>
                    </button>
                  ))}
                </div>

                {/* Telemetry Tag */}
                <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-[#9AA0A6]">
                  <span>SYNC_RATE: 0.992</span>
                  <span className="text-white/15">|</span>
                  <span>COHORT: 28</span>
                </div>
              </div>

              {/* Student Cards Grid */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudent?.id === student.id;
                    const isHelp = student.status === 'needs_help';
                    const isDone = student.status === 'completed';
                    const delta = (student.postScore || 90) - (student.preScore || 60);

                    return (
                      <div
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        className={`bg-[#1E1F22] border rounded-3xl p-4 relative transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'border-[#A8C7FA] bg-[#162238]/60 ring-1 ring-[#A8C7FA]/40'
                            : isHelp
                            ? 'border-[#FDD663]/50 bg-[#2B2210]/40 hover:border-[#FDD663]'
                            : 'border-white/[0.07] hover:border-white/[0.16] bg-[#1E1F22]'
                        }`}
                      >
                        {/* Top Row: Avatar & Status Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded-full bg-[#131314] border border-white/[0.08] font-mono text-xs font-bold flex items-center justify-center text-[#E3E3E3]">
                              {student.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-[#E3E3E3] leading-tight">
                                {student.name}
                              </div>
                              <span className="text-[10px] text-[#9AA0A6] font-mono">
                                {student.lastActive}
                              </span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          {isHelp ? (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2B2210] border border-[#FDD663]/30">
                              <span className="size-1.5 rounded-full bg-[#FDD663] animate-pulse" />
                              <span className="text-[#FDD663] font-mono text-[9px] font-semibold tracking-wide">
                                HELP_FLAG
                              </span>
                            </div>
                          ) : isDone ? (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#162238] border border-[#A8C7FA]/30">
                              <span className="size-1.5 rounded-full bg-[#A8C7FA]" />
                              <span className="text-[#A8C7FA] font-mono text-[9px] font-semibold tracking-wide">
                                DONE // 100%
                              </span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#13281C] border border-[#6DD58C]/30">
                              <span className="size-1.5 rounded-full bg-[#6DD58C]" />
                              <span className="text-[#6DD58C] font-mono text-[9px] font-semibold tracking-wide">
                                OK // SYNC
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Middle Activity Box */}
                        <div className="mt-3 bg-[#131314] rounded-2xl p-2.5 border border-white/[0.06] space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-[#9AA0A6] font-mono">
                            <span>Module {student.currentModule}: Solar Kiosk</span>
                            <span>Slide {isDone ? '6 of 6' : isHelp ? '4 of 6' : '3 of 6'}</span>
                          </div>
                          <div className="text-[11px] text-[#E3E3E3] font-medium truncate">
                            {student.demonstratedSkill || 'Ergonomics & Structural Wall Ribs'}
                          </div>
                        </div>

                        {/* Bottom Metric Row */}
                        <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#9AA0A6]">
                            Credits: <span className="text-[#E3E3E3] font-semibold">{student.creditsUsed}</span> / 50
                          </span>
                          <span className="text-[#6DD58C] font-semibold bg-[#13281C] px-2 py-0.5 rounded-full border border-[#6DD58C]/25">
                            +{delta}% Growth
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Google Labs Inspector Drawer */}
            <div className={`w-80 bg-[#1A1B1E] border-l border-white/[0.07] flex flex-col justify-between shrink-0 overflow-y-auto p-4 transition-all ${
              selectedStudent ? 'block' : 'hidden lg:block'
            }`}>
              {selectedStudent ? (
                <div className="space-y-4">
                  
                  {/* Top Bar with Dismiss */}
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="size-8 rounded-full bg-[#131314] border border-white/[0.08] text-[#A8C7FA] font-mono text-xs font-bold flex items-center justify-center">
                        {selectedStudent.avatar}
                      </span>
                      <div>
                        <h3 className="font-semibold text-xs text-[#E3E3E3] leading-tight">
                          {selectedStudent.name}
                        </h3>
                        <span className="text-[10px] text-[#9AA0A6] font-mono">
                          ID: {selectedStudent.id}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="text-[#9AA0A6] hover:text-white text-xs p-1.5 rounded-full hover:bg-[#282A2E] transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  {/* Attention Callout if student needs help */}
                  {selectedStudent.status === 'needs_help' && (
                    <div className="p-3.5 rounded-2xl bg-[#2B2210] border border-[#FDD663]/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[#FDD663] font-semibold text-[11px] font-mono">
                        <span className="flex items-center gap-1.5">
                          <AlertCircle className="size-3.5" />
                          <span>ATTENTION // INTERVENTION</span>
                        </span>
                        <span>0x4A</span>
                      </div>
                      <p className="text-[11px] text-[#E3E3E3] leading-relaxed">
                        Student attempted to generate without physical wall thickness constraint. 3D slicer would flag this as non-printable.
                      </p>
                      <button
                        onClick={() => handleSendHint('Remember to specify minimum 3mm wall thickness for structural 3D printing stability.')}
                        className="w-full py-2 rounded-full bg-[#FDD663] hover:bg-[#FEE082] text-[#2B2210] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Send className="size-3" />
                        <span>Send Scaffolding Hint</span>
                      </button>
                    </div>
                  )}

                  {/* Active PARTS Prompt Recipe Tokens Preview */}
                  <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA0A6]">
                      PARTS Prompt Recipe Tokens:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#162238] border border-[#A8C7FA]/25 text-[#A8C7FA] text-[10px] font-mono">
                        P: Eco-Industrialist
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#13281C] border border-[#6DD58C]/25 text-[#6DD58C] text-[10px] font-mono">
                        A: Solar Kiosk
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2B2210] border border-[#FDD663]/25 text-[#FDD663] text-[10px] font-mono">
                        R: Tampines Park
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2E1717] border border-[#FFB4AB]/25 text-[#FFB4AB] text-[10px] font-mono">
                        T: Biophilic Timber
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1E1F22] border border-white/[0.08] text-[#E3E3E3] text-[10px] font-mono">
                        S: 450W Monocrystalline
                      </span>
                    </div>
                  </div>

                  {/* Competency & Formative Telemetry */}
                  <div className="p-3.5 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-2 text-xs">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA0A6]">
                      MOE D&T Formative Telemetry:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
                        <span className="text-[#9AA0A6] block text-[9px]">Pre-Diagnostic</span>
                        <span className="text-[#E3E3E3] font-bold">{selectedStudent.preScore || 60}%</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#1E1F22] border border-white/[0.06]">
                        <span className="text-[#9AA0A6] block text-[9px]">Post-Check Score</span>
                        <span className="text-[#6DD58C] font-bold">{selectedStudent.postScore || 92}%</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-[#9AA0A6] pt-1">
                      Demonstrated: <span className="text-[#E3E3E3] font-medium">{selectedStudent.demonstratedSkill}</span>
                    </div>
                  </div>

                  {/* Control Queue Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA0A6]">
                      Control Queue Actions:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleAirPlay}
                        className="p-2 rounded-full bg-[#131314] hover:bg-[#282A2E] border border-white/[0.08] text-[#E3E3E3] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Tv className="size-3 text-[#6DD58C]" />
                        <span>Project</span>
                      </button>

                      <button
                        onClick={handleResetQuiz}
                        className="p-2 rounded-full bg-[#131314] hover:bg-[#282A2E] border border-white/[0.08] text-[#E3E3E3] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="size-3 text-[#FDD663]" />
                        <span>Unlock Quiz</span>
                      </button>
                    </div>

                    <button
                      onClick={onLaunchCanvasModal}
                      className="w-full py-2 px-4 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="size-3.5" />
                      <span>Inspect 3D Geometry in Show3D Canvas</span>
                    </button>
                  </div>

                  {/* Formative Assessment Note Editor */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.07]">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#9AA0A6] block">
                      Formative Observation Note (D&T Portfolio):
                    </label>
                    <textarea
                      value={activeNoteText}
                      onChange={(e) => setActiveNoteText(e.target.value)}
                      placeholder="Add observation note on student's spatial reasoning or prompt iteration..."
                      rows={3}
                      className="w-full bg-[#131314] border border-white/[0.08] focus:border-[#A8C7FA] rounded-2xl p-2.5 text-xs text-[#E3E3E3] placeholder-[#9AA0A6] outline-none resize-none font-sans"
                    />
                    <button
                      onClick={handleSaveNote}
                      className="w-full py-2 rounded-full bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] font-medium text-xs transition-colors border border-white/[0.08]"
                    >
                      Save Observation Note
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="size-11 rounded-2xl bg-[#131314] border border-white/[0.08] flex items-center justify-center text-[#9AA0A6]">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#E3E3E3]">Select Student Card</h4>
                    <p className="text-[11px] text-[#9AA0A6] mt-1 max-w-[180px] leading-relaxed">
                      Click any student tile to inspect prompt recipe tokens, growth telemetry, and trigger 1-click interventions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: CURRICULUM & GEBIZ PROCUREMENT PACK
           ======================================================== */}
        {activeTab === 'curriculum_procurement' && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#131314] flex justify-center">
            <div className="max-w-4xl w-full space-y-6">
              
              {/* Document Sheet */}
              <div className="bg-[#1E1F22] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_14px_40px_rgba(0,0,0,0.45)] relative space-y-6">

                {/* Document Toolbar */}
                <div className="bg-[#131314] px-4 py-2.5 rounded-full border border-white/[0.07] flex flex-wrap items-center justify-between text-xs font-mono text-[#9AA0A6] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#E3E3E3] font-semibold">REP-GEBIZ-2026-TPSS.pdf</span>
                    <span className="text-white/15">|</span>
                    <span>Page 1 / 2</span>
                    <span className="text-white/15">|</span>
                    <span className="text-[10px] text-[#9AA0A6]">DOC_TYPE: TENDER_SPEC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#13281C] text-[#6DD58C] border border-[#6DD58C]/25 text-[10px]">
                      <span className="size-1.5 rounded-full bg-[#6DD58C]" />
                      <span>Status: E-INVOICING_READY</span>
                    </span>
                  </div>
                </div>

                {/* Document Header */}
                <div className="border-b border-white/[0.08] pb-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono tracking-widest text-[#A8C7FA] uppercase">
                      SINGAPORE MOE SECONDARY PILOT PACKAGE // GEBIZ IT_ENRICHMENT
                    </div>
                    <h2 className="text-xl font-display font-medium text-white tracking-tight">
                      MOE D&T Curriculum & GeBIZ Specification
                    </h2>
                    <p className="text-xs text-[#9AA0A6]">
                      Tampines Secondary School · 28 Student Cohort · School Enrichment Budget Alignment
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {onOpenProcurementModal && (
                      <button
                        onClick={onOpenProcurementModal}
                        className="px-4 py-2 rounded-full border border-white/[0.08] bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] text-xs font-medium transition-colors"
                      >
                        Open Funding Guide
                      </button>
                    )}
                    <button
                      onClick={() => setIsQuotationModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="size-3.5" />
                      <span>Download GeBIZ Pack</span>
                    </button>
                  </div>
                </div>

                {/* Telemetry Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
                    <div className="text-[10px] font-mono text-[#9AA0A6] uppercase">LEARNING GAIN TELEMETRY</div>
                    <div className="text-base font-display font-medium text-[#6DD58C]">+34.2% Growth</div>
                    <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                      Pre-diagnostic baseline 61.8% to 96.0% post-capstone competency.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
                    <div className="text-[10px] font-mono text-[#9AA0A6] uppercase">COHORT CREDIT POOL</div>
                    <div className="text-base font-display font-medium text-[#A8C7FA]">5,000 Pooled Credits</div>
                    <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                      Institution-level quota ensures zero mid-lesson lockouts on school PLDs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1">
                    <div className="text-[10px] font-mono text-[#9AA0A6] uppercase">INSTITUTIONAL SAFETY</div>
                    <div className="text-base font-display font-medium text-[#E3E3E3]">Port 443 Verified</div>
                    <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                      0% AI training on student prompts. Full Singapore PDPA adherence.
                    </p>
                  </div>
                </div>

                {/* MOE "Four Learns" Framework Alignment (Rubric Table) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-medium text-sm text-white">
                        MOE EdTech Masterplan: "Four Learns" Framework Rubric
                      </h3>
                      <p className="text-xs text-[#9AA0A6]">
                        Structured competencies evaluated across the 6-module curriculum.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#6DD58C] bg-[#13281C] border border-[#6DD58C]/25 px-3 py-1 rounded-full">
                      100% Curricular Coverage
                    </span>
                  </div>

                  <div className="border border-white/[0.07] rounded-2xl overflow-hidden bg-[#131314]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#1A1B1E] border-b border-white/[0.07] text-[10px] font-mono text-[#9AA0A6] uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4 font-normal">Domain</th>
                          <th className="py-3 px-4 font-normal">Pedagogical Focus</th>
                          <th className="py-3 px-4 font-normal">Competency Description</th>
                          <th className="py-3 px-4 font-normal text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06] font-sans">
                        {MOE_RUBRIC_ITEMS.map((item) => (
                          <tr key={item.code} className="hover:bg-[#1E1F22] transition-colors">
                            <td className="py-3 px-4 font-mono text-[#A8C7FA] font-medium whitespace-nowrap">
                              Learns {item.code}
                            </td>
                            <td className="py-3 px-4 font-medium text-[#E3E3E3] whitespace-nowrap">
                              {item.learn}
                            </td>
                            <td className="py-3 px-4 text-xs text-[#9AA0A6] leading-relaxed">
                              {item.desc}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-[10px] text-[#6DD58C] whitespace-nowrap">
                              {item.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 10 Core Programme Deliverables Pack */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-medium text-sm text-white">
                        10 Verified Programme Deliverables & Teaching Packs
                      </h3>
                      <p className="text-xs text-[#9AA0A6]">
                        Turnkey documentation ready for school reporting and teacher portfolio signoffs.
                      </p>
                    </div>
                    <button
                      onClick={() => showToast("Downloading complete 10-Item Educator Package (ZIP)...")}
                      className="px-4 py-2 rounded-full border border-white/[0.08] bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="size-3.5" />
                      <span>Download All Packs (.ZIP)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {PROGRAMME_DELIVERABLES.map((del) => (
                      <div key={del.id} className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#E3E3E3] flex items-center gap-2">
                            <span className={`size-2 rounded-full ${del.category === 'teaching' ? 'bg-[#A8C7FA]' : 'bg-[#6DD58C]'}`} />
                            <span>{del.title}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#1E1F22] text-[#9AA0A6] text-[9px] font-mono border border-white/[0.08]">
                            {del.format}
                          </span>
                        </div>
                        <p className="text-[#9AA0A6] text-[11px] leading-relaxed">
                          {del.description}
                        </p>
                        <div className="pt-1.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#9AA0A6]">
                          <span>Alignment: {del.moeAlignment}</span>
                          <button
                            onClick={() => showToast(`Previewing ${del.title}`)}
                            className="text-[#A8C7FA] hover:text-white transition-colors"
                          >
                            Preview →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          GEBIZ TENDER SPECIFICATION MODAL
         ======================================================== */}
      {isQuotationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1E1F22] border border-white/[0.08] rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden text-[#E3E3E3]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-full bg-[#162238] border border-[#A8C7FA]/25 text-[#A8C7FA] flex items-center justify-center">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-sm text-white">GeBIZ Quotation Specification Generator</h3>
                  <span className="text-[10px] text-[#9AA0A6] font-mono">Category: IT & Digital Media Enrichment Training Services</span>
                </div>
              </div>
              <button
                onClick={() => setIsQuotationModalOpen(false)}
                className="text-[#9AA0A6] hover:text-white text-xs p-2 rounded-full hover:bg-[#282A2E] transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#131314] border border-white/[0.07] font-mono text-[11px] text-[#C4C7C5] space-y-2 select-text">
              <div className="text-[#6DD58C] font-bold">GEBIZ TENDER SPECIFICATION SUMMARY:</div>
              <div>• Service: Show3D Spatial & Generative AI Design Enrichment Workshop (Secondary D&T)</div>
              <div>• Duration: 10 Hours (6 Structured Sessions) for Cohort of 28 Students</div>
              <div>• Pooled Generation Allowance: 5,000 Institutional Credits (AWS Singapore)</div>
              <div>• Network Compatibility: Standard HTTPS Port 443 (Zero firewall exemptions)</div>
              <div>• PDPA Compliance: 0% Student data used for AI retraining · Age 13+ compliant</div>
              <div>• Recommended Funding: School Enrichment Budget / ALP Allocation / MOE Opportunity Fund</div>
              <div>• Verified Deliverables: 10 Items (Workbooks, Rubrics, SLF Portfolios, MOE Certificates)</div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `GEBIZ TENDER SPECIFICATION SUMMARY:\nService: Show3D Spatial & Generative AI Design Enrichment Workshop (Secondary D&T)\nDuration: 10 Hours (6 Structured Sessions) for Cohort of 28 Students\nPooled Generation Allowance: 5,000 Institutional Credits (AWS Singapore)\nNetwork Compatibility: Standard HTTPS Port 443 (Zero firewall exemptions)\nPDPA Compliance: 0% Student data used for AI retraining · Age 13+ compliant\nRecommended Funding: School Enrichment Budget / ALP Allocation / MOE Opportunity Fund\nVerified Deliverables: 10 Items (Workbooks, Rubrics, SLF Portfolios, MOE Certificates)`
                  );
                  showToast("GeBIZ quotation specification copied to clipboard!");
                }}
                className="px-4 py-2 rounded-full border border-white/[0.08] bg-[#282A2E] hover:bg-[#33363B] text-[#E3E3E3] text-xs font-medium transition-colors"
              >
                Copy Tender Text
              </button>

              <button
                onClick={() => {
                  showToast("Downloading GeBIZ_Quotation_Show3D.pdf...");
                  setIsQuotationModalOpen(false);
                }}
                className="px-4 py-2 rounded-full bg-[#A8C7FA] hover:bg-[#BBD4FB] text-[#062E6F] text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="size-3.5" />
                <span>Download Formal PDF Pack</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
