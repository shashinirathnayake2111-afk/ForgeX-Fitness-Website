import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, Dumbbell, Calendar, Trophy, ArrowRight, LogOut, 
  Settings, Bell, Zap, TrendingUp, Flame, Medal, Target, 
  MessageSquare, QrCode, Plus, Users, Sparkles, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const SPARKLINE_DATA = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 45 },
  { day: 'Wed', value: 42 },
  { day: 'Thu', value: 55 },
  { day: 'Fri', value: 58 },
  { day: 'Sat', value: 75 },
  { day: 'Sun', value: 85 },
];

const ActivityRings = () => (
  <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
    {/* Outer Ring: Move (Gold) */}
    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(211,165,35,0.1)" strokeWidth="14" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="#d3a523" strokeWidth="14" strokeDasharray="534" strokeDashoffset="130" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(211,165,35,0.8)]" />
    </svg>
    {/* Middle Ring: Lift (Orange) */}
    <svg className="absolute w-40 h-40 sm:w-48 sm:h-48 transform -rotate-90" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="14" />
      <circle cx="80" cy="80" r="65" fill="none" stroke="#f97316" strokeWidth="14" strokeDasharray="408" strokeDashoffset="150" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
    </svg>
    {/* Inner Ring: Focus (Cyan) */}
    <svg className="absolute w-32 h-32 sm:w-40 sm:h-40 transform -rotate-90" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="14" />
      <circle cx="60" cy="60" r="45" fill="none" stroke="#06b6d4" strokeWidth="14" strokeDasharray="282" strokeDashoffset="40" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
    </svg>
    <div className="absolute flex flex-col items-center justify-center">
      <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
    </div>
  </div>
);

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-[#050505] to-black text-white selection:bg-primary selection:text-black font-sans pb-32">
      <Navbar />
      
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Hero Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary">Top 10% This Week</span>
              </div>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-none">
                G'DAY, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">{user.name.split(' ')[0]}</span>
              </h1>
            </motion.div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-primary/50 overflow-hidden shadow-[0_0_20px_rgba(211,165,35,0.2)]">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" className="w-full h-full bg-white/5" />
              </div>
              <button onClick={() => { logout(); navigate('/'); }} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 transition-all flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* BENTO BOX GRID SYSTEM */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* LARGE BOX: Activity Rings (Spans 4 columns) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="lg:col-span-5 xl:col-span-4 bg-gradient-to-br from-white/[0.08] to-white/[0.01] border border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-2xl shadow-2xl"
            >
              <div className="absolute top-8 left-8 text-left">
                <h3 className="font-heading text-xl tracking-widest uppercase">Forge Core</h3>
                <p className="text-[10px] text-white/50 font-bold tracking-[0.2em] uppercase">Daily Targets</p>
              </div>
              
              <div className="mt-12 mb-8">
                <ActivityRings />
              </div>

              <div className="w-full grid grid-cols-3 gap-2 text-center mt-auto">
                <div>
                  <div className="text-primary font-heading text-2xl">850</div>
                  <div className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Move kcal</div>
                </div>
                <div>
                  <div className="text-orange-500 font-heading text-2xl">12k</div>
                  <div className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Lift kg</div>
                </div>
                <div>
                  <div className="text-cyan-500 font-heading text-2xl">45</div>
                  <div className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Focus min</div>
                </div>
              </div>
            </motion.div>

            {/* TALL BOX: AI Feed (Spans 4 columns) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="lg:col-span-4 bg-gradient-to-b from-primary/[0.15] to-transparent border border-primary/20 rounded-[3rem] p-8 relative overflow-hidden backdrop-blur-2xl shadow-[0_0_40px_rgba(211,165,35,0.1)] flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-heading text-xl tracking-widest uppercase text-primary drop-shadow-md">Forge AI</h3>
                  <p className="text-[10px] text-primary/70 font-bold tracking-[0.2em] uppercase">Live Insights</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="flex flex-col gap-4 overflow-hidden relative flex-1">
                <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-[#0e0e0e] to-transparent z-10 rounded-t-xl" />
                
                {/* AI Messages */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl animate-fade-in-up">
                  <div className="flex gap-3">
                    <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-white/90 leading-relaxed font-light">Your recovery is dipping below 60%. Highly recommend swapping tomorrow's HIIT for a 30m Yoga session.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl opacity-80">
                  <div className="flex gap-3">
                    <Dumbbell className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                    <p className="text-xs text-white/70 leading-relaxed font-light">You hit a PR on Bench Press yesterday! Your chest volume is up 12% this month.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl opacity-50">
                  <div className="flex gap-3">
                    <Target className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                    <p className="text-xs text-white/70 leading-relaxed font-light">Consistency check: You're 3 workouts away from the Titanium Badge.</p>
                  </div>
                </div>

                <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#090909] to-transparent z-10 rounded-b-xl" />
              </div>

              <Link to="/ai-planner" className="mt-6 w-full py-4 bg-primary text-black rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all text-center flex items-center justify-center gap-2 shadow-lg">
                Open Full Planner <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* WIDE COLUMN: Quick Stats & Social */}
            <div className="lg:col-span-3 xl:col-span-4 flex flex-col gap-6 lg:gap-8">
              
              {/* Sparkline Chart */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.01] border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl shadow-2xl flex-1 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-heading text-lg tracking-widest uppercase">Trend</h3>
                    <div className="text-3xl font-heading text-primary mt-1">+14%</div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-white/40" />
                </div>
                <div className="h-24 w-full -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SPARKLINE_DATA}>
                      <defs>
                        <linearGradient id="glowArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d3a523" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#d3a523" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="natural" dataKey="value" stroke="#d3a523" strokeWidth={3} fill="url(#glowArea)" />
                      <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Social/Live Widget */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.01] border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl shadow-2xl flex-1"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading text-lg tracking-widest uppercase">Live at ForgeX</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">24 Members</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-10 h-10 rounded-full border-2 border-[#111] bg-white/10" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-10 h-10 rounded-full border-2 border-[#111] bg-white/10" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" className="w-10 h-10 rounded-full border-2 border-[#111] bg-white/10" />
                  </div>
                  <div className="text-xs text-white/70 font-light leading-tight">
                    <span className="font-bold text-white">Kasun</span> & 2 friends are lifting right now.
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* SECOND ROW BENTO */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mt-6 lg:mt-8">
            
            {/* Gamification / Profile Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="md:col-span-12 lg:col-span-8 bg-gradient-to-r from-white/[0.08] to-transparent border border-white/10 rounded-[2.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Flame className="w-8 h-8 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl tracking-widest uppercase text-white">14 Day Streak!</h3>
                  <p className="text-[10px] text-white/60 font-bold tracking-[0.2em] uppercase">Consistency is key</p>
                </div>
              </div>

              <div className="flex gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                {[
                  { icon: Medal, label: 'King', active: true },
                  { icon: Dumbbell, label: 'Heavy', active: true },
                  { icon: Target, label: 'Early', active: false }
                ].map((b, i) => (
                  <div key={i} className={`flex flex-col items-center gap-2 shrink-0 ${b.active ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${b.active ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-white/5 border-white/10 text-white'}`}>
                      <b.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/70">{b.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Schedule Mini Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="md:col-span-12 lg:col-span-4 bg-gradient-to-br from-white/[0.08] to-white/[0.01] border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl flex items-center justify-between group cursor-pointer hover:border-white/30 transition-all"
            >
              <div>
                <h3 className="font-heading text-xl tracking-widest uppercase text-white mb-1">Next Session</h3>
                <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Today, 18:00 • HIIT</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* FLOATING ACTION BAR (Gen-Z Mobile App Feel) */}
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-3xl border border-white/10 p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 flex items-center gap-2"
      >
        <button className="flex flex-col items-center justify-center w-16 h-16 rounded-full hover:bg-white/10 transition-all group">
          <QrCode className="w-6 h-6 text-white/70 group-hover:text-white transition-colors mb-1" />
          <span className="text-[7px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white">Scan</span>
        </button>
        <button className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-amber-200 text-black shadow-[0_0_20px_rgba(211,165,35,0.4)] hover:scale-105 transition-all transform -translate-y-4">
          <Plus className="w-8 h-8 mb-0.5" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Log</span>
        </button>
        <button className="flex flex-col items-center justify-center w-16 h-16 rounded-full hover:bg-white/10 transition-all group">
          <Users className="w-6 h-6 text-white/70 group-hover:text-white transition-colors mb-1" />
          <span className="text-[7px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white">Social</span>
        </button>
      </motion.div>

    </div>
  );
}
