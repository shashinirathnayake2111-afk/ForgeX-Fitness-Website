import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black pt-20 pb-10 border-t border-white/10 w-full">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 cursor-pointer mb-6">
              <img src="/img/logo.jpg" alt="ForgeX Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-primary shadow-[0_0_10px_rgba(211,165,35,0.3)]" />
              <div className="text-white font-heading tracking-widest flex items-baseline ml-1 mt-1">
                <span className="text-3xl md:text-4xl">F</span>
                <span className="text-2xl md:text-3xl">ORGE</span>
                <span className="text-primary text-3xl md:text-4xl">X</span>
              </div>
            </div>
            <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
              Forge your best self with our state-of-the-art facilities, expert coaching, and supportive fitness community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold tracking-wider mb-6">QUICK LINKS</h4>
            <ul className="space-y-4">
              {['About Us', 'Services & Classes', 'Pricing Plans', 'Meet The Coaches', 'FAQs'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-[#A0A0A0] hover:text-primary transition-colors text-sm font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-bold tracking-wider mb-6">VISIT US</h4>
            <ul className="space-y-4 text-[#A0A0A0] text-sm">
              <li className="flex gap-3">
                <span className="text-primary font-bold">A:</span>
                123 Fitness Avenue, Iron District, NY 10001
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">P:</span>
                +1 (555) 123-4567
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">E:</span>
                info@forgex.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-bold tracking-wider mb-6">NEWSLETTER</h4>
            <p className="text-[#A0A0A0] text-sm mb-4">
              Subscribe to get fitness tips and exclusive promotions.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 text-white px-4 py-2 w-full focus:outline-none focus:border-primary placeholder-[#A0A0A0] text-sm"
              />
              <button 
                className="bg-primary text-dark font-bold px-4 py-2 hover:bg-yellow-400 transition-colors"
                type="button"
              >
                JOIN
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#808080] text-xs">
            &copy; {new Date().getFullYear()} ForgeX Fitness. All Rights Reserved.
          </p>
          <div className="text-[#808080] text-xs space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
