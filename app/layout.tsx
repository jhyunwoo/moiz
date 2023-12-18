import type { Metadata } from "next";
import "./globals.css";
import AuthPorvider from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "모이즈",
  description: "온라인 퀴즈 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthPorvider>{children}</AuthPorvider>
      </body>
    </html>
  );
}
