import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, FileText, Send, User, LogOut, Menu, X, 
  Shield, CreditCard, History, MessageSquare, Settings, 
  BookOpen, Users, Bell, ChevronRight, Globe, BarChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 group ${
      active 
        ? 'bg-accent-500 text-white shadow-lg shadow-accent-900/20' 
        : 'text-brand-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} className={active ? 'text-white' : 'text-brand-400 group-hover:text-accent-500'} />
    <span className="font-bold text-sm">{label}</span>
    {active && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-white rounded-full ml-auto" />}
  </Link>
);

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = {
    admin: [
      { icon: LayoutDashboard, label: 'Admin Overview',    path: '/admin?tab=overview' },
      { icon: FileText,        label: 'Submitted Papers', path: '/editor/control' },
      { icon: BookOpen,        label: 'Issue Manager',    path: '/editor/issues' },
      { icon: Users,           label: 'Scholars',         path: '/admin?tab=users' },
      { icon: CreditCard,      label: 'Finances',         path: '/admin?tab=payments' },
      { icon: History,         label: 'Audit Trail',      path: '/admin?tab=audit' },
      { icon: BarChart,        label: 'My Metrics',       path: '/dashboard' },
      { icon: Send,            label: 'Submit Paper',     path: '/submit' },
    ],
    editor: [
      { icon: Shield,         label: 'Control Panel',   path: '/editor/control' },
      { icon: BarChart,        label: 'My Metrics',       path: '/dashboard' },
      { icon: Send,            label: 'Submit Paper',     path: '/submit' },
      { icon: BookOpen,       label: 'Issue Manager',   path: '/editor/issues' },
    ],
    reviewer: [
      { icon: LayoutDashboard, label: 'My Dashboard',     path: '/dashboard' },
      { icon: Send,            label: 'Submit Paper',     path: '/submit' },
      { icon: FileText,       label: 'Review Queue',    path: '/dashboard' },
    ],
    author: [
      { icon: LayoutDashboard, label: 'My Dashboard',     path: '/dashboard' },
      { icon: Send,            label: 'New Submission',  path: '/submit' },
    ]
  };

  const commonItems = [
    { icon: User, label: 'Profile Settings', path: '/profile' },
  ];

  const currentRoleItems = menuItems[user?.role] || menuItems.author;

  return (
    <div className="flex min-h-screen bg-neutral-50 relative">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-brand-900 text-white rounded-full shadow-2xl"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-brand-900 text-white fixed top-0 bottom-0 left-0 z-40 border-r border-brand-800">
        <div className="p-10">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center font-serif text-2xl font-black text-white">I</div>
            <div>
              <span className="block text-xl font-serif font-bold text-white tracking-tight leading-none">IJMCS</span>
              <span className="block text-[8px] text-brand-400 uppercase tracking-widest mt-1">Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-2 mt-4 overflow-y-auto">
          <div className="px-6 mb-4 text-[10px] font-black text-brand-600 uppercase tracking-[0.2em]">Dashboard Menu</div>
          {currentRoleItems.map(item => (
            <SidebarItem 
              key={item.label} 
              {...item} 
              active={location.pathname + location.search === item.path || (location.pathname === item.path && item.path === '/admin?tab=overview')} 
            />
          ))}
          
          <div className="px-6 py-6 mt-8 border-t border-brand-800">
             <div className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-4">Account</div>
             {commonItems.map(item => (
                <SidebarItem 
                  key={item.label} 
                  {...item} 
                  active={location.pathname === item.path} 
                />
             ))}
             <button
               onClick={handleLogout}
               className="flex items-center space-x-3 px-6 py-4 w-full rounded-2xl text-red-400 hover:bg-red-500/10 transition-colors mt-2"
             >
               <LogOut size={20} />
               <span className="font-bold text-sm">Sign Out</span>
             </button>
          </div>
        </nav>

        <div className="p-8 bg-brand-950/50">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center text-accent-500 font-bold">
                {user?.first_name?.charAt(0)}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-bold truncate text-white">{user?.first_name} {user?.last_name}</p>
                <p className="text-[10px] text-brand-400 uppercase font-black tracking-widest">{user?.role}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] bg-brand-900 z-[60] lg:hidden shadow-2xl p-8 overflow-y-auto"
            >
               <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center font-serif text-2xl font-black text-white">I</div>
                    <span className="text-2xl font-serif font-black text-white">IJMCS Menu</span>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-white/5 rounded-xl text-white"><X size={24} /></button>
               </div>
               
               <nav className="space-y-4">
                  {currentRoleItems.map(item => (
                    <SidebarItem 
                      key={item.label} 
                      {...item} 
                      active={location.pathname === item.path} 
                      onClick={() => setIsSidebarOpen(false)}
                    />
                  ))}
                  <div className="h-px bg-brand-800 my-8" />
                  {commonItems.map(item => (
                    <SidebarItem 
                      key={item.label} 
                      {...item} 
                      active={location.pathname === item.path} 
                      onClick={() => setIsSidebarOpen(false)}
                    />
                  ))}
                   <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-6 py-4 w-full rounded-2xl text-red-400 hover:bg-red-500/10 transition-colors mt-2"
                  >
                    <LogOut size={20} />
                    <span className="font-bold text-sm">Sign Out</span>
                  </button>
               </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main className="flex-grow lg:ml-72 min-h-screen">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
