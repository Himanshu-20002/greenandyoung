'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Sparkles, Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError('')
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: window.location.origin + redirect
      })
    } catch (err: any) {
      setError(err.message || 'Google login failed')
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const res = await authClient.signIn.email({
          email,
          password
        })
        if (res?.error) {
          setError(res.error.message || 'Invalid email or password')
        } else {
          router.push(redirect)
        }
      } else {
        if (!name) {
          setError('Name is required')
          setLoading(false)
          return
        }
        const res = await authClient.signUp.email({
          email,
          password,
          name
        })
        if (res?.error) {
          setError(res.error.message || 'Failed to create account')
        } else {
          router.push(redirect)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-[#151515]/80 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl p-8 backdrop-blur-xl">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-2 mb-6 justify-center">
        <Sparkles className="w-6 h-6 text-[#C9A86A]" />
        <h1 className="text-2xl font-bold text-white font-serif tracking-tight">
          {isLogin ? 'Sign In to Green & Young' : 'Create an Account'}
        </h1>
      </div>

      {/* Google Login Option */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 disabled:opacity-50 py-3.5 rounded-xl font-extrabold text-sm tracking-wide transition-all shadow-md cursor-pointer mb-6"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-white/10 flex-grow" />
        <span className="text-xs text-white/45 uppercase tracking-widest font-mono">or email credentials</span>
        <div className="h-px bg-white/10 flex-grow" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
              <input
                type="text"
                required
                placeholder="e.g. Jean Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-white/5 focus:border-[#C9A86A] text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder:text-white/20"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
            <input
              type="email"
              required
              placeholder="e.g. jean@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1c1c1c] border border-white/5 focus:border-[#C9A86A] text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1c1c1c] border border-white/5 focus:border-[#C9A86A] text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder:text-white/20"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs font-semibold text-center mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#DFBA73] to-[#B59250] hover:from-[#C9A86A] hover:to-[#8E6D3B] disabled:opacity-50 text-black py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all mt-4 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isLogin ? (
            'Sign In'
          ) : (
            'Register'
          )}
        </button>
      </form>

      {/* Switch Form Trigger */}
      <div className="mt-6 text-center text-xs text-white/45">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className="text-[#C9A86A] hover:underline font-bold"
            >
              Register here
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className="text-[#C9A86A] hover:underline font-bold"
            >
              Sign In here
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full bg-[#0F0D0C] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <Suspense fallback={
        <div className="text-white flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading...
        </div>
      }>
        <AuthForm />
      </Suspense>
    </div>
  )
}
