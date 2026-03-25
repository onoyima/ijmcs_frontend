import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Award, Search, CheckCircle } from 'lucide-react';

const IndexingPage = () => {
  const indexes = [
    { name: 'Google Scholar', status: 'Active', description: 'Global academic search engine visibility.' },
    { name: 'CrossRef', status: 'Active', description: 'DOI registration and persistent linking.' },
    { name: 'Zenodo', status: 'Active', description: 'Permanent digital archiving of research data.' },
    { name: 'OpenAIRE', status: 'Active', description: 'European open access discovery platform.' },
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Award className="mx-auto text-accent-500 mb-6" size={64} strokeWidth={1.5} />
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-900 mb-6">Indexing & Discovery</h1>
            <div className="h-1 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-neutral-500 font-serif italic max-w-2xl mx-auto">
              Ensuring global reach and permanent accessibility for IJMCS scholarship.
            </p>
          </motion.div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {indexes.map((idx, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 p-10 rounded-[3rem] border border-brand-50 shadow-sm flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="p-4 bg-white rounded-2xl shadow-sm mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                 <Database size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2">{idx.name}</h3>
              <div className="flex items-center text-green-600 space-x-2 text-xs font-black uppercase tracking-widest mb-4">
                 <CheckCircle size={14} />
                 <span>Status: {idx.status}</span>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed font-serif">{idx.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="bg-brand-900 text-white p-12 md:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500 opacity-10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-serif font-bold mb-8">DOI & Permanent Archiving</h2>
                 <div className="space-y-6 text-brand-100 leading-relaxed font-serif text-lg">
                    <p>
                       Every article published in IJMCS is assigned a <strong>Digital Object Identifier (DOI)</strong>. This ensures that your work is permanently discoverable and has a stable link for citations.
                    </p>
                    <p>
                       Our integration with <strong>CrossRef</strong> and <strong>Zenodo</strong> guarantees that metadata is harvested by global indexers and archived securely in multiple redundant locations.
                    </p>
                 </div>
              </div>
              <div className="bg-white/10 p-10 rounded-[3rem] border border-white/10 backdrop-blur-md">
                 <Search className="text-accent-500 size-12 mb-6" />
                 <h4 className="text-xl font-bold mb-4">Discovery Metrics</h4>
                 <p className="text-sm text-brand-200">
                    We actively monitor indexing status and are constantly expanding our reach to include DOAJ, Scopus, and WoS to further enhance our authors' impact.
                 </p>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default IndexingPage;
