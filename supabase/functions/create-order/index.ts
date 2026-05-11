import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  product_slug: string;   // matches order_items.product_slug (DB column)
  title: string;          // matches order_items.title (DB column, required)
  price: number;
  quantity: number;
  image_url?: string | null;
  [key: string]: unknown;
}

interface OrderPayload {
  order: Record<string, unknown>;
  items: OrderItem[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Safely parse request body
    let body: OrderPayload;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { order, items } = body;

    // Validate required fields
    if (!order || typeof order !== "object") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'order' field" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ✅ Read from environment variable names — values come from Supabase secrets
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: missing env vars" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Insert order and return its ID
    const { data: orderRow, error: orderErr } = await supabase
      .from("orders")
      .insert(order)
      .select("id")
      .single();

    if (orderErr) throw orderErr;

    // Insert order items if present
    if (orderRow && Array.isArray(items) && items.length > 0) {
      // Validate each item has the required DB columns
      for (const it of items) {
        if (!it.product_slug || typeof it.product_slug !== "string") {
          return new Response(
            JSON.stringify({ error: "Each item must have a 'product_slug' string" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (!it.title || typeof it.title !== "string") {
          return new Response(
            JSON.stringify({ error: "Each item must have a 'title' string" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      const { error: itemsErr } = await supabase
        .from("order_items")
        .insert(
          items.map((it) => ({
            order_id: orderRow.id,
            product_slug: it.product_slug,
            title: it.title,
            price: it.price,
            quantity: it.quantity,
            image_url: it.image_url ?? null,
          }))
        );

      if (itemsErr) throw itemsErr;
    }

    return new Response(
      JSON.stringify({
        ok: true,
        order_id: orderRow?.id,
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "An unknown error occurred";

    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
