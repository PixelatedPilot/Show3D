import React, { useState } from 'react';
import { ArrowLeft, Check, Download, Users, BookOpen, Award, FileText, TrendingUp, Sparkles, FolderDown, ShieldCheck, ChevronRight } from 'lucide-react';
import { LEARNING_MODULES, STUDENT_ROSTER, MOE_RUBRIC_ITEMS, PROGRAMME_DELIVERABLES, SCHOOL_PROCUREMENT_SPEC } from '../../store/appStore';

interface TeacherDashboardViewProps {
  onSwitchToStudentView: () => void;
  onOpenProcurementModal?: () => void;
}

type TabType = 'roster' | 'syllabus' | 'rubric' | 'deliverables' | 'agreement';

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  onSwitchToStudentView,
  onOpenProcurementModal,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('roster');
  const [filter, setFilter] = useState<'all' | 'needs_help' | 'completed'>('all');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(3);

  const filteredStudents = STUDENT_ROSTER.filter((s) => {
    if (filter === 'needs_help') return s.status === 'needs_help';
    if (filter === 'completed') return s.status === 'completed';
    return true;
  });

  const selectedModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[2];

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-5xl mx-auto w-full space-y-6 text-[#e5e2e3] font-sans select-none bg-[#070708]">
      {/* Top Banner / Switch to Student View */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232426] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#50d8e9] shadow-[0_0_8px_#50d8e9]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#50d8e9] font-medium">
              SYS // FACILITATOR_DASHBOARD
            </span>
            <span className="text-[#232426]">·</span>
            <span className="text-xs text-[#9A9DA3]">Class 3-Faith · Tampines Secondary</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Teacher Facilitator Dashboard
          </h1>
          <p className="text-xs text-[#9A9DA3] mt-0.5 font-mono">
            COHORT_DENSITY: 28 // MOE D&T SECONDARY CURRICULUM // PORT_443_VERIFIED
          </p>
        </div>

        <button
          onClick={onSwitchToStudentView}
          className="px-3.5 py-1.5 rounded bg-[#151617] hover:bg-[#232426] text-[#e5e2e3] font-medium text-xs border border-[#232426] transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="size-3.5 text-[#9A9DA3]" />
          <span>Switch to Student View</span>
        </button>
      </div>

      {/* Classroom Status Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'COHORT_DENSITY', value: '28 Students', sub: 'Class 3-Faith · D&T', tag: 'ACTV', color: 'text-[#50d8e9]' },
          { label: 'LEARNING_GAIN', value: '+34.2%', sub: 'Pre: 61.8% → Post: 96.0%', tag: 'SYNC', color: 'text-[#50d8e9]' },
          { label: 'CREDIT_POOL', value: '3,886 / 5,000', sub: '1,114 used · 0 locked', tag: 'OK', color: 'text-[#5E6BFF]' },
          { label: 'DELIVERABLES_PACK', value: '10 / 10 Ready', sub: 'Workbooks & Rubrics', tag: 'READY', color: 'text-[#bec2ff]' },
        ].map((stat, i) => (
          <div key={i} className="p-3.5 rounded-lg border border-[#232426] bg-[#101112] space-y-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9DA3]">
              <span>{stat.label}</span>
              <span className={`text-[9px] font-semibold ${stat.color}`}>{stat.tag}</span>
            </div>
            <div className={`text-lg sm:text-xl font-bold tracking-tight font-mono ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-[10px] text-[#9A9DA3]/70 font-mono truncate">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Romer Navigation Tabs */}
      <div className="flex border-b border-[#232426] bg-[#0d0e0f] px-2 gap-1 rounded-t-lg overflow-x-auto">
        {[
          { id: 'roster' as TabType, label: 'Student Roster & Skills Delta', icon: Users },
          { id: 'syllabus' as TabType, label: '10-Hour Syllabus', icon: BookOpen },
          { id: 'rubric' as TabType, label: 'MOE "Four Learns" Rubric', icon: Award },
          { id: 'deliverables' as TabType, label: '10 Core Deliverables', icon: FolderDown },
          { id: 'agreement' as TabType, label: 'GeBIZ Pilot & Procurement', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-3.5 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === tab.id
                ? 'border-[#5E6BFF] text-white bg-[#151617]'
                : 'border-transparent text-[#9A9DA3] hover:text-[#e5e2e3]'
            }`}
          >
            <tab.icon className={`size-3.5 ${activeTab === tab.id ? 'text-[#5E6BFF]' : 'text-[#9A9DA3]'}`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="space-y-4">
        {/* TAB 1: ROSTER */}
        {activeTab === 'roster' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9A9DA3] font-mono text-[11px]">COHORT_ROSTER // 28_STUDENTS</span>
              <div className="flex items-center gap-1 bg-[#0d0e0f] p-0.5 rounded border border-[#232426]">
                {[
                  { id: 'all', label: 'All (28)' },
                  { id: 'needs_help', label: 'Needs Support (2)' },
                  { id: 'completed', label: 'Completed (4)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      filter === f.id
                        ? 'bg-[#191A1C] text-white border border-[#232426]'
                        : 'text-[#9A9DA3] hover:text-[#e5e2e3]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#232426] rounded-lg overflow-hidden bg-[#101112] relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <table className="w-full text-left text-xs">
                <thead className="bg-[#151617] border-b border-[#232426] text-[10px] text-[#9A9DA3] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 font-normal">Student</th>
                    <th className="py-2.5 px-3 font-normal">Demonstrated Competency</th>
                    <th className="py-2.5 px-3 font-normal text-center">Pre-Diagnostic</th>
                    <th className="py-2.5 px-3 font-normal text-center">Post-Capstone</th>
                    <th className="py-2.5 px-3 font-normal text-center">Growth Delta</th>
                    <th className="py-2.5 px-3 font-normal text-right">Credits Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B1C1E] font-sans">
                  {filteredStudents.map((s) => {
                    const delta = (s.postScore || 90) - (s.preScore || 60);
                    const isHelp = s.status === 'needs_help';
                    return (
                      <tr key={s.id} className="hover:bg-[#141517] transition-colors">
                        <td className="py-2.5 px-3 flex items-center gap-2">
                          <span className={`size-6 rounded font-mono text-[10px] flex items-center justify-center border ${
                            isHelp
                              ? 'bg-[#ffb689]/20 text-[#ffb689] border-[#ffb689]/40'
                              : 'bg-[#151617] text-[#e5e2e3] border-[#232426]'
                          }`}>
                            {s.avatar}
                          </span>
                          <span className="font-semibold text-white">{s.name}</span>
                          {isHelp && (
                            <span className="text-[9px] font-mono text-[#ffb689] px-1 rounded bg-[#ffb689]/10 border border-[#ffb689]/30">
                              FLAG
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-[#9A9DA3] font-mono text-[11px]">
                          {s.demonstratedSkill || 'Spatial Geometry & Shaders'}
                        </td>
                        <td className="py-2.5 px-3 text-center text-[#9A9DA3] font-mono">
                          {s.preScore || 60}%
                        </td>
                        <td className="py-2.5 px-3 text-center text-[#50d8e9] font-mono font-medium">
                          {s.postScore || 95}%
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-[#50d8e9]/10 text-[#50d8e9] text-[10px] border border-[#50d8e9]/20 font-semibold">
                            +{delta}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-[#9A9DA3] font-mono">
                          {s.creditsUsed} / 50
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SYLLABUS */}
        {activeTab === 'syllabus' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              {LEARNING_MODULES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModuleId(m.id)}
                  className={`w-full p-2.5 rounded text-left border transition-colors ${
                    selectedModuleId === m.id
                      ? 'bg-[#191A1C] border-[#232426] text-white shadow-xs'
                      : 'bg-[#101112] border-transparent text-[#9A9DA3] hover:text-[#e5e2e3]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#9A9DA3]/70">
                    <span>{m.code}</span>
                    <span>{m.duration}</span>
                  </div>
                  <div className="font-medium truncate mt-0.5 text-[#e5e2e3]">{m.title}</div>
                </button>
              ))}
            </div>

            <div className="md:col-span-2 p-5 rounded-lg border border-[#232426] bg-[#101112] space-y-3 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div>
                <span className="text-[10px] font-mono text-[#50d8e9]">{selectedModule.code} · {selectedModule.duration}</span>
                <h4 className="text-base font-semibold text-white mt-0.5">{selectedModule.title}</h4>
                <p className="text-[#9A9DA3] mt-1 leading-relaxed text-xs">{selectedModule.summary}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#232426]">
                <div className="text-[11px] font-medium text-[#e5e2e3]">Learning Objectives:</div>
                <ul className="space-y-1 text-[#9A9DA3] text-[11px]">
                  {selectedModule.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#50d8e9]">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#232426] text-[11px]">
                <div className="p-2.5 rounded bg-[#151617] border border-[#232426]">
                  <div className="text-[#9A9DA3] font-medium">Vendor Delivery:</div>
                  <div className="text-[#e5e2e3] mt-0.5">{selectedModule.vendorScope}</div>
                </div>
                <div className="p-2.5 rounded bg-[#151617] border border-[#232426]">
                  <div className="text-[#9A9DA3] font-medium">Teacher Role:</div>
                  <div className="text-[#e5e2e3] mt-0.5">{selectedModule.teacherFacilitation}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RUBRIC */}
        {activeTab === 'rubric' && (
          <div className="space-y-3">
            <div className="text-xs text-[#9A9DA3] font-mono">
              ALIGNED_WITH // SINGAPORE_MOE_EDTECH_MASTERPLAN_2030 // AI_LITERACY
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOE_RUBRIC_ITEMS.map((item) => (
                <div key={item.code} className="p-4 rounded-lg border border-[#232426] bg-[#101112] space-y-1.5 text-xs relative">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#50d8e9] font-medium">Learns {item.code}</span>
                    <span className="text-[#9A9DA3]">{item.status}</span>
                  </div>
                  <div className="font-semibold text-white">{item.learn}</div>
                  <p className="text-[11px] text-[#9A9DA3] leading-normal">{item.desc}</p>
                  <ul className="pt-2 border-t border-[#232426] space-y-1 text-[10px] text-[#9A9DA3]">
                    {item.criteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-[#5E6BFF]">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: 10 CORE PROGRAMME DELIVERABLES */}
        {activeTab === 'deliverables' && (
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232426] pb-3">
              <div>
                <h4 className="font-semibold text-white text-sm">10 Core Programme Deliverables & Teaching Packs</h4>
                <p className="text-[#9A9DA3] text-xs mt-0.5">
                  Complete teaching resources and verified evidence of learning per secondary research guidelines.
                </p>
              </div>
              <button
                onClick={() => alert("Downloading Complete 10-Item Educator Package (ZIP)...")}
                className="px-3.5 py-1.5 rounded bg-[#5E6BFF] hover:bg-[#4d59df] text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="size-3.5" />
                <span>Download All Packs (.ZIP)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROGRAMME_DELIVERABLES.map((del) => (
                <div key={del.id} className="p-3.5 rounded-lg border border-[#232426] bg-[#101112] space-y-2 relative">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className={`size-1.5 rounded-full ${del.category === 'teaching' ? 'bg-[#5E6BFF]' : 'bg-[#50d8e9]'}`} />
                      <span>{del.title}</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#151617] text-[#9A9DA3] text-[9px] border border-[#232426]">
                      {del.format}
                    </span>
                  </div>
                  <p className="text-[#9A9DA3] text-[11px] leading-relaxed">
                    {del.description}
                  </p>
                  <div className="pt-1.5 border-t border-[#232426] flex items-center justify-between text-[10px] font-mono text-[#9A9DA3]/70">
                    <span>Alignment: {del.moeAlignment}</span>
                    <button
                      onClick={() => alert(`Accessing preview for ${del.title}`)}
                      className="text-[#50d8e9] hover:text-white transition-colors"
                    >
                      Preview →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GEBIZ PILOT & PROCUREMENT */}
        {activeTab === 'agreement' && (
          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-lg border border-[#232426] bg-[#101112] flex flex-wrap items-center justify-between gap-4 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#50d8e9]/10 text-[#50d8e9] text-[10px] font-mono mb-1 border border-[#50d8e9]/20">
                  <span className="size-1.5 rounded-full bg-[#50d8e9]" />
                  <span>GeBIZ Quotation Ready · E-Invoicing</span>
                </div>
                <h4 className="font-semibold text-white text-sm">Secondary School Pilot Outline</h4>
                <p className="text-[#9A9DA3] text-xs mt-0.5">
                  1 Class (28 Students) · 6 Sessions (10 Hours) · Payable via School Enrichment Budgets / ALP Adaptation
                </p>
              </div>
              <div className="flex items-center gap-2">
                {onOpenProcurementModal && (
                  <button
                    onClick={onOpenProcurementModal}
                    className="px-3.5 py-2 rounded bg-[#151617] hover:bg-[#232426] text-[#e5e2e3] font-medium text-xs border border-[#232426] transition-colors"
                  >
                    View Procurement Guide
                  </button>
                )}
                <button
                  onClick={() => alert("Downloading GeBIZ_Quotation_Show3D.pdf")}
                  className="px-3.5 py-2 rounded bg-[#5E6BFF] hover:bg-[#4d59df] text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="size-3.5" />
                  <span>GeBIZ Quotation Pack</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg border border-[#232426] bg-[#101112] space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#5E6BFF]" />
                  <span>Guaranteed Software Quota</span>
                </div>
                <div className="text-[#9A9DA3] text-[11px] leading-normal">
                  5,000 pooled class AI generation credits. Zero mid-lesson student cutoffs; predictable institutional billing.
                </div>
              </div>
              <div className="p-3.5 rounded-lg border border-[#232426] bg-[#101112] space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#50d8e9]" />
                  <span>Funding Route Clarity</span>
                </div>
                <div className="text-[#9A9DA3] text-[11px] leading-normal">
                  Funded via internal School Enrichment Budgets or ALP themes. MOE Opportunity Fund eligible for supported students.
                </div>
              </div>
              <div className="p-3.5 rounded-lg border border-[#232426] bg-[#101112] space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#bec2ff]" />
                  <span>10 Verified Deliverables</span>
                </div>
                <div className="text-[#9A9DA3] text-[11px] leading-normal">
                  Workbooks, prompt guides, lesson plans, student portfolios, and verified participation certificates.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
