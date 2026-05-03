import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Dashboard from './pages/Dashboard';
import AddSubscription from './pages/AddSubscription';
import ManageSubscriptions from './pages/ManageSubscriptions';
import './styles/App.css';

// Inner App component (uses theme context)
function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={`app ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddSubscription />} />
          <Route path="/manage" element={<ManageSubscriptions />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// Outer App component (provides theme context)
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
