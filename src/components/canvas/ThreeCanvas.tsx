import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EduState, CameraViewPreset } from '../../types';
import { ANNOTATION_PINS } from '../../store/appStore';
import { 
  Sparkles, 
  Rotate3d, 
  Eye, 
  Sun, 
  Compass, 
  Layers, 
  Info, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface ThreeCanvasProps {
  eduState: EduState;
  onUpdateEduState: (updates: Partial<EduState>) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ eduState, onUpdateEduState }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  // Mesh references for direct reactive updates
  const canopyMeshRef = useRef<THREE.Mesh | null>(null);
  const solarMeshRef = useRef<THREE.Mesh | null>(null);
  const benchGroupRef = useRef<THREE.Group | null>(null);
  const dockGroupRef = useRef<THREE.Group | null>(null);
  const dockMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // 2D projected screen positions for 3D annotation pins
  const [pinPositions, setPinPositions] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([]);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<CameraViewPreset>('overview');

  // Camera preset animation target
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(5.5, 4.2, 5.5));
  const targetCamLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.4, 0));

  // Initialize Three.js Scene and OrbitControls
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);
    scene.fog = new THREE.Fog(0x09090b, 16, 45);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5.5, 4.2, 5.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.5;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera clipping underground
    controls.target.set(0, 1.4, 0);
    controlsRef.current = controls;

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    sunLight.position.set(8, 14, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const blueFill = new THREE.PointLight(0x0A84FF, 1.2, 16);
    blueFill.position.set(-6, 5, -5);
    scene.add(blueFill);

    const warmGroundFill = new THREE.PointLight(0xd97706, 0.7, 10);
    warmGroundFill.position.set(0, 0.5, 0);
    scene.add(warmGroundFill);

    // 6. Ground & Courtyard Flooring
    const gridHelper = new THREE.GridHelper(30, 30, 0x3f3f46, 0x18181b);
    gridHelper.position.y = -0.005;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(36, 36);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.94, metalness: 0.05 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // Courtyard Paver Base Platform
    const platformGeo = new THREE.BoxGeometry(6.5, 0.1, 5.5);
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8, metalness: 0.1 });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0, 0.05, 0);
    platform.receiveShadow = true;
    scene.add(platform);

    materialsRef.current.push(platformMat);

    // 7. Courtyard Structure Root
    const courtyardRoot = new THREE.Group();
    scene.add(courtyardRoot);

    // Four Architectural Support Pillars
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.25, metalness: 0.85 });
    materialsRef.current.push(pillarMat);
    const pillarCoords = [
      [-1.8, 1.45, -1.3],
      [1.8, 1.45, -1.3],
      [-1.8, 1.45, 1.3],
      [1.8, 1.45, 1.3]
    ];
    pillarCoords.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 2.9, 24), pillarMat);
      pillar.position.set(x, y, z);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      courtyardRoot.add(pillar);
    });

    // Central Study Bench Group
    const benchGroup = new THREE.Group();
    courtyardRoot.add(benchGroup);
    benchGroupRef.current = benchGroup;

    // Study Table
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, roughness: 0.3, metalness: 0.2 });
    materialsRef.current.push(tableMat);
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.95), tableMat);
    tableTop.position.set(0, 0.85, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    benchGroup.add(tableTop);

    // Personal Tech Dock / Companion on Study Table
    const dockGroup = new THREE.Group();
    dockGroup.position.set(0, 0.89, 0);
    benchGroup.add(dockGroup);
    dockGroupRef.current = dockGroup;

    // Hexagonal Beveled Base
    const dockBaseGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.08, 6);
    const dockMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(eduState.canopyColor),
      roughness: 0.25,
      metalness: 0.4
    });
    dockMatRef.current = dockMat;
    materialsRef.current.push(dockMat);
    const dockBase = new THREE.Mesh(dockBaseGeo, dockMat);
    dockBase.position.y = 0.04;
    dockBase.castShadow = true;
    dockBase.receiveShadow = true;
    dockGroup.add(dockBase);

    // Dock 60° Angled Cradle
    const cradleGeo = new THREE.BoxGeometry(0.38, 0.46, 0.08);
    const cradle = new THREE.Mesh(cradleGeo, dockMat);
    cradle.position.set(0, 0.25, -0.04);
    cradle.rotation.x = -Math.PI / 6; // 30 deg back = 60 deg view tilt
    cradle.castShadow = true;
    cradle.receiveShadow = true;
    dockGroup.add(cradle);

    // Docked Smartphone Screen Display
    const phoneGeo = new THREE.BoxGeometry(0.34, 0.62, 0.02);
    const phoneMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.1, metalness: 0.9 });
    const phone = new THREE.Mesh(phoneGeo, phoneMat);
    phone.position.set(0, 0.33, -0.01);
    phone.rotation.x = -Math.PI / 6;
    phone.castShadow = true;
    dockGroup.add(phone);

    // Cable Pass-Through Notch
    const notchGeo = new THREE.BoxGeometry(0.08, 0.06, 0.14);
    const notchMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.9 });
    const notch = new THREE.Mesh(notchGeo, notchMat);
    notch.position.set(0, 0.04, 0.12);
    dockGroup.add(notch);

    const tableLegs = [
      [-1.0, 0.42, -0.38],
      [1.0, 0.42, -0.38],
      [-1.0, 0.42, 0.38],
      [1.0, 0.42, 0.38]
    ];
    tableLegs.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.85, 12), pillarMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      benchGroup.add(leg);
    });

    // 2 Modular Timber Benches
    const timberMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.4, metalness: 0.1 });
    materialsRef.current.push(timberMat);
    const bench1 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.44), timberMat);
    bench1.position.set(0, 0.48, -0.9);
    bench1.castShadow = true;
    bench1.receiveShadow = true;
    benchGroup.add(bench1);

    const bench2 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.44), timberMat);
    bench2.position.set(0, 0.48, 0.9);
    bench2.castShadow = true;
    bench2.receiveShadow = true;
    benchGroup.add(bench2);

    const bLegCoords = [
      [-0.95, 0.24, -0.9], [0.95, 0.24, -0.9],
      [-0.95, 0.24, 0.9], [0.95, 0.24, 0.9]
    ];
    bLegCoords.forEach(([x, y, z]) => {
      const bLeg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.48, 0.38), pillarMat);
      bLeg.position.set(x, y, z);
      bLeg.castShadow = true;
      benchGroup.add(bLeg);
    });

    // Curved Tensile Canopy Roof
    const canopyGeo = new THREE.CylinderGeometry(2.8, 2.3, 0.14, 36, 1, false, 0, Math.PI);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(eduState.canopyColor),
      roughness: 0.28,
      metalness: 0.12,
      side: THREE.DoubleSide
    });
    materialsRef.current.push(canopyMat);

    const canopyMesh = new THREE.Mesh(canopyGeo, canopyMat);
    canopyMesh.position.set(0, 2.9, 0);
    canopyMesh.rotation.z = Math.PI / 2;
    canopyMesh.castShadow = true;
    canopyMesh.receiveShadow = true;
    courtyardRoot.add(canopyMesh);
    canopyMeshRef.current = canopyMesh;

    // Integrated Solar Panel Array on Canopy Crown
    const solarGeo = new THREE.BoxGeometry(2.0, 0.06, 1.4);
    const solarMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.15, metalness: 0.85 });
    materialsRef.current.push(solarMat);
    const solarMesh = new THREE.Mesh(solarGeo, solarMat);
    solarMesh.position.set(0, 3.2, 0);
    solarMesh.castShadow = true;
    solarMesh.visible = eduState.solarPanelsEnabled;
    courtyardRoot.add(solarMesh);
    solarMeshRef.current = solarMesh;

    // Dual Biophilic Planter Boxes
    const planterMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.4, metalness: 0.3 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.65, metalness: 0.05 });
    materialsRef.current.push(planterMat, foliageMat);

    [-2.5, 2.5].forEach((xPos) => {
      const pBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.6, 2.2), planterMat);
      pBox.position.set(xPos, 0.35, 0);
      pBox.castShadow = true;
      courtyardRoot.add(pBox);

      for (let i = -0.7; i <= 0.7; i += 0.45) {
        const leaf = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 1), foliageMat);
        leaf.position.set(xPos + (Math.random() - 0.5) * 0.1, 0.72 + Math.random() * 0.08, i);
        leaf.castShadow = true;
        courtyardRoot.add(leaf);
      }
    });

    // 8. Render Animation Loop with Smooth Camera Transitions & 2D Pin Projections
    let animationId: number;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      // Smooth camera interpolation towards target
      if (camera && controls) {
        camera.position.lerp(targetCamPos.current, 0.05);
        controls.target.lerp(targetCamLook.current, 0.05);
        controls.update();

        // Project 3D Annotation Pins to 2D Screen
        const newPinPositions = ANNOTATION_PINS.map((pin) => {
          tempVec.set(pin.position[0], pin.position[1], pin.position[2]);
          tempVec.project(camera);

          // Check if behind camera
          const isVisible = tempVec.z < 1;
          const x = (tempVec.x * 0.5 + 0.5) * width;
          const y = (-tempVec.y * 0.5 + 0.5) * height;

          return {
            id: pin.id,
            x,
            y,
            visible: isVisible && x > 20 && x < width - 20 && y > 20 && y < height - 20
          };
        });
        setPinPositions(newPinPositions);
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Reactive updates: Canopy Color
  useEffect(() => {
    if (canopyMeshRef.current) {
      const mat = canopyMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(eduState.canopyColor);
    }
  }, [eduState.canopyColor]);

  // Reactive updates: Solar Panel Visibility
  useEffect(() => {
    if (solarMeshRef.current) {
      solarMeshRef.current.visible = eduState.solarPanelsEnabled;
    }
  }, [eduState.solarPanelsEnabled]);

  // Reactive updates: Wireframe Mode
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      mat.wireframe = eduState.wireframeMode;
    });
  }, [eduState.wireframeMode]);

  // Reactive updates: Generative Synthesis Animation
  useEffect(() => {
    if (canopyMeshRef.current) {
      if (eduState.isGenerating) {
        // Subtle pulse during generation
        const s = 0.4 + (eduState.generationProgress / 100) * 0.6;
        canopyMeshRef.current.scale.set(s, s, s);
        canopyMeshRef.current.visible = true;
      } else if (eduState.modelGenerated) {
        canopyMeshRef.current.scale.set(1, 1, 1);
        canopyMeshRef.current.visible = true;
      }
    }

    if (dockGroupRef.current) {
      if (eduState.isGenerating) {
        const s = 0.3 + (eduState.generationProgress / 100) * 0.7;
        dockGroupRef.current.scale.set(s, s, s);
      } else if (eduState.modelGenerated) {
        dockGroupRef.current.scale.set(1, 1, 1);
      }
    }
  }, [eduState.isGenerating, eduState.generationProgress, eduState.modelGenerated]);

  // Reactive updates: Dock Finish Shaders
  useEffect(() => {
    if (dockMatRef.current) {
      dockMatRef.current.color.set(eduState.canopyColor);
      if (eduState.dockFinish === 'cyber') {
        dockMatRef.current.metalness = 0.5;
        dockMatRef.current.roughness = 0.2;
      } else if (eduState.dockFinish === 'stealth') {
        dockMatRef.current.metalness = 0.1;
        dockMatRef.current.roughness = 0.85;
      } else if (eduState.dockFinish === 'timber') {
        dockMatRef.current.metalness = 0.05;
        dockMatRef.current.roughness = 0.7;
      } else if (eduState.dockFinish === 'silver') {
        dockMatRef.current.metalness = 0.9;
        dockMatRef.current.roughness = 0.15;
      }
    }
  }, [eduState.canopyColor, eduState.dockFinish]);

  // Handle Camera Presets
  const applyCameraPreset = (preset: CameraViewPreset) => {
    setCameraMode(preset);
    onUpdateEduState({ cameraPreset: preset });

    switch (preset) {
      case 'overview':
        targetCamPos.current.set(5.5, 4.2, 5.5);
        targetCamLook.current.set(0, 1.4, 0);
        break;
      case 'canopy':
        targetCamPos.current.set(3.2, 3.2, 3.2);
        targetCamLook.current.set(0, 2.5, 0);
        break;
      case 'solar':
        targetCamPos.current.set(0.1, 6.8, 0.1);
        targetCamLook.current.set(0, 3.0, 0);
        break;
      case 'eyelevel':
        targetCamPos.current.set(2.4, 1.15, 2.4);
        targetCamLook.current.set(0, 0.8, 0);
        break;
    }
  };

  const activePin = ANNOTATION_PINS.find((p) => p.id === selectedPinId);

  return (
    <div className="size-full relative overflow-hidden select-none bg-[#121214]">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="size-full cursor-grab active:cursor-grabbing" />

      {/* Floating Canvas Top Bar: Camera Presets */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="flex items-center bg-zinc-900/90 border border-zinc-800 p-0.5 rounded-lg shadow-sm backdrop-blur-md">
          {[
            { id: 'overview' as CameraViewPreset, label: '3/4 View' },
            { id: 'canopy' as CameraViewPreset, label: 'Canopy' },
            { id: 'solar' as CameraViewPreset, label: 'Top' },
            { id: 'eyelevel' as CameraViewPreset, label: 'Ground' }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyCameraPreset(preset.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                cameraMode === preset.id
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Projected Annotation Hotspots */}
      {pinPositions.map((pin) => {
        const pinData = ANNOTATION_PINS.find((p) => p.id === pin.id);
        if (!pin.visible || !pinData) return null;
        const isSelected = selectedPinId === pin.id;

        return (
          <div
            key={pin.id}
            style={{ left: `${pin.x}px`, top: `${pin.y}px` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
          >
            <button
              onClick={() => setSelectedPinId(isSelected ? null : pin.id)}
              className={`size-5 rounded-full border border-white flex items-center justify-center transition-transform ${
                isSelected
                  ? 'scale-125 ring-2 ring-blue-500 bg-white'
                  : 'hover:scale-110 bg-zinc-900'
              }`}
              style={{ borderColor: pinData.color }}
              title={pinData.title}
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: pinData.color }} />
            </button>
          </div>
        );
      })}

      {/* Active 3D Annotation Card Popover */}
      {activePin && (
        <div className="absolute bottom-20 left-4 max-w-xs z-30 p-3 rounded-xl border border-zinc-800 bg-[#1c1c1e]/95 shadow-xl text-xs space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: activePin.color }} />
              <div className="font-semibold text-white">{activePin.title}</div>
            </div>
            <button
              onClick={() => setSelectedPinId(null)}
              className="text-zinc-500 hover:text-zinc-300 px-1 text-xs"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-zinc-300 leading-normal pt-1">
            {activePin.description}
          </p>
        </div>
      )}

      {/* Live AI Generation HUD */}
      {eduState.isGenerating && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-xs">
          <div className="p-5 rounded-xl border border-zinc-800 bg-[#1c1c1e] text-center space-y-3 max-w-xs w-full pointer-events-auto shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-white">Compiling 3D Geometry</h3>
              <p className="text-[11px] text-zinc-400">
                Generating parametric surfaces from prompt...
              </p>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-150"
                style={{ width: `${eduState.generationProgress}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-zinc-500 text-right">
              {eduState.generationProgress}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
