import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

const ARTIST_INFO = {
  name: 'Zeynep Ozcelik',
  instagram: 'https://instagram.com/zeyozc',
  instagramHandle: '@zeyozc',
  email: 'nakiera@gmail.com'
};

const ARTWORKS = [
  // --- SOL DUVAR (X = -11.88) - Tek Sıra ---
  { id: 1, title: 'Balloon Float', file: '/artworks/1-baloon.png', position: [-11.88, 1.8, -15.0], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 2, title: 'Strawberry Bloom', file: '/artworks/2-straw.png', position: [-11.88, 1.8, -12.2], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 3, title: 'Botanical Study', file: '/artworks/3-DSC00648.JPG', position: [-11.88, 1.8, -9.4], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 4, title: 'Daisies I', file: '/artworks/4-daisies1.jpg', position: [-11.88, 1.8, -6.6], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 5, title: 'Daisies II', file: '/artworks/5-daisies2.JPG', position: [-11.88, 1.8, -3.8], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 6, title: 'Daisies III', file: '/artworks/6-daisies3.JPG', position: [-11.88, 1.8, -1.0], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 7, title: 'Bust Study', file: '/artworks/7-bust1.jpg', position: [-11.88, 1.8, 1.8], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 8, title: 'Lighthouse', file: '/artworks/8-lighthouse1.jpg', position: [-11.88, 1.8, 4.6], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 9, title: 'Lillies', file: '/artworks/9-lillies4.jpg', position: [-11.88, 1.8, 7.4], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 10, title: 'Rose I', file: '/artworks/10-rose1.jpg', position: [-11.88, 1.8, 10.2], rotation: [0, Math.PI / 2, 0], height: 1.1 },
  { id: 11, title: 'Rose II', file: '/artworks/11-rose2.jpg', position: [-11.88, 1.8, 13.0], rotation: [0, Math.PI / 2, 0], height: 1.1 },

  // --- SAĞ DUVAR (X = 11.88) - Tek Sıra ---
  { id: 12, title: 'Roses Set', file: '/artworks/12-roses3.jpg', position: [11.88, 1.8, -15.0], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 13, title: 'Ink Flower', file: '/artworks/13-inkflower1.jpg', position: [11.88, 1.8, -12.2], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 14, title: 'Wine Still Life', file: '/artworks/14-wine1.jpg', position: [11.88, 1.8, -9.4], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 15, title: 'Bouquet', file: '/artworks/15-DSC00922.JPG', position: [11.88, 1.8, -6.6], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 16, title: 'Flower Study', file: '/artworks/16-flower11.11.23.png', position: [11.88, 1.8, -3.8], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 17, title: 'Blue Flower', file: '/artworks/17-flower07-11-23.png', position: [11.88, 1.8, -1.0], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 18, title: 'Bicycle', file: '/artworks/18-bycycle1.jpg', position: [11.88, 1.8, 1.8], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 19, title: 'Sunflower', file: '/artworks/19-sunflower2.jpg', position: [11.88, 1.8, 4.6], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 20, title: 'Iris Study', file: '/artworks/20-DSC00927.JPG', position: [11.88, 1.8, 7.4], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 23, title: 'Poppy I', file: '/artworks/23poppy1.jpg', position: [11.88, 1.8, 10.2], rotation: [0, -Math.PI / 2, 0], height: 1.1 },
  { id: 24, title: 'Poppy II', file: '/artworks/24poppy2.jpg', position: [11.88, 1.8, 13.0], rotation: [0, -Math.PI / 2, 0], height: 1.1 },

  // --- ARKA DUVAR (Z = -17.85) - Tek Sıra ---
  { id: 25, title: 'Poppy III', file: '/artworks/25poppy3.jpg', position: [-10.0, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 26, title: 'Poppies', file: '/artworks/26poppies4.jpg', position: [-7.5, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 27, title: 'Tulip Etude I', file: '/artworks/27-DSC00662.JPG', position: [-5.0, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 28, title: 'Tulip Etude II', file: '/artworks/28-DSC00664.JPG', position: [-2.5, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 29, title: 'Tulip Etude III', file: '/artworks/29-DSC00668.JPG', position: [0.0, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 30, title: 'Abstract Vortex', file: '/artworks/30-DSC00655.JPG', position: [2.5, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 31, title: 'Ancestral Mirage', file: '/artworks/31-DSC00657.JPG', position: [5.0, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 32, title: 'Genesis of Color', file: '/artworks/32-DSC00659.JPG', position: [7.5, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 },
  { id: 33, title: 'Sunflower Vase I', file: '/artworks/33-DSC00923.JPG', position: [10.0, 1.8, -17.85], rotation: [0, 0, 0], height: 1.1 }
];

const GRID_SETS = [
  {
    id: 'flamingo-set',
    title: 'Flamingo Polyptych',
    category: 'Oil Painting Set',
    description: 'A four-panel unified set forming an elegant stylized flamingo composition.',
    position: [-3.8, 1.8, 13.95],
    rotation: [0, Math.PI, 0],
    files: [
      '/artworks/21Flamingo1.JPG',
      '/artworks/21Flamingo2.JPG',
      '/artworks/21Flamingo3.JPG',
      '/artworks/21Flamingo4.JPG'
    ]
  },
  {
    id: 'synthesis-set',
    title: 'Chromatic Synthesis',
    category: 'Abstract Set',
    description: 'A four-panel modernist abstract matrix investigating chromatic color blocks.',
    position: [3.8, 1.8, 13.95],
    rotation: [0, Math.PI, 0],
    files: [
      '/artworks/22Piece1.JPG',
      '/artworks/22Piece2.JPG',
      '/artworks/22Piece3.JPG',
      '/artworks/22Piece4.JPG'
    ]
  }
];

const WING_ARTWORKS = [
  { id: 981, title: 'Sunflower Vase II', file: '/artworks/33-DSC00924.JPG', position: [-8.2, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 },
  { id: 982, title: 'Sunflower Vase III', file: '/artworks/33-DSC00925.JPG', position: [-6.0, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 },
  { id: 983, title: 'Emerald Rose', file: '/artworks/34-DSC00670.JPG', position: [6.0, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 },
  { id: 984, title: 'Tulips', file: '/artworks/35-tulip1.jpg', position: [8.2, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 }
];

function ArtFrame({ art }) {
  const [texture, setTexture] = useState(null);
  const [aspect, setAspect] = useState(1.0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(art.file, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (tex.image && tex.image.height > 0) {
        setAspect(tex.image.width / tex.image.height);
      }
      setTexture(tex);
    });
  }, [art.file]);

  const frameWidth = (art.height || 1.1) * aspect;
  const frameHeight = art.height || 1.1;

  return (
    <group userData={{ navigationArtwork: art }} position={art.position} rotation={art.rotation}
      onClick={(e) => { e.stopPropagation(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[frameWidth + 0.04, frameHeight + 0.04, 0.02]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        {texture ? <meshBasicMaterial map={texture} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#c4b5a5" side={THREE.DoubleSide} />}
      </mesh>
    </group>
  );
}

function GridArtSet({ setInfo }) {
  const [textures, setTextures] = useState([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    setInfo.files.forEach((file, idx) => {
      loader.load(file, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTextures(prev => {
          const next = [...prev];
          next[idx] = tex;
          return next;
        });
      });
    });
  }, [setInfo.files]);

  const pW = 0.75;
  const pH = 1.0;
  const gap = 0.02;

  return (
    <group userData={{ navigationArtwork: { ...setInfo, file: setInfo.files[0] } }} position={setInfo.position} rotation={setInfo.rotation}
      onClick={(e) => {
        e.stopPropagation();
        // Navigation is handled by the shared pointer controller.
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <mesh position={[-pW/2 - gap/2, pH/2 + gap/2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[0] ? <meshBasicMaterial map={textures[0]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>
      <mesh position={[pW/2 + gap/2, pH/2 + gap/2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[1] ? <meshBasicMaterial map={textures[1]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>
      <mesh position={[-pW/2 - gap/2, -pH/2 - gap/2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[2] ? <meshBasicMaterial map={textures[2]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>
      <mesh position={[pW/2 + gap/2, -pH/2 - gap/2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[3] ? <meshBasicMaterial map={textures[3]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[pW*2 + gap + 0.06, pH*2 + gap + 0.06, 0.02]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} />
      </mesh>
    </group>
  );
}

function GalleryDoor() {
  return (
    <group position={[0, 0, 14.0]}>
      <mesh position={[-1.1, 1.8, 0]}><boxGeometry args={[0.2, 3.6, 0.3]} /><meshStandardMaterial color="#3d2314" /></mesh>
      <mesh position={[1.1, 1.8, 0]}><boxGeometry args={[0.2, 3.6, 0.3]} /><meshStandardMaterial color="#3d2314" /></mesh>
      <mesh position={[0, 3.55, 0]}><boxGeometry args={[2.4, 0.2, 0.3]} /><meshStandardMaterial color="#3d2314" /></mesh>
      <group position={[-1.0, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
        <mesh position={[0.5, 1.7, 0]}><boxGeometry args={[1.0, 3.3, 0.08]} /><meshStandardMaterial color="#4a2e18" /></mesh>
      </group>
      <group position={[1.0, 0, 0]} rotation={[0, -Math.PI / 3, 0]}>
        <mesh position={[-0.5, 1.7, 0]}><boxGeometry args={[1.0, 3.3, 0.08]} /><meshStandardMaterial color="#4a2e18" /></mesh>
      </group>
    </group>
  );
}

function GalleryArchitecture() {
  const ecruColor = '#ede7db';
  const floorColor = '#1e2124';
  return (
    <group>
      <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 36]} />
        <meshStandardMaterial color={floorColor} roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 4.2, -2]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[26, 36]} /><meshStandardMaterial color="#faf8f5" roughness={0.9} side={THREE.DoubleSide} /></mesh>

      <mesh position={[-12.0, 2.1, -2]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[36, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[12.0, 2.1, -2]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[36, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.1, -19]}><planeGeometry args={[24, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.1, 15]}><planeGeometry args={[24, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}


const CAMERA_HEIGHT = 1.7;
const WALK_BOUNDS = { minX: -11.1, maxX: 11.1, minZ: -16.9, maxZ: 12.9 };
const WALK_SPEED = 3.9;
const ALL_STOPS = [...ARTWORKS, ...WING_ARTWORKS, ...GRID_SETS.map(item => ({ ...item, file: item.files[0] }))];

function validDestination(position) {
  return new THREE.Vector3(
    THREE.MathUtils.clamp(position.x, WALK_BOUNDS.minX, WALK_BOUNDS.maxX),
    CAMERA_HEIGHT,
    THREE.MathUtils.clamp(position.z, WALK_BOUNDS.minZ, WALK_BOUNDS.maxZ)
  );
}

function artworkDestination(art) {
  const normal = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(...art.rotation));
  const position = new THREE.Vector3(...art.position).addScaledVector(normal, 2.2);
  return validDestination(position);
}

// Navigation uses the existing rectangular walkable gallery. A real fair hall will
// require a measured walkable navigation mesh before entrance routing is enabled.
function GalleryNavigation({ navigationRef, tourRef, onArtworkReached, onTourFinished, onTourInterrupted }) {
  const { camera, gl, scene } = useThree();
  const pointer = useRef(null);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const forward = useRef(new THREE.Vector3());
  const targetDirection = useRef(new THREE.Vector3());
  const destination = useRef(null);
  const lookAt = useRef(null);
  const pendingArt = useRef(null);
  const currentTourIndex = useRef(-1);
  const onArtworkReachedRef = useRef(onArtworkReached);
  const onTourFinishedRef = useRef(onTourFinished);
  const onTourInterruptedRef = useRef(onTourInterrupted);

  useEffect(() => { onArtworkReachedRef.current = onArtworkReached; }, [onArtworkReached]);
  useEffect(() => { onTourFinishedRef.current = onTourFinished; }, [onTourFinished]);
  useEffect(() => { onTourInterruptedRef.current = onTourInterrupted; }, [onTourInterrupted]);

  useEffect(() => {
    navigationRef.current = {
      stop() { destination.current = null; pendingArt.current = null; tourRef.current = false; },
      goTo(art) {
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = art;
      },
      startTour() {
        tourRef.current = true;
        currentTourIndex.current = 0;
        const art = ALL_STOPS[0];
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = null;
      },
      next() {
        tourRef.current = true;
        currentTourIndex.current = (currentTourIndex.current + 1) % ALL_STOPS.length;
        const art = ALL_STOPS[currentTourIndex.current];
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = null;
      },
      previous() {
        tourRef.current = true;
        currentTourIndex.current = (currentTourIndex.current - 1 + ALL_STOPS.length) % ALL_STOPS.length;
        const art = ALL_STOPS[currentTourIndex.current];
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = null;
      }
    };

    const canvas = gl.domElement;
    canvas.style.touchAction = 'none';
    const onPointerDown = (event) => {
      if (event.button !== 0 && event.pointerType !== 'touch') return;
      pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, prevX: event.clientX, prevY: event.clientY, moved: false };
      canvas.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event) => {
      const p = pointer.current;
      if (!p || p.id !== event.pointerId) return;
      const dx = event.clientX - p.prevX;
      const dy = event.clientY - p.prevY;
      p.prevX = event.clientX;
      p.prevY = event.clientY;
      if (Math.hypot(event.clientX - p.x, event.clientY - p.y) > 7) p.moved = true;
      if (!p.moved) return;
      destination.current = null;
      tourRef.current = false;
      onTourInterruptedRef.current();
      pendingArt.current = null;
      lookAt.current = null;
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= dx * 0.003;
      euler.current.x = THREE.MathUtils.clamp(euler.current.x - dy * 0.003, -1.25, 1.25);
      camera.quaternion.setFromEuler(euler.current);
    };
    const onPointerUp = (event) => {
      const p = pointer.current;
      if (!p || p.id !== event.pointerId) return;
      pointer.current = null;
      if (p.moved) return;
      const rect = canvas.getBoundingClientRect();
      const coords = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(coords, camera);
      const intersections = raycaster.intersectObjects(scene.children, true);
      let art = null;
      for (const hit of intersections) {
        let object = hit.object;
        while (object) {
          if (object.userData?.navigationArtwork) {
            art = object.userData.navigationArtwork;
            break;
          }
          object = object.parent;
        }
        if (art) break;
      }
      if (art) {
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = art;
        tourRef.current = false;
        onTourInterruptedRef.current();
        return;
      }
      const ground = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, ground)) {
        destination.current = validDestination(ground);
        lookAt.current = null;
        pendingArt.current = null;
        tourRef.current = false;
        onTourInterruptedRef.current();
      }
    };
    const onWheel = (event) => {
      event.preventDefault();
      destination.current = null;
      lookAt.current = null;
      pendingArt.current = null;
      tourRef.current = false;
      onTourInterruptedRef.current();
      camera.getWorldDirection(forward.current);
      forward.current.y = 0;
      forward.current.normalize();
      const next = validDestination(camera.position.clone().addScaledVector(forward.current, -event.deltaY * 0.009));
      camera.position.copy(next);
    };
    const onPointerCancel = () => { pointer.current = null; };
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerCancel);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerCancel);
      canvas.removeEventListener('wheel', onWheel);
      navigationRef.current = null;
    };
  }, [camera, gl, scene, raycaster, plane, navigationRef, tourRef]);

  useFrame((_, delta) => {
    if (!destination.current) return;
    const to = targetDirection.current.copy(destination.current).sub(camera.position);
    to.y = 0;
    const remaining = to.length();
    if (remaining > 0.055) {
      const step = Math.min(remaining, WALK_SPEED * Math.min(delta, 0.05));
      camera.position.addScaledVector(to.normalize(), step);
    } else {
      camera.position.copy(destination.current);
      destination.current = null;
      if (pendingArt.current) {
        onArtworkReachedRef.current(pendingArt.current);
        pendingArt.current = null;
      }
      if (tourRef.current) {
        currentTourIndex.current += 1;
        if (currentTourIndex.current >= ALL_STOPS.length) {
          tourRef.current = false;
          onTourFinishedRef.current();
        } else {
          const art = ALL_STOPS[currentTourIndex.current];
          destination.current = artworkDestination(art);
          lookAt.current = new THREE.Vector3(...art.position);
        }
      }
    }
    camera.position.y = CAMERA_HEIGHT;
    if (lookAt.current) {
      const desired = new THREE.Quaternion();
      const matrix = new THREE.Matrix4().lookAt(camera.position, lookAt.current, camera.up);
      desired.setFromRotationMatrix(matrix);
      camera.quaternion.slerp(desired, Math.min(1, delta * 4));
    }
  });
  return null;
}

export default function App() {
  const [selectedArt, setSelectedArt] = useState(null);
  const navigationRef = useRef(null);
  const tourRef = useRef(false);
  const [tourActive, setTourActive] = useState(false);
  const startTour = () => { setSelectedArt(null); navigationRef.current?.startTour(); setTourActive(true); };
  const stopTour = () => { navigationRef.current?.stop(); setTourActive(false); };
  const nextStop = () => { setSelectedArt(null); navigationRef.current?.next(); setTourActive(true); };

  return (
    <div className="canvas-container">
      <div className="gallery-toolbar" aria-label="Gallery navigation">
        <div className="gallery-brand"><span>GRADPIXEL</span><strong>Virtual Gallery</strong></div>
        <div className="gallery-actions">
          <button type="button" onClick={tourActive ? stopTour : startTour}>{tourActive ? 'Pause tour' : 'Start guided tour'}</button>
          <button type="button" onClick={nextStop}>Next artwork</button>
          <button type="button" onClick={stopTour}>Stop</button>
        </div>
        <p className="gallery-hint">Click the floor to walk · Click an artwork to approach · Drag to look around · Scroll to move</p>
      </div>

      <Canvas camera={{ position: [0, 1.7, 8.0], fov: 70 }}>
        <ambientLight intensity={1.8} color="#ffffff" />
        <directionalLight position={[0, 10, 5]} intensity={1.8} color="#fffcf5" />
        <GalleryNavigation navigationRef={navigationRef} tourRef={tourRef}
          onArtworkReached={(art) => { setSelectedArt(art); setTourActive(false); }}
          onTourInterrupted={() => setTourActive(false)}
          onTourFinished={() => setTourActive(false)} />
        <GalleryArchitecture />
        <GalleryDoor />
        {ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} />)}
        {GRID_SETS.map((setInfo) => <GridArtSet key={setInfo.id} setInfo={setInfo} />)}
        {WING_ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} />)}
      </Canvas>

      {selectedArt && (
        <div className="modal-overlay" onClick={() => setSelectedArt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArt(null)}>&times;</button>
            <div className="modal-img-wrapper">
              <img src={selectedArt.file} alt={selectedArt.title} style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain' }} />
            </div>
            <div className="modal-body">
              <div className="modal-meta-row">
                <span className="modal-tag">{selectedArt.category || 'Fine Art'}</span>
              </div>
              <h2>{selectedArt.title}</h2>
              <p className="artist-byline">Artist: <strong>Zeynep Ozcelik</strong></p>
              <p className="art-desc">{selectedArt.description || 'Virtual Fine Art Exhibition piece.'}</p>
              <div className="modal-actions-row">
                <a href={ARTIST_INFO.instagram} target="_blank" rel="noreferrer" className="modal-action-btn ig">📸 Instagram {ARTIST_INFO.instagramHandle}</a>
                <a href={`mailto:${ARTIST_INFO.email}?subject=Acquisition Inquiry: ${encodeURIComponent(selectedArt.title)}`} className="modal-action-btn mail">✉️ Inquire via Email</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}