import React from 'react';
import { Venue } from '../types';
import { Star, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VenueCardProps {
  venue: Venue;
  isRecommended?: boolean;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, isRecommended }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`group bg-white rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer relative hover:shadow-xl ${isRecommended ? 'border-indigo-400 shadow-indigo-100 ring-2 ring-indigo-100' : 'border-slate-200 shadow-sm hover:-translate-y-1'}`}
      onClick={() => navigate(`/venue/${venue.id}`)}
    >
      {isRecommended && (
        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg">
          AI Match
        </div>
      )}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={venue.imageUrl} 
          alt={venue.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white font-medium text-sm flex items-center gap-1">
            <MapPin size={14} /> {venue.location}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{venue.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-semibold text-slate-700">{venue.rating}</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
          {venue.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center text-slate-500 text-sm">
            <Users size={16} className="mr-1" />
            <span>Up to {venue.capacity}</span>
          </div>
          <div className="text-right">
             <span className="text-lg font-bold text-indigo-600">${venue.pricePerHour}</span>
             <span className="text-slate-400 text-xs">/hr</span>
          </div>
        </div>
      </div>
    </div>
  );
};
