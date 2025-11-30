import React, { useState, useEffect } from 'react';
import './App.css';
import JoinModal from './components/JoinModal';
import Header from './components/Header';
import VehiclePreview from './components/VehiclePreview';
import ModelSelector from './components/ModelSelector';
import TrimSelector from './components/TrimSelector';
import ColorSelector from './components/ColorSelector';
import WheelsInterior from './components/WheelsInterior';
import PackagesSelector from './components/PackagesSelector';
import PriceSummary from './components/PriceSummary';
import { useCollaboration } from './hooks/useCollaboration';
import { defaultConfig } from './data/vehicleData';

const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

function App() {
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');
  const [config, setConfig] = useState(defaultConfig);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { collaborators, isConnected, remoteConfig, updateConfig } = useCollaboration(sessionId, userName);

  // Sync remote config changes
  useEffect(() => {
    if (remoteConfig && remoteConfig.lastModifiedBy !== userName) {
      setConfig(remoteConfig);
      showToastMessage(`${remoteConfig.lastModifiedBy} made changes`);
    }
  }, [remoteConfig, userName]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleStartSession = (name) => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setUserName(name);
    showToastMessage('Session started! Share your session ID with others.');
  };

  const handleJoinSession = (id, name) => {
    setSessionId(id);
    setUserName(name);
    showToastMessage('Joined session successfully!');
  };

  const handleConfigUpdate = (key, value) => {
    const newConfig = {
      ...config,
      [key]: value,
      lastModifiedBy: userName
    };
    setConfig(newConfig);
    updateConfig(newConfig);
  };

  const handlePackageToggle = (packageId) => {
    const newPackages = config.packages.includes(packageId)
      ? config.packages.filter(p => p !== packageId)
      : [...config.packages, packageId];
    
    handleConfigUpdate('packages', newPackages);
  };

  const handleSave = () => {
    const configData = JSON.stringify(config, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `car-config-${sessionId}.json`;
    a.click();
    showToastMessage('Configuration saved!');
  };

  const handleShare = () => {
    const shareText = `Join my car configuration session!\nSession ID: ${sessionId}\nVisit: ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Car Configurator Session',
        text: shareText
      }).catch(() => {
        copyToClipboard(sessionId);
      });
    } else {
      copyToClipboard(sessionId);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToastMessage('Session ID copied to clipboard!');
  };

  if (!sessionId) {
    return <JoinModal onStart={handleStartSession} onJoin={handleJoinSession} />;
  }

  return (
    <div className="app-container">
      <Header
        sessionId={sessionId}
        collaborators={collaborators}
        isConnected={isConnected}
        onSave={handleSave}
        onShare={handleShare}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 config-grid">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <VehiclePreview config={config} />
            
            <ModelSelector
              selectedModel={config.model}
              onSelect={(model) => handleConfigUpdate('model', model)}
            />
            
            <TrimSelector
              modelId={config.model}
              selectedTrim={config.trim}
              onSelect={(trim) => handleConfigUpdate('trim', trim)}
            />
            
            <ColorSelector
              selectedColor={config.color}
              onSelect={(color) => handleConfigUpdate('color', color)}
            />
            
            <WheelsInterior
              selectedWheels={config.wheels}
              selectedInterior={config.interior}
              onWheelsSelect={(wheels) => handleConfigUpdate('wheels', wheels)}
              onInteriorSelect={(interior) => handleConfigUpdate('interior', interior)}
            />
            
            <PackagesSelector
              selectedPackages={config.packages}
              onToggle={handlePackageToggle}
            />
          </div>

          {/* Price Summary Sidebar */}
          <div>
            <PriceSummary config={config} />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          <p className="text-sm font-medium text-gray-800">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;