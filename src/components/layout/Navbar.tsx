import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { Menu, Bell, User, Menu as MenuIcon } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  toggleNotifications: () => void;
  userName: string;
  userAvatar?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  toggleSidebar, 
  toggleNotifications, 
  userName, 
  userAvatar 
}) => {
  const { balance } = useWallet();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40 backdrop-blur-md bg-black/60 border-b border-imperial-purple-800/80">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-2 rounded-full text-gray-400 hover:text-white hover:bg-imperial-purple-800/50 transition-colors focus:outline-none"
          >
            <MenuIcon size={22} />
          </button>
          
          <Link to="/dashboard" className="flex items-center">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-imperial-purple-400 to-imperial-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
                <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow"></div>
              </div>
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-imperial-purple-400 via-imperial-purple-300 to-imperial-purple-500">
              BLAC
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <div className="px-3 py-1.5 rounded-lg bg-imperial-purple-900/50 backdrop-blur-sm border border-imperial-purple-700/50">
              <div className="flex items-center">
                <div className="h-4 w-4 mr-1.5">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
                </div>
                <span className="text-yellow-300 font-medium">{balance.blacCoin.toFixed(2)} BC</span>
              </div>
            </div>
            
            <div className="px-3 py-1.5 rounded-lg bg-imperial-purple-900/50 backdrop-blur-sm border border-imperial-purple-700/50">
              <div className="flex items-center">
                <span className="text-green-400 mr-1.5 font-medium">R$</span>
                <span className="text-green-400 font-medium">{balance.brl.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={toggleNotifications}
            className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-imperial-purple-800/50 transition-colors focus:outline-none"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-imperial-purple-500"></span>
          </button>
          
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-imperial-purple-800/50 transition-colors"
          >
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="h-7 w-7 rounded-full object-cover border border-imperial-purple-700/50" />
            ) : (
              <div className="h-7 w-7 rounded-full bg-imperial-purple-800 flex items-center justify-center border border-imperial-purple-700/50">
                <User size={16} />
              </div>
            )}
            <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">
              {userName}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;