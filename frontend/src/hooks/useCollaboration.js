import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export const useCollaboration = (sessionId, userName) => {
  const [socket, setSocket] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [remoteConfig, setRemoteConfig] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const newSocket = io(BACKEND_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      newSocket.emit('join-session', { sessionId, userName });
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('users-updated', (users) => {
      console.log('Users updated:', users);
      setCollaborators(users);
    });

    newSocket.on('config-sync', (config) => {
      console.log('Config synced:', config);
      setRemoteConfig(config);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [sessionId, userName]);

  const updateConfig = useCallback((config) => {
    if (socket && isConnected) {
      socket.emit('config-update', { sessionId, config });
    }
  }, [socket, isConnected, sessionId]);

  return {
    socket,
    collaborators,
    isConnected,
    remoteConfig,
    updateConfig
  };
};