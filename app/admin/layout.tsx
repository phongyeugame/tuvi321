"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Settings, 
  ExternalLink, 
  LogOut, 
  ShieldCheck,
  KeyRound
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Don't wrap login page with admin layout
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false)
      return
    }

    const checkAuth = async () => {
      try {
        const hasSession =
          typeof window !== "undefined" &&
          sessionStorage.getItem("admin_active_session") === "true"

        if (!hasSession) {
          // Thoát trang web (đóng tab/trình duyệt hoặc mở tab mới) => bắt buộc đăng nhập lại
          await fetch("/api/admin/auth", { method: "DELETE" })
          setIsAuthenticated(false)
          router.push("/admin/login")
          return
        }

        const res = await fetch("/api/admin/auth")
        const data = await res.json()
        if (data.authenticated) {
          setIsAuthenticated(true)
        } else {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("admin_active_session")
          }
          setIsAuthenticated(false)
          router.push("/admin/login")
        }
      } catch (err) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("admin_active_session")
        }
        setIsAuthenticated(false)
        router.push("/admin/login")
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [pathname, isLoginPage, router])

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_active_session")
    }
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
    router.refresh()
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted text-sm">Đang xác thực quyền quản trị...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { name: "Tổng Quan", href: "/admin", icon: LayoutDashboard },
    { name: "Bài Viết", href: "/admin/posts", icon: FileText },
    { name: "Soạn Bài", href: "/admin/posts/editor", icon: PlusCircle },
    { name: "Cài Đặt", href: "/admin/settings", icon: Settings },
    { name: "Tài Khoản", href: "/admin/account", icon: KeyRound },
  ]

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden flex flex-col md:flex-row">
      {/* Mobile Top Header (1 layout duy nhất, cuộn tự nhiên, không chia 2 layout) */}
      <div className="md:hidden sticky top-0 z-40 bg-secondary/95 backdrop-blur-md border-b border-border/70 w-full">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <ShieldCheck size={18} />
            </div>
            <span className="font-serif font-bold text-gradient text-base">Quản Trị Tử Vi</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-lg bg-background/60 border border-border text-xs text-muted hover:text-gold transition-colors flex items-center gap-1"
              title="Xem trang web"
            >
              <ExternalLink size={14} />
              <span className="text-[11px]">Web</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
              title="Đăng xuất"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Tab Navigation (Cuộn ngang nhẹ thanh tab, không đẩy layout trang) */}
        <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar border-t border-border/40 bg-black/40">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0",
                  isActive
                    ? "bg-gold text-black shadow-md shadow-gold/20 font-bold"
                    : "bg-secondary/60 text-muted hover:text-foreground border border-border/40"
                )}
              >
                <Icon size={13} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Sidebar (Chỉ hiện trên desktop md:) */}
      <aside className="hidden md:flex w-64 bg-secondary/40 border-r border-border p-6 flex-col justify-between shrink-0 min-h-screen sticky top-0">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-border mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-foreground text-sm">Trang Quản Trị</h2>
              <span className="text-[11px] text-gold font-medium">Toàn Quyền Admin</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gold text-black font-semibold shadow-md shadow-gold/20"
                      : "text-muted hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-border space-y-2 mt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={15} />
              Xem Website
            </span>
            <span className="text-[10px] text-gold">Mở tab</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
          >
            <LogOut size={15} />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area: Single layout full width on mobile, no horizontal shifting */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden p-3.5 sm:p-6 md:p-8 box-border">
        {children}
      </main>
    </div>
  )
}
