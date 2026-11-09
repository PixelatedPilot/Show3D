import React, { useState } from 'react';
import {
  Users,
  Download,
  AlertCircle,
  FileText,
  Search,
  Eye,
  Tv,
  Send,
  RotateCcw,
  ChevronRight,
  X,
  Box,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import {
  LEARNING_MODULES,
  STUDENT_ROSTER,
  MOE_RUBRIC_ITEMS,
  PROGRAMME_DELIVERABLES,
  SCHOOL_PROCUREMENT_SPEC,
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
  const [selectedStudent, setSelectedStudent] =
    useState<StudentRosterItem | null>(
      STUDENT_ROSTER.find((s) => s.id === 'st-04') || null
    );
  const [teacherNotes, setTeacherNotes] = useState<Record<string, string>>({
    'st-04':
      'Marcus had canopy wall thickness below 2.0mm. Sent scaffolding hint to increase rib thickness to 2.8mm for FDM printability.',
    'st-08':
      'Lucas needed clarification on Y-up vertical height vs Z-depth orientation for courtyard bench stability.',
  });
  const [activeNoteText, setActiveNoteText] = useState(
    teacherNotes['st-04'] || ''
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const getModuleForStudent = (moduleId: number) => {
    return (
      LEARNING_MODULES.find((m) => m.id === moduleId) || LEARNING_MODULES[2]
    );
  };

  const flaggedStudents = STUDENT_ROSTER.filter(
    (s) => s.status === 'needs_help'
  );

  const filteredStudents = STUDENT_ROSTER.filter((s) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const modTitle = getModuleForStudent(s.currentModule).title.toLowerCase();
      if (
        !s.name.toLowerCase().includes(q) &&
        !(s.demonstratedSkill || '').toLowerCase().includes(q) &&
        !modTitle.includes(q)
      ) {
        return false;
      }
    }
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
      [selectedStudent.id]: activeNoteText,
    }));
    showToast(`Saved formative observation note for ${selectedStudent.name}`);
  };

  const handleSendHint = (studentName?: string) => {
    const targetName = studentName || selectedStudent?.name || 'Student';
    showToast(`Scaffolding hint sent to ${targetName}'s 3D Studio`);
  };

  const handleResetQuiz = () => {
    if (!selectedStudent) return;
    showToast(`Formative diagnostic check unlocked for ${selectedStudent.name}`);
  };

  const handleAirPlay = () => {
    if (!selectedStudent) return;
    showToast(
      `Projecting ${selectedStudent.name}'s 3D viewport to classroom display`
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-[#000000] text-[#F5F5F7] font-sans select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1C1C1E]/95 backdrop-blur-xl border border-[#30D158]/40 text-[#F5F5F7] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs">
          <div className="size-2 rounded-full bg-[#30D158]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 flex flex-col gap-5">
        {/* ========================================================
            1. TOP EXECUTIVE COMMAND BAR (Apple Classroom + Linear)
           ======================================================== */}
        <header className="bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-5 py-3.5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Left: Cohort Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0A84FF]/15 border border-[#0A84FF]/30 flex items-center justify-center text-[#0A84FF] shrink-0">
              <Users className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-display font-semibold text-[#F5F5F7] tracking-tight">
                  Facilitator Command Center
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#30D158]/15 text-[#30D158] text-[10px] font-mono font-semibold">
                  LIVE COHORT
                </span>
              </div>
              <p className="text-xs text-[#86868B]">
                Class 3-Faith · Tampines Secondary School ·{' '}
                {STUDENT_ROSTER.length} Students
              </p>
            </div>
          </div>

          {/* Center: 2-Tab Apple Segmented Control */}
          <div className="flex items-center gap-1 bg-[#000000] p-1 rounded-xl border border-white/[0.08] self-start xl:self-auto">
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'monitoring'
                  ? 'bg-[#2C2C2E] text-[#F5F5F7] shadow-sm border border-white/[0.1]'
                  : 'text-[#86868B] hover:text-[#F5F5F7]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
              <span>Live Classroom (28)</span>
            </button>
            <button
              onClick={() => setActiveTab('curriculum_procurement')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'curriculum_procurement'
                  ? 'bg-[#2C2C2E] text-[#F5F5F7] shadow-sm border border-white/[0.1]'
                  : 'text-[#86868B] hover:text-[#F5F5F7]'
              }`}
            >
              <FileText className="size-3.5 text-[#0A84FF]" />
              <span>Curriculum & GeBIZ Pack</span>
            </button>
          </div>

          {/* Right: 3 Clean KPI Pills + Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setActiveTab('monitoring');
                setStudentFilter('needs_help');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#FFD60A]/15 border border-[#FFD60A]/30 text-[#FFD60A] text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-[#FFD60A]/20 transition-colors"
            >
              <AlertCircle className="size-3.5" />
              <span>{flaggedStudents.length} Flagged for Help</span>
            </button>

            <div className="px-3 py-1.5 rounded-xl bg-[#30D158]/15 border border-[#30D158]/30 text-[#30D158] text-xs font-medium">
              +34.2% Learning Gain
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#64D2FF] text-xs font-mono">
              3,886 / 5,000 Credits
            </div>

            <button
              onClick={onSwitchToStudent}
              className="px-3 py-1.5 rounded-xl bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Student View</span>
              <ChevronRight className="size-3.5 text-[#86868B]" />
            </button>
          </div>
        </header>

        {/* ========================================================
            TAB 1: LIVE CLASS MONITORING
           ======================================================== */}
        {activeTab === 'monitoring' && (
          <div className="flex-1 flex flex-col gap-5">
            {/* Priority Intervention Strip (Marcus Lee & Lucas Teo) */}
            {flaggedStudents.length > 0 && (
              <section
                aria-label="Priority Student Interventions"
                className="bg-[#1C1C1E] border border-[#FFD60A]/35 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFD60A]/15 border border-[#FFD60A]/40 flex items-center justify-center text-[#FFD60A] shrink-0">
                    <AlertCircle className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#FFD60A] uppercase tracking-wider">
                      Priority Coaching Queue · 2 Students Require Scaffolding
                    </div>
                    <p className="text-xs text-[#86868B] mt-0.5">
                      Real-time printability and coordinate-axis checks flagged
                      two meshes before STL slicing.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {flaggedStudents.map((st) => {
                    const stMod = getModuleForStudent(st.currentModule);
                    return (
                      <div
                        key={st.id}
                        className="flex items-center gap-3 bg-[#000000]/70 border border-white/[0.08] rounded-xl px-3.5 py-2"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#F5F5F7]">
                            {st.name}{' '}
                            <span className="text-[#86868B] font-mono">
                              ({stMod.code})
                            </span>
                          </div>
                          <div className="text-[11px] text-[#FFD60A]">
                            {st.id === 'st-04'
                              ? 'Wall thickness < 2.0mm'
                              : 'X vs Z axis orientation'}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            handleSelectStudent(st);
                            handleSendHint(st.name);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#FFD60A] hover:bg-[#FFE047] text-black text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Inspect & Send Hint
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Main Classroom Split: Student Roster Grid (Left) + Slide-Over Inspector (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start flex-1">
              {/* Left 8 Columns: Search, Filter & Student Roster Grid */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {/* Search & Segmented Filter Toolbar */}
                <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="size-3.5 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search student, module, or skill..."
                      className="w-full bg-[#000000] border border-white/[0.08] focus:border-[#0A84FF] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#F5F5F7] placeholder-[#86868B] outline-none transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-[#000000] p-1 border border-white/[0.08] rounded-xl overflow-x-auto">
                    {[
                      { id: 'all' as StudentFilter, label: 'All (28)' },
                      { id: 'active' as StudentFilter, label: 'On Track (22)' },
                      {
                        id: 'needs_help' as StudentFilter,
                        label: 'Needs Help (2)',
                        alert: true,
                      },
                      {
                        id: 'completed' as StudentFilter,
                        label: 'Completed (4)',
                      },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setStudentFilter(f.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                          studentFilter === f.id
                            ? f.alert
                              ? 'bg-[#FFD60A] text-black font-semibold'
                              : 'bg-[#0A84FF] text-white font-semibold'
                            : 'text-[#86868B] hover:text-[#F5F5F7]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decluttered Student Roster Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudent?.id === student.id;
                    const isHelp = student.status === 'needs_help';
                    const isDone = student.status === 'completed';
                    const delta =
                      (student.postScore || 90) - (student.preScore || 60);
                    const studentModule = getModuleForStudent(
                      student.currentModule
                    );

                    return (
                      <button
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1C1C1E] border-[#0A84FF] ring-2 ring-[#0A84FF]/30'
                            : isHelp
                            ? 'bg-[#1C1C1E] border-[#FFD60A]/50 hover:border-[#FFD60A]'
                            : 'bg-[#1C1C1E] border-white/[0.08] hover:border-white/[0.2]'
                        }`}
                      >
                        {/* 1. Student Identity & Status Pill */}
                        <div className="flex items-start justify-between gap-2 w-full">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="size-8 rounded-full bg-[#2C2C2E] border border-white/[0.08] font-mono text-xs font-bold flex items-center justify-center text-[#F5F5F7] shrink-0">
                              {student.avatar}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-xs text-[#F5F5F7] truncate">
                                {student.name}
                              </div>
                              <div className="text-[11px] text-[#86868B]">
                                Active {student.lastActive}
                              </div>
                            </div>
                          </div>

                          {isHelp ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#FFD60A]/15 border border-[#FFD60A]/40 text-[#FFD60A] text-[10px] font-semibold shrink-0">
                              Needs Help
                            </span>
                          ) : isDone ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/40 text-[#64D2FF] text-[10px] font-semibold shrink-0">
                              Completed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 text-[#30D158] text-[10px] font-semibold shrink-0">
                              On Track
                            </span>
                          )}
                        </div>

                        {/* 2. Dynamic Module Title & Demonstrated Skill */}
                        <div className="bg-[#000000]/60 rounded-xl p-2.5 border border-white/[0.06] w-full space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#64D2FF]">
                            <span className="truncate">
                              {studentModule.code}: {studentModule.title}
                            </span>
                          </div>
                          <div className="text-xs text-[#F5F5F7]/90 font-medium truncate">
                            {student.demonstratedSkill ||
                              studentModule.studentChallenge}
                          </div>
                        </div>

                        {/* 3. Pre→Post Growth & Credit Usage */}
                        <div className="pt-1 border-t border-white/[0.06] flex items-center justify-between text-[11px] w-full">
                          <span className="text-[#86868B] font-mono">
                            Credits:{' '}
                            <strong className="text-[#F5F5F7]">
                              {student.creditsUsed}
                            </strong>
                            /50
                          </span>
                          <span className="text-[#30D158] font-mono font-semibold">
                            +{delta}% Growth
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right 4 Columns: Slide-Over Student Inspector Drawer */}
              <aside className="lg:col-span-4 bg-[#1C1C1E] border border-white/[0.08] rounded-3xl p-5 space-y-5 sticky top-20">
                {selectedStudent ? (
                  <>
                    {/* Student Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] font-mono text-sm font-bold flex items-center justify-center">
                          {selectedStudent.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-[#F5F5F7]">
                            {selectedStudent.name}
                          </h3>
                          <p className="text-xs text-[#86868B] font-mono">
                            {
                              getModuleForStudent(selectedStudent.currentModule)
                                .code
                            }{' '}
                            ·{' '}
                            {
                              getModuleForStudent(selectedStudent.currentModule)
                                .title
                            }
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStudent(null)}
                        aria-label="Close student inspector"
                        className="p-1.5 rounded-full text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#2C2C2E] transition-colors cursor-pointer"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    {/* Alert Callout if Flagged */}
                    {selectedStudent.status === 'needs_help' && (
                      <div className="p-4 rounded-2xl bg-[#FFD60A]/10 border border-[#FFD60A]/40 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-[#FFD60A]">
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="size-4" />
                            <span>Printability Intervention Needed</span>
                          </span>
                          <span className="font-mono text-[10px]">
                            SLA CHECK
                          </span>
                        </div>
                        <p className="text-xs text-[#F5F5F7]/90 leading-relaxed">
                          {selectedStudent.id === 'st-04'
                            ? 'Canopy arch wall thickness is currently 1.4mm (< 2.0mm minimum). Recommend adding 2.8mm structural ribs before STL export.'
                            : 'Base support footprint is oriented along the X-axis instead of the Z-depth courtyard channel.'}
                        </p>
                        <button
                          onClick={() => handleSendHint(selectedStudent.name)}
                          className="w-full py-2 rounded-xl bg-[#FFD60A] hover:bg-[#FFE047] text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Send className="size-3.5" />
                          <span>Send 2.8mm Wall Thickness Hint</span>
                        </button>
                      </div>
                    )}

                    {/* Primary 3D Studio Inspection CTA */}
                    <button
                      onClick={onLaunchCanvasModal}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                    >
                      <Box className="size-4" />
                      <span>Inspect Student Mesh in 3D Studio</span>
                    </button>

                    {/* Active PARTS Recipe Tokens */}
                    <div className="p-4 rounded-2xl bg-[#000000]/60 border border-white/[0.08] space-y-2.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868B]">
                        Active PARTS Prompt Tokens
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#64D2FF] text-[11px] font-mono">
                          P: Eco-Industrial Designer
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#30D158]/15 border border-[#30D158]/30 text-[#30D158] text-[11px] font-mono">
                          A:{' '}
                          {
                            getModuleForStudent(selectedStudent.currentModule)
                              .title
                          }
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#FFD60A]/15 border border-[#FFD60A]/30 text-[#FFD60A] text-[11px] font-mono">
                          R: Tropical Courtyard
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[#F5F5F7] text-[11px] font-mono">
                          S: 2.8mm Wall · 450W Solar
                        </span>
                      </div>
                    </div>

                    {/* Pre -> Post Competency Growth */}
                    <div className="p-4 rounded-2xl bg-[#000000]/60 border border-white/[0.08] space-y-2.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#86868B]">
                        Formative Competency Telemetry
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
                          <span className="text-[#86868B] block text-[10px]">
                            Pre-Diagnostic
                          </span>
                          <span className="text-[#F5F5F7] font-mono text-sm font-bold">
                            {selectedStudent.preScore || 60}%
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.06]">
                          <span className="text-[#86868B] block text-[10px]">
                            Post-Check Mastery
                          </span>
                          <span className="text-[#30D158] font-mono text-sm font-bold">
                            {selectedStudent.postScore || 92}%
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-[#86868B]">
                        Demonstrated:{' '}
                        <span className="text-[#F5F5F7] font-medium">
                          {selectedStudent.demonstratedSkill}
                        </span>
                      </div>
                    </div>

                    {/* Quick Classroom Controls */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleAirPlay}
                        className="py-2 px-3 rounded-xl bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Tv className="size-3.5 text-[#30D158]" />
                        <span>AirPlay Screen</span>
                      </button>
                      <button
                        onClick={handleResetQuiz}
                        className="py-2 px-3 rounded-xl bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="size-3.5 text-[#FFD60A]" />
                        <span>Unlock Check</span>
                      </button>
                    </div>

                    {/* Formative Observation Note */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                        Formative Portfolio Observation Note
                      </label>
                      <textarea
                        value={activeNoteText}
                        onChange={(e) => setActiveNoteText(e.target.value)}
                        placeholder="Record observation on student's spatial reasoning or iteration..."
                        rows={3}
                        className="w-full bg-[#000000] border border-white/[0.08] focus:border-[#0A84FF] rounded-xl p-3 text-xs text-[#F5F5F7] placeholder-[#86868B] outline-none resize-none"
                      />
                      <button
                        onClick={handleSaveNote}
                        className="w-full py-2 rounded-xl bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] font-medium text-xs transition-colors cursor-pointer"
                      >
                        Save Portfolio Note
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="size-12 rounded-2xl bg-[#000000] border border-white/[0.08] flex items-center justify-center text-[#86868B]">
                      <Users className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#F5F5F7]">
                        Select a Student Tile
                      </h4>
                      <p className="text-xs text-[#86868B] mt-1 max-w-[220px] leading-relaxed">
                        Click any student card to inspect their live PARTS
                        prompt tokens, 3D mesh printability, and growth
                        telemetry.
                      </p>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: CURRICULUM & GEBIZ PROCUREMENT PACK
           ======================================================== */}
        {activeTab === 'curriculum_procurement' && (
          <div className="space-y-6 pb-8">
            {/* Hero Bento Header */}
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] text-xs font-semibold">
                  <ShieldCheck className="size-3.5" />
                  <span>
                    Turnkey Singapore MOE Secondary D&T & ALP Enrichment Package
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#F5F5F7] tracking-tight">
                  6-Module Spatial Curriculum & GeBIZ Specification
                </h2>
                <p className="text-sm text-[#86868B] leading-relaxed">
                  Prepared for Tampines Secondary School ·{' '}
                  {STUDENT_ROSTER.length} Students · 10 Hours (6 Sessions) ·
                  Pooled {SCHOOL_PROCUREMENT_SPEC.creditPoolSize.toLocaleString()}{' '}
                  Generation Credits.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {onOpenProcurementModal && (
                  <button
                    onClick={onOpenProcurementModal}
                    className="px-4 py-2.5 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-white/[0.08] text-[#F5F5F7] text-xs font-medium transition-colors cursor-pointer"
                  >
                    Open School Funding Guide
                  </button>
                )}
                <button
                  onClick={() => setIsQuotationModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Generate GeBIZ Specification</span>
                </button>
              </div>
            </div>

            {/* 6-Module Macro Curriculum Matrix */}
            <section className="bg-[#1C1C1E] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-display font-semibold text-[#F5F5F7]">
                    6-Module Macro Curriculum Architecture (10 Hours)
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    Grounded in Seymour Papert&apos;s Constructionism and the
                    Singapore MOE EdTech Masterplan 2030.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 text-[#30D158] text-xs font-semibold">
                  6 Modules · 18 Visual Lessons
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {LEARNING_MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    className="p-5 rounded-2xl bg-[#000000]/60 border border-white/[0.08] flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#0A84FF]/15 text-[#0A84FF] font-mono text-xs font-semibold">
                          {mod.code}
                        </span>
                        <span className="text-xs text-[#86868B] font-mono">
                          {mod.duration}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-[#F5F5F7]">
                        {mod.title}
                      </h4>
                      <p className="text-xs text-[#86868B] leading-relaxed">
                        {mod.studentChallenge}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/[0.06] space-y-1 text-[11px]">
                      <div className="text-[#64D2FF] font-medium">
                        {mod.moeLearn}
                      </div>
                      <div className="text-[#86868B]">{mod.keySkill}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* MOE "Four Learns" Rubric Table */}
            <section className="bg-[#1C1C1E] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-semibold text-[#F5F5F7]">
                    MOE EdTech Masterplan 2030: &ldquo;Four Learns&rdquo; Rubric
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    Formative and summative assessment criteria evaluated across
                    student portfolios.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#30D158] bg-[#30D158]/15 border border-[#30D158]/30 px-3 py-1 rounded-full">
                  100% Curricular Coverage
                </span>
              </div>

              <div className="border border-white/[0.08] rounded-2xl overflow-hidden bg-[#000000]/60">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#2C2C2E]/60 border-b border-white/[0.08] text-[11px] font-mono text-[#86868B] uppercase">
                    <tr>
                      <th className="py-3.5 px-4">Domain</th>
                      <th className="py-3.5 px-4">Pedagogical Focus</th>
                      <th className="py-3.5 px-4">Competency Description</th>
                      <th className="py-3.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {MOE_RUBRIC_ITEMS.map((item) => (
                      <tr
                        key={item.code}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono text-[#0A84FF] font-semibold whitespace-nowrap">
                          Learns {item.code}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#F5F5F7] whitespace-nowrap">
                          {item.learn}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#86868B] leading-relaxed">
                          {item.desc}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-xs text-[#30D158] whitespace-nowrap">
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 10 Turnkey Programme Deliverables */}
            <section className="bg-[#1C1C1E] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-display font-semibold text-[#F5F5F7]">
                    10 Verified Programme Deliverables & Educator Packs
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    Ready for HOD sign-off, school reporting, and student
                    portfolio archiving.
                  </p>
                </div>
                <button
                  onClick={() =>
                    showToast(
                      'Downloading complete 10-Item Educator Package (.ZIP)...'
                    )
                  }
                  className="px-4 py-2 rounded-full bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-white/[0.08] text-[#F5F5F7] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Download All 10 Packs (.ZIP)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PROGRAMME_DELIVERABLES.map((del) => (
                  <div
                    key={del.id}
                    className="p-4 rounded-2xl bg-[#000000]/60 border border-white/[0.08] space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-xs text-[#F5F5F7] flex items-center gap-2">
                        <span
                          className={`size-2 rounded-full ${
                            del.category === 'teaching'
                              ? 'bg-[#0A84FF]'
                              : 'bg-[#30D158]'
                          }`}
                        />
                        <span>{del.title}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2C2C2E] text-[#86868B] text-[10px] font-mono">
                        {del.format}
                      </span>
                    </div>
                    <p className="text-[#86868B] text-xs leading-relaxed">
                      {del.description}
                    </p>
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#86868B]">
                      <span>Alignment: {del.moeAlignment}</span>
                      <button
                        onClick={() => showToast(`Previewing ${del.title}`)}
                        className="text-[#0A84FF] hover:text-[#64D2FF] transition-colors cursor-pointer"
                      >
                        Preview →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* ========================================================
          GEBIZ TENDER SPECIFICATION MODAL
         ======================================================== */}
      {isQuotationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-white/[0.1] rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden text-[#F5F5F7]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] flex items-center justify-center">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-[#F5F5F7]">
                    GeBIZ Quotation Specification Generator
                  </h3>
                  <span className="text-xs text-[#86868B] font-mono">
                    {SCHOOL_PROCUREMENT_SPEC.gebizCategory}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsQuotationModalOpen(false)}
                className="text-[#86868B] hover:text-[#F5F5F7] p-2 rounded-full hover:bg-[#2C2C2E] transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#000000] border border-white/[0.08] font-mono text-xs text-[#F5F5F7]/90 space-y-2 select-text">
              <div className="text-[#30D158] font-bold">
                GEBIZ TENDER SPECIFICATION SUMMARY:
              </div>
              <div>
                • Service: Show3D Spatial &amp; Generative AI Design Enrichment
                Workshop (Secondary D&amp;T)
              </div>
              <div>
                • Duration: 10 Hours (6 Structured Sessions) for Cohort of 28
                Students
              </div>
              <div>
                • Pooled Generation Allowance: 5,000 Institutional Credits (AWS
                Singapore)
              </div>
              <div>
                • Network Compatibility: Standard HTTPS Port 443 (Zero firewall
                exemptions)
              </div>
              <div>
                • PDPA Compliance: 0% Student data used for AI retraining · Age
                13+ compliant
              </div>
              <div>
                • Recommended Funding: School Enrichment Budget / ALP Allocation
                / MOE Opportunity Fund
              </div>
              <div>
                • Verified Deliverables: 10 Items (Workbooks, Rubrics, SLF
                Portfolios, MOE Certificates)
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `GEBIZ TENDER SPECIFICATION SUMMARY:\nService: Show3D Spatial & Generative AI Design Enrichment Workshop (Secondary D&T)\nDuration: 10 Hours (6 Structured Sessions) for Cohort of 28 Students\nPooled Generation Allowance: 5,000 Institutional Credits (AWS Singapore)\nNetwork Compatibility: Standard HTTPS Port 443 (Zero firewall exemptions)\nPDPA Compliance: 0% Student data used for AI retraining · Age 13+ compliant\nRecommended Funding: School Enrichment Budget / ALP Allocation / MOE Opportunity Fund\nVerified Deliverables: 10 Items (Workbooks, Rubrics, SLF Portfolios, MOE Certificates)`
                  );
                  showToast(
                    'GeBIZ quotation specification copied to clipboard!'
                  );
                }}
                className="px-4 py-2 rounded-full border border-white/[0.08] bg-[#2C2C2E] hover:bg-[#3A3A3C] text-[#F5F5F7] text-xs font-medium transition-colors cursor-pointer"
              >
                Copy Tender Text
              </button>

              <button
                onClick={() => {
                  showToast('Downloading GeBIZ_Quotation_Show3D.pdf...');
                  setIsQuotationModalOpen(false);
                }}
                className="px-5 py-2 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
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
