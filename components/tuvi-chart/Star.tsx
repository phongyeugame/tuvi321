import React from "react";
import { StarItem } from "./types";
import { NGU_HANH_COLORS, getNguHanhColor, getStarNguHanh } from "./constants";

interface StarProps {
  star: StarItem;
  x: number;
  y: number;
  align?: "left" | "center" | "right";
  isMajor?: boolean;
}

// Lấy mã màu chuẩn Ngũ Hành của sao (STAR -> NGŨ HÀNH -> COLOR)
export function getStarColor(star: StarItem | { name: string; nguHanh?: string; colorType?: string }): string {
  if (star.colorType) return star.colorType;

  // 1. Ưu tiên hàng đầu: Thuộc tính ngũ hành được truyền trực tiếp
  if (star.nguHanh) {
    return getNguHanhColor(star.nguHanh);
  }

  // 2. Tra cứu từ điển ngũ hành toàn diện theo tên sao
  const element = getStarNguHanh(star.name);
  if (element) {
    return getNguHanhColor(element);
  }

  // Fallback an toàn (màu Kim / Xám kim loại đậm tương phản cao)
  return NGU_HANH_COLORS.kim;
}

export function Star({ star, x, y, align = "left", isMajor = false }: StarProps) {
  const color = getStarColor(star);
  const textAnchor = align === "center" ? "middle" : align === "right" ? "end" : "start";

  // Level 1: Chính Tinh
  if (isMajor) {
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill={color}
        fontSize="15"
        fontWeight="800"
        fontFamily="var(--font-serif), 'Playfair Display', serif"
        letterSpacing="0.3"
      >
        {star.name.toUpperCase()}
        {star.brightness && (
          <tspan fontSize="12" fontWeight="700" dx="3">
            ({star.brightness})
          </tspan>
        )}
      </text>
    );
  }

  const name = star.name;
  const isItalic = name.includes("Hỏa") || name.includes("Linh") || name.includes("Văn xương") || name.includes("Khôi");
  const isBold =
    star.category === "inauspicious" ||
    name.includes("Khôi") ||
    name.includes("Việt") ||
    name.includes("Mã") ||
    name.includes("Lộc tồn") ||
    name.includes("Hóa");

  // Xử lý sao Lưu Niên có tiền tố "L." (In chữ L. màu đỏ đậm)
  if (name.startsWith("L.")) {
    const mainPart = name.slice(2);
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill={color}
        fontSize="11.5"
        fontWeight="700"
        fontFamily="var(--font-sans), 'Inter', sans-serif"
      >
        <tspan fill="#DC2626" fontWeight="800">L.</tspan>
        {mainPart}
      </text>
    );
  }

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={color}
      fontSize="11.5"
      fontWeight={isBold ? "700" : "500"}
      fontStyle={isItalic ? "italic" : "normal"}
      fontFamily="var(--font-sans), 'Inter', sans-serif"
    >
      {name}
    </text>
  );
}
