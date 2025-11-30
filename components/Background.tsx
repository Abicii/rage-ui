import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020202] pointer-events-none perspective-1000">
      
      {/* Moving Grid Floor - GPU Optimized */}
      <div 
        className="absolute bottom-[-50%] left-[-50%] w-[200%] h-[100%] bg-[size:40px_40px] opacity-40"
        style={{
            backgroundImage: 'linear-gradient(to right, rgba(176,38,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,243,255,0.15) 1px, transparent 1px)',
            transform: 'perspective(500px) rotateX(60deg)',
            willChange: 'transform' // Hint to browser
        }}
      >
         <motion.div 
            className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"
            animate={{ y: [0, 40] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
         />
      </div>

      {/* Animated Blobs - Reduced blur radius for perf & hardware acceleration */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[80px] animate-blob mix-blend-screen translate-z-0" />
      <div className="absolute bottom-[0%] right-[-10%] w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[80px] animate-blob animation-delay-2000 mix-blend-screen translate-z-0" />
      
      {/* Noise Overlay - Static to avoid repaint */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay pointer-events-none" />
      
      {/* Fog - Static */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Background;