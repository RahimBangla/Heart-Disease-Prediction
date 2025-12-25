import React, { useState } from 'react';
import SingleImagePrediction from './SingleImagePrediction';
import BatchPrediction from './BatchPrediction';
import './PredictionTabs.css';

type TabType = 'single' | 'batch';

const PredictionTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('single');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="prediction-tabs">
      <aside className="sidebar-nav">
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => handleTabChange('single')}
          >
            <div className="nav-icon">
              <i className="fas fa-image"></i>
            </div>
            <div className="nav-content">
              <span className="nav-title">Single Image</span>
              <span className="nav-desc">Analyze individual X-rays</span>
            </div>
          </button>
          <button 
            className={`nav-item ${activeTab === 'batch' ? 'active' : ''}`}
            onClick={() => handleTabChange('batch')}
          >
            <div className="nav-icon">
              <i className="fas fa-folder"></i>
            </div>
            <div className="nav-content">
              <span className="nav-title">Batch Analysis</span>
              <span className="nav-desc">Process multiple images</span>
            </div>
          </button>
        </nav>
      </aside>

      <div className="tab-content-wrapper">
        <div className="tab-content">
          {activeTab === 'single' && <SingleImagePrediction />}
          {activeTab === 'batch' && <BatchPrediction />}
        </div>
      </div>
    </div>
  );
};

export default PredictionTabs; 