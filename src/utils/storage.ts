
/**
 * Storage utilities for persisting data
 */

// Types for our budget plan
export interface DayBudget {
  dayOfWeek: string;
  daysRemaining: number;
  dailyBudget: string;
  expenses: string;
  remainingBudget: string;
  date: string; // ISO string
}

export interface BudgetPlan {
  createdAt: string; // ISO string
  weekIdentifier: string; // YYYY-WW format
  initialBudget: number;
  currentBudget: number;
  days: DayBudget[];
}

// Local storage keys
const BUDGET_PLANS_KEY = 'weekly-purse-plans';

/**
 * Load all budget plans from storage
 */
export const loadBudgetPlans = (): BudgetPlan[] => {
  try {
    const plansJson = localStorage.getItem(BUDGET_PLANS_KEY);
    if (!plansJson) return [];
    
    const plans = JSON.parse(plansJson);
    return Array.isArray(plans) ? plans : [];
  } catch (error) {
    console.error('Failed to load budget plans:', error);
    return [];
  }
};

/**
 * Save all budget plans to storage
 */
export const saveBudgetPlans = (plans: BudgetPlan[]): void => {
  try {
    localStorage.setItem(BUDGET_PLANS_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Failed to save budget plans:', error);
  }
};

/**
 * Get the current week's budget plan
 */
export const getCurrentWeekPlan = (): BudgetPlan | null => {
  const plans = loadBudgetPlans();
  const today = new Date();
  const weekIdentifier = `${today.getFullYear()}-${Math.ceil((today.getDate() + today.getDay()) / 7)}`;
  
  return plans.find(plan => plan.weekIdentifier === weekIdentifier) || null;
};

/**
 * Save a budget plan
 */
export const saveBudgetPlan = (plan: BudgetPlan): void => {
  const plans = loadBudgetPlans();
  
  // Remove any existing plan for the same week
  const filteredPlans = plans.filter(p => p.weekIdentifier !== plan.weekIdentifier);
  
  // Add the new plan
  filteredPlans.push(plan);
  
  // Save all plans
  saveBudgetPlans(filteredPlans);
};

/**
 * Delete a budget plan
 */
export const deleteBudgetPlan = (weekIdentifier: string): void => {
  const plans = loadBudgetPlans();
  const filteredPlans = plans.filter(p => p.weekIdentifier !== weekIdentifier);
  saveBudgetPlans(filteredPlans);
};
