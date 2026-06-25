import React from 'react';
import { Lightbulb, Info, Target, AlertTriangle } from 'lucide-react';
import { translations } from '../i18n';

const modelColors = {
  linear: "#E7390D",
  arima: "#F26716",
  xgboost: "#084A24",
  lstm: "#04261E"
};

export default function EducationalCard({ modelId, lang }) {
  const t = translations[lang].card;
  const info = t.models[modelId];
  
  if (!info) return null;

  return (
    <div className="bg-white rounded-xl border border-dark-green/20 shadow-sm overflow-hidden flex flex-col h-full">
      <div 
        className="h-2 w-full" 
        style={{ backgroundColor: modelColors[modelId] }}
      />
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-very-dark-green">{info.title}</h3>
            <span className="inline-block px-2 py-1 bg-cream text-dark-green text-xs font-semibold rounded mt-1">
              {info.badge}
            </span>
          </div>
        </div>

        <div className="space-y-4 flex-1 text-sm">
          <div>
            <div className="flex items-center gap-1.5 text-dark-green font-bold mb-1">
              <Target size={16} /> {t.pros}
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {info.pros.map((pro, i) => <li key={i}>{pro}</li>)}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-primary-red font-bold mb-1">
              <AlertTriangle size={16} /> {t.cons}
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              {info.cons.map((con, i) => <li key={i}>{con}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-5 bg-cream/50 p-3 rounded-lg border border-dark-green/10">
          <div className="flex items-center gap-1.5 text-primary-orange font-bold mb-1 text-sm">
            <Lightbulb size={16} /> {t.useCase}
          </div>
          <p className="text-xs text-very-dark-green leading-relaxed">
            {info.businessCase}
          </p>
        </div>
      </div>
    </div>
  );
}
