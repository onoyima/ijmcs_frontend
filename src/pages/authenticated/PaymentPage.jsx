import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { CreditCard, ShieldCheck, Lock, ChevronRight, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const PaymentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const { data } = await api.get('/api/submissions/my-submissions');
        const current = data.find(s => s.id == id);
        if (!current) throw new Error('Submission not found');
        setSubmission(current);
      } catch (err) {
        toast.error('Failed to load submission details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [id, navigate]);

  const handlePaystackPayment = async () => {
    setProcessing(true);
    try {
      // 1. Initialize on backend
      const { data: initData } = await api.post('/api/payments/initialize', {
        submission_id: id,
        amount: 25000, // Example APC fee in Naira
        email: user.email
      });

      // 2. Open Paystack Inline (Assumes script is loaded in index.html)
      const handler = window.PaystackPop.setup({
        key: initData.data.key, // Your public key from env or returned by backend
        email: user.email,
        amount: 25000 * 100,
        ref: initData.data.reference,
        callback: async (response) => {
          // 3. Verify on backend
          toast.loading('Verifying payment...', { id: 'verify' });
          try {
            await api.get(`/api/payments/verify/${response.reference}`);
            toast.success('Payment successful!', { id: 'verify' });
            navigate('/dashboard');
          } catch (err) {
            toast.error('Verification failed. Contact support.', { id: 'verify' });
          } finally {
            setProcessing(false);
          }
        },
        onClose: () => {
          setProcessing(false);
          toast.error('Transaction cancelled');
        }
      });
      handler.openIframe();
    } catch (err) {
      toast.error('Failed to initialize payment');
      setProcessing(false);
    }
  };

  if (loading) return <div className="py-40 text-center animate-pulse text-brand-800 font-serif text-3xl">Preparing Secure Portal...</div>;

  return (
    <div className="bg-neutral-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-16">
           <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl animate-pulse">
              <CreditCard size={32} />
           </div>
           <h1 className="text-4xl font-serif font-bold text-brand-900 mb-4">Article Processing Charge</h1>
           <p className="text-neutral-500 max-w-md mx-auto">Complete your payment to proceed with the final production and indexing of your manuscript.</p>
        </header>

        <div className="bg-white rounded-[3rem] shadow-card border border-brand-50 overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Order Summary */}
              <div className="p-12 md:p-16 bg-neutral-50/50 border-r border-neutral-100">
                 <h2 className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-8">Submission Summary</h2>
                 <div className="space-y-6">
                    <div>
                       <span className="text-[10px] text-neutral-400 font-mono tracking-tighter uppercase">Manuscript ID</span>
                       <p className="font-bold text-brand-900 mt-1">MSS-{submission.id.toString().padStart(4, '0')}</p>
                    </div>
                    <div>
                       <span className="text-[10px] text-neutral-400 font-mono tracking-tighter uppercase">Title</span>
                       <p className="text-sm font-serif font-bold text-brand-800 mt-1 line-clamp-2">{submission.title}</p>
                    </div>
                    <div className="pt-6 border-t border-neutral-200">
                       <div className="flex justify-between items-center text-sm mb-2">
                          <span className="text-neutral-500">Processing Fee</span>
                          <span className="font-medium text-brand-800">₦25,000.00</span>
                       </div>
                       <div className="flex justify-between items-center text-sm mb-4">
                          <span className="text-neutral-500">Service Charge</span>
                          <span className="font-medium text-brand-800">₦0.00</span>
                       </div>
                       <div className="flex justify-between items-center text-xl font-serif font-bold text-brand-900">
                          <span>Total Amount</span>
                          <span className="text-accent-600">₦25,000.00</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Payment Action */}
              <div className="p-12 md:p-16 flex flex-col justify-center">
                 <div className="mb-10 space-y-4">
                    <div className="flex items-center space-x-3 text-sm text-neutral-600">
                       <ShieldCheck className="text-green-500" size={20} />
                       <span>Secured by Paystack Encryption</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-neutral-600">
                       <Lock className="text-neutral-400" size={20} />
                       <span>PCI-DSS Level 1 Certified</span>
                    </div>
                 </div>

                 <button 
                   onClick={handlePaystackPayment}
                   disabled={processing}
                   className="w-full py-5 bg-brand-900 hover:bg-brand-800 text-white rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-2xl disabled:opacity-50"
                 >
                    {processing ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <span>Pay ₦25,000.00 Now</span>
                        <ChevronRight size={20} />
                      </>
                    )}
                 </button>

                 <p className="mt-8 text-[10px] text-neutral-400 text-center leading-relaxed">
                   By clicking "Pay Now", you agree to the IJMCS terms of service and publication ethics. Payments are non-refundable once the production process begins.
                 </p>
                 
                 <button 
                  onClick={() => navigate('/dashboard')}
                  className="mt-6 flex items-center justify-center text-xs font-bold text-neutral-400 hover:text-brand-800 transition-colors"
                 >
                    <ArrowLeft size={14} className="mr-2" /> Return to Dashboard
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
