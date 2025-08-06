
import React from 'react';
import { DayBudget } from '@/utils/storage';
import { isToday } from '@/utils/dateUtils';
import { motion } from 'framer-motion';

interface DayRowProps {
  day: DayBudget;
  isActive: boolean;
}

const DayRow: React.FC<DayRowProps> = ({ day, isActive }) => {
  const dayDate = new Date(day.date);
  const today = isToday(dayDate);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        rounded-lg p-4 mb-3
        ${today ? 'glass border' : 'bg-secondary/50'}
        ${isActive ? 'ring-1 ring-primary/20' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {today && (
            <div className="h-2 w-2 rounded-full bg-primary" />
          )}
          <h3 className={`font-medium ${today ? 'text-primary' : ''}`}>
            {day.dayOfWeek}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          {day.daysRemaining} {day.daysRemaining === 1 ? 'dia' : 'dias'} restantes
        </p>
      </div>
      
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Orçamento</p>
          <p className="font-medium">{day.dailyBudget}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Gastos</p>
          <p className="font-medium">{day.expenses}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Saldo</p>
          <p className={`font-medium ${
            parseFloat(day.remainingBudget.replace('R$', '')) > 0 
              ? 'text-green-600' 
              : 'text-red-500'
          }`}>
            {day.remainingBudget}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DayRow;
