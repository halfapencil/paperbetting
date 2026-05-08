import { createClient } from "@/lib/supabase/client";

// Create a new bet POST /api/bets, body = {}
export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    const { error } = await supabase.rpc("place_bet", {
        p_user_id: body.user_id,
        p_amount: body.amount,
        p_odds: body.odds,
        p_game_id: body.games_id
    })
    if (error) {
        return new Response(JSON.stringify(error), { status: 400 });
    }

    return Response.json({ success: true });

}
// get all bets. GET /api/bets 
export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase.from("bets").select("*").order("created_at", { ascending: false });
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return Response.json(data);
}