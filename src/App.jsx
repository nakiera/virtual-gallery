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

// GÖNDERDİĞİN LİSTEDEKİ GERÇEK DOSYA İSİMLERİNE GÖRE DÜZENLENMİŞ ESERLER
const ARTWORKS = [
  // --- SOL DUVAR (X = -11.75) ---
  { id: 1, title: 'Balloon Float', category: 'Oil on Canvas', file: '/artworks/1-baloon.png', position: [-11.75, 1.8, -14.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 2, title: 'Strawberry Bloom', category: 'Oil on Canvas', file: '/artworks/2-straw.png', position: [-11.75, 1.8, -11.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 3, title: 'Botanical Study 3', category: 'Oil Painting', file: '/artworks/3-DSC00648.JPG', position: [-11.75, 1.8, -8.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 4, title: 'Morning Daisies I', category: 'Oil Painting', file: '/artworks/4-daisies1.jpg', position: [-11.75, 1.8, -5.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 5, title: 'Morning Daisies II', category: 'Oil Painting', file: '/artworks/5-daisies2.JPG', position: [-11.75, 1.8, -2.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 6, title: 'Morning Daisies III', category: 'Oil Painting', file: '/artworks/6-daisies3.JPG', position: [-11.75, 1.8, 1.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },

  // --- SAĞ DUVAR (X = 11.75) ---
  { id: 7, title: 'Drapery in Repose', category: 'Charcoal', file: '/artworks/7-bust1.jpg', position: [11.75, 1.8, -14.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 8, title: 'Sentinel of the Tides', category: 'Charcoal', file: '/artworks/8-lighthouse1.jpg', position: [11.75, 1.8, -11.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 9, title: 'Lily in Monochrome', category: 'Charcoal', file: '/artworks/9-lillies4.jpg', position: [11.75, 1.8, -8.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 10, title: 'White Rose in Negative', category: 'Charcoal', file: '/artworks/10-rose1.jpg', position: [11.75, 1.8, -5.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 11, title: 'Whispering Stem', category: 'Charcoal', file: '/artworks/11-rose2.jpg', position: [11.75, 1.8, -2.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 12, title: 'Still Life with Decanter', category: 'Charcoal', file: '/artworks/12-roses3.jpg', position: [11.75, 1.8, 1.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },

  // --- ARKA DUVAR (Z = -17.75) ---
  { id: 13, title: 'Nocturne Botanical', category: 'Ink Illustration', file: '/artworks/13-inkflower1.jpg', position: [-9.0, 1.8, -17.75], rotation: [0, 0, 0], height: 1.4 },
  { id: 14, title: 'Midnight Vintage', category: 'Pastel', file: '/artworks/14-wine1.jpg', position: [-5.0, 1.8, -17.75], rotation: [0, 0, 0], height: 1.4 },
  { id: 15, title: 'Bouquet of Grace', category: 'Oil Still Life', file: '/artworks/15-DSC00922.JPG', position: [-1.0, 1.8, -17.75], rotation: [0, 0, 0], height: 1.4 },
  { id: 16, title: 'November Serenity', category: 'Oil on Canvas', file: '/artworks/16-flower11.11.23.png', position: [3.0, 1.8, -17.75], rotation: [0, 0, 0], height: 1.4 },
  { id: 17, title: 'Azure Solitude', category: 'Oil on Canvas', file: '/artworks/17-flower07-11-23.png', position: [7.0, 1.8, -17.75], rotation: [0, 0, 0], height: 1.4 },

  // --- ORTA BÖLME DUVARI ÖN YÜZ (Z = -8.45) ---
  { id: 18, title: 'Mediterranean Reverie', category: 'Pastel Landscape', file: '/artworks/18-bycycle1.jpg', position: [-4.5, 1.8, -8.45], rotation: [0, 0, 0], height: 1.3 },
  { id: 19, title: 'Gilded Sunflower', category: 'Pastel', file: '/artworks/19-sunflower2.jpg', position: [0.0, 1.8, -8.45], rotation: [0, 0, 0], height: 1.3 },
  { id: 20, title: 'Iris at Twilight', category: 'Chiaroscuro Oil', file: '/artworks/20-DSC00927.JPG', position: [4.5, 1.8, -8.45], rotation: [0, 0, 0], height: 1.3 },

  // --- EK DUVAR / KORİDOR ALANLARI ---
  { id: 23, title: 'Red Poppy I', category: 'Oil on Canvas', file: '/artworks/23poppy1.jpg', position: [-11.75, 1.8, 4.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 24, title: 'Red Poppy II', category: 'Oil on Canvas', file: '/artworks/24poppy2.jpg', position: [11.75, 1.8, 4.0], rotation: [0, -Math.PI / 2, 0], height: 1.3 },
  { id: 25, title: 'Crimson Cascade', category: 'Expressionist Oil', file: '/artworks/25poppy3.jpg', position: [-9.0, 1.8, 5.8], rotation: [0, 0, 0], height: 1.3 },
  { id: 26, title: 'Scarlet Wind', category: 'Expressionist Oil', file: '/artworks/26poppies4.jpg', position: [9.0, 1.8, 5.8], rotation: [0, 0, 0], height: 1.3 },
  { id: 34, title: 'Emerald Rose', category: 'Oil Painting', file: '/artworks/34-DSC00670.JPG', position: [-5.0, 1.8, 5.8], rotation: [0, 0, 0], height: 1.3 },
  { id: 35, title: 'Twin Scarlet Tulips', category: 'Oil Painting', file: '/artworks/35-tulip1.jpg', position: [5.0, 1.8, 5.8], rotation: [0, 0, 0], height: 1.3 },
  { id: 39, title: 'Iris in Full Bloom', category: 'Oil Painting', file: '/artworks/39-iris1.jpg', position: [0.0, 1.8, 5.8], rotation: [0, 0, 0], height: 1.3 }
];

function loadTextureWithFile(file, onLoaded) {
  const loader = new THREE.TextureLoader();
  loader.load(
    file,
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      onLoaded(tex);
    },
    undefined,
    () => {
      // Alternatif küçük/büyük harf veya uzantı denemesi
      const altFile = file.toLowerCase();
      if (altFile !== file) {
        loader.load(altFile, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          onLoaded(tex);
        });
      }
    }
  );
}

function BrassPlaque({ title, artist, width = 0.32, height = 0.048 }) {
  return (
    <group position={[0, 0, 0.02]}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#c5a059" metalness={0.75} roughness={0.3} />
      </mesh>
      <Text position={[0, 0.008, 0.003]} fontSize={0.015} color="#1a0f05" anchorX="center" anchorY="middle" maxWidth={width - 0.02}>
        {title}
      </Text>
      <Text position={[0, -0.009, 0.003]} fontSize={0.0095} color="#3b2814" anchorX="center" anchorY="middle">
        {artist || 'Zeynep Ozcelik'}
      </Text>
    </group>
  );
}

function ArtFrame({ art, onSelect }) {
  const [texture, setTexture] = useState(null);
  const [aspect, setAspect] = useState(1.0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    loadTextureWithFile(art.file, (tex) => {
      if (tex.image && tex.image.height > 0) {
        setAspect(tex.image.width / tex.image.height);
      }
      setTexture(tex);
    });
  }, [art.file]);

  const frameWidth = (art.height || 1.35) * aspect;
  const frameHeight = art.height || 1.35;
  const plaqueW = Math.max(Math.min(frameWidth * 0.75, 0.45), 0.28);

  return (
    <group 
      position={art.position} 
      rotation={art.rotation}
      onClick={(e) => { e.stopPropagation(); onSelect(art); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[frameWidth + 0.05, frameHeight + 0.05, 0.03]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        {texture ? <meshBasicMaterial map={texture} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#c4b5a5" roughness={0.5} side={THREE.DoubleSide} />}
      </mesh>
      <group position={[0, -(frameHeight / 2) - 0.055, 0]}>
        <BrassPlaque title={art.title} artist="Zeynep Ozcelik" width={plaqueW} />
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
      <mesh position={[0, 0, -4]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[24, 40]} /><meshStandardMaterial color={floorColor} roughness={0.4} side={THREE.DoubleSide} /></mesh>
      {/* Tavan */}
      <mesh position={[0, 4.2, -4]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[24, 40]} /><meshStandardMaterial color="#faf8f5" roughness={0.9} side={THREE.DoubleSide} /></mesh>

      {/* Dış Duvarlar */}
      <mesh position={[-12, 2.1, -4]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[40, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[12, 2.1, -4]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[40, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.1, -22]}><planeGeometry args={[24, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>

      {/* Orta Bölme Duvarı */}
      <mesh position={[0, 2.0, -8.5]}><boxGeometry args={[14.0, 3.4, 0.3]} /><meshStandardMaterial color={ecruColor} roughness={0.8} /></mesh>
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
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -21.0, 14.5);
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

      <Canvas camera={{ position: [0, 1.7, 12.0], fov: 70 }}>
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
                <span className="modal-tag">{selectedArt.category}</span>
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