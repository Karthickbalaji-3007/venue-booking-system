import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, CalendarDays, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Building2 size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Lumina<span className="text-indigo-600">Venues</span></span>
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              Explore
            </Link>
            <Link 
              to="/my-bookings" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/my-bookings') ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              <CalendarDays size={16} />
              <span className="hidden sm:inline">My Bookings</span>
            </Link>
            <div className="ml-2 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-300 transition-colors">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
