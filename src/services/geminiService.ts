import axios from 'axios';
import { TweetAnalysis } from '../contexts/AnalysisContext';

// Interfaz para respuesta de Gemini
interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
    finishReason: string;
  }[];
}

// Función para validar la clave API
function validateGeminiKey(apiKey: string): boolean {
  return apiKey && apiKey.trim().length > 0;
}

// Parsear la respuesta de Gemini
function parseGeminiResponse(responseText: string): {
  isReal: boolean;
  confidenceScore: number;
  explanation: string;
  detailedAnalysis?: string;
} {
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        return {
          isReal: jsonResponse.isReal || false,
          confidenceScore: jsonResponse.confidenceScore || 0,
          explanation: jsonResponse.explanation || responseText,
          detailedAnalysis: jsonResponse.detailedAnalysis
        };
      } catch {}
    }

    const isReal = !responseText.toLowerCase().includes('fake') &&
      (responseText.toLowerCase().includes('real') ||
        responseText.toLowerCase().includes('verdadero') ||
        responseText.toLowerCase().includes('verídico'));

    const confidenceMatch = responseText.match(/(\d{1,3})(\s*%|\s*por ciento)/i);
    const confidenceScore = confidenceMatch ? parseInt(confidenceMatch[1]) : 50;

    return {
      isReal,
      confidenceScore,
      explanation: responseText,
    };
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    return {
      isReal: false,
      confidenceScore: 0,
      explanation: "No se pudo analizar la respuesta",
    };
  }
}

// Extracción del tweet
async function extractTweetContent(tweetUrl: string): Promise<string> {
  try {
    const tweetId = tweetUrl.split('/').pop()?.split('?')[0] || '';
    const response = await fetch(`https://x-backend-pearl.vercel.app/api/tweet?id=${tweetId}`);
    const data = await response.json();
    
    return data.text || 'No se pudo obtener el texto del tweet.';
  } catch (error) {
    console.error("Error extracting tweet:", error);
    throw new Error("No se pudo extraer el contenido del tweet.");
  }
}




// Función principal usando Google AI Gemini
export async function analyzeTweetWithGemini(tweetUrl: string, apiKey?: string): Promise<TweetAnalysis> {
  try {
    const tweetContent = await extractTweetContent(tweetUrl);

    const geminiApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

    if (!validateGeminiKey(geminiApiKey)) {
      throw new Error("API key de Gemini no configurada. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env.");
    }

    const response = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Eres un experto verificador de información que analiza tweets para determinar si son verídicos o fake news. 
Debes evaluar críticamente el tweet proporcionado, considerando fuentes, datos y posibles sesgos.
Responde con un análisis claro y proporciona un nivel de confianza en forma de porcentaje (0-100%)
sobre si el tweet contiene información real o falsa. 
Tu respuesta debe incluir: 
1) Si el tweet es real o falso, 
2) Un nivel de confianza en porcentaje, 
3) Una explicación de tu evaluación. 
Para tweets neutros sin afirmaciones verificables, indica que no se puede determinar su veracidad.

Tweet: "${tweetContent}"`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const geminiText = response.data.candidates[0]?.content.parts[0]?.text || "";
    const analysisResult = parseGeminiResponse(geminiText);

    return {
      tweetUrl,
      tweetContent,
      isReal: analysisResult.isReal,
      confidenceScore: analysisResult.confidenceScore,
      explanation: analysisResult.explanation,
      detailedAnalysis: analysisResult.detailedAnalysis,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    console.error("Error en análisis con Gemini:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error("Has excedido el límite de solicitudes a la API de Gemini. Intenta más tarde.");
      } else if (error.response?.status === 401) {
        throw new Error("Clave API de Gemini no válida. Verifica tu clave en el archivo .env.");
      } else {
        throw new Error(`Error de Gemini: ${error.response?.data?.error?.message || error.message}`);
      }
    }
    throw error;
  }
}
