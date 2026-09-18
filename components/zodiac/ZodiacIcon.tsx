"use client";

import React, { useEffect, useState } from "react";
import { tintImage } from "@/lib/tint-image";

export type ChiName =
  | "ty"
  | "suu"
  | "dan"
  | "mao"
  | "thin"
  | "ti"
  | "ngo"
  | "mui"
  | "than"
  | "dau"
  | "tuat"
  | "hoi";

export const CHI_MAP: Record<string, ChiName> = {
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
  // Lowercase & slug aliases
  "ty": "ty",
  "suu": "suu",
  "dan": "dan",
  "mao": "mao",
  "thin": "thin",
  "ti": "ti",
  "ngo": "ngo",
  "mui": "mui",
  "than": "than",
  "dau": "dau",
  "tuat": "tuat",
  "hoi": "hoi",
};

export function getChiSlug(chi?: string): ChiName {
  if (!chi) return "thin";
  const trimmed = chi.trim();
  return CHI_MAP[trimmed] || (trimmed.toLowerCase() as ChiName) || "thin";
}

// Bảng mã màu HEX cụ thể từng cung theo yêu cầu
export const CUNG_COLOR_HEX: Record<string, string> = {
  ty: "#3B82F6",
  suu: "#DC2626",
  dan: "#16A34A",
  mao: "#059669",
  thin: "#0284C7",
  ti: "#E11D48",
  ngo: "#DB2777",
  mui: "#CA8A04",
  than: "#64748B",
  dau: "#D97706",
  tuat: "#CA8A04",
  hoi: "#2563EB",
  // Uppercase aliases
  "Tý": "#3B82F6",
  "Sửu": "#DC2626",
  "Dần": "#16A34A",
  "Mão": "#059669",
  "Thìn": "#0284C7",
  "Tỵ": "#E11D48",
  "Ngọ": "#DB2777",
  "Mùi": "#CA8A04",
  "Thân": "#64748B",
  "Dậu": "#D97706",
  "Tuất": "#CA8A04",
  "Hợi": "#2563EB",
};

export function getChiColorHex(chi?: string): string {
  if (!chi) return "#B45309";
  const slug = getChiSlug(chi);
  return CUNG_COLOR_HEX[slug] || CUNG_COLOR_HEX[chi] || "#B45309";
}

// Lấy class màu văn bản chuẩn
export function getChiTextColor(chi?: string): string {
  const slug = getChiSlug(chi);
  switch (slug) {
    case "ti":
    case "ngo":
      return "text-[#DC2626]";
    case "dan":
    case "mao":
      return "text-[#15803D]";
    case "than":
    case "dau":
      return "text-[#475569]";
    case "ty":
    case "hoi":
      return "text-[#0284C7]";
    case "thin":
    case "tuat":
    case "suu":
    case "mui":
    default:
      return "text-[#B45309]";
  }
}

interface Props {
  chi: ChiName | string;
  color?: string; // truyền màu HEX thật, VD "#F472B6" — KHÔNG dùng className màu nữa
  className?: string; // chỉ dùng cho w-, h-, opacity-, absolute...
  onLoaded?: () => void;
}

export function ZodiacIcon({ chi, color, className = "", onLoaded }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const slug = getChiSlug(chi);
  const targetColor = color || getChiColorHex(chi);

  useEffect(() => {
    let active = true;
    tintImage(`/zodiac/${slug}.png`, targetColor).then((url) => {
      if (active) {
        setSrc(url);
        onLoaded?.();
      }
    });
    return () => {
      active = false;
    };
  }, [slug, targetColor, onLoaded]);

  if (!src) return null; // hoặc hiện skeleton mờ trong lúc chờ tint xong

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
}

export default ZodiacIcon;
