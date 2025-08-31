const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-brand-gold to-yellow-400 rounded-md flex items-center justify-center">
                <span className="text-brand-dark font-bold text-lg">R</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">ROCHA ENGENHARIA</h3>
                <p className="text-xs text-brand-gold">CONSULTORIA E SST</p>
              </div>
            </div>
            <p className="text-brand-light/80 leading-relaxed">
              Transformando ambientes de trabalho em espaços mais seguros, saudáveis e eficientes 
              há mais de uma década.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-brand-gold mb-4">Nossos Serviços</h4>
            <ul className="space-y-2 text-brand-light/80">
              <li>PCMSO</li>
              <li>PGR</li>
              <li>LTCAT</li>
              <li>e-Social SST</li>
              <li>Projetos Elétricos</li>
              <li>Treinamentos de Segurança</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-brand-gold mb-4">Contato</h4>
            <div className="space-y-2 text-brand-light/80">
              <p>📧 contato@rochaengenharia.com.br</p>
              <p>📱 (11) 99999-9999</p>
              <p>📍 São Paulo, SP</p>
              <p>🕒 Segunda a Sexta: 8h às 18h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-light/20 mt-12 pt-8 text-center">
          <p className="text-brand-light/60">
            © 2024 Rocha Engenharia - Consultoria e SST. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;