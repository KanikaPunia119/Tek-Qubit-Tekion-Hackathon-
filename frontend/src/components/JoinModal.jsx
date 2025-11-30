import React, { useState } from 'react';
import { Users } from 'lucide-react';

const JoinModal = ({ onStart, onJoin }) => {
  const [inputSessionId, setInputSessionId] = useState('');
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleStart = () => {
    setShowNameInput(true);
    setIsJoining(false);
  };

  const handleJoinClick = () => {
    setShowNameInput(true);
    setIsJoining(true);
  };

  const handleSubmit = () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (isJoining) {
      if (!inputSessionId.trim()) {
        alert('Please enter a session ID');
        return;
      }
      onJoin(inputSessionId.toUpperCase(), userName);
    } else {
      onStart(userName);
    }
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-custom p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isJoining ? 'Join Session' : 'Start Session'}
            </h2>
            <p className="text-gray-600">Enter your name to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                autoFocus
              />
            </div>

            {isJoining && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session ID
                </label>
                <input
                  type="text"
                  value={inputSessionId}
                  onChange={(e) => setInputSessionId(e.target.value.toUpperCase())}
                  placeholder="Enter Session ID"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none uppercase"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  maxLength={6}
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all"
            >
              Continue
            </button>

            <button
              onClick={() => setShowNameInput(false)}
              className="w-full text-gray-600 hover:text-gray-800 font-medium py-2"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-custom p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Car Configurator
          </h1>
          <p className="text-gray-600">
            Collaborate in real-time with family or friends
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 hover-scale"
          >
            <Users size={20} />
            Start New Session
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleJoinClick}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 rounded-lg transition-all hover-scale"
          >
            Join Existing Session
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Built for Tekion - Collaborative Vehicle Customization</p>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;