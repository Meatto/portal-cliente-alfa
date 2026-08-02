"use client";

import { logoutCliente } from "@/app/actions/auth";

export function LogoutButton() {
  return (
    <button
      onClick={() => logoutCliente()}
      className="tap-target text-[11px] tracking-[.1em] uppercase text-muted hover:text-navy transition-colors"
    >
      Sair
    </button>
  );
}
