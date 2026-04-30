import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TrafficTracker from '../components/TrafficTracker';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, Flame, Zap, Trophy, TrendingUp, Calendar, ChevronRight, MessageSquare, Bell, Search, Settings, Filter, Download, ExternalLink, Share2, MoreHorizontal, User, LogOut,
  Activity, Dumbbell, ArrowRight, Medal, Target, Scale, QrCode, Plus, Users, Award, Lightbulb
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';

const WEIGHT_DATA = [
  { week: 'W1', weight: 82.5 },
  { week: 'W2', weight: 81.2 },
  { week: 'W3', weight: 80.8 },
  { week: 'W4', weight: 79.5 },
  { week: 'W5', weight: 78.9 },
  { week: 'W6', weight: 77.4 },
  { week: 'W7', weight: 76.8 },
  { week: 'W8', weight: 75.4 },
];

const MEASUREMENTS_DATA = [
  { month: 'Jan', chest: 102, waist: 95, arms: 35 },
  { month: 'Feb', chest: 104, waist: 92, arms: 36 },
  { month: 'Mar', chest: 106, waist: 89, arms: 37 },
  { month: 'Apr', chest: 108, waist: 86, arms: 38 },
];

const ActivityRings = () => (
  <div className="relative w-40 h-40 flex items-center justify-center">
    {/* Outer Ring: Move (Gold) */}
    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(211,165,35,0.1)" strokeWidth="14" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="#d3a523" strokeWidth="14" strokeDasharray="534" strokeDashoffset="130" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(211,165,35,0.8)]" />
    </svg>
    {/* Middle Ring: Lift (Orange) */}
    <svg className="absolute w-32 h-32 transform -rotate-90" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="14" />
      <circle cx="80" cy="80" r="65" fill="none" stroke="#f97316" strokeWidth="14" strokeDasharray="408" strokeDashoffset="150" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
    </svg>
    {/* Inner Ring: Focus (Cyan) */}
    <svg className="absolute w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="14" />
      <circle cx="60" cy="60" r="45" fill="none" stroke="#06b6d4" strokeWidth="14" strokeDasharray="282" strokeDashoffset="40" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
    </svg>
    <div className="absolute flex flex-col items-center justify-center">
      <Flame className="w-6 h-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
    </div>
  </div>
);

