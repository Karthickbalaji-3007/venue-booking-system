import React, { useEffect, useState } from 'react';
import { Booking } from '../types';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

export const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <CalendarDays className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No bookings yet</h3>
          <p className="text-slate-500 mt-1">Start exploring venues to make your first booking.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {booking.status}
                  </span>
                  <span className="text-slate-400 text-xs">#{booking.id}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{booking.venueName}</h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-slate-600 text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} className="text-indigo-500" />
                    {booking.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-indigo-500" />
                    {booking.startTime} - {booking.endTime}
                  </div>
                </div>
              </div>
              <div className="text-right w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-2xl font-bold text-indigo-600">${booking.totalPrice}</div>
                <div className="text-slate-400 text-sm">{booking.guestCount} guests</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
