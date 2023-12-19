"use client"

import { api } from "@/lib/api"
import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"

interface Inputs {
  name: string
}

export default function NameForm() {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updateNickname = await api("/api/nickname", {
      method: "PUT",
      body: JSON.stringify({ nickname: data.name }),
    })
    console.log(updateNickname)
  }

  return (
    <div className="flex w-full flex-col space-y-1">
      <div className="font-semibold">이름</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col rounded-lg p-1 ring-2 ring-purple-500"
      >
        <div className="flex w-full justify-between">
          <input
            {...register("name", { required: true })}
            defaultValue={session?.user.nickname}
            className="w-full px-1 outline-none"
          />
          <button
            type="submit"
            className="w-16 rounded-md bg-purple-500 p-1 px-2 text-white"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  )
}
