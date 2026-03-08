import { Shield, Navigation, AlertTriangle, ShieldCheck, Clock, Search, Map as MapIcon, LogOut, User } from 'lucide-react';
import SafetyHistoryChart from './SafetyHistoryChart';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ 
  isSidebarOpen, 
  selectedZone, 
  onReportClick 
}) {
  const { user, logout } = useAuth();

  if (!isSidebarOpen) {
    return (
      <div className="glass-panel h-full w-20 flex-shrink-0 flex flex-col items-center py-8 space-y-8 absolute md:relative z-20">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg ring-1 ring-white/10 mb-4">
            <Shield className="w-6 h-6 text-white" />
        </div>
        <button className="p-3 bg-gray-800/80 rounded-xl hover:bg-gray-700 transition-colors group">
          <Search className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
        <button className="p-3 bg-gray-800/80 rounded-xl hover:bg-gray-700 transition-colors group">
          <Navigation className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
        <button 
          onClick={onReportClick}
          className="p-3 bg-red-500/20 rounded-xl hover:bg-red-500/30 border border-red-500/30 transition-colors group"
        >
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel h-full w-80 md:w-96 flex-shrink-0 flex flex-col z-20 absolute md:relative shadow-[10px_0_30px_rgba(0,0,0,0.5)] transition-all">
      <div className="p-6 flex items-center gap-3 border-b border-white/5 bg-white/[0.02]">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] ring-1 ring-white/10">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 tracking-tight flex-1">SafeRoute</h1>
        
        {user && (
          <div className="flex items-center gap-2 text-sm">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/20">
               <User className="w-4 h-4" />
             </div>
             <div className="hidden lg:block truncate max-w-[90px]">
                <p className="font-semibold text-gray-200 truncate">{user.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
                  {user.verified && <ShieldCheck className="w-3 h-3 text-green-400" />}
                  {user.verified ? 'Verified' : 'Local'}
                </p>
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        
        <div className="relative group">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search location or route..." 
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner text-white placeholder-gray-500 backdrop-blur-sm"
          />
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-indigo-400" /> Routing Mode
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all group shadow-lg">
              <MapIcon className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-indigo-200">Safe Route</span>
            </button>
            <button className="bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all group shadow-lg">
              <AlertTriangle className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-orange-200">Avoid Danger</span>
            </button>
          </div>
        </div>

        {selectedZone ? (
          <div className="bg-black/40 rounded-2xl p-5 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className={`absolute top-0 left-0 w-1.5 h-full shadow-[0_0_20px_currentColor] ${selectedZone.status === 'GREEN' ? 'bg-green-500 text-green-500' : selectedZone.status === 'ORANGE' ? 'bg-orange-500 text-orange-500' : 'bg-red-500 text-red-500'}`}></div>
            <div className="pl-2">
                <h2 className="text-xl font-bold mb-2 text-white/90">{selectedZone.location.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                    selectedZone.status === 'GREEN' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 
                    selectedZone.status === 'ORANGE' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/20' : 
                    'bg-red-500/20 text-red-400 border border-red-500/20'
                }`}>
                    {selectedZone.status} ZONE
                </span>
                <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-white/5 rounded-md border border-white/5">{selectedZone.location.type}</span>
                </div>
                
                <p className="text-sm text-gray-300 mb-4 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                {selectedZone.status === 'RED' ? 'High risk area. Multiple negative community reports involving accidents, poor lighting, or harassment. Exercise extreme caution.' :
                selectedZone.status === 'ORANGE' ? 'Moderate caution advised. Some recent negative reports or uncertain safety status.' :
                'This area is verified as safe by the community.'}
                </p>

                <SafetyHistoryChart zoneData={selectedZone} />

                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Last report 2h ago</span>
                <button className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors flex items-center gap-1">Details &rarr;</button>
                </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-56 text-center text-gray-400 space-y-4 px-6 border border-dashed border-white/10 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="bg-white/5 p-4 rounded-full">
                <ShieldCheck className="w-8 h-8 text-indigo-400 opacity-50" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-300">No Zone Selected</p>
                <p className="text-xs mt-1 text-gray-500">Tap on any colored zone on the map to view intelligent safety insights.</p>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <button 
            onClick={onReportClick}
            className="w-full py-4 bg-gradient-to-r from-red-500/80 to-orange-500/80 hover:from-red-500 hover:to-orange-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-[0.98]">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            File an Incident Report
          </button>
        </div>
        
        {user && (
          <div className="mt-auto pt-6 pb-2">
            <button 
              onClick={logout}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
