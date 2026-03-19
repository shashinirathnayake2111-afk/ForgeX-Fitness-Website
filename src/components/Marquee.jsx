import React from 'react';

const Marquee = () => {
  const items = [
    "PERSONAL TRAINING",
    "BOXING & MMA",
    "NUTRITION COACHING",
    "RECOVERY STUDIO",
    "STRENGTH TRAINING",
    "HIIT CLASSES",
    "OPEN 24/7"
  ];

  // The scrolling content block
  const content = items.map((item, index) => (
    <div key={index} className="flex items-center">
      <span className="text-dark text-sm md:text-base font-heading tracking-widest px-6 md:px-10">
        {item}
      </span>
      <span className="text-dark text-[8px] md:text-[10px]">♦</span>
    </div>
  ));

  return (
    <div className="w-full bg-primary py-2.5 overflow-hidden border-b border-black flex flex-nowrap shrink-0">
      <div className="flex whitespace-nowrap animate-marquee shrink-0">
        {content}
      </div>
      {/* Duplicate for seamless looping */}
      <div className="flex whitespace-nowrap animate-marquee shrink-0" aria-hidden="true">
        {content}
      </div>
      {/* A third one just in case the screen is extremely wide! */}
      <div className="flex whitespace-nowrap animate-marquee shrink-0" aria-hidden="true">
        {content}
      </div>
    </div>
  );
};

export default Marquee;
