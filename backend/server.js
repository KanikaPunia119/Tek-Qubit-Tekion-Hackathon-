const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store active sessions
const sessions = new Map();

// Generate random color for user
const getRandomColor = () => {
  const colors = ['#0D6EFD', '#DC3545', '#FFC107', '#28A745', '#6F42C1', '#FD7E14'];
  return colors[Math.floor(Math.random() * colors.length)];
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a session
  socket.on('join-session', ({ sessionId, userName }) => {
    socket.join(sessionId);
    
    // Initialize session if it doesn't exist
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, {
        users: [],
        config: {
          model: 'model-s',
          trim: 'base',
          color: 'white',
          wheels: '18-standard',
          interior: 'cloth',
          packages: [],
          lastModifiedBy: 'System'
        }
      });
    }
    
    const session = sessions.get(sessionId);
    
    // Add user to session
    const userColor = getRandomColor();
    const user = { 
      id: socket.id, 
      name: userName || 'Guest', 
      color: userColor 
    };
    
    session.users.push(user);
    
    // Send current users to all in session
    io.to(sessionId).emit('users-updated', session.users);
    
    // Send current config to the new user
    socket.emit('config-sync', session.config);
    
    console.log(`${userName} joined session ${sessionId}`);
  });

  // Update configuration
  socket.on('config-update', ({ sessionId, config }) => {
    const session = sessions.get(sessionId);
    if (session) {
      session.config = config;
      // Broadcast to all users in the session except sender
      socket.to(sessionId).emit('config-sync', config);
      console.log(`Config updated in session ${sessionId} by ${config.lastModifiedBy}`);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    // Remove user from all sessions
    sessions.forEach((session, sessionId) => {
      const userIndex = session.users.findIndex(u => u.id === socket.id);
      if (userIndex !== -1) {
        const userName = session.users[userIndex].name;
        session.users.splice(userIndex, 1);
        
        // Notify remaining users
        io.to(sessionId).emit('users-updated', session.users);
        
        // Clean up empty sessions
        if (session.users.length === 0) {
          sessions.delete(sessionId);
          console.log(`Session ${sessionId} deleted (empty)`);
        } else {
          console.log(`${userName} left session ${sessionId}`);
        }
      }
    });
  });
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    activeSessions: sessions.size,
    timestamp: new Date().toISOString()
  });
});

// Get session info
app.get('/session/:sessionId', (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (session) {
    res.json({
      exists: true,
      userCount: session.users.length,
      users: session.users.map(u => ({ name: u.name, color: u.color }))
    });
  } else {
    res.json({ exists: false });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});