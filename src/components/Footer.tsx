
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Mail, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="gradient-dark text-white py-12 mt-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                TT
              </div>
              <span className="font-bold text-xl">TweetTruthSeeker</span>
            </Link>
            <p className="text-sm text-gray-300 mt-3 max-w-md">
              Una herramienta avanzada que utiliza inteligencia artificial para analizar y verificar 
              la veracidad del contenido en tweets, ayudándote a identificar posibles fake news.
            </p>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h3 className="font-bold mb-4 text-gradient">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre la IA
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold mb-4 text-gradient">Contacto</h3>
            <div className="space-y-3 text-sm">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Github className="w-4 h-4 mr-2" />
                <span>GitHub</span>
              </a>
              <a href="mailto:info@tweettruthseeker.com"
                className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                <span>Email</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-4 h-4 mr-2" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2023 TweetTruthSeeker. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="flex items-center">
              Construido con 
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1], 
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatDelay: 2,
                  duration: 0.8 
                }}
                className="mx-1"
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.div>
              y Gemini
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
