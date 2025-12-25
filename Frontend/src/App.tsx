import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import PredictionTabs from './components/PredictionTabs';
import './App.css';

function App() {
  return (
    <div className="App">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#fff',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <PredictionTabs />
        </main>
      </div>
    </div>
  );
}

export default App;
