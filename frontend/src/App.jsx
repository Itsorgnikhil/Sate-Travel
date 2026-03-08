import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import ReportModal from './components/ReportModal';
import Sidebar from './components/Sidebar';
import { Shield } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''; // Ensure the user creates a .env with this

function App() {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  // Coordinates along Jaipur to Delhi (NH48 roughly)
  const jaipurDelhiMockZones = [
    { id: 101, status: 'GREEN', updatedAt: new Date().toISOString(), location: { name: 'Jaipur City Center', lat: 26.9124, lng: 75.7873, type: 'NEIGHBORHOOD' } },
    { id: 102, status: 'ORANGE', updatedAt: new Date().toISOString(), location: { name: 'Chandwaji Highway Stretch', lat: 27.2345, lng: 75.9876, type: 'ROUTE' } },
    { id: 103, status: 'RED', updatedAt: new Date().toISOString(), location: { name: 'Shahpura Unlit Area', lat: 27.3821, lng: 75.9587, type: 'STREET' } },
    { id: 104, status: 'GREEN', updatedAt: new Date().toISOString(), location: { name: 'Kotputli Toll Plaza', lat: 27.7029, lng: 76.2081, type: 'SHOP' } },
    { id: 105, status: 'RED', updatedAt: new Date().toISOString(), location: { name: 'Behror Industrial Outskirts', lat: 27.8860, lng: 76.2863, type: 'NEIGHBORHOOD' } },
    { id: 106, status: 'GREEN', updatedAt: new Date().toISOString(), location: { name: 'Dharuhera Safe Stop', lat: 28.2045, lng: 76.7845, type: 'SHOP' } },
    { id: 107, status: 'ORANGE', updatedAt: new Date().toISOString(), location: { name: 'Gurugram Border Traffic', lat: 28.4595, lng: 77.0266, type: 'ROUTE' } },
    { id: 108, status: 'GREEN', updatedAt: new Date().toISOString(), location: { name: 'Delhi NCR Inner Ring', lat: 28.6139, lng: 77.2090, type: 'NEIGHBORHOOD' } }
  ];

  useEffect(() => {
    fetch('http://localhost:9080/api/locations/zones')
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) {
          setZones(data);
        } else {
          setZones(jaipurDelhiMockZones);
        }
      })
      .catch(err => {
        console.warn("Backend not running or data empty. Using Jaipur-Delhi data.");
        setZones(jaipurDelhiMockZones);
      });
  }, []);

  return (
    <div className="flex w-full h-screen h-[100dvh] bg-[#050b14] text-white font-sans overflow-hidden pattern-bg">
      <style>{`
        .pattern-bg {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .glass-panel {
          background: rgba(13, 20, 33, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
      
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        selectedZone={selectedZone} 
        onReportClick={() => setIsReportModalOpen(true)} 
      />

      {/* Main Dashboard Area */}
      <div className="flex-1 min-w-0 h-full relative flex flex-col p-2 md:p-6 overflow-hidden">
        
        {/* Top Floating Header Area (Optional over map) */}
        <div className="absolute top-6 right-8 left-8 z-10 flex justify-end pointer-events-none">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-2xl hover:bg-black/80 transition-all border border-white/20 pointer-events-auto"
           >
             {isSidebarOpen ? 'Hide Panel' : 'Show Panel'}
           </button>
        </div>
        
        <div className="flex-1 w-full relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0f172a]">
          {API_KEY ? (
            <div className="absolute inset-0">
              <MapComponent apiKey={API_KEY} zones={zones} onZoneClick={setSelectedZone} />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20">
              <div className="bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/10 max-w-lg shadow-2xl">
                <Shield className="w-16 h-16 text-indigo-500 mb-6 mx-auto opacity-90" />
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 mb-4">Google Maps Verification Required</h2>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                  SafeRoute requires a valid Google Maps API Key to render the interactive safety layer. Ensure <code className="bg-black py-1 px-2 rounded-md mx-1 font-mono text-xs border border-white/10 text-indigo-300">VITE_GOOGLE_MAPS_API_KEY</code> is set in your <code className="bg-black py-1 px-2 rounded-md mx-1 font-mono text-xs border border-white/10 text-indigo-300">.env</code>.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-5 py-2.5 rounded-full border border-emerald-500/20 shadow-inner">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Data Synced: {zones.length} Active Safety Zones
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        locationId={selectedZone?.location?.id}
        onSubmit={(review) => {
          console.log("Review submitted:", review);
          alert("Thank you! Your report has been submitted to the community safety network.");
        }}
      />
    </div>
  );
}

export default App;
