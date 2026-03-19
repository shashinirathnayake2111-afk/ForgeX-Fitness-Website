import React from 'react';

const Stats = () => {
  const stats = [
    { number: "500+", label: "ACTIVE MEMBERS" },
    { number: "10", label: "EXPERT TRAINERS" },
    { number: "3", label: "LOCATIONS" },
    { number: "98%", label: "SUCCESS RATE" },
    { number: "24/7", label: "ALWAYS OPEN" }
  ];

  return (
    <div className="w-full bg-[#222222] py-5 md:py-6 border-b border-black flex justify-center">
      <div className="w-full max-w-[1200px] px-4 md:px-8">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-y-6">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-primary text-3xl md:text-4xl font-heading tracking-wider mb-0.5">
                  {stat.number}
                </span>
                <span className="text-white opacity-90 text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-center mt-1">
                  {stat.label}
                </span>
              </div>
              
              {/* Divider */}
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-10 bg-white/20"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
