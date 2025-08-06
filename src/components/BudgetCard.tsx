
import React from 'react';
import { BudgetPlan } from '@/utils/storage';
import DayRow from './DayRow';
import { motion } from 'framer-motion';
import { ArrowDownIcon, PlusIcon, TrendingUp, TrendingDown, Target } from 'lucide-react';

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
  const percentage = Math.round((spentBudget / plan.initialBudget) * 100);
  const remainingPercentage = 100 - percentage;

  // Calculate daily average
  const daysElapsed = plan.days.filter(day => {
    const dayDate = new Date(day.date);
    return dayDate <= today;
  }).length;
  
  const dailyAverage = daysElapsed > 0 ? spentBudget / daysElapsed : 0;
  const isOverBudget = spentBudget > plan.initialBudget * 0.8; // Warning at 80%

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
        
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Orçamento Semanal</p>
              <h2 className="text-3xl font-bold mb-1">R$ {plan.initialBudget.toFixed(2)}</h2>
              <div className="flex items-center gap-2">
                {isOverBudget ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                )}
                <span className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                  {isOverBudget ? 'Atenção ao orçamento!' : 'Dentro do planejado'}
                </span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddExpense}
              className="bg-primary text-white rounded-full p-3 shadow-md hover:bg-primary/90 transition-colors relative overflow-hidden group"
              aria-label="Add expense"
            >
              <PlusIcon size={20} />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.div 
              className="space-y-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3" />
                Saldo Disponível
              </p>
              <p className="text-lg font-bold text-green-600">R$ {remainingBudget.toFixed(2)}</p>
              <p className="text-xs text-green-600/80">{remainingPercentage}% restante</p>
            </motion.div>
            
            <motion.div 
              className="space-y-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                Total Utilizado
              </p>
              <p className="text-lg font-bold text-primary">R$ {spentBudget.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Média: R$ {dailyAverage.toFixed(2)}/dia</p>
            </motion.div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-secondary/50 rounded-full h-3 relative overflow-hidden">
              <motion.div 
                className={`h-3 rounded-full transition-all duration-1000 ease-out relative ${
                  isOverBudget ? 'bg-red-500' : 'bg-primary'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2, 
                    ease: "easeInOut",
                    delay: 1.5 
                  }}
                />
              </motion.div>
              
              {/* Percentage indicator */}
              {percentage > 10 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-xs font-medium text-white drop-shadow">
                    {percentage}%
                  </span>
                </motion.div>
              )}
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
