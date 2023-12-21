import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export const revalidate = 0

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  const quizs = await prisma.quiz.findMany({
    where: {
      isOpen: true,
    },
  })

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
        <div className="py-4 text-3xl font-bold">
          치<span className="text-xs">료제 퀴</span>즈
        </div>
        <div className="flex w-full flex-col space-y-1">
          {quizs.map((data) => (
            <Link
              key={data.id}
              href={`/quiz/${data.id}`}
              className="w-full rounded-md bg-purple-600 p-2 px-3 text-center text-lg font-semibold text-white"
            >
              {data.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
