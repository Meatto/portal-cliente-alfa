"use client";

import { useEffect, useState } from "react";

export function StageBar({ nome, percentual }: { nome: string; percentual: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="mb-[19px]">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[11.5px] tracking-[.09em] uppercase text-[#3C4148]">{nome}</span>
        <span className="font-jost text-[15px] text-navy tabular-nums">{percentual}%</span>
      </div>
      <div className="h-[7px] bg-[#EDEFF2] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy to-gold"
          style={{
            width: mounted ? `${percentual}%` : "0%",
            transition: "width 1s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}
