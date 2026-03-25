import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Building, Globe, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    country: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    
    setIsLoading(true);
    try {
      await api.post('/api/auth/register', formData);
      toast.success('Registration successful! Please check your email to verify.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center p-4 bg-neutral-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-brand-50 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500 rounded-bl-[5rem] -mr-16 -mt-16 opacity-10"></div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-800 mb-4">Join IJMCS</h1>
            <p className="text-neutral-500 text-sm max-w-sm mx-auto">Create your researcher account to start submitting manuscripts and reviewing excellence.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="Abiona"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="Adebowale"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="scholar@university.edu"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Institution</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="Lagos State University"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Country</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="Nigeria"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-brand-800 hover:bg-brand-700 text-white rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-4"
            >
              <span>{isLoading ? 'Processing...' : 'Create Account'}</span>
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-neutral-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-500 font-bold hover:underline">
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
