
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass rounded-2xl p-8 text-center space-y-6 border shadow-sm"
      >
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl">Página não encontrada</p>
        <p className="text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Home size={18} />
          <span>Voltar para início</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
