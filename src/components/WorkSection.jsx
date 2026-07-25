import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const IMAGES = [
  /* ── GROUP A: visible from scroll=0 ──────────────────────────────
     Each image has its own toY so they ALL exit at exactly 80% scroll
     regardless of their CSS top position: toY = -(top_in_vh + 40)    */
  {
    id: '01', title: 'Eternal Vows', category: 'Weddings', group: 'A',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85',
    pos: { top: '8vh', left: '3vw' },
    size: { width: '22vw', height: '30vw', maxWidth: 360, maxHeight: 500 },
    toY: '-48vh',   // -(8+40) → exits at 80% scroll
  },
  {
    id: '02', title: 'Golden Hour', category: 'Portraits', group: 'A',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85',
    pos: { top: '52vh', right: '4vw' },
    size: { width: '24vw', height: '17vw', maxWidth: 400, maxHeight: 280 },
    toY: '-92vh',   // -(52+40)
  },
  {
    id: '03', title: 'Urban Stories', category: 'Events', group: 'A',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=85',
    pos: { top: '18vh', right: '29vw' },
    size: { width: '18vw', height: '26vw', maxWidth: 300, maxHeight: 430 },
    toY: '-58vh',   // -(18+40)
  },
  {
    id: '04', title: 'Quiet Light', category: 'Portraits', group: 'A',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=85',
    pos: { top: '44vh', left: '30vw' },
    size: { width: '20vw', height: '24vw', maxWidth: 330, maxHeight: 395 },
    toY: '-84vh',   // -(44+40)
  },

  /* ── GROUP B: fromY:70vh so images sit near bottom at scroll=0 ──
     Visually present from start (bottom of screen) and rise into center.
     Staggered startPct creates sequential entry with no empty moment.   */
  {
    id: '05', title: 'Silent Frames', category: 'Architecture', group: 'B',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',
    pos: { top: '12vh', left: '5vw' },
    size: { width: '26vw', height: '21vw', maxWidth: 430, maxHeight: 345 },
    fromY: '70vh', toY: '-100vh',
    startPct: 8, endPct: 75,
  },
  {
    id: '06', title: 'Bloom & Bliss', category: 'Weddings', group: 'B',
    img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=85',
    pos: { top: '50vh', right: '5vw' },
    size: { width: '21vw', height: '30vw', maxWidth: 350, maxHeight: 500 },
    fromY: '70vh', toY: '-100vh',
    startPct: 18, endPct: 82,
  },
  {
    id: '07', title: 'Raw Emotion', category: 'Candid', group: 'B',
    img: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&q=85',
    pos: { top: '24vh', left: '34vw' },
    size: { width: '19vw', height: '27vw', maxWidth: 320, maxHeight: 445 },
    fromY: '70vh', toY: '-100vh',
    startPct: 12, endPct: 79,
  },
  {
    id: '08', title: 'Timeless Brand', category: 'Brands', group: 'B',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85',
    pos: { top: '62vh', right: '27vw' },
    size: { width: '22vw', height: '16vw', maxWidth: 370, maxHeight: 265 },
    fromY: '70vh', toY: '-100vh',
    startPct: 22, endPct: 88,
  },

  /* ── GROUP C: fromY:85vh, enters from 45-52%, STAYS at end ─────── */
  {
    id: '09', title: 'Winter Light', category: 'Portraits', group: 'C',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=85',
    pos: { top: '10vh', left: '4vw' },
    size: { width: '24vw', height: '33vw', maxWidth: 400, maxHeight: 545 },
    fromY: '85vh', startPct: 45,
  },
  {
    id: '10', title: 'Street Souls', category: 'Documentary', group: 'C',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85',
    pos: { top: '52vh', right: '4vw' },
    size: { width: '22vw', height: '30vw', maxWidth: 370, maxHeight: 490 },
    fromY: '85vh', startPct: 45,
  },
  {
    id: '11', title: 'Sacred Vows', category: 'Weddings', group: 'C',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85',
    pos: { top: '18vh', right: '27vw' },
    size: { width: '20vw', height: '26vw', maxWidth: 340, maxHeight: 430 },
    fromY: '85vh', startPct: 48,
  },
  {
    id: '12', title: 'Neon Nights', category: 'Events', group: 'C',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=85',
    pos: { top: '60vh', left: '30vw' },
    size: { width: '21vw', height: '15vw', maxWidth: 355, maxHeight: 250 },
    fromY: '85vh', startPct: 52,
  },
]

