-- ===========================================================
-- AprovadoIA — Setup do banco (rode no Supabase SQL Editor)
-- ===========================================================

-- 1) Tabela de planos
create table if not exists public.planos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nome_concurso text not null,
  edital_path text,
  edital_nome text,
  plano_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists planos_user_id_idx on public.planos(user_id, created_at desc);

alter table public.planos enable row level security;

drop policy if exists "planos_select_own" on public.planos;
create policy "planos_select_own" on public.planos
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "planos_insert_own" on public.planos;
create policy "planos_insert_own" on public.planos
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "planos_update_own" on public.planos;
create policy "planos_update_own" on public.planos
  for update to authenticated using (auth.uid() = user_id);

drop policy if exists "planos_delete_own" on public.planos;
create policy "planos_delete_own" on public.planos
  for delete to authenticated using (auth.uid() = user_id);

-- 2) Bucket de storage para os PDFs dos editais (privado)
insert into storage.buckets (id, name, public)
values ('editais', 'editais', false)
on conflict (id) do nothing;

-- Policies: cada usuário só acessa arquivos dentro de uma pasta com seu próprio user_id
drop policy if exists "editais_select_own" on storage.objects;
create policy "editais_select_own" on storage.objects
  for select to authenticated
  using (bucket_id = 'editais' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "editais_insert_own" on storage.objects;
create policy "editais_insert_own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'editais' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "editais_delete_own" on storage.objects;
create policy "editais_delete_own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'editais' and (storage.foldername(name))[1] = auth.uid()::text);
