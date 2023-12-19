"use client"

import { api } from "@/lib/api"
import useQuestion from "@/lib/use-question"
import useQuizPoint from "@/lib/use-quiz-point"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface Inputs {
  answer: string
}

export default function QuizForm({ quizId }: { quizId: string }) {
  const { question } = useQuestion(quizId)
  const { quizPoint } = useQuizPoint(quizId)
  const [result, setResult] = useState<{
    point: number
    answer: string
  }>()

  console.log(question)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const checkAnswer = await api<{
      result: string
      data: { point: number; answer: string }
    }>("/api/question/answer", {
      method: "PUT",
      body: JSON.stringify({ questionId: question?.id, answer: data.answer }),
    })

    if (checkAnswer.result === "SUCCESS") {
      setResult(checkAnswer.data)
    } else {
      setResult({ point: 0, answer: checkAnswer.data.answer })
    }
  }

  useEffect(() => {
    setResult(undefined)
    setValue("answer", "")
  }, [question?.id, setValue])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      {question?.state === "OPEN" && !result ? (
        <>
          <div className="flex w-full flex-col items-center justify-center py-4">
            {question?.image && (
              <Image
                alt={question.question}
                src={question?.image}
                width={300}
                height={300}
              />
            )}
            <div className="text-xl font-semibold">{question?.question}</div>
          </div>
          <div className="flex w-full items-center justify-center p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full space-x-2"
            >
              <input
                placeholder="정답을 입력해주세요."
                className="w-full rounded-md p-2 outline-none ring-2 ring-purple-400 focus:ring-purple-500"
                {...register("answer", {
                  required: { value: true, message: "정답을 입력해주세요." },
                })}
              />
              <button
                type="submit"
                className="w-16 rounded-xl bg-purple-700 p-1 font-semibold text-white"
              >
                제출
              </button>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}

      {(question?.state === "WATING" || result) &&
      question?.state !== "ANSWER" ? (
        <div className="text-xl font-semibold">
          다른 친구들을 기다리는 중...
        </div>
      ) : (
        <></>
      )}

      {question?.state === "ANSWER" && (
        <div>
          <div>정답: {result?.answer}</div>
          <div>{result?.point}점 추가</div>
          <div>총 {quizPoint}점</div>
        </div>
      )}
    </div>
  )
}
