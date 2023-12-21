"use client"

import { api } from "@/lib/api"
import { loadingState } from "@/lib/recoil"
import useQuestion from "@/lib/use-question"
import useQuizPoint from "@/lib/use-quiz-point"
import useRanking from "@/lib/use-ranking"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"

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
  const { ranking } = useRanking(quizId)

  const setLoading = useSetRecoilState(loadingState)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
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
    setLoading(false)
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
              className="flex w-full max-w-xl space-x-2"
            >
              <input
                placeholder="정답을 입력해주세요."
                autoComplete="off"
                className="w-full rounded-md p-2 outline-none ring-2 ring-purple-400 focus:ring-purple-500 "
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
        <div className="flex w-full max-w-xl flex-col rounded-lg bg-white p-4 font-semibold shadow-lg">
          <div className="text-xl">
            정답:{" "}
            {result?.answer ? (
              result?.answer
            ) : (
              <span className="text-sm text-slate-700">
                답안을 제출하지 않은 경우 정답이 표시되지 않습니다.
              </span>
            )}
          </div>
          <div className="pt-1 text-lg text-purple-600">
            {result?.point ? result?.point : 0} 점 추가
          </div>
          <div className="text-xl">총 {quizPoint}점</div>
          <div className="mt-4 rounded-md bg-slate-50 p-2">
            <div>랭킹</div>
            {ranking?.map((data, index: number) => (
              <div key={data.id}>
                {index + 1}. {data.User.nickname} {data.point}점
              </div>
            ))}
          </div>
        </div>
      )}
      {!question && (
        <div className="text-lg font-semibold">
          퀴즈 시작 전까지 잠시만 기다려주세요.
        </div>
      )}
    </div>
  )
}
