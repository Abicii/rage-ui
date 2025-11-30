import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Share2, MapPin, Clock, Calendar, ShieldCheck, Music2, Cpu } from 'lucide-react';
import { AppRoute, Event } from '../types';
import { EVENTS } from '../constants';
import BookingModal from '../components/BookingModal';

interface EventDetailsProps {
  eventId: string | null;
  onNavigate: (route: AppRoute) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, onNavigate }) => {
  const [showBooking, setShowBooking] = useState(false);
  const event = EVENTS.find(e => e.id === eventId) || EVENTS[0];
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 200]);

    React.useEffect(() => {
        // Hide navbar when EventDetails is mounted
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.style.display = 'none';
        return () => {
            if (navbar) navbar.style.display = '';
        };
    }, []);

    return (
        <div className="min-h-screen bg-black pb-32 overflow-x-hidden">
       <BookingModal 
        event={event} 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)} 
       />

      {/* Parallax Header */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <motion.div style={{ y: yBg }} className="absolute inset-0">
             <img src={event.image} alt={event.title} className="w-full h-full object-cover filter brightness-75 contrast-125" />
        </motion.div>
        
        {/* Navigation Overlays */}
        <div className="absolute top-0 left-0 w-full p-6 z-30 flex justify-between items-center">
            <button 
                onClick={() => onNavigate(AppRoute.HOME)}
                className="w-12 h-12 flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md hover:bg-neon-cyan/20 hover:border-neon-cyan transition-all clip-path-slant"
                style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)' }}
            >
                <ArrowLeft size={20} className="text-white" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-white/20 bg-black/50 backdrop-blur-md hover:bg-neon-pink/20 hover:border-neon-pink transition-all clip-path-slant"
               style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)' }}
            >
                <Share2 size={20} className="text-white" />
            </button>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-10" />
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="flex flex-col md:flex-row gap-12">
            
            {/* Main Info */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 border border-neon-cyan text-neon-cyan text-[10px] font-bold font-mono tracking-widest uppercase bg-neon-cyan/10">
                        Verified Event
                    </span>
                    <span className="w-full h-[1px] bg-gradient-to-r from-neon-cyan/50 to-transparent" />
                </div>
                
                <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight text-white uppercase tracking-tighter mix-blend-difference glitch-text" data-text={event.title}>
                    {event.title}
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                     <InfoCard icon={<Calendar size={18} />} label="Date" value={new Date(event.date).toLocaleDateString()} />
                     <InfoCard icon={<Clock size={18} />} label="Time" value={`${event.time} HRS`} />
                     <InfoCard icon={<MapPin size={18} />} label="Sector" value={event.venue} />
                </div>

                <div className="border-l-2 border-neon-purple pl-6 py-2 mb-12">
                    <h3 className="font-mono text-neon-purple font-bold text-sm mb-4 uppercase tracking-widest">/// Mission Brief</h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-lg font-light">
                        {event.description}
                        <br/><br/>
                        <span className="text-white font-bold">WARNING:</span> High intensity audio-visual experience. Strobe lights in effect.
                    </p>
                </div>

                <div className="space-y-4 mb-32">
                    <h3 className="font-mono text-gray-500 font-bold text-xs uppercase tracking-widest mb-4">/// Audio Interface</h3>
                    {['Headliner: ASTRIX', 'Support: BULLZEYE', 'Opening: ALYSSA'].map((artist, i) => (
                        <div key={i} className="group relative overflow-hidden bg-white/5 border border-white/10 p-4 flex items-center gap-4 hover:border-neon-cyan/50 transition-all">
                             <div className="absolute inset-0 bg-neon-cyan/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                            <div className="relative z-10 w-12 h-12 bg-black flex items-center justify-center border border-white/20">
                                <Music2 size={20} className="text-gray-400 group-hover:text-neon-cyan"/>
                            </div>
                            <span className="relative z-10 font-display font-bold tracking-wide text-lg">{artist}</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <Cpu size={16} className="text-neon-cyan animate-spin-slow" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cyber Sidebar */}
            <div className="fixed md:sticky bottom-4 left-4 right-4 md:left-auto md:right-auto md:top-24 md:w-96 md:h-fit z-50 md:z-10">
                                <div
                                    className="bg-[#111]/90 backdrop-blur-xl border border-neon-cyan/30 p-1 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                                    style={{
                                        clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
                                        marginBottom: 'env(safe-area-inset-bottom)',
                                    }}
                                >
                    <div className="border border-white/5 p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover">
                        <div className="flex justify-between items-end mb-6 border-b border-dashed border-white/20 pb-4">
                            <div>
                                <p className="font-mono text-[10px] text-gray-400 uppercase">Entry_Fee</p>
                                <p className="text-3xl font-display font-bold text-white">₹{event.price}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-neon-green text-[10px] font-mono font-bold uppercase mb-1">
                                    <ShieldCheck size={12} /> Secure
                                </div>
                                <p className="text-[10px] text-gray-500 font-mono">Ver 2.4.0</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setShowBooking(true)}
                            className="group relative w-full overflow-hidden bg-white text-black font-display font-black text-xl py-4 uppercase tracking-widest hover:text-white transition-colors"
                            style={{ position: 'relative', zIndex: 10 }}
                        >
                            <span className="relative z-10">INITIALIZE</span>
                            <div className="absolute inset-0 bg-neon-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }: any) => (
    <div className="bg-white/5 border border-white/10 p-4 flex flex-col gap-1 hover:bg-white/10 transition-colors">
        <div className="text-neon-cyan mb-2">{icon}</div>
        <p className="text-[10px] font-mono uppercase text-gray-500">{label}</p>
        <p className="font-display font-bold text-sm tracking-wide">{value}</p>
    </div>
)

export default EventDetails;