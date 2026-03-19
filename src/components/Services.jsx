import React from 'react';

const ServiceIcon = ({ type }) => {
  switch (type) {
    case 'strength':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4h12M6 20h12M9 4v16M15 4v16M3 12h18" strokeLinecap="round" />
        </svg>
      );
    case 'combat':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
      );
    case 'hiit':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeJoin="round" />
        </svg>
      );
    case 'personal':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-primary" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

const ServiceCard = ({ number, tag, title, desc, iconType, cta, isLarge }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-[#121212] border border-white/5 p-8 md:p-10 flex flex-col group h-[320px] md:h-[360px] transition-all duration-700 hover:border-primary/40 ${isLarge ? 'md:col-span-8' : 'md:col-span-4'} col-span-12`}
    >
      {/* Background Texture / Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3C%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Decorative Gradient Glow */}
      <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-primary/5 rounded-full blur-[120px] group-hover:bg-primary/10 transition-all duration-1000"></div>

      {/* Top Header: Tag & Large fainted number */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <div className="w-8 h-[1px] bg-primary mb-2"></div>
          <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">{tag}</span>
        </div>
        <span className="text-[100px] font-heading leading-none text-white/5 absolute -right-4 -top-6 group-hover:text-primary/10 transition-all duration-700 select-none">
          {number}
        </span>
      </div>

      {/* Content Area */}
      <div className="relative z-10 mt-8 md:mt-10">
        <div className="mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
          <ServiceIcon type={iconType} />
        </div>
        <h3 className="text-white text-3xl md:text-[36px] font-heading mb-2 tracking-wider group-hover:text-primary transition-colors duration-500">
          {title}
        </h3>
        <p className="text-[#888] text-sm md:text-[15px] leading-relaxed font-light max-w-md group-hover:text-[#ccc] transition-colors duration-500 line-clamp-2 md:line-clamp-3">
          {desc}
        </p>
      </div>

      {/* Footer: Explore CTA */}
      <div className="mt-auto flex items-center gap-4 relative z-10 group/cta cursor-pointer">
        <div className="w-8 h-[2px] bg-primary group-hover:w-12 transition-all duration-300"></div>
        <span className="text-white text-xs font-bold tracking-[0.2em] uppercase group-hover:text-primary transition-colors">
          {cta || 'EXPLORE'}
        </span>
      </div>

      {/* Hover Line Accent */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700"></div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      number: "01",
      tag: "FOUNDATION",
      title: "STRENGTH TRAINING",
      desc: "Build raw power and muscle with our fully equipped free weights zone and guided strength programs tailored to every level. From beginner lifts to elite powerlifting.",
      iconType: "strength",
      isLarge: true
    },
    {
      number: "02",
      tag: "HIGH INTENSITY",
      title: "COMBAT FITNESS",
      desc: "Boxing, MMA-inspired circuits and combat conditioning that push your limits and sharpen your edge.",
      iconType: "combat",
      isLarge: false
    },
    {
      number: "03",
      tag: "BURN",
      title: "HIIT & CARDIO",
      desc: "High-intensity interval training designed to torch calories, boost endurance, and transform your fitness fast.",
      iconType: "hiit",
      isLarge: false
    },
    {
      number: "04",
      tag: "1-ON-1",
      title: "PERSONAL TRAINING",
      desc: "Elite one-on-one sessions with certified coaches who design a program built around your body, your goals, and your schedule. Our PTs track every rep and every milestone.",
      iconType: "personal",
      isLarge: true
    }
  ];

  return (
    <section id="services" className="py-24 md:pt-20 md:pb-40 bg-[#363636] w-full overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-28 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Professional Programs</span>
            </div>
            <h2 className="text-white text-6xl md:text-[90px] font-heading mb-8 uppercase leading-[0.85] tracking-tight">
              CORE <span className="text-primary">SERVICES</span>
            </h2>
            <p className="text-[#a0a0a0] text-sm md:text-[17px] font-light leading-relaxed max-w-md">
              Meticulously crafted fitness regimes designed for those who demand excellence in their transformation journey.
            </p>
          </div>
          
          <div className="hidden md:block">
             <button className="border border-white/20 hover:border-primary hover:bg-primary hover:text-black text-white transition-all duration-500 px-10 py-4 font-bold tracking-[0.2em] rounded-sm text-[12px] uppercase">
                Explore All Services
             </button>
          </div>
        </div>

        {/* High-End Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden border border-white/5">
          <ServiceCard {...services[0]} isLarge={true} />
          <ServiceCard {...services[1]} isLarge={false} />
          <ServiceCard {...services[2]} isLarge={false} />
          <ServiceCard {...services[3]} isLarge={true} />
        </div>

      </div>
    </section>
  );
};

export default Services;
