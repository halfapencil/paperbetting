import {createClient} from "@/lib/supabase/client";

const supabase = createClient();
export async function POST(req:Request){
    const body= await req.json();
    const {data,error} = await supabase.from("users").insert([body]);
    if (error){
        return new Response(JSON.stringify(error),{status:500});
    }
    return Response.json(data);
    
}