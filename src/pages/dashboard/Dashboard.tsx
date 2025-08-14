import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { useAuth } from '../../contexts/AuthContext';
import { CreditCard, Zap, Award, Gift, TrendingUp, User, ChevronRight } from 'lucide-react';
import TransactionList from '../../components/wallet/TransactionList';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { balance, transactions } = useWallet();
  
  // Mock recent winners data
  const recentWinners = [
    { id: 1, name: 'João Silva', prize: '1500 BlacCoins', time: '5 min atrás', avatar: null },
    { id: 2, name: 'Maria Oliveira', prize: 'iPhone 13', time: '15 min atrás', avatar: null },
    { id: 3, name: 'Carlos Santos', prize: '500 BlacCoins', time: '32 min atrás', avatar: null },
    { id: 4, name: 'Ana Pereira', prize: 'Fone de Ouvido', time: '45 min atrás', avatar: null },
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-imperial-purple-900/80 via-imperial-purple-800/80 to-imperial-purple-900/80 backdrop-blur-sm rounded-xl border border-imperial-purple-800/70 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Bem-vindo(a) de volta, {user?.displayName?.split(' ')[0] || 'Usuário'}!
            </h1>
            <p className="mt-1 text-gray-400">
              Confira suas estatísticas e prêmios disponíveis
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link 
              to="/roleta" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-imperial-purple-600 to-imperial-purple-500 hover:from-imperial-purple-700 hover:to-imperial-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imperial-purple-500 transition-all duration-300"
            >
              <Zap size={16} className="mr-2" />
              Jogar Agora
            </Link>
            <Link 
              to="/wallet" 
              className="inline-flex items-center px-4 py-2 border border-imperial-purple-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-imperial-purple-800 hover:bg-imperial-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imperial-purple-500 transition-all duration-300"
            >
              <CreditCard size={16} className="mr-2" />
              Depositar
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-imperial-purple-900/60 backdrop-blur-sm rounded-lg border border-imperial-purple-800/70 p-4 shadow-md transition-transform hover:transform hover:scale-[1.02]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Saldo BlacCoins</p>
              <h3 className="mt-1 text-2xl font-semibold text-yellow-300">{balance.blacCoin.toFixed(2)} BC</h3>
            </div>
            <div className="p-2 bg-yellow-400/10 rounded-md">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center">
                <span className="text-black font-bold text-xs">BC</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/wallet" 
              className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center transition-colors"
            >
              Converter <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="bg-imperial-purple-900/60 backdrop-blur-sm rounded-lg border border-imperial-purple-800/70 p-4 shadow-md transition-transform hover:transform hover:scale-[1.02]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Saldo em Reais</p>
              <h3 className="mt-1 text-2xl font-semibold text-green-400">R$ {balance.brl.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-green-400/10 rounded-md">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                <span className="text-black font-bold text-xs">R$</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/wallet" 
              className="text-sm text-green-400 hover:text-green-300 flex items-center transition-colors"
            >
              Depositar / Sacar <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="bg-imperial-purple-900/60 backdrop-blur-sm rounded-lg border border-imperial-purple-800/70 p-4 shadow-md transition-transform hover:transform hover:scale-[1.02]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Giros Hoje</p>
              <h3 className="mt-1 text-2xl font-semibold text-imperial-purple-400">23</h3>
            </div>
            <div className="p-2 bg-imperial-purple-400/10 rounded-md">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-imperial-purple-400 to-imperial-purple-500 flex items-center justify-center">
                <Zap size={16} className="text-black" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/roleta" 
              className="text-sm text-imperial-purple-400 hover:text-imperial-purple-300 flex items-center transition-colors"
            >
              Jogar mais <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="bg-imperial-purple-900/60 backdrop-blur-sm rounded-lg border border-imperial-purple-800/70 p-4 shadow-md transition-transform hover:transform hover:scale-[1.02]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Ranking Semanal</p>
              <h3 className="mt-1 text-2xl font-semibold text-pink-400">#12</h3>
            </div>
            <div className="p-2 bg-pink-400/10 rounded-md">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center">
                <Award size={16} className="text-black" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/ranking" 
              className="text-sm text-pink-400 hover:text-pink-300 flex items-center transition-colors"
            >
              Ver ranking <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Daily Bonus */}
      <div className="bg-gradient-to-r from-imperial-purple-600/20 via-imperial-purple-500/20 to-imperial-purple-400/20 backdrop-blur-sm rounded-xl border border-imperial-purple-500/30 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="mr-4 p-3 rounded-full bg-imperial-purple-500/30">
              <Gift size={24} className="text-imperial-purple-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Bônus Diário Disponível!</h2>
              <p className="mt-1 text-gray-300">
                Receba 100 BlacCoins grátis hoje
              </p>
            </div>
          </div>
          <button 
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-imperial-purple-600 hover:bg-imperial-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imperial-purple-500 transition-all duration-300"
          >
            <Gift size={16} className="mr-2" />
            Coletar Bônus
          </button>
        </div>
      </div>
      
      {/* Recent Activity and Winners */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-imperial-purple-900/60 backdrop-blur-sm rounded-xl border border-imperial-purple-800/70 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-imperial-purple-800/70">
            <h2 className="text-lg font-bold text-white">Atividade Recente</h2>
          </div>
          <div className="p-2">
            <TransactionList transactions={transactions.slice(0, 5)} />
          </div>
          <div className="px-6 py-3 border-t border-imperial-purple-800/70 bg-imperial-purple-900/40">
            <Link 
              to="/wallet" 
              className="text-sm text-imperial-purple-400 hover:text-imperial-purple-300 flex items-center justify-center transition-colors"
            >
              Ver todas as transações <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="bg-imperial-purple-900/60 backdrop-blur-sm rounded-xl border border-imperial-purple-800/70 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-imperial-purple-800/70">
            <h2 className="text-lg font-bold text-white">Ganhadores Recentes</h2>
          </div>
          <div className="divide-y divide-imperial-purple-800/50">
            {recentWinners.map((winner) => (
              <div key={winner.id} className="flex items-center p-4 hover:bg-imperial-purple-800/30 transition-colors">
                <div className="flex-shrink-0 mr-3">
                  {winner.avatar ? (
                    <img src={winner.avatar} alt={winner.name} className="h-10 w-10 rounded-full" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-imperial-purple-800 flex items-center justify-center border border-imperial-purple-700/50">
                      <User size={18} className="text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{winner.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{winner.time}</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <p className="text-sm font-medium text-imperial-purple-400">{winner.prize}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-imperial-purple-800/70 bg-imperial-purple-900/40">
            <Link 
              to="/ranking" 
              className="text-sm text-imperial-purple-400 hover:text-imperial-purple-300 flex items-center justify-center transition-colors"
            >
              Ver todos os ganhadores <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;