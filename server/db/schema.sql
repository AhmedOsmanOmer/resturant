create table if not exists menu_items (
  id serial primary key,
  name text not null,
  description text not null,
  price numeric(6, 2) not null check (price >= 0),
  category text not null check (category in ('Starters', 'Mains', 'Desserts')),
  image text not null
);
