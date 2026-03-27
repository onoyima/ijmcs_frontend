import React from 'react';
import { motion } from 'framer-motion';
import { Info, Target, Globe, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-6"
          >
            About IJMCS
          </motion.h1>
          <div className="h-1.5 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-neutral-500 font-serif italic max-w-2xl mx-auto">
            Igniting Journal of Multidisciplinary and Contemporary Studies
          </p>
        </header>

        <div className="space-y-16">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-6 text-neutral-700 leading-relaxed text-lg">
                <p>
                  The <strong>Igniting Journal of Multidisciplinary and Contemporary Studies (IJMCS)</strong> is an international, peer-reviewed, open-access academic journal dedicated to advancing knowledge across diverse disciplines. The journal provides a dynamic platform for scholars, researchers, and practitioners to publish high-quality, original research that addresses contemporary global and local challenges.
                </p>
                <p>
                  IJMCS promotes interdisciplinary dialogue and encourages innovative approaches that bridge gaps between the humanities, social sciences, natural sciences, and applied fields. The journal is committed to fostering intellectual exchange, critical thinking, and impactful scholarship relevant to modern society.
                </p>
             </div>
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white relative">
                 <img 
                    src="/images/research_publishing_abstract_1774478132711.png" 
                    alt="IJMCS Library" 
                    className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" 
                  />
                 <div className="absolute inset-0 bg-brand-900/10 mb-blend-multiply"></div>
             </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-neutral-50 p-10 rounded-[2.5rem] border border-brand-50 shadow-sm text-center">
                <Globe className="text-accent-500 size-10 mx-auto mb-6" />
                <h3 className="font-serif font-bold text-xl text-brand-900 mb-4">International</h3>
                <p className="text-sm text-neutral-500">Global reach attracting contributions from scholars across continents and cultural boundaries.</p>
             </div>
             <div className="bg-neutral-50 p-10 rounded-[2.5rem] border border-brand-50 shadow-sm text-center">
                <Target className="text-accent-500 size-10 mx-auto mb-6" />
                <h3 className="font-serif font-bold text-xl text-brand-900 mb-4">Peer-Reviewed</h3>
                <p className="text-sm text-neutral-500">Rigorous double-blind review process ensuring the highest standards of academic integrity.</p>
             </div>
             <div className="bg-neutral-50 p-10 rounded-[2.5rem] border border-brand-50 shadow-sm text-center">
                <ShieldCheck className="text-accent-500 size-10 mx-auto mb-6" />
                <h3 className="font-serif font-bold text-xl text-brand-900 mb-4">Indexed</h3>
                <p className="text-sm text-neutral-500">Registered in reputable databases including Google Scholar, OpenAIRE, Zenodo, and CrossRef.</p>
             </div>
          </section>

          <section className="bg-brand-900 text-white p-12 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 opacity-10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
             <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold mb-8 flex items-center">
                   <Info className="mr-3 text-accent-500" size={32} /> Publication Cycle
                </h2>
                <div className="space-y-6 text-brand-100 leading-relaxed">
                   <p>The journal is published <strong>biannually</strong> and it operates a rigorous double-blind peer-review process to ensure the quality, originality, and integrity of all published works.</p>
                   <p>All submitted manuscripts will be screened for originality using <strong>Turnitin</strong>. Articles are accessible online immediately upon publication under an open-access model.</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
