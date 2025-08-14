import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import Layout from './components/layout/Layout';
import AuthGuard from './components/auth/AuthGuard';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import RoletaPage from './pages/roleta/RoletaPage';
import ProfilePage from './pages/profile/ProfilePage';
import WalletPage from './pages/wallet/WalletPage';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route element={<AuthGuard><Layout /></AuthGuard>}>
              <Route path="/" element={<Navigate to="/dashboard\" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roleta" element={<RoletaPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;