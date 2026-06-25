import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { translations } from '../i18n';

// Mock data to be replaced by API
const generateMockData = () => {
  const data = [];
  let base = 1000;
  for (let i = 1; i <= 36; i++) {
    const val = base + (i * 10) + (Math.sin(i * Math.PI / 6) * 200) + (Math.random() * 100 - 50);
    data.push({
      month: `Month ${i}`,
      sales: Math.max(0, Math.round(val))
    });
  }
  return data;
};

export default function EDAPanel({ lang }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const t = translations[lang].eda;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/eda');
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching EDA data, using mock", error);
        setData(generateMockData());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-very-dark-green flex items-center gap-2">
          <TrendingUp className="text-primary-red" />
          {t.title}
        </h2>
        <p className="text-dark-green mt-2">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-cream/50 p-4 rounded-xl border border-dark-green/10">
          <div className="flex items-center gap-2 text-primary-orange font-semibold mb-1">
            <TrendingUp size={18} /> {t.trend}
          </div>
          <p className="text-sm text-very-dark-green">{t.trendDesc}</p>
        </div>
        <div className="bg-cream/50 p-4 rounded-xl border border-dark-green/10">
          <div className="flex items-center gap-2 text-primary-red font-semibold mb-1">
            <Calendar size={18} /> {t.seasonality}
          </div>
          <p className="text-sm text-very-dark-green">{t.seasonalityDesc}</p>
        </div>
        <div className="bg-cream/50 p-4 rounded-xl border border-dark-green/10">
          <div className="flex items-center gap-2 text-dark-green font-semibold mb-1">
            <AlertCircle size={18} /> {t.variance}
          </div>
          <p className="text-sm text-very-dark-green">{t.varianceDesc}</p>
        </div>
      </div>

      <div className="flex-1 min-h-[400px] w-full bg-white rounded-xl shadow-inner border border-gray-100 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#084A24" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#084A24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{fill: '#04261E', fontSize: 12}} />
            <YAxis tick={{fill: '#04261E', fontSize: 12}} />
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#04261E', color: '#F2EDD5', borderRadius: '8px', border: 'none' }}
              itemStyle={{ color: '#F26716' }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#084A24" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
