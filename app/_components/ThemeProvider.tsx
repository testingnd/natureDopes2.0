"use client"

import * as React from "react"
import { ThemeProvider } from 'next-themes'

export function ThemeProv({ children, ...props }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}