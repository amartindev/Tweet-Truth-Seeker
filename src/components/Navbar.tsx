
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass p-4 backdrop-blur-lg border-b border-white/10 dark:border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg neon-glow flex items-center justify-center text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TT
          </motion.div>
          <span className="font-bold text-xl hidden sm:inline">TweetTruthSeeker</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/how-it-works">Cómo Funciona</NavLink>
          <NavLink to="/about">Sobre la IA</NavLink>
          <NavLink to="/contact">Contacto</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200/20 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </motion.button>

          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200/20"
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current"></div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

// Componente auxiliar para enlaces de navegación
const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ 
  to, 
  children 
}) => {
  return (
    <Link 
      to={to}
      className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 group"
    >
      {children}
      <motion.span 
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"
        whileHover={{ width: "100%" }}
      />
    </Link>
  );
};

export default Navbar;
