"use client"

import { useSession } from "next-auth/react"

export default function NameForm() {
  const { data: session } = useSession()
  return (
    <form>
      <input defaultValue={session?.user.nickname} />
      <button type="submit">확인</button>
    </form>
  )
}
