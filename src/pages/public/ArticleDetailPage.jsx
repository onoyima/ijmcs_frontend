import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { FileText, Download, User, Calendar, Quote, BookOpen, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await api.get(`/api/articles/${id}`);
        setArticle(data);
      } catch (err) {
        console.error('Failed to fetch article:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const copyCitation = () => {
    const citation = `${article.last_name}, ${article.first_name.charAt(0)}. (${article.year}). ${article.title}. Igniting Journal of Multidisciplinary and Contemporary Studies, ${article.volume}(${article.number}), ${article.page_start}-${article.page_end}.`;
    navigator.clipboard.writeText(citation);
    toast.success('Citation copied to clipboard (APA Style)');
  };

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif text-3xl">Loading Article...</div>;
  if (!article) return <div className="py-40 text-center text-2xl font-serif">Article not found.</div>;

  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-400 mb-12 overflow-hidden whitespace-nowrap">
           <Link to="/archives" className="hover:text-brand-800 transition-colors">Archives</Link>
           <span>/</span>
           <Link to={`/issue/${article.issue_id}`} className="hover:text-brand-800 transition-colors">Vol. {article.volume} No. {article.number}</Link>
           <span>/</span>
           <span className="text-brand-700 font-medium truncate">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
             <motion.article 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-10 md:p-14 rounded-[3rem] shadow-card border border-brand-50"
             >
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-[10px] bg-brand-50 text-brand-800 px-3 py-1 rounded-full font-bold uppercase tracking-widest leading-none">Original Research</span>
                  {article.doi && <span className="text-[10px] text-neutral-400 font-mono tracking-tighter">DOI: {article.doi}</span>}
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-8 leading-tight">
                   {article.title}
                </h1>

                <div className="flex flex-wrap gap-6 items-center mb-10 pb-8 border-b border-neutral-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-700 mr-3"><User size={20} /></div>
                    <span className="font-bold text-brand-800">{article.first_name} {article.last_name}</span>
                  </div>
                  <div className="flex items-center text-neutral-400 text-sm">
                    <Calendar size={18} className="mr-2" /> {new Date(article.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}
                  </div>
                </div>

                <section className="mb-10">
                   <h2 className="text-sm font-bold text-brand-900 uppercase tracking-widest mb-4 flex items-center">
                      <BookOpen size={16} className="mr-2 text-accent-500" /> Abstract
                   </h2>
                   <p className="text-neutral-600 leading-relaxed text-lg font-light first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-brand-800">
                      {article.abstract}
                   </p>
                </section>

                <section>
                   <h2 className="text-sm font-bold text-brand-900 uppercase tracking-widest mb-4">Keywords</h2>
                   <div className="flex flex-wrap gap-2">
                      {article.keywords.split(',').map((kw, i) => (
                        <span key={i} className="px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-xl text-xs text-neutral-500 font-medium">
                          {kw.trim()}
                        </span>
                      ))}
                   </div>
                </section>
             </motion.article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-brand-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>
                
                <h3 className="text-xl font-serif font-bold mb-8 border-b border-brand-800 pb-4">Full-Text Links</h3>
                <div className="space-y-4">
                   <button className="w-full py-4 bg-accent-500 hover:bg-accent-400 text-white rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all">
                      <Download size={20} /> <span>PDF Download</span>
                   </button>
                   <button className="w-full py-4 bg-brand-800 hover:bg-brand-700 text-brand-100 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all border border-brand-700">
                      <FileText size={20} /> <span>HTML View</span>
                   </button>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-10 border border-brand-50 shadow-card">
                <h3 className="text-lg font-serif font-bold text-brand-800 mb-6 flex items-center">
                   <Quote className="mr-3 text-accent-500" size={20} /> Cite this Article
                </h3>
                <p className="text-xs text-neutral-400 mb-6 font-mono leading-relaxed bg-neutral-50 p-4 rounded-xl">
                   {article.last_name}, {article.first_name.charAt(0)}. ({article.year}). {article.title}. IJMCS...
                </p>
                <button 
                  onClick={copyCitation}
                  className="w-full py-3 bg-brand-50 text-brand-800 rounded-xl font-bold text-sm hover:bg-brand-100 transition-colors border border-brand-100"
                >
                   Copy APA Citation
                </button>
             </div>

             <div className="bg-white rounded-[2.5rem] p-10 border border-brand-50 shadow-card">
                <h3 className="text-lg font-serif font-bold text-brand-800 mb-4 flex items-center">
                   <Share2 className="mr-3 text-accent-500" size={20} /> Sharing
                </h3>
                <div className="flex justify-between">
                   <button className="text-neutral-400 hover:text-brand-800 p-2"><Share2 size={24} /></button>
                   {/* Add more share icons as needed */}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
