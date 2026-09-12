"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Lock, User, ShieldCheck, AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("admin_active_session", "true")
        }
        router.push("/admin")
        router.refresh()
      } else {
        setError(data.message || "Tài khoản hoặc mật khẩu không chính xác")
      }
    } catch (err) {
      setError("Không thể kết nối tới máy chủ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4 text-gold shadow-lg shadow-gold/10">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gradient">
            Quản Trị Hệ Thống
          </h1>
          <p className="text-muted text-sm mt-1">
            Đăng nhập để quản lý toàn bộ nội dung và bài viết Tử Vi
          </p>
        </div>

        <Card glass className="p-6 sm:p-8 border border-border/80 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/90 mb-1.5">
                Tài khoản quản trị
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  required
                  placeholder="Nhập tài khoản"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/90 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gold text-black font-semibold rounded-xl hover:bg-gold-light transition-all shadow-lg shadow-gold/20 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? "Đang xác thực..." : "Đăng Nhập Quản Trị"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
