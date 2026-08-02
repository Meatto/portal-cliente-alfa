import { SERVICOS } from "@/lib/site-content";
import { ServicoIcon } from "./ServicoIcon";

export function ServicosBand() {
  return (
    <section className="bg-[#FAFBFC] py-11 sm:py-16">
      <div className="wrap">
        <div className="w-14 h-0.5 bg-gold mb-5" />
        <h2 className="font-jost font-normal text-[22px] sm:text-[26px] leading-tight text-navy max-w-[520px] mb-8 sm:mb-[34px]">
          Conte com os serviços da Alfa e conheça mais sobre nossos empreendimentos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICOS.map((servico) => (
            <a
              key={servico.titulo}
              href={servico.href}
              target={servico.href.startsWith("http") ? "_blank" : undefined}
              rel={servico.href.startsWith("http") ? "noreferrer" : undefined}
              className="block bg-surface border border-line px-5 py-[22px] transition-colors hover:border-gold tap-target"
            >
              <ServicoIcon name={servico.icon} />
              <h4 className="font-jost font-medium text-[14.5px] text-navy leading-snug mb-2">
                {servico.titulo}
              </h4>
              <p className="text-[12.5px] text-muted leading-relaxed m-0">{servico.texto}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
