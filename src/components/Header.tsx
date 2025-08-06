
import React from 'react';
import { CalendarDays, RefreshCw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HeaderProps {
  onRefresh: () => void;
  hasCurrentPlan: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, hasCurrentPlan }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 glass border-b px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-medium tracking-tight">Weekly Purse</h1>
        </div>
        
        {hasCurrentPlan ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button 
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Refresh data"
              >
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Criar novo plano?</AlertDialogTitle>
                <AlertDialogDescription>
                  Deseja excluir o plano atual e criar um novo? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={onRefresh}>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <button 
            onClick={onRefresh}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Refresh data"
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
