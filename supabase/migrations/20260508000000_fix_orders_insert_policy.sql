-- Fix: Allow both authenticated and anonymous users to create orders.
-- The original policy did not explicitly include the anon role,
-- causing "new row violates row-level security policy" for guest checkouts.

DROP POLICY IF EXISTS "Anyone creates orders" ON public.orders;

CREATE POLICY "Anyone creates orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Also fix order_items for the same reason
DROP POLICY IF EXISTS "Anyone creates order items" ON public.order_items;

CREATE POLICY "Anyone creates order items"
  ON public.order_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
