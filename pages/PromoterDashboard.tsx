import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Users, Ticket, Wallet, TrendingUp } from 'lucide-react';
import { PROMOTER_DATA } from '../constants';
import { AppRoute } from '../types';

interface PromoterDashboardProps {
    onNavigate: (route: AppRoute) => void;
}

const PromoterDashboard: React.FC<PromoterDashboardProps> = () => {
  return (
    <div className="pt-20 pb-32 px-4 container mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">DASHBOARD</h1>
        <p className="text-gray-400 text-sm">Welcome back, <span className="text-white font-bold">Alex</span></p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
            icon={<Users className="text-neon-cyan" />} 
            label="Total Views" 
            value="12.5k" 
            change="+12%" 
        />
        <StatCard 
            icon={<Ticket className="text-neon-purple" />} 
            label="Tickets Sold" 
            value="843" 
            change="+5%" 
        />
        <StatCard 
            icon={<Wallet className="text-neon-pink" />} 
            label="Commission" 
            value="₹42.5k" 
            change="+18%" 
        />
        <StatCard 
            icon={<TrendingUp className="text-green-400" />} 
            label="Conversion" 
            value="6.8%" 
            change="+2.1%" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="font-display font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-neon-cyan rounded-full"/>
                Traffic Overview
            </h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PROMOTER_DATA}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="views" stroke="#00f3ff" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="font-display font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-neon-purple rounded-full"/>
                Revenue
            </h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PROMOTER_DATA}>
                        <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="revenue" fill="#b026ff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Guestlist Manager */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-lg">Active Guestlists</h3>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                + Create New
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-gray-500 text-xs uppercase border-b border-white/10">
                    <tr>
                        <th className="pb-4 pl-2">Event</th>
                        <th className="pb-4">Code</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right pr-2">Entries</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {[
                        { event: 'Neon Horizon', code: 'ALEXVIP', status: 'Active', entries: 42 },
                        { event: 'Skyline Grooves', code: 'SKYALEX', status: 'Full', entries: 20 },
                        { event: 'Bass Temple', code: 'BASSGOD', status: 'Active', entries: 156 },
                    ].map((row, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                            <td className="py-4 pl-2 font-bold">{row.event}</td>
                            <td className="py-4 font-mono text-neon-cyan">{row.code}</td>
                            <td className="py-4">
                                <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${
                                    row.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {row.status}
                                </span>
                            </td>
                            <td className="py-4 text-right pr-2">{row.entries}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; change: string }> = ({ icon, label, value, change }) => (
    <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col items-start gap-2 hover:border-white/20 transition-all">
        <div className="p-2 rounded-lg bg-white/5 mb-1">{icon}</div>
        <p className="text-xs text-gray-500">{label}</p>
        <div className="flex items-end gap-2 w-full justify-between">
            <h4 className="text-xl md:text-2xl font-display font-bold">{value}</h4>
            <span className="text-[10px] text-green-400 mb-1">{change}</span>
        </div>
    </div>
);

export default PromoterDashboard;