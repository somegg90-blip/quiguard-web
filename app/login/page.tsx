import { Suspense } from "react"
import { LoginForm } from "./LoginForm"

export default function LoginPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 flex items-center justify-center">
      {/* Suspense Boundary fixes the build error */}
      <Suspense fallback={
        <div className="glass-card p-8 rounded-xl max-w-md w-full text-center animate-pulse">
          <div className="h-8 bg-platinum/10 rounded mb-4 w-3/4 mx-auto"></div>
          <div className="h-4 bg-platinum/10 rounded mb-8 w-full"></div>
          <div className="h-12 bg-platinum/10 rounded w-full"></div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </main>
  )
}