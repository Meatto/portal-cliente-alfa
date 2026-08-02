-- =====================================================================
-- Dados de exemplo (opcional) — Portal do Cliente Alfa
-- Útil para testar o portal antes da primeira importação real do Sienge.
-- =====================================================================

insert into public.empreendimentos (slug, nome, bairro, avanco_geral, texto_atualizacao, atualizado_em, ordem)
values
  ('giardino-residenza', 'Giardino Residenza', 'Ponta do Farol', 85,
   'A obra segue dentro do cronograma previsto. Neste mês concluímos as divisórias de gesso do último pavimento e avançamos na instalação das esquadrias de alumínio da fachada norte. A equipe inicia agora a preparação para a pintura interna.',
   current_date, 1),
  ('legacy-residence', 'Legacy Residence', 'Península', 62, 'Obra em andamento, dentro do cronograma.', current_date, 2),
  ('connect-peninsula', 'Connect Península', 'Península', 47, 'Obra em andamento, dentro do cronograma.', current_date, 3),
  ('marina-peninsula', 'Marina Península', 'Península', 31, 'Obra em andamento, dentro do cronograma.', current_date, 4),
  ('liv-residence', 'Liv Residence', 'Ponta D''Areia', 18, 'Obra em andamento, dentro do cronograma.', current_date, 5)
on conflict (slug) do nothing;

insert into public.empreendimento_etapas (empreendimento_id, nome, percentual, ordem)
select e.id, s.nome, s.percentual, s.ordem
from public.empreendimentos e
cross join (values
  ('Alvenarias', 92, 1),
  ('Contrapiso', 89, 2),
  ('Divisórias de gesso', 98, 3),
  ('Esquadrias de alumínio e vidro', 55, 4),
  ('Esquadrias de ferro', 42, 5),
  ('Esquadrias de madeira', 20, 6),
  ('Fachada', 80, 7),
  ('Forro de gesso', 60, 8),
  ('Pintura interna', 0, 9),
  ('Louças e metais', 0, 10),
  ('Paisagismo', 0, 11)
) as s(nome, percentual, ordem)
where e.slug = 'giardino-residenza'
on conflict do nothing;

insert into public.campanhas_pesquisa (pergunta, status, periodo_inicio, periodo_fim)
values
  ('Satisfação geral do cliente', 'pausada', '2025-01-01', '2025-06-30'),
  ('Satisfação geral do cliente', 'pausada', '2025-07-01', '2025-12-31'),
  ('Como você avalia o atendimento da Alfa?', 'ativa', '2026-01-01', null)
on conflict do nothing;

-- Cliente de teste (troque o CPF por um válido da sua base ao importar via CSV)
insert into public.clientes (cpf, nome, email, telefone)
values ('00000000000', 'Cliente de Teste', 'teste@example.com', '(98) 90000-0000')
on conflict (cpf) do nothing;
