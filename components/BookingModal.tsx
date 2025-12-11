import React, { useState } from 'react';
import { Venue, Booking } from '../types';
import { X, Calendar, Clock, Users, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ venue, isOpen, onClose, onConfirm }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [duration, setDuration] = useState(4);
  const [guests, setGuests] = useState(50);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const total = venue.pricePerHour * duration;

  const handleBooking = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        venueId: venue.id,
        venueName: venue.name,
        date,
        startTime,
        endTime: `${parseInt(startTime) + duration}:00`,
        totalPrice: total,
        guestCount: guests,
        status: 'confirmed'
      };
      onConfirm(newBooking);
      setIsProcessing(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {step === 3 ? 'Booking Confirmed!' : `Book ${venue.name}`}
          </h2>
          {step !== 3 && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 text-slate-400" size={16} />
                    <select 
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      {[9,10,11,12,13,14,15,16,17,18].map(h => (
                        <option key={h} value={`${h}:00`}>{h}:00</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                  >
                    {[2,4,6,8,10].map(h => (
                      <option key={h} value={h}>{h} hours</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input 
                    type="number" 
                    max={venue.capacity}
                    className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Max capacity: {venue.capacity}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-slate-600">Total</span>
                <span className="text-2xl font-bold text-indigo-600">${total}</span>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!date}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">Order Summary</h3>
                <div className="text-sm text-indigo-700 space-y-1">
                  <p>Venue: {venue.name}</p>
                  <p>Date: {date}</p>
                  <p>Time: {startTime} ({duration} hrs)</p>
                  <p>Guests: {guests}</p>
                  <p className="font-bold pt-2 border-t border-indigo-200 mt-2">Total: ${total}</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-5 bg-slate-200 rounded"></div>
                   <div className="w-8 h-5 bg-slate-200 rounded"></div>
                   <div className="w-8 h-5 bg-slate-200 rounded"></div>
                </div>
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  className="w-full px-3 py-2 border border-slate-200 rounded mb-3 text-sm"
                  defaultValue="4242 4242 4242 4242"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm"
                    defaultValue="12/25"
                  />
                  <input 
                    type="text" 
                    placeholder="CVC" 
                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm"
                    defaultValue="123"
                  />
                </div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing...' : `Pay $${total}`}
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full text-slate-500 hover:text-slate-700 text-sm py-2"
              >
                Back to Details
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">You're all set!</h3>
              <p className="text-slate-500 mb-6">A confirmation email has been sent to you.</p>
              <button 
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
