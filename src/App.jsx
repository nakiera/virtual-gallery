import React, { useState, useRef, useEffect } from 'react';
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

  const frameWidth = (art.height || 1.1) * aspect;
  const frameHeight = art.height || 1.1;

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

  const pW = 0.75;
  const pH = 1.0;
  const gap = 0.02;

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

function TouchAndTrackpadControls({ mobileMove, mobileTurn }) {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const previousTouchPosition = useRef({ x: 0, y: 0 });
  const previousPinchDistance = useRef(null);
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  useEffect(() => {
    const domElement = gl.domElement;

    const onPointerDown = (e) => {
      if (e.button === 0 || e.pointerType === 'touch') {
        isDragging.current = true;
        previousTouchPosition.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousTouchPosition.current.x;
      const deltaY = e.clientY - previousTouchPosition.current.y;

      previousTouchPosition.current = { x: e.clientX, y: e.clientY };

      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= deltaX * 0.003;
      euler.current.x -= deltaY * 0.003;
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
      camera.quaternion.setFromEuler(euler.current);
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

        if (previousPinchDistance.current !== null) {
          const deltaDist = dist - previousPinchDistance.current;
          const forward = new THREE.Vector3();
          camera.getWorldDirection(forward);
          forward.y = 0;
          forward.normalize();
          camera.position.addScaledVector(forward, deltaDist * 0.02);
        }
        previousPinchDistance.current = dist;
      }
    };

    const onTouchEnd = () => {
      previousPinchDistance.current = null;
    };

    const onWheel = (e) => {
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      camera.position.addScaledVector(forward, -e.deltaY * 0.005);
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('touchmove', onTouchMove);
    domElement.addEventListener('touchend', onTouchEnd);
    domElement.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('touchmove', onTouchMove);
      domElement.removeEventListener('touchend', onTouchEnd);
      domElement.removeEventListener('wheel', onWheel);
    };
  }, [camera, gl]);

  useFrame((_, delta) => {
    const speed = 5.2 * delta;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    if (mobileTurn) {
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y += mobileTurn * 2.2 * delta;
      camera.quaternion.setFromEuler(euler.current);
    }

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(camera.up, forward).normalize();

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
  const [selectedArt, setSelectedArt] = useState(null);
  const [mobileMove, setMobileMove] = useState(null);
  const [mobileTurn, setMobileTurn] = useState(null);

  return (
    <div className="canvas-container">
      <div className="instructions-overlay-hint" style={{ position: 'absolute', top: 15, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', pointerEvents: 'none' }}>
        💡 Click &amp; drag or touch &amp; swipe to look around.
      </div>

      <div className="mobile-controls-overlay" style={{ bottom: '75px' }}>
        <div className="mobile-turn-group">
          <button onTouchStart={() => setMobileTurn(1)} onTouchEnd={() => setMobileTurn(0)} onMouseDown={() => setMobileTurn(1)} onMouseUp={() => setMobileTurn(0)}>↺ Turn</button>
          <button onTouchStart={() => setMobileTurn(-1)} onTouchEnd={() => setMobileTurn(0)} onMouseDown={() => setMobileTurn(-1)} onMouseUp={() => setMobileTurn(0)}>Turn ↻</button>
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
        <TouchAndTrackpadControls mobileMove={mobileMove} mobileTurn={mobileTurn} />
        <GalleryArchitecture />
        <GalleryDoor />
        {ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} onSelect={setSelectedArt} />)}
        {GRID_SETS.map((setInfo) => <GridArtSet key={setInfo.id} setInfo={setInfo} onSelect={setSelectedArt} />)}
        {WING_ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} onSelect={setSelectedArt} />)}
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