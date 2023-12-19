import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { result: "ACCESS DENIED", data: null },
      { status: 401 }
    )

  const { searchParams } = new URL(request.url)
  const quizId = searchParams.get("quizId")

  const results = await prisma.quizResult.findMany({
    where: {
      quizId: quizId ? quizId : "",
    },
    include: {
      User: {
        select: {
          nickname: true,
        },
      },
    },
    orderBy: {
      point: "desc",
    },
    take: 10,
  })

  return NextResponse.json({ result: "SUCCESS", data: results })
}
