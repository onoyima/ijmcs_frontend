import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to IJMCS!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-neutral-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-50 relative overflow-hidden">
          {/* Decorative side element */}
          <div className="absolute top-0 right-0 w-2 h-full bg-accent-500"></div>
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold text-brand-800 mb-2">Member Login</h1>
            <p className="text-neutral-500 text-sm">Access the IJMCS publishing ecosystem</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-300 hover:text-brand-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-neutral-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-neutral-600">Remember me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="text-brand-700 font-bold hover:text-accent-500 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-800 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-neutral-100 text-center">
            <p className="text-neutral-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-accent-500 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
        
        {/* Support notice */}
        <p className="text-center mt-8 text-xs text-neutral-400">
          Official Portal for Lagos State University (LASU) Multidisciplinary Journal. 
          <br />Need help? <Link to="/contact" className="underline font-medium">Contact Editorial Office</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
