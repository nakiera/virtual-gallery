import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

// Yeni Gruplandırılmış 53 Eser Listesi
const ARTWORKS = [
  // ==========================================
  // 1. GİRİŞ KORİDORU: KARAKALEM & DESEN (k-)
  // ==========================================
  // Sol Koridor Duvarı
  { id: 1, title: 'Antik Büst Etüdü', category: 'Karakalem', file: '/artworks/k-bust1.jpg', description: 'Işık-gölge ve anatomik form tonlama çalışması.', position: [-2.9, 1.8, 8.5], rotation: [0, Math.PI / 2, 0], height: 1.25 },
  { id: 2, title: 'Deniz Feneri & Martılar', category: 'Karakalem', file: '/artworks/k-lighthouse1.jpg', description: 'Kayalıklar ve deniz temalı atmosferik desen.', position: [-2.9, 1.8, 6.2], rotation: [0, Math.PI / 2, 0], height: 1.25 },
  { id: 3, title: 'Monokrom Zambak', category: 'Karakalem', file: '/artworks/k-lillies4.jpg', description: 'Grafit tonlamalarla zarif çiçek anatomisi.', position: [-2.9, 1.8, 3.9], rotation: [0, Math.PI / 2, 0], height: 1.25 },
  { id: 4, title: 'Mürekkep Çiçek', category: 'Desen', file: '/artworks/g-inkflower1.jpg', description: 'Mürekkep hatlarıyla botanik çizim.', position: [-2.9, 1.8, 1.6], rotation: [0, Math.PI / 2, 0], height: 1.25 },

  // Sağ Koridor Duvarı
  { id: 5, title: 'Gül Çizimi I', category: 'Karakalem', file: '/artworks/k-rose1.jpg', description: 'Grafit tonlama gül etüdü.', position: [2.9, 1.8, 8.5], rotation: [0, -Math.PI / 2, 0], height: 1.25 },
  { id: 6, title: 'Gül Çizimi II', category: 'Karakalem', file: '/artworks/k-rose2.jpg', description: 'Katmanlı yaprak detayları.', position: [2.9, 1.8, 6.2], rotation: [0, -Math.PI / 2, 0], height: 1.25 },
  { id: 7, title: 'Vazo ve Güller', category: 'Karakalem', file: '/artworks/k-roses3.jpg', description: 'Klasik natürmort desen kompozisyonu.', position: [2.9, 1.8, 3.9], rotation: [0, -Math.PI / 2, 0], height: 1.25 },
  { id: 8, title: 'Deniz Kabuğu', category: 'Desen & Etüt', file: '/artworks/c-seashell08-11-23.png', description: 'Heykelsi spiral kabuk formu.', position: [2.9, 1.8, 1.6], rotation: [0, -Math.PI / 2, 0], height: 1.25 },

  // ==========================================
  // 2. SOL DUVAR: ÇOKLU SETLER (Flamingo, Piece, Poppy)
  // ==========================================
  // 4'lü Flamingo Paneli
  { id: 9, title: 'Flamingo - I', category: '4’lü Flamingo Serisi', file: '/artworks/Flamingo1.JPG', description: 'Flamingo serisi sol üst panel.', position: [-11.9, 2.5, -16.2], rotation: [0, Math.PI / 2, 0], height: 1.0 },
  { id: 10, title: 'Flamingo - II', category: '4’lü Flamingo Serisi', file: '/artworks/Flamingo2.JPG', description: 'Flamingo serisi sağ üst panel.', position: [-11.9, 2.5, -17.0], rotation: [0, Math.PI / 2, 0], height: 1.0 },
  { id: 11, title: 'Flamingo - III', category: '4’lü Flamingo Serisi', file: '/artworks/Flamingo3.JPG', description: 'Flamingo serisi sol alt panel.', position: [-11.9, 1.4, -16.2], rotation: [0, Math.PI / 2, 0], height: 1.0 },
  { id: 12, title: 'Flamingo - IV', category: '4’lü Flamingo Serisi', file: '/artworks/Flamingo4.JPG', description: 'Flamingo serisi sağ alt panel.', position: [-11.9, 1.4, -17.0], rotation: [0, Math.PI / 2, 0], height: 1.0 },

  // 4'lü Piece Geometrik Panel
  { id: 13, title: 'Piece - I', category: '4’lü Geometrik Seri', file: '/artworks/Piece1.JPG', description: 'Geometrik soyutlama sol üst panel.', position: [-11.9, 2.5, -13.0], rotation: [0, Math.PI / 2, 0], height: 1.0 },
  { id: 14, title: 'Piece - II', category: '4’lü Geometrik Seri', file: '/artworks/Piece2.JPG', description: 'Geometrik soyutlama sağ üst panel.', position: [-11.9, 2.5, -13.8], rotation: [0, Math.PI / 2, 0], height: 1.0 },
  { id: 15, title: 'Piece - III', category: '4’lü Geometrik Seri', file: '/artworks/Piece3.JPG', description: 'Geometrik soyutlama sol alt panel.', position: [-11.9, 1.4, -13.0], rotation: [0, Math.PI / 2, 0], height: 1.0 },
  { id: 16, title: 'Piece - IV', category: '4’lü Geometrik Seri', file: '/artworks/Piece4.JPG', description: 'Geometrik soyutlama sağ alt panel.', position: [-11.9, 1.4, -13.8], rotation: [0, Math.PI / 2, 0], height: 1.0 },

  // Gelincik (Poppy) Serisi
  { id: 17, title: 'Gelincik Tarlası', category: 'Gelincik Serisi', file: '/artworks/poppies4.jpg', description: 'Geniş format dokusal gelincik kompozisyonu.', position: [-11.9, 2.0, -10.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 18, title: 'Kırmızı Gelincik I', category: 'Gelincik Serisi', file: '/artworks/poppy1.jpg', description: 'Canlı kırmızı fırça tuşeleri.', position: [-11.9, 2.0, -8.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 19, title: 'Kırmızı Gelincik II', category: 'Gelincik Serisi', file: '/artworks/poppy2.jpg', description: 'Dikey gelincik etüdü.', position: [-11.9, 2.0, -6.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 20, title: 'Gelincik Buketi', category: 'Gelincik Serisi', file: '/artworks/poppy3.jpg', description: 'Yatay kompozisyonda açan gelincikler.', position: [-11.9, 2.0, -4.0], rotation: [0, Math.PI / 2, 0], height: 1.3 },
  { id: 21, title: 'Karahindiba Etüdü', category: 'Botanik', file: '/artworks/g-dandelion1.jpg', description: 'Rüzgarda savrulan tohumlar.', position: [-11.9, 2.0, -1.8], rotation: [0, Math.PI / 2, 0], height: 1.3 },

  // ==========================================
  // 3. BÜYÜK KARŞI DUVAR: BAŞYAPITLAR & AYÇİÇEĞİ TRİPTİK
  // ==========================================
  { id: 22, title: 'Şarap & Kadeh', category: 'Klasik Natürmort', file: '/artworks/g-wine1.jpg', description: 'Derin bordo tonlar ve cam ışıltısı.', position: [-9.2, 2.1, -17.9], rotation: [0, 0, 0], height: 1.6 },
  
  // Ayçiçeği Triptik (a-)
  { id: 23, title: 'Ayçiçeği Triptik - Sol', category: '3’lü Ayçiçeği Serisi', file: '/artworks/a-DSC00923.JPG', description: 'Triptik serinin sol paneli.', position: [-4.2, 2.1, -17.9], rotation: [0, 0, 0], height: 1.6 },
  { id: 24, title: 'Ayçiçeği Triptik - Merkez', category: '3’lü Ayçiçeği Serisi', file: '/artworks/a-DSC00924.JPG', description: 'Triptik serinin merkez paneli.', position: [-2.5, 2.1, -17.9], rotation: [0, 0, 0], height: 1.6 },
  { id: 25, title: 'Ayçiçeği Triptik - Sağ', category: '3’lü Ayçiçeği Serisi', file: '/artworks/a-DSC00925.JPG', description: 'Triptik serinin sağ paneli.', position: [-0.8, 2.1, -17.9], rotation: [0, 0, 0], height: 1.6 },

  { id: 26, title: 'Mavi Vazoda Ayçiçekleri', category: 'Yağlıboya Natürmort', file: '/artworks/d-DSC00644.JPG', description: 'Geniş vazo içinde zengin sarı ayçiçekleri.', position: [2.6, 2.1, -17.9], rotation: [0, 0, 0], height: 1.6 },
  { id: 27, title: 'Güz Ayçiçeği', category: 'Yağlıboya', file: '/artworks/d-sunflower6-11-23.jpg', description: 'Sıcak sonbahar ışığında ayçiçeği.', position: [6.0, 2.1, -17.9], rotation: [0, 0, 0], height: 1.6 },
  { id: 28, title: 'Kasım Çiçekleri', category: 'Botanik Tuval', file: '/artworks/g-flower11.11.23.png', description: 'Zengin dokulu çiçek buketi.', position: [9.2, 2.1, -17.9], rotation: [0, 0, 0], height: 1.6 },

  // ==========================================
  // 4. ORTA ADA DUVARI: SÜRREAL & SOYUT (s-)
  // ==========================================
  // Ön Yüz (Girişe Bakan Taraf)
  { id: 29, title: 'Sürreal Girdap', category: 'Sürreal & Doku', file: '/artworks/s-DSC00655.JPG', description: 'Dairesel renk dalgalanmaları ve mistik formlar.', position: [-2.6, 2.0, -7.85], rotation: [0, 0, 0], height: 1.45 },
  { id: 30, title: 'Mistik Figüratif Tuval', category: 'Sürreal & Doku', file: '/artworks/s-DSC00657.JPG', description: 'Katmanlı doku ve derin figüratif anlatım.', position: [0, 2.0, -7.85], rotation: [0, 0, 0], height: 1.45 },
  { id: 31, title: 'Soyut Dışavurum', category: 'Sürreal & Doku', file: '/artworks/s-DSC00659.JPG', description: 'Enerjik renk tuşeleri ve dışavurumcu soyutlama.', position: [2.6, 2.0, -7.85], rotation: [0, 0, 0], height: 1.45 },

  // Arka Yüz (Karşı Duvara Bakan Taraf)
  { id: 32, title: 'Zümrüt Gül', category: 'Yağlıboya', file: '/artworks/g-DSC00670.JPG', description: 'Koyu fonda heykelsi kırmızı gül.', position: [-2.6, 2.0, -8.15], rotation: [0, Math.PI, 0], height: 1.45 },
  { id: 33, title: 'Gül Demeti', category: 'Yağlıboya Natürmort', file: '/artworks/g-DSC00922.JPG', description: 'Vazo içinde pembe güller.', position: [0, 2.0, -8.15], rotation: [0, Math.PI, 0], height: 1.45 },
  { id: 34, title: 'Gece ve İris', category: 'Yağlıboya', file: '/artworks/e-DSC00927.JPG', description: 'Koyu fonda zarif iris çiçeği.', position: [2.6, 2.0, -8.15], rotation: [0, Math.PI, 0], height: 1.45 },

  // ==========================================
  // 5. SAĞ DUVAR: PAPATYALAR, LALELER VE ÇİÇEKLER
  // ==========================================
  // Papatya Serisi (b-)
  { id: 35, title: 'Papatyalar I', category: 'Papatya Serisi', file: '/artworks/b-DSC00634.JPG', description: 'Mavi vazoda beyaz papatyalar.', position: [11.9, 2.0, -16.5], rotation: [0, -Math.PI / 2, 0], height: 1.35 },
  { id: 36, title: 'Papatyalar II', category: 'Papatya Serisi', file: '/artworks/b-DSC00635.JPG', description: 'Papatya serisi detay çalışması.', position: [11.9, 2.0, -14.5], rotation: [0, -Math.PI / 2, 0], height: 1.35 },
  { id: 37, title: 'Papatyalar III', category: 'Papatya Serisi', file: '/artworks/b-daisies.jpg', description: 'Zarif papatya buketi.', position: [11.9, 2.0, -12.5], rotation: [0, -Math.PI / 2, 0], height: 1.35 },

  // Lale Serisi (t- ve c-)
  { id: 38, title: 'Kırmızı Gül Goncası', category: 'Tuval', file: '/artworks/t-DSC00660.JPG', description: 'Mavi gökyüzü önünde kırmızı gonca.', position: [11.9, 2.0, -10.0], rotation: [0, -Math.PI / 2, 0], height: 1.35 },
  { id: 39, title: 'Pembe Çiçekler', category: 'Tuval', file: '/artworks/t-DSC00662.JPG', description: 'Vazo içinde bahar esintisi.', position: [11.9, 2.0, -8.0], rotation: [0, -Math.PI / 2, 0], height: 1.35 },
  { id: 40, title: 'Kır Laleleri', category: 'Tuval', file: '/artworks/t-DSC00664.JPG', description: 'Koyu lacivert zemin üzerinde kırmızı lale.', position: [11.9, 2.0, -6.0], rotation: [0, -Math.PI / 2, 0], height: 1.35 },
  { id: 41, title: 'Kırmızı Laleler', category: 'Tuval', file: '/artworks/c-tulip1.jpg', description: 'Siyah fonda çift kırmızı lale.', position: [11.9, 2.0, -4.0], rotation: [0, -Math.PI / 2, 0], height: 1.35 },
  { id: 42, title: 'Günebakan Tarlası', category: 'Peyzaj', file: '/artworks/d-DSC00918.JPG', description: 'Sıcak sarı ayçiçeği tarlası.', position: [11.9, 2.0, -2.0], rotation: [0, -Math.PI / 2, 0], height: 1.35 },

  // ==========================================
  // 6. GİRİŞ KANATLARI & ARA KEMERLER (c-, d-, e-, f-)
  // ==========================================
  { id: 43, title: 'Mavi Kapı & Bisiklet', category: 'Nostaljik Peyzaj', file: '/artworks/f-bycycle1.jpg', description: 'Taş sokakta nostaljik bisiklet.', position: [-8.5, 2.0, 0.05], rotation: [0, 0, 0], height: 1.4 },
  { id: 44, title: 'İris Armonisi', category: 'Renk & Botanik', file: '/artworks/f-iris1.jpg', description: 'Mor iris ve zengin yaprak tonları.', position: [-4.8, 2.0, 0.05], rotation: [0, 0, 0], height: 1.4 },
  { id: 45, title: 'Calla Lilies', category: 'Renk & Form', file: '/artworks/d-calla-lilies1.jpg', description: 'Koyu zeminde pembe kalalar.', position: [4.8, 2.0, 0.05], rotation: [0, 0, 0], height: 1.4 },
  { id: 46, title: 'Mavi Çiçek Buketi', category: 'Botanik Tuval', file: '/artworks/d-flower07-11-23.png', description: 'Canlı mavi taç yapraklar.', position: [8.5, 2.0, 0.05], rotation: [0, 0, 0], height: 1.4 },

  { id: 47, title: 'Beyaz Çiçekler & Vazo', category: 'Yağlıboya', file: '/artworks/d-DSC00648.JPG', description: 'Beyaz çiçek ve dokusal vazo.', position: [-10.5, 2.0, 0.05], rotation: [0, 0, 0], height: 1.35 },
  { id: 48, title: 'Güneş Ayçiçeği', category: 'Yağlıboya', file: '/artworks/e-sunflower2.jpg', description: 'Güneş ışığında parlayan ayçiçeği.', position: [10.5, 2.0, 0.05], rotation: [0, 0, 0], height: 1.35 },
  { id: 49, title: 'Balonlar & Kır Bahçesi', category: 'Peyzaj', file: '/artworks/c-baloon10-11-23.png', description: 'Gökyüzüne yükselen renkli balonlar.', position: [-2.9, 1.8, 0.3], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 48, title: 'Çilek & Yapraklar', category: 'Renk & Doku', file: '/artworks/c-straw07-11-23.png', description: 'Canlı kırmızı çilekler ve yeşil yapraklar.', position: [2.9, 1.8, 0.3], rotation: [0, -Math.PI / 2, 0], height: 1.2 }
];

function PlayerMovement({ isLocked }) {
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
    if (!isLocked) return;
    const speed = 5.2 * delta;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(camera.up, forward).normalize();

    if (keys.current['KeyW'] || keys.current['ArrowUp']) camera.position.addScaledVector(forward, speed);
    if (keys.current['KeyS'] || keys.current['ArrowDown']) camera.position.addScaledVector(forward, -speed);
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) camera.position.addScaledVector(right, speed);
    if (keys.current['KeyD'] || keys.current['ArrowRight']) camera.position.addScaledVector(right, -speed);

    camera.position.y = 1.7;

    if (camera.position.z > 0) {
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -2.4, 2.4);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -17.2, 9.8);
    } else {
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -11.2, 11.2);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -17.2, 0.5);

      if (Math.abs(camera.position.x) < 4.2 && camera.position.z > -8.8 && camera.position.z < -7.2) {
        if (camera.position.z > -8.0) camera.position.z = -7.1;
        else camera.position.z = -8.9;
      }
    }
  });

  return null;
}

