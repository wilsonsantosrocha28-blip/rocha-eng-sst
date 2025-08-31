import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Sobre a <span className="text-brand-gold">Rocha Engenharia</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-brand-dark mb-6">Nossa História</h3>
            <p className="text-brand-gray text-lg leading-relaxed mb-6">
              Na Rocha Engenharia, nossa missão é transformar ambientes de trabalho em espaços mais seguros, 
              saudáveis e eficientes. Com uma equipe de especialistas que acumulam mais de uma década de 
              experiência em Saúde e Segurança do Trabalho (SST), entregamos soluções personalizadas e 
              eficazes para cada cliente.
            </p>
            <p className="text-brand-gray text-lg leading-relaxed">
              Somos movidos por resultados e comprometidos com a conformidade legal, a redução de riscos 
              e a preservação do bem mais valioso de qualquer empresa: as pessoas. Atuamos com precisão 
              técnica, acompanhamento constante e foco total na prevenção — pilares que nos permitem 
              oferecer uma gestão de SST verdadeiramente estratégica.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-brand-gold">
              <h4 className="text-xl font-semibold text-brand-dark mb-3">Nossa Missão</h4>
              <p className="text-brand-gray">
                Transformar ambientes de trabalho em espaços mais seguros, saudáveis e eficientes.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-brand-gold">
              <h4 className="text-xl font-semibold text-brand-dark mb-3">Nosso Objetivo</h4>
              <p className="text-brand-gray">
                Participar ativamente do crescimento organizacional dos nossos clientes, cuidando de 
                toda sua gestão de SST, enquanto eles focam na prosperidade dos seus negócios.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-brand-gold">
              <h4 className="text-xl font-semibold text-brand-dark mb-3">Experiência</h4>
              <p className="text-brand-gray">
                Mais de uma década de experiência especializada em Saúde e Segurança do Trabalho.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;