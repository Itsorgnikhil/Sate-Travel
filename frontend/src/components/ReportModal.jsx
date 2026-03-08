import { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, onSubmit, locationId }) {
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    // In real app, call backend POST /api/locations/{id}/reviews
    // For demo, we just trigger the callback
    onSubmit({
      locationId: locationId || 1,
      content,
      sentimentScore: 0 // Backend calculates this
    });
    
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#0f172a] border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <AlertTriangle className="text-orange-500 w-5 h-5" />
            Report Incident
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
            <div className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-2 px-3 text-sm text-gray-300">
              Current Location / Selected Area
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">What happened?</label>
            <textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="E.g., Poor lighting, suspicious activity, accident..."
              className="w-full bg-[#050b14] border border-gray-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[120px] text-white placeholder-gray-600"
              required
            />
          </div>
          
          <div className="pt-2">
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]">
              <Send className="w-4 h-4" />
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
