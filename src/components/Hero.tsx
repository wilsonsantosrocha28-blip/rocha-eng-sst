import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-technician.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-r from-brand-dark to-brand-gray overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <div className="relative h-full">
          <img 
            src={heroImage} 
            alt="Consultoria em Segurança do Trabalho"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-dark/80"></div>
        </div>
      </div>

      {/* Yellow accent shape */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-brand-gold transform -rotate-45 -translate-y-32"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="text-brand-gold text-sm font-semibold tracking-wide uppercase mb-4">
            ROCHA ENGENHARIA
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-brand-light mb-6 leading-tight">
            SUA PARCEIRA
            <br />
            <span className="text-brand-gold">EM SST</span>
          </h1>
          
          <p className="text-xl text-brand-light/90 mb-8 leading-relaxed">
            Transformamos ambientes de trabalho em espaços mais seguros, saudáveis e eficientes. 
            Mais de uma década de experiência em Saúde e Segurança do Trabalho.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold px-8 py-4 text-lg"
            >
              Solicitar Orçamento
            </Button>
            <Button 
              onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline" 
              size="lg"
              className="border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-dark px-8 py-4 text-lg bg-white/10 backdrop-blur-sm"
            >
              Nossos Serviços
            </Button>
          </div>
          
          {/* Decorative crosses */}
          <div className="flex space-x-4 mt-12 text-brand-gold text-xl">
            <span>✕</span>
            <span>✕</span>
            <span>✕</span>
            <span>✕</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;