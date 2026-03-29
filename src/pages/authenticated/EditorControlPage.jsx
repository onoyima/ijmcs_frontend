import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Shield, Users, FileText, CheckCircle, Clock, Search, Filter, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditorControlPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await api.get('/api/reviews/editor/all');
        setSubmissions(data);
      } catch (err) {
        console.error('Editor fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered = submissions.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.author_last.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-brand-900 text-white rounded-3xl flex items-center justify-center shadow-xl">
                 <Shield size={32} />
              </div>
              <div>
                 <h1 className="text-3xl font-serif font-bold text-brand-900">Editorial Control Panel</h1>
                 <p className="text-neutral-500 text-sm">Overseeing the IJMCS scholarship ecosystem.</p>
              </div>
           </div>

           <div className="flex bg-white rounded-2xl shadow-sm border border-brand-100 p-2 w-full md:w-96">
              <div className="p-3 text-neutral-400"><Search size={20} /></div>
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or author..."
                className="bg-transparent border-none outline-none w-full text-sm font-medium"
              />
           </div>
        </header>

        <section className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-brand-50/50">
                       <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-brand-900">Manuscript Details</th>
                       <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-brand-900">Author</th>
                       <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-brand-900">Status</th>
                       <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-brand-900">Submitted</th>
                       <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-brand-900 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-neutral-100">
                    {loading ? (
                      [1, 2, 3].map(i => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={5} className="px-8 py-10"><div className="h-8 bg-neutral-100 rounded-lg w-full"></div></td>
                        </tr>
                      ))
                    ) : filtered.map((sub, idx) => (
                      <motion.tr 
                        key={sub.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-neutral-50/50 transition-colors group"
                      >
                         <td className="px-8 py-8 max-w-md">
                            <h3 className="font-serif font-bold text-brand-900 truncate mb-1 group-hover:text-accent-500 transition-colors" title={sub.title}>
                               {sub.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                               <span className="text-[10px] text-neutral-400 font-mono tracking-tighter uppercase border-r border-neutral-200 pr-2">{sub.discipline}</span>
                               <span className="text-[10px] text-brand-600 font-bold tracking-widest uppercase">
                                  {sub.issue_volume ? `Vol ${sub.issue_volume} No ${sub.issue_number}` : 'Unassigned'}
                               </span>
                            </div>
                         </td>
                         <td className="px-8 py-8">
                            <div className="flex items-center space-x-3">
                               <div className="w-8 h-8 bg-brand-100 text-brand-800 rounded-full flex items-center justify-center text-xs font-bold">
                                  {sub.author_first.charAt(0)}{sub.author_last.charAt(0)}
                               </div>
                               <span className="text-sm font-medium text-brand-800">{sub.author_first} {sub.author_last}</span>
                            </div>
                         </td>
                         <td className="px-8 py-8">
                            <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                               sub.status === 'published' ? 'bg-green-50 text-green-700 border-green-100' :
                               sub.status === 'under_review' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                               'bg-neutral-50 text-neutral-500 border-neutral-100'
                            }`}>
                               {sub.status.replace('_', ' ')}
                            </span>
                         </td>
                         <td className="px-8 py-8 text-xs text-neutral-400">
                            {new Date(sub.submitted_at).toLocaleDateString()}
                         </td>
                         <td className="px-8 py-8 text-right">
                            <div className="flex items-center justify-end space-x-4">
                               <button className="text-neutral-300 hover:text-brand-800 transition-colors"><MoreHorizontal size={20} /></button>
                               <Link 
                                 to={`/editor/submission/${sub.id}`}
                                 className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-800 hover:bg-brand-800 hover:text-white transition-all shadow-sm"
                               >
                                  <ChevronRight size={18} />
                               </Link>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>
    </div>
  );
};

export default EditorControlPage;
