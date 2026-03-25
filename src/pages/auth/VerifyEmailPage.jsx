import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link.');
        return;
      }

      try {
        const { data } = await api.get(`/api/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage(data.message);
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
      }
    };
    verify();
  }, [searchParams]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center"
      >
        {status === 'verifying' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-brand-500 animate-spin mb-6" />
            <h2 className="text-2xl font-serif font-bold text-brand-800">Verifying Email</h2>
            <p className="text-neutral-500 mt-2">Please wait while we validate your account...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
            <h2 className="text-2xl font-serif font-bold text-brand-800">Email Verified!</h2>
            <p className="text-neutral-500 mt-2 mb-8">{message}</p>
            <Link to="/login" className="px-8 py-3 bg-brand-800 text-white rounded-xl font-bold">
              Sign In Now
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="w-16 h-16 text-red-500 mb-6" />
            <h2 className="text-2xl font-serif font-bold text-brand-800">Verification Failed</h2>
            <p className="text-neutral-500 mt-2 mb-8">{message}</p>
            <Link to="/contact" className="text-brand-700 font-bold underline">
              Contact Support
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
