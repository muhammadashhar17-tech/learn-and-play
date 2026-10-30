-- Online leaderboard for Learn & Play (Supabase, free plan).
-- Supabase → your project → SQL Editor → paste this file → Run.
--
-- Anyone can read the scores and add a new one; nobody can change or delete
-- them from the app. A teacher can delete a row (for example a rude name) in
-- Supabase → Table Editor → scores.
-- The checks below match the app: 10 questions per round, at most 300 points.

create table if not exists public.scores (
  id          bigint generated always as identity primary key,
  client_id   text not null unique check (char_length(client_id) between 6 and 40),
  name        text not null check (char_length(name) between 2 and 20),
  points      int  not null check (points between 0 and 300),
  correct     int  not null check (correct between 0 and 10),
  total       int  not null check (total between 1 and 10 and correct <= total),
  category    text not null check (category in ('gk', 'science', 'math', 'history', 'language')),
  difficulty  text not null check (difficulty in ('easy', 'medium', 'hard')),
  created_at  timestamptz not null default now()
);

create index if not exists scores_by_points on public.scores (points desc, created_at);
create index if not exists scores_by_category on public.scores (category, points desc);

alter table public.scores enable row level security;

drop policy if exists "Anyone can read scores" on public.scores;
create policy "Anyone can read scores" on public.scores
  for select to anon using (true);

drop policy if exists "Anyone can add a score" on public.scores;
create policy "Anyone can add a score" on public.scores
  for insert to anon with check (true);

-- The app only needs to read and add.
revoke update, delete, truncate on public.scores from anon;
