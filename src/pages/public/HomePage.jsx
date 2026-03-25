import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Bell, Users, Globe, Award, ChevronRight, Zap } from 'lucide-react';

const HomePage = () => {
  const disciplines = [
    { title: 'Humanities', icon: '🎨', color: 'bg-blue-100', desc: 'Language, Literature, Philosophy, and Religious Studies.' },
    { title: 'Social Sciences', icon: '👥', color: 'bg-purple-100', desc: 'Politics, Sociology, Anthropology and Psychology.' },
    { title: 'Sciences', icon: '🔬', color: 'bg-green-100', desc: 'Scientific and Technological Inquiry across sectors.' },
    { title: 'Education', icon: '🎓', color: 'bg-orange-100', desc: 'Pedagogical innovation and academic leadership.' },
    { title: 'Environment', icon: '🌿', color: 'bg-emerald-100', desc: 'Climate change and environmental sustainability.' },
    { title: 'Peace & Conflict', icon: '🕊️', color: 'bg-rose-100', desc: 'Resolution strategies and societal harmony.' },
  ];

  const stats = [
    { label: 'Frequency', value: 'Biannual', icon: <Globe className="text-accent-500" /> },
    { label: 'Review', value: 'Double-Blind', icon: <Users className="text-accent-500" /> },
    { label: 'Access', value: 'Open Access', icon: <BookOpen className="text-accent-500" /> },
    { label: 'Integrity', value: 'Turnitin Verified', icon: <Award className="text-accent-500" /> },
  ];

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-brand-900 text-white overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.png" alt="Research Library" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-brand-900/80"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-700 blur-[150px] opacity-40"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-600 blur-[120px] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center space-x-3 mb-8">
               <span className="w-12 h-px bg-accent-500"></span>
               <span className="text-accent-400 font-bold tracking-[0.4em] text-[10px] uppercase">International Peer-Reviewed Journal</span>
               <span className="w-12 h-px bg-accent-500"></span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[1.05] max-w-5xl mx-auto tracking-tight">
              Igniting <span className="text-accent-500 italic">Multidisciplinary</span> & Contemporary Studies
            </h1>
            
            <p className="text-lg md:text-2xl text-brand-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Advancing knowledge across diverse disciplines through a dynamic platform for impactful, high-quality original research.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/register"
                className="group relative w-full sm:w-auto px-10 py-5 bg-accent-500 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all shadow-2xl shadow-accent-900/30"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center">
                  Get Started <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Branding Strip */}
      <section className="bg-brand-50/50 py-8 border-b border-brand-100">
         <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 filter grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <span className="font-serif font-bold text-xl text-brand-900">Google Scholar</span>
                <span className="font-serif font-bold text-xl text-brand-900">OpenAIRE</span>
                <span className="font-serif font-bold text-xl text-brand-900">CrossRef</span>
                <span className="font-serif font-bold text-xl text-brand-900">Zenodo</span>
                <span className="font-serif font-bold text-xl text-brand-900">PKP</span>
            </div>
         </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
                <span className="text-accent-500 font-bold uppercase tracking-widest text-xs mb-4 inline-block">The IJMCS Mission</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-8 leading-tight">
                   Bridging the gaps between humanities, sciences, and society.
                </h2>
                <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                   <p>
                     The Igniting Journal of Multidisciplinary and Contemporary Studies (IJMCS) is dedicated to addressesing contemporary global and local challenges. 
                     We provide a dynamic platform for scholars, researchers, and practitioners to publish high-quality, original research.
                   </p>
                   <p className="font-serif italic text-brand-800 border-l-4 border-accent-500 pl-6 py-2 bg-brand-50/50 rounded-r-xl">
                     "Our commitment extends to fostering intellectual exchange, critical thinking, and impactful scholarship relevant to modern society."
                   </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8">
                   {stats.map((s, i) => (
                     <div key={i} className="flex flex-col">
                        <div className="mb-2">{s.icon}</div>
                        <span className="text-2xl font-serif font-bold text-brand-900">{s.value}</span>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{s.label}</span>
                     </div>
                   ))}
                </div>
             </motion.div>
             
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative"
             >
                <div className="aspect-square bg-neutral-100 rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border-[16px] border-white">
                    <img src="/images/about-mission.png" alt="Academic Presentation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply"></div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl z-0"></div>
                <div className="absolute -top-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-xl z-20 max-w-[200px] border border-brand-50">
                    <Zap className="text-accent-500 mb-4" size={32} />
                    <p className="text-xs font-bold text-brand-900 leading-relaxed uppercase tracking-tighter">Rigorous Double-Blind Peer Review Process</p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Scope Grid */}
      <section className="py-32 bg-neutral-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-900 mb-6 italic">Multidisciplinary Reach</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
              We welcome innovative research addressing societal challenges across scientific and technological inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {disciplines.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -15 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[3rem] shadow-card border border-brand-50 group transition-all duration-500 hover:shadow-2xl"
              >
                <div className={`${item.color} w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-900 mb-4 group-hover:text-accent-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm mb-10 leading-relaxed min-h-[50px]">
                  {item.desc}
                </p>
                <Link to="/aims-and-scope" className="inline-flex items-center text-xs font-bold text-brand-800 uppercase tracking-widest hover:text-accent-500 group-hover:translate-x-2 transition-all">
                  Full Scope <ChevronRight size={14} className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-brand-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="/images/research-abstract.png" alt="Abstract Research" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen" />
            <div className="absolute inset-0 bg-brand-900/80"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.25),transparent)]"></div>
         </div>
         <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Ready to impact <span className="text-accent-500">scholarship?</span></h2>
            <p className="text-brand-200 mb-16 max-w-2xl mx-auto text-xl font-light leading-relaxed">
               Join a global community of innovators. Fast-track peer review. 100% Open Access. Turnitin originality screening.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link
                 to="/register"
                 className="px-12 py-6 bg-accent-500 hover:bg-accent-400 text-white rounded-2xl font-bold text-xl shadow-2xl transition-all transform hover:-translate-y-2"
               >
                 Submit Your Manuscript
               </Link>
               <Link
                 to="/current"
                 className="px-12 py-6 bg-white text-brand-900 hover:bg-brand-50 rounded-2xl font-bold text-xl transition-all transform hover:-translate-y-2 shadow-xl"
               >
                 Read Latest Issue
               </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
