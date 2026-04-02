import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const PROXY_URL = process.env.PROXY_URL || "http://localhost:8000"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const res = await fetch(
      `${PROXY_URL}/api/keys/${id}?user_id=${user.id}`,
      { method: "DELETE" }
    )

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json({ error: "Failed to revoke key" }, { status: 500 })
  }
}