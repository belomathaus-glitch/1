import React from 'react';
import { X, AlertCircle, Award, Gift } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'win',
      title: 'Parabéns! Você ganhou!',
      message: 'Você ganhou 500 BlacCoins na roleta Premium!',
      time: '2 minutos atrás',
      icon: <Gift className="text-pink-400\" size={20} />,
      read: false
    },
    {
      id: 2,
      type: 'bonus',
      title: 'Bônus Diário',
      message: 'Seu bônus diário de 100 BlacCoins está disponível!',
      time: '1 hora atrás',
      icon: <Gift className="text-yellow-400" size={20} />,
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'Depósito Confirmado',
      message: 'Seu depósito de R$ 50,00 foi confirmado.',
      time: '3 horas atrás',
      icon: <AlertCircle className="text-green-400\" size={20} />,
      read: true
    },
    {
      id: 4,
      type: 'ranking',
      title: 'Você subiu no ranking!',
      message: 'Você agora está entre os top 10 jogadores da semana!',
      time: '1 dia atrás',
      icon: <Award className="text-blue-400" size={20} />,
      read: true
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <aside 
        className="fixed top-0 right-0 z-50 h-full w-80 pt-16 bg-gray-900/80 backdrop-blur-md border-l border-gray-800/80 transform transition-transform duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          <h2 className="text-lg font-medium">Notificações</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-7rem)]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-800/50">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-800/30 transition-colors ${!notification.read ? 'bg-gray-800/20' : ''}`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="h-8 w-8 rounded-full bg-gray-800/70 flex items-center justify-center">
                        {notification.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{notification.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-800/70 flex items-center justify-center mb-4">
                <Bell size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-400">Nenhuma notificação ainda</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default NotificationsPanel;