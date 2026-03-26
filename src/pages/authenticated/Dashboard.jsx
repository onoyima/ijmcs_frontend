import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import { BookOpen, Clock, CheckCircle, FileText, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [reviewTasks, setReviewTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin');
      return;
    }
    
    const dataFetch = async () => {
      try {
        const subRes = await api.get('/api/submissions/my-submissions');
        setSubmissions(subRes.data);
        
        if (user?.role === 'reviewer' || user?.role === 'editor') {
          const revRes = await api.get('/api/reviews/pending');
          setReviewTasks(revRes.data);
        }
      } catch (err) {
        console.error('Data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    dataFetch();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'review':    return 'bg-orange-100 text-orange-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'rejected':  return 'bg-red-100 text-red-700';
      default:          return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Welcome Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">
              {user?.role === 'reviewer' ? 'Reviewer Dashboard' : 'Scholar Dashboard'}
            </h1>
            <p className="text-neutral-500">Welcome back, <span className="text-brand-700 font-bold">{user?.first_name}</span>. Manage your scholarly contributions.</p>
          </div>
          <Link 
            to="/submit"
            className="bg-brand-800 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 transition-all shadow-xl"
          >
            <Plus size={20} /> <span>New Submission</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-12">
             {/* Reviewer Tasks Section */}
             {(user?.role === 'reviewer' || user?.role === 'editor') && reviewTasks.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center space-x-4 mb-4">
                     <h2 className="text-xl font-serif font-bold text-accent-600">Review Assignments</h2>
                     <div className="flex-grow h-px bg-accent-100"></div>
                  </div>
                  {reviewTasks.map((task, i) => (
                    <motion.div 
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white p-8 rounded-[2.5rem] shadow-card border-l-8 border-accent-500 hover:shadow-xl transition-all"
                    >
                       <h3 className="text-lg font-serif font-bold mb-2">{task.title}</h3>
                       <p className="text-xs text-neutral-400 mb-6">{task.discipline} | Assigned on {new Date(task.assigned_at).toLocaleDateString()}</p>
                       <Link to={`/review/${task.id}`} className="inline-flex items-center text-sm font-bold text-accent-600 hover:underline">
                          Start Review <ChevronRight size={16} className="ml-1" />
                       </Link>
                    </motion.div>
                  ))}
                </section>
             )}

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
                ) : (
                    submissions.map((sub, idx) => (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-card border border-brand-50 hover:border-brand-300 transition-all group"
                      >
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(sub.status)}`}>
                              {sub.status}
                            </span>
                            <span className="text-xs text-neutral-400">{new Date(sub.created_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-brand-900 mb-4 leading-snug group-hover:text-brand-700 transition-colors">
                            {sub.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-neutral-500 capitalize">
                              <BookOpen size={16} className="mr-2 text-brand-300" /> {sub.discipline}
                            </div>
                            <Link to={`/submission/${sub.id}`} className="text-brand-800 font-bold flex items-center group-hover:translate-x-1 transition-transform">
                              View Details <ChevronRight size={16} className="ml-1" />
                            </Link>
                        </div>
                      </motion.div>
                    ))
                )}
             </section>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-brand-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>
                
                <h3 className="text-xl font-serif font-bold mb-8">Journal Metrics</h3>
                <div className="space-y-6">
                   <div className="flex justify-between items-center border-b border-brand-800 pb-4">
                      <span className="text-brand-300 text-sm">Avg. Review Time</span>
                      <span className="font-bold flex items-center"><Clock size={16} className="mr-2 text-accent-500" /> 4 Weeks</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-brand-800 pb-4">
                      <span className="text-brand-300 text-sm">Publishing Rate</span>
                      <span className="font-bold flex items-center"><CheckCircle size={16} className="mr-2 text-accent-500" /> Biannual</span>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] shadow-card border border-brand-50">
                <div className="flex items-center space-x-3 mb-4 text-brand-800">
                   <AlertCircle size={20} className="text-accent-500" />
                   <h4 className="font-bold">Author Notice</h4>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed italic">
                  "Submissions made after May 15th will be considered for the December issue. Please ensure your ORCID is linked in profile settings."
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
