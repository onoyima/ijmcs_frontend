import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Compass, Globe } from 'lucide-react';

const AimsAndScopePage = () => {
  const aims = [
    "Advance theoretical and empirical understandings of communication across diverse contexts",
    "Encourage critical reflection on how communication shapes human experience",
    "Promote interdisciplinary research that deepens public discourse",
    "Provide a platform for contemporary scholarly discourse",
    "Support emerging and established scholars globally"
  ];

  const scopeCategories = [
    { name: "Humanities", items: ["Language", "Literature", "Cultural Studies", "Philosophy", "Religious Studies"] },
    { name: "Social Sciences", items: ["Political Science", "Sociology", "Anthropology", "Psychology", "Development Studies"] },
    { name: "Applied Sciences", items: ["Scientific Inquiry", "Technological Inquiry", "Environmental Studies"] },
    { name: "Global Issues", items: ["Peace and Conflict", "Health", "Climate Change", "Governance"] }
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-900 mb-6">Aims, Mission & Scope</h1>
            <div className="h-1.5 w-32 bg-accent-500 rounded-full mb-8"></div>
            <p className="text-xl text-neutral-600 font-serif leading-relaxed max-w-3xl">
              IJMCS’s mission is to provide a dynamic and inclusive platform for researchers, scholars, practitioners, and policy analysts.
            </p>
          </motion.div>
        </header>

        <section className="mb-24">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                 <h2 className="text-2xl font-serif font-bold text-brand-900 mb-6 flex items-center">
                    <Target className="mr-3 text-accent-500" /> Core Objectives
                 </h2>
                 {aims.map((aim, i) => (
                   <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-3 bg-neutral-50 p-5 rounded-2xl border border-brand-50"
                   >
                      <CheckCircle className="text-accent-500 shrink-0 mt-1" size={18} />
                      <span className="text-neutral-700 font-medium">{aim}</span>
                   </motion.div>
                 ))}
              </div>
              <div className="bg-brand-900 text-white p-12 rounded-[3.5rem] shadow-2xl flex flex-col justify-center">
                 <Compass className="text-accent-500 size-12 mb-8" />
                 <h3 className="text-3xl font-serif font-bold mb-6 italic">Our Mission</h3>
                 <p className="text-brand-100 text-lg leading-relaxed">
                   To facilitate academic innovation by promoting multidisciplinary and interdisciplinary research that addresses urgent global and societal challenges.
                 </p>
              </div>
           </div>
        </section>

        <section>
           <h2 className="text-2xl font-serif font-bold text-brand-900 mb-12 flex items-center justify-center">
              <Globe className="mr-3 text-accent-500" /> Research Spectrum
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {scopeCategories.map((cat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-brand-50 p-8 rounded-[2.5rem] shadow-card hover:shadow-xl transition-all"
                >
                   <h4 className="font-serif font-bold text-brand-900 mb-6 text-xl border-b border-accent-100 pb-4">{cat.name}</h4>
                   <ul className="space-y-3">
                      {cat.items.map((item, j) => (
                        <li key={j} className="text-neutral-500 text-sm flex items-center">
                           <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3 shrink-0"></div>
                           {item}
                        </li>
                      ))}
                   </ul>
                </motion.div>
              ))}
           </div>
        </section>

        <section className="mt-24 bg-neutral-50 p-12 rounded-[3.5rem] border border-brand-100 text-center">
           <p className="text-brand-900 font-serif italic text-lg leading-relaxed max-w-3xl mx-auto">
             "The journal strongly encourages interdisciplinary and transdisciplinary submissions, particularly those addressing urgent challenges such as education, health, climate change, governance, identity, and conflict."
           </p>
        </section>
      </div>
    </div>
  );
};

export default AimsAndScopePage;
