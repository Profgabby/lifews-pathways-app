"use client";

import { useEffect } from "react";

export function ModuleProgressTracker({code,stage}:{code:string;stage:number}){
  useEffect(()=>{
    const controller=new AbortController();
    fetch("/api/learner/module-progress",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({code,stage}),
      signal:controller.signal,
    }).catch(()=>{});
    return()=>controller.abort();
  },[code,stage]);
  return null;
}
