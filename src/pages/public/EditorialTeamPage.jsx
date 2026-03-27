import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Globe, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditorialTeamPage = () => {
  const board = [
    { name: "Prof. Benson Ohihon Igboin", affiliation: "Adekunle Ajasin University, Akungba-Akoko, Ondo State, Nigeria", role: "Associate Editor" },
    { name: "Prof. Babatunde A. Adedibu", affiliation: "Redeemer’s University, Ede, Osun State Nigeria", role: "Associate Editor" },
    { name: "Prof. Hebatallah Adam", affiliation: "University College Ajman, United Arab Emirates", role: "International Member" },
    { name: "Prof. Dao Cam Thuy", affiliation: "Saint Francis University (USA), Troy University (USA)", role: "International Member" },
    { name: "Prof. Florieza Mangubat", affiliation: "Cebu Technological University – Tuburan Campus, Philippines", role: "International Member" },
    { name: "Dr. Riflky A. Mohamed", affiliation: "Eastern University, Sri Lanka", role: "International Member" },
    { name: "Prof. Khadem Saeedi", affiliation: "Education, Kandahar University, Afghanistan", role: "International Member" }
  ];

  const advisory = [
    "Dr Ayodeji Boluwatife Aiyesimoju, Joseph Ayo Babalola University",
    "Dr Gever Verlumun Celestine, University of Nigeria, Nsukka",
    "Associate Prof. Bernice O. Sanusi, Redeemer’s University",
    "Prof. Tokunbo Alex Adaja, Joseph Ayo Babalola University"
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-6"
          >
            Editorial Team
          </motion.h1>
          <div className="h-1.5 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-neutral-500 font-serif italic max-w-3xl mx-auto">
            Governed by excellence. Guided by international scholarly standards.
          </p>
        </header>

        {/* EIC Section */}
        <section className="mb-32">
           <div className="bg-neutral-50 rounded-[4rem] p-10 md:p-16 border border-brand-50 flex flex-col md:flex-row gap-12 items-center shadow-sm">
              <div className="w-full md:w-1/3 aspect-square rounded-[3rem] overflow-hidden shadow-xl flex-shrink-0 relative">
                  <img 
                    src="/images/editorial_team_bg_1774478036378.png" 
                    alt="Editorial Board" 
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
              </div>
              <div>
                 <span className="text-accent-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4 inline-block">Editor-in-Chief</span>
                 <h2 className="text-4xl font-serif font-bold text-brand-900 mb-4">Dr. Joseph Moyinoluwa Talabi</h2>
                 <p className="text-neutral-500 text-lg mb-8 leading-relaxed max-w-2xl">
                    Department of Religions and Peace Studies, Faculty of Arts, Lagos State University, Nigeria.
                 </p>
                 <Link to="/editor-in-chief" className="inline-flex items-center px-6 py-3 bg-brand-900 text-white rounded-xl font-bold text-sm hover:bg-brand-800 transition-all shadow-lg">
                    Full Bio & Vision <ChevronRight size={16} className="ml-2" />
                 </Link>
              </div>
           </div>
        </section>

        {/* Board Members */}
        <section className="mb-32">
           <div className="flex items-center justify-between mb-16 px-4">
              <h3 className="text-3xl font-serif font-bold text-brand-900">International Editorial Board</h3>
              <Globe className="text-accent-500" size={32} />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {board.map((member, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-brand-50 shadow-card hover:border-accent-200 transition-all group"
                >
                   <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{member.role}</span>
                   </div>
                   <h4 className="text-xl font-serif font-bold text-brand-900 mb-2 group-hover:text-accent-600 transition-colors">{member.name}</h4>
                   <p className="text-neutral-400 text-sm italic">{member.affiliation}</p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Advisory Board */}
        <section className="bg-brand-900 text-white p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 opacity-5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
           <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-12">
                 <h3 className="text-3xl font-serif font-bold">Editorial Advisory Board</h3>
                 <div className="h-px flex-grow bg-brand-700"></div>
                 <Award className="text-accent-500" size={32} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                 {advisory.map((name, i) => (
                   <div key={i} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                      <p className="text-brand-100 text-lg font-serif">{name}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="mt-24 text-center">
           <p className="text-neutral-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">Editorial Office</p>
           <p className="text-brand-900 text-xl font-serif">Faculty of Arts, Lagos State University, Nigeria</p>
        </section>
      </div>
    </div>
  );
};

export default EditorialTeamPage;
