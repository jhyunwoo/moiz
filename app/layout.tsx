import type { Metadata } from "next"
import "./globals.css"
import AuthPorvider from "@/components/auth-provider"
import RecoilProvider from "@/components/recoil-provider"
import Loading from "@/components/loading"

export const metadata: Metadata = {
  title: "치즈 (치료제 퀴즈)",
  description: "충남삼성고 온라인 퀴즈 플랫폼",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="bg-slate-50">
      <body>
        <AuthPorvider>
          <RecoilProvider>
            {children}
            <Loading />
          </RecoilProvider>
        </AuthPorvider>
      </body>
    </html>
  )
}
