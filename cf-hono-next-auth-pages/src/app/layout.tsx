import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { NextAuthProvider } from "../Providers/NextAuthProvider";
import { Session } from "next-auth";
import { auth } from "./api/auth/[...nextauth]/auth";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'auth with auth.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
　const session = await auth();
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider session={session as Session ?? null}>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
