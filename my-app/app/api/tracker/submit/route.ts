import { createClient } from "@/lib/supabase/client";

// Submit bets/parlays into database
export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    console.log(body);
    return new Response(JSON.stringify({ status: 200 }))
}