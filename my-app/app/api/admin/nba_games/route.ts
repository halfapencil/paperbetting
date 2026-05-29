//API endpoint for getting NBA Games
import { createClient } from "@/lib/supabase/client";

export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    const { data, error } = await supabase.rpc("get_nba_games_from_date", {
        p_start_date: body.start,
        p_end_date: body.end
    });
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
    return Response.json(data);

}

// First and Last game nba
export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_distinct_date_played",{
        p_market: "nba"
    })
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
    return Response.json(data);
} 