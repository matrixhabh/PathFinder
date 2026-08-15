'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PathfinderShell from '@/components/pathfinder-shell'

const steps = ['Initializing learning intelligence…','Reading your learning profile…','Mapping your skills…','Finding your highest-impact gaps…','Building your path…','Path ready.']

export default function PathfinderAccess(){
  const router=useRouter(); const [ready,setReady]=useState(false); const [step,setStep]=useState(0); const [returning,setReturning]=useState(false)
  useEffect(()=>{ if(localStorage.getItem('pathfinder-auth')!=='true'){router.replace('/login');return} const seen=localStorage.getItem('pathfinder-booted')==='true';setReturning(seen); const duration=seen?420:1450; const timer=window.setTimeout(()=>{localStorage.setItem('pathfinder-booted','true');setReady(true)},duration); const interval=window.setInterval(()=>setStep(value=>Math.min(value+1,steps.length-1)),seen?90:230); return()=>{window.clearTimeout(timer);window.clearInterval(interval)} },[router])
  if(!ready)return <main className={`boot-page ${returning?'boot-returning':''}`}><div className="boot-grid" aria-hidden="true"/><div className="boot-center"><div className="boot-orbit"><span className="brand-mark"/><i/><i/><i/></div><p className="boot-kicker">PATHFINDER AI</p><h1>Your path, made clearer.</h1><div className="boot-status"><span className="status-dot"/>{steps[step]}</div><div className="boot-progress"><i style={{width:`${((step+1)/steps.length)*100}%`}}/></div></div><span className="boot-skip">{returning?'Reconnecting to your path':'Initializing your learning intelligence'}</span></main>
  return <PathfinderShell/>
}
