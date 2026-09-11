"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Heart, BookOpen, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  // Hide on admin routes to give clean dashboard workspace
  if (pathname.startsWith("/admin")) {
    return null
  }

  const items = [
    { name: "Trang Chủ", href: "/", icon: Home },
    { name: "Lập Lá Số", href: "/tra-cuu", icon: Compass, highlight: true },
    { name: "Xem Tuổi", href: "/xem-tuoi/vo-chong", icon: Heart },
    { name: "Cung Chức", href: "/cung-chuc", icon: BookOpen },
    { name: "Admin", href: "/admin", icon: ShieldCheck },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1 pointer-events-none">
      <div className="glass border border-gold/30 rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl shadow-black/80 pointer-events-auto backdrop-blur-xl bg-black/85">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          if (item.highlight) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center -mt-6 group"
              >
                <div className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center shadow-lg shadow-gold/40 border-2 border-background group-active:scale-95 transition-transform">
                  <Icon size={22} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-gold mt-1 tracking-tight">
                  {item.name}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors",
                isActive ? "text-gold" : "text-muted hover:text-foreground"
              )}
            >
              <Icon size={18} className={cn(isActive && "stroke-[2.5]")} />
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
