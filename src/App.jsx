import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

// =======================================================
// 53 DOSYALIK EKSİKSİZ KOLEKSİYON HARİTASI
// =======================================================
const ARTWORKS = [
  // --- 1. GİRİŞ KORİDORU: SOL DUVAR (DOĞA & BOTANİK) ---
  {
    id: 1,
    title: 'Karahindiba I',
    category: 'Botanik',
    file: '/artworks/dandelion1.png',
    description: 'Dokusal ve uçuşan hatlarıyla karahindiba.',
    position: [-2.9, 1.8, 8.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.2
  },
  {
    id: 2,
    title: 'Karahindiba II',
    category: 'Botanik',
    file: '/artworks/dandelion2.jpg',
    description: 'Karahindiba tohum ve tonlama etüdü.',
    position: [-2.9, 1.8, 6.2],
    rotation: [0, Math.PI / 2, 0],
    height: 1.2
  },
  {
    id: 3,
    title: 'Deniz Kabuğu',
    category: 'Etüt',
    file: '/artworks/seashell08-11-23.png',
    description: 'Spiral form ve heykelsi gölgeler.',
    position: [-2.9, 1.8, 4.0],
    rotation: [0, Math.PI / 2, 0],
    height: 1.2
  },
  {
    id: 4,
    title: 'Çilek & Yapraklar',
    category: 'Renk & Doku',
    file: '/artworks/straw07-11-23.png',
    description: 'Canlı kırmızı ve yeşil tonlarıyla natürmort.',
    position: [-2.9, 1.8, 1.8],
    rotation: [0, Math.PI / 2, 0],
    height: 1.2
  },

  // --- 2. GİRİŞ KORİDORU: SAĞ DUVAR (ÇİÇEKLER & PEYZAJ) ---
  {
    id: 5,
    title: 'Papatyalar I',
    category: 'Papatya Serisi',
    file: '/artworks/DSC00634.JPG',
    description: 'Papatya serisinin açılış tablosu.',
    position: [2.9, 1.8, 8.5],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.2
  },
  {
    id: 6,
    title: 'Papatyalar II',
    category: 'Papatya Serisi',
    file: '/artworks/DSC00635.JPG',
    description: 'Mavi vazoda papatyalar.',
    position: [2.9, 1.8, 6.2],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.2
  },
  {
    id: 7,
    title: 'Papatyalar III',
    category: 'Papatya Serisi',
    file: '/artworks/daisies.jpg',
    description: 'Zarif papatya kompozisyonu.',
    position: [2.9, 1.8, 4.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.2
  },
  {
    id: 8,
    title: 'Balonlar & Kır Bahçesi',
    category: 'Dışavurumcu Peyzaj',
    file: '/artworks/baloon10-11-23.png',
    description: 'Gökyüzüne yükselen renkli balonlar.',
    position: [2.9, 1.8, 1.8],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.2
  },

  // --- 3. BÜYÜK SALON: KARŞI DUVAR (BAŞYAPITLAR) ---
  {
    id: 9,
    title: 'Şarap & Kadeh',
    category: 'Klasik Natürmort',
    file: '/artworks/wine1.jpg',
    description: 'Koyu zemin üzerinde cam ışıltısı ve zengin bordo tonlar.',
    position: [-8.5, 2.1, -17.9],
    rotation: [0, 0, 0],
    height: 1.6
  },
  {
    id: 10,
    title: 'Ayçiçeği Portresi',
    category: 'Yağlıboya',
    file: '/artworks/sunflower2.jpg',
    description: 'Mavi gökyüzü önünde parlayan enerjik ayçiçeği.',
    position: [-4.8, 2.1, -17.9],
    rotation: [0, 0, 0],
    height: 1.6
  },
  {
    id: 11,
    title: 'Güz Ayçiçeği',
    category: 'Natürmort',
    file: '/artworks/sunflower6-11-23.jpg',
    description: 'Sıcak sonbahar ışığında ayçiçeği kompozisyonu.',
    position: [4.8, 2.1, -17.9],
    rotation: [0, 0, 0],
    height: 1.6
  },
  {
    id: 12,
    title: 'Kasım Çiçekleri',
    category: 'Botanik Tuval',
    file: '/artworks/flower11.11.23.png',
    description: 'Zengin fırça dokularıyla çiçek buketi.',
    position: [8.5, 2.1, -17.9],
    rotation: [0, 0, 0],
    height: 1.6
  },

  // --- 4. BÜYÜK SALON: SOL DUVAR (4'LÜ SETLER & BÜYÜK YAĞLIBOYALAR) ---
  // Flamingo 4'lü Birleşik Puzzle Seti
  {
    id: 13,
    title: 'Flamingo - Sol Üst',
    category: '4’lü Flamingo Serisi',
    file: '/artworks/Flamingo1.JPG',
    description: 'Flamingo kompozisyonu sol üst panel.',
    position: [-11.9, 2.5, -15.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },
  {
    id: 14,
    title: 'Flamingo - Sağ Üst',
    category: '4’lü Flamingo Serisi',
    file: '/artworks/Flamingo2.JPG',
    description: 'Flamingo kompozisyonu sağ üst panel.',
    position: [-11.9, 2.5, -16.35],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },
  {
    id: 15,
    title: 'Flamingo - Sol Alt',
    category: '4’lü Flamingo Serisi',
    file: '/artworks/Flamingo3.JPG',
    description: 'Flamingo kompozisyonu sol alt panel.',
    position: [-11.9, 1.4, -15.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },
  {
    id: 16,
    title: 'Flamingo - Sağ Alt',
    category: '4’lü Flamingo Serisi',
    file: '/artworks/Flamingo4.JPG',
    description: 'Flamingo kompozisyonu sağ alt panel.',
    position: [-11.9, 1.4, -16.35],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },

  // Piece 4'lü Birleşik Puzzle Seti
  {
    id: 17,
    title: 'Piece - Sol Üst',
    category: '4’lü Geometrik Seri',
    file: '/artworks/Piece1.JPG',
    description: 'Geometrik seri sol üst panel.',
    position: [-11.9, 2.5, -12.2],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },
  {
    id: 18,
    title: 'Piece - Sağ Üst',
    category: '4’lü Geometrik Seri',
    file: '/artworks/Piece2.JPG',
    description: 'Geometrik seri sağ üst panel.',
    position: [-11.9, 2.5, -13.05],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },
  {
    id: 19,
    title: 'Piece - Sol Alt',
    category: '4’lü Geometrik Seri',
    file: '/artworks/Piece3.JPG',
    description: 'Geometrik seri sol alt panel.',
    position: [-11.9, 1.4, -12.2],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },
  {
    id: 20,
    title: 'Piece - Sağ Alt',
    category: '4’lü Geometrik Seri',
    file: '/artworks/Piece4.JPG',
    description: 'Geometrik seri sağ alt panel.',
    position: [-11.9, 1.4, -13.05],
    rotation: [0, Math.PI / 2, 0],
    height: 1.05
  },

  // Sol Duvar Yağlıboya Koleksiyonu
  {
    id: 21,
    title: 'Gül Demeti',
    category: 'Yağlıboya Natürmort',
    file: '/artworks/DSC00922.JPG',
    description: 'Vazo içinde pembe ve beyaz güller.',
    position: [-11.9, 2.0, -9.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 22,
    title: 'Gece ve İris',
    category: 'Tuval',
    file: '/artworks/DSC00927.JPG',
    description: 'Koyu tonda iris çiçeği çalışması.',
    position: [-11.9, 2.0, -7.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 23,
    title: 'Zümrüt Gül',
    category: 'Tuval',
    file: '/artworks/DSC00670.JPG',
    description: 'Koyu zümrüt zemin üzerinde kırmızı gül.',
    position: [-11.9, 2.0, -5.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 24,
    title: 'Gül Goncası',
    category: 'Tuval',
    file: '/artworks/DSC00668.JPG',
    description: 'Mavi gökyüzü önünde açan gül.',
    position: [-11.9, 2.0, -3.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 25,
    title: 'Kırmızı Laleler',
    category: 'Tuval',
    file: '/artworks/tulip1.jpg',
    description: 'Siyah fon üzerinde kırmızı lale yaprakları.',
    position: [-11.9, 2.0, -1.5],
    rotation: [0, Math.PI / 2, 0],
    height: 1.35
  },

  // --- 5. BÜYÜK SALON: SAĞ DUVAR (AYÇİÇEĞİ TRİPTİK & MONOKROM/DESEN KOLEKSİYONU) ---
  {
    id: 26,
    title: 'Ayçiçeği Triptik I',
    category: '3’lü Seri',
    file: '/artworks/DSC00923.JPG',
    description: '3 parçalı serinin 1. paneli.',
    position: [11.9, 2.0, -16.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 27,
    title: 'Ayçiçeği Triptik II',
    category: '3’lü Seri',
    file: '/artworks/DSC00924.JPG',
    description: '3 parçalı serinin merkez paneli.',
    position: [11.9, 2.0, -14.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 28,
    title: 'Ayçiçeği Triptik III',
    category: '3’lü Seri',
    file: '/artworks/DSC00925.JPG',
    description: '3 parçalı serinin 3. paneli.',
    position: [11.9, 2.0, -12.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 29,
    title: 'Günebakan Tarlası',
    category: 'Peyzaj',
    file: '/artworks/DSC00918.JPG',
    description: 'Geniş ayçiçeği tarlası peyzajı.',
    position: [11.9, 2.0, -10.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 30,
    title: 'Karakalem Büst',
    category: 'Heykel & Portre',
    file: '/artworks/bust1.jpg',
    description: 'Antik büst ve gölge etüdü.',
    position: [11.9, 2.0, -8.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 31,
    title: 'Mürekkep Çiçek',
    category: 'Desen',
    file: '/artworks/inkflower1.jpg',
    description: 'Mürekkep hatlarıyla botanik etüt.',
    position: [11.9, 2.0, -6.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 32,
    title: 'Monokrom Zambak',
    category: 'Karakalem',
    file: '/artworks/lillies4.jpg',
    description: 'Siyah-beyaz zambak formu.',
    position: [11.9, 2.0, -4.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },
  {
    id: 33,
    title: 'Desen Vazo ve Güller',
    category: 'Karakalem',
    file: '/artworks/roses3.jpg',
    description: 'Grafit çizgileriyle vazo etüdü.',
    position: [11.9, 2.0, -2.0],
    rotation: [0, -Math.PI / 2, 0],
    height: 1.35
  },

  // --- 6. ORTA ADA DUVARI: ÖN VE ARKA YÜZ (ANA YAĞLIBOYA BAŞYAPITLARI) ---
  // Ön Yüz (Girişte Karşılayan Tablolar)
  {
    id: 34,
    title: 'Sarı Çiçekler & Vazo',
    category: 'Ana Koleksiyon Yağlıboya',
    file: '/artworks/DSC00644.JPG',
    description: 'Vazo içinde sarı çiçeklerin zengin fırça tuşesi.',
    position: [-2.6, 2.0, -7.85],
    rotation: [0, 0, 0],
    height: 1.45
  },
  {
    id: 35,
    title: 'Mavi Bahçe Çiçekleri',
    category: 'Ana Koleksiyon Yağlıboya',
    file: '/artworks/DSC00648.JPG',
    description: 'Mavi ve yeşil ahenkli natürmort.',
    position: [0, 2.0, -7.85],
    rotation: [0, 0, 0],
    height: 1.45
  },
  {
    id: 36,
    title: 'Kır Laleleri',
    category: 'Ana Koleksiyon Yağlıboya',
    file: '/artworks/DSC00664.JPG',
    description: 'Pembe ve kırmızı lale alanı.',
    position: [2.6, 2.0, -7.85],
    rotation: [0, 0, 0],
    height: 1.45
  },

  // Arka Yüz (İç Koridordaki Tablolar)
  {
    id: 37,
    title: 'Beyaz Çiçekler & Buket',
    category: 'Ana Koleksiyon Yağlıboya',
    file: '/artworks/DSC00652.JPG',
    description: 'Gri fon üzerinde zarif beyaz çiçekler.',
    position: [-2.6, 2.0, -8.15],
    rotation: [0, Math.PI, 0],
    height: 1.45
  },
  {
    id: 38,
    title: 'Mistik Figüratif Tuval',
    category: 'Ana Koleksiyon',
    file: '/artworks/DSC00657.JPG',
    description: 'Katmanlı doku ve renk ahengi.',
    position: [0, 2.0, -8.15],
    rotation: [0, Math.PI, 0],
    height: 1.45
  },
  {
    id: 39,
    title: 'Soyut Dışavurum',
    category: 'Ana Koleksiyon',
    file: '/artworks/DSC00659.JPG',
    description: 'Dinamik fırça vuruşlarıyla oluşturulmuş tuval.',
    position: [2.6, 2.0, -8.15],
    rotation: [0, Math.PI, 0],
    height: 1.45
  },

  // --- 7. GEÇİŞ KEMERLERİ VE KÖŞE ODAKLARI ---
  {
    id: 40,
    title: 'Bisiklet',
    category: 'Nostalji',
    file: '/artworks/bycycle1.jpg',
    description: 'Mavi kapı ve taş sokakta bisiklet.',
    position: [-7.0, 2.0, 0.05],
    rotation: [0, 0, 0],
    height: 1.45
  },
  {
    id: 41,
    title: 'İris Çiçeği',
    category: 'Renk Armonisi',
    file: '/artworks/iris1.jpg',
    description: 'Mor ve yeşil tonların akışı.',
    position: [7.0, 2.0, 0.05],
    rotation: [0, 0, 0],
    height: 1.45
  },
  {
    id: 42,
    title: 'Calla Lilies',
    category: 'Renk & Form',
    file: '/artworks/calla-lillies1.jpg',
    description: 'Zarif kalalar.',
    position: [-4.0, 2.0, 0.05],
    rotation: [0, 0, 0],
    height: 1.4
  },
  {
    id: 43,
    title: 'Mavi Çiçek Buketi',
    category: 'Botanik Tuval',
    file: '/artworks/bflower07-11-23.png',
    description: 'Canlı mavi detaylar.',
    position: [4.0, 2.0, 0.05],
    rotation: [0, 0, 0],
    height: 1.4
  },
  {
    id: 44,
    title: 'Deniz Feneri',
    category: 'Mimari Karakalem',
    file: '/artworks/lighthouse1.jpg',
    description: 'Kayalıklar üzerinde fener.',
    position: [-7.0, 2.0, -17.9],
    rotation: [0, 0, 0],
    height: 1.4
  },
  {
    id: 45,
    title: 'Gül Çizimi I',
    category: 'Karakalem',
    file: '/artworks/rose1.jpg',
    description: 'Klasik gül deseni.',
    position: [7.0, 2.0, -17.9],
    rotation: [0, 0, 0],
    height: 1.4
  },
  {
    id: 46,
    title: 'Gül Çizimi II',
    category: 'Karakalem',
    file: '/artworks/rose2.jpg',
    description: 'Detaylı yaprak tonlamaları.',
    position: [9.8, 2.0, -17.9],
    rotation: [0, 0, 0],
    height: 1.4
  },
  {
    id: 47,
    title: 'Bahçe Kompozisyonu',
    category: 'Tuval',
    file: '/artworks/DSC00655.JPG',
    description: 'Özel bahçe peyzajı.',
    position: [-9.8, 2.0, -17.9],
    rotation: [0, 0, 0],
    height: 1.4
  },
  {
    id: 48,
    title: 'Pembe Çiçekler',
    category: 'Tuval',
    file: '/artworks/DSC00661.JPG',
    description: 'Vazo içinde pembe çiçekler.',
    position: [-10.5, 2.0, 0.05],
    rotation: [0, 0, 0],
    height: 1.35
  },
  {
    id: 49,
    title: 'Bahar Dalları',
    category: 'Tuval',
    file: '/artworks/DSC00662.JPG',
    description: 'Yeşil yapraklar ve bahar çiçekleri.',
    position: [10.5, 2.0, 0.05],
    rotation: [0, 0, 0],
    height: 1.35
  }
];

// Karakter Hareketi
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

// Birebir Oranlı Eser Çerçevesi
function ArtFrame({ art, onSelect }) {
  const [texture, setTexture] = useState(null);
  const [aspect, setAspect] = useState(1.0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      art.file,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        if (loadedTex.image && loadedTex.image.height > 0) {
          setAspect(loadedTex.image.width / loadedTex.image.height);
        }
        setTexture(loadedTex);
      },
      undefined,
      () => setTexture(null)
    );
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

// 2'Lİ GELİNCİK SETİ (BÜYÜK KARŞI DUVAR MERKEZİNDE TEK ÇERÇEVE)
function PoppiesDiptychFrame({ onSelect }) {
  const [tex1, setTex1] = useState(null);
  const [tex2, setTex2] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/artworks/poppy2.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.repeat.set(0.65, 1);
      tex.offset.set(0, 0);
      setTex1(tex);
    });
    loader.load('/artworks/poppy1.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.repeat.set(0.65, 1);
      tex.offset.set(0, 0);
      setTex2(tex);
    });
  }, []);

  const panelW = 0.95;
  const panelH = 1.5;
  const totalW = panelW * 2;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect({
      title: 'Gelincikler (İkili Diptik Seri)',
      category: 'Dışavurumcu Natürmort',
      file: '/artworks/poppies4.jpg',
      description: 'Tek bir çerçeve içinde birleşen iki parçalı dışavurumcu gelincik kompozisyonu.'
    });
  };

  return (
    <group 
      position={[0, 2.1, -17.9]} 
      rotation={[0, 0, 0]}
      onClick={handleClick}
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
        <boxGeometry args={[totalW + 0.12, panelH + 0.12, 0.04]} />
        <meshStandardMaterial color={hovered ? '#c59b6d' : '#3d2514'} roughness={0.4} />
      </mesh>

      <mesh position={[-panelW / 2, 0, 0.01]}>
        <planeGeometry args={[panelW, panelH]} />
        {tex1 ? (
          <meshBasicMaterial map={tex1} side={THREE.DoubleSide} />
        ) : (
          <meshStandardMaterial color="#c4b5a5" side={THREE.DoubleSide} />
        )}
      </mesh>

      <mesh position={[panelW / 2, 0, 0.01]}>
        <planeGeometry args={[panelW, panelH]} />
        {tex2 ? (
          <meshBasicMaterial map={tex2} side={THREE.DoubleSide} />
        ) : (
          <meshStandardMaterial color="#c4b5a5" side={THREE.DoubleSide} />
        )}
      </mesh>

      <mesh position={[0, 0, 0.015]}>
        <boxGeometry args={[0.02, panelH, 0.01]} />
        <meshStandardMaterial color="#2d1a0e" roughness={0.5} />
      </mesh>

      <mesh position={[0, -(panelH / 2) - 0.1, 0.01]}>
        <planeGeometry args={[1.0, 0.07]} />
        <meshStandardMaterial color="#c5a059" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Çift Kanatlı Ahşap & Cam Kapı
function OpenDoubleDoor() {
  return (
    <group position={[0, 0, 10.2]}>
      <mesh position={[-1.75, 1.8, 0]}>
        <boxGeometry args={[0.12, 3.6, 0.2]} />
        <meshStandardMaterial color="#3d2314" />
      </mesh>
      <mesh position={[1.75, 1.8, 0]}>
        <boxGeometry args={[0.12, 3.6, 0.2]} />
        <meshStandardMaterial color="#3d2314" />
      </mesh>
      <mesh position={[0, 3.55, 0]}>
        <boxGeometry args={[3.6, 0.12, 0.2]} />
        <meshStandardMaterial color="#3d2314" />
      </mesh>

      <group position={[-1.7, 0, 0]} rotation={[0, Math.PI / 2.8, 0]}>
        <mesh position={[0.75, 1.7, 0]}>
          <boxGeometry args={[1.5, 3.3, 0.06]} />
          <meshStandardMaterial color="#4a2e18" />
        </mesh>
        <mesh position={[0.75, 2.1, 0.01]}>
          <planeGeometry args={[1.2, 1.8]} />
          <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[1.35, 1.6, 0.05]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25]} />
          <meshStandardMaterial color="#c5a059" metalness={0.8} />
        </mesh>
      </group>

      <group position={[1.7, 0, 0]} rotation={[0, -Math.PI / 2.8, 0]}>
        <mesh position={[-0.75, 1.7, 0]}>
          <boxGeometry args={[1.5, 3.3, 0.06]} />
          <meshStandardMaterial color="#4a2e18" />
        </mesh>
        <mesh position={[-0.75, 2.1, 0.01]}>
          <planeGeometry args={[1.2, 1.8]} />
          <meshStandardMaterial color="#e0f2fe" transparent opacity={0.4} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-1.35, 1.6, 0.05]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25]} />
          <meshStandardMaterial color="#c5a059" metalness={0.8} />
        </mesh>
      </group>

      <mesh position={[0, 2, 2.5]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial color="#fdfbf7" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// BÜYÜK GALERİ & ORTA ADA DUVARI MİMARİSİ
function GalleryArchitecture() {
  const ecruColor = '#ede7db';
  const floorColor = '#8a5e3d';

  return (
    <group>
      <mesh position={[0, 0, 5.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 11]} />
        <meshStandardMaterial color={floorColor} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 18]} />
        <meshStandardMaterial color={floorColor} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 4.2, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 28]} />
        <meshStandardMaterial color="#faf8f5" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-3, 2, 5.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[11, 4.2]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[3, 2, 5.5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[11, 4.2]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-12, 2.1, -9]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[18, 4.2]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[12, 2.1, -9]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[18, 4.2]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.1, -18]}>
        <planeGeometry args={[24, 4.2]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* ORTA ADA DUVARI */}
      <mesh position={[0, 2.0, -8.0]}>
        <boxGeometry args={[8.0, 3.4, 0.3]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} />
      </mesh>

      <mesh position={[-7.5, 2.1, 0]}>
        <planeGeometry args={[9, 4.2]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[7.5, 2.1, 0]}>
        <planeGeometry args={[9, 4.2]} />
        <meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-2.35, 2, 10.2]}>
        <planeGeometry args={[1.3, 4]} />
        <meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[2.35, 2, 10.2]}>
        <planeGeometry args={[1.3, 4]} />
        <meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 3.7, 10.2]}>
        <planeGeometry args={[3.4, 0.6]} />
        <meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const controlsRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedArt) {
        setSelectedArt(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArt]);

  const handleStart = () => {
    if (controlsRef.current) {
      controlsRef.current.lock();
    }
  };

  const handleArtSelect = (art) => {
    if (controlsRef.current) {
      controlsRef.current.unlock();
    }
    setSelectedArt(art);
  };

  return (
    <div className="canvas-container">
      {isLocked && <div className="crosshair" />}

      {!isLocked && !selectedArt && (
        <div className="instructions-overlay" onClick={handleStart}>
          <div className="instructions-card">
            <h1>SANAL SANAT GALERİSİ</h1>
            <p>53 Eserlik Büyük Koleksiyon Sergisi</p>
            <div className="controls-hint">
              <strong>[W, A, S, D]</strong> ile Yürü &nbsp;|&nbsp; <strong>[Fare]</strong> ile Etrafa Bak
            </div>
            <div className="start-prompt">▶ Galeriye Giriş Yapmak İçin Tıklayın</div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 1.7, 8.8], fov: 70 }}>
        <ambientLight intensity={1.7} color="#ffffff" />
        <directionalLight position={[0, 10, 5]} intensity={1.8} color="#fffcf5" />
        <directionalLight position={[0, 6, -10]} intensity={1.5} color="#ffffff" />

        <PointerLockControls 
          ref={controlsRef} 
          onLock={() => setIsLocked(true)} 
          onUnlock={() => setIsLocked(false)} 
        />
        <PlayerMovement isLocked={isLocked} />

        <GalleryArchitecture />
        <OpenDoubleDoor />

        {ARTWORKS.map(art => (
          <ArtFrame key={art.id} art={art} onSelect={handleArtSelect} />
        ))}

        <PoppiesDiptychFrame onSelect={handleArtSelect} />
      </Canvas>

      {/* Detay Modalı */}
      {selectedArt && (
        <div className="modal-overlay" onClick={() => setSelectedArt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedArt(null)}
            >
              &times;
            </button>
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