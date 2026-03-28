import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[100000] bg-brand-900 flex items-center justify-center flex-col">
      {/* Deep blur background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
         <motion.div 
           animate={{ scale: [1, 1.1, 1] }} 
           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
           className="w-24 h-24 bg-accent-500 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)] mb-8"
         >
            <span className="font-serif text-4xl font-black text-brand-900">I</span>
         </motion.div>
         
         <div className="flex space-x-2 text-white font-serif text-3xl font-bold tracking-widest overflow-hidden">
            {['I', 'J', 'M', 'C', 'S'].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {letter}
              </motion.span>
            ))}
         </div>
         
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="mt-6 flex space-x-2"
         >
           {[0, 1, 2].map((dot) => (
             <motion.div
               key={dot}
               className="w-2 h-2 bg-accent-500 rounded-full"
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.2 }}
             />
           ))}
         </motion.div>
      </div>
    </div>
  );
};

export default PageLoader;
