"use client"

import React, { useEffect, useState } from "react"
import { ShieldCheck, User, Lock, KeyRound, CheckCircle, AlertCircle, Save } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function AdminAccountPage() {
  const [currentUsername, setCurrentUsername] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch("/api/admin/account")
        const data = await res.json()
        if (data.username) {
          setCurrentUsername(data.username)
          setNewUsername(data.username)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAccount()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage(null)

    if (newPassword && newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Mật khẩu mới và mật khẩu xác nhận không khớp nhau" })
      return
    }

    setSaving(true)
    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newUsername,
          newPassword: newPassword || undefined,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatusMessage({ type: "success", text: data.message })
        setCurrentUsername(newUsername)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setStatusMessage({ type: "error", text: data.error || "Không thể cập nhật tài khoản" })
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: "Lỗi kết nối máy chủ" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-muted text-sm">
        Đang tải thông tin tài khoản...
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full max-w-3xl overflow-x-hidden">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gradient">
          Bảo Mật & Đổi Tài Khoản Admin
        </h1>
        <p className="text-muted text-sm mt-1">
          Tại đây bạn có thể thay đổi tên tài khoản đăng nhập và mật khẩu quản trị viên hệ thống.
        </p>
      </div>

      {/* Alert */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${
            statusMessage.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <Card glass className="p-6 md:p-8 border border-border space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="font-serif font-bold text-foreground text-lg">Thông Tin Tài Khoản</h2>
            <p className="text-xs text-muted">
              Tài khoản đang đăng nhập: <span className="text-gold font-mono font-bold">{currentUsername}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Change Username */}
          <div>
            <label className="block text-sm font-medium text-foreground/90 mb-1.5">
              Tên tài khoản đăng nhập mới
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Ví dụ: admin123"
                className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <h3 className="text-sm font-serif font-bold text-gold mb-3 flex items-center gap-2">
              <KeyRound size={16} />
              Đổi Mật Khẩu
            </h3>
            <p className="text-xs text-muted mb-4">
              Nếu không muốn đổi mật khẩu, bạn hãy để trống ô "Mật khẩu mới" và "Xác nhận mật khẩu mới".
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted tracking-wider mb-1.5">
                  Mật khẩu mới (Tùy chọn)
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới..."
                    className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-muted tracking-wider mb-1.5">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Current Password */}
          <div className="pt-4 border-t border-border/50">
            <label className="block text-sm font-medium text-amber-300 mb-1.5">
              Xác thực: Mật khẩu hiện tại của bạn <span className="text-red-400">*</span>
            </label>
            <div className="relative max-w-md">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại để xác nhận"
                className="w-full bg-background/80 border border-gold/40 rounded-xl pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <p className="text-[11px] text-muted mt-1.5">
              Để bảo vệ an toàn hệ thống, bạn cần nhập đúng mật khẩu hiện tại trước khi lưu thay đổi.
            </p>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-light transition-all shadow-lg shadow-gold/20 cursor-pointer disabled:opacity-50"
            >
              <Save size={16} />
              <span>{saving ? "Đang lưu thay đổi..." : "Lưu Thông Tin Tài Khoản"}</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
