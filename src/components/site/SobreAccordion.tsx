"use client";

import { useState } from "react";
import { SOBRE_ALFA } from "@/lib/site-content";

export function SobreAccordion() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="bg-navy text-white py-11 sm:py-16">
      <div className="wrap">
        <h2 className="text-[24px] sm:text-[28px] mb-7 sm:mb-[34px] text-white font-jost font-normal">
          Saiba mais sobre a Alfa
        </h2>
        {SOBRE_ALFA.map((item, i) => {
          const isOpen = aberto === i;
          return (
            <div key={item.titulo} className="border-b border-white/16">
              <button
                onClick={() => setAberto(isOpen ? null : i)}
                className="w-full text-left py-4 text-white text-[13.5px] flex items-center gap-3 tap-target"
                aria-expanded={isOpen}
              >
                <span
                  className="text-gold text-[11px] transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                >
                  ▾
                </span>
                {item.titulo}
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-out"
                style={{ maxHeight: isOpen ? "220px" : "0px" }}
              >
                <p className="text-white/62 text-[13px] pb-[18px] pl-6 max-w-[640px] m-0">{item.texto}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
