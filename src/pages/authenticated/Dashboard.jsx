import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import { 
  BookOpen, Clock, CheckCircle, FileText, Plus, ChevronRight, 
  AlertCircle, CreditCard, Send, Edit3, Eye, Shield, Users, Download 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const STATUS_STYLES = {
  pending_payment:  { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Awaiting Payment' },
  submitted:        { bg: 'bg-blue-100',  text: 'text-blue-700',  label: 'Submitted' },
  under_review:     { bg: 'bg-purple-100',text: 'text-purple-700',label: 'Under Review' },
  revision_required:{ bg: 'bg-orange-100',text: 'text-orange-700',label: 'Needs Revision' },
  accepted:         { bg: 'bg-green-100', text: 'text-green-700', label: 'Accepted' },
  rejected:         { bg: 'bg-red-100',   text: 'text-red-700',   label: 'Rejected' },
  published:        { bg: 'bg-emerald-100',text:'text-emerald-700',label: 'Published' },
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [reviewTasks, setReviewTasks] = useState([]);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Admins go directly to the full admin panel
    if (user?.role === 'admin') {
      navigate('/admin');
      return;
    }
    // Editors go to the Editorial Control Panel
    if (user?.role === 'editor') {
      navigate('/editor/control');
      return;
    }
    
    const dataFetch = async () => {
      try {
        // Author: always load their own submissions
        const subRes = await api.get('/api/submissions/my-submissions');
        setSubmissions(subRes.data);
        
        // Reviewer: also load assigned review tasks
        if (user?.role === 'reviewer') {
          const [revRes, histRes] = await Promise.all([
            api.get('/api/reviews/pending'),
            api.get('/api/reviews/history')
          ]);
          setReviewTasks(revRes.data);
          setReviewHistory(histRes.data);
        }
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    dataFetch();
  }, [user, navigate]);

  const isReviewer = user?.role === 'reviewer';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Welcome Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 mb-2 block">
              {isReviewer ? 'Reviewer Portal' : 'Author Portal'}
            </span>
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">
              {isReviewer ? 'My Review Queue' : 'My Dashboard'}
            </h1>
            <p className="text-neutral-500">
              Welcome back, <span className="text-brand-700 font-bold">{user?.first_name}</span>. 
              {isReviewer ? ' Manuscripts awaiting your expert review.' : ' Track and manage your scholarly submissions.'}
            </p>
          </div>
          {/* Only Authors can submit — not reviewers */}
            <Link
              to="/submit"
              className="bg-brand-800 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 transition-all shadow-xl hover:-translate-y-1"
            >
              <Plus size={20} /> <span>New Submission</span>
            </Link>
        </header>
        
        {/* Statistics Bar (Universal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-50 flex items-center space-x-4">
                 <div className="w-12 h-12 bg-brand-50 text-brand-700 rounded-2xl flex items-center justify-center font-bold">
                    <FileText size={20} />
                 </div>
                 <div>
                    <div className="text-2xl font-serif font-black text-brand-900">{submissions.length}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400">My Uploads</div>
                 </div>
            </div>
            {isReviewer && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-50 flex items-center space-x-4">
                 <div className="w-12 h-12 bg-accent-50 text-accent-600 rounded-2xl flex items-center justify-center font-bold">
                    <Clock size={20} />
                 </div>
                 <div>
                    <div className="text-2xl font-serif font-black text-brand-900">{reviewTasks.length}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Pending Reviews</div>
                 </div>
              </div>
            )}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-50 flex items-center space-x-4">
                 <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold">
                    <CreditCard size={20} />
                 </div>
                 <div>
                    <div className="text-2xl font-serif font-black text-brand-900">{submissions.filter(s => s.status === 'pending_payment').length}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Unpaid Fees</div>
                 </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-50 flex items-center space-x-4">
                 <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center font-bold">
                    <CheckCircle size={20} />
                 </div>
                 <div>
                    <div className="text-2xl font-serif font-black text-brand-900">{submissions.filter(s => s.status === 'published').length}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Published</div>
                 </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">

            {/* ── REVIEWER SECTION: Assigned Reviews ── */}
            {isReviewer && (
              <section className="space-y-6">
                <div className="flex items-center space-x-4 mb-4">
                  <h2 className="text-xl font-serif font-bold text-accent-600">Pending Reviews</h2>
                  <div className="flex-grow h-px bg-accent-100"></div>
                  {reviewTasks.length > 0 && (
                    <span className="bg-accent-500 text-white text-[10px] px-3 py-1 rounded-full font-black">{reviewTasks.length}</span>
                  )}
                </div>

                {loading ? (
                  [1, 2].map(i => <div key={i} className="h-32 bg-white rounded-3xl animate-pulse shadow-sm"></div>)
                ) : reviewTasks.length === 0 ? (
                  <div className="bg-white p-16 rounded-[3rem] text-center border border-brand-50 shadow-card">
                    <CheckCircle size={48} className="text-green-200 mx-auto mb-4" />
                    <h3 className="text-xl font-serif font-bold text-brand-800 mb-2">All Clear!</h3>
                    <p className="text-neutral-400">No pending reviews assigned to you at this time.</p>
                  </div>
                ) : reviewTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-card border-l-8 border-accent-500 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[9px] bg-accent-50 text-accent-700 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-accent-100">
                        Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Open'}
                      </span>
                      <span className="text-xs text-neutral-400">Assigned {new Date(task.assigned_at || task.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-brand-900 mb-2 line-clamp-2">{task.title}</h3>
                    <p className="text-xs text-neutral-400 mb-6 capitalize">{task.discipline}</p>
                    <Link
                      to={`/review/${task.submission_id || task.id}`}
                      className="inline-flex items-center text-sm font-bold text-accent-600 hover:text-accent-800 transition-colors"
                    >
                      Open Review Form <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </motion.div>
                ))}
              </section>
            )}

            {/* ── AUTHOR SECTION: My Manuscripts ── */}
            {!isReviewer && (
              <section className="space-y-6">
                <div className="flex items-center space-x-4 mb-4">
                  <h2 className="text-xl font-serif font-bold text-brand-800">My Manuscripts</h2>
                  <div className="flex-grow h-px bg-neutral-200"></div>
                </div>

                {loading ? (
                  [1, 2].map(i => <div key={i} className="h-40 bg-white rounded-3xl animate-pulse shadow-sm"></div>)
                ) : submissions.length === 0 ? (
                  <div className="bg-white p-16 rounded-[3rem] text-center border border-brand-50 shadow-card">
                    <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center text-brand-200 mx-auto mb-6">
                      <FileText size={40} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-800 mb-2">No Submissions Yet</h3>
                    <p className="text-neutral-500 mb-8 max-w-xs mx-auto">Ready to share your research with the global community?</p>
                    <Link to="/submit" className="text-accent-500 font-bold underline flex items-center justify-center">
                      Start your first submission <ChevronRight size={18} />
                    </Link>
                  </div>
                ) : submissions.map((sub, idx) => {
                  const style = STATUS_STYLES[sub.status] || { bg: 'bg-neutral-100', text: 'text-neutral-500', label: sub.status };
                  const isDraft = sub.status === 'pending_payment';
                  const needsRevision = sub.status === 'revision_required';
                  return (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="bg-white p-8 rounded-[2.5rem] shadow-card border border-brand-50 hover:border-brand-200 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${style.bg} ${style.text}`}>
                          {style.label}
                        </span>
                        <span className="text-xs text-neutral-400">{new Date(sub.created_at).toLocaleDateString()}</span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-brand-900 mb-4 leading-snug group-hover:text-brand-700 transition-colors">
                        {sub.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-neutral-400 capitalize text-xs">
                          <BookOpen size={14} className="mr-2 text-brand-200" /> {sub.discipline}
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Receipt Download if Paid */}
                          {sub.is_paid && (
                            <a
                              href={`${api.defaults.baseURL}/api/payments/receipt/${sub.payment_reference || sub.id}?token=${localStorage.getItem('accessToken')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-xs font-bold text-green-600 hover:text-green-800"
                            >
                              <Download size={14} className="mr-1" /> Receipt
                            </a>
                          )}
                          {/* Resume/Continue if draft */}
                          {isDraft && (
                            <Link
                              to={`/submit?resume=${sub.id}&step=2`}
                              className="flex items-center text-xs font-bold text-amber-600 hover:text-amber-800"
                            >
                              <Edit3 size={14} className="mr-1" /> Continue
                            </Link>
                          )}
                          {/* Edit Metadata if newly submitted */}
                          {sub.status === 'submitted' && (
                            <Link
                              to={`/submit?resume=${sub.id}&step=1`}
                              className="flex items-center text-xs font-bold text-brand-600 hover:text-brand-800"
                            >
                              <Edit3 size={14} className="mr-1" /> Edit Meta
                            </Link>
                          )}
                          {/* Resume payment if draft AND not paid */}
                          {isDraft && !sub.is_paid && (
                            <Link
                              to={`/payment/${sub.id}`}
                              className="flex items-center text-xs font-bold text-amber-600 hover:text-amber-800"
                            >
                              <CreditCard size={14} className="mr-1" /> Pay APC
                            </Link>
                          )}
                          {/* Upload revision if requested */}
                          {needsRevision && (
                            <Link
                              to={`/submit?resume=${sub.id}&step=3`}
                              className="flex items-center text-xs font-bold text-orange-600 hover:text-orange-800"
                            >
                              <Edit3 size={14} className="mr-1" /> Upload Revision
                            </Link>
                          )}
                          <Link
                            to={`/submission/${sub.id}`}
                            className="flex items-center text-xs font-bold text-brand-800 hover:text-brand-600"
                          >
                            <Eye size={14} className="mr-1" /> View
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-brand-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>
              <h3 className="text-xl font-serif font-bold mb-8">
                {isReviewer ? 'Reviewer Status' : 'Journal Metrics'}
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center border-b border-brand-800 pb-4">
                  <span className="text-brand-300 text-sm">Avg. Review Time</span>
                  <span className="font-bold flex items-center"><Clock size={16} className="mr-2 text-accent-500" /> 4 Weeks</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-800 pb-4">
                  <span className="text-brand-300 text-sm">Publishing Cycle</span>
                  <span className="font-bold flex items-center"><CheckCircle size={16} className="mr-2 text-accent-500" /> Biannual</span>
                </div>
                {!isReviewer && (
                  <div className="flex justify-between items-center">
                    <span className="text-brand-300 text-sm">My Submissions</span>
                    <span className="font-bold text-accent-400">{submissions.length}</span>
                  </div>
                )}
                {isReviewer && (
                  <div className="flex justify-between items-center">
                    <span className="text-brand-300 text-sm">Pending Reviews</span>
                    <span className="font-bold text-accent-400">{reviewTasks.length}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-card border border-brand-50">
              <div className="flex items-center space-x-3 mb-4 text-brand-800">
                <AlertCircle size={20} className="text-accent-500" />
                <h4 className="font-bold">{isReviewer ? 'Reviewer Notice' : 'Author Notice'}</h4>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed italic">
                {isReviewer
                  ? 'Reviews are double-blind. Do not attempt to contact authors directly. All correspondence must go through the IJMCS Editorial Office.'
                  : 'Submissions after May 15th will be considered for the December issue. Ensure your ORCID is linked in your Profile Settings.'
                }
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
