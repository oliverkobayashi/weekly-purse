
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, PlusCircle } from 'lucide-react';

interface WelcomeProps {
  onCreateBudget: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onCreateBudget }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <CalendarDays className="h-10 w-10 text-primary" />
      </motion.div>
      
      <div className="space-y-2 max-w-sm">
        <h1 className="text-2xl font-bold">Weekly Purse</h1>
        <p className="text-muted-foreground">
          Planeje seus gastos semanais e mantenha seu orçamento sob controle.
        </p>
      </div>
      
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="px-6 py-3 rounded-full bg-primary text-white font-medium flex items-center gap-2 shadow-md hover:bg-primary/90 transition-colors"
        onClick={onCreateBudget}
      >
        <PlusCircle size={18} />
        <span>Criar Novo Plano</span>
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-muted-foreground"
      >
        Seu plano semanal será criado a partir de hoje
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
