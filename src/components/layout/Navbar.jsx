import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Send, BookOpen, ShieldCheck, Info, Users, FileText, Gavel, CreditCard, Wallet, Unlock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'journal' or 'policies'

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':  return '/admin';
      case 'editor': return '/editor/control';
      default:       return '/dashboard';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Current Issue', path: '/current' },
    { name: 'Archives', path: '/archives' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Contact', path: '/contact' },
  ];

  const journalLinks = [
    { name: 'About IJMCS', path: '/about', icon: <Info size={16} /> },
    { name: 'Aims & Scope', path: '/aims-and-scope', icon: <BookOpen size={16} /> },
    { name: 'Editorial Team', path: '/editorial-team', icon: <Users size={16} /> },
    { name: 'Editor-in-Chief', path: '/editor-in-chief', icon: <User size={16} /> },
    { name: 'Indexing', path: '/indexing', icon: <Award size={16} /> },
  ];

  const policyLinks = [
    { name: 'Author Guidelines', path: '/instructions', icon: <FileText size={16} /> },
    { name: 'Publication Ethics', path: '/ethics', icon: <Gavel size={16} /> },
    { name: 'APC Policy', path: '/apc-policy', icon: <CreditCard size={16} /> },
    { name: 'How to Pay', path: '/how-to-pay', icon: <Wallet size={16} /> },
    { name: 'Open Access', path: '/open-access', icon: <Unlock size={16} /> },
    { name: 'Privacy Policy', path: '/privacy', icon: <ShieldCheck size={16} /> },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav className="bg-brand-900 border-b border-brand-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img src="/images/ijmcs-logo.png" alt="IJMCS Logo" className="h-14 w-auto object-contain rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] transform group-hover:scale-105 transition-transform duration-300 bg-white p-1" />
              <div className="absolute -inset-1 bg-accent-500 opacity-20 blur-lg rounded-xl group-hover:opacity-40 transition-opacity"></div>
            </div>
            <div className="hidden md:block">
              <span className="block text-2xl font-serif font-black tracking-tighter leading-none">IJMCS</span>
              <span className="block text-[8px] text-accent-500 uppercase font-black tracking-[0.3em] mt-1">Igniting Multidisciplinary Journal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-white/5 ${location.pathname === link.path ? 'text-accent-500' : 'text-brand-100 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdowns */}
            {[
              { id: 'journal', label: 'Journal', links: journalLinks },
              { id: 'policies', label: 'Policies', links: policyLinks }
            ].map((dropdown) => (
              <div 
                key={dropdown.id} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(dropdown.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-white/5 ${activeDropdown === dropdown.id ? 'text-accent-500' : 'text-brand-100 hover:text-white'}`}>
                  <span>{dropdown.label}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === dropdown.id ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === dropdown.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-64 bg-brand-900 border border-brand-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-3 mt-2 backdrop-blur-xl"
                    >
                      {dropdown.links.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.path}
                          className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-medium text-brand-200 hover:text-white hover:bg-white/5 transition-all group"
                        >
                          <span className="text-brand-400 group-hover:text-accent-500 transition-colors">{subLink.icon}</span>
                          <span>{subLink.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Auth Actions */}
            <div className="flex items-center space-x-4 border-l border-brand-800 pl-6 ml-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to={getDashboardPath()}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-brand-100 transition-all border border-brand-700"
                    title="User Dashboard"
                  >
                    <LayoutDashboard size={20} />
                  </Link>
                  <Link 
                    to="/submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-accent-500 hover:bg-accent-400 text-brand-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(245,158,11,0.2)]"
                  >
                    <Send size={14} />
                    <span>Submit</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-3 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <Link to="/login" className="text-sm font-black uppercase tracking-widest text-brand-200 hover:text-white transition-colors">Login</Link>
                  <Link 
                    to="/register" 
                    className="px-6 py-3 bg-accent-500 hover:bg-accent-400 text-brand-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(245,158,11,0.2)]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 bg-white/5 rounded-2xl text-brand-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] bg-brand-900 z-50 lg:hidden shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-serif font-black">IJMCS Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-xl"><X size={20} /></button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase font-black text-brand-500 tracking-[0.2em]">Navigation</h4>
                  {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} className="block text-xl font-serif font-bold text-brand-100 hover:text-accent-500">{link.name}</Link>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-brand-800">
                  <h4 className="text-[10px] uppercase font-black text-brand-500 tracking-[0.2em]">Publication Info</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[...journalLinks, ...policyLinks].map((link) => (
                      <Link key={link.name} to={link.path} className="flex items-center space-x-4 text-brand-200">
                         <span className="p-2 bg-white/5 rounded-lg text-accent-500">{link.icon}</span>
                         <span className="font-bold text-sm">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-12">
                   {user ? (
                     <button onClick={handleLogout} className="w-full py-5 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase tracking-widest border border-red-500/20">Logout</button>
                   ) : (
                     <Link to="/login" className="block w-full py-5 bg-accent-500 text-brand-900 rounded-2xl font-black uppercase tracking-widest text-center">Login to Portal</Link>
                   )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
