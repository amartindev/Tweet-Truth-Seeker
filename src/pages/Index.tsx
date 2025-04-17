
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import TweetAnalysisForm from '../components/TweetAnalysisForm';
import AnalysisResult from '../components/AnalysisResult';
import ProcessExplanation from '../components/ProcessExplanation';
import Footer from '../components/Footer';
import { useAnalysis } from '../contexts/AnalysisContext';

const Index: React.FC = () => {
  const { analysisResult, isLoading } = useAnalysis();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center mt-16 mb-12">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ¿Es Fake o Real?
              <br /> 
              Verifícalo con IA
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Verifica la veracidad de cualquier tweet utilizando el poder de la inteligencia artificial. 
              Solo pega la URL y obtén un análisis detallado en segundos.
            </motion.p>
            
            <TweetAnalysisForm />
          </div>
          
          {/* Resultado del análisis */}
          {analysisResult && <AnalysisResult result={analysisResult} />}
          
          {/* Explicación del proceso */}
          <ProcessExplanation />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
