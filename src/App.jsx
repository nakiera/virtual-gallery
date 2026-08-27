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
  // ZONE 1: ENTRANCE CORRIDOR (CHARCOAL & INK DRAWINGS 2016)
  // ========================================================
  // Left Corridor Wall (x = -2.9)
  { 
    id: 1, 
    title: 'Drapery & Fabric Study', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal & Crosshatching', 
    date: '10.05.2016', 
    dimensions: '25x35 cm', 
    file: '/artworks/k-bust1.jpg', 
    description: 'An academic drapery study exploring tonal depth, light-shadow interplay, and structural folds of textured fabric.', 
    position: [-2.9, 1.8, 8.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 2, 
    title: 'Lighthouse & Seagulls', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '21.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-lighthouse1.jpg', 
    description: 'A striking monochrome coastal composition featuring a towering lighthouse above rugged seaside cliffs.', 
    position: [-2.9, 1.8, 6.2], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 3, 
    title: 'Monochrome Lily', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '13.04.2016', 
    dimensions: '40x30 cm', 
    file: '/artworks/k-lillies4.jpg', 
    description: 'Delicate botanical study emphasizing petal curvatures and subtle graphite tonal gradients.', 
    position: [-2.9, 1.8, 3.9], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 4, 
    title: 'Ink Vase & Flowers', 
    artist: 'Zeynep Ozcelik',
    category: 'Ink & Pen Illustration', 
    date: '17.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/g-inkflower1.jpg', 
    description: 'Classical botanical ink illustration rendered with fine crosshatching and expressive contour linework.', 
    position: [-2.9, 1.8, 1.6], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },

  // Right Corridor Wall (x = 2.9)
  { 
    id: 5, 
    title: 'Rose Drawing I', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '30.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-rose1.jpg', 
    description: 'Intricate graphite sketch capturing the layered organic spiral and petal textures of a blooming rose.', 
    position: [2.9, 1.8, 8.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 6, 
    title: 'Roses Study II', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '27.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-rose2.jpg', 
    description: 'Vertical still life focusing on thorns, stems, and delicate petal shading in graphite.', 
    position: [2.9, 1.8, 6.2], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 7, 
    title: 'Vase & Pitcher with Roses', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '17.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-roses3.jpg', 
    description: 'Academic still life composition exploring volume, reflective surfaces, and light distribution across ceramic and glass forms.', 
    position: [2.9, 1.8, 3.9], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 8, 
    title: 'Sculptural Seashell', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '08.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-seashell08-11-23.png', 
    description: 'Heavily textured organic study capturing the calcified spiraling ridges and natural curves of a seashell.', 
    position: [2.9, 1.8, 1.6], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },

  // ========================================================
  // ZONE 2: LEFT WALL (MULTI-PANEL POLYPTYCHS & POPPIES)
  // ========================================================
  // Flamingo 4-Piece Polyptych
  { 
    id: 9, 
    title: 'Flamingo Polyptych I', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Flamingo1.JPG', 
    description: 'Top-left quadrant of a four-panel polyptych converging into an elegant stylized flamingo silhouette.', 
    position: [-11.9, 2.5, -15.8], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 10, 
    title: 'Flamingo Polyptych II', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Flamingo2.JPG', 
    description: 'Top-right quadrant of a four-panel polyptych with vibrant contrasting tones.', 
    position: [-11.9, 2.5, -16.65], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 11, 
    title: 'Flamingo Polyptych III', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Flamingo3.JPG', 
    description: 'Bottom-left quadrant of the flamingo multi-panel composition.', 
    position: [-11.9, 1.45, -15.8], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 12, 
    title: 'Flamingo Polyptych IV', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Flamingo4.JPG', 
    description: 'Bottom-right quadrant completing the four-panel flamingo installation.', 
    position: [-11.9, 1.45, -16.65], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },

  // Geometric Piece 4-Panel Set
  { 
    id: 13, 
    title: 'Geometric Piece I', 
    artist: 'Zeynep Ozcelik',
    category: 'Abstract (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Piece1.JPG', 
    description: 'Top-left module of an abstract geometric polyptych exploring vibrant chromatic blocks and sharp intersections.', 
    position: [-11.9, 2.5, -12.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 14, 
    title: 'Geometric Piece II', 
    artist: 'Zeynep Ozcelik',
    category: 'Abstract (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Piece2.JPG', 
    description: 'Top-right module of the four-panel abstract geometric composition.', 
    position: [-11.9, 2.5, -13.35], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 15, 
    title: 'Geometric Piece III', 
    artist: 'Zeynep Ozcelik',
    category: 'Abstract (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Piece3.JPG', 
    description: 'Bottom-left module maintaining rhythmic spatial geometry.', 
    position: [-11.9, 1.45, -12.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 16, 
    title: 'Geometric Piece IV', 
    artist: 'Zeynep Ozcelik',
    category: 'Abstract (4-Piece Set)', 
    date: '2023', 
    dimensions: '40x40 cm', 
    file: '/artworks/Piece4.JPG', 
    description: 'Bottom-right module concluding the geometric polyptych grid.', 
    position: [-11.9, 1.45, -13.35], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },

  // Poppy Series
  { 
    id: 17, 
    title: 'Poppy Meadow Field', 
    artist: 'Zeynep Ozcelik',
    category: 'Expressionist Oil Painting', 
    date: '28.05.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/poppies4.jpg', 
    description: 'Vibrant red field of wild poppies undulating in the summer breeze, highlighted by expressive impasto strokes.', 
    position: [-11.9, 2.0, -5.2], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 18, 
    title: 'Blooming Poppies', 
    artist: 'Zeynep Ozcelik',
    category: 'Expressionist Oil Painting', 
    date: '29.05.2023', 
    dimensions: '49.5x34 cm', 
    file: '/artworks/poppy3.jpg', 
    description: 'Horizontal botanical composition showcasing radiant crimson petals and deep foliage contrast.', 
    position: [-11.9, 2.0, -2.4], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },

  // ========================================================
  // ZONE 3: CENTRAL ISLAND (SURREALISM & TEXTURED CANVASES)
  // ========================================================
  // Front Face (z = -7.85)
  { 
    id: 19, 
    title: 'Surreal Vortex', 
    artist: 'Zeynep Ozcelik',
    category: 'Textured Surrealism', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00655.JPG', 
    description: 'A mystical vortex composition defying planar dimensions through layered circular brushwork and chromatic sweeps.', 
    position: [-2.6, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 20, 
    title: 'Mystic Figurative', 
    artist: 'Zeynep Ozcelik',
    category: 'Textured Surrealism', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00657.JPG', 
    description: 'Subtle figurative contours emerging from sculptural reliefs and warm earthy pigment stratifications.', 
    position: [0, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 21, 
    title: 'Abstract Chromatic Storm', 
    artist: 'Zeynep Ozcelik',
    category: 'Abstract Expressionism', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00659.JPG', 
    description: 'Vigorous diagonal gestures and raw textured palette knife strokes capturing pure energetic motion.', 
    position: [2.6, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },

  // Rear Face (z = -8.15)
  { 
    id: 22, 
    title: 'Dandelion in the Breeze', 
    artist: 'Zeynep Ozcelik',
    category: 'Soft Pastel', 
    date: '16.03.2023', 
    dimensions: '32.8x24 cm', 
    file: '/artworks/g-dandelion1.jpg', 
    description: 'Airy dandelion seeds drifting across an open blue sky, rendered with gentle pastel blending.', 
    position: [-2.6, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },
  { 
    id: 23, 
    title: 'Meadow & Hot Air Balloons', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '10.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-baloon10-11-23.png', 
    description: 'Colorful hot air balloons ascending gracefully above a lush expanse of pink and white wildflower blossoms.', 
    position: [0, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },
  { 
    id: 24, 
    title: 'Strawberries & Blossoms', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-straw07-11-23.png', 
    description: 'Rich textural close-up of ripe wild strawberries, delicate white blossoms, and dense botanical foliage.', 
    position: [2.6, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },

  // ========================================================
  // ZONE 4: MAIN FEATURE WALL (MASTERPIECES & TRIPTYCH)
  // ========================================================
  { 
    id: 25, 
    title: 'Vintage Wine & Chalice', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel Still Life', 
    date: '10.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/g-wine1.jpg', 
    description: 'A classic chiaroscuro pastel study featuring luminous glass reflections and rich ruby red wine tones.', 
    position: [-9.5, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  
  // 3-Piece Sunflower Triptych
  { 
    id: 26, 
    title: 'Sunflowers Triptych I', 
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
    title: 'Sunflowers Triptych II', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00924.JPG', 
    description: 'Central focal panel of the grandiose three-piece sunflower triptych installation.', 
    position: [-2.4, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 28, 
    title: 'Sunflowers Triptych III', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00925.JPG', 
    description: 'Right wing concluding the panoramic sunflower triptych series.', 
    position: [-0.6, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },

  { 
    id: 29, 
    title: 'Sunflowers in Cobalt Vase', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/d-DSC00644.JPG', 
    description: 'Fauvist-inspired color harmony contrasting a vivid cobalt ceramic vase with brilliant golden sunflowers.', 
    position: [2.6, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 30, 
    title: 'Autumn Sunflower', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '06.11.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/d-sunflower6-11-23.jpg', 
    description: 'Warm, golden autumnal lighting illuminating mature sunflower petals in rich impasto oil textures.', 
    position: [6.0, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 31, 
    title: 'White Floral Bouquet', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '11.11.2023', 
    dimensions: '30x50 cm', 
    file: '/artworks/g-flower11.11.23.png', 
    description: 'An elegant arrangement of pure white floral blooms resting within an earthy textured ceramic urn.', 
    position: [9.5, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },

  // ========================================================
  // ZONE 5: RIGHT WALL (DAISIES, TULIPS & BOTANICALS)
  // ========================================================
  // Daisies Series
  { 
    id: 32, 
    title: 'Daisies Still Life I', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-DSC00634.JPG', 
    description: 'Pristine white daisies in a blue ceramic vase expressing peaceful spring stillness.', 
    position: [11.9, 2.0, -16.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 33, 
    title: 'Daisies Still Life II', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-DSC00635.JPG', 
    description: 'Detailed floral perspective focusing on delicate white petals and morning light reflections.', 
    position: [11.9, 2.0, -14.4], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 34, 
    title: 'Daisies Harmony III', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-daisies.jpg', 
    description: 'Serene botanical arrangement of wildflowers captured with balanced soft lighting.', 
    position: [11.9, 2.0, -12.3], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },

  // Tulips & Floral Works
  { 
    id: 35, 
    title: 'Crimson Rosebud', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/t-DSC00660.JPG', 
    description: 'A solitary crimson rosebud set against a luminous sky backdrop.', 
    position: [11.9, 2.0, -9.8], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 36, 
    title: 'Spring Pink Bouquet', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/t-DSC00662.JPG', 
    description: 'Soft pastel pink flower bouquet in a crystal vase evoking gentle springtime warmth.', 
    position: [11.9, 2.0, -7.7], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 37, 
    title: 'Wild Red Tulips', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '30.03.2023', 
    dimensions: '34x49.5 cm', 
    file: '/artworks/t-DSC00664.JPG', 
    description: 'Vivid red tulips bursting with color against a deep midnight-blue backdrop.', 
    position: [11.9, 2.0, -5.6], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 38, 
    title: 'Twin Crimson Tulips', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-tulip1.jpg', 
    description: 'Elegant dual tulip stems rising from a rich dark background.', 
    position: [11.9, 2.0, -3.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 39, 
    title: 'Sunflower Horizon', 
    artist: 'Zeynep Ozcelik',
    category: 'Landscape Oil', 
    date: '2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/d-DSC00918.JPG', 
    description: 'Panoramic open-air view of sun-drenched golden sunflower fields extending toward the horizon.', 
    position: [11.9, 2.0, -1.4], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },

  // Wing Panels (z = 0.05)
  { 
    id: 40, 
    title: 'Blue Door & Vintage Bicycle', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel Landscape', 
    date: '15.03.2023', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/f-bycycle1.jpg', 
    description: 'Nostalgic Mediterranean street scene featuring a classic bicycle parked beside a blue wooden door.', 
    position: [-9.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 41, 
    title: 'Purple Iris Harmony', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '26.03.2023', 
    dimensions: '40x30 cm', 
    file: '/artworks/f-iris1.jpg', 
    description: 'Graceful purple iris petals highlighted with yellow accents and lush green foliage.', 
    position: [-6.8, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 42, 
    title: 'Night & Iris', 
    artist: 'Zeynep Ozcelik',
    category: 'Chiaroscuro Oil', 
    date: '27.03.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/e-DSC00927.JPG', 
    description: 'Glowing purple petals emerging dramatically from a deep, velvety black shadow field.', 
    position: [-4.2, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },

  { 
    id: 43, 
    title: 'Calla Lilies', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/d-calla-lilies1.jpg', 
    description: 'Sleek, minimalist pink calla lilies positioned gracefully against a dark textured canvas.', 
    position: [4.2, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 44, 
    title: 'Solitary Blue Blossom', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/d-flower07-11-23.png', 
    description: 'A singular, sculptural azure flower standing tall with defined petal strokes against an atmospheric grey ground.', 
    position: [6.8, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 45, 
    title: 'Sunflower Portrait', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel', 
    date: '18.03.2023', 
    dimensions: '29x21 cm', 
    file: '/artworks/e-sunflower2.jpg', 
    description: 'Vibrant yellow and warm orange pastel rendering of a radiant sunflower face.', 
    position: [9.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },

  { 
    id: 46, 
    title: 'Emerald Rose', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/g-DSC00670.JPG', 
    description: 'A solitary deep crimson rose blooming amid lush emerald-green shadows.', 
    position: [-11.0, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 47, 
    title: 'Rose Arrangement', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Still Life', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/g-DSC00922.JPG', 
    description: 'Lush tabletop vase filled with fresh pink and crimson roses.', 
    position: [11.0, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 48, 
    title: 'White Blossoms & Vase', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/d-DSC00648.JPG', 
    description: 'Impasto white blossoms resting in a structured ceramic vase on neutral grey canvas.', 
    position: [-2.9, 1.8, 0.2], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 49, 
    title: 'Dandelion on Canvas', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '06.04.2023', 
    dimensions: '70x50 cm', 
    file: '/artworks/c-dandelion2.jpg', 
    description: 'Large-scale canvas capturing the organic complexity and delicate airborne seeds of a dandelion.', 
    position: [2.9, 1.8, 0.2], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.2 
  }
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
  const plateWidth = Math.max(Math.min(frameWidth * 0.75, 0.65), 0.38);

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

      <group position={[0, -(frameHeight / 2) - 0.08, 0.01]}>
        <mesh>
          <planeGeometry args={[plateWidth, 0.065]} />
          <meshStandardMaterial color="#c5a059" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <Text
          position={[0, 0.01, 0.005]}
          fontSize={0.018}
          color="#1a120b"
          anchorX="center"
          anchorY="middle"
          maxWidth={plateWidth - 0.04}
        >
          {art.title}
        </Text>
        <Text
          position={[0, -0.012, 0.005]}
          fontSize={0.012}
          color="#3d2a1d"
          anchorX="center"
          anchorY="middle"
        >
          {art.artist || 'Zeynep Ozcelik'}
        </Text>
      </group>
    </group>
  );
}

function PoppiesDiptychFrame({ onSelect }) {
  const [tex1, setTex1] = useState(null);
  const [tex2, setTex2] = useState(null);
  const [aspect1, setAspect1] = useState(0.65);
  const [aspect2, setAspect2] = useState(0.65);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/artworks/poppy1.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (tex.image && tex.image.height > 0) {
        setAspect1(tex.image.width / tex.image.height);
      }
      setTex1(tex);
    });
    loader.load('/artworks/poppy2.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (tex.image && tex.image.height > 0) {
        setAspect2(tex.image.width / tex.image.height);
      }
      setTex2(tex);
    });
  }, []);

  const panelH = 1.35;
  const w1 = panelH * aspect1;
  const w2 = panelH * aspect2;
  const totalW = w1 + w2;

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
        <boxGeometry args={[totalW + 0.08, panelH + 0.08, 0.03]} />
        <meshStandardMaterial color={hovered ? '#c59b6d' : '#3d2514'} roughness={0.4} />
      </mesh>

      <mesh position={[-totalW / 2 + w1 / 2, 0, 0.01]}>
        <planeGeometry args={[w1, panelH]} />
        {tex1 ? <meshBasicMaterial map={tex1} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" side={THREE.DoubleSide} />}
      </mesh>

      <mesh position={[totalW / 2 - w2 / 2, 0, 0.01]}>
        <planeGeometry args={[w2, panelH]} />
        {tex2 ? <meshBasicMaterial map={tex2} side={THREE.DoubleSide} /> : <meshStandardMaterial color="#3d2514" side={THREE.DoubleSide} />}
      </mesh>

      <mesh position={[-totalW / 2 + w1, 0, 0.02]}>
        <boxGeometry args={[0.015, panelH, 0.01]} />
        <meshStandardMaterial color="#2d1a0e" roughness={0.5} />
      </mesh>

      <group position={[0, -(panelH / 2) - 0.08, 0.01]}>
        <mesh>
          <planeGeometry args={[0.9, 0.065]} />
          <meshStandardMaterial color="#c5a059" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <Text
          position={[0, 0.01, 0.005]}
          fontSize={0.018}
          color="#1a120b"
          anchorX="center"
          anchorY="middle"
        >
          Red Poppies Diptych
        </Text>
        <Text
          position={[0, -0.012, 0.005]}
          fontSize={0.012}
          color="#3d2a1d"
          anchorX="center"
          anchorY="middle"
        >
          Zeynep Ozcelik
        </Text>
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

      {/* Center Island Wall */}
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
                📸 Instagram: <strong>{ARTIST_INFO.instagramHandle}</strong>
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
              <strong>[W, A, S, D]</strong> Walk &nbsp;|&nbsp; <strong>[Mouse]</strong> Look Around
            </div>
            <div className="start-prompt">▶ Click Anywhere to Enter the Gallery</div>
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

        <PoppiesDiptychFrame onSelect={handleArtSelect} />
      </Canvas>

      {selectedArt && (
        <div className="modal-overlay" onClick={() => setSelectedArt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArt(null)}>&times;</button>
            <div className="modal-img-wrapper">
              <img src={selectedArt.file} alt={selectedArt.title} />
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

              {/* Artist Inquiries & Social Contact */}
              <div className="modal-contact-row">
                <a 
                  href={ARTIST_INFO.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="modal-contact-btn ig-btn"
                >
                  Follow on Instagram {ARTIST_INFO.instagramHandle}
                </a>
                <a 
                  href={`mailto:${ARTIST_INFO.email}?subject=Inquiry about ${encodeURIComponent(selectedArt.title)}`} 
                  className="modal-contact-btn email-btn"
                >
                  Inquire via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}