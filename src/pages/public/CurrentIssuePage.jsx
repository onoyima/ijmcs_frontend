import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, User, Download, ExternalLink, Calendar } from 'lucide-react';

const CurrentIssuePage = () => {
  const [issue, setIssue] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const { data: currentIssue } = await api.get('/api/issues/current');
        setIssue(currentIssue);
        const { data: issueArticles } = await api.get(`/api/issues/${currentIssue.id}/articles`);
        setArticles(issueArticles);
      } catch (err) {
        console.error('Failed to fetch current issue:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrent();
  }, []);

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif text-3xl">Loading Current Issue...</div>;
  
  if (!issue) return (
     <div className="py-40 text-center">
       <BookOpen size={64} className="mx-auto text-brand-100 mb-6" />
       <h2 className="text-3xl font-serif font-bold text-brand-800 mb-4">No Issues Published Yet</h2>
       <p className="text-neutral-500">The inaugural issue is currently in production.</p>
     </div>
  );

  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Issue Header */}
        <header className="bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white mb-16 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-[150px] opacity-10 -mr-48 -mt-48"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
             <div className="w-64 h-80 bg-white rounded-xl shadow-2xl flex-shrink-0 flex items-center justify-center p-6 border-8 border-brand-800">
                <div className="text-center">
                  <div className="text-4xl font-serif font-black text-brand-900 border-b-4 border-accent-500 pb-2 mb-2 inline-block">IJMCS</div>
                  <div className="text-[10px] text-brand-500 uppercase tracking-widest font-bold mb-8">Journal Cover</div>
                  <div className="text-brand-800 font-serif font-bold">Vol. {issue.volume} No. {issue.number}</div>
                  <div className="text-sm text-neutral-400">{issue.year}</div>
                </div>
             </div>
             
             <div className="text-center md:text-left">
               <span className="inline-block px-4 py-1.5 bg-accent-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Latest Release</span>
               <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                  {issue.title || `Volume ${issue.volume}, Issue ${issue.number}`}
               </h1>
               <div className="flex flex-wrap items-center gap-6 text-brand-100 text-sm">
                 <div className="flex items-center"><Calendar size={16} className="mr-2 text-accent-400" /> Published {new Date(issue.published_at).toLocaleDateString()}</div>
                 <div className="flex items-center"><FileText size={16} className="mr-2 text-accent-400" /> {articles.length} Research Articles</div>
               </div>
             </div>
           </div>
        </header>

        {/* Articles List */}
        <section>
          <div className="flex items-center space-x-4 mb-12">
            <h2 className="text-3xl font-serif font-bold text-brand-800">Table of Contents</h2>
            <div className="flex-grow h-px bg-brand-200"></div>
          </div>

          <div className="space-y-8">
            {articles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-card border border-brand-50 group hover:border-brand-200 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-grow">
                    <span className="text-[10px] bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full uppercase font-bold tracking-tight mb-3 inline-block">
                      Original Research
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-3 leading-snug group-hover:text-accent-500 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-sm text-brand-700 font-medium mb-4">
                      <User size={16} className="mr-2 text-brand-300" /> {article.first_name} {article.last_name}
                    </div>
                    <div className="text-xs text-neutral-400 flex items-center">
                      DOI: <span className="ml-1 text-brand-500 hover:underline cursor-pointer">10.ijmcs/{issue.year}/{article.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link 
                      to={`/article/${article.id}`}
                      className="flex items-center justify-center p-3 md:px-6 md:py-3 bg-brand-50 text-brand-800 rounded-xl hover:bg-brand-100 transition-colors font-bold text-sm"
                    >
                      <BookOpen size={18} className="md:mr-2" /> <span className="hidden md:inline">Abstract</span>
                    </Link>
                    <button className="flex items-center justify-center p-3 md:px-6 md:py-3 bg-accent-500 text-white rounded-xl hover:bg-accent-400 transition-colors font-bold text-sm">
                      <Download size={18} className="md:mr-2" /> <span className="hidden md:inline">PDF Full-Text</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CurrentIssuePage;
