"use client"

import useQuestion from "@/lib/use-question"
import Image from "next/image"
import { SubmitHandler, useForm } from "react-hook-form"

interface Inputs {
  answer: string
}

export default function QuizForm({ quizId }: { quizId: string }) {
  const { question } = useQuestion(quizId)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div>
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
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-center p-4">
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
    </div>
  )
}
