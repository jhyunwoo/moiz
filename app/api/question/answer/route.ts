import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session)
    return NextResponse.json(
      { result: "ACCESS DENIED", data: null },
      { status: 401 }
    )

  const requestData = await request.json()
  const { questionId, answer }: { questionId: string; answer: string } =
    requestData

  const questionAnswer = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
    select: {
      answer: true,
    },
  })

  if (questionAnswer?.answer.replace(" ", "") === answer.replace(" ", "")) {
    const addPoint = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        point: {
          increment: 1,
        },
      },
    })
    return NextResponse.json({ result: "SUCCESS", data: true })
  }
}
