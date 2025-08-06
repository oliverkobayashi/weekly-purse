
import { useState, useEffect } from 'react';
import {
  BudgetPlan,
  DayBudget,
  loadBudgetPlans,
  saveBudgetPlan,
  deleteBudgetPlan
} from '@/utils/storage';
import {
  getCurrentWeekDates,
  getWeekIdentifier,
  formatDayDisplay,
  getDaysRemaining,
  formatCurrency,
  parseCurrency,
  isToday
} from '@/utils/dateUtils';

export const useBudget = () => {
  const [currentPlan, setCurrentPlan] = useState<BudgetPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayBudget, setTodayBudget] = useState<DayBudget | null>(null);

  // Load the current week's plan on mount
  useEffect(() => {
    loadCurrentWeekPlan();
  }, []);

  // Update today's budget when the plan changes
  useEffect(() => {
    if (!currentPlan) return;
    
    const today = new Date();
    const todayFormatted = formatDayDisplay(today);
    const dayBudget = currentPlan.days.find(day => day.dayOfWeek === todayFormatted) || null;
    
    setTodayBudget(dayBudget);
  }, [currentPlan]);

  // Load the current week's plan
  const loadCurrentWeekPlan = () => {
    setLoading(true);
    
    try {
      const plans = loadBudgetPlans();
      const weekId = getWeekIdentifier();
      const plan = plans.find(p => p.weekIdentifier === weekId) || null;
      
      setCurrentPlan(plan);
    } catch (error) {
      console.error('Failed to load current week plan:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new budget plan
  const createBudgetPlan = (initialBudget: number) => {
    const weekDates = getCurrentWeekDates();
    const weekId = getWeekIdentifier();
    
    // Generate daily budgets
    const days: DayBudget[] = weekDates.map((date, index) => {
      const daysRemaining = 7 - index;
      const dailyAmount = initialBudget / daysRemaining;
      
      return {
        dayOfWeek: formatDayDisplay(date),
        daysRemaining,
        dailyBudget: formatCurrency(dailyAmount),
        expenses: formatCurrency(0),
        remainingBudget: formatCurrency(dailyAmount),
        date: date.toISOString()
      };
    });

    // Create the plan
    const newPlan: BudgetPlan = {
      createdAt: new Date().toISOString(),
      weekIdentifier: weekId,
      initialBudget,
      currentBudget: initialBudget,
      days
    };

    // Save and update state
    saveBudgetPlan(newPlan);
    setCurrentPlan(newPlan);
    
    // Find today's budget
    const today = new Date();
    const todayFormatted = formatDayDisplay(today);
    const dayBudget = days.find(day => day.dayOfWeek === todayFormatted) || null;
    setTodayBudget(dayBudget);
    
    return newPlan;
  };

  // Record an expense
  const recordExpense = (amount: number) => {
    if (!currentPlan || !todayBudget) return false;
    
    const today = new Date();
    const todayIndex = currentPlan.days.findIndex(day => 
      new Date(day.date).toDateString() === today.toDateString()
    );
    
    if (todayIndex === -1) return false;
    
    // Deep clone the current plan
    const updatedPlan = JSON.parse(JSON.stringify(currentPlan)) as BudgetPlan;
    
    // Update today's expenses and remaining budget
    const currentDay = updatedPlan.days[todayIndex];
    const currentExpenses = parseCurrency(currentDay.expenses);
    const newExpenses = currentExpenses + amount;
    
    currentDay.expenses = formatCurrency(newExpenses);
    
    // Calculate new remaining budget for today
    const dailyBudget = parseCurrency(currentDay.dailyBudget);
    const newRemaining = Math.max(0, dailyBudget - newExpenses);
    currentDay.remainingBudget = formatCurrency(newRemaining);
    
    // Update overall budget
    updatedPlan.currentBudget -= amount;
    
    // Recalculate budget for future days
    for (let i = todayIndex + 1; i < updatedPlan.days.length; i++) {
      const daysRemaining = updatedPlan.days.length - i;
      const dailyAmount = updatedPlan.currentBudget / daysRemaining;
      
      updatedPlan.days[i].dailyBudget = formatCurrency(dailyAmount);
      
      // Update remaining budget (daily budget - expenses)
      const dayExpenses = parseCurrency(updatedPlan.days[i].expenses);
      const dayRemaining = Math.max(0, dailyAmount - dayExpenses);
      updatedPlan.days[i].remainingBudget = formatCurrency(dayRemaining);
    }
    
    // Save the updated plan
    saveBudgetPlan(updatedPlan);
    setCurrentPlan(updatedPlan);
    setTodayBudget(updatedPlan.days[todayIndex]);
    
    return true;
  };

  // Delete the current plan
  const deleteCurrentPlan = () => {
    if (!currentPlan) return;
    
    deleteBudgetPlan(currentPlan.weekIdentifier);
    setCurrentPlan(null);
    setTodayBudget(null);
  };

  return {
    currentPlan,
    todayBudget,
    loading,
    createBudgetPlan,
    recordExpense,
    deleteCurrentPlan,
    refreshPlan: loadCurrentWeekPlan
  };
};
