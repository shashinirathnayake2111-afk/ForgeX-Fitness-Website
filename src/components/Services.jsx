import React from 'react';

const Services = () => {
  const programs = [
    {
      title: "STRENGTH TRAINING",
      desc: "Build muscle, increase power, and forge a stronger physique with our extensive free weights and machines.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10V14M21 10V14M6 8V16M18 8V16M10 6V18M14 6V18M6 12H18" />
        </svg>
      )
    },
    {
      title: "CARDIO ZONE",
      desc: "Torch calories and improve endurance using our premium treadmills, rowers, and assault bikes.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "CROSSFIT & HIit",
      desc: "Push your limits with high-intensity functional movements designed to test your mental and physical grit.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      )
    },
    {
      title: "YOGA & MOBILITY",
      desc: "Enhance flexibility, prevent injuries, and find your center with our guided mobility and yoga sessions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray/10 w-full border-t border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-8 h-0.5 bg-primary"></div>
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Our Programs</span>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-heading">
            CHOOSE YOUR <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>PATH</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="group bg-dark border border-white/10 p-10 rounded hover:border-primary hover:shadow-[0_0_30px_rgba(211,165,35,0.15)] hover:bg-black transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                {program.icon}
              </div>
              <h4 className="text-white text-2xl font-heading tracking-wide mb-4">
                {program.title}
              </h4>
              <p className="text-[#D0D0D0] opacity-70 text-sm leading-relaxed mb-6">
                {program.desc}
              </p>
              <div className="w-12 h-0.5 bg-gray group-hover:bg-primary transition-colors duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
