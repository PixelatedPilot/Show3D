import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  CanvasStudioState,
  SpatialCritiquePin,
  computeMeshDiagnostics,
  computeSlicerMetrics,
  getCameraCoordinatesForPreset,
} from '../../utils/canvasStudioState';
import {
  Box,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MapPin,
  Layers,
  Maximize2,
} from 'lucide-react';

export interface Show3DViewport3DProps {
  studioState: CanvasStudioState;
  onAddPinAtPoint?: (position: [number, number, number]) => void;
  onSelectPin?: (pin: SpatialCritiquePin) => void;
  selectedPinId?: string | null;
  compact?: boolean;
  onExpandFullStudio?: () => void;
  smoothCamera?: boolean;
  transparentHero?: boolean;
}

interface ProjectedPinCoord {
  id: string;
  x: number;
  y: number;
  visible: boolean;
  pin: SpatialCritiquePin;
}

export const Show3DViewport3D: React.FC<Show3DViewport3DProps> = ({
  studioState,
  onAddPinAtPoint,
  onSelectPin,
  selectedPinId,
  compact = false,
  onExpandFullStudio,
  smoothCamera = false,
  transparentHero = false,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const helpersGroupRef = useRef<THREE.Group | null>(null);
  const animIdRef = useRef<number | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);

  const [projectedPins, setProjectedPins] = useState<ProjectedPinCoord[]>([]);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  const diagnostics = computeMeshDiagnostics(studioState);
  const slicerMetrics = computeSlicerMetrics(studioState);

  // Project 3D pin coordinates into 2D viewport pixel coordinates
  const updateProjectedPins = useCallback(() => {
    const mount = mountRef.current;
    const camera = cameraRef.current;
    if (!mount || !camera) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    if (width === 0 || height === 0) return;

    const nextCoords: ProjectedPinCoord[] = studioState.pins.map((pin) => {
      const vec = new THREE.Vector3(pin.position[0], pin.position[1], pin.position[2]);
      vec.project(camera);
      const x = (vec.x * 0.5 + 0.5) * width;
      const y = (-(vec.y * 0.5) + 0.5) * height;
      const visible = vec.z < 1.0 && x >= 16 && x <= width - 16 && y >= 16 && y <= height - 16;
      return { id: pin.id, x, y, visible, pin };
    });

    setProjectedPins(nextCoords);
  }, [studioState.pins]);

  // Build primary material based on active ViewportShadingMode
  const createPrimaryMaterial = useCallback(
    (isSecondary = false): THREE.Material => {
      const mode = studioState.shadingMode;

      if (mode === 'wireframe') {
        return new THREE.MeshBasicMaterial({
          color: isSecondary ? '#64D2FF' : '#0A84FF',
          wireframe: true,
        });
      }

      if (mode === 'clay') {
        return new THREE.MeshStandardMaterial({
          color: isSecondary ? '#AEAEB2' : '#D1D1D6',
          roughness: 0.78,
          metalness: 0.05,
          side: THREE.DoubleSide,
        });
      }

      if (mode === 'stress_wall_thickness') {
        const stressColor =
          studioState.ribThicknessMm < 2.0
            ? '#FF375F'
            : studioState.ribThicknessMm < 2.8
            ? '#FFD60A'
            : '#30D158';
        return new THREE.MeshStandardMaterial({
          color: isSecondary ? '#2C2C2E' : stressColor,
          emissive: isSecondary ? '#000000' : stressColor,
          emissiveIntensity: isSecondary ? 0 : 0.22,
          roughness: 0.35,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
      }

      if (mode === 'slicer_layers') {
        return new THREE.MeshStandardMaterial({
          color: '#30D158',
          transparent: true,
          opacity: 0.75,
          roughness: 0.3,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
      }

      // Default 'pbr' mode with filament presets
      let baseColor = studioState.canopyColor;
      let roughness = studioState.roughness;
      let metalness = studioState.metalness;

      if (studioState.filamentPreset === 'wood_pla' && isSecondary) {
        baseColor = '#C89D66';
        roughness = 0.75;
        metalness = 0.02;
      } else if (studioState.filamentPreset === 'anodized_alu' && isSecondary) {
        baseColor = '#8E8E93';
        roughness = 0.25;
        metalness = 0.85;
      }

      return new THREE.MeshPhysicalMaterial({
        color: isSecondary ? '#8E8E93' : baseColor,
        roughness,
        metalness,
        clearcoat: 0.25,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide,
      });
    },
    [
      studioState.shadingMode,
      studioState.canopyColor,
      studioState.roughness,
      studioState.metalness,
      studioState.ribThicknessMm,
      studioState.filamentPreset,
    ]
  );

  // Rebuild 3D geometry whenever studioState parameters change
  const rebuildSceneGeometry = useCallback(() => {
    const modelGroup = modelGroupRef.current;
    const helpersGroup = helpersGroupRef.current;
    if (!modelGroup || !helpersGroup) return;

    // Clear previous meshes
    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      modelGroup.remove(child);
    }
    while (helpersGroup.children.length > 0) {
      const child = helpersGroup.children[0];
      helpersGroup.remove(child);
    }

    // 1. Grid & Coordinate Axes Helpers
    if (studioState.showGrid) {
      const grid = new THREE.GridHelper(8, 16, 0x2c2c2e, 0x1c1c1e);
      grid.position.y = 0;
      helpersGroup.add(grid);
    }

    if (studioState.showAxes) {
      const axisLen = 2.6;
      const makeAxisLine = (end: [number, number, number], hex: number) => {
        const pts = [new THREE.Vector3(0, 0.01, 0), new THREE.Vector3(...end)];
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: hex });
        return new THREE.Line(geom, mat);
      };
      helpersGroup.add(makeAxisLine([axisLen, 0.01, 0], 0xff375f)); // X Red
      helpersGroup.add(makeAxisLine([0, axisLen, 0], 0x30d158)); // Y Green
      helpersGroup.add(makeAxisLine([0, 0.01, axisLen], 0x0a84ff)); // Z Blue
    }

    const primaryMat = createPrimaryMaterial(false);
    const secondaryMat = createPrimaryMaterial(true);

    // 2. Build Archetype Geometry
    if (studioState.archetype === 'pavilion') {
      // Courtyard Plinth Base
      const baseGeom = new THREE.CylinderGeometry(2.1, 2.25, 0.14, 32);
      const baseMat = new THREE.MeshStandardMaterial({
        color: '#1C1C1E',
        roughness: 0.85,
        metalness: 0.1,
        wireframe: studioState.shadingMode === 'wireframe',
      });
      const baseMesh = new THREE.Mesh(baseGeom, baseMat);
      baseMesh.position.y = 0.07;
      modelGroup.add(baseMesh);

      // 4 Structural Corner Masts + 1 Central Mast
      const ribScale = Math.max(0.035, studioState.ribThicknessMm * 0.016);
      const mastPositions: [number, number, number][] = [
        [-1.25, 0.8, -1.0],
        [1.25, 0.8, -1.0],
        [-1.25, 0.8, 1.0],
        [1.25, 0.8, 1.0],
      ];
      mastPositions.forEach(([mx, my, mz]) => {
        const mastGeom = new THREE.CylinderGeometry(ribScale, ribScale * 1.2, 1.5, 16);
        const mast = new THREE.Mesh(mastGeom, secondaryMat);
        mast.position.set(mx, my, mz);
        modelGroup.add(mast);
      });

      const centerHeight = 1.55 + studioState.curvature * 0.65;
      const centerMastGeom = new THREE.CylinderGeometry(ribScale * 1.1, ribScale * 1.4, centerHeight, 16);
      const centerMast = new THREE.Mesh(centerMastGeom, secondaryMat);
      centerMast.position.set(0, centerHeight / 2 + 0.07, 0);
      modelGroup.add(centerMast);

      // Parametric Hyperbolic / Parabolic Canopy Surface
      if (studioState.activeTokens.includes('tensile') || true) {
        const segs = 28;
        const canopyGeom = new THREE.PlaneGeometry(3.1, 2.5, segs, segs);
        canopyGeom.rotateX(-Math.PI / 2);

        const posAttr = canopyGeom.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const x = posAttr.getX(i);
          const z = posAttr.getZ(i);
          const normR2 = (x * x) / (1.55 * 1.55) + (z * z) / (1.25 * 1.25);
          const saddleWave = Math.cos(x * 1.2) * Math.cos(z * 1.2) * studioState.curvature * 0.55;
          const domeLift = (1 - normR2 * 0.48) * (0.35 + studioState.curvature * 0.45);
          const y = 1.25 + domeLift + saddleWave * 0.35;
          posAttr.setY(i, y);
        }
        canopyGeom.computeVertexNormals();

        const canopyMesh = new THREE.Mesh(canopyGeom, primaryMat);
        modelGroup.add(canopyMesh);
      }

      // Modular Timber Benches (toggled by 'benches' token)
      if (studioState.activeTokens.includes('benches')) {
        const benchMat = new THREE.MeshStandardMaterial({
          color: '#FFD60A',
          roughness: 0.6,
          metalness: 0.05,
          wireframe: studioState.shadingMode === 'wireframe',
        });
        [-0.65, 0.65].forEach((bx) => {
          const benchGeom = new THREE.BoxGeometry(0.75, 0.14, 0.38);
          const bench = new THREE.Mesh(benchGeom, benchMat);
          bench.position.set(bx, 0.24, 0.25);
          modelGroup.add(bench);
        });
      }

      // 450W Solar Roof Array (toggled by hasSolar or 'solar' token)
      if (studioState.hasSolar) {
        const solarMat = new THREE.MeshStandardMaterial({
          color: '#0A84FF',
          emissive: '#092332',
          emissiveIntensity: 0.4,
          roughness: 0.18,
          metalness: 0.75,
          wireframe: studioState.shadingMode === 'wireframe',
        });
        const solarGeom = new THREE.BoxGeometry(1.15, 0.05, 0.85);
        const solarMesh = new THREE.Mesh(solarGeom, solarMat);
        solarMesh.position.set(0, centerHeight + 0.14, 0);
        solarMesh.rotation.x = 0.14;
        modelGroup.add(solarMesh);
      }

      // Cross-Ventilation Louver Ring (toggled by 'airflow' token)
      if (studioState.activeTokens.includes('airflow')) {
        const ringGeom = new THREE.TorusGeometry(1.05, 0.025, 12, 36);
        ringGeom.rotateX(Math.PI / 2);
        const ringMesh = new THREE.Mesh(ringGeom, secondaryMat);
        ringMesh.position.y = 1.38;
        modelGroup.add(ringMesh);
      }
    } else if (studioState.archetype === 'desk_dock') {
      // 60° Ergonomic Tech Desk Companion Dock
      const baseGeom = new THREE.CylinderGeometry(1.25, 1.4, 0.28, 6);
      const baseMesh = new THREE.Mesh(baseGeom, secondaryMat);
      baseMesh.position.y = 0.14;
      modelGroup.add(baseMesh);

      // Angled 60° Device Support Spine
      const tiltRad = ((90 - studioState.ergonomicTiltDeg) * Math.PI) / 180;
      const wallThick = Math.max(0.12, studioState.ribThicknessMm * 0.055);
      const spineGeom = new THREE.BoxGeometry(1.35, 1.75, wallThick);
      const spineMesh = new THREE.Mesh(spineGeom, primaryMat);
      spineMesh.position.set(0, 0.95, -0.15);
      spineMesh.rotation.x = -tiltRad;
      modelGroup.add(spineMesh);

      // Device Bottom Cradle Lip with +4mm Case Tolerance
      const lipGeom = new THREE.BoxGeometry(1.38, 0.16, 0.42);
      const lipMesh = new THREE.Mesh(lipGeom, primaryMat);
      lipMesh.position.set(0, 0.42, 0.32);
      lipMesh.rotation.x = -tiltRad;
      modelGroup.add(lipMesh);

      // Cable Pass-Through Strain-Relief Arch
      const archGeom = new THREE.TorusGeometry(0.24, 0.05, 12, 24);
      const archMat = new THREE.MeshStandardMaterial({
        color: '#30D158',
        roughness: 0.3,
        wireframe: studioState.shadingMode === 'wireframe',
      });
      const archMesh = new THREE.Mesh(archGeom, archMat);
      archMesh.position.set(0, 0.35, 0.52);
      modelGroup.add(archMesh);
    } else {
      // 'primitives': X-Y-Z Spatial Coordinate Sandbox (Module 1)
      const coreGeom = new THREE.OctahedronGeometry(0.75, 1);
      const coreMesh = new THREE.Mesh(coreGeom, primaryMat);
      coreMesh.position.set(0, 1.05, 0);
      modelGroup.add(coreMesh);

      const xBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.55, 0.55),
        new THREE.MeshStandardMaterial({
          color: '#FF375F',
          roughness: 0.3,
          wireframe: studioState.shadingMode === 'wireframe',
        })
      );
      xBox.position.set(1.45, 0.55, 0);
      modelGroup.add(xBox);

      const zCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 0.75, 20),
        new THREE.MeshStandardMaterial({
          color: '#0A84FF',
          roughness: 0.3,
          wireframe: studioState.shadingMode === 'wireframe',
        })
      );
      zCyl.position.set(0, 0.55, 1.45);
      modelGroup.add(zCyl);

      const yTorus = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.12, 16, 32),
        new THREE.MeshStandardMaterial({
          color: '#30D158',
          roughness: 0.3,
          wireframe: studioState.shadingMode === 'wireframe',
        })
      );
      yTorus.position.set(-1.35, 1.15, 0);
      modelGroup.add(yTorus);
    }

    // 3. Slicer Layer Contours Overlay (when in 'slicer_layers' mode)
    if (studioState.shadingMode === 'slicer_layers') {
      const sliceCount = 14;
      for (let s = 1; s <= sliceCount; s++) {
        const y = s * 0.14;
        const radius = Math.max(0.35, 1.55 - Math.abs(s - 7) * 0.11);
        const sliceRing = new THREE.RingGeometry(radius - 0.02, radius, 36);
        sliceRing.rotateX(-Math.PI / 2);
        const sliceMat = new THREE.MeshBasicMaterial({
          color: s % 2 === 0 ? '#30D158' : '#64D2FF',
          side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(sliceRing, sliceMat);
        ringMesh.position.y = y;
        helpersGroup.add(ringMesh);
      }
    }

    updateProjectedPins();
  }, [studioState, createPrimaryMaterial, updateProjectedPins]);

  useEffect(() => {
    rebuildSceneGeometry();
  }, [rebuildSceneGeometry]);

  // Update Camera Position when cameraPreset changes
  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const coords = getCameraCoordinatesForPreset(studioState.cameraPreset);

    if (smoothCamera) {
      targetCamPosRef.current = new THREE.Vector3(...coords.position);
      targetLookAtRef.current = new THREE.Vector3(...coords.target);
    } else {
      camera.position.set(...coords.position);
      controls.target.set(...coords.target);
      controls.update();
      updateProjectedPins();
    }
  }, [studioState.cameraPreset, smoothCamera, updateProjectedPins]);

  // Update OrbitControls autoRotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = studioState.autoRotate;
      controlsRef.current.autoRotateSpeed = 1.6;
    }
  }, [studioState.autoRotate]);

  // Mount Three.js WebGLRenderer & Scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = mount.clientWidth || 640;
    const height = mount.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const initialCoords = getCameraCoordinatesForPreset(studioState.cameraPreset);
    camera.position.set(...initialCoords.position);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio 3-Point Apple Lighting Setup
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x1c1c1e, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x64d2ff, 0.75);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffd60a, 0.35);
    fillLight.position.set(0, -3, 4);
    scene.add(fillLight);

    const helpersGroup = new THREE.Group();
    const modelGroup = new THREE.Group();
    scene.add(helpersGroup);
    scene.add(modelGroup);
    helpersGroupRef.current = helpersGroup;
    modelGroupRef.current = modelGroup;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.6;
    controls.maxDistance = 11;
    controls.autoRotate = studioState.autoRotate;
    controls.autoRotateSpeed = 1.6;

    if (transparentHero) {
      // In hero mode: disable wheel zoom and pan so scrolling anywhere on the screen scrolls the page naturally!
      controls.enableZoom = false;
      controls.enablePan = false;
      renderer.domElement.style.touchAction = 'pan-y';
    }

    controls.target.set(...initialCoords.target);
    controls.update();
    controlsRef.current = controls;

    // Immediately build initial 3D geometry now that modelGroupRef is populated
    rebuildSceneGeometry();

    controls.addEventListener('change', () => {
      updateProjectedPins();
    });

    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);

      // Smooth camera interpolation if target active
      if (targetCamPosRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.08);
        if (camera.position.distanceTo(targetCamPosRef.current) < 0.02) {
          camera.position.copy(targetCamPosRef.current);
          targetCamPosRef.current = null;
        }
        updateProjectedPins();
      }

      if (targetLookAtRef.current) {
        controls.target.lerp(targetLookAtRef.current, 0.08);
        if (controls.target.distanceTo(targetLookAtRef.current) < 0.02) {
          controls.target.copy(targetLookAtRef.current);
          targetLookAtRef.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0 && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
          updateProjectedPins();
        }
      }
    });
    resizeObserver.observe(mount);

    return () => {
      resizeObserver.disconnect();
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Raycast click to drop a new 3D Spatial Critique Pin when in 'drop_pin' mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (studioState.transformTool !== 'drop_pin' || !onAddPinAtPoint) return;
    const mount = mountRef.current;
    const camera = cameraRef.current;
    const modelGroup = modelGroupRef.current;
    if (!mount || !camera || !modelGroup) return;

    const rect = mount.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(modelGroup.children, true);

    if (intersects.length > 0) {
      const pt = intersects[0].point;
      onAddPinAtPoint([
        Number(pt.x.toFixed(2)),
        Number(pt.y.toFixed(2)),
        Number(pt.z.toFixed(2)),
      ]);
    }
  };

  return (
    <div
      className={`relative w-full h-full rounded-[24px] overflow-hidden select-none flex flex-col justify-between ${
        transparentHero
          ? 'bg-transparent border-transparent'
          : 'bg-[#000000] border border-white/[0.08]'
      } ${
        studioState.transformTool === 'drop_pin'
          ? 'cursor-crosshair'
          : 'cursor-grab active:cursor-grabbing'
      }`}
      onClick={handleCanvasClick}
    >
      {/* Subtle Apple Spatial Grid Backdrop */}
      {!transparentHero && (
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      )}

      {/* Top HUD Bar: Live Geometry Diagnostics & Shading Badge */}
      {!transparentHero && (
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#000000]/70 backdrop-blur-md pointer-events-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#30D158]" />
            <span className="text-xs font-mono font-medium text-white">
              {studioState.archetype === 'pavilion'
                ? 'Courtyard Tensile Solar Pavilion'
                : studioState.archetype === 'desk_dock'
                ? '60° Ergonomic Tech Companion Dock'
                : 'X-Y-Z Spatial Coordinate Primitives'}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#1C1C1E] border border-white/[0.08] text-[10px] font-mono text-[#64D2FF] uppercase">
              {studioState.shadingMode.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="text-[#86868B]">
              <strong className="text-white">{diagnostics.vertexCount.toLocaleString()}</strong> verts
            </span>
            <span className="text-[#86868B] hidden md:inline">
              <strong className="text-white">{diagnostics.triangleCount.toLocaleString()}</strong> tris
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                diagnostics.stressLevel === 'thin_wall_alert'
                  ? 'bg-[#2E0C14] text-[#FF375F] border border-[#FF375F]/30'
                  : diagnostics.stressLevel === 'caution'
                  ? 'bg-[#2C2405] text-[#FFD60A] border border-[#FFD60A]/30'
                  : 'bg-[#0E2914] text-[#30D158] border border-[#30D158]/30'
              }`}
            >
              {diagnostics.stressLevel === 'thin_wall_alert' ? (
                <AlertTriangle className="size-3" />
              ) : (
                <CheckCircle2 className="size-3" />
              )}
              <span>Wall: {diagnostics.minWallThicknessMm.toFixed(1)}mm</span>
            </span>

            {onExpandFullStudio && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExpandFullStudio();
                }}
                className="pointer-events-auto px-3 py-1 rounded-full bg-[#0A84FF] hover:bg-[#0071E3] text-white text-[11px] font-sans font-semibold flex items-center gap-1 transition-all shadow-sm"
              >
                <Maximize2 className="size-3" />
                <span>Full 3D Studio</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Center WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="relative flex-1 w-full min-h-[280px]"
        aria-label="Interactive Three.js 3D Viewport"
      />

      {!webglSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2 pointer-events-none">
          <Box className="size-8 text-[#0A84FF]" />
          <div className="text-sm font-semibold text-white">
            Show3D Spatial Geometry Engine Ready
          </div>
          <div className="text-xs text-[#86868B] max-w-md">
            {diagnostics.vertexCount} vertices · {diagnostics.triangleCount} triangles · Watertight
            Manifold Verified
          </div>
        </div>
      )}

      {/* 3D Projected Spatial Critique Pins Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {projectedPins.map(
          ({ id, x, y, visible, pin }) =>
            visible && (
              <button
                key={id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPin?.(pin);
                }}
                style={{
                  transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`,
                }}
                className={`pointer-events-auto absolute -top-3 -left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium flex items-center gap-1.5 transition-shadow shadow-lg backdrop-blur-md border ${
                  selectedPinId === id
                    ? 'bg-[#0A84FF] text-white border-white scale-105 z-20'
                    : pin.resolved
                    ? 'bg-[#1C1C1E]/90 text-[#F5F5F7] border-[#30D158]/50 hover:border-[#30D158]'
                    : 'bg-[#2E0C14]/90 text-[#FF375F] border-[#FF375F]/60 hover:border-[#FF375F]'
                }`}
                title={`${pin.label}: ${pin.comment}`}
              >
                <MapPin className="size-3 shrink-0" />
                <span className="truncate max-w-[135px]">{pin.label}</span>
              </button>
            )
        )}
      </div>

      {/* Slicer Telemetry Banner when in 'slicer_layers' mode */}
      {studioState.shadingMode === 'slicer_layers' && !transparentHero && (
        <div className="relative z-10 mx-4 mb-2 px-4 py-2 rounded-2xl bg-[#0E2914]/90 border border-[#30D158]/40 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#30D158] pointer-events-none">
          <div className="flex items-center gap-2">
            <Layers className="size-3.5" />
            <span>
              PLA SLICER PREVIEW · {slicerMetrics.totalLayers} Layers ({slicerMetrics.layerHeightMm}mm)
            </span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <span>Est. Print: {slicerMetrics.estimatedPrintMinutes} mins</span>
            <span>Filament: {slicerMetrics.filamentMassGrams}g Eco-PLA</span>
          </div>
        </div>
      )}

      {/* Bottom Viewport Controls Hint Strip */}
      {!transparentHero && (
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-white/[0.06] bg-[#000000]/75 backdrop-blur-md text-[11px] font-mono text-[#86868B] pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="text-[#F5F5F7]">
              {studioState.transformTool === 'drop_pin'
                ? 'Click anywhere on 3D mesh to anchor a critique pin'
                : 'Drag to Orbit 360° · Scroll to Zoom · Right-Drag to Pan'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {!compact && (
              <span className="hidden sm:inline text-[#64D2FF]">
                Albedo: {diagnostics.albedoReflectivity.toFixed(2)}
              </span>
            )}
            <span className="text-[#30D158] flex items-center gap-1">
              <Sparkles className="size-3" />
              <span>{diagnostics.humanIntentScore.toFixed(0)}% Human Intent</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
