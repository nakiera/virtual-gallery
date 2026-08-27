const ARTWORKS = [
  // ========================================================
  // BLOK 1: SAĞDAN BAŞTAKİ DUVAR (En büyük resimler - 1, 2, 3)
  // ========================================================
  { 
    id: 1, 
    title: 'Ascension of Joy', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '10.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/1-baloon10-11-23.png', 
    description: 'Whimsical hot air balloons ascending over a sunlit wild meadow of pink and white cosmos flowers.', 
    position: [2.85, 1.8, 1.6], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.4 
  },
  { 
    id: 2, 
    title: 'Wild Strawberry Bloom', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/2-straw07-11-23.png', 
    description: 'Textured close-up celebrating the vibrant vitality of ripening strawberries and pure white blossoms.', 
    position: [2.85, 1.8, 3.8], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.4 
  },
  { 
    id: 3, 
    title: 'Conch of the Aegean', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '08.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/3-DSC00648.JPG', 
    description: 'A tactile relief painting honoring the calcified spiral geometry and quiet eternity of the marine shell.', 
    position: [2.85, 1.8, 6.0], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.4 
  },

  // ========================================================
  // BLOK 2: SAĞDAKİ İLK YATAY DUVAR (3'lü Papatya Seti - 4, 5, 6)
  // ========================================================
  { 
    id: 4, 
    title: 'Morning Daisies I', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/4-daisies1.jpg', 
    description: 'Pristine white daisies in a blue ceramic vase evoking dawn stillness.', 
    position: [11.85, 2.0, -15.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 5, 
    title: 'Morning Daisies II', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/5-daisies2.jpg', 
    description: 'Close-up botanical perspective focusing on delicate white petals and morning light reflections.', 
    position: [11.85, 2.0, -12.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 6, 
    title: 'Morning Daisies III', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/6-daisies3.jpg', 
    description: 'Lyrical arrangement of wild field daisies breathing natural simplicity.', 
    position: [11.85, 2.0, -9.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },

  // ========================================================
  // BLOK 3: YANINDAKİ DUVAR (Karakalemler - 7, 8, 9, 10, 11, 12, 13)
  // ========================================================
  { 
    id: 7, 
    title: 'Drapery in Repose', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal & Crosshatching', 
    date: '10.05.2016', 
    dimensions: '25x35 cm', 
    file: '/artworks/7-bust1.jpg', 
    description: 'An academic draping etude investigating tactile tension, sculptural folds, and chiaroscuro depths of hanging fabric.', 
    position: [11.85, 2.0, -6.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 8, 
    title: 'Sentinel of the Tides', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '21.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/8-lighthouse1.jpg', 
    description: 'Monochromatic coastal study capturing a lone maritime lighthouse enduring the winds alongside circling gulls.', 
    position: [11.85, 2.0, -4.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 9, 
    title: 'Lily in Monochrome', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '13.04.2016', 
    dimensions: '40x30 cm', 
    file: '/artworks/9-lillies4.jpg', 
    description: 'An intimate botanical study focusing on the velvety gradations and delicate curvature of lily petals.', 
    position: [11.85, 2.0, -3.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 10, 
    title: 'White Rose in Negative', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '30.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/10-rose1.jpg', 
    description: 'A luminous white rose blooming out of a deep charcoal shadow field, capturing organic spirals and textured foliage.', 
    position: [11.85, 2.0, -1.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 11, 
    title: 'Whispering Stem', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '27.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/11-rose2.jpg', 
    description: 'Vertical graphite exploration of rose stems, subtle thorn silhouettes, and emerging petals.', 
    position: [11.85, 2.0, 0.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 12, 
    title: 'Still Life with Decanter', 
    artist: 'Zeynep Ozcelik',
    category: 'Charcoal Drawing', 
    date: '17.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/12-roses3.jpg', 
    description: 'Academic composition observing glass reflections, ceramic curves, and a soft bouquet of wild roses.', 
    position: [11.85, 2.0, 1.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 13, 
    title: 'Nocturne Botanical (Ink)', 
    artist: 'Zeynep Ozcelik',
    category: 'Ink & Pen Illustration', 
    date: '17.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/13-inkflower1.jpg', 
    description: 'Classical pen-and-ink still life rendered through precise hatched contours and rhythmic botanical gestures.', 
    position: [11.85, 2.0, 3.0], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },

  // ========================================================
  // BLOK 4: KARŞI DUVAR (Büyük tekli kalan resimler - 14, 15, 16, 17, 18, 19, 20)
  // ========================================================
  { 
    id: 14, 
    title: 'Midnight Vintage', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel Still Life', 
    date: '10.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/14-wine1.jpg', 
    description: 'Classical chiaroscuro still life capturing the ruby brilliance of wine in crystalline glassware.', 
    position: [-9.5, 2.1, -17.85], 
    rotation: [0, 0, 0], 
    height: 1.5 
  },
  { 
    id: 15, 
    title: 'Bouquet of Grace', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Still Life', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/15-DSC00922.JPG', 
    description: 'Rich tabletop vase filled with layered pink and crimson roses.', 
    position: [-6.5, 2.1, -17.85], 
    rotation: [0, 0, 0], 
    height: 1.5 
  },
  { 
    id: 16, 
    title: 'November Serenity', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '11.11.2023', 
    dimensions: '30x50 cm', 
    file: '/artworks/16-flower11.11.23.png', 
    description: 'A stately urn holding pure white floral blooms rendered in tactile brushwork against soft cerulean.', 
    position: [-3.5, 2.1, -17.85], 
    rotation: [0, 0, 0], 
    height: 1.5 
  },
  { 
    id: 17, 
    title: 'Azure Solitude', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil on Canvas', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/17-flower07-11-23.png', 
    description: 'A singular azure flower rising like a monument against misted grey canvas.', 
    position: [-0.5, 2.1, -17.85], 
    rotation: [0, 0, 0], 
    height: 1.5 
  },
  { 
    id: 18, 
    title: 'Mediterranean Reverie', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel Landscape', 
    date: '15.03.2023', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/18-bycycle1.jpg', 
    description: 'A tranquil nostalgic scene with a classic bicycle leaning against a weathered Aegean door.', 
    position: [2.5, 2.1, -17.85], 
    rotation: [0, 0, 0], 
    height: 1.5 
  },
  { 
    id: 19, 
    title: 'Gilded Sunflower', 
    artist: 'Zeynep Ozcelik',
    category: 'Pastel', 
    date: '18.03.2023', 
    dimensions: '29x21 cm', 
    file: '/artworks/19-sunflower2.jpg', 
    description: 'Warm luminous pastel portrait of a sunflower head turned directly toward the light.', 
    position: [5.5, 2.1, -17.85], 
    rotation: [0, 0, 0], 
    height: 1.5 
  },
  { 
    id: 20, 
    title: 'Iris at Twilight', 
    artist: 'Zeynep Ozcelik',
    category: 'Chiaroscuro Oil', 
    date: '27.03.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/20-DSC00927.JPG', 
    description: 'Deep violet iris blossoms glowing out of velvety night shadows.', 
    position: [8.5, 2.1, -17.85], 
    rotation: [0, 0, 0], 
    height: 1.5 
  },

  // ========================================================
  // BLOK 5: ORTADAKİ EK BÖLME (3'lü Lale / Çiçek Seti - 26, 27, 28, vs.)
  // ========================================================
  { 
    id: 26, 
    title: 'Scarlet Wind', 
    artist: 'Zeynep Ozcelik',
    category: 'Expressionist Oil', 
    date: '28.05.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/26poppies4.jpg', 
    description: 'An open meadow of wild scarlet poppies caught in mid-motion, textured with energetic impasto brushwork.', 
    position: [-2.6, 2.0, -7.82], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 27, 
    title: 'Blush Symphony', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/27-DSC00662.JPG', 
    description: 'Lush pastel pink and white bouquet radiating springtime fragrance.', 
    position: [0, 2.0, -7.82], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 28, 
    title: 'Twin Scarlet Tulips', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Painting', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/28-DSC00664.JPG', 
    description: 'A pair of graceful scarlet tulips ascending against pure velvet darkness.', 
    position: [2.6, 2.0, -7.82], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },

  // ========================================================
  // BLOK 8: AYÇİÇEĞİ ÜÇLÜSÜ VE DİĞERLERİ (33, vb.)
  // ========================================================
  { 
    id: 33, 
    title: 'Solar Hymn (Left Wing)', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/33-DSC00923.JPG', 
    description: 'Left wing of the monumental three-panel sunflower centerpiece celebrating sunlight and vitality.', 
    position: [3.5, 2.0, 0.02], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 33_2, 
    title: 'Solar Hymn (Center Panel)', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/33-DSC00924.JPG', 
    description: 'Central focal panel of the panoramic sunflower triptych radiating warmth and raw botanical energy.', 
    position: [6.0, 2.0, 0.02], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 33_3, 
    title: 'Solar Hymn (Right Wing)', 
    artist: 'Zeynep Ozcelik',
    category: 'Oil Triptych', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/33-DSC00925.JPG', 
    description: 'Right wing concluding the three-piece solar hymn triptych installation.', 
    position: [8.5, 2.0, 0.02], 
    rotation: [0, 0, 0], 
    height: 1.35 
  }
];