"use client"

import React, { useState } from "react"
import { LaSoTuVi, Cung } from "@/lib/tuvi/types"
import { cn } from "@/lib/utils"
import { Compass, LayoutGrid, Sparkles } from "lucide-react"

export function LaSoWheel({ data }: { data: LaSoTuVi }) {
  // Default to Cung Mệnh so user immediately sees rich content on mobile
  const [selectedCung, setSelectedCung] = useState<Cung>(
    () => data.cung.find((c) => c.ten === "Mệnh") || data.cung[0]
  )
  const [viewMode, setViewMode] = useState<"wheel" | "grid">("wheel")

  // 12 slices, each is 30 degrees
  const renderSlices = () => {
    return data.cung.map((cung, index) => {
      // Rotate starting from top (0 deg)
      const angle = index * 30
      const rotate = `rotate(${angle} 200 200)`
      const isSelected = selectedCung?.ten === cung.ten

      return (
        <g
          key={cung.ten}
          transform={rotate}
          className="cursor-pointer transition-all duration-300 hover:opacity-90"
          onClick={() => setSelectedCung(cung)}
        >
          {/* Slice: 200,200 to 200,20, arc to 290,44 */}
          <path
            d="M 200 200 L 200 20 A 180 180 0 0 1 290 44 Z"
            fill={isSelected ? "rgba(212, 175, 55, 0.35)" : "rgba(20, 20, 20, 0.85)"}
            stroke={isSelected ? "#F4E4A6" : "#D4AF37"}
            strokeWidth={isSelected ? "2" : "1"}
            className="transition-colors duration-300"
          />
          {/* Text inside the slice */}
          <text
            x="200"
            y="60"
            transform="rotate(15 200 200)"
            fill={isSelected ? "#FFF" : "#D4AF37"}
            fontSize="13"
            fontFamily="serif"
            textAnchor="middle"
            className="font-bold select-none"
          >
            {cung.ten}
          </text>
          <text
            x="200"
            y="80"
            transform="rotate(15 200 200)"
            fill="#A8A8A0"
            fontSize="10"
            textAnchor="middle"
            className="select-none"
          >
            {cung.viTri}
          </text>
        </g>
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle Switch */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-border/40">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted font-medium">Chế độ xem lá số:</span>
          <div className="inline-flex rounded-xl bg-secondary/80 p-1 border border-border">
            <button
              type="button"
              onClick={() => setViewMode("wheel")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                viewMode === "wheel"
                  ? "bg-gold text-black shadow-md shadow-gold/20"
                  : "text-muted hover:text-foreground"
              )}
            >
              <Compass size={14} />
              <span>Bánh Xe Tròn</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                viewMode === "grid"
                  ? "bg-gold text-black shadow-md shadow-gold/20"
                  : "text-muted hover:text-foreground"
              )}
            >
              <LayoutGrid size={14} />
              <span>Lưới 12 Cung (Dễ xem trên ĐT)</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-muted">
          Đang xem: <span className="text-gold font-bold">Cung {selectedCung.ten} ({selectedCung.viTri})</span>
        </div>
      </div>

      {viewMode === "wheel" ? (
        /* Wheel Layout */
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* SVG Wheel */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <svg viewBox="0 0 400 400" className="w-full max-w-[340px] sm:max-w-[420px] h-auto drop-shadow-2xl">
              {/* Outer Border */}
              <circle cx="200" cy="200" r="195" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
              <circle cx="200" cy="200" r="185" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />

              {/* Slices */}
              {renderSlices()}

              {/* Center Hole (Thiên Bàn) */}
              <circle cx="200" cy="200" r="75" fill="#0A0A0A" stroke="#D4AF37" strokeWidth="2" />
              <text x="200" y="190" fill="#F5F5F0" fontSize="15" textAnchor="middle" className="font-serif font-bold">
                Thiên Bàn
              </text>
              <text x="200" y="210" fill="#D4AF37" fontSize="12" textAnchor="middle" className="font-semibold">
                {data.input.hoTen}
              </text>
              <text x="200" y="226" fill="#A8A8A0" fontSize="10" textAnchor="middle">
                {data.cuc}
              </text>
            </svg>
          </div>

          {/* Details Panel */}
          <div className="w-full lg:w-1/2">
            <div className="glass p-6 md:p-8 rounded-2xl border border-gold/30 shadow-xl animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-5">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gold">
                    Cung {selectedCung.ten}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">Địa chi tọa thủ: Cung {selectedCung.viTri}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold">
                  {selectedCung.chinhTinh.length > 0 ? `${selectedCung.chinhTinh.length} Chính Tinh` : "Vô Chính Diệu"}
                </div>
              </div>

              {/* Chính tinh */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Chính Tinh Tọa Thủ</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCung.chinhTinh.map((sao) => (
                    <span
                      key={sao}
                      className="px-3.5 py-1.5 bg-red-950/40 text-red-200 border border-red-500/40 rounded-xl text-sm font-medium shadow-sm"
                    >
                      ★ {sao}
                    </span>
                  ))}
                  {selectedCung.chinhTinh.length === 0 && (
                    <span className="text-muted text-sm italic">Cung Vô Chính Diệu (Không có chính tinh)</span>
                  )}
                </div>
              </div>

              {/* Phụ tinh */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Phụ Tinh / Bàng Tinh</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCung.phuTinh.map((sao) => (
                    <span
                      key={sao}
                      className="px-3 py-1 bg-secondary text-foreground/90 border border-border rounded-lg text-xs"
                    >
                      {sao}
                    </span>
                  ))}
                  {selectedCung.phuTinh.length === 0 && (
                    <span className="text-muted text-xs">Không có phụ tinh</span>
                  )}
                </div>
              </div>

              {/* Luận giải */}
              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-gold" />
                  <h4 className="text-sm font-bold text-gold">Luận Giải Cung Vị</h4>
                </div>
                <p className="text-foreground/90 leading-relaxed text-sm bg-black/30 p-4 rounded-xl border border-border/50">
                  {selectedCung.luanGiai || "Chưa có lời giải chi tiết cho cung này."}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile-Friendly 12 Palace Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.cung.map((cung) => {
            const isSelected = selectedCung?.ten === cung.ten
            return (
              <div
                key={cung.ten}
                onClick={() => setSelectedCung(cung)}
                className={cn(
                  "p-5 rounded-2xl glass border transition-all cursor-pointer",
                  isSelected
                    ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]"
                    : "border-border hover:border-gold/50"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-bold text-lg text-gold">
                    {cung.ten}
                  </span>
                  <span className="text-xs text-muted px-2 py-0.5 rounded bg-background border border-border">
                    {cung.viTri}
                  </span>
                </div>

                {/* Stars in card */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {cung.chinhTinh.map((sao) => (
                      <span
                        key={sao}
                        className="px-2 py-0.5 text-xs bg-red-950/60 text-red-200 border border-red-500/40 rounded"
                      >
                        {sao}
                      </span>
                    ))}
                    {cung.chinhTinh.length === 0 && (
                      <span className="text-xs text-muted italic">Vô Chính Diệu</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {cung.phuTinh.slice(0, 3).map((sao) => (
                      <span
                        key={sao}
                        className="px-1.5 py-0.5 text-[11px] bg-secondary text-muted rounded"
                      >
                        {sao}
                      </span>
                    ))}
                    {cung.phuTinh.length > 3 && (
                      <span className="text-[10px] text-muted self-center">
                        +{cung.phuTinh.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-gold/30 text-xs text-gold-light leading-relaxed">
                    {cung.luanGiai}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
