import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { Search, Loader2, FileText, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const { data } = await api.get(`/api/articles/search?q=${query}`);
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-6 text-brand-800">Global Search</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Discover research across all volumes and disciplines within the IJMCS ecosystem.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-accent-500 rounded-3xl blur-[20px] opacity-0 group-focus-within:opacity-20 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl shadow-xl flex items-center p-2 border border-brand-100">
               <Search className="ml-6 text-brand-300" size={24} />
               <input 
                 type="text"
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="Search by title, keywords, or author..."
                 className="flex-grow bg-transparent border-none focus:ring-0 px-6 py-4 text-lg text-brand-900 placeholder-neutral-400"
               />
               <button 
                type="submit"
                disabled={loading}
                className="bg-brand-800 hover:bg-brand-700 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center space-x-2 disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" size={20} /> : <span>Search</span>}
               </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {!hasSearched ? (
            <div className="text-center py-20 opacity-40">
               <Filter size={64} className="mx-auto mb-6 text-brand-100" />
               <p className="text-xl font-serif">Enter a keyword to explore the archives</p>
            </div>
          ) : loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-white rounded-3xl animate-pulse shadow-sm"></div>
            ))
          ) : results.length === 0 ? (
            <div className="bg-white p-20 rounded-[3rem] text-center shadow-card border border-brand-50">
              <h3 className="text-2xl font-serif font-bold text-brand-800 mb-2">No Results Found</h3>
              <p className="text-neutral-500">Try different keywords or browse our <Link to="/archives" className="text-accent-500 underline">archives</Link>.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center px-4 mb-4">
                 <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">{results.length} results found</p>
              </div>
              {results.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-8 rounded-3xl shadow-card border border-brand-50 hover:border-brand-300 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-6 justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-[10px] bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
                          Vol. {article.volume} No. {article.number}
                        </span>
                        <span className="text-neutral-300 text-xs">|</span>
                        <span className="text-neutral-400 text-xs">{new Date(article.published_at).getFullYear()}</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-brand-900 mb-2 leading-tight group-hover:text-accent-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-brand-600 font-bold mb-4">{article.first_name} {article.last_name}</p>
                      <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                        {article.abstract}
                      </p>
                    </div>
                    <Link 
                      to={`/article/${article.id}`}
                      className="flex-shrink-0 self-center md:self-stretch flex items-center justify-center w-12 h-12 md:w-16 md:h-full bg-brand-50 rounded-2xl text-brand-800 hover:bg-brand-100 transition-colors"
                    >
                      <ChevronRight size={28} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
