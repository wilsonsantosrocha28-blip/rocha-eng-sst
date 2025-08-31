import { Card } from "@/components/ui/card";
import { Star, DollarSign, Eye, TrendingUp } from "lucide-react";

const WhyUs = () => {
  const advantages = [
    {
      icon: <Star className="w-12 h-12" />,
      title: "Serviços Essenciais",
      description: "Entregamos exatamente o que sua empresa precisa em SST, sem complicações desnecessárias."
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Custos Acessíveis",
      description: "Preços justos e competitivos, sem mensalidades abusivas que comprometem seu orçamento."
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Transparência Total",
      description: "Processo transparente em cada etapa, com relatórios claros e comunicação constante."
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Gestão Estratégica",
      description: "Promovemos o crescimento do seu negócio com uma cultura de segurança sólida e contínua."
    }
  ];

  return (
    <section id="por-que-nos" className="py-20 bg-gradient-to-r from-brand-dark to-brand-gray text-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Por que escolher a <span className="text-brand-gold">Rocha Engenharia</span>?
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-brand-light/90 max-w-4xl mx-auto leading-relaxed">
            Só a Rocha Engenharia entrega o que sua empresa realmente precisa: serviços essenciais de 
            Saúde e Segurança do Trabalho, com custos acessíveis, sem cobrar mensalidade e transparência 
            em cada etapa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {advantages.map((advantage, index) => (
            <Card key={index} className="bg-brand-light/10 backdrop-blur-sm border-brand-gold/20 p-6 text-center hover:bg-brand-light/20 transition-all duration-300">
              <div className="text-brand-gold mb-4 flex justify-center">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold text-brand-light mb-3">
                {advantage.title}
              </h3>
              <p className="text-brand-light/80 leading-relaxed">
                {advantage.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="bg-brand-light/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border border-brand-gold/20">
          <h3 className="text-2xl font-semibold text-brand-gold mb-4 text-center">
            Nosso Compromisso
          </h3>
          <p className="text-lg text-brand-light/90 text-center leading-relaxed">
            Nossa gestão estratégica promove o crescimento do seu negócio com uma cultura de segurança 
            sólida, contínua e bem implementada — <strong className="text-brand-gold">protegendo vidas, fortalecendo a empresa</strong>.
          </p>
          
          {/* Decorative crosses */}
          <div className="flex justify-center space-x-4 mt-8 text-brand-gold text-xl">
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

export default WhyUs;