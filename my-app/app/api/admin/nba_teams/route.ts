import { createClient } from "@/lib/supabase/client";

//Get all nba teams
export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase.from("teams").select("teams_id,teams_name,teams_abrev").eq("market", "nba");
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return Response.json(data);
}