import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { Sparkles, Gift, DollarSign } from 'lucide-react';
import RoletaWheel from './RoletaWheel';
import BlacRoleta from '../../components/roleta/BlacRoleta';

const RoletaPage: React.FC = () => {
  const { balance, deposit } = useWallet();
  const [selectedRoleta, setSelectedRoleta] = useState<'standard' | 'premium' | 'vip'>('standard');
  const [spinningWheels, setSpinningWheels] = useState<Record<string, boolean>>({});
  const [lastResults, setLastResults] = useState<Record<string, string | null>>({});
  const [spinCost, setSpinCost] = useState(100);
  const [showWinModal, setShowWinModal] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const roletas = [
    {
      id: 'standard',
      name: 'Roleta Standard',
      description: 'Roleta básica com prêmios em BlacCoins',
      cost: 100,
      maxPrize: '1,000 BC',
      bgClass: 'from-imperial-purple-600/20 to-imperial-purple-800/20 border-imperial-purple-600/30',
      labelClass: 'bg-imperial-purple-600/20 text-imperial-purple-400 border-imperial-purple-500/30',
      items: [
        { id: 1, label: '100 BC', probability: 30, type: 'coins', value: 100 },
        { id: 2, label: '200 BC', probability: 25, type: 'coins', value: 200 },
        { id: 3, label: '300 BC', probability: 20, type: 'coins', value: 300 },
        { id: 4, label: '400 BC', probability: 15, type: 'coins', value: 400 },
        { id: 5, label: '500 BC', probability: 7, type: 'coins', value: 500 },
        { id: 6, label: '1000 BC', probability: 3, type: 'coins', value: 1000 }
      ]
    },
    {
      id: 'premium',
      name: 'Roleta Premium',
      description: 'Roleta com prêmios em BlacCoins e itens físicos',
      cost: 250,
      maxPrize: '2,500 BC ou iPhone',
      bgClass: 'from-imperial-purple-500/20 to-pink-600/20 border-pink-600/30',
      labelClass: 'bg-pink-600/20 text-pink-400 border-pink-500/30',
      items: [
        { id: 1, label: '250 BC', probability: 30, type: 'coins', value: 250 },
        { id: 2, label: '500 BC', probability: 25, type: 'coins', value: 500 },
        { id: 3, label: '750 BC', probability: 20, type: 'coins', value: 750 },
        { id: 4, label: '1000 BC', probability: 15, type: 'coins', value: 1000 },
        { id: 5, label: '1500 BC', probability: 7, type: 'coins', value: 1500 },
        { id: 6, label: '2500 BC', probability: 2, type: 'coins', value: 2500 },
        { id: 7, label: 'Fone BT', probability: 0.7, type: 'physical', value: 0 },
        { id: 8, label: 'iPhone', probability: 0.3, type: 'physical', value: 0 }
      ]
    },
    {
      id: 'vip',
      name: 'Roleta VIP',
      description: 'Roleta exclusiva com os maiores prêmios',
      cost: 500,
      maxPrize: '5,000 BC ou R$1,000',
      bgClass: 'from-yellow-600/20 to-amber-600/20 border-yellow-600/30',
      labelClass: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
      items: [
        { id: 1, label: '500 BC', probability: 30, type: 'coins', value: 500 },
        { id: 2, label: '1000 BC', probability: 25, type: 'coins', value: 1000 },
        { id: 3, label: '1500 BC', probability: 20, type: 'coins', value: 1500 },
        { id: 4, label: '2000 BC', probability: 15, type: 'coins', value: 2000 },
        { id: 5, label: '3000 BC', probability: 7, type: 'coins', value: 3000 },
        { id: 6, label: '5000 BC', probability: 2, type: 'coins', value: 5000 },
        { id: 7, label: 'R$100', probability: 0.7, type: 'cash', value: 100 },
        { id: 8, label: 'R$1000', probability: 0.3, type: 'cash', value: 1000 }
      ]
    }
  ];
  
  useEffect(() => {
    const selectedRoletaObj = roletas.find(r => r.id === selectedRoleta);
    if (selectedRoletaObj) {
      setSpinCost(selectedRoletaObj.cost);
    }
  }, [selectedRoleta]);
  
  const handleSpin = (roletaId: string) => {
    if (spinningWheels[roletaId] || balance.blacCoin < spinCost) return;
    
    deposit(-spinCost, 'blacCoin');
    
    setSpinningWheels(prev => ({ ...prev, [roletaId]: true }));
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    
    setTimeout(() => {
      const selectedRoletaObj = roletas.find(r => r.id === selectedRoleta);
      if (!selectedRoletaObj) return;
      
      const items = selectedRoletaObj.items;
      let totalProbability = 0;
      const probabilities = items.map(item => {
        totalProbability += item.probability;
        return totalProbability;
      });
      
      const random = Math.random() * totalProbability;
      let selectedIndex = 0;
      
      for (let i = 0; i < probabilities.length; i++) {
        if (random <= probabilities[i]) {
          selectedIndex = i;
          break;
        }
      }
      
      const result = items[selectedIndex];
      setLastResults(prev => ({ ...prev, [roletaId]: result.label }));
      
      if (result.type === 'coins') {
        setWinAmount(result.value);
        deposit(result.value, 'blacCoin');
      } else if (result.type === 'cash') {
        setWinAmount(result.value);
        deposit(result.value, 'brl');
      } else {
        setWinAmount(0);
      }
      
      setShowWinModal(true);
      setSpinningWheels(prev => ({ ...prev, [roletaId]: false }));
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-wheel-1932.mp3" />
      
      <div className="bg-gradient-to-r from-imperial-purple-900/80 via-imperial-purple-800/80 to-imperial-purple-900/80 backdrop-blur-sm rounded-xl border border-imperial-purple-800/70 p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Roletas Premium</h1>
        <p className="mt-1 text-gray-400">
          Gire a roleta e ganhe prêmios incríveis!
        </p>
      </div>
      
      {/* Nova Roleta BLAC */}
      <BlacRoleta onResult={(premio) => {
        if (premio.valor > 0) {
          setShowWinModal(true);
          setWinAmount(premio.valor);
        }
      }} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roletas.map((roleta) => (
          <div
            key={roleta.id}
            onClick={() => setSelectedRoleta(roleta.id as 'standard' | 'premium' | 'vip')}
            className={`bg-gradient-to-br ${roleta.bgClass} backdrop-blur-sm rounded-xl border p-5 shadow-lg cursor-pointer transition-all duration-300 ${
              selectedRoleta === roleta.id 
                ? 'transform scale-[1.02] ring-2 ring-offset-2 ring-offset-gray-900 ring-imperial-purple-500/50' 
                : 'hover:bg-imperial-purple-800/60'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-white">{roleta.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${roleta.labelClass}`}>
                {roleta.id === 'premium' ? 'Popular' : roleta.id === 'vip' ? 'VIP' : 'Básico'}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-300">{roleta.description}</p>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-400">Prêmio máximo</p>
                <p className="text-yellow-300 font-semibold">{roleta.maxPrize}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Custo por giro</p>
                <p className="text-imperial-purple-300 font-semibold">{roleta.cost} BC</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-br from-imperial-purple-900/60 to-imperial-purple-800/60 backdrop-blur-sm rounded-xl border border-imperial-purple-800/70 p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Outras Roletas Premium</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roletas.map((roleta) => (
            <div
              key={roleta.id}
              className="bg-gradient-to-br from-imperial-purple-800/40 to-imperial-purple-700/40 backdrop-blur-sm rounded-lg border border-imperial-purple-600/50 p-4 shadow-md"
            >
              <h3 className="text-lg font-bold text-white mb-2">{roleta.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{roleta.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-imperial-purple-300 font-semibold">{roleta.cost} BC</span>
                <button
                  onClick={() => handleSpin(roleta.id)}
                  disabled={spinningWheels[roleta.id] || balance.blacCoin < roleta.cost}
                  className="px-3 py-1.5 bg-imperial-purple-600 hover:bg-imperial-purple-700 disabled:bg-gray-600 text-white text-sm rounded-md transition-colors"
                >
                  {spinningWheels[roleta.id] ? 'Girando...' : 'Girar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Seção de roleta selecionada (mantida para compatibilidade) */}
      {selectedRoleta && (
        <div className="bg-gradient-to-br from-imperial-purple-900/60 to-imperial-purple-800/60 backdrop-blur-sm rounded-xl border border-imperial-purple-800/70 p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                {roletas.find(r => r.id === selectedRoleta)?.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Custo por giro: <span className="text-imperial-purple-300">{spinCost} BlacCoins</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="px-3 py-1.5 rounded-lg bg-imperial-purple-800/70 backdrop-blur-sm border border-imperial-purple-700/50">
                <div className="flex items-center">
                  <div className="h-4 w-4 mr-1.5">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
                  </div>
                  <span className="text-yellow-300 font-medium">{balance.blacCoin.toFixed(0)} BC</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              <RoletaWheel 
                items={roletas.find(r => r.id === selectedRoleta)?.items || []}
                isSpinning={spinningWheels[selectedRoleta]}
                lastResult={lastResults[selectedRoleta]}
                wheelId={selectedRoleta}
              />
              <button
                onClick={() => handleSpin(selectedRoleta)}
                disabled={spinningWheels[selectedRoleta] || balance.blacCoin < spinCost}
                className={`mt-4 inline-flex items-center px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  spinningWheels[selectedRoleta] || balance.blacCoin < spinCost
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-imperial-purple-600 to-imperial-purple-500 hover:from-imperial-purple-700 hover:to-imperial-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imperial-purple-500'
                } transition-all duration-300`}
              >
                <Sparkles size={16} className="mr-2" />
                {spinningWheels[selectedRoleta] ? 'Girando...' : 'Girar Roleta'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-br from-imperial-purple-900/60 to-imperial-purple-800/60 backdrop-blur-sm rounded-xl border border-imperial-purple-800/70 p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Últimos Ganhadores</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-imperial-purple-800/50 backdrop-blur-sm rounded-lg border border-imperial-purple-700/50 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-400/10 rounded-full mr-3">
                <DollarSign size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">João S.</p>
                <p className="text-xs text-gray-400">2 minutos atrás</p>
              </div>
              <div className="ml-auto">
                <p className="text-sm font-medium text-green-400">R$ 1000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-imperial-purple-800/50 backdrop-blur-sm rounded-lg border border-imperial-purple-700/50 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-imperial-purple-400/10 rounded-full mr-3">
                <Gift size={18} className="text-imperial-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Maria O.</p>
                <p className="text-xs text-gray-400">5 minutos atrás</p>
              </div>
              <div className="ml-auto">
                <p className="text-sm font-medium text-imperial-purple-400">iPhone</p>
              </div>
            </div>
          </div>
          
          <div className="bg-imperial-purple-800/50 backdrop-blur-sm rounded-lg border border-imperial-purple-700/50 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-400/10 rounded-full mr-3">
                <Sparkles size={18} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Carlos S.</p>
                <p className="text-xs text-gray-400">10 minutos atrás</p>
              </div>
              <div className="ml-auto">
                <p className="text-sm font-medium text-yellow-400">5000 BC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showWinModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-imperial-purple-900 to-imperial-purple-800 rounded-xl border border-imperial-purple-700 p-8 shadow-xl max-w-md w-full animate-scale-in">
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute -inset-[100px] bg-yellow-500/10 blur-3xl rounded-full animate-pulse"></div>
              <div className="absolute -inset-[200px] bg-imperial-purple-500/10 blur-3xl rounded-full animate-pulse-slow"></div>
            </div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-4 animate-bounce-slow">
                <Sparkles size={36} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Parabéns!</h2>
              <p className="text-yellow-300 text-3xl font-bold mb-4">
                {lastResults[selectedRoleta]}
              </p>
              <p className="text-gray-300 mb-6">
                Você ganhou {winAmount > 0 ? (winAmount >= 1000 ? 'um prêmio incrível' : 'BlacCoins') : 'um item físico'}!
              </p>
              
              <button
                onClick={() => setShowWinModal(false)}
                className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoletaPage;