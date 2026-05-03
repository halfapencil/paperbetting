import { createClient } from "@/lib/supabase/client";
export async function POST(req: Request) {
    const supabase = createClient();

    const body = await req.json();

    const { data, error } = await supabase.from("bets").insert([body]);
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return Response.json(data);
}
export async function GET() {
    const supabase = createClient();

    const { data, error } = await supabase.from("bets").select("*").order("created_at", { ascending: false });
    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return Response.json(data);
}