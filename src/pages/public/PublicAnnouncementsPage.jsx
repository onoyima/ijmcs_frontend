import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Bell, Calendar, ChevronRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicAnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await api.get('/api/announcements');
        // Only show published ones (Backend should filter, but double check)
        setAnnouncements(data.filter(a => a.is_public));
      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-brand-900 border-b border-brand-800 py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-accent-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Official Journal News</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Announcements</h1>
            <p className="text-brand-200 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Stay updated with the latest calls for papers, editorial changes, and academic events from IJMCS.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50/50">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
             <div className="space-y-8 animate-pulse">
                {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white rounded-[2.5rem] shadow-sm"></div>)}
             </div>
          ) : announcements.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-[3rem] border border-brand-50 shadow-card">
                <Bell size={48} className="text-neutral-200 mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-brand-800 mb-2">No active announcements</h3>
                <p className="text-neutral-400">Check back later for updates from the editorial board.</p>
             </div>
          ) : (
            <div className="space-y-10">
               {announcements.map((ann, idx) => (
                  <motion.div
                    key={ann.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 md:p-14 rounded-[3rem] shadow-card border border-brand-50 hover:shadow-2xl transition-all group"
                  >
                     <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                           <div className="flex items-center space-x-3 mb-4">
                              <span className="p-2 bg-accent-50 text-accent-600 rounded-xl">
                                 <Newspaper size={20} />
                              </span>
                              <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest flex items-center">
                                 <Calendar size={14} className="mr-2" /> {new Date(ann.created_at).toLocaleDateString()}
                              </span>
                           </div>
                           <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-900 group-hover:text-accent-500 transition-colors">
                              {ann.title}
                           </h2>
                        </div>
                     </div>
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        {ann.image_url && (
                          <div className="w-full md:w-48 h-48 bg-neutral-100 rounded-3xl overflow-hidden shrink-0 border border-neutral-100">
                             <img src={ann.image_url} alt={ann.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-grow">
                          <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed text-sm mb-6 line-clamp-3 italic">
                             {ann.content}
                          </div>
                          <Link 
                            to={`/announcements/${ann.id}`}
                            className="inline-flex items-center text-brand-900 font-black uppercase tracking-widest text-[10px] hover:text-accent-600 transition-colors"
                          >
                             Read Full Report <ChevronRight size={14} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                  </motion.div>
               ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PublicAnnouncementsPage;
