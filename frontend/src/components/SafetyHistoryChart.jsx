import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, subDays } from 'date-fns';

export default function SafetyHistoryChart({ zoneData }) {
  // Generate 30 days of mock data based on the current zone status
  const historyData = Array.from({ length: 30 }).map((_, i) => {
    const date = subDays(new Date(), 29 - i);
    
    // Add some random variation but trend towards the current status
    let score = 0;
    if (zoneData.status === 'GREEN') score = 70 + Math.random() * 30;
    else if (zoneData.status === 'ORANGE') score = 40 + Math.random() * 40;
    else score = Math.random() * 40;

    return {
      date: format(date, 'MMM dd'),
      score: Math.round(score),
      // For tooltip color helper
      status: score > 70 ? 'GREEN' : score > 40 ? 'ORANGE' : 'RED'
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0f172a] border border-gray-800 p-3 rounded-xl shadow-xl">
          <p className="text-gray-400 text-xs mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              data.status === 'GREEN' ? 'bg-green-500' :
              data.status === 'ORANGE' ? 'bg-orange-500' : 'bg-red-500'
            }`} />
            <p className="text-white font-bold">{data.score}/100 Safety Score</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-48 w-full mt-4">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">30-Day Safety Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={historyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 10 }}
            minTickGap={20}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 10 }} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar 
            dataKey="score" 
            radius={[4, 4, 0, 0]}
            fill="#6366f1"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
