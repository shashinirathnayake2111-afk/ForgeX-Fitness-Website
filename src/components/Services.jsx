import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ServiceCard = ({ title, category, description, icon, index }) => (
  <div className="relative h-full w-full bg-[#121212] overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-700">
    {/* Background Noise/Texture */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    
    {/* Index Number */}
    <div className="absolute top-6 right-8 text-white/5 text-6xl font-heading tracking-tighter group-hover:text-primary/10 transition-colors duration-700">
      {index}
    </div>

    <div className="pt-16 pb-10 px-8 md:pt-20 md:pb-12 md:px-10 h-full flex flex-col justify-between relative z-10">
      <div>
        <div className="flex flex-col gap-6 mb-8">
          <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">{category}</span>
          <div className="w-14 h-14 bg-white/5 flex items-center justify-center p-3 group-hover:bg-primary transition-all duration-700 rounded-sm">
            {icon}
          </div>
        </div>
        
        <h3 className="text-white text-3xl md:text-4xl font-heading mb-6 uppercase tracking-wide group-hover:text-primary transition-colors duration-700">
          {title}
        </h3>
        
        <p className="text-[#a0a0a0] text-[15px] leading-relaxed font-light mb-8 max-w-xs group-hover:text-white/80 transition-colors duration-700">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4 group/btn cursor-pointer">
        <div className="w-8 h-[2px] bg-primary group-hover/btn:w-12 transition-all duration-500"></div>
        <span className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">Explore</span>
      </div>
    </div>

    {/* Hover Accent Glow */}
    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 blur-[80px] rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
  </div>
);

const Services = () => {
  const services = [
    {
      index: "01",
      category: "Foundation",
      title: "Strength Training",
      description: "Build raw power and muscle with our fully equipped free weights zone and guided strength programs.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary group-hover:text-black transition-colors" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4h12M6 20h12M9 4v16M15 4v16M3 12h18" strokeLinecap="round" />
        </svg>
      )
    },
    {
      index: "02",
      category: "High Intensity",
      title: "Combat Fitness",
      description: "Boxing and MMA-inspired circuits that push your limits and sharpen your edge with professional trainers.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary group-hover:text-black transition-colors" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8a3 3 0 013 3v6a3 3 0 01-3 3H6a3 3 0 01-3-3v-6a3 3 0 013-3h12zM9 8V5a3 3 0 016 0v3" strokeLinecap="round" strokeJoin="round" />
        </svg>
      )
    },
    {
      index: "03",
      category: "Burn",
      title: "HIIT & Cardio",
      description: "High-intensity interval training designed to torch calories, boost endurance, and transform your fitness fast.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary group-hover:text-black transition-colors" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeJoin="round" />
        </svg>
      )
    },
    {
      index: "04",
      category: "1-on-1",
      title: "Personal Training",
      description: "One-on-one sessions with certified coaches who design a program built around your body, goals, and schedule.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary group-hover:text-black transition-colors" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" strokeJoin="round" />
        </svg>
      )
    },
    {
      index: "05",
      category: "Mindfulness",
      title: "Yoga & Recovery",
      description: "Enhance flexibility, reduce stress, and improve recovery with guided yoga and mobility sessions.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary group-hover:text-black transition-colors" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" strokeLinecap="round" strokeJoin="round" />
          <path d="M12 13a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeJoin="round" />
          <path d="M12 13v8M8 17l4-4 4 4" strokeLinecap="round" strokeJoin="round" />
        </svg>
      )
    },
    {
      index: "06",
      category: "Wellness",
      title: "Nutrition Plans",
      description: "Fuel your progress with scientific, personalized nutrition plans and professional dietary guidance.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary group-hover:text-black transition-colors" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeJoin="round" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 md:pt-20 md:pb-40 bg-[#363636] w-full overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">What We Offer</span>
            </div>
            <h2 className="text-white text-6xl md:text-[85px] font-heading mb-6 leading-[0.85] uppercase tracking-tight">
              OUR <span className="text-primary">SERVICES</span>
            </h2>
            <p className="text-white/60 text-[15px] md:text-[17px] leading-relaxed font-light">
              World-class programs designed for every fitness level. From raw strength to mindful recovery — we have everything you need.
            </p>
          </div>
          
          <button className="hidden md:flex items-center gap-4 bg-primary hover:bg-white text-black transition-all duration-500 px-8 py-4 font-bold tracking-[0.2em] text-[12px] uppercase group z-20">
            View All Services
            <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
          </button>
        </div>

        {/* Carousel Section */}
        <div className="relative cursor-grab active:cursor-grabbing">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            slideToClickedSlide={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="services-swiper !pb-24"
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 50 }
            }}
          >
            {services.map((service, idx) => (
              <SwiperSlide key={idx} className="!h-auto flex items-center justify-center">
                <div className="w-full max-w-md h-[550px] transform transition-all duration-500">
                  <ServiceCard {...service} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation */}
          <style dangerouslySetInnerHTML={{ __html: `
            .swiper-pagination-bullet {
              background: #fff !important;
              opacity: 0.2;
              width: 40px;
              height: 2px;
              border-radius: 0;
              transition: all 0.3s;
            }
            .swiper-pagination-bullet-active {
              background: #D3A523 !important;
              opacity: 1;
              width: 60px;
            }
            .services-swiper .swiper-slide {
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              opacity: 0.6;
              transform: scale(0.85);
            }
            .services-swiper .swiper-slide-active {
              opacity: 1;
              transform: scale(1.15) !important;
              z-index: 20;
            }
          `}} />
        </div>
      </div>

    </section>
  );
};

export default Services;
