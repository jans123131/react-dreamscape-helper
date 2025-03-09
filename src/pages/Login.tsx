import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Check credentials (this would be replaced with actual API call)
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', '1'); // Store the user ID
        localStorage.setItem('userRole', 'admin');
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img
            src="https://i.ibb.co/JRtvDcgK/image-removebg-preview-3.png"
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white">Bienvenue</h1>
          <p className="text-gray-400 mt-2">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                className="input pl-10"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-400">
                Mot de passe
              </label>
              <a href="#" className="text-sm text-gold-400 hover:text-gold-300">
                Mot de passe oublié?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input pl-10 pr-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full relative"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
            ) : (
              "Se connecter"
            )}
          </button>
          
          <div className="text-center text-sm text-gray-400 mt-4">
            <p>Identifiants de démonstration:</p>
            <p className="text-gold-400">admin@example.com / admin123</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;