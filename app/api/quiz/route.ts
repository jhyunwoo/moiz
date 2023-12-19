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
  const id = searchParams.get("quizId")

  const question = await prisma.question.findFirst({
    where: {
      quizId: id ? id : "",
      state: "OPEN",
    },
    select: {
      image: true,
      question: true,
    },
  })
  return NextResponse.json({ result: "SUCESS", data: question })
}
