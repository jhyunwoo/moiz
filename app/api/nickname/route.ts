import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user.id)
    return NextResponse.json(
      { result: "ACCESS DENIED", data: null },
      { status: 403 }
    )

  const requestData = await request.json()
  const { nickname }: { nickname: string } = requestData
  const updateNickname = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      nickname,
    },
  })
  return NextResponse.json({ result: "SUCCESS", data: updateNickname })
}
