-- ============================================================
-- La Brasa Grill — Supabase Migration
-- Run this once in the Supabase SQL Editor
-- ============================================================

-- Products
create table if not exists public.products (
  id text primary key,
  name text not null,
  description text default '',
  price numeric not null,
  original_price numeric,
  image text default '',
  category_id text not null,
  tags text[] default '{}',
  available boolean default true,
  featured boolean default false,
  rating numeric,
  prep_time text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  customer_notes text,
  delivery_type text not null,
  delivery_zone_id text,
  delivery_zone_name text,
  delivery_cost numeric default 0,
  subtotal numeric not null,
  total numeric not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Order items
create table if not exists public.order_items (
  id bigint primary key generated always as identity,
  order_id text references public.orders(id) on delete cascade,
  product_id text,
  product_name text not null,
  product_price numeric not null,
  quantity integer not null,
  notes text
);

-- Disable RLS (demo – enable + add policies for production)
alter table public.products disable row level security;
alter table public.orders disable row level security;
alter table public.order_items disable row level security;

-- Enable realtime for orders
alter publication supabase_realtime add table public.orders;

-- ── Seed products (skip if already exist) ───────────────────
insert into public.products (id, name, description, price, original_price, image, category_id, tags, available, featured, rating, prep_time) values
('ent-1','Papas Bravas con Alioli','Papas crocantes con salsa brava picante y alioli casero',2800,null,'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80','entradas','{popular}',true,false,4.8,'10 min'),
('ent-2','Alitas BBQ','8 unidades de alitas de pollo glaseadas en salsa BBQ ahumada',4200,null,'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80','entradas','{popular,picante}',true,false,4.9,'15 min'),
('ent-3','Nachos Supremos','Nachos con guacamole, pico de gallo, crema acida y jalapeños',3500,null,'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80','entradas','{nuevo}',true,false,4.6,'8 min'),
('ent-4','Tabla de Quesos','Seleccion de quesos artesanales con frutos secos y miel',5500,null,'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80','entradas','{premium}',true,false,4.7,'5 min'),
('burg-1','Classic Smash Burger','Doble carne smash 180g, cheddar americano, lechuga, tomate, cebolla caramelizada y nuestra salsa secreta',6500,null,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80','hamburguesas','{popular}',true,true,4.9,'18 min'),
('burg-2','BBQ Bacon Bomb','Carne 200g, bacon crocante, cebolla frita, queso gouda, salsa BBQ ahumada',7800,null,'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80','hamburguesas','{popular,nuevo}',true,true,4.8,'20 min'),
('burg-3','Truffle Mushroom','Carne wagyu 220g, hongos salteados, queso brie, rucula y aceite de trufa',9500,11000,'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80','hamburguesas','{oferta}',true,false,4.9,'22 min'),
('burg-4','Veggie Deluxe','Medallon de legumbres, aguacate, tomate asado, queso vegano, germinados',6200,null,'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80','hamburguesas','{vegano,nuevo}',true,false,4.6,'16 min'),
('burg-5','Spicy Crispy Chicken','Pollo frito crocante, coleslaw picante, pickles, mayo chipotle',6800,null,'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80','hamburguesas','{picante,popular}',true,false,4.7,'20 min'),
('piz-1','Margherita Artesanal','Masa madre 48hs, salsa San Marzano, fior di latte, albahaca fresca',7200,null,'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80','pizzas','{vegano,popular}',true,false,4.8,'25 min'),
('piz-2','Pepperoni Inferno','Doble pepperoni, mozzarella extra, salsa picante, miel de aji',8500,null,'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80','pizzas','{popular,picante}',true,true,4.9,'25 min'),
('piz-3','BBQ Pulled Pork','Cerdo deshilachado, cebolla morada, mozzarella, salsa BBQ, cilantro',9200,null,'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80','pizzas','{nuevo}',true,false,4.7,'28 min'),
('piz-4','4 Formaggi','Mozzarella, gorgonzola, parmesano, fontina, nueces y miel',8800,null,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80','pizzas','{popular}',true,false,4.8,'25 min'),
('pas-1','Fettuccine Alfredo','Fettuccine artesanal, crema, manteca, parmesano reggiano, nuez moscada',6500,null,'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80','pastas','{popular}',true,false,4.7,'20 min'),
('pas-2','Bolognese della Casa','Tagliatelle, ragu de ternera y cerdo cocido 4hs, parmesano, albahaca',7800,null,'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80','pastas','{popular}',true,true,4.9,'20 min'),
('pas-3','Carbonara Originale','Spaghetti, guanciale, yema de huevo, pecorino romano, pimienta negra',7200,null,'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80','pastas','{nuevo}',true,false,4.8,'18 min'),
('pas-4','Ravioles de Calabaza','Ravioles artesanales rellenos de calabaza asada, salvia y manteca tostada',7500,null,'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=400&q=80','pastas','{vegano}',true,false,4.6,'22 min'),
('beb-1','Limonada Especial','Limon exprimido, menta fresca, jengibre, azucar morena, agua con gas',1800,null,'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80','bebidas','{popular}',true,false,4.7,'5 min'),
('beb-2','Smoothie Tropical','Mango, maracuya, pina, coco y yogur griego',2200,null,'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80','bebidas','{nuevo,vegano}',true,false,4.6,'8 min'),
('beb-3','Coca-Cola 500ml','Coca-Cola clasica bien fria',1200,null,'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&q=80','bebidas','{}',true,false,4.5,'1 min'),
('beb-4','Agua Mineral 500ml','Agua mineral con o sin gas',900,null,'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80','bebidas','{}',true,false,4.4,'1 min'),
('pos-1','Brownie con Helado','Brownie de chocolate belga caliente con helado de vainilla y salsa de chocolate',3500,null,'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80','postres','{popular}',true,true,4.9,'10 min'),
('pos-2','Tiramisu Clasico','Receta original con mascarpone, cafe espresso, savoiardi y cacao',3200,null,'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80','postres','{popular}',true,false,4.8,'5 min'),
('pos-3','Cheesecake de Frutos Rojos','Cheesecake cremoso con coulis de frambuesas y fresas frescas',3800,null,'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=400&q=80','postres','{nuevo}',true,false,4.7,'5 min')
on conflict (id) do nothing;
