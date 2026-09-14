"use client";

import { useEffect,useMemo,useState } from "react";

type Mcq={question:string;options:string[]};
type Props={code:string;language:string;mcq:Mcq[];theory:string[]};

type Copy={submit:string;saving:string;saved:string;score:string;answerAll:string;theoryHint:string;retry:string;sessionRequired:string};
const copy:Record<string,Copy>={
  en:{submit:"Submit assessment",saving:"Saving…",saved:"Assessment saved",score:"Your MCQ score",answerAll:"Answer all multiple-choice questions before submitting.",theoryHint:"Write your application answer",retry:"Please try again.",sessionRequired:"Sign in with your learner code to save progress."},
  fr:{submit:"Soumettre l’évaluation",saving:"Enregistrement…",saved:"Évaluation enregistrée",score:"Votre score QCM",answerAll:"Répondez à toutes les questions à choix multiple avant de soumettre.",theoryHint:"Rédigez votre réponse d’application",retry:"Veuillez réessayer.",sessionRequired:"Connectez-vous avec votre code apprenant pour enregistrer la progression."},
  ha:{submit:"Miƙa gwaji",saving:"Ana adanawa…",saved:"An adana gwaji",score:"Sakamakon MCQ ɗinka",answerAll:"Amsa duk tambayoyin zaɓi kafin miƙawa.",theoryHint:"Rubuta amsar aiwatarwarka",retry:"Sake gwadawa.",sessionRequired:"Shiga da lambar ɗalibi domin adana ci gaba."},
  yo:{submit:"Fi ìdánwò ránṣẹ́",saving:"A ń fipamọ́…",saved:"A ti fi ìdánwò pamọ́",score:"Àbájáde MCQ rẹ",answerAll:"Dáhùn gbogbo ìbéèrè yíyan kí o tó fi ránṣẹ́.",theoryHint:"Kọ ìdáhùn lílò rẹ",retry:"Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kansi.",sessionRequired:"Wọlé pẹ̀lú kóòdù akẹ́kọ̀ọ́ rẹ láti fi ìtẹ̀síwájú pamọ́."},
  ig:{submit:"Zipu nnwale",saving:"Na-echekwa…",saved:"Echekwara nnwale",score:"Nsonaazụ MCQ gị",answerAll:"Zaa ajụjụ nhọrọ niile tupu izipu.",theoryHint:"Dee azịza itinye n’ọrụ gị",retry:"Biko nwaa ọzọ.",sessionRequired:"Jiri koodu onye mmụta banye ka echekwaa ọganihu."},
  ar:{submit:"إرسال التقييم",saving:"جارٍ الحفظ…",saved:"تم حفظ التقييم",score:"نتيجتك في الاختيار المتعدد",answerAll:"أجب عن جميع أسئلة الاختيار المتعدد قبل الإرسال.",theoryHint:"اكتب إجابتك التطبيقية",retry:"يرجى المحاولة مرة أخرى.",sessionRequired:"سجّل الدخول برمز المتعلم لحفظ التقدم."}
};

export function ModuleAssessmentPlayer({code,language,mcq,theory}:Props){
  const c=copy[language]??copy.en;
  const [answers,setAnswers]=useState<(number|null)[]>(()=>mcq.map(()=>null));
  const [theoryAnswers,setTheoryAnswers]=useState<string[]>(()=>theory.map(()=>""));
  const [status,setStatus]=useState<"idle"|"saving"|"saved"|"error">("idle");
  const [score,setScore]=useState<number|null>(null);
  const [message,setMessage]=useState("");

  useEffect(()=>{fetch(`/api/learner/module-progress?code=${encodeURIComponent(code)}`).then(r=>r.json()).then(({progress})=>{
    if(progress?.mcq_answers&&Array.isArray(progress.mcq_answers))setAnswers(progress.mcq_answers.map((v:unknown)=>Number(v)));
    if(progress?.theory_answers&&Array.isArray(progress.theory_answers))setTheoryAnswers(progress.theory_answers.map((v:unknown)=>String(v)));
    if(progress?.self_mcq_score!==null&&progress?.self_mcq_score!==undefined)setScore(Number(progress.self_mcq_score));
  }).catch(()=>{});},[code]);

  const complete=useMemo(()=>answers.every(a=>a!==null),[answers]);
  async function submit(){
    if(!complete){setMessage(c.answerAll);return;}
    setStatus("saving");setMessage("");
    const response=await fetch("/api/learner/module-progress",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code,stage:6,mcqAnswers:answers,theoryAnswers,language})});
    const result=await response.json().catch(()=>({}));
    if(!response.ok){setStatus("error");setMessage(response.status===401?c.sessionRequired:c.retry);return;}
    setScore(typeof result.score==="number"?result.score:null);setStatus("saved");setMessage(c.saved);
  }

  return <div className="module-interactive-assessment">
    <div className="module-question-list">{mcq.map((q,i)=><fieldset key={q.question} className="module-question-card"><legend><span className="question-number">{String(i+1).padStart(2,"0")}</span><strong>{q.question}</strong></legend><div className="module-answer-options">{q.options.map((option,j)=><label key={option}><input type="radio" name={`q-${i}`} checked={answers[i]===j} onChange={()=>setAnswers(prev=>prev.map((v,k)=>k===i?j:v))}/><span>{option}</span></label>)}</div></fieldset>)}</div>
    <h3>Application questions</h3>
    <div className="module-theory-answer-list">{theory.map((q,i)=><label key={q}><strong>{i+1}. {q}</strong><textarea value={theoryAnswers[i]??""} onChange={e=>setTheoryAnswers(prev=>prev.map((v,k)=>k===i?e.target.value:v))} placeholder={c.theoryHint} rows={4}/></label>)}</div>
    <div className="module-assessment-submit"><button type="button" className="module-nav-button" onClick={submit} disabled={status==="saving"}>{status==="saving"?c.saving:c.submit}</button>{score!==null?<strong>{c.score}: {score}%</strong>:null}{message?<span role="status">{message}</span>:null}</div>
  </div>;
}
