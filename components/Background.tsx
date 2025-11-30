import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020202] pointer-events-none perspective-1000">
      
      {/* Moving Grid Floor */}
      <div 
        className="absolute bottom-[-50%] left-[-50%] w-[200%] h-[100%] bg-[linear-gradient(to_right,rgba(176,38,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,243,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{
            transform: 'perspective(500px) rotateX(60deg)',
            opacity: 0.4
        }}
      >
         <motion.div 
            className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"
            animate={{ backgroundPosition: ['0px 0px', '0px 40px'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
         />
      </div>

      {/* Animated Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[150px] animate-blob mix-blend-screen" />
      <div className="absolute bottom-[0%] right-[-10%] w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-150 contrast-150 mix-blend-overlay" />
      
      {/* Fog */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
};

export default Background;