import { Suspense } from "react"
import { AuthForm } from "../auth/AuthForm"

export default function SignupPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 flex items-center justify-center">
      <Suspense fallback={<div className="text-platinum animate-pulse">Loading...</div>}>
        <AuthForm mode="signup" />
      </Suspense>
    </main>
  )
}