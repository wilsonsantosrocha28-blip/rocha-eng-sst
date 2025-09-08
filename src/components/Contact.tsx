import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const templateParams = {
      to_name: "ROCHA ENGENHARIA",
      from_name: formData.get('nome'),
      from_empresa: formData.get('empresa'),
      from_email: "wilsonsantosrocha28@gmail.com",
      reply_to: formData.get('email'),
      from_telefone: formData.get('telefone'),
      servico_interesse: formData.get('servico'),
      message: formData.get('mensagem'),
      to_email: "rochaengsst@gmail.com",
      user_email: formData.get('email')
    };

    try {
      // Você precisa configurar seu EmailJS com suas próprias credenciais
      // Acesse https://www.emailjs.com/ para configurar
      await emailjs.send(
        'YOUR_SERVICE_ID', // Substitua pelo seu Service ID do EmailJS
        'YOUR_TEMPLATE_ID', // Substitua pelo seu Template ID do EmailJS
        templateParams,
        'YOUR_PUBLIC_KEY' // Substitua pela sua Public Key do EmailJS
      );
      
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      // Fallback para mailto se o EmailJS falhar
      const subject = `Solicitação de Orçamento - ${formData.get('servico')}`;
      const body = `Nome: ${formData.get('nome')}
Empresa: ${formData.get('empresa')}
E-mail: ${formData.get('email')}
Telefone: ${formData.get('telefone')}
Serviço de Interesse: ${formData.get('servico')}

Mensagem:
${formData.get('mensagem')}`;
      
      const mailtoLink = `mailto:rochaengsst@gmail.com?from=wilsonsantosrocha28@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      toast.info("Redirecionando para seu cliente de email...");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <p className="text-brand-gray">(98) 981825934</p>
                </div>
              </Card>

              <Card className="p-6 flex items-center space-x-4 border-l-4 border-l-brand-gold">
                <div className="text-brand-gold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark">E-mail</h4>
                  <p className="text-brand-gray">rochaengsst@gmail.com</p>
                </div>
              </Card>

              <Card className="p-6 flex items-center space-x-4 border-l-4 border-l-brand-gold">
                <div className="text-brand-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-dark">Localização</h4>
                  <p className="text-brand-gray">São Luís, MA</p>
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
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-dark font-medium mb-2">Nome</label>
                    <input 
                      type="text" 
                      name="nome"
                      required
                      className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark font-medium mb-2">Empresa</label>
                    <input 
                      type="text" 
                      name="empresa"
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
                      name="email"
                      required
                      className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-dark font-medium mb-2">Telefone</label>
                    <input 
                      type="tel" 
                      name="telefone"
                      className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brand-dark font-medium mb-2">Serviço de Interesse</label>
                  <select 
                    name="servico"
                    required
                    className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="PCMSO">PCMSO</option>
                    <option value="PGR">PGR</option>
                    <option value="LTCAT">LTCAT</option>
                    <option value="e-Social SST">e-Social SST</option>
                    <option value="Projetos Elétricos">Projetos Elétricos</option>
                    <option value="Treinamentos">Treinamentos</option>
                    <option value="Elaboração de Análise Preliminar de Risco - APR">Elaboração de Análise Preliminar de Risco - APR</option>
                    <option value="Plano de Emergência">Plano de Emergência</option>
                    <option value="Permissão de Trabalho de Risco">Permissão de Trabalho de Risco</option>
                    <option value="Consulta Completa">Consulta Completa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-brand-dark font-medium mb-2">Mensagem</label>
                  <textarea 
                    rows={4}
                    name="mensagem"
                    className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-dark font-semibold py-3 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
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