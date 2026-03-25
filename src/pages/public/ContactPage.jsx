import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mocking submission
    setTimeout(() => {
      toast.success('Message sent! Our editorial office will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-brand-900 mb-6"
          >
            Get in Touch
          </motion.h1>
          <div className="h-1.5 w-24 bg-accent-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-neutral-500 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Our editorial office is available to assist with all enquiries regarding submissions, peer-review, and publications.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <section className="bg-brand-900 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500 opacity-10 rounded-full blur-[80px] -mr-32 -mb-32"></div>
               <h2 className="text-2xl font-serif font-bold mb-12 border-b border-brand-700 pb-4">Editorial Office</h2>
               
               <div className="space-y-10">
                 <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-3xl"><MapPin className="text-accent-500" /></div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">Location</h4>
                      <p className="text-lg leading-relaxed font-serif">
                        Faculty of Arts,<br />Lagos State University (LASU),<br />Ojo, Lagos, Nigeria.
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-3xl"><Mail className="text-accent-500" /></div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">Email Us</h4>
                      <p className="text-lg font-serif break-all underline decoration-accent-500 decoration-2 underline-offset-4">
                        journal.ignitingmultidisciplinary@lasu.edu.ng
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start space-x-6">
                    <div className="bg-white/10 p-4 rounded-3xl"><Clock className="text-accent-500" /></div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">Inquiry Hours</h4>
                      <p className="text-lg font-serif">Mon - Fri, 9:00 AM - 4:00 PM (WAT)</p>
                    </div>
                 </div>
               </div>
            </section>

            <div className="bg-neutral-50 p-10 rounded-[3rem] border border-brand-50 flex items-center space-x-6">
               <div className="bg-white p-4 rounded-2xl shadow-sm"><Globe className="text-accent-500" /></div>
               <p className="text-neutral-600 font-serif italic text-sm">
                 "We are committed to global academic collaboration. Reach out for institutional partnerships."
               </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
             <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-card border border-brand-50">
                <h2 className="text-3xl font-serif font-bold mb-10 text-brand-900">Direct Message</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Full Name</label>
                        <input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-serif"
                          placeholder="Dr. Johnson ..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Email</label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-serif"
                          placeholder="scholar@lasu.edu.ng"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Inquiry Subject</label>
                      <input 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-serif"
                        placeholder="Manuscript submission query..."
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Detailed Message</label>
                      <textarea 
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[3rem] focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-serif resize-none"
                        placeholder="How can we assist you today?"
                      ></textarea>
                   </div>

                   <button 
                     type="submit"
                     disabled={isLoading}
                     className="w-full py-6 bg-accent-500 hover:bg-accent-400 text-brand-900 rounded-[2rem] font-bold text-xl shadow-xl flex items-center justify-center space-x-4 transition-all transform hover:-translate-y-1 disabled:opacity-50"
                   >
                     <span className="uppercase tracking-[0.2em]">{isLoading ? 'Processing...' : 'Send Inquiry'}</span>
                     {!isLoading && <Send size={24} />}
                   </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
