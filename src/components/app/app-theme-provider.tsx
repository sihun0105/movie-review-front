'use client'

import { ThemeProvider } from 'next-themes'

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      {children}
    </ThemeProvider>
  )
}

export default AppThemeProvider
