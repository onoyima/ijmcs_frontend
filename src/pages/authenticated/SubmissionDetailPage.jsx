import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { FileText, Calendar, Clock, CheckCircle, ChevronLeft, Download, Shield, ShieldCheck } from 'lucide-react';

const STATUS_MAP = {
  pending_payment:  { label: 'Awaiting Payment', color: 'text-amber-600', bg: 'bg-amber-50' },
  submitted:        { label: 'Submitted', color: 'text-blue-600', bg: 'bg-blue-50' },
  under_review:     { label: 'Under Review', color: 'text-purple-600', bg: 'bg-purple-50' },
  revision_required:{ label: 'Revision Required', color: 'text-orange-600', bg: 'bg-orange-50' },
  accepted:         { label: 'Accepted', color: 'text-green-600', bg: 'bg-green-50' },
  rejected:         { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-50' },
  published:        { label: 'Published', color: 'text-emerald-600', bg: 'bg-emerald-50' },
};

const SubmissionDetailPage = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, revRes] = await Promise.all([
          api.get('/api/submissions/my-submissions'),
          api.get(`/api/reviews/author/submission/${id}`)
        ]);
        
        const current = subRes.data.find(s => s.id == id);
        setSubmission(current);
        setReviews(revRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif">Loading Submission Details...</div>;
  if (!submission) return <div className="py-40 text-center text-red-500">Submission not found.</div>;

  const status = STATUS_MAP[submission.status] || { label: submission.status, color: 'text-neutral-500', bg: 'bg-neutral-50' };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link to="/dashboard" className="inline-flex items-center text-brand-600 hover:text-brand-900 mb-8 font-bold transition-colors">
          <ChevronLeft size={20} className="mr-1" /> Back to Dashboard
        </Link>

        <header className="bg-white p-12 rounded-[3rem] shadow-card border border-brand-50 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.color}`}>
              {status.label}
            </span>
            <span className="text-sm text-neutral-400 flex items-center">
              <Calendar size={16} className="mr-2" /> {new Date(submission.submitted_at || submission.created_at).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 mb-8 leading-tight">
            {submission.title}
          </h1>

          <div className="flex flex-wrap gap-8 text-sm text-neutral-500 border-t border-neutral-100 pt-8">
            <div className="flex items-center">
              <Shield size={18} className="mr-2 text-brand-300" />
              <span className="font-bold text-brand-800 mr-2">Discipline:</span> {submission.discipline}
            </div>
            <div className="flex items-center">
              <FileText size={18} className="mr-2 text-brand-300" />
              <span className="font-bold text-brand-800 mr-2">Type:</span> Original Research
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section className="bg-white p-10 rounded-[2.5rem] shadow-card border border-brand-50">
              <h3 className="text-xl font-serif font-bold text-brand-900 mb-6">Abstract</h3>
              <p className="text-sm text-neutral-600 leading-relaxed italic">
                {submission.abstract}
              </p>
            </section>

            {reviews.length > 0 && (
              <section className="bg-white p-10 rounded-[2.5rem] shadow-card border border-brand-50 border-l-8 border-l-accent-500">
                <h3 className="text-xl font-serif font-bold text-brand-900 mb-6 flex items-center">
                  <ShieldCheck size={24} className="mr-3 text-accent-500" /> Peer Review Feedback
                </h3>
                <div className="space-y-8">
                  {reviews.map((rev, i) => (
                    <div key={i} className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black uppercase text-brand-400">Reviewer Recommendation</span>
                          <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white border ${
                            rev.recommendation === 'accept' ? 'text-green-600 border-green-100' : 
                            rev.recommendation === 'reject' ? 'text-red-600 border-red-100' : 'text-orange-600 border-orange-100'
                          }`}>
                            {rev.recommendation}
                          </span>
                       </div>
                       <p className="text-sm text-neutral-600 leading-relaxed mb-6 italic">
                          "{rev.comments_to_author}"
                       </p>
                       {rev.scores_json && (
                         <div className="grid grid-cols-3 gap-4 border-t border-neutral-200 pt-4">
                            {Object.entries(JSON.parse(rev.scores_json)).map(([criteria, score]) => (
                               <div key={criteria} className="text-center">
                                  <p className="text-[8px] uppercase font-bold text-neutral-400 mb-1">{criteria}</p>
                                  <p className="text-sm font-black text-brand-900">{score}/10</p>
                               </div>
                            ))}
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white p-10 rounded-[2.5rem] shadow-card border border-brand-50">
              <h3 className="text-xl font-serif font-bold text-brand-900 mb-6">Keywords</h3>
              <div className="flex flex-wrap gap-3">
                {submission.keywords?.split(',').map((kw, i) => (
                  <span key={i} className="px-4 py-2 bg-neutral-50 text-neutral-500 rounded-xl text-xs font-medium border border-neutral-100">
                    {kw.trim()}
                  </span>
                )) || <span className="text-neutral-400 italic">No keywords provided.</span>}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-brand-900 p-8 rounded-[2.5rem] text-white shadow-xl">
              <h3 className="text-lg font-serif font-bold mb-6">Manuscript Files</h3>
              <div className="space-y-4">
                 <a 
                   href={`${import.meta.env.VITE_API_URL}${submission.file_path}`} 
                   target="_blank" 
                   rel="noreferrer"
                   className="p-4 bg-brand-800 rounded-2xl border border-brand-700 flex items-center justify-between hover:bg-brand-700 transition-all"
                 >
                   <div className="flex items-center">
                     <FileText size={20} className="mr-3 text-brand-400" />
                     <span className="text-xs font-bold truncate max-w-[120px]">{submission.manuscript_name || 'Main_Manuscript.pdf'}</span>
                   </div>
                   <Download size={18} className="text-accent-400" />
                 </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-card border border-brand-50">
              <h3 className="text-lg font-serif font-bold text-brand-900 mb-6">Review Timeline</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4 shrink-0">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-800">Submitted</p>
                    <p className="text-[10px] text-neutral-400">{new Date(submission.submitted_at || submission.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 ${submission.status !== 'pending_payment' ? 'bg-green-100 text-green-600' : 'bg-neutral-100 text-neutral-300'}`}>
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-800">Editorial Screening</p>
                    <p className="text-[10px] text-neutral-400">In Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SubmissionDetailPage;
