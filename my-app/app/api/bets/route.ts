import { createClient } from "@/lib/supabase/client";

// Create a new bet POST /api/bets
export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();

    const { data: user, error: userError } = await supabase.from("users").select('balance').eq('uid', body.user_id).single();
    if (user?.balance >= body.amount) {
        const { data, error } = await supabase.from("bets").insert([body]);
        const newBalance = Number(user?.balance) - Number(body.amount);
        await supabase.from("users").update({ balance: newBalance }).eq('uid', body.user_id);
        if (error) {
            return new Response(JSON.stringify(error), { status: 500 });
        }
        return Response.json({ data, newBalance });
    }
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