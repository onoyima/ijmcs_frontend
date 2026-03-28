import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosInstance';
import { 
  Users, FileText, CheckCircle, Settings, Search, TrendingUp, 
  Shield, Mail, CreditCard, History, MessageSquare, Save, 
  ChevronRight, AlertCircle, RefreshCw, BookOpen, Plus, Trash2, ShieldCheck, Globe
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageLoader from '../../components/common/PageLoader';

const AdminDashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [annForm, setAnnForm] = useState({ title: '', content: '', is_public: true, image_url: '', type: 'general' });
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userEditForm, setUserEditForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({ users: [], payments: [], audit: [], contacts: [], announcements: [], submissions: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [apcAmount, setApcAmount] = useState('150');

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchDashData();
  }, []);

  const fetchDashData = async () => {
    setLoading(true);
    const endpoints = {
      stats: '/api/admin/stats',
      users: '/api/admin/users',
      payments: '/api/admin/payments',
      audit: '/api/admin/audit-logs',
      contacts: '/api/admin/contacts',
      announcements: '/api/announcements'
    };

    const results = {};
    let errorCount = 0;

    await Promise.all(Object.entries(endpoints).map(async ([key, url]) => {
      try {
        const { data } = await api.get(url);
        results[key] = data;
      } catch (err) {
        console.error(`Failed to fetch ${key}:`, err.response?.status || err.message);
        errorCount++;
      }
    }));

    if (results.stats) setStats(results.stats);
    
    setData(prev => ({
      users: results.users || prev.users,
      payments: results.payments || prev.payments,
      audit: results.audit || prev.audit,
      contacts: results.contacts || prev.contacts,
      announcements: results.announcements || prev.announcements
    }));

    if (errorCount > 0) {
      toast.error(`Dashboard partially synchronized (${Object.keys(results).length}/${Object.keys(endpoints).length} modules active)`);
    }
    setLoading(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch(`/api/admin/users/${userId}/role`, { role: newRole });
      toast.success('User role updated');
      fetchDashData();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };
  
  const handleVerifyUser = async (userId) => {
    try {
      await api.patch(`/api/admin/users/${userId}/verify`);
      toast.success('User account manually verified');
      fetchDashData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/api/admin/users/${editingUser.id}/update`, userEditForm);
      toast.success('User record updated and notification sent');
      setShowUserEditModal(false);
      setEditingUser(null);
      fetchDashData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleUpdateApc = async () => {
    try {
      await api.patch('/api/admin/settings/apc_amount_usd', { value: apcAmount });
      toast.success('APC Amount updated successfully');
    } catch (err) {
      toast.error('Failed to update settings');
    }
  };

  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    console.log('📢 handleSaveAnnouncement triggered', { editingAnn, annForm });
    try {
      if (editingAnn) {
        console.log('📝 Updating announcement...', editingAnn.id);
        const res = await api.put(`/api/announcements/${editingAnn.id}`, annForm);
        console.log('✅ Update response:', res.data);
        toast.success('Announcement updated');
      } else {
        console.log('🆕 Creating new announcement...', annForm);
        const res = await api.post('/api/announcements', annForm);
        console.log('✅ Create response:', res.data);
        toast.success('Announcement created');
      }
      setShowAnnModal(false);
      setEditingAnn(null);
      setAnnForm({ title: '', content: '', is_public: true, image_url: '', type: 'general' });
      fetchDashData();
    } catch (err) {
      console.error('❌ Announcement operation failed:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Scholars', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'editorial', label: 'Editorial Queue', icon: FileText, path: '/editor/control' },
    { id: 'issues', label: 'Issue Management', icon: BookOpen, path: '/editor/issues' },
    { id: 'announcements', label: 'Announcements', icon: ShieldCheck },
    { id: 'audit', label: 'Audit Trail', icon: History },
    { id: 'contacts', label: 'Inbox', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (tab) => {
    if (tab.path) {
      navigate(tab.path);
    } else {
      setActiveTab(tab.id);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex-grow">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-brand-500 font-black uppercase text-[10px] tracking-widest mb-1 block">Administrative Dashboard</span>
            <h1 className="text-4xl font-serif font-bold text-brand-900 capitalize">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          
          {(activeTab === 'users' || activeTab === 'payments') && (
            <div className="flex bg-white rounded-2xl shadow-sm border border-brand-100 p-2 w-80">
                <div className="p-3 text-neutral-400"><Search size={18} /></div>
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="bg-transparent border-none outline-none w-full text-xs font-medium"
                />
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                     { label: 'Total Scholars', value: stats?.totalUsers, icon: Users, color: 'bg-blue-600' },
                     { label: 'Submissions', value: stats?.totalSubmissions, icon: FileText, color: 'bg-accent-600' },
                     { label: 'Published Works', value: stats?.publishedArticles, icon: CheckCircle, color: 'bg-green-600' }
                   ].map((item, i) => (
                     <div key={i} className="bg-white p-10 rounded-[3rem] shadow-card border border-brand-50 relative overflow-hidden group">
                        <div className={`absolute -right-4 -top-4 w-32 h-32 ${item.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`}></div>
                        <item.icon className="text-brand-900 mb-6" size={32} />
                        <div className="text-5xl font-serif font-bold text-brand-900 mb-2">{item.value || 0}</div>
                        <div className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">{item.label}</div>
                     </div>
                   ))}
                </div>
                {/* Recent Activity Mini-List */}
                <div className="bg-white rounded-[3rem] p-10 shadow-card border border-brand-50">
                  <h3 className="text-xl font-serif font-bold text-brand-900 mb-8">System vitals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h4 className="text-xs font-black text-brand-400 uppercase tracking-widest">Recent Audit Logs</h4>
                      {data.audit.slice(0, 5).map((log) => (
                        <div key={log.id} className="flex items-start space-x-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 italic text-xs text-neutral-600">
                          <History size={16} className="text-brand-300 mt-1 shrink-0" />
                          <span>{(log.first_name || 'System')} {log.action}: {log.details}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6">
                       <h4 className="text-xs font-black text-brand-400 uppercase tracking-widest">Global Metrics</h4>
                       <div className="bg-brand-900 rounded-[2.5rem] p-8 text-white relative h-full">
                          <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-brand-800 pb-4">
                              <span className="text-brand-400 text-xs">Unread Messages</span>
                              <span className="font-bold text-accent-500">{(data.contacts || []).filter(c => c.status === 'unread').length}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-brand-800 pb-4">
                              <span className="text-brand-400 text-xs">Pending Payments</span>
                              <span className="font-bold text-accent-500">View Payments Tab</span>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-brand-50/50">
                    <tr>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900">Scholar Details</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900">Status</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900">Current Role</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900">Manage Role</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {data.users.filter(u => `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())).map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-10 py-8">
                          <div className="flex items-center space-x-4">
                             <div className="w-12 h-12 bg-brand-900 text-accent-500 rounded-2xl flex items-center justify-center font-serif font-black text-lg shadow-lg">
                                {(u.first_name || '').charAt(0)}{(u.last_name || '').charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-brand-900">{u.first_name} {u.last_name}</p>
                                <p className="text-[10px] text-neutral-400 leading-none mt-1">{u.email}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex flex-col space-y-1">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest inline-block text-center border ${
                                u.is_verified ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                              }`}>
                                {u.is_verified ? 'Verified' : 'Unverified'}
                              </span>
                              {!u.is_verified && (
                                <button 
                                  onClick={() => handleVerifyUser(u.id)}
                                  className="text-[9px] font-black text-brand-800 underline hover:text-accent-600 transition-colors"
                                >
                                  Verify Now
                                </button>
                              )}
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                             u.role === 'admin' ? 'bg-red-50 text-red-700 border-red-100' :
                             u.role === 'editor' ? 'bg-accent-50 text-accent-800 border-accent-200' :
                             u.role === 'reviewer' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                             'bg-neutral-100 text-neutral-500 border-neutral-200'
                           }`}>
                             {u.role}
                           </span>
                        </td>
                        <td className="px-10 py-8">
                           <select 
                             className="bg-neutral-50 border border-neutral-200 text-[10px] font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-accent-500 transition-all"
                             value={u.role}
                             onChange={(e) => handleRoleChange(u.id, e.target.value)}
                           >
                              <option value="author">Scholar/Author</option>
                              <option value="reviewer">Reviewer</option>
                              <option value="editor">Editor</option>
                              <option value="admin">Administrator</option>
                           </select>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button 
                             onClick={() => {
                               setEditingUser(u);
                               setUserEditForm({ first_name: u.first_name, last_name: u.last_name, email: u.email, password: '' });
                               setShowUserEditModal(true);
                             }}
                             className="p-3 text-neutral-300 hover:text-brand-800 transition-colors"
                           >
                             <Settings size={20} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-brand-50/50">
                       <tr>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900">Reference / Status</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900">Scholar</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900">Manuscript</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-brand-900 text-right">Amount</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                       {data.payments.map((p) => (
                         <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="px-10 py-8">
                               <div className="flex items-center space-x-3 mb-1 text-xs font-mono font-bold text-neutral-800 tracking-tighter">
                                  <Shield size={14} className="text-brand-300" /> {p.reference}
                               </div>
                               <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest inline-block border border-green-100">
                                  {p.status}
                               </span>
                            </td>
                            <td className="px-10 py-8">
                               <p className="text-sm font-bold text-brand-900">{p.first_name} {p.last_name}</p>
                               <span className="text-[10px] text-neutral-400 capitalize">{p.provider} payment</span>
                            </td>
                            <td className="px-10 py-8 max-w-xs">
                               <p className="text-xs font-serif font-bold text-brand-800 truncate" title={p.submission_title}>
                                  {p.submission_title || 'N/A (Deleted or General)'}
                               </p>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <div className="text-lg font-black text-brand-900 tracking-tighter">
                                  ${parseFloat(p.amount).toFixed(2)}
                               </div>
                               <span className="text-[10px] text-neutral-400">{new Date(p.created_at).toLocaleDateString()}</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            )}

            {/* AUDIT TAB */}
            {activeTab === 'audit' && (
              <div className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
                <div className="px-10 py-8 border-b border-neutral-100 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-brand-900">System Logs</h3>
                  <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-bold bg-neutral-50 px-4 py-1.5 rounded-full border border-neutral-100">
                    <History size={14} /> <span>Showing Last 200 Actions</span>
                  </div>
                </div>
                <div className="space-y-0 divide-y divide-neutral-50">
                   {data.audit.map((log) => (
                     <div key={log.id} className="px-10 py-6 flex items-start justify-between hover:bg-neutral-50 transition-colors">
                        <div className="flex space-x-6">
                           <div className="mt-1">
                              {log.action === 'ROLE_CHANGE' ? <Shield size={18} className="text-accent-600" /> : <Settings size={18} className="text-blue-500" />}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-brand-900">{log.action.replace('_', ' ')}</p>
                              <p className="text-[11px] text-neutral-500 mt-1 italic leading-relaxed">{log.details}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-brand-800 uppercase tracking-widest">{log.first_name} {log.last_name}</p>
                           <p className="text-[9px] text-neutral-400 mt-1">{new Date(log.created_at).toLocaleString()}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {/* CONTACTS TAB */}
            {activeTab === 'contacts' && (
              <div className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
                 {data.contacts.length === 0 ? (
                    <div className="p-40 text-center text-neutral-400 font-serif text-2xl">Your Inbox is currently empty</div>
                 ) : (
                    <div className="grid grid-cols-1 divide-y divide-neutral-100">
                      {data.contacts.map((c) => (
                        <div key={c.id} className="p-10 hover:bg-neutral-50 transition-all group">
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center space-x-4">
                                 <div className={`w-12 h-12 ${c.status === 'unread' ? 'bg-accent-500 text-brand-900' : 'bg-neutral-100 text-neutral-400'} rounded-2xl flex items-center justify-center font-black text-lg transition-colors shadow-sm`}>
                                    <Mail size={24} />
                                 </div>
                                 <div>
                                    <h4 className="font-serif font-black text-xl text-brand-900">{c.subject || 'No Subject'}</h4>
                                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">{c.name} &lt;{c.email}&gt;</p>
                                 </div>
                              </div>
                              <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${c.status === 'unread' ? 'bg-accent-100 text-accent-700' : 'bg-neutral-100 text-neutral-400'}`}>
                                 {c.status}
                              </span>
                           </div>
                           <p className="text-sm text-neutral-600 leading-relaxed font-medium bg-white p-6 rounded-2xl border border-neutral-100 shadow-inner group-hover:shadow-card transition-all">
                              {c.message}
                           </p>
                           <div className="mt-8 flex justify-end">
                              <button className="text-[10px] font-black text-brand-800 uppercase tracking-[0.2em] border-b-2 border-brand-800 hover:text-accent-500 hover:border-accent-500 transition-all pb-1">Archive Message</button>
                           </div>
                        </div>
                      ))}
                    </div>
                 )}
              </div>
            )}

            {/* ANNOUNCEMENTS TAB */}
            {activeTab === 'announcements' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-2xl font-serif font-bold text-brand-900 border-l-4 border-accent-500 pl-4">System Announcements</h3>
                   <button 
                     onClick={() => { setEditingAnn(null); setAnnForm({ title: '', content: '', is_public: true, image_url: '', type: 'general' }); setShowAnnModal(true); }}
                     className="bg-brand-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl hover:bg-brand-800 transition-all"
                   >
                     <Plus size={20} /> <span>New Announcement</span>
                   </button>
                </div>
                <div className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
                   <div className="divide-y divide-neutral-100">
                      {data.announcements.map((a) => (
                        <div key={a.id} className="p-8 hover:bg-neutral-50 transition-all flex justify-between items-start group">
                           <div className="max-w-3xl">
                              <div className="flex items-center space-x-3 mb-2">
                                 <h4 className="text-xl font-bold text-brand-900">{a.title}</h4>
                                 <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${a.is_public ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-neutral-100 text-neutral-400 border border-neutral-200'}`}>
                                    {a.is_public ? 'Public' : 'Hidden'}
                                 </span>
                              </div>
                              <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">{a.content}</p>
                              <p className="text-[10px] text-neutral-300 font-bold mt-4 uppercase tracking-widest">Modified: {new Date(a.updated_at || a.created_at).toLocaleDateString()}</p>
                           </div>
                           <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                              <button 
                                onClick={() => { setEditingAnn(a); setAnnForm({ title: a.title, content: a.content, is_public: !!a.is_public, image_url: a.image_url || '', type: a.type || 'general' }); setShowAnnModal(true); }}
                                className="p-3 bg-white border border-neutral-100 rounded-xl hover:text-accent-500 transition-colors shadow-sm"
                              >
                                <Settings size={18} />
                              </button>
                              <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors shadow-sm" onClick={async () => {
                                 if(window.confirm('Delete this announcement?')) {
                                    try {
                                       await api.delete(`/api/announcements/${a.id}`);
                                       toast.success('Announcement removed');
                                       fetchDashData();
                                    } catch (err) { toast.error('Check permissions'); }
                                 }
                              }}><Trash2 size={18} /></button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <div className="bg-white rounded-[3rem] p-12 shadow-card border border-brand-50">
                    <h3 className="text-2xl font-serif font-bold text-brand-900 mb-8 flex items-center">
                       <CreditCard className="mr-4 text-accent-500" size={32} /> Financial configuration
                    </h3>
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="text-xs font-black text-brand-400 uppercase tracking-widest">Article Processing Charge (USD)</label>
                          <div className="relative group">
                             <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-300 font-serif font-black text-xl">$</div>
                             <input 
                               value={apcAmount}
                               onChange={(e) => setApcAmount(e.target.value)}
                               type="number"
                               className="w-full pl-12 pr-8 py-5 bg-neutral-50 border border-neutral-200 rounded-2xl font-serif font-bold text-xl outline-none focus:ring-4 focus:ring-accent-500/20 focus:border-accent-500 transition-all shadow-inner"
                             />
                          </div>
                          <p className="text-[10px] text-neutral-400 italic">This amount will be automatically converted for NGN payments on author checkout.</p>
                       </div>
                       <button 
                         onClick={handleUpdateApc}
                         className="w-full bg-brand-800 hover:bg-brand-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-1"
                       >
                          <Save size={18} /> <span>Save Financial Changes</span>
                       </button>
                    </div>
                 </div>

                 <div className="bg-brand-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-[120px] opacity-10 -mr-32 -mt-32"></div>
                    <h3 className="text-2xl font-serif font-bold mb-8">System Integrity</h3>
                    <div className="space-y-8 relative z-10">
                       <div className="p-8 bg-brand-800/50 rounded-3xl border border-brand-700">
                          <div className="flex items-center space-x-3 mb-4">
                             <AlertCircle size={20} className="text-accent-500" />
                             <h4 className="font-bold text-sm uppercase tracking-widest">Protocol Notice</h4>
                          </div>
                          <p className="text-xs text-brand-300 leading-relaxed italic">
                            All administrative changes from this panel, especially role re-assignments and financial tweaks, are recorded in the immutable system audit trail for board-level review.
                          </p>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Danger Zone</h4>
                          <button className="w-full py-4 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all">Flush System Cache</button>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Announcement Modal */}
        <AnimatePresence>
          {showAnnModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-900/40 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl relative"
              >
                <div className="mb-10">
                  <h2 className="text-3xl font-serif font-bold text-brand-900">{editingAnn ? 'Refine Proclamation' : 'New Proclamation'}</h2>
                  <p className="text-neutral-400 text-sm mt-1">Official system announcements are broadcasted to the public homepage.</p>
                </div>

                <form onSubmit={handleSaveAnnouncement} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400">Headline</label>
                    <input 
                      required
                      value={annForm.title}
                      onChange={e => setAnnForm({...annForm, title: e.target.value})}
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-4 focus:ring-accent-500/10 transition-all font-bold text-brand-900"
                      placeholder="Enter breaking news headline..."
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400">Content Body</label>
                    <textarea 
                      required
                      value={annForm.content}
                      onChange={e => setAnnForm({...annForm, content: e.target.value})}
                      rows={6}
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-3xl outline-none focus:ring-4 focus:ring-accent-500/10 transition-all text-sm leading-relaxed text-neutral-600 resize-none"
                      placeholder="Draft the official message..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400">Category / Type</label>
                      <select 
                        value={annForm.type || 'general'}
                        onChange={e => setAnnForm({...annForm, type: e.target.value})}
                        className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-4 focus:ring-accent-500/10 transition-all font-bold text-brand-900 appearance-none"
                      >
                         <option value="general">General Proclamation</option>
                         <option value="news">Journal News</option>
                         <option value="call_for_papers">Call for Papers</option>
                         <option value="editorial">Editorial Notice</option>
                         <option value="conference">Conference Update</option>
                         <option value="special_issue">Special Issue Announcement</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400">Feature Image URL</label>
                      <input 
                        value={annForm.image_url || ''}
                        onChange={e => setAnnForm({...annForm, image_url: e.target.value})}
                        className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-4 focus:ring-accent-500/10 transition-all font-bold text-brand-900"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <input 
                      type="checkbox"
                      id="is_public"
                      checked={annForm.is_public}
                      onChange={e => setAnnForm({...annForm, is_public: e.target.checked})}
                      className="w-6 h-6 rounded-lg text-accent-500 focus:ring-accent-500 transition-all cursor-pointer"
                    />
                    <label htmlFor="is_public" className="text-sm font-bold text-brand-800 cursor-pointer">Visibile to Public immediately after saving</label>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button type="submit" className="flex-grow py-5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-brand-800 transition-all">
                      {editingAnn ? 'Update Announcement' : 'Publish Announcement'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowAnnModal(false)}
                      className="px-10 py-5 bg-neutral-100 text-neutral-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* User Edit Modal */}
        <AnimatePresence>
          {showUserEditModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-900/40 backdrop-blur-md">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="bg-white w-full max-w-lg rounded-[3.5rem] p-12 shadow-2xl relative"
               >
                 <div className="mb-10 text-center">
                   <div className="w-20 h-20 bg-brand-900 text-accent-500 rounded-[2rem] flex items-center justify-center font-serif font-black text-3xl mx-auto mb-6 shadow-xl">
                      {editingUser?.first_name?.charAt(0) || '?'}
                   </div>
                   <h2 className="text-3xl font-serif font-bold text-brand-900">Manage Scholar</h2>
                   <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mt-2">Administrative User Correction</p>
                 </div>

                 <form onSubmit={handleUpdateUser} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">First Name</label>
                          <input 
                            required
                            value={userEditForm.first_name}
                            onChange={e => setUserEditForm({...userEditForm, first_name: e.target.value})}
                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-4 focus:ring-accent-500/10 font-bold text-brand-900"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Last Name</label>
                          <input 
                            required
                            value={userEditForm.last_name}
                            onChange={e => setUserEditForm({...userEditForm, last_name: e.target.value})}
                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-4 focus:ring-accent-500/10 font-bold text-brand-900"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Email Address</label>
                       <input 
                         required
                         type="email"
                         value={userEditForm.email}
                         onChange={e => setUserEditForm({...userEditForm, email: e.target.value})}
                         className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl outline-none focus:ring-4 focus:ring-accent-500/10 font-bold text-brand-900"
                       />
                    </div>

                    <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                       <div className="flex items-center space-x-3 mb-2">
                          <AlertCircle size={16} className="text-amber-600" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-700">Security Reset</h4>
                       </div>
                       <input 
                         type="password"
                         value={userEditForm.password}
                         onChange={e => setUserEditForm({...userEditForm, password: e.target.value})}
                         placeholder="Leave blank to keep current password"
                         className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl outline-none text-xs"
                       />
                    </div>

                    <div className="flex space-x-4 pt-6">
                       <button type="submit" className="flex-grow py-5 bg-brand-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-brand-800 transition-all">
                          Update & Notify User
                       </button>
                       <button 
                         type="button" 
                         onClick={() => setShowUserEditModal(false)}
                         className="px-8 py-5 bg-neutral-100 text-neutral-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all"
                       >
                          Discard
                       </button>
                    </div>
                 </form>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
