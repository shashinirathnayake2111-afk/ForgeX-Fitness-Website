import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-dark text-light antialiased selection:bg-primary selection:text-dark">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
