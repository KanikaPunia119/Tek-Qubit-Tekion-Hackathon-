import React from 'react';
import { Users, Share2, Save } from 'lucide-react';

const Header = ({ sessionId, collaborators, isConnected, onSave, onShare }) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Car Configurator</h1>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Session: {sessionId}</p>
              <span className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-xs text-gray-400">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-gray-600" />
              <div className="flex -space-x-2">
                {collaborators.map((collab) => (
                  <div
                    key={collab.id}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                    style={{ backgroundColor: collab.color }}
                    title={collab.name}
                  >
                    {collab.name.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {collaborators.length} {collaborators.length === 1 ? 'user' : 'users'}
              </span>
            </div>

            <button
              onClick={onShare}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <Share2 size={18} />
              Share
            </button>

            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              <Save size={18} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;