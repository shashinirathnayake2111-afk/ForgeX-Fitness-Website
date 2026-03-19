import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: "BASIC",
      price: "$29",
      period: "/month",
      features: [
        "Full gym access during business hours",
        "Free introductory personal training",
        "Locker room & shower access",
        "Water station & towel service"
      ],
      isPopular: false
    },
    {
      name: "PRO",
      price: "$49",
      period: "/month",
      features: [
        "24/7 Premium gym access",
        "All group fitness classes included",
        "Monthly 1-on-1 personal training",
        "Premium locker & sauna access",
        "Nutrition & Diet consultation"
      ],
      isPopular: true
    },
    {
      name: "ELITE",
      price: "$89",
      period: "/month",
      features: [
        "Everything in PRO tier",
        "Unlimited personal training sessions",
        "Massage & recovery zone access",
        "Bring a guest for free anytime",
        "Exclusive ForgeX merchandise"
      ],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-dark w-full relative">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-0.5 bg-primary"></div>
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Pricing Plans</span>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
          <h2 className="text-white text-5xl md:text-6xl font-heading mb-6">
            UNLOCK YOUR <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>POTENTIAL</span>
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-8 md:p-10 rounded shadow-2xl transition-transform duration-300 hover:-translate-y-2
                ${plan.isPopular 
                  ? 'bg-gradient-to-br from-black to-gray-900 border-2 border-primary transform md:-translate-y-4 md:scale-105 z-10' 
                  : 'bg-black/50 border border-white/10 backdrop-blur-sm'
                }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-dark font-bold text-xs uppercase px-4 py-1.5 rounded tracking-wider shadow-[0_0_15px_rgba(211,165,35,0.4)]">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-white text-2xl font-bold tracking-wider mb-6 text-center">{plan.name}</h3>
              
              <div className="flex justify-center items-end mb-8 border-b border-white/10 pb-8">
                <span className={`text-6xl font-heading ${plan.isPopular ? 'text-primary' : 'text-white'}`}>{plan.price}</span>
                <span className="text-[#A0A0A0] text-sm ml-2 mb-2">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-[#D0D0D0] text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 ${plan.isPopular ? 'text-primary' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3.5 px-6 font-bold tracking-wider text-sm rounded transition-all duration-300
                  ${plan.isPopular 
                    ? 'bg-primary text-dark hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(211,165,35,0.4)] hover:scale-105' 
                    : 'bg-transparent border border-white text-white hover:bg-white hover:text-dark hover:scale-105'
                  }`}
              >
                SELECT PLAN
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
