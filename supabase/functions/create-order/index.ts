import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { order, items } = await req.json();

    // Create Supabase client with service role
    const supabase = createClient(
      Deno.env.get("https://apjczdgrllujuhaamsyu.supabase.co")!,
      Deno.env.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwamN6ZGdybGx1anVoYWFtc3l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODQyNDYzMiwiZXhwIjoyMDk0MDAwNjMyfQ.xpaXkwtq-ABfY1yq-XqChK5KKhMEvrULRsYcHVkiSYQ")!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Insert order
    const { data: orderRow, error: orderErr } = await supabase
      .from("orders")
      .insert(order)
      .select("id")
      .single();

    if (orderErr) throw orderErr;

    // Insert order items
    if (orderRow && items?.length > 0) {
      const { error: itemsErr } = await supabase
        .from("order_items")
        .insert(
          items.map((it: any) => ({
            ...it,
            order_id: orderRow.id,
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
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        error: e.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
