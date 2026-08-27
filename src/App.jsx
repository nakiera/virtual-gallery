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

// TEKİL ESERLER (SOL VE SAĞ DUVARLAR)
const ARTWORKS = [
  // --- SOL DUVAR (X = -11.88) ---
  { id: 1, title: 'Balloon Float', file: '/artworks/1-baloon.png', position: [-11.88, 1.8, -12.0], rotation: [0, Math.PI / 2, 0], height: 1.4 },
  { id: 2, title: 'Strawberry Bloom', file: '/artworks/2-straw.png', position: [-11.88, 1.8, -7.5], rotation: [0, Math.PI / 2, 0], height: 1.4 },
  { id: 3, title: 'Botanical Study 3', file: '/artworks/3-DSC00648.JPG', position: [-11.88, 1.8, -3.0], rotation: [0, Math.PI / 2, 0], height: 1.4 },
  { id: 4, title: 'Morning Daisies I', file: '/artworks/4-daisies1.jpg', position: [-11.88, 1.8, 1.5], rotation: [0, Math.PI / 2, 0], height: 1.4 },
  { id: 5, title: 'Morning Daisies II', file: '/artworks/5-daisies2.JPG', position: [-11.88, 1.8, 6.0], rotation: [0, Math.PI / 2, 0], height: 1.4 },

  // --- SAĞ DUVAR (X = 11.88) ---
  { id: 6, title: 'Sentinel of the Tides', file: '/artworks/8-lighthouse1.jpg', position: [11.88, 1.8, -12.0], rotation: [0, -Math.PI / 2, 0], height: 1.4 },
  { id: 7, title: 'Lily in Monochrome', file: '/artworks/9-lillies4.jpg', position: [11.88, 1.8, -7.5], rotation: [0, -Math.PI / 2, 0], height: 1.4 },
  { id: 8, title: 'White Rose in Negative', file: '/artworks/10-rose1.jpg', position: [11.88, 1.8, -3.0], rotation: [0, -Math.PI / 2, 0], height: 1.4 },
  { id: 9, title: 'Whispering Stem', file: '/artworks/11-rose2.jpg', position: [11.88, 1.8, 1.5], rotation: [0, -Math.PI / 2, 0], height: 1.4 },
  { id: 10, title: 'Still Life with Decanter', file: '/artworks/12-roses3.jpg', position: [11.88, 1.8, 6.0], rotation: [0, -Math.PI / 2, 0], height: 1.4 }
];

// 4'LÜ SETLER (BÜYÜTÜLMÜŞ ÖLÇEKTE 2x2 KARE BLOKLAR)
const GRID_SETS = [
  {
    id: 'flamingo-set',
    title: 'Flamingo Polyptych',
    category: 'Oil Painting Set',
    description: 'A four-panel unified set forming an elegant stylized flamingo composition.',
    position: [-6.0, 1.8, -17.85], // Arka duvarın sol tarafı
    rotation: [0, 0, 0],
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
    position: [6.0, 1.8, -17.85], // Arka duvarın sağ tarafı
    rotation: [0, 0, 0],
    files: [
      '/artworks/22Piece1.JPG',
      '/artworks/22Piece2.JPG',
      '/artworks/22Piece3.JPG',
      '/artworks/22Piece4.JPG'
    ]
  }
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

  const frameWidth = (art.height || 1.4) * aspect;
  const frameHeight = art.height || 1.4;

  return (
    <group 
      position={art.position} 
      rotation={art.rotation}
      onClick={(e) => { e.stopPropagation(); onSelect(art); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[frameWidth + 0.05, frameHeight + 0.05, 0.02]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        {texture ? <meshBasicMaterial map={texture} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#c4b5a5" side={THREE.DoubleSide} />}
      </mesh>
    </group>
  );
}

function GridArtSet({ setInfo, onSelect }) {
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

  // Boyutlar büyütüldü (Daha ihtişamlı durması için)
  const pW = 0.95;
  const pH = 1.3;
  const gap = 0.03;

  return (
    <group 
      position={setInfo.position} 
      rotation={setInfo.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect({ title: setInfo.title, category: setInfo.category, description: setInfo.description, file: setInfo.files[0] });
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
        <boxGeometry args={[pW*2 + gap + 0.08, pH*2 + gap + 0.08, 0.02]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} />
      </mesh>
    </group>
  );
}

// GALERİ GİRİŞ KAPISI
function GalleryDoor() {
  return (
    <group position={[0, 0, 13.9]}>
      {/* Kasa */}
      <mesh position={[-1.1, 1.8, 0]}><boxGeometry args={[0.2, 3.6, 0.3]} /><meshStandardMaterial color="#3d2314" /></mesh>
      <mesh position={[1.1, 1.8, 0]}><boxGeometry args={[0.2, 3.6, 0.3]} /><meshStandardMaterial color="#3d2314" /></mesh>
      <mesh position={[0, 3.55, 0]}><boxGeometry args={[2.4, 0.2, 0.3]} /><meshStandardMaterial color="#3d2314" /></mesh>
      {/* Açık Kanatlar */}
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
  const floorColor = '#8a5e3d';
  return (
    <group>
      {/* Zemin */}
      <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[26, 34]} /><meshStandardMaterial color={floorColor} roughness={0.4} side={THREE.DoubleSide} /></mesh>
      {/* Tavan */}
      <mesh position={[0, 4.2, -2]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[26, 34]} /><meshStandardMaterial color="#faf8f5" roughness={0.9} side={THREE.DoubleSide} /></mesh>

      {/* Dış Duvarlar */}
      <mesh position={[-12.0, 2.1, -2]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[34, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[12.0, 2.1, -2]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[34, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
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
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -16.0, 12.0);
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

      {/* MOBİL KONTROLLER ÜSTE TAŞINDI */}
      <div className="mobile-controls-overlay" style={{ bottom: '75px' }}>
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

      <Canvas camera={{ position: [0, 1.7, 8.0], fov: 70 }}>
        <ambientLight intensity={1.8} color="#ffffff" />
        <directionalLight position={[0, 10, 5]} intensity={1.8} color="#fffcf5" />
        <PointerLockControls ref={controlsRef} onLock={() => setIsLocked(true)} onUnlock={() => setIsLocked(false)} />
        <PlayerMovement isLocked={isLocked} mobileMove={mobileMove} mobileTurn={mobileTurn} />
        <GalleryArchitecture />
        <GalleryDoor />
        {ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} onSelect={setSelectedArt} />)}
        {GRID_SETS.map((setInfo) => <GridArtSet key={setInfo.id} setInfo={setInfo} onSelect={setSelectedArt} />)}
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