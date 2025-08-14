import React, { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, CreditCard } from 'lucide-react';
import TransactionList from '../../components/wallet/TransactionList';

const WalletPage: React.FC = () => {
  const { balance, deposit, withdraw, convertCurrency, transactions } = useWallet();
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'convert'>('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [convertAmount, setConvertAmount] = useState('');
  const [convertFrom, setConvertFrom] = useState<'brl' | 'blacCoin'>('brl');
  const [convertTo, setConvertTo] = useState<'brl' | 'blacCoin'>('blacCoin');
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionError, setTransactionError] = useState('');
  
  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setTransactionError('Digite um valor válido');
      return;
    }
    
    deposit(amount, 'brl');
    setDepositAmount('');
    setTransactionSuccess(true);
    setTransactionError('');
    
    setTimeout(() => {
      setTransactionSuccess(false);
    }, 3000);
  };
  
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setTransactionError('Digite um valor válido');
      return;
    }
    
    const success = withdraw(amount, 'brl');
    if (success) {
      setWithdrawAmount('');
      setTransactionSuccess(true);
      setTransactionError('');
      
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 3000);
    } else {
      setTransactionError('Saldo insuficiente');
    }
  };
  
  const handleConvert = () => {
    const amount = parseFloat(convertAmount);
    if (isNaN(amount) || amount <= 0) {
      setTransactionError('Digite um valor válido');
      return;
    }
    
    if (convertFrom === convertTo) {
      setTransactionError('As moedas de origem e destino não podem ser iguais');
      return;
    }
    
    const success = convertCurrency(amount, convertFrom, convertTo);
    if (success) {
      setConvertAmount('');
      setTransactionSuccess(true);
      setTransactionError('');
      
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 3000);
    } else {
      setTransactionError('Saldo insuficiente');
    }
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-800/70 p-4 shadow-md">
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
              </div>
              
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-800/70 p-4 shadow-md">
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
              </div>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/70 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800/70">
                <h2 className="text-lg font-bold text-white">Histórico de Transações</h2>
              </div>
              <div className="p-2">
                <TransactionList transactions={transactions} />
              </div>
            </div>
          </div>
        );
      case 'deposit':
        return (
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/70 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Depositar Fundos</h2>
            <p className="text-gray-400 mb-6">
              Adicione fundos à sua conta para jogar e ganhar prêmios incríveis.
            </p>
            
            {transactionSuccess && (
              <div className="mb-4 p-3 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                Depósito realizado com sucesso!
              </div>
            )}
            
            {transactionError && (
              <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                {transactionError}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="deposit-amount" className="block text-sm font-medium text-gray-400">
                  Valor (R$)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">R$</span>
                  </div>
                  <input
                    type="number"
                    name="deposit-amount"
                    id="deposit-amount"
                    min="10"
                    step="5"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="block w-full pl-10 pr-12 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-400 mb-2">
                  Método de Pagamento
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <span className="text-green-400 font-bold text-sm">PIX</span>
                      </div>
                      <span className="text-sm text-gray-300">Pix</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                        <CreditCard size={18} className="text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-300">Cartão</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                        <span className="text-yellow-400 font-bold text-sm">₿</span>
                      </div>
                      <span className="text-sm text-gray-300">Bitcoin</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                        <span className="text-purple-400 font-bold text-sm">MP</span>
                      </div>
                      <span className="text-sm text-gray-300">MercadoPago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleDeposit}
                disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                className="w-full mt-6 inline-flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowDownLeft size={16} className="mr-2" />
                Depositar
              </button>
            </div>
          </div>
        );
      case 'withdraw':
        return (
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/70 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Sacar Fundos</h2>
            <p className="text-gray-400 mb-6">
              Saque seus fundos para sua conta bancária ou carteira digital.
            </p>
            
            {transactionSuccess && (
              <div className="mb-4 p-3 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                Solicitação de saque enviada com sucesso!
              </div>
            )}
            
            {transactionError && (
              <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                {transactionError}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3 mb-4">
                <p className="text-blue-400 text-sm">
                  Seu saldo disponível para saque: <span className="font-bold">R$ {balance.brl.toFixed(2)}</span>
                </p>
              </div>
              
              <div>
                <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-400">
                  Valor do Saque (R$)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">R$</span>
                  </div>
                  <input
                    type="number"
                    name="withdraw-amount"
                    id="withdraw-amount"
                    min="20"
                    step="5"
                    max={balance.brl}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="block w-full pl-10 pr-12 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-400 mb-2">
                  Método de Saque
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <span className="text-green-400 font-bold text-sm">PIX</span>
                      </div>
                      <span className="text-sm text-gray-300">Pix</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                        <span className="text-yellow-400 font-bold text-sm">₿</span>
                      </div>
                      <span className="text-sm text-gray-300">Bitcoin</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                        <span className="text-blue-400 font-bold text-sm">TED</span>
                      </div>
                      <span className="text-sm text-gray-300">Transferência</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance.brl}
                className="w-full mt-6 inline-flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowUpRight size={16} className="mr-2" />
                Solicitar Saque
              </button>
            </div>
          </div>
        );
      case 'convert':
        return (
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/70 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Converter Moedas</h2>
            <p className="text-gray-400 mb-6">
              Converta entre Reais e BlacCoins. Taxa: 1 R$ = 10 BlacCoins
            </p>
            
            {transactionSuccess && (
              <div className="mb-4 p-3 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                Conversão realizada com sucesso!
              </div>
            )}
            
            {transactionError && (
              <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                {transactionError}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3 mb-4 flex justify-between">
                <p className="text-blue-400 text-sm">
                  Saldo em Reais: <span className="font-bold">R$ {balance.brl.toFixed(2)}</span>
                </p>
                <p className="text-yellow-400 text-sm">
                  Saldo em BlacCoins: <span className="font-bold">{balance.blacCoin.toFixed(2)} BC</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label htmlFor="convert-from" className="block text-sm font-medium text-gray-400 mb-1">
                    De
                  </label>
                  <select
                    id="convert-from"
                    value={convertFrom}
                    onChange={(e) => {
                      const newValue = e.target.value as 'brl' | 'blacCoin';
                      setConvertFrom(newValue);
                      if (newValue === convertTo) {
                        setConvertTo(newValue === 'brl' ? 'blacCoin' : 'brl');
                      }
                    }}
                    className="block w-full py-2 px-3 rounded-md border border-gray-700 bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="brl">Reais (R$)</option>
                    <option value="blacCoin">BlacCoins (BC)</option>
                  </select>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      const temp = convertFrom;
                      setConvertFrom(convertTo);
                      setConvertTo(temp);
                    }}
                    className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
                
                <div>
                  <label htmlFor="convert-to" className="block text-sm font-medium text-gray-400 mb-1">
                    Para
                  </label>
                  <select
                    id="convert-to"
                    value={convertTo}
                    onChange={(e) => {
                      const newValue = e.target.value as 'brl' | 'blacCoin';
                      setConvertTo(newValue);
                      if (newValue === convertFrom) {
                        setConvertFrom(newValue === 'brl' ? 'blacCoin' : 'brl');
                      }
                    }}
                    className="block w-full py-2 px-3 rounded-md border border-gray-700 bg-gray-800/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="brl">Reais (R$)</option>
                    <option value="blacCoin">BlacCoins (BC)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="convert-amount" className="block text-sm font-medium text-gray-400">
                  Valor a Converter ({convertFrom === 'brl' ? 'R$' : 'BC'})
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">{convertFrom === 'brl' ? 'R$' : 'BC'}</span>
                  </div>
                  <input
                    type="number"
                    name="convert-amount"
                    id="convert-amount"
                    min="1"
                    step="1"
                    max={balance[convertFrom]}
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    className="block w-full pl-10 pr-12 py-2 rounded-md border border-gray-700 bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="bg-gray-800/70 rounded-md p-3 mt-3">
                <p className="text-sm text-gray-300">
                  Você receberá aproximadamente:
                  <span className="font-bold ml-1 text-white">
                    {convertAmount && !isNaN(parseFloat(convertAmount))
                      ? convertFrom === 'brl' && convertTo === 'blacCoin'
                        ? `${(parseFloat(convertAmount) * 10).toFixed(2)} BC`
                        : convertFrom === 'blacCoin' && convertTo === 'brl'
                        ? `R$ ${(parseFloat(convertAmount) / 10).toFixed(2)}`
                        : '0'
                      : '0'}
                  </span>
                </p>
              </div>
              
              <button
                onClick={handleConvert}
                disabled={
                  !convertAmount || 
                  parseFloat(convertAmount) <= 0 || 
                  parseFloat(convertAmount) > balance[convertFrom] ||
                  convertFrom === convertTo
                }
                className="w-full mt-6 inline-flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <RefreshCw size={16} className="mr-2" />
                Converter
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-500/20 mr-4">
              <Wallet size={24} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Carteira</h1>
              <p className="mt-1 text-gray-400">
                Gerencie seus fundos, depósitos e saques
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/70 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-800/70">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            } transition-colors`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'deposit'
                ? 'bg-green-500/10 text-green-400 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            } transition-colors`}
          >
            Depositar
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'withdraw'
                ? 'bg-red-500/10 text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            } transition-colors`}
          >
            Sacar
          </button>
          <button
            onClick={() => setActiveTab('convert')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'convert'
                ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            } transition-colors`}
          >
            Converter
          </button>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;