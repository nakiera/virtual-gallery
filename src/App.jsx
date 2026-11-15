import React, { lazy, Suspense, useState } from 'react';
import './App.css';

// Keep the initial visit lightweight: Three.js and all scene code are loaded
// only after the visitor explicitly enters the gallery.
const GalleryExperience = lazy(() => import('./GalleryExperience.jsx'));

const LANDING_FEATURES = [
  { label: 'THE COLLECTION', title: 'A study in light and colour', image: '/artworks/1-baloon.png', description: 'Balloon Float' },
  { label: 'THE DETAILS', title: 'Moments worth exploring', image: '/artworks/2-straw.png', description: 'Strawberry Bloom' },
  { label: 'THE EXPERIENCE', title: 'A gallery without closing hours', image: '/artworks/9-lillies4.jpg', description: 'Lillies' }
];

function GalleryLanding({ onEnter, onTour }) {
  return (
    <main className="gallery-landing">
      <div className="landing-grain" aria-hidden="true" />
      <header className="landing-nav">
        <a className="landing-brand" href="#home" aria-label="GradPixel art exhibition, home">
          <span className="landing-brand-mark">G<span>·</span>P</span>
          <span className="landing-brand-name">GRADPIXEL <small>ART EXPERIENCES</small></span>
        </a>
        <div className="landing-nav-right">
          <span className="landing-edition">PRIVATE EXHIBITION <span> / </span> 2026</span>
          <button type="button" className="landing-nav-enter" onClick={onEnter}>Explore exhibition <span aria-hidden="true">↗</span></button>
        </div>
      </header>
      <section className="landing-hero" id="home">
        <div className="landing-hero-copy">
          <div className="landing-kicker"><span className="landing-line" /> A CURATED VIRTUAL EXHIBITION</div>
          <h1>Art, without<br/><em>boundaries.</em></h1>
          <p className="landing-artist">THE WORKS OF <strong>ZEYNEP ÖZÇELİK</strong></p>
          <p className="landing-intro">Step inside an intimate digital gallery. Discover each painting at its individual scale, move freely through the space, and linger over the stories behind the work.</p>
          <div className="landing-hero-actions">
            <button className="landing-cta" type="button" onClick={onEnter}>Enter the gallery <span aria-hidden="true">↗</span></button>
            <button className="landing-cta-secondary" type="button" onClick={onTour}>Start guided tour <span aria-hidden="true">→</span></button>
          </div>
          <div className="landing-hero-caption"><span className="landing-diamond">◇</span> AN IMMERSIVE, SELF-GUIDED ART EXPERIENCE</div>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-visual-accent" aria-hidden="true" />
          <div className="landing-feature-frame">
            <img src="/artworks/2-straw.png" alt="Strawberry Bloom by Zeynep Özçelik" fetchPriority="high" />
          </div>
          <div className="landing-image-label"><span>01 / SELECTED WORK</span><span>STRAWBERRY BLOOM</span></div>
          <div className="landing-side-text" aria-hidden="true">THE ART OF SEEING DIFFERENTLY</div>
        </div>
      </section>
      <section className="landing-curation" aria-label="Exhibition highlights">
        <div className="landing-section-heading"><div><span className="landing-mini-eyebrow">SELECTED HIGHLIGHTS</span><h2>An invitation to look closer.</h2></div><p>Every work has a story. Explore the collection at your own pace.</p></div>
        <div className="landing-work-grid">
          {LANDING_FEATURES.map((work, index) => (
            <button key={work.description} type="button" className="landing-work" onClick={onEnter} aria-label={`Visit the gallery to see ${work.description}`}>
              <div className="landing-work-image"><img src={work.image} alt={work.description} loading="lazy" /></div>
              <span className="landing-work-number">0{index + 1} <span>/</span> {work.label}</span>
              <h3>{work.title}</h3>
              <span className="landing-work-link">Discover in gallery ↗</span>
            </button>
          ))}
        </div>
      </section>
      <footer className="landing-footer"><span>© 2026 GRADPIXEL · DIGITAL ART EXPERIENCES</span><span>CREATED FOR ART, DESIGNED FOR EVERY SCREEN</span><button type="button" onClick={onTour}>BEGIN THE TOUR ↗</button></footer>
    </main>
  );
}


export default function App() {
  const [screen, setScreen] = useState('landing');
  const [guided, setGuided] = useState(false);

  const enter = () => { setGuided(false); setScreen('gallery'); };
  const tour = () => { setGuided(true); setScreen('gallery'); };
  const home = () => { setScreen('landing'); setGuided(false); };

  if (screen === 'landing') return <GalleryLanding onEnter={enter} onTour={tour} />;

  return (
    <Suspense fallback={
      <main className="gallery-loading" role="status" aria-live="polite">
        <span className="gallery-loading-wordmark">GRADPIXEL <span>·</span> ART EXPERIENCES</span>
        <span className="gallery-loading-rule" aria-hidden="true" />
        <p>Preparing your private exhibition…</p>
        <button type="button" onClick={home}>← Return to exhibition</button>
      </main>
    }>
      <GalleryExperience initialTour={guided} onHome={home} />
    </Suspense>
  );
}
