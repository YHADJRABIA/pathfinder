import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.scss"
import styles from "./layout.module.scss"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Pathfinder",
  description: "Technical assessment for Astraveus",
}

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-body" })

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <main className={styles.root}>{children}</main>
      </body>
    </html>
  )
}
