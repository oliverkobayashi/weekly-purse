
/**
 * Date utility functions for the Weekly Purse app
 */

// Days of the week in Portuguese abbreviations
const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

/**
 * Returns the weekday abbreviation for a given date
 */
export const getWeekdayName = (date: Date): string => {
  return WEEKDAYS[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Adjust to make Monday = 0
};

/**
 * Format a date as "Weekday - DD/MMM"
 */
export const formatDayDisplay = (date: Date): string => {
  const weekday = getWeekdayName(date);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('pt-BR', { month: 'short' }).slice(0, 3);
  return `${weekday} - ${day}/${month}`;
};

/**
 * Get the date of the most recent Monday
 */
export const getLastMonday = (): Date => {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const lastMonday = new Date(today.setDate(diff));
  // Reset hours to beginning of day
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
};

/**
 * Get an array of dates for the current week (starting Monday)
 */
export const getCurrentWeekDates = (): Date[] => {
  const monday = getLastMonday();
  const weekDates: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
};

/**
 * Get the week number in "YYYY-WW" format
 */
export const getWeekIdentifier = (date: Date = new Date()): string => {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - yearStart.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + yearStart.getDay() + 1) / 7);
  return `${date.getFullYear()}-${weekNumber.toString().padStart(2, '0')}`;
};

/**
 * Get the number of days remaining in the week from a given date
 */
export const getDaysRemaining = (date: Date): number => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  // If it's Sunday, return 0, otherwise 7 - day of week (adjusted so Monday = 1)
  return dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
};

/**
 * Format currency as R$ with 2 decimal places
 */
export const formatCurrency = (amount: number): string => {
  return `R$ ${amount.toFixed(2)}`;
};

/**
 * Parse currency string to number
 */
export const parseCurrency = (currencyString: string): number => {
  if (!currencyString) return 0;
  return parseFloat(currencyString.replace('R$', '').trim()) || 0;
};

/**
 * Get today's index in the week (0 = Monday, 6 = Sunday)
 */
export const getTodayIndex = (): number => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to 0 = Monday, 6 = Sunday
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};
