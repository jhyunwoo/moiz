import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json({ result: "ACCESS DENIED" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const quizId = searchParams.get("quizId")
}
