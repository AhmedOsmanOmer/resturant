create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user" ("id"),
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'eur',
  stripe_session_id text unique,
  stripe_payment_intent text,
  created_at timestamptz default now(),
  paid_at timestamptz
);

create table if not exists order_items (
  id serial primary key,
  order_id uuid not null references orders (id) on delete cascade,
  menu_item_id integer references menu_items (id),
  name text not null,
  unit_price_cents integer not null,
  quantity integer not null check (quantity > 0)
);

create index if not exists orders_user_id_idx on orders (user_id);

create index if not exists order_items_order_id_idx on order_items (order_id);
