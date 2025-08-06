import React from 'react';
import { DayBudget } from '@/utils/storage';
import { isToday } from '@/utils/dateUtils';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';

interface DayRowProps {
  day: DayBudget;
  isActive: boolean;
}

const DayRow: React.FC<DayRowProps> = ({ day, isActive }) => {
  const dayDate = new Date(day.date);
  const today = isToday(dayDate);
  
  // Parse monetary values
  const dailyBudget = parseFloat(day.dailyBudget.replace('R$ ', '').replace(',', '.'));
  const expenses = parseFloat(day.expenses.replace('R$ ', '').replace(',', '.'));
  const remaining = dailyBudget - expenses;
  const spentPercentage = dailyBudget > 0 ? (expenses / dailyBudget) * 100 : 0;
  
  const isOverBudget = expenses > dailyBudget;
  const hasExpenses = expenses > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`
        relative rounded-xl p-4 mb-3 transition-all duration-300
        ${today ? 'glass border-primary/20 shadow-md' : 'bg-secondary/30 hover:bg-secondary/50'}
        ${isActive ? 'ring-2 ring-primary/30' : ''}
        ${isOverBudget ? 'border-red-200 bg-red-50/50 dark:bg-red-950/20' : ''}
        group cursor-pointer
      `}
    >
      {/* Today indicator */}
      {today && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </motion.div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <motion.div
            className={`p-2 rounded-lg transition-colors ${
              today 
                ? 'bg-primary/10 text-primary' 
                : hasExpenses 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30' 
                  : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
            }`}
            whileHover={{ rotate: 5 }}
          >
            {today ? (
              <Calendar className="h-4 w-4" />
            ) : hasExpenses ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
          </motion.div>
          
          <div>
            <h3 className={`font-semibold text-sm ${today ? 'text-primary' : ''}`}>
              {day.dayOfWeek}
            </h3>
            <p className="text-xs text-muted-foreground">
              {day.daysRemaining === 0 ? 'Hoje' : `${day.daysRemaining} ${day.daysRemaining === 1 ? 'dia' : 'dias'}`}
            </p>
          </div>
        </div>
        
        {isOverBudget && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 text-red-500"
          >
            <TrendingDown className="h-4 w-4" />
            <span className="text-xs font-medium">Acima</span>
          </motion.div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Orçamento</p>
          <p className="font-semibold text-sm">{day.dailyBudget}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Gastos</p>
          <p className={`font-semibold text-sm ${
            isOverBudget ? 'text-red-500' : hasExpenses ? 'text-orange-500' : 'text-gray-400'
          }`}>
            {day.expenses}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Saldo</p>
          <p className={`font-semibold text-sm ${
            remaining >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            R$ {Math.abs(remaining).toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Progress bar */}
      {dailyBudget > 0 && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className={`h-1.5 rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-red-500' : spentPercentage > 80 ? 'bg-orange-500' : 'bg-green-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(spentPercentage, 100)}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>
      )}
      
      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default DayRow;
