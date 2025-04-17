
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

// Definir la estructura de datos para el análisis de un tweet
export interface TweetAnalysis {
  tweetUrl: string;
  tweetContent: string;
  isReal: boolean;
  confidenceScore: number;
  explanation: string;
  detailedAnalysis?: string;
  timestamp: string;
}

interface AnalysisContextType {
  isLoading: boolean;
  analysisResult: TweetAnalysis | null;
  analysisHistory: TweetAnalysis[];
  startAnalysis: (tweetUrl: string) => Promise<void>;
  clearResult: () => void;
  error: string | null;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<TweetAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<TweetAnalysis[]>(() => {
    const savedHistory = localStorage.getItem("analysisHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Guardar historial de análisis en localStorage
  const saveToHistory = (result: TweetAnalysis) => {
    const updatedHistory = [result, ...analysisHistory].slice(0, 10); // Limitar a 10 entradas
    setAnalysisHistory(updatedHistory);
    localStorage.setItem("analysisHistory", JSON.stringify(updatedHistory));
  };

  const startAnalysis = async (tweetUrl: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Implementación completa en el servicio de API
      const result = await analyzeTweet(tweetUrl);
      setAnalysisResult(result);
      saveToHistory(result);
    } catch (error: any) {
      console.error("Error during analysis:", error);
      const errorMessage = error.message || "Ha ocurrido un error durante el análisis.";
      setError(errorMessage);
      toast({
        title: "Error de análisis",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearResult = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <AnalysisContext.Provider value={{ 
      isLoading, 
      analysisResult, 
      analysisHistory, 
      startAnalysis, 
      clearResult,
      error 
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

// Importación del servicio Gemini
import { analyzeTweetWithGemini } from '../services/geminiService';

// Implementación del análisis usando el servicio Gemini
async function analyzeTweet(tweetUrl: string): Promise<TweetAnalysis> {
  try {
    return await analyzeTweetWithGemini(tweetUrl);
  } catch (error) {
    console.error("Error analyzing tweet:", error);
    throw error;
  }
}

export const useAnalysis = (): AnalysisContextType => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
