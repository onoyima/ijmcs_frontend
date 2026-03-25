import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    journal: [
      { name: 'About the Journal', path: '/about' },
      { name: 'Editorial Team', path: '/editorial-team' },
      { name: 'Aims & Scope', path: '/aims-and-scope' },
      { name: 'Indexing', path: '/indexing' },
    ],
    policies: [
      { name: 'APC Policy', path: '/apc-policy' },
      { name: 'Open Access', path: '/open-access' },
      { name: 'Ethics Policy', path: '/ethics' },
      { name: 'Privacy Statement', path: '/privacy' },
    ],
    resources: [
      { name: 'Instructions for Authors', path: '/instructions' },
      { name: 'How to Pay', path: '/how-to-pay' },
      { name: 'Announcements', path: '/announcements' },
      { name: 'Contact Us', path: '/contact' },
    ]
  };

  return (
    <footer className="bg-brand-900 text-brand-100 pt-16 pb-8 border-t border-brand-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center font-serif text-2xl font-bold text-white">
                I
              </div>
              <div>
                <span className="block text-xl font-serif font-bold text-white tracking-tight">IJMCS</span>
                <span className="block text-[10px] text-brand-400 uppercase tracking-widest">Lagos State University</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-brand-300 mb-6">
              Igniting Journal of Multidisciplinary and Contemporary Studies (IJMCS) is an international, peer-reviewed, open-access journal dedicated to advancing knowledge across diverse disciplines.
            </p>
            <div className="flex flex-col space-y-3">
              <a href="mailto:journal.ignitingmultidisciplinary@lasu.edu.ng" className="flex items-center text-sm hover:text-white transition-colors">
                <Mail size={16} className="mr-3 text-accent-500" />
                journal.ignitingmultidisciplinary@lasu.edu.ng
              </a>
              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-3 text-accent-500 flex-shrink-0" />
                <span>Faculty of Arts, Lagos State University, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6 text-lg">Journal Info</h4>
            <ul className="space-y-4">
              {footerLinks.journal.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-accent-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-700 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold mb-6 text-lg">Policies</h4>
            <ul className="space-y-4">
              {footerLinks.policies.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-accent-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-700 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold mb-6 text-lg">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-accent-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-700 rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-800 text-center text-xs text-brand-500 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>© {currentYear} IJMCS | Lagos State University. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-brand-300">Privacy Policy</Link>
            <Link to="/ethics" className="hover:text-brand-300">Ethics</Link>
            <a href="https://lasu.edu.ng" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-brand-300">
              lasu.edu.ng <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
