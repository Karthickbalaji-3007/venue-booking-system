import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { VenueDetails } from './pages/VenueDetails';
import { MyBookings } from './pages/MyBookings';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
        
        <footer className="bg-white border-t border-slate-200 mt-auto py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Lumina Venues. All rights reserved.</p>
            <p className="mt-2">Powered by Google Gemini</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
