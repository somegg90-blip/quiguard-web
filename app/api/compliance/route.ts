// app/api/compliance/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const PROXY_URL = process.env.PROXY_URL || ""

// Server-side Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    // Get user from their session cookie (server-side)
    const { data: { session } } = await supabase.auth.getSession()
    const accessToken = session?.access_token

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate the token and get user
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (error || !user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") || "logs"

    // Forward all query params, inject user_id
    const params = new URLSearchParams(searchParams.toString())
    params.set("user_id", user.id)

    const url = type === "stats"
      ? `${PROXY_URL}/api/audit-stats?${params}`
      : `${PROXY_URL}/api/audit-logs?${params}`

    const res = await fetch(url, { cache: "no-store" })
    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (error: any) {
    console.error("Compliance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}