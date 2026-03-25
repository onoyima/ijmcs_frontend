import React from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/common/CustomCursor';
import FloatingActions from './components/common/FloatingActions';
import PageLoader from './components/common/PageLoader';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen selection:bg-accent-500 selection:text-brand-900 cursor-none">
      <PageLoader />
      <CustomCursor />
      <FloatingActions />
      <Toaster position="top-right" toastOptions={{
        className: 'font-serif rounded-2xl shadow-2xl border border-brand-50',
        duration: 4000
      }} />
      <Navbar />
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AppRouter />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
