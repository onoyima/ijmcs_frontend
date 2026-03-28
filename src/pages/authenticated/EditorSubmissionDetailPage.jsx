import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { FileText, User, Calendar, CheckCircle, XCircle, Users, Send, Download, Clock, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';

const EditorSubmissionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [deciding, setDeciding] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [issues, setIssues] = useState([]);
  const [publishData, setPublishData] = useState({ issue_id: '', pages: '', doi: '' });
  
  const [assignmentData, setAssignmentData] = useState({
    reviewer_id: '',
    due_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 3 weeks out
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch submission details (In a real app, I'd have a specific endpoint, re-using for now)
        const { data: all } = await api.get('/api/reviews/editor/all');
        const current = all.find(s => s.id == id);
        if (!current) throw new Error('Submission not found');
        setSubmission(current);
        
        // Fetch eligible reviewers (simplified: fetch all users with reviewer role)
        // For now, I'll mock this or assume there's an /api/users/reviewers
        // const { data: users } = await api.get('/api/admin/users'); // Hypothetical
        
        // Fetch all published issues for the publish dropdown
        const { data: issuesData } = await api.get('/api/issues');
        setIssues(issuesData);

        // Fetch assigned reviews for this submission
        const { data: reviewsData } = await api.get(`/api/reviews/submission/${id}`);
        setReviewers(reviewsData);
      } catch (err) {
        toast.error('Failed to load submission');
        navigate('/editor/control');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignmentData.reviewer_id) return toast.error('Select a reviewer');
    setAssigning(true);
    try {
      await api.post('/api/reviews/editor/assign', {
        submission_id: id,
        ...assignmentData
      });
      toast.success('Reviewer assigned');
      window.location.reload(); // Refresh to show new status
    } catch (err) {
      toast.error(err.response?.data?.message || 'Assignment failed');
    } finally {
      setAssigning(false);
    }
  };

  const handleDecision = async (decision) => {
    if (!window.confirm(`Are you sure you want to mark this submission as ${decision.toUpperCase()}?`)) return;
    setDeciding(true);
    try {
      await api.post(`/api/submissions/${id}/decide`, { decision });
      toast.success(`Submission ${decision}!`);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Decision failed');
    } finally {
      setDeciding(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!publishData.issue_id) return toast.error('Select a target issue.');
    setPublishing(true);
    try {
      await api.post(`/api/submissions/${id}/publish`, publishData);
      toast.success('Article officially published live!');
      navigate('/current-issue');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Publishing failed');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif text-3xl">Loading Submission...</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-10 md:p-14 rounded-[3rem] shadow-card border border-brand-50"
             >
                <div className="flex items-center justify-between mb-8">
                   <span className="text-[10px] bg-brand-50 text-brand-800 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{submission.status}</span>
                   <span className="text-xs text-neutral-400 font-mono">ID: MSS-{submission.id.toString().padStart(4, '0')}</span>
                </div>

                <h1 className="text-3xl font-serif font-bold text-brand-900 mb-6 leading-tight">{submission.title}</h1>
                
                <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-neutral-100 italic text-neutral-500 text-sm">
                   <div className="flex items-center"><User size={16} className="mr-2" /> {submission.author_first} {submission.author_last}</div>
                   <div className="flex items-center"><Calendar size={16} className="mr-2" /> Submitted {new Date(submission.submitted_at).toLocaleDateString()}</div>
                </div>

                <section className="mb-10">
                   <h2 className="text-xs font-bold text-brand-900 uppercase tracking-widest mb-4">Abstract</h2>
                   <p className="text-sm leading-relaxed text-neutral-600">{submission.abstract}</p>
                </section>

                <div className="flex space-x-4">
                   <a 
                     href={`${import.meta.env.VITE_API_URL}${submission.file_path}`} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="flex items-center px-6 py-3 bg-brand-800 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-all shadow-lg"
                   >
                      <Download size={18} className="mr-2" /> Download Manuscript
                   </a>
                </div>
             </motion.div>

             {/* Workflow Section */}
             <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-card border border-brand-50">
                <h2 className="text-xl font-serif font-bold text-brand-800 mb-8 flex items-center">
                   <Clock size={24} className="mr-3 text-accent-500" /> Editorial Workflow
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   {/* Assign Reviewer */}
                   <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-700">Assign Reviewer</h3>
                      <form onSubmit={handleAssign} className="space-y-4">
                         <input 
                           type="number" 
                           placeholder="Reviewer User ID"
                           required
                           className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-accent-500"
                           value={assignmentData.reviewer_id}
                           onChange={(e) => setAssignmentData({...assignmentData, reviewer_id: e.target.value})}
                         />
                         <input 
                           type="date"
                           required
                           className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-accent-500"
                           value={assignmentData.due_date}
                           onChange={(e) => setAssignmentData({...assignmentData, due_date: e.target.value})}
                         />
                         <button 
                           disabled={assigning}
                           className="w-full py-3 bg-accent-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-accent-400 transition-all shadow-lg"
                         >
                            <Users size={18} /> <span>{assigning ? 'Assigning...' : 'Assign Peer Reviewer'}</span>
                         </button>
                      </form>
                   </div>

                   {/* Quick Decision */}
                   {submission.status !== 'published' && (
                     <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-700">Desk Decision</h3>
                        <div className="grid grid-cols-2 gap-3">
                           <button 
                             onClick={() => handleDecision('accepted')}
                             disabled={deciding || submission.status === 'accepted'}
                             className="py-8 bg-green-50 text-green-700 rounded-2xl flex flex-col items-center justify-center border border-green-100 hover:bg-green-100 transition-all disabled:opacity-50"
                           >
                              <CheckCircle size={32} className="mb-2" />
                              <span className="text-xs font-bold">{submission.status === 'accepted' ? 'Accepted' : 'Accept'}</span>
                           </button>
                           <button 
                             onClick={() => handleDecision('rejected')}
                             disabled={deciding || submission.status === 'rejected'}
                             className="py-8 bg-red-50 text-red-700 rounded-2xl flex flex-col items-center justify-center border border-red-100 hover:bg-red-100 transition-all disabled:opacity-50"
                           >
                              <XCircle size={32} className="mb-2" />
                              <span className="text-xs font-bold">{submission.status === 'rejected' ? 'Rejected' : 'Reject'}</span>
                           </button>
                        </div>
                     </div>
                   )}
                </div>

                {/* Publish to Issue (Only if Accepted) */}
                {submission.status === 'accepted' && (
                  <div className="mt-10 pt-10 border-t border-brand-100">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-accent-600 mb-6 flex items-center">
                       <Globe size={18} className="mr-2" /> Publish to Live Journal
                     </h3>
                     <form onSubmit={handlePublish} className="space-y-4">
                        <select 
                          required
                          className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-accent-500 font-medium text-brand-900"
                          value={publishData.issue_id}
                          onChange={(e) => setPublishData({...publishData, issue_id: e.target.value})}
                        >
                          <option value="">Select Target Issue...</option>
                          {issues.map(iss => (
                            <option key={iss.id} value={iss.id}>Vol. {iss.volume} No. {iss.number} ({iss.year}) - {iss.title || 'Regular Issue'}</option>
                          ))}
                        </select>
                        <div className="grid grid-cols-2 gap-4">
                           <input 
                              type="text" 
                              placeholder="Page Numbers (e.g. 15-28)"
                              className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                              value={publishData.pages}
                              onChange={(e) => setPublishData({...publishData, pages: e.target.value})}
                           />
                           <input 
                              type="text" 
                              placeholder="Custom DOI (Optional)"
                              className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-accent-500 text-sm font-mono"
                              value={publishData.doi}
                              onChange={(e) => setPublishData({...publishData, doi: e.target.value})}
                           />
                        </div>
                        <button 
                          disabled={publishing}
                          className="w-full py-4 bg-brand-900 border-2 border-brand-900 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-transparent hover:text-brand-900 transition-all shadow-xl"
                        >
                           <Send size={18} /> <span>{publishing ? 'Publishing...' : 'Officially Publish Article Live'}</span>
                        </button>
                     </form>
                  </div>
                )}
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-brand-900 p-10 rounded-[2.5rem] text-white shadow-2xl">
                <h3 className="text-xl font-serif font-bold mb-6">Reviewer Activity</h3>
                <div className="space-y-6">
                   {reviewers.length === 0 ? (
                      <p className="text-xs text-brand-300 italic">No reviewers currently assigned to this manuscript.</p>
                   ) : reviewers.map((rev) => (
                      <div key={rev.id} className="p-6 bg-brand-800/50 rounded-3xl border border-brand-700/50">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                               <p className="font-bold text-sm">{rev.first_name} {rev.last_name}</p>
                               <p className="text-[10px] text-brand-400">{rev.email}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               rev.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                               {rev.status}
                            </span>
                         </div>
                         
                         {rev.status === 'completed' && (
                            <div className="space-y-3 pt-3 border-t border-brand-700/50">
                               <p className="text-[10px] font-black uppercase text-accent-400">Recommendation: {rev.recommendation.replace('_', ' ')}</p>
                               <div className="grid grid-cols-2 gap-2">
                                  {rev.scores_json && Object.entries(typeof rev.scores_json === 'string' ? JSON.parse(rev.scores_json) : rev.scores_json).map(([k, v]) => (
                                     <div key={k} className="flex justify-between text-[9px]">
                                        <span className="text-brand-400 capitalize">{k}:</span>
                                        <span className="font-bold">{v}/10</span>
                                     </div>
                                  ))}
                               </div>
                               <div className="bg-brand-900/50 p-3 rounded-xl mt-2">
                                  <p className="text-[10px] text-brand-200 leading-relaxed line-clamp-3 italic">"{rev.comments_to_editor}"</p>
                               </div>
                            </div>
                         )}
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
    </div>
  );
};

export default EditorSubmissionDetailPage;
