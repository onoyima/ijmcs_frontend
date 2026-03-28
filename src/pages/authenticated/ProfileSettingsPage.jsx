import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosInstance';
import { User, Shield, BookOpen, MapPin, AtSign, Globe, Lock, Save, Camera, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PageLoader from '../../components/common/PageLoader';

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/api/users/profile');
      setProfile(data);
    } catch (err) {
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch('/api/users/profile', profile);
      toast.success('Profile details updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) return toast.error('Passwords do not match');
    
    setSaving(true);
    try {
      await api.post('/api/users/password', {
        current_password: passwords.current,
        new_password: passwords.next
      });
      toast.success('Password changed safely');
      setPasswords({ current: '', next: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="mb-16 flex flex-col items-center text-center">
            <div className="relative group mb-8">
               <div className="w-32 h-32 bg-brand-900 border-4 border-white shadow-2xl rounded-[2.5rem] flex items-center justify-center text-white overflow-hidden relative">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-4xl font-serif font-black">{profile?.first_name.charAt(0)}{profile?.last_name.charAt(0)}</div>
                  )}
                  <div className="absolute inset-0 bg-brand-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
               </div>
               <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-xl shadow-lg">
                  <CheckCircle size={16} />
               </div>
            </div>
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">Scholar Profile</h1>
            <p className="text-neutral-500 italic max-w-sm">Manage your academic identity and platform security.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Nav Tabs */}
            <nav className="md:col-span-1 space-y-3">
               <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-sm flex items-center space-x-3 transition-all ${
                  activeTab === 'profile' ? 'bg-brand-900 text-white shadow-xl translate-x-1' : 'text-neutral-400 hover:bg-white hover:text-brand-800'
                }`}
               >
                 <User size={18} /> <span>Account Details</span>
               </button>
               <button 
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-sm flex items-center space-x-3 transition-all ${
                  activeTab === 'security' ? 'bg-brand-900 text-white shadow-xl translate-x-1' : 'text-neutral-400 hover:bg-white hover:text-brand-800'
                }`}
               >
                 <Shield size={18} /> <span>Security settings</span>
               </button>
            </nav>

            {/* Content Area */}
            <div className="md:col-span-3">
               <AnimatePresence mode="wait">
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-[3rem] p-12 shadow-card border border-brand-50"
                    >
                      <h3 className="text-2xl font-serif font-bold text-brand-900 mb-10 border-l-4 border-brand-800 pl-4">Personal Ledger</h3>
                      
                      <form onSubmit={handleUpdateProfile} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">First Name</label>
                              <div className="relative">
                                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200" size={18} />
                                 <input 
                                   value={profile.first_name || ''}
                                   onChange={e => setProfile({...profile, first_name: e.target.value})}
                                   className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium"
                                 />
                              </div>
                           </div>
                           <div className="space-y-3">
                              <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">Last Name</label>
                              <div className="relative">
                                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200" size={18} />
                                 <input 
                                   value={profile.last_name || ''}
                                   onChange={e => setProfile({...profile, last_name: e.target.value})}
                                   className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium"
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">Academic Affiliation</label>
                           <div className="relative">
                              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200" size={18} />
                              <input 
                                value={profile.institution || ''}
                                onChange={e => setProfile({...profile, institution: e.target.value})}
                                placeholder="University, Research Center, etc."
                                className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium"
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">Location / Country</label>
                              <div className="relative">
                                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200" size={18} />
                                 <input 
                                   value={profile.country || ''}
                                   onChange={e => setProfile({...profile, country: e.target.value})}
                                   className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium"
                                 />
                              </div>
                           </div>
                           <div className="space-y-3">
                              <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">ORCID ID (Academic Metadata)</label>
                              <div className="relative">
                                 <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200" size={18} />
                                 <input 
                                   value={profile.orcid || ''}
                                   onChange={e => setProfile({...profile, orcid: e.target.value})}
                                   placeholder="0000-0000-0000-0000"
                                   className="w-full pl-12 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Bio Field */}
                        <div className="space-y-3">
                           <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">Biography / Research Interests</label>
                           <textarea 
                             value={profile.bio || ''}
                             onChange={e => setProfile({...profile, bio: e.target.value})}
                             rows={4}
                             placeholder="Brief summary of your academic background..."
                             className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-3xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium resize-none"
                           />
                        </div>

                        <button 
                          type="submit"
                          disabled={saving}
                          className="w-full bg-brand-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl flex items-center justify-center space-x-3 transition-all hover:bg-brand-800 disabled:opacity-50"
                        >
                           {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                           <span>{saving ? 'Synchronizing...' : 'Save Profile Changes'}</span>
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {activeTab === 'security' && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-[3rem] p-12 shadow-card border border-brand-50"
                    >
                       <div className="flex items-center space-x-4 mb-10">
                          <Shield className="text-accent-500" size={32} />
                          <h3 className="text-2xl font-serif font-bold text-brand-900 border-l-4 border-brand-800 pl-4">Credential Vault</h3>
                       </div>

                       <form onSubmit={handleChangePassword} className="space-y-8">
                          <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100 flex items-start space-x-4 mb-8">
                             <AlertCircle className="text-brand-800 shrink-0 mt-1" size={20} />
                             <p className="text-xs text-brand-800 leading-relaxed font-bold italic">
                               For your security, changing your password will terminate all other active legislative sessions across devices. You will need to log in again on your primary device.
                             </p>
                          </div>

                          <div className="space-y-6">
                             <div className="space-y-3">
                                <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">Current Password</label>
                                <div className="relative">
                                   <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-200" size={18} />
                                   <input 
                                     type="password"
                                     required
                                     value={passwords.current}
                                     onChange={e => setPasswords({...passwords, current: e.target.value})}
                                     className="w-full pl-14 pr-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                                     placeholder="••••••••••••"
                                   />
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                               <div className="space-y-3">
                                  <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">New Password</label>
                                  <input 
                                    type="password"
                                    required
                                    value={passwords.next}
                                    onChange={e => setPasswords({...passwords, next: e.target.value})}
                                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                                    placeholder="Enter secure password"
                                  />
                               </div>
                               <div className="space-y-3">
                                  <label className="text-xs font-black text-brand-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                  <input 
                                    type="password"
                                    required
                                    value={passwords.confirm}
                                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                                    placeholder="Repeat for security"
                                  />
                               </div>
                             </div>
                          </div>

                          <button 
                            type="submit"
                            disabled={saving}
                            className="w-full bg-brand-800 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl flex items-center justify-center space-x-3 transition-all hover:bg-brand-700 disabled:opacity-50 mt-10"
                          >
                             {saving ? <RefreshCw className="animate-spin" size={18} /> : <Shield size={18} />}
                             <span>{saving ? 'Hardening Account...' : 'Apply Security Upgrade'}</span>
                          </button>
                       </form>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
        </div>
    </div>
  );
};

export default ProfileSettingsPage;
