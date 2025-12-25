import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Header.css';

interface ModelStatus {
  status: string;
  device: string;
  model_type: string;
  trained_model_loaded: boolean;
  model_file_size: string;
  message: string;
}

const Header: React.FC = () => {
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkModelStatus = async () => {
      try {
        const response = await axios.get(' https://api.ml.yfbd.org/api/model/status');
        setModelStatus(response.data);
      } catch (error) {
        console.error('Failed to get model status:', error);
        setModelStatus({
          status: 'error',
          device: 'Unknown',
          model_type: 'Unknown',
          trained_model_loaded: false,
          model_file_size: 'N/A',
          message: 'Could not connect to backend'
        });
      } finally {
        setLoading(false);
      }
    };

    checkModelStatus();
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo Section */}
        <div className="header-logo">
          <div className="logo-icon">
            <i className="fas fa-x-ray"></i>
          </div>
          <div className="logo-text">
            <h1>Xray Image Prediction</h1>
            <span className="tagline">Data Mining Project</span>
          </div>
        </div>

        {/* Center Info Section */}
        <div className="header-center">
          <div className="project-meta">
            <div className="meta-item">
              <i className="fas fa-user-graduate"></i>
              <div className="meta-content">
                <span className="meta-label">Students</span>
                <span className="meta-value">Md. Abdur Rahim Sarkar (221902011)</span>
                <span className="meta-value">Ramjan Ali (221902227)</span>
              </div>
            </div>
            <div className="meta-item">
              <i className="fas fa-chalkboard-teacher"></i>
              <div className="meta-content">
                <span className="meta-label">Supervised by</span>
                <span className="meta-value">Md Atikuzzaman</span>
                <span className="meta-sub">Lecturer, CSE Dept.</span>
              </div>
            </div>
            <div className="meta-item">
              <i className="fas fa-university"></i>
              <div className="meta-content">
                <span className="meta-label">Institution</span>
                <span className="meta-value">Green University of Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Model Status */}
        <div className="header-right">
          <div className="model-status">
            {loading ? (
              <div className="status-indicator loading">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Loading...</span>
              </div>
            ) : modelStatus ? (
              <div className={`status-indicator ${modelStatus.trained_model_loaded ? 'ready' : 'demo'}`}>
                <i className={`fas ${modelStatus.trained_model_loaded ? 'fa-check-circle' : 'fa-info-circle'}`}></i>
                <span>{modelStatus.trained_model_loaded ? 'Ready' : 'Demo'}</span>
                <div className="status-tooltip">
                  <strong>Model Status:</strong> {modelStatus.message}<br />
                  <strong>Device:</strong> {modelStatus.device}<br />
                  <strong>Type:</strong> {modelStatus.model_type}<br />
                  {modelStatus.trained_model_loaded && (
                    <><strong>Size:</strong> {modelStatus.model_file_size}</>
                  )}
                </div>
              </div>
            ) : (
              <div className="status-indicator error">
                <i className="fas fa-exclamation-triangle"></i>
                <span>Error</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 