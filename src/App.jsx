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

const SOURCE_ARTWORKS = [
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

/**
 * Source: BuynsellArt_Eser_Katalogu_Guncel.xlsx.
 * Dimensions below are the catalogued physical sizes, in cm (width x height).
 * We do NOT infer dimensions from source-image pixel resolution.
 * Entries without a verified catalog dimension remain explicitly unverified.
 */
const VERIFIED_ARTWORK_DIMENSIONS_CM = {
  1: [50, 70],
  2: [50, 70],
  4: [30, 50],
  5: [30, 50],
  6: [30, 50],
  7: [25, 35],
  8: [24, 32.8],
  9: [40, 30],
  10: [30, 40],
  11: [30, 40],
  12: [30, 50],
  13: [30, 50],
  14: [30, 50],
  15: [30, 50],
  16: [30, 50],
  17: [30, 50],
  18: [24, 32.8],
  19: [50, 70],
  20: [40, 70],
  23: [20, 40],
  24: [20, 40],
  25: [15, 30],
  26: [30, 50],
  27: [30, 50],
  28: [30, 50],
  29: [30, 50],
  30: [30, 40],
  31: [30, 40],
  32: [30, 40],
  33: [15, 25],
  981: [15, 25],
  982: [15, 25],
  984: [30, 50],
};

const DISPLAY_SCALE = 1.7;
const MISSING_DIMENSION_PREVIEW = { height: 0.85, tier: 'unverified' };

function measureArtwork(art) {
  const physical = VERIFIED_ARTWORK_DIMENSIONS_CM[art.id];
  if (!physical) return { ...MISSING_DIMENSION_PREVIEW };
  const [widthCm, heightCm] = physical;
  const longSide = Math.max(widthCm, heightCm);
  const tier = longSide <= 36 ? 'small' : longSide <= 50 ? 'medium' : 'large';
  return {
    height: heightCm / 100 * DISPLAY_SCALE,
    width: widthCm / 100 * DISPLAY_SCALE,
    tier,
    physicalWidthCm: widthCm,
    physicalHeightCm: heightCm
  };
}

const STACK_ROWS = { small: 3, medium: 2, large: 1, unverified: 2 };
const STACK_GAP = 0.18;
const WALL_CENTER_Y = 2.05;

function stackWall(artworks, axis, min, max) {
  const columns = [];
  for (const art of artworks) {
    const measured = measureArtwork(art);
    const last = columns[columns.length - 1];
    if (last && last.tier === measured.tier && last.items.length < STACK_ROWS[measured.tier]) {
      last.items.push({ art, measured });
    } else {
      columns.push({ tier: measured.tier, items: [{ art, measured }] });
    }
  }
  return columns.flatMap((column, index) => {
    const along = columns.length === 1 ? (min + max) / 2 : min + (max - min) * index / (columns.length - 1);
    const fullHeight = column.items.reduce((n, item) => n + item.measured.height, 0) +
      STACK_GAP * (column.items.length - 1);
    let cursor = WALL_CENTER_Y + fullHeight / 2;
    return column.items.map(({ art, measured }) => {
      const centerY = cursor - measured.height / 2;
      cursor -= measured.height + STACK_GAP;
      const position = [...art.position];
      position[axis] = along;
      position[1] = centerY;
      return { ...art, ...measured, position };
    });
  });
}

const ARTWORKS = [
  ...stackWall(SOURCE_ARTWORKS.filter(art => art.position[0] < -11), 2, -15.0, 12.0),
  ...stackWall(SOURCE_ARTWORKS.filter(art => art.position[0] > 11), 2, -15.0, 12.0),
  ...stackWall(SOURCE_ARTWORKS.filter(art => art.position[2] < -17 && art.id !== 33), 0, -10.0, 10.0)
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

const SOURCE_WING_ARTWORKS = [
  { id: 981, title: 'Sunflower Vase II', file: '/artworks/33-DSC00924.JPG', position: [-8.2, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 },
  { id: 982, title: 'Sunflower Vase III', file: '/artworks/33-DSC00925.JPG', position: [-6.0, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 },
  { id: 983, title: 'Emerald Rose', file: '/artworks/34-DSC00670.JPG', position: [6.0, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 },
  { id: 984, title: 'Tulips', file: '/artworks/35-tulip1.jpg', position: [8.2, 1.8, 13.95], rotation: [0, Math.PI, 0], height: 1.1 }
];

/** The three small sunflower paintings are a single curated 15 x 25 cm vertical column. */
const SMALL_SUNFLOWER_TRIO = [
  SOURCE_ARTWORKS.find(art => art.id === 33),
  ...SOURCE_WING_ARTWORKS.filter(art => art.id === 981 || art.id === 982)
].map(art => ({
  ...art,
  position: [-8.15, art.position[1], 13.95],
  rotation: [0, Math.PI, 0]
}));
const WING_ARTWORKS = [
  ...stackWall(SMALL_SUNFLOWER_TRIO, 0, -8.15, -8.15),
  ...SOURCE_WING_ARTWORKS.filter(art => art.id !== 981 && art.id !== 982)
    .map(art => ({ ...art, ...measureArtwork(art) }))
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

  const frameWidth = art.width || (art.height || 1.1) * aspect;
  const frameHeight = art.height || 1.1;

  return (
    <group userData={{ navigationArtwork: art }} position={art.position} rotation={art.rotation}
      onClick={(e) => { e.stopPropagation(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <mesh position={[0, 0, -0.025]}>
        <boxGeometry args={[frameWidth + 0.115, frameHeight + 0.115, 0.038]} />
        <meshStandardMaterial color={hovered ? '#a48e70' : '#6a5948'} roughness={0.72} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[frameWidth + 0.07, frameHeight + 0.07]} />
        <meshBasicMaterial color="#f9f7f1" />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
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

  // Each painting in the two four-part works measures 30 x 40 cm.
  const pW = 0.30 * DISPLAY_SCALE;
  const pH = 0.40 * DISPLAY_SCALE;
  const gap = 0.065;

  return (
    <group userData={{ navigationArtwork: { ...setInfo, file: setInfo.files[0], physicalWidthCm: 30, physicalHeightCm: 40 } }} position={setInfo.position} rotation={setInfo.rotation}
      onClick={(e) => e.stopPropagation()}
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
        <meshStandardMaterial color={hovered ? '#a48e70' : '#6a5948'} roughness={0.72} />
      </mesh>
    </group>
  );
}

function GalleryDoor() {
  return (
    <group position={[0, 0, 14.0]}>
      <mesh position={[-1.1, 1.8, 0]}><boxGeometry args={[0.2, 3.6, 0.3]} /><meshStandardMaterial color="#b2a699" /></mesh>
      <mesh position={[1.1, 1.8, 0]}><boxGeometry args={[0.2, 3.6, 0.3]} /><meshStandardMaterial color="#b2a699" /></mesh>
      <mesh position={[0, 3.55, 0]}><boxGeometry args={[2.4, 0.2, 0.3]} /><meshStandardMaterial color="#b2a699" /></mesh>
      <group position={[-1.0, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
        <mesh position={[0.5, 1.7, 0]}><boxGeometry args={[1.0, 3.3, 0.08]} /><meshStandardMaterial color="#c4b7a7" /></mesh>
      </group>
      <group position={[1.0, 0, 0]} rotation={[0, -Math.PI / 3, 0]}>
        <mesh position={[-0.5, 1.7, 0]}><boxGeometry args={[1.0, 3.3, 0.08]} /><meshStandardMaterial color="#c4b7a7" /></mesh>
      </group>
    </group>
  );
}


const GALLERY_PALETTE = {
  wall: '#ede7db',
  floor: '#c9bfaf',
  trim: '#d1c7b8',
  ceiling: '#292a29',
  brass: '#b59a6e'
};

function GalleryArchitecture() {
  // Simple baked-feeling architecture rather than expensive dynamic shadows.
  const strips = [-16, -10, -4, 2, 8, 12];
  return (
    <group>
      <mesh position={[0, -0.08, -2]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 36]} />
        <meshStandardMaterial color={GALLERY_PALETTE.floor} roughness={0.76} metalness={0.045} />
      </mesh>
      {/* Micro-joints convey a limestone floor without adding any bitmap textures. */}
      {Array.from({ length: 12 }, (_, index) => (
        <mesh key={'floor-joint-'+index} position={[0, -0.067, -18 + index * 2.9]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[25.8, 0.018]} />
          <meshBasicMaterial color="#a6a093" transparent opacity={0.18} />
        </mesh>
      ))}
      <mesh position={[0, 4.2, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 36]} />
        <meshStandardMaterial color={GALLERY_PALETTE.ceiling} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-12, 2.1, -2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[36, 4.2]} />
        <meshStandardMaterial color={GALLERY_PALETTE.wall} roughness={0.98} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[12, 2.1, -2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[36, 4.2]} />
        <meshStandardMaterial color={GALLERY_PALETTE.wall} roughness={0.98} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.1, -19]}>
        <planeGeometry args={[24, 4.2]} />
        <meshStandardMaterial color={GALLERY_PALETTE.wall} roughness={0.98} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2.1, 15]}>
        <planeGeometry args={[24, 4.2]} />
        <meshStandardMaterial color={GALLERY_PALETTE.wall} roughness={0.98} side={THREE.DoubleSide} />
      </mesh>
      {/* Thin classical shadow-line at the base of each wall. */}
      {[[-11.96,0.09,-2,0.08,0.18,36],[11.96,0.09,-2,0.08,0.18,36],[0,0.09,-18.96,24,0.18,0.08],[0,0.09,14.96,24,0.18,0.08]].map(([x,y,z,w,h,d],index) => (
        <mesh key={'base-'+index} position={[x,y,z]}>
          <boxGeometry args={[w,h,d]} />
          <meshStandardMaterial color={GALLERY_PALETTE.trim} roughness={0.88} />
        </mesh>
      ))}
      {/* Recessed architectural ceiling rails, slim and deliberately unobtrusive. */}
      {[-8.1,8.1].map((x) => (
        <group key={'track-'+x}>
          <mesh position={[x, 4.125, -2]}>
            <boxGeometry args={[0.055,0.09,30]} />
            <meshStandardMaterial color="#b39c79" roughness={0.38} metalness={0.65} />
          </mesh>
          {strips.map((z) => (
            <group key={'spot-'+z} position={[x,4.01,z]}>
              <mesh><cylinderGeometry args={[0.10,0.10,0.20,10]} /><meshStandardMaterial color="#b7a58e" /></mesh>
              <mesh position={[0,-0.13,0]} rotation={[-Math.PI/2,0,0]}>
                <circleGeometry args={[0.085,12]} />
                <meshBasicMaterial color="#fff5e4" />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Upper and lower architectural shadow reveals: restrained museum detailing. */}
      {[[-11.93, 3.93, -2, 0.065, 0.065, 35.8],
        [11.93, 3.93, -2, 0.065, 0.065, 35.8],
        [0, 3.93, -18.93, 23.9, 0.065, 0.065],
        [0, 3.93, 14.93, 23.9, 0.065, 0.065]].map(([x, y, z, w, h, d], index) => (
        <mesh key={'reveal-' + index} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshBasicMaterial color="#5a534b" />
        </mesh>
      ))}
      {/* Brushed metal gallery line — warm brass, not decorative gold. */}
      {[[-11.9, 3.78, -2, 0.035, 0.025, 35.7],
        [11.9, 3.78, -2, 0.035, 0.025, 35.7],
        [0, 3.78, -18.9, 23.7, 0.025, 0.035],
        [0, 3.78, 14.9, 23.7, 0.025, 0.035]].map(([x, y, z, w, h, d], index) => (
        <mesh key={'brass-'+index} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={GALLERY_PALETTE.brass} metalness={0.72} roughness={0.32} />
        </mesh>
      ))}
      {/* Monumental vertical wall bays create depth without interfering with artworks. */}
      {[-11.94, 11.94].flatMap((x) => [-18.2, 14.0].map((z) => (
        <group key={'column-'+x+'-'+z} position={[x, 2.0, z]}>
          <mesh>
            <boxGeometry args={[0.12, 4.0, 0.21]} />
            <meshStandardMaterial color="#ddd5c8" roughness={0.92} />
          </mesh>
          <mesh position={[0,1.98,0]}>
            <boxGeometry args={[0.15,0.04,0.25]} />
            <meshStandardMaterial color="#b7a287" roughness={0.5} metalness={0.12} />
          </mesh>
        </group>
      )))}
      {/* Quiet illuminated opening: the space reads as a designed gallery, not a box. */}
      {[-1,1].map((side) => (
        <group key={'entrance-reveal-'+side}>
          <mesh position={[side*1.28,2.0,14.86]}>
            <boxGeometry args={[0.075,3.85,0.11]} />
            <meshStandardMaterial color="#a58c6e" metalness={0.45} roughness={0.46}/>
          </mesh>
          <mesh position={[side*1.42,2.0,14.83]}>
            <boxGeometry args={[0.04,3.6,0.09]} />
            <meshBasicMaterial color="#ffe6b9" toneMapped={false} />
          </mesh>
        </group>
      ))}
      {/* Soft architectural pools of light, no high-resolution shadows required. */}
      <pointLight position={[0,3.45,-17.8]} intensity={18} distance={10} decay={2} color="#f8dbac"/>
      <pointLight position={[0,3.45,13.5]} intensity={13} distance={10} decay={2} color="#f8dbac"/>
      <spotLight position={[-7, 4.02, -11]} intensity={30} angle={0.75} penumbra={0.9} distance={19} color="#fff0d8" />
      <spotLight position={[7, 4.02, -11]} intensity={35} angle={0.75} penumbra={0.9} distance={19} color="#fff0d8" />
      <spotLight position={[-7, 4.02, 6]} intensity={26} angle={0.7} penumbra={0.95} distance={17} color="#fff0df" />
      <spotLight position={[7, 4.02, 6]} intensity={28} angle={0.7} penumbra={0.95} distance={17} color="#fff0df" />
    </group>
  );
}


const TOUR_STOP_SECONDS = 12; // Curated viewing pause for each work.
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
function GalleryNavigation({ navigationRef, tourRef, onArtworkReached, onTourFinished, onTourInterrupted, onTourArrived, onTourDeparted }) {
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
  const tourHoldRemaining = useRef(0);
  const onArtworkReachedRef = useRef(onArtworkReached);
  const onTourFinishedRef = useRef(onTourFinished);
  const onTourInterruptedRef = useRef(onTourInterrupted);
  const onTourArrivedRef = useRef(onTourArrived);
  const onTourDepartedRef = useRef(onTourDeparted);

  useEffect(() => { onArtworkReachedRef.current = onArtworkReached; }, [onArtworkReached]);
  useEffect(() => { onTourFinishedRef.current = onTourFinished; }, [onTourFinished]);
  useEffect(() => { onTourInterruptedRef.current = onTourInterrupted; }, [onTourInterrupted]);
  useEffect(() => { onTourArrivedRef.current = onTourArrived; }, [onTourArrived]);
  useEffect(() => { onTourDepartedRef.current = onTourDeparted; }, [onTourDeparted]);

  useEffect(() => {
    navigationRef.current = {
      stop() { destination.current = null; pendingArt.current = null; lookAt.current = null; tourHoldRemaining.current = 0; tourRef.current = false; onTourDepartedRef.current(); },
      goTo(art) {
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = art;
      },
      startTour() {
        onTourDepartedRef.current();
        tourRef.current = true;
        currentTourIndex.current = 0;
        tourHoldRemaining.current = 0;
        const art = ALL_STOPS[0];
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = null;
      },
      next() {
        onTourDepartedRef.current();
        tourRef.current = true;
        tourHoldRemaining.current = 0;
        currentTourIndex.current = (currentTourIndex.current + 1) % ALL_STOPS.length;
        const art = ALL_STOPS[currentTourIndex.current];
        destination.current = artworkDestination(art);
        lookAt.current = new THREE.Vector3(...art.position);
        pendingArt.current = null;
      },
      previous() {
        onTourDepartedRef.current();
        tourRef.current = true;
        tourHoldRemaining.current = 0;
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
      tourHoldRemaining.current = 0;
      tourRef.current = false;
      onTourInterruptedRef.current();
      onTourDepartedRef.current();
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
        tourHoldRemaining.current = 0;
        tourRef.current = false;
        onTourInterruptedRef.current();
        onTourDepartedRef.current();
        return;
      }
      const ground = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, ground)) {
        destination.current = validDestination(ground);
        lookAt.current = null;
        pendingArt.current = null;
        tourHoldRemaining.current = 0;
        tourRef.current = false;
        onTourInterruptedRef.current();
        onTourDepartedRef.current();
      }
    };
    const onWheel = (event) => {
      event.preventDefault();
      destination.current = null;
      lookAt.current = null;
      pendingArt.current = null;
      tourHoldRemaining.current = 0;
      tourRef.current = false;
      onTourInterruptedRef.current();
      onTourDepartedRef.current();
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
    // A deliberate museum-style pause after the camera arrives at each artwork.
    // Use the render loop so stopping a tour cancels the pause immediately.
    const dt = Math.min(delta, 0.05);
    if (!destination.current && tourRef.current && tourHoldRemaining.current > 0) {
      tourHoldRemaining.current = Math.max(0, tourHoldRemaining.current - dt);
      if (tourHoldRemaining.current === 0) {
        onTourDepartedRef.current();
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
    if (destination.current) {
      const to = targetDirection.current.copy(destination.current).sub(camera.position);
      to.y = 0;
      const remaining = to.length();
      if (remaining > 0.055) {
        // Ease out during the final approach instead of snapping to the painting.
        const approachFactor = THREE.MathUtils.smoothstep(remaining, 0, 1.85);
        const speed = WALK_SPEED * THREE.MathUtils.lerp(0.24, 1, approachFactor);
        const step = Math.min(remaining, speed * dt);
        camera.position.addScaledVector(to.normalize(), step);
      } else {
        camera.position.copy(destination.current);
        destination.current = null;
        if (pendingArt.current) {
          onArtworkReachedRef.current(pendingArt.current);
          pendingArt.current = null;
        }
        if (tourRef.current) {
          // Keep looking at the artwork instead of moving to the next one instantly.
          tourHoldRemaining.current = TOUR_STOP_SECONDS;
          onTourArrivedRef.current(ALL_STOPS[currentTourIndex.current]);
        }
      }
    }
    camera.position.y = CAMERA_HEIGHT;
    if (lookAt.current) {
      const desired = new THREE.Quaternion();
      const matrix = new THREE.Matrix4().lookAt(camera.position, lookAt.current, camera.up);
      desired.setFromRotationMatrix(matrix);
      camera.quaternion.slerp(desired, Math.min(1, dt * 4));
    }
  });
  return null;
}



/**
 * Guided-tour presentation.
 * The first three seconds focus exclusively on the original painting.
 * A split editorial panel then opens and the verified description types in.
 * The image remains unaltered; this is an interface-level movement.
 */
function artworkInfoText(art) {
  const dimensions = art.physicalWidthCm && art.physicalHeightCm
    ? `Dimensions: ${art.physicalWidthCm} × ${art.physicalHeightCm} cm.`
    : 'Dimensions: awaiting confirmation.';
  const category = art.category ? `Category: ${art.category}.` : '';
  const description = art.description || '';
  return [`Artist: ${ARTIST_INFO.name}.`, dimensions, category, description].filter(Boolean).join('  ');
}

function GuidedArtworkPresentation({ art, onClose, onNext }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(0);
  const copy = useMemo(() => artworkInfoText(art), [art]);

  useEffect(() => {
    setVisible(false);
    setExpanded(false);
    setCount(0);
    // The camera has already arrived. Reveal the work gradually over the 3D view,
    // rather than mounting a fully opaque fullscreen artwork in a single frame.
    const frame = window.requestAnimationFrame(() => setVisible(true));
    const timeout = window.setTimeout(() => setExpanded(true), 3000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [art]);

  useEffect(() => {
    if (!expanded) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(copy.length);
      return undefined;
    }
    const interval = window.setInterval(() => {
      setCount(previous => Math.min(copy.length, previous + 2));
    }, 38);
    return () => window.clearInterval(interval);
  }, [expanded, copy]);

  const files = art.files || [art.file];
  return (
    <aside className={`tour-feature ${visible ? 'tour-feature--visible' : ''} ${expanded ? 'tour-feature--expanded' : ''}`}
      aria-label={`Guided tour information: ${art.title}`}>
      <div className="tour-feature-backdrop" />
      <div className="tour-feature-inner">
        <div className="tour-feature-art">
          <div className={`tour-feature-images ${files.length > 1 ? 'tour-feature-images--set' : ''}`}>
            {files.map((file, index) =>
              <img key={file} src={file} alt={files.length > 1 ? `${art.title}, panel ${index + 1}` : art.title} />
            )}
          </div>
          <span className="tour-feature-art-index">PRIVATE COLLECTION <span> / </span> Z. ÖZÇELİK</span>
        </div>
        <div className="tour-feature-information" aria-hidden={!expanded}>
          <div className="tour-feature-information-inner">
            <span className="tour-feature-eyebrow">WORKS & STORIES</span>
            <h2>{art.title}</h2>
            <div className="tour-feature-rule" />
            <p className="tour-feature-typewriter" aria-label={copy}>
              <span aria-hidden="true">{copy.slice(0, count)}</span>
              {count < copy.length && <span aria-hidden="true" className="tour-feature-caret">▍</span>}
            </p>
            <span className="tour-feature-footnote">GUIDED EXHIBITION · ORIGINAL ARTWORK</span>
          </div>
        </div>
      </div>
      <div className="tour-feature-commands">
        <button type="button" onClick={onNext} className="tour-feature-next">Next artwork ↗</button>
        <button type="button" onClick={onClose} className="tour-feature-dismiss"
          aria-label="Exit the artwork presentation and stop guided tour">×</button>
      </div>
    </aside>
  );
}

export default function App() {
  const [selectedArt, setSelectedArt] = useState(null);
  const [entered, setEntered] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [tourArtwork, setTourArtwork] = useState(null);
  const navigationRef = useRef(null);
  const tourRef = useRef(false);
  const startTour = () => { setEntered(true); setSelectedArt(null); setTourArtwork(null); navigationRef.current?.startTour(); setTourActive(true); };
  const stopTour = () => { navigationRef.current?.stop(); setTourArtwork(null); setTourActive(false); };
  const nextStop = () => { setEntered(true); setSelectedArt(null); setTourArtwork(null); navigationRef.current?.next(); setTourActive(true); };

  return (
    <main className="canvas-container">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 1.7, 9.7], fov: 65, near: 0.1, far: 80 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <color attach="background" args={['#dcd2c5']} />
        <fog attach="fog" args={['#dcd2c5', 26, 58]} />
        <hemisphereLight args={['#fff7eb', '#9a8e7c', 1.5]} />
        <ambientLight intensity={0.7} color="#fffaf1" />
        <directionalLight position={[-2, 12, 8]} intensity={1.1} color="#fff1de" />
        <GalleryNavigation navigationRef={navigationRef} tourRef={tourRef}
          onArtworkReached={(art) => { setSelectedArt(art); setTourActive(false); }}
          onTourInterrupted={() => { setTourActive(false); setTourArtwork(null); }}
          onTourArrived={(art) => setTourArtwork(art)}
          onTourDeparted={() => setTourArtwork(null)}
          onTourFinished={() => { setTourActive(false); setTourArtwork(null); }} />
        <GalleryArchitecture />
        <GalleryDoor />
        {ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} />)}
        {GRID_SETS.map((setInfo) => <GridArtSet key={setInfo.id} setInfo={setInfo} />)}
        {WING_ARTWORKS.map((art) => <ArtFrame key={art.id} art={art} />)}
      </Canvas>

      <header className="museum-header">
        <div className="museum-identity">
          <span className="museum-kicker">AN INDEPENDENT VIRTUAL EXHIBITION</span>
          <span className="museum-name">Zeynep Özçelik <i>—</i> Works</span>
        </div>
        <div className="museum-header-actions">
          <button className={tourActive ? 'is-active' : ''} type="button" onClick={tourActive ? stopTour : startTour} aria-label={tourActive ? 'Pause guided tour' : 'Start 12-second-per-artwork guided tour'}>
            {tourActive ? 'Pause tour' : 'Guided tour · 12s / work'}
          </button>
          <button type="button" onClick={nextStop}>Next work <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      {!entered && (
        <section className="welcome-card" aria-label="Enter exhibition">
          <span className="welcome-eyebrow">THE ONLINE EXHIBITION · VOLUME 01</span>
          <h1>Art deserves<br/><em>room to breathe.</em></h1>
          <p>An intimate collection of paintings and studies, presented at their individual scale. Wander freely, take a closer look, or enjoy a curated walk.</p>
          <div className="welcome-actions">
            <button type="button" className="primary-action" onClick={() => setEntered(true)}>Enter gallery <span aria-hidden="true">↗</span></button>
            <button type="button" className="quiet-action" onClick={startTour}>Take a guided tour</button>
          </div>
          <div className="welcome-rule"><span>CURATED BY GRADPIXEL</span><span>OPEN 24 HOURS</span></div>
        </section>
      )}

      {entered && (
        <footer className="museum-footer">
          <div className="museum-help"><span className="help-dot" aria-hidden="true"/> Click floor to walk <span className="help-separator">·</span> Click art to explore <span className="help-separator">·</span> Drag to look</div>
          <button type="button" onClick={stopTour} disabled={!tourActive}>Stop motion</button>
        </footer>
      )}

      {tourArtwork && tourActive && (
        <GuidedArtworkPresentation key={tourArtwork.id} art={tourArtwork} onClose={stopTour} onNext={nextStop} />
      )}

      {selectedArt && (
        <div className="modal-overlay" onClick={() => setSelectedArt(null)}>
          <section className="modal-content" role="dialog" aria-modal="true" aria-label={selectedArt.title} onClick={event => event.stopPropagation()}>
            <button className="modal-close-btn" aria-label="Close artwork details" onClick={() => setSelectedArt(null)}>×</button>
            <div className={selectedArt.files ? 'modal-img-wrapper set-preview' : 'modal-img-wrapper'}>
              {selectedArt.files
                ? selectedArt.files.map((file,index) => <img key={file} src={file} alt={`${selectedArt.title} — panel ${index+1}`} />)
                : <img src={selectedArt.file} alt={selectedArt.title} />}
            </div>
            <div className="modal-body">
              <span className="modal-tag">SELECTED WORK</span>
              <h2>{selectedArt.title}</h2>
              <p className="artist-byline">Zeynep Özçelik</p>
              {selectedArt.physicalWidthCm ? <p className="art-dimensions">{selectedArt.physicalWidthCm} × {selectedArt.physicalHeightCm} cm</p> : <p className="art-dimensions">Dimensions pending verification</p>}
              {selectedArt.description && <p className="art-desc">{selectedArt.description}</p>}
              <div className="modal-actions-row">
                <a href={ARTIST_INFO.instagram} target="_blank" rel="noreferrer" className="modal-action-btn">View artist profile ↗</a>
                <a href={`mailto:${ARTIST_INFO.email}?subject=Artwork inquiry: ${encodeURIComponent(selectedArt.title)}`} className="modal-action-btn">Enquire about this work ↗</a>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
