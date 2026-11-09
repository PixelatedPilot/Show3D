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
    <div className="flex-1 flex h-[calc(100vh-3rem)] bg-[#070708] text-[#e5e2e3] overflow-hidden font-sans select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#101112] border border-[#50d8e9]/50 text-[#e5e2e3] px-4 py-2.5 rounded shadow-2xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2">
          <div className="size-2 rounded-full bg-[#50d8e9] animate-ping" />
          <span className="font-mono text-[11px]">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          LEFT SIDEBAR (Romer High-Density Command Hub)
         ======================================================== */}
      <aside className="w-64 bg-[#0d0e0f] border-r border-[#232426] flex flex-col justify-between shrink-0 overflow-y-auto z-10">
        <div className="p-4 space-y-5">
          
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#50d8e9] shadow-[0_0_8px_#50d8e9]" />
              <span className="text-[10px] font-mono tracking-widest text-[#9A9DA3]/70 uppercase">
                SYS // FACILITATOR_COMMAND
              </span>
            </div>
            <h1 className="text-lg font-bold text-[#e5e2e3] tracking-tight">
              Facilitator Hub
            </h1>
            <p className="text-xs text-[#9A9DA3]">
              Class 3-Faith · Tampines Secondary
            </p>
          </div>

          {/* View Switcher (Romer Report Types Pattern) */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#9A9DA3]/60 px-1">
              REPORT VIEWS
            </div>
            
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`w-full p-2.5 rounded text-left transition-all flex items-start gap-2.5 border ${
                activeTab === 'monitoring'
                  ? 'bg-[#191A1C] border-[#232426] text-white shadow-xs'
                  : 'bg-transparent border-transparent text-[#9A9DA3] hover:text-white hover:bg-[#121314]'
              }`}
            >
              <span className="size-1.5 rounded-full bg-[#50d8e9] shadow-[0_0_8px_#50d8e9] mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold leading-tight text-[#e5e2e3]">
                  Live Class Monitoring
                </div>
                <div className="text-[10px] font-mono text-[#9A9DA3]/70 mt-0.5">
                  System Overview // 28_ACTV
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('curriculum_procurement')}
              className={`w-full p-2.5 rounded text-left transition-all flex items-start gap-2.5 border ${
                activeTab === 'curriculum_procurement'
                  ? 'bg-[#191A1C] border-[#232426] text-white shadow-xs'
                  : 'bg-transparent border-transparent text-[#9A9DA3] hover:text-white hover:bg-[#121314]'
              }`}
            >
              <FileText className="size-3.5 text-[#5E6BFF] mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold leading-tight text-[#e5e2e3]">
                  Curriculum & GeBIZ Pack
                </div>
                <div className="text-[10px] font-mono text-[#9A9DA3]/70 mt-0.5">
                  Procurement & Ops // MOE_2030
                </div>
              </div>
            </button>
          </div>

          {/* Live Telemetry Stream Blocks (from Romer Hero Left Panel) */}
          <div className="space-y-2.5 pt-2 border-t border-[#232426]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#9A9DA3]/60 px-1">
              LIVE TELEMETRY STREAMS
            </div>

            {/* Block 1: LEARNING_GAIN */}
            <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#9A9DA3]">LEARNING_GAIN</span>
                <span className="text-[#50d8e9] font-semibold">ACTV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold font-mono text-[#e5e2e3] tracking-tight">
                  +34.2%
                </span>
                {/* Sparkline */}
                <svg className="w-16 h-5 stroke-[#50d8e9] fill-none" viewBox="0 0 64 20">
                  <path d="M 0 16 Q 16 14, 28 9 T 50 6 T 64 2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-[10px] font-mono text-[#9A9DA3]/70">
                Pre: 61.8% → Post: 96.0%
              </div>
            </div>

            {/* Block 2: CREDIT_POOL */}
            <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#9A9DA3]">CREDIT_POOL</span>
                <span className="text-[#5E6BFF] font-semibold">OK // 77.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono text-[#e5e2e3] tracking-tight">
                  3,886 / 5,000
                </span>
                {/* Sparkline */}
                <svg className="w-16 h-5 stroke-[#5E6BFF] fill-none" viewBox="0 0 64 20">
                  <path d="M 0 14 L 14 12 L 28 15 L 42 8 L 56 10 L 64 4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-[10px] font-mono text-[#9A9DA3]/70">
                1,114 used · 0 locked
              </div>
            </div>

            {/* Block 3: HELP_QUEUE */}
            <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#9A9DA3]">HELP_QUEUE</span>
                <span className="text-[#ffb689] font-semibold">WARN // INTERVENTION</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold font-mono text-[#ffb689] tracking-tight">
                  02
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ffb689]/10 text-[#ffb689] border border-[#ffb689]/20">
                  ACTION_REQ
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#9A9DA3]/70 truncate">
                Marcus Lee, Lucas Teo
              </div>
            </div>

          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#232426] space-y-2 bg-[#0a0a0c]">
          <button
            onClick={onSwitchToStudent}
            className="w-full py-1.5 px-3 rounded bg-[#101112] hover:bg-[#161719] border border-[#232426] text-xs text-[#e5e2e3] flex items-center justify-between transition-colors"
          >
            <span>Test as Student</span>
            <ChevronRight className="size-3 text-[#9A9DA3]" />
          </button>

          <button
            onClick={onLaunchCanvasModal}
            className="w-full py-1.5 px-3 rounded bg-[#5E6BFF]/15 hover:bg-[#5E6BFF]/25 border border-[#5E6BFF]/30 text-xs text-[#5E6BFF] flex items-center justify-center gap-1.5 transition-colors font-medium"
          >
            <Eye className="size-3" />
            <span>Launch 3D Canvas</span>
          </button>

          <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-[#9A9DA3]/50">
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
            <div className="flex-1 flex flex-col overflow-hidden bg-[#070708]">
              
              {/* Toolbar */}
              <div className="h-12 border-b border-[#232426] px-5 flex items-center justify-between gap-3 shrink-0 bg-[#0a0a0c]">
                
                {/* Search Box */}
                <div className="relative w-56 sm:w-64">
                  <Search className="size-3.5 text-[#9A9DA3] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search student or skill..."
                    className="w-full bg-[#101112] border border-[#232426] focus:border-[#5E6BFF] rounded pl-8 pr-3 py-1 text-xs text-[#e5e2e3] placeholder-[#9A9DA3]/50 outline-none transition-colors font-sans"
                  />
                </div>

                {/* Romer Segmented Filter Bar */}
                <div className="flex items-center gap-1 bg-[#070708] p-0.5 border border-[#232426] rounded">
                  {[
                    { id: 'all' as StudentFilter, label: 'All (28)', count: 28 },
                    { id: 'active' as StudentFilter, label: 'Active', count: 22 },
                    { id: 'needs_help' as StudentFilter, label: 'Needs Help (2)', count: 2, alert: true },
                    { id: 'completed' as StudentFilter, label: 'Completed (4)', count: 4 },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setStudentFilter(f.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                        studentFilter === f.id
                          ? f.alert
                            ? 'bg-[#ffb689]/20 text-[#ffb689] border border-[#ffb689]/40 font-semibold shadow-xs'
                            : 'bg-[#191A1C] text-white border border-[#232426] font-semibold shadow-xs'
                          : 'text-[#9A9DA3] hover:text-[#e5e2e3] border border-transparent'
                      }`}
                    >
                      <span>{f.label}</span>
                    </button>
                  ))}
                </div>

                {/* Telemetry Tag */}
                <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-[#9A9DA3]/70">
                  <span>SYNC_RATE: 0.992</span>
                  <span className="text-[#232426]">|</span>
                  <span>COHORT: 28</span>
                </div>
              </div>

              {/* Student Cards Grid */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudent?.id === student.id;
                    const isHelp = student.status === 'needs_help';
                    const isDone = student.status === 'completed';
                    const delta = (student.postScore || 90) - (student.preScore || 60);

                    return (
                      <div
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        className={`bg-[#101112] border rounded-lg p-3.5 relative transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'border-[#5E6BFF] bg-[#141518] ring-1 ring-[#5E6BFF]/40'
                            : isHelp
                            ? 'border-[#ffb689]/50 bg-[#161210] hover:border-[#ffb689]'
                            : 'border-[#232426] hover:border-[#454655] bg-[#101112]'
                        }`}
                      >
                        {/* Top Shimmer Line */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                        {/* Top Row: Avatar & Status Badge (Romer SIGNAL_SUMMARY pattern) */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="size-7 rounded bg-[#151617] border border-[#232426] font-mono text-xs font-bold flex items-center justify-center text-[#e5e2e3]">
                              {student.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-[#e5e2e3] leading-tight">
                                {student.name}
                              </div>
                              <span className="text-[10px] text-[#9A9DA3] font-mono">
                                {student.lastActive}
                              </span>
                            </div>
                          </div>

                          {/* Romer SIGNAL_SUMMARY Status Badge */}
                          {isHelp ? (
                            <div className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#ffb689]/10 border border-[#ffb689]/30">
                              <span className="size-1.5 rounded-full bg-[#ffb689] animate-pulse" />
                              <span className="text-[#ffb689] font-mono text-[9px] font-semibold tracking-wide">
                                WARN // HELP_FLAG
                              </span>
                            </div>
                          ) : isDone ? (
                            <div className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#5E6BFF]/10 border border-[#5E6BFF]/30">
                              <span className="size-1.5 rounded-full bg-[#5E6BFF]" />
                              <span className="text-[#5E6BFF] font-mono text-[9px] font-semibold tracking-wide">
                                DONE // 100%
                              </span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#50d8e9]/10 border border-[#50d8e9]/30">
                              <span className="size-1.5 rounded-full bg-[#50d8e9]" />
                              <span className="text-[#50d8e9] font-mono text-[9px] font-semibold tracking-wide">
                                OK // SYNC
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Middle Activity Box */}
                        <div className="mt-3 bg-[#070708] rounded p-2 border border-[#1B1C1E] space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-[#9A9DA3] font-mono">
                            <span>Module {student.currentModule}: Solar Kiosk</span>
                            <span>Slide {isDone ? '6 of 6' : isHelp ? '4 of 6' : '3 of 6'}</span>
                          </div>
                          <div className="text-[11px] text-[#e5e2e3] font-medium truncate">
                            {student.demonstratedSkill || 'Ergonomics & Structural Wall Ribs'}
                          </div>
                        </div>

                        {/* Bottom Metric Row */}
                        <div className="mt-2.5 pt-2 border-t border-[#1B1C1E] flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#9A9DA3]">
                            Credits: <span className="text-[#e5e2e3] font-semibold">{student.creditsUsed}</span> / 50
                          </span>
                          <span className="text-[#50d8e9] font-semibold bg-[#50d8e9]/10 px-1.5 py-0.2 rounded border border-[#50d8e9]/20">
                            +{delta}% Growth
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Romer Inspector Drawer */}
            <div className={`w-80 bg-[#0d0e0f] border-l border-[#232426] flex flex-col justify-between shrink-0 overflow-y-auto p-4 transition-all ${
              selectedStudent ? 'block' : 'hidden lg:block'
            }`}>
              {selectedStudent ? (
                <div className="space-y-4">
                  
                  {/* Top Bar with Dismiss */}
                  <div className="flex items-center justify-between border-b border-[#232426] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="size-7 rounded bg-[#151617] border border-[#232426] text-[#50d8e9] font-mono text-xs font-bold flex items-center justify-center">
                        {selectedStudent.avatar}
                      </span>
                      <div>
                        <h3 className="font-bold text-xs text-[#e5e2e3] leading-tight">
                          {selectedStudent.name}
                        </h3>
                        <span className="text-[10px] text-[#9A9DA3] font-mono">
                          ID: {selectedStudent.id}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="text-[#9A9DA3] hover:text-white text-xs px-2 py-1 rounded hover:bg-[#1a1b1d] transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  {/* Attention Callout if student needs help */}
                  {selectedStudent.status === 'needs_help' && (
                    <div className="p-3 rounded bg-[#ffb689]/10 border border-[#ffb689]/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[#ffb689] font-semibold text-[11px] font-mono">
                        <span className="flex items-center gap-1.5">
                          <AlertCircle className="size-3.5" />
                          <span>ATTENTION_FLAG // INTERVENTION</span>
                        </span>
                        <span>0x4A</span>
                      </div>
                      <p className="text-[11px] text-[#e5e2e3] leading-relaxed">
                        Student attempted to generate without physical wall thickness constraint. 3D slicer would flag this as non-printable.
                      </p>
                      <button
                        onClick={() => handleSendHint('Remember to specify minimum 3mm wall thickness for structural 3D printing stability.')}
                        className="w-full py-1.5 rounded bg-[#ffb689] hover:bg-[#ffa970] text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Send className="size-3" />
                        <span>Send Scaffolding Hint</span>
                      </button>
                    </div>
                  )}

                  {/* Active PARTS Prompt Recipe Tokens Preview */}
                  <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9A9DA3]">
                      PARTS Prompt Recipe Tokens:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 rounded bg-[#070708] border border-[#232426] text-[#50d8e9] text-[10px] font-mono">
                        P: Eco-Industrialist
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#070708] border border-[#232426] text-[#5E6BFF] text-[10px] font-mono">
                        A: Solar Kiosk
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#070708] border border-[#232426] text-[#bec2ff] text-[10px] font-mono">
                        R: Tampines Park
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#070708] border border-[#232426] text-[#ffb689] text-[10px] font-mono">
                        T: Biophilic Timber
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#070708] border border-[#232426] text-[#e5e2e3] text-[10px] font-mono">
                        S: 450W Monocrystalline
                      </span>
                    </div>
                  </div>

                  {/* Competency & Formative Telemetry */}
                  <div className="p-3 rounded bg-[#101112] border border-[#232426] space-y-2 text-xs">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9A9DA3]">
                      MOE D&T Formative Telemetry:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 rounded bg-[#070708] border border-[#1B1C1E]">
                        <span className="text-[#9A9DA3] block text-[9px]">Pre-Diagnostic</span>
                        <span className="text-[#e5e2e3] font-bold">{selectedStudent.preScore || 60}%</span>
                      </div>
                      <div className="p-2 rounded bg-[#070708] border border-[#1B1C1E]">
                        <span className="text-[#9A9DA3] block text-[9px]">Post-Check Score</span>
                        <span className="text-[#50d8e9] font-bold">{selectedStudent.postScore || 92}%</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-[#9A9DA3] pt-1">
                      Demonstrated: <span className="text-[#e5e2e3] font-medium">{selectedStudent.demonstratedSkill}</span>
                    </div>
                  </div>

                  {/* Romer Control Queue Action Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#9A9DA3]">
                      Control Queue Actions:
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={handleAirPlay}
                        className="p-2 rounded bg-[#101112] hover:bg-[#191A1C] border border-[#232426] text-[#e5e2e3] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Tv className="size-3 text-[#50d8e9]" />
                        <span>Project to Display</span>
                      </button>

                      <button
                        onClick={handleResetQuiz}
                        className="p-2 rounded bg-[#101112] hover:bg-[#191A1C] border border-[#232426] text-[#e5e2e3] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="size-3 text-[#ffb689]" />
                        <span>Unlock Quiz</span>
                      </button>
                    </div>

                    <button
                      onClick={onLaunchCanvasModal}
                      className="w-full p-2 rounded bg-[#5E6BFF]/15 hover:bg-[#5E6BFF]/25 border border-[#5E6BFF]/30 text-[#5E6BFF] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="size-3.5" />
                      <span>Inspect 3D Geometry in Show3D Canvas</span>
                    </button>
                  </div>

                  {/* Formative Assessment Note Editor */}
                  <div className="space-y-1.5 pt-1 border-t border-[#232426]">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#9A9DA3] block">
                      Formative Observation Note (D&T Portfolio):
                    </label>
                    <textarea
                      value={activeNoteText}
                      onChange={(e) => setActiveNoteText(e.target.value)}
                      placeholder="Add observation note on student's spatial reasoning or prompt iteration..."
                      rows={3}
                      className="w-full bg-[#101112] border border-[#1B1C1E] focus:border-[#5E6BFF] rounded p-2 text-xs text-[#e5e2e3] placeholder-[#9A9DA3]/50 outline-none resize-none font-sans"
                    />
                    <button
                      onClick={handleSaveNote}
                      className="w-full py-1.5 rounded bg-[#151617] hover:bg-[#1d1e21] text-[#e5e2e3] font-medium text-xs transition-colors border border-[#232426]"
                    >
                      Save Observation Note
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="size-10 rounded bg-[#101112] border border-[#232426] flex items-center justify-center text-[#9A9DA3]">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#e5e2e3]">Select Student Card</h4>
                    <p className="text-[11px] text-[#9A9DA3] mt-1 max-w-[180px] leading-relaxed">
                      Click any student tile to inspect prompt recipe tokens, growth telemetry, and trigger 1-click interventions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: CURRICULUM & GEBIZ PROCUREMENT PACK (Romer Document View)
           ======================================================== */}
        {activeTab === 'curriculum_procurement' && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#070708] flex justify-center">
            <div className="max-w-4xl w-full space-y-6">
              
              {/* Document Sheet (Styled directly after Romer Executive Reports preview) */}
              <div className="bg-[#101112] border border-[#232426] rounded-lg p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative space-y-6">
                
                {/* Top Shimmer Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                {/* Document Toolbar */}
                <div className="bg-[#151617] p-2.5 rounded border border-[#1B1C1E] flex flex-wrap items-center justify-between text-xs font-mono text-[#9A9DA3] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e5e2e3] font-semibold">REP-GEBIZ-2026-TPSS.pdf</span>
                    <span className="text-[#232426]">|</span>
                    <span>Page 1 / 2</span>
                    <span className="text-[#232426]">|</span>
                    <span className="text-[10px] text-[#9A9DA3]/70">DOC_TYPE: TENDER_SPEC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#50d8e9]/10 text-[#50d8e9] border border-[#50d8e9]/20 text-[10px]">
                      <span className="size-1.5 rounded-full bg-[#50d8e9]" />
                      <span>Status: E-INVOICING_READY</span>
                    </span>
                  </div>
                </div>

                {/* Document Header */}
                <div className="border-b border-[#232426] pb-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono tracking-widest text-[#9A9DA3] uppercase">
                      SINGAPORE MOE SECONDARY PILOT PACKAGE // GEBIZ IT_ENRICHMENT
                    </div>
                    <h2 className="text-xl font-bold text-[#e5e2e3] tracking-tight">
                      MOE D&T Curriculum & GeBIZ Specification
                    </h2>
                    <p className="text-xs text-[#9A9DA3]">
                      Tampines Secondary School · 28 Student Cohort · School Enrichment Budget Alignment
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {onOpenProcurementModal && (
                      <button
                        onClick={onOpenProcurementModal}
                        className="px-3.5 py-1.5 rounded border border-[#232426] bg-[#151617] hover:bg-[#232426] text-[#e5e2e3] text-xs font-medium transition-colors"
                      >
                        Open Funding Guide
                      </button>
                    )}
                    <button
                      onClick={() => setIsQuotationModalOpen(true)}
                      className="px-4 py-1.5 rounded bg-[#5E6BFF] hover:bg-[#4d59df] text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Download className="size-3" />
                      <span>Download GeBIZ Pack</span>
                    </button>
                  </div>
                </div>

                {/* Telemetry Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded bg-[#151617] border border-[#1B1C1E] space-y-1">
                    <div className="text-[10px] font-mono text-[#9A9DA3] uppercase">LEARNING GAIN TELEMETRY</div>
                    <div className="text-base font-bold font-mono text-[#50d8e9]">+34.2% Growth</div>
                    <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                      Pre-diagnostic baseline 61.8% to 96.0% post-capstone competency.
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-[#151617] border border-[#1B1C1E] space-y-1">
                    <div className="text-[10px] font-mono text-[#9A9DA3] uppercase">COHORT CREDIT POOL</div>
                    <div className="text-base font-bold font-mono text-[#5E6BFF]">5,000 Pooled Credits</div>
                    <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                      Institution-level quota ensures zero mid-lesson lockouts on school PLDs.
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-[#151617] border border-[#1B1C1E] space-y-1">
                    <div className="text-[10px] font-mono text-[#9A9DA3] uppercase">INSTITUTIONAL SAFETY</div>
                    <div className="text-base font-bold font-mono text-[#e5e2e3]">Port 443 Verified</div>
                    <p className="text-[11px] text-[#9A9DA3] leading-relaxed">
                      0% AI training on student prompts. Full Singapore PDPA adherence.
                    </p>
                  </div>
                </div>

                {/* MOE "Four Learns" Framework Alignment (Rubric Table) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[#e5e2e3]">
                        MOE EdTech Masterplan: "Four Learns" Framework Rubric
                      </h3>
                      <p className="text-xs text-[#9A9DA3]">
                        Structured competencies evaluated across the 6-module curriculum.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#50d8e9] bg-[#50d8e9]/10 border border-[#50d8e9]/20 px-2 py-0.5 rounded">
                      100% Curricular Coverage
                    </span>
                  </div>

                  <div className="border border-[#232426] rounded-lg overflow-hidden bg-[#0d0e0f]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#151617] border-b border-[#232426] text-[10px] font-mono text-[#9A9DA3] uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-3.5 font-normal">Domain</th>
                          <th className="py-2.5 px-3.5 font-normal">Pedagogical Focus</th>
                          <th className="py-2.5 px-3.5 font-normal">Competency Description</th>
                          <th className="py-2.5 px-3.5 font-normal text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1B1C1E] font-sans">
                        {MOE_RUBRIC_ITEMS.map((item) => (
                          <tr key={item.code} className="hover:bg-[#141517] transition-colors">
                            <td className="py-3 px-3.5 font-mono text-[#50d8e9] font-medium whitespace-nowrap">
                              Learns {item.code}
                            </td>
                            <td className="py-3 px-3.5 font-medium text-[#e5e2e3] whitespace-nowrap">
                              {item.learn}
                            </td>
                            <td className="py-3 px-3.5 text-xs text-[#9A9DA3] leading-relaxed">
                              {item.desc}
                            </td>
                            <td className="py-3 px-3.5 text-right font-mono text-[10px] text-[#50d8e9] whitespace-nowrap">
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
                      <h3 className="font-bold text-sm text-[#e5e2e3]">
                        10 Verified Programme Deliverables & Teaching Packs
                      </h3>
                      <p className="text-xs text-[#9A9DA3]">
                        Turnkey documentation ready for school reporting and teacher portfolio signoffs.
                      </p>
                    </div>
                    <button
                      onClick={() => showToast("Downloading complete 10-Item Educator Package (ZIP)...")}
                      className="px-3 py-1.5 rounded border border-[#232426] bg-[#151617] hover:bg-[#232426] text-[#e5e2e3] text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="size-3" />
                      <span>Download All Packs (.ZIP)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {PROGRAMME_DELIVERABLES.map((del) => (
                      <div key={del.id} className="p-3 rounded bg-[#151617] border border-[#1B1C1E] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#e5e2e3] flex items-center gap-2">
                            <span className={`size-1.5 rounded-full ${del.category === 'teaching' ? 'bg-[#5E6BFF]' : 'bg-[#50d8e9]'}`} />
                            <span>{del.title}</span>
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#070708] text-[#9A9DA3] text-[9px] font-mono border border-[#232426]">
                            {del.format}
                          </span>
                        </div>
                        <p className="text-[#9A9DA3] text-[11px] leading-relaxed">
                          {del.description}
                        </p>
                        <div className="pt-1 border-t border-[#232426] flex items-center justify-between text-[10px] font-mono text-[#9A9DA3]/70">
                          <span>Alignment: {del.moeAlignment}</span>
                          <button
                            onClick={() => showToast(`Previewing ${del.title}`)}
                            className="text-[#50d8e9] hover:text-white transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d0e0f] border border-[#232426] rounded-lg max-w-2xl w-full p-6 space-y-5 shadow-2xl relative overflow-hidden text-[#e5e2e3]">
            {/* Top Shimmer Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[#232426] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded bg-[#151617] border border-[#232426] text-[#5E6BFF] flex items-center justify-center">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#e5e2e3]">GeBIZ Quotation Specification Generator</h3>
                  <span className="text-[10px] text-[#9A9DA3] font-mono">Category: IT & Digital Media Enrichment Training Services</span>
                </div>
              </div>
              <button
                onClick={() => setIsQuotationModalOpen(false)}
                className="text-[#9A9DA3] hover:text-white text-xs px-2 py-1 rounded hover:bg-[#1a1b1d] transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4 rounded bg-[#070708] border border-[#232426] font-mono text-[11px] text-[#9A9DA3] space-y-2 select-text">
              <div className="text-[#50d8e9] font-bold">GEBIZ TENDER SPECIFICATION SUMMARY:</div>
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
                className="px-4 py-2 rounded border border-[#232426] bg-[#151617] hover:bg-[#232426] text-[#e5e2e3] text-xs font-medium transition-colors"
              >
                Copy Tender Text
              </button>

              <button
                onClick={() => {
                  showToast("Downloading GeBIZ_Quotation_Show3D.pdf...");
                  setIsQuotationModalOpen(false);
                }}
                className="px-4 py-2 rounded bg-[#5E6BFF] hover:bg-[#4d59df] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
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
