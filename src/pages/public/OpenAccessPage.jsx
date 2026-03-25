import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Share2, Unlock, Eye, Award } from 'lucide-react';

const OpenAccessPage = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Unlock className="mx-auto text-accent-500 mb-6" size={64} strokeWidth={1.5} />
            <h1 className="text-5xl font-serif font-bold text-brand-900 mb-6">Open Access Policy</h1>
            <div className="h-1 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
          </motion.div>
        </header>

        <section className="bg-neutral-50 p-10 md:p-14 rounded-[4rem] border border-brand-50 shadow-sm mb-16">
           <div className="prose prose-lg text-neutral-700 max-w-none space-y-8 font-serif leading-relaxed text-center mb-16">
              <p className="text-2xl text-brand-900 italic font-bold">
                "IJMCS provides immediate open access to its content on the principle that making research freely available to the public supports a greater global exchange of knowledge."
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-brand-100">
                 <Share2 className="text-brand-700 mb-6" size={32} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4">CC BY 4.0 License</h3>
                 <p className="text-sm text-neutral-500 leading-relaxed">
                    All articles are published under the Creative Commons Attribution 4.0 International license. 
                    This allows for global sharing and adaptation of the work with proper attribution.
                 </p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-brand-100">
                 <Eye className="text-brand-700 mb-6" size={32} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4">Zero Barriers</h3>
                 <p className="text-sm text-neutral-500 leading-relaxed">
                    There are no fees charged to readers or libraries to access our content. 
                    We believe in the democratization of high-quality scholarly research.
                 </p>
              </div>
           </div>
        </section>

        <section className="bg-brand-900 text-white p-12 md:p-16 rounded-[3.5rem] shadow-2xl flex flex-col items-center text-center">
            <Award className="text-accent-500 size-16 mb-8" />
            <h2 className="text-3xl font-serif font-bold mb-6">Global Discoverability</h2>
            <p className="text-brand-100 text-lg max-w-2xl leading-relaxed mb-8">
               Our open-access model ensures that your research is visible and citable worldwide. 
               IJMCS is registered and indexed across several global platforms to maximize the impact of your findings.
            </p>
            <div className="flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
               <span className="font-serif font-bold text-xl">Google Scholar</span>
               <span className="font-serif font-bold text-xl">CrossRef</span>
               <span className="font-serif font-bold text-xl">OpenAIRE</span>
               <span className="font-serif font-bold text-xl">Zenodo</span>
            </div>
        </section>
      </div>
    </div>
  );
};

export default OpenAccessPage;
