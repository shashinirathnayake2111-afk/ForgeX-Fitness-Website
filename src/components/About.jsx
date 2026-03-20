import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 md:pt-40 md:pb-20 bg-dark w-full overflow-hidden relative">
      {/* Background Typography */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none select-none z-0 hidden md:block text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-[180px] md:text-[260px] lg:text-[320px] font-heading text-transparent uppercase leading-none tracking-[0.1em]"
          style={{ WebkitTextStroke: '1.5px rgba(211,165,35,0.3)' }}
        >
          FORGEX
        </motion.h2>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col items-start z-10 py-5"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Who We Are</span>
            </div>
            
            <h2 className="text-light text-6xl md:text-[85px] font-heading mb-8 uppercase tracking-tight leading-[0.85]">
              WE ARE <span className="text-primary">FORGEX</span>
            </h2>
            
            <div className="max-w-[560px] space-y-6 mb-8 text-light/70">
              <p className="text-sm md:text-[17px] font-light leading-[1.8] tracking-wide">
                ForgeX was built for people who are serious about transformation. Since 2025, we have been the city's most trusted fitness destination — combining world-class facilities with coaches who genuinely invest in your progress.
              </p>

              <p className="text-sm md:text-[17px] font-light leading-[1.8] tracking-wide">
                Whether you're just starting out or pushing past your peak, ForgeX has the tools, the team, and the environment to take you further than you ever thought possible.
              </p>
            </div>

            {/* Badges */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
              className="flex flex-wrap gap-4 md:gap-8 mb-10"
            >
              {['Certified Trainers', 'Modern Equipment', 'Proven Results'].map((tag, idx) => (
                <motion.div 
                  key={idx}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 10 }
                  }}
                  className="border border-primary/30 px-6 py-2.5 hover:border-primary hover:bg-primary/5 transition-all duration-500 cursor-default group"
                >
                  <span className="text-primary text-[11px] md:text-sm tracking-[0.1em] font-medium uppercase transition-colors">{tag}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-light text-dark transition-all duration-500 px-12 py-4.5 font-bold tracking-[0.2em] rounded-sm flex items-center justify-center gap-4 text-[14px] uppercase shadow-xl shadow-primary/10 hover:shadow-primary/20 group"
            >
              OUR STORY
              <span className="text-2xl leading-none transition-transform duration-500 group-hover:translate-x-2">→</span>
            </motion.button>
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative flex justify-center items-center mt-24 lg:mt-0"
          >
            {/* Spotlight */}
            <div 
              className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full opacity-[0.2]"
              style={{
                background: 'radial-gradient(circle, rgba(211,165,35,0.4) 0%, transparent 70%)',
                filter: 'blur(30px)'
              }}
            ></div>

            <img 
              src="/img/gym man.png" 
              alt="ForgeX Team Member" 
              className="relative z-10 w-[95%] md:w-[115%] max-w-[650px] h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] dark:drop-shadow-[0_40px_80px_rgba(211,165,35,0.1)]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