/* ── Background depth images ─────────────────────────────────────── */
const BG_IMAGES = [
  {
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=40',
    pos: { top: '5vh', right: '14vw' },
    size: { width: '28vw', maxWidth: 480, height: '40vw', maxHeight: 660 },
    blur: 16, opacity: 0.15, fromY: 0, toY: '-55vh',
  },
  {
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=40',
    pos: { top: '55vh', left: '18vw' },
    size: { width: '33vw', maxWidth: 560, height: '23vw', maxHeight: 390 },
    blur: 20, opacity: 0.11, fromY: 0, toY: '-40vh',
  },
  {
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=40',
    pos: { top: '20vh', left: '2vw' },
    size: { width: '18vw', maxWidth: 300, height: '28vw', maxHeight: 465 },
    blur: 14, opacity: 0.18, fromY: '60vh', toY: '-70vh',
  },
  {
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=40',
    pos: { top: '30vh', right: '3vw' },
    size: { width: '20vw', maxWidth: 340, height: '30vw', maxHeight: 500 },
    blur: 18, opacity: 0.13, fromY: '80vh', toY: '-60vh',
  },
  {
    img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=40',
    pos: { top: '45vh', left: '55vw' },
    size: { width: '24vw', maxWidth: 400, height: '16vw', maxHeight: 270 },
    blur: 22, opacity: 0.10, fromY: '100vh', toY: '-40vh',
  },
]


/* ══════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════ */
const WorkSection = () => {
  const sectionRef = useRef(null)
  const imgRefs = useRef([])
  const bgRefs = useRef([])
  const labelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Background parallax (shared full-section trigger) ── */
      bgRefs.current.forEach((el, i) => {
        if (!el) return
        const item = BG_IMAGES[i]
        gsap.fromTo(el,
          { y: item.fromY },
          {
            y: item.toY,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 2,
            },
          }
        )
      })

      /* ── Foreground images — per-group triggers ── */
      imgRefs.current.forEach((el, i) => {
        if (!el) return
        const item = IMAGES[i]

        if (item.group === 'A') {
          /*
            Each image has its own `toY` = -(CSS_top + 40).
            This means every image exits the viewport at EXACTLY the
            trigger end (80% scroll), regardless of where it starts.
            Avoids the gap where early images exit while others haven't.
          */
          gsap.fromTo(el,
            { y: 0 },
            {
              y: item.toY,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '80% top',   // extended from 55% → much slower exit
                scrub: 1.5,
              },
            }
          )

        } else if (item.group === 'B') {
          /*
            fromY:70vh → images start near the bottom of screen at scroll=0,
            rising into the center as the section plays. No dead period.
          */
          gsap.fromTo(el,
            { y: item.fromY },
            {
              y: item.toY,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${item.startPct}% top`,
                end: `${item.endPct}% top`,
                scrub: 1.5,
              },
            }
          )

        } else if (item.group === 'C') {
          /* Enters from below (fromY:85vh), settles at CSS position (y→0), STAYS */
          gsap.fromTo(el,
            { y: item.fromY },
            {
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${item.startPct}% top`,
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          )
        }
      })

      /* ── Label fades as you begin scrolling ── */
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: 0,
          y: -20,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '8% top',
            scrub: true,
          },
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    /*
      ── OUTER SCROLL DRIVER ───────────────────────────────────────
      450vh = scroll canvas. No overflow:hidden here so images
      positioned via y-transforms below the fold are not clipped.
      The sticky inner locks to viewport while outer section scrolls.
    */
    <section
      ref={sectionRef}
      className="relative w-full bg-[#100d09]"
      style={{ height: '450vh' }}
    >
      {/* ── STICKY VIEWPORT ──────────────────────────────────────────
          NO overflow:hidden — images start off-screen via GSAP y
          transform (not via top > 100vh), so no clipping issue.
      ─────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full">

        {/* Cinematic vignette — warm deep-brown radial + top/bottom fades */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 90% 85% at 50% 50%,
                transparent 40%,
                rgba(33, 31, 29, 0.72) 100%),
              linear-gradient(to bottom,
                rgba(69, 46, 23, 0.65) 0%,
                transparent 16%,
                transparent 82%,
                rgba(16,13,9,0.82) 100%)
            `,
          }}
        />

        {/* ── Section label (disappears at scroll start) ── */}
        <div
          ref={labelRef}
          className="absolute top-9 left-0 w-full flex items-start justify-between px-8 md:px-14 z-30 pointer-events-none"
        >
          <div>
            <p className="text-[9px] font-semibold tracking-[0.38em] uppercase text-[#A8917A] mb-1">
              Selected Work
            </p>
            <h2 className="text-[clamp(20px,3.2vw,44px)] font-black tracking-tighter text-[#F2EDE4] leading-none">
              PORTFOLIO
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[9px] font-semibold tracking-[0.38em] uppercase text-[#A8917A] mb-1">
              Projects
            </p>
            <p className="text-[clamp(20px,3.2vw,44px)] font-black tracking-tighter text-[#F2EDE4] leading-none">
              {String(IMAGES.length).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* ── BACKGROUND DEPTH LAYER (blur / slow parallax) ────────── */}
        {BG_IMAGES.map((item, i) => (
          <div
            key={`bg-${i}`}
            ref={el => (bgRefs.current[i] = el)}
            className="absolute overflow-hidden rounded-xl pointer-events-none select-none hidden md:block"
            style={{
              ...item.pos,
              ...item.size,
              filter: `blur(${item.blur}px)`,
              opacity: item.opacity,
              zIndex: 2,
              willChange: 'transform',
            }}
          >
            <img
              src={item.img} alt=""
              className="w-full h-full object-cover"
              loading="lazy" draggable={false}
            />
          </div>
        ))}

        {/* ── FOREGROUND IMAGE GALLERY ──────────────────────────────── */}
        {IMAGES.map((work, i) => (
          <div
            key={work.id}
            ref={el => (imgRefs.current[i] = el)}
            className="absolute overflow-hidden rounded-xl group select-none"
            style={{
              ...work.pos,
              ...work.size,
              zIndex: 10,
              willChange: 'transform',
              boxShadow: '0 28px 75px rgba(0,0,0,0.75)',
            }}
          >
            <img
              src={work.img}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              draggable={false}
            />

            {/* Gradient + label */}
            <div
              className="absolute inset-0 flex flex-col justify-end"
              style={{
                background: 'linear-gradient(to top, rgba(12,9,6,0.94) 0%, transparent 54%)',
                padding: '14px 16px',
              }}
            >
              <p className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-[#C8B89A] leading-none mb-1">
                {work.category}
              </p>
              <h3 className="text-[13px] md:text-[15px] font-bold text-[#F2EDE4] tracking-tight leading-tight">
                {work.title}
              </h3>
            </div>

            {/* ID badge */}
            <span className="absolute top-3 right-3 text-[11px] font-black tracking-widest select-none" style={{ color: 'rgba(200,184,154,0.18)' }}>
              {work.id}
            </span>
          </div>
        ))}

        {/* ── Scroll hint ── */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#6b5740]" />
          <span className="text-[8px] tracking-[0.35em] uppercase text-[#6b5740] font-semibold">
            Scroll
          </span>
        </div>

      </div>
    </section>
  )
}

export default WorkSection
