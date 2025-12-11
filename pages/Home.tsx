import React, { useState, useEffect } from 'react';
import { Venue, VenueType } from '../types';
import { MOCK_VENUES } from '../constants';
import { VenueCard } from '../components/VenueCard';
import { Search, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';
import { getSmartRecommendations } from '../services/geminiService';

export const Home: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<VenueType | 'All'>('All');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);

  // Simple filter logic
  useEffect(() => {
    let filtered = MOCK_VENUES;

    // Filter by category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(v => v.type === activeFilter);
    }

    // Filter by basic text (fallback if AI not used)
    if (searchQuery && !aiReasoning) {
       const lower = searchQuery.toLowerCase();
       filtered = filtered.filter(v => 
         v.name.toLowerCase().includes(lower) || 
         v.location.toLowerCase().includes(lower) ||
         v.description.toLowerCase().includes(lower)
       );
    }

    setVenues(filtered);
  }, [searchQuery, activeFilter, aiReasoning]);


  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsAiLoading(true);
    setAiReasoning(null);
    setRecommendedIds([]);

    const result = await getSmartRecommendations(searchQuery, MOCK_VENUES);
    
    setIsAiLoading(false);
    setAiReasoning(result.reasoning);
    setRecommendedIds(result.venueIds);

    // Re-sort venues to put recommendations first
    const recommended = MOCK_VENUES.filter(v => result.venueIds.includes(v.id));
    const others = MOCK_VENUES.filter(v => !result.venueIds.includes(v.id));
    setVenues([...recommended, ...others]);
    setActiveFilter('All'); // Reset category filter so we see all relevant results
  };

  const clearAiSearch = () => {
    setAiReasoning(null);
    setRecommendedIds([]);
    setSearchQuery('');
    setVenues(MOCK_VENUES);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Venue background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Find spaces that <span className="text-indigo-400">inspire</span>.
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Book unique venues for your next event. From industrial lofts to garden estates.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
            <form onSubmit={handleAiSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isAiLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-indigo-400 border-t-transparent rounded-full"></div>
                  ) : (
                    <Sparkles className="h-5 w-5 text-indigo-300" />
                  )}
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-white/10 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe your dream venue (e.g., 'Industrial vibe for 50 people')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </form>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
             {['Wedding in Napa', 'Corporate offsite', 'Party with a view'].map(tag => (
               <button 
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-slate-300 transition-colors"
               >
                 {tag}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 w-full sm:w-auto no-scrollbar">
            {['All', ...Object.values(VenueType)].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type as VenueType | 'All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === type 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <SlidersHorizontal size={16} />
            <span>{venues.length} results</span>
          </div>
        </div>

        {/* AI Feedback Banner */}
        {aiReasoning && (
           <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
             <div className="flex gap-4">
               <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 h-fit">
                 <Sparkles size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-indigo-900">AI Concierge Suggestion</h3>
                 <p className="text-indigo-700 text-sm mt-1">{aiReasoning}</p>
               </div>
             </div>
             <button 
              onClick={clearAiSearch}
              className="text-sm text-indigo-600 hover:text-indigo-800 underline whitespace-nowrap"
             >
               Clear Filters
             </button>
           </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard 
              key={venue.id} 
              venue={venue} 
              isRecommended={recommendedIds.includes(venue.id)} 
            />
          ))}
          {venues.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-400">
              <MapPin className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No venues found matching your criteria.</p>
              <button 
                onClick={clearAiSearch}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                View all venues
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
