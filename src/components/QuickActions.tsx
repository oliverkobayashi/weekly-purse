import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  Calendar, 
  PieChart, 
  Target,
  Zap 
} from 'lucide-react';

interface QuickActionsProps {
  onAddExpense: () => void;
  onCreateBudget: () => void;
  hasCurrentPlan: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  onAddExpense, 
  onCreateBudget, 
  hasCurrentPlan 
}) => {
  const actions = hasCurrentPlan 
    ? [
        {
          icon: Plus,
          label: 'Adicionar Gasto',
          action: onAddExpense,
          color: 'bg-red-500 hover:bg-red-600',
          iconColor: 'text-white'
        },
        {
          icon: TrendingUp,
          label: 'Ver Estatísticas',
          action: () => {/* TODO: Implementar */},
          color: 'bg-blue-500 hover:bg-blue-600',
          iconColor: 'text-white'
        },
        {
          icon: Target,
          label: 'Metas',
          action: () => {/* TODO: Implementar */},
          color: 'bg-purple-500 hover:bg-purple-600',
          iconColor: 'text-white'
        },
      ]
    : [
        {
          icon: Calendar,
          label: 'Criar Plano',
          action: onCreateBudget,
          color: 'bg-primary hover:bg-primary/90',
          iconColor: 'text-white'
        }
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-6"
    >
      <div className="flex gap-3 justify-center">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * (index + 1), type: 'spring', stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.action}
            className={`
              group flex flex-col items-center gap-2 p-4 rounded-2xl 
              ${action.color} 
              shadow-lg transition-all duration-300 
              hover:shadow-xl active:shadow-md
            `}
          >
            <div className="relative">
              <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="text-xs font-medium text-white">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
