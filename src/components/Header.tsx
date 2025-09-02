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
          <div className="w-12 h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/63bf2d95-c213-4f20-aa5f-207401c0699b.png" 
              alt="Rocha Engenharia Logo" 
              className="h-8 w-auto object-contain"
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
        </nav>
      </div>
    </header>
  );
};

export default Header;