'use client'
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/pricing'

  const handleGoogleAuth = async () => {
    setLoading(true)
    const supabase = createClient()
    
    // Note: signInWithOAuth handles both login and signup automatically
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
      },
    })

    if (error) {
      alert(error.message)
      setLoading(false)
    }
  }

  const isLogin = mode === 'login'

  return (
    <div className="glass-card p-8 rounded-xl max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-2 text-platinum">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h1>
      <p className="text-platinum/60 mb-8 text-sm">
        {isLogin 
          ? "Log in to access your dashboard." 
          : "Start securing your agents today."}
      </p>
      
      <Button 
        onClick={handleGoogleAuth} 
        disabled={loading}
        className="w-full bg-white text-black hover:bg-gray-200 font-medium flex items-center justify-center gap-3"
      >
        <FcGoogle className="w-5 h-5" />
        {loading ? "Connecting..." : `Continue with Google`}
      </Button>

      <div className="mt-6 text-sm text-platinum/60">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <Link href="/signup" className="text-electric hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-electric hover:underline">
              Log in
            </Link>
          </>
        )}
      </div>

      <p className="text-xs text-platinum/40 mt-4">
        By continuing, you agree to our <a href="/terms" className="underline hover:text-platinum">Terms</a>.
      </p>
    </div>
  )
}