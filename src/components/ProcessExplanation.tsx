import { motion } from 'framer-motion';
import { FileSearch, Brain, PieChart } from 'lucide-react';

const ProcessExplanation: React.FC = () => {
  const steps = [
    {
      icon: <FileSearch className="w-8 h-8" />,
      title: "Extracción del contenido",
      description: "Obtenemos el texto y metadatos del tweet para su análisis exhaustivo."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Análisis con IA",
      description: "Utilizamos Gemini para evaluar la veracidad del contenido."
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Visualización del resultado",
      description: "Presentamos el análisis con un score de confianza y explicación detallada."
    }
  ];

  // Animación para la aparición escalonada de las tarjetas
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id='about' className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Cómo funciona nuestro análisis
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="relative"
            >
              <div className="gradient-card rounded-xl p-6 h-full border border-white/10 hover:neon-glow transition-all duration-500 flex flex-col">
                <div className="mb-4 relative">
                  <div className="p-3 glass rounded-full inline-block fuchsia-glow">
                    {step.icon}
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-primary/20 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-foreground/70 text-sm">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 -right-4 transform translate-x-1/2 w-8 h-8 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessExplanation;
