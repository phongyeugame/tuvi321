"use client";

import React from "react";
import { ZodiacIcon, getChiTextColor, getChiSlug } from "@/components/zodiac/ZodiacIcon";
import { NguHanh } from "./types";
import { getNguHanhColor } from "./constants";
import { getBranchNguHanh } from "./lines";

// =========================================================================
// 1. MAPPING 12 CON GIÁP THEO VĂN HÓA DÂN GIAN VIỆT NAM
// =========================================================================
export const ZODIAC_ANIMALS_VI: Record<string, string> = {
  "Tý": "Chuột",
  "Sửu": "Trâu",
  "Dần": "Hổ",
  "Mão": "Mèo",
  "Thìn": "Rồng",
  "Tỵ": "Rắn",
  "Ngọ": "Ngựa",
  "Mùi": "Dê",
  "Thân": "Khỉ",
  "Dậu": "Gà",
  "Tuất": "Chó",
  "Hợi": "Lợn",
};

// Tên file asset SVG tương ứng trong thư mục /public/zodiac/
export const ZODIAC_FILE_NAMES: Record<string, string> = {
  "Tý": "ty",
  "Sửu": "suu",
  "Dần": "dan",
  "Mão": "mao",
  "Thìn": "thin",
  "Tỵ": "ti",
  "Ngọ": "ngo",
  "Mùi": "mui",
  "Thân": "than",
  "Dậu": "dau",
  "Tuất": "tuat",
  "Hợi": "hoi",
};

/** Lấy tên con giáp theo Địa Chi (Tiếng Việt) */
export function getZodiacAnimal(earthlyBranch?: string): string {
  if (!earthlyBranch) return "Rồng";
  const b = earthlyBranch.trim();
  return ZODIAC_ANIMALS_VI[b] || "Rồng";
}

/** Lấy đường dẫn file SVG asset con giáp */
export function getZodiacImage(earthlyBranch?: string): string {
  if (!earthlyBranch) return "/zodiac/thin.svg";
  const b = earthlyBranch.trim();
  const fileName = ZODIAC_FILE_NAMES[b] || getChiSlug(b);
  return `/zodiac/${fileName}.svg`;
}

// =========================================================================
// 2. REUSABLE COMPONENT: ZODIAC WATERMARK
// Nạp SVG từ /public/zodiac/ và tô màu bằng kỹ thuật CSS mask qua ZodiacIcon
// =========================================================================
export interface ZodiacWatermarkProps {
  /** Địa Chi của cung (Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi) */
  earthlyBranch: string;
  /** Ngũ Hành tùy chọn nếu đã xác định cụ thể (Kim, Mộc, Thủy, Hỏa, Thổ) */
  element?: string;
  /** Màu sắc cụ thể override (nếu muốn chỉ định màu ngoài palette chuẩn) */
  color?: string;
  /** Tọa độ X trong SVG (mặc định 0) */
  x?: number;
  /** Tọa độ Y trong SVG (mặc định 0) */
  y?: number;
  /** Chiều rộng watermark (mặc định 220 trong SVG) */
  width?: number;
  /** Chiều cao watermark (mặc định 220 trong SVG) */
  height?: number;
  /** Độ mờ watermark (mặc định 0.22 để dịu nhẹ, không che khuất chữ và sao) */
  opacity?: number;
  /** Lớp CSS bổ sung */
  className?: string;
  /** Sử dụng trong môi trường HTML (div) thay vì trực tiếp trong thẻ SVG */
  isHtml?: boolean;
}

export function ZodiacWatermark({
  earthlyBranch,
  element,
  color,
  x = 0,
  y = 0,
  width = 220,
  height = 220,
  opacity = 0.22,
  className = "",
  isHtml = false,
}: ZodiacWatermarkProps) {
  const branch = earthlyBranch?.trim() || "Thìn";
  const colorClass = getChiTextColor(branch);

  // Khi hiển thị trong môi trường Bàn Cờ HTML (HTML div container)
  if (isHtml) {
    return (
      <div
        className={`absolute inset-0 flex items-end justify-center pb-2 pointer-events-none select-none z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <ZodiacIcon
          chi={branch}
          className={`w-[85%] h-[85%] opacity-40 ${colorClass}`}
        />
      </div>
    );
  }

  // Khi hiển thị trong SVG Lá Số Chuẩn (ForeignObject bên trong SVG Canvas)
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="w-full h-full flex items-end justify-center pb-2 pointer-events-none overflow-hidden">
        <ZodiacIcon
          chi={branch}
          className={`w-[85%] h-[85%] opacity-40 ${colorClass}`}
        />
      </div>
    </foreignObject>
  );
}

export default ZodiacWatermark;
