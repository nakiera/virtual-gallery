import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

const ARTIST_INFO = {
  name: 'Zeynep Ozcelik',
  instagram: 'https://instagram.com/zeyozc',
  instagramHandle: '@zeyozc',
  email: 'nakiera@gmail.com'
};

// DUVARLARLA YÜZEYİ TAM ÖRTÜŞEN KUSURSUZ KOORDİNATLAR
const ARTWORKS = [
  // --- SOL DUVAR (X = -11.9, İçeri Bakıyor) ---
  { id: 1, title: 'Balloon Float', file: '/artworks/1-baloon.png', position: [-11.88, 1.8, -14.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 2, title: 'Strawberry Bloom', file: '/artworks/2-straw.png', position: [-11.88, 1.8, -10.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 3, title: 'Botanical Study 3', file: '/artworks/3-DSC00648.JPG', position: [-11.88, 1.8, -6.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 4, title: 'Morning Daisies I', file: '/artworks/4-daisies1.jpg', position: [-11.88, 1.8, -2.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 5, title: 'Morning Daisies II', file: '/artworks/5-daisies2.JPG', position: [-11.88, 1.8, 2.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 6, title: 'Morning Daisies III', file: '/artworks/6-daisies3.JPG', position: [-11.88, 1.8, 6.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 7, title: 'Drapery in Repose', file: '/artworks/7-bust1.jpg', position: [-11.88, 1.8, 10.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },

  // --- SAĞ DUVAR (X = 11.9, İçeri Bakıyor) ---
  { id: 8, title: 'Sentinel of the Tides', file: '/artworks/8-lighthouse1.jpg', position: [11.88, 1.8, -14.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 9, title: 'Lily in Monochrome', file: '/artworks/9-lillies4.jpg', position: [11.88, 1.8, -10.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 10, title: 'White Rose in Negative', file: '/artworks/10-rose1.jpg', position: [11.88, 1.8, -6.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 11, title: 'Whispering Stem', file: '/artworks/11-rose2.jpg', position: [11.88, 1.8, -2.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 12, title: 'Still Life with Decanter', file: '/artworks/12-roses3.jpg', position: [11.88, 1.8, 2.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 13, title: 'Nocturne Botanical', file: '/artworks/13-inkflower1.jpg', position: [11.88, 1.8, 6.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 14, title: 'Midnight Vintage', file: '/artworks/14-wine1.jpg', position: [11.88, 1.8, 10.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },

  // --- ARKA DUVAR (Z = -17.88) ---
  { id: 15, title: 'Bouquet of Grace', file: '/artworks/15-DSC00922.JPG', position: [-9.0, 1.8, -17.88], rotation: [0, 0, 0], height: 1.4 },
  { id: 16, title: 'November Serenity', file: '/artworks/16-flower11.11.23.png', position: [-4.5, 1.8, -17.88], rotation: [0, 0, 0], height: 1.4 },
  { id: 17, title: 'Azure Solitude', file: '/artworks/17-flower07-11-23.png', position: [0.0, 1.8, -17.88], rotation: [0, 0, 0], height: 1.4 },
  { id: 18, title: 'Mediterranean Reverie', file: '/artworks/18-bycycle1.jpg', position: [4.5, 1.8, -17.88], rotation: [0, 0, 0], height: 1.4 },
  { id: 19, title: 'Gilded Sunflower', file: '/artworks/19-sunflower2.jpg', position: [9.0, 1.8, -17.88], rotation: [0, 0, 0], height: 1.4 }
];

function ArtFrame({ art, onSelect }) {
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

  const frameWidth = (art.height || 1.3) * aspect;
  const frameHeight = art.height || 1.3;

  return (
    <group 
      position={art.position} 
      rotation={art.rotation}
      onClick={(e) => { e.stopPropagation(); onSelect(art); }}
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

function GalleryArchitecture() {
  const ecruColor = '#ede7db';
  const floorColor = '#8a5e3d';
  return (
    <group>
      {/* Zemin */}
      <mesh position={[0, 0, -3]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[26, 34]} /><meshStandardMaterial color={floorColor} roughness={0.4} side={THREE.DoubleSide} /></mesh>
      {/* Tavan */}
      <mesh position={[0, 4.2, -3]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[26, 34]} /><meshStandardMaterial color="#faf8f5" roughness={0.9} side={THREE.DoubleSide} /></mesh>

      {/* Dış Duvarlar (Hizaları Tam Kilitlendi) */}
      <mesh position={[-12.0, 2.1, -3]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[34, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[12.0, 2.1, -3]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[34, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.1, -18]}><planeGeometry args={[24, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.1, 14]}><planeGeometry args={[24, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

function PlayerMovement({ isLocked, mobileMove, mobileTurn }) {
  const { camera } = useThree();
  const keys = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => (keys.current[e.code] = true);
    const handleKeyUp = (e) => (keys.current[e.code] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const speed = 5.2 * delta;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    if (mobileTurn) {
      const euler = new THREE.Euler(0, 0, 0, 'YXZ').setFromQuaternion(camera.quaternion);
      euler.y += mobileTurn * 2.2 * delta;
      camera.quaternion.setFromEuler(euler);
    }

    if (!isLocked && !mobileMove && !mobileTurn) return;

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(camera.up, forward).normalize();

    if (keys.current['KeyW'] || keys.current['ArrowUp']) camera.position.addScaledVector(forward, speed);
    if (keys.current['KeyS'] || keys.current['ArrowDown']) camera.position.addScaledVector(forward, -speed);
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) camera.position.addScaledVector(right, speed);
    if (keys.current['KeyD'] || keys.current['ArrowRight']) camera.position.addScaledVector(right, -speed);

    if (mobileMove) {
      if (mobileMove.forward !== 0) camera.position.addScaledVector(forward, mobileMove.forward * speed);
      if (mobileMove.right !== 0) camera.position.addScaledVector(right, mobileMove.right * speed);
    }

    camera.position.y = 1.7;
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -11.2, 11.2);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -17.0, 13.0);
  });

  return null;
}

export default function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const controlsRef = useRef();
  const [mobileMove, setMobileMove] = useState(null);
  const [mobileTurn, setMobileTurn] = useState(null);

  return (
    <div className="canvas-container">
      {isLocked && <div className="crosshair" />}

      {!isLocked && !selectedArt && (
        <div className="instructions-overlay" onClick={() => controlsRef.current?.lock()}>
          <div className="instructions-card">
            <h1>ZEYNEP OZCELIK</h1>
            <p className="subtitle">Virtual Fine Art Gallery &amp; Retrospective</p>
            <div className="artist-links">
              <a href={ARTIST_INFO.instagram} target="_blank" rel="noreferrer" className="artist-link-badge ig" onClick={e => e.stopPropagation()}>📸 {ARTIST_INFO.instagramHandle}</a>
              <a href={`mailto:${ARTIST_INFO.email}`} className="artist-link-badge mail" onClick={e => e.stopPropagation()}>✉️ {ARTIST_INFO.email}</a>
            </div>
            <div className="controls-hint"><strong>[W, A, S, D]</strong> Walk &nbsp;|&nbsp; <strong>[Click Artwork]</strong> Inspect</div>
            <div className="start-prompt">▶ Click or Tap Anywhere to Enter the Gallery</div>
          </div>
        </div>
      )}

      <div className="mobile-controls-overlay">
        <div className="mobile-turn-group">
          <button onTouchStart={() => setMobileTurn(1)} onTouchEnd={() => setMobileTurn(0)} onMouseDown={() => setMobileTurn(1)} onMouseUp={() => setMobileTurn(0)}>↺ Turn Left</button>
          <button onTouchStart={() => setMobileTurn(-1)} onTouchEnd={() => setMobileTurn(0)} onMouseDown={() => setMobileTurn(-1)} onMouseUp={() => setMobileTurn(0)}>Turn Right ↻</button>
        </div>
        <div className="mobile-dpad">
          <button onTouchStart={() => setMobileMove({ forward: 1, right: 0 })} onTouchEnd={() => setMobileMove(null)} onMouseDown={() => setMobileMove({ forward: 1, right: 0 })} onMouseUp={() => setMobileMove(null)}>▲</button>
          <div className="dpad-row">
            <button onTouchStart={() => setMobileMove({ forward: 0, right: 1 })} onTouchEnd={() => setMobileMove(null)} onMouseDown={() => setMobileMove({ forward: 0, right: 1 })} onMouseUp={() => setMobileMove(null)}>◄</button>
            <button onTouchStart={() => setMobileMove({ forward: -1, right: 0 })} onTouchEnd={() => setMobileMove(null)} onMouseDown={() => setMobileMove({ forward: -1, right: 0 })} onMouseUp={() => setMobileMove(null)}>▼</button>
            <button onTouchStart={() => setMobileMove({ forward: 0, right: -1 })} onTouchEnd={() => setMobileMove(null)} onMouseDown={() => setMobileMove({ forward: 0, right: -1 })} onMouseUp={() => setMobileMove(null)}>►</button>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 1.7, 10.0], fov: 70 }}>
        <ambientLight intensity={1.8} color="#ffffff" />
        <directionalLight position={[0, 10, 5]} intensity={1.8} color="#fffcf5" />
        <PointerLockControls ref={controlsRef} onLock={() => setIsLocked(true)} onUnlock={() => setIsLocked(false)} />
        <PlayerMovement isLocked={isLocked} mobileMove={mobileMove} mobileTurn={mobileTurn} />
        <GalleryArchitecture />
        {ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} onSelect={setSelectedArt} />)}
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
                <span className="modal-tag">Fine Art</span>
              </div>
              <h2>{selectedArt.title}</h2>
              <p className="artist-byline">Artist: <strong>Zeynep Ozcelik</strong></p>
              <p className="art-desc">Virtual Fine Art Exhibition piece.</p>
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