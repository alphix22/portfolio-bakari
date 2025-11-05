import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Music2 } from "lucide-react";

// Optimized, production-ready single-file React component for Bakari Diallo
// - Entrance animation for main content
// - Lazy-load images & iframes
// - Improved accessible controls and keyboard support
// - Smooth scrolling, subtle performance tweaks
// Notes:
// - Requires Tailwind CSS + framer-motion + lucide-react in the project
// - Put images in public/images/ (bakari-profile.png and fallback-profile.png)

const HERO_SRC = "/images/bakari-profile.png";
const FALLBACK_SRC = "/images/fallback-profile.png";

export default function App() {
  const stats = { fights: 12, wins: 11, kos: 7, losses: 1 };

  const bio = {
    name: "Bakari Diallo",
    nickname: "BakBak",
    nationality: "Française",
    birth: "17 novembre 2003 — Garges-lès-Gonesse",
        height: "1,80 m",
    weightClass: "Welters",
    roles: ["Boxeur professionnel", "Coach d'insertion par le sport", "Sapeur-pompier volontaire"],
  };

  const palmares = [
    "Champion de France amateur — poids super-légers (2023)",
    "Champion du monde IBF jeunes — poids welters (2025)",
  ];

  const timeline = [
    { year: 2003, detail: "Naissance à Garges-lès-Gonesse (17 nov. 2003)" },
    { year: 2023, detail: "Champion de France espoir (amateur) — passe professionnel la même année" },
    { year: 2023, detail: "Début en pro ; seule défaite en décembre 2023 par DQ contre Jordan Gonzalez" },
    { year: 2024, detail: "Devient sapeur-pompier volontaire et coach d'insertion par le sport" },
    { year: 2025, detail: "30 avril 2025 : Remporte le titre IBF Youth des poids welters" },
  ];

  const videos = [
    { title: "Les boxeurs du dimanche", id: "OpSKafUvE0s" },
    { title: "100% Fight", id: "4ueIUQkzLIU" },
    { title: "TV Monaco", id: "YDbDAC9cylw" },
    { title: "The Goat MMA Boxing", id: "IVQaCDF5tU8" },
    { title: "Julien Cazier", id: "ThEgQik-KDQ" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="w-5 h-5" aria-hidden />, color: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500", url: "https://www.instagram.com/baakari.diallo?igsh=Yjc0dXI2NHVkNGp4&utm_source=qr" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" aria-hidden />, color: "bg-blue-600", url: "https://www.linkedin.com/in/bakari-diallo-172ba926b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
    { name: "TikTok", icon: <Music2 className="w-5 h-5" aria-hidden />, color: "bg-black", url: "https://www.tiktok.com/@baakari.diallo?_t=ZN-90pEWkRb8PW&_r=1" },
  ];

  const statLabels = { fights: "Combats", wins: "Victoires", kos: "KOs", losses: "Défaites" };

  // Video carousel state
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [iframeLoadedIndex, setIframeLoadedIndex] = useState(null); // for lazy iframe mounting
  const timerRef = useRef(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [statsMenuOpen, setStatsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const statsMenuRef = useRef(null);
  const statsButtonRef = useRef(null);

  useEffect(() => {
    // Entrance animation handled by motion; set up autoplay
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % videos.length);
      }, 7000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  // Close about view on Escape
  useEffect(() => {
    if (!aboutOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setAboutOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [aboutOpen]);

  // Close stats dropdown on outside click or Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (!statsMenuOpen) return;
      if (statsMenuRef.current && !statsMenuRef.current.contains(e.target) && statsButtonRef.current && !statsButtonRef.current.contains(e.target)) {
        setStatsMenuOpen(false);
      }
    };
    const onKey = (e) => { if (e.key === 'Escape') setStatsMenuOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [statsMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    // ensure current video's iframe is allowed to render
    setIframeLoadedIndex(current);
  }, [current]);

  const next = () => setCurrent((c) => (c + 1) % videos.length);
  const prev = () => setCurrent((c) => (c - 1 + videos.length) % videos.length);

  const getYoutubeThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const getYoutubeEmbed = (id) => `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;

  // Accessibility: keyboard handlers
  const onKeyNav = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white antialiased" onKeyDown={onKeyNav} tabIndex={0}>
      {/* Global smooth scroll */}
      <style>{`html{scroll-behavior:smooth} .visually-hidden{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px,1px,1px,1px);white-space:nowrap;border:0;padding:0;margin:-1px}`}</style>

  <header className="bg-gradient-to-br from-black/95 via-black/90 to-black/95 shadow-2xl backdrop-blur-sm border-b border-transparent sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="w-12 h-12 rounded-full bg-gradient-to-br from-black/40 to-black/60 flex items-center justify-center ring-2 ring-yellow-400/40 text-yellow-400 font-bold shadow-[0_0_15px_rgba(255,215,0,0.18)]" aria-hidden>
                BK
              </motion.div>
              <div>
                <h1 className="text-xl font-extrabold leading-tight tracking-wide text-yellow-400 drop-shadow-lg">
                  {bio.name} <span className="text-sm text-white/90 font-medium">({bio.nickname})</span>
                </h1>
                <p className="text-xs text-white/80">Boxeur — {bio.weightClass} • {bio.nationality}</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
              <a href="#about" className="hover:text-yellow-400 transition" onClick={(e)=>{e.preventDefault(); setAboutOpen(true);}}>À propos</a>
              <div className="relative">
                <button
                  ref={statsButtonRef}
                  onClick={(e) => { e.preventDefault(); setStatsMenuOpen((s) => !s); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStatsMenuOpen((s) => !s); } }}
                  aria-haspopup="true"
                  aria-expanded={statsMenuOpen}
                  className="hover:text-yellow-400 transition flex items-center gap-2"
                >
                  Statistiques
                  <svg className="w-3 h-3 text-yellow-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {statsMenuOpen && (
                    <motion.div
                      ref={statsMenuRef}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      className="absolute left-0 mt-2 w-64 bg-black/90 rounded-lg shadow-2xl border border-transparent z-40"
                    >
                      <div className="py-2">
                        <a
                          href="https://boxrec.com/en/proboxer/1128110"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-yellow-200 hover:bg-yellow-500/8"
                        >Profil BoxRec</a>

                        <a
                          href="https://www.tapology.com/fightcenter/fighters/387994-bakari-diallo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-yellow-200 hover:bg-yellow-500/8"
                        >Profil Tapology</a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="#palmares" className="hover:text-yellow-400 transition" onClick={(e)=>{e.preventDefault(); document.getElementById('palmares')?.scrollIntoView({behavior:'smooth'})}}>Palmarès</a>
              <a href="#timeline" className="hover:text-yellow-400 transition" onClick={(e)=>{e.preventDefault(); document.getElementById('timeline')?.scrollIntoView({behavior:'smooth'})}}>Chronologie</a>
              <a href="#videos" className="hover:text-yellow-400 transition" onClick={(e)=>{e.preventDefault(); document.getElementById('videos')?.scrollIntoView({behavior:'smooth'})}}>Vidéos</a>
              <a href="#contact" className="hover:text-yellow-400 transition" onClick={(e)=>{e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}>Réseaux</a>
            </nav>

            {/* Mobile menu (toggle + panel) */}
            <div className="md:hidden">
              <button
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="px-3 py-2 rounded bg-black/40"
              >
                Menu
              </button>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    key="mobile-menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-50"
                  >
                    {/* Backdrop (z-40 to ensure click) */}
                    <div className="absolute inset-0 bg-black/60 z-40" onClick={() => setMobileMenuOpen(false)} />

                    {/* Panel */}
                    <motion.nav
                      initial={{ y: -18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -18, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      className="relative bg-gradient-to-br from-black/95 to-black/90 rounded-b-2xl mx-4 mt-6 p-4 shadow-2xl border border-transparent max-w-md z-50"
                      aria-label="Mobile navigation"
                    >
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Fermer le menu"
                        className="absolute right-4 top-4 bg-black/30 hover:bg-black/50 text-yellow-300 rounded-full w-9 h-9 flex items-center justify-center"
                      >✕</button>
                      <div className="flex flex-col gap-3 text-sm font-medium mt-10">
                        <button onClick={() => { setAboutOpen(true); setMobileMenuOpen(false); }} className="text-left hover:text-yellow-400 transition">À propos</button>
                        <button onClick={() => { setMobileMenuOpen(false); window.open('https://boxrec.com/en/proboxer/1128110', '_blank'); }} className="text-left hover:text-yellow-400 transition">Profil BoxRec</button>
                        <button onClick={() => { setMobileMenuOpen(false); window.open('https://www.tapology.com/fightcenter/fighters/387994-bakari-diallo', '_blank'); }} className="text-left hover:text-yellow-400 transition">Profil Tapology</button>
                        <button onClick={() => { setMobileMenuOpen(false); document.getElementById('palmares')?.scrollIntoView({behavior:'smooth'}) }} className="text-left hover:text-yellow-400 transition">Palmarès</button>
                        <button onClick={() => { setMobileMenuOpen(false); document.getElementById('timeline')?.scrollIntoView({behavior:'smooth'}) }} className="text-left hover:text-yellow-400 transition">Chronologie</button>
                        <button onClick={() => { setMobileMenuOpen(false); document.getElementById('videos')?.scrollIntoView({behavior:'smooth'}) }} className="text-left hover:text-yellow-400 transition">Vidéos</button>
                        <button onClick={() => { setMobileMenuOpen(false); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}) }} className="text-left hover:text-yellow-400 transition">Réseaux</button>
                      </div>
                    </motion.nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            key="about-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop with blur for harmony */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setAboutOpen(false)} />

              <motion.article
              role="dialog"
              aria-modal="true"
              aria-label="À propos de Bakari Diallo"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 28, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="relative w-full max-w-5xl mx-4 bg-gradient-to-br from-black/85 to-black/70 rounded-2xl shadow-2xl border border-transparent text-white overflow-auto max-h-[90vh]"
            >
              <div className="p-6 lg:p-8">
                <button
                  onClick={() => setAboutOpen(false)}
                  aria-label="Fermer"
                  className="absolute right-4 top-4 bg-black/30 hover:bg-black/50 text-yellow-300 rounded-full w-9 h-9 flex items-center justify-center"
                >
                  ✕
                </button>

                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-extrabold text-yellow-400 mb-4">À propos</h2>
                  <p className="text-base leading-relaxed opacity-90 mb-4">Jeune prodige de la boxe française, Bakari Diallo s’impose déjà comme un nom à suivre sur la scène internationale. Né de parents maliens et élevé à Garges-lès-Gonesse, il découvre très tôt la boxe dans son club local. Rapidement, son talent éclate et il devient champion de France espoir amateur en 2023, avant de se lancer dans le monde professionnel la même année.</p>

                  <p className="text-base leading-relaxed opacity-90 mb-4">En dehors du ring, Bakari est un homme engagé : coach d’insertion par le sport et sapeur-pompier volontaire depuis 2024, il combine performance et responsabilité sociale.</p>

                  <h3 className="text-xl font-bold text-yellow-400 mt-4">Parcours professionnel</h3>
                  <p className="text-sm opacity-90 mb-3">Bakari Diallo fait sensation dès ses débuts professionnels en 2023, enchaînant les victoires, souvent avant la limite. Sa seule défaite survient en décembre 2023 face à Jordan Gonzalez, suite à une disqualification pour un coup de tête.</p>
                  <p className="text-sm opacity-90 mb-3">Le 30 avril 2025, à Neuilly-sur-Marne, il remporte un combat décisif contre le Vénézuélien Algerbis Gonzalez. Après avoir été mis au tapis deux fois dès le premier round, il revient avec force et impose l’arrêt de l’arbitre au 4ᵉ round, décrochant ainsi le titre IBF jeunes des poids welters.</p>

                  <h3 className="text-xl font-bold text-yellow-400 mt-4">Style et forces</h3>
                  <p className="text-sm opacity-90 mb-3">Bakari est un boxeur à l’agressivité calculée : rythme élevé, volume de coups impressionnant et capacité à presser ses adversaires dès le premier round. Son style offensif et sa détermination font de lui un compétiteur redoutable, capable de transformer chaque combat en démonstration de puissance et de technique.</p>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* HERO / ABOUT */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.12)] bg-gradient-to-r from-black/40 to-black/60 p-6 flex flex-col sm:flex-row items-center gap-6 border border-transparent cursor-pointer"
              role="button"
              aria-label="Ouvrir À propos — Bakari Diallo"
              tabIndex={0}
              onClick={() => setAboutOpen(true)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setAboutOpen(true); } }}
            >

              <img
                src={HERO_SRC}
                alt={`${bio.name} — portrait`}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = FALLBACK_SRC }}
                className="w-48 h-48 object-cover rounded-full ring-4 ring-yellow-400/30 shadow-[0_0_25px_rgba(255,215,0,0.12)]"
              />

              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 drop-shadow-md">{bio.name} <span className="text-lg text-white font-semibold opacity-90">— {bio.nickname}</span></h2>
                <p className="mt-2 text-sm opacity-90">Boxeur professionnel français d’origine malienne, alliant puissance, technique et volume offensif. Une trajectoire ascendante pleine de promesses.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {bio.roles.map((r) => (<span key={r} className="text-xs px-3 py-1 bg-yellow-400/8 border border-transparent text-yellow-300 rounded-full">{r}</span>))}
                </div>
              </div>
            </motion.div>
          </div>

          <aside id="stats" className="bg-gradient-to-br from-yellow-500/8 to-black/28 rounded-2xl p-4 shadow-lg border border-transparent">
            <h3 className="text-lg font-bold text-yellow-400">Statistiques pro</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              {Object.entries(stats).map(([k, v]) => (
                <motion.div key={k} whileHover={{ scale: 1.03 }} className="p-3 bg-black/40 rounded border border-transparent">
                  <div className="text-xs opacity-80">{statLabels[k] ?? k}</div>
                  <div className="text-2xl font-extrabold text-yellow-400">{v}</div>
                </motion.div>
              ))}
            </div>
          </aside>
        </section>

        {/* PALMARES */}
  <section id="palmares" className="mt-10 bg-gradient-to-r from-black/50 to-black/70 rounded-2xl p-6 border border-transparent shadow-lg">
          <h3 className="text-2xl font-extrabold text-yellow-400">Palmarès</h3>
          <ul className="mt-4 space-y-3">
            {palmares.map((p) => (<li key={p} className="bg-black/20 border border-transparent p-3 rounded-lg hover:bg-yellow-500/8 transition">{p}</li>))}
          </ul>
        </section>

        {/* TIMELINE & STYLE */}
        <section id="timeline" className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div className="bg-gradient-to-br from-black/40 to-black/70 rounded-2xl p-6 border border-transparent shadow-lg">
            <h4 className="text-xl font-bold text-yellow-400">Chronologie de carrière</h4>
            <ol className="mt-4 border-l border-yellow-500/12 pl-4 space-y-4">
              {timeline.map((t) => (
                <motion.li key={t.year} className="relative" whileHover={{ x: 4 }}>
                  <div className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-black" />
                  <div className="text-sm opacity-90 font-medium">{t.year}</div>
                  <div className="text-sm opacity-80">{t.detail}</div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.div className="bg-gradient-to-br from-yellow-500/8 to-black/50 rounded-2xl p-6 flex flex-col gap-4 border border-transparent text-center items-center" whileHover={{ scale: 1.02 }}>
            <h4 className="text-xl font-bold text-yellow-400">Style de boxe</h4>
            <br></br>
            <p className="opacity-90">Boxeur à fort volume de coups, alliant explosivité, gestion du rythme et précision. Toujours à la recherche de la finition rapide.</p>
            <motion.blockquote className="italic opacity-80 text-yellow-300" whileHover={{ scale: 1.02 }}>« Boxer à haute intensité : imposer le rythme, aller au corps, terminer le combat. »</motion.blockquote>
          </motion.div>
        </section>

        {/* VIDEOS (lazy iframe + carousel + thumbnails) */}
  <section id="videos" className="mt-10 bg-gradient-to-r from-black/50 to-black/70 rounded-2xl p-6 border border-transparent shadow-lg">
          <h3 className="text-2xl font-extrabold text-yellow-400">Vidéos & Interviews</h3>
          <p className="mt-2 text-sm opacity-80"></p>

          <div className="mt-6">
            <div className="relative" onMouseEnter={() => setIsPlaying(false)} onMouseLeave={() => setIsPlaying(true)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="bg-black/40 rounded-xl overflow-hidden shadow-lg max-w-3xl mx-auto"
                >
                  <div className="aspect-video w-full bg-black relative">
                    {/* Only mount iframe for current (lazy) to reduce network */}
                    {iframeLoadedIndex === current ? (
                      <iframe
                        src={getYoutubeEmbed(videos[current].id)}
                        title={videos[current].title}
                        loading="lazy"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <button
                        aria-label={`Charger la vidéo ${videos[current].title}`}
                        className="w-full h-full flex items-center justify-center bg-black"
                        onClick={() => setIframeLoadedIndex(current)}
                      >
                        <img src={getYoutubeThumb(videos[current].id)} alt={`Vignette ${videos[current].title}`} loading="lazy" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-yellow-400/80 text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md">►</div>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="p-3 text-center text-sm font-medium text-yellow-300">{videos[current].title}</div>
                </motion.div>
              </AnimatePresence>

              <button onClick={prev} aria-label="Précédent" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-yellow-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-lg">
                ‹
              </button>
              <button onClick={next} aria-label="Suivant" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-yellow-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-lg">
                ›
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto py-2 items-center justify-center">
              {videos.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => { setCurrent(i); setIframeLoadedIndex(i); }}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 ${i === current ? "border-yellow-400" : "border-transparent"} shadow-md`}
                  aria-label={`Voir ${v.title}`}
                >
                  <img src={getYoutubeThumb(v.id)} alt={v.title} loading="lazy" className="w-32 h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIALS */}
  <section id="contact" className="mt-10 bg-gradient-to-r from-yellow-500/8 to-black/50 rounded-2xl p-6 text-center border border-transparent shadow-lg">
          <h3 className="text-2xl font-extrabold mb-6 text-yellow-400">Réseaux officiels</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0px 6px 24px rgba(255,215,0,0.12)" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`flex items-center justify-center gap-2 px-6 py-3 ${link.color} text-white rounded-xl font-semibold shadow-md hover:opacity-95 transition-all`}
                aria-label={`Ouvrir ${link.name} — Bakari Diallo`}
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.a>
            ))}
          </div>
        </section>

        <footer className="mt-8 py-6 text-center text-yellow-400 opacity-90 text-xs tracking-wide border-t border-transparent">
          © {new Date().getFullYear()} {bio.name} — Portfolio. Tous droits réservés.
        </footer>
      </motion.main>
    </div>
  );
}
