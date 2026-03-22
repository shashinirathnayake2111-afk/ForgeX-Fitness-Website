import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { number: "500+", label: "ACTIVE MEMBERS" },
    { number: "10", label: "EXPERT TRAINERS" },
    { number: "3", label: "LOCATIONS" },
    { number: "98%", label: "SUCCESS RATE" },
    { number: "24/7", label: "ALWAYS OPEN" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-gray/50 dark:bg-gray py-8 md:py-10 border-b border-black/5 dark:border-black/20 flex justify-center backdrop-blur-sm">
      <div className="w-full max-w-[1200px] px-4 md:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-y-8"
        >
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center px-2 flex-1"
              >
                <span className="text-primary text-4xl md:text-5xl font-heading tracking-widest mb-0.5">
                  {stat.number}
                </span>
                <span className="text-light/80 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-center mt-1">
                  {stat.label}
                </span>
              </motion.div>
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-black/5 dark:bg-white/10 self-center"></div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
