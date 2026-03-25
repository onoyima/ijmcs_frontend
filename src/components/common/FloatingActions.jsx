import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scroled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 right-8 z-[90] flex justify-between items-end pointer-events-none">
      {/* Left: Scroll to Top */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="bg-white text-brand-900 p-4 rounded-full shadow-2xl hover:bg-brand-50 hover:-translate-y-1 transition-all border border-brand-100 flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Right: WhatsApp */}
      <div className="pointer-events-auto">
        <a 
          href="https://wa.me/2348033200000?text=Hello%20IJMCS%20Editorial%20Team,%20I%20have%20an%20inquiry." 
          target="_blank" 
          rel="noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:bg-green-600 hover:scale-110 transition-all flex items-center justify-center group relative"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={32} strokeWidth={2} />
          {/* Ripple Effect Background */}
          <span className="absolute -inset-2 rounded-full border border-green-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75"></span>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-brand-900 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
            Chat with Editorial Team
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingActions;
