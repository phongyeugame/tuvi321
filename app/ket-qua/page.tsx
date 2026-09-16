"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { LaSoTuVi } from "@/lib/tuvi/types"
import { LaSoWheel } from "@/components/tra-cuu/LaSoWheel"
import { LaSoTraditional } from "@/components/tra-cuu/LaSoTraditional"
import { TuViChartViewer, adaptLaSoTuViToChartData } from "@/components/tuvi-chart"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { Button } from "@/components/ui/Button"
import { Download, Share2 } from "lucide-react"

function KetQuaContent() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<LaSoTuVi | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState<"svg" | "traditional" | "wheel">("svg")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const birthTimeParam = searchParams.get("birthTime")
        const birthHourParam = searchParams.get("birthHour")
        const birthMinuteParam = searchParams.get("birthMinute")

        // Construct input payload from searchParams
        const payload = {
          hoTen: searchParams.get("hoTen") || "Chưa rõ",
          gioiTinh: searchParams.get("gioiTinh") || "nam",
          loaiLich: searchParams.get("loaiLich") || "duong",
          ngay: parseInt(searchParams.get("ngay") || "1"),
          thang: parseInt(searchParams.get("thang") || "1"),
          nam: parseInt(searchParams.get("nam") || "1990"),
          gio: searchParams.get("gio") || "Tý",
          birthTime: birthTimeParam || undefined,
          birthHour: birthHourParam ? parseInt(birthHourParam, 10) : undefined,
          birthMinute: birthMinuteParam ? parseInt(birthMinuteParam, 10) : undefined,
          namXemVanHan: parseInt(searchParams.get("namXemVanHan") || new Date().getFullYear().toString()),
        }

        const res = await fetch("/api/tra-cuu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!res.ok) throw new Error("Lỗi tải lá số")
        const result = await res.json()
        setData(result)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (searchParams.toString()) {
      fetchData()
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="py-32 text-center text-gold flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif">Đang an sao và khởi lập lá số tử vi...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="py-32 text-center text-red-500">
        <p className="text-lg font-serif">Có lỗi xảy ra: {error}</p>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Quay lại trang tra cứu
        </Button>
      </div>
    )
  }

  const adminName = data.adminName || "Nguyễn Quốc Trưởng"
  const adminPhone = data.adminPhone || "0865341434"
  const formattedPhone = adminPhone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Top Header & Admin Expert Banner */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 no-print">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-2">
              <span>Lá Số Tử Vi Trực Tuyến</span>
              <span>•</span>
              <span>Chuyên Gia: {adminName}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold">
              Lá Số: {data.input.hoTen}
            </h1>
            <p className="text-muted text-xs md:text-sm mt-1">
              Âm lịch: {data.lunarDate.ngay}/{data.lunarDate.thang}/{data.lunarDate.nam} ({data.canChi.nam}) - Giờ {data.canChi.gio} {data.input.birthTime ? `(${data.input.birthTime})` : ""} | Bản mệnh: {data.nguHanh}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl bg-secondary/80 p-1 border border-border">
              <button
                type="button"
                onClick={() => setViewMode("svg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "svg"
                    ? "bg-gold text-black shadow-md shadow-gold/20"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Lá Số SVG Chuẩn
              </button>
              <button
                type="button"
                onClick={() => setViewMode("traditional")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "traditional"
                    ? "bg-gold text-black shadow-md shadow-gold/20"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Bàn Cờ HTML
              </button>
              <button
                type="button"
                onClick={() => setViewMode("wheel")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "wheel"
                    ? "bg-gold text-black shadow-md shadow-gold/20"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Bánh Xe Tròn
              </button>
            </div>

            <Button
              variant="outline"
              className="gap-1.5 text-xs cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert("Đã copy link lá số của bạn!")
              }}
            >
              <Share2 size={14} /> Chia Sẻ
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Lá Số Display */}
      <ScrollReveal delay={0.1}>
        <div className="mb-10">
          {viewMode === "svg" ? (
            <TuViChartViewer chart={adaptLaSoTuViToChartData(data)} onBack={() => window.history.back()} />
          ) : viewMode === "traditional" ? (
            <LaSoTraditional data={data} />
          ) : (
            <div className="glass p-6 md:p-8 rounded-3xl">
              <LaSoWheel data={data} />
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Tổng Quan Bản Mệnh & Tư Vấn Cùng Admin */}
      <ScrollReveal delay={0.2}>
        <div className="mb-12 no-print">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bản mệnh summary */}
            <div className="lg:col-span-2 glass p-6 rounded-2xl border border-border space-y-4">
              <h2 className="text-xl font-serif text-gold border-b border-border pb-3">
                Tổng Quan Bản Mệnh & Vận Trình
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-background/40 p-3 rounded-xl border border-border">
                  <span className="text-muted block mb-1">Ngũ Hành Nạp Âm</span>
                  <strong className="text-foreground text-sm font-serif">{data.nguHanh}</strong>
                </div>
                <div className="bg-background/40 p-3 rounded-xl border border-border">
                  <span className="text-muted block mb-1">Cục Số</span>
                  <strong className="text-foreground text-sm font-serif">{data.cuc}</strong>
                </div>
                <div className="bg-background/40 p-3 rounded-xl border border-border">
                  <span className="text-muted block mb-1">Cung Mệnh Tọa Thủ</span>
                  <strong className="text-foreground text-sm font-serif">Cung {data.cungMenh}</strong>
                </div>
                <div className="bg-background/40 p-3 rounded-xl border border-border">
                  <span className="text-muted block mb-1">Cung Thân Cư Tại</span>
                  <strong className="text-foreground text-sm font-serif">Cung {data.cungThan}</strong>
                </div>
              </div>
              <p className="leading-relaxed text-muted text-sm bg-black/20 p-4 rounded-xl border border-border/40">
                {data.luanGiaiTongQuan}
              </p>
            </div>

            {/* Direct Admin Consultation Card */}
            <div className="glass p-6 rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-950/20 to-background flex flex-col justify-between space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs text-red-400 font-bold uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  Tư Vấn Chuyên Sâu Cùng Admin
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                  Thầy {adminName}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Cần luận giải chi tiết đại hạn 10 năm, đường công danh sự nghiệp, tài lộc, tình duyên hoặc hóa giải vận hạn?
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/40">
                <a
                  href={`tel:${adminPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all"
                >
                  <Download className="hidden" />
                  <span>Gọi Điện: {formattedPhone}</span>
                </a>
                <a
                  href={`https://zalo.me/${adminPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white font-semibold text-xs border border-blue-400/30 transition-all"
                >
                  <span>Nhắn Tin Zalo Tư Vấn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

export default function KetQuaPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-gold">Đang chuẩn bị dữ liệu...</div>}>
      <KetQuaContent />
    </Suspense>
  )
}
