import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user.id)
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

  const checkDoubleAnswer = await prisma.answers.findFirst({
    where: {
      userId: session.user.id,
      questionId: questionId,
    },
  })

  if (checkDoubleAnswer) {
    return NextResponse.json({
      result: "ALREADY SUBMITED",
      data: { point: checkDoubleAnswer.point, answer: questionAnswer?.answer },
    })
  }

  function nomalizeString(str: string) {
    let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim
    return str.replace(reg, "")
  }

  const result =
    nomalizeString(questionAnswer?.answer ? questionAnswer.answer : "") ===
    nomalizeString(answer)

  const countRightAnswers = await prisma.answers.count({
    where: {
      questionId: questionId,
      result: true,
    },
  })

  await prisma.answers.create({
    data: {
      userAnswer: answer,
      userId: session.user.id,
      questionId: questionId,
      result: result,
      point: result ? 300 - countRightAnswers : 0,
    },
  })

  if (result) {
    return NextResponse.json({
      result: "SUCCESS",
      data: {
        point: 300 - countRightAnswers,
        answer: questionAnswer?.answer,
      },
    })
  } else {
    return NextResponse.json({
      result: "SUCCESS",
      data: {
        point: 0,
        answer: questionAnswer?.answer,
      },
    })
  }
}
