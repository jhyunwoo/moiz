"use client"

import { api } from "@/lib/api"
import { loadingState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useSetRecoilState } from "recoil"

interface Inputs {
  name: string
}

export default function NameForm() {
  const { data: session } = useSession()
  const [nickname, setNickname] = useState(true)
  const setLoading = useSetRecoilState(loadingState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const updateNickname = await api<{ result: string }>("/api/nickname", {
      method: "PUT",
      body: JSON.stringify({ nickname: data.name }),
    })
    if (updateNickname.result === "SUCCESS") {
      setNickname(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (session?.user.nickname) {
      setNickname(false)
    }
  }, [session?.user.nickname])

  return (
    <div
      className={`fixed top-0 z-10 flex h-screen w-full items-center justify-center bg-slate-50 p-4 ${
        nickname ? "" : "hidden"
      }`}
    >
      <div className="flex w-full max-w-xl flex-col items-center justify-center space-y-1 rounded-lg bg-white p-4">
        <div className="p-2 text-center text-xl font-semibold">닉네임</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col rounded-lg p-1 ring-2 ring-purple-500"
        >
          <div className="flex w-full justify-between">
            <input
              placeholder="닉네임을 입력해주세요"
              {...register("name", { required: true })}
              className="w-full px-1 outline-none"
            />
            <button
              type="submit"
              className="w-16 rounded-md bg-purple-500 p-1 px-2 text-white"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
