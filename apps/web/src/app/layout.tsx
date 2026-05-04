import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const inter = localFont({
  src: '../../public/fonts/InterVariable.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Agency Platform',
  description: 'Digital agency platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className="relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="isolate relative flex min-h-svh flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
