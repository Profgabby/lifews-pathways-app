import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getFullCurriculumModule } from "@/lib/modules";

type Payload={code?:string;stage?:number;mcqAnswers?:number[];theoryAnswers?:string[];language?:string};

export async function POST(request:Request){
  try{
    const body=(await request.json()) as Payload;
    const code=String(body.code??"").toUpperCase();
    const stage=Number(body.stage??1);
    if(!code||!Number.isInteger(stage)||stage<1||stage>7)return NextResponse.json({error:"invalid_request"},{status:400});

    const cookieStore=await cookies();
    const token=cookieStore.get("lifews-learner-session")?.value;
    if(!token)return NextResponse.json({error:"learner_session_required"},{status:401});

    let score:number|null=null;
    let mcqAnswers:number[]|null=null;
    let theoryAnswers:string[]|null=null;
    if(stage===6){
      const module=getFullCurriculumModule(code,"en");
      if(!module)return NextResponse.json({error:"module_not_found"},{status:404});
      mcqAnswers=Array.isArray(body.mcqAnswers)?body.mcqAnswers.map(Number):[];
      theoryAnswers=Array.isArray(body.theoryAnswers)?body.theoryAnswers.map(v=>String(v).trim()):[];
      if(mcqAnswers.length!==module.finalAssessment.mcq.length)return NextResponse.json({error:"answer_all_mcq"},{status:400});
      const correct=module.finalAssessment.mcq.reduce((sum,q,index)=>sum+(mcqAnswers?.[index]===q.answer?1:0),0);
      score=Math.round((correct/module.finalAssessment.mcq.length)*10000)/100;
    }

    const supabase=await createSupabaseServerClient();
    const {data,error}=await supabase.rpc("save_learner_module_progress",{
      p_session_token:token,
      p_lesson_code:code,
      p_stage:stage,
      p_mcq_answers:mcqAnswers,
      p_theory_answers:theoryAnswers,
      p_self_mcq_score:score,
    });
    if(error)return NextResponse.json({error:"progress_save_failed"},{status:500});
    const row=Array.isArray(data)?data[0]:data;
    return NextResponse.json({ok:true,score,progress:row??null});
  }catch{
    return NextResponse.json({error:"invalid_request"},{status:400});
  }
}

export async function GET(request:Request){
  const {searchParams}=new URL(request.url);
  const code=String(searchParams.get("code")??"").toUpperCase();
  if(!code)return NextResponse.json({error:"invalid_request"},{status:400});
  const cookieStore=await cookies();
  const token=cookieStore.get("lifews-learner-session")?.value;
  if(!token)return NextResponse.json({progress:null},{status:200});
  const supabase=await createSupabaseServerClient();
  const {data,error}=await supabase.rpc("get_learner_module_progress",{p_session_token:token,p_lesson_code:code});
  if(error)return NextResponse.json({progress:null},{status:200});
  const row=Array.isArray(data)?data[0]:data;
  return NextResponse.json({progress:row??null});
}
