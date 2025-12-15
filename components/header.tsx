"use client"

import { Search, Bell, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search by wallet address or ENS name..." className="pl-10 bg-background/50" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 medvault-lilac rounded-full text-xs flex items-center justify-center text-white font-bold">
              3
            </span>
          </Button>

          <Button variant="ghost" size="icon">
            <HelpCircle className="w-5 h-5" />
          </Button>

          <Avatar className="w-8 h-8">
            <AvatarFallback className="medvault-coral text-white text-sm font-bold">P</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
