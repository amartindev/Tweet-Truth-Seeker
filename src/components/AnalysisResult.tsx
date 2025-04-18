import React from 'react';
import { motion } from 'framer-motion';
import { Share2, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';
import { TweetAnalysis } from '../contexts/AnalysisContext';

interface AnalysisResultProps {
  result: TweetAnalysis;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const [expanded, setExpanded] = React.useState(false);

  // Determinar color basado en el resultado
  const getStatusColor = () => {
    if (result.isReal) {
      return 'text-green-500 dark:text-green-400';
    } else {
      return 'text-red-500 dark:text-red-400';
    }
  };

  // Determinar mensaje basado en el resultado
  const getStatusMessage = () => {
    if (result.isReal) {
      return 'Parece verídico';
    } else {
      return 'Probable fake news';
    }
  };

  // Componente para el gráfico circular de confianza
  const ConfidenceCircle = () => {
    const circumference = 2 * Math.PI * 40; // radio * 2PI
    const dashOffset = circumference * (1 - result.confidenceScore / 100);
    
    return (
      <div className="relative flex items-center justify-center">
        <svg width="100" height="100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={result.isReal ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-bold">{result.confidenceScore}%</p>
          <p className="text-xs text-foreground/70">confianza</p>
        </div>
      </div>
    );
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Análisis de Tweet con IA',
        text: `Análisis de tweet: "${result.tweetContent.substring(0, 50)}..." - ${getStatusMessage()} (${result.confidenceScore}% confianza)`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(`Análisis de tweet: "${result.tweetContent}" - ${getStatusMessage()} (${result.confidenceScore}% confianza)`);
      alert('Resultado copiado al portapapeles');
    }
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto mt-10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="gradient-card rounded-2xl p-6 shadow-lg border border-white/10 neon-glow">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Panel izquierdo */}
          <div className="md:w-1/3 flex flex-col items-center text-center">
            <ConfidenceCircle />
            <h3 className={`text-xl font-bold mt-4 ${getStatusColor()}`}>
              {getStatusMessage()}
            </h3>
            <div className="flex items-center mt-2">
              {result.isReal ? (
                <CheckCircle2 className="text-green-500 w-5 h-5 mr-1" />
              ) : (
                <XCircle className="text-red-500 w-5 h-5 mr-1" />
              )}
              <span className={getStatusColor()}>
                {result.isReal ? 'Verificado' : 'No verificado'}
              </span>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="md:w-2/3">
            <h3 className="text-lg font-medium mb-3">Tweet analizado:</h3>
            <div className="glass rounded-lg p-4 mb-4 text-sm">
              <p>{result.tweetContent}</p>
              <div className="mt-2 text-xs text-foreground/60">
                <a 
                  href={result.tweetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Ver tweet original →
                </a>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-2">Análisis:</h3>
            <div className="text-sm text-foreground/80">
              <p>{expanded ? result.explanation : `${result.explanation.substring(0, 120)}...`}</p>
              {result.explanation.length > 120 && (
                <button 
                  onClick={() => setExpanded(!expanded)}
                  className="text-primary hover:text-primary/80 text-sm mt-1 flex items-center"
                >
                  {expanded ? 'Ver menos' : 'Ver más'}
                  <ChevronDown 
                    className={`w-4 h-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} 
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <motion.button 
            onClick={shareResult}
            className="flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-4 h-4 mr-1" />
            Compartir resultado
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
