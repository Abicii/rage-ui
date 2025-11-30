import React from 'react';
import { Sparkles, Ticket, BarChart3, Hexagon } from 'lucide-react';
import { AppRoute } from '../types';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
      {/* Cyber Dock Container */}
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl cyber-border shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        {/* Glowing Line */}
        <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />

        <div className="flex justify-between items-center relative z-10">
          <NavButton 
            active={currentRoute === AppRoute.HOME} 
            onClick={() => onNavigate(AppRoute.HOME)} 
            icon={<Hexagon size={20} />} 
            label="Feed"
            color="cyan"
          />
          <NavButton 
            active={currentRoute === AppRoute.TICKETS} 
            onClick={() => onNavigate(AppRoute.TICKETS)} 
            icon={<Ticket size={20} />} 
            label="Tix"
            color="pink"
          />
          <NavButton 
            active={currentRoute === AppRoute.PROMOTER} 
            onClick={() => onNavigate(AppRoute.PROMOTER)} 
            icon={<BarChart3 size={20} />} 
            label="Stats"
            color="purple"
          />
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ active, onClick, icon, label, color }: any) => {
    const activeColors: any = {
        cyan: 'text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]',
        pink: 'text-neon-pink drop-shadow-[0_0_8px_rgba(255,0,153,0.8)]',
        purple: 'text-neon-purple drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]'
    };

    return (
        <button
          onClick={onClick}
          className={`relative group flex flex-col items-center justify-center w-16 transition-all duration-300 ${
            active ? activeColors[color] : 'text-gray-500 hover:text-white'
          }`}
        >
          {active && (
              <motion.div 
                layoutId="active-glow"
                className={`absolute inset-0 bg-${color === 'cyan' ? 'neon-cyan' : color === 'pink' ? 'neon-pink' : 'neon-purple'}/10 blur-xl rounded-full`}
              />
          )}
          <div className="relative z-10 transform transition-transform group-hover:-translate-y-1">
            {icon}
          </div>
          <span className="text-[9px] font-mono font-bold mt-1 tracking-widest uppercase opacity-80">
            {label}
          </span>
          {active && <div className={`w-1 h-1 rounded-full mt-1 bg-current`} />}
        </button>
    )
}

export default Navbar;