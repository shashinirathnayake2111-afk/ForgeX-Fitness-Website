import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1800px] w-full mx-auto px-4 md:px-10 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="/img/logo.jpg" 
              alt="ForgeX Logo" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-primary shadow-[0_0_10px_rgba(211,165,35,0.3)] transition-transform group-hover:scale-105" 
            />
            <div className="text-white font-heading tracking-widest flex items-baseline ml-1 mt-1 transition-transform group-hover:scale-105">
              <span className="text-3xl md:text-4xl">F</span>
              <span className="text-2xl md:text-3xl">ORGE</span>
              <span className="text-primary text-3xl md:text-4xl">X</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            {['ABOUT', 'SERVICES', 'PRICING', 'TRAINERS', 'CONTACT'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-light/80 hover:text-primary transition-colors text-sm font-semibold tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
            <button className="bg-primary text-dark hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(211,165,35,0.4)] transition-all duration-300 px-6 py-2.5 rounded text-sm font-bold tracking-wider">
              JOIN NOW
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-light hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
