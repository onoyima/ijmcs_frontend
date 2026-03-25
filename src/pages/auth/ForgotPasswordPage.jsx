import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/api/auth/forgot-password', { email });
      setSubmitted(true);
      toast.success('Reset link sent to your email');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-50">
          {!submitted ? (
            <>
              <div className="text-center mb-10">
                <Link to="/login" className="inline-flex items-center text-sm text-brand-600 hover:text-accent-500 mb-6 font-bold transition-colors">
                  <ArrowLeft size={16} className="mr-2" /> Back to Login
                </Link>
                <h1 className="text-3xl font-serif font-bold text-brand-800 mb-2">Password Recovery</h1>
                <p className="text-neutral-500 text-sm">Enter the email associated with your IJMCS account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-2 ml-1">Account Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="scholar@university.edu"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-brand-800 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  <span>{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
                  {!isLoading && <Send size={18} />}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <Send size={32} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-800 mb-4">Check Your Mail</h2>
              <p className="text-neutral-500 mb-8">
                We've sent password reset instructions to <span className="font-bold text-brand-700">{email}</span>. Please check your inbox and spam folder.
              </p>
              <Link to="/login" className="px-8 py-3 bg-brand-800 text-white rounded-xl font-bold">
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
