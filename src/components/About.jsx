import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-dark w-full overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left: Content */}
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10 py-10">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-semibold tracking-[0.2em] text-[11px] uppercase">Who We Are</span>
            </div>
            
            <h2 className="text-white text-5xl md:text-[85px] font-heading mb-10 uppercase tracking-tight leading-[0.9] transition-all">
              WE ARE <span className="text-primary">FORGEX</span>
            </h2>
            
            <div className="max-w-[560px] space-y-8 mb-12">
              <p className="text-[#b0b0b0] text-sm md:text-[16px] font-light leading-[1.9] tracking-wide">
                ForgeX was built for people who are serious about transformation. Since 2025, we have been the city's most trusted fitness destination — combining world-class facilities with coaches who genuinely invest in your progress.
              </p>

              <p className="text-[#b0b0b0] text-sm md:text-[16px] font-light leading-[1.9] tracking-wide">
                Whether you're just starting out or pushing past your peak, ForgeX has the tools, the team, and the environment to take you further than you ever thought possible.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-14">
              {['Certified Trainers', 'Modern Equipment', 'Proven Results'].map((tag, idx) => (
                <div key={idx} className="border border-primary/40 px-6 py-2.5 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-default group">
                  <span className="text-primary text-[11px] md:text-xs tracking-[0.1em] font-medium uppercase transition-colors">{tag}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button className="bg-primary hover:bg-white text-black transition-all duration-500 px-10 py-4 font-bold tracking-[0.15em] rounded-sm flex items-center justify-center gap-3 text-[13px] uppercase shadow-lg shadow-primary/10 hover:shadow-white/10 group">
              OUR STORY
              <span className="text-xl leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Right: Image with glow */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-20 lg:mt-0">
            {/* The focused spotlight effect behind the image - more intense and circular */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[480px] md:h-[480px] bg-white rounded-full blur-[80px] md:blur-[100px] opacity-[0.18] pointer-events-none mix-blend-screen"></div>
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[320px] md:h-[320px] bg-white rounded-full blur-[40px] md:blur-[60px] opacity-[0.1] pointer-events-none"></div>
            
            {/* Main Image */}
            <img 
              src="/img/gym man.png" 
              alt="ForgeX Team Member" 
              className="relative z-10 w-[90%] md:w-[110%] max-w-[600px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
