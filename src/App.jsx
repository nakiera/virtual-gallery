import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

const ARTWORKS = [
  // ========================================================
  // BÖLGE 1: GİRİŞ KORİDORU (KARAKALEM & DESEN 2016 KOLEKSİYONU)
  // ========================================================
  // Sol Koridor Duvarı (x = -2.9)
  { 
    id: 1, 
    title: 'Antik Büst Tonlama Etüdü', 
    artist: 'Zeynep Özçelik',
    category: 'Karakalem / Tarama', 
    date: '10.05.2016', 
    dimensions: '25x35 cm', 
    file: '/artworks/k-bust1.jpg', 
    description: 'Klasik heykel formunun ışık, gölge ve anatomik tonlama derinliğini inceleyen akademik desen etüdü.', 
    position: [-2.9, 1.8, 8.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 2, 
    title: 'Deniz Feneri & Martılar', 
    artist: 'Zeynep Özçelik',
    category: 'Karakalem', 
    date: '21.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-lighthouse1.jpg', 
    description: 'Sarp kayalıkların üstünde yükselen deniz feneri ve monokrom deniz atmosferi.', 
    position: [-2.9, 1.8, 6.2], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 3, 
    title: 'Monokrom Zambak', 
    artist: 'Zeynep Özçelik',
    category: 'Karakalem', 
    date: '13.04.2016', 
    dimensions: '40x30 cm', 
    file: '/artworks/k-lillies4.jpg', 
    description: 'Zambak taç yapraklarının narin kıvrımlarını ve ton geçişlerini kontrast değerlerle inceleyen botanik desen.', 
    position: [-2.9, 1.8, 3.9], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 4, 
    title: 'Vazo & Mürekkep Çiçek', 
    artist: 'Zeynep Özçelik',
    category: 'Mürekkep / Çizim', 
    date: '17.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/g-inkflower1.jpg', 
    description: 'Tarama ucu ve mürekkep disipliniyle işlenmiş vazo ve çiçek illüstrasyonu.', 
    position: [-2.9, 1.8, 1.6], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.25 
  },

  // Sağ Koridor Duvarı (x = 2.9)
  { 
    id: 5, 
    title: 'Gül Çizimi I', 
    artist: 'Zeynep Özçelik',
    category: 'Karakalem', 
    date: '30.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-rose1.jpg', 
    description: 'Açan gülün yaprak katmanlarını ve merkezdeki spiral formu veren desen çalışması.', 
    position: [2.9, 1.8, 8.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 6, 
    title: 'Güller (Çizim II)', 
    artist: 'Zeynep Özçelik',
    category: 'Karakalem', 
    date: '27.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-rose2.jpg', 
    description: 'Gövde, gonca ve yaprak tonlamalarıyla derinleştirilmiş dikey gül natürmort eskizi.', 
    position: [2.9, 1.8, 6.2], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 7, 
    title: 'Vazo ve Sürahi / Güller', 
    artist: 'Zeynep Özçelik',
    category: 'Karakalem', 
    date: '17.04.2016', 
    dimensions: '30x40 cm', 
    file: '/artworks/k-roses3.jpg', 
    description: 'Klasik natürmort disipliniyle kurgulanmış vazo hacmi ve ışık dağılımı etüdü.', 
    position: [2.9, 1.8, 3.9], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },
  { 
    id: 8, 
    title: 'Deniz Kabuğu Heykelsi Form', 
    artist: 'Zeynep Özçelik',
    category: 'Kanvas Üzerine Yağlıboya', 
    date: '08.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-seashell08-11-23.png', 
    description: 'Gri zemin üzerinde deniz kabuğunun kalsiyum katmanlarını ve heykelsi spiral kıvrımlarını yansıtan zengin yağlıboya dokusu.', 
    position: [2.9, 1.8, 1.6], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.25 
  },

  // ========================================================
  // BÖLGE 2: SOL DUVAR (ÇOKLU SETLER & YAĞLIBOYA GELİNCİKLER)
  // ========================================================
  // Flamingo 4'lü Set
  { 
    id: 9, 
    title: 'Flamingo I (Sol Üst)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (4’lü Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Flamingo1.JPG', 
    description: 'Dört parçanın birleşimiyle tek bir kuğu/flamingo silüeti oluşturan çağdaş poliptik eser.', 
    position: [-11.9, 2.5, -15.8], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 10, 
    title: 'Flamingo II (Sağ Üst)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (4’lü Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Flamingo2.JPG', 
    description: 'Dört parçanın birleşimiyle tek bir kuğu/flamingo silüeti oluşturan çağdaş poliptik eser.', 
    position: [-11.9, 2.5, -16.65], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 11, 
    title: 'Flamingo III (Sol Alt)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (4’lü Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Flamingo3.JPG', 
    description: 'Dört parçanın birleşimiyle tek bir kuğu/flamingo silüeti oluşturan çağdaş poliptik eser.', 
    position: [-11.9, 1.45, -15.8], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 12, 
    title: 'Flamingo IV (Sağ Alt)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (4’lü Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Flamingo4.JPG', 
    description: 'Dört parçanın birleşimiyle tek bir kuğu/flamingo silüeti oluşturan çağdaş poliptik eser.', 
    position: [-11.9, 1.45, -16.65], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },

  // Piece 4'lü Geometrik Set
  { 
    id: 13, 
    title: 'Piece I', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Geometrik Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Piece1.JPG', 
    description: 'Geometrik renk blokları ve kontrast çizgilerle ritim yakalayan dörtlü soyut kompozisyon.', 
    position: [-11.9, 2.5, -12.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 14, 
    title: 'Piece II', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Geometrik Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Piece2.JPG', 
    description: 'Geometrik renk blokları ve kontrast çizgilerle ritim yakalayan dörtlü soyut kompozisyon.', 
    position: [-11.9, 2.5, -13.35], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 15, 
    title: 'Piece III', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Geometrik Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Piece3.JPG', 
    description: 'Geometrik renk blokları ve kontrast çizgilerle ritim yakalayan dörtlü soyut kompozisyon.', 
    position: [-11.9, 1.45, -12.5], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },
  { 
    id: 16, 
    title: 'Piece IV', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Geometrik Set)', 
    date: '2023', 
    dimensions: '40x40 cm (Panel)', 
    file: '/artworks/Piece4.JPG', 
    description: 'Geometrik renk blokları ve kontrast çizgilerle ritim yakalayan dörtlü soyut kompozisyon.', 
    position: [-11.9, 1.45, -13.35], 
    rotation: [0, Math.PI / 2, 0], 
    height: 0.95 
  },

  // Gelincik Serisi Devamı
  { 
    id: 17, 
    title: 'Gelincik Tarlası', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli)', 
    date: '28.05.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/poppies4.jpg', 
    description: 'Geniş formatta rüzgarla dalgalanan kırmızı gelinciklerin dinamik fırça tuşeleriyle dışavurumu.', 
    position: [-11.9, 2.0, -5.2], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 18, 
    title: 'Gelincikler (Yatay Kompozisyon)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli)', 
    date: '29.05.2023', 
    dimensions: '49.5x34 cm', 
    file: '/artworks/poppy3.jpg', 
    description: 'Yatay kompozisyonda açan gelinciklerin zengin kırmızısı ve yeşil zemin uyumu.', 
    position: [-11.9, 2.0, -2.4], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.35 
  },

  // ========================================================
  // BÖLGE 3: ORTA ADA (SÜRREALİZM & KANVAS ESERLER)
  // ========================================================
  // Ön Yüz (Girişe Bakan Taraf, z = -7.85)
  { 
    id: 19, 
    title: 'Sürreal Girdap', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Dokusal)', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00655.JPG', 
    description: 'Dairesel spiral fırça darbeleri ve renk katmanlarıyla mekan boyutunu kıran mistik ve hareketli sürrealist soyutlama.', 
    position: [-2.6, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 20, 
    title: 'Mistik Figüratif Tuval', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Dokusal)', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00657.JPG', 
    description: 'Kabartma dokular ve sıcak toprak tonları arasında gizlenen figüratif dışavurum.', 
    position: [0, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },
  { 
    id: 21, 
    title: 'Soyut Dışavurum ve Renk Fırtınası', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Dokusal)', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/s-DSC00659.JPG', 
    description: 'Çapraz ve dinamik renk patlamalarıyla içsel enerjiyi tuvale yansıtan zengin yağlıboya dokusu.', 
    position: [2.6, 2.0, -7.85], 
    rotation: [0, 0, 0], 
    height: 1.45 
  },

  // Arka Yüz (Karşı Duvara Bakan Taraf, z = -8.15)
  { 
    id: 22, 
    title: 'Dandelion (Pastel)', 
    artist: 'Zeynep Özçelik',
    category: 'Pastel', 
    date: '16.03.2023', 
    dimensions: '32.8x24 cm', 
    file: '/artworks/g-dandelion1.jpg', 
    description: 'Mavi gökyüzü fonunda özgürlüğe savrulan karahindiba tohumları.', 
    position: [-2.6, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },
  { 
    id: 23, 
    title: 'Kır Bahçesi & Balonlar', 
    artist: 'Zeynep Özçelik',
    category: 'Kanvas Üzerine Yağlıboya', 
    date: '10.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-baloon10-11-23.png', 
    description: 'Pembe ve beyaz kır çiçekleri tarlasının üzerinden göğe yükselen renkli sıcak hava balonları.', 
    position: [0, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },
  { 
    id: 24, 
    title: 'Çilek & Çiçekler', 
    artist: 'Zeynep Özçelik',
    category: 'Kanvas Üzerine Yağlıboya', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-straw07-11-23.png', 
    description: 'Kırmızı olgun çilek dokusu, beyaz çilek çiçeği ve yoğun yeşil yaprakların natürmort çalışması.', 
    position: [2.6, 2.0, -8.15], 
    rotation: [0, Math.PI, 0], 
    height: 1.45 
  },

  // ========================================================
  // BÖLGE 4: BÜYÜK KARŞI DUVAR (BAŞYAPITLAR & AYÇİÇEĞİ TRİPTİK)
  // ========================================================
  { 
    id: 25, 
    title: 'Şarap & Kadeh (Pastel)', 
    artist: 'Zeynep Özçelik',
    category: 'Pastel Natürmort', 
    date: '10.05.2016', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/g-wine1.jpg', 
    description: 'Koyu dramatik arka planda cam şişe yansımaları ve yakut kırmızısı şarabın klasik pastel sunumu.', 
    position: [-9.5, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  
  // 3'lü Ayçiçeği Triptik Serisi (a-)
  { 
    id: 26, 
    title: 'Günebakan Triptik (Sol Panel)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya Triptik', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00923.JPG', 
    description: 'Serginin ana merkezinde yer alan görkemli 3 parçalı ayçiçeği triptiğinin sol kanadı.', 
    position: [-4.2, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 27, 
    title: 'Günebakan Triptik (Merkez Panel)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya Triptik', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00924.JPG', 
    description: 'Güneşi ve yaşam enerjisini simgeleyen ayçiçeği triptiğinin merkez kompozisyonu.', 
    position: [-2.4, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 28, 
    title: 'Günebakan Triptik (Sağ Panel)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya Triptik', 
    date: '28.03.2023', 
    dimensions: '35x70 cm', 
    file: '/artworks/a-DSC00925.JPG', 
    description: 'Görkemli ayçiçeği triptiğinin sağ kanadı.', 
    position: [-0.6, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },

  { 
    id: 29, 
    title: 'Mavi Vazoda Ayçiçekleri', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli)', 
    date: '2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/d-DSC00644.JPG', 
    description: 'Kobalt mavi seramik vazo ile güneş sarısı ayçiçeklerinin fovist renk kontrastı.', 
    position: [2.6, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 30, 
    title: 'Güz Ayçiçeği', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli)', 
    date: '06.11.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/d-sunflower6-11-23.jpg', 
    description: 'Sonbahar hüznü ve altın sarısı tonların sıcak birleşimi.', 
    position: [6.0, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },
  { 
    id: 31, 
    title: 'Beyaz Buket (Kasım Çiçekleri)', 
    artist: 'Zeynep Özçelik',
    category: 'Kanvas Üzerine Yağlıboya', 
    date: '11.11.2023', 
    dimensions: '30x50 cm', 
    file: '/artworks/g-flower11.11.23.png', 
    description: 'Doğal toprak tonlarında ahşap/seramik vazo içinde açan beyaz güller ve çiçek demeti.', 
    position: [9.5, 2.1, -17.9], 
    rotation: [0, 0, 0], 
    height: 1.6 
  },

  // ========================================================
  // BÖLGE 5: SAĞ DUVAR & GİRİŞ KANATLARI (BOTANİK & PEYZAJ)
  // ========================================================
  // Papatyalar (b-)
  { 
    id: 32, 
    title: 'Papatyalar I', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-DSC00634.JPG', 
    description: 'Mavi vazoda saf beyaz papatyaların bahar dinginliğini taşıyan natürmort.', 
    position: [11.9, 2.0, -16.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 33, 
    title: 'Papatyalar II', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-DSC00635.JPG', 
    description: 'Papatya serisi detay çalışması.', 
    position: [11.9, 2.0, -14.4], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 34, 
    title: 'Papatyalar III', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/b-daisies.jpg', 
    description: 'Zarif papatya buketi kompozisyonu.', 
    position: [11.9, 2.0, -12.3], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },

  // Laleler (t- ve c-)
  { 
    id: 35, 
    title: 'Kırmızı Gül Goncası', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli S.K.)', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/t-DSC00660.JPG', 
    description: 'Mavi gökyüzü önünde kırmızı gül goncası ve asil yapraklar.', 
    position: [11.9, 2.0, -9.8], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 36, 
    title: 'Pembe Çiçekler', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli S.K.)', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/t-DSC00662.JPG', 
    description: 'Vazo içinde bahar esintisini yansıtan pembe çiçekler.', 
    position: [11.9, 2.0, -7.7], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 37, 
    title: 'Kır Laleleri', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli S.K.)', 
    date: '30.03.2023', 
    dimensions: '34x49.5 cm', 
    file: '/artworks/t-DSC00664.JPG', 
    description: 'Koyu lacivert zemin üzerinde kırmızı lale ve canlı zemin kontrası.', 
    position: [11.9, 2.0, -5.6], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 38, 
    title: 'Kırmızı Laleler (Çift Tuval)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '01.04.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/c-tulip1.jpg', 
    description: 'Siyah fonda zarifçe yükselen çift kırmızı lale.', 
    position: [11.9, 2.0, -3.5], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },
  { 
    id: 39, 
    title: 'Günebakan Tarlası', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/d-DSC00918.JPG', 
    description: 'Sonsuzluğa uzanan sarı ayçiçeği tarlası ve açık hava ışığı.', 
    position: [11.9, 2.0, -1.4], 
    rotation: [0, -Math.PI / 2, 0], 
    height: 1.35 
  },

  // Kanatlar (z = 0.05)
  { 
    id: 40, 
    title: 'Mavi Kapı & Bisiklet', 
    artist: 'Zeynep Özçelik',
    category: 'Pastel', 
    date: '15.03.2023', 
    dimensions: '24x32.8 cm', 
    file: '/artworks/f-bycycle1.jpg', 
    description: 'Taş sokakta mavi ahşap kapıya yaslanmış nostaljik bisiklet sahnesi.', 
    position: [-9.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 41, 
    title: 'Zambaklar / İris', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '26.03.2023', 
    dimensions: '40x30 cm', 
    file: '/artworks/f-iris1.jpg', 
    description: 'Zengin mor taç yapraklar ve sarı tonlamalarla zarif iris kompozisyonu.', 
    position: [-6.8, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 42, 
    title: 'Gece ve İris', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Siyah Kontrast)', 
    date: '27.03.2023', 
    dimensions: '40x50 cm', 
    file: '/artworks/e-DSC00927.JPG', 
    description: 'Karanlık fonda parıldayan mor taç yapraklar ve derin yağlıboya dokusu.', 
    position: [-4.2, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },

  { 
    id: 43, 
    title: 'Calla Lilies', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/d-calla-lilies1.jpg', 
    description: 'Koyu fonda pembe kala çiçeklerinin yalın ve asil duruşu.', 
    position: [4.2, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 44, 
    title: 'Mavi Çiçek', 
    artist: 'Zeynep Özçelik',
    category: 'Kanvas Üzerine Yağlıboya', 
    date: '07.11.2023', 
    dimensions: '50x70 cm', 
    file: '/artworks/d-flower07-11-23.png', 
    description: 'Gri zemin üzerinde gökyüzü mavisi yapraklarıyla yükselen heykelsi tek çiçek.', 
    position: [6.8, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },
  { 
    id: 45, 
    title: 'Ayçiçeği (Pastel)', 
    artist: 'Zeynep Özçelik',
    category: 'Pastel', 
    date: '18.03.2023', 
    dimensions: '29x21 cm', 
    file: '/artworks/e-sunflower2.jpg', 
    description: 'Canlı pastel renklerle parlayan ayçiçeği portresi.', 
    position: [9.5, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.4 
  },

  { 
    id: 46, 
    title: 'Zümrüt Gül', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/g-DSC00670.JPG', 
    description: 'Koyu zümrüt fonda tek bir kırmızı gülün zarafeti.', 
    position: [-11.0, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 47, 
    title: 'Gül Demeti', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/g-DSC00922.JPG', 
    description: 'Vazo içinde pembe ve kırmızı güllerin klasik natürmort sunumu.', 
    position: [11.0, 2.0, 0.05], 
    rotation: [0, 0, 0], 
    height: 1.35 
  },
  { 
    id: 48, 
    title: 'Beyaz Çiçekler & Vazo', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya', 
    date: '2023', 
    dimensions: '30x40 cm', 
    file: '/artworks/d-DSC00648.JPG', 
    description: 'Nötr fonda dokulu beyaz çiçek buketi.', 
    position: [-2.9, 1.8, 0.2], 
    rotation: [0, Math.PI / 2, 0], 
    height: 1.2 
  },
  { 
    id: 49, 
    title: 'Dandelion (Yağlıboya Kanvas)', 
    artist: 'Zeynep Özçelik',
    category: 'Yağlıboya (Renkli Kanvas)', 
    date: '06.04.2023', 
    dimensions: '70x50 cm', 
    file: '/artworks/c-dandelion2.jpg', 
    description: 'Büyük boy tuval üzerine zengin yağlıboya dokusuyla işlenmiş karahindiba.', 
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

// 2 Parçalı Gelincik Özel Birleşik Çerçevesi
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
      title: 'Kırmızı Gelincikler (İkili Diptik Panel)',
      artist: 'Zeynep Özçelik',
      category: 'Yağlıboya (Renkli)',
      date: '28.03.2023',
      dimensions: '2x (20x40 cm)',
      file: '/artworks/poppy1.jpg',
      description: 'Zeynep Özçelik tarafından 28 Mart 2023 tarihinde çalışılan, birbirini tamamlayan iki dikey panelden oluşan dışavurumcu yağlıboya gelincik ikilisi.'
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

      <mesh position={[0, -(panelH / 2) - 0.08, 0.01]}>
        <planeGeometry args={[Math.min(totalW * 0.6, 0.8), 0.06]} />
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
            <h1>ZEYNEP ÖZÇELİK</h1>
            <p>Sanal Sanat Galerisi &amp; Eser Retrospektifi</p>
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
              <p className="artist-byline">Sanatçı: <strong>{selectedArt.artist || 'Zeynep Özçelik'}</strong></p>
              <p className="art-desc">{selectedArt.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}