"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ZodiacIllustration, MiniHorseIcon } from "./ZodiacArt"

export interface PalaceCellData {
  chi: string // Tý, Sửu, Dần...
  tenCung: string // MỆNH, PHỤ MẪU...
  canChiTag?: string // +Q. Tỵ, -Ấ. Mùi...
  daiVan: number // 63, 53, 43...
  isThan?: boolean
  triet?: boolean
  tuan?: boolean
  saoChinh: {
    ten: string
    trangThai: string // (M), (V), (Đ), (H)
    nguHanh: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"
  }[]
  saoCat: string[]
  saoHung: string[]
  hoaKhi: {
    loc: string
    quyen: string
    khoa: string
    ky: string
    isTuQuyen?: boolean
    isTuKy?: boolean
  }
  namTrangThai: string // Bệnh, Suy, Đế vượng, Trường sinh...
  tieuHanNam: string // Năm Mão, Năm Thìn...
  thang: number
  mauNen: string // Pastel background
  conGiap: string
  gridCol: number
  gridRow: number
  luanGiai?: string
}

interface PalaceCellProps {
  cell: PalaceCellData
  isSelected: boolean
  onClick: () => void
  isMobileList?: boolean
}

// Màu tag can chi góc trên trái chuẩn theo ảnh mẫu
function getChiTagStyle(chi: string) {
  switch (chi) {
    case "Tỵ":
      return "bg-[#c94a5a] text-white" // Hồng đỏ
    case "Ngọ":
      return "bg-[#d9534f] text-white" // Đỏ Hỏa
    case "Mùi":
    case "Thìn":
    case "Tuất":
    case "Sửu":
      return "bg-[#e08e0b] text-white" // Vàng Thổ
    case "Thân":
    case "Dậu":
      return "bg-[#6c757d] text-white" // Xám Kim
    case "Hợi":
      return "bg-[#1f4068] text-white" // Xanh đậm Thủy
    case "Tý":
      return "bg-[#0d6efd] text-white" // Xanh dương Thủy
    case "Dần":
    case "Mão":
      return "bg-[#28a745] text-white" // Xanh lá Mộc
    default:
      return "bg-[#6c757d] text-white"
  }
}

// Màu theo ngũ hành của chính tinh
function getChinhTinhStyle(nguHanh: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ") {
  switch (nguHanh) {
    case "Hỏa":
      return "text-[#dc2626] font-bold"
    case "Thủy":
      return "text-[#1d4ed8] font-bold"
    case "Mộc":
      return "text-[#15803d] font-bold"
    case "Thổ":
      return "text-[#ca8a04] font-bold"
    case "Kim":
    default:
      return "text-[#334155] font-bold"
  }
}

// Phân biệt sao cát nổi bật (Thiên khôi, Lộc tồn, Hóa khoa, Hóa quyền...)
function getCatTinhStyle(sao: string) {
  if (sao.includes("Thiên khôi") || sao.includes("Thiên việt") || sao.includes("Đào hoa")) {
    return "text-[#dc2626] font-bold"
  }
  if (sao.includes("Lộc Tồn") || sao.includes("L.Lộc Tồn")) {
    return "text-[#92400e] font-bold"
  }
  if (sao.includes("Hóa quyền") || sao.includes("Hóa khoa")) {
    return "text-[#1d4ed8] font-semibold"
  }
  if (sao.includes("Hóa lộc")) {
    return "text-[#15803d] font-semibold"
  }
  return "text-stone-800 font-medium"
}

