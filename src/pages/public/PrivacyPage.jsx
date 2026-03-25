import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, EyeOff, Info } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Lock className="mx-auto text-accent-500 mb-6" size={64} strokeWidth={1.5} />
            <h1 className="text-5xl font-serif font-bold text-brand-900 mb-6">Privacy Policy</h1>
            <div className="h-1 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
          </motion.div>
        </header>

        <section className="bg-neutral-50 p-10 md:p-14 rounded-[4rem] border border-brand-50 shadow-sm mb-12">
           <div className="prose prose-lg text-neutral-700 max-w-none space-y-8 font-serif leading-relaxed">
              <p className="text-xl italic text-brand-800 border-l-4 border-accent-500 pl-6">
                "The names and email addresses entered in this journal site will be used exclusively for the stated purposes of this journal and will not be made available for any other purpose or to any other party."
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-100 transition-transform hover:-translate-y-1">
                    <ShieldCheck className="text-brand-700 mb-4" />
                    <h4 className="font-bold text-brand-900 mb-2">Internal Use Only</h4>
                    <p className="text-sm text-neutral-500">Metadata is collected solely for managing the peer-review process and maintaining the scholarly record.</p>
                 </div>
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-100 transition-transform hover:-translate-y-1">
                    <EyeOff className="text-brand-700 mb-4" />
                    <h4 className="font-bold text-brand-900">Third-Party Protection</h4>
                    <p className="text-sm text-neutral-500">IJMCS does not sell, trade, or share user data with external marketing or commercial entities.</p>
                 </div>
              </div>

              <div className="flex items-center space-x-4 bg-brand-900 text-white p-8 rounded-[2.5rem] mt-12">
                 <Info className="text-accent-500 shrink-0" size={32} />
                 <p className="text-sm leading-relaxed">
                    Our platform strictly adheres to international data protection standards ensuring that authors and reviewers' information remains confidential and secure throughout the publication lifecycle.
                 </p>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
