import React, { useState } from 'react';
import { initialEduState } from './store/appStore';
import { EduState } from './types';
import { switchAppMode, resetKeynoteOnModuleChange, AppMode } from './utils/workflowState';
import { AppleTopNav } from './components/layout/AppleTopNav';
import { StudentKeynoteDeck } from './components/student/StudentKeynoteDeck';
import { FacilitatorHub } from './components/facilitator/FacilitatorHub';
import { LandingView } from './components/landing/LandingView';
import { CertificateModal } from './components/layout/CertificateModal';
import { Show3DCanvasModal } from './components/layout/Show3DCanvasModal';
import { StudentSafetyModal } from './components/layout/StudentSafetyModal';
import { SchoolProcurementModal } from './components/layout/SchoolProcurementModal';
import { PedagogyFrameworkModal } from './components/layout/PedagogyFrameworkModal';

export const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AppMode>('student');
  const [eduState, setEduState] = useState<EduState>(initialEduState);
  const [isLandingView, setIsLandingView] = useState(true);
  
  // Modals
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isProcurementModalOpen, setIsProcurementModalOpen] = useState(false);
  const [isPedagogyModalOpen, setIsPedagogyModalOpen] = useState(false);

  // Partial state updater
  const handleUpdateEduState = (updates: Partial<EduState>) => {
    setEduState((prev) => ({ ...prev, ...updates }));
  };

  // Mode Switching
  const handleSwitchMode = (target: AppMode) => {
    setActiveMode((prev) => switchAppMode(prev, target));
    setIsLandingView(false);
  };

  // Module selection with reset state
  const handleSelectModule = (id: number) => {
    const reset = resetKeynoteOnModuleChange(id);
    setEduState((prev) => ({
      ...prev,
      activeModuleId: reset.activeModuleId,
    }));
    setIsLandingView(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#000000] text-[#F5F5F7] overflow-hidden select-none font-sans">
      
      {/* Apple HIG Dark Mode Top Navigation */}
      <AppleTopNav
        activeMode={activeMode}
        onSwitchMode={handleSwitchMode}
        onSelectRole={handleSwitchMode}
        activeModuleId={eduState.activeModuleId}
        onSelectModule={handleSelectModule}
        onLaunchCanvasModal={() => setIsCanvasModalOpen(true)}
        onOpenCanvas={() => setIsCanvasModalOpen(true)}
        isLandingView={isLandingView}
        onToggleLandingView={setIsLandingView}
      />

      {/* Main Viewport: Executive Landing View, Student Mode, or Facilitator Mode */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {isLandingView ? (
          <LandingView
            onStartLearning={() => {
              setIsLandingView(false);
              handleSwitchMode('student');
            }}
            onViewCurriculum={() => {
              setIsLandingView(false);
              handleSwitchMode('student');
            }}
            onOpenTeacherView={() => {
              setIsLandingView(false);
              handleSwitchMode('facilitator');
            }}
            onSelectModule={(id) => {
              handleSelectModule(id);
              handleSwitchMode('student');
            }}
            onLaunchCanvasModal={() => setIsCanvasModalOpen(true)}
            onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
            onOpenProcurementModal={() => setIsProcurementModalOpen(true)}
            onOpenPedagogyModal={() => setIsPedagogyModalOpen(true)}
          />
        ) : activeMode === 'student' ? (
          <StudentKeynoteDeck
            eduState={eduState}
            onUpdateEduState={handleUpdateEduState}
            onSelectModule={handleSelectModule}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
            onLaunchCanvasModal={() => setIsCanvasModalOpen(true)}
          />
        ) : (
          <FacilitatorHub
            onSwitchToStudent={() => handleSwitchMode('student')}
            onLaunchCanvasModal={() => setIsCanvasModalOpen(true)}
            onOpenProcurementModal={() => setIsProcurementModalOpen(true)}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        eduState={eduState}
      />

      <Show3DCanvasModal
        isOpen={isCanvasModalOpen}
        onClose={() => setIsCanvasModalOpen(false)}
      />

      <StudentSafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      <SchoolProcurementModal
        isOpen={isProcurementModalOpen}
        onClose={() => setIsProcurementModalOpen(false)}
      />

      <PedagogyFrameworkModal
        isOpen={isPedagogyModalOpen}
        onClose={() => setIsPedagogyModalOpen(false)}
      />

    </div>
  );
};
