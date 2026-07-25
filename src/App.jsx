import { useEffect } from 'react'
import Lenis from 'lenis'
import HeroSection from './components/HeroSection'
import WorkSection from './components/WorkSection'
import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <main>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <ContactSection />
    </main>
  )
}

export default App
