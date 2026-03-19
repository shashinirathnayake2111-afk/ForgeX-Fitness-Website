import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/img/background.png" 
          alt="Premium Fitness Gym" 
          className="w-full h-full object-cover object-[center_15%]"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.40) 50%, rgba(10,10,10,0.1) 100%)' }}
        ></div>
      </div>
      
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full pt-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="text-primary font-semibold tracking-[0.2em] text-[11px] uppercase">Premium Fitness Club</span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-heading leading-none mb-10">
            FORGE <br/>
            <span className="text-primary">YOUR</span> <br/>
            <span 
              className="text-transparent" 
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              BEST SELF.
            </span>
          </h1>

          <p className="text-[#D0D0D0] opacity-70 text-sm md:text-base mb-14 max-w-lg leading-relaxed">
            State-of-the-art equipment. Expert trainers. Real results. <br className="hidden sm:block" />
            Your transformation starts the moment you walk through <br className="hidden sm:block" />
            our doors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-dark hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(211,165,35,0.4)] transition-all duration-300 px-10 py-3.5 text-sm md:text-base font-bold tracking-wider rounded">
              JOIN NOW
            </button>
            <button className="bg-transparent text-white border border-white hover:bg-white hover:text-dark hover:scale-105 transition-all duration-300 px-10 py-3.5 text-sm md:text-base font-bold tracking-wider rounded">
              VIEW PLANS
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Hero;
