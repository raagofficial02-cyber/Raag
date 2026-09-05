-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  compare_at INTEGER,
  description TEXT,
  sizes JSONB DEFAULT '[]'::jsonb,
  out_of_stock_sizes JSONB DEFAULT '[]'::jsonb,
  best_seller BOOLEAN DEFAULT false,
  limited BOOLEAN DEFAULT false,
  sold_out BOOLEAN DEFAULT false,
  edition TEXT,
  details JSONB DEFAULT '[]'::jsonb,
  size_guide TEXT,
  shipping TEXT,
  returns TEXT,
  glyph TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT,
  whatsapp TEXT,
  notes TEXT,
  items JSONB NOT NULL,
  subtotal INTEGER NOT NULL,
  delivery_charges INTEGER NOT NULL,
  total INTEGER NOT NULL,
  payment_method TEXT DEFAULT 'Cash on Delivery',
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  city TEXT,
  province TEXT,
  total_orders INTEGER DEFAULT 1,
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial seed data for products
INSERT INTO products (id, name, category, price, compare_at, description, sizes, out_of_stock_sizes, best_seller, limited, sold_out, edition, details, size_guide, shipping, returns, glyph, images) VALUES 
('archive-jacket', 'Archive Overshirt', 'Outerwear', 18500, null, 'An oversized wool-blend overshirt built with a dropped shoulder and a single interior seam running the length of the spine. Made to be worn open, layered, or fastened to the collar.', '["S","M","L","XL"]', '["S"]', true, true, false, 'DROP 004 // 120 UNITS', '["72% wool, 28% technical nylon blend","Dropped shoulder, boxed fit","Raw-edge interior seam detail","Horn-effect buttons, tonal stitching","Made in limited run of 120 units"]', 'Fits true to size with room for a mid-layer. Size down for a closer silhouette. Model is 6''1" wearing size M.', 'Dispatched within 2–4 business days. Delivery across Pakistan in 3–6 business days via courier, cash on delivery.', 'Exchanges accepted within 7 days of delivery if the item is unworn and tagged. Contact us on WhatsApp to arrange.', '<svg class="garment-svg" viewBox="0 0 100 120"><path d="M30 10 L20 22 L28 30 L28 110 L72 110 L72 30 L80 22 L70 10 L58 16 L50 20 L42 16 Z"/><line x1="50" y1="20" x2="50" y2="108"/></svg>', '[]'),
('form-cargo', 'Form Cargo Trouser', 'Bottoms', 13500, 15000, 'A technical cargo trouser cut wide through the leg and tapered at the ankle. Structured utility pockets sit flush against the leg rather than stacked on top, keeping the line clean.', '["30","32","34","36"]', '[]', true, false, false, 'DROP 004 // 200 UNITS', '["Heavyweight cotton twill, 320gsm","Tapered leg, mid-rise","Flush cargo pockets with concealed zips","Articulated knee panelling","Adjustable internal waist tabs"]', 'Sized by waist inches. True to size. Model is 6''0" wearing size 32.', 'Dispatched within 2–4 business days. Delivery across Pakistan in 3–6 business days via courier, cash on delivery.', 'Exchanges accepted within 7 days of delivery if the item is unworn and tagged. Contact us on WhatsApp to arrange.', '<svg class="garment-svg" viewBox="0 0 100 120"><path d="M32 8 H68 L70 40 L74 112 H58 L52 55 L48 55 L42 112 H26 L30 40 Z"/><rect x="24" y="60" width="14" height="18"/><rect x="62" y="60" width="14" height="18"/></svg>', '[]'),
('monolith-hoodie', 'Monolith Hoodie', 'Knitwear', 11000, null, 'A heavyweight hoodie built from a single run of brushed-back fleece. Set-in sleeves, a deep kangaroo pocket, and a hood cut to sit close to the neck rather than fall loose.', '["S","M","L","XL"]', '["XL"]', true, false, false, 'DROP 004 // 250 UNITS', '["480gsm brushed cotton fleece","Set-in sleeve construction","Ribbed cuffs and hem","Reinforced kangaroo pocket","Garment-dyed for tonal depth"]', 'Boxy, relaxed fit. Size down for a slimmer silhouette. Model is 6''1" wearing size M.', 'Dispatched within 2–4 business days. Delivery across Pakistan in 3–6 business days via courier, cash on delivery.', 'Exchanges accepted within 7 days of delivery if the item is unworn and tagged. Contact us on WhatsApp to arrange.', '<svg class="garment-svg" viewBox="0 0 100 120"><path d="M50 8 C34 8 30 20 30 28 L14 40 L22 58 L30 50 L30 112 H70 V50 L78 58 L86 40 L70 28 C70 20 66 8 50 8 Z"/><path d="M38 26 C38 36 62 36 62 26"/></svg>', '[]');
