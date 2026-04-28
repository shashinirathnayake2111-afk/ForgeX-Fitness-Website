import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Activity, Dumbbell, Calendar, Trophy, ArrowRight, LogOut, 
  Settings, Bell, LogIn, User, MapPin, Zap, TrendingUp, Flame, Medal, Target, Scale, PieChart as PieIcon, Award
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TrafficTracker from '../components/TrafficTracker';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, LineChart, Line, PieChart, Pie, Legend
} from 'recharts';

const WORKOUT_DATA = [
  { day: 'Mon', gym: 1, home: 0 },
  { day: 'Tue', gym: 0, home: 1 },
  { day: 'Wed', gym: 1, home: 0 },
  { day: 'Thu', gym: 1, home: 1 },
  { day: 'Fri', gym: 0, home: 1 },
  { day: 'Sat', gym: 1, home: 0 },
  { day: 'Sun', gym: 0, home: 0 },
];

const PROGRESS_DATA = [
  { day: 'Mon', progress: 40 },
  { day: 'Tue', progress: 45 },
  { day: 'Wed', progress: 42 },
  { day: 'Thu', progress: 55 },
  { day: 'Fri', progress: 58 },
  { day: 'Sat', progress: 65 },
  { day: 'Sun', progress: 72 },
];

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

