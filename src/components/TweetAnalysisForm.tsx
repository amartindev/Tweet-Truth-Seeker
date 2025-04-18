
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader } from 'lucide-react';
import { useAnalysis } from '../contexts/AnalysisContext';

const TweetAnalysisForm: React.FC = () => {
  const [tweetUrl, setTweetUrl] = useState('');
  const [error, setError] = useState('');
  const { startAnalysis, isLoading, error: analysisError } = useAnalysis();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica de URL de Twitter
    if (!tweetUrl.trim()) {
      setError('Por favor, ingresa la URL de un tweet');
      return;
    }

    if (!tweetUrl.includes('twitter.com') && !tweetUrl.includes('x.com')) {
      setError('Por favor, ingresa una URL válida de Twitter/X');
      return;
    }

    try {
      await startAnalysis(tweetUrl);
    } catch (error) {
      // El error ya se maneja en el contexto, no necesitamos hacer nada aquí
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Pega la URL del tweet que deseas verificar..."
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
            className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/20 dark:border-white/10 rounded-xl px-4 py-3 pl-12 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-foreground/50" />
        </div>

        {error && (
          <motion.p 
            className="text-red-500 dark:text-red-400 text-sm ml-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {analysisError && (
          <motion.div 
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-500 dark:text-red-400 text-sm">
              {analysisError}
            </p>
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="w-full gradient-button text-white font-bold py-3 rounded-xl neon-glow flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Analizando...
            </>
          ) : (
            'Verificar con IA'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TweetAnalysisForm;