export function PalaceCell({ cell, isSelected, onClick, isMobileList = false }: PalaceCellProps) {
  const {
    chi,
    tenCung,
    canChiTag,
    daiVan,
    isThan,
    triet,
    tuan,
    saoChinh,
    saoCat,
    saoHung,
    hoaKhi,
    namTrangThai,
    tieuHanNam,
    thang,
    mauNen,
    gridCol,
    gridRow,
  } = cell

  const isMenh = tenCung === "MỆNH"

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: mauNen,
        gridColumn: !isMobileList ? `${gridCol} / ${gridCol + 1}` : undefined,
        gridRow: !isMobileList ? `${gridRow} / ${gridRow + 1}` : undefined,
      }}
      className={cn(
        "relative p-2 flex flex-col justify-between border-dashed border-[#8b3a3a] transition-all duration-300 cursor-pointer overflow-hidden group select-none",
        !isMobileList ? "min-h-[215px] md:min-h-[230px] border" : "rounded-xl border-2 mb-3",
        isSelected && "ring-2 ring-[#8b3a3a] shadow-xl z-10 scale-[1.01]",
        isMenh && "bg-opacity-95"
      )}
    >
      {/* Hình Con Giáp Cắt Giấy Nền Mờ & Hoạt Ảnh (Opacity ~38%, đặt giữa/lệch phải, phóng to nhẹ nhàng khi rê chuột) */}
      <div className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 w-36 h-36 md:w-44 md:h-44 pointer-events-none overflow-hidden select-none z-0 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-65">
        <ZodiacIllustration
          chi={chi}
          opacity={0.38}
          className="w-full h-full object-contain filter drop-shadow-sm"
        />
      </div>

      {/* 1. Header Ô Cung */}
      <div className="flex items-center justify-between gap-1 border-b border-dashed border-[#8b3a3a]/40 pb-1 relative z-10">
        {/* Góc trên trái: Tag màu Can Chi + Hộp Tên Cung */}
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] md:text-[10.5px] font-mono font-bold shadow-2xs",
              getChiTagStyle(chi)
            )}
          >
            {canChiTag || chi}
          </span>
          <span
            className={cn(
              "bg-white/90 border border-stone-300/80 px-1.5 py-0.5 rounded font-serif font-bold text-[11px] md:text-[12px] tracking-wide uppercase shadow-2xs",
              isMenh ? "text-[#b91c1c] border-red-300" : "text-[#2e1d1d]"
            )}
          >
            {tenCung}
          </span>
          {isThan && (
            <span className="bg-[#374151] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shadow-2xs">
              Thân
            </span>
          )}
        </div>

        {/* Góc trên phải: Hộp Số Đại Vận */}
        <div className="flex items-center gap-1">
          <span className="text-[10.5px] md:text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-white/90 border border-stone-300/80 text-stone-800 shadow-2xs">
            {daiVan}
          </span>
        </div>
      </div>

      {/* 2. Tên Sao Chính ở giữa đầu ô (in đậm màu theo ngũ hành, kèm (M)/(V)/(Đ)/(H)) */}
      <div className="my-0.5 text-center min-h-[22px] relative z-10">
        {saoChinh && saoChinh.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
            {saoChinh.map((sao) => (
              <span
                key={sao.ten}
                className={cn(
                  "text-[12px] md:text-[13px] font-serif tracking-tight leading-tight",
                  getChinhTinhStyle(sao.nguHanh)
                )}
              >
                {sao.ten.toUpperCase()}({sao.trangThai})
              </span>
            ))}
          </div>
        ) : (
          <span className="text-[11px] italic text-stone-400 font-serif">
            {/* Cung Vô Chính Diệu */}
          </span>
        )}
      </div>

      {/* 3. Danh sách sao phụ: Cát tinh (trái) & Sát/Hung tinh (phải) + Huy hiệu TRIỆT/TUẦN */}
      <div className="grid grid-cols-2 gap-1 text-[9.5px] md:text-[10.5px] leading-snug flex-1 relative z-10 my-0.5">
        {/* Cột trái: Cát tinh và các sao tốt */}
        <div className="flex flex-col space-y-0.5 text-left pr-0.5">
          {saoCat.slice(0, 8).map((sao) => (
            <span key={sao} className={cn("truncate", getCatTinhStyle(sao))}>
              {sao}
            </span>
          ))}
        </div>

        {/* Cột phải: Sát tinh (đỏ nổi bật) & Badge TRIỆT / TUẦN */}
        <div className="flex flex-col space-y-0.5 text-right pl-0.5 items-end">
          {triet && (
            <span className="inline-block bg-[#0284c7] text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded shadow-sm mb-0.5 tracking-wider">
              TRIỆT
            </span>
          )}
          {tuan && (
            <span className="inline-block bg-[#15803d] text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded shadow-sm mb-0.5 tracking-wider">
              TUẦN
            </span>
          )}
          {saoHung.slice(0, 8).map((sao) => (
            <span key={sao} className="text-[#b91c1c] font-bold truncate">
              {sao}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Hàng 4 mục nhỏ theo dạng icon con ngựa vàng + tên sao: Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ */}
      <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[8.5px] md:text-[9.5px] leading-tight pt-1 pb-0.5 border-t border-dashed border-[#8b3a3a]/30 relative z-10">
        <div className="flex items-center gap-0.5 truncate">
          <span className="shrink-0 text-sky-700 italic font-medium">Hóa lộc</span>
          <MiniHorseIcon className="w-2.5 h-2.5 shrink-0 text-amber-700" />
          <span className="truncate text-stone-700">{hoaKhi.loc}</span>
        </div>
        <div className="flex items-center gap-0.5 truncate">
          <span className="shrink-0 text-sky-700 italic font-medium">
            {hoaKhi.isTuQuyen ? <span className="text-red-600 font-bold not-italic">Tự </span> : ""}Hóa quyền
          </span>
          <MiniHorseIcon className="w-2.5 h-2.5 shrink-0 text-amber-700" />
          <span className="truncate text-stone-700">{hoaKhi.quyen}</span>
        </div>
        <div className="flex items-center gap-0.5 truncate">
          <span className="shrink-0 text-sky-700 italic font-medium">Hóa khoa</span>
          <MiniHorseIcon className="w-2.5 h-2.5 shrink-0 text-amber-700" />
          <span className="truncate text-stone-700">{hoaKhi.khoa}</span>
        </div>
        <div className="flex items-center gap-0.5 truncate">
          <span className="shrink-0 text-sky-700 italic font-medium">
            {hoaKhi.isTuKy ? <span className="text-red-600 font-bold not-italic">Tự </span> : ""}Hóa kỵ
          </span>
          <MiniHorseIcon className="w-2.5 h-2.5 shrink-0 text-amber-700" />
          <span className="truncate text-stone-700">{hoaKhi.ky}</span>
        </div>
      </div>

      {/* 5. Chân ô: 3 cột — "Năm [Chi]" | "[Vòng Tràng Sinh: Trường sinh...]" | "Tháng [số]" */}
      <div className="pt-1 mt-0.5 border-t border-dashed border-[#8b3a3a]/40 flex items-center justify-between text-[9.5px] text-[#6b3535] relative z-10">
        <span className="bg-white/95 border border-stone-300/80 rounded px-1.5 py-0.2 text-stone-700 shadow-2xs">
          {tieuHanNam}
        </span>
        <span className="font-serif font-extrabold text-stone-900 px-1 tracking-wide">
          {namTrangThai}
        </span>
        <span className="bg-white/95 border border-stone-300/80 rounded px-1.5 py-0.2 text-stone-700 shadow-2xs">
          Tháng {thang}
        </span>
      </div>
    </div>
  )
}
