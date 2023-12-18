import NameForm from "@/components/name-form"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4">
        <div className="text-2xl font-bold">모이즈</div>
        <NameForm />
      </div>
    </div>
  )
}
