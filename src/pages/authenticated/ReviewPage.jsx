import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { BookOpen, Send, Download, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    recommendation: 'revisions_minor',
    comments_to_author: '',
    comments_to_editor: '',
    scores_json: { originality: 5, methodology: 5, language: 5, relevance: 5 }
  });

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const { data } = await api.get('/api/reviews/pending');
        const current = data.find(r => r.id == id);
        if (!current) throw new Error('Assignment not found');
        setAssignment(current);
      } catch (err) {
        toast.error('Failed to load review assignment');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post(`/api/reviews/${id}/submit`, formData);
      toast.success('Review submitted successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif text-3xl">Loading Assignment...</div>;

  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-12">
           <span className="text-[10px] bg-accent-100 text-accent-700 px-3 py-1 rounded-full font-bold uppercase tracking-widest mb-4 inline-block">Reviewer Portal</span>
           <h1 className="text-4xl font-serif font-bold text-brand-900 mb-4">{assignment.title}</h1>
           <div className="flex items-center text-neutral-500 text-sm">
             <BookOpen size={16} className="mr-2" /> {assignment.discipline} | <FileText size={16} className="ml-4 mr-2" /> Double-Blind Peer Review
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-card border border-brand-50">
                 <h3 className="font-serif font-bold text-brand-800 mb-4">Abstract</h3>
                 <p className="text-xs text-neutral-500 leading-relaxed italic border-l-2 border-brand-100 pl-4">
                    {assignment.abstract}
                 </p>
                 <button className="w-full mt-8 py-4 bg-brand-800 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-brand-700 transition-all">
                    <Download size={18} /> <span>Download Manuscript</span>
                 </button>
              </div>
           </div>

           <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 rounded-[3rem] shadow-card border border-brand-50 space-y-10">
                 <div>
                    <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-4 flex items-center">
                       <AlertCircle size={16} className="mr-2 text-accent-500" /> Recommendation
                    </label>
                    <select 
                       value={formData.recommendation}
                       onChange={(e) => setFormData({...formData, recommendation: e.target.value})}
                       className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-accent-500 appearance-none font-bold text-brand-800"
                    >
                       <option value="accept">Accept Submission</option>
                       <option value="revisions_minor">Minor Revisions Required</option>
                       <option value="revisions_major">Major Revisions Required</option>
                       <option value="reject">Reject Submission</option>
                    </select>
                 </div>

                  {/* Academic Rubric Scoring Matrix */}
                  <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                     <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-6">Academic Scoring Rubric (1 - 10)</label>
                     <div className="space-y-6">
                       {Object.entries(formData.scores_json).map(([key, value]) => (
                         <div key={key} className="flex items-center gap-4">
                           <span className="w-28 text-sm font-bold capitalize text-neutral-600">{key}</span>
                           <input 
                             type="range" 
                             min="1" 
                             max="10" 
                             value={value} 
                             onChange={(e) => setFormData({...formData, scores_json: {...formData.scores_json, [key]: parseInt(e.target.value)}})}
                             className="flex-grow accent-accent-500 h-2 bg-neutral-200 rounded-full appearance-none outline-none cursor-pointer" 
                           />
                           <span className="w-12 text-right font-mono font-bold text-accent-600 bg-white px-2 py-1 rounded-md shadow-sm border border-neutral-100">{value}/10</span>
                         </div>
                       ))}
                     </div>
                  </div>

                 <div>
                    <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-4">Comments for the Author</label>
                    <textarea 
                       required
                       value={formData.comments_to_author}
                       onChange={(e) => setFormData({...formData, comments_to_author: e.target.value})}
                       rows={8}
                       className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 resize-none text-sm leading-relaxed"
                       placeholder="Provide constructive feedback for the researchers..."
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-4 text-neutral-400">Private Comments for the Editor</label>
                    <textarea 
                       value={formData.comments_to_editor}
                       onChange={(e) => setFormData({...formData, comments_to_editor: e.target.value})}
                       rows={4}
                       className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 resize-none text-sm leading-relaxed"
                       placeholder="Confidential notes only visible to the editorial team..."
                    />
                 </div>

                 <div className="pt-6 border-t border-neutral-100 flex justify-between items-center">
                    <p className="text-[10px] text-neutral-400 max-w-[200px]">
                       Once submitted, your review cannot be modified. Ensure all feedback follows IJMCS ethical guidelines.
                    </p>
                    <button 
                       type="submit"
                       disabled={isSubmitting}
                       className="px-12 py-4 bg-accent-500 hover:bg-accent-400 text-white rounded-2xl font-bold flex items-center space-x-3 shadow-xl transition-all disabled:opacity-50"
                    >
                       <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
                       {!isSubmitting && <Send size={18} />}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
