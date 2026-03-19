import React, { useState } from 'react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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
              READY TO <span className="text-primary">START?</span>
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
          <div className="w-full lg:w-[60%] relative">
             {isSuccess ? (
               <div className="bg-[#121212]/50 border border-white/5 p-16 md:p-24 text-center flex flex-col items-center justify-center min-h-[500px] animate-fadeIn">
                  <div className="relative mb-10">
                    <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeJoin="round" />
                      </svg>
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 border border-primary/10 rounded-full animate-ping-slow"></div>
                  </div>

                  <div className="max-w-sm space-y-6">
                    <h3 className="text-white text-4xl md:text-5xl font-heading uppercase tracking-[0.1em] leading-tight">
                      MESSAGE <span className="text-primary">RECEIVED</span>
                    </h3>
                    <div className="w-12 h-[1px] bg-primary/40 mx-auto"></div>
                    <p className="text-[#a0a0a0] text-sm md:text-base font-light leading-relaxed">
                      Thank you for choosing ForgeX. Our elite team of advisors will review your request and get back to you within one business day.
                    </p>
                  </div>

                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-14 group flex items-center gap-3 text-white/50 hover:text-primary transition-all duration-500"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Send Another Inquiry</span>
                    <div className="w-8 h-[1px] bg-white/20 group-hover:bg-primary group-hover:w-12 transition-all duration-500"></div>
                  </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Full Name *</label>
                    {errors.name && <span className="text-red-500 text-[9px] uppercase tracking-wider">{errors.name}</span>}
                  </div>
                  <input 
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Kasun Wijethunga"
                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all`}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Email Address *</label>
                      {errors.email && <span className="text-red-500 text-[9px] uppercase tracking-wider">{errors.email}</span>}
                    </div>
                    <input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="kasunwije@gmail.com"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Phone Number</label>
                    <input 
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="071 405 4057"
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">I'm Interested In</label>
                  <select 
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                  >
                    <option className="bg-dark" value="">Select the topic ............</option>
                    <option className="bg-dark" value="strength">Strength Training</option>
                    <option className="bg-dark" value="combat">Combat Fitness</option>
                    <option className="bg-dark" value="hiit">HIIT & Cardio</option>
                    <option className="bg-dark" value="personal">Personal Training</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Your Message *</label>
                    {errors.message && <span className="text-red-500 text-[9px] uppercase tracking-wider">{errors.message}</span>}
                  </div>
                  <textarea 
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your fitness issues and goals..."
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all resize-none`}
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-primary hover:bg-white text-black'} transition-all duration-500 py-6 font-bold tracking-[0.3em] rounded-sm flex items-center justify-center gap-4 text-[13px] uppercase shadow-2xl shadow-primary/20 hover:shadow-white/10 group`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      SENDING...
                    </div>
                  ) : (
                    <>
                      Send Message
                      <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">→</span>
                    </>
                  )}
                </button>
              </form>
             )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
