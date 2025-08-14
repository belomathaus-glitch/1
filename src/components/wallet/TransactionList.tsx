import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, RefreshCw, Zap, ShoppingBag } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'convert' | 'win' | 'spend';
  amount: number;
  currency: 'blacCoin' | 'brl';
  timestamp: Date;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft size={16} className="text-green-400" />;
      case 'withdraw':
        return <ArrowUpRight size={16} className="text-red-400" />;
      case 'convert':
        return <RefreshCw size={16} className="text-blue-400" />;
      case 'win':
        return <Zap size={16} className="text-yellow-400" />;
      case 'spend':
        return <ShoppingBag size={16} className="text-purple-400" />;
      default:
        return <CreditCard size={16} className="text-gray-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'win':
        return 'text-green-400';
      case 'withdraw':
      case 'spend':
        return 'text-red-400';
      case 'convert':
        return 'text-blue-400';
      default:
        return 'text-gray-300';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'brl') {
      return `R$ ${amount.toFixed(2)}`;
    } else {
      return `${amount.toFixed(2)} BC`;
    }
  };

  const formatDate = (date: Date) => {
    // Get the time difference in milliseconds
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Convert to seconds, minutes, hours, days
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
    } else {
      return 'Agora mesmo';
    }
  };

  return (
    <div className="divide-y divide-gray-800/50">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center py-3 px-4 hover:bg-gray-800/30 transition-colors">
            <div className="mr-3 p-2 rounded-full bg-gray-800">
              {getTransactionIcon(transaction.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(transaction.timestamp)}
              </p>
            </div>
            <div className="ml-2">
              <span className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                {(transaction.type === 'deposit' || transaction.type === 'win') && '+'} 
                {(transaction.type === 'withdraw' || transaction.type === 'spend') && '-'} 
                {formatCurrency(transaction.amount, transaction.currency)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 px-4 text-center">
          <p className="text-sm text-gray-400">Nenhuma transação encontrada</p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;