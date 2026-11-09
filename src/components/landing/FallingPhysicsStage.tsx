import React, { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { 
  Sparkles, 
  RotateCcw, 
  Orbit, 
  ArrowUpRight, 
  FlaskConical, 
  Layers, 
  Award, 
  Box, 
  Printer, 
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface FallingPhysicsStageProps {
  onSelectModule?: (moduleId: number) => void;
}

interface PhysicsPillItem {
  id: string;
  label: string;
  category: 'badge' | 'concept' | 'prompt' | 'material';
  accentHex: string;
  tintBg: string;
  moduleId?: number;
  width: number;
  height: number;
  icon?: string;
}

const PILL_ITEMS: PhysicsPillItem[] = [
  // 6 Module Badges
  { id: 'm1', label: 'Spatial Scout', category: 'badge', accentHex: '#A8C7FA', tintBg: '#162238', moduleId: 1, width: 150, height: 44, icon: 'box' },
  { id: 'm2', label: 'Prompt Architect', category: 'badge', accentHex: '#FDD663', tintBg: '#2B2210', moduleId: 2, width: 170, height: 44, icon: 'sliders' },
  { id: 'm3', label: '3D Creator', category: 'badge', accentHex: '#6DD58C', tintBg: '#13281C', moduleId: 3, width: 140, height: 44, icon: 'printer' },
  { id: 'm4', label: 'Material Alchemist', category: 'badge', accentHex: '#A8C7FA', tintBg: '#1F2430', moduleId: 4, width: 180, height: 44, icon: 'layers' },
  { id: 'm5', label: 'Design Collaborator', category: 'badge', accentHex: '#FFB4AB', tintBg: '#2E1816', moduleId: 5, width: 185, height: 44, icon: 'award' },
  { id: 'm6', label: 'Certified Creator', category: 'badge', accentHex: '#6DD58C', tintBg: '#13281C', moduleId: 6, width: 165, height: 44, icon: 'award' },

  // Engineering & Spatial AI Concepts
  { id: 'c1', label: 'X, Y, Z Coordinates', category: 'concept', accentHex: '#A8C7FA', tintBg: '#131314', width: 175, height: 42 },
  { id: 'c2', label: 'Wireframe Skeletons', category: 'concept', accentHex: '#A8C7FA', tintBg: '#131314', width: 185, height: 42 },
  { id: 'c3', label: 'Watertight .STL', category: 'concept', accentHex: '#6DD58C', tintBg: '#131314', width: 155, height: 42 },
  { id: 'c4', label: '450W Solar Canopy', category: 'concept', accentHex: '#FDD663', tintBg: '#131314', width: 175, height: 42 },
  { id: 'c5', label: '60° Sightline Tilt', category: 'concept', accentHex: '#FFB4AB', tintBg: '#131314', width: 160, height: 42 },
  { id: 'c6', label: '94% Human Intent', category: 'concept', accentHex: '#6DD58C', tintBg: '#131314', width: 165, height: 42 },

  // PARTS Prompt Tokens
  { id: 'p1', label: 'P: Eco-Architect', category: 'prompt', accentHex: '#FDD663', tintBg: '#2B2210', width: 155, height: 40 },
  { id: 'p2', label: 'A: Tensile Canopy', category: 'prompt', accentHex: '#FDD663', tintBg: '#2B2210', width: 160, height: 40 },
  { id: 'p3', label: 'R: Campus Students', category: 'prompt', accentHex: '#FDD663', tintBg: '#2B2210', width: 170, height: 40 },
  { id: 'p4', label: 'T: Biophilic Modern', category: 'prompt', accentHex: '#FDD663', tintBg: '#2B2210', width: 170, height: 40 },
  { id: 'p5', label: 'S: 3mm Ribbed Shell', category: 'prompt', accentHex: '#FDD663', tintBg: '#2B2210', width: 175, height: 40 },

  // Physical Fabrication & Materials
  { id: 'mat1', label: 'Solar White PTFE', category: 'material', accentHex: '#E3E3E3', tintBg: '#282A2E', width: 160, height: 40 },
  { id: 'mat2', label: 'Anodized Sky Aluminum', category: 'material', accentHex: '#A8C7FA', tintBg: '#162238', width: 195, height: 40 },
  { id: 'mat3', label: 'Bamboo PLA Filament', category: 'material', accentHex: '#6DD58C', tintBg: '#13281C', width: 185, height: 40 },
];

export const FallingPhysicsStage: React.FC<FallingPhysicsStageProps> = ({ onSelectModule }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  
  // Physics engine references
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesMapRef = useRef<Map<string, Matter.Body>>(new Map());
  const wallsRef = useRef<Matter.Body[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const [isZeroG, setIsZeroG] = useState<boolean>(false);
  const [activeGrabCount, setActiveGrabCount] = useState<number>(0);
  const [selectedPill, setSelectedPill] = useState<string | null>(null);

  // Initialize and spawn physics bodies
  const spawnBodies = useCallback((engine: Matter.Engine, width: number) => {
    // Remove previous dynamic bodies
    bodiesMapRef.current.forEach((body) => {
      Matter.Composite.remove(engine.world, body);
    });
    bodiesMapRef.current.clear();

    const bodies: Matter.Body[] = [];

    PILL_ITEMS.forEach((pill, idx) => {
      // Stagger initial drop positions horizontally and vertically above view
      const col = idx % 5;
      const row = Math.floor(idx / 5);
      const spawnX = Math.max(90, Math.min(width - 90, (col + 0.5) * (width / 5) + (Math.random() - 0.5) * 40));
      const spawnY = -60 - row * 65 - Math.random() * 40;
      const initialAngle = (Math.random() - 0.5) * 0.45;

      const body = Matter.Bodies.rectangle(spawnX, spawnY, pill.width, pill.height, {
        chamfer: { radius: pill.height / 2 },
        restitution: 0.62, // Bouncy elasticity
        friction: 0.12,
        frictionAir: 0.02,
        density: 0.002,
        angle: initialAngle,
        label: pill.id,
      });

      // Add a tiny random initial velocity for organic tumble
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2.5,
        y: Math.random() * 2 + 1,
      });

      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

      bodies.push(body);
      bodiesMapRef.current.set(pill.id, body);
    });

    Matter.Composite.add(engine.world, bodies);
  }, []);

  // Update wall boundaries to match container dimensions
  const updateWalls = useCallback((engine: Matter.Engine, width: number, height: number) => {
    wallsRef.current.forEach((wall) => {
      Matter.Composite.remove(engine.world, wall);
    });

    const wallThickness = 120;
    const floor = Matter.Bodies.rectangle(
      width / 2, 
      height + wallThickness / 2 - 4, 
      width * 2, 
      wallThickness, 
      { isStatic: true, label: 'floor', restitution: 0.5 }
    );
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2 + 4, 
      height / 2, 
      wallThickness, 
      height * 3, 
      { isStatic: true, label: 'leftWall', restitution: 0.5 }
    );
    const rightWall = Matter.Bodies.rectangle(
      width + wallThickness / 2 - 4, 
      height / 2, 
      wallThickness, 
      height * 3, 
      { isStatic: true, label: 'rightWall', restitution: 0.5 }
    );
    const ceiling = Matter.Bodies.rectangle(
      width / 2, 
      -wallThickness * 2, 
      width * 2, 
      wallThickness, 
      { isStatic: true, label: 'ceiling' }
    );

    wallsRef.current = [floor, leftWall, rightWall, ceiling];
    Matter.Composite.add(engine.world, wallsRef.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 440;

    // 1. Initialize Matter.js Engine & World
    const engine = Matter.Engine.create({
      enableSleeping: true, // Auto-sleep settled bodies for 0% idle CPU
    });
    engine.gravity.y = 1.0;
    engine.gravity.scale = 0.001;
    engineRef.current = engine;

    // 2. Add Walls & Spawn Pills
    updateWalls(engine, width, height);
    spawnBodies(engine, width);

    // 3. Setup Mouse / Touch Constraint for interactive Drag & Toss
    const mouse = Matter.Mouse.create(container);
    // Remove passive wheel listener warning
    mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    // Track active drag interactions
    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      setActiveGrabCount((c) => c + 1);
    });

    // 4. Start Physics Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // 5. Hardware-Accelerated 60-120fps Transform Sync Loop
    const syncDOM = () => {
      bodiesMapRef.current.forEach((body, id) => {
        const domEl = pillRefs.current.get(id);
        if (domEl) {
          const pill = PILL_ITEMS.find((p) => p.id === id);
          const halfW = pill ? pill.width / 2 : 75;
          const halfH = pill ? pill.height / 2 : 22;
          const x = body.position.x - halfW;
          const y = body.position.y - halfH;
          const deg = (body.angle * 180) / Math.PI;

          domEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotate(${deg.toFixed(2)}deg)`;
        }
      });
      animFrameRef.current = requestAnimationFrame(syncDOM);
    };
    animFrameRef.current = requestAnimationFrame(syncDOM);

    // 6. Handle Responsive Resize
    const handleResize = () => {
      if (!container || !engine) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      updateWalls(engine, newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    };
  }, [spawnBodies, updateWalls]);

  // Toggle Zero-G Mode (Antigravity Easter Egg)
  const handleToggleZeroG = () => {
    if (!engineRef.current) return;
    const nextState = !isZeroG;
    setIsZeroG(nextState);

    if (nextState) {
      // Invert / Zero Gravity: Float weightlessly upward
      engineRef.current.gravity.y = -0.3;
      bodiesMapRef.current.forEach((body) => {
        Matter.Sleeping.set(body, false);
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.005,
          y: -0.015 - Math.random() * 0.015,
        });
      });
    } else {
      // Restore standard Earth gravity
      engineRef.current.gravity.y = 1.0;
      bodiesMapRef.current.forEach((body) => {
        Matter.Sleeping.set(body, false);
      });
    }
  };

  // Scatter / Impulse explosion burst
  const handleScatter = () => {
    if (!engineRef.current || !containerRef.current) return;
    const centerX = containerRef.current.clientWidth / 2;
    const centerY = containerRef.current.clientHeight / 2;

    bodiesMapRef.current.forEach((body) => {
      Matter.Sleeping.set(body, false);
      const dx = body.position.x - centerX;
      const dy = body.position.y - centerY;
      const dist = Math.max(40, Math.sqrt(dx * dx + dy * dy));
      const forceMag = 0.06;

      Matter.Body.applyForce(body, body.position, {
        x: (dx / dist) * forceMag + (Math.random() - 0.5) * 0.02,
        y: (dy / dist) * forceMag - 0.04,
      });
    });
  };

  // Reset Drop
  const handleResetDrop = () => {
    if (!engineRef.current || !containerRef.current) return;
    setIsZeroG(false);
    engineRef.current.gravity.y = 1.0;
    spawnBodies(engineRef.current, containerRef.current.clientWidth);
  };

  const handlePillClick = (pill: PhysicsPillItem) => {
    setSelectedPill(pill.label);
    if (pill.moduleId && onSelectModule) {
      onSelectModule(pill.moduleId);
    }
  };

  return (
    <div className="rounded-[32px] bg-[#1E1F22] border border-white/[0.08] p-5 sm:p-8 overflow-hidden transition-colors relative text-left">
      
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162238] text-[#A8C7FA] text-[11px] font-mono mb-2">
            <FlaskConical className="size-3.5" />
            <span>INTERACTIVE PHYSICS LAB // ANTIGRAVITY</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Tumble, Toss &amp; Shape Spatial Elements
          </h3>
          <p className="text-xs sm:text-sm text-[#9AA0A6] mt-1">
            Grab, drag, and fling 18 curriculum badges and prompt tokens with live gravity physics.
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            id="physics-zero-g-btn"
            onClick={handleToggleZeroG}
            className={`px-3.5 py-2 min-h-[40px] rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all labs-pill-btn ${
              isZeroG
                ? 'bg-[#A8C7FA] text-[#062E6F] shadow-lg'
                : 'bg-[#131314] text-[#E3E3E3] hover:text-white border border-white/[0.08]'
            }`}
            title="Toggle Zero-Gravity mode"
          >
            <Orbit className={`size-3.5 ${isZeroG ? 'animate-spin' : ''}`} />
            <span>{isZeroG ? 'Zero-G: ACTIVE' : 'Defy Gravity'}</span>
          </button>

          <button
            id="physics-scatter-btn"
            onClick={handleScatter}
            className="px-3.5 py-2 min-h-[40px] rounded-full bg-[#131314] hover:bg-[#282A2E] text-[#E3E3E3] border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 labs-pill-btn transition-colors"
            title="Scatter pills with an impulse burst"
          >
            <Sparkles className="size-3.5 text-[#FDD663]" />
            <span>Scatter</span>
          </button>

          <button
            id="physics-reset-btn"
            onClick={handleResetDrop}
            className="px-3.5 py-2 min-h-[40px] rounded-full bg-[#131314] hover:bg-[#282A2E] text-[#9AA0A6] hover:text-white border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 labs-pill-btn transition-colors"
            title="Re-drop all elements from above"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline">Reset Drop</span>
          </button>
        </div>
      </div>

      {/* Physics Arena Viewport */}
      <div
        ref={containerRef}
        id="physics-stage-arena"
        className="relative w-full h-[380px] sm:h-[460px] rounded-[24px] bg-[#131314] border border-white/[0.06] overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        {/* Subtle Background Coordinate Grid for 3D Spatial Context */}
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

        {/* Live Status Telemetry Pill Overlay */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1F22]/90 border border-white/[0.08] text-[10px] font-mono text-[#9AA0A6]">
          <span className="w-2 h-2 rounded-full bg-[#6DD58C] animate-pulse" />
          <span>GRAVITY: {isZeroG ? '0.00 G (WEIGHTLESS)' : '9.81 m/s² (EARTH)'}</span>
          <span>·</span>
          <span>BODIES: {PILL_ITEMS.length}</span>
        </div>

        {/* Selected Pill Feedback Badge */}
        {selectedPill && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1F22]/90 border border-[#A8C7FA]/40 text-[11px] font-mono text-[#A8C7FA]">
            <CheckCircle2 className="size-3 text-[#6DD58C]" />
            <span>SELECTED: {selectedPill}</span>
          </div>
        )}

        {/* Interactive Physical Pills Rendered as Crisp DOM Elements */}
        {PILL_ITEMS.map((pill) => (
          <div
            key={pill.id}
            ref={(el) => {
              if (el) pillRefs.current.set(pill.id, el);
              else pillRefs.current.delete(pill.id);
            }}
            onClick={() => handlePillClick(pill)}
            style={{
              width: `${pill.width}px`,
              height: `${pill.height}px`,
              backgroundColor: pill.tintBg,
              borderColor: pill.accentHex,
            }}
            className="absolute top-0 left-0 rounded-full border border-opacity-40 px-3.5 flex items-center justify-between text-xs font-semibold shadow-md will-change-transform transition-[border-color,background-color] hover:border-opacity-100 hover:shadow-[0_0_16px_-2px_rgba(168,199,250,0.4)] group"
          >
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: pill.accentHex }}
              />
              <span className="text-white truncate font-medium text-[11px] sm:text-xs">
                {pill.label}
              </span>
            </div>

            {pill.moduleId && (
              <ArrowUpRight className="size-3.5 text-[#9AA0A6] group-hover:text-white shrink-0 ml-1 transition-colors" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Hint Strip */}
      <div className="pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#9AA0A6]">
        <div className="flex items-center gap-2">
          <span className="text-[#A8C7FA]">💡 Pro Tip:</span>
          <span>Click and throw any badge across the screen, or tap a module badge to jump directly into that curriculum lesson.</span>
        </div>
        <span className="text-[#6DD58C]">
          Sleep Optimization: 0% Idle CPU
        </span>
      </div>

    </div>
  );
};
