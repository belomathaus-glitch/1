import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Falha no login. Verifique seu email e senha.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-imperial-purple-950 to-black z-[-1]" />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 z-[-1] overflow-hidden opacity-30">
        <div className="absolute w-96 h-96 rounded-full bg-imperial-purple-600/20 blur-3xl top-10 -left-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 rounded-full bg-imperial-purple-500/20 blur-3xl bottom-10 -right-20 animate-pulse-slower" />
        <div className="absolute w-80 h-80 rounded-full bg-imperial-purple-400/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-imperial-purple-400 to-imperial-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
              <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow"></div>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            BLAC
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            A plataforma premium de roletas
          </p>
        </div>
        
        <div className="mt-8 backdrop-blur-md bg-imperial-purple-900/50 p-6 rounded-xl border border-imperial-purple-800/80 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white text-center">Entrar na sua conta</h3>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-imperial-purple-700 rounded-md shadow-sm bg-imperial-purple-800/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-imperial-purple-500 focus:border-imperial-purple-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Senha
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-imperial-purple-700 rounded-md shadow-sm bg-imperial-purple-800/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-imperial-purple-500 focus:border-imperial-purple-500"
                  placeholder="********"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-imperial-purple-800 border-imperial-purple-700 rounded text-imperial-purple-500 focus:ring-imperial-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Lembrar-me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-imperial-purple-400 hover:text-imperial-purple-300">
                  Esqueceu a senha?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-imperial-purple-600 to-imperial-purple-500 hover:from-imperial-purple-700 hover:to-imperial-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-imperial-purple-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  </span>
                ) : (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock size={16} className="text-imperial-purple-300 group-hover:text-imperial-purple-200" />
                  </span>
                )}
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/register" className="font-medium text-imperial-purple-400 hover:text-imperial-purple-300 transition-colors">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;