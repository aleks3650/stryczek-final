import './styles.css'
import Hero from './Sections/HeroSection/Hero'
import React from 'react'
import News from './Sections/NewsSection/News'
import PopupSection from './Sections/popupSection/PopupSection'
import AboutSection from './Sections/AboutSection/AboutSection'
import OpinionsSection from './Sections/OpinionsSection/OpinionsSection'
import CombinedSection from './Sections/combinedSection/CombinedSection'
import MarqueSection from './Sections/MarqueSection/MarqueSection'
import ScrollToTop from './Sections/ScrollToTop/ScrollToTop'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <News />
      <div className="hidden md:block">
        <MarqueSection />
      </div>
      <AboutSection />
      <CombinedSection />
      <OpinionsSection />
      <ScrollToTop />
      <PopupSection />
    </>
  )
}
