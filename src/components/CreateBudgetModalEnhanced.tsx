import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  DollarSign, 
  Target, 
  Calendar, 
  TrendingUp,
  Calculator,
  Sparkles,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

const CreateBudgetModalEnhanced: React.FC<CreateBudgetModalProps> = ({ 
  isOpen, 
  onClose,
  onSubmit
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  
  if (!isOpen) return null;

  const budgetPresets = [
    { value: 200, label: 'Econômico', description: 'R$ 28,57/dia' },
    { value: 350, label: 'Moderado', description: 'R$ 50,00/dia' },
    { value: 500, label: 'Confortável', description: 'R$ 71,43/dia' },
    { value: 700, label: 'Liberal', description: 'R$ 100,00/dia' },
  ];

  const currentAmount = parseFloat(amount) || 0;
  const dailyAmount = currentAmount / 7;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const budgetAmount = parseFloat(amount);
    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      setError('Digite um valor válido maior que zero');
      return;
    }

    if (budgetAmount < 50) {
      setError('O orçamento mínimo é de R$ 50,00');
      return;
    }

    if (budgetAmount > 5000) {
      setError('O orçamento máximo é de R$ 5.000,00');
      return;
    }
    
    onSubmit(budgetAmount);
    setAmount('');
    setError('');
    setSelectedPreset(null);
  };

  const handlePresetClick = (preset: number) => {
    setAmount(preset.toString());
    setSelectedPreset(preset);
    setError('');
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className="w-full max-w-md bg-card rounded-2xl shadow-2xl border overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-green-500/5 rounded-t-2xl" />
          
          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-16 w-8 h-8 bg-primary/10 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-8 right-8 w-4 h-4 bg-green-500/20 rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  Novo Orçamento
                  <Sparkles className="h-4 w-4 text-primary/60" />
                </h2>
                <p className="text-sm text-muted-foreground">
                  Defina seu limite para esta semana
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
          {/* Budget Presets */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">
              Escolha um modelo ou digite seu valor
            </label>
            <div className="grid grid-cols-2 gap-3">
              {budgetPresets.map((preset) => (
                <motion.button
                  key={preset.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePresetClick(preset.value)}
                  className={`
                    p-3 rounded-xl border text-left transition-all
                    ${selectedPreset === preset.value 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{preset.label}</span>
                    {selectedPreset === preset.value && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    R$ {preset.value.toFixed(2)}
                  </div>
                  <div className="text-xs text-primary/70">
                    {preset.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Valor Personalizado
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedPreset(null);
                    setError('');
                  }}
                  placeholder="Digite o valor..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-lg font-medium"
                  autoFocus
                />
              </div>
            </div>

            {/* Budget Preview */}
            {currentAmount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Resumo do Orçamento
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-600/80 dark:text-green-400/80">Total semanal:</p>
                    <p className="font-semibold text-green-700 dark:text-green-300">
                      R$ {currentAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-green-600/80 dark:text-green-400/80">Por dia:</p>
                    <p className="font-semibold text-green-700 dark:text-green-300">
                      R$ {dailyAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
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
                  ? 'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <Target className="h-4 w-4" />
              Criar Orçamento
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBudgetModalEnhanced;
