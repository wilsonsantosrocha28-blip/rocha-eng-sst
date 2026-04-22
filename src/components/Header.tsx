import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/a4855879-46c8-489a-ac29-64bc54b8610d.png" 
              alt="Rocha Engenharia Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-brand-dark">ROCHA ENGENHARIA</h1>
            <p className="text-xs text-brand-gray">CONSULTORIA E SST</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('sobre')}
            className="text-brand-dark hover:text-brand-gold transition-colors"
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('servicos')}
            className="text-brand-dark hover:text-brand-gold transition-colors"
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('por-que-nos')}
            className="text-brand-dark hover:text-brand-gold transition-colors"
          >
            Por que nós
          </button>
          <Button 
            onClick={() => scrollToSection('contato')}
            variant="default" 
            className="bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold"
          >
            Contato
          </Button>
          {user ? (
            <Button asChild variant="outline" className="border-brand-dark text-brand-dark">
              <Link to="/painel"><LayoutDashboard className="h-4 w-4 mr-2" />Painel</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="border-brand-dark text-brand-dark">
              <Link to="/auth"><LogIn className="h-4 w-4 mr-2" />Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;