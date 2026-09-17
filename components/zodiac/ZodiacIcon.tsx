"use client";

import React from "react";

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

// Lấy class màu văn bản chuẩn theo Ngũ Hành của 12 Địa Chi
export function getChiTextColor(chi?: string): string {
  const slug = getChiSlug(chi);
  switch (slug) {
    case "ti": // Tỵ - Hỏa
    case "ngo": // Ngọ - Hỏa
      return "text-[#DC2626]";
    case "dan": // Dần - Mộc
    case "mao": // Mão - Mộc
      return "text-[#15803D]";
    case "than": // Thân - Kim
    case "dau": // Dậu - Kim
      return "text-[#475569]";
    case "ty": // Tý - Thủy
    case "hoi": // Hợi - Thủy
      return "text-[#0284C7]";
    case "thin": // Thìn - Thổ
    case "tuat": // Tuất - Thổ
    case "suu": // Sửu - Thổ
    case "mui": // Mùi - Thổ
    default:
      return "text-[#B45309]";
  }
}

interface Props {
  chi: ChiName | string;
  className?: string;
}

export function ZodiacIcon({ chi, className = "" }: Props) {
  const slug = getChiSlug(chi);

  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{
        WebkitMaskImage: `url(/zodiac/${slug}.svg)`,
        maskImage: `url(/zodiac/${slug}.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export default ZodiacIcon;
