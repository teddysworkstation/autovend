import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "warrenharry01@gmail.com";
const ADMIN_PASSWORD = "@S0n0fGod1998";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    // Check if user already exists
    const { data: list } = await supabase.auth.admin.listUsers();
    let user = list?.users?.find((u: any) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

    if (!user) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: "VMH Admin" },
      });
      if (error) throw error;
      user = data.user;
    } else {
      // Reset password to known value
      await supabase.auth.admin.updateUserById(user.id, { password: ADMIN_PASSWORD, email_confirm: true });
    }

    if (user) {
      await supabase.from("user_roles").upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });
    }

    return new Response(JSON.stringify({ ok: true, user_id: user?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
