"use client"

import React, { useRef, useState, useMemo } from "react"
import { LaSoTuVi, Cung } from "@/lib/tuvi/types"
import { PalaceCell, PalaceCellData } from "./PalaceCell"
import { CenterInfo } from "./CenterInfo"
import { cn } from "@/lib/utils"
import {
  Download,
  Phone,
  Printer,
  Sparkles,
  Share2,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  List,
} from "lucide-react"
import { computeTraditionalLines } from "@/components/tuvi-chart/lines"
import { getNguHanhColor } from "@/components/tuvi-chart/constants"

// Vị trí chuẩn của 12 Địa Chi trên bàn cờ 4x4 Tử Vi Bắc Phái
const TRADITIONAL_GRID_COORDINATES: Record<string, { col: number; row: number; conGiap: string; mauNen: string }> = {
  // Hàng 1 (Trên cùng: Tỵ -> Ngọ -> Mùi -> Thân)
  "Tỵ": { col: 1, row: 1, conGiap: "Rắn", mauNen: "#faecef" },     // Hồng nhạt
  "Ngọ": { col: 2, row: 1, conGiap: "Ngựa", mauNen: "#faeaee" },    // Hồng đào
  "Mùi": { col: 3, row: 1, conGiap: "Dê", mauNen: "#fbf6ea" },      // Vàng kem
  "Thân": { col: 4, row: 1, conGiap: "Khỉ", mauNen: "#f2f1ef" },    // Xám tro
  // Cột phải (Dậu -> Tuất)
  "Dậu": { col: 4, row: 2, conGiap: "Gà", mauNen: "#f5f2eb" },      // Xám ấm
  "Tuất": { col: 4, row: 3, conGiap: "Chó", mauNen: "#fcf5e6" },    // Vàng đất
  // Hàng 4 (Dưới cùng: Dần -> Sửu -> Tý -> Hợi)
  "Hợi": { col: 4, row: 4, conGiap: "Lợn", mauNen: "#ebf4fa" },     // Xanh lam nhạt
  "Tý": { col: 3, row: 4, conGiap: "Chuột", mauNen: "#eaf2f8" },   // Xanh dương nhạt
  "Sửu": { col: 2, row: 4, conGiap: "Trâu", mauNen: "#fcf7e8" },   // Vàng đồng nhạt
  "Dần": { col: 1, row: 4, conGiap: "Hổ", mauNen: "#eef7f2" },     // Xanh ngọc (Góc dưới - trái)
  // Cột trái (Mão -> Thìn)
  "Mão": { col: 1, row: 3, conGiap: "Mèo", mauNen: "#ecf7f1" },    // Xanh bạc hà
  "Thìn": { col: 1, row: 2, conGiap: "Rồng", mauNen: "#fcf6e8" },   // Vàng kim
}

interface LaSoTraditionalProps {
  data: LaSoTuVi
}

