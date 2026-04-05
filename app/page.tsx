import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Showcase from './components/Showcase'
import About from './components/About'
import BrandLogos from './components/BrandLogos'

import Blog from './components/Blog'
import Booking from './components/Booking'
import Footer from './components/Footer'
import HowItWork from './components/HowItWork'


export default function Page() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar />
      <Hero />
      <BrandLogos />    


      <Services />
      <Showcase />
      <HowItWork />
      <Blog />
      <Booking />
      <Footer />
    </main>
  )
}

  {/* <Stats />
      <About /> */}