import { createClient } from "@/lib/supabase/client";

// Settle a bet. POST /api/bets/settle, body : {id, result}, id refers to bet_id.
export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    const { error } = await supabase.rpc("settle_bet", { p_bet_id: body.id, p_result: body.result })
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });

    }
    return Response.json({ success: true });
}