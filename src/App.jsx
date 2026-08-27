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

const ARTWORKS = [
  // ========================================================
  // ZONE 1: ENTRANCE CORRIDOR (GRAPHITE & INK 2016)
  // ========================================================
  { 
    id: 1, 
    title: 'Drapery in Repose', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal & Crosshatching', 
    date: '10.05.2016', 
    dimensions: '25x35 cm', 
    file: '/artworks/k-bust1.jpg', 
    description: 'An academic draping etude investigating tactile tension, sculptural folds, and chiaroscuro depths of hanging fabric.', 
    position: [-2.9, 1.8, 8.2], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 2, 
    title: 'Sentinel of the Tides', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '21.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-lighthouse1.jpg', 
    description: 'Monochromatic coastal study capturing a lone maritime lighthouse enduring the winds alongside circling gulls.', 
    position: [-2.9, 1.8, 6.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 3, 
    title: 'Lily in Monochrome', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '13.04.2016', 
    dimensions: '40x30 cm', 
    file: '/artworks/k-lillies4.jpg', 
    description: 'An intimate botanical study focusing on the velvety gradations and delicate curvature of lily petals.', 
    position: [-2.9, 1.8, 3.8], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 4, 
    title: 'Nocturne Botanical (Ink)', 
    artist: 'Zeynep Ozcelik',
    category: 'Ink & Pen Illustration', 
    date: '17.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/g-inkflower1.jpg', 
    description: 'Classical pen-and-ink still life rendered through precise hatched contours and rhythmic botanical gestures.', 
    position: [-2.9, 1.8, 1.6], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },

  { 
    id: 5, 
    title: 'White Rose in Negative', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '30.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-rose1.jpg', 
    description: 'A luminous white rose blooming out of a deep charcoal shadow field, capturing organic spirals and textured foliage.', 
    position: [2.9, 1.8, 8.2], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 6, 
    title: 'Whispering Stem', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '27.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-rose2.jpg', 
    description: 'Vertical graphite exploration of rose stems, subtle thorn silhouettes, and emerging petals.', 
    position: [2.9, 1.8, 6.0], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 7, 
    title: 'Still Life with Decanter', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '17.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-roses3.jpg', 
    description: 'Academic composition observing glass reflections, ceramic curves, and a soft bouquet of wild roses.', 
    position: [2.9, 1.8, 3.8], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 8, 
    title: 'Conch of the Aegean', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '08.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-seashell08-11-23.png', 
    description: 'A tactile relief painting honoring the calcified spiral geometry and quiet eternity of the marine shell.', 
    position: [2.9, 1.8, 1.6], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.2 
  },

  // ========================================================
  // ZONE 2: LEFT WALL (POPPY MEADOWS & EXPRESSIONISM)
  // ========================================================
  { 
    id: 17, 
    title: 'Scarlet Wind', 
    artist: 'Zeynep Ozcelik',
    category: 'Expressionist Oil', 
    date: '28.05.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/poppies4.jpg', 
    description: 'An open meadow of wild scarlet poppies caught in mid-motion, textured with energetic impasto brushwork.', 
    position: [-11.9, 2.0, -5.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 18, 
    title: 'Crimson Cascade', 
    artist: 'Zeynep Ozcelik',
    category: 'Expressionist Oil', 
    date: '29.05.2023', 
    dimensions: '49.5x34 cm', 
    file: '/artworks/poppy3.jpg', 
    description: 'Horizontal botanical canvas emphasizing lush velvet reds and wild vitality of blossoming poppies.', 
    position: [-11.9, 2.0, -2.8], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },

  // ========================================================
  // ZONE 3: CENTER ISLAND (SURREAL & TEXTURED REALMS)
  // ========================================================
  { 
    id: 19, 
    title: 'Cosmic Vortex', 
    artist: 'Zeynep Ozcelik',
    category: 'Textured Surrealism', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00655.JPG', 
    description: 'An evocative spiral composition pulling the viewer into celestial dimensions through tactile pigments.', 
    position: [-2.6, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 20, 
    title: 'Ancestral Mirage', 
    artist: 'Zeynep Ozcelik',
    category: 'Textured Surrealism', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00657.JPG', 
    description: 'A mysterious figurative presence emerging from warm earth reliefs and weathered gold pigments.', 
    position: [0, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 21, 
    title: 'Genesis of Color', 
    artist: 'Zeynep Ozcelik',
    category: 'Abstract Expressionism', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00659.JPG', 
    description: 'Passionate multi-directional palette knife gestures capturing the unfiltered energy of chromatic eruption.', 
    position: [2.6, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },

  { 
    id: 22, 
    title: 'Wild Strawberry Bloom', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-straw07-11-23.png', 
    description: 'Textured close-up celebrating the vibrant vitality of ripening strawberries and pure white blossoms.', 
    position: [-2.6, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },
  { 
    id: 23, 
    title: 'Ascension of Joy', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '10.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-baloon10-11-23.png', 
    description: 'Whimsical hot air balloons ascending over a sunlit wild meadow of pink and white cosmos flowers.', 
    position: [0, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },
  { 
    id: 24, 
    title: 'Flight of the Dandelion', 
    artist: 'Zeynep Ozcelik',
    category: 'Soft Pastel', 
    date: '16.03.2023', 
    dimensions: '32.8x24 cm', 
    file: '/artworks/g-dandelion1.jpg', 
    description: 'Weightless dandelion seeds taking flight into azure ether, executed in soft powdered pastels.', 
    position: [2.6, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },

  // ========================================================
  // ZONE 4: GRAND FEATURE WALL (MASTERPIECES & TRIPTYCH)
  // ========================================================
  { 
    id: 25, 
    title: 'Midnight Vintage', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel Still Life', 
    date: '10.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/g-wine1.jpg', 
    description: 'Classical chiaroscuro still life capturing the ruby brilliance of wine in crystalline glassware.', 
    position: [-9.5, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 26, 
    title: 'Solar Hymn (Left Wing)', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00923.JPG', 
    description: 'Left wing of the monumental three-panel sunflower centerpiece celebrating sunlight and vitality.', 
    position: [-4.2, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 27, 
    title: 'Solar Hymn (Center Panel)', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00924.JPG', 
    description: 'Central focal panel of the panoramic sunflower triptych radiating warmth and raw botanical energy.', 
    position: [-2.4, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 28, 
    title: 'Solar Hymn (Right Wing)', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00925.JPG', 
    description: 'Right wing concluding the three-piece solar hymn triptych installation.', 
    position: [-0.6, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 29, 
    title: 'Sunflowers in Cobalt', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/d-DSC00644.JPG', 
    description: 'Vibrant Fauvist harmony contrasting deep cobalt blue ceramic with blazing golden petals.', 
    position: [2.6, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 30, 
    title: 'Autumn Solstice', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '06.11.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/d-sunflower6-11-23.jpg', 
    description: 'Rich amber and russet undertones portraying the mature elegance of late autumn sunflowers.', 
    position: [6.0, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 31, 
   title: 'Morning Daisies II', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-daisies2.jpg', 
    description: 'Close-up botanical perspective focusing on delicate white petals and morning light reflections.', 
    position: [11.9, 2.0, -13.0], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },

  // ========================================================
  // ZONE 5: RIGHT WALL (BOTANICAL SANCTUARY)
  // ========================================================
  { 
    id: 32, 
    title: 'Morning Daisies I', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-daisies1.jpg', 
    description: 'Pristine white daisies in a blue ceramic vase evoking dawn stillness.', 
    position: [11.9, 2.0, -15.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 33, 
    title: 'November Serenity', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '11.11.2023', 
    dimensions: '30x50 cm', 
    file: '/artworks/g-flower11.11.23.png', 
    description: 'A stately urn holding pure white floral blooms rendered in tactile brushwork against soft cerulean.', 
    position: [9.5, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 34, 
      title: 'Gilded Sunflower', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel', 
    date: '18.03.2023', 
    dimensions: '29x21 cm', 
    file: '/artworks/e-sunflower2.jpg', 
    description: 'Warm luminous pastel portrait of a sunflower head turned directly toward the light.', 
    position: [8.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 35, 
    title: 'Bouquet of Grace', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Still Life', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/g-DSC00922.JPG', 
    description: 'Rich tabletop vase filled with layered pink and crimson roses.', 
    position: [11.9, 2.0, -8.0], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 36, 
    title: 'Emerald Rose', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/g-DSC00670.JPG', 
    description: 'A deep crimson rose blooming amid deep emerald foliage.', 
    position: [11.9, 2.0, -5.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 37, 
    title: 'Blush Symphony', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/t-DSC00662.JPG', 
    description: 'Lush pastel pink and white bouquet radiating springtime fragrance.', 
    position: [11.9, 2.0, -3.0], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 38, 
    title: 'Twin Scarlet Tulips', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-tulip1.jpg', 
    description: 'A pair of graceful scarlet tulips ascending against pure velvet darkness.', 
    position: [11.9, 2.0, -0.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },

  // ========================================================
  // ZONE 6: WING PANELS
  // ========================================================
  { 
    id: 39, 
    title: 'Crimson Solitary', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/t-DSC00660.JPG', 
    description: 'A solitary crimson rosebud standing proudly before a soft azure horizon.', 
    position: [-11.0, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 40, 
    title: 'Mediterranean Reverie', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel Landscape', 
    date: '15.03.2023', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/f-bycycle1.jpg', 
    description: 'A tranquil nostalgic scene with a classic bicycle leaning against a weathered Aegean door.', 
    position: [-8.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 41, 
    title: 'Iris in Full Bloom', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '26.03.2023', 
    dimensions: '40x30 cm', 
    file: '/artworks/f-iris1.jpg', 
    description: 'Regal purple iris petals accented with golden filaments and lively emerald leaves.', 
    position: [-6.0, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 42, 
    title: 'Iris at Twilight', 
    artist: 'Zeynep Ozcelik',
    category: 'Chiaroscuro Oil', 
    date: '27.03.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/e-DSC00927.JPG', 
    description: 'Deep violet iris blossoms glowing out of velvety night shadows.', 
    position: [-3.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },

  { 
    id: 43, 
    title: 'Noble Calla Lilies', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/d-calla-lilies1.jpg', 
    description: 'Sleek, minimalist pink calla lilies positioned with quiet dignity.', 
    position: [3.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 44, 
    title: 'Azure Solitude', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/d-flower07-11-23.png', 
    description: 'A singular azure flower rising like a monument against misted grey canvas.', 
    position: [6.0, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
];

function getFileCandidates(file) {
  if (!file) return [];
  const lastSlash = file.lastIndexOf('/');
  const dir = file.substring(0, lastSlash + 1);
  const fullFileName = file.substring(lastSlash + 1);
  const lastDot = fullFileName.lastIndexOf('.');
  const baseName = lastDot !== -1 ? fullFileName.substring(0, lastDot) : fullFileName;
  const rawBase = baseName.replace(/^[a-zA-Z][-_]/, '');

  const baseVariants = Array.from(new Set([
    baseName,
    baseName.toLowerCase(),
    baseName.toUpperCase(),
    rawBase,
    rawBase.toLowerCase(),
    rawBase.toUpperCase(),
    'b-' + rawBase,
    'b_' + rawBase,
    't-' + rawBase,
    't_' + rawBase,
    'b-daisies1',
    'b-daisies2',
    'b-daisies3',
    'b-daisies',
    'daisies1',
    'daisies2',
    'daisies3',
    'daisies'
  ]));

  const extensions = ['.JPG', '.jpg', '.PNG', '.png', '.jpeg', '.JPEG', '.webp'];
  const candidates = [];
  baseVariants.forEach(b => {
    extensions.forEach(ext => {
      candidates.push(`${dir}${b}${ext}`);
    });
  });
  return candidates;
}

function loadTextureWithFallbacks(file, onLoaded) {
  const loader = new THREE.TextureLoader();
  const candidates = getFileCandidates(file);
  let index = 0;
  const tryNext = () => {
    if (index >= candidates.length) return;
    const currentUrl = candidates[index++];
    loader.load(
      currentUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        onLoaded(tex);
      },
      undefined,
      () => tryNext()
    );
  };
  tryNext();
}

function ModalImage({ file, alt }) {
  const [src, setSrc] = useState(file);
  const candidatesRef = useRef(getFileCandidates(file));
  const candidateIndexRef = useRef(0);

  useEffect(() => {
    candidatesRef.current = getFileCandidates(file);
    candidateIndexRef.current = 0;
    setSrc(file);
  }, [file]);

  const handleError = () => {
    candidateIndexRef.current += 1;
    if (candidateIndexRef.current < candidatesRef.current.length) {
      setSrc(candidatesRef.current[candidateIndexRef.current]);
    }
  };

  return <img src={src} alt={alt} onError={handleError} />;
}

function BrassPlaque({ title, artist, width = 0.32, height = 0.048 }) {
  return (
    <group position={[0, 0, 0.012]}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#c5a059" metalness={0.75} roughness={0.3} />
      </mesh>
      <Text
        position={[0, 0.008, 0.003]}
        fontSize={0.015}
        color="#1a0f05"
        anchorX="center"
        anchorY="middle"
        maxWidth={width - 0.02}
      >
        {title}
      </Text>
      <Text
        position={[0, -0.009, 0.003]}
        fontSize={0.0095}
        color="#3b2814"
        anchorX="center"
        anchorY="middle"
      >
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
    loadTextureWithFallbacks(art.file, (tex) => {
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
        <boxGeometry args={[frameWidth + 0.05, frameHeight + 0.05, 0.03]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} metalness={0.2} />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        {texture ? (
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        ) : (
          <meshStandardMaterial color="#c4b5a5" roughness={0.5} side={THREE.DoubleSide} />
        )}
      </mesh>

      <group position={[0, -(frameHeight / 2) - 0.055, 0]}>
        <BrassPlaque title={art.title} artist={art.artist} width={plaqueW} />
      </group>
    </group>
  );
}

function Polyptych4Frame({ position, rotation, files, title, category, description, date, dimensions, onSelect }) {
  const [textures, setTextures] = useState([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    files.forEach((file, i) => {
      loadTextureWithFallbacks(file, (tex) => {
        setTextures(prev => {
          const next = [...prev];
          next[i] = tex;
          return next;
        });
      });
    });
  }, [files]);

  const pW = 0.65;
  const pH = 0.95;
  const gap = 0.02;
  const totalW = pW * 2 + gap;
  const totalH = pH * 2 + gap;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect({
      title,
      artist: 'Zeynep Ozcelik',
      category,
      date,
      dimensions,
      file: files[0],
      description
    });
  };

  return (
    <group 
      position={position} 
      rotation={rotation}
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
        <boxGeometry args={[totalW + 0.06, totalH + 0.06, 0.03]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} metalness={0.2} />
      </mesh>

      <mesh position={[-pW / 2 - gap / 2, pH / 2 + gap / 2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[0] ? <meshBasicMaterial map={textures[0]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>
      <mesh position={[pW / 2 + gap / 2, pH / 2 + gap / 2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[1] ? <meshBasicMaterial map={textures[1]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>
      <mesh position={[-pW / 2 - gap / 2, -pH / 2 - gap / 2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[2] ? <meshBasicMaterial map={textures[2]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>
      <mesh position={[pW / 2 + gap / 2, -pH / 2 - gap / 2, 0.01]}>
        <planeGeometry args={[pW, pH]} />
        {textures[3] ? <meshBasicMaterial map={textures[3]} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" />}
      </mesh>

      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[gap, totalH, 0.01]} />
        <meshStandardMaterial color="#2d1a0e" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[totalW, gap, 0.01]} />
        <meshStandardMaterial color="#2d1a0e" roughness={0.5} />
      </mesh>

      <group position={[0, -(totalH / 2) - 0.055, 0]}>
        <BrassPlaque title={title} artist="Zeynep Ozcelik" width={0.48} />
      </group>
    </group>
  );
}

function PoppiesDiptychFrame({ onSelect }) {
  const [tex1, setTex1] = useState(null);
  const [tex2, setTex2] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    loadTextureWithFallbacks('/artworks/poppy1.jpg', setTex1);
    loadTextureWithFallbacks('/artworks/poppy2.jpg', setTex2);
  }, []);

  const panelH = 1.35;
  const panelW = 0.7;
  const totalW = panelW * 2 + 0.02;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect({
      title: 'Red Poppies Diptych',
      artist: 'Zeynep Ozcelik',
      category: 'Oil on Canvas (Diptych)',
      date: '28.03.2023',
      dimensions: '2x (20x40 cm)',
      file: '/artworks/poppy1.jpg',
      description: 'An expressive two-piece diptych created on March 28, 2023, capturing blooming crimson poppies in mutual harmony.'
    });
  };

  return (
    <group 
      position={[-11.9, 2.0, -8.6]} 
      rotation={[0, Math.PI / 2, 0]}
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
        <boxGeometry args={[totalW + 0.06, panelH + 0.06, 0.03]} />
        <meshStandardMaterial color={hovered ? '#d4af37' : '#3d2514'} roughness={0.3} metalness={0.2} />
      </mesh>

      <mesh position={[-panelW / 2 - 0.01, 0, 0.01]}>
        <planeGeometry args={[panelW, panelH]} />
        {tex1 ? <meshBasicMaterial map={tex1} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" side={THREE.DoubleSide} />}
      </mesh>

      <mesh position={[panelW / 2 + 0.01, 0, 0.01]}>
        <planeGeometry args={[panelW, panelH]} />
        {tex2 ? <meshBasicMaterial map={tex2} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" side={THREE.DoubleSide} />}
      </mesh>

      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.015, panelH, 0.01]} />
        <meshStandardMaterial color="#2d1a0e" roughness={0.5} />
      </mesh>

      <group position={[0, -(panelH / 2) - 0.055, 0]}>
        <BrassPlaque title="Red Poppies Diptych" artist="Zeynep Ozcelik" width={0.46} />
      </group>
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

      <mesh position={[0, 2.0, -8.0]}><boxGeometry args={[8.0, 3.4, 0.3]} /><meshStandardMaterial color={ecruColor} roughness={0.8} /></mesh>

      <mesh position={[-7.5, 2.1, 0]}><planeGeometry args={[9, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>
      <mesh position={[7.5, 2.1, 0]}><planeGeometry args={[9, 4.2]} /><meshStandardMaterial color={ecruColor} roughness={0.8} side={THREE.DoubleSide} /></mesh>

      <mesh position={[-2.35, 2, 10.2]}><planeGeometry args={[1.3, 4]} /><meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} /></mesh>
      <mesh position={[2.35, 2, 10.2]}><planeGeometry args={[1.3, 4]} /><meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 3.7, 10.2]}><planeGeometry args={[3.4, 0.6]} /><meshStandardMaterial color={ecruColor} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

function PlayerMovement({ isLocked, mobileMove, mobileLook, mobileTurn }) {
  const { camera } = useThree();
  const keys = useRef({});
  const rotationEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

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
    const turnSpeed = 2.2 * delta;
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    if (mobileTurn) {
      rotationEuler.current.setFromQuaternion(camera.quaternion);
      rotationEuler.current.y += mobileTurn * turnSpeed;
      camera.quaternion.setFromEuler(rotationEuler.current);
    }

    if (mobileLook && (mobileLook.x !== 0 || mobileLook.y !== 0)) {
      rotationEuler.current.setFromQuaternion(camera.quaternion);
      rotationEuler.current.y -= mobileLook.x * 2.2 * delta;
      rotationEuler.current.x -= mobileLook.y * 2.2 * delta;
      rotationEuler.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotationEuler.current.x));
      camera.quaternion.setFromEuler(rotationEuler.current);
    }

    if (!isLocked && !mobileMove && !mobileLook && !mobileTurn) return;

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

export default function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const controlsRef = useRef();

  const [mobileMove, setMobileMove] = useState(null);
  const [mobileLook, setMobileLook] = useState(null);
  const [mobileTurn, setMobileTurn] = useState(null);
  const touchStartRef = useRef(null);

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

  const handleTouchMove = (forwardVal, rightVal) => {
    setMobileMove({ forward: forwardVal, right: rightVal });
  };

  const handleTouchTurn = (turnVal) => {
    setMobileTurn(turnVal);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && e.clientX > window.innerWidth / 2) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMoveScreen = (e) => {
    if (touchStartRef.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - touchStartRef.current.x;
      const deltaY = e.touches[0].clientY - touchStartRef.current.y;
      setMobileLook({ x: deltaX * 0.005, y: deltaY * 0.005 });
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    setMobileLook(null);
  };

  return (
    <div 
      className="canvas-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMoveScreen}
      onTouchEnd={handleTouchEnd}
    >
      {isLocked && <div className="crosshair" />}

      {!isLocked && !selectedArt && (
        <div className="instructions-overlay" onClick={handleStart}>
          <div className="instructions-card">
            <h1>ZEYNEP OZCELIK</h1>
            <p className="subtitle">Virtual Fine Art Gallery &amp; Retrospective</p>

            <div className="artist-links">
              <a 
                href={ARTIST_INFO.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="artist-link-badge ig"
                onClick={(e) => e.stopPropagation()}
              >
                📸 {ARTIST_INFO.instagramHandle}
              </a>
              <a 
                href={`mailto:${ARTIST_INFO.email}`} 
                className="artist-link-badge mail"
                onClick={(e) => e.stopPropagation()}
              >
                ✉️ {ARTIST_INFO.email}
              </a>
            </div>

            <div className="controls-hint">
              <strong>[W, A, S, D]</strong> Walk &nbsp;|&nbsp; <strong>[Mouse/Touch]</strong> Look Around &nbsp;|&nbsp; <strong>[Click Artwork]</strong> Inspect
            </div>
            <div className="start-prompt">▶ Click or Tap Anywhere to Enter the Gallery</div>
          </div>
        </div>
      )}

      {/* BOTTOM ENLARGED ENGLISH MOBILE CONTROLS */}
      <div className="mobile-controls-overlay">
        <div className="mobile-turn-group">
          <button 
            onTouchStart={() => handleTouchTurn(1)} 
            onTouchEnd={() => handleTouchTurn(0)}
            onMouseDown={() => handleTouchTurn(1)}
            onMouseUp={() => handleTouchTurn(0)}
          >↺ Turn Left</button>
          <button 
            onTouchStart={() => handleTouchTurn(-1)} 
            onTouchEnd={() => handleTouchTurn(0)}
            onMouseDown={() => handleTouchTurn(-1)}
            onMouseUp={() => handleTouchTurn(0)}
          >Turn Right ↻</button>
        </div>

        <div className="mobile-dpad">
          <button 
            onTouchStart={() => handleTouchMove(1, 0)} 
            onTouchEnd={() => handleTouchMove(0, 0)}
            onMouseDown={() => handleTouchMove(1, 0)}
            onMouseUp={() => handleTouchMove(0, 0)}
          >▲</button>
          <div className="dpad-row">
            <button 
              onTouchStart={() => handleTouchMove(0, 1)} 
              onTouchEnd={() => handleTouchMove(0, 0)}
              onMouseDown={() => handleTouchMove(0, 1)}
              onMouseUp={() => handleTouchMove(0, 0)}
            >◄</button>
            <button 
              onTouchStart={() => handleTouchMove(-1, 0)} 
              onTouchEnd={() => handleTouchMove(0, 0)}
              onMouseDown={() => handleTouchMove(-1, 0)}
              onMouseUp={() => handleTouchMove(0, 0)}
            >▼</button>
            <button 
              onTouchStart={() => handleTouchMove(0, -1)} 
              onTouchEnd={() => handleTouchMove(0, 0)}
              onMouseDown={() => handleTouchMove(0, -1)}
              onMouseUp={() => handleTouchMove(0, 0)}
            >►</button>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 1.7, 8.8], fov: 70 }}>
        <ambientLight intensity={1.8} color="#ffffff" />
        <directionalLight position={[0, 10, 5]} intensity={1.8} color="#fffcf5" />
        <directionalLight position={[0, 6, -10]} intensity={1.5} color="#ffffff" />

        <PointerLockControls ref={controlsRef} onLock={() => setIsLocked(true)} onUnlock={() => setIsLocked(false)} />
        <PlayerMovement isLocked={isLocked} mobileMove={mobileMove} mobileLook={mobileLook} mobileTurn={mobileTurn} />

        <GalleryArchitecture />
        <OpenDoubleDoor />

        {ARTWORKS.map((art, idx) => (
          <ArtFrame key={`${art.file}-${idx}`} art={art} onSelect={handleArtSelect} />
        ))}

        <Polyptych4Frame 
          position={[-11.9, 2.0, -15.5]}
          rotation={[0, Math.PI / 2, 0]}
          files={['/artworks/Flamingo1.JPG', '/artworks/Flamingo2.JPG', '/artworks/Flamingo3.JPG', '/artworks/Flamingo4.JPG']}
          title="Flamingo Polyptych"
          category="Oil Painting (4-Piece Set)"
          date="2023"
          dimensions="40x40 cm (Unified)"
          description="A four-panel polyptych converging into an elegant stylized flamingo silhouette surrounded by tropical geometries."
          onSelect={handleArtSelect}
        />

        <Polyptych4Frame 
          position={[-11.9, 2.0, -12.2]}
          rotation={[0, Math.PI / 2, 0]}
          files={['/artworks/Piece1.JPG', '/artworks/Piece2.JPG', '/artworks/Piece3.JPG', '/artworks/Piece4.JPG']}
          title="Chromatic Synthesis"
          category="Abstract (4-Piece Set)"
          date="2023"
          dimensions="40x40 cm (Unified)"
          description="A four-panel modernist abstract matrix investigating chromatic color blocks and geometric tension."
          onSelect={handleArtSelect}
        />

        <PoppiesDiptychFrame onSelect={handleArtSelect} />
      </Canvas>

      {selectedArt && (
        <div className="modal-overlay" onClick={() => setSelectedArt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArt(null)}>&times;</button>
            <div className="modal-img-wrapper">
              <ModalImage file={selectedArt.file} alt={selectedArt.title} />
            </div>
            <div className="modal-body">
              <div className="modal-meta-row">
                <span className="modal-tag">{selectedArt.category}</span>
                {selectedArt.date && <span className="modal-date-tag">📅 {selectedArt.date}</span>}
                {selectedArt.dimensions && <span className="modal-dim-tag">📐 {selectedArt.dimensions}</span>}
              </div>
              <h2>{selectedArt.title}</h2>
              <p className="artist-byline">
                Artist: <strong>{selectedArt.artist || 'Zeynep Ozcelik'}</strong>
              </p>
              <p className="art-desc">{selectedArt.description}</p>

              <div className="modal-actions-row">
                <a 
                  href={ARTIST_INFO.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="modal-action-btn ig"
                >
                  📸 Instagram {ARTIST_INFO.instagramHandle}
                </a>
                <a 
                  href={`mailto:${ARTIST_INFO.email}?subject=Acquisition Inquiry: ${encodeURIComponent(selectedArt.title)}`} 
                  className="modal-action-btn mail"
                >
                  ✉️ Inquire via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}