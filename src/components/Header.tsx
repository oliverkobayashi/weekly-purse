
import React from 'react';
import { CalendarDays, RefreshCw, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
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
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 glass border-b px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-medium tracking-tight">Weekly Purse</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

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
      </div>
    </header>
  );
};

export default Header;
