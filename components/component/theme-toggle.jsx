"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu className="">
    <DropdownMenuTrigger className='' asChild>
      <Button size="icon" className="relative">
        <Sun className="h-[1.2rem] text-white w-[1.2rem]rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] text-gray-800 dark:text-gray-200 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent 
      className="relative top-7 z-50 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200"
      align="end"
    >
      <DropdownMenuItem 
        onClick={() => setTheme("light")} 
        className="hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white"
      >
        Light
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => setTheme("dark")} 
        className="hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white"
      >
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem 
        onClick={() => setTheme("system")} 
        className="hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white"
      >
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  
  )
}
