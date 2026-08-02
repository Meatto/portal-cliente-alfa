/**
 * Conteúdo real do site alfaengenhariama.com.br — textos, links, ícones e
 * logo puxados da página institucional (não recriados). Ver README para
 * a data da última verificação; revise periodicamente caso o site mude.
 */

export const ALFA_SITE_URL = "https://alfaengenhariama.com.br";

export const ALFA_LOGO_URL =
  "https://alfaengenhariama.com.br/wp-content/uploads/2025/07/Logo-Alfa-Branca.webp";

export const SITE_NAV = [
  { label: "Empreendimentos", href: `${ALFA_SITE_URL}/empreendimentos-em-obras/`, active: false },
  { label: "Sobre nós", href: `${ALFA_SITE_URL}/quem-somos/`, active: false },
  { label: "Notícias", href: `${ALFA_SITE_URL}/blog/`, active: false },
  { label: "Portal do Cliente", href: "/", active: true },
] as const;

export const SERVICOS = [
  {
    titulo: "Agende um horário",
    texto: "Agende um horário com atendimento personalizado",
    href: "https://whatsa.me/559832211212/?t=Ol%C3%A1,%20gostaria%20de%20agendar%20um%20hor%C3%A1rio%20com%20o%20comercial%20da%20ALFA%20ENGENHARIA",
    icon: "calendar",
  },
  {
    titulo: "Conheça todos os empreendimentos",
    texto: "Confira a nossa variedade de empreendimentos",
    href: `${ALFA_SITE_URL}/empreendimentos-em-obras/`,
    icon: "building",
  },
  {
    titulo: "Portal do Cliente",
    texto: "Tenha acesso rápido e fácil a todas as informações do imóvel",
    href: "/",
    icon: "dashboard",
  },
  {
    titulo: "Assistência Alfa",
    texto: "Nosso time está pronto para oferecer todo o suporte necessário",
    href: `${ALFA_SITE_URL}/assistencia-alfa/`,
    icon: "headset",
  },
] as const;

export const SOBRE_ALFA = [
  {
    titulo: "Nossa trajetória",
    texto:
      "Há 58 anos, construímos histórias de excelência em São Luís/MA. Desenvolvendo e construindo empreendimentos residenciais, transformamos cada projeto em experiências de viver bem. Nossa trajetória reflete tradição, qualidade e compromisso com clientes, colaboradores e parceiros.",
  },
  {
    titulo: "Empresa 100% maranhense",
    texto:
      "Somos uma empresa maranhense, com muito orgulho de nossa origem ludovicense. Conhecemos profundamente a região, suas necessidades e potencialidades, e isso se reflete em cada projeto que entregamos, garantindo imóveis que valorizam a cidade e a vida de quem aqui investe.",
  },
  {
    titulo: "+ de 20 empreendimentos",
    texto:
      "Com mais de 20 empreendimentos desenvolvidos, oferecemos projetos que unem alto padrão de acabamento, design inteligente e localização estratégica. Cada obra é planejada para morar bem e investir com segurança, mantendo a qualidade que define o nosso Modo Alfa.",
  },
  {
    titulo: "+ de 1.000 famílias vivendo no Modo Alfa",
    texto:
      "Mais de 1.000 famílias já vivem a experiência de morar no Modo Alfa. São residências que unem conforto, segurança e funcionalidade, em empreendimentos que somam mais de 100 mil metros quadrados construídos, consolidando nossa reputação de confiança e excelência no mercado imobiliário de São Luís.",
  },
] as const;

export const FOOTER_COLUNAS = [
  {
    titulo: "Contato",
    links: [
      { label: "Fale com a Alfa", href: `${ALFA_SITE_URL}/fale-conosco/` },
      {
        label: "Visite a obra",
        href: "https://whatsa.me/559832211212/?t=Ol%C3%A1,%20gostaria%20de%20agendar%20um%20hor%C3%A1rio%20com%20o%20comercial%20da%20ALFA%20ENGENHARIA",
      },
      {
        label: "Agendar uma apresentação",
        href: "https://whatsa.me/559832211212/?t=Ol%C3%A1,%20gostaria%20de%20agendar%20um%20hor%C3%A1rio%20com%20o%20comercial%20da%20ALFA%20ENGENHARIA",
      },
    ],
  },
  {
    titulo: "Seu Alfa",
    links: [
      { label: "Empreendimentos Alfa", href: `${ALFA_SITE_URL}/empreendimentos-em-obras/` },
      { label: "Portal do Cliente", href: "/" },
      {
        label: "Assistência Alfa",
        href: "https://whatsa.me/559832211212/?t=Gostaria%20de%20de%20falar%20sobre%20a%20ASSIST%C3%8ANCIA%20ALFA!%20%20",
      },
    ],
  },
  {
    titulo: "Descubra a Alfa",
    links: [
      { label: "Sobre nós", href: `${ALFA_SITE_URL}/quem-somos/` },
      { label: "Notícias e Eventos", href: `${ALFA_SITE_URL}/blog/` },
      { label: "Política de privacidade", href: `${ALFA_SITE_URL}/politica-de-privacidade/` },
    ],
  },
] as const;

export const REDES_SOCIAIS = [
  { label: "Facebook", href: "https://www.facebook.com/alfaengenhariamaranhao" },
  { label: "Instagram", href: "https://www.instagram.com/alfaengenhariama/" },
] as const;
