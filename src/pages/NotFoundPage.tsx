import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#120d1a] to-[#0a0a18] z-[-1]" />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden opacity-30">
        <div className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl top-10 -left-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-3xl bottom-10 -right-20 animate-pulse-slower" />
        <div className="absolute w-80 h-80 rounded-full bg-green-500/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-white">404</h1>
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent my-8"></div>
        <h2 className="text-3xl font-bold text-white mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;