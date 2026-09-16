"use client"

import React from "react"
import { Phone } from "lucide-react"
import { CentralFengShuiSeal } from "./ZodiacArt"
import { LaSoTuVi } from "@/lib/tuvi/types"
import { getNguHanhColor } from "@/components/tuvi-chart/constants"
import {
  getTamHopNguHanh,
  getBranchNguHanh,
} from "@/components/tuvi-chart/lines"

interface CenterInfoProps {
  data: LaSoTuVi
  adminName: string
  adminPhone: string
  formattedPhone: string
}

export function CenterInfo({ data, adminName, adminPhone, formattedPhone }: CenterInfoProps) {
  // Màu sắc động xác định trực tiếp từ dữ liệu Ngũ Hành của lá số
  const menhColor = getNguHanhColor(data.nguHanh)
  const tamHopColor = getNguHanhColor(getTamHopNguHanh(data.cungMenh))
  const thanColor = getNguHanhColor(getBranchNguHanh(data.cungThan))
  const cucColor = getNguHanhColor(data.cuc)

  return (
    <div
      style={{ gridColumn: "2 / 4", gridRow: "2 / 4" }}
      className="bg-[#fffdfa] border-dashed border-[#8b3a3a] p-3 md:p-4 flex flex-col justify-between relative overflow-hidden z-1 border select-none"
    >
      {/* 2 Đường Chéo Biểu Tượng Trục Tam Hợp / Xung Chiếu Cắt Qua Bảng Trung Tâm theo Ngũ Hành */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        preserveAspectRatio="none"
      >
        {/* Đường Xung Chiếu Mệnh - Thiên Di theo Ngũ Hành Bản Mệnh */}
        <line x1="100" y1="100" x2="0" y2="0" stroke={menhColor} strokeWidth="3.2" opacity="0.25" strokeLinecap="round" />
        <line x1="100" y1="100" x2="0" y2="0" stroke={menhColor} strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" className="animate-dash" />

        {/* Đường Tam Hợp Mệnh theo Cục Tam Hợp */}
        <line x1="100" y1="100" x2="0" y2="33" stroke={tamHopColor} strokeWidth="2.8" opacity="0.25" strokeLinecap="round" />
        <line x1="100" y1="100" x2="0" y2="33" stroke={tamHopColor} strokeWidth="1.6" strokeDasharray="4 3" strokeLinecap="round" className="animate-dash" />

        <line x1="100" y1="100" x2="66" y2="0" stroke={tamHopColor} strokeWidth="2.8" opacity="0.25" strokeLinecap="round" />
        <line x1="100" y1="100" x2="66" y2="0" stroke={tamHopColor} strokeWidth="1.6" strokeDasharray="4 3" strokeLinecap="round" className="animate-dash" />

        {/* Đường Thân Cư theo Ngũ Hành Cung Thân */}
        <line x1="50" y1="50" x2="66" y2="0" stroke={thanColor} strokeWidth="2.6" opacity="0.25" strokeLinecap="round" />
        <line x1="50" y1="50" x2="66" y2="0" stroke={thanColor} strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" className="animate-dash" />
      </svg>

      {/* Logo Tròn Phong Thủy Rồng Vàng Ở Giữa (Hoạt ảnh nhịp thở phong thủy) */}
      <CentralFengShuiSeal
        adminName={adminName}
        phone={formattedPhone}
        className="absolute inset-0 w-full h-full z-0 opacity-80"
      />

      {/* 1. Tiêu Đề "LÁ SỐ TỬ VI" + Tên Thầy / Brand + Hotline */}
      <div className="text-center pb-2 border-b border-dashed border-[#8b3a3a]/40 relative z-10">
        <h2 className="text-xs md:text-sm font-serif font-black uppercase tracking-widest text-[#4a2424]">
          LÁ SỐ TỬ VI
        </h2>

        {/* Tên Thầy & Hotline Nổi Bật Màu Đỏ */}
        <a
          href={`tel:${adminPhone}`}
          title="Gọi tư vấn trực tiếp cùng Admin"
          className="inline-flex items-center justify-center gap-1.5 text-base md:text-xl font-serif font-black text-red-600 hover:text-red-700 mt-0.5 cursor-pointer group"
        >
          <Phone size={16} className="text-red-600 group-hover:animate-bounce" />
          <span>
            {adminName.toUpperCase()} - {formattedPhone}
          </span>
        </a>
      </div>

      {/* 2. Bảng Thông Tin Đương Số */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 my-1.5 text-[11px] md:text-xs leading-relaxed relative z-10">
        <div>
          <span className="text-stone-600">Họ Tên: </span>
          <strong className="text-red-700 font-serif font-bold text-xs md:text-[13px]">
            {data.input.hoTen}
          </strong>
        </div>

        <div>
          <span className="text-stone-600">Âm Dương: </span>
          <strong className="text-stone-900 font-semibold">
            {data.amDuongMenh || "Âm Nam"} ({data.amDuongThuanLy || "Âm Dương nghịch lý"})
          </strong>
        </div>

        <div>
          <span className="text-stone-600">Tuổi: </span>
          <strong className="text-stone-900">
            {data.canChi.nam}, {data.tuoi || ((data.input?.namXemVanHan || new Date().getFullYear()) - (data.lunarDate?.nam || data.input?.nam || 1990) + 1)} tuổi (thời điểm lập lá số)
          </strong>
        </div>

        <div>
          <span className="text-stone-600">Ngày Sinh: </span>
          <span className="text-stone-800">
            {data.lunarDate.ngay}/{data.lunarDate.thang}/{data.lunarDate.nam} âm - {data.input.ngay}/{data.input.thang}/{data.input.nam} dương
          </span>
        </div>

        <div>
          <span className="text-stone-600">Can Chi: </span>
          <span className="text-stone-800">
            ngày {data.canChi.ngay}, tháng {data.canChi.thang}, năm {data.canChi.nam}
          </span>
        </div>

        <div>
          <span className="text-stone-600">Sinh Giờ: </span>
          <span className="text-stone-800">giờ {data.canChi.gio}</span>
        </div>

        <div>
          <span className="text-stone-600">Cục: </span>
          <strong className="text-emerald-800 font-bold">
            {data.cuc} ({data.menhKhacCuc || "Mệnh Cục tương hòa"})
          </strong>
        </div>

        <div>
          <span className="text-stone-600">Bản Mệnh: </span>
          <strong className="text-amber-800 font-bold">
            {data.nguHanh}
          </strong>
        </div>

        <div>
          <span className="text-stone-600">Căn Tính: </span>
          <span className="text-stone-800">{data.camTinh || "Con Rắn xuất tướng tinh con Thỏ"}</span>
        </div>

        <div>
          <span className="text-stone-600">*Chủ Mệnh: </span>
          <strong className="text-red-700">{data.chuMenh || "Vũ Khúc"}</strong>
        </div>

        <div>
          <span className="text-stone-600">*Chủ Thân: </span>
          <strong className="text-blue-700">{data.chuThan || "Thiên Cơ"}</strong>
        </div>

        <div>
          <span className="text-stone-600">Con Nhà: </span>
          <span className="text-stone-800">{data.conNha || "Con nhà BẠCH ĐẾ (trường thành)"}</span>
        </div>

        <div>
          <span className="text-stone-600">Độ Mạng: </span>
          <span className="text-stone-800">{data.doMang || "Ông Quan Đế độ mạng"}</span>
        </div>

        <div>
          <span className="text-stone-600">Cân Lượng: </span>
          <span className="text-stone-800">{data.canLuong || "4 lượng 0 chỉ"}</span>
        </div>

        <div>
          <span className="text-stone-600">Hạn Năm: </span>
          <strong className="text-red-700">{data.hanNam || "Bính Ngọ (2026)"}</strong>
        </div>

        <div>
          <span className="text-stone-600">Lập Lúc: </span>
          <span className="text-stone-700 text-[10px]">{data.lapLuc || "Hôm nay"}</span>
        </div>
      </div>

      {/* 3. Thanh Progress Bar "Điểm lá số: xx%" (Màu xanh dương đậm theo ảnh mẫu) */}
      <div className="pt-1 border-t border-dashed border-[#8b3a3a]/40 space-y-1 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-stone-700 whitespace-nowrap">
            Điểm lá số:
          </span>
          <div className="flex-1 h-4 bg-stone-200 rounded-sm overflow-hidden border border-stone-300">
            <div
              className="h-full bg-[#1e40af] flex items-center justify-center text-[10px] text-white font-bold transition-all duration-1000 shadow-inner"
              style={{ width: `${Math.max(15, data.diemLaSo || 36)}%` }}
            >
              {data.diemLaSo || 36}%
            </div>
          </div>
        </div>

        {/* 4. Bảng Nhỏ 4×4 Chỉ Số */}
        <div className="grid grid-cols-4 gap-x-1.5 gap-y-0.5 text-[9px] md:text-[9.5px] text-stone-600 pt-1 border-t border-stone-300">
          {/* Cột 1 */}
          <div>Mệnh: <strong className="text-red-700">1.7</strong></div>
          <div>Quan lộc: <strong className="text-red-600">-8</strong></div>
          <div>Tài bạch: <strong className="text-emerald-700">3.3</strong></div>
          <div className="truncate">Khắc Cục: <strong className="text-red-600">-2</strong></div>

          {/* Cột 2 */}
          <div>Phụ mẫu: <strong className="text-emerald-700">6.7</strong></div>
          <div>Nô bộc: <strong className="text-red-600">-10</strong></div>
          <div>Tử tức: <strong className="text-emerald-700">12.4</strong></div>
          <div className="truncate">Nghịch lý: <strong className="text-amber-700">1.5</strong></div>

          {/* Cột 3 */}
          <div>Phúc đức: <strong className="text-blue-700">3.6</strong></div>
          <div>Thiên di: <strong className="text-red-600">-7</strong></div>
          <div>Thu thê: <strong className="text-emerald-700">14.4</strong></div>
          <div>Huynh đệ: <strong className="text-red-600">-1</strong></div>

          {/* Cột 4 */}
          <div>Điền trạch: <strong className="text-stone-700">0</strong></div>
          <div>Tật ách: <strong className="text-emerald-700">10</strong></div>
          <div>Tổng vận: <strong className="text-blue-700">Cát</strong></div>
          <div>Hội tụ: <strong className="text-emerald-700">81%</strong></div>
        </div>
      </div>
    </div>
  )
}
