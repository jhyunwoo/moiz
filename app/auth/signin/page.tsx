import KakaoSigninButton from "@/components/kakao-singin-button"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/")

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4">
        <div className="py-4 text-2xl font-bold">모이즈 로그인</div>
        <KakaoSigninButton className="w-full rounded-lg bg-yellow-400 p-2 text-lg font-semibold text-white" />
      </div>
    </div>
  )
}
