
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  PlusCircle, 
  Target, 
  TrendingUp, 
  Shield, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface WelcomeProps {
  onCreateBudget: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onCreateBudget }) => {
  const features = [
    { icon: Target, text: "Planejamento semanal inteligente" },
    { icon: TrendingUp, text: "Controle de gastos em tempo real" },
    { icon: Shield, text: "Seus dados ficam seguros localmente" },
  ];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-8">
      {/* Header Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative"
      >
        {/* Background decorative elements */}
        <motion.div
          className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity }
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-6 w-12 h-12 bg-secondary/20 rounded-full"
          animate={{ 
            rotate: -360,
            y: [0, -10, 0]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity }
          }}
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative overflow-hidden"
        >
          <CalendarDays className="h-12 w-12 text-primary" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Title and Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-4 max-w-sm"
      >
        <div className="relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Weekly Purse
          </h1>
          <motion.div
            className="absolute -top-2 -right-4"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="h-5 w-5 text-primary/60" />
          </motion.div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          Transforme sua relação com o dinheiro. Planeje, controle e prospere com seu orçamento semanal.
        </p>
      </motion.div>

      {/* Features List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-3 w-full max-w-sm"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="p-2 rounded-full bg-primary/10">
              <feature.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-primary text-white font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={onCreateBudget}
      >
        {/* Button background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
        
        <div className="relative flex items-center gap-3">
          <PlusCircle size={20} />
          <span>Começar Agora</span>
          <motion.div
            className="group-hover:translate-x-1 transition-transform"
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </motion.button>
      
      {/* Footer info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="text-xs text-muted-foreground max-w-xs"
      >
        <p className="mb-1">🔒 Seus dados ficam seguros no seu dispositivo</p>
        <p>📊 Seu plano semanal será criado a partir de hoje</p>
      </motion.div>

      {/* Floating decoration */}
      <motion.div
        className="absolute top-10 right-10 w-2 h-2 bg-primary/30 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-3 h-3 bg-secondary/40 rounded-full"
        animate={{ 
          x: [0, 15, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default Welcome;
