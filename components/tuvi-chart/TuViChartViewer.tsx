"use client";

import React, { useState, useRef, useEffect } from "react";
import { TuViChartData } from "./types";
import { TuViChart } from "./TuViChart";
import { SVG_WIDTH, SVG_HEIGHT } from "./constants";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  FileCode,
  FileImage,
  Printer,
  Eye,
  BookOpen,
} from "lucide-react";
import { exportLaSoAsPng, exportLaSoAsPdf } from "@/lib/export-la-so";

interface TuViChartViewerProps {
  chart: TuViChartData;
  onBack?: () => void;
}

export type DisplayMode = "fit-width" | "fit-screen" | "custom";

export function TuViChartViewer({ chart, onBack }: TuViChartViewerProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("fit-width");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPalaceId, setSelectedPalaceId] = useState<string>("Hợi");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Zoom handlers (chuyển sang custom mode khi người dùng bấm zoom)
  const handleZoomIn = () => {
    setDisplayMode("custom");
    setZoomLevel((z) => Math.min(2.0, +(z + 0.15).toFixed(2)));
  };

  const handleZoomOut = () => {
    setDisplayMode("custom");
    setZoomLevel((z) => Math.max(0.4, +(z - 0.15).toFixed(2)));
  };

  const handleResetZoom = () => {
    setDisplayMode("fit-width");
    setZoomLevel(1);
  };

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    if (!viewerContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await viewerContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      console.warn("Fullscreen not supported or blocked", e);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // 1. Xuất file SVG nguyên bản vector
  const handleExportSvg = () => {
    if (!svgRef.current) return;
    try {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgRef.current);

      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `La-So-Tu-Vi-${(chart.user.name || "Tu-Vi").replace(/\s+/g, "_")}.svg`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error("Lỗi xuất SVG:", err);
      alert("Không thể xuất file SVG.");
    }
  };

  // 2. Xuất file PNG độ phân giải cao bằng exportLaSoAsPng
  const handleExportPng = async () => {
    if (!svgRef.current) return;
    setIsExporting(true);
    try {
      const fileName = `La-So-Tu-Vi-${(chart.user.name || "Tu-Vi").replace(/\s+/g, "_")}`;
      await exportLaSoAsPng(svgRef.current as unknown as HTMLElement, fileName);
    } catch (err) {
      console.error("Lỗi xuất PNG:", err);
      alert("Không thể kết xuất ảnh PNG, bạn có thể dùng tính năng Xuất SVG hoặc In/PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  // 3. In PDF hoặc Lưu PDF qua jsPDF
  const handlePrintPdf = async () => {
    if (!svgRef.current) {
      window.print();
      return;
    }
    setIsExporting(true);
    try {
      const fileName = `La-So-Tu-Vi-${(chart.user.name || "Tu-Vi").replace(/\s+/g, "_")}`;
      await exportLaSoAsPdf(svgRef.current as unknown as HTMLElement, fileName);
    } catch (err) {
      console.warn("Lỗi xuất PDF qua jsPDF, chuyển về window.print:", err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      ref={viewerContainerRef}
      className={`tuvi-chart-viewer flex flex-col items-center w-full space-y-4 ${
        isFullscreen ? "bg-[#121212] p-4 overflow-auto h-screen" : ""
      }`}
    >
      {/* 1. Thanh Công Cụ Điều Khiển UX (Toolbar) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 bg-[#ede3cb] border border-[#8b3a3a]/40 rounded-2xl shadow-sm text-stone-800 no-print">
        {/* Nút Quay Lại & Bộ Điều Khiển Chế Độ Xem */}
        <div className="flex items-center gap-2 flex-wrap">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-[#8b3a3a]/30 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft size={14} />
              <span>Quay lại</span>
            </button>
          )}

          {/* Nhóm nút Chế Độ Hiển Thị: [ Toàn Cảnh ] [ Vừa Chiều Rộng ] */}
          <div className="inline-flex items-center gap-1 bg-white/90 border border-[#8b3a3a]/30 rounded-xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setDisplayMode("fit-screen")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                displayMode === "fit-screen"
                  ? "bg-[#8b3a3a] text-white shadow-sm"
                  : "text-stone-700 hover:bg-[#ebdcc2]"
              }`}
              title="Thu nhỏ để nhìn được TOÀN BỘ 12 cung lá số trên màn hình không cần cuộn"
            >
              <Eye size={13} />
              <span>Xem Toàn Cảnh</span>
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode("fit-width")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                displayMode === "fit-width"
                  ? "bg-[#8b3a3a] text-white shadow-sm"
                  : "text-stone-700 hover:bg-[#ebdcc2]"
              }`}
              title="Vừa chiều rộng màn hình (cuộn dọc xem chi tiết không bị mất chữ)"
            >
              <BookOpen size={13} />
              <span>Vừa Chiều Rộng</span>
            </button>
          </div>

          {/* Cụm Zoom: [-] [Phần trăm] [+] [Reset] */}
          <div className="inline-flex items-center gap-1 bg-white/85 border border-[#8b3a3a]/30 rounded-xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-[#ebdcc2] rounded-lg text-stone-700 transition-colors cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut size={14} />
            </button>

            <span className="text-xs font-mono font-bold px-2 text-stone-800 min-w-[50px] text-center">
              {displayMode === "fit-screen"
                ? "Toàn Cảnh"
                : displayMode === "fit-width"
                ? "100% Rộng"
                : `${Math.round(zoomLevel * 100)}%`}
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-[#ebdcc2] rounded-lg text-stone-700 transition-colors cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn size={14} />
            </button>

            {displayMode === "custom" && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-[#ebdcc2] rounded-lg text-stone-700 transition-colors cursor-pointer"
                title="Quay về chuẩn"
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Cụm Nút Xuất & Toàn Màn Hình: [ Toàn Màn Hình ] [ Tải SVG ] [ Tải PNG ] [ In / PDF ] */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white border border-[#8b3a3a]/30 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow"
            title="Bật / Thoát chế độ toàn màn hình"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span className="hidden sm:inline">{isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportSvg}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white border border-[#8b3a3a]/30 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow"
            title="Tải tệp tin đồ họa vector SVG"
          >
            <FileCode size={14} className="text-amber-700" />
            <span className="hidden sm:inline">Tải SVG</span>
          </button>

          <button
            type="button"
            onClick={handleExportPng}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8b3a3a] hover:bg-[#702929] text-white text-xs font-bold transition-all shadow-md shadow-[#8b3a3a]/20 cursor-pointer disabled:opacity-50"
            title="Tải ảnh PNG sắc nét (2328x3840)"
          >
            <FileImage size={14} />
            <span>{isExporting ? "Đang xuất..." : "Tải PNG"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white border border-[#8b3a3a]/30 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow"
            title="In hoặc Lưu PDF"
          >
            <Printer size={14} className="text-stone-700" />
            <span className="hidden sm:inline">In / PDF</span>
          </button>
        </div>
      </div>

      {/* 1.1. Dải Phân Loại Màu Ngũ Hành (Bản Đồ Ngũ Hành Legend) */}
      <div className="w-full flex items-center justify-between flex-wrap gap-2 px-3.5 py-2 bg-[#FFFDF9] border border-[#8B3A3A]/35 rounded-xl shadow-2xs text-xs text-stone-700 no-print">
        <span className="font-serif font-bold text-[#8B3A3A] flex items-center gap-1.5">
          <span>Bản Đồ Ngũ Hành:</span>
        </span>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-400/60 text-[#475569] font-extrabold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#475569]" /> KIM
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-500/60 text-[#15803D] font-extrabold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" /> MỘC
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-50 border border-sky-500/60 text-[#0284C7] font-extrabold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" /> THỦY
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-50 border border-red-500/60 text-[#DC2626] font-extrabold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" /> HỎA
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-500/60 text-[#B45309] font-extrabold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" /> THỔ
          </span>
        </div>
      </div>

      {/* 2. Vùng Hiển Thị SVG Chart */}
      {displayMode === "fit-screen" ? (
        /* CHẾ ĐỘ 1: XEM TOÀN CẢNH - TOÀN BỘ 12 CUNG VỪA VẶN MÀN HÌNH KHÔNG CẦN CUỘN */
        <div className="w-full flex justify-center items-center py-2 min-h-[70vh] max-h-[calc(100vh-140px)]">
          <div
            className="h-full shadow-2xl rounded-xl overflow-hidden border border-[#8b3a3a]/40 bg-[#FAF6EE] flex items-center justify-center transition-all duration-300"
            style={{
              maxHeight: isFullscreen ? "calc(100vh - 100px)" : "calc(100vh - 160px)",
              aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
              maxWidth: "100%",
              width: "auto",
            }}
          >
            <TuViChart
              svgRef={svgRef}
              chart={chart}
              selectedPalaceId={selectedPalaceId}
              onSelectPalace={setSelectedPalaceId}
            />
          </div>
        </div>
      ) : displayMode === "fit-width" ? (
        /* CHẾ ĐỘ 2: VỪA CHIỀU RỘNG - KHÔNG BỊ TRÀN NGANG, 4 CỘT HIỂN THỊ ĐỦ TRÊN MỌI MÀN HÌNH (MOBILE / TABLET / DESKTOP) */
        <div className="w-full flex justify-center py-2 pb-14">
          <div
            className="w-full max-w-[1164px] shadow-2xl rounded-xl overflow-hidden border border-[#8b3a3a]/40 bg-[#FAF6EE] transition-all duration-300"
            style={{
              aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
            }}
          >
            <TuViChart
              svgRef={svgRef}
              chart={chart}
              selectedPalaceId={selectedPalaceId}
              onSelectPalace={setSelectedPalaceId}
            />
          </div>
        </div>
      ) : (
        /* CHẾ ĐỘ 3: PHÓNG TO TỰ DO (CUSTOM ZOOM) - CUỘN MƯỢT MÀ, KHÔNG BỊ MẤT MÉP TRÁI */
        <div className="w-full overflow-auto p-4 pb-16 rounded-2xl bg-stone-900/10 border border-stone-800/20 max-h-[85vh]">
          <div
            style={{
              width: `${Math.round(SVG_WIDTH * zoomLevel)}px`,
              minWidth: `${Math.round(SVG_WIDTH * zoomLevel)}px`,
              aspectRatio: `${SVG_WIDTH} / ${SVG_HEIGHT}`,
              margin: "0 auto",
            }}
            className="shadow-2xl rounded-xl overflow-hidden border border-[#8b3a3a]/40 bg-[#FAF6EE] transition-all duration-200"
          >
            <TuViChart
              svgRef={svgRef}
              chart={chart}
              selectedPalaceId={selectedPalaceId}
              onSelectPalace={setSelectedPalaceId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
