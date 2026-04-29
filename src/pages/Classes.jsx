import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';

const Classes = () => {
  const [selectedCoaches, setSelectedCoaches] = React.useState({});
  const [notifiedClasses, setNotifiedClasses] = React.useState({});

  const coachesList = {
    'Kasun Perera': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kasun' },
    'Chaminda Silva': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chaminda' },
    'Dilini Jayawardena': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dilini' },
    'Roshan Fernando': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roshan' },
    'Amila Wijesinghe': { img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amila' }
  };

  const schedule = [
    { id: 1, title: 'HIIT Extreme', time: '18:00 - 19:00', defaultInstructor: 'Kasun Perera', coaches: ['Kasun Perera', 'Amila Wijesinghe'], location: 'Studio A', spots: '5 left', color: 'bg-red-500' },
    { id: 2, title: 'Core Power', time: '19:15 - 20:00', defaultInstructor: 'Chaminda Silva', coaches: ['Chaminda Silva', 'Roshan Fernando'], location: 'Studio B', spots: 'Full', color: 'bg-primary' },
    { id: 3, title: 'Yoga Flow', time: '07:00 - 08:00', defaultInstructor: 'Dilini Jayawardena', coaches: ['Dilini Jayawardena'], location: 'Zen Room', spots: '12 left', color: 'bg-blue-500' },
    { id: 4, title: 'Crossfit WOD', time: '17:00 - 18:00', defaultInstructor: 'Roshan Fernando', coaches: ['Roshan Fernando', 'Kasun Perera'], location: 'Main Floor', spots: '2 left', color: 'bg-orange-500' },
  ];

  const handleNotify = (id) => {
    setNotifiedClasses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCoachSelect = (classId, coachName) => {
    setSelectedCoaches(prev => ({ ...prev, [classId]: coachName }));
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black text-white font-sans pb-32">
      <Navbar />
      <Sidebar />
      
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:ml-64 lg:px-12 xl:px-20">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4">
                Class <span className="text-primary">Schedule</span>
              </h1>
              <p className="text-white/50 text-sm font-bold tracking-widest uppercase">Select your preferred coach and book a slot</p>
            </motion.div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Booking Open for April 29</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {schedule.map((cls, i) => {
              const currentCoach = selectedCoaches[cls.id] || cls.defaultInstructor;
              const isNotified = notifiedClasses[cls.id];

              return (
                <motion.div 
                  key={cls.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl hover:bg-white/[0.08] transition-all group relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${cls.color}`} />
                  
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="font-heading text-3xl uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{cls.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-white/50 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        <Clock className="w-3 h-3 text-primary" /> {cls.time}
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${cls.spots === 'Full' ? 'bg-white/10 border-white/20 text-white/50' : 'bg-primary/10 border-primary/30 text-primary shadow-[0_0_15px_rgba(211,165,35,0.2)]'}`}>
                      {cls.spots}
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    {/* Coach Selection */}
                    <div className="space-y-3">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 ml-1">Select Coach</div>
                      <div className="flex flex-wrap gap-2">
                        {cls.coaches.map(coach => (
                          <button 
                            key={coach}
                            onClick={() => handleCoachSelect(cls.id, coach)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${currentCoach === coach ? 'bg-primary/20 border-primary/50 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                          >
                            <img src={coachesList[coach].img} alt={coach} className="w-5 h-5 rounded-full bg-white/10" />
                            <span className="text-[10px] font-bold">{coach.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/10">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-white uppercase text-[11px] tracking-widest">{cls.location}</span>
                      </div>
                      <button 
                        onClick={() => handleNotify(cls.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${isNotified ? 'bg-green-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/10'}`}
                      >
                        {isNotified ? 'Coming!' : 'Notify Arrival'}
                      </button>
                    </div>
                  </div>

                  <button 
                    disabled={cls.spots === 'Full'}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[11px] transition-all ${
                      cls.spots === 'Full' 
                        ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5' 
                        : 'bg-primary text-black hover:bg-amber-400 shadow-xl active:scale-95'
                    }`}
                  >
                    {cls.spots === 'Full' ? 'Join Waitlist' : 'Confirm Booking'}
                    {cls.spots !== 'Full' && <ChevronRight className="w-4 h-4" />}
                  </button>

                </motion.div>
              );
            })}
          </div>

          {/* Social Social Note */}
          <div className="mt-16 p-8 rounded-[2rem] bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-heading text-xl uppercase tracking-widest mb-1">Workout with Friends</h4>
                <p className="text-white/50 text-xs font-medium">See who else is attending your favorite classes and stay motivated together.</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-primary transition-all">
              View Social List
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Classes;