const ATTENDANCE_DATA = [
  { name: 'Attended', value: 24, color: '#d3a523' },
  { name: 'Missed', value: 6, color: 'rgba(255,255,255,0.05)' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Traffic Tracker State
  const [trafficCount, setTrafficCount] = React.useState(() => {
    const saved = localStorage.getItem('forgex_live_traffic');
    return saved ? parseInt(saved) : 15;
  });

  const [isCheckedIn, setIsCheckedIn] = React.useState(() => {
    return localStorage.getItem(`forgex_checked_in_${user?.id}`) === 'true';
  });

  React.useEffect(() => {
    localStorage.setItem('forgex_live_traffic', trafficCount.toString());
  }, [trafficCount]);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem(`forgex_checked_in_${user.id}`, isCheckedIn.toString());
    }
  }, [isCheckedIn, user]);

  const handleTrafficToggle = () => {
    if (isCheckedIn) {
      setTrafficCount(prev => Math.max(0, prev - 1));
      setIsCheckedIn(false);
    } else {
      setTrafficCount(prev => prev + 1);
      setIsCheckedIn(true);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.04] via-[#0a0a0a] to-black text-white selection:bg-primary selection:text-black font-sans">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-12 lg:px-24 xl:px-32">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/10 pb-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">Personal Dashboard</span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-tighter leading-none">
                G'DAY, <span className="text-primary">{user.name.split(' ')[0]}</span>
              </h1>
            </motion.div>

            <div className="flex items-center gap-3 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-xl">
              <button className="w-10 h-10 rounded-xl hover:bg-white/20 flex items-center justify-center transition-all">
                <Bell className="w-4 h-4 text-white/80" />
              </button>
              <button className="w-10 h-10 rounded-xl hover:bg-white/20 flex items-center justify-center transition-all">
                <Settings className="w-4 h-4 text-white/80" />
              </button>
              <div className="w-[1px] h-6 bg-white/20 mx-1" />
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-bold tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>

          {/* Milestone Alert Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-[#d3a523]/30 via-[#d3a523]/10 to-transparent border-2 border-[#d3a523]/60 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-2xl shadow-[0_0_50px_rgba(211,165,35,0.2)]"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black shrink-0 animate-pulse">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading text-xl text-primary uppercase tracking-widest leading-tight drop-shadow-md">Milestone Unlocked!</h4>
                <p className="text-[11px] text-white/90 font-bold tracking-[0.2em] uppercase mt-1">You've reached your 5kg weight loss goal. Keep crushing it!</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-primary transition-all shadow-lg w-full md:w-auto">
              Claim Reward
            </button>
          </motion.div>

          {/* Main Grid System */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
            
            {/* LEFT COLUMN: Main Stats & Activity */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* TOP ROW: Live Traffic Feature */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <TrafficTracker count={trafficCount} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTrafficToggle}
                  className={`h-full flex flex-col items-center justify-center gap-4 rounded-[2.5rem] p-8 border transition-all duration-500 ${
                    isCheckedIn 
                      ? 'bg-red-500/5 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' 
                      : 'bg-primary text-black hover:shadow-[0_0_40px_rgba(211,165,35,0.3)] border-primary'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isCheckedIn ? 'bg-red-500/20' : 'bg-black/10'}`}>
                    {isCheckedIn ? <LogOut className="w-8 h-8" /> : <LogIn className="w-8 h-8" />}
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-xl tracking-widest uppercase leading-tight">
                      {isCheckedIn ? 'CHECK OUT' : 'CHECK IN'}
                    </div>
                    <div className="text-[9px] font-bold tracking-[0.2em] opacity-80 uppercase mt-1">
                      {isCheckedIn ? 'End your session' : 'Scan entrance QR'}
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Workouts', value: '12', icon: Activity, color: 'text-primary' },
                  { label: 'Avg Pulse', value: '72', icon: Zap, color: 'text-amber-400' },
                  { label: 'Burn Rate', value: '450', icon: TrendingUp, color: 'text-orange-400' },
                  { label: 'Focus Score', value: '92%', icon: Trophy, color: 'text-blue-400' },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-6 rounded-3xl hover:border-white/20 hover:from-white/[0.1] hover:to-white/[0.04] transition-all duration-300 backdrop-blur-xl"
                  >
                    <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-heading tracking-tighter mb-1">{stat.value}</div>
                    <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CHARTS AREA */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Workout Bar Chart */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <Activity className="w-5 h-5 text-primary" /> Training Split
                    </h3>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Gym</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Home</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={WORKOUT_DATA}>
                        <XAxis 
                          dataKey="day" axisLine={false} tickLine={false} 
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700 }}
                        />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }} />
                        <Bar dataKey="gym" fill="#d3a523" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="home" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Fitness Area Chart */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-primary" /> Progress Curve
                    </h3>
                    <span className="text-[10px] font-bold text-primary tracking-widest">+12% THIS WEEK</span>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PROGRESS_DATA}>
                        <defs>
                          <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d3a523" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#d3a523" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="day" axisLine={false} tickLine={false} 
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700 }}
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }} />
                        <Area type="monotone" dataKey="progress" stroke="#d3a523" strokeWidth={3} fill="url(#colorProgress)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* ADVANCED CHARTS ROW: Gamification Data */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* Weight Tracker Line Chart (Full Width) */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="xl:col-span-2 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <Scale className="w-5 h-5 text-primary" /> Weight Tracker
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold tracking-widest uppercase">
                      -7.1 kg Total
                    </div>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={WEIGHT_DATA}>
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700 }} />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
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
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <Activity className="w-5 h-5 text-primary" /> Measurements
                    </h3>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MEASUREMENTS_DATA}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: 700 }} />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                        <Bar dataKey="chest" fill="#d3a523" radius={[4, 4, 0, 0]} barSize={8} />
                        <Bar dataKey="waist" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={8} opacity={0.6} />
                        <Bar dataKey="arms" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={8} opacity={0.2} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Chest</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/60" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Waist</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20" /><span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Arms</span></div>
                  </div>
                </motion.div>

                {/* Consistency Score Pie Chart */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-heading text-lg tracking-widest uppercase flex items-center gap-3">
                      <PieIcon className="w-5 h-5 text-primary" /> Consistency
                    </h3>
                  </div>
                  <div className="h-[220px] w-full relative flex items-center justify-center">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                      <span className="text-4xl font-heading text-white">80%</span>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-white/60">Attendance</span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ATTENDANCE_DATA}
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {ATTENDANCE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

              </div>

              {/* AI PLANNER BANNER */}
              <motion.div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 shadow-2xl p-10 rounded-[3rem] relative overflow-hidden group backdrop-blur-xl">
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Dumbbell className="w-64 h-64 rotate-45" />
                </div>
                <div className="relative z-10 max-w-xl">
                  <h2 className="font-heading text-4xl text-white mb-4 uppercase tracking-tighter">AI AGENT: READY</h2>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed font-light">
                    Your personalized training protocol has been updated based on your recent "Focus Score". Open the ForgeX AI to review today's targets.
                  </p>
                  <Link 
                    to="/ai-planner"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-500"
                  >
                    Launch Planner <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>


            {/* RIGHT COLUMN: Profile & Schedule */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Profile Card */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl rounded-[3rem] p-10 text-center relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="relative z-10">
                  <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-white/10 mx-auto mb-6 p-2">
                    <div className="w-full h-full rounded-full overflow-hidden border border-primary/30">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" className="w-full h-full" />
                    </div>
                  </div>
                  <h3 className="font-heading text-3xl text-white mb-1 uppercase tracking-tight">{user.name}</h3>
                  <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-6">{user.plan} MEMBER</p>
                  
                  {/* Streak Badge */}
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-8">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase">14 Day Streak!</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                      <div className="text-xl font-heading mb-1">75.4</div>
                      <div className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Weight (kg)</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                      <div className="text-xl font-heading mb-1">12.2%</div>
                      <div className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Body Fat</div>
                    </div>
                  </div>

                  {/* Badges Section Inside Profile */}
                  <div className="mt-8 mb-8 text-left border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-heading text-lg tracking-widest uppercase text-white">Badges</h4>
                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest">3 / 12 Unlocked</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: 'Consistent King', desc: '7 days streak', icon: Medal, active: true },
                        { title: 'Heavy Lifter', desc: 'Moved 10,000kg', icon: Dumbbell, active: true },
                        { title: 'Early Bird', desc: '5 AM workouts', icon: Target, active: true },
                        { title: 'Iron Lung', desc: 'Cardio master', icon: Award, active: false },
                      ].map((badge, i) => (
                        <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer ${badge.active ? 'bg-primary/10 border-primary/20' : 'bg-white/5 border-white/10'}`}>
                          <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${badge.active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/20'}`}>
                            <badge.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className={`text-[11px] font-bold uppercase tracking-widest ${badge.active ? 'text-white' : 'text-white/40'}`}>{badge.title}</div>
                            <div className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${badge.active ? 'text-primary/70' : 'text-white/20'}`}>{badge.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all">
                    Profile Settings
                  </button>
                </div>
              </div>

              {/* Upcoming Schedule */}
              <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-2xl rounded-[2.5rem] p-8 backdrop-blur-xl">
                <h3 className="font-heading text-lg tracking-widest uppercase mb-6 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" /> Timeline
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'HIIT Conditioning', time: '18:00', date: 'Today', active: true },
                    { name: 'Strength Alpha', time: '07:30', date: 'Tomorrow', active: false },
                    { name: 'Yoga recovery', time: '10:00', date: 'WED', active: false },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.active ? 'bg-primary/10 border-primary/40' : 'bg-white/5 border-white/10'}`}>
                      <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-heading ${item.active ? 'bg-primary text-black' : 'bg-white/10 text-white/60'}`}>
                        <div className="text-[8px] uppercase leading-none">{item.date}</div>
                        <div className="text-sm">{item.time.split(':')[0]}</div>
                      </div>
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-widest ${item.active ? 'text-white' : 'text-white/80'}`}>{item.name}</div>
                        <div className="text-[9px] text-white/60 uppercase tracking-widest">Coach: Kasun</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-4 rounded-2xl border border-white/10 text-[9px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                  Full Schedule
                </button>
              </div>

            </div>
  