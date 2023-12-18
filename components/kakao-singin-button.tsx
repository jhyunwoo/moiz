"use client"

import { signIn } from "next-auth/react"

export default function KakaoSigninButton({
  className,
}: {
  className?: string
}) {
  return (
    <button type="button" onClick={() => signIn("kakao")} className={className}>
      카카오로 로그인
    </button>
  )
}
