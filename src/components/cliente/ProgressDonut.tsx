"use client";

import { useEffect, useState } from "react";

export function ProgressDonut({ percentual }: { percentual: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (mounted ? percentual / 100 : 0) * circumference;

  return (
    <div className="flex flex-col items-center mb-10 sm:mb-11">
      <div className="font-jost text-[10px] tracking-[.24em] uppercase text-muted mb-4">
        Avanço geral da obra
      </div>
      <div className="relative w-[150px] h-[150px]">
        <svg width={150} height={150} viewBox="0 0 150 150" className="-rotate-90">
          <circle cx={75} cy={75} r={radius} fill="none" stroke="#EDEFF2" strokeWidth={11} />
          <circle
            cx={75}
            cy={75}
            r={radius}
            fill="none"
            stroke="#0F2044"
            strokeWidth={11}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-jost text-[31px] text-navy leading-none">{percentual}%</div>
          <div className="text-[9px] tracking-[.2em] uppercase text-muted mt-1.5">Concluído</div>
        </div>
      </div>
    </div>
  );
}
