import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  ShieldCheck, 
  Sparkles,
  BarChart3,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react';
import { LEARNING_MODULES, STUDENT_ROSTER, MOE_RUBRIC_ITEMS } from '../../store/appStore';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'roster' | 'curriculum' | 'rubric' | 'proposal';

export const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('roster');
  const [rosterFilter, setRosterFilter] = useState<'all' | 'needs_help' | 'completed'>('all');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(3);

  if (!isOpen) return null;

  const filteredStudents = STUDENT_ROSTER.filter((s) => {
    if (rosterFilter === 'needs_help') return s.status === 'needs_help';
    if (rosterFilter === 'completed') return s.status === 'completed';
    return true;
  });

  const selectedModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md select-none animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col max-h-[90vh] bg-zinc-950/95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/70">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
              <GraduationCap className="size-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Teacher Facilitator Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Zero Teacher Prep
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Tampines Secondary School · Class 3-Faith (Design & Technology · 28 Students)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-zinc-900/40 px-4 gap-2 overflow-x-auto">
          {[
            { id: 'roster' as TabType, label: 'Live Class Roster & Telemetry', icon: Users, badge: '28 Students' },
            { id: 'curriculum' as TabType, label: '6-Week Turnkey Syllabus', icon: BookOpen, badge: '10 Hours' },
            { id: 'rubric' as TabType, label: 'MOE "Four Learns" Rubric', icon: Award, badge: 'AI Standards' },
            { id: 'proposal' as TabType, label: 'Pilot Package for HODs', icon: FileText, badge: 'IMDA Funded' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400 bg-white/5'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <tab.icon className="size-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                activeTab === tab.id ? 'bg-blue-500/20 text-blue-300' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* TAB 1: LIVE CLASS ROSTER & TELEMETRY */}
          {activeTab === 'roster' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Facilitation Info Banner */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-5 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white">Vendor-Taught, Teacher-Facilitated Model</div>
                    <div className="text-[11px] text-zinc-400">
                      Show3D guides students through self-paced micro-lessons. Teachers simply monitor progress and assist students who flag for help.
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="size-3.5" />
                  <span>26 / 28 On Track</span>
                </div>
              </div>

              {/* Roster Filter Chips */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300">Cohort Activity Telemetry</span>
                <div className="flex gap-1.5">
                  {[
                    { id: 'all', label: 'All Students (28)' },
                    { id: 'needs_help', label: 'Needs Assistance (2)' },
                    { id: 'completed', label: 'Completed (4)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setRosterFilter(f.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        rosterFilter === f.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-3 rounded-xl border transition-all ${
                      student.status === 'needs_help'
                        ? 'bg-rose-950/20 border-rose-500/40 shadow-xs'
                        : student.status === 'completed'
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-zinc-900/60 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-200">
                          {student.avatar}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{student.name}</div>
                          <div className="text-[10px] text-zinc-400 font-mono">Module 0{student.currentModule}</div>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                          student.status === 'needs_help'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : student.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                        }`}
                      >
                        {student.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
                      <span>Credits: {student.creditsUsed}/50</span>
                      {student.reflectionScore ? (
                        <span className="text-emerald-400 font-semibold">{student.reflectionScore}</span>
                      ) : (
                        <span>{student.lastActive}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 6-WEEK TURNKEY SYLLABUS */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Module Selector Sidebar */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Modules (10-Hr Track)
                  </div>
                  {LEARNING_MODULES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModuleId(m.id)}
                      className={`w-full p-2.5 rounded-xl text-left border transition-all ${
                        selectedModuleId === m.id
                          ? 'bg-blue-600/20 border-blue-500/40 text-white'
                          : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-blue-400">{m.code}</span>
                        <span className="text-[10px] text-zinc-500">{m.duration}</span>
                      </div>
                      <div className="text-xs font-semibold mt-0.5 truncate">{m.title}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 truncate">{m.moeLearn}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Module Detail Panel */}
                <div className="md:col-span-2 p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        {selectedModule.code} · {selectedModule.duration}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {selectedModule.moeLearn}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{selectedModule.title}</h3>
                    <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{selectedModule.summary}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-zinc-200">Key Learning Objectives:</div>
                    <div className="space-y-1">
                      {selectedModule.learningObjectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckCircle2 className="size-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                    <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-white/5">
                      <div className="text-[10px] font-bold uppercase text-blue-400">Vendor Responsibility</div>
                      <div className="text-[11px] text-zinc-300 mt-1">{selectedModule.vendorScope}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-white/5">
                      <div className="text-[10px] font-bold uppercase text-emerald-400">Teacher Role (Zero Prep)</div>
                      <div className="text-[11px] text-zinc-300 mt-1">{selectedModule.teacherFacilitation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MOE "FOUR LEARNS" RUBRIC */}
          {activeTab === 'rubric' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Singapore MOE "Four Learns" AI Competency Rubric
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Standardized criteria used to evaluate student projects for MOE AI Literacy Certification.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  EdTech Masterplan 2030
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOE_RUBRIC_ITEMS.map((item) => (
                  <div key={item.code} className="p-3.5 rounded-xl bg-zinc-900/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-400 uppercase font-mono">
                        Learns {item.code}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.learn}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div className="pt-2 border-t border-white/5 space-y-1">
                      {item.criteria.map((crit, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[10px] text-zinc-300">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{crit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PILOT PACKAGE FOR HODS */}
          {activeTab === 'proposal' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Turnkey School Pilot Agreement
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      IMDA Code for Fun Eligible
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">
                    Show3D Secondary School AI Creator Pilot (1 Cohort · 6 Weeks)
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
                    Zero financial risk: Eligible for 70%–100% IMDA/MOE CFF co-funding. Includes full WebGL software licenses, 28 student accounts, automated rubric grading, and a dedicated vendor support engineer.
                  </p>
                </div>
                <button
                  onClick={() => alert("Downloading: Show3D_Secondary_School_Pilot_Proposal.pdf")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/25 shrink-0"
                >
                  <Download className="size-4" />
                  <span>Download Pilot One-Pager</span>
                </button>
              </div>

              {/* Pilot Deliverables Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    title: '1. What Schools Receive',
                    desc: '28 student licenses, 1,400 AI generation credits, interactive self-paced modules, and turnkey lesson guides.'
                  },
                  {
                    title: '2. Teacher Commitment',
                    desc: 'Zero lesson planning. 1 hour facilitator orientation + in-class supervision during 6 regular timetable sessions.'
                  },
                  {
                    title: '3. Evidence & Deliverable',
                    desc: 'Each student produces a verified 3D school improvement project + MOE AI Literacy Certificate of Completion.'
                  }
                ].map((col, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1.5">
                    <div className="text-xs font-bold text-white">{col.title}</div>
                    <div className="text-[11px] text-zinc-400 leading-relaxed">{col.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
          <span>Singapore MOE EdTech Masterplan 2030 Aligned</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition-all"
          >
            Close Hub
          </button>
        </div>
      </div>
    </div>
  );
};
