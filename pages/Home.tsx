import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Zap } from 'lucide-react';
import { EVENTS } from '../constants';
import { AppRoute } from '../types';

interface HomeProps {
  onNavigate: (route: AppRoute, eventId?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Techno', 'House', 'Rooftop', 'Hip-Hop', 'Indie'];

  const filteredEvents = activeFilter === 'All' 
    ? EVENTS 
    : EVENTS.filter(e => e.category === activeFilter);

  return (
    <div className="pb-32 overflow-x-hidden">
      {/* Cyber Hero Section */}
      <motion.div 
        style={{ y: yHero, opacity: opacityHero }}
        className="relative h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden will-change-transform"
      >
        <div className="absolute inset-0 z-0">
            {/* Video Background Mock */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-4 mix-blend-difference">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
             <h1 
                className="glitch-text font-display text-8xl md:text-[10rem] font-black tracking-tighter text-white mb-2 leading-none select-none"
                data-text="RAGE"
             >
                RAGE
             </h1>
          </motion.div>
          
          <p className="font-mono text-neon-cyan/80 text-sm md:text-lg tracking-[0.3em] uppercase mb-8 border-y border-neon-cyan/20 py-4 max-w-2xl mx-auto">
            <span className="animate-pulse">///</span> Neural Link Established <span className="animate-pulse">///</span>
          </p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            <span className="text-[10px] font-mono uppercase tracking-widest writing-vertical-rl">Scroll_Down</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan/0 via-neon-cyan to-neon-cyan/0" />
        </motion.div>
      </motion.div>

      {/* Main Content Interface */}
      <div className="container mx-auto px-4 relative z-20">
        
        {/* Holographic Filter Bar */}
        <div className="sticky top-4 z-40 mb-12">
            <div className="glass-panel p-2 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-2 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transform-gpu">
                {filters.map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`relative px-3 py-2 rounded-lg text-[11px] font-bold font-mono uppercase tracking-wider transition-all whitespace-nowrap overflow-hidden group ${
                                                activeFilter === filter 
                                                ? 'text-black bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.3)]' 
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                            style={{ minWidth: '70px' }}
                                        >
                                            <span className="relative z-10">{filter}</span>
                                            {activeFilter === filter && <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />}
                                        </button>
                ))}
            </div>
        </div>

        {/* Trending Card (Hero Card) */}
        <div className="mb-20 perspective-1000">
            <div className="flex items-center gap-2 mb-4 ml-1">
                <Zap size={16} className="text-neon-pink" />
                <h2 className="text-sm font-bold font-mono text-neon-pink uppercase tracking-widest">System_Highlight</h2>
            </div>
            
            <TiltCard>
                <div 
                onClick={() => onNavigate(AppRoute.EVENT_DETAILS, EVENTS[0].id)}
                className="relative h-[500px] w-full cyber-border bg-[#111] overflow-hidden cursor-pointer group transform-gpu"
                >
                    <div className="absolute inset-0 z-0">
                        <img src={EVENTS[0].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-125 brightness-75 group-hover:brightness-100 will-change-transform" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                    
                    {/* Glitch Overlay on Hover */}
                    <div className="absolute inset-0 bg-neon-cyan/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="flex gap-2 mb-3">
                                    <span className="px-2 py-1 bg-neon-purple text-black text-[10px] font-bold font-mono uppercase border border-neon-purple">{EVENTS[0].category}</span>
                                    <span className="px-2 py-1 border border-neon-green text-neon-green text-[10px] font-bold font-mono uppercase">LIVE NOW</span>
                                </div>
                                <h3 className="font-display text-4xl md:text-6xl font-black text-white mb-4 leading-[0.9] italic uppercase drop-shadow-lg">{EVENTS[0].title}</h3>
                                <div className="flex items-center gap-6 text-gray-300 text-sm font-mono">
                                    <span className="flex items-center gap-2"><Calendar size={14} className="text-neon-cyan"/> Today, 2300 HRS</span>
                                    <span className="flex items-center gap-2"><MapPin size={14} className="text-neon-cyan"/> {EVENTS[0].venue}</span>
                                </div>
                            </div>
                            <button className="group/btn relative px-8 py-4 bg-transparent border border-white/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all overflow-hidden">
                                <span className="relative z-10 font-display font-bold text-white group-hover/btn:text-neon-cyan tracking-widest flex items-center gap-2">
                                    ACCESS <ArrowRight size={16} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </TiltCard>
        </div>

        {/* 3D Grid Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
           {filteredEvents.map((event, i) => (
             <motion.div 
                key={event.id}
                initial={{ opacity: 0, rotateX: -10, y: 30 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ margin: "-50px", amount: 0.2, once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => onNavigate(AppRoute.EVENT_DETAILS, event.id)}
             >
                <TiltCard className="h-full">
                    <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 p-1 flex flex-col group hover:border-neon-purple/50 transition-colors relative transform-gpu">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/50" />

                        <div className="h-48 relative overflow-hidden mb-4">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0 will-change-transform" />
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur font-mono text-neon-cyan text-xs font-bold border border-neon-cyan/30">
                                ₹{event.price}
                            </div>
                        </div>
                        
                        <div className="p-4 pt-0 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] uppercase font-bold text-neon-purple tracking-wider border border-neon-purple/30 px-1">{event.category}</span>
                            </div>
                            <h3 className="font-display font-bold text-2xl mb-2 leading-none uppercase">{event.title}</h3>
                            <p className="text-gray-500 text-xs font-mono mb-4 flex items-center gap-2">
                                <span className="w-1 h-1 bg-neon-green rounded-full animate-pulse"/>
                                {event.venue}
                            </p>
                            
                            <div className="mt-auto border-t border-dashed border-white/10 pt-3 flex justify-between items-center">
                                <div className="text-[10px] text-gray-500 font-mono">
                                    ID: {event.id.padStart(4, '0')}
                                </div>
                                <div className="text-[10px] text-neon-cyan font-bold font-mono">
                                    +{event.attendees} UNITS
                                </div>
                            </div>
                        </div>
                    </div>
                </TiltCard>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

// Optimized 3D Tilt Component logic
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rectRef = useRef<DOMRect | null>(null);

    // Reduced stiffness for smoother feel
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const handleMouseEnter = (e: React.MouseEvent) => {
        // Calculate ONLY on enter, not on every move
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    function handleMouseMove(e: React.MouseEvent) {
        if (!rectRef.current) return;
        
        const { left, top, width, height } = rectRef.current;
        const xPct = (e.clientX - left) / width - 0.5;
        const yPct = (e.clientY - top) / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        rectRef.current = null;
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
}

export default Home;