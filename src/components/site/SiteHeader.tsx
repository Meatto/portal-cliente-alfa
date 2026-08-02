import Link from "next/link";
import Image from "next/image";
import { ALFA_LOGO_URL, SITE_NAV } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="bg-navy">
      <div className="wrap flex items-center justify-between gap-5 py-4 sm:py-5">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={ALFA_LOGO_URL}
            alt="Alfa Engenharia"
            width={72}
            height={20}
            className="h-4 w-auto sm:h-[18px]"
            priority
            unoptimized
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-[13px] text-white/70">
          {SITE_NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className={
                item.active
                  ? "relative text-white after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[7px] after:h-[2px] after:bg-gold"
                  : "hover:text-white transition-colors"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
