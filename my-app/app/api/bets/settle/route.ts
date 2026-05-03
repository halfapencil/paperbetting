import { createClient } from "@/lib/supabase/client";

export async function POST(req:Request){
    const supabase = createClient();
    const body = await req.json();
    const {data,error} = await supabase.from("bets").update({result:body.result}).eq('id',Number(body.id)).select();
    if(error){
        return new Response(JSON.stringify(error),{status:500});
    }
    return Response.json(data);
}