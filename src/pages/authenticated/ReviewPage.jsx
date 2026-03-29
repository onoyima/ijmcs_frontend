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

  if (loading) return (
    <div className="fixed inset-0 bg-neutral-50 flex items-center justify-center flex-col z-50">
      <Loader2 className="animate-spin text-accent-500 mb-4" size={48} />
      <p className="font-serif text-xl font-bold text-brand-900">Loading Review Workspace...</p>
    </div>
  );

  const manuscriptUrl = `${import.meta.env.VITE_API_URL}${assignment.file_path}`;

  return (
    <div className="h-[calc(100vh-140px)] -mt-4 flex flex-col overflow-hidden bg-neutral-100 rounded-[2rem] border border-neutral-200">
      {/* Workspace Header */}
      <header className="bg-white px-8 py-4 border-b border-neutral-200 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center text-white">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-brand-900 leading-none mb-1 truncate max-w-md">{assignment.title}</h1>
            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">
              Reviewer Workspace • {assignment.discipline}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <a 
            href={manuscriptUrl} 
            download
            className="p-2.5 bg-neutral-50 text-neutral-500 rounded-xl hover:bg-neutral-100 transition-all border border-neutral-100"
            title="Download PDF"
          >
            <Download size={18} />
          </a>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-neutral-100 text-neutral-600 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all"
          >
            Exit Terminal
          </button>
        </div>
      </header>

      {/* Main Workspace Split */}
      <div className="flex flex-grow overflow-hidden">
        {/* LEFT: PDF VIEWER */}
        <div className="w-1/2 h-full bg-neutral-200 relative border-r border-neutral-300">
          <iframe 
            src={`${manuscriptUrl}#toolbar=0`} 
            className="w-full h-full border-none"
            title="Manuscript Viewer"
          />
          {/* Mobile Overlay fallback */}
          <div className="hidden lg:absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-brand-900/80 backdrop-blur text-white text-[10px] font-bold rounded-full pointer-events-none">
            Online PDF Reader Mode
          </div>
        </div>

        {/* RIGHT: EVALUATION FORM */}
        <div className="w-1/2 h-full overflow-y-auto bg-white p-10 md:p-14 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto pb-20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-accent-50 text-accent-600 rounded-lg flex items-center justify-center">
                <Edit3 size={16} />
              </div>
              <h2 className="text-xl font-serif font-bold text-brand-900">Peer Review Assessment</h2>
            </div>

            <div className="space-y-8">
              {/* Recommendation */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-brand-400 uppercase tracking-widest">
                  Editorial Recommendation
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'accept', label: 'Accept', color: 'hover:border-green-500 hover:bg-green-50' },
                    { val: 'revisions_minor', label: 'Minor Revisions', color: 'hover:border-blue-500 hover:bg-blue-50' },
                    { val: 'revisions_major', label: 'Major Revisions', color: 'hover:border-orange-500 hover:bg-orange-50' },
                    { val: 'reject', label: 'Reject', color: 'hover:border-red-500 hover:bg-red-50' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setFormData({...formData, recommendation: opt.val})}
                      className={`px-4 py-4 rounded-2xl border-2 text-xs font-bold transition-all ${
                        formData.recommendation === opt.val 
                        ? 'border-brand-900 bg-brand-900 text-white shadow-lg' 
                        : `border-neutral-100 bg-neutral-50 text-neutral-400 ${opt.color}`
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rubric */}
              <div className="bg-neutral-50 p-8 rounded-[2rem] border border-neutral-100 space-y-6">
                <label className="block text-[10px] font-black text-brand-400 uppercase tracking-widest mb-2">Academic Rubric (1-10)</label>
                <div className="space-y-6">
                  {Object.entries(formData.scores_json).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="capitalize text-neutral-500">{key}</span>
                        <span className="text-accent-600 font-mono">{value}/10</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={value} 
                        onChange={(e) => setFormData({...formData, scores_json: {...formData.scores_json, [key]: parseInt(e.target.value)}})}
                        className="w-full accent-accent-500 h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-brand-400 uppercase tracking-widest mb-3">Feedback to Authors</label>
                  <textarea 
                    required
                    value={formData.comments_to_author}
                    onChange={(e) => setFormData({...formData, comments_to_author: e.target.value})}
                    rows={8}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:ring-4 focus:ring-accent-500/10 resize-none text-sm transition-all"
                    placeholder="Enter detailed constructive feedback..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-brand-400 uppercase tracking-widest mb-3">Confidential Editor Notes</label>
                  <textarea 
                    value={formData.comments_to_editor}
                    onChange={(e) => setFormData({...formData, comments_to_editor: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:ring-4 focus:ring-brand-500/10 resize-none text-sm transition-all"
                    placeholder="Notes for the editorial board only..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-accent-500 hover:bg-accent-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl shadow-accent-500/20 transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                <span>{isSubmitting ? 'Transmitting Review...' : 'Finalize & Submit Review'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

