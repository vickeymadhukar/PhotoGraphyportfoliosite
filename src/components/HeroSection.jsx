import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HiOutlineMenuAlt3, HiOutlineCamera } from 'react-icons/hi'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaInstagram, FaBehance, FaPinterestP } from 'react-icons/fa'

/* ── Component ──────────────────────────────────────────────── */

const HeroSection = () => {
  const sectionRef = useRef(null)
  const navRef = useRef(null)
  const badgeRef = useRef(null)
  const capturingRef = useRef(null)
  const momentsRef = useRef(null)
  const arrowRef = useRef(null)
  const taglineRef = useRef(null)
  const btnsRef = useRef(null)
  const availRef = useRef(null)
  const socialRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(navRef.current, { y: -40, opacity: 0, duration: 0.7 })
      tl.from(badgeRef.current, { y: -12, opacity: 0, duration: 0.5 }, '-=0.3')
      tl.from(capturingRef.current, { x: -40, opacity: 0, duration: 0.8 }, '-=0.2')
      tl.from(momentsRef.current, { x: 40, opacity: 0, duration: 0.8 }, '-=0.6')
      tl.from(taglineRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
      tl.from(btnsRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.35')

      if (availRef.current) {
        tl.from(availRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.4')
      }

      if (socialRef.current) {
        tl.from(socialRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.35')
      }
    }, sectionRef)

    // ── Mouse Cursor Follower Setup ─────────────────────────────
    const arrowEl = arrowRef.current
    const sectionEl = sectionRef.current

    if (arrowEl && sectionEl) {
      const xTo = gsap.quickTo(arrowEl, 'x', { duration: 0.08, ease: 'power3.out' })
      const yTo = gsap.quickTo(arrowEl, 'y', { duration: 0.08, ease: 'power3.out' })

      const handleMouseMove = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }

      const handleMouseEnter = () => {
        gsap.to(arrowEl, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' })
      }

      const handleMouseLeave = () => {
        gsap.to(arrowEl, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' })
      }

      sectionEl.addEventListener('mousemove', handleMouseMove)
      sectionEl.addEventListener('mouseenter', handleMouseEnter)
      sectionEl.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        ctx.revert()
        sectionEl.removeEventListener('mousemove', handleMouseMove)
        sectionEl.removeEventListener('mouseenter', handleMouseEnter)
        sectionEl.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] min-h-[650px] md:h-screen bg-[#F2EDE4] overflow-hidden font-sans md:cursor-none">

      {/* ══════════ MOUSE CURSOR FOLLOWER ══════════ */}
      <div
        ref={arrowRef}
        className="fixed top-0 left-0 w-16 h-16 bg-[#C8B89A] rounded-full hidden md:flex items-center justify-center pointer-events-none z-50 text-[#1a1a1a] shadow-md opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2"
      >
        <FiArrowUpRight className="w-7 h-7 text-[#1a1a1a]" />
      </div>

      {/* ══════════ NAVBAR (GENEROUS PADDING FROM TOP & SIDES) ══════════ */}

      <nav
        ref={navRef}
        className="relative z-50 flex items-center justify-between w-full"
        style={{ padding: '36px 20px' }}
      >
        <div className="flex items-center gap-3">
          <svg width="40" height="32" viewBox="0 0 50 40" fill="none">
            <path d="M4 6 L18 34 L25 16" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25 16 L25 34" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M25 6 Q40 6 40 14 Q40 22 25 22" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          <span className="text-[12px] font-bold tracking-[0.28em] uppercase text-[#1a1a1a] whitespace-nowrap">
            Vikas Photography
          </span>
        </div>

        <button
          className="inline-flex items-center justify-center gap-3 bg-[#CFC0A8] rounded-md text-[11px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a] md:cursor-none hover:scale-105 transition-transform shrink-0"
          style={{ padding: '12px 24px' }}
        >
          <span className="leading-none">MENU</span>
          <HiOutlineMenuAlt3 className="w-5 h-5 text-[#1a1a1a] shrink-0" />
        </button>
      </nav>

      {/* ══════════ MOBILE VIEW ══════════ */}
      <div className="md:hidden absolute inset-0 overflow-hidden pt-16">

        {/* HERO TEXT */}
        <div className="absolute top-[8%] left-0 w-full z-30 px-5 text-center h-[50vh] flex justify-center items-center flex-col gap-6">

          <div ref={badgeRef} className="flex items-center justify-center gap-2 text-[11px] text-[#333] mb-[5%]">
            <HiOutlineCamera className="w-4 h-4 text-[#333] shrink-0" />
            <span>Hi, I'm Vikas — a professional photographer</span>
          </div>

          <div className="w-full flex flex-col items-center select-none">

            <div ref={capturingRef} className="w-full flex justify-center gap-5">
              <h1 className="text-[clamp(46px,14vw,68px)] leading-[0.8] font-black tracking-[-0.06em] text-[#1a1a1a] whitespace-nowrap">
                CAPTURING
              </h1>
            </div>

            <div ref={momentsRef} className="w-full flex justify-center mt-2">
              <h1
                className="text-[clamp(48px,15vw,72px)] leading-[0.8] font-black tracking-[-0.06em] whitespace-nowrap"
                style={{ WebkitTextStroke: '1.5px #1a1a1a', color: 'transparent' }}
              >
                MOMENTS
              </h1>
            </div>

          </div>

          <div ref={taglineRef} className="mt-2">
            <p className="text-[11px] leading-[1.5] text-[#555]">
              Turning real moments into timeless stories.
              <br />
              Based in New Delhi, India.
            </p>
          </div>

          {/* CTA AREA */}
          <div ref={btnsRef} className="flex items-center justify-center gap-3 mt-3">

            <button
              className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-[#F2EDE4] rounded-full text-[10px] font-bold tracking-[0.16em] uppercase whitespace-nowrap cursor-pointer active:scale-95 transition-transform shrink-0"
              style={{ padding: '12px 24px' }}
            >
              <span className="leading-none">VIEW GALLERY</span>
              <FiArrowUpRight className="w-3.5 h-3.5 text-[#F2EDE4] shrink-0" />
            </button>

            <button
              className="inline-flex items-center justify-center border border-[#1a1a1a] rounded-full text-[10px] font-bold tracking-[0.16em] uppercase whitespace-nowrap cursor-pointer active:scale-95 transition-transform shrink-0"
              style={{ padding: '12px 24px' }}
            >
              <span className="leading-none">GET IN TOUCH</span>
            </button>

          </div>

        </div>


        {/* PHOTOGRAPHER */}
        <img
          src="/myimage.png"
          alt="Vikas Photographer"
          className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-[55vh] min-h-[390px] max-h-[570px] w-auto max-w-none object-contain object-bottom grayscale mix-blend-multiply z-10 pointer-events-none select-none"
        />


        {/* BOTTOM INFORMATION BAR */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] h-[30px] flex items-center justify-between bg-[#F2EDE4]/90 backdrop-blur-md border border-[#1a1a1a]/15 rounded-full px-3">

          <span className="text-[7px] font-bold tracking-[0.14em] uppercase text-[#1a1a1a] whitespace-nowrap">
            Weddings • Portraits • Events
          </span>

          <div className="flex items-center gap-2">
            <a href="#" aria-label="Instagram">
              <FaInstagram className="w-3.5 h-3.5 text-[#1a1a1a]" />
            </a>

            <a href="#" aria-label="Behance">
              <FaBehance className="w-3.5 h-3.5 text-[#1a1a1a]" />
            </a>
          </div>

        </div>

      </div>


      {/* ══════════ DESKTOP ══════════ */}

      <div className="hidden md:block absolute top-[100px] bottom-0 left-0 right-0">

        {/* INTRO */}

        <div ref={badgeRef} className="relative z-10 flex items-center justify-center gap-2 mt-1 mb-2.5">
          <HiOutlineCamera className="w-5 h-5 text-[#1a1a1a] shrink-0" />

          <span className="text-[15px] font-normal text-[#1a1a1a]">
            Hi, I'm Vikas — a professional photographer
          </span>
        </div>


        {/* CAPTURING */}

        <div ref={capturingRef} className="relative z-[5] px-5 text-center leading-[0.85] select-none">
          <span className="block text-[clamp(80px,13vw,196px)] font-black text-[#1a1a1a] tracking-tight">
            CAPTURING
          </span>
        </div>


        {/* MOMENTS */}

        <div className="relative z-[15] px-5 -mt-1">

          <div ref={momentsRef} className="text-center leading-[0.85] select-none">
            <span
              className="block text-[clamp(80px,13vw,196px)] font-black tracking-tight"
              style={{ WebkitTextStroke: '2px #1a1a1a', color: 'transparent' }}
            >
              MOMENTS
            </span>
          </div>

        </div>


        {/* BOTTOM LEFT */}

        <div className="absolute bottom-10 left-16 z-30 flex flex-col gap-4">

          <div ref={taglineRef} className="flex items-start gap-2.5">
            <div className="w-[3px] h-[42px] bg-[#1a1a1a] rounded-sm shrink-0 mt-0.5" />

            <p className="text-[14px] leading-relaxed text-[#1a1a1a] font-normal">
              Turning real moments into
              <br />
              timeless stories.
            </p>
          </div>


          <div ref={btnsRef} className="flex items-center gap-4">
            <button
              className="inline-flex items-center justify-center gap-2.5 bg-[#3D4A2E] text-[#F2EDE4] border-none rounded-md text-[12px] font-bold tracking-[0.16em] uppercase md:cursor-none hover:scale-105 transition-transform whitespace-nowrap shadow-xs shrink-0"
              style={{ padding: '14px 28px' }}
            >
              <span className="leading-none">VIEW GALLERY</span>
              <FiArrowUpRight className="w-4 h-4 text-[#F2EDE4] shrink-0" />
            </button>

            <button
              className="inline-flex items-center justify-center bg-transparent text-[#1a1a1a] border-[1.5px] border-[#1a1a1a] rounded-md text-[12px] font-bold tracking-[0.16em] uppercase md:cursor-none hover:scale-105 transition-transform whitespace-nowrap shrink-0"
              style={{ padding: '14px 28px' }}
            >
              <span className="leading-none">GET IN TOUCH</span>
            </button>
          </div>

        </div>


        {/* BOTTOM RIGHT */}

        <div className="absolute bottom-10 right-16 z-30 flex flex-col items-end gap-4">

          <div ref={availRef} className="text-right">
            <p className="text-[8.5px] font-semibold tracking-[0.28em] uppercase text-[#7a7a7a] mb-1">
              Available For
            </p>

            <p className="text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#1a1a1a]">
              Weddings • Portraits • Events • Brands
            </p>
          </div>


          <div ref={socialRef} className="text-right">
            <p className="text-[8.5px] font-semibold tracking-[0.28em] uppercase text-[#7a7a7a] mb-2">
              Follow Me
            </p>

            <div className="flex items-center gap-4 justify-end">
              <a href="#" aria-label="Instagram" className="hover:-translate-y-1 hover:opacity-60 transition-all md:cursor-none">
                <FaInstagram className="w-5 h-5 text-[#1a1a1a]" />
              </a>

              <a href="#" aria-label="Behance" className="hover:-translate-y-1 hover:opacity-60 transition-all md:cursor-none">
                <FaBehance className="w-5 h-5 text-[#1a1a1a]" />
              </a>

              <a href="#" aria-label="Pinterest" className="hover:-translate-y-1 hover:opacity-60 transition-all md:cursor-none">
                <FaPinterestP className="w-5 h-5 text-[#1a1a1a]" />
              </a>
            </div>
          </div>

        </div>


        {/* DESKTOP PHOTOGRAPHER */}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[82vh] max-h-[850px] z-[10] pointer-events-none select-none flex items-end justify-center overflow-hidden">
          <img
            src="/myimage.png"
            alt="Vikas"
            className="h-full w-auto object-contain object-bottom grayscale mix-blend-multiply block scale-[1.28] origin-bottom translate-y-[1px]"
          />
        </div>

      </div>

    </section>
  )
}

export default HeroSection