import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Upload, FileText, CheckCircle, ArrowRight, ArrowLeft, Loader2, Info, CreditCard, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SubmissionPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [apcAmount, setApcAmount] = useState(150);
  
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    discipline: 'Humanities'
  });
  
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Optionally fetch active APC from settings
    api.get('/api/admin/stats').then(res => {
       // Mock or real: if (res.data.settings?.apc_amount) setApcAmount(res.data.settings.apc_amount);
    }).catch(() => {});
  }, []);

  const handleMetadataSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/submissions', formData);
      setSubmissionId(data.submission_id);
      setStep(2); // Move to Payment
      toast.success('Metadata saved. Please proceed to payment.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save metadata');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitializePayment = async () => {
    setIsLoading(true);
    try {
      // In a real scenario, we'd redirect to Paystack
      // For this workflow demo, we call the initialize endpoint
      const { data } = await api.post('/api/payments/initialize', {
        submission_id: submissionId,
        amount: apcAmount,
        email: JSON.parse(localStorage.getItem('user'))?.email // Get user email from local storage
      });
      
      if (data.data?.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        // MOCK SUCCESS for dev environments where Paystack isn't connected
        toast.success('Payment System Initialized (Mocking Success for Dev)');
        // In dev, we can manually "verify" to move to next step if we want, 
        // but here we expect the user to eventually come back from Paystack.
        // For the sake of the wizard UI during implementation:
        setStep(3); 
      }
    } catch (err) {
      toast.error('Payment initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select a file');
    
    setIsLoading(true);
    const uploadData = new FormData();
    uploadData.append('manuscript', file);
    
    try {
      await api.post(`/api/submissions/${submissionId}/upload`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStep(4);
      toast.success('Submission completed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed. Ensure payment was processed.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, label: 'Metadata', icon: FileText },
    { id: 2, label: 'APC Payment', icon: CreditCard },
    { id: 3, label: 'Manuscript', icon: Upload },
    { id: 4, label: 'Complete', icon: CheckCircle },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Simplified Progress Stepper */}
        <div className="flex items-center justify-between mb-16 max-w-3xl mx-auto relative px-10">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-200 -translate-y-1/2 -z-0"></div>
           <div className={`absolute top-1/2 left-0 h-1 bg-brand-800 -translate-y-1/2 transition-all duration-500 -z-0`} 
                style={{ width: `${(step - 1) * 33.33}%` }}></div>
           
           {steps.map(s => (
             <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                  step >= s.id ? 'bg-brand-800 text-white shadow-lg' : 'bg-white text-neutral-400 border-2 border-neutral-100'
                }`}>
                  {step > s.id ? <CheckCircle size={20} /> : <s.icon size={20} />}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-black mt-3 ${step >= s.id ? 'text-brand-800' : 'text-neutral-300'}`}>
                  {s.label}
                </span>
             </div>
           ))}
        </div>

        <section className="bg-white rounded-[4rem] p-10 md:p-20 shadow-card border border-brand-50 overflow-hidden min-h-[600px] flex flex-col relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-12">
                  <h2 className="text-4xl font-serif font-bold text-brand-900 mb-2">Manuscript Ledger</h2>
                  <p className="text-neutral-400 italic font-medium">Step 1: Define your research metadata.</p>
                </div>
                
                <form onSubmit={handleMetadataSubmit} className="space-y-10 flex-grow">
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-brand-800 uppercase tracking-widest ml-1">Research Title</label>
                    <textarea 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      rows={2}
                      className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-3xl focus:ring-4 focus:ring-brand-500/10 outline-none resize-none font-serif text-2xl font-bold text-brand-900 shadow-inner"
                      placeholder="Enter the full title..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="block text-xs font-black text-brand-800 uppercase tracking-widest ml-1">Discipline</label>
                        <select 
                          value={formData.discipline}
                          onChange={(e) => setFormData({...formData, discipline: e.target.value})}
                          className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[2rem] focus:ring-4 focus:ring-brand-500/10 outline-none appearance-none font-bold text-brand-800 shadow-inner"
                        >
                          <option>Humanities</option>
                          <option>Social Sciences</option>
                          <option>Education</option>
                          <option>Pure Sciences</option>
                          <option>Applied Sciences</option>
                        </select>
                     </div>
                     <div className="space-y-4">
                        <label className="block text-xs font-black text-brand-800 uppercase tracking-widest ml-1">Keywords</label>
                        <input 
                          required
                          value={formData.keywords}
                          onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                          className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[2rem] focus:ring-4 focus:ring-brand-500/10 outline-none font-bold text-brand-800 shadow-inner"
                          placeholder="e.g. AI, Education"
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-black text-brand-800 uppercase tracking-widest ml-1">Abbreviated Abstract</label>
                    <textarea 
                      required
                      value={formData.abstract}
                      onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                      rows={5}
                      className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-3xl focus:ring-4 focus:ring-brand-500/10 outline-none resize-none text-sm leading-loose font-medium text-neutral-600 shadow-inner"
                      placeholder="Maximum 250 words..."
                    />
                  </div>

                  <div className="pt-8 flex justify-end">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="group px-14 py-5 bg-brand-900 hover:bg-brand-800 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center space-x-4 transition-all shadow-2xl hover:-translate-y-1 disabled:opacity-50"
                    >
                      <span>{isLoading ? 'Saving Metadata...' : 'Proceed to Payment'}</span>
                      {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full items-center justify-center text-center"
              >
                <div className="w-24 h-24 bg-accent-100 rounded-[2rem] flex items-center justify-center text-accent-600 mb-8 shadow-inner">
                   <CreditCard size={48} />
                </div>
                <h2 className="text-4xl font-serif font-bold text-brand-900 mb-4">Article Processing Charge</h2>
                <p className="text-neutral-500 max-w-sm mb-12 font-medium">To maintain open-access publication standards, an APC of <strong>${apcAmount}</strong> is required before manuscript upload.</p>
                
                <div className="bg-brand-50 p-10 rounded-[3rem] border border-brand-100 w-full max-w-md mb-12 shadow-sm">
                   <div className="flex justify-between items-center mb-6 pb-6 border-b border-brand-100">
                      <span className="text-xs font-black uppercase text-brand-400 tracking-widest">Publication Fee</span>
                      <span className="text-2xl font-serif font-black text-brand-900">${apcAmount}.00</span>
                   </div>
                   <div className="flex items-start space-x-3 text-left">
                      <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={16} />
                      <p className="text-[10px] text-brand-700 font-bold italic leading-relaxed">Secure payment processed via Paystack. Funds are only confirmed once the bank provides the cryptographic reference.</p>
                   </div>
                </div>

                <div className="flex flex-col w-full max-w-sm space-y-4">
                  <button 
                    onClick={handleInitializePayment}
                    disabled={isLoading}
                    className="w-full bg-accent-500 hover:bg-accent-600 text-brand-900 py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                  >
                     <CreditCard size={20} />
                     <span>{isLoading ? 'Redirecting...' : 'Pay Now via Paystack'}</span>
                  </button>
                  <button 
                    onClick={() => setStep(3)} // MOCK OPTION FOR DEV - REMOVE IN PROD
                    className="text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:text-brand-800 transition-colors"
                  >
                    (Simulator: Skip to Upload)
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full items-center justify-center text-center"
              >
                <div className="mb-12">
                   <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100 mb-6">
                      <ShieldCheck size={12} /> <span>Payment Verified</span>
                   </div>
                   <h2 className="text-4xl font-serif font-bold text-brand-900 mb-2">Final Manuscript Upload</h2>
                   <p className="text-neutral-400 italic">Financial compliance met. Please provide the final document.</p>
                </div>

                <form onSubmit={handleFileUpload} className="w-full max-w-xl">
                  <label className="group relative block w-full aspect-[2/1] bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-[3rem] hover:border-brand-500 hover:bg-brand-50 transition-all cursor-pointer overflow-hidden">
                     <input 
                       type="file"
                       accept=".doc,.docx,.pdf"
                       onChange={(e) => setFile(e.target.files[0])}
                       className="hidden"
                     />
                     <div className="absolute inset-x-10 inset-y-0 flex flex-col items-center justify-center">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-neutral-100 mb-6 group-hover:scale-110 transition-transform">
                          <Upload className="text-brand-800" size={48} />
                        </div>
                        {file ? (
                          <div className="flex items-center space-x-2 text-brand-800 font-bold overflow-hidden">
                            <FileText size={20} className="shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-lg font-bold text-neutral-800 mb-1 tracking-tight">Select blind manuscript file</p>
                            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">.doc, .docx, or .pdf (Max 10MB)</p>
                          </div>
                        )}
                     </div>
                  </label>

                  <div className="flex items-center space-x-4 bg-brand-900 p-6 rounded-[2rem] my-10 text-left border border-brand-800 shadow-2xl">
                     <Info className="text-accent-500 flex-shrink-0" size={24} />
                     <p className="text-[11px] font-medium text-brand-200 leading-relaxed italic">
                       Ensure all identifying information has been removed from the properties and text of the file to maintain <strong>Double-Blind Integrity</strong>.
                     </p>
                  </div>

                  <div className="flex justify-between items-center w-full pt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-8 py-4 text-brand-400 font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 hover:text-brand-900 transition-colors"
                    >
                      <ArrowLeft size={16} /> <span>Revise Metadata</span>
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading || !file}
                      className="px-14 py-5 bg-brand-900 hover:bg-brand-800 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl flex items-center space-x-4 transition-all disabled:opacity-50 transform hover:-translate-y-1"
                    >
                      <span>{isLoading ? 'Finalizing...' : 'Submit Manuscript'}</span>
                      {!isLoading && <ArrowRight size={20} />}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full py-10"
              >
                <div className="w-32 h-32 bg-green-100 rounded-[3rem] flex items-center justify-center text-green-600 mb-10 animate-bounce shadow-inner">
                   <CheckCircle size={64} />
                </div>
                <h2 className="text-5xl font-serif font-bold text-brand-900 mb-4">Submission Verified</h2>
                <p className="text-neutral-500 max-w-md mx-auto mb-16 text-lg leading-relaxed italic">
                  Your manuscript and APC payment have been successfully processed. The editorial team will now proceed with the initial screening phase.
                </p>
                <div className="flex space-x-6">
                   <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-12 py-5 bg-brand-900 hover:bg-brand-800 text-white rounded-[2rem] font-bold shadow-2xl transition-all transform hover:-translate-y-1 block"
                   >
                     My Dashboard
                   </button>
                   <button 
                    onClick={() => { setStep(1); setFormData({title:'', abstract:'', keywords:'', discipline:'Humanities'}); setFile(null); }}
                    className="px-12 py-5 bg-white border-2 border-brand-100 text-brand-800 rounded-[2rem] font-bold hover:bg-neutral-50 transition-all block"
                   >
                     Submit New
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default SubmissionPage;
