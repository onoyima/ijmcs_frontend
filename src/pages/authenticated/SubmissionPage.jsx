import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Upload, FileText, CheckCircle, ArrowRight, ArrowLeft, Loader2, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SubmissionPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    discipline: 'Humanities'
  });
  
  const [file, setFile] = useState(null);

  const handleMetadataSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/submissions', formData);
      setSubmissionId(data.submission_id);
      setStep(2);
      toast.success('Metadata saved. Please upload your manuscript.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save metadata');
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
      setStep(3);
      toast.success('Submission completed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-16 max-w-2xl mx-auto relative px-10">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-200 -translate-y-1/2 -z-0"></div>
           <div className={`absolute top-1/2 left-0 h-1 bg-brand-800 -translate-y-1/2 transition-all duration-500 -z-0`} 
                style={{ width: `${(step - 1) * 50}%` }}></div>
           
           {[1, 2, 3].map(num => (
             <div key={num} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-500 ${
                  step >= num ? 'bg-brand-800 text-white' : 'bg-white text-neutral-400 border-2 border-neutral-200'
                }`}>
                  {step > num ? <CheckCircle size={20} /> : num}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold mt-3 ${step >= num ? 'text-brand-800' : 'text-neutral-400'}`}>
                  {num === 1 ? 'Metadata' : num === 2 ? 'Upload' : 'Complete'}
                </span>
             </div>
           ))}
        </div>

        <section className="bg-white rounded-[3rem] p-10 md:p-16 shadow-card border border-brand-50 overflow-hidden min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-10">
                  <h2 className="text-3xl font-serif font-bold text-brand-800 mb-2">Manuscript Metadata</h2>
                  <p className="text-neutral-500">Provide the essential details of your research.</p>
                </div>
                
                <form onSubmit={handleMetadataSubmit} className="space-y-8 flex-grow">
                  <div>
                    <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-3">Manuscript Title</label>
                    <textarea 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      rows={2}
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none resize-none font-serif text-xl"
                      placeholder="Enter the full title of your research..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-3">Primary Discipline</label>
                        <select 
                          value={formData.discipline}
                          onChange={(e) => setFormData({...formData, discipline: e.target.value})}
                          className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                        >
                          <option>Humanities</option>
                          <option>Social Sciences</option>
                          <option>Education</option>
                          <option>Pure Sciences</option>
                          <option>Applied Sciences</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-3">Keywords (Comma separated)</label>
                        <input 
                          required
                          value={formData.keywords}
                          onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                          className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none"
                          placeholder="e.g. AI, Higher Education, Nigeria"
                        />
                     </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-800 uppercase tracking-widest mb-3">Abstract</label>
                    <textarea 
                      required
                      value={formData.abstract}
                      onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                      rows={6}
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm leading-relaxed"
                      placeholder="Summarize your work in 250 words or less..."
                    />
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="px-12 py-4 bg-brand-800 hover:bg-brand-700 text-white rounded-2xl font-bold flex items-center space-x-3 transition-all shadow-xl disabled:opacity-50"
                    >
                      <span>{isLoading ? 'Saving...' : 'Next Step'}</span>
                      {!isLoading && <ArrowRight size={20} />}
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
                <div className="mb-10 max-w-md">
                  <h2 className="text-3xl font-serif font-bold text-brand-800 mb-2">Upload Manuscript</h2>
                  <p className="text-neutral-500">Submit your work in .doc, .docx, or .pdf format (Max 10MB).</p>
                </div>

                <form onSubmit={handleFileUpload} className="w-full max-w-lg">
                  <label className="group relative block w-full aspect-video bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-[3rem] hover:border-brand-500 hover:bg-brand-50 transition-all cursor-pointer overflow-hidden p-12">
                     <input 
                       type="file"
                       accept=".doc,.docx,.pdf"
                       onChange={(e) => setFile(e.target.files[0])}
                       className="hidden"
                     />
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-neutral-100 mb-6 group-hover:scale-110 transition-transform">
                          <Upload className="text-brand-800" size={48} />
                        </div>
                        {file ? (
                          <div className="flex items-center space-x-2 text-brand-800 font-bold">
                            <FileText size={20} />
                            <span>{file.name}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-lg font-bold text-neutral-800 mb-1">Click or drag to upload</p>
                            <p className="text-xs text-neutral-400">Strictly following the Author Guidelines</p>
                          </>
                        )}
                     </div>
                  </label>

                  <div className="flex items-center space-x-4 bg-accent-50 p-6 rounded-3xl border border-accent-100 my-10 text-left">
                     <Info className="text-accent-600 flex-shrink-0" />
                     <p className="text-xs font-medium text-accent-800 leading-relaxed">
                       Please ensure any identifying information (Author names, institutional affiliations) has been removed from the file to facilitate <strong>Double-Blind Review</strong>.
                     </p>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-8 py-4 text-brand-800 font-bold flex items-center space-x-2"
                    >
                      <ArrowLeft size={20} /> <span>Review Metadata</span>
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading || !file}
                      className="px-12 py-4 bg-brand-800 hover:bg-brand-700 text-white rounded-2xl font-bold flex items-center space-x-3 shadow-xl transition-all disabled:opacity-50"
                    >
                      <span>{isLoading ? 'Uploading...' : 'Final Submission'}</span>
                      {!isLoading && <CheckCircle size={20} />}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full py-10"
              >
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 animate-bounce">
                   <CheckCircle size={64} />
                </div>
                <h2 className="text-4xl font-serif font-bold text-brand-800 mb-4">Submission Received!</h2>
                <p className="text-neutral-500 max-w-md mx-auto mb-12 text-lg leading-relaxed">
                  Your manuscript has been successfully uploaded to the IJMCS ecosystem. Our editorial office will perform a preliminary screening before assigning reviewers.
                </p>
                <div className="flex space-x-4">
                   <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-10 py-4 bg-brand-800 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-xl transition-all"
                   >
                     View My Dashboard
                   </button>
                   <button 
                    onClick={() => { setStep(1); setFormData({title:'', abstract:'', keywords:'', discipline:'Humanities'}); setFile(null); }}
                    className="px-10 py-4 bg-white border border-brand-200 text-brand-800 rounded-2xl font-bold hover:bg-neutral-50 transition-colors"
                   >
                     Submit Another
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
