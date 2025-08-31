import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/6737829a-cb2a-4dba-b913-8f5d08d5b8a9.png" 
            alt="Rocha Engenharia - Consultoria e SST"
            className="h-12 w-auto"
          />
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
        </nav>
      </div>
    </header>
  );
};

export default Header;