function ArtFrame({ art, onSelect }) {
  const [texture, setTexture] = useState(null);
  const [aspect, setAspect] = useState(1.0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const tryLoad = (url) => {
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          if (tex.image && tex.image.height > 0) {
            setAspect(tex.image.width / tex.image.height);
          }
          setTexture(tex);
        },
        undefined,
        () => {
          if (url.endsWith('.JPG')) tryLoad(url.replace('.JPG', '.jpg'));
          else if (url.endsWith('.jpg')) tryLoad(url.replace('.jpg', '.JPG'));
        }
      );
    };
    tryLoad(art.file);
  }, [art.file]);

  const frameWidth = (art.height || 1.35) * aspect;
  const frameHeight = art.height || 1.35;

  return (
    <group 
      position={art.position} 
      rotation={art.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(art);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[frameWidth + 0.06, frameHeight + 0.06, 0.03]} />
        <meshStandardMaterial color={hovered ? '#c59b6d' : '#3d2514'} roughness={0.4} />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        {texture ? (
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        ) : (
          <meshStandardMaterial color="#c4b5a5" roughness={0.5} side={THREE.DoubleSide} />
        )}
      </mesh>

      <mesh position={[0, -(frameHeight / 2) - 0.08, 0.01]}>
        <planeGeometry args={[Math.min(frameWidth * 0.7, 0.5), 0.06]} />
        <meshStandardMaterial color="#c5a059" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function OpenDoubleDoor() {
  return (
    <group position={[0, 0, 10.2]}>
      <mesh position={[-1.75, 1.8, 0]}><boxGeometry args={[0.12, 3.6, 0.2]} /><meshStandardMaterial color="#3d2314" /></mesh>
      <mesh position={[1.75, 1.8, 0]}><boxGeometry args={[0.12, 3.6, 0.2]} /><meshStandardMaterial color="#3d2314" /></mesh>
      <mesh position={[0, 3.55, 0]}><boxGeometry args={[3.6, 0.12, 0.2]} /><meshStandardMaterial color="#3d2314" /></mesh>

      <group position={[-1.7, 0, 0]} rotation={[0, Math.PI / 2.8, 0]}>
        <mesh position={[0.75, 1.7, 0]}><boxGeometry args={[1.5, 3.3, 0.06]} /><meshStandardMaterial color="#4a2e18" /></mesh>
        <mesh position={[0.75, 2.1, 0.01]}><planeGeometry args={[1.2, 1.8]} /><meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.1} side={THREE.DoubleSide} /></mesh>
        <mesh position={[1.35, 1.6, 0.05]}><cylinderGeometry args={[0.02, 0.02, 0.25]} /><meshStandardMaterial color="#c5a059" metalness={0.8} /></mesh>
      </group>

      <group position={[1.7, 0, 0]} rotation={[0, -Math.PI / 2.8, 0]}>
        <mesh position={[-0.75, 1.7, 0]}><boxGeometry args={[1.5, 3.3, 0.06]} /><meshStandardMaterial color="#4a2e18" /></mesh>
        <mesh position={[-0.75, 2.1, 0.01]}><planeGeometry args={[1.2, 1.8]} /><meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.1} side={THREE.DoubleSide} /></mesh>
        <mesh position={[-1.35, 1.6, 0.05]}><cylinderGeometry args={[0.02, 0.02, 0.25]} /><meshStandardMaterial color="#c5a059" metalness={0.8} /></mesh>
      </group>

      <mesh position={[0, 2, 2.5]}><planeGeometry args={[8, 5]} /><meshBasicMaterial color="#fdfbf7" side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

function GalleryArchitecture() {
  const ecruColor = '#ede7db';
  const floorColor = '#8a5e3d';

  return (
    <group>
      <mesh position={[0, 0, 5.5]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 11]} /><meshStandardMaterial color={floorColor} roughness={0.4} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 0, -9]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[24, 18]} /><meshStandardMaterial color={floorColor} roughness={0.4} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 4.2, -4]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[24, 28]} /><meshStandardMaterial color="#faf8f5" roughness={0.9} side={THREE.DoubleSide} /></mesh>

      <mesh position={[-3, 2, 5.5]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[11, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[3, 2, 5.5]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[11, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>

      <mesh position={[-12, 2.1, -9]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[18, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[12, 2.1, -9]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[18, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.1, -18]}><planeGeometry args={[24, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>

      {/* Orta Ada Duvarı */}
      <mesh position={[0, 2.0, -8.0]}><boxGeometry args={[8.0, 3.4, 0.3]} /><meshStandardMaterial color={ecruColor} roughness={0.8} /></mesh>

      <mesh position={[-7.5, 2.1, 0]}><planeGeometry args={[9, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[7.5, 2.1, 0]}><planeGeometry args={[9, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>

      <mesh position={[-2.35, 2, 10.2]}><planeGeometry args={[1.3, 4]} /><meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} /></mesh>
      <mesh position={[2.35, 2, 10.2]}><planeGeometry args={[1.3, 4]} /><meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 3.7, 10.2]}><planeGeometry args={[3.4, 0.6]} /><meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

export default function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const controlsRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedArt) setSelectedArt(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArt]);

  const handleStart = () => {
    if (controlsRef.current) controlsRef.current.lock();
  };

  const handleArtSelect = (art) => {
    if (controlsRef.current) controlsRef.current.unlock();
    setSelectedArt(art);
  };

  return (
    <div className="canvas-container">
      {isLocked && <div className="crosshair" />}

      {!isLocked && !selectedArt && (
        <div className="instructions-overlay" onClick={handleStart}>
          <div className="instructions-card">
            <h1>SANAL SANAT GALERİSİ</h1>
            <p>Tematik Eser Koleksiyonu Sergisi</p>
            <div className="controls-hint">
              <strong>[W, A, S, D]</strong> ile Yürü &nbsp;|&nbsp; <strong>[Fare]</strong> ile Etrafa Bak
            </div>
            <div className="start-prompt">▶ Galeriye Giriş Yapmak İçin Tıklayın</div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 1.7, 8.8], fov: 70 }}>
        <ambientLight intensity={1.8} color="#ffffff" />
        <directionalLight position={[0, 10, 5]} intensity={1.8} color="#fffcf5" />
        <directionalLight position={[0, 6, -10]} intensity={1.5} color="#ffffff" />

        <PointerLockControls ref={controlsRef} onLock={() => setIsLocked(true)} onUnlock={() => setIsLocked(false)} />
        <PlayerMovement isLocked={isLocked} />

        <GalleryArchitecture />
        <OpenDoubleDoor />

        {ARTWORKS.map((art, idx) => (
          <ArtFrame key={`${art.file}-${idx}`} art={art} onSelect={handleArtSelect} />
        ))}
      </Canvas>

      {selectedArt && (
        <div className="modal-overlay" onClick={() => setSelectedArt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArt(null)}>&times;</button>
            <div className="modal-img-wrapper">
              <img src={selectedArt.file} alt={selectedArt.title} />
            </div>
            <div className="modal-body">
              <span className="modal-tag">{selectedArt.category}</span>
              <h2>{selectedArt.title}</h2>
              <p>{selectedArt.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}