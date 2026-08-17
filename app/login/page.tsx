'use client'

import { FormEvent, useState } from 'react'
import { Compass, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('alex@pathfinder.ai')
  const [password, setPassword] = useState('pathfinder')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  function submit(e: FormEvent) { e.preventDefault(); if (!email || password.length < 6) { setError('Enter a valid email and a password with 6+ characters.'); return }; localStorage.setItem('pathfinder-auth','true'); router.push('/') }
  return <main className="auth-page"><div className="auth-glow"/><section className="auth-card"><div className="brand auth-brand"><span className="brand-mark"><Compass size={19}/></span><span><b>PathFinder</b><small>AI CAREER NAVIGATOR</small></span></div><div className="auth-copy"><span className="eyebrow accent">WELCOME BACK</span><h1>Make your next move <span className="accent">clear.</span></h1><p>Your adaptive path is ready when you are.</p></div><form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></label><label>Password<div className="password-field"><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} /><button type="button" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>{error&&<p className="form-error">{error}</p>}<button className="primary-button auth-submit" type="submit"><Sparkles size={16}/> Enter PathFinder</button></form><p className="auth-note">Demo mode: any valid email and 6+ character password works.</p></section></main>
}

export const dynamic = 'force-dynamic'
