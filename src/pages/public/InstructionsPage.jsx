import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, FileStack, CornerDownRight } from 'lucide-react';

const InstructionsPage = () => {
  const sections = [
    {
      title: 'Submission Guidelines',
      icon: <FileText className="text-accent-500" />,
      content: [
        'Authors are invited to submit original, unpublished manuscripts for consideration.',
        'Manuscripts must not be under review in any other journal.',
        'Length: 4,000 to 7,000 words (including tables and references).',
        'Submission is strictly through the online portal on the journal website.'
      ]
    },
    {
      title: 'Manuscript Preparation',
      icon: <FileStack className="text-accent-500" />,
      content: [
        'Format: MS Word (.doc or .docx), Times New Roman, 12pt, double-spaced.',
        'Abstract: Maximum 250 words summarizing the main points.',
        'Keywords: 4 to 6 relevant terms for indexing purposes.',
        'Structural flow: Introduction, Literature Review, Methodology, Results, Discussion, Conclusion.'
      ]
    },
    {
       title: 'Citations & Referencing',
       icon: <CheckCircle className="text-accent-500" />,
       content: [
         'APA 7th Edition style must be strictly followed for citations and references.',
         'Include DOIs for all references where available.',
         'Alphabetical ordering of references in the bibliography list.',
         'In-text citations must match the final reference list exactly.'
       ]
    }
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-6 underline decoration-accent-500 decoration-8 underline-offset-8">
              Author Guidelines
            </h1>
            <p className="text-xl text-neutral-500 mt-12 font-serif leading-relaxed max-w-3xl">
              We welcome submissions that offer fresh perspectives on contemporary issues within our scope. 
              Please adhere strictly to the following standards to ensure processing.
            </p>
          </motion.div>
        </header>

        <section className="space-y-12 mb-24">
           {sections.map((sec, i) => (
             <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 rounded-[3rem] p-10 md:p-14 border border-brand-50 shadow-sm"
             >
                <div className="flex items-center space-x-6 mb-8 border-b border-brand-100 pb-6">
                   <div className="bg-white p-4 rounded-3xl shadow-md text-brand-900">{sec.icon}</div>
                   <h3 className="text-3xl font-serif font-bold text-brand-900">{sec.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                   {sec.content.map((item, j) => (
                     <div key={j} className="flex items-start space-x-4">
                        <CornerDownRight className="text-accent-500 shrink-0 mt-1" size={18} />
                        <p className="text-neutral-600 leading-relaxed">{item}</p>
                     </div>
                   ))}
                </div>
             </motion.div>
           ))}
        </section>

        <section className="bg-brand-900 text-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 opacity-10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <div className="flex items-center space-x-4 mb-8">
                    <AlertCircle className="text-accent-500" size={40} />
                    <h2 className="text-3xl font-serif font-bold">Submission Notice</h2>
                 </div>
                 <p className="text-brand-100 text-lg leading-relaxed mb-8">
                    By submitting, authors guarantee the work is original and not under consideration elsewhere. 
                    IJMCS employs <strong>Turnitin</strong> to uphold academic integrity.
                 </p>
                 <button className="px-10 py-5 bg-accent-500 text-brand-900 rounded-2xl font-black uppercase tracking-widest hover:bg-accent-400 transition-all transform hover:-translate-y-1 shadow-xl">
                    Submit Manuscript
                 </button>
              </div>
              <div className="bg-brand-800/50 p-8 rounded-[2.5rem] border border-brand-700">
                 <h4 className="font-bold text-accent-500 mb-4 uppercase tracking-widest text-sm">Download Templates</h4>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-brand-900/50 rounded-xl hover:bg-brand-900 transition-colors cursor-pointer border border-brand-800">
                       <span className="text-sm font-serif">Original Research Template</span>
                       <FileText size={18} className="text-neutral-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-brand-900/50 rounded-xl hover:bg-brand-900 transition-colors cursor-pointer border border-brand-800">
                       <span className="text-sm font-serif">Cover Letter Template</span>
                       <FileText size={18} className="text-neutral-500" />
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default InstructionsPage;
