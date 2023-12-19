import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user.id)
    return NextResponse.json(
      { result: "ACCESS DENIED", data: null },
      { status: 401 }
    )

  const { searchParams } = new URL(request.url)
  const quizId = searchParams.get("quizId")

  const answers = await prisma.quiz.findUnique({
    where: {
      id: quizId ? quizId : "",
    },
    select: {
      questions: true,
    },
  })

  let point = 0
  if (!answers?.questions)
    return NextResponse.json({ result: "CAN NOT FOUND QUESTIONS", data: null })

  for (const question of answers?.questions) {
    const userPoints = await prisma.answers.findMany({
      where: {
        userId: session.user.id,
        questionId: question.id,
      },
      select: {
        point: true,
      },
    })
    for (const userPoint of userPoints) {
      point += userPoint.point
    }
  }

  const findQuizResult = await prisma.quizResult.findFirst({
    where: {
      quizId: quizId ? quizId : "",
      userId: session.user.id,
    },
  })

  if (!findQuizResult) {
    const createQuizResult = await prisma.quizResult.create({
      data: {
        userId: session.user.id,
        quizId: quizId ? quizId : "",
      },
    })
  } else {
    const updateQuizResult = await prisma.quizResult.update({
      where: {
        id: findQuizResult.id,
      },
      data: {
        point: point,
      },
    })
  }

  return NextResponse.json({ result: "SUCESS", data: { point: point } })
}
