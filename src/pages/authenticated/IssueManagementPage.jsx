import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Book, Plus, CheckCircle, Clock, Image as ImageIcon, Star, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const IssueManagementPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    volume: '',
    issue_number: '',
    year: new Date().getFullYear(),
    title: '',
    description: '',
    cover_image_url: ''
  });

  const fetchIssues = async () => {
    try {
      const { data } = await api.get('/api/admin/issues');
      setIssues(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssues(); }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/api/admin/issues/${editingId}`, formData);
        toast.success('Issue updated successfully');
      } else {
        await api.post('/api/admin/issues', formData);
        toast.success('Issue draft created');
      }
      setShowModal(false);
      setEditingId(null);
      fetchIssues();
      setFormData({ volume: '', issue_number: '', year: new Date().getFullYear(), title: '', description: '', cover_image_url: '' });
    } catch (err) {
      toast.error('Failed to save issue configuration');
    }
  };

  const openEditor = (issue) => {
    setFormData({
      volume: issue.volume || '',
      issue_number: issue.issue_number || '',
      year: issue.year || new Date().getFullYear(),
      title: issue.title || '',
      description: issue.description || '',
      cover_image_url: issue.cover_image_url || ''
    });
    setEditingId(issue.id);
    setShowModal(true);
  };

  const handlePublish = async (id, currentStatus) => {
    try {
      await api.patch(`/api/admin/issues/${id}/publish`, { published: !currentStatus });
      toast.success(`Issue ${!currentStatus ? 'published' : 'unpublished'}!`);
      fetchIssues();
    } catch (err) {
      toast.error('Failed to update publication status');
    }
  };

  const handleSetActive = async (id) => {
    try {
      await api.patch(`/api/admin/issues/${id}/set-active`);
      toast.success('Set as active target for new submissions!');
      fetchIssues();
    } catch (err) {
      toast.error('Failed to set active issue');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone if no articles are attached.")) return;
    try {
      await api.delete(`/api/admin/issues/${id}`);
      toast.success('Issue deleted');
      fetchIssues();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete issue');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="mb-12 flex items-center justify-between">
           <div>
              <h1 className="text-3xl font-serif font-bold text-brand-900 border-l-4 border-accent-500 pl-4">Issue Management</h1>
              <p className="text-sm text-neutral-500 mt-1">Configure volumes and set the active target for author submissions.</p>
           </div>
           <button 
             onClick={() => {
                setEditingId(null);
                setFormData({ volume: '', issue_number: '', year: new Date().getFullYear(), title: '', description: '', cover_image_url: '' });
                setShowModal(true);
             }}
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
               className={`bg-white rounded-[2.5rem] overflow-hidden shadow-card border-2 transition-all ${issue.is_active ? 'border-accent-500 ring-4 ring-accent-50' : 'border-transparent group hover:border-accent-200'}`}
             >
                <div className="aspect-[4/5] bg-neutral-100 relative">
                   {issue.cover_image_url ? (
                     <img src={issue.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                        <ImageIcon size={48} />
                        <span className="text-[10px] mt-2 font-bold uppercase tracking-widest">No Cover Image</span>
                     </div>
                   )}
                   <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                     {issue.is_active && (
                       <div className="px-3 py-1 rounded-full text-[10px] font-bold bg-accent-500 text-white shadow-md flex items-center shadow-accent-500/30">
                          <Star size={12} className="mr-1 fill-white" /> Active Target
                       </div>
                     )}
                     <div className="capitalize px-3 py-1 rounded-full text-[9px] font-bold bg-white/90 backdrop-blur shadow-sm inline-block">
                        {issue.published ? (
                          <span className="text-green-600 flex items-center"><CheckCircle size={10} className="mr-1" /> Published</span>
                        ) : (
                          <span className="text-neutral-500 flex items-center"><Clock size={10} className="mr-1" /> Draft</span>
                        )}
                     </div>
                   </div>
                </div>
                <div className="p-8">
                   <h3 className="text-lg font-serif font-bold text-brand-900 mb-2">Vol. {issue.volume} No. {issue.issue_number} ({issue.year})</h3>
                   <p className="text-xs text-neutral-400 mb-2 truncate">{issue.title || "Untitled Issue"}</p>
                   <p className="text-xs text-neutral-500 font-medium mb-6">{issue.submission_count} Submissions • {issue.article_count} Articles</p>
                   
                   <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handlePublish(issue.id, issue.published)}
                          className={`flex-grow py-3 rounded-xl font-bold text-xs transition-colors shadow-sm ${issue.published ? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200' : 'bg-brand-900 text-white hover:bg-brand-800'}`}
                        >
                          {issue.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button onClick={() => openEditor(issue)} className="p-3 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors">
                           <Book size={18} />
                        </button>
                        <button onClick={() => handleDelete(issue.id)} className="p-3 bg-neutral-50 text-neutral-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                           <Trash2 size={18} />
                        </button>
                      </div>
                      {!issue.is_active && (
                        <button 
                          onClick={() => handleSetActive(issue.id)}
                          className="w-full py-3 bg-accent-50 text-accent-700 rounded-xl font-bold text-xs border border-accent-100 hover:bg-accent-100 hover:border-accent-200 transition-colors"
                        >
                          Set as Active Target Issue
                        </button>
                      )}
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-sm">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white w-full max-w-xl rounded-[3rem] p-10 md:p-14 shadow-2xl relative"
             >
                <h2 className="text-2xl font-serif font-bold text-brand-900 mb-8">{editingId ? 'Edit Issue Configuration' : 'New Issue Configuration'}</h2>
                <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <input 
                        type="number"
                        placeholder="Volume" 
                        required
                        className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                        value={formData.volume}
                        onChange={(e) => setFormData({...formData, volume: e.target.value})}
                      />
                      <input 
                        type="number"
                        placeholder="Issue Number" 
                        required
                        className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                        value={formData.issue_number}
                        onChange={(e) => setFormData({...formData, issue_number: e.target.value})}
                      />
                   </div>
                   <input 
                     type="number"
                     placeholder="Year" 
                     required
                     className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                     value={formData.year}
                     onChange={(e) => setFormData({...formData, year: e.target.value})}
                   />
                   <input 
                     placeholder="Issue Title (Optional)" 
                     className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                     value={formData.title}
                     onChange={(e) => setFormData({...formData, title: e.target.value})}
                   />
                   <input 
                     placeholder="Cover Image URL (Optional)" 
                     className="w-full px-5 py-3 rounded-xl border border-neutral-100 focus:ring-2 focus:ring-accent-500 outline-none"
                     value={formData.cover_image_url}
                     onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
                   />
                   <div className="flex space-x-4 pt-4">
                      <button type="submit" className="flex-grow py-4 bg-brand-900 text-white font-bold rounded-xl shadow-xl hover:opacity-90 flex items-center justify-center">
                         {editingId ? 'Save Changes' : 'Initialize Infrastructure'}
                      </button>
                      <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 bg-neutral-100 font-bold rounded-xl hover:bg-neutral-200 text-neutral-600">Cancel</button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
    </div>
  );
};

export default IssueManagementPage;
