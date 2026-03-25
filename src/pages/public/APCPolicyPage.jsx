import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Wallet, Info, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const APCPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-6"
          >
            Article Processing Charges
          </motion.h1>
          <div className="h-1.5 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-neutral-500 font-serif italic max-w-3xl mx-auto leading-relaxed">
            IJMCS is committed to open-access sustainability. Our APCs ensure rigorous peer-review, high-quality production, and global availability.
          </p>
        </header>

        <section className="mb-20">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-neutral-50 p-10 rounded-[3rem] border border-brand-50 text-center shadow-sm"
              >
                 <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-6 block">Local Authors</span>
                 <h3 className="text-4xl font-serif font-bold text-brand-900 mb-4">NGN 25,000</h3>
                 <p className="text-sm text-neutral-500">For Nigerian contributors and institutions.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-brand-900 p-10 rounded-[3rem] border border-brand-800 text-center shadow-xl transform scale-105"
              >
                 <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent-500 mb-6 block">International</span>
                 <h3 className="text-4xl font-serif font-bold text-white mb-4">USD $100</h3>
                 <p className="text-sm text-brand-100">For global contributors outside Nigeria.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-neutral-50 p-10 rounded-[3rem] border border-brand-50 text-center shadow-sm"
              >
                 <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-6 block">Institutional Support</span>
                 <h3 className="text-4xl font-serif font-bold text-brand-900 mb-4">NGN 20,000</h3>
                 <p className="text-sm text-neutral-500">Special rate for LASU Staff and Faculty members.</p>
              </motion.div>
           </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
           <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-4">
                 <Wallet className="text-accent-500" size={32} />
                 <h2 className="text-3xl font-serif font-bold text-brand-900">Payment Procedure</h2>
              </div>
              <div className="prose prose-lg text-neutral-600 leading-relaxed">
                 <p>
                    Authors of accepted manuscripts will receive a formal notification and a payment link. 
                    IJMCS uses a secure integrated gateway to process all transactions.
                 </p>
                 <Link to="/how-to-pay" className="inline-flex items-center text-accent-600 font-bold hover:text-accent-700 transition-colors group mt-4">
                    Full Payment Guide <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                 </Link>
              </div>
           </div>

           <div className="bg-neutral-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 opacity-5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              <div className="flex items-center space-x-4 mb-8">
                 <ShieldCheck className="text-accent-500" size={32} />
                 <h3 className="text-2xl font-serif font-bold">Waiver Policy</h3>
              </div>
              <p className="text-brand-100 leading-relaxed italic text-lg">
                 "IJMCS is committed to ensuring that financial constraints do not hinder the publication of high-quality research. 
                 Researchers from <strong>Low-Income Economies</strong> may apply for a partial or full waiver."
              </p>
           </div>
        </section>

        <section className="bg-brand-50 p-12 rounded-[4rem] border border-brand-100 flex flex-col md:flex-row gap-12 items-center">
           <div className="bg-white p-6 rounded-3xl shadow-sm text-brand-900 shrink-0">
              <Info size={48} strokeWidth={1} />
           </div>
           <div>
              <h4 className="text-xl font-serif font-bold text-brand-900 mb-4 uppercase tracking-widest">Maintenance Charge Purpose</h4>
              <p className="text-neutral-600 leading-relaxed">
                 The APC covers the technical costs of peer-review management, original copyediting, typesetting, DOI registration with CrossRef, 
                 and the long-term archiving of articles in multiple global repositories.
              </p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default APCPolicyPage;
