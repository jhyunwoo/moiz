import NameForm from "@/components/name-form"
import { prisma } from "@/lib/prisma"
import QuizForm from "./quiz-form"

export default async function Quiz({ params }: { params: { quizId: string } }) {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: params.quizId,
    },
  })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NameForm />
      <div className="bg-purple-500 p-4 text-lg font-semibold text-white">
        {quiz?.title}
      </div>
      <QuizForm quizId={params.quizId} />
    </div>
  )
}
