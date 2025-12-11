import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_VENUES } from '../constants';
import { BookingModal } from '../components/BookingModal';
import { Booking } from '../types';
import { MapPin, Star, Users, Check, ArrowLeft, Wifi, Music, Coffee, Car } from 'lucide-react';

export const VenueDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = MOCK_VENUES.find(v => v.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!venue) {
    return <div className="p-10 text-center">Venue not found</div>;
  }

  const handleBookingConfirm = (booking: Booking) => {
    // In a real app, save to Context or Database
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));
  };

  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('wifi')) return <Wifi size={18} />;
    if (lower.includes('bar') || lower.includes('food') || lower.includes('kitchen')) return <Coffee size={18} />;
    if (lower.includes('music') || lower.includes('sound') || lower.includes('dj')) return <Music size={18} />;
    if (lower.includes('parking') || lower.includes('valet')) return <Car size={18} />;
    return <Check size={18} />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Header */}
      <div className="relative h-[50vh] w-full">
        <img src={venue.imageUrl} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Main Content */}
          <div className="p-8 lg:w-2/3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-slate-900">{venue.name}</h1>
              <div className="flex items-center gap-1 mt-2 sm:mt-0 bg-amber-50 px-3 py-1 rounded-full text-amber-700">
                <Star size={18} fill="currentColor" className="text-amber-500" />
                <span className="font-bold">{venue.rating}</span>
                <span className="text-amber-600/70 text-sm">({venue.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-center text-slate-500 mb-6">
              <MapPin size={18} className="mr-2 text-indigo-500" />
              {venue.location}
              <span className="mx-3 text-slate-300">|</span>
              <Users size={18} className="mr-2 text-indigo-500" />
              Up to {venue.capacity} guests
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">About the space</h2>
              <p className="text-slate-600 leading-relaxed">{venue.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {venue.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg text-indigo-600">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
               <h2 className="text-lg font-semibold text-slate-800 mb-3">Location</h2>
               <div className="h-48 w-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                 {/* Placeholder for a real map */}
                 <span className="flex items-center gap-2">
                    <MapPin /> Map View Disabled in Demo
                 </span>
               </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="bg-slate-50 lg:w-1/3 p-8 border-l border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between mb-6">
                 <span className="text-slate-500 font-medium">Price</span>
                 <div>
                    <span className="text-3xl font-bold text-indigo-600">${venue.pricePerHour}</span>
                    <span className="text-slate-400">/hr</span>
                 </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Check size={16} className="text-green-500" /> Free cancellation (24h)
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Check size={16} className="text-green-500" /> Instant booking confirmation
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Check size={16} className="text-green-500" /> Professional cleaning included
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
            >
              Book Venue
            </button>
          </div>
        </div>
      </div>

      <BookingModal 
        venue={venue} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBookingConfirm}
      />
    </div>
  );
};
