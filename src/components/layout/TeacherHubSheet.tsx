import React, { useState } from 'react';
import { X, Check, Download } from 'lucide-react';
import { LEARNING_MODULES, STUDENT_ROSTER, MOE_RUBRIC_ITEMS } from '../../store/appStore';

interface TeacherHubSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'roster' | 'syllabus' | 'rubric' | 'agreement';

export const TeacherHubSheet: React.FC<TeacherHubSheetProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('roster');
  const [filter, setFilter] = useState<'all' | 'needs_help' | 'completed'>('all');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(3);

  if (!isOpen) return null;

  const filteredStudents = STUDENT_ROSTER.filter((s) => {
    if (filter === 'needs_help') return s.status === 'needs_help';
    if (filter === 'completed') return s.status === 'completed';
    return true;
  });

  const selectedModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none font-sans text-zinc-200">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-zinc-800 bg-[#1c1c1e] shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-[#18181b]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Teacher Facilitator Dashboard
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700">
                Self-Guided Model
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Tampines Secondary School · Class 3-Faith (28 Students)
            </p>
          </div>
          <button
            onClick={onClose}
            className="size-7 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Apple Segmented Bar */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/50 px-4 gap-1">
          {[
            { id: 'roster' as TabType, label: 'Student Roster (28)' },
            { id: 'syllabus' as TabType, label: '10-Hour Syllabus' },
            { id: 'rubric' as TabType, label: 'MOE Rubric' },
            { id: 'agreement' as TabType, label: 'Pilot Agreement' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-white bg-zinc-800/40'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: ROSTER */}
          {activeTab === 'roster' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Class Progress Summary</span>
                <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                  {[
                    { id: 'all', label: 'All (28)' },
                    { id: 'needs_help', label: 'Needs Support (2)' },
                    { id: 'completed', label: 'Completed (4)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id as any)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        filter === f.id
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roster Table */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/70 border-b border-zinc-800 text-[11px] text-zinc-400 font-mono">
                    <tr>
                      <th className="py-2.5 px-3 font-normal">Student</th>
                      <th className="py-2.5 px-3 font-normal">Current Module</th>
                      <th className="py-2.5 px-3 font-normal">Status</th>
                      <th className="py-2.5 px-3 font-normal">Credits Used</th>
                      <th className="py-2.5 px-3 font-normal text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-sans">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-2 px-3 flex items-center gap-2">
                          <span className="size-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300 font-mono">
                            {s.avatar}
                          </span>
                          <span className="font-medium text-white">{s.name}</span>
                        </td>
                        <td className="py-2 px-3 text-zinc-400 font-mono">Module {s.currentModule}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                              s.status === 'needs_help'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                : s.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}
                          >
                            {s.status === 'needs_help' ? 'Needs Help' : s.status === 'completed' ? 'Done' : 'On Track'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-zinc-400 font-mono">{s.creditsUsed} / 50</td>
                        <td className="py-2 px-3 text-right font-mono text-zinc-300">
                          {s.reflectionScore || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SYLLABUS */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  {LEARNING_MODULES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModuleId(m.id)}
                      className={`w-full p-2.5 rounded-lg text-left border text-xs transition-colors ${
                        selectedModuleId === m.id
                          ? 'bg-zinc-800 border-zinc-700 text-white'
                          : 'bg-zinc-900/40 border-transparent text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
                        <span>{m.code}</span>
                        <span>{m.duration}</span>
                      </div>
                      <div className="font-medium truncate mt-0.5">{m.title}</div>
                    </button>
                  ))}
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400">{selectedModule.code} · {selectedModule.duration}</span>
                    <h4 className="text-sm font-semibold text-white mt-0.5">{selectedModule.title}</h4>
                    <p className="text-zinc-400 mt-1 leading-relaxed">{selectedModule.summary}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                    <div className="text-[11px] font-medium text-zinc-300">Learning Objectives:</div>
                    <ul className="space-y-1 text-zinc-400 text-[11px]">
                      {selectedModule.learningObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-400">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-[11px]">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-zinc-500 font-medium">Vendor Delivery:</div>
                      <div className="text-zinc-300 mt-0.5">{selectedModule.vendorScope}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-zinc-500 font-medium">Teacher Role:</div>
                      <div className="text-zinc-300 mt-0.5">{selectedModule.teacherFacilitation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RUBRIC */}
          {activeTab === 'rubric' && (
            <div className="space-y-3">
              <div className="text-xs text-zinc-400">
                Aligned with Singapore MOE EdTech Masterplan 2030 AI Literacy Competencies.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MOE_RUBRIC_ITEMS.map((item) => (
                  <div key={item.code} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-blue-400">Learns {item.code}</span>
                      <span className="text-zinc-500">{item.status}</span>
                    </div>
                    <div className="font-semibold text-white">{item.learn}</div>
                    <p className="text-[11px] text-zinc-400 leading-normal">{item.desc}</p>
                    <ul className="pt-2 border-t border-zinc-800/80 space-y-1 text-[10px] text-zinc-400">
                      {item.criteria.map((c, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-zinc-600">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PILOT AGREEMENT */}
          {activeTab === 'agreement' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Secondary School Pilot Outline</h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    1 Class · 6 Sessions (10 Hours) · Eligible for IMDA Code for Fun Subsidy
                  </p>
                </div>
                <button
                  onClick={() => alert("Downloading Show3D_Pilot_Brief.pdf")}
                  className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5"
                >
                  <Download className="size-3.5" />
                  <span>Download Brief</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <div className="font-semibold text-white">Software Access</div>
                  <div className="text-zinc-400 mt-1">Full browser-based WebGL licenses and 1,400 classroom AI credits.</div>
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <div className="font-semibold text-white">Teacher Workload</div>
                  <div className="text-zinc-400 mt-1">Zero lesson planning required; 1-hour briefing provided by vendor.</div>
                </div>
                <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <div className="font-semibold text-white">Deliverable</div>
                  <div className="text-zinc-400 mt-1">Verified 3D campus project summary and MOE AI literacy certificate.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800 bg-[#18181b] flex items-center justify-between text-xs text-zinc-500">
          <span>Singapore MOE EdTech Masterplan 2030</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
