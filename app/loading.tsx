import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Cog6ToothIcon className="h-16 w-16 animate-spin text-slate-600" />
    </div>
  )
}
