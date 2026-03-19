import React from 'react';

const Trainers = () => {
  const trainers = [
    {
      name: "MARCUS COLE",
      role: "HEAD COACH",
      specialty: "Crossfit & Strength",
      image: "/img/gym man.png"
    },
    {
      name: "SARAH JENKINS",
      role: "SENIOR TRAINER",
      specialty: "HIIT & Flexibility",
      image: "/img/gym man.png" // Reusing local offline image
    },
    {
      name: "DAVID BLAKE",
      role: "NUTRITIONIST",
      specialty: "Bodybuilding & Diet",
      image: "/img/gym man.png" // Reusing local offline image
    }
  ];

  return (
    <section id="trainers" className="py-24 bg-gray/10 w-full">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-0.5 bg-primary"></div>
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Expert Coaches</span>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-heading mb-6">
            MEET THE <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>TEAM</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group relative overflow-hidden rounded border border-white/5 bg-black">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{trainer.role}</p>
                <h3 className="text-white text-3xl font-heading tracking-wide mb-2">{trainer.name}</h3>
                <p className="text-[#A0A0A0] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {trainer.specialty}
                </p>
                
                {/* Social placeholders */}
                <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary text-white hover:text-dark flex items-center justify-center cursor-pointer transition-colors">
                    F
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary text-white hover:text-dark flex items-center justify-center cursor-pointer transition-colors">
                    T
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary text-white hover:text-dark flex items-center justify-center cursor-pointer transition-colors">
                    I
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trainers;
