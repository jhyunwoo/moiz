"use client"

import { loadingState } from "@/lib/recoil"
import { useRecoilValue } from "recoil"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function Loading() {
  const loading = useRecoilValue(loadingState)
  return (
    <div
      className={`fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-slate-100/50 ${
        !loading && "hidden"
      }`}
    >
      <Cog6ToothIcon className="h-16 w-16 animate-spin text-slate-600" />
    </div>
  )
}
