import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, TrendingUp, AlertTriangle } from 'lucide-react';

interface WeeklyProgressProps {
  currentPlan?: any;
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ currentPlan }) => {
  if (!currentPlan) return null;

  const today = new Date();
  const startOfWeek = new Date(currentPlan.days[0].date);
  const daysElapsed = Math.floor((today.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const progressPercentage = Math.min((daysElapsed / 7) * 100, 100);
  
  const totalSpent = currentPlan.initialBudget - currentPlan.currentBudget;
  const budgetProgressPercentage = (totalSpent / currentPlan.initialBudget) * 100;
  
  const isAheadOfBudget = budgetProgressPercentage > progressPercentage;
  const isOnTrack = Math.abs(budgetProgressPercentage - progressPercentage) < 15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Progresso da Semana</h3>
        </div>
        <div className="flex items-center gap-1 text-xs">
          {isOnTrack ? (
            <>
              <Target className="h-3 w-3 text-green-500" />
              <span className="text-green-500">No alvo</span>
            </>
          ) : isAheadOfBudget ? (
            <>
              <AlertTriangle className="h-3 w-3 text-orange-500" />
              <span className="text-orange-500">Acelerado</span>
            </>
          ) : (
            <>
              <TrendingUp className="h-3 w-3 text-blue-500" />
              <span className="text-blue-500">Controlado</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Time Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Tempo</span>
            <span className="text-xs font-medium">{daysElapsed}/7 dias</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>
        </div>

        {/* Budget Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Gastos</span>
            <span className="text-xs font-medium">
              R$ {totalSpent.toFixed(2)} ({budgetProgressPercentage.toFixed(0)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                isAheadOfBudget ? 'bg-orange-500' : isOnTrack ? 'bg-green-500' : 'bg-blue-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(budgetProgressPercentage, 100)}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Status message */}
      <div className="mt-3 text-xs text-center">
        {isOnTrack ? (
          <p className="text-green-600">✅ Você está gastando no ritmo ideal!</p>
        ) : isAheadOfBudget ? (
          <p className="text-orange-600">⚠️ Gastos acima do ritmo esperado</p>
        ) : (
          <p className="text-blue-600">💰 Você está economizando bem!</p>
        )}
      </div>
    </motion.div>
  );
};

export default WeeklyProgress;
