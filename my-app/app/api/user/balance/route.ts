import { createClient } from "@/lib/supabase/client";

export async function GET(req: Request) {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("uid");
    const { data } = await supabase.from("users").select("balance").eq('uid', Number(userID)).single();
    return Response.json(data);
}