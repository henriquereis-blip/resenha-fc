-- Resenha FC: perfis + saves na nuvem. Cole no SQL Editor do Supabase e clique em Run.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nick text not null default 'Treinador' check (char_length(nick) between 2 and 24),
  created_at timestamptz not null default now()
);

create table if not exists public.saves (
  user_id uuid not null references auth.users(id) on delete cascade,
  slot int not null check (slot between 0 and 9),
  data text not null,                 -- JSON do jogo (texto)
  club text, season int, round int,   -- resumo pra listar sem baixar o save
  updated_at timestamptz not null default now(),
  primary key (user_id, slot)
);

alter table public.profiles enable row level security;
alter table public.saves enable row level security;

-- cada pessoa só enxerga e mexe no que é dela
create policy "profiles_select_own" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "saves_select_own" on public.saves for select to authenticated using (user_id = (select auth.uid()));
create policy "saves_insert_own" on public.saves for insert to authenticated with check (user_id = (select auth.uid()));
create policy "saves_update_own" on public.saves for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "saves_delete_own" on public.saves for delete to authenticated using (user_id = (select auth.uid()));

-- como "expor tabelas automaticamente" está desligado, liberamos só pro usuário logado
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.saves to authenticated;
