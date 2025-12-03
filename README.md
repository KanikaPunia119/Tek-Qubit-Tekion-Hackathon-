# Car Configurator

**Description:** Real-time collaborative vehicle configurator web app. The frontend is a React application that lets users pick a vehicle model, trim, color, wheels, interior and optional packages while the backend (Node/Express + Socket.IO) enables session-based real-time collaboration so multiple people can configure the same car together.

**Features:**
- **Live Collaboration:** Create or join a session and collaborate in real-time using `socket.io` (events: `join-session`, `config-update`, `config-sync`, `users-updated`).
- **Configurable Options:** Models, trims, colors, wheels, interiors and packages are defined in `frontend/src/data/vehicleData.js`.
- **Price Calculations:** Total price, breakdown and monthly payment calculations are in `frontend/src/utils/calculations.js`.
- **Save / Share:** Download the current configuration as JSON and copy/share session IDs.
- **User Presence:** See connected collaborators and who last modified the config.

**Repository Structure:**
- `backend/` — Node/Express server with Socket.IO handling sessions and collaboration.
- `frontend/` — Create React App frontend with TailwindCSS styling and collaborative UI components.

**Quick Start (development)**

Prerequisites:
- `Node.js` (v16+ recommended) and `npm` installed.

Open two terminals (or use your preferred terminal multiplexer):

1) Start the backend

```powershell
cd backend
npm install
# Development with auto-reload
npm run dev
# Or run production-like server
npm start
```

Environment variables (optional):
- `CLIENT_URL` — allowed origin for CORS in `backend/server.js` (defaults to `http://localhost:3000`).

2) Start the frontend

```powershell
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` and the backend defaults to `http://localhost:3001`.

To change the backend URL used by the frontend set `REACT_APP_BACKEND_URL` in a `.env` file inside `frontend/`.

**Build & Deploy**
- Build the frontend for production:

```powershell
cd frontend
npm run build
```

- The backend is a simple Node server and can be run with `node server.js` (ensure `PORT` env var is set if you want a different port).

**Key Files & Where to Look**
- **Frontend**:
  - `frontend/src/App.jsx` — main app and UI flow (session start/join, config state, save/share actions).
  - `frontend/src/data/vehicleData.js` — models, colors, wheels, interior and package definitions and `defaultConfig`.
  - `frontend/src/hooks/useCollaboration.js` — Socket.IO client logic (connect, join session, receive config updates).
  - `frontend/src/utils/calculations.js` — price and payment calculation helpers.
  - `frontend/src/components/` — UI components: `ModelSelector`, `TrimSelector`, `ColorSelector`, `VehiclePreview`, `PriceSummary`, `JoinModal`, etc.

- **Backend**:
  - `backend/server.js` — session management using an in-memory `Map`, Socket.IO event handlers and basic HTTP endpoints (`/health`, `/session/:sessionId`).
  - `backend/package.json` — server dependencies and scripts. Use `npm run dev` for nodemon auto-reload.

**How Collaboration Works (overview)**
- When a user creates or joins a session they emit `join-session` with a `sessionId` and `userName`.
- The backend keeps a session object with `users` and a shared `config`.
- When a user updates the config the frontend emits `config-update` which the server broadcasts to other session members as `config-sync`.

**Extending / Customizing**
- Add or edit vehicles, colors, trims or packages in `frontend/src/data/vehicleData.js`.
- Price/finance logic lives in `frontend/src/utils/calculations.js`.
- The backend currently stores sessions in memory — for persistence across restarts add a database or external store.

**Notes**
- This project is intended as a demo/prototype: authentication, persistent storage and production hardening are not implemented.
