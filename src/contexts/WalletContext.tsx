import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Balance {
  blacCoin: number;
  brl: number;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'convert' | 'win' | 'spend';
  amount: number;
  currency: 'blacCoin' | 'brl';
  timestamp: Date;
  description: string;
}

interface WalletContextType {
  balance: Balance;
  transactions: Transaction[];
  deposit: (amount: number, currency: 'blacCoin' | 'brl') => void;
  withdraw: (amount: number, currency: 'blacCoin' | 'brl') => boolean;
  convertCurrency: (amount: number, from: 'blacCoin' | 'brl', to: 'blacCoin' | 'brl') => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<Balance>({ blacCoin: 0, brl: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Exchange rate: 1 BRL = 10 BlacCoins
  const exchangeRate = 10;

  useEffect(() => {
    if (user) {
      // Load user's wallet from localStorage or set default values
      const storedBalance = localStorage.getItem(`blac_balance_${user.id}`);
      const storedTransactions = localStorage.getItem(`blac_transactions_${user.id}`);
      
      if (storedBalance) {
        setBalance(JSON.parse(storedBalance));
      } else {
        // Set default values for new users
        const defaultBalance = { blacCoin: 1000, brl: 50 };
        setBalance(defaultBalance);
        localStorage.setItem(`blac_balance_${user.id}`, JSON.stringify(defaultBalance));
      }
      
      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions);
        // Convert timestamp strings back to Date objects
        const transactionsWithDates = parsedTransactions.map((t: any) => ({
          ...t,
          timestamp: new Date(t.timestamp)
        }));
        setTransactions(transactionsWithDates);
      } else {
        // Create initial welcome transaction for new users
        const initialTransaction: Transaction = {
          id: '1',
          type: 'deposit',
          amount: 1000,
          currency: 'blacCoin',
          timestamp: new Date(),
          description: 'Bônus de boas-vindas'
        };
        setTransactions([initialTransaction]);
        localStorage.setItem(`blac_transactions_${user.id}`, JSON.stringify([initialTransaction]));
      }
    } else {
      // Reset when user logs out
      setBalance({ blacCoin: 0, brl: 0 });
      setTransactions([]);
    }
  }, [user]);

  // Save changes to localStorage when balance or transactions change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`blac_balance_${user.id}`, JSON.stringify(balance));
    }
  }, [user, balance]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`blac_transactions_${user.id}`, JSON.stringify(transactions));
    }
  }, [user, transactions]);

  const deposit = (amount: number, currency: 'blacCoin' | 'brl') => {
    if (amount <= 0) return;
    
    setBalance(prev => ({
      ...prev,
      [currency]: prev[currency] + amount
    }));
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount,
      currency,
      timestamp: new Date(),
      description: `Depósito de ${currency === 'brl' ? 'R$' : ''} ${amount} ${currency === 'blacCoin' ? 'BlacCoins' : ''}`
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const withdraw = (amount: number, currency: 'blacCoin' | 'brl'): boolean => {
    if (amount <= 0 || balance[currency] < amount) return false;
    
    setBalance(prev => ({
      ...prev,
      [currency]: prev[currency] - amount
    }));
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdraw',
      amount,
      currency,
      timestamp: new Date(),
      description: `Saque de ${currency === 'brl' ? 'R$' : ''} ${amount} ${currency === 'blacCoin' ? 'BlacCoins' : ''}`
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };

  const convertCurrency = (amount: number, from: 'blacCoin' | 'brl', to: 'blacCoin' | 'brl'): boolean => {
    if (amount <= 0 || balance[from] < amount) return false;
    
    let convertedAmount: number;
    
    if (from === 'brl' && to === 'blacCoin') {
      convertedAmount = amount * exchangeRate;
    } else if (from === 'blacCoin' && to === 'brl') {
      convertedAmount = amount / exchangeRate;
    } else {
      return false;
    }
    
    setBalance(prev => ({
      ...prev,
      [from]: prev[from] - amount,
      [to]: prev[to] + convertedAmount
    }));
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'convert',
      amount,
      currency: from,
      timestamp: new Date(),
      description: `Conversão de ${from === 'brl' ? 'R$' : ''} ${amount} ${from === 'blacCoin' ? 'BlacCoins' : ''} para ${to === 'brl' ? 'R$' : ''} ${convertedAmount.toFixed(2)} ${to === 'blacCoin' ? 'BlacCoins' : ''}`
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };

  const value = {
    balance,
    transactions,
    deposit,
    withdraw,
    convertCurrency
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};