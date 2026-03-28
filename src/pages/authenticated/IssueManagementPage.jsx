import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Book, Plus, CheckCircle, Clock, Image as ImageIcon, ExternalLink, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const IssueManagementPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    volume: '',
    number: '',
    year: new Date().getFullYear(),
    title: '',
    description: '',
    cover_image: ''
  });

  const fetchIssues = async () => {
    try {
      // Fetching all issues (including unpublished for editors)
      // I'll need a specific editor endpoint for this, but using /api/issues for now
      const { data } = await api.get('/api/issues');
      setIssues(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssues(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/issues', formData);
      toast.success('Issue draft created');
      setShowModal(false);
      fetchIssues();
    } catch (err) {
      toast.error('Failed to create issue');
    }
  };

  const handlePublish = async (id) => {
    try {
      await api.post(`/api/issues/${id}/publish`);
      toast.success('Issue published!');
      fetchIssues();
    } catch (err) {
      toast.error('Publication failed');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="mb-12 flex items-center justify-between">
           <div>
              <h1 className="text-3xl font-serif font-bold text-brand-900 border-l-4 border-accent-500 pl-4">Issue Management</h1>
              <p className="text-sm text-neutral-500 mt-1">Configure and publish upcoming volumes.</p>
           </div>
           <button 
             onClick={() => setShowModal(true)}
             className="bg-brand-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl hover:bg-brand-700 transition-all"
           >
             <Plus size={20} /> <span>Create New Issue</span>
           </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {loading ? (
             [1, 2, 3].map(i => <div key={i} className="h-64 bg-white rounded-3xl animate-pulse"></div>)
           ) : issues.map((issue) => (
             <motion.div 
               key={issue.id}
               layout
               className="bg-white rounded-[2.5rem] overflow-hidden shadow-card border border-brand-50 group hover:border-accent-200 transition-all"
             >
                <div className="aspect-[4/5] bg-neutral-100 relative">
                   {issue.cover_image ? (
                     <img src={issue.cover_image} alt="Cover" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                        <ImageIcon size={48} />
                        <span className="text-[10px] mt-2 font-bold uppercase tracking-widest">No Cover Image</span>
                     </div>
                   )}
                   <div className="absolute top-4 right-4 capitalize px-3 py-1 rounded-full text-[9px] font-bold bg-white/90 backdrop-blur shadow-sm">
                      {issue.is_published ? (
                        <span className="text-green-600 flex items-center"><CheckCircle size={10} className="mr-1" /> Published</span>
                      ) : (
                        <span className="text-neutral-500 flex items-center"><Clock size={10} className="mr-1" /> Draft</span>
                      )}
                   </div>
                </div>
                <div className="p-8">
                   <h3 className="text-lg font-serif font-bold text-brand-900 mb-2">Vol. {issue.volume} No. {issue.number} ({issue.year})</h3>
                   <p className="text-xs text-neutral-400 mb-6 truncate">{issue.title || "Untitled Issue"}</p>
                   
                   <div className="flex gap-3">
                      {!issue.is_published && (
                        <button 
                          onClick={() => handlePublish(issue.id)}
                          className="flex-grow py-3 bg-accent-500 text-white rounded-xl font-bold text-xs hover:bg-accent-400 transition-colors shadow-lg"
                        >
                          Publish Now
                        </button>
                      )}
                      <button className="p-3 bg-neutral-50 text-neutral-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                         <Trash2 size={18} />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Create Modal Placeholder */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-sm">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white w-full max-w-xl rounded-[3rem] p-10 md:p-14 shadow-2xl relative"
             >
                <h2 className="text-2xl font-serif font-bold text-brand-900 mb-8">New Issue Configuration</h2>
                <form onSubmit={handleCreate} className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <input 
                        placeholder="Volume" 
                        required
                        className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                        value={formData.volume}
                        onChange={(e) => setFormData({...formData, volume: e.target.value})}
                      />
                      <input 
                        placeholder="Number" 
                        required
                        className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                        value={formData.number}
                        onChange={(e) => setFormData({...formData, number: e.target.value})}
                      />
                   </div>
                   <input 
                     placeholder="Issue Title (Optional)" 
                     className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                     value={formData.title}
                     onChange={(e) => setFormData({...formData, title: e.target.value})}
                   />
                   <div className="flex gap-4">
                      <button type="submit" className="flex-grow py-4 bg-brand-800 text-white rounded-2xl font-bold shadow-xl">Create Draft</button>
                      <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 bg-neutral-50 rounded-2xl font-bold">Cancel</button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
    </div>
  );
};

export default IssueManagementPage;
