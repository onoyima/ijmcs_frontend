import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Calendar, ChevronLeft, Newspaper, Share2, Printer, Tag, Clock } from 'lucide-react';

const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const [ann, setAnn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await api.get(`/api/announcements/${id}`);
        setAnn(data);
      } catch (err) {
        setError('Announcement not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center animate-pulse">
        <div className="w-16 h-16 bg-brand-200 rounded-full mx-auto mb-4"></div>
        <p className="text-brand-900 font-serif font-bold">Loading announcement details...</p>
      </div>
    </div>
  );

  if (error || !ann) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center bg-white p-12 rounded-[3rem] shadow-card border border-brand-50">
        <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">{error}</h2>
        <Link to="/announcements" className="text-accent-600 font-bold hover:underline">Back to Announcements</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Dynamic Header / Hero */}
      <header className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-brand-900 flex items-end pb-16">
        {ann.image_url && (
          <img 
            src={ann.image_url} 
            alt={ann.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-4 py-1.5 bg-accent-500 text-brand-900 text-[10px] font-black uppercase tracking-widest rounded-full">
                {ann.type?.replace('_', ' ') || 'General'}
              </span>
              <span className="text-brand-200 text-xs font-bold flex items-center">
                <Calendar size={14} className="mr-2" /> {new Date(ann.created_at).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              {ann.title}
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Article Body */}
          <main className="lg:col-span-8">
            <motion.article 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-16 rounded-[4rem] shadow-card border border-brand-50"
            >
              <div className="flex justify-between items-center mb-12 pb-8 border-b border-neutral-100">
                <Link 
                  to="/announcements" 
                  className="flex items-center text-brand-400 hover:text-brand-900 font-bold text-xs transition-colors"
                >
                  <ChevronLeft size={16} className="mr-1" /> Back to List
                </Link>
                <div className="flex items-center space-x-4">
                  <button onClick={() => window.print()} className="p-3 bg-neutral-50 rounded-2xl text-neutral-400 hover:text-brand-900 transition-all">
                    <Printer size={18} />
                  </button>
                  <button className="p-3 bg-neutral-50 rounded-2xl text-neutral-400 hover:text-brand-900 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <div className="prose prose-lg prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-8">
                {ann.content.split('\n').map((para, i) => para && (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Tags/Meta Footer */}
              <div className="mt-20 pt-10 border-t border-neutral-100 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-neutral-400">
                  <Tag size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Academic News</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-400">
                  <Tag size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Journal Updates</span>
                </div>
              </div>
            </motion.article>
          </main>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-brand-50 p-10 rounded-[3rem] border border-brand-100">
              <h3 className="text-xl font-serif font-bold text-brand-900 mb-8 border-l-4 border-accent-500 pl-4">About IJMCS</h3>
              <p className="text-sm text-brand-800/70 leading-relaxed mb-8 italic">
                The International Journal of Modern Communication Studies is a peer-reviewed, open-access journal dedicated to publishing high-quality research from across the globe.
              </p>
              <Link to="/about" className="text-accent-600 font-bold text-sm hover:underline flex items-center">
                Learn more <ChevronLeft size={16} className="rotate-180 ml-2" />
              </Link>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-card border border-brand-50">
               <h3 className="text-xl font-serif font-bold text-brand-900 mb-8 flex items-center">
                 <Clock size={20} className="mr-3 text-accent-500" /> Related Call for Papers
               </h3>
               <div className="space-y-6">
                  {/* Mock related items or fetch others */}
                  <div className="p-4 rounded-2xl hover:bg-neutral-50 transition-all cursor-pointer group">
                    <h4 className="font-bold text-brand-900 group-hover:text-accent-600 transition-colors">Special Issue: Digital Transformation</h4>
                    <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1 block">Due: Oct 20, 2026</span>
                  </div>
                  <div className="p-4 rounded-2xl hover:bg-neutral-50 transition-all cursor-pointer group">
                    <h4 className="font-bold text-brand-900 group-hover:text-accent-600 transition-colors">Call for Reviewers 2026</h4>
                    <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1 block">Always Open</span>
                  </div>
               </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;
