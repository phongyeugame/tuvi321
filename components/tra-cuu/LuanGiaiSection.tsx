"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cung, LuanGiai } from "@/lib/tuvi/types";
import { ZodiacIcon, getChiColorHex } from "@/components/zodiac/ZodiacIcon";
import { getLuanGiaiForCung } from "@/data/mock-luan-giai";
import {
  ChevronDown,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
} from "lucide-react";

interface LuanGiaiSectionProps {
  cungList: Cung[];
  cungMenh?: string;
  cungThan?: string;
  selectedChi?: string;
  selectionKey?: string | number;
  onSelectPalace?: (chi: string) => void;
}

interface AccordionItemProps {
  cung: Cung;
  luanGiai: LuanGiai;
  isOpen: boolean;
  onToggle: () => void;
  isMenh: boolean;
}

// Badge đánh giá tổng quan (Tốt=xanh lá, Khá=xanh dương, Trung Bình=vàng, Xấu=đỏ)
function DanhGiaBadge({ rating }: { rating?: LuanGiai["danhGiaTongQuan"] }) {
  switch (rating) {
    case "tot":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-700/60 shadow-xs">
          <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
          <span>Tốt</span>
        </span>
      );
    case "kha":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-700/60 shadow-xs">
          <ShieldCheck size={12} className="text-sky-600 dark:text-sky-400" />
          <span>Khá</span>
        </span>
      );
    case "xau":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-700/60 shadow-xs">
          <AlertOctagon size={12} className="text-rose-600 dark:text-rose-400" />
          <span>Cần Lưu Ý</span>
        </span>
      );
    case "trung-binh":
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700/60 shadow-xs">
          <AlertTriangle size={12} className="text-amber-600 dark:text-amber-400" />
          <span>Trung Bình</span>
        </span>
      );
  }
}

