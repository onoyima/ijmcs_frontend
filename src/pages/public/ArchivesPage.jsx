import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { Book, Calendar, ChevronRight, Hash } from 'lucide-react';

const ArchivesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data } = await api.get('/api/issues');
        setIssues(data);
      } catch (err) {
        console.error('Failed to fetch issues:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-4">Archives</h1>
            <div className="h-1.5 w-20 bg-accent-500 rounded-full"></div>
          </div>
          <p className="text-neutral-500 max-w-sm">
            Browse our complete collection of published journal volumes dating back to our foundation.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-white rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : issues.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl text-center shadow-card border border-brand-50">
            <Book size={48} className="mx-auto text-brand-200 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-brand-800 mb-2">No Archives Found</h3>
            <p className="text-neutral-500">We are currently preparing our inaugural archives. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {issues.map((issue, idx) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-card border border-brand-50 group overflow-hidden relative"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-[4rem] group-hover:bg-accent-100 transition-colors -mr-12 -mt-12"></div>
                
                <div className="flex items-center space-x-2 text-xs font-bold text-accent-600 uppercase tracking-widest mb-4">
                  <Calendar size={14} />
                  <span>Published {new Date(issue.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                </div>

                <h2 className="text-3xl font-serif font-bold text-brand-800 mb-2 leading-tight">
                  Vol. {issue.volume} No. {issue.number} ({issue.year})
                </h2>
                <h3 className="text-lg text-neutral-500 mb-8 font-light italic">
                  {issue.title || 'General Issue'}
                </h3>

                <div className="flex items-center justify-between mt-auto">
                   <div className="flex space-x-4">
                    <div className="flex items-center text-xs text-brand-500 font-bold bg-brand-50 px-3 py-1.5 rounded-full">
                      <Hash size={12} className="mr-1" /> ISSN: XXXX
                    </div>
                  </div>
                  <Link 
                    to={`/issue/${issue.id}`}
                    className="flex items-center px-6 py-3 bg-brand-800 hover:bg-brand-700 text-white rounded-2xl font-bold transition-all transform group-hover:px-8"
                  >
                    View Issue <ChevronRight size={18} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchivesPage;
