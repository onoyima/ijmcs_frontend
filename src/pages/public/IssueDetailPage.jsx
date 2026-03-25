import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { BookOpen, FileText, User, Download, Calendar } from 'lucide-react';

const IssueDetailPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssueData = async () => {
      try {
        const { data: issueData } = await api.get(`/api/issues/${id}/articles`);
        // Note: The getArticles endpoint currently doesn't return issue metadata itself in my controller.
        // I'll need to fetch the issue details separately or adjust the backend.
        // For now, I'll fetch issue details from the issues list filter or a new endpoint if I add one.
        // Let's assume there's a GET /api/issues/:id
        const { data: allIssues } = await api.get('/api/issues');
        const currentIssue = allIssues.find(i => i.id == id);
        
        setIssue(currentIssue);
        setArticles(issueData);
      } catch (err) {
        console.error('Failed to fetch issue data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssueData();
  }, [id]);

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif text-3xl">Loading Issue...</div>;
  if (!issue) return <div className="py-40 text-center text-2xl font-serif">Issue not found.</div>;

  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white mb-16 relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
             <div className="w-64 h-80 bg-white rounded-xl shadow-2xl flex-shrink-0 flex items-center justify-center p-6 border-8 border-brand-800">
                <div className="text-center">
                  <div className="text-4xl font-serif font-black text-brand-900 border-b-4 border-accent-500 pb-2 mb-2 inline-block">IJMCS</div>
                  <div className="text-brand-800 font-serif font-bold">Vol. {issue.volume} No. {issue.number}</div>
                  <div className="text-sm text-neutral-400">{issue.year}</div>
                </div>
             </div>
             
             <div className="text-center md:text-left">
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

        <section>
          <div className="flex items-center space-x-4 mb-12">
            <h2 className="text-3xl font-serif font-bold text-brand-800">Articles in this Issue</h2>
            <div className="flex-grow h-px bg-brand-200"></div>
          </div>

          <div className="space-y-8">
            {articles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-3xl shadow-card border border-brand-50 group hover:border-brand-200 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900 mb-3 leading-snug group-hover:text-accent-500 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-sm text-brand-700 font-medium mb-4">
                      <User size={16} className="mr-2 text-brand-300" /> {article.first_name} {article.last_name}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
                    <Link 
                      to={`/article/${article.id}`}
                      className="flex items-center justify-center p-3 md:px-6 md:py-3 bg-brand-50 text-brand-800 rounded-xl hover:bg-brand-100 transition-colors font-bold text-sm"
                    >
                      <BookOpen size={18} className="md:mr-2" /> <span className="hidden md:inline">Abstract</span>
                    </Link>
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

export default IssueDetailPage;
