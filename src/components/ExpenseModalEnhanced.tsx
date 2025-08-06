import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  DollarSign, 
  Calculator, 
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, description?: string) => void;
  maxAmount: number;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ 
  isOpen, 
  onClose,
  onSubmit,
  maxAmount
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isOverBudget, setIsOverBudget] = useState(false);
  
  if (!isOpen) return null;

  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (numAmount > maxAmount) {
      setIsOverBudget(true);
      setError(`Valor excede o orçamento disponível (R$ ${maxAmount.toFixed(2)})`);
    } else {
      setIsOverBudget(false);
      setError('');
    }
  }, [amount, maxAmount]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const expenseAmount = parseFloat(amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      setError('Digite um valor válido maior que zero');
      return;
    }
    
    onSubmit(expenseAmount, description || undefined);
    setAmount('');
    setDescription('');
    setError('');
  };

  const quickAmounts = [10, 25, 50, 100];
  const remainingBudget = maxAmount - parseFloat(amount || '0');
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className="w-full max-w-md bg-card rounded-2xl shadow-2xl border"
      >
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-500/5 rounded-t-2xl" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Nova Despesa</h2>
                <p className="text-sm text-muted-foreground">
                  Saldo disponível: R$ {maxAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-2">
          {/* Amount Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Valor da Despesa
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className={`
                    w-full pl-10 pr-4 py-3 rounded-lg border text-lg font-medium
                    focus:outline-none focus:ring-2 transition-all
                    ${isOverBudget 
                      ? 'border-red-300 focus:ring-red-500 bg-red-50 dark:bg-red-950/20' 
                      : 'border-border focus:ring-primary'
                    }
                  `}
                  autoFocus
                />
              </div>
              
              {/* Quick Amount Buttons */}
              <div className="flex gap-2 mt-3">
                {quickAmounts.map((quickAmount) => (
                  <motion.button
                    key={quickAmount}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="flex-1 py-2 px-3 text-xs rounded-lg border border-border hover:bg-secondary transition-colors"
                  >
                    R$ {quickAmount}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Descrição (opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Almoço, Transporte, Compras..."
                className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={50}
              />
            </div>

            {/* Budget Warning/Info */}
            {amount && parseFloat(amount) > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg flex items-center gap-2 ${
                  isOverBudget 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}
              >
                {isOverBudget ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <div className="flex-1 text-sm">
                  {isOverBudget ? (
                    <span>⚠️ Este gasto excederá seu orçamento diário</span>
                  ) : (
                    <span>✅ Restará R$ {remainingBudget.toFixed(2)} no orçamento</span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && !isOverBudget && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                {error}
              </motion.p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg border border-border hover:bg-secondary transition-colors font-medium"
            >
              Cancelar
            </button>
            <motion.button
              type="submit"
              disabled={!amount || parseFloat(amount) <= 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium transition-all
                flex items-center justify-center gap-2
                ${amount && parseFloat(amount) > 0
                  ? isOverBudget
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-primary hover:bg-primary/90 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <Calculator className="h-4 w-4" />
              {isOverBudget ? 'Registrar Assim Mesmo' : 'Registrar Despesa'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ExpenseModal;
