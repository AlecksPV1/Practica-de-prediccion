import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import EDAPanel from './components/EDAPanel';
import ComparisonPanel from './components/ComparisonPanel';
import { translations } from './i18n';

function App() {
  const [lang, setLang] = useState('es');
  const [activeTab, setActiveTab] = useState('eda'); // 'eda' or 'comparison'
  const [selectedModels, setSelectedModels] = useState(['linear', 'arima']);
  
  const t = translations[lang].app;

  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      <Sidebar 
        lang={lang}
        setLang={setLang}
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
      />
      
      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        <header className="mb-6 flex justify-between items-end border-b border-dark-green/20 pb-4">
          <div>
            <h1 className="text-4xl font-bold text-very-dark-green mb-2">{t.title}</h1>
            <p className="text-dark-green">{t.subtitle}</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-dark-green/10 shadow-sm">
            <span className="text-sm font-semibold text-primary-red">{t.datasetLabel}</span>
            <span className="ml-2 text-sm text-very-dark-green">{t.datasetName}</span>
          </div>
        </header>

        <div className="flex-1 rounded-xl shadow-sm border border-dark-green/10 bg-white overflow-hidden">
          {activeTab === 'eda' ? (
            <EDAPanel lang={lang} />
          ) : (
            <ComparisonPanel selectedModels={selectedModels} lang={lang} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
