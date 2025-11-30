import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Calendar, MapPin, Clock, Ticket as TicketIcon } from 'lucide-react';
import { EVENTS, MOCK_TICKETS } from '../constants';
import { AppRoute } from '../types';

interface TicketsProps {
  onNavigate: (route: AppRoute) => void;
}

const Tickets: React.FC<TicketsProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 pb-32 px-4 container mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">MY TICKETS</h1>
        <p className="text-gray-400 text-sm">Manage your upcoming nights</p>
      </div>

      <div className="space-y-6">
        {MOCK_TICKETS.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <TicketIcon size={48} className="mx-auto mb-4 text-gray-600" />
            <p>No tickets yet.</p>
            <button 
                onClick={() => onNavigate(AppRoute.HOME)}
                className="mt-4 text-neon-cyan hover:underline"
            >
                Browse Events
            </button>
          </div>
        ) : (
          MOCK_TICKETS.map((ticket, index) => {
            const event = EVENTS.find(e => e.id === ticket.eventId);
            if (!event) return null;

            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl glass-panel border ${
                    ticket.status === 'Upcoming' ? 'border-neon-pink/50 shadow-[0_0_15px_rgba(255,0,153,0.1)]' : 'border-white/5 opacity-70 grayscale-[0.5]'
                }`}
              >
                {/* Status Badge */}
                <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl border-l border-b ${
                    ticket.status === 'Upcoming' 
                        ? 'bg-neon-pink text-black border-neon-pink' 
                        : 'bg-gray-800 text-gray-400 border-gray-700'
                }`}>
                    {ticket.status}
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Event Image Segment */}
                    <div className="h-32 md:h-auto md:w-1/3 relative">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Ticket Details Segment */}
                    <div className="p-6 md:w-2/3 flex flex-col justify-between relative">
                        {/* Decorative jagged line for ticket stub effect */}
                        <div className="absolute top-0 left-0 w-full md:w-px md:h-full bg-[linear-gradient(to_right,transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[size:10px_100%] md:bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.1)_50%)] md:bg-[size:100%_10px]" />

                        <div>
                            <h3 className="font-display font-bold text-xl mb-1">{event.title}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
                                <span className="flex items-center gap-1"><Calendar size={14} className="text-neon-cyan"/> {new Date(event.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><Clock size={14} className="text-neon-cyan"/> {event.time}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} className="text-neon-cyan"/> {event.venue}</span>
                            </div>
                            
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase">Ticket Type</p>
                                    <p className="font-bold text-neon-purple">{ticket.tierName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase">Quantity</p>
                                    <p className="font-bold">{ticket.quantity}</p>
                                </div>
                            </div>
                        </div>

                        {ticket.status === 'Upcoming' && (
                            <div className="mt-2 flex items-center justify-between">
                                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">
                                    <QrCode size={16} /> SHOW QR
                                </button>
                                <span className="text-[10px] font-mono text-gray-500">ID: {ticket.id}</span>
                            </div>
                        )}
                    </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Tickets;