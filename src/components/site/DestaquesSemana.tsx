import Image from "next/image";
import { buscarDestaquesSemana } from "@/lib/wp";

export async function DestaquesSemana() {
  const posts = await buscarDestaquesSemana();

  if (posts.length === 0) return null;

  return (
    <section className="py-11 sm:py-16">
      <div className="wrap">
        <div className="w-14 h-0.5 bg-gold mb-5" />
        <h2 className="font-jost font-normal text-[22px] sm:text-[26px] leading-tight text-navy max-w-[520px] mb-8 sm:mb-[34px]">
          Destaques da semana
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="block bg-surface border border-line rounded overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="h-[150px] bg-gradient-to-br from-[#DCE0E6] to-[#EEF0F3] relative">
                {post.imagem && (
                  <Image src={post.imagem} alt="" fill className="object-cover" unoptimized />
                )}
              </div>
              <div className="p-5">
                <div className="text-[10.5px] tracking-[.14em] uppercase text-gold mb-2">
                  {new Date(post.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <h4 className="text-[15.5px] leading-snug text-navy font-semibold m-0">{post.titulo}</h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
