import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.log(error);
    }
    return  NextResponse.json({data:data});
}