import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setTokenError('No reset token found in the URL. Please use the exact link sent to your email.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (password.length < 8) {
      return toast.error('Password must be at least 8 characters long');
    }

    setIsLoading(true);
    try {
      await api.post('/api/auth/reset-password', { token, newPassword: password });
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password. The link may have expired.');
      if (err.response?.status === 400 && err.response?.data?.message.includes('expired')) {
        setTokenError('Your reset link has expired. Please request a new one.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-red-50">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-brand-900 mb-4">Invalid Link</h2>
          <p className="text-neutral-500 mb-8">{tokenError}</p>
          <Link to="/forgot-password" className="px-6 py-3 bg-brand-800 text-white rounded-xl font-bold hover:bg-brand-700 transition">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-50">
          {!isSuccess ? (
            <>
              <div className="text-center mb-10">
                <Link to="/login" className="inline-flex items-center text-sm text-brand-600 hover:text-accent-500 mb-6 font-bold transition-colors">
                  <ArrowLeft size={16} className="mr-2" /> Back to Login
                </Link>
                <h1 className="text-3xl font-serif font-bold text-brand-800 mb-2">Create New Password</h1>
                <p className="text-neutral-500 text-sm">Choose a strong, secure password for your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="••••••••"
                      minLength={8}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="••••••••"
                      minLength={8}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-brand-800 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  <span>{isLoading ? 'Saving...' : 'Save New Password'}</span>
                  {!isLoading && <Save size={18} />}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-800 mb-4">Password Updated!</h2>
              <p className="text-neutral-500 mb-8">
                Your password has been successfully reset. You will be redirected to the login page momentarily.
              </p>
              <Link to="/login" className="px-8 py-3 bg-brand-800 text-white rounded-xl font-bold">
                Go to Login Now
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
