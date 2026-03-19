import React from 'react';

const ContactItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-5 mb-8 group">
      <div className="w-12 h-12 border border-white/10 flex items-center justify-center p-3 group-hover:border-primary transition-colors duration-500">
        {icon}
      </div>
      <div>
        <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{label}</p>
        <p className="text-[#b0b0b0] text-[13px] md:text-[14px] leading-relaxed font-light">{value}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-40 bg-dark w-full overflow-hidden relative border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 lg:px-16 w-full relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-32">
          
          {/* Left Side: Info */}
          <div className="w-full lg:w-[40%]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.3em] text-[11px] uppercase">Get In Touch</span>
            </div>
            
            <h2 className="text-white text-6xl md:text-[90px] font-heading mb-8 uppercase leading-[0.85] tracking-tight">
              READY TO <span className="text-primary italic">START?</span>
            </h2>
            
            <p className="text-[#888] text-[15px] md:text-[16px] leading-relaxed font-light mb-16 max-w-md">
              We'd love to hear from you. Whether you're ready to join or just have questions — our team is here to help.
            </p>
            
            <div className="space-y-2">
              <ContactItem 
                label="LOCATION"
                value="No.42/A, Kirillawala, Kadawatha."
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7-7.5-7-11.5a7 7 0 1114 0c0 4-7 11.5-7 11.5z" strokeLinecap="round" strokeJoin="round" />
                    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
              <ContactItem 
                label="CALL US"
                value="077 1234 345"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
              <ContactItem 
                label="EMAIL"
                value="forgexfitness@gmail.com"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeJoin="round" />
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
              <ContactItem 
                label="HOURS"
                value="Mon–Fri: 5AM–11PM | Sat–Sun: 6AM–10PM"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeJoin="round" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeJoin="round" />
                  </svg>
                }
              />
            </div>
          </div>
          
          {/* Right Side: Form */}
          <div className="w-full lg:w-[60%]">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Kasun Wijethunga"
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="kasunwije@gmail.com"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="071 405 4057"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">I'm Interested In</label>
                <select className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                  <option className="bg-dark">Select the topic ............</option>
                  <option className="bg-dark">Strength Training</option>
                  <option className="bg-dark">Combat Fitness</option>
                  <option className="bg-dark">HIIT & Cardio</option>
                  <option className="bg-dark">Personal Training</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Your Message *</label>
                <textarea 
                  rows="5"
                  placeholder="Tell us about your fitness issues and goals..."
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-white text-black transition-all duration-500 py-6 font-bold tracking-[0.3em] rounded-sm flex items-center justify-center gap-4 text-[13px] uppercase shadow-2xl shadow-primary/20 hover:shadow-white/10 group"
              >
                Send Message
                <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">→</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
