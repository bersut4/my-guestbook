-- 방명록 기능용 Supabase 스키마
-- Supabase 프로젝트의 SQL Editor에서 이 파일 전체를 실행하세요.

-- 1) 관리자 여부를 저장하는 프로필 테이블
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false
);

alter table profiles enable row level security;

create policy "본인 프로필만 조회"
  on profiles for select
  using (auth.uid() = id);

-- 2) 방명록 글
create table if not exists guestbook_entries (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null,
  email text,
  phone text,
  sns_account text,
  occupation text,
  referral_source text,
  keyword text,
  emoji text,
  star_rating smallint,
  created_at timestamptz not null default now()
);

alter table guestbook_entries enable row level security;

create policy "방명록 누구나 조회"
  on guestbook_entries for select
  using (true);

create policy "방명록 누구나 작성"
  on guestbook_entries for insert
  with check (true);

create policy "방명록 관리자만 삭제"
  on guestbook_entries for delete
  using (exists (select 1 from profiles where id = auth.uid() and is_admin = true));

-- 3) 방명록 댓글
create table if not exists guestbook_comments (
  id bigint generated always as identity primary key,
  entry_id bigint not null references guestbook_entries (id) on delete cascade,
  commenter_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table guestbook_comments enable row level security;

create policy "댓글 누구나 조회"
  on guestbook_comments for select
  using (true);

create policy "댓글 누구나 작성"
  on guestbook_comments for insert
  with check (true);

create policy "댓글 관리자만 삭제"
  on guestbook_comments for delete
  using (exists (select 1 from profiles where id = auth.uid() and is_admin = true));

-- 4) 좋아요/싫어요 반응 (세션 기반 익명 처리)
create table if not exists guestbook_reactions (
  id bigint generated always as identity primary key,
  entry_id bigint not null references guestbook_entries (id) on delete cascade,
  session_id text not null,
  reaction_type text not null check (reaction_type in ('like', 'dislike')),
  created_at timestamptz not null default now(),
  unique (entry_id, session_id)
);

alter table guestbook_reactions enable row level security;

create policy "반응 누구나 조회"
  on guestbook_reactions for select
  using (true);

create policy "반응 누구나 작성"
  on guestbook_reactions for insert
  with check (true);

create policy "반응 누구나 수정"
  on guestbook_reactions for update
  using (true);

create policy "반응 누구나 삭제"
  on guestbook_reactions for delete
  using (true);

-- =========================================================
-- 관리자 계정 설정 방법 (SQL 실행 후 아래 순서로 진행)
-- =========================================================
-- 1. Supabase 대시보드 → Authentication → Users → "Add user"에서
--    본인 이메일/비밀번호로 계정을 만듭니다.
-- 2. 방금 만든 유저의 UID를 Users 목록에서 복사합니다.
-- 3. 아래 SQL의 'YOUR-USER-UID-HERE' 부분을 그 UID로 바꿔서 실행합니다.
--
-- insert into profiles (id, is_admin) values ('YOUR-USER-UID-HERE', true)
--   on conflict (id) do update set is_admin = true;
--
-- 이후 사이트 우측 상단의 관리자 아이콘으로 방금 만든 이메일/비밀번호로 로그인하면
-- 방명록/댓글 삭제 버튼이 보입니다.
