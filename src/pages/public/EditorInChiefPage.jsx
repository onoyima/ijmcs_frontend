import React from 'react';
import { motion } from 'framer-motion';
import { Award, Mail, BookOpen, Quote } from 'lucide-react';

const EditorInChiefPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-accent-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 inline-block">Visionary Leadership</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Dr. Joseph M. Talabi</h1>
            <div className="h-1 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
            <p className="text-brand-200 font-serif text-xl italic max-w-2xl mx-auto">
              "Fostering a global bridge between multidisciplinary theory and contemporary societal impact."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Biography Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Image & Stats */}
            <div className="lg:col-span-5 space-y-8">
               <div className="aspect-[4/5] bg-neutral-100 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white relative">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                      <Award size={100} strokeWidth={0.5} />
                  </div>
                  {/* Image placeholder - user can replace with actual photo */}
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-6 rounded-3xl text-center">
                     <p className="text-brand-900 font-serif font-bold text-2xl">20+</p>
                     <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Research Years</p>
                  </div>
                  <div className="bg-neutral-50 p-6 rounded-3xl text-center">
                     <p className="text-brand-900 font-serif font-bold text-2xl">50+</p>
                     <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Publications</p>
                  </div>
               </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-7 space-y-10">
               <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-px bg-accent-500"></div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent-600">Academic Portrait</h2>
               </div>
               
               <div className="space-y-6 text-neutral-600 leading-relaxed text-lg font-serif">
                  <p>
                    The Editor-in-Chief of IJMCS is a distinguished academic with extensive experience in research, teaching, and scholarly publishing. 
                    <strong> Dr. Joseph Moyinoluwa Talabi</strong> holds advanced degrees in Science and Philosophy of Religions and has published widely in reputable journals.
                  </p>
                  <p>
                    With a strong commitment to academic excellence, the Editor-in-Chief provides strategic leadership and ensures adherence to international publication standards. 
                    He has a strong interest in Interdisciplinary and Contemporary Studies, advocating for scholarship that addresses urgent global challenges.
                  </p>
                  <p>
                    His vision for <strong>IJMCS</strong> is to create a dynamic and inclusive platform for researchers, scholars, practitioners, and policy analysts to engage in high-impact intellectual exchange.
                  </p>
               </div>

               <div className="pt-10 border-t border-neutral-100 flex flex-wrap gap-6">
                  <div className="flex items-center space-x-3 text-brand-900 font-bold">
                     <Mail size={18} className="text-accent-500" />
                     <span>eic@ignitingmultidisciplinary.ng</span>
                  </div>
                  <div className="flex items-center space-x-3 text-brand-900 font-bold">
                     <BookOpen size={18} className="text-accent-500" />
                     <span>Lagos State University, Nigeria</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-24 bg-neutral-50">
         <div className="container mx-auto px-4 text-center max-w-4xl">
            <Quote className="text-accent-200 mx-auto mb-8" size={60} />
            <h3 className="text-3xl font-serif italic text-brand-900 leading-snug">
              "We must not only publish research; we must ignite the flames of contemporary inquiry that light the path toward sustainable global development across all human disciplines."
            </h3>
         </div>
      </section>
    </div>
  );
};

export default EditorInChiefPage;
