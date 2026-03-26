import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/server"
import { logout } from "@/app/auth/logout/action"
import { Shield, Github, User, Home } from "lucide-react"

// ... imports

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity">
            <Shield className="w-6 h-6 text-electric" />
            <span>QuiGuard</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-platinum/70">
            <Link href="/pricing" className="hover:text-platinum transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-platinum transition-colors">Docs</Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="https://github.com/somegg90-blip/quiguard-gateway" target="_blank">
            <Button variant="ghost" className="p-2"><Github className="w-5 h-5" /></Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/checkout">
                <Button variant="ghost" className="p-2"><User className="w-5 h-5 text-electric" /></Button>
              </Link>
              <form action={logout}>
                <button type="submit" className="text-sm text-platinum/60 hover:text-platinum transition-colors">Logout</button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="secondary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}