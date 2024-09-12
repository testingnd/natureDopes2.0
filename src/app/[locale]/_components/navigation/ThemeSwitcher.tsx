'use client'

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

import { CiLight, CiCloudMoon } from "react-icons/ci";

import { Button } from "@radix-ui/themes";

export default function ThemeSwitcher(){
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    const toggleMode = () => setTheme(theme == 'dark' ? 'light' : 'dark')

    useEffect(() => {
        setMounted(true)
      }, [])
    
      if (!mounted) {
        return null
      }

      return (
        <button onClick={toggleMode}>{theme === 'light' ? <CiCloudMoon size={30} />: <CiLight size={30} />}</button>
      )
}

