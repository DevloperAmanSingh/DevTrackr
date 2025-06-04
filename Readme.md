# 🧠 DevTrackr — Real-Time VS Code Activity Tracker

DevTrackr is a full-stack productivity tool that tracks your coding activity in real time inside VS Code. It logs files, folders, and language usage with anti-cheat detection, syncs data to a backend, and visualizes stats in a minimal, elegant UI.

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/your-username.devtrackr?color=blue&label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=your-username.devtrackr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<img width="1710" alt="image" src="https://github.com/user-attachments/assets/97f63d08-b7c5-4fcf-9a38-c86b16b51fd5" />

## 🎯 Why DevTrackr?

- **Real-time Tracking**: Get instant insights into your coding habits and productivity patterns
- **Anti-cheat Protection**: Built-in mechanisms to ensure accurate time tracking
- **Privacy-Focused**: All data is stored locally first, with optional cloud sync
- **Beautiful Analytics**: Modern, responsive dashboard with dark/light theme support
- **Shareable Stats**: Generate and share your coding activity cards with others

## 🚀 Features

### 🔌 VS Code Extension

- **Smart Activity Tracking**
  - Real-time file, folder & language usage monitoring
  - Intelligent idle detection (60-second threshold)
  - Window focus-based tracking
  - Configurable tracked file extensions
- **Anti-cheat Logic**
  - Window activity monitoring
  - Time gap detection
  - Focus state validation
- **Data Management**
  - Local JSON storage with periodic saves
  - Automatic cloud sync every 10 seconds
  - Session-based authentication
  - Workspace-specific tracking

### ⚙️ Backend API (Node.js + MongoDB)

- **Authentication & Security**
  - Session-key based authentication
  - JWT token validation
  - Rate limiting and request validation
- **Data Management**
  - Efficient upsert operations
  - Consolidated daily log storage
  - Automatic data aggregation
- **RESTful Endpoints**
  - User management
  - Log synchronization
  - Statistics generation
  - Shareable stat cards

### 🖥️ Frontend (React + TailwindCSS)

- **Modern UI/UX**
  - Responsive design with mobile support
  - Dark/light theme with smooth transitions
  - Interactive data visualizations
- **Dashboard Features**
  - Daily, weekly, and all-time usage stats
  - Top folders and files analysis
  - Language-specific time tracking
  - Customizable date ranges
- **Sharing Capabilities**
  - Public stat card generation
  - Customizable sharing options
  - Embeddable widgets

## 🛠️ Technical Stack

### Frontend

- React 18
- TailwindCSS
- Chart.js for visualizations
- React Query for data fetching
- TypeScript for type safety

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Redis for caching
- TypeScript for type safety

### VS Code Extension

- TypeScript
- VS Code Extension API
- Node.js file system operations
- WebSocket for real-time sync

## 📦 Installation

### VS Code Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "DevTrackr"
4. Click Install

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/devtrackr.git

# Install dependencies
cd devtrackr/backend
npm install

# Set up environment variables
cp .env.example .env

# Start the server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd devtrackr/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Configuration

### VS Code Extension

```json
{
  "devtrackr.trackedExtensions": [".js", ".ts", ".py", ".java"],
  "devtrackr.idleThreshold": 60,
  "devtrackr.syncInterval": 10
}
```

### Environment Variables

```env
# Backend
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url

# Frontend
VITE_API_URL=your_api_url
VITE_WS_URL=your_websocket_url
```

## 📊 Usage

1. **Connect Your Account**

   - Open VS Code
   - Press `Ctrl+Shift+P`
   - Type "DevTrackr: Connect Session"
   - Enter your session key

2. **View Your Stats**

   - Visit the DevTrackr dashboard
   - Log in with your session key
   - Explore your coding activity

3. **Share Your Stats**
   - Click "Share Stats" in the dashboard
   - Customize your stat card
   - Copy the generated link

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- VS Code Extension API documentation
- MongoDB documentation
- React and TailwindCSS communities
---

⭐️ If you like this project, please give it a star on GitHub!
