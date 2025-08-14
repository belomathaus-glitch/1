import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import NotificationsPanel from '../notifications/NotificationsPanel';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-imperial-purple-950 to-black z-[-1]" />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden opacity-30">
        <div className="absolute w-96 h-96 rounded-full bg-imperial-purple-600/20 blur-3xl top-10 -left-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 rounded-full bg-imperial-purple-500/20 blur-3xl bottom-10 -right-20 animate-pulse-slower" />
        <div className="absolute w-80 h-80 rounded-full bg-imperial-purple-400/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      
      <Navbar 
        toggleSidebar={toggleSidebar} 
        toggleNotifications={toggleNotifications}
        userName={user?.displayName || 'Usuário'} 
        userAvatar={user?.photoURL}
      />
      
      <div className="flex pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-300">
          <Outlet />
        </main>
        
        <NotificationsPanel 
          isOpen={notificationsOpen} 
          onClose={() => setNotificationsOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Layout;