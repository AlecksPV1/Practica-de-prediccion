import React from 'react';
import { Activity, BarChart2, CheckCircle2, ChevronRight, Settings, Globe } from 'lucide-react';
import clsx from 'clsx';
import { translations } from '../i18n';

const availableModelsConfig = [
  { id: 'linear' },
  { id: 'arima' },
  { id: 'xgboost' },
  { id: 'lstm' },
];

export default function Sidebar({ lang, setLang, activeTab, setActiveTab, selectedModels, setSelectedModels }) {
  const t = translations[lang].sidebar;

  const toggleModel = (id) => {
    if (selectedModels.includes(id)) {
      if (selectedModels.length > 1) { // Prevent unselecting all
        setSelectedModels(selectedModels.filter(m => m !== id));
      }
    } else {
      setSelectedModels([...selectedModels, id]);
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <aside className="w-80 bg-very-dark-green text-cream flex flex-col shadow-2xl z-10 relative">
      <div className="p-6 border-b border-dark-green flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary-red p-2 rounded-lg">
            <Activity size={24} className="text-cream" />
          </div>
          <h2 className="text-xl font-bold tracking-wide">{t.brand}</h2>
        </div>
        <button 
          onClick={toggleLanguage}
          className="flex items-center justify-center p-2 rounded-lg bg-dark-green text-cream hover:bg-primary-orange hover:text-white transition-colors"
          title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
          <Globe size={20} />
          <span className="ml-1 text-xs font-bold uppercase">{lang}</span>
        </button>
      </div>

      <nav className="p-4 space-y-2">
        <button
          onClick={() => setActiveTab('eda')}
          className={clsx(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            activeTab === 'eda' 
              ? "bg-primary-orange text-white font-medium shadow-md" 
              : "hover:bg-dark-green text-cream/80 hover:text-white"
          )}
        >
          <BarChart2 size={20} />
          <span>{t.eda}</span>
          {activeTab === 'eda' && <ChevronRight size={16} className="ml-auto" />}
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={clsx(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            activeTab === 'comparison' 
              ? "bg-primary-orange text-white font-medium shadow-md" 
              : "hover:bg-dark-green text-cream/80 hover:text-white"
          )}
        >
          <Settings size={20} />
          <span>{t.comparison}</span>
          {activeTab === 'comparison' && <ChevronRight size={16} className="ml-auto" />}
        </button>
      </nav>

      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-orange mb-4">
          {t.modelsTitle}
        </h3>
        
        <div className="space-y-3">
          {availableModelsConfig.map(model => {
            const isSelected = selectedModels.includes(model.id);
            const modelInfo = t.models[model.id];
            return (
              <div 
                key={model.id}
                onClick={() => toggleModel(model.id)}
                className={clsx(
                  "p-3 rounded-lg cursor-pointer transition-all duration-200 border",
                  isSelected 
                    ? "bg-dark-green border-primary-orange" 
                    : "bg-very-dark-green border-dark-green hover:border-cream/30"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={clsx("font-medium", isSelected ? "text-white" : "text-cream/80")}>
                    {modelInfo.name}
                  </span>
                  {isSelected && <CheckCircle2 size={16} className="text-primary-orange" />}
                </div>
                <p className="text-xs text-cream/60">{modelInfo.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-6 border-t border-dark-green bg-very-dark-green/50">
        <div className="text-xs text-center text-cream/40">
          {t.portfolioLabel}<br/>
          <span className="font-semibold text-cream/60">{t.author}</span>
        </div>
      </div>
    </aside>
  );
}