export function LaSoTraditional({ data }: LaSoTraditionalProps) {
  const boardRef = useRef<HTMLDivElement>(null)
  const [selectedChi, setSelectedChi] = useState<string>(data.cungMenh || "Hợi")
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [isExporting, setIsExporting] = useState<boolean>(false)
  const [layoutView, setLayoutView] = useState<"grid" | "list">("grid")

  const adminName = data.adminName || "Nguyễn Quốc Trưởng"
  const adminPhone = data.adminPhone || "0865341434"
  const formattedPhone = adminPhone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")

  // Map 12 cung từ dữ liệu API
  const cungByChi = useMemo(() => {
    const map: Record<string, Cung> = {}
    data.cung.forEach((c) => {
      map[c.viTri] = c
    })
    return map
  }, [data])

  // Xây dựng chartData chứa mảng 12 cung theo đúng yêu cầu đề bài
  const chartData: PalaceCellData[] = useMemo(() => {
    return Object.entries(TRADITIONAL_GRID_COORDINATES).map(([chi, coord]) => {
      const cung = cungByChi[chi] || {
        ten: "Mệnh",
        viTri: chi,
        chinhTinh: [],
        phuTinh: [],
        catTinh: [],
        hungTinh: []
      }

      // Xử lý sao chính có ngũ hành & độ đắc hãm
      const saoChinhFormated = (cung.chinhTinhChiTiet || []).map((s) => ({
        ten: s.ten,
        trangThai: s.trangThai || "Đ",
        nguHanh: s.nguHanh || "Kim"
      }))

      return {
        chi,
        tenCung: cung.ten.toUpperCase(),
        canChiTag: cung.canChiShort || chi,
        daiVan: cung.daiHan ?? 24,
        isThan: cung.isThan,
        triet: cung.triet,
        tuan: cung.tuan,
        saoChinh: saoChinhFormated,
        saoCat: cung.catTinh || ["Tả Phù", "Văn Xương", "Thiên Khôi"],
        saoHung: cung.hungTinh || ["Kình Dương", "Địa Không"],
        hoaKhi: {
          loc: cung.tuHoa?.[0]?.split(": ")[1] || "Tử tức",
          quyen: cung.tuHoa?.[1]?.split(": ")[1] || "Phụ mẫu",
          khoa: cung.tuHoa?.[2]?.split(": ")[1] || "Phu thê",
          ky: cung.tuHoa?.[3]?.split(": ")[1] || "Thiên di",
        },
        namTrangThai: cung.trangSinh || "Trường sinh",
        tieuHanNam: cung.tieuHanNam || `Năm ${chi}`,
        thang: cung.nguyetHan || coord.col + coord.row,
        mauNen: coord.mauNen,
        conGiap: coord.conGiap,
        gridCol: coord.col,
        gridRow: coord.row,
        luanGiai: cung.luanGiai
      }
    })
  }, [cungByChi])

  // Cung đang được chọn
  const activePalace = useMemo(() => {
    return chartData.find((c) => c.chi === selectedChi) || chartData[0]
  }, [chartData, selectedChi])

  // Tính toán các đường Tam Hợp, Xung Chiếu, Thân cư động theo Ngũ Hành thực tế của lá số
  const traditionalLines = useMemo(() => {
    return computeTraditionalLines(data, 1000)
  }, [data])

  // Thu thập điểm neo duy nhất trên mép biên bàn cờ truyền thống
  const traditionalAnchorPoints = useMemo(() => {
    const map = new Map<string, { x: number; y: number; color: string }>();
    traditionalLines.forEach((l) => {
      const color = getNguHanhColor(l.nguHanh || l.element);
      const k1 = `${Math.round(l.x1)},${Math.round(l.y1)}`;
      if (!map.has(k1)) map.set(k1, { x: l.x1, y: l.y1, color });
      const k2 = `${Math.round(l.x2)},${Math.round(l.y2)}`;
      if (!map.has(k2)) map.set(k2, { x: l.x2, y: l.y2, color });
    });
    return Array.from(map.values());
  }, [traditionalLines]);

  // Tải ảnh PNG bằng html2canvas
  const handleDownloadImage = async () => {
    if (!boardRef.current) return
    setIsExporting(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(boardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f5ecd7",
      })
      const link = document.createElement("a")
      link.download = `La-So-Tu-Vi-${data.input.hoTen.replace(/\s+/g, "_")}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (err) {
      console.error("Lỗi xuất ảnh:", err)
      alert("Không thể tải ảnh, bạn có thể dùng chức năng In / Lưu PDF.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 1. Thanh Công Cụ & Tùy Chọn Xem */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#ede3cb] border border-[#8b3a3a]/40 rounded-2xl no-print text-stone-800">
        <div className="flex items-center gap-2">
          {/* Toggle Chế Độ Xem Desktop Grid vs Mobile List */}
          <div className="inline-flex rounded-xl bg-white/70 p-1 border border-[#8b3a3a]/30">
            <button
              type="button"
              onClick={() => setLayoutView("grid")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                layoutView === "grid"
                  ? "bg-[#8b3a3a] text-white shadow"
                  : "text-stone-700 hover:text-stone-900"
              )}
            >
              <LayoutGrid size={14} />
              <span>Bàn Cờ 4×4</span>
            </button>
            <button
              type="button"
              onClick={() => setLayoutView("list")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                layoutView === "list"
                  ? "bg-[#8b3a3a] text-white shadow"
                  : "text-stone-700 hover:text-stone-900"
              )}
            >
              <List size={14} />
              <span>Cuộn Dọc 1 Cột (Mobile)</span>
            </button>
          </div>

          {/* Zoom (áp dụng cho chế độ Grid) */}
          {layoutView === "grid" && (
            <div className="hidden sm:inline-flex items-center gap-1 bg-white/70 border border-[#8b3a3a]/30 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                className="p-1 hover:bg-[#ebdcc2] rounded text-stone-700 cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-stone-800 font-bold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                className="p-1 hover:bg-[#ebdcc2] rounded text-stone-700 cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Nút Gọi Admin & Xuất Ảnh / In */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`tel:${adminPhone}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold transition-all shadow-md shadow-red-900/20"
          >
            <Phone size={13} className="animate-pulse" />
            <span>Thầy {adminName}: {formattedPhone}</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8b3a3a] hover:bg-[#702929] text-white text-xs font-bold transition-all shadow-md shadow-[#8b3a3a]/20 cursor-pointer disabled:opacity-50"
          >
            <Download size={13} />
            <span>{isExporting ? "Đang xuất..." : "Tải Ảnh Lá Số"}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-[#8b3a3a]/30 text-stone-800 text-xs font-semibold cursor-pointer"
          >
            <Printer size={13} />
            <span>In / PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Toàn Bộ Bàn Cờ Lá Số Tử Vi (4 Cột × 4 Hàng) */}
      {layoutView === "grid" ? (
        <div className="overflow-x-auto pb-4 scrollbar-thin">
          <div
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top center" }}
            className="transition-transform duration-200 min-w-[840px] md:min-w-[940px] lg:min-w-[1020px] mx-auto"
          >
            {/* Bàn cờ nền giấy màu kem (#f5ecd7), viền nét đứt (#8b3a3a) */}
            <div
              ref={boardRef}
              style={{ backgroundColor: "#f5ecd7" }}
              className="grid grid-cols-4 grid-rows-4 gap-0 border-2 border-[#8b3a3a] shadow-2xl relative select-none rounded-lg overflow-hidden font-sans"
            >
              {/* 12 Ô Cung Xung Quanh */}
              {chartData.map((cell) => (
                <PalaceCell
                  key={cell.chi}
                  cell={cell}
                  isSelected={selectedChi === cell.chi}
                  onClick={() => setSelectedChi(cell.chi)}
                  isMobileList={false}
                />
              ))}

              {/* Bảng Trung Tâm (Hàng 2-3, Cột 2-3 gộp lại thành 1 khối) */}
              <CenterInfo
                data={data}
                adminName={adminName}
                adminPhone={adminPhone}
                formattedPhone={formattedPhone}
              />

              {/* Các đường nối Tam Hợp & Xung Chiếu động theo Ngũ Hành lá số thực tế - Đặt ở z-10 nổi bật trên nền */}
              <svg
                viewBox="0 0 1000 1000"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              >
                {traditionalLines.map((line) => {
                  const strokeColor = getNguHanhColor(line.nguHanh || line.element);
                  return (
                    <g key={line.id}>
                      {/* Đường nền mờ tăng tương phản và độ nổi bật */}
                      <line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke={strokeColor}
                        strokeWidth={(line.strokeWidth || 2.2) + 2.5}
                        opacity={0.25}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Đường chính nét đứt theo Ngũ Hành rõ nét */}
                      <line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke={strokeColor}
                        strokeWidth={line.strokeWidth || 2.2}
                        strokeDasharray={line.dashArray || "7 5"}
                        opacity={line.opacity || 0.9}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-dash"
                      />
                    </g>
                  );
                })}
                {/* Điểm neo viền tinh tế nằm trên mép biên ngăn cách cung và ô trung tâm */}
                {traditionalAnchorPoints.map((pt, idx) => (
                  <g key={`trad-anchor-${pt.x}-${pt.y}-${idx}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={3.8}
                      fill="#f5ecd7"
                      stroke={pt.color}
                      strokeWidth={1.8}
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={1.6}
                      fill={pt.color}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      ) : (
        /* Chế Độ Cuộn Dọc 1 Cột Tối Ưu Cho Màn Hình Điện Thoại */
        <div className="space-y-4 max-w-lg mx-auto">
          {/* Khối Thông Tin Trung Tâm */}
          <div className="rounded-2xl border-2 border-dashed border-[#8b3a3a] overflow-hidden shadow-lg">
            <CenterInfo
              data={data}
              adminName={adminName}
              adminPhone={adminPhone}
              formattedPhone={formattedPhone}
            />
          </div>

          {/* Danh Sách 12 Cung Dọc */}
          <div className="space-y-3">
            <h3 className="text-sm font-serif font-bold text-gold uppercase tracking-wider px-1">
              Chi Tiết 12 Cung Bản Mệnh:
            </h3>
            {chartData.map((cell) => (
              <PalaceCell
                key={cell.chi}
                cell={cell}
                isSelected={selectedChi === cell.chi}
                onClick={() => setSelectedChi(cell.chi)}
                isMobileList={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. Panel Chi Tiết Cung Vị Được Chọn */}
      <div className="p-5 md:p-6 rounded-2xl bg-[#ede3cb] border border-[#8b3a3a]/40 shadow-xl text-stone-900 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#8b3a3a]/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#8b3a3a]" />
            <h3 className="font-serif font-black text-lg md:text-xl text-[#602323]">
              Luận Giải Chi Tiết Cung {activePalace.tenCung} ({activePalace.chi})
            </h3>
            {activePalace.isThan && (
              <span className="bg-[#443834] text-white text-xs px-2 py-0.5 rounded font-bold">
                Thân Cư Ở Đây
              </span>
            )}
          </div>
          <span className="text-xs text-stone-600 font-medium">
            Đại vận {activePalace.daiVan} tuổi | {activePalace.namTrangThai} | {activePalace.tieuHanNam}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="space-y-3 bg-white/60 p-4 rounded-xl border border-[#8b3a3a]/20">
            <div>
              <span className="text-stone-600 font-medium">Chính Tinh Tọa Thủ: </span>
              {activePalace.saoChinh.length > 0 ? (
                <span className="font-bold text-red-700">
                  {activePalace.saoChinh.map((s) => `${s.ten} (${s.trangThai})`).join(", ")}
                </span>
              ) : (
                <span className="italic text-stone-500">Vô Chính Diệu (mượn chính tinh cung đối chiếu)</span>
              )}
            </div>

            <div>
              <span className="text-stone-600 font-medium">Cát Tinh Hội Tụ: </span>
              <span className="text-emerald-800 font-medium">
                {activePalace.saoCat.join(", ") || "Hài hòa"}
              </span>
            </div>

            <div>
              <span className="text-stone-600 font-medium">Sát & Bại Tinh: </span>
              <span className="text-rose-800 font-bold">
                {activePalace.saoHung.join(", ") || "Yên ổn"}
              </span>
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-[#8b3a3a]/30">
            <h4 className="font-bold text-[#602323] text-xs uppercase tracking-wider mb-2 font-serif">
              Lời Khuyên & Luận Giải Tử Vi
            </h4>
            <p className="text-stone-800 leading-relaxed text-xs">
              {activePalace.luanGiai || "Cung vị vững vàng, vận trình hanh thông nếu nắm bắt đúng thời cơ và tích phúc đức."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
