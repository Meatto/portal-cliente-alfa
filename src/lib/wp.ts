export interface DestaquePost {
  id: number;
  titulo: string;
  data: string;
  link: string;
  imagem: string | null;
}

const WP_ENDPOINT = "https://alfaengenhariama.com.br/wp-json/wp/v2/posts?per_page=3&_embed";

/**
 * Busca os posts mais recentes do blog da Alfa para a seção
 * "Destaques da semana". Se a API do WordPress estiver bloqueada,
 * indisponível ou responder algo inesperado, falha silenciosamente
 * devolvendo uma lista vazia — a seção some da tela sem quebrar o portal.
 */
export async function buscarDestaquesSemana(): Promise<DestaquePost[]> {
  try {
    const res = await fetch(WP_ENDPOINT, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return [];

    const posts = await res.json();
    if (!Array.isArray(posts)) return [];

    return posts.map((post: any) => ({
      id: post.id,
      titulo: stripHtml(post.title?.rendered ?? ""),
      data: post.date,
      link: post.link,
      imagem:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        null,
    }));
  } catch {
    // API bloqueada/instável: fallback silencioso, sem quebrar o portal.
    return [];
  }
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}
