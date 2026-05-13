import { createClient } from "@/lib/supabase/client";

export async function POST(req: Request) {
    const SEASON = "2025-2026";
    const supabase = createClient();
    const body = await req.json();
    const { data, error } = await supabase.rpc("insert_games_nba", {
        p_season: SEASON,
        p_date_played: body.date,
        p_home_team_id: body.homeTeam,
        p_away_team_id: body.awayTeam,
        p_home_scores: body.homeScores,
        p_away_scores: body.awayScores
    })
    if (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 })
    }
    return Response.json({ status: 200 })
}