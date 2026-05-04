import { createClient } from "@/lib/supabase/client";

// Settle a bet. POST /api/bets/settle, body : {id, result, odds, amount}, id refers to the id of the bet.
export async function POST(req: Request) {
    function calculatePayout(odds: number, amount: number) {
        if (odds > 0) return amount + (amount * odds) / 100;
        return amount + (amount * 100) / Math.abs(odds);
    }
    const supabase = createClient();
    const body = await req.json();
    const { data: bet, error: betError } = await supabase.from("bets").update({ result: body.result }).eq('id', Number(body.id)).select().single();
    if (betError || !bet) {
        return new Response(JSON.stringify(betError), { status: 500 });
    }
    const { data: user, error: userError } = await supabase.from("users").select("balance").eq("uid", bet.user_id).single();
    if (userError || !user) {
        return new Response(JSON.stringify(userError), { status: 500 });
    }

    let newBalance = user.balance;
    // win
    if (body.result == "win") {
        newBalance += calculatePayout(body.odds, body.amount);
        // push
    } else if (body.result == "push") {
        newBalance += body.amount;
    }
    const { error: updateError } = await supabase.from("users").update({ balance: newBalance }).eq("uid", bet.user_id);
    if (updateError) {
        return new Response(JSON.stringify(updateError), { status: 500 });
    }

    return Response.json({ newBalance, bet });
}