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

// TÜM TEKİL ESERLERİN YENİ VE BİRLEŞTİRİLMİŞ LİSTESİ (SOL, SAĞ VE ARKA DUVARLAR)
const ARTWORKS = [
  // --- SOL DUVAR (X = -11.88) ---
  { id: 1, title: 'Balloon Float', file: '/artworks/1-baloon.png', position: [-11.88, 1.8, -14.0], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 2, title: 'Strawberry Bloom', file: '/artworks/2-straw.png', position: [-11.88, 1.8, -10.5], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 3, title: 'Botanical Study 3', file: '/artworks/3-DSC00648.JPG', position: [-11.88, 1.8, -7.0], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 4, title: 'Morning Daisies I', file: '/artworks/4-daisies1.jpg', position: [-11.88, 1.8, -3.5], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 5, title: 'Morning Daisies II', file: '/artworks/5-daisies2.JPG', position: [-11.88, 1.8, 0.0], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 6, title: 'Morning Daisies III', file: '/artworks/6-daisies3.JPG', position: [-11.88, 1.8, 3.5], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 7, title: 'Drapery in Repose', file: '/artworks/7-bust1.jpg', position: [-11.88, 1.8, 7.0], rotation: [0, Math.PI / 2, 0], height: 1.2 },
  { id: 8, title: 'Sentinel of the Tides', file: '/artworks/8-lighthouse1.jpg', position: [-11.88, 1.8, 10.5], rotation: [0, Math.PI / 2, 0], height: 1.2 },

  // --- SAĞ DUVAR (X = 11.88) ---
  { id: 9, title: 'Lily in Monochrome', file: '/artworks/9-lillies4.jpg', position: [11.88, 1.8, -14.0], rotation: [0, -Math.PI / 2, 0], height: 1.2 },
  { id: 10, title: 'White Rose in Negative', file: '/artworks/10-rose1.jpg', position: [11.88, 1.8, -10.5], rotation: [0, -Math.PI / 2, 0], height: 1.2 },
  { id: 11, title: 'Whispering Stem', file: '/artworks/11-rose2.jpg', position: [11.88, 1.8, -7.0], rotation: [0, -Math.PI / 2, 0], height: 1.2 },
  { id: 12, title: 'Still Life with Decanter', file: '/artworks/12-roses3.jpg', position: [11.88, 1.8, -3.5], rotation: [0, -Math.PI / 2, 0], height: 1.2 },
  { id: 13, title: 'Nocturne Botanical', file: '/artworks/13-inkflower1.jpg', position: [11.88, 1.8, 0.0], rotation: [0, -Math.PI / 2, 0], height: 1.2 },
  { id: 14, title: 'Midnight Vintage', file: '/artworks/14-wine1.jpg', position: [11.88, 1.8, 3.5], rotation: [0, -Math.PI / 2, 0], height: 1.2 },
  { id: 15, title: 'Bouquet of Grace', file: '/artworks/15-DSC00922.JPG', position: [11.88, 1.8, 7.0], rotation: [0, -Math.PI / 2, 0], height: 1.2 },
  { id: 16, title: 'November Serenity', file: '/artworks/16-flower11.11.23.png', position: [11.88, 1.8, 10.5], rotation: [0, -Math.PI / 2, 0], height: 1.2 },

  // --- ARKA DUVAR (Z = -17.85 - KAPIDAN ESKİDEN ÖN DUVARDA OLAN 6 ESER BURAYA TAŞINDI) ---
  // Bu eserleri 4'lü setlerin etrafına simetrik olarak dizdim
  { id: 17, title: 'Azure Solitude', file: '/artworks/17-flower07-11-23.png', position: [-9.0, 2.5, -17.85], rotation: [0, 0, 0], height: 1.2 }, // Sol üst
  { id: 18, title: 'Mediterranean Reverie', file: '/artworks/18-bycycle1.jpg', position: [-9.0, 1.0, -17.85], rotation: [0, 0, 0], height: 1.2 }, // Sol alt
  { id: 19, title: 'Gilded Sunflower', file: '/artworks/19-sunflower2.jpg', position: [-4.5, 3.1, -17.85], rotation: [0, 0, 0], height: 1.2 }, // Sol 4'lünün üzerinde
  { id: 20, title: 'Iris at Twilight', file: '/artworks/20-DSC00927.JPG', position: [4.5, 3.1, -17.85], rotation: [0, 0, 0], height: 1.2 }, // Sağ 4'lünün üzerinde
  { id: 23, title: 'Red Poppy I', file: '/artworks/23poppy1.jpg', position: [9.0, 2.5, -17.85], rotation: [0, 0, 0], height: 1.2 }, // Sağ üst
  { id: 24, title: 'Red Poppy II', file: '/artworks/24poppy2.jpg', position: [9.0, 1.0, -17.85], rotation: [0, 0, 0], height: 1.2 } // Sağ alt
];

// 4'LÜ SETLER (KAPININ İKİ YANINA TAŞINDI)
const GRID_SETS = [
  {
    id: 'flamingo-set',
    title: 'Flamingo Polyptych',
    category: 'Oil Painting Set',
    description: 'A four-panel unified set forming an elegant stylized flamingo composition.',
    position: [-4.5, 1.8, 13.95], // Kapının Sol Yanı
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
    position: [4.5, 1.8, 13.95], // Kapının Sağ Yanı
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

  const frameWidth = (art.height || 1.2) * aspect;
  const frameHeight = art.height || 1.2;

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

  const pW = 0.85;
  const pH = 1.15;
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
        <mesh position={[-0