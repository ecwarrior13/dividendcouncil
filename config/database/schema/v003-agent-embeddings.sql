-- ============================================================
-- AGENT EMBEDDINGS — pgvector memory for Aiden & Lexa
-- Stores past reasoning as vectors for semantic retrieval.
-- Used by the Council orchestrator to give agents persistent
-- personality across sessions.
-- ============================================================

create extension if not exists vector with schema extensions;

create table dn_agent_embeddings (
  id         uuid primary key default gen_random_uuid(),
  agent_id   uuid not null references dn_agents(id) on delete cascade,
  session_id uuid references dn_council_sessions(id),
  content    text not null,
  summary    text,
  topic      text,
  embedding  vector(1536) not null,
  created_at timestamptz not null default now()
);

create index on dn_agent_embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 20);
create index on dn_agent_embeddings (agent_id);
alter table dn_agent_embeddings enable row level security;

-- Semantic search: find an agent's most relevant past reasoning
create or replace function match_agent_embeddings(
  query_embedding vector(1536),
  match_agent_id uuid,
  match_count int default 5
)
returns table (content text, summary text, topic text, similarity float)
language plpgsql as $$
begin
  return query
    select ae.content, ae.summary, ae.topic,
           1 - (ae.embedding <=> query_embedding) as similarity
    from dn_agent_embeddings ae
    where ae.agent_id = match_agent_id
    order by ae.embedding <=> query_embedding
    limit match_count;
end;
$$;
