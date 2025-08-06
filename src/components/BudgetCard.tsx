
import React from 'react';
import { BudgetPlan } from '@/utils/storage';
import DayRow from './DayRow';
import { motion } from 'framer-motion';
import { ArrowDownIcon, PlusIcon } from 'lucide-react';

interface BudgetCardProps {
  plan: BudgetPlan;
  onAddExpense: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ plan, onAddExpense }) => {
  const today = new Date();
  const todayISOString = today.toISOString().split('T')[0];
  
  // Calculate remaining budget
  const remainingBudget = plan.currentBudget;
  const spentBudget = plan.initialBudget - remainingBudget;
  const percentage = Math.round((remainingBudget / plan.initialBudget) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="w-full glass rounded-2xl overflow-hidden border shadow-sm"
    >
      {/* Budget summary header */}
      <div className="p-6 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Orçamento Semanal</p>
              <h2 className="text-3xl font-bold">R$ {plan.initialBudget.toFixed(2)}</h2>
            </div>
            
            <button
              onClick={onAddExpense}
              className="bg-primary text-white rounded-full p-3 shadow-md hover:bg-primary/90 transition-colors"
              aria-label="Add expense"
            >
              <PlusIcon size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Saldo Disponível</p>
              <p className="text-green-600 font-medium">R$ {remainingBudget.toFixed(2)}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Utilizado</p>
              <p className="text-primary font-medium">R$ {spentBudget.toFixed(2)}</p>
            </div>
            
            <div className="w-full bg-secondary rounded-full h-2 mt-3">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Days list */}
      <div className="bg-background p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Orçamento Diário</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Deslize para ver</span>
            <ArrowDownIcon size={12} className="ml-1" />
          </div>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto rounded-lg p-1">
          {plan.days.map((day, index) => (
            <DayRow 
              key={day.dayOfWeek} 
              day={day} 
              isActive={day.date.includes(todayISOString)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetCard;
