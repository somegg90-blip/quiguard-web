'use client'
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/pricing' 

  const handleGoogleLogin = async () => {
    setLoading(true)
    const supabase = createClient()
    
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

  return (
    <div className="glass-card p-8 rounded-xl max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-2 text-platinum">Welcome to QuiGuard</h1>
      <p className="text-platinum/60 mb-8 text-sm">Sign in to access your dashboard and manage subscriptions.</p>
      
      <Button 
        onClick={handleGoogleLogin} 
        disabled={loading}
        className="w-full bg-white text-black hover:bg-gray-200 font-medium flex items-center justify-center gap-3"
      >
        <FcGoogle className="w-5 h-5" />
        {loading ? "Redirecting..." : "Continue with Google"}
      </Button>

      <p className="text-xs text-platinum/40 mt-6">
        By signing in, you agree to our <a href="/terms" className="underline hover:text-platinum">Terms</a> and <a href="/privacy" className="underline hover:text-platinum">Privacy Policy</a>.
      </p>
    </div>
  )
}