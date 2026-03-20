import React from 'react';

import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50 bg-white/10 dark:bg-black/30 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-500">
      <div className="max-w-[1800px] w-full mx-auto px-4 md:px-10 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="/img/logo.jpg" 
              alt="ForgeX Logo" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-primary shadow-[0_0_10px_rgba(211,165,35,0.3)] transition-transform group-hover:scale-105" 
            />
            <div className="text-black dark:text-white font-heading tracking-widest flex items-baseline ml-1 mt-1 transition-transform group-hover:scale-105">
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
                className="text-black/70 dark:text-light/80 hover:text-primary transition-colors text-sm font-semibold tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" strokeLinecap="round" strokeJoin="round" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
            <button className="bg-primary text-black hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(211,165,35,0.4)] transition-all duration-300 px-6 py-2.5 rounded text-sm font-bold tracking-wider">
              JOIN NOW
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-black dark:text-white"
            >
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" strokeLinecap="round" strokeJoin="round" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
            <button className="text-black dark:text-light hover:text-primary focus:outline-none">
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
