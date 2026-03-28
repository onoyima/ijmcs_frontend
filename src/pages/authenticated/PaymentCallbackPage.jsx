import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';

/**
 * PaymentCallbackPage
 * Paystack redirects here after payment with query params: ?trxref=...&reference=...
 * This page verifies the payment with the backend and redirects the user to
 * the submission page to complete their upload.
 */
const PaymentCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'failed'
  const [message, setMessage] = useState('Verifying your payment with Paystack...');

  useEffect(() => {
    const reference = searchParams.get('reference') || searchParams.get('trxref');
    
    if (!reference) {
      setStatus('failed');
      setMessage('Invalid Payment Verification: The payment reference is missing. Please try again from the submission page.');
      return;
    }

    const verify = async () => {
      try {
        await api.get(`/api/payments/verify/${reference}`);
        setStatus('success');
        setMessage('Payment confirmed! Your manuscript upload is now unlocked.');
        
        // Retrieve the draft submission_id saved before Paystack redirect
        const draftId = localStorage.getItem('draft_submission_id');
        
        setTimeout(() => {
          if (draftId) {
            // Go back to submission page step 3 (upload) with the submission id
            navigate(`/submit?resume=${draftId}&step=3`);
          } else {
            navigate('/dashboard');
          }
        }, 2500);
      } catch (err) {
        setStatus('failed');
        const msg = err.response?.data?.message || 'Payment verification failed. Please contact support if funds were deducted.';
        setMessage(msg);
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[3rem] p-16 shadow-card border border-brand-50 max-w-lg w-full mx-4 text-center"
      >
        {status === 'verifying' && (
          <>
            <div className="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Loader2 className="text-accent-600 animate-spin" size={48} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-brand-900 mb-4">Verifying Payment</h1>
            <p className="text-neutral-500 font-medium">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-brand-900 mb-4">Payment Confirmed!</h1>
            <p className="text-neutral-500 font-medium mb-8">{message}</p>
            <p className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest">Redirecting to manuscript upload...</p>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="text-red-500" size={48} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-brand-900 mb-4">Verification Failed</h1>
            <p className="text-neutral-500 font-medium mb-12 leading-relaxed">{message}</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 bg-brand-900 text-white rounded-2xl font-bold hover:bg-brand-800 transition-all"
              >
                Return to Dashboard
              </button>
              <button
                onClick={() => navigate('/submit')}
                className="w-full py-4 bg-neutral-100 text-neutral-600 rounded-2xl font-bold hover:bg-neutral-200 transition-all"
              >
                Back to Submission
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentCallbackPage;
