import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, FileWarning, Search, Gavel } from 'lucide-react';

const EthicsPage = () => {
  const policies = [
    {
       title: "Plagiarism & Originality",
       icon: <Search className="text-red-500" />,
       desc: "IJMCS upholds a strict zero-tolerance policy for plagiarism. All submitted manuscripts are screened using Turnitin. Any manuscript with high similarity indices or evidence of data fabrication will be summarily rejected."
    },
    {
       title: "Authorship Integrity",
       icon: <Users className="text-brand-700" />,
       desc: "Authorship should be limited to those who have made significant contributions to the research. All listed authors must have reviewed and approved the final manuscript before submission."
    },
    {
       title: "Conflicts of Interest",
       icon: <FileWarning className="text-accent-500" />,
       desc: "Authors are required to disclose any financial or professional relationships that could be perceived as influencing the research findings or interpretation."
    },
    {
       title: "Peer Review Ethics",
       icon: <Scale className="text-green-500" />,
       desc: "The journal operates a double-blind peer-review process. Reviewers are expected to provide objective, constructive feedback and must declare any conflicts of interest."
    }
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-8"
          >
            Publication Ethics
          </motion.h1>
          <div className="h-1 w-32 bg-accent-500 mx-auto rounded-full mb-10"></div>
          <p className="text-xl text-neutral-500 font-serif max-w-2xl mx-auto italic">
            "Maintaining the highest standards of academic integrity and scholarly transparency."
          </p>
        </header>

        <section className="bg-neutral-50 rounded-[4rem] p-12 md:p-20 border border-brand-50 mb-20">
           <div className="flex items-center space-x-6 mb-12">
              <Gavel className="text-accent-500 size-12" />
              <h2 className="text-3xl font-serif font-bold text-brand-900">Ethics Declaration</h2>
           </div>
           
           <div className="prose prose-lg text-neutral-700 max-w-none mb-16">
              <p>
                 The <strong>Igniting Journal of Multidisciplinary and Contemporary Studies (IJMCS)</strong> is committed to ensuring that all published works meet global ethical standards. 
                 We strictly follow the principles of the <strong>Committee on Publication Ethics (COPE)</strong>. 
                 Any suspected malpractice will be investigated in accordance with COPE flowcharts.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {policies.map((p, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-brand-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="mb-6">{p.icon}</div>
                   <h4 className="text-xl font-serif font-bold text-brand-900 mb-4">{p.title}</h4>
                   <p className="text-neutral-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-brand-900 text-white rounded-[4rem] p-12 md:p-16 relative overflow-hidden text-center">
            <h3 className="text-2xl font-serif font-bold mb-6">Post-Publication Policies</h3>
            <p className="text-brand-100 max-w-3xl mx-auto leading-relaxed italic">
               "Should any error or misconduct be identified post-publication, IJMCS will initiate a formal review. 
               Corrections, clarifications, or retractions will be issued to maintain the integrity of the scholarly record."
            </p>
        </section>
      </div>
    </div>
  );
};

export default EthicsPage;
