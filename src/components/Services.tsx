import { Card } from "@/components/ui/card";
import { Shield, FileText, Users, Zap, CheckCircle, Book, HardHat, Activity } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Envio de eventos de SST no e-Social",
      description: "Gestão completa dos eventos de SST no sistema e-Social, garantindo conformidade legal."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Elaboração de LTCAT",
      description: "Laudo Técnico das Condições Ambientais de Trabalho elaborado com precisão técnica."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Elaboração de PCMSO",
      description: "Programa de Controle Médico de Saúde Ocupacional personalizado para sua empresa."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Elaboração de PGR",
      description: "Programa de Gerenciamento de Riscos desenvolvido conforme as normas vigentes."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Declaração de Inexistência de Risco",
      description: "Documento técnico atestando a ausência de riscos ocupacionais específicos."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Prontuário de Instalações Elétricas",
      description: "Documentação completa das instalações elétricas para conformidade com a NR-10."
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Projetos Elétricos",
      description: "Desenvolvimento de projetos elétricos seguros e em conformidade com as normas."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Treinamentos de Normas de Segurança",
      description: "Capacitação profissional em normas de segurança e prevenção de acidentes."
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Nossos <span className="text-brand-gold">Serviços</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Soluções completas em Saúde e Segurança do Trabalho para proteger sua empresa e seus colaboradores
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 group">
              <div className="text-brand-gold group-hover:text-yellow-500 transition-colors mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-brand-dark mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-brand-gray text-lg mb-6">
            Precisa de mais informações sobre nossos serviços?
          </p>
          <button 
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold px-8 py-3 rounded-md transition-colors"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;