
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

// Custom components
import Header from "@/components/Header";
import Welcome from "@/components/Welcome";
import BudgetCard from "@/components/BudgetCard";
import Loading from "@/components/Loading";
import CreateBudgetModal from "@/components/CreateBudgetModal";
import ExpenseModal from "@/components/ExpenseModal";

// Hooks and utilities
import { useBudget } from "@/hooks/useBudget";
import { parseCurrency } from "@/utils/dateUtils";

const queryClient = new QueryClient();

const MainApp = () => {
  const { 
    currentPlan, 
    todayBudget, 
    loading, 
    createBudgetPlan, 
    recordExpense,
    deleteCurrentPlan,
    refreshPlan 
  } = useBudget();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  
  // Handle creating a new budget plan
  const handleCreateBudget = (amount: number) => {
    createBudgetPlan(amount);
    setShowCreateModal(false);
    toast.success("Plano de orçamento criado com sucesso!");
  };
  
  // Handle recording an expense
  const handleAddExpense = (amount: number) => {
    const success = recordExpense(amount);
    setShowExpenseModal(false);
    
    if (success) {
      toast.success(`Despesa de R$ ${amount.toFixed(2)} registrada`);
    } else {
      toast.error("Erro ao registrar despesa");
    }
  };
  
  // Get available budget for today
  const getAvailableBudget = () => {
    if (!todayBudget) return 0;
    return parseCurrency(todayBudget.remainingBudget);
  };
  
  // Handle refresh button - now deletes the current plan and opens create modal
  const handleRefresh = () => {
    if (currentPlan) {
      deleteCurrentPlan();
      setShowCreateModal(true);
      toast.info("Plano atual excluído");
    } else {
      refreshPlan();
      toast.info("Dados atualizados");
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        onRefresh={handleRefresh} 
        hasCurrentPlan={!!currentPlan}
      />
      
      <main className="container max-w-md mx-auto pt-24 px-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <Loading key="loading" />
          ) : !currentPlan ? (
            <Welcome key="welcome" onCreateBudget={() => setShowCreateModal(true)} />
          ) : (
            <motion.div
              key="budget-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BudgetCard 
                plan={currentPlan} 
                onAddExpense={() => setShowExpenseModal(true)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Modals */}
      <CreateBudgetModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateBudget}
      />
      
      <ExpenseModal 
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onSubmit={handleAddExpense}
        maxAmount={getAvailableBudget()}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="*" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
