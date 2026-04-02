import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const PROXY_URL = process.env.PROXY_URL || "http://localhost:8000"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const res = await fetch(`${PROXY_URL}/api/subscription?user_id=${user.id}`, {
      cache: "no-store",
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
  }
}