"use client"

import React, { useEffect, useState } from "react"
import { Save, CheckCircle, AlertCircle, Globe, Phone, Mail, Bell, FileText } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function AdminSettingsPage() {
  const [config, setConfig] = useState({
    siteName: "",
    siteSlogan: "",
    siteDescription: "",
    adminName: "Nguyễn Quốc Trưởng",
    adminPhone: "0865341434",
    hotline: "",
    zalo: "",
    email: "",
    announcement: "",
    showAnnouncement: true,
    footerNote: "",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/admin/settings")
        const data = await res.json()
        if (data.config) {
          setConfig(data.config)
        }
      } catch (e) {
        setStatusMessage({ type: "error", text: "Lỗi tải cấu hình website" })
      } finally {
        setLoading(false)
      }
    }
    fetchConfig()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage(null)
    setSaving(true)

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatusMessage({ type: "success", text: "Đã lưu cấu hình website thành công!" })
      } else {
        setStatusMessage({ type: "error", text: data.error || "Lỗi khi lưu cấu hình" })
      }
    } catch (e) {
      setStatusMessage({ type: "error", text: "Lỗi kết nối máy chủ" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-muted text-sm">
        Đang tải cấu hình website...
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full max-w-4xl overflow-x-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gradient">
            Cấu Hình Hệ Thống Website
          </h1>
          <p className="text-muted text-sm mt-1">
            Chỉnh sửa tên website, thông tin liên hệ, thông báo đầu trang và ghi chú chân trang.
          </p>
        </div>

        <Button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light transition-all shadow-lg shadow-gold/20 cursor-pointer disabled:opacity-50"
        >
          <Save size={15} />
          <span>{saving ? "Đang lưu..." : "Lưu Thay Đổi"}</span>
        </Button>
      </div>

      {/* Notification banner */}
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Brand & SEO */}
        <div className="glass p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border pb-3">
            <Globe size={18} className="text-gold" />
            <h2 className="font-serif font-bold text-foreground text-base">Thương Hiệu & SEO</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Tên Website (Brand)
              </label>
              <input
                type="text"
                value={config.siteName}
                onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Khẩu Hiệu (Slogan)
              </label>
              <input
                type="text"
                value={config.siteSlogan}
                onChange={(e) => setConfig({ ...config, siteSlogan: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Mô Tả Trang Web (Meta Description)
              </label>
              <textarea
                rows={3}
                value={config.siteDescription}
                onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-gold leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <div className="glass p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border pb-3">
            <Phone size={18} className="text-gold" />
            <h2 className="font-serif font-bold text-foreground text-base">Thông Tin Liên Hệ</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-border/50">
            <div>
              <label className="block text-xs font-semibold text-gold uppercase tracking-wider mb-1.5">
                Tên Admin / Chuyên Gia trên Lá Số
              </label>
              <input
                type="text"
                placeholder="Nguyễn Quốc Trưởng"
                value={config.adminName || ""}
                onChange={(e) => setConfig({ ...config, adminName: e.target.value })}
                className="w-full bg-background/60 border border-gold/40 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold font-medium"
              />
              <span className="text-[11px] text-muted mt-1 block">Tên hiển thị trên đầu mỗi lá số tử vi được tạo</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gold uppercase tracking-wider mb-1.5">
                Số Điện Thoại Admin trên Lá Số
              </label>
              <input
                type="text"
                placeholder="0865341434"
                value={config.adminPhone || ""}
                onChange={(e) => setConfig({ ...config, adminPhone: e.target.value })}
                className="w-full bg-background/60 border border-gold/40 rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold font-medium"
              />
              <span className="text-[11px] text-muted mt-1 block">Hotline/Zalo hiển thị trên lá số (VD: 0865341434)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Số Điện Thoại / Hotline
              </label>
              <input
                type="text"
                value={config.hotline}
                onChange={(e) => setConfig({ ...config, hotline: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Zalo Tư Vấn
              </label>
              <input
                type="text"
                value={config.zalo}
                onChange={(e) => setConfig({ ...config, zalo: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Email Hỗ Trợ
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Announcement & Footer */}
        <div className="glass p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border pb-3">
            <Bell size={18} className="text-gold" />
            <h2 className="font-serif font-bold text-foreground text-base">Thông Báo & Chân Trang</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border">
              <div>
                <div className="text-sm font-semibold text-foreground">Bật dải thông báo đầu trang</div>
                <div className="text-xs text-muted">Hiển thị thanh thông báo nổi bật cho người dùng khi truy cập</div>
              </div>
              <input
                type="checkbox"
                checked={config.showAnnouncement}
                onChange={(e) => setConfig({ ...config, showAnnouncement: e.target.checked })}
                className="w-5 h-5 accent-gold cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Nội Dung Thông Báo
              </label>
              <input
                type="text"
                value={config.announcement}
                onChange={(e) => setConfig({ ...config, announcement: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Lời Nhắn Chân Trang (Footer Note)
              </label>
              <textarea
                rows={2}
                value={config.footerNote}
                onChange={(e) => setConfig({ ...config, footerNote: e.target.value })}
                className="w-full bg-background/60 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
