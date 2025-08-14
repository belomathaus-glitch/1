import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  ShoppingBag, 
  User, 
  Award, 
  LogOut, 
  X,
  Zap,
  Ticket
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  const navLinks = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/roleta', icon: <Zap size={20} />, label: 'Roletas' },
    { to: '/wallet', icon: <CreditCard size={20} />, label: 'Carteira' },
    { to: '/marketplace', icon: <ShoppingBag size={20} />, label: 'Marketplace' },
    { to: '/profile', icon: <User size={20} />, label: 'Perfil' },
    { to: '/ranking', icon: <Award size={20} />, label: 'Ranking' },
    { to: '/tickets', icon: <Ticket size={20} />, label: 'Suporte' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 pt-16 bg-imperial-purple-900/80 backdrop-blur-md border-r border-imperial-purple-800/80 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-imperial-purple-800/50 text-gray-400 hover:text-white md:hidden"
        >
          <X size={18} />
        </button>
        
        <div className="p-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-imperial-purple-500/20 to-imperial-purple-400/20 text-white border border-imperial-purple-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-imperial-purple-800/70'
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
                {link.to === '/roleta' && (
                  <span className="ml-auto px-1.5 py-0.5 text-xs rounded-full bg-imperial-purple-500/20 text-imperial-purple-400 border border-imperial-purple-500/30">
                    Hot
                  </span>
                )}
              </NavLink>
            ))}
          </div>
          
          <div className="pt-8 mt-8 border-t border-imperial-purple-800/50">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-imperial-purple-800/70 transition-all"
            >
              <LogOut size={20} className="mr-3" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;