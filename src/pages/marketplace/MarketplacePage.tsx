import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { ShoppingBag, Gift, Phone, Headphones, Watch, Gamepad, Tag } from 'lucide-react';

const MarketplacePage: React.FC = () => {
  const { balance } = useWallet();
  
  const products = [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      price: 25000,
      image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      category: 'electronics',
      stock: 5
    },
    {
      id: 2,
      name: 'Fone Bluetooth',
      price: 3500,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      category: 'electronics',
      stock: 15
    },
    {
      id: 3,
      name: 'Smartwatch',
      price: 5000,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      category: 'electronics',
      stock: 10
    },
    {
      id: 4,
      name: 'Console de Games',
      price: 10000,
      image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg',
      category: 'gaming',
      stock: 3
    },
    {
      id: 5,
      name: 'Gift Card R$100',
      price: 1000,
      image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
      category: 'gift-cards',
      stock: 50
    },
    {
      id: 6,
      name: 'Gift Card R$250',
      price: 2500,
      image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
      category: 'gift-cards',
      stock: 30
    }
  ];
  
  const categories = [
    { id: 'all', name: 'Todos', icon: <ShoppingBag size={16} /> },
    { id: 'electronics', name: 'Eletrônicos', icon: <Phone size={16} /> },
    { id: 'gaming', name: 'Games', icon: <Gamepad size={16} /> },
    { id: 'gift-cards', name: 'Gift Cards', icon: <Gift size={16} /> }
  ];
  
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800/70 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-500/20 mr-4">
              <ShoppingBag size={24} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Marketplace</h1>
              <p className="mt-1 text-gray-400">
                Use seus BlacCoins para resgatar prêmios e gift cards
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="px-3 py-1.5 rounded-lg bg-gray-800/70 backdrop-blur-sm border border-gray-700/50">
              <div className="flex items-center">
                <div className="h-4 w-4 mr-1.5">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
                </div>
                <span className="text-yellow-300 font-medium">{balance.blacCoin.toFixed(0)} BC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full border whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white border-purple-500'
                : 'bg-gray-800/60 text-gray-300 border-gray-700 hover:bg-gray-700/60'
            } transition-colors`}
          >
            <span className="mr-1.5">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/70 overflow-hidden shadow-lg transition-transform hover:transform hover:scale-[1.02]"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <div className="px-2 py-1 rounded-full bg-gray-800/70 text-xs text-gray-300 border border-gray-700/50">
                  {product.category === 'electronics' ? (
                    <div className="flex items-center">
                      <Phone size={10} className="mr-1" />
                      Eletrônico
                    </div>
                  ) : product.category === 'gaming' ? (
                    <div className="flex items-center">
                      <Gamepad size={10} className="mr-1" />
                      Game
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Gift size={10} className="mr-1" />
                      Gift Card
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-yellow-300 font-bold">
                  <div className="h-4 w-4 mr-1.5">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
                  </div>
                  {product.price.toLocaleString()} BC
                </div>
                <div className="text-xs text-gray-400">
                  Estoque: {product.stock}
                </div>
              </div>
              <button
                disabled={balance.blacCoin < product.price}
                className={`w-full mt-4 py-2 rounded-md text-sm font-medium ${
                  balance.blacCoin >= product.price
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600'
                    : 'bg-gray-700/70 text-gray-400 cursor-not-allowed'
                } transition-colors`}
              >
                {balance.blacCoin >= product.price ? 'Resgatar' : 'BlacCoins insuficientes'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;