import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Trainers from './components/Trainers'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark text-light antialiased selection:bg-primary selection:text-dark font-body">
      <Navbar />
      <Hero />
      <Stats />
      <Marquee />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
