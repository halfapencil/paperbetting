import { createClient } from "@/lib/supabase/client";

export async function POST(req: Request) {

    const supabase = createClient();
    const body = await req.json();
    const { data, error } = await supabase.rpc('schedule_nba_game', {
        p_home_id: body.home,
        p_away_id: body.away,
        p_date_played: body.date
    });
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
    return Response.json({ status: 500 });
}