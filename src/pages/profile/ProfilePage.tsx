import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Key, Copy, Check, Shield, Bell, Award } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const affiliateLink = `https://blac.com/ref/${user?.id}`;
  
  const handleCopyAffiliateLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the profile
    console.log('Update profile:', formData);
  };
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the password
    console.log('Update password:', formData);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                    Nome Completo
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                    Telefone
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">+55</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-12 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-4 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Link de Afiliado</h3>
                    <p className="mt-1 text-sm text-gray-300">
                      Compartilhe e ganhe 10% de comissão sobre os giros dos seus amigos
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0 flex">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        readOnly
                        value={affiliateLink}
                        className="block w-full pr-10 py-2 rounded-l-md border border-gray-700 bg-gray-800/70 text-gray-300 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAffiliateLink}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-700 rounded-r-md bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none transition-colors"
                    >
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        );
      case 'security':
        return (
          <div>
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400">
                  Senha Atual
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">
                  Nova Senha
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                  Confirmar Nova Senha
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-600/20 via-amber-500/20 to-amber-600/20 backdrop-blur-sm rounded-xl border border-amber-500/30 p-4 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Shield size={20} className="text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-300">Autenticação de Dois Fatores</h3>
                    <div className="mt-2 text-sm text-gray-300">
                      <p>Adicione uma camada extra de segurança ativando a autenticação de dois fatores.</p>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-amber-400/30 rounded-md text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 focus:outline-none transition-colors"
                      >
                        Ativar 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Atualizar Senha
                </button>
              </div>
            </form>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Bell size={20} className="text-blue-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-white">Notificações por Email</h3>
                    <div className="mt-2 text-sm text-gray-300">
                      <p>Receba emails sobre suas atividades, promoções e atualizações.</p>
                    </div>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center">
                        <input
                          id="email-promo"
                          name="email-promo"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                        />
                        <label htmlFor="email-promo" className="ml-3 text-sm text-gray-300">
                          Promoções e novidades
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="email-wins"
                          name="email-wins"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                        />
                        <label htmlFor="email-wins" className="ml-3 text-sm text-gray-300">
                          Notificações de prêmios
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="email-security"
                          name="email-security"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                        />
                        <label htmlFor="email-security" className="ml-3 text-sm text-gray-300">
                          Alertas de segurança
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Award size={20} className="text-pink-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-white">Bônus e Missões</h3>
                    <div className="mt-2 text-sm text-gray-300">
                      <p>Configure notificações sobre bônus diários e missões disponíveis.</p>
                    </div>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center">
                        <input
                          id="bonus-notif"
                          name="bonus-notif"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-700 rounded bg-gray-800"
                        />
                        <label htmlFor="bonus-notif" className="ml-3 text-sm text-gray-300">
                          Bônus diário disponível
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="mission-notif"
                          name="mission-notif"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-700 rounded bg-gray-800"
                        />
                        <label htmlFor="mission-notif" className="ml-3 text-sm text-gray-300">
                          Novas missões disponíveis
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="reward-notif"
                          name="reward-notif"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-700 rounded bg-gray-800"
                        />
                        <label htmlFor="reward-notif" className="ml-3 text-sm text-gray-300">
                          Prêmios recebidos
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800/70 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
              <User size={32} className="text-gray-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user?.displayName || 'Usuário'}</h1>
            <p className="mt-1 text-gray-400">
              Membro desde Junho 2023 • ID: #{user?.id?.substring(0, 8) || 'N/A'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/70 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-800/70">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'profile'
                ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            } transition-colors`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'security'
                ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            } transition-colors`}
          >
            Segurança
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'bg-pink-500/10 text-pink-400 border-b-2 border-pink-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            } transition-colors`}
          >
            Notificações
          </button>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;