// Component Accordion Item tái sử dụng cho từng cung
export const LuanGiaiAccordionItem = React.memo(function LuanGiaiAccordionItem({
  cung,
  luanGiai,
  isOpen,
  onToggle,
  isMenh,
}: AccordionItemProps) {
  const chi = cung.viTri;
  const chiColor = getChiColorHex(chi);
  const tenCungClean = (cung.ten || "").toUpperCase();

  return (
    <div
      id={`luan-giai-${chi}`}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
        isOpen
          ? "bg-[#fbf7ee] dark:bg-stone-900/90 border-[#8b3a3a] dark:border-gold/50 shadow-md ring-1 ring-[#8b3a3a]/20"
          : "bg-[#ede3cb]/70 hover:bg-[#ede3cb] dark:bg-stone-900/50 dark:hover:bg-stone-900/80 border-[#8b3a3a]/30 dark:border-border"
      }`}
    >
      {/* Header Accordion */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3.5 sm:px-5 flex items-center justify-between gap-3 text-left cursor-pointer select-none transition-colors"
        aria-expanded={isOpen}
      >
        {/* Phần bên trái: Icon con giáp + Tên cung + Badge Can Chi + Badge Thân */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon con giáp nhỏ ~32px */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center p-0.5 rounded-lg bg-white/70 dark:bg-stone-800/80 border border-[#8b3a3a]/20 shadow-xs">
            <ZodiacIcon
              chi={chi}
              color={chiColor}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#602323] dark:text-gold flex items-center gap-1.5 truncate">
              <span>
                Luận Giải Chi Tiết Cung {tenCungClean} ({chi})
              </span>
            </h3>

            {/* Badge Can Chi */}
            {cung.canChiShort && (
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-md font-mono bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700">
                {cung.canChiShort}
              </span>
            )}

            {/* Badge Cung Mệnh quan trọng */}
            {isMenh && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#8b3a3a] text-white shadow-xs">
                Cung Mệnh
              </span>
            )}

            {/* Badge Thân Cư Ở Đây */}
            {cung.isThan && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#443834] text-white shadow-xs">
                Thân Cư Ở Đây
              </span>
            )}
          </div>
        </div>

        {/* Phần bên phải: Badge đánh giá tổng quan + Icon mũi tên xoay */}
        <div className="flex items-center gap-2.5 shrink-0">
          <DanhGiaBadge rating={luanGiai.danhGiaTongQuan} />

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/60 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      {/* Nội dung khi mở accordion (Framer Motion AnimatePresence) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 pt-2 border-t border-[#8b3a3a]/20 dark:border-border/60">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Cột trái: Chính tinh toạ thủ, Cát tinh, Hung sát tinh */}
                <div className="space-y-3 bg-white/80 dark:bg-stone-950/60 p-4 rounded-xl border border-[#8b3a3a]/20 dark:border-border shadow-xs">
                  <div>
                    <span className="text-stone-600 dark:text-stone-400 font-medium">
                      Chính Tinh Toạ Thủ:{" "}
                    </span>
                    <span className="font-bold text-[#b91c1c] dark:text-red-400 text-sm">
                      {luanGiai.chinhTinhTuaThu || "Vô Chính Diệu"}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-600 dark:text-stone-400 font-medium block mb-1.5">
                      Cát Tinh Hội Tụ:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {luanGiai.catTinhHoiTu && luanGiai.catTinhHoiTu.length > 0 ? (
                        luanGiai.catTinhHoiTu.map((star, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60"
                          >
                            {star}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-stone-500 italic">
                          Hài hòa, bình ổn
                        </span>
                      )}
                    </div>
                  </div>

                  {luanGiai.hungSatTinh && luanGiai.hungSatTinh.length > 0 && (
                    <div>
                      <span className="text-stone-600 dark:text-stone-400 font-medium block mb-1.5">
                        Hung Sát Tinh:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {luanGiai.hungSatTinh.map((star, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-300/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60"
                          >
                            {star}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vận hạn và trường sinh nếu có */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                    <span>
                      Đại vận: <strong className="text-stone-700 dark:text-stone-200">{cung.daiHan ?? "--"} tuổi</strong>
                    </span>
                    <span>
                      Vòng Tràng Sinh: <strong className="text-stone-700 dark:text-stone-200">{cung.trangSinh || "Trường sinh"}</strong>
                    </span>
                    <span>
                      Tiểu hạn: <strong className="text-stone-700 dark:text-stone-200">{cung.tieuHanNam || `Năm ${chi}`}</strong>
                    </span>
                  </div>
                </div>

                {/* Cột phải: Lời Khuyên & Luận Giải Tử Vi */}
                <div className="bg-white/90 dark:bg-stone-950/80 p-4 rounded-xl border border-[#8b3a3a]/30 dark:border-gold/30 shadow-xs flex flex-col justify-start">
                  <h4 className="font-bold text-[#8b3a3a] dark:text-gold text-xs uppercase tracking-wider mb-2 font-serif flex items-center gap-1.5">
                    <Sparkles size={14} className="text-gold" />
                    <span>Lời Khuyên & Luận Giải Tử Vi</span>
                  </h4>
                  <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-xs sm:text-sm">
                    {luanGiai.loiKhuyen}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export function LuanGiaiSection({
  cungList,
  cungMenh,
  cungThan,
  selectedChi,
  selectionKey,
  onSelectPalace,
}: LuanGiaiSectionProps) {
  // Tìm Chi của cung Mệnh để mặc định mở
  const cungMenhChi = useMemo(() => {
    if (cungMenh) return cungMenh;
    const menh = cungList.find((c) => (c.ten || "").toLowerCase().includes("mệnh"));
    return menh?.viTri || "Sửu";
  }, [cungList, cungMenh]);

  // Quản lý danh sách các cung đang mở: mặc định chỉ mở Cung Mệnh
  const [openChiSet, setOpenChiSet] = useState<Set<string>>(
    () => new Set([cungMenhChi])
  );

  // Chuẩn hóa danh sách 12 cung kèm luận giải
  const formattedCungList = useMemo(() => {
    return cungList.map((cung) => ({
      cung,
      luanGiai: getLuanGiaiForCung(cung),
      isMenh: cung.viTri === cungMenhChi || (cung.ten || "").toLowerCase() === "mệnh",
    }));
  }, [cungList, cungMenhChi]);

  // Toggle mở/đóng 1 cung
  const handleToggle = useCallback((chi: string) => {
    setOpenChiSet((prev) => {
      const next = new Set(prev);
      if (next.has(chi)) {
        next.delete(chi);
      } else {
        next.add(chi);
      }
      return next;
    });
    if (onSelectPalace) {
      onSelectPalace(chi);
    }
  }, [onSelectPalace]);

  // Mở tất cả 12 cung
  const handleOpenAll = useCallback(() => {
    const all = new Set(cungList.map((c) => c.viTri));
    setOpenChiSet(all);
  }, [cungList]);

  // Đóng tất cả
  const handleCloseAll = useCallback(() => {
    setOpenChiSet(new Set());
  }, []);

  // Tự động mở và cuộn mượt khi selectedChi từ lưới 4x4 thay đổi hoặc được click lại
  useEffect(() => {
    if (!selectedChi) return;

    // Tự mở accordion đó nếu đang đóng
    setOpenChiSet((prev) => {
      if (prev.has(selectedChi)) return prev;
      const next = new Set(prev);
      next.add(selectedChi);
      return next;
    });

    // Cuộn mượt xuống đúng accordion đó
    const timer = setTimeout(() => {
      const el = document.getElementById(`luan-giai-${selectedChi}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedChi, selectionKey]);

  return (
    <section className="space-y-6 pt-6 no-print">
      {/* 1. Tiêu đề Section chuẩn phong cách vàng gold, font serif, gạch chân ngắn */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gold tracking-wide">
          Luận Giải Chi Tiết 12 Cung
        </h2>
        {/* Đường gạch chân ngắn ánh kim dưới tiêu đề */}
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2" />
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto pt-1">
          Khám phá chi tiết sự phối hợp của Chính Tinh, Cát Tinh và Hung Sát Tinh trên từng cung vị bản mệnh, tài lộc, sự nghiệp và gia đạo.
        </p>
      </div>

      {/* 2. Thanh điều khiển: Mở tất cả / Đóng tất cả */}
      <div className="flex items-center justify-between gap-3 px-2 flex-wrap">
        <div className="text-xs text-stone-600 dark:text-stone-400 font-medium">
          Đang xem: <strong className="text-foreground">{openChiSet.size}/12 cung</strong>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white dark:bg-stone-800 dark:hover:bg-stone-700 border border-[#8b3a3a]/30 dark:border-border text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Maximize2 size={13} />
            <span>Mở tất cả</span>
          </button>

          <button
            type="button"
            onClick={handleCloseAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white dark:bg-stone-800 dark:hover:bg-stone-700 border border-[#8b3a3a]/30 dark:border-border text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Minimize2 size={13} />
            <span>Đóng tất cả</span>
          </button>
        </div>
      </div>

      {/* 3. Danh sách 12 Accordion Cung */}
      <div className="space-y-3">
        {formattedCungList.map(({ cung, luanGiai, isMenh }) => (
          <LuanGiaiAccordionItem
            key={cung.viTri}
            cung={cung}
            luanGiai={luanGiai}
            isOpen={openChiSet.has(cung.viTri)}
            onToggle={() => handleToggle(cung.viTri)}
            isMenh={isMenh}
          />
        ))}
      </div>
    </section>
  );
}
