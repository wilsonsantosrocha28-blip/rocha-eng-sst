import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Entre em <span className="text-brand-gold">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Pronto para transformar a segurança da sua empresa? Entre em contato conosco e solicite um orçamento personalizado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-brand-dark mb-8">Fale Conosco</h3>
            
            <div className="space-y-6">
              <Card className="p-6 flex items-center space-x-4 border-l-4 border-l-brand-gold">
                <div className="text-brand-gold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark">Telefone</h4>
                  <p className="text-brand-gray">(11) 99999-9999</p>
                </div>
              </Card>

              <Card className="p-6 flex items-center space-x-4 border-l-4 border-l-brand-gold">
                <div className="text-brand-gold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark">E-mail</h4>
                  <p className="text-brand-gray">contato@rochaengenharia.com.br</p>
                </div>
              </Card>

              <Card className="p-6 flex items-center space-x-4 border-l-4 border-l-brand-gold">
                <div className="text-brand-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark">Localização</h4>
                  <p className="text-brand-gray">São Paulo, SP</p>
                </div>
              </Card>

              <Card className="p-6 flex items-center space-x-4 border-l-4 border-l-brand-gold">
                <div className="text-brand-gold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark">Horário de Atendimento</h4>
                  <p className="text-brand-gray">Segunda a Sexta: 8h às 18h</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-brand-dark mb-6">Solicite um Orçamento</h3>
              
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-dark font-medium mb-2">Nome</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark font-medium mb-2">Empresa</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-dark font-medium mb-2">E-mail</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark font-medium mb-2">Telefone</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brand-dark font-medium mb-2">Serviço de Interesse</label>
                  <select className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent">
                    <option>Selecione um serviço</option>
                    <option>PCMSO</option>
                    <option>PGR</option>
                    <option>LTCAT</option>
                    <option>e-Social SST</option>
                    <option>Projetos Elétricos</option>
                    <option>Treinamentos</option>
                    <option>Consulta Completa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-brand-dark font-medium mb-2">Mensagem</label>
                  <textarea 
                    rows={4}
                    className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold py-3 text-lg"
                >
                  Enviar Solicitação
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;