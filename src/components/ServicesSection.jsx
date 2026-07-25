import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════════
   SERVICES DATA
   Each card maps to a full-screen editorial card in the stack.
   bg       → card background colour (warm cream family)
   accent   → colour for the number tag and service tags
   img      → right-panel image
═══════════════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    num: '01',
    title: 'Brand',
    tags: ['Look & Feel', 'Core Identity', 'Visual Language'],
    desc: 'We craft compelling brand imagery that resonates with your target audience — from logo design and product photography to a complete, cohesive visual experience.',
    img: 'https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=900&q=85',
    bg: '#F2EDE4',
    accent: '#A8917A',
    text: '#1a1a1a',
  },
  {
    num: '02',
    title: 'Campaign',
    tags: ['Campaign Visuals', 'Editorial', 'Commercial'],
    desc: 'Key visuals, mood boards, and campaign photography across every touchpoint. From fashion editorials to high-impact commercial shoots — we connect moments and memories.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85',
    bg: '#EBE3D8',
    accent: '#8C7A66',
    text: '#1a1a1a',
  },
  {
    num: '03',
    title: 'Content',
    tags: ['Motion & Photography', 'Social Media', 'Digital Assets'],
    desc: 'Full visual content production — from cinematic reels and engaging social media assets to impactful digital designs that inspire your audience and drive real action.',
    img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=85',
    bg: '#E2D9CD',
    accent: '#6E5E4D',
    text: '#1a1a1a',
  },
]

/* ═══════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════ */
const ServicesSection = () => {
  const pinRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current

      /* ── Initial state: every card 110vh below the viewport ── */
      gsap.set(cards, { yPercent: 110, transformOrigin: 'top center' })

      /*
        Timeline is scrubbed 1:1 with scroll.
        Duration units are just relative labels (position labels used below).
        We split the 400vh scroll into 3 equal windows of ~100vh each.

        • t=0→1  : Card 0 (Brand) rises into view
        • t=1→2  : Card 1 (Campaign) rises; Brand retreats (scale + shift up)
        • t=2→3  : Card 2 (Content) rises; Brand & Campaign retreat further
      */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      /* ─ Card 0: Brand slides in ─────────────────────────── */
      tl.to(cards[0],
        { yPercent: 0, ease: 'power2.out', duration: 1 },
        0
      )

      /* ─ Card 1: Campaign slides in; Brand retreats ─────── */
      tl.to(cards[0],
        { y: -52, scale: 0.95, ease: 'none', duration: 1 },
        1
      )
      tl.to(cards[1],
        { yPercent: 0, ease: 'power2.out', duration: 1 },
        1
      )

      /* ─ Card 2: Content slides in; 0&1 retreat further ─── */
      tl.to(cards[0],
        { y: -104, scale: 0.90, ease: 'none', duration: 1 },
        2
      )
      tl.to(cards[1],
        { y: -52, scale: 0.95, ease: 'none', duration: 1 },
        2
      )
      tl.to(cards[2],
        { yPercent: 0, ease: 'power2.out', duration: 1 },
        2
      )

    }, pinRef)

    return () => ctx.revert()
  }, [])

  return (
    /* ── 400 vh pinning container ────────────────────────────────── */
    <section
      ref={pinRef}
      className="relative w-full bg-[#231d15]"
      style={{ height: '400vh' }}
    >
      {/* ── STICKY VIEWPORT ──────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Section meta label ────────────────────────────────── */}
        <div className="absolute top-8 left-0 right-0 flex items-center justify-between px-8 md:px-16 z-50 pointer-events-none">
          <p className="text-[9px] font-semibold tracking-[0.38em] uppercase text-[#6E5E4D]">
            What We Offer
          </p>
          <p className="text-[9px] font-semibold tracking-[0.38em] uppercase text-[#6E5E4D]">
            {String(SERVICES.length).padStart(2, '0')} Services
          </p>
        </div>

        {/* ── CARD STACK ────────────────────────────────────────── */}
        {SERVICES.map((svc, i) => (
          <div
            key={svc.num}
            ref={el => (cardRefs.current[i] = el)}
            className="absolute inset-0 flex items-center justify-center px-5 md:px-14"
            style={{ zIndex: i + 1 }}
          >
            {/*
              Card shell — warm cream with soft shadow.
              Two-column: text left (60%), image right (40%).
            */}
            <div
              className="w-full max-w-6xl rounded-2xl flex overflow-hidden"
              style={{
                background: svc.bg,
                height: 'clamp(420px, 78vh, 680px)',
                boxShadow: '0 48px 120px rgba(0,0,0,0.55)',
              }}
            >

              {/* ── LEFT: Text content ──────────────────────────── */}
              <div
                className="flex flex-col justify-between flex-1 select-none"
                style={{ padding: 'clamp(28px,4vw,60px)' }}
              >
                {/* Top: SERVICES heading + number */}
                <div className="flex items-start justify-between">
                  <h2
                    className="font-black leading-none text-[#1a1a1a]"
                    style={{
                      fontSize: 'clamp(38px,7.5vw,104px)',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    SERVICES
                  </h2>
                  <span
                    className="text-[10px] md:text-[11px] font-black tracking-[0.25em] mt-1 shrink-0"
                    style={{ color: svc.accent }}
                  >
                    {svc.num}
                  </span>
                </div>

                {/* Bottom: service info */}
                <div className="flex flex-col gap-4">

                  {/* Service title */}
                  <h3
                    className="font-black leading-none text-[#1a1a1a]"
                    style={{
                      fontSize: 'clamp(28px,4.5vw,68px)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {svc.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {svc.tags.map((tag, ti) => (
                      <span
                        key={tag}
                        className="text-[9px] md:text-[10px] font-bold tracking-[0.24em] uppercase"
                        style={{ color: svc.accent }}
                      >
                        {tag}{ti < svc.tags.length - 1 && ','}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p
                    className="text-[12px] md:text-[14px] leading-[1.65] max-w-[340px]"
                    style={{ color: '#555' }}
                  >
                    {svc.desc}
                  </p>

                  {/* CTA arrow */}
                  <button
                    className="self-start mt-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-all hover:gap-3"
                    style={{ color: svc.accent }}
                  >
                    <span>Explore</span>
                    <span className="text-base">→</span>
                  </button>
                </div>
              </div>

              {/* ── RIGHT: Image panel ──────────────────────────── */}
              <div
                className="shrink-0 overflow-hidden"
                style={{ width: 'clamp(160px,35%,360px)' }}
              >
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
              </div>

            </div>
          </div>
        ))}

        {/* ── Bottom progress dots ─────────────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 pointer-events-none">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#6E5E4D', opacity: 0.5 }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection
