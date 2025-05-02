import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";


export async function GET(){

    const supabase = await createClient()
    const { data: issue} = await supabase.from('issue').select('*')
    console.log(issue)
  return NextResponse.json({
    issue
  })
}