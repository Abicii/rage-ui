import React, { useState } from 'react';
import { X, CheckCircle, Smartphone, CreditCard, Loader2, ShieldCheck, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event, TicketTier } from '../types';
import { TICKET_TIERS } from '../constants';

interface BookingModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ event, isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const reset = () => {
    setStep(1);
    setSelectedTier(null);
    setQuantity(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={reset}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="relative w-full max-w-lg bg-[#050505] border border-neon-cyan/30 shadow-[0_0_50px_rgba(0,243,255,0.15)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
        >
            {/* Holographic Header */}
            <div className="bg-gradient-to-r from-neon-cyan/20 to-transparent p-1">
                <div className="bg-black/80 p-4 flex justify-between items-center border-b border-neon-cyan/30">
                    <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-neon-cyan animate-pulse" />
                        <h3 className="font-mono text-neon-cyan text-sm tracking-widest uppercase">
                        SECURE_UPLINK :: {step === 1 ? 'SELECTION' : step === 2 ? 'TRANSACTION' : 'COMPLETE'}
                        </h3>
                    </div>
                    <button onClick={reset} className="text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Scanlines inside modal */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-0" />

          <div className="p-8 relative z-10">
            {/* Step 1: Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <div>
                        <p className="font-mono text-[10px] text-gray-500 mb-1">TARGET_EVENT</p>
                        <h2 className="font-display font-bold text-xl uppercase text-white">{event.title}</h2>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-[10px] text-gray-500 mb-1">DATE</p>
                        <p className="font-mono text-neon-purple">{event.date}</p>
                    </div>
                </div>

                <div className="space-y-3">
                  {TICKET_TIERS.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => tier.remaining > 0 && setSelectedTier(tier)}
                      className={`relative p-4 cursor-pointer transition-all duration-200 border border-l-4 ${
                        selectedTier?.id === tier.id 
                          ? 'border-neon-cyan bg-neon-cyan/5 border-l-neon-cyan shadow-[inset_0_0_20px_rgba(0,243,255,0.1)]' 
                          : 'border-white/10 hover:border-white/30 border-l-gray-600'
                      } ${tier.remaining === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold font-display tracking-wide uppercase">{tier.name}</span>
                        <span className="font-mono text-neon-pink">₹{tier.price}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono flex gap-3">
                        {tier.perks.map((perk, i) => (
                            <span key={i}>[{perk}]</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  disabled={!selectedTier}
                  onClick={() => setStep(2)}
                  className="w-full mt-4 bg-neon-cyan text-black font-bold font-display py-4 uppercase tracking-[0.2em] hover:bg-white hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all clip-path-slant disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                  Initiate Checkout
                </button>
              </div>
            )}

            {/* Step 2: Payment Mock */}
            {step === 2 && selectedTier && (
              <div className="space-y-6">
                 <div className="border border-white/10 p-4 bg-white/5 font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ITEM_REF</span>
                      <span className="text-white">{selectedTier.name} :: QTY {quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">BASE_COST</span>
                      <span className="text-neon-cyan">₹{selectedTier.price * quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">NET_FEE</span>
                      <span className="text-neon-cyan">₹50</span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between text-base font-bold">
                      <span>TOTAL_DEBIT</span>
                      <span className="text-neon-pink">₹{(selectedTier.price * quantity) + 50}</span>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">SELECT_PROTOCOL</h4>
                    <button className="w-full flex items-center justify-between p-4 border border-neon-cyan/50 bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-all">
                      <div className="flex items-center gap-3">
                        <Smartphone className="text-neon-cyan" size={18} />
                        <span className="font-bold font-mono text-sm">UPI_INTERFACE</span>
                      </div>
                      <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-white/10 opacity-40 cursor-not-allowed">
                       <div className="flex items-center gap-3">
                        <CreditCard size={18} />
                        <span className="font-mono text-sm">CREDIT_LINK</span>
                      </div>
                    </button>
                 </div>

                 <button
                  onClick={handleBook}
                  disabled={isProcessing}
                  className="w-full bg-neon-purple text-white font-bold font-display py-4 uppercase tracking-[0.2em] hover:bg-purple-600 hover:shadow-[0_0_30px_rgba(176,38,255,0.6)] transition-all flex items-center justify-center gap-3"
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                  {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" /> PROCESSING...
                      </>
                  ) : (
                      <>
                        CONFIRM_TRANSACTION <ShieldCheck size={18} />
                      </>
                  )}
                </button>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center py-8 space-y-6">
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-24 h-24 rounded-full border-2 border-neon-green flex items-center justify-center shadow-[0_0_30px_rgba(10,255,10,0.3)] bg-neon-green/10"
                >
                  <CheckCircle size={48} className="text-neon-green" />
                </motion.div>
                
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-display font-black text-white tracking-wider">ACCESS GRANTED</h2>
                  <p className="font-mono text-xs text-gray-400">ENCRYPTED TICKET SENT TO NEURAL INBOX</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 animate-scan pointer-events-none" />
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RAGE-TICKET-${Math.random().toString(36).substring(7)}`} 
                    alt="QR Code" 
                    className="w-32 h-32 mix-blend-multiply" 
                  />
                </div>

                <p className="text-[10px] font-mono text-neon-green animate-pulse">/// READY FOR ENTRY ///</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;