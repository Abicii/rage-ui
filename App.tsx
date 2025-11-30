import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import PromoterDashboard from './pages/PromoterDashboard';
import Tickets from './pages/Tickets';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(AppRoute.HOME);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Simple hash router mock
  const handleNavigate = (newRoute: AppRoute, eventId?: string) => {
    setRoute(newRoute);
    if (eventId) setSelectedEventId(eventId);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-neon-cyan selection:text-black">
      <Background />
      
      <main>
        {route === AppRoute.HOME && <Home onNavigate={handleNavigate} />}
        {route === AppRoute.EVENT_DETAILS && <EventDetails eventId={selectedEventId} onNavigate={handleNavigate} />}
        {route === AppRoute.PROMOTER && <PromoterDashboard onNavigate={handleNavigate} />}
        {route === AppRoute.TICKETS && <Tickets onNavigate={handleNavigate} />}
      </main>

      <Navbar currentRoute={route} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;