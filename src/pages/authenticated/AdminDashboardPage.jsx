import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Users, FileText, CheckCircle, Settings, Search, TrendingUp, Shield, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get('/api/admin/stats'),
          api.get('/api/admin/users')
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        toast.error('Failed to load administrative data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(u => 
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif text-3xl">Synchronizing Admin Data...</div>;

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div>
              <h1 className="text-3xl font-serif font-bold text-brand-900 border-l-4 border-brand-800 pl-4">System Administration</h1>
              <p className="text-sm text-neutral-500 mt-1 italic">Total Oversight of the IJMCS Scholarship Ecosystem.</p>
           </div>
           <div className="flex bg-white rounded-2xl shadow-sm border border-brand-100 p-2 w-full md:w-96">
              <div className="p-3 text-neutral-400"><Search size={20} /></div>
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="bg-transparent border-none outline-none w-full text-sm font-medium"
              />
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {[
             { label: 'Total Scholars', value: stats?.totalUsers, icon: Users, color: 'bg-blue-500' },
             { label: 'Submissions', value: stats?.totalSubmissions, icon: FileText, color: 'bg-accent-500' },
             { label: 'Published Works', value: stats?.publishedArticles, icon: CheckCircle, color: 'bg-green-500' }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-10 rounded-[2.5rem] shadow-card border border-brand-50 relative overflow-hidden group"
             >
                <div className={`absolute -right-4 -top-4 w-32 h-32 ${item.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`}></div>
                <item.icon className="text-brand-900 mb-6" size={32} />
                <div className="text-4xl font-serif font-bold text-brand-900 mb-2">{item.value || 0}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">{item.label}</div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* User Management */}
           <div className="lg:col-span-8">
              <section className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
                 <div className="px-10 py-8 border-b border-neutral-100 flex items-center justify-between">
                    <h2 className="font-serif font-bold text-xl text-brand-900">User Directory</h2>
                    <span className="text-[10px] bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full font-bold">{users.length} Total</span>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-brand-50/30">
                             <th className="px-10 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-800">User Details</th>
                             <th className="px-10 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-800">Role</th>
                             <th className="px-10 py-5 text-[10px] font-bold uppercase tracking-widest text-brand-800 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-neutral-100">
                          {filteredUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-neutral-50/50 transition-colors">
                               <td className="px-10 py-6">
                                  <div className="flex items-center space-x-4">
                                     <div className="w-10 h-10 bg-brand-900 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                                        {u.first_name.charAt(0)}{u.last_name.charAt(0)}
                                     </div>
                                     <div>
                                        <p className="font-bold text-brand-900">{u.first_name} {u.last_name}</p>
                                        <p className="text-xs text-neutral-400">{u.email}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-10 py-6">
                                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                                     u.role === 'admin' ? 'bg-red-50 text-red-700 border-red-100' :
                                     u.role === 'editor' ? 'bg-accent-50 text-accent-700 border-accent-100' :
                                     'bg-neutral-50 text-neutral-500 border-neutral-100'
                                  }`}>
                                     {u.role}
                                  </span>
                               </td>
                               <td className="px-10 py-6 text-right">
                                  <button className="text-neutral-300 hover:text-brand-800 transition-colors"><Mail size={18} /></button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </section>
           </div>

           {/* Quick Settings */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-brand-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                 <h3 className="text-xl font-serif font-bold mb-8 flex items-center">
                    <Settings className="mr-3 text-accent-500" size={24} /> System Config
                 </h3>
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-xs font-bold text-brand-300 uppercase tracking-widest">Journal Status</label>
                       <div className="bg-brand-800/50 p-4 rounded-xl border border-brand-700 font-bold text-sm text-green-400 flex items-center">
                          <CheckCircle size={16} className="mr-2" /> Fully Operational
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-xs font-bold text-brand-300 uppercase tracking-widest">Global Maintenance</label>
                       <button className="w-full py-4 bg-brand-800 hover:bg-red-900/40 text-white rounded-xl font-bold text-xs transition-all border border-brand-700">
                          Enter Maintenance Mode
                       </button>
                    </div>
                 </div>
              </div>

              <div className="bg-white p-10 rounded-[2rem] shadow-card border border-brand-50 border-t-8 border-accent-500">
                 <h4 className="font-serif font-bold text-brand-900 mb-4 flex items-center">
                    <Shield className="text-accent-500 mr-2" size={18} /> Admin Integrity
                 </h4>
                 <p className="text-xs text-neutral-500 leading-relaxed">
                   Changes to system roles and global defaults are logged for security. All administrative actions are final and visible to the board.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