const ALL_BADGES = [
  { id: 'rookie', title: 'Rookie Lifter', requiredXP: 500, desc: 'First steps', longDesc: 'You started your journey! This badge is awarded to those who take their first steps into the forge.', rarity: 'Common', img: 'https://cdn-icons-png.flaticon.com/512/5968/5968923.png', color: 'from-blue-400/20 to-blue-600/5' },
  { id: 'consistent', title: 'Consistent King', requiredXP: 2000, desc: '7 days streak', longDesc: 'You have consistently hit the gym for 7 days straight without missing a session. Your dedication is inspiring!', rarity: 'Rare', img: 'https://cdn-icons-png.flaticon.com/512/5968/5968923.png', color: 'from-amber-400/20 to-yellow-600/5' },
  { id: 'heavy', title: 'Heavy Lifter', requiredXP: 5000, desc: 'Moved 10,000kg', longDesc: 'You have moved a cumulative weight of 10,000kg across all your lifts. Your strength is reaching legendary levels.', rarity: 'Epic', img: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png', color: 'from-primary/20 to-amber-600/5' },
  { id: 'goal', title: 'Goal Crusher', requiredXP: 10000, desc: 'Major Goal Reached', longDesc: 'You set a major target and absolutely crushed it. This badge commemorates your incredible dedication.', rarity: 'Legendary', img: 'https://cdn-icons-png.flaticon.com/512/3112/3112946.png', color: 'from-primary/20 to-amber-600/5' },
  { id: 'sleep', title: 'Sleep Master', requiredXP: 15000, desc: '8h Sleep for 7 days', longDesc: 'Recovery is half the battle. You have prioritized your rest and allowed your muscles to grow.', rarity: 'Rare', img: 'https://cdn-icons-png.flaticon.com/512/3094/3094831.png', color: 'from-indigo-400/20 to-purple-600/5' },
  { id: 'water', title: 'Hydration Hero', requiredXP: 18000, desc: '3L Water Daily', longDesc: 'You are perfectly hydrated. Your performance and recovery are at their peak.', rarity: 'Common', img: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png', color: 'from-cyan-400/20 to-blue-600/5' },
  { id: 'legend', title: 'Forge Legend', requiredXP: 25000, desc: 'Top 1% Elite', longDesc: 'Only the top 1% of athletes reach this status. You are a true legend of the forge.', rarity: 'Mythic', img: 'https://cdn-icons-png.flaticon.com/512/3112/3112946.png', color: 'from-purple-500/20 to-indigo-600/5' },
];

const Dashboard = () => {
  const { user, logout, updateBadges } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, points, level')
        .order('points', { ascending: false })
        .limit(5);

      if (error) throw error;
      
      const MOCK_COMPETITORS = [
        { full_name: 'Kasun Perera', points: 12500, level: 15 },
        { full_name: 'Dilshan Silva', points: 10200, level: 12 },
        { full_name: 'Nimesh Rathnayake', points: 8900, level: 10 },
        { full_name: 'Sachini Fernando', points: 7500, level: 8 }
      ];

      const allUsers = [...(data || []), ...MOCK_COMPETITORS]
        .sort((a, b) => b.points - a.points)
        .slice(0, 6);

      setLeaderboard(allUsers.map((p, i) => ({
        rank: i + 1,
        name: p.full_name,
        xp: p.points,
        level: p.level,
        isMe: p.full_name === user?.name
      })));
    } catch (err) {
      console.error('Error fetching leaderboard:', err.message);
    }
  };
  const navigate = useNavigate();

  // Traffic Tracker State
  const [trafficCount, setTrafficCount] = React.useState(() => {
    const saved = localStorage.getItem('forgex_live_traffic');
    return saved ? parseInt(saved) : 15;
  });

  const [selectedBadge, setSelectedBadge] = React.useState(null);

  const [isCheckedIn, setIsCheckedIn] = React.useState(() => {
    return localStorage.getItem(`forgex_checked_in_${user?.id}`) === 'true';
  });

  // Smart Watch Sync State
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [livePulse, setLivePulse] = React.useState(72);
  const [workoutTimer, setWorkoutTimer] = React.useState(0);

  const { updateStats } = useAuth();

  // Pulse Simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse(prev => {
        const base = isSyncing ? 110 : 70;
        const variation = Math.floor(Math.random() * 20);
        return base + variation;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isSyncing]);

  // Workout Timer Simulation
  React.useEffect(() => {
    let interval;
    if (isSyncing) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSyncing]);

  const handleSyncToggle = async () => {
    if (isSyncing) {
      // Ending workout, sync to DB
      const sessionSeconds = workoutTimer;
      if (sessionSeconds < 10) { // Safety: Don't sync sessions shorter than 10s
        setIsSyncing(false);
        setWorkoutTimer(0);
        return;
      }

      const hoursAdded = parseFloat((sessionSeconds / 3600).toFixed(2));
      const currentHours = user?.stats?.totalHours || 0;
      const currentWorkouts = user?.stats?.workoutsCompleted || 0;
      const currentCalories = user?.stats?.caloriesBurned || 0;
      const currentWeight = user?.stats?.currentWeight || 75.0;
      
      // Calculate new points: 10 XP for starting + 2 XP per minute
      const xpEarned = 10 + Math.floor(sessionSeconds / 60) * 2;
      const newPoints = (user?.stats?.points || 0) + xpEarned;
      
      // Calculate calories: ~8 calories per minute
      const caloriesEarned = Math.floor(sessionSeconds / 60) * 8;
      
      // Calculate weight change: ~0.01kg per 100 calories (simulated)
      const weightLoss = (caloriesEarned / 100) * 0.01;
      const newWeight = parseFloat((currentWeight - weightLoss).toFixed(2));

      // Simple level calculation: 1 level per 1000 XP
      const newLevel = Math.max(user?.stats?.level || 1, Math.floor(newPoints / 1000) + 1);

      await updateStats({
        totalHours: currentHours + hoursAdded,
        workoutsCompleted: currentWorkouts + 1,
        points: newPoints,
        level: newLevel,
        caloriesBurned: currentCalories + caloriesEarned,
        currentWeight: newWeight
      });
      
      setWorkoutTimer(0);
    }
    setIsSyncing(!isSyncing);
  };

  React.useEffect(() => {
    localStorage.setItem('forgex_live_traffic', trafficCount.toString());
  }, [trafficCount]);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem(`forgex_checked_in_${user.id}`, isCheckedIn.toString());
    }
  }, [isCheckedIn, user]);

  // Simulate live traffic fluctuations (Real-time Feel)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTrafficCount(prev => {
        // Randomly change by -1, 0, or +1
        const change = Math.floor(Math.random() * 3) - 1;
        let newCount = prev + change;
        
        // Keep bounds between 5 and 45 members
        if (newCount < 5) return 5;
        if (newCount > 45) return 45;
        return newCount;
      });
    }, 8000); // Updates every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTrafficToggle = () => {
    if (isCheckedIn) {
      setTrafficCount(prev => Math.max(0, prev - 1));
    } else {
      setTrafficCount(prev => prev + 1);
    }
    setIsCheckedIn(!isCheckedIn);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black text-white selection:bg-primary selection:text-black font-sans pb-32">
      <Navbar />
      <Sidebar />
      
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">Personal Dashboard</span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tighter leading-none">
                G'DAY, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">{user?.name?.split(' ')[0] || 'Athlete'}</span>
              </h1>
            </motion.div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-primary/50 overflow-hidden shadow-[0_0_20px_rgba(211,165,35,0.2)]">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Athlete'}`} alt="Profile" className="w-full h-full bg-white/5" />
              </div>
              <button onClick={() => { logout(); navigate('/'); }} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 transition-all flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic Milestone Banner (Full Width Slim) */}
          <div className="mb-10">
            {(() => {
              const userXP = user?.stats?.points || 0;
              const earnedBadges = user?.stats?.badges || [];
              const nextBadge = ALL_BADGES.find(b => !earnedBadges.find(ub => ub.title === b.title));

              if (!nextBadge) return null;
              const isReached = userXP >= nextBadge.requiredXP;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative overflow-hidden rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-3xl border ${
                    isReached 
                      ? 'bg-gradient-to-r from-[#d3a523]/20 via-[#d3a523]/5 to-transparent border-[#d3a523]/40' 
                      : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isReached ? 'bg-primary text-black animate-pulse' : 'bg-white/5 text-white/20'}`}>
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-heading text-lg ${isReached ? 'text-primary' : 'text-white/60'} uppercase tracking-widest leading-none`}>
                        {isReached ? 'Milestone Reached!' : 'Next Rank'}
                      </h4>
                      <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/40 mt-1">
                        {isReached ? `Unlock the ${nextBadge.title} Badge` : `Earn XP for ${nextBadge.title}`}
                      </p>
                    </div>
                  </div>
                  <button 
                    disabled={!isReached}
                    onClick={() => updateBadges({ ...nextBadge, active: true })}
                    className={`px-6 py-2 text-[9px] font-bold tracking-[0.2em] uppercase rounded-lg transition-all ${
                      isReached ? 'bg-white text-black hover:bg-primary' : 'bg-white/5 text-white/10 cursor-not-allowed'
                    }`}
                  >
                    {isReached ? 'Claim Reward' : 'Locked'}
                  </button>
                </motion.div>
              );
            })()}
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Traffic & Charts */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Top Row: Traffic & Forge Core */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                <div className="xl:col-span-2 cursor-pointer transition-transform hover:scale-[1.01]" onClick={handleTrafficToggle}>
                  <TrafficTracker count={trafficCount} />
                </div>

                {/* Forge Core Rings */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-6 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-center relative"
                >
                  <h3 className="font-heading text-lg tracking-widest uppercase mb-4 w-full text-left">Activity</h3>
                  <ActivityRings />
                  <div className="w-full flex justify-between px-2 mt-4 text-center">
                    <div>
                      <div className="text-primary font-heading text-xl">850</div>
                      <div className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Move</div>
                    </div>
                    <div>
                      <div className="text-orange-500 font-heading text-xl">12k</div>
                      <div className="text-[8px] text-white/50 uppercase tracking-widest font-bold">Lift</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Workouts', value: user?.stats?.workoutsCompleted || 0, icon: Activity, color: 'text-primary' },
                  { label: 'Kcal Burned', value: user?.stats?.caloriesBurned || 0, icon: Zap, color: 'text-amber-400' },
                  { label: 'Current Weight', value: `${user?.stats?.currentWeight || 75} kg`, icon: Scale, color: 'text-orange-400' },
                  { label: 'Focus Score', value: '92%', icon: Trophy, color: 'text-blue-400' },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-6 rounded-3xl hover:border-white/20 transition-all backdrop-blur-xl"
                  >
                    <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-heading text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* INTERACTIVE CHARTS ROW (RESTORED) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* Weight Tracker Line Chart */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <Scale className="w-5 h-5 text-primary" /> Weight Progress
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold tracking-widest uppercase">
                      {(82.0 - (user?.stats?.currentWeight || 75.0)).toFixed(1)} kg Lost
                    </div>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={WEIGHT_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                        <Line type="monotone" dataKey="weight" stroke="#d3a523" strokeWidth={4} dot={{ r: 4, fill: '#111', stroke: '#d3a523', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Body Measurements Bar Chart */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <Activity className="w-5 h-5 text-primary" /> Body Size (cm)
                    </h3>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MEASUREMENTS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                        <Bar dataKey="chest" fill="#d3a523" radius={[4, 4, 0, 0]} barSize={8} />
                        <Bar dataKey="waist" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={8} opacity={0.6} />
                        <Bar dataKey="arms" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={8} opacity={0.2} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Chest</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/60" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Waist</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Arms</span></div>
                  </div>
                </motion.div>

              </div>
              
              {/* AI Planner Prompt */}
              <motion.div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 shadow-2xl p-10 rounded-[3rem] relative overflow-hidden group backdrop-blur-xl">
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Dumbbell className="w-64 h-64 rotate-45" />
                </div>
                <div className="relative z-10 max-w-xl">
                  <h3 className="font-heading text-4xl text-primary uppercase tracking-tight mb-4 drop-shadow-md">Forge Your Next Level</h3>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed font-light">
                    Your personalized training protocol has been updated. Open the ForgeX AI to review today's targets and generate your next workout.
                  </p>
                  <Link 
                    to="/ai-planner"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-500 shadow-lg"
                  >
                    Launch Planner <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Pro Tip of the Day */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#d3a523]/10 to-transparent border border-[#d3a523]/20 p-8 rounded-[2.5rem] relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-40 h-40" />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary">Pro Tip of the Day</span>
                    </div>
                    <h3 className="font-heading text-2xl text-white uppercase tracking-tight mb-2">Master Your Mind-Muscle Connection</h3>
                    <p className="text-white/50 text-sm font-light">
                      Focusing on the muscle contracting rather than the weight moving can increase muscle growth by up to 20%. 
                    </p>
                  </div>
                  <Link 
                    to="/knowledge"
                    className="px-6 py-3 bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 rounded-xl text-[9px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap"
                  >
                    View All Tips
                  </Link>
                </div>
              </motion.div>
            </div>


            {/* RIGHT COLUMN: Profile & Badges */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* ForgeWatch Sync Widget (Compact) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="font-heading text-sm tracking-widest uppercase text-white">ForgeWatch</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-2xl font-heading text-white">{livePulse} <span className="text-[8px] text-white/30 uppercase">BPM</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-heading text-white">
                      {Math.floor(workoutTimer / 60)}:{(workoutTimer % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSyncToggle}
                  className={`w-full py-3 rounded-xl text-[9px] font-bold tracking-[0.2em] uppercase transition-all ${
                    isSyncing 
                      ? 'bg-red-500/20 border border-red-500/40 text-red-500' 
                      : 'bg-primary/20 border border-primary/40 text-primary'
                  }`}
                >
                  {isSyncing ? 'Stop & Sync' : 'Start Track'}
                </button>
              </motion.div>

              {/* Profile Card & Badges Combined (RESTORED) */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl rounded-[3rem] p-10 text-center relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-heading text-3xl text-white mb-1 uppercase tracking-tight">{user?.name || 'Athlete'}</h3>
                  <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-6">{user?.plan || 'Standard'} MEMBER</p>
                  
                  {/* Streak Badge */}
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-8">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase">14 Day Streak!</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                      <div className="text-xl font-heading mb-1">75.4</div>
                      <div className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Weight (kg)</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                      <div className="text-xl font-heading mb-1">12.2%</div>
                      <div className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Body Fat</div>
                    </div>
                  </div>

                  {/* Detailed Badges Section */}
                  <div className="text-left border-t border-white/10 pt-8 mt-2">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-heading text-lg tracking-widest uppercase text-white">Earned Badges</h4>
                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
                        {user?.stats?.badges?.length || 0} / {ALL_BADGES.length} Unlocked
                      </span>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {(() => {
                        const earnedBadges = user?.stats?.badges || [];
                        
                        // Merge all badges, tagging them as active/locked
                        const displayBadges = ALL_BADGES.map(template => {
                          const earned = earnedBadges.find(eb => eb.title === template.title);
                          return {
                            ...template,
                            active: !!earned,
                            date: earned ? earned.date : 'Locked',
                            earnedAt: earned ? new Date(earned.date).getTime() : 0
                          };
                        });

                        // Sort: Earned first (newest first), then by required XP
                        const sortedBadges = displayBadges.sort((a, b) => {
                          if (a.active !== b.active) return b.active ? 1 : -1;
                          if (a.active) return b.earnedAt - a.earnedAt;
                          return a.requiredXP - b.requiredXP;
                        });

                        return sortedBadges.map((badge, i) => (
                          <motion.div 
                            key={badge.id} 
                            whileHover={badge.active ? { scale: 1.05, x: 5 } : {}}
                            whileTap={badge.active ? { scale: 0.95 } : {}}
                            onClick={() => badge.active && setSelectedBadge(badge)}
                            className={`flex items-center gap-4 p-4 rounded-[2rem] border transition-all cursor-pointer group ${badge.active ? 'bg-white/5 border-white/10 hover:border-primary/50 shadow-xl' : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'}`}
                          >
                            <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg p-2 ${badge.active ? `bg-gradient-to-br ${badge.color}` : 'bg-white/5'}`}>
                              <img src={badge.img} alt={badge.title} className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                            </div>
                            <div className="flex-1">
                              <div className={`text-[12px] font-heading uppercase tracking-widest ${badge.active ? 'text-white' : 'text-white/40'}`}>{badge.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`text-[9px] font-bold uppercase tracking-[0.2em] ${badge.active ? 'text-primary' : 'text-white/20'}`}>{badge.desc}</div>
                                {!badge.active && (
                                  <div className="text-[7px] text-white/30 font-bold uppercase border border-white/10 px-1.5 py-0.5 rounded-full">
                                    {badge.requiredXP} XP
                                  </div>
                                )}
                              </div>
                            </div>
                            {badge.active && (
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                <ChevronRight className="w-4 h-4 text-white/40" />
                              </div>
                            )}
                          </motion.div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Leaderboard Widget */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl rounded-[3rem] p-8 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading text-xl tracking-widest uppercase text-white flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-primary" /> Leaderboard
                  </h3>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Global Rank</span>
                </div>
                
                <div className="space-y-3">
                  {leaderboard.length > 0 ? leaderboard.map((entry, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${entry.isMe ? 'bg-primary/20 border-primary/40 shadow-[0_0_20px_rgba(211,165,35,0.1)]' : 'bg-white/5 border-white/5'}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-heading ${entry.rank === 1 ? 'text-primary' : 'text-white/40'}`}>#{entry.rank}</span>
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.name}`} alt={entry.name} />
                          </div>
                          {entry.rank === 1 && <div className="absolute -top-1 -right-1 text-[10px]">👑</div>}
                        </div>
                        <div>
                          <div className={`text-[11px] font-bold uppercase tracking-widest ${entry.isMe ? 'text-white' : 'text-white/80'}`}>{entry.name}</div>
                          <div className="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">LVL {entry.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-heading text-white">{entry.xp}</div>
                        <div className="text-[7px] font-bold text-white/30 uppercase tracking-widest">XP</div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-4 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                      Loading rankings...
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Schedule */}
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl rounded-[2.5rem] p-8 backdrop-blur-xl mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading text-lg tracking-widest uppercase text-white">Upcoming Sessions</h3>
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-all">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-white">HIIT Extreme</div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] mt-1 text-primary">Today • 18:00</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-white/80">Upper Body Power</div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] mt-1 text-white/40">Tomorrow • 07:00</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-white/80">Active Recovery</div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] mt-1 text-white/40">Friday • 17:30</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                </div>
              </div>



            </div>
          </div>

        </div>
      </div>

      {/* FLOATING ACTION BAR (Gen-Z Mobile App Feel) */}
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-3xl border border-white/10 p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 flex lg:hidden items-center gap-2"
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

      {/* BADGE DETAIL MODAL */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedBadge(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${selectedBadge.active ? 'bg-primary' : 'bg-white/10'}`} />
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-3xl mb-8 flex items-center justify-center p-4 transform rotate-12 ${selectedBadge.active ? 'bg-primary/20 shadow-[0_0_30px_rgba(211,165,35,0.3)] border border-primary/30' : 'bg-white/5 border border-white/10 opacity-40 grayscale'}`}>
                  <img src={selectedBadge.img} alt={selectedBadge.title} className="w-full h-full object-contain -rotate-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                </div>
                
                <div className="space-y-2 mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${selectedBadge.rarity === 'Legendary' ? 'border-purple-500/50 text-purple-500 bg-purple-500/10' : selectedBadge.rarity === 'Epic' ? 'border-primary/50 text-primary bg-primary/10' : 'border-white/20 text-white/40 bg-white/5'}`}>
                      {selectedBadge.rarity} Achievement
                    </span>
                  </div>
                  <h2 className="font-heading text-4xl uppercase tracking-tight text-white">{selectedBadge.title}</h2>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">{selectedBadge.desc}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 w-full">
                  <p className="text-white/70 text-xs leading-relaxed font-light italic">
                    "{selectedBadge.longDesc}"
                  </p>
                </div>

                <div className="flex justify-between items-center w-full border-t border-white/10 pt-8">
                  <div className="text-left">
                    <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1">Earned On</div>
                    <div className="text-sm font-heading text-white">{selectedBadge.date}</div>
                  </div>
                  <button 
                    onClick={() => setSelectedBadge(null)}
                    className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-primary transition-all active:scale-95"
                  >
                    Dismiss
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Dashboard;
