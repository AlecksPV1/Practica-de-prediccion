import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import EducationalCard from './EducationalCard';
import { Activity } from 'lucide-react';
import axios from 'axios';
import { translations } from '../i18n';

const modelColors = {
  linear: '#E7390D', // Primary Red
  arima: '#F26716',  // Primary Orange
  xgboost: '#084A24',// Dark Green
  lstm: '#04261E'    // Very Dark Green
};

export default function ComparisonPanel({ selectedModels, lang }) {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(false);

  const t = translations[lang].comparison;

  useEffect(() => {
    if (selectedModels.length === 0) return;

    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/predict', {
          models: selectedModels
        });
        
        setData(response.data.chart_data);
        setMetrics(response.data.metrics);
      } catch (error) {
        console.error("Error fetching predictions, falling back to mock", error);
        generateMockPredictions(selectedModels);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [selectedModels]);

  const generateMockPredictions = (models) => {
    const mockData = [];
    const mockMetrics = {};
    
    let base = 1300;
    for (let i = 1; i <= 12; i++) {
      const realVal = base + (Math.sin(i * Math.PI / 6) * 200) + (Math.random() * 80 - 40);
      const row = { month: `Test M${i}`, real: Math.round(realVal) };
      
      models.forEach(m => {
        let errorMargin;
        if(m === 'linear') errorMargin = 150;
        else if(m === 'arima') errorMargin = 80;
        else if(m === 'xgboost') errorMargin = 40;
        else errorMargin = 50;
        
        row[m] = Math.round(realVal + (Math.random() * errorMargin * 2 - errorMargin));
      });
      mockData.push(row);
    }
    
    models.forEach(m => {
      mockMetrics[m] = {
        rmse: m === 'linear' ? 120.5 : m === 'arima' ? 65.2 : m === 'xgboost' ? 32.1 : 45.8,
        mae: m === 'linear' ? 95.2 : m === 'arima' ? 50.1 : m === 'xgboost' ? 25.4 : 35.6
      };
    });

    setData(mockData);
    setMetrics(mockMetrics);
  };

  if (selectedModels.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-dark-green">
        <Activity size={48} className="mb-4 opacity-50" />
        <h3 className="text-xl font-bold">{t.noSelectionTitle}</h3>
        <p>{t.noSelectionDesc}</p>
      </div>
    );
  }

  return (
    <div className="h-full p-8 flex flex-col overflow-hidden">
      
      <div className="flex-none h-1/2 min-h-[300px] mb-8 relative">
        <h2 className="text-xl font-bold text-very-dark-green mb-4">
          {t.title}
        </h2>
        
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-orange"></div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{fill: '#04261E', fontSize: 12}} />
            <YAxis tick={{fill: '#04261E', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#04261E', color: '#F2EDD5', borderRadius: '8px', border: 'none' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
            
            <Line 
              type="monotone" 
              dataKey="real" 
              name={t.realSales}
              stroke="#04261E" 
              strokeWidth={4}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }} 
            />
            
            {selectedModels.map(model => (
              <Line 
                key={model}
                type="monotone" 
                dataKey={model} 
                name={model.toUpperCase()} 
                stroke={modelColors[model]} 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-lg font-bold text-very-dark-green mb-4 border-b border-gray-100 pb-2">
          {t.analysisTitle}
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 pb-6">
          {selectedModels.map(model => (
            <div key={model} className="flex flex-col">
              <EducationalCard modelId={model} lang={lang} />
              
              {metrics[model] && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-cream/30 p-2 rounded text-center border border-dark-green/10">
                    <div className="text-[10px] uppercase font-bold text-dark-green">RMSE</div>
                    <div className="font-mono font-bold text-primary-red">{metrics[model].rmse.toFixed(2)}</div>
                  </div>
                  <div className="bg-cream/30 p-2 rounded text-center border border-dark-green/10">
                    <div className="text-[10px] uppercase font-bold text-dark-green">MAE</div>
                    <div className="font-mono font-bold text-primary-orange">{metrics[model].mae.toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
