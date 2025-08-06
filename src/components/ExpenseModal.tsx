
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  maxAmount: number;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ 
  isOpen, 
  onClose,
  onSubmit,
  maxAmount
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const expenseAmount = parseFloat(amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      setError('Digite um valor válido maior que zero');
      return;
    }
    
    if (expenseAmount > maxAmount) {
      setError(`O valor não pode ser maior que R$ ${maxAmount.toFixed(2)}`);
      return;
    }
    
    onSubmit(expenseAmount);
    setAmount('');
    setError('');
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md glass border rounded-t-2xl sm:rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Registrar Despesa</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-2">
            <label htmlFor="expense-amount" className="block text-sm font-medium">
              Valor da Despesa (R$)
            </label>
            <input
              id="expense-amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              placeholder="Ex: 25.00"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none"
              min="0"
              step="0.01"
              required
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            Saldo disponível hoje: <span className="font-medium">R$ {maxAmount.toFixed(2)}</span>
          </p>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Registrar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ExpenseModal